function Navbar({ cartCount, setOpen }) {
  const navLinks = [
    { label: "Home", href: "#home" },
    { label: "Shop", href: "#featured-products" },
    { label: "Reviews", href: "#testimonials" },
    { label: "FAQ", href: "#faq" },
    { label: "Contact", href: "#footer" },
  ];

  const scrollTo = (event, href) => {
    event.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 text-white py-4 px-5 md:px-6 border-b border-gray-800 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto flex flex-wrap justify-between items-center gap-4">
        <a
          href="#home"
          onClick={(event) => scrollTo(event, "#home")}
          className="text-base sm:text-lg md:text-xl font-extrabold tracking-[0.16em] leading-tight hover:text-gray-200 transition-colors"
        >
          BOOTY BANDS FITNESS
        </a>

        <div className="order-3 flex w-full items-center justify-center gap-4 overflow-x-auto whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.16em] text-gray-400 lg:order-none lg:w-auto lg:gap-7 lg:text-xs">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(event) => scrollTo(event, link.href)}
              className="hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="shrink-0 inline-flex items-center justify-center gap-2 bg-white text-black px-4 py-2.5 rounded-full font-bold hover:bg-gray-200 hover:scale-105 transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-black"
          aria-label={`Open cart with ${cartCount} items`}
        >
          <span aria-hidden="true">{"\u{1F6D2}"}</span>
          <span>({cartCount})</span>
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
