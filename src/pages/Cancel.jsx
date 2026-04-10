function Success() {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white text-center">
      <div>
        <h1 className="text-4xl font-bold">🎉 Payment Successful!</h1>
        <p className="mt-4 text-lg">
          Your order has been received and is being processed.
        </p>
        <a
          href="/"
          className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-full"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
}

export default Success;