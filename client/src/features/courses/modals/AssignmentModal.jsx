import { useState } from "react";

export default function AssignmentModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "",
    instructions: "",
    dueDate: "",
    maxMarks: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!form.title) return alert("Assignment title required");

    onSubmit({
      title: form.title,
      instructions: form.instructions,
      dueDate: form.dueDate,
      maxMarks: form.maxMarks,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="w-full max-w-lg bg-white dark:bg-[#1f2337] rounded-xl p-6 space-y-4">

        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Add Assignment
        </h2>

        <input
          name="title"
          placeholder="Assignment title"
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <textarea
          name="instructions"
          placeholder="Assignment instructions"
          rows={4}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm"
        />

        <div className="grid grid-cols-2 gap-3">
          <input
            type="date"
            name="dueDate"
            onChange={handleChange}
            className="border rounded-lg px-3 py-2 text-sm"
          />

          <input
            type="number"
            name="maxMarks"
            placeholder="Max marks"
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
            className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg"
          >
            Add Assignment
          </button>
        </div>
      </div>
    </div>
  );
}
