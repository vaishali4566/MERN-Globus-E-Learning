import AssignmentCard from "./AssignmentCard";

const AssignmentColumn = ({ assignments }) => {
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
      {assignments.map((a) => (
        <AssignmentCard key={a.id} assignment={a} />
      ))}
    </div>
  );
};

export default AssignmentColumn;
