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
      className="relative min-h-[108vh] flex items-center justify-center text-white text-center overflow-hidden px-6 py-28 md:py-36"
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
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 max-w-6xl px-2 mx-auto">
        <h1 className="text-6xl md:text-8xl xl:text-[7.75rem] font-extrabold leading-[0.92] tracking-tight">
          Build Stronger Glutes.
          <br />
          Train Anywhere.
        </h1>

        <p className="mt-8 md:mt-10 text-xl md:text-3xl text-gray-100 max-w-4xl mx-auto leading-relaxed">
          Premium resistance bands designed to sculpt, strengthen, and elevate
          your workouts wherever life takes you.
        </p>

        <div className="mt-12 md:mt-14 flex flex-col sm:flex-row justify-center gap-5 md:gap-7">
          <button
            onClick={scrollToProducts}
            className="bg-white text-black px-12 md:px-16 py-5 md:py-6 rounded-full font-extrabold text-xl md:text-2xl shadow-2xl shadow-white/20 hover:bg-cyan-400 hover:scale-105 transition-all duration-300"
          >
            Shop Now
          </button>

          <button
            onClick={() =>
              document.getElementById("videos")?.scrollIntoView({
                behavior: "smooth",
              })
            }
            className="border-2 border-white px-12 md:px-16 py-5 md:py-6 rounded-full font-extrabold text-xl md:text-2xl hover:bg-white hover:text-black hover:scale-105 transition-all duration-300"
          >
            View Workouts
          </button>
        </div>

        <p className="mt-10 md:mt-12 text-lg md:text-xl text-gray-100 leading-8 md:leading-9 font-semibold">
          {"\u2605".repeat(5)} Trusted by 1,000+ Customers
          <br />
          30-Day Money-Back Guarantee {"\u2022"} Fast Shipping Across the USA
        </p>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-44 bg-gradient-to-b from-transparent to-black z-20" />
    </section>
  );
}

export default Hero;
