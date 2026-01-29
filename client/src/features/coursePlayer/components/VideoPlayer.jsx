import { useRef, useState } from "react";
import { Play, Pause } from "lucide-react";

export default function VideoPlayer({ videoUrl }) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  // ▶️ Play / Pause
  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) videoRef.current.pause();
    else videoRef.current.play();
    setIsPlaying(!isPlaying);
  };

  // ⏱️ Update progress
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video.duration) return;
    const percent = (video.currentTime / video.duration) * 100;
    setProgress(percent);
  };

  // 🎯 Seek video
  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    videoRef.current.currentTime = (clickX / width) * videoRef.current.duration;
  };

  return (
    <div className="p-6">
      <div className="bg-black rounded-lg flex flex-col">

        {/* VIDEO */}
        <div className="relative w-full h-[360px] bg-black rounded-t-lg">
          <video
            ref={videoRef}
            src={videoUrl}
            className="w-full h-full object-contain"
            onTimeUpdate={handleTimeUpdate}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Play/Pause Overlay */}
          <div
            className="absolute inset-0 flex items-center justify-center cursor-pointer"
            onClick={togglePlay}
          >
            {isPlaying ? (
              <Pause size={80} className="text-white opacity-70" />
            ) : (
              <Play size={80} className="text-white opacity-70" />
            )}
          </div>
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

          {/* Play/Pause Button */}
          <div className="flex justify-end">
            <button onClick={togglePlay} className="text-white">
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
