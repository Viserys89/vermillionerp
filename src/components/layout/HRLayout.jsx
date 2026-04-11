import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {
  LayoutDashboard,
  Users,
  CheckCircle,
  FileText,
  Settings,
  Megaphone,
  PenTool,
  Contact,
  ShoppingCart,
  Package,
  Wallet,
  User
} from "lucide-react";

const HRLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const hrMenu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard-hr",
    },
    {
      name: "Data Karyawan",
      icon: <Users size={20} />,
      path: "/dashboard-hr/karyawan",
    },
    {
      name: "Izin & Cuti",
      icon: <CheckCircle size={20} />,
      path: "/dashboard-hr/izin",
    },
    {
      name: "Laporan",
      icon: <FileText size={20} />,
      path: "/dashboard-hr/laporan",
    },
    {
      name: "Contact",
      icon: <Contact size={20} />,
      path: "/dashboard-hr/contact",
    },
    {
      name: "Pengaturan",
      icon: <Settings size={20} />,
      path: "/dashboard-hr/settings",
    },

  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff8000] via-white to-white p-4 md:p-6 flex flex-col gap-4 md:gap-6 font-inter overflow-hidden relative">
      <Topbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 gap-6 overflow-hidden items-start relative">
        <Sidebar
          menuItems={hrMenu}
          isOpen={isSidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <main className="flex-1 h-full overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default HRLayout;
