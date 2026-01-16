import { useState } from "react";

export default function QuizModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    timeLimit: "",
    totalMarks: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title) return alert("Quiz title required");

    onSubmit({
      title: form.title,
      timeLimit: form.timeLimit,
      totalMarks: form.totalMarks,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-md bg-white dark:bg-[#1f2337] rounded-xl p-6 space-y-4">

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Add Quiz
        </h2>

        <input
          name="title"
          placeholder="Quiz title"
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="number"
            name="timeLimit"
            placeholder="Time (mins)"
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            name="totalMarks"
            placeholder="Total marks"
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 text-sm"
          />
        </div>

        <div className="flex justify-end gap-2 pt-4">
          <button onClick={onClose} className="px-4 py-2 text-sm border rounded-lg">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm bg-green-600 text-white rounded-lg"
          >
            Add Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
