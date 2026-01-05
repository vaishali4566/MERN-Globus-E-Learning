import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./Navbar";
import { useTheme } from "@/hooks/useTheme";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme } = useTheme();

  return (
    // Top-level div gets the `dark` class for Tailwind
    <div className={`${theme === "dark" ? "dark" : ""} flex min-h-screen`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Right section */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300
        ${isSidebarOpen ? "ml-60" : "ml-20"}`}
      >
        {/* Navbar */}
        <Navbar toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />

        {/* Main content */}
        <main className="p-6 flex-1 bg-white dark:bg-[#26283e] text-gray-900 dark:text-white transition-all duration-300">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
