import { useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useTheme } from "@/hooks/useTheme"; // <-- import hook

const SidebarItem = ({ icon, label, to, children, isSidebarOpen }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const { theme } = useTheme(); // <-- get current theme

  const isActive = location.pathname.startsWith(to);

  useEffect(() => {
    if (isActive && isSidebarOpen) setOpen(true);
  }, [isActive, isSidebarOpen]);

  useEffect(() => {
    if (!isSidebarOpen) setOpen(false);
  }, [isSidebarOpen]);

  return (
    <li>
      {/* Parent */}
      <div
        onClick={() => isSidebarOpen && setOpen(prev => !prev)}
        className={`px-4 py-2 flex items-center justify-between rounded-md cursor-pointer transition-colors
          ${
            isActive
              ? "bg-blue-600 dark:bg-[#316aff] border-b-4 border-blue-700 dark:border-[#205fff] text-white"
              : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          }`}
      >
        {/* LEFT: ICON */}
        <div className="flex items-center gap-3">
          <span
            className={`w-6 flex justify-center text-lg transition-colors
              ${
                // active & light theme → white
                isActive && theme === "light"
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300"
              }`}
          >
            {icon}
          </span>

          {/* LABEL */}
          <span
            className={`whitespace-nowrap transition-all duration-200
              ${isSidebarOpen ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"}`}
          >
            {label}
          </span>
        </div>

        {/* Arrow */}
        {isSidebarOpen && (
          <FiChevronDown
            className={`transition-transform duration-200 
              ${
                // same as icon: active & light → white, else default
                isActive && theme === "light"
                  ? "text-white"
                  : "text-gray-700 dark:text-gray-300"
              } ${open ? "rotate-180" : ""}`}
          />
        )}
      </div>

      {/* Children */}
      {open && isSidebarOpen && (
        <ul className="ml-8 mt-1 space-y-1">
          {children &&
            children.map(child => child)}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
