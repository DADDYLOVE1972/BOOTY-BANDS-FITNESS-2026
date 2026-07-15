import { memo } from "react";
import { homepageConfig } from "../config/homepage";

function Reviews() {
  const { heading, items } = homepageConfig.testimonials;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-24 md:py-36 lg:py-44 px-6 bg-black text-white scroll-mt-24"
    >
      <div className="max-w-[94rem] mx-auto text-center">
        <h2
          id="testimonials-heading"
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold mb-16 md:mb-24"
        >
          {heading}
        </h2>

        <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-10 lg:gap-14 list-none p-0 m-0">
          {items.map((review) => (
            <li key={review.name}>
              <blockquote className="group h-full min-h-[360px] bg-white/[0.05] text-white p-10 md:p-12 xl:p-14 rounded-[2rem] border border-white/10 shadow-2xl shadow-black/30 transition-all duration-500 hover:shadow-[0_32px_90px_rgba(255,255,255,0.08)] hover:-translate-y-3 hover:border-white/25">
                <div
                  className="mb-8 text-yellow-400 text-2xl md:text-3xl tracking-wide"
                  aria-label="5 out of 5 stars"
                >
                  {"\u2B50".repeat(5)}
                </div>

                <p className="mb-10 text-gray-100 leading-9 md:leading-10 text-xl md:text-2xl italic">
                  &ldquo;{review.text}&rdquo;
                </p>

                <footer className="font-extrabold text-2xl md:text-3xl">
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
