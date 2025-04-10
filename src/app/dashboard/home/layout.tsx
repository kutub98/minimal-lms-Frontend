"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/context/AuthContext"; // Import the AuthContext hook
import { useRouter } from "next/navigation";
import AdminSidebar from "@/app/Shared/layout/Admin/Sidebar";
import TopBar from "@/app/Shared/layout/Admin/Topbar";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) return <div>Loading...</div>;
  if (!user) return null;

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
