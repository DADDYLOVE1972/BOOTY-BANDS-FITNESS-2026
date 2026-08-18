import { products } from "../data/products";
import { addItemToCart } from "../utils/cart";


function Products({ setCart }) {
  const addToCart = (item) => {
    addItemToCart(setCart, item);
  };

  return (
    <section id="products" className="py-12 md:py-16 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-6xl mx-auto text-center">

        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 list-none p-0 m-0">
          {products.map((item) => (
            <li key={item.id}>
              <article className="group h-full bg-white rounded-3xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02]">
                <div className="bg-gray-100 p-8 flex items-center justify-center h-72 relative">
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

                  <h3 className="text-2xl font-black text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 mb-2">{item.description}</p>

                  <div className="flex justify-center items-center gap-2 mb-3">
                    <span className="text-yellow-400 text-lg">
                      {"★".repeat(5)}
                    </span>
                    <span className="text-sm font-medium text-gray-600">
                      {item.rating} ({item.reviews} Reviews)
                    </span>
                  </div>

                  <div className="mb-4">
                    {item.compareAtPrice && (
                      <p className="text-gray-400 line-through text-sm">
                        ${item.compareAtPrice}
                      </p>
                    )}
                    <p className="text-3xl font-black text-black">${item.price}</p>
                  </div>

                  {item.features?.length > 0 && (
                    <ul className="mb-5 space-y-2 text-sm text-gray-700 text-left">
                      {item.features.map((feature) => (
                        <li key={feature} className="flex items-center gap-2">
                          <span className="text-green-600 font-bold">✓</span>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <hr className="my-5 border-gray-200" />
                  <button
                    type="button"
                    onClick={() => addToCart(item)}
                    className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 hover:scale-105 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2"
                    aria-label={`Add ${item.name} to cart for $${item.price}`}
                  >
                    🛒 Add to Cart
                  </button>

                  <p className="text-xs text-red-500 mt-2 animate-pulse">
                    {"\u{1F525}"} Only a few left in stock
                  </p>

                  <p className="text-xs text-gray-400 mt-1">
                    {"\u2713"} Secure Checkout {"\u2022"} {"\u2713"} 30-Day Guarantee
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
