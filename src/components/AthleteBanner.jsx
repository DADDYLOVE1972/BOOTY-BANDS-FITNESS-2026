import React from "react";

const AthleteBanner = () => {
  return (
    <section className="relative bg-[url('/athlete.jpg')] bg-cover bg-center h-[500px] flex items-center justify-center">

      <div className="absolute inset-0 bg-black/60"></div>

      <div className="relative text-center text-white px-6">

        <h2 className="text-4xl md:text-6xl font-bold mb-4">
          Train Like an Athlete
        </h2>

        <p className="text-lg md:text-xl mb-6">
          Push harder. Build stronger glutes.
        </p>

        <button className="bg-cyan-500 hover:bg-cyan-400 text-black px-8 py-3 rounded-lg font-bold transition">
          SHOP NOW
        </button>

      </div>

    </section>
  );
};

export default AthleteBanner;