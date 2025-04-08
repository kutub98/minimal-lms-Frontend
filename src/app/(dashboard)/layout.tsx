"use client";

import AdminSidebar from "../Shared/layout/Admin/Sidebar";
import TopBar from "../Shared/layout/Admin/Topbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <AdminSidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <TopBar />

        {/* Main Content Area */}
        <main className="flex-1 p-6 bg-gray-100">{children}</main>
      </div>
    </div>
  );
};

export default AdminLayout;
