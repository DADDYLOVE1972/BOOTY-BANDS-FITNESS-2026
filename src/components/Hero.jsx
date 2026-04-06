import React, { useEffect, useState } from "react";
import img1 from "../assets/band1.png";
import img2 from "../assets/band2.png";
import img3 from "../assets/band3.png";

const images = [img1, img2, img3];

function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 4000); // smoother timing

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen flex items-center justify-center text-white text-center overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div
        key={index}
        className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 scale-105"
        style={{
          backgroundImage: `url(${images[index]})`,
        }}
      ></div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* CONTENT */}
      <div className="relative z-10 px-6">
        <h1 className="text-4xl md:text-6xl font-bold leading-tight">
          Sculpt Your Body. <br /> Own Your Strength.
        </h1>

        <p className="mt-4 text-lg md:text-xl text-gray-300">
          Train anywhere. Build confidence. Transform your body.
        </p>

       <button
              onClick={() =>
                document.getElementById("products").scrollIntoView({
                  behavior: "smooth",
                })
              }
              className="mt-6 bg-white text-black px-8 py-3 rounded-full hover:scale-110 transition duration-300 font-semibold shadow-lg"
            >
              Shop Now →
        </button>
</div>
    </section>
  );
}

export default Hero;