"use client";

import {
  FaHome,
  FaUser,
  FaCog,
  FaSignOutAlt,
  FaChevronLeft,
  FaChevronRight,
  FaAngleDown,
  FaBoxes,
  FaVideo,
  FaBookOpen
} from "react-icons/fa";
import { useState } from "react";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { useAuth } from "@/context/AuthContext";
const navLinks = [
  { href: "/dashboard/home", icon: <FaHome />, label: "Dashboard" },
  {
    icon: <FaUser />,
    dropdown: [
      { href: "/dashboard/home/users", label: "All Users" },
      { href: "/dashboard/home/users/create", label: "Create User" },
      { href: "/dashboard/home/users/update", label: "Update User" }
    ],
    label: "User"
  },
  {
    icon: <FaBoxes />,
    dropdown: [
      { href: "/dashboard/home/module", label: "All Modules" },
      { href: "/dashboard/home/module/create", label: "Create Module" },
      { href: "/dashboard/home/module/update", label: "Update Module" }
    ],
    label: "Module"
  },
  {
    icon: <FaVideo />,
    dropdown: [
      { href: "/dashboard/home/lectures", label: "All Lectures" },
      { href: "/dashboard/home/lectures/create", label: "Create Lecture" },
      { href: "/dashboard/home/lectures/update", label: "Update Lecture" }
    ],
    label: "Lectures"
  },
  {
    icon: <FaBookOpen />,
    dropdown: [
      { href: "/dashboard/home/courses", label: "All Courses" },
      { href: "/dashboard/home/courses/create", label: "Create Course" },
      { href: "/dashboard/home/courses/update", label: "Update Course" }
    ],
    label: "Courses"
  },
  {
    label: "Settings",
    icon: <FaCog />,
    dropdown: [
      { href: "/settings/general", label: "General" },
      { href: "/admin/settings/security", label: "Security" }
    ]
  }
];

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  // Inside your AdminSidebar component
  const { user, logout } = useAuth();

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div
      className={`h-screen flex-shrink-0 ${
        isCollapsed ? "w-20" : "w-64"
      } transition-all duration-300 bg-gradient-to-br from-indigo-900 to-indigo-800 shadow-lg relative`}
    >
      <div className="h-full flex flex-col justify-between p-4 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          {!isCollapsed && (
            <h1 className="text-2xl font-bold text-white tracking-wide">
              <Link href="/">LMS</Link>
            </h1>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-white hover:text-purple-300 transition"
            aria-label="Toggle Sidebar"
          >
            {isCollapsed ? <FaChevronRight /> : <FaChevronLeft />}
          </button>
        </div>

        {/* Scrollable Menu */}
        <div className="flex-1 overflow-y-auto pr-1 custom-scrollbar">
          <nav className="space-y-1">
            {navLinks.map(({ href, icon, label, dropdown }) =>
              !dropdown ? (
                <Link
                  key={href}
                  href={href}
                  className="group flex items-center gap-4 p-2 rounded-lg text-white hover:bg-indigo-700 hover:text-purple-300 transition-colors duration-200 relative"
                  data-tooltip-id={isCollapsed ? label : ""}
                  data-tooltip-content={label}
                  data-tooltip-place="right"
                >
                  <span className="text-xl">{icon}</span>
                  {!isCollapsed && (
                    <span className="text-sm font-medium tracking-wide">
                      {label}
                    </span>
                  )}
                </Link>
              ) : (
                <div key={label}>
                  <button
                    onClick={() => toggleDropdown(label)}
                    className="w-full flex items-center justify-between gap-4 p-2 rounded-lg text-white hover:bg-indigo-700 hover:text-purple-300 transition-colors duration-200"
                    data-tooltip-id={isCollapsed ? label : ""}
                    data-tooltip-content={label}
                    data-tooltip-place="right"
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-xl">{icon}</span>
                      {!isCollapsed && (
                        <span className="text-sm font-medium tracking-wide">
                          {label}
                        </span>
                      )}
                    </div>
                    {!isCollapsed && (
                      <FaAngleDown
                        className={`transition-transform duration-300 ${
                          openDropdown === label ? "rotate-180" : ""
                        }`}
                      />
                    )}
                  </button>

                  {openDropdown === label && (
                    <div
                      className={`${
                        isCollapsed ? "ml-4" : "ml-10"
                      } mt-1 space-y-1`}
                    >
                      {dropdown.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block text-sm text-white/90 hover:text-purple-300 transition"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )
            )}
          </nav>
        </div>

        {/* Logout and Profile */}
        <div className="mt-4 pt-4 border-t border-white/20">
          {/* Logout Button */}
          <button
            onClick={logout}
            className="flex items-center gap-4 p-2 rounded-lg text-white hover:bg-indigo-700 hover:text-purple-300 transition-colors duration-200 w-full"
            data-tooltip-id={isCollapsed ? "Logout" : ""}
            data-tooltip-content="Logout"
            data-tooltip-place="right"
          >
            <FaSignOutAlt className="text-xl" />
            {!isCollapsed && (
              <span className="text-sm font-medium tracking-wide">Logout</span>
            )}
          </button>

          {/* Profile Info */}
          <div className="flex items-center gap-3 mt-0">
            <div className="w-10 h-10 bg-gray-300 rounded-full shadow-md flex items-center justify-center text-indigo-900 font-bold">
              {user?.email?.charAt(0).toUpperCase() ?? "A"}
            </div>
            {!isCollapsed && (
              <div className="text-white">
                <p className="text-sm font-semibold">
                  {user?.email ?? "Admin"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tooltips */}
      <Tooltip id="Dashboard" />
      <Tooltip id="User" />
      <Tooltip id="Module" />
      <Tooltip id="Lectures" />
      <Tooltip id="Courses" />
      <Tooltip id="Settings" />
      <Tooltip id="Logout" />
    </div>
  );
};

export default AdminSidebar;
