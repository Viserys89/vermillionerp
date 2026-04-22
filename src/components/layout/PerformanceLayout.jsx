import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {
  LayoutDashboard,
  Users,
  Target,
  AlertCircle,
  Settings,
  TrendingUp,
  Trophy
} from "lucide-react";

const PerformanceLayout = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  
  const performanceMenu = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard-performance",
    },
    {
      name: "Target Tim",
      icon: <Target size={20} />,
      path: "/dashboard-performance/targets",
    },
    {
      name: "Performa Host",
      icon: <TrendingUp size={20} />,
      path: "/dashboard-performance/hosts",
    },
    {
      name: "Red Marks",
      icon: <AlertCircle size={20} />,
      path: "/dashboard-performance/red-marks",
    },
    {
      name: "Leaderboard",
      icon: <Trophy size={20} />,
      path: "/dashboard-performance/leaderboard",
    },
    {
      name: "Pengaturan",
      icon: <Settings size={20} />,
      path: "/dashboard-performance/settings",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff8000] via-white to-white p-4 md:p-6 flex flex-col gap-4 md:gap-6 font-inter overflow-hidden relative">
      <Topbar toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1 gap-6 overflow-hidden items-start relative">
        <Sidebar
          menuItems={performanceMenu}
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

export default PerformanceLayout;
