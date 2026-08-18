import { useState } from "react";
import Navbar from "../components/Navbar";
import CartPanel from "../components/CartPanel";
import Products from "../components/Products";
import fallback from "../assets/fallbackIMG.jpeg";


export default function Shop() {
    const [cart, setCart] = useState([]);
    const [open, setOpen] = useState(false);

    return (
        <>
            <Navbar cartCount={cart.length} setOpen={setOpen} />

            <main className="min-h-screen bg-white pt-28 lg:pt-20">

                {/* Shop Hero */}
                <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">

                    {/* Background Image */}
                    <img
                        src={fallback}
                        alt="Booty Bands Fitness"
                        className="absolute inset-0 w-full h-full object-cover-object-top"
                    />

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/50">
                    </div>

                    {/* Content */}
                    <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">

                        <span className="inline-block px-6 py-2 rounded-full border border-white/30 bg-white/10 backdrop-blur">
                            BOOTY BANDS FITNESS
                        </span>

                        <h1 className="mt-8 text-5xl md:text-7xl font-black">
                            SHOP ALL
                            <br />
                            BANDS
                        </h1>

                        <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
                            Premium resistance bands engineered for stronger glutes,
                            better workouts, and lasting results.
                        </p>

                    </div>

                </section>

                {/* Products */}
                <Products setCart={setCart} />

            </main>

            <CartPanel
                open={open}
                setOpen={setOpen}
                cart={cart}
                setCart={setCart}
            />
        </>
    );
}