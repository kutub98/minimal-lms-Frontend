"use client";

import { FaHome, FaUser, FaCog, FaSignOutAlt } from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={`flex h-screen ${
        isCollapsed ? "w-20" : "w-64"
      } bg-gradient-to-r from-indigo-900 to-indigo-800 transition-all duration-300`}
    >
      <div className="w-full h-full p-4 flex flex-col justify-between">
        {/* Sidebar header */}
        <div className="flex justify-between items-center mb-8">
          {!isCollapsed && (
            <div className="text-white font-bold text-xl">
              <Link href="/">LMS</Link>
            </div>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white"
          >
            {isCollapsed ? ">" : "<"}
          </button>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col space-y-4">
          <Link
            href="/admin/dashboard"
            className="flex items-center space-x-4 text-white hover:text-purple-300 transition-all duration-300"
          >
            <FaHome className="text-lg" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>
          <Link
            href="/admin/profile"
            className="flex items-center space-x-4 text-white hover:text-purple-300 transition-all duration-300"
          >
            <FaUser className="text-lg" />
            {!isCollapsed && <span>Profile</span>}
          </Link>
          <Link
            href="/admin/settings"
            className="flex items-center space-x-4 text-white hover:text-purple-300 transition-all duration-300"
          >
            <FaCog className="text-lg" />
            {!isCollapsed && <span>Settings</span>}
          </Link>
          <Link
            href="/admin/logout"
            className="flex items-center space-x-4 text-white hover:text-purple-300 transition-all duration-300"
          >
            <FaSignOutAlt className="text-lg" />
            {!isCollapsed && <span>Logout</span>}
          </Link>
        </div>

        {/* Profile Section */}
        <div className="mt-auto flex items-center text-white space-x-4">
          <div className="w-10 h-10 rounded-full bg-gray-400"></div>
          {!isCollapsed && <span className="text-sm">John Doe</span>}
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;
