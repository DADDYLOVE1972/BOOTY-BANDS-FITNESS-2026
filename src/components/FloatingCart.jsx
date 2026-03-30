import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const FloatingCart = ({ setIsCartOpen }) => {

  const { cartItems } = useContext(CartContext);

  return (
    <button
      onClick={() => setIsCartOpen(true)}
      className="fixed bottom-6 right-6 bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-4 rounded-full font-bold shadow-lg shadow-cyan-500/40 transition transform hover:scale-110 z-50"
    >
      Cart ({cartItems.length})
    </button>
  );

};

export default FloatingCart;