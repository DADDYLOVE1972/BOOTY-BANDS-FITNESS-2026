import { useEffect, useState } from "react";

function Success() {
  const [orderId, setOrderId] = useState("");

  useEffect(() => {
    // Generate simple order ID (you can replace later with Stripe real ID)
    const id = "Booty Bands Fitness-" + Math.floor(100000 + Math.random() * 900000);
    setOrderId(id);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6">

      {/* 🏷 BRAND MARK */}
      <span className="mb-8 inline-block rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] backdrop-blur-md">
        Booty Bands Fitness
      </span>

      {/* 🎉 TITLE */}
      <h1 className="text-5xl font-bold mb-4">
        🎉 Thank You for Your Order!
      </h1>

      {/* 📦 ORDER INFO */}
      <p className="text-lg text-gray-300 mb-2">
        Your payment was successful and your order is being prepared 💪
      </p>

      <p className="text-sm text-gray-400 mb-6">
        Order ID: <span className="text-white font-semibold">{orderId}</span>
      </p>

      {/* 🚚 SHIPPING UPDATE MESSAGE */}
      <p className="text-sm text-gray-400 mb-2">
        📦 You'll receive an email with tracking and shipping updates as soon as your order ships.
      </p>

      {/* 📧 EMAIL MESSAGE */}
      <p className="text-sm text-gray-400 mb-6">
        📧 A confirmation email has been sent to you.
      </p>

      {/* 🔥 UPSSELL */}
      <div className="bg-gray-900 p-6 rounded-xl mb-6 max-w-md">
        <h2 className="text-xl font-semibold mb-2">
          🔥 Special Offer Just for You
        </h2>

        <p className="text-gray-400 text-sm mb-4">
          Use Discount Code BOOTY20 for 20% off your next set of bands.
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
      <button
        onClick={() => window.location.href = "/"}
        className="text-sm text-gray-400 underline hover:text-white"
      >
        Back to Home
      </button>

    </div>
  );
}

export default Success;
