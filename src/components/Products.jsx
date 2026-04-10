import band1 from "../assets/band1.png";
import band2 from "../assets/band2.png";
import band3 from "../assets/band3.png";

function Products({ setCart }) {
  const items = [
    { id: 1, name: "Beginner Bands", price: 25, img: band1, tag: "Best Seller" },
    { id: 2, name: "Advanced Bands", price: 35, img: band2, tag: "Popular" },
    { id: 3, name: "Pro Bands", price: 45, img: band3, tag: "Elite" },
  ];

  const addToCart = (item) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === item.id);

      if (existing) {
        return prev.map((i) =>
          i.id === item.id
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...item, quantity: 1 }];
    });
  };

  return (
    <section id="products" className="py-28 px-6 bg-gradient-to-b from-gray-50 to-white">  
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-4xl md:text-5xl font-extrabold text-black mb-16">
          Best Sellers
        </h2>

        <div className="grid md:grid-cols-3 gap-12">

          {items.map((item) => (
            <div
              key={item.id}
             className="bg-white rounded-3xl shadow-lg overflow-hidden transition duration-300 hover:shadow-2xl >hover:-translate-y-2 hover:scale-105">
              
              {/* IMAGE */}
              <div className="bg-gray-100 p-8 flex items-center justify-center h-64 relative">
                
                {/* TAG */}
                <span className="absolute top-4 left-4 bg-black text-white text-xs px-3 py-1 rounded-full">
                  {item.tag}
                </span>

                <img
                  src={item.img}
                  alt={item.name}
                  className="max-h-40 object-contain"
                />
              </div>

              {/* CONTENT */}
              <div className="p-6 text-center">
                
                <h3 className="text-xl font-bold mb-2">
                  {item.name}
                </h3>

                <p className="text-gray-500 mb-2">
                  Premium Resistance Set
                </p>

                {/* ⭐ REVIEWS */}
                <p className="text-yellow-400 mb-2">★★★★★</p>

                <p className="text-lg font-semibold mb-4">
                  ${item.price}
                </p>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full bg-black text-white py-3 rounded-full hover:bg-gray-800 hover:scale-105 transition duration-200"
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

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Products;