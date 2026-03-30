import { loadStripe } from "@stripe/stripe-js";

// Load Stripe OUTSIDE the component
const stripePromise = loadStripe("YOUR_PUBLIC_STRIPE_KEY");

function CartPanel({ open, setOpen, cart }) {
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

  // Calculate total
  const total = cart.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
  // Checkout function (ONLY ONE)
  const handleCheckout = async () => {
  try {
    const response = await fetch("http://localhost:4242/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cart }),
    });

    const data = await response.json();

    if (data.url) {
      window.location.href = data.url;
    }
  } catch (error) {
    console.error("Checkout error:", error);
  }
};

  return (
   <div>
  {cart.length === 0 ? (
    <p>Your cart is empty</p>
  ) : (
    cart.map((item) => (
      <div key={item.id} className="border-b py-4">

        {/* Name + Price */}
        <div className="flex justify-between mb-2">
          <span>{item.name}</span>
          <span>${item.price}</span>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-3">

            {/* ➖ Decrease */}
            <button
              onClick={() => decreaseQty(item.id)}
              className="px-3 py-1 border rounded hover:scale-105 transition"
            >
              -
            </button>

            <span>{item.quantity}</span>

            {/* ➕ Increase */}
            <button
              onClick={() => increaseQty(item.id)}
              className="px-3 py-1 border rounded hover:scale-105 transition"
            >
              +
            </button>
          </div>

          {/* ❌ Remove */}
          <button
            onClick={() => removeItem(item.id)}
            className="text-red-500 hover:underline"
          >
            Remove
          </button>

        </div>

      </div>
    ))
  )}
</div>
  );
}

export default CartPanel;