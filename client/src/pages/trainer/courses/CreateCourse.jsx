import { useState } from "react";
import { createCourse } from "../../../features/courses/services/courseService";
import { useNavigate } from "react-router-dom";


const CreateCourse = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    level: "beginner",
    language: "English",
    thumbnail: "",
  });

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setLoading(true);

  try {
    const res = await createCourse(form); // API call
    const courseId = res.data.id; // backend se id

    // Redirect to course builder page
    navigate(`/trainer/courses/${courseId}/builder`);
  } catch (err) {
    setError(err?.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* ===== Header ===== */}
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
          Create New Course
        </h1>
        <p className="text-sm text-gray-500">
          Fill course details to publish a new course
        </p>
      </div>

      {/* ===== Card ===== */}
      <div className="bg-white dark:bg-[#1f2337] rounded-xl shadow p-6">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* ===== Course Title ===== */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Course Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Complete Physics for Class 12"
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border dark:border-gray-700 dark:bg-[#252c45]
              text-sm focus:ring-2 focus:ring-blue-500 placeholder:text-gray-400 outline-none"
            />
          </div>

          {/* ===== Description ===== */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Course Description
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Brief overview of the course..."
              onChange={handleChange}
              required
              className="w-full px-4 py-2.5 rounded-lg border placeholder:text-gray-400 dark:border-gray-700 dark:bg-[#252c45]
              text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* ===== Grid Row ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Thumbnail */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Thumbnail URL
              </label>
              <input
                type="text"
                name="thumbnail"
                placeholder="https://image-url"
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border placeholder:text-gray-400 dark:border-gray-700 dark:bg-[#252c45]
                text-sm outline-none"
              />
            </div>

            {/* Price */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price (₹)
              </label>
              <input
                type="number"
                name="price"
                placeholder="Free / Paid"
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border placeholder:text-gray-400 dark:border-gray-700 dark:bg-[#252c45]
                text-sm outline-none"
              />
            </div>
          </div>

          {/* ===== Grid Row ===== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Level */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Course Level
              </label>
              <select
                name="level"
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg border dark:border-gray-700 dark:bg-[#252c45]
                text-sm outline-none"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>

            {/* Language */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Language
              </label>
              <input
                type="text"
                name="language"
                placeholder="English / Hindi"
                onChange={handleChange}
                className="w-full px-4 py-2.5 rounded-lg placeholder:text-gray-400 border dark:border-gray-700 dark:bg-[#252c45]
                text-sm outline-none"
              />
            </div>
          </div>

          {/* ===== Actions ===== */}
          <div className="flex items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="
    bg-blue-600 hover:bg-blue-700
    dark:bg-blue-500 dark:hover:bg-blue-600
    transition
    text-white px-6 py-2.5 rounded-lg
    text-sm font-medium
    disabled:opacity-50 disabled:cursor-not-allowed
  "
            >
              {loading ? "Creating..." : "Create Course"}
            </button>

            <span className="text-xs text-gray-400">
              You can edit course later
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCourse;
