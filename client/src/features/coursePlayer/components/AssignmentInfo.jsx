export default function AssignmentInfo({ assignment }) {
  return (
    <div className="p-8 border-b bg-white">
      <h2 className="text-2xl font-semibold mb-2">
        {assignment.title}
      </h2>

      <div className="text-sm text-gray-500 mb-4">
        Max Marks: {assignment.maxMarks}
        {assignment.dueDate && (
          <> | Due: {new Date(assignment.dueDate).toDateString()}</>
        )}
      </div>

      <pre className="whitespace-pre-wrap text-gray-800 text-sm">
        {assignment.instructions}
      </pre>
    </div>
  );
}
