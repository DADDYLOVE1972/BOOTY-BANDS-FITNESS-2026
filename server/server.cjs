const express = require("express");
const cors = require("cors");
const https = require("https");

const app = express();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY is missing. Checkout will not work until it is set.");
}
if (!stripeWebhookSecret) {
  console.warn("STRIPE_WEBHOOK_SECRET is missing. Webhook events will be rejected until it is set.");
}

const stripe = require("stripe")(stripeSecretKey || "sk_test_missing");

/* =========================================================
   BREVO CONFIGURATION
========================================================= */

const brevoApiKey = process.env.BREVO_API_KEY;
const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;
const brevoSenderName =
  process.env.BREVO_SENDER_NAME || "Booty Bands Fitness";

if (!brevoApiKey) {
  console.warn(
    "BREVO_API_KEY is missing. Order confirmation emails will not be sent."
  );
}

if (!brevoSenderEmail) {
  console.warn(
    "BREVO_SENDER_EMAIL is missing. Order confirmation emails will not be sent."
  );
}

const SITE_URL =
  process.env.SITE_URL || "https://bootybandsfitness.com";

// CORS allowlist. Defaults to your real production domains, the Vercel
// deployment, and local dev — set ALLOWED_ORIGINS (comma-separated) to
// override this list entirely.
const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS ||
    "https://bootybandsfitness.com,https://www.bootybandsfitness.com,https://booty-bands-fitness-2026-7hia.vercel.app,http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

const PRODUCT_CATALOG = {
  "starter-kit-fabric-bands": {
    name: "Booty Bands Fitness Starter Kit - 3 Non-Slip Fabric Resistance Bands",
    unitAmount: 3999,
  },
  "latex-5-level-band-set": {
    name: "Booty Bands Fitness Latex Resistance Bands - 5 Level Workout Set",
    unitAmount: 2999,
  },
  "full-body-training-bundle": {
    name: "Booty Bands Fitness Full Body Training Bundle - Resistance Bands With Handles",
    unitAmount: 4999,
  },
};

/* =========================================================
   BREVO EMAIL HELPERS
========================================================= */

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function formatUsd(amountInCents) {
  if (!Number.isFinite(amountInCents)) {
    return "—";
  }

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(amountInCents / 100);
}

function describeOrderItems(metadataItems) {
  if (!metadataItems) {
    return [];
  }

  return String(metadataItems)
    .split(",")
    .map((entry) => {
      const [productId, rawQuantity] = entry.split(":");
      const quantity = Number.parseInt(rawQuantity, 10);
      const product = PRODUCT_CATALOG[productId];

      return {
        productId,
        name: product?.name || productId,
        quantity:
          Number.isInteger(quantity) && quantity > 0
            ? quantity
            : 1,
      };
    })
    .filter((item) => item.productId);
}

function postJsonToBrevo(payload) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify(payload);

    const request = https.request(
      {
        hostname: "api.brevo.com",
        path: "/v3/smtp/email",
        method: "POST",
        headers: {
          accept: "application/json",
          "api-key": brevoApiKey,
          "content-type": "application/json",
          "content-length": Buffer.byteLength(body),
        },
        timeout: 5000,
      },
      (response) => {
        let responseBody = "";

        response.setEncoding("utf8");
        response.on("data", (chunk) => {
          responseBody += chunk;
        });

        response.on("end", () => {
          if (
            response.statusCode >= 200 &&
            response.statusCode < 300
          ) {
            return resolve({
              statusCode: response.statusCode,
              body: responseBody,
            });
          }

          return reject(
            new Error(
              `Brevo API returned ${response.statusCode}: ${responseBody}`
            )
          );
        });
      }
    );

    request.on("timeout", () => {
      request.destroy(
        new Error("Brevo API request timed out.")
      );
    });

    request.on("error", reject);
    request.write(body);
    request.end();
  });
}

