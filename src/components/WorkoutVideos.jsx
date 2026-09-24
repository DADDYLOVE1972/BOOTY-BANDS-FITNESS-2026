
import { memo, useRef, useState } from "react";
import VideoModal from "./VideoModal";
import { Play } from "lucide-react";

const workouts = [
  {
    name: "Squats",
    src: "/workout1.mp4",
    difficulty: "Beginner",
    duration: "45 Seconds",
    sets: "3",
    reps: "12–15",
    muscles: "Glutes • Legs • Core",
    equipment: "Booty Bands Resistance Band",
    tip: "Push through your heels and squeeze your glutes at the top of every rep.",
  },

  {
    name: "Bicep Curls",
    src: "/Workout2.mp4",
    difficulty: "Beginner",
    duration: "45 Seconds",
    sets: "3",
    reps: "12",
    muscles: "Biceps • Forearms",
    equipment: "Resistance Band",
    tip: "Keep your elbows close to your body and control the lowering phase.",
  },

  {
    name: "Rows",
    src: "/Workout3.mp4",
    difficulty: "Intermediate",
    duration: "50 Seconds",
    sets: "3",
    reps: "10–12",
    muscles: "Upper Back • Shoulders",
    equipment: "Resistance Band",
    tip: "Pull your elbows back and squeeze your shoulder blades together.",
  },

  {
    name: "Glute Kickbacks",
    src: "/workout.mp4",
    difficulty: "Beginner",
    duration: "45 Seconds",
    sets: "3",
    reps: "15 Each Side",
    muscles: "Glutes",
    equipment: "Resistance Band",
    tip: "Move slowly and focus on activating your glutes instead of using momentum.",
  },
];
function WorkoutCard({ workout, onOpen }) {
  const videoRef = useRef(null);

  // Subtle muted preview loop on hover (desktop), click always opens full modal
  const handleMouseEnter = () => {
    videoRef.current?.play().catch(() => { });
  };

  const handleMouseLeave = () => {
    if (!videoRef.current) return;
    videoRef.current.pause();
    videoRef.current.currentTime = 0;
  };

  return (
    <article
      className="group relative aspect-[4/5] overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-gray-900 via-black to-gray-800 shadow-lg transition duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:border-white/25 hover:shadow-2xl"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <video
        ref={videoRef}
        src={workout.src}
        loop
        muted
        playsInline
        preload="none"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay gradient for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.10),transparent_34%),linear-gradient(180deg,rgba(0,0,0,0.15),rgba(0,0,0,0.65))]" />

      <button
        type="button"
        onClick={() => onOpen(workout)}
        aria-label={`Play ${workout.name} video`}
        className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6 text-center"
      >
        <span className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Play className="h-6 w-6 fill-black" aria-hidden="true" />
        </span>
        <h3 className="text-xl font-bold drop-shadow">
          {workout.name}
        </h3>
      </button>
    </article>
  );
}

function WorkoutVideos() {
  const [selectedWorkout, setSelectedWorkout] = useState(null);

  return (
    <section
      id="workout-videos"
      className="bg-black text-white px-6 py-12 md:py-16 border-t border-gray-900 scroll-mt-24"
  >  
    <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold">
            Train Anywhere
          </h2>
          <p className="mt-3 text-gray-400 text-sm md:text-base">
            Simple workouts you can do with Booty Bands Fitness.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {workouts.map((workout) => (
            <WorkoutCard
              key={workout.name}
              workout={workout}
              onOpen={setSelectedWorkout}
            />
          ))}
        </div>
      </div>
      <VideoModal
        workout={selectedWorkout}
        workouts={workouts}
        onWorkoutChange={setSelectedWorkout}
        onClose={() => setSelectedWorkout(null)}
      />
    </section>
  );
}

export default memo(WorkoutVideos);
