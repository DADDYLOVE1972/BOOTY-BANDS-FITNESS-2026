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
      className="py-16 md:py-24 lg:py-28 px-6 bg-white text-black"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <p className="text-sm md:text-base font-semibold tracking-[0.2em] uppercase text-gray-500 mb-4">
            {eyebrow}
          </p>
          <h2
            id="featured-products-heading"
            className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            {heading}
          </h2>
          <p className="mt-5 text-gray-600 max-w-3xl mx-auto text-base md:text-lg">
            {subheading}
          </p>
        </div>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 list-none p-0 m-0">
          {featuredProducts.map((item) => (
            <li key={item.id}>
              <article className="group h-full flex flex-col bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-gray-200">
                <div className="relative bg-white p-8 md:p-10 flex items-center justify-center aspect-[4/3] overflow-hidden">
                  <span className="absolute top-5 left-5 bg-black text-white text-xs md:text-sm font-semibold px-4 py-1.5 rounded-full tracking-wide">
                    {item.tag}
                  </span>
                  <img
                    src={item.img}
                    alt={item.name}
                    className="max-h-44 md:max-h-56 object-contain transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>

                <div className="flex flex-col flex-1 p-6 md:p-8 text-center">
                  <h3 className="text-xl md:text-2xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-500 text-base mb-4">{item.description}</p>
                  <p className="text-2xl font-extrabold mb-6">${item.price}</p>

                  <button
                    type="button"
                    onClick={() => shopNow(item)}
                    className="mt-auto w-full bg-black text-white py-4 px-8 rounded-full font-semibold text-base md:text-lg transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02] focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    aria-label={`Shop now — ${item.name}, $${item.price}`}
                  >
                    Shop Now
                  </button>
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
