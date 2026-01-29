import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import VideoPlayer from "../components/VideoPlayer";
import LessonInfo from "../components/LessonInfo";
import AssignmentInfo from "../components/AssignmentInfo";
import AssignmentSubmission from "../components/AssignmentSubmission";
import CourseSidebar from "../components/CourseSidebar";
import QuizPlayer from "../components/QuizPlayer";
import QuizResult from "../components/QuizResult";

import { getCoursePlayerData } from "../services/coursePlayer.service";

export default function CoursePlayerPage() {
  const { courseId } = useParams();

  const [sections, setSections] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Track quiz state
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({}); // store student answers
  const [showQuizResult, setShowQuizResult] = useState(false);

  useEffect(() => {
    const loadCourse = async () => {
      try {
        const data = await getCoursePlayerData(courseId);
        const allSections = data.sections || [];
        setSections(allSections);

        // pick first available content
        const items = allSections.flatMap((section) => [
          ...(section.lessons || []).map((l) => ({ ...l, itemType: "lesson" })),
          ...(section.assignments || []).map((a) => ({
            ...a,
            itemType: "assignment",
          })),
          ...(section.quizzes || []).map((q) => ({ ...q, itemType: "quiz" })),
        ]);

        setActiveItem(items.length ? items[0] : null);
      } catch (err) {
        console.error("Course player error", err);
      } finally {
        setLoading(false);
      }
    };

    loadCourse();
  }, [courseId]);

  if (loading) return <div className="p-10">Loading course...</div>;
  if (!activeItem) return <div className="p-10">No content found</div>;

  return (
    <div className="h-screen bg-gray-100 flex">
      {/* LEFT SIDEBAR */}
      <CourseSidebar
        sections={sections}
        activeItemId={activeItem._id}
        onSelectItem={(item) => {
          setActiveItem(item);
          if (item.itemType === "quiz") {
            setQuizStarted(false); // reset quiz
            setShowQuizResult(false);
          }
        }}
      />

      {/* RIGHT CONTENT */}
      <div className="flex-1 overflow-y-auto bg-white p-6">
        {/* LESSON */}
        {activeItem.itemType === "lesson" && (
          <>
            <LessonInfo lesson={activeItem} />
            <VideoPlayer videoUrl={activeItem?.video?.url} />
          </>
        )}

        {/* ASSIGNMENT */}
        {activeItem.itemType === "assignment" && (
          <>
            <AssignmentInfo assignment={activeItem} />
            <AssignmentSubmission assignment={activeItem} />
          </>
        )}

        {/* QUIZ START SCREEN */}
        {activeItem.itemType === "quiz" && !quizStarted && !showQuizResult && (
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold mb-4">{activeItem.title}</h2>
            <p className="text-gray-600 mb-6">{activeItem.description}</p>
            <button
              onClick={() => setQuizStarted(true)}
              className="px-6 py-3 bg-black text-white rounded hover:bg-gray-900 transition"
            >
              Start Quiz
            </button>
          </div>
        )}

        {/* QUIZ PLAYER */}

        {activeItem.itemType === "quiz" && quizStarted && !showQuizResult && (
          <QuizPlayer
            quizId={activeItem._id}
            onSubmit={(answers, fullQuiz) => {
              // store both answers and full quiz
              setQuizAnswers({ answers, fullQuiz });

              // stop quiz
              setQuizStarted(false);
              setShowQuizResult(true);

              // ✅ replace activeItem with full quiz (ensure questions included)
              setActiveItem({
                ...fullQuiz,
                itemType: "quiz",
                questions: fullQuiz.questions || [],
              });
            }}
          />
        )}

        {/* QUIZ RESULT */}
        {activeItem.itemType === "quiz" && showQuizResult && (
          <QuizResult
            quiz={activeItem} // now contains questions
            answers={quizAnswers.answers} // student answers
          />
        )}
      </div>
    </div>
  );
}
