import { useState, useEffect } from "react";
import { Play, Pause } from "lucide-react";

export default function VideoPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // ⏱️ Fake video progress
  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 500); // speed of progress

    return () => clearInterval(interval);
  }, [isPlaying]);

  // 🎯 Click to seek
  const handleSeek = (e) => {
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;

    const newProgress = (clickX / width) * 100;
    setProgress(Math.min(Math.max(newProgress, 0), 100));
  };

  return (
    <div className="p-10">
      <div className="bg-black rounded-lg h-[60vh] flex flex-col justify-between">

        {/* VIDEO AREA */}
        <div className="flex-1 flex items-center justify-center text-white">
          {isPlaying ? (
            <Pause
              size={80}
              className="cursor-pointer opacity-80"
              onClick={() => setIsPlaying(false)}
            />
          ) : (
            <Play
              size={80}
              className="cursor-pointer opacity-80"
              onClick={() => setIsPlaying(true)}
            />
          )}
        </div>

        {/* CONTROLS */}
        <div className="p-4 bg-black/80 rounded-b-lg">
          {/* Progress Bar */}
          <div
            className="w-full h-2 bg-gray-700 rounded cursor-pointer mb-2"
            onClick={handleSeek}
          >
            <div
              className="h-full bg-red-500 rounded transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex justify-between items-center text-gray-300 text-sm">
            <span>{Math.floor((progress / 100) * 600)}s / 600s</span>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="text-white"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
