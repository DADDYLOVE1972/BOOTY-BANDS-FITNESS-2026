import { useState } from "react";
import Navbar from "./components/Navbar";
import CartPanel from "./components/CartPanel";
import Hero from "./components/Hero";
import WhyChoose from "./components/WhyChoose";
import Products from "./components/Products";
import Reviews from "./components/Reviews";
import Footer from "./components/Footer";

function App() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black text-white">

      {/* NAVBAR */}
      <Navbar cartCount={cart.length} setOpen={setOpen} />

      {/* MAIN CONTENT */}
      <main className="pt-20">
        <Hero />
        <WhyChoose />

        {/* LIGHT SECTION */}
        <div className="bg-gray-100 text-black">
          <Products setCart={setCart} />
        </div>

        <Reviews />
      </main>

      {/* FOOTER */}
      <Footer />

      {/* ✅ ONLY ONE CART PANEL */}
      <CartPanel 
        open={open} 
        setOpen={setOpen} 
        cart={cart} 
        setCart={setCart}
      />

    </div>
  );
}

export default App;