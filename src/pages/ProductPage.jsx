import React from "react";
import { useParams } from "react-router-dom";
import { products } from "../data/products";
import { addItemToCart } from "../utils/cart";

const ProductPage = ({ cartItems, setCartItems }) => {

  const { id, name } = useParams();
  const product = products.find((item) => item.id === id || item.id === name);

  const addToCart = () => {
    if (product) {
      addItemToCart(setCartItems, product);
    }
  };

  if (!product) {
    return (
      <div className="bg-black text-white min-h-screen flex items-center justify-center">
        <p>Product not found.</p>
      </div>
    );
  }

  return (
    <div className="bg-black text-white min-h-screen flex items-center justify-center">

      <div className="text-center">

        <h1 className="text-4xl font-bold mb-4">
          {product.name}
        </h1>

        <p className="text-gray-400 mb-6">
          {product.description}
        </p>

        {product.compareAtPrice && (
          <p className="text-gray-500 line-through">
            ${product.compareAtPrice}
          </p>
        )}
        <p className="text-3xl font-bold mb-6">
          ${product.price}
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
