import { homepageConfig } from "../config/homepage";
import { Camera, Music2, PlaySquare, Users } from "lucide-react";

function Footer() {
  const { brand, tagline, quickLinks, policies } = homepageConfig.footer;
  const socialLinks = [
    { label: "TikTok", href: "#", icon: Music2 },
    { label: "Instagram", href: "#", icon: Camera },
    { label: "Facebook", href: "#", icon: Users },
    { label: "YouTube", href: "#", icon: PlaySquare },
  ];

  const scrollTo = (event, href) => {
    if (!href.startsWith("#") || href === "#") return;
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer id="footer" className="bg-black text-white border-t border-gray-800 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-6 py-20 md:py-24">
        <div className="grid gap-14 md:gap-16 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <p className="text-2xl md:text-3xl font-extrabold tracking-[0.16em] mb-5">
              {brand}
            </p>
            <p className="text-gray-400 text-base md:text-lg max-w-md leading-relaxed">
              {tagline}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex h-12 w-12 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-gray-300 transition-all duration-200 hover:-translate-y-1 hover:border-white/30 hover:bg-white hover:text-black focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                >
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer quick links">
            <h2 className="text-base font-bold uppercase tracking-[0.18em] mb-6">
              Quick Links
            </h2>
            <ul className="grid gap-5 list-none p-0 m-0">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(event) => scrollTo(event, link.href)}
                    className="text-base md:text-lg text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:text-white focus-visible:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer policies">
            <h2 className="text-base font-bold uppercase tracking-[0.18em] mb-6">
              Policies
            </h2>
            <ul className="grid gap-5 list-none p-0 m-0">
              {policies.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(event) => scrollTo(event, link.href)}
                    className="text-base md:text-lg text-gray-400 hover:text-white transition-colors duration-200 focus:outline-none focus-visible:text-white focus-visible:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <section id="shipping-policy" className="sr-only" aria-label="Shipping Policy">
          <h2>Shipping Policy</h2>
          <p>Most U.S. deliveries arrive in 3-5 business days.</p>
        </section>
        <section id="refund-policy" className="sr-only" aria-label="Refund Policy">
          <h2>Refund Policy</h2>
          <p>30-day satisfaction guarantee with refund or exchange support.</p>
        </section>
        <section id="privacy-policy" className="sr-only" aria-label="Privacy Policy">
          <h2>Privacy Policy</h2>
          <p>We protect your personal data and never sell it to third parties.</p>
        </section>
        <section id="terms-and-conditions" className="sr-only" aria-label="Terms and Conditions">
          <h2>Terms and Conditions</h2>
          <p>By using this site, you agree to our standard purchase and use terms.</p>
        </section>

        <p className="text-gray-500 text-sm md:text-base mt-14 pt-9 border-t border-gray-800">
          {"\u00A9"} 2026 Booty Bands Fitness By The Saints
        </p>
      </div>
    </footer>
  );
}

export default Footer;
