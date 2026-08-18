import { Link, useParams } from "react-router-dom";
import { homepageConfig } from "../config/homepage";

const policies = {
  "privacy-policy": {
    title: "Privacy Policy",
    updated: "August 18, 2026",
    sections: [
      {
        heading: "Information We Collect",
        body: "We collect the information needed to process orders, respond to customer questions, and improve the shopping experience. This may include your name, email address, phone number, shipping address, billing details, and order history.",
      },
      {
        heading: "How We Use Your Information",
        body: "We use customer information to process payments, ship orders, provide customer support, send order updates, prevent fraud, and improve Booty Bands Fitness products and services.",
      },
      {
        heading: "Payment Security",
        body: "Payments are processed through Stripe. Booty Bands Fitness does not store full credit card numbers on this website.",
      },
      {
        heading: "Contact",
        body: `For privacy questions, contact ${homepageConfig.footer.supportEmail}.`,
      },
    ],
  },
  "shipping-policy": {
    title: "Shipping Policy",
    updated: "August 18, 2026",
    sections: [
      {
        heading: "Processing Time",
        body: "Orders are usually prepared within 1-2 business days after payment is completed.",
      },
      {
        heading: "Delivery Time",
        body: "Standard U.S. delivery is estimated at 4-7 business days after the order ships. Express delivery, when available, is estimated at 1-2 business days after shipping.",
      },
      {
        heading: "Shipping Address",
        body: "Customers are responsible for entering the correct shipping address at checkout. If you notice an address mistake, contact us as soon as possible.",
      },
      {
        heading: "Contact",
        body: `For shipping help, contact ${homepageConfig.footer.supportEmail}.`,
      },
    ],
  },
  "refund-policy": {
    title: "Refund Policy",
    updated: "August 18, 2026",
    sections: [
      {
        heading: "30-Day Guarantee",
        body: "Booty Bands Fitness offers a 30-day satisfaction guarantee. If there is an issue with your order, contact us within 30 days of delivery so we can help with a refund, replacement, or exchange when eligible.",
      },
      {
        heading: "Condition",
        body: "Items should be returned in clean, unused, or gently inspected condition when a return is requested. Damaged or missing items may affect refund eligibility.",
      },
      {
        heading: "Refund Timing",
        body: "Approved refunds are returned to the original payment method. Bank processing times may vary.",
      },
      {
        heading: "Contact",
        body: `To request help with an order, contact ${homepageConfig.footer.supportEmail}.`,
      },
    ],
  },
  "terms-and-conditions": {
    title: "Terms and Conditions",
    updated: "August 18, 2026",
    sections: [
      {
        heading: "Use of This Website",
        body: "By using this website or placing an order, you agree to use Booty Bands Fitness products and services lawfully and responsibly.",
      },
      {
        heading: "Fitness Disclaimer",
        body: "Booty Bands Fitness products are exercise accessories. Always use proper form, inspect bands before use, and stop exercising if you feel pain or discomfort. Consult a healthcare professional before starting a new workout program if needed.",
      },
      {
        heading: "Product Information",
        body: "We work to keep product descriptions, prices, and availability accurate. If an error occurs, we may correct it or contact you about your order.",
      },
      {
        heading: "Contact",
        body: `For questions about these terms, contact ${homepageConfig.footer.supportEmail}.`,
      },
    ],
  },
};

function PolicyPage() {
  const { policyId } = useParams();
  const policy = policies[policyId] || policies["privacy-policy"];

  return (
    <main className="min-h-screen bg-white px-6 py-10 text-black">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="inline-flex rounded-full border border-gray-300 px-4 py-2 text-sm font-semibold transition hover:bg-black hover:text-white"
        >
          Back to Home
        </Link>

        <p className="mt-10 text-sm font-bold uppercase tracking-[0.18em] text-gray-500">
          Booty Bands Fitness
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight md:text-5xl">
          {policy.title}
        </h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: {policy.updated}</p>

        <div className="mt-10 grid gap-8">
          {policy.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-xl font-bold">{section.heading}</h2>
              <p className="mt-3 leading-7 text-gray-700">{section.body}</p>
            </section>
          ))}
        </div>

        <div className="mt-12 border-t border-gray-200 pt-6">
          <a
            href={`mailto:${homepageConfig.footer.supportEmail}`}
            className="font-semibold underline underline-offset-4"
          >
            {homepageConfig.footer.supportEmail}
          </a>
        </div>
      </div>
    </main>
  );
}

export default PolicyPage;
