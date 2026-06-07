import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {
  LayoutDashboard,
  Wrench,
  BookOpen,
  Settings,
} from "lucide-react";

const TechLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  // Menu khusus untuk Teknisi
  const techMenu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard-tech",
    },
    {
      name: "Kendala Studio",
      icon: <Wrench size={20} />,
      path: "/dashboard-tech/kendala",
    },
    {
      name: "Pusat Modul",
      icon: <BookOpen size={20} />,
      path: "/dashboard-tech/modul",
    },
    {
      name: "Pengaturan",
      icon: <Settings size={20} />,
      path: "/dashboard-tech/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff8000] via-white to-white p-4 md:p-6 flex flex-col gap-4 md:gap-6 font-inter overflow-hidden relative">
      <Topbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 gap-6 overflow-hidden items-start relative">
        <Sidebar
          menuItems={techMenu}
          isOpen={isSidebarOpen}
          closeSidebar={() => setSidebarOpen(false)}
        />

        {/* Overlay untuk nutup sidebar di mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[998] lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Area utama tempat halaman dirender */}
        <main className="flex-1 h-full overflow-y-auto custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default TechLayout;