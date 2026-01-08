import SidebarLink from "./SidebarLink";
import * as Icons from "react-icons/fi";
import { getUserRole } from "@/utils/getUser";

// Role-based links configuration
const sidebarConfig = {
  student: [
    { section: "Core", items: [
      { to: "/student/dashboard", label: "Dashboard", icon: "FiGrid" },
      { to: "/student/my-courses", label: "My Courses", icon: "FiBookOpen" },
      { to: "/student/assignments", label: "Assignments", icon: "FiClipboard" },
      { to: "/student/quizzes", label: "Quizzes & Tests", icon: "FiCheckSquare" },
      { to: "/student/schedule", label: "Schedule", icon: "FiCalendar" },
      { to: "/student/live-classes", label: "Live Classes", icon: "FiVideo" },
    ]},
    { section: "Learning", items: [
      { to: "/student/progress", label: "Learning Progress", icon: "FiTrendingUp" },
      { to: "/student/certificates", label: "Certificates", icon: "FiCheckSquare" },
    ]},
    { section: "Communication", items: [
      { to: "/student/chat", label: "Messages", icon: "FiMessageSquare" },
      { to: "/student/announcements", label: "Announcements", icon: "FiBell" },
    ]},
    { section: "Discover", items: [
      { to: "/student/explore-courses", label: "Explore Courses", icon: "FiSearch" },
      { to: "/student/wishlist", label: "Wishlist", icon: "FiHeart" },
    ]},
    { section: "Account", items: [
      { to: "/student/profile", label: "Profile", icon: "FiUser" },
      { to: "/student/settings", label: "Settings", icon: "FiSettings" },
      { to: "/student/help", label: "Help & Support", icon: "FiHelpCircle" },
    ]}
  ],

  trainer: [
    {
      section: "Core",
      items: [
        { to: "/trainer/dashboard", label: "Dashboard", icon: "FiGrid" },
        { to: "/trainer/my-courses", label: "My Courses", icon: "FiBookOpen" },
        { to: "/trainer/assignments", label: "Assignments", icon: "FiClipboard" },
        { to: "/trainer/quizzes", label: "Quizzes & Tests", icon: "FiCheckSquare" },
        { to: "/trainer/schedule", label: "Schedule", icon: "FiCalendar" },
        { to: "/trainer/live-classes", label: "Live Classes", icon: "FiVideo" },
      ],
    },
    {
      section: "Learning",
      items: [
        { to: "/trainer/progress", label: "Student Progress", icon: "FiTrendingUp" },
        { to: "/trainer/certificates", label: "Certificates", icon: "FiCheckSquare" },
      ],
    },
    {
      section: "Communication",
      items: [
        { to: "/trainer/chat", label: "Messages", icon: "FiMessageSquare" },
        { to: "/trainer/announcements", label: "Announcements", icon: "FiBell" },
      ],
    },
    {
      section: "Analytics & Revenue",
      items: [
        { to: "/trainer/analytics", label: "Analytics", icon: "FiActivity" },
        { to: "/trainer/revenue", label: "Revenue", icon: "FiDollarSign" },
      ],
    },
    {
      section: "Account",
      items: [
        { to: "/trainer/profile", label: "Profile", icon: "FiUser" },
        { to: "/trainer/settings", label: "Settings", icon: "FiSettings" },
        { to: "/trainer/help", label: "Help & Support", icon: "FiHelpCircle" },
      ],
    },
  ],
};

const Sidebar = ({ isOpen }) => {
  const role = getUserRole();
  const links = sidebarConfig[role] || sidebarConfig["student"];

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
        {links.map((section, idx) => (
          <div key={idx}>
            {isOpen && (
              <p className={`px-4 mt-4 mb-2 text-xs uppercase ${
                section.section === "Account" ? "text-blue-500 dark:text-blue-400" : "text-gray-500 dark:text-gray-400"
              }`}>
                {section.section}
              </p>
            )}
            {section.items.map((item, index) => {
              const Icon = Icons[item.icon]; // dynamic icon
              return (
                <SidebarLink
                  key={index}
                  to={item.to}
                  icon={Icon ? <Icon /> : null}
                  label={item.label}
                  isSidebarOpen={isOpen}
                />
              );
            })}
          </div>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
