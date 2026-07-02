import React from "react";
import community1 from "../assets/IMG_2708.jpeg";
import community2 from "../assets/IMG_2724.jpeg";
import community3 from "../assets/IMG_2725.jpeg";
import community4 from "../assets/IMG_2726.jpeg";

const Community = () => {
  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-6">

      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          Join the Booty Bands Community
        </h2>

        <p className="text-gray-400 mb-12">
          Thousands of athletes are already training with Booty Bands.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <img
            src={community1}
            alt="Workout"
            className="rounded-lg object-cover h-48 w-full"
          />

          <img
            src={community2}
            alt="Workout"
            className="rounded-lg object-cover h-48 w-full"
          />

          <img
            src={community3}
            alt="Workout"
            className="rounded-lg object-cover h-48 w-full"
          />

          <img
            src={community4}
            alt="Workout"
            className="rounded-lg object-cover h-48 w-full"
          />

        </div>

        <p className="mt-10 text-cyan-400 font-bold text-lg">
          #BOOTYBANDS
        </p>

      </div>

    </section>
  );
};

export default Community;
