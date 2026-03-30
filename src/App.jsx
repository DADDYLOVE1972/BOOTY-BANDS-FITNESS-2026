import { useState } from "react";
import Navbar from "./components/Navbar";
import CartPanel from "./components/CartPanel";
import Hero from "./components/Hero";
import WhyChoose from "./components/WhyChoose";
import Products from "./components/Products";
import Footer from "./components/Footer";
import Reviews from "./components/Reviews";

function App() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white">
  <Navbar cartCount={cart.length} setOpen={setOpen} />
  
  <div className="pt-20">
    <Hero />
    <WhyChoose />
    <Products setCart={setCart} />
    <Reviews />
  </div>

  <CartPanel open={open} setOpen={setOpen} cart={cart} />
</div>
  );
}
export default App;