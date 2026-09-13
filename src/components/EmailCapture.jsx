import { memo } from "react";

// Real Brevo signup form endpoint (list: "Your first list",
// double opt-in confirmation enabled in Brevo).
const ACTION_URL =
  "https://44c52992.sibforms.com/serve/MUIFAEDxpBfRxJh2GEQ1JKX6kXbsVXDEcvtkiD0S2udPPW_VJ-LapHkcdTdrQPrWh3kNMmyKBuSUgMzalUKWz0-v-Utsjn9oti-US7wMgVm6mm6VgPh0_l-o2KYWp3Q7-28H42MK4B93gYiQ3lodMv-dHhoGghxErFAOfzAJ00pPUnMf-pPFbJFBnU4pRpaK3KkVgBM_BrSJqv4rQQ==";

function EmailCapture() {
  return (
    <section aria-labelledby="email-capture-heading" className="bg-black px-6 py-12 md:py-16">
      <div className="max-w-6xl mx-auto rounded-3xl bg-white text-black px-6 py-8 md:px-10 md:py-10 shadow-lg">
        <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="text-center lg:text-left">
            <h2 id="email-capture-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight">
              Use Discount Code BOOTY20
            </h2>
            <p id="email-capture-description" className="mt-3 text-gray-600 text-sm md:text-base leading-relaxed">
              Save 20% on your first order at checkout.
            </p>
          </div>

          <form
            action={ACTION_URL}
            method="post"
            target="_blank"
            rel="noopener"
            className="flex w-full max-w-3xl mx-auto lg:mx-0 flex-col sm:flex-row gap-4"
          >
            <label className="sr-only" htmlFor="email-capture">
              Email address
            </label>
            <input
              id="email-capture"
              type="email"
              name="EMAIL"
              placeholder="Enter your email"
              autoComplete="email"
              required
              aria-describedby="email-capture-description"
              className="flex-1 rounded-full border border-gray-200 px-6 py-3 text-base text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />

            {/* Honeypot field: real visitors never see or fill this
                (hidden off-screen, removed from tab order). Bots that
                auto-fill every input will fill it, and Brevo silently
                discards the submission as spam. Do not remove or make
                this visible. */}
            <input
              type="text"
              name="email_address_check"
              defaultValue=""
              tabIndex="-1"
              autoComplete="off"
              aria-hidden="true"
              className="absolute left-[-9999px] h-0 w-0 opacity-0"
            />
            <input type="hidden" name="locale" value="en" />
            <input type="hidden" name="html_type" value="simple" />

            <button
              type="submit"
              className="rounded-full bg-black px-8 py-3 font-bold uppercase tracking-[0.1em] text-white text-sm transition hover:scale-[1.02] hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default memo(EmailCapture);
