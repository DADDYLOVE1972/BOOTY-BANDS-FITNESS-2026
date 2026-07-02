import { featuredProducts } from "../data/products";

function Products({ setCart }) {
  const addToCart = (item) => {
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
    <section id="products" className="py-16 md:py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-black mb-10 md:mb-16">
          Shop All Bands
        </h2>

        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 list-none p-0 m-0">
          {featuredProducts.map((item) => (
            <li key={item.id}>
              <article className="group h-full bg-white rounded-3xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">
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

                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>

                  <p className="text-gray-500 mb-2">{item.description}</p>

                  <p className="text-yellow-400 mb-2" aria-label="5 out of 5 stars">
                    ★★★★★
                  </p>

                  <p className="text-lg font-semibold mb-4">${item.price}</p>

                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 hover:scale-105 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    aria-label={`Add ${item.name} to cart — $${item.price}`}
                  >
                    Add to Cart
                  </button>

                  <p className="text-xs text-red-500 mt-2 animate-pulse">
                    🔥 Only a few left in stock
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    ✔ Secure Checkout • ✔ 30-Day Guarantee
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Products;
