import QuizToolbar from "./QuizToolbar";
import QuizCard from "./QuizCard";

const ActiveQuizzes = () => {
  return (
    <section>
      <QuizToolbar />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <QuizCard
          icon="/icons/ai.png"
          category="Machine Learning"
          title="Introduction to machine learning"
          time={15}
          questions={24}
          level="Advance"
        />

        <QuizCard
          icon="/icons/design.png"
          category="Formal design methods"
          title="Formal design methods: Formalism and..."
          time={15}
          questions={13}
          level="Intermediate"
        />

        <QuizCard
          icon="/icons/frontend.png"
          category="Frontend"
          title="Components and Properties"
          time={15}
          questions={24}
          level="Advance"
        />
      </div>

      <div className="text-center mt-6">
        <button className="text-sm text-gray-500 hover:text-blue-600">
          Show All Quizzes (12)
        </button>
      </div>
    </section>
  );
};

export default ActiveQuizzes;
