import { ChevronDown } from "lucide-react";
import ContentCard from "./ContentCard";
import ContentTypeButtons from "./ContentTypeButtons";

export default function SectionCard({
  section,
  setCourse,
  openAddContentModal,
  removeContent,
}) {


  const updateTitle = (title) => {
    setCourse((c) => ({
      ...c,
      sections: c.sections.map((s) =>
        s._id === section._id ? { ...s, title } : s
      ),
    }));
  };

  return (
    <div
      className="bg-white dark:bg-[#1f2337]
      rounded-xl p-4 shadow-sm hover:shadow-md transition"
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <input
          value={section.title}
          onChange={(e) => updateTitle(e.target.value)}
          className="w-full text-sm font-semibold bg-transparent outline-none
          text-gray-900 dark:text-white"
        />
        <ChevronDown size={18} className="text-gray-400" />
      </div>

      <div className="h-px bg-gray-200 dark:bg-gray-700 mb-4" />

      {/* Content List */}
      {section.contents.length > 0 ? (
        <div className="space-y-2">
          {section.contents.map((item, index) => (
            <ContentCard
              key={item._id || item.id || `content-${section._id}-${index}`}
              content={item}
              sectionId={section._id}
              onRemove={removeContent}
            />
          ))}
        </div>
      ) : (
        <p className="text-xs text-gray-400 dark:text-gray-500">
          No content added yet
        </p>
      )}

      <ContentTypeButtons
        sectionId={section._id}
        openAddContentModal={openAddContentModal}
      />
    </div>
  );
}
