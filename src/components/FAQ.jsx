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
      className="py-12 md:py-16 px-6 bg-black text-white scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 id="faq-heading" className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
            {heading}
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base">{subheading}</p>
        </div>

        <div className="space-y-4">
          {items.map((faq, index) => {
            const isOpen = openIndex === index;
            const panelId = `faq-panel-${index}`;
            const buttonId = `faq-button-${index}`;

            return (
              <div
                key={faq.question}
                className="rounded-3xl border border-white/10 bg-white/[0.045] shadow-lg overflow-hidden transition duration-300 hover:border-white/20 hover:shadow-2xl"
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggle(index)}
                    className="w-full flex items-center justify-between gap-6 px-6 py-4 text-left font-bold text-base md:text-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-inset"
                  >
                    <span>{faq.question}</span>
                    <span
                      className={`flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-white text-black text-lg transition-transform duration-300 ${isOpen ? "rotate-45" : ""}`}
                      aria-hidden="true"
                    >
                      +
                    </span>
                  </button>
                </h3>

                {/* Grid-rows animation trick: transitioning 0fr -> 1fr
                    animates height smoothly without knowing the content's
                    height in advance. The old `hidden` attribute forced an
                    instant display:none, which made the accordion snap
                    open/closed instead of animating despite the
                    transition classes being present. */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  aria-hidden={!isOpen}
                  className={`grid px-6 transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100 pb-4" : "grid-rows-[0fr] opacity-0 pb-0"
                    }`}
                >
                  <p className="overflow-hidden text-gray-300 text-sm md:text-base leading-relaxed border-t border-white/10 pt-4">
                    {faq.answer}
                  </p>
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