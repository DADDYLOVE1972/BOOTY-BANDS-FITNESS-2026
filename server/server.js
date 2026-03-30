const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("YOUR_SECRET_KEY");

const app = express();

app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  const { cart } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: cart.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
          },
          unit_amount: item.price * 100, // cents
        },
        quantity: 1,
      })),

      success_url: "http://localhost:5173",
      cancel_url: "http://localhost:5173",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));