const statusBadge = {
  deadline: "bg-yellow-100 text-yellow-700",
  submitted: "bg-purple-100 text-purple-700",
  completed: "bg-green-100 text-green-700",
};

const AssignmentCard = ({ assignment }) => {
  return (
    <div className="bg-white dark:bg-[#1f2337] rounded-xl p-5 shadow-sm hover:shadow-md transition">

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <h4 className="text-sm font-semibold">
          {assignment.title}
        </h4>
        <span className="text-xs text-gray-400">
          Assigned • {assignment.date}
        </span>
      </div>

      {/* Description */}
      <p className="text-sm text-gray-500 mb-4">
        {assignment.description}
      </p>

      {/* Badges */}
      <div className="flex gap-2 mb-4">
        <span className="px-2 py-1 text-xs rounded-md bg-green-100 text-green-700">
          Marks - {assignment.marks}
        </span>

        {assignment.badge && (
          <span
            className={`px-2 py-1 text-xs rounded-md ${statusBadge[assignment.badge.type]}`}
          >
            {assignment.badge.text}
          </span>
        )}
      </div>

      {/* Progress */}
      <div>
        <p className="text-xs text-gray-400 mb-1">
          Assignment Progress
        </p>
        <div className="w-full h-1 bg-gray-200 rounded">
          <div
            className="h-1 bg-blue-500 rounded"
            style={{ width: `${assignment.progress}%` }}
          />
        </div>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-4">
        <div className="flex -space-x-2">
          {assignment.students.map((_, i) => (
            <div
              key={i}
              className="w-7 h-7 rounded-full bg-gray-300 border-2 border-white"
            />
          ))}
          <span className="text-xs text-gray-500 ml-3">
            +{assignment.extraStudents} Students
          </span>
        </div>

        {assignment.completed && (
          <span className="px-3 py-1 text-xs rounded-md bg-green-100 text-green-700">
            Completed
          </span>
        )}
      </div>
    </div>
  );
};

export default AssignmentCard;
