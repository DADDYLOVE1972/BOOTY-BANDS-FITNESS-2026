import { homepageConfig } from "../config/homepage";
import { Music2 } from "lucide-react";

function Footer() {
  const { brand, supportEmail, tagline, quickLinks, policies } = homepageConfig.footer;
  const socialLinks = [
    {
      label: "TikTok",
      href: "https://www.tiktok.com/@bootybandsfitness?lang=en",
      icon: Music2,
    },
  ];

  const scrollTo = (event, href) => {
    if (!href.startsWith("#") || href === "#") return;
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-black text-white border-t border-gray-800 scroll-mt-24">
      <div className="max-w-6xl mx-auto px-6 py-12 md:py-16">
        <div className="grid gap-8 md:gap-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-xl md:text-2xl font-extrabold tracking-[0.16em] mb-3">
              {brand}
            </p>
            <p className="text-gray-400 text-sm md:text-base max-w-md leading-relaxed">
              {tagline}
            </p>
            <p className="mt-4 text-sm md:text-base text-gray-400">
              Email:{" "}
              <a
                href={`mailto:${supportEmail}`}
                className="text-white underline decoration-white/30 underline-offset-4 transition-colors hover:text-gray-300"
              >
                {supportEmail}
              </a>
            </p>
            <div className="mt-6 flex flex-wrap gap-3" aria-label="Social media links">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-300 transition-all duration-200 hover:-translate-y-1 hover:border-white/30 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer quick links">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] mb-4">
              Quick Links
            </h2>
            <ul className="grid gap-3 list-none p-0 m-0">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(event) => scrollTo(event, link.href)}
                    className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:text-white focus-visible:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer policies">
            <h2 className="text-sm font-bold uppercase tracking-[0.18em] mb-4">
              Policies
            </h2>
            <ul className="grid gap-3 list-none p-0 m-0">
              {policies.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(event) => scrollTo(event, link.href)}
                    className="text-sm md:text-base text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:text-white focus-visible:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <p className="text-gray-500 text-xs md:text-sm mt-8 pt-5 border-t border-gray-800">
          {"\u00A9"} 2026 Booty Bands Fitness By The Saints
        </p>
      </div>
    </footer>
  );
}

export default Footer;