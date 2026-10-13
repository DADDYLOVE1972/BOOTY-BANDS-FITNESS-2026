import React from "react";

const products = [
  {
    name: "Full Body Training Bundle",
    subtitle: "Resistance bands with handles for full-body training",
    price: "$49.99",
    image: "https://cdn.shopify.com/s/files/1/0786/0217/4691/files/band1.png?v=1775957868",
    url: "https://shop.bootybandsfitness.com/products/booty-bands-fitness-full-body-training-bundle",
  },
  {
    name: "Fabric 3-Pack Starter Kit",
    subtitle: "Three resistance levels for glute and leg workouts",
    price: "$39.99",
    image: "https://cdn.shopify.com/s/files/1/0786/0217/4691/files/IMG_2730.jpg?v=1781832190",
    url: "https://shop.bootybandsfitness.com/products/booty-bands-fitness-starter-kit",
  },
  {
    name: "Latex 5-Level Set",
    subtitle: "Five resistance levels for flexible training",
    price: "$29.99",
    image: "https://cdn.shopify.com/s/files/1/0786/0217/4691/files/IMG_2724.jpg?v=1781829440",
    url: "https://shop.bootybandsfitness.com/products/booty-bands-fitness-latex-resistance-bands",
  },
];

export default function FlyerCollection() {
  return (
    <section aria-labelledby="flyer-collection" className="bg-[#0b0b0d] px-5 py-16 text-white md:px-10">
      <div className="mx-auto max-w-7xl">
        <p className="text-center text-sm font-bold uppercase tracking-[.28em] text-[#ff4da1]">Train anywhere. Build strength.</p>
        <h2 id="flyer-collection" className="mt-3 text-center text-4xl font-black uppercase md:text-6xl">Find your <span className="text-[#ff4da1]">strength</span></h2>
        <p className="mx-auto mt-4 max-w-xl text-center text-gray-300">Explore resistance bands for glutes, strength training, and full-body workouts.</p>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {products.map((product) => (
            <article key={product.name} className="overflow-hidden rounded-2xl border border-[#ff4da1]/30 bg-[#17171b]">
              <div className="flex aspect-[4/3] items-center justify-center bg-white p-6">
                <img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-contain" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-extrabold">{product.name}</h3>
                <p className="mt-2 text-gray-300">{product.subtitle}</p>
                <p className="mt-3 text-xl font-bold">{product.price}</p>
                <a href={product.url} className="mt-6 block rounded-full bg-[#ff2791] px-6 py-3 text-center font-bold text-white transition hover:bg-[#d91877]">View product on Shopify</a>
              </div>
            </article>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-gray-400">Current prices and availability are confirmed on the Shopify product page.</p>
      </div>
    </section>
  );
}
