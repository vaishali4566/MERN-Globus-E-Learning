import { useState } from "react";
import AssignmentTabs from "../../../features/assignments/components/AssignmentTabs";
import AssignmentColumn from "../../../features/assignments/components/AssignmentColumn";

const Page = () => {
  const [activeTab, setActiveTab] = useState("To Do");

  const assignments = {
    "To Do": [
      {
        id: 1,
        title: "User Persona",
        description: "Experiment with solar powered robot or testing.",
        date: "21/05/2025",
        marks: 50,
        progress: 40,
        badge: { type: "deadline", text: "Deadline 27/05/2025" },
        students: [1, 2, 3],
        extraStudents: 34,
      },
    ],
    "In Progress": [
      {
        id: 2,
        title: "Typography (ii)",
        description: "Experiment with solar powered robot or testing.",
        date: "21/05/2025",
        marks: 50,
        progress: 60,
        badge: { type: "deadline", text: "Deadline 27/05/2025" },
        students: [1, 2, 3],
        extraStudents: 34,
      },
    ],
    Submit: [
      {
        id: 3,
        title: "Brand Awareness",
        description: "Experiment with solar powered robot or testing.",
        date: "21/05/2025",
        marks: 50,
        progress: 100,
        badge: { type: "submitted", text: "Submitted 25/05/2025" },
        completed: true,
        students: [1, 2, 3],
        extraStudents: 34,
      },
    ],
  };

  return (
    
        <div className="space-y-6">

      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Assignment</h1>
        <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded">
          Total Assignments 23
        </span>
      </div>

      {/* Tabs */}
      <AssignmentTabs active={activeTab} setActive={setActiveTab} />

      {/* Cards */}
      <AssignmentColumn assignments={assignments[activeTab]} />

    </div>
    
  );
};

export default Page;
