import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <Sidebar />

      <div className="ml-60 flex flex-col flex-1 min-h-screen">
        <Navbar />
        <main className="p-6 bg-[#26283e] text-white flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
