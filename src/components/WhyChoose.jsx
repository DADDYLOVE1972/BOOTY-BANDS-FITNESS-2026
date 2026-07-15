import { memo } from "react";
import { homepageConfig } from "../config/homepage";

function WhyChoose() {
  const { heading, features } = homepageConfig.whyChoose;

  return (
    <section
      id="why-choose"
      aria-labelledby="why-choose-heading"
      className="bg-black text-white py-24 md:py-36 lg:py-44 px-6"
    >
      <div className="max-w-[92rem] mx-auto text-center">
        <h2
          id="why-choose-heading"
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-16 md:mb-24"
        >
          {heading}
        </h2>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 xl:gap-12 list-none p-0 m-0">
          {features.map((feature) => (
            <li key={feature.title}>
              <article className="group h-full min-h-[300px] bg-white/[0.05] p-10 md:p-12 xl:p-14 rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30 transition-all duration-500 hover:shadow-[0_32px_90px_rgba(255,255,255,0.08)] hover:-translate-y-3 hover:border-white/25">
                <p
                  className="text-6xl md:text-7xl mb-8 transition-transform duration-500 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {feature.icon}
                </p>
                <h3 className="text-2xl md:text-3xl xl:text-4xl font-extrabold leading-tight">
                  {feature.title}
                </h3>
                {feature.description && (
                  <p className="text-gray-300 text-lg md:text-xl leading-relaxed mt-6">
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