async function sendOrderConfirmationEmail(session) {
  if (!brevoApiKey || !brevoSenderEmail) {
    throw new Error(
      "Brevo email configuration is incomplete."
    );
  }

  const customerEmail =
    session.customer_details?.email ||
    session.customer_email;

  if (!customerEmail) {
    throw new Error(
      "Stripe Checkout session does not contain a customer email."
    );
  }

  const customerName =
    session.customer_details?.name || "Customer";

  const items = describeOrderItems(
    session.metadata?.items
  );

  const amount = formatUsd(session.amount_total);
  const orderReference = session.id;

  const itemRows =
    items.length > 0
      ? items
        .map(
          (item) => `
              <tr>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;">
                  ${escapeHtml(item.name)}
                </td>
                <td style="padding:10px 0;border-bottom:1px solid #e5e7eb;text-align:right;">
                  Qty ${escapeHtml(item.quantity)}
                </td>
              </tr>`
        )
        .join("")
      : `
          <tr>
            <td style="padding:10px 0;">
              Your Booty Bands Fitness order
            </td>
            <td></td>
          </tr>`;

  const textItems =
    items.length > 0
      ? items
        .map(
          (item) =>
            `- ${item.name} (Qty ${item.quantity})`
        )
        .join("\n")
      : "- Your Booty Bands Fitness order";

  const htmlContent = `
    <!doctype html>
    <html>
      <body style="margin:0;padding:0;background:#f5f5f5;font-family:Arial,Helvetica,sans-serif;color:#111827;">
        <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
          <div style="background:#111111;color:#ffffff;padding:26px 28px;border-radius:14px 14px 0 0;text-align:center;">
            <div style="font-size:14px;letter-spacing:2px;text-transform:uppercase;">
              Booty Bands Fitness
            </div>
            <h1 style="margin:12px 0 0;font-size:28px;">
              Order confirmed 🎉
            </h1>
          </div>

          <div style="background:#ffffff;padding:30px 28px;border-radius:0 0 14px 14px;">
            <p style="font-size:16px;line-height:1.6;margin-top:0;">
              Hi ${escapeHtml(customerName)},
            </p>

            <p style="font-size:16px;line-height:1.6;">
              Thank you for your order. Your payment was successful and we're preparing your Booty Bands Fitness order.
            </p>

            <table style="width:100%;border-collapse:collapse;margin:24px 0;">
              <tbody>
                ${itemRows}
              </tbody>
            </table>

            <div style="background:#f9fafb;border-radius:10px;padding:18px;margin:22px 0;">
              <div style="margin-bottom:8px;">
                <strong>Total paid:</strong> ${escapeHtml(amount)}
              </div>
              <div style="word-break:break-all;">
                <strong>Order reference:</strong> ${escapeHtml(orderReference)}
              </div>
            </div>

            <p style="font-size:15px;line-height:1.6;">
              You'll receive shipping and tracking updates as soon as your order ships.
            </p>

            <p style="font-size:15px;line-height:1.6;">
              Questions? Reply to this email or contact
              <a href="mailto:${escapeHtml(
    brevoSenderEmail
  )}" style="color:#111827;">
                ${escapeHtml(brevoSenderEmail)}
              </a>.
            </p>

            <p style="margin-bottom:0;font-size:15px;line-height:1.6;">
              Thank you,<br>
              <strong>Booty Bands Fitness</strong>
            </p>
          </div>
        </div>
      </body>
    </html>
  `;

  const textContent = [
    `Hi ${customerName},`,
    "",
    "Thank you for your order. Your payment was successful and we're preparing your Booty Bands Fitness order.",
    "",
    "Items:",
    textItems,
    "",
    `Total paid: ${amount}`,
    `Order reference: ${orderReference}`,
    "",
    "You'll receive shipping and tracking updates as soon as your order ships.",
    "",
    `Questions? Reply to this email or contact ${brevoSenderEmail}.`,
    "",
    "Thank you,",
    "Booty Bands Fitness",
  ].join("\n");

  return postJsonToBrevo({
    sender: {
      name: brevoSenderName,
      email: brevoSenderEmail,
    },
    to: [
      {
        email: customerEmail,
        name: customerName,
      },
    ],
    replyTo: {
      email: brevoSenderEmail,
      name: brevoSenderName,
    },
    subject:
      "Your Booty Bands Fitness order is confirmed 🎉",
    htmlContent,
    textContent,
  });
}

function normalizeCart(cart) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error("Cart is empty.");
  }

  return cart.map((item) => {
    const productId = String(item.productId || item.slug || item.id || "");
    const product = PRODUCT_CATALOG[productId];
    const quantity = Number.parseInt(item.quantity, 10);

    if (!product) {
      throw new Error(`Unknown product: ${productId}`);
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new Error("Invalid quantity.");
    }

    return { productId, product, quantity };
  });
}

