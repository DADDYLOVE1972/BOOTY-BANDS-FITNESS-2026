import { homepageConfig } from "../config/homepage";

function Reviews() {
  const { heading, items } = homepageConfig.testimonials;

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="py-24 md:py-32 px-6 bg-black text-white scroll-mt-24"
    >
      <div className="max-w-7xl mx-auto text-center">
        <h2
          id="testimonials-heading"
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-14 md:mb-16"
        >
          {heading}
        </h2>

        <ul className="grid md:grid-cols-2 xl:grid-cols-3 gap-9 lg:gap-12 list-none p-0 m-0">
          {items.map((review) => (
            <li key={review.name}>
              <blockquote className="group h-full bg-white/[0.045] text-white p-9 md:p-11 lg:p-12 rounded-3xl border border-white/10 shadow-xl shadow-black/25 transition-all duration-300 hover:shadow-2xl hover:shadow-white/5 hover:-translate-y-2 hover:border-white/25">
                <div
                  className="mb-7 text-yellow-400 text-2xl tracking-wide"
                  aria-label="5 out of 5 stars"
                >
                  {"\u2B50".repeat(5)}
                </div>

                <p className="mb-9 text-gray-200 leading-8 md:leading-9 text-lg md:text-xl italic">
                  &ldquo;{review.text}&rdquo;
                </p>

                <footer className="font-extrabold text-xl md:text-2xl">
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

export default Reviews;
