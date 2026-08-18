import { memo } from "react";

function EmailCapture() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

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

          <form onSubmit={handleSubmit} className="flex w-full max-w-3xl mx-auto lg:mx-0 flex-col sm:flex-row gap-4">
            <label className="sr-only" htmlFor="email-capture">
              Email address
            </label>
            <input
              id="email-capture"
              type="email"
              name="email"
              placeholder="Enter your email"
              autoComplete="email"
              required
              aria-describedby="email-capture-description"
              className="flex-1 rounded-full border border-gray-200 px-6 py-3 text-base text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
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
