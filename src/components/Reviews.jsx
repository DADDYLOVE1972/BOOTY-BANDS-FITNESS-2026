function Reviews() {
  const reviews = [
    {
      name: "Jessica M.",
      text: "These bands completely changed my workouts. The quality is insane.",
    },
    {
      name: "Ashley K.",
      text: "Finally bands that don’t roll or slip. I use them every day.",
    },
    {
      name: "Samantha R.",
      text: "Best purchase I’ve made for my fitness routine. Highly recommend!",
    },
  ];

  return (
    <section className="py-28 px-6 bg-black text-white">
      
      <div className="max-w-6xl mx-auto text-center">

        <h2 className="text-4xl md:text-5xl font-extrabold mb-20">
          Trusted by Athletes Worldwide
        </h2>

        <div className="grid md:grid-cols-3 gap-12">

          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white text-black p-8 rounded-3xl shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:scale-105 transition duration-200"
            >
              
              {/* ⭐ Stars */}
              <div className="mb-4 text-yellow-400 text-xl tracking-wide">
                ★★★★★
              </div>

              {/* Review text */}
              <p className="mb-6 italic text-gray-700 leading-relaxed">
                "{review.text}"
              </p>

              {/* Name */}
              <h4 className="font-bold text-lg">
                {review.name}
              </h4>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}

export default Reviews;