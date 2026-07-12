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
      className="py-28 md:py-40 lg:py-48 px-5 md:px-8 bg-white text-black"
    >
      <div className="w-full lg:w-[85vw] max-w-[110rem] mx-auto">
        <div className="text-center mb-18 md:mb-24 lg:mb-28">
          <p className="text-lg md:text-xl font-extrabold tracking-[0.24em] uppercase text-gray-500 mb-6">
            {eyebrow}
          </p>
          <h2
            id="featured-products-heading"
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-8 text-gray-600 max-w-5xl mx-auto text-xl md:text-3xl leading-relaxed">
            {subheading}
          </p>
        </div>

        <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-12 xl:gap-14 list-none p-0 m-0 items-stretch">
          {featuredProducts.map((item) => (
            <li key={item.id} className="h-full">
              <article className="group h-full min-h-[820px] md:min-h-[900px] xl:min-h-[960px] flex flex-col overflow-hidden rounded-[2.35rem] bg-white border border-gray-200 shadow-2xl shadow-black/12 transition-all duration-500 ease-out hover:-translate-y-4 hover:shadow-[0_40px_110px_rgba(0,0,0,0.26)]">
                <div className="relative flex min-h-[430px] md:min-h-[520px] xl:min-h-[580px] items-center justify-center bg-gray-50 p-12 md:p-14 xl:p-16 overflow-hidden">
                  <span className="absolute top-8 left-8 bg-black text-white text-base md:text-lg font-extrabold px-6 py-2.5 rounded-full tracking-wide">
                    {item.tag}
                  </span>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="max-h-[23rem] md:max-h-[29rem] xl:max-h-[34rem] w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col flex-1 p-10 md:p-12 xl:p-14 text-center">
                  <h3 className="text-4xl md:text-5xl font-extrabold mb-5 leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-gray-600 text-xl md:text-2xl mb-8 leading-relaxed">
                    {item.description}
                  </p>

                  <div
                    className="flex justify-center mb-9 text-yellow-500 text-2xl md:text-3xl"
                    aria-label="5 out of 5 stars"
                  >
                    {"\u2605".repeat(5)}
                  </div>

                  {item.features?.length > 0 && (
                    <ul className="text-left text-gray-700 mb-10 space-y-5">
                      {item.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-4 text-xl md:text-2xl leading-snug"
                        >
                          <span className="text-black font-black text-2xl">
                            {"\u2713"}
                          </span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-auto">
                    <div className="mb-10">
                      <p className="text-gray-400 line-through text-2xl md:text-3xl">
                        ${(Number(item.price) + 10).toFixed(2)}
                      </p>
                      <p className="text-6xl md:text-7xl xl:text-8xl font-black text-black tracking-tight">
                        ${item.price}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => shopNow(item)}
                      className="w-full bg-black text-white py-6 md:py-7 rounded-full font-extrabold text-2xl md:text-3xl shadow-xl shadow-black/20 hover:bg-gray-900 hover:scale-[1.025] transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-4"
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
