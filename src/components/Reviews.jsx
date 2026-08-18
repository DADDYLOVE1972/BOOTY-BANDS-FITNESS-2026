import { memo } from "react";
import { homepageConfig } from "../config/homepage";

function Reviews() {
  const { heading, items } = homepageConfig.testimonials;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="pt-20 pb-12 md:pt-28 md:pb-16 px-6 bg-black text-white scroll-mt-24"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          id="testimonials-heading"
          className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-8 md:mb-10"
        >
          {heading}
        </h2>

        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 md:gap-10 list-none p-0 m-0">
          {items.map((review) => (
            <li key={review.name}>
              <blockquote className="group h-full flex flex-col justify-between bg-white/10 text-white p-6 rounded-3xl border border-white/10 shadow-lg transition duration-300 hover:shadow-2xl hover:-translate-y-2 hover:scale-[1.02] hover:border-white/25">
                <div
                  className="flex justify-center mb-3 text-yellow-400 text-lg"
                  aria-label="5 out of 5 stars"
                >
                  {"\u2B50".repeat(5)}
                </div>

                <p className="mb-5 text-gray-100 text-sm md:text-base italic leading-relaxed">
                  &ldquo;{review.text}&rdquo;
                </p>

                <footer className="mt-4 font-bold text-white text-base">
                  {"\u2014"} {review.name}
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default memo(Reviews);