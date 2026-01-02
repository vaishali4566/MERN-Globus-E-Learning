import { useState } from "react";
import {
  FiSearch,
  FiMenu,
  FiBell,
  FiMail,
  FiCalendar,
  FiMoon,
} from "react-icons/fi";
import { RiArrowDropDownLine } from "react-icons/ri";

const Navbar = () => {
  const [openProfile, setOpenProfile] = useState(false);

  return (
    <header className="w-full text-[#aeb5c4] bg-[#282b44] border-b border-white/10 px-4 py-4 flex items-center justify-between">
      {/* LEFT SIDE */}
      <div className="flex items-center gap-4">
        {/* Sidebar Toggler */}
        {/* Sidebar Toggle */}
        <button className="w-9 h-9 flex items-center justify-center rounded-md hover:bg-[#3e4161]">
          <FiMenu size={20} />
        </button>

        {/* Search */}
        <div className="hidden md:flex items-center relative">
          <FiSearch className="absolute left-3 text-[#aeb5c4]" />
          <input
            type="text"
            placeholder="Search anything..."
            className="pl-10 pr-4 py-2 text-sm border w-100 border-[#515268] placeholder:text-[#aeb5c4] rounded-full bg-[#282b44] focus:outline-none"
          />
        </div>

        {/* Links */}
        <div className="hidden xl:flex gap-6 text-sm text-[#aeb5c4]">
          <a href="#">Reports & Analytics</a>
          <a href="#">Help</a>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle */}
        <button className="w-9 h-9 cursor-pointer rounded-full flex items-center justify-center hover:bg-[#3e4161]">
          <FiMoon />
        </button>

        <div className="h-10 w-[1px]  bg-[#51545e]" />
        {/* Mail */}
        <button className="relative w-9 cursor-pointer h-9 rounded-full flex items-center justify-center hover:bg-[#3e4161]">
          <FiMail />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Notifications */}
        <button className="w-9 h-9 cursor-pointer rounded-full flex items-center justify-center hover:bg-[#3e4161]">
          <FiBell />
        </button>

        {/* Calendar */}
        <button className="w-9 h-9 cursor-pointer rounded-full flex items-center justify-center hover:bg-[#3e4161]">
          <FiCalendar />
        </button>

        <div className="h-10 w-[1px]  bg-[#51545e]" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setOpenProfile(!openProfile)}
            className="flex cursor-pointer items-center gap-2"
          >
            <div className="text-right hidden lg:block">
              <p className="text-sm font-semibold">Robert Brown</p>
              <div className="flex items-center">
                <RiArrowDropDownLine className="text-[#aeb5c4] w-6 h-6" />
                <p className="text-xs text-gray-500">Manager</p>
              </div>
            </div>
            <img
              src="/avatar.jpg"
              alt="profile"
              className="w-9 h-9 rounded-full object-cover"
            />
          </button>

          {/* Dropdown */}
          {openProfile && (
            <div className="absolute right-0 mt-4 w-52 bg-[#282b44] text-[#868fa2] border border-[#37384b] rounded-md shadow-lg text-sm">
              <ul className="py-1">
                <li className="px-4 py-2 hover:bg-[#1e2133] cursor-pointer">
                  View Profile
                </li>
                <li className="px-4 py-2 hover:bg-[#1e2133] cursor-pointer">
                  My Tasks
                </li>
                <li className="px-4 py-2 hover:bg-[#1e2133] cursor-pointer">
                  Account Settings
                </li>
                <li className="border-t border-[#37384b] my-1"></li>
                <li className="px-4 py-2 text-red-500 hover:bg-[#1e2133] cursor-pointer">
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
