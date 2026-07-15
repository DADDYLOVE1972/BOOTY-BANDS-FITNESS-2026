import { memo } from "react";

function EmailCapture() {
  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <section aria-labelledby="email-capture-heading" className="bg-black px-6 py-24 md:py-36">
      <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-white text-black px-7 py-14 md:px-16 md:py-20 shadow-2xl shadow-white/10">
        <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="text-center lg:text-left">
            <h2 id="email-capture-heading" className="text-4xl md:text-6xl font-extrabold tracking-tight">
              Get 10% OFF Your First Order
            </h2>
            <p id="email-capture-description" className="mt-6 text-gray-600 text-xl md:text-2xl leading-relaxed">
              Join our community and receive exclusive offers.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex w-full max-w-3xl mx-auto lg:mx-0 flex-col sm:flex-row gap-4 md:gap-5">
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
              className="min-h-[4.5rem] flex-1 rounded-full border border-gray-200 px-8 text-lg md:text-xl text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
            <button
              type="submit"
              className="min-h-[4.5rem] rounded-full bg-black px-10 md:px-12 font-extrabold uppercase tracking-[0.12em] text-white text-base md:text-lg transition hover:scale-[1.02] hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
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
