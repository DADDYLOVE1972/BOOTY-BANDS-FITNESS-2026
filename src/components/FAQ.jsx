import { useState } from "react";
import { homepageConfig } from "../config/homepage";

function FAQ() {
  const { heading, subheading, items } = homepageConfig.faq;
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="py-24 md:py-36 px-6 bg-black text-white scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <h2 id="faq-heading" className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            {heading}
          </h2>
          <p className="mt-5 text-gray-400 text-lg md:text-xl">{subheading}</p>
        </div>

        <div className="space-y-6 md:space-y-7">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-white/[0.045] shadow-xl shadow-black/25 overflow-hidden transition-all duration-300 hover:border-white/20 hover:shadow-2xl"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-6 px-7 md:px-10 py-7 md:py-9 text-left font-extrabold text-xl md:text-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`flex-shrink-0 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white text-black text-2xl transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </h3>

                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  hidden={!isOpen}
                  className={`px-7 md:px-10 overflow-hidden transition-all duration-300 ${isOpen ? "pb-8 md:pb-10" : "pb-0"}`}
                >
                  {isOpen && (
                    <p className="text-gray-300 text-base md:text-xl leading-8 md:leading-9 border-t border-white/10 pt-5 md:pt-6">
                      {faq.answer}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FAQ;
