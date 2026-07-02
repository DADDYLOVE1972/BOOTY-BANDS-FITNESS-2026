import { homepageConfig } from "../config/homepage";

function TrustBar() {
  const { items } = homepageConfig.trustBar;

  return (
    <section
      aria-label="Customer trust guarantees"
      className="py-6 md:py-8 px-6 bg-black border-y border-gray-800"
    >
      <div className="max-w-6xl mx-auto">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 list-none p-0 m-0">
          {items.map((item) => (
            <li key={item.label}>
              <div className="group h-full flex items-center justify-center gap-3 text-center px-4 py-5 rounded-2xl bg-white/[0.04] border border-white/10 shadow-lg shadow-black/20 transition-all duration-300 hover:bg-white/[0.07] hover:border-white/20 hover:-translate-y-0.5">
                <span
                  className="text-xl md:text-2xl transition-transform duration-300 group-hover:scale-110"
                  aria-hidden="true"
                >
                  {item.icon}
                </span>
                <p className="font-bold text-xs md:text-sm uppercase tracking-[0.12em] text-white">
                  {item.label}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default TrustBar;
