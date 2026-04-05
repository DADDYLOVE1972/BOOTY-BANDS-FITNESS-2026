import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_12345...");
function CartPanel({ open, setOpen, cart, setCart }) {

  const increaseQty = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

const handleCheckout = async () => {
  try {
    const response = await fetch(
      "https://booty-bands-fitness-2026-1.onrender.com/create-checkout-session",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      }
    );

    console.log("Response:", response); // 👈 ADD THIS

    const data = await response.json();

    console.log("Data:", data); // 👈 ADD THIS

    if (data.url) {
      window.location.href = data.url;
    } else {
      console.error("No URL returned", data); // 👈 ADD THIS
    }
  } catch (error) {
    console.error("Checkout error:", error);
  }
};

if (!open) return null;

  return (
    <div className="fixed top-0 right-0 w-80 h-full bg-white text-black shadow-2xl p-6 z-50 overflow-y-auto">

      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-bold">Your Cart</h2>
        <button onClick={() => setOpen(false)}>✕</button>
      </div>

      {/* EMPTY */}
      {cart.length === 0 && (
        <p className="text-center text-gray-500 mt-10">
          Your cart is empty
        </p>
      )}

      {/* ITEMS */}
      {cart.map((item) => (
        <div key={item.id} className="border-b py-4">

          <div className="flex justify-between mb-2">
            <span>{item.name}</span>
            <span>${item.price}</span>
          </div>

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">
              <button onClick={() => decreaseQty(item.id)} className="px-3 py-1 border rounded">-</button>
              <span>{item.quantity}</span>
              <button onClick={() => increaseQty(item.id)} className="px-3 py-1 border rounded">+</button>
            </div>

            <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm">
              Remove
            </button>

          </div>
        </div>
      ))}

      {/* TOTAL + CHECKOUT */}
      {cart.length > 0 && (
        <div className="mt-6">

          <div className="flex justify-between font-semibold mb-4">
            <span>Total</span>
            <span>${total}</span>
          </div>

          <button
            onClick={handleCheckout}
            className="w-full bg-black text-white py-3 rounded-full hover:scale-105 transition"
          >
            Checkout →
          </button>

          <p className="text-xs text-gray-500 text-center mt-2">
            🔒 Secure Checkout
          </p>

        </div>
      )}
    </div>
  );
}

export default CartPanel;