import React from "react";
import { useParams } from "react-router-dom";

const ProductPage = ({ cartItems, setCartItems }) => {

  const { name } = useParams();

  const addToCart = () => {

    const newItem = {
      name: name,
      price: 29
    };

    setCartItems([...cartItems, newItem]);
  };

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-4xl font-bold mb-4">
          {name}
        </h1>

        <p className="text-gray-400 mb-6">
          Premium resistance bands designed for serious workouts.
        </p>

        <button
          onClick={addToCart}
          className="bg-cyan-500 hover:bg-cyan-400 text-black px-6 py-3 rounded-lg font-bold"
        >
          ADD TO CART
        </button>

      </div>

    </div>
  );
};

export default ProductPage;