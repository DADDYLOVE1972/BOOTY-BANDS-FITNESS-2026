
import fallback from "../assets/band1.png";
const video = "/workout.mp4";
function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-white text-center overflow-hidden">

      {/* 🎥 VIDEO */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-150 z-0">
        <source src={video} type="video/mp4" />
      </video>

      {/* 🖼️ FALLBACK (ONLY if video fails) */}
      <div
        className="absolute inset-0 bg-cover bg-center z-[-1]"
        style={{ backgroundImage: `url(${fallback})` }}
      ></div>

      {/* 🌑 OVERLAY */}
      <div className="absolute inset-0 bg-black/60 z-10"></div>

      {/* CONTENT */}
      <div className="relative z-20 px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Sculpt Your Body. <br /> Own Your Strength.
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-xl mx-auto">
          Premium resistance bands designed to sculpt, strengthen, and elevate your workouts anywhere.
        </p>

        <button
          onClick={() =>
            document.getElementById("products")?.scrollIntoView({
              behavior: "smooth",
            })
          }
          className="mt-6 bg-white text-black px-8 py-3 rounded-full hover:scale-110 transition duration-300 font-semibold shadow-lg"
        >
          Shop Now & Transform →
        </button>
      </div>
    </section>
  );
}

export default Hero;