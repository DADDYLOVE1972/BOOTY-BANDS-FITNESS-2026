function Cancel() {
  return (
    <div className="h-screen flex items-center justify-center bg-black text-white text-center">
      <div>
        <h1 className="text-4xl font-bold">Checkout Cancelled</h1>
        <p className="mt-4 text-lg">
          Your order was not completed and you have not been charged.
        </p>
        <a
          href="/shop"
          className="inline-block mt-6 bg-white text-black px-6 py-3 rounded-full"
        >
          Return to Shop
        </a>
      </div>
    </div>
  );
}

export default Cancel;