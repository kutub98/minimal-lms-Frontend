"use client";

import { FaBell, FaUserCircle, FaSignOutAlt, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useRef, useState } from "react";

const TopBar = () => {
  const { user, logout } = useAuth();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="w-full bg-gradient-to-r from-indigo-900 via-purple-800 to-indigo-900 text-white px-6 py-4 shadow-md z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between flex-wrap gap-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <Link href="/">LMS Admin</Link>
        </div>

        {/* Right Controls */}
        <div className="flex items-center space-x-6 relative">
          {/* Notifications */}
          <div className="relative group">
            <FaBell className="text-2xl cursor-pointer hover:text-purple-300 transition" />
            <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full animate-ping-slow">
              3
            </span>
          </div>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex items-center space-x-2 cursor-pointer hover:text-purple-300 transition"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <FaUserCircle className="text-2xl" />
              <span className="text-sm font-medium hidden sm:block">
                {user?.email?.split("@")[0] || "Admin"}
              </span>
            </div>

            {/* Dropdown Menu */}
            {dropdownOpen && (
              <div className="absolute right-0 mt-3 w-44 bg-white text-gray-700 rounded-lg shadow-lg py-2 z-50 animate-fadeIn">
                <Link
                  href="/profile"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                >
                  <FaUser /> <span>Profile</span>
                </Link>
                <button
                  onClick={logout}
                  className="w-full text-left flex items-center gap-2 px-4 py-2 hover:bg-gray-100 transition"
                >
                  <FaSignOutAlt /> <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopBar;
