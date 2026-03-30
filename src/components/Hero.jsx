function Hero() {
  return (
    <section className="relative bg-black text-white min-h-screen flex items-center justify-center text-center px-6">
      
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black"></div>

      <div className="relative max-w-4xl">
        
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
          Sculpt Your Body.
          <br />
          Own Your Strength.
        </h1>

        <p className="text-gray-300 text-lg mb-8">
          Premium resistance bands built for serious results.
        </p>

        <button className="bg-white text-black px-10 py-4 rounded-full text-lg font-semibold hover:scale-105 transition duration-200">
          Shop Now
        </button>

      </div>

    </section>
  );
}

export default Hero;