import { homepageConfig } from "../config/homepage";

function WhyChoose() {
  const { heading, features } = homepageConfig.whyChoose;

  return (
    <section
      id="why-choose"
      aria-labelledby="why-choose-heading"
      className="bg-black text-white py-20 md:py-28 px-6"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          id="why-choose-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-12 md:mb-16"
        >
          {heading}
        </h2>

        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7 md:gap-8 list-none p-0 m-0">
          {features.map((feature) => (
            <li key={feature.title}>
              <article className="group h-full bg-white/[0.04] p-8 md:p-10 rounded-2xl border border-white/10 shadow-lg shadow-black/20 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 hover:border-white/20">
                <p
                  className="text-4xl md:text-5xl mb-5 transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {feature.icon}
                </p>
                <h3 className="text-xl md:text-2xl font-bold">{feature.title}</h3>
                {feature.description && (
                  <p className="text-gray-400 text-base md:text-lg leading-relaxed mt-4">
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

export default WhyChoose;
