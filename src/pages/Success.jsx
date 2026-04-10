function Success() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white text-center px-6">

      <h1 className="text-5xl font-bold mb-4">
        🎉 Payment Successful!
      </h1>

      <p className="text-lg text-gray-300 mb-6">
        Your order is confirmed and on the way 💪
      </p>

      <button
        onClick={() => window.location.href = "/"}
        className="bg-white text-black px-8 py-3 rounded-full hover:scale-105 transition"
      >
        Continue Shopping →
      </button>

    </div>
  );
}

export default Success;