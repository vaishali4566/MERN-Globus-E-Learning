import QuizCard from "./QuizCard";

const CompletedQuizzes = () => {
  return (
    <section className="mt-10">
      <h2 className="text-lg font-semibold mb-6">Completed Quizzes</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        <QuizCard
          icon="/icons/ai.png"
          category="Machine Learning"
          title="Introduction to machine learning"
          time={15}
          questions={24}
          level="Advance"
          completed
        />

        <QuizCard
          icon="/icons/frontend.png"
          category="Frontend"
          title="Components and Properties"
          time={15}
          questions={24}
          level="Advance"
          completed
        />
      </div>
    </section>
  );
};

export default CompletedQuizzes;
