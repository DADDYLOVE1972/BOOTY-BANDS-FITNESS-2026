function EmailCapture() {
  return (
    <section className="bg-black px-6 py-20 md:py-28">
      <div className="max-w-6xl mx-auto rounded-[2rem] bg-white text-black px-7 py-12 md:px-14 md:py-16 shadow-2xl shadow-white/10">
        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="text-center lg:text-left">
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight">
              Get 10% OFF Your First Order
            </h2>
            <p className="mt-5 text-gray-600 text-lg md:text-xl">
              Join our community and receive exclusive offers.
            </p>
          </div>

          <form className="flex w-full max-w-2xl mx-auto lg:mx-0 flex-col sm:flex-row gap-4">
            <label className="sr-only" htmlFor="email-capture">
              Email address
            </label>
            <input
              id="email-capture"
              type="email"
              placeholder="Enter your email"
              className="min-h-16 flex-1 rounded-full border border-gray-200 px-7 text-base md:text-lg text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10"
            />
            <button
              type="submit"
              className="min-h-16 rounded-full bg-black px-10 font-extrabold uppercase tracking-[0.12em] text-white transition hover:scale-[1.02] hover:bg-gray-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default EmailCapture;
