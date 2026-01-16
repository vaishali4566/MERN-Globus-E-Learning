const tabs = ["To Do", "In Progress", "Submit"];

const AssignmentTabs = ({ active, setActive }) => {
  return (
    <div className="flex gap-3 bg-gray-100 dark:bg-[#1f2337] p-2 rounded-lg">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActive(tab)}
          className={`px-5 py-2 text-sm rounded-lg transition
            ${active === tab
              ? "bg-white shadow text-blue-500"
              : "text-gray-500 hover:bg-white/70"}`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

export default AssignmentTabs;
