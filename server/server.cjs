const express = require("express");
const cors = require("cors");

const app = express();

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
if (!stripeSecretKey) {
  console.warn("STRIPE_SECRET_KEY is missing. Checkout will not work until it is set.");
}

const stripe = require("stripe")(stripeSecretKey || "sk_test_missing");

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
if (!webhookSecret) {
  console.warn("STRIPE_WEBHOOK_SECRET is missing. Webhook events will be rejected until it is set.");
}

const SITE_URL =
  process.env.SITE_URL || "https://booty-bands-fitness-2026-7hia.vercel.app";

// Optional CORS allowlist. If ALLOWED_ORIGINS is unset, all origins are
// allowed (same behavior as before) — set it to a comma-separated list
// (e.g. "https://bootybandsfitness.com,https://www.bootybandsfitness.com")
// to restrict it in production.
const allowedOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",").map((o) => o.trim())
  : null;

const corsOptions = allowedOrigins
  ? {
    origin: (origin, callback) => {
      // requests with no origin (curl, server-to-server, Stripe webhooks)
      // are always allowed through
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  }
  : undefined;

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

app.get("/health", (req, res) => {
  res.json({
    ok: true,
    stripeMode: stripeSecretKey?.startsWith("sk_live_") ? "live" : "test-or-missing",
    stripeConfigured: Boolean(stripeSecretKey),
    webhookConfigured: Boolean(webhookSecret),
    siteUrl: SITE_URL,
    corsRestricted: Boolean(allowedOrigins),
  });
});

// IMPORTANT: this route must be registered with express.raw() BEFORE
// app.use(express.json()) below, since Stripe's signature verification
// needs the exact raw request bytes — not a parsed object.
app.post("/webhook", express.raw({ type: "application/json" }), (req, res) => {
  const signature = req.headers["stripe-signature"];

  let event;
  try {
    if (!webhookSecret) {
      throw new Error("STRIPE_WEBHOOK_SECRET is not configured on the server.");
    }
    // constructEvent both verifies the request really came from Stripe
    // AND parses the raw buffer into a usable event object.
    event = stripe.webhooks.constructEvent(req.body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
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

app.use(cors(corsOptions));
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
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

      success_url: `${SITE_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${SITE_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    res.status(400).json({ error: error.message || "Something went wrong" });
  }
});

const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
