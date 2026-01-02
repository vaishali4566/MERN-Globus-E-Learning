import { NavLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import {
  FiGrid,
  FiUser,
  FiCalendar,
  FiMail,
  FiSettings,
  FiBarChart2,
} from "react-icons/fi";

const Sidebar = () => {
  const linkClass = ({ isActive }) =>
    `px-4 py-2 flex items-center gap-3 rounded-md cursor-pointer transition-colors
     ${
       isActive
         ? "bg-[#316aff] text-white"
         : "text-gray-300 hover:text-[#316aff]"
     }`;

  const childLinkClass = ({ isActive }) =>
    `block px-4 py-2 rounded-md transition-colors
     ${
       isActive
         ? "bg-[#316aff] text-white"
         : "text-gray-400 hover:text-[#316aff]"
     }`;

  return (
    <aside className="w-60 bg-[#282b44] border border-white/10 text-white h-screen fixed left-0 top-0 overflow-y-auto">
      
      {/* LOGO */}
      <div className="px-4 py-6 border-b text-center border-white/10 text-lg font-bold">
        Globus E-Learning
      </div>

      {/* MENU */}
      <ul className="px-3 py-4 space-y-2 text-sm">

        {/* DASHBOARD */}
        <SidebarItem icon={<FiGrid />} label="Dashboard" to="/dashboard">
          <NavLink to="/dashboard/overview" className={childLinkClass}>
            Overview
          </NavLink>
          <NavLink to="/dashboard/analytics" className={childLinkClass}>
            Analytics
          </NavLink>
        </SidebarItem>

        {/* APPS */}
        <p className="px-4 mt-4 mb-2 text-xs uppercase text-gray-400">
          Apps & Pages
        </p>

        <NavLink to="/chat" className={linkClass}>
          <FiMail /> Chat
        </NavLink>

        <NavLink to="/calendar" className={linkClass}>
          <FiCalendar /> Calendar
        </NavLink>

        {/* USERS */}
        <SidebarItem icon={<FiUser />} label="Users" to="/users">
          <NavLink to="/users/students" className={childLinkClass}>
            Students
          </NavLink>
          <NavLink to="/users/trainers" className={childLinkClass}>
            Trainers
          </NavLink>
        </SidebarItem>

        {/* REPORTS */}
        <SidebarItem icon={<FiBarChart2 />} label="Reports" to="/reports">
          <NavLink to="/reports/attendance" className={childLinkClass}>
            Attendance
          </NavLink>
          <NavLink to="/reports/progress" className={childLinkClass}>
            Progress
          </NavLink>
        </SidebarItem>

        {/* SETTINGS */}
        <NavLink to="/settings" className={linkClass}>
          <FiSettings /> Settings
        </NavLink>
      </ul>
    </aside>
  );
};

export default Sidebar;
