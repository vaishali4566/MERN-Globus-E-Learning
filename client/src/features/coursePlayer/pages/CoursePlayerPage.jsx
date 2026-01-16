import VideoPlayer from "../components/VideoPlayer";
import LessonInfo from "../components/LessonInfo";
import CourseSidebar from "../components/CourseSidebar";

export default function CoursePlayerPage() {
  return (
    <div className="h-screen bg-gray-100 flex">
      {/* MAIN CONTENT */}
      <div className="flex-1 flex flex-col">
        <VideoPlayer />
        <LessonInfo />
      </div>

      {/* SIDEBAR */}
      <CourseSidebar />
    </div>
  );
}
