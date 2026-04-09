import React, { useState } from "react";
import { Menu, User, ChevronDown, LogOut, Settings } from "lucide-react";
import logo from "../../assets/logovermiloren.png";

const Topbar = ({ toggleSidebar, roleName }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  return (
    <header className="bg-white/40 backdrop-blur-xl border border-white/60 rounded-[20px] px-8 py-4 flex justify-between items-center shadow-lg relative z-[999]">
      <div className="flex items-center gap-4">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSidebar();
          }}
          className="lg:hidden text-gray-700 p-2 hover:bg-white/50 rounded-lg transition-all"
        >
          <Menu size={28} />
        </button>
        <img src={logo} alt="Logo" className="h-7 md:h-9 w-auto" />
      </div>

      <div
        className="flex items-center gap-4 cursor-pointer relative select-none"
        onClick={() => setDropdownOpen(!isDropdownOpen)}
      >
        <div className="text-right hidden sm:block">
          <p className="font-bold text-sm leading-none mb-1">USER</p>
          <p className="text-orange-500 text-xs font-semibold leading-none">
            {roleName || "User"}
          </p>
        </div>

        <div className="w-10 h-10 md:w-11 md:h-11 bg-gray-200 rounded-full flex items-center justify-center border border-white shadow-sm overflow-hidden">
          <User className="text-gray-500" size={24} />
        </div>

        <ChevronDown
          size={18}
          className={`transition-transform duration-300 ${isDropdownOpen ? "rotate-180" : ""}`}
        />

        {isDropdownOpen && (
          <div className="absolute top-[125%] right-0 w-44 bg-white/90 backdrop-blur-md border border-white/60 rounded-2xl shadow-xl py-2 animate-slide-up z-[1001]">
            <button className="w-full px-5 py-3 text-left text-sm flex items-center gap-2 hover:text-orange-500 hover:bg-orange-50/50 transition-colors">
              <User size={16} /> Profil
            </button>
            <button className="w-full px-5 py-3 text-left text-sm flex items-center gap-2 hover:text-orange-500 hover:bg-orange-50/50 transition-colors">
              <Settings size={16} /> Settings
            </button>
            <hr className="my-1 border-gray-100" />
            <a
              href="/"
              className="w-full px-5 py-3 text-left text-sm flex items-center gap-2 text-red-500 hover:bg-red-50 transition-colors font-medium"
            >
              <LogOut size={16} /> Logout
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default Topbar;
