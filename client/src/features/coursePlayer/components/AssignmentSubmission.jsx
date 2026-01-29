import { useState } from "react";

export default function AssignmentSubmission({ assignment }) {
  const [answer, setAnswer] = useState(null);

  return (
    <div className="p-8">
      <h3 className="text-lg font-semibold mb-3">
        Submit Assignment
      </h3>

      {assignment.submissionType === "text" && (
        <textarea
          className="w-full border rounded p-3"
          rows={6}
          placeholder="Write your answer here..."
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      {assignment.submissionType === "file" && (
        <input
          type="file"
          onChange={(e) => setAnswer(e.target.files[0])}
        />
      )}

      {assignment.submissionType === "link" && (
        <input
          type="url"
          className="w-full border p-2 rounded"
          placeholder="Paste submission link"
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      <button
        className="mt-4 bg-blue-600 text-white px-5 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
