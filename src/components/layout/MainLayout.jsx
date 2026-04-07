import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  PenTool,
  Contact,
  Settings,
} from "lucide-react";

const MainLayout = () => {
  // Buka Tutup Sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const hostMenu = [
    {
      name: "Beranda",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard-host",
    },
    {
      name: "Laporan",
      icon: <FileText size={20} />,
      path: "/dashboard-host/laporan",
    },
    {
      name: "Pengaduan",
      icon: <Megaphone size={20} />,
      path: "",
    },
    {
      name: "Request",
      icon: <PenTool size={20} />,
      path: "",
    },
    {
      name: "Contact",
      icon: <Contact size={20} />,
      path: "",
    },
    {
      name: "Pengaturan",
      icon: <Settings size={20} />,
      path: "",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff8000] via-white to-white p-4 md:p-6 flex flex-col gap-4 md:gap-6 font-inter overflow-hidden relative">
      {/* 1. Kirim fungsi toggle ke Topbar */}
      <Topbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 gap-6 overflow-hidden items-start relative">
        {/* 2. Kirim state dan fungsi tutup ke Sidebar */}
        <Sidebar
          menuItems={hostMenu}
          isOpen={isSidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* Overlay: Layar hitam transparan saat sidebar muncul di mobile */}
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

export default MainLayout;
