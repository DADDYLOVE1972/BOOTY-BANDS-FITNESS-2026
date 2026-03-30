function WhyChoose() {
  return (
    <section className="bg-gray-50 py-24 px-6">
      
      <div className="max-w-6xl mx-auto text-center">
        
        <h2 className="text-4xl font-bold mb-16">
          Why Athletes Choose BBF
        </h2>

        <div className="grid md:grid-cols-3 gap-12">

          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition duration-200">
            <h3 className="text-xl font-bold mb-3">Non-Slip Fabric</h3>
            <p className="text-gray-600">
              Stays in place during intense workouts.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition duration-200">
            <h3 className="text-xl font-bold mb-3">Extreme Durability</h3>
            <p className="text-gray-600">
              Built for long-term performance.
            </p>
          </div>

          <div className="p-8 bg-white rounded-2xl shadow-sm hover:shadow-lg hover:scale-105 transition duration-200">
            <h3 className="text-xl font-bold mb-3">Train Anywhere</h3>
            <p className="text-gray-600">
              Perfect for gym or home workouts.
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}

export default WhyChoose;