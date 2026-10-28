const { Pool } = require("pg");

function startOrderNotifications({ stripe, sendCustomer, sendOwner, log = console }) {
  if (!process.env.DATABASE_URL) {
    log.warn("DATABASE_URL is missing: durable notification processing disabled.");
    return { enabled: false, enqueue: async () => { throw new Error("DATABASE_URL is required for order notifications"); } };
  }
  const pool = new Pool({ connectionString: process.env.DATABASE_URL, max: 3 });
  let ready = false;
  const init = pool.query(`
    CREATE TABLE IF NOT EXISTS order_email_jobs (
      session_id TEXT NOT NULL,
      kind TEXT NOT NULL CHECK (kind IN ('customer','owner')),
      status TEXT NOT NULL DEFAULT 'pending',
      session_data JSONB NOT NULL,
      attempts INTEGER NOT NULL DEFAULT 0,
      next_attempt_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      leased_until TIMESTAMPTZ,
      sent_at TIMESTAMPTZ,
      last_error TEXT,
      PRIMARY KEY (session_id, kind)
    )
  `).then(() => { ready = true; }).catch(error => {
    log.error("Order notification database initialization failed:", error);
  });

  async function enqueue(session) {
    await init;
    if (!ready) throw new Error("Order notification database is unavailable");
    for (const kind of ["customer", "owner"]) {
      await pool.query(
        `INSERT INTO order_email_jobs (session_id, kind, session_data)
         VALUES ($1, $2, $3::jsonb)
         ON CONFLICT (session_id, kind) DO NOTHING`,
        [session.id, kind, JSON.stringify(session)]
      );
    }
  }

  let running = false;
  async function processQueue() {
    if (running || !ready) return;
    running = true;
    try {
      for (let i = 0; i < 10; i++) {
        const result = await pool.query(`
          UPDATE order_email_jobs
          SET status='processing', leased_until=NOW()+INTERVAL '2 minutes'
          WHERE (session_id, kind) IN (
            SELECT session_id, kind FROM order_email_jobs
            WHERE (status='pending' AND next_attempt_at <= NOW())
               OR (status='processing' AND leased_until < NOW())
            ORDER BY next_attempt_at
            FOR UPDATE SKIP LOCKED LIMIT 1
          )
          RETURNING session_id, kind, session_data, attempts
        `);
        if (!result.rows.length) break;
        const job = result.rows[0];
        try {
          if (job.kind === "customer") await sendCustomer(job.session_data);
          else await sendOwner(job.session_data);
          await pool.query(
            `UPDATE order_email_jobs SET status='sent', sent_at=NOW(), leased_until=NULL, last_error=NULL
             WHERE session_id=$1 AND kind=$2`,
            [job.session_id, job.kind]
          );
          log.info("Order notification sent:", job.session_id, job.kind);
        } catch (error) {
          const attempts = job.attempts + 1;
          const delaySeconds = Math.min(3600, 30 * 2 ** Math.min(attempts - 1, 7));
          await pool.query(
            `UPDATE order_email_jobs SET status='pending', attempts=$3,
             next_attempt_at=NOW()+($4 * INTERVAL '1 second'),
             leased_until=NULL, last_error=$5
             WHERE session_id=$1 AND kind=$2`,
            [job.session_id, job.kind, attempts, delaySeconds, String(error.message).slice(0, 1000)]
          );
          log.error("Order notification will retry:", job.session_id, job.kind, error.message);
        }
      }
    } catch (error) {
      log.error("Order notification queue processing failed:", error);
    } finally {
      running = false;
    }
  }

  init.then(() => processQueue());
  const timer = setInterval(processQueue, 15000);
  timer.unref();
  return { enabled: true, enqueue, processQueue };
}

module.exports = { startOrderNotifications };
