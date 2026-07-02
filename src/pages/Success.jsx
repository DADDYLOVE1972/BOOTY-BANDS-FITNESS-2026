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

      {/* 🎉 TITLE */}
      <h1 className="text-5xl font-bold mb-4">
        🎉 Payment Successful!
      </h1>

      {/* 📦 ORDER INFO */}
      <p className="text-lg text-gray-300 mb-2">
        Your order is confirmed and being prepared 💪
      </p>

      <p className="text-sm text-gray-400 mb-6">
        Order ID: <span className="text-white font-semibold">{orderId}</span>
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
          Get 20% OFF your next set of bands. Limited time only!
        </p>

        <button
          onClick={() => window.location.href = "/"}
          className="bg-white text-black px-6 py-2 rounded-full hover:scale-105 transition"
        >
          Shop Again →
        </button>
      </div>

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