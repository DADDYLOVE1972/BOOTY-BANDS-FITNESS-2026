import athlete from "../assets/athlete.jpg";

function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center text-center text-white">

      {/* Background Image */}
      <img
        src={athlete}
        alt="Workout"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 px-4">

        {/* Badge */}
        <p className="text-sm uppercase tracking-widest mb-4 text-gray-300">
          #1 Resistance Bands
        </p>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl font-extrabold leading-tight">
          Sculpt Your Body. <br /> Own Your Strength.
        </h1>

        {/* Description */}
        <p className="mt-4 text-lg text-gray-200">
          Premium resistance bands built for serious results.
        </p>

        {/* Button */}
        <button
          onClick={() => {
            document.getElementById("products").scrollIntoView({
              behavior: "smooth",
            });
          }}
          className="mt-6 px-8 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition"
        >
          Shop Now →
        </button>
        {/* Urgency */}
        <p className="mt-3 text-sm text-gray-300">
          🔥 Limited stock available
        </p>

      </div>

    </section>
  );
}

export default Hero;