import { Play } from "lucide-react";

const workouts = ["Squats", "Bicep Curls", "Rows", "Glute Kickbacks"];

function WorkoutVideos() {
  return (
    <section className="bg-black text-white px-6 py-24 md:py-36 border-t border-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-14 md:mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold">
            Train Anywhere
          </h2>
          <p className="mt-5 text-gray-400 text-lg md:text-xl">
            Simple workouts you can do with Booty Bands Fitness.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {workouts.map((workout) => (
            <article
              key={workout}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-xl shadow-black/30 transition-all duration-300 hover:-translate-y-2 hover:border-white/25 hover:shadow-2xl"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.16),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.1),rgba(0,0,0,0.82))]" />
              <div className="absolute inset-0 bg-black/30 transition-colors duration-300 group-hover:bg-black/10" />

              <div className="relative z-10 flex h-full flex-col items-center justify-center p-9 md:p-10 text-center">
                <div className="mb-7 flex h-20 w-20 items-center justify-center rounded-full bg-white text-black shadow-2xl transition-transform duration-300 group-hover:scale-110">
                  <Play className="h-8 w-8 fill-black" aria-hidden="true" />
                </div>
                <h3 className="text-2xl md:text-3xl font-extrabold">
                  {workout}
                </h3>
                <p className="mt-4 text-base md:text-lg text-gray-300">
                  Video coming soon
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default WorkoutVideos;
