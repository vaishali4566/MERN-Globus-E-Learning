import { useLocation } from "react-router-dom";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useState } from "react";

const SidebarItem = ({ icon, label, to, children }) => {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  // 🔥 Check if any child route is active
  const isActive = location.pathname.startsWith(to);

  // 🔥 Auto open when child route active
  useEffect(() => {
    if (isActive) {
      setOpen(true);
    }
  }, [isActive]);

  return (
    <li>
      {/* Parent */}
      <div
        onClick={() => setOpen(prev => !prev)}
        className={`px-4 py-2 flex items-center justify-between rounded-md cursor-pointer transition-colors
        ${
          isActive
            ? "bg-[#316aff] border-b-4 border-[#205fff] text-white"
            : "text-gray-300 hover:text-[#316aff]"
        }`}
      >
        <div className="flex items-center gap-3">
          {icon}
          <span>{label}</span>
        </div>

        <FiChevronDown
          className={`transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </div>

      {/* Children */}
      {open && (
        <ul className="ml-8 mt-1 space-y-1">
          {children}
        </ul>
      )}
    </li>
  );
};

export default SidebarItem;
