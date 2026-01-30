import { useState, useEffect } from "react";
import AssignmentTabs from "../../../features/assignments/components/AssignmentTabs";
import AssignmentColumn from "../../../features/assignments/components/AssignmentColumn";
import { getStudentAssignments } from "../../../features/courses/services/assignmentService";

const Page = () => {
  const [activeTab, setActiveTab] = useState("To Do");
  const [assignments, setAssignments] = useState({
    "To Do": [],
    "In Progress": [],
    Submit: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const data = await getStudentAssignments();

      // Categorize assignments by status
      const categorized = {
        "To Do": [],
        "In Progress": [],
        Submit: [],
      };

      data.forEach((assignment) => {
        const formattedAssignment = {
          id: assignment._id,
          title: assignment.title,
          description: assignment.instructions,
          date: assignment.createdAt
            ? new Date(assignment.createdAt).toLocaleDateString("en-GB")
            : "N/A",
          marks: assignment.maxMarks,
          progress: assignment.marksObtained
            ? Math.round((assignment.marksObtained / assignment.maxMarks) * 100)
            : 0,
          submissionType: assignment.submissionType,
          courseName: assignment.course?.title || "Unknown Course",
          sectionName: assignment.section?.title || "Unknown Section",
          dueDate: assignment.dueDate
            ? new Date(assignment.dueDate).toLocaleDateString("en-GB")
            : null,
          students: [1, 2, 3], // placeholder
          extraStudents: 0,
          completed: assignment.status === "submitted",
          submitted: assignment.submitted,
        };

        // Determine badge type
        if (assignment.status === "submitted") {
          formattedAssignment.badge = {
            type: "submitted",
            text: `Submitted ${new Date(assignment.submittedAt).toLocaleDateString("en-GB")}`,
          };
          categorized["Submit"].push(formattedAssignment);
        } else if (assignment.status === "pending") {
          formattedAssignment.badge = {
            type: "deadline",
            text: assignment.dueDate
              ? `Deadline ${new Date(assignment.dueDate).toLocaleDateString("en-GB")}`
              : "No deadline",
          };
          categorized["In Progress"].push(formattedAssignment);
        } else {
          formattedAssignment.badge = {
            type: "deadline",
            text: assignment.dueDate
              ? `Deadline ${new Date(assignment.dueDate).toLocaleDateString("en-GB")}`
              : "No deadline",
          };
          categorized["To Do"].push(formattedAssignment);
        }
      });

      setAssignments(categorized);
      setTotalCount(data.length);
    } catch (err) {
      console.error("Error fetching assignments:", err);
      setError(err.message || "Failed to load assignments");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Assignment</h1>
          <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-semibold">Assignment</h1>
        </div>
        <div className="text-red-600 bg-red-50 p-4 rounded">
          Error: {error}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-semibold">Assignment</h1>
        <span className="text-sm text-blue-600 bg-blue-50 px-3 py-1 rounded">
          Total Assignments {totalCount}
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
