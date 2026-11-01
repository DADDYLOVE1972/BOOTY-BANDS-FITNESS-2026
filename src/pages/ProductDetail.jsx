import { useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { products } from "../data/products";
import { CartContext } from "../context/CartContext";

export default function ProductDetail() {
  const { productId } = useParams();
  const product = products.find((item) => item.id === productId);
  const { setCart } = useContext(CartContext);

  useEffect(() => {
    if (!product) return;
    const title = product.name + " | Booty Bands Fitness";
    const description = product.description;
    document.title = title;
    const upsert = (selector, create, value) => {
      let element = document.head.querySelector(selector);
      if (!element) { element = document.createElement("meta"); create(element); document.head.appendChild(element); }
      element.setAttribute("content", value);
    };
    upsert('meta[name="description"]', (el) => el.setAttribute("name", "description"), description);
    upsert('meta[property="og:title"]', (el) => el.setAttribute("property", "og:title"), title);
    upsert('meta[property="og:description"]', (el) => el.setAttribute("property", "og:description"), description);
    let canonical = document.head.querySelector('link[rel="canonical"]');
    if (!canonical) { canonical = document.createElement("link"); canonical.rel = "canonical"; document.head.appendChild(canonical); }
    canonical.href = "https://www.bootybandsfitness.com/products/" + encodeURIComponent(product.id);
    return () => {
      document.title = "Booty Bands Fitness";
      canonical?.remove();
    };
  }, [product]);

  const addToCart = () => {
    if (!product) return;
    setCart((previous) => {
      const existing = previous.find((entry) => entry.id === product.id);
      if (existing) return previous.map((entry) => entry.id === product.id ? { ...entry, quantity: entry.quantity + 1 } : entry);
      return [...previous, { id: product.id, productId: product.productId || product.id, name: product.name, price: product.price, quantity: 1 }];
    });
  };

  if (!product) return (
    <>
      <Navbar />
      <main className="min-h-[70vh] pt-36 px-6 text-center">
        <h1 className="text-3xl font-bold">Product not found</h1>
        <Link className="inline-block mt-6 underline" to="/shop">Return to shop</Link>
      </main>
      <Footer />
    </>
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-white text-gray-900 pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <nav aria-label="Breadcrumb" className="mb-10 text-sm text-gray-600">
            <Link className="hover:underline" to="/">Home</Link> / <Link className="hover:underline" to="/shop">Shop</Link> / <span>{product.name}</span>
          </nav>
          <div className="grid md:grid-cols-2 gap-10 lg:gap-16 items-start">
            <div className="bg-gray-100 rounded-3xl p-8 md:p-12 flex justify-center items-center min-h-[350px]">
              <img src={product.img} alt={product.name} className="w-full max-h-[480px] object-contain" />
            </div>
            <div>
              <span className="inline-block bg-black text-white text-xs tracking-widest rounded-full px-4 py-2 mb-5">{product.tag}</span>
              <h1 className="text-3xl md:text-5xl font-black leading-tight">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-5">{product.description}</p>
              <div className="mt-7 flex items-baseline gap-4">
                <strong className="text-4xl font-black">${product.price}</strong>
                {product.compareAtPrice && <span className="text-gray-400 line-through">${product.compareAtPrice}</span>}
              </div>
              <h2 className="text-xl font-bold mt-9 mb-4">Product highlights</h2>
              <ul className="space-y-3">
                {product.features?.map((feature) => <li key={feature} className="flex gap-3"><span className="text-green-600 font-bold">✓</span>{feature}</li>)}
              </ul>
              <button type="button" onClick={addToCart} className="mt-9 w-full sm:w-auto min-w-[240px] bg-black text-white rounded-full py-4 px-9 font-bold hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4">Add to Cart</button>
              <p className="mt-4 text-sm text-gray-500">Secure checkout • 30-day guarantee</p>
              <Link to="/shop" className="inline-block mt-7 underline font-semibold">Continue shopping</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
