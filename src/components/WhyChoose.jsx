import { memo } from "react";
import { homepageConfig } from "../config/homepage";

function WhyChoose() {
  const { heading, features } = homepageConfig.whyChoose;

  return (
    <section
      id="why-choose"
      aria-labelledby="why-choose-heading"
      className="bg-black text-white py-12 md:py-16 px-6"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          id="why-choose-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 md:mb-10"
        >
          {heading}
        </h2>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 list-none p-0 m-0">
          {features.map((feature) => (
            <li key={feature.title}>
              <article className="group h-full bg-white/[0.05] p-6 rounded-3xl border border-white/10 shadow-lg transition duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-white/25">
                <p
                  className="text-4xl mb-3 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {feature.icon}
                </p>
                <h3 className="text-xl font-bold mb-2">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                )}
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default memo(WhyChoose);
