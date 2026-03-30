import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const CartDrawer = ({ isOpen, setIsOpen }) => {

  const { cartItems, removeFromCart } = useContext(CartContext);

  return (
    <div
      className={`fixed top-0 right-0 h-full w-96 bg-black border-l border-gray-800 shadow-2xl transform transition-transform duration-300 z-50 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >

      <div className="p-6 flex justify-between items-center border-b border-gray-800">
        <h2 className="text-xl font-bold">Your Cart</h2>

        <button
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white"
        >
          ✕
        </button>
      </div>

      <div className="p-6 space-y-4">

        {cartItems.length === 0 && (
          <p className="text-gray-400">Your cart is empty</p>
        )}

        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center border-b border-gray-800 pb-3"
          >
            <span>{item.name}</span>

            <button
              onClick={() => removeFromCart(index)}
              className="text-red-400 hover:text-red-300"
            >
              Remove
            </button>
          </div>
        ))}

      </div>

    </div>
  );
};

export default CartDrawer;