function WhyChoose() {
  return (
    <section className="bg-black text-white py-24">

      <div className="max-w-6xl mx-auto text-center px-6">

        <h2 className="text-4xl md:text-5xl font-extrabold mb-16">
          Why Athletes Choose BBF
        </h2>

        <div className="grid md:grid-cols-3 gap-10">

          {/* CARD 1 */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <p className="text-3xl mb-4">💪</p>
            <h3 className="text-xl font-bold mb-3">Non-Slip Fabric</h3>
            <p className="text-gray-400">
              Stays in place during intense workouts.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <p className="text-3xl mb-4">⚡</p>
            <h3 className="text-xl font-bold mb-3">Extreme Durability</h3>
            <p className="text-gray-400">
              Built for long-term performance.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-gray-900 p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300">
            <p className="text-3xl mb-4">🏋️</p>
            <h3 className="text-xl font-bold mb-3">Train Anywhere</h3>
            <p className="text-gray-400">
              Perfect for gym or home workouts.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;