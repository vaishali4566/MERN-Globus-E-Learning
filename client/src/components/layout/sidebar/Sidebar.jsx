
import SidebarLink from "./SidebarLink";
import {
  FiGrid,
  FiBookOpen,
  FiClipboard,
  FiCheckSquare,
  FiCalendar,
  FiVideo,
  FiTrendingUp,
  FiMessageSquare,
  FiBell,
  FiSearch,
  FiUser,
  FiSettings,
  FiHeart,
  FiHelpCircle,
} from "react-icons/fi";

const Sidebar = ({ isOpen }) => {


  return (
    <aside
      className={`h-screen fixed left-0 top-0 overflow-y-auto
        bg-white dark:bg-[#26283e] border-r border-gray-200 dark:border-white/10
        transition-all duration-300
        ${isOpen ? "w-60" : "w-20"}`}
    >
      {/* LOGO */}
      <div className="px-4 py-5.5 border-b border-gray-200 dark:border-white/10 flex items-center justify-center text-lg font-bold">
        {isOpen ? (
          <span className="text-gray-900 dark:text-white whitespace-nowrap">
            Globus E-Learning
          </span>
        ) : (
          <span className="text-gray-900 dark:text-white">GE</span>
        )}
      </div>

      {/* MENU */}
      <ul className="px-3 py-4 space-y-2 text-sm text-gray-900 dark:text-gray-300">
        {/* ===== CORE ===== */}
        <SidebarLink
          to="/student/dashboard"
          icon={<FiGrid />}
          label="Dashboard"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/student/my-courses"
          icon={<FiBookOpen />}
          label="My Courses"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/student/assignments"
          icon={<FiClipboard />}
          label="Assignments"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/student/quizzes"
          icon={<FiCheckSquare />}
          label="Quizzes & Tests"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/student/schedule"
          icon={<FiCalendar />}
          label="Schedule"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/student/live-classes"
          icon={<FiVideo />}
          label="Live Classes"
          isSidebarOpen={isOpen}
        />

        {/* ===== LEARNING ===== */}
        {isOpen && (
          <p className="px-4 mt-4 mb-2 text-xs uppercase text-gray-500 dark:text-gray-400">
            Learning
          </p>
        )}

        <SidebarLink
          to="/student/progress"
          icon={<FiTrendingUp />}
          label="Learning Progress"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/student/certificates"
          icon={<FiCheckSquare />}
          label="Certificates"
          isSidebarOpen={isOpen}
        />

        {/* ===== COMMUNICATION ===== */}
        {isOpen && (
          <p className="px-4 mt-4 mb-2 text-xs uppercase text-gray-500 dark:text-gray-400">
            Communication
          </p>
        )}

        <SidebarLink
          to="/student/chat"
          icon={<FiMessageSquare />}
          label="Messages"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/student/announcements"
          icon={<FiBell />}
          label="Announcements"
          isSidebarOpen={isOpen}
        />

        {/* ===== DISCOVERY ===== */}
        {isOpen && (
          <p className="px-4 mt-4 mb-2 text-xs uppercase text-gray-500 dark:text-gray-400">
            Discover
          </p>
        )}

        <SidebarLink
          to="/student/explore-courses"
          icon={<FiSearch />}
          label="Explore Courses"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/student/wishlist"
          icon={<FiHeart />}
          label="Wishlist"
          isSidebarOpen={isOpen}
        />

        {/* ===== ACCOUNT ===== */}
        {isOpen && (
          <p className="px-4 mt-4 mb-2 text-xs uppercase text-blue-500 dark:text-blue-400">
            Account
          </p>
        )}

        <SidebarLink
          to="/student/profile"
          icon={<FiUser />}
          label="Profile"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/student/settings"
          icon={<FiSettings />}
          label="Settings"
          isSidebarOpen={isOpen}
        />

        <SidebarLink
          to="/student/help"
          icon={<FiHelpCircle />}
          label="Help & Support"
          isSidebarOpen={isOpen}
        />
      </ul>
    </aside>
  );
};

export default Sidebar;
