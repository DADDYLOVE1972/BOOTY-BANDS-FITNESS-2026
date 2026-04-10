import Navbar from "../components/Navbar";
import CartPanel from "../components/CartPanel";
import Hero from "../components/Hero";
import WhyChoose from "../components/WhyChoose";
import Products from "../components/Products";
import Reviews from "../components/Reviews";
import Footer from "../components/Footer";
import { useState } from "react";

function Home() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black text-white">

      <Navbar cartCount={cart.length} setOpen={setOpen} />

      <main className="pt-20">
        <Hero />

        <div className="text-center py-6 bg-black text-white">
          <p className="text-sm">
            ⭐ 4.8/5 Rating • 1,000+ Happy Customers • Free Shipping Available
          </p>
        </div>

        <WhyChoose />

        <div className="bg-gray-100 text-black">
          <Products setCart={setCart} />
        </div>

        <Reviews />
      </main>

      <Footer />

      <CartPanel 
        open={open} 
        setOpen={setOpen} 
        cart={cart} 
        setCart={setCart}
      />
    </div>
  );
}

export default Home;