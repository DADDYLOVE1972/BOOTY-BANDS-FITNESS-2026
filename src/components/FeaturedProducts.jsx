import { featuredProducts } from "../data/products";
import { homepageConfig } from "../config/homepage";

function FeaturedProducts({ setCart }) {
  const { eyebrow, heading, subheading } = homepageConfig.featuredProducts;

  const shopNow = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <section
      id="featured-products"
      aria-labelledby="featured-products-heading"
      className="py-24 md:py-32 lg:py-40 px-6 bg-white text-black"
    >
      <div className="max-w-[92rem] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-base md:text-lg font-extrabold tracking-[0.22em] uppercase text-gray-500 mb-5">
            {eyebrow}
          </p>
          <h2
            id="featured-products-heading"
            className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-7 text-gray-600 max-w-4xl mx-auto text-xl md:text-2xl leading-relaxed">
            {subheading}
          </p>
        </div>

        <ul className="grid lg:grid-cols-3 gap-10 xl:gap-12 list-none p-0 m-0">
          {featuredProducts.map((item) => (
            <li key={item.id}>
              <article className="group h-full flex flex-col overflow-hidden rounded-[2rem] bg-white border border-gray-200 shadow-2xl shadow-black/10 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_32px_80px_rgba(0,0,0,0.22)]">
                <div className="relative flex min-h-[380px] md:min-h-[460px] items-center justify-center bg-gray-50 p-10 md:p-12 overflow-hidden">
                  <span className="absolute top-7 left-7 bg-black text-white text-sm md:text-base font-extrabold px-5 py-2 rounded-full tracking-wide">
                    {item.tag}
                  </span>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="max-h-80 md:max-h-96 w-full object-contain transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col flex-1 p-8 md:p-10 text-center">
                  <h3 className="text-3xl md:text-4xl font-extrabold mb-4">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-lg md:text-xl mb-6 leading-relaxed">
                    {item.description}
                  </p>

                  <div
                    className="flex justify-center mb-7 text-yellow-500 text-xl md:text-2xl"
                    aria-label="5 out of 5 stars"
                  >
                    {"\u2605".repeat(5)}
                  </div>

                  {item.features?.length > 0 && (
                    <ul className="text-left text-gray-700 mb-8 space-y-4">
                      {item.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-lg md:text-xl"
                        >
                          <span className="text-black font-black">{"\u2713"}</span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto">
                    <div className="mb-8">
                      <p className="text-gray-400 line-through text-xl md:text-2xl">
                        ${(Number(item.price) + 10).toFixed(2)}
                      </p>
                      <p className="text-5xl md:text-6xl font-black text-black">
                        ${item.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => shopNow(item)}
                      className="w-full bg-black text-white py-5 md:py-6 rounded-full font-extrabold text-xl md:text-2xl shadow-xl shadow-black/20 hover:bg-gray-800 hover:scale-[1.03] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
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

export default FeaturedProducts;
