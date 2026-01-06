import { NavLink } from "react-router-dom";

const SidebarLink = ({ to, icon, label, isSidebarOpen }) => {
  return (
    <NavLink to={to}>
      {({ isActive }) => (
        <div
          className={`px-4 py-2 mb-2 flex items-center rounded-md cursor-pointer transition-colors
            ${
              isActive
                ? "bg-blue-500 dark:bg-blue-500 text-white border-b-4 border-[#0f5996]"
                : "text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
            }`}
        >
          {/* LEFT: icon + label */}
          <div className="flex items-center gap-3 flex-1">
            {/* ICON */}
            <span
              className={`w-6 flex justify-center text-xl transition-colors
                ${
                  isActive
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
            >
              {icon}
            </span>

            {/* LABEL */}
            <span
              className={`whitespace-nowrap transition-all duration-200
                ${
                  isSidebarOpen
                    ? "opacity-100 w-auto"
                    : "opacity-0 w-0 overflow-hidden"
                }`}
            >
              {label}
            </span>
          </div>

          {/* RIGHT SPACE */}
          <span className="w-4" />
        </div>
      )}
    </NavLink>
  );
};

export default SidebarLink;
