import { useState } from "react";

function CartPanel({ open, setOpen, cart, setCart }) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  const handleCheckout = async () => {
    if (isCheckingOut) return;

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const response = await fetch(
        "https://booty-bands-fitness-2026-1.onrender.com/create-checkout-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cart: cart.map((item) => ({
              productId: item.productId || item.id,
              quantity: item.quantity,
            })),
          }),
        }
      );

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        setCheckoutError(
          data.error || "Something went wrong starting checkout. Please try again."
        );
        return;
      }

      if (data.url) {
        window.location.href = data.url;
        return;
      }

      setCheckoutError("Something went wrong starting checkout. Please try again.");
    } catch (error) {
      console.error("Checkout error:", error);
      setCheckoutError("Something went wrong starting checkout. Please try again.");
    } finally {
      setIsCheckingOut(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white text-black shadow-2xl p-6 z-50 overflow-y-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={() => setOpen(false)} aria-label="Close cart">
          X
        </button>
      </div>

      {cart.length === 0 && (
        <p className="text-center text-gray-500 mt-10">Your cart is empty</p>
      )}

      {cart.map((item) => (
        <div key={item.id} className="border-b py-4">
          <div className="flex justify-between gap-3 mb-2">
            <span>{item.name}</span>
            <span>${Number(item.price).toFixed(2)}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={() => decreaseQty(item.id)}
                className="px-3 py-1 border rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() => increaseQty(item.id)}
                className="px-3 py-1 border rounded"
              >
                +
              </button>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="text-red-500 text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      ))}

      {cart.length > 0 && (
        <div className="mt-6">
          <div className="flex justify-between font-semibold mb-4">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          {checkoutError && (
            <p className="text-sm text-red-500 text-center mb-3">
              {checkoutError}
            </p>
          )}

          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full bg-black text-white py-3 rounded-full hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isCheckingOut ? "Redirecting..." : "Checkout"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            Secure Checkout
          </p>
        </div>
      )}
    </div>
  );
}

export default CartPanel;
