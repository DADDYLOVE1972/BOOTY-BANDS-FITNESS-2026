import { featuredProducts } from "../data/products";
import { homepageConfig } from "../config/homepage";
import { addItemToCart } from "../utils/cart";
import { memo } from "react";

function FeaturedProducts({ setCart }) {
  const { eyebrow, heading, subheading } = homepageConfig.featuredProducts;

  const shopNow = (item) => {
    addItemToCart(setCart, item);
  };

  return (
    <section
      id="featured-products"
      aria-labelledby="featured-products-heading"
      className="py-12 md:py-16 px-6 bg-white text-black"
    >
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-xs md:text-sm font-extrabold tracking-[0.24em] uppercase text-gray-500 mb-3">
          {eyebrow}
        </p>
        <h2
          id="featured-products-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
        >
          {heading}
        </h2>
        <p className="mt-3 text-gray-600 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-8 md:mb-10">
          {subheading}
        </p>

        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 list-none p-0 m-0 items-stretch">
          {featuredProducts.map((item) => (
            <li key={item.id} className="h-full">
              <article className="group h-full flex flex-col bg-white rounded-3xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">
                <div className="bg-gray-100 p-8 flex items-center justify-center h-64 relative">
                  <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                    {item.tag}
                  </span>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="max-h-40 object-contain transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col flex-1 p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    {item.description}
                  </p>

                  <p
                    className="text-yellow-400 mb-2"
                    aria-label="5 out of 5 stars"
                  >
                    {"\u2605".repeat(5)}
                  </p>

                  {item.features?.length > 0 && (
                    <ul className="text-left text-gray-700 mb-3 space-y-1.5 text-sm">
                      {item.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-2"
                        >
                          <span className="text-black font-black">
                            {"\u2713"}
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto">
                    {item.compareAtPrice && (
                      <p className="text-gray-400 line-through text-sm">
                        ${item.compareAtPrice}
                      </p>
                    )}
                    <p className="text-lg font-semibold mb-4">
                      ${item.price}
                    </p>

                    <button
                      type="button"
                      onClick={() => shopNow(item)}
                      
                      className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 hover:scale-105 transition duration-200"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
      
      </section>
  );
}

export default memo(FeaturedProducts);
