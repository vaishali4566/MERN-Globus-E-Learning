import { useEffect, useState } from "react";
import { getQuizById } from "../services/coursePlayer.service";
import QuizTimer from "./QuizTimer";
import QuizResult from "./QuizResult"; 

export default function QuizPlayer({ quizId, onSubmit }) {
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await getQuizById(quizId);
        setQuiz({
          ...data.quiz,
          questions: data.questions,
        });
      } catch (err) {
        console.error("Quiz load error", err);
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [quizId]);

  const handleSelect = (questionId, optionId) => {
    if (submitted) return;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionId,
    }));
  };

  const handleSubmit = () => {
    console.log("Student Answers:", answers);
    setSubmitted(true);
    setShowResult(true); // show result in same component
    console.log(showResult)

    // 🔜 optional: send answers to backend
    if (onSubmit) onSubmit(answers, quiz); // callback to parent if needed
  };

  const handleTimeUp = () => {
    console.log("Time's up! Auto-submitting...");
    handleSubmit();
  };

  if (loading) return <div className="p-10">Loading quiz...</div>;
  if (!quiz) return <div className="p-10">Quiz not found</div>;

  const attemptedCount = Object.keys(answers).length;

  return (
    <div className="max-w-4xl mx-auto p-8">
      {/* HEADER */}
      {!showResult && (
        <div className="border-b pb-6 mb-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">{quiz.title}</h1>
            <p className="text-gray-600 mt-1">{quiz.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <QuizTimer timeLimitMinutes={quiz.timeLimit} onTimeUp={handleTimeUp} />
          </div>
        </div>
      )}

      {/* QUIZ META */}
      {!showResult && (
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="border rounded-md p-3 text-center">
            <p className="text-xs text-gray-500">Questions</p>
            <p className="font-semibold text-gray-900">{quiz.questions.length}</p>
          </div>

          <div className="border rounded-md p-3 text-center">
            <p className="text-xs text-gray-500">Total Marks</p>
            <p className="font-semibold text-gray-900">{quiz.totalMarks}</p>
          </div>

          <div className="border rounded-md p-3 text-center">
            <p className="text-xs text-gray-500">Pass Marks</p>
            <p className="font-semibold text-gray-900">{quiz.passMarks}</p>
          </div>

          <div className="border rounded-md p-3 text-center">
            <p className="text-xs text-gray-500">Answered</p>
            <p className="font-semibold text-gray-900">{attemptedCount} / {quiz.questions.length}</p>
          </div>
        </div>
      )}

      {/* QUIZ QUESTIONS */}
      {!showResult && (
        <div className="space-y-6">
          {quiz.questions.map((q, index) => (
            <div
              key={q._id}
              className={`border rounded-lg p-5 transition ${submitted ? "bg-gray-50" : "hover:shadow-sm"}`}
            >
              <div className="flex items-start gap-3">
                <span className="font-medium text-gray-400">{index + 1}.</span>
                <p className="font-medium text-gray-900">{q.text}</p>
              </div>

              <div className="mt-4 ml-6 space-y-3">
                {q.options.map((opt) => {
                  const selected = answers[q._id] === opt._id;
                  const correct = submitted && opt.isCorrect;

                  return (
                    <label
                      key={opt._id}
                      className={`flex items-center gap-3 p-3 rounded border cursor-pointer transition
                        ${
                          submitted
                            ? correct
                              ? "border-green-500 bg-green-100"
                              : selected
                              ? "border-red-500 bg-red-100"
                              : "border-gray-200 bg-gray-50"
                            : selected
                            ? "border-black bg-gray-100"
                            : "border-gray-200 hover:bg-gray-50"
                        }
                      `}
                    >
                      <input
                        type="radio"
                        name={q._id}
                        checked={selected}
                        onChange={() => handleSelect(q._id, opt._id)}
                        className="accent-black"
                        disabled={submitted}
                      />
                      <span className="text-sm text-gray-800">{opt.text}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* SUBMIT BUTTON */}
      {!showResult && (
        <div className="mt-10 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            {submitted
              ? "Quiz Submitted"
              : `Answered ${attemptedCount} / ${quiz.questions.length}`}
          </p>

          <button
            onClick={handleSubmit}
            disabled={submitted || attemptedCount !== quiz.questions.length}
            className={`px-6 py-2 rounded text-sm font-medium transition
              ${
                attemptedCount === quiz.questions.length && !submitted
                  ? "bg-black text-white hover:bg-gray-900"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {submitted ? "Submitted" : "Submit Quiz"}
          </button>
        </div>
      )}

      {/* QUIZ RESULT */}
      {showResult && <QuizResult quiz={quiz} answers={answers} />}
    </div>
  );
}