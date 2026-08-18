import overview from "../assets/product-overview.jpeg";

function EverythingIncluded() {
  return (
    <section className="pt-8 md:pt-10 pb-12 md:pb-16 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3">
          Everything Included
        </h2>

        <p className="text-sm md:text-base text-gray-500 mb-8 md:mb-10">
          Everything you need to sculpt, strengthen, and train anywhere.
        </p>

        <img
          src={overview}
          alt="Everything included in the Booty Bands Fitness package"
          loading="lazy"
          className="mx-auto max-w-[900px] rounded-2xl shadow-2xl w-full"
        />
      </div>
    </section>
  );
}

export default EverythingIncluded;
