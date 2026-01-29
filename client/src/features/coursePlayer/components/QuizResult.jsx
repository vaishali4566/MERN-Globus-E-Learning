import React, { useEffect } from "react";

export default function QuizResult({ quiz, answers }) {
  useEffect(() => {
    console.log("QuizResult mounted:", quiz, answers);
  }, [quiz, answers]);

  if (!quiz) return <div>Quiz data not found!</div>;
  if (!quiz.questions?.length)
    return <div>No questions available in this quiz!</div>;

  // calculate score
  let totalMarks = 0;
  let obtainedMarks = 0;

  quiz.questions.forEach((q) => {
    totalMarks += q.marks || 1;

    const selected = answers?.[q._id?.toString()];
    const correctOption = q.options?.find((o) => o.isCorrect);

    if (
      selected?.toString() === correctOption?._id?.toString()
    ) {
      obtainedMarks += q.marks || 1;
    }
  });

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold mb-4">
        {quiz.title} - Result
      </h2>

      <p className="mb-6 text-gray-700">
        Score: {obtainedMarks} / {totalMarks}
      </p>

      {quiz.questions.map((q, index) => {
        const selected = answers?.[q._id?.toString()];

        return (
          <div key={q._id} className="border rounded-lg p-5 bg-gray-50">
            <div className="flex items-start gap-3">
              <span className="font-medium text-gray-400">
                {index + 1}.
              </span>
              <p className="font-medium text-gray-900">{q.text}</p>
            </div>

            <div className="mt-4 ml-6 space-y-3">
              {q.options.map((opt) => {
                const isSelected =
                  selected?.toString() === opt._id?.toString();
                const correct = opt.isCorrect;

                return (
                  <div
                    key={opt._id}
                    className={`flex items-center gap-3 p-3 rounded border
                      ${
                        correct
                          ? "border-green-500 bg-green-100"
                          : isSelected
                          ? "border-red-500 bg-red-100"
                          : "border-gray-200"
                      }
                    `}
                  >
                    <span className="text-sm text-gray-800">
                      {opt.text}
                    </span>

                    {correct && (
                      <span className="ml-auto text-green-600 font-semibold">
                        ✔
                      </span>
                    )}

                    {isSelected && !correct && (
                      <span className="ml-auto text-red-600 font-semibold">
                        ✖
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
