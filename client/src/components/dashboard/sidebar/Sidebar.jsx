import { NavLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import SidebarLink from "./SidebarLink";
import {
  FiGrid,
  FiUser,
  FiCalendar,
  FiMail,
  FiSettings,
  FiBarChart2,
} from "react-icons/fi";

const Sidebar = ({ isOpen }) => {

  const childLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition-colors
     ${
       isActive
         ? "bg-red-600 text-white dark:bg-blue-500"
         : "text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
     }`;

  return (
    <aside
      className={`h-screen fixed left-0 top-0 overflow-y-auto
        bg-white dark:bg-[#26283e] border-r border-gray-200 dark:border-white/10
        transition-all duration-300 text-gray-900 dark:text-gray-300
        ${isOpen ? "w-60" : "w-20"}`}
    >
      {/* LOGO */}
      <div className="px-4 py-5.5 border-b border-gray-200 dark:border-white/10 flex items-center justify-center text-lg font-bold">
        {isOpen ? (
          <span className="whitespace-nowrap text-gray-900 dark:text-white">
            Globus E-Learning
          </span>
        ) : (
          <span className="text-gray-900 dark:text-white">GE</span>
        )}
      </div>

      {/* MENU */}
      <ul className="px-3 py-4 space-y-2 text-sm">
        {/* DASHBOARD */}
        <SidebarLink
          icon={<FiGrid />}
          label="Dashboard"
          to="/dashboard"
          isSidebarOpen={isOpen}
       />
         
        

        {/* SECTION TITLE */}
        {/* {isOpen && (
          <p className="px-4 mt-4 mb-2 text-xs uppercase text-gray-500 dark:text-gray-400 whitespace-nowrap">
            Apps & Pages
          </p>
        )} */}

        <SidebarLink
          to="/my-courses"
          icon={<FiMail />}
          label="My Courses"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/chat"
          icon={<FiMail />}
          label="Chat"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/assignment"
          icon={<FiCalendar />}
          label="Assignment"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/progress"
          icon={<FiMail />}
          label="Progress"
          isSidebarOpen={isOpen}
        />

        {/* USERS
        <SidebarItem
          icon={<FiUser />}
          label="Users"
          to="/users"
          isSidebarOpen={isOpen}
        >
          <NavLink to="/users/students" className={childLinkClass}>
            Students
          </NavLink>
          <NavLink to="/users/trainers" className={childLinkClass}>
            Trainers
          </NavLink>
        </SidebarItem> */}

        {/* REPORTS */}
        {/* <SidebarItem
          icon={<FiBarChart2 />}
          label="Reports"
          to="/reports"
          isSidebarOpen={isOpen}
        >
          <NavLink to="/reports/attendance" className={childLinkClass}>
            Attendance
          </NavLink>
          <NavLink to="/reports/progress" className={childLinkClass}>
            Progress
          </NavLink>
        </SidebarItem> */}

        {/* SECTION TITLE */}
        {isOpen && (
          <p className="px-4 mt-4 mb-2 text-xs uppercase text-blue-500 dark:text-blue-400 whitespace-nowrap">
            Other Menu
          </p>
        )}

        <SidebarLink
          to="/help-center"
          icon={<FiSettings />}
          label="Help Center"
          isSidebarOpen={isOpen}
        />

        {/* SETTINGS */}
        <SidebarLink
          to="/settings"
          icon={<FiSettings />}
          label="Settings"
          isSidebarOpen={isOpen}
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
