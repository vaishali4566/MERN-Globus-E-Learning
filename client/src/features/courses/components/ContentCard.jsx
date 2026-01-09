import { BookOpen, ClipboardList, HelpCircle, X } from "lucide-react";

const typeConfig = {
  lesson: {
    label: "Lesson",
    icon: BookOpen,
    badge: "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  },
  assignment: {
    label: "Assignment",
    icon: ClipboardList,
    badge:
      "bg-purple-100 text-purple-600 dark:bg-purple-500/20 dark:text-purple-400",
  },
  quiz: {
    label: "Quiz",
    icon: HelpCircle,
    badge:
      "bg-green-100 text-green-600 dark:bg-green-500/20 dark:text-green-400",
  },
};

export default function ContentCard({
  content,
  sectionId,
  onRemove,
}) {
  const config = typeConfig[content.type];
  const Icon = config.icon;

  return (
    <div
      className="group bg-white dark:bg-[#1f2337]
      rounded-xl p-3 shadow-sm hover:shadow-md
      transition flex items-start gap-3"
    >
      {/* Icon */}
      <div
        className={`p-2 rounded-lg ${config.badge} flex items-center justify-center`}
      >
        <Icon size={16} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
          {content.title}
        </h4>

        <span
          className={`inline-block mt-1 text-[10px] px-2 py-0.5 rounded-full font-medium ${config.badge}`}
        >
          {config.label}
        </span>
      </div>

      {/* Remove Button */}
      <button
        onClick={() => onRemove(sectionId, content.id)}
        className="opacity-0 group-hover:opacity-100
        p-1 rounded-md transition
        hover:bg-red-100 dark:hover:bg-red-500/20"
      >
        <X
          size={14}
          className="text-red-500"
        />
      </button>
    </div>
  );
}
