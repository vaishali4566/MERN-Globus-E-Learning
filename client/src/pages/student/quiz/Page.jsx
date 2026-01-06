import ActiveQuizzes from "@/features/quiz/components/ActiveQuizzes";
import CompletedQuizzes from "@/features/quiz/components/CompletedQuizzes";

const Page = () => {
  return (
    <div className="space-y-8">
      <ActiveQuizzes />
      <CompletedQuizzes />
    </div>
  );
};

export default Page;