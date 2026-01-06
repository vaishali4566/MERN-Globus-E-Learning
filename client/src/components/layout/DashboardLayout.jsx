import { useState } from "react";
import Sidebar from "./sidebar/Sidebar";
import Navbar from "./Navbar";
import { useTheme } from "@/hooks/useTheme";

const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { theme } = useTheme();

  return (
    <div className={`${theme === "dark" ? "dark" : ""} flex min-h-screen`}>
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} />

      {/* Right section */}
      <div
        className={`flex flex-col flex-1 transition-all duration-300
        ${isSidebarOpen ? "ml-60" : "ml-20"}`}
      >
        {/* Fixed Navbar */}
        <Navbar
          toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          isSidebarOpen={isSidebarOpen}
        />

        {/* Main content */}
        <main className="pt-25 p-15 flex-1 bg-white dark:bg-[#1f2035]
                         text-gray-900 dark:text-white transition-all">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
