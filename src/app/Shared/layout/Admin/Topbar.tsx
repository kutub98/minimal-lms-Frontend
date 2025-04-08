"use client";

import { FaBell, FaUserCircle } from "react-icons/fa";
import Link from "next/link";

const TopBar = () => {
  return (
    <div className="flex justify-between items-center bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white p-4">
      {/* Logo or branding */}
      <div className="text-xl font-bold">
        <Link href="/">LMS Admin</Link>
      </div>

      {/* Notifications and user profile */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          <FaBell className="text-2xl cursor-pointer" />
          <div className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
            3
          </div>
        </div>
        <div className="flex items-center space-x-2 cursor-pointer">
          <FaUserCircle className="text-2xl" />
          <span className="text-sm">John Doe</span>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
