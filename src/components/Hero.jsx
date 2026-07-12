import fallback from "../assets/band1.jpeg";

const video = "/Hero.mp4";

function Hero() {
  const scrollToProducts = () => {
    document.getElementById("featured-products")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center text-white text-center overflow-hidden"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-110 brightness-75 z-0"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Fallback Image */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${fallback})` }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/80 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-4xl px-6 mx-auto">
        <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold leading-tight">
          Build Stronger Glutes.
          <br />
          Train Anywhere.
        </h1>

        <p className="mt-6 text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto">
          Premium resistance bands designed to sculpt, strengthen, and elevate
          your workouts wherever life takes you.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row justify-center gap-5">
          <button
            onClick={scrollToProducts}
            className="bg-white text-black px-10 py-4 rounded-full font-bold text-lg shadow-2xl hover:bg-cyan-400 hover:scale-105 transition-all duration-300"
          >
            Shop Now
          </button>

          <button
            onClick={() =>
              document.getElementById("videos")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="border-2 border-white px-10 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-black transition-all duration-300"
          >
            View Workouts
          </button>
        </div>

        <p className="mt-8 text-base text-gray-200 leading-7">
          ★★★★★ Trusted by 1,000+ Customers
          <br />
          30-Day Money-Back Guarantee • Fast Shipping Across the USA
        </p>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-b from-transparent to-black z-20" />
    </section>
  );
}

export default Hero;