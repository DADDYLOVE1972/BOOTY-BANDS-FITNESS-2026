const express = require("express");
const cors = require("cors");

const app = express();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const stripeWebhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY is missing. Checkout will not work until it is set.");
}

const stripe = require("stripe")(stripeSecretKey || "sk_test_missing");

const SITE_URL =
  process.env.SITE_URL || "https://bootybandsfitness.com";

const allowedOrigins = new Set(
  (process.env.ALLOWED_ORIGINS ||
    "https://bootybandsfitness.com,https://www.bootybandsfitness.com,https://booty-bands-fitness-2026-7hia.vercel.app,http://localhost:5173")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean)
);

const PRODUCT_CATALOG = {
  "starter-kit-fabric-bands": {
    name: "Booty Bands Fitness Starter Kit - 3 Non-Slip Fabric Resistance Bands",
    unitAmount: 3999,
  },
  "latex-5-level-band-set": {
    name: "Booty Bands Fitness Latex Resistance Bands - 5 Level Workout Set",
    unitAmount: 2999,
  },
  "full-body-training-bundle": {
    name: "Booty Bands Fitness Full Body Training Bundle - Resistance Bands With Handles",
    unitAmount: 4999,
  },
};

function normalizeCart(cart) {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error("Cart is empty.");
  }

  return cart.map((item) => {
    const productId = String(item.productId || item.slug || item.id || "");
    const product = PRODUCT_CATALOG[productId];
    const quantity = Number.parseInt(item.quantity, 10);

    if (!product) {
      throw new Error(`Unknown product: ${productId}`);
    }

    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) {
      throw new Error("Invalid quantity.");
    }

    return { productId, product, quantity };
  });
}

app.disable("x-powered-by");

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    stripeMode: stripeSecretKey?.startsWith("sk_live_") ? "live" : "test-or-missing",
    webhookConfigured: Boolean(stripeWebhookSecret),
  });
});

app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  if (!stripeWebhookSecret) {
    console.error("STRIPE_WEBHOOK_SECRET is missing.");
    return res.status(503).json({ error: "Webhook is not configured." });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      req.headers["stripe-signature"],
      stripeWebhookSecret
    );
  } catch (error) {
    console.warn("Rejected Stripe webhook:", error.message);
    return res.status(400).json({ error: "Invalid webhook signature." });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log("NEW ORDER RECEIVED:");
    console.log({
      email: session.customer_details?.email,
      name: session.customer_details?.name,
      amount: session.amount_total / 100,
      address: session.customer_details?.address,
      phone: session.customer_details?.phone,
      items: session.metadata?.items,
    });
  }

  res.json({ received: true });
});

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.has(origin)) return callback(null, true);
      return callback(new Error("Origin is not allowed by CORS."));
    },
    methods: ["GET", "POST", "OPTIONS"],
  })
);
app.use(express.json({ limit: "20kb" }));

app.post("/create-checkout-session", async (req, res) => {
  try {
    if (!stripeSecretKey) {
      return res.status(503).json({ error: "Checkout is temporarily unavailable." });
    }

    const normalizedCart = normalizeCart(req.body.cart);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      billing_address_collection: "auto",
      allow_promotion_codes: true,

      line_items: normalizedCart.map(({ product, quantity }) => ({
        price_data: {
          currency: "usd",
          product_data: { name: product.name },
          unit_amount: product.unitAmount,
        },
        quantity,
      })),

      phone_number_collection: { enabled: true },

      shipping_address_collection: {
        allowed_countries: ["US"],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 500, currency: "usd" },
            display_name: "Standard Shipping (4-7 business days)",
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 1000, currency: "usd" },
            display_name: "Express Shipping (1-2 business days)",
          },
        },
      ],

      metadata: {
        source: "booty-bands-fitness-2026",
        items: normalizedCart
          .map(({ productId, quantity }) => `${productId}:${quantity}`)
          .join(","),
      },

      success_url: `${SITE_URL}/success`,
      cancel_url: `${SITE_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    const isCartError =
      error.message === "Cart is empty." ||
      error.message === "Invalid quantity." ||
      error.message?.startsWith("Unknown product:");

    res.status(isCartError ? 400 : 500).json({
      error: isCartError
        ? error.message
        : "Something went wrong starting checkout. Please try again.",
    });
  }
});

app.use((error, req, res, next) => {
  if (error.message === "Origin is not allowed by CORS.") {
    return res.status(403).json({ error: "Origin is not allowed." });
  }

  console.error("Unhandled server error:", error);
  return res.status(500).json({ error: "Internal server error." });
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
