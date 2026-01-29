import { useState } from "react";

export default function AssignmentSubmission({ assignment }) {
  const [answer, setAnswer] = useState(null);

  return (
    <div className="p-8">
      <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">
        Submit Assignment
      </h3>

      {assignment.submissionType === "text" && (
        <textarea
          className="w-full border border-gray-300 dark:border-gray-600 rounded p-3 bg-white dark:bg-[#1a1d2e] text-gray-900 dark:text-white"
          rows={6}
          placeholder="Write your answer here..."
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      {assignment.submissionType === "file" && (
        <input
          type="file"
          className="w-full text-gray-900 dark:text-white file:bg-blue-600 file:text-white file:border-0 file:rounded file:px-4 file:py-2"
          onChange={(e) => setAnswer(e.target.files[0])}
        />
      )}

      {assignment.submissionType === "link" && (
        <input
          type="url"
          className="w-full border border-gray-300 dark:border-gray-600 p-2 rounded bg-white dark:bg-[#1a1d2e] text-gray-900 dark:text-white"
          placeholder="Paste submission link"
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      <button
        className="mt-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white px-5 py-2 rounded transition"
      >
        Submit
      </button>
    </div>
  );
}
