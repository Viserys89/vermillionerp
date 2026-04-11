import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import {
  LayoutDashboard,
  FileText,
  Megaphone,
  PenTool,
  Contact,
  Settings,
  ShoppingCart,
  Package,
  Wallet,
  User
} from "lucide-react";

const MainLayout = () => {
  // Buka Tutup Sidebar
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  // Tentukan role berdasarkan URL
  const isProcurement = location.pathname.includes("/dashboard-procurement");
  const isFinance = location.pathname.includes("/dashboard-finance");
  // Konfigurasi Menu Procurement
  const procurementMenu = [
    {
      name: "Beranda",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard-procurement",
    },
    {
      name: "Request Order",
      icon: <ShoppingCart size={20} />,
      path: "/dashboard-procurement/request",
    },
    {
      name: "Inventory",
      icon: <Package size={20} />,
      path: "/dashboard-procurement/inventory",
    },
        {
      name: "Contact",
      icon: <Contact size={20} />,
      path: "/dashboard-procurement/contact",
    },
  ];
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
      path: "/dashboard-host/contact",
    },
    {
      name: "Pengaturan",
      icon: <Settings size={20} />,
      path: "",
    },
  ];

  const FinanceMenu = [
    {
      name: "Beranda",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard-finance",
    },

    {
      name: "Penghasilan",
      icon: <Wallet size={20} />,
      path: "penghasilan",
    },
    {
      name: "Profil",
      icon: <User size={20} />,
      path: "/dashboard-finance/profile",
    },
        {
      name: "Contact",
      icon: <Contact size={20} />,
      path: "/dashboard-finance/contact",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#ff8000] via-white to-white p-4 md:p-6 flex flex-col gap-4 md:gap-6 font-inter overflow-hidden relative">
      <Topbar
        roleName={isProcurement ? "Procurement" : isFinance ? "Finance" : "Host"}
        toggleSidebar={() => setSidebarOpen(!isSidebarOpen)}
      />

      <div className="flex flex-1 gap-6 overflow-hidden items-start relative">
        {/* Kirim menu yang sesuai ke Sidebar */}
        <Sidebar
          menuItems={
            isProcurement ? procurementMenu : isFinance ? FinanceMenu : hostMenu
          }
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

export default MainLayout;
