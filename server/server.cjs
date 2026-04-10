const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();

/* =========================
   ✅ WEBHOOK (RAW BODY FIRST)
========================= */
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const event = req.body;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("💰 NEW ORDER RECEIVED:");
    console.log({
      email: session.customer_details?.email,
      name: session.customer_details?.name,
      amount: session.amount_total / 100,
      address: session.customer_details?.address,
      phone: session.customer_details?.phone,
    });
  }

  res.json({ received: true });
});

/* =========================
   ✅ NORMAL MIDDLEWARE
========================= */
app.use(cors());
app.use(express.json());

/* =========================
   ✅ CHECKOUT ROUTE
========================= */
app.post("/create-checkout-session", async (req, res) => {
  const { cart } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: cart.map(item => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.name },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),

      phone_number_collection: { enabled: true },

      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "usd" },
            display_name: "Standard Shipping (3–5 days)",
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1000, currency: "usd" },
            display_name: "Express Shipping (1–2 days)",
          },
        },
      ],

      /* 🔥 FIXED URLs */
                success_url: "https://booty-bands-fitness-2026-7hia.vercel.app/success",
                cancel_url: "https://booty-bands-fitness-2026-7hia.vercel.app/cancel",    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("Checkout error:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

/* =========================
   ✅ START SERVER
========================= */
const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});