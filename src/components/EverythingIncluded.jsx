import overview from "../assets/product-overview.jpeg";

function EverythingIncluded() {
  return (
    <section className="py-20 md:py-28 bg-white dark:bg-black">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-5">
          Everything Included
        </h2>

        <p className="text-lg md:text-xl text-gray-500 mb-12">
          Everything you need to sculpt, strengthen, and train anywhere.
        </p>

        <img
          src={overview}
          alt="Everything included in the Booty Bands Fitness package"
          loading="lazy"
          className="mx-auto max-w-[1100px] rounded-2xl shadow-2xl w-full"
        />
      </div>
    </section>
  );
}

export default EverythingIncluded;
