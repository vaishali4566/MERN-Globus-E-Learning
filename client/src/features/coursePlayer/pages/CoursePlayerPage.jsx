import { useEffect, useState } from "react";
import VideoPlayer from "../components/VideoPlayer";
import LessonInfo from "../components/LessonInfo";
import CourseSidebar from "../components/CourseSidebar";
import { getCoursePlayerData } from "../services/coursePlayer.service";
import { useParams } from "react-router-dom";

export default function CoursePlayerPage() {
  const { courseId } = useParams();

  const [sections, setSections] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await getCoursePlayerData(courseId);

        setSections(data.sections);

        // 🎯 first unlocked lesson
        const firstLesson = data.sections
          .flatMap((section) => section.lessons)
          .find((lesson) => !lesson.isLocked);

        setActiveLesson(firstLesson || null);
      } catch (err) {
        console.error("Course player error", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  if (loading) return <div className="p-10">Loading course...</div>;
  if (!activeLesson) return <div className="p-10">No accessible lesson</div>;

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* LEFT SIDEBAR */}
      <CourseSidebar
        sections={sections}
        activeLessonId={activeLesson._id}
        onSelectLesson={setActiveLesson}
      />

      {/* RIGHT MAIN CONTENT */}
      <div className="flex-1 flex flex-col overflow-y-auto">
        <LessonInfo lesson={activeLesson} />
        <VideoPlayer lesson={activeLesson} />
      </div>
    </div>
  );
}