app.disable("x-powered-by");

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    stripeMode: stripeSecretKey?.startsWith("sk_live_") ? "live" : "test-or-missing",
    stripeConfigured: Boolean(stripeSecretKey),
    webhookConfigured: Boolean(stripeWebhookSecret),
    brevoConfigured: Boolean(brevoApiKey && brevoSenderEmail),
    siteUrl: SITE_URL,
    corsRestricted: Boolean(process.env.ALLOWED_ORIGINS),
  });
});

// IMPORTANT: this route must be registered with express.raw() BEFORE
// app.use(express.json()) below, since Stripe's signature verification
// needs the exact raw request bytes — not a parsed object.
app.post("/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  if (!stripeWebhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is missing.");
    return res.status(503).json({ error: "Webhook is not configured." });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      stripeWebhookSecret
    );
  } catch (error) {
    console.warn("Rejected Stripe webhook:", error.message);
    return res.status(400).json({ error: "Invalid webhook signature." });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("NEW ORDER RECEIVED:");
    console.log({
      stripeSessionId: session.id,
      email: session.customer_details?.email,
      name: session.customer_details?.name,
      amount: session.amount_total ? session.amount_total / 100 : null,
      address: session.customer_details?.address,
      phone: session.customer_details?.phone,
      items: session.metadata?.items,
    });

    try {
      const brevoResponse = await sendOrderConfirmationEmail(session);
      console.log("ORDER CONFIRMATION EMAIL SENT:", {
        stripeSessionId: session.id,
        email: session.customer_details?.email || session.customer_email,
        brevoStatus: brevoResponse.statusCode,
      });
    } catch (error) {
      console.error("ORDER CONFIRMATION EMAIL FAILED:", {
        stripeSessionId: session.id,
        message: error.message,
      });
    }
  }

  return res.json({ received: true });
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error("Origin is not allowed by CORS."));
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json({ limit: "20kb" }));

app.post("/create-checkout-session", async (req, res) => {
  try {
    if (!stripeSecretKey) {
      return res.status(503).json({ error: "Checkout is temporarily unavailable." });
    }

    const normalizedCart = normalizeCart(req.body.cart);

    // Free standard shipping on $50+ subtotals (matches the site's
    // "Free Shipping on $50+" promise). Calculated server-side from the
    // authoritative PRODUCT_CATALOG prices — never trust a client-sent total.
    const FREE_SHIPPING_THRESHOLD = 5000; // $50.00, in cents
    const cartSubtotal = normalizedCart.reduce(
      (sum, { product, quantity }) => sum + product.unitAmount * quantity,
      0
    );
    const qualifiesForFreeShipping = cartSubtotal >= FREE_SHIPPING_THRESHOLD;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      allow_promotion_codes: true,

      line_items: normalizedCart.map(({ product, quantity }) => ({
        price_data: {
          currency: "usd",
          product_data: { name: product.name },
          unit_amount: product.unitAmount,
        },
        quantity,
      })),

      phone_number_collection: { enabled: true },

      shipping_address_collection: {
        allowed_countries: ["US"],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: qualifiesForFreeShipping ? 0 : 500,
              currency: "usd",
            },
            display_name: qualifiesForFreeShipping
              ? "Standard Shipping (4-7 business days) — FREE"
              : "Standard Shipping (4-7 business days)",
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1000, currency: "usd" },
            display_name: "Express Shipping (1-2 business days)",
          },
        },
      ],

      metadata: {
        source: "booty-bands-fitness-2026",
        items: normalizedCart
          .map(({ productId, quantity }) => `${productId}:${quantity}`)
          .join(","),
      },

      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    const isCartError =
      error.message === "Cart is empty." ||
      error.message === "Invalid quantity." ||
      error.message?.startsWith("Unknown product:");

    res.status(isCartError ? 400 : 500).json({
      error: isCartError
        ? error.message
        : "Something went wrong starting checkout. Please try again.",
    });
  }
});

app.use((error, req, res, next) => {
  if (error.message === "Origin is not allowed by CORS.") {
    return res.status(403).json({ error: "Origin is not allowed." });
  }

  console.error("Unhandled server error:", error);
  return res.status(500).json({ error: "Internal server error." });
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
