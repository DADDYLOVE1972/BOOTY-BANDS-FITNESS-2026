import { X } from "lucide-react";
import { useEffect, useRef } from "react";

export default function VideoModal({
    workout,
    workouts,
    onClose,
    onWorkoutChange,
}) {

    const videoRef = useRef(null);

    const currentIndex = workouts.findIndex(
        (item) => item.name === workout?.name
    );

    const hasPrevious = currentIndex > 0;
    const hasNext = currentIndex < workouts.length - 1;

    useEffect(() => {
        if (workout && videoRef.current) {
            // play() returns a promise that can reject (e.g. user navigates
            // away instantly) — swallow that instead of an unhandled rejection
            videoRef.current.play().catch(() => { });
        }
    }, [workout]);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    // Lock background scroll while the modal is open
    useEffect(() => {
        if (workout) {
            const originalOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = originalOverflow;
            };
        }
    }, [workout]);

    useEffect(() => {
        return () => {
            if (videoRef.current) {
                videoRef.current.pause();
            }
        };
    }, []);

    if (!workout) return null;

    return (
        <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6"
            onClick={onClose}
        >
            <div
                className="relative w-full max-w-5xl max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    aria-label="Close video"
                    className="absolute -top-14 right-0 text-white hover:text-gray-300"
                >
                    <X size={34} />
                </button>

                {/* aspect-video gives the container a real height so the
                    video (and its object-cover) has something to fill */}
                <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black">
                    <video
                        ref={videoRef}
                        src={workout.src}
                        loop
                        playsInline
                        controls
                        preload="none"
                        className="absolute inset-0 h-full w-full object-cover"
                    />
                </div>

                <div className="mt-8 text-white">

                    <h2 className="text-4xl font-extrabold text-center">
                        {workout.name}
                    </h2>

                    <div className="flex justify-center mt-3">
                        <span className="rounded-full bg-pink-600 px-4 py-1 text-sm font-bold uppercase tracking-wide text-white">
                            {workout.difficulty}
                        </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-8">

                        <div className="rounded-2xl bg-gray-900 p-4 transition-all duration-300 hover:bg-gray-800 hover:scale-[1.02]">
                            <p className="text-gray-400 text-sm">
                                🍑 Target Muscles
                            </p>

                            <p className="font-semibold mt-1">
                                {workout.muscles}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-gray-900 p-4">
                            <p className="text-gray-400 text-sm">
                                ⏱ Duration
                            </p>

                            <p className="font-semibold mt-1">
                                {workout.duration}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-gray-900 p-4">
                            <p className="text-gray-400 text-sm">
                                🔁 Sets & Reps
                            </p>

                            <p className="font-semibold mt-1">
                                {workout.sets} Sets • {workout.reps}
                            </p>
                        </div>

                        <div className="rounded-2xl bg-gray-900 p-4">
                            <p className="text-gray-400 text-sm">
                                🎽 Equipment
                            </p>

                            <p className="font-semibold mt-1">
                                {workout.equipment}
                            </p>
                        </div>

                    </div>

                    <div className="mt-8 rounded-2xl border border-pink-500/30 bg-gradient-to-r from-pink-500/15 to-purple-600/15 p-6">

                        <div className="flex items-center gap-2">
                            <span className="text-2xl">💡</span>

                            <h3 className="text-xl font-bold text-white">
                                Coach's Tip
                            </h3>
                        </div>

                        <p className="mt-2 text-white/90">
                            {workout.tip}
                        </p>

                    </div>
                    <button
                        onClick={() => {
                            console.log("Shop button clicked");

                            const section = document.getElementById("featured-products");
                            console.log(section);

                            section?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });

                            setTimeout(() => {
                                onClose();
                            }, 250);
                        }}
                        className="w-full mt-8 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-bold py-4 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:from-pink-500 hover:to-purple-500"
                    >
                        💪 Shop Booty Bands
                    </button>*/
                    <div className="flex justify-between gap-4 mt-6">
                        <button
                            disabled={!hasPrevious}
                            onClick={() => onWorkoutChange(workouts[currentIndex - 1])}
                            className="flex-1 rounded-full border border-pink-500 text-white py-3 font-semibold transition hover:bg-pink-600 disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                            ← Previous Workout
                        </button>

                        <button
                            disabled={!hasNext}
                            onClick={() => onWorkoutChange(workouts[currentIndex + 1])}
                            className="flex-1 rounded-full bg-gradient-to-r from-pink-600 to-purple-600 text-white py-3 font-semibold transition hover:scale-[1.02] disabled:opacity-40"
                        >
                            Next Workout →
                        </button>
                    </div>

                </div>

            </div>

        </div>
    );
}
