import { useSearchParams } from "react-router-dom";

function Success() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6 py-16">

      {/* 🏷 BRAND MARK */}
      <span className="mb-8 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] backdrop-blur-md">
        Booty Bands Fitness
      </span>

      {/* 🎉 TITLE */}
      <h1 className="text-4xl md:text-5xl font-bold mb-4">
        🎉 Thank You for Your Order!
      </h1>

      <p className="text-lg text-gray-300 mb-2 max-w-md">
        Your payment was successful and your order is being prepared 💪
      </p>

      {/* Real Stripe session reference — only shows if Stripe actually
          passed one back (see the success_url note below) */}
      {sessionId && (
        <p className="text-sm text-gray-400 mb-6 max-w-md break-all">
          Order Reference: <span className="text-white font-semibold">{sessionId}</span>
        </p>
      )}

      {/* 🚚 SHIPPING UPDATE MESSAGE */}
      <p className="text-sm text-gray-400 mb-2 max-w-md">
        📦 You'll receive an email with tracking and shipping updates as soon as your order ships.
      </p>

      {/* 📧 EMAIL MESSAGE */}
      <p className="text-sm text-gray-400 mb-10 max-w-md">
        📧 A confirmation email has been sent to the address you provided at checkout.
      </p>

      {/* 🛡 TRUST BADGES */}
      <div className="grid grid-cols-3 gap-3 md:gap-4 mb-10 max-w-lg w-full">
        <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur-md">
          <p className="text-2xl">🔒</p>
          <p className="mt-2 font-bold text-xs md:text-sm">Secure Payment</p>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur-md">
          <p className="text-2xl">🛡️</p>
          <p className="mt-2 font-bold text-xs md:text-sm">30-Day Guarantee</p>
        </div>
        <div className="rounded-xl border border-white/15 bg-white/10 px-3 py-4 backdrop-blur-md">
          <p className="text-2xl">🚚</p>
          <p className="mt-2 font-bold text-xs md:text-sm">Fast USA Shipping</p>
        </div>
      </div>

      {/* 🔥 UPSELL */}
      <div className="bg-gray-900 p-6 rounded-xl mb-6 max-w-md">
        <h2 className="text-xl font-semibold mb-2">
          🔥 Special Offer Just for You
        </h2>

        <p className="text-gray-400 text-sm mb-4">
          Get 20% OFF your next set of bands. Limited time only!
        </p>

        <button
          onClick={() => window.location.href = "/shop"}
          className="bg-white text-black px-6 py-2 rounded-full hover:scale-105 transition"
        >
          Shop Again →
        </button>
      </div>

      {/* 🛍 CONTINUE SHOPPING */}
      <button
        onClick={() => window.location.href = "/shop"}
        className="mb-4 border border-white/30 text-white px-6 py-2 rounded-full hover:bg-white hover:text-black transition"
      >
        Continue Shopping
      </button>

      {/* 🔙 BACK HOME */}
      <a
        href="/"
        className="text-sm text-gray-400 underline hover:text-white"
      >
        Back to Home
      </a>

    </div>
  );
}

export default Success;