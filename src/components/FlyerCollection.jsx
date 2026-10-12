import React from "react";
import { Link } from "react-router-dom";

const collections = [
  { name: "Fabric Booty Bands 3-Pack", subtitle: "Three resistance levels", image: "/band1.png" },
  { name: "Latex Resistance Bands", subtitle: "Five resistance levels", image: "/band2.png" },
  { name: "Full Body Training Bundle", subtitle: "Accessories for full-body workouts", image: "/band3.png" },
];

export default function FlyerCollection() {
  return (
    <section aria-labelledby="flyer-collection" className="bg-[#0b0b0d] px-5 py-16 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-bold uppercase tracking-[.28em] text-[#ff4da1]">Train anywhere. Build strength.</p>
        <h2 id="flyer-collection" className="mt-3 text-center text-4xl font-black uppercase md:text-6xl">Find your <span className="text-[#ff4da1]">strength</span></h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-gray-300">Explore resistance bands for glutes, strength training, and full-body workouts.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {collections.map((product) => (
            <article key={product.name} className="overflow-hidden rounded-2xl border border-[#ff4da1]/30 bg-[#17171b]">
              <div className="flex aspect-[4/3] items-center justify-center bg-white p-6">
                <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold">{product.name}</h3>
                <p className="mt-2 text-gray-300">{product.subtitle}</p>
                <Link to="/shop" className="mt-6 block rounded-full bg-[#ff2791] px-6 py-3 text-center font-bold text-white transition hover:bg-[#d91877]">Shop collection</Link>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gray-400">Final prices and availability are shown at checkout.</p>
      </div>
    </section>
  );
}
