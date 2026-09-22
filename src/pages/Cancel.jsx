import { Link } from "react-router-dom";

function Cancel() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white text-center px-6 py-16">
      <div className="w-full max-w-xl">
        <span className="mb-8 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em]">
          Booty Bands Fitness
        </span>

        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Checkout Cancelled
        </h1>

        <p className="text-lg text-gray-300 mb-3">
          Your order was not completed.
        </p>

        <p className="text-sm text-gray-400 mb-10">
          You have not been charged. Your cart is still available if you would like to return and complete your order.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/shop"
            className="w-full sm:w-auto rounded-full bg-white px-7 py-3 font-bold text-black transition hover:scale-105"
          >
            Return to Shop
          </Link>

          <Link
            to="/"
            className="w-full sm:w-auto rounded-full border border-white/30 px-7 py-3 font-bold text-white transition hover:bg-white hover:text-black"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Cancel;
