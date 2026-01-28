export default function CourseSection({ title, children }) {
  return (
    <div className="border-b">
      <div className="flex items-center justify-between p-4 font-medium">
        📂 {title}
      </div>
      <div className="pl-6 pb-2">{children}</div>
    </div>
  );
}
