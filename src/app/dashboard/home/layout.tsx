// "use client";

// import React, { useEffect } from "react";
// import { useAuth } from "@/context/AuthContext"; // Import the AuthContext hook
// import { useRouter } from "next/navigation";
// import AdminSidebar from "@/app/Shared/layout/Admin/Sidebar";
// import TopBar from "@/app/Shared/layout/Admin/Topbar";
// import Loading from "@/app/Components/Loading";

// const AdminLayout = ({ children }: { children: React.ReactNode }) => {
//   const { user, loading } = useAuth();
//   const router = useRouter();

//   useEffect(() => {
//     if (!loading && !user) {
//       router.push("/login");
//     }
//   }, [loading, user, router]);

//   if (loading)
//     return (
//       <div>
//         <Loading />
//       </div>
//     );
//   if (!user) return null;

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <AdminSidebar />

//       <div className="flex-1 flex flex-col">
//         {/* Top Bar */}
//         <TopBar />

//         {/* Main Content Area */}
//         <main className="flex-1 p-6 bg-gray-100">{children}</main>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;

"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import AdminSidebar from "@/app/Shared/layout/Admin/Sidebar";
import TopBar from "@/app/Shared/layout/Admin/Topbar";
import Loading from "@/app/Components/Loading";

const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  // Manage sidebar collapsed state globally in layout
  const [isSidebarCollapsed] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) return <Loading />;
  if (!user) return null;

  // Sidebar width based on collapsed state
  const sidebarWidth = isSidebarCollapsed ? "80px" : "256px"; // w-20 or w-64

  return (
    <>
      {/* Sidebar Fixed */}
      <div
        className={`fixed top-0 left-0 h-screen z-40 transition-all duration-300`}
        style={{ width: sidebarWidth }}
      >
        <AdminSidebar />
      </div>

      {/* TopBar Fixed */}
      <div
        className="fixed top-0 left-0 right-0 z-30"
        style={{ marginLeft: sidebarWidth }}
      >
        <TopBar />
      </div>

      {/* Main content with padding to not overlap fixed sidebar/topbar */}
      <div
        className="pt-[64px] transition-all duration-300 bg-gray-100 min-h-screen"
        style={{ marginLeft: sidebarWidth }}
      >
        <main className="p-6">{children}</main>
      </div>
    </>
  );
};

export default AdminLayout;
