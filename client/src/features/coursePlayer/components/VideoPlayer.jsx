import { PlayCircle } from "lucide-react";

export default function VideoPlayer() {
  return (
    <div className="bg-black h-[60%] flex items-center justify-center">
      <div className="text-white text-center">
        <PlayCircle size={64} className="mx-auto mb-4 opacity-70" />
        <p className="text-lg">Video Player Preview</p>
      </div>
    </div>
  );
}
