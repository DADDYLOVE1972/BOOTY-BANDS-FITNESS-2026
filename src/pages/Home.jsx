import Navbar from "../components/Navbar";
import CartPanel from "../components/CartPanel";
import Hero from "../components/Hero";
import FeaturedProducts from "../components/FeaturedProducts";
import EverythingIncluded from "../components/EverythingIncluded";
import TrustBar from "../components/TrustBar";
import WhyChoose from "../components/WhyChoose";
import Products from "../components/Products";
import Reviews from "../components/Reviews";
import FAQ from "../components/FAQ";
import Footer from "../components/Footer";
import About from "../components/About";
import WorkoutVideos from "../components/WorkoutVideos";
import EmailCapture from "../components/EmailCapture";
import { useState } from "react";

function Home() {
  const [cart, setCart] = useState([]);
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-black text-white">
      <Navbar cartCount={cart.length} setOpen={setOpen} />

      <main className="pt-28 lg:pt-20">
        <Hero />
        <TrustBar />
        <FeaturedProducts setCart={setCart} />
        <EverythingIncluded />
        <WhyChoose />

        <div className="bg-gray-100 text-black">
          <Products setCart={setCart} />
        </div>

        <Reviews />
        <About />
        <WorkoutVideos />
        <FAQ />
        <EmailCapture />
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
