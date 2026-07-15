import fallback from "../assets/band1.jpeg";

const video = "/Hero.mp4";

function Hero() {
  const scrollToProducts = () => {
    document.getElementById("featured-products")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  const scrollToVideos = () => {
    document.getElementById("videos")?.scrollIntoView({
      behavior: "smooth",
    });
  };

  return (
    <section
      id="home"
      className="relative min-h-[100svh] flex items-center justify-center overflow-hidden text-white">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="none"
        poster={fallback}
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover scale-105 brightness-50"
      >
        <source src={video} type="video/mp4" />
      </video>

      {/* Fallback */}
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${fallback})` }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/85" />

      {/* Hero Content */}
      <div className="relative z-20 mx-auto flex w-full max-w-7xl flex-col items-center px-6 text-center">

        <span className="mb-6 rounded-full border border-white/20 bg-white/10 px-5 py-2 text-sm font-semibold uppercase tracking-[0.25em] backdrop-blur-md">
          BOOTY BANDS FITNESS
        </span>

        <h1 className="max-w-5xl text-5xl font-black leading-[0.92] tracking-tight sm:text-6xl md:text-7xl lg:text-8xl xl:text-[8rem]">
          Build Stronger
          <br />
          Glutes.
          <br />
          Train Anywhere.
        </h1>

        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-200 sm:text-xl md:text-2xl">
          Sculpt stronger glutes, build total-body strength, and train wherever
          life takes you with premium BOOTY BANDS FITNESS resistance bands
          engineered for comfort, durability, and results.
        </p>

        {/* Buttons */}
        <div className="mt-12 flex flex-col gap-5 sm:flex-row">

          <button
            type="button"
            aria-label="Shop BOOTY BANDS FITNESS®"
            onClick={scrollToProducts}
            className="cursor-pointer rounded-full bg-white px-12 py-5 text-lg font-bold text-black shadow-2xl transition-all duration-300 hover:scale-105 hover:bg-gray-200">
            Shop Now
          </button>

          <button
            type="button"
            aria-label="View workout videos"
            onClick={scrollToVideos}

            className="cursor-pointer rounded-full border-2 border-white px-12 py-5 text-lg font-bold transition-all duration-300 hover:scale-105 hover:bg-white hover:text-black">
            View Workouts
          </button>

        </div>

        {/* Trust Badges */}

        <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4">

          <div className="rounded-xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/15">
            <p className="text-2xl">⭐</p>
            <p className="mt-2 font-bold">5-Star Reviews</p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/15">
            <p className="text-2xl">🚚</p>
            <p className="mt-2 font-bold">Fast USA Shipping</p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/15">
            <p className="text-2xl">🛡️</p>
            <p className="mt-2 font-bold">30-Day Guarantee</p>
          </div>

          <div className="rounded-xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-white/40 hover:bg-white/15">
            <p className="text-2xl">💪</p>
            <p className="mt-2 font-bold">Trusted Workout Equipment</p>
          </div>

        </div>

      </div>

      {/* Bottom Fade */}

      <div className="absolute bottom-0 left-0 h-44 w-full bg-gradient-to-b from-transparent to-black" />
    </section>
  );
}

export default Hero;