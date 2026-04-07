import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = ({ menuItems, isOpen, closeSidebar }) => {
  const location = useLocation();

  return (
    <aside className={`
      fixed lg:static top-0 z-[1000] h-screen lg:h-full w-[260px] 
      bg-white/70 lg:bg-white/40 backdrop-blur-2xl lg:backdrop-blur-xl 
      border-r lg:border border-white/60 p-8 shadow-2xl lg:shadow-xl
      transition-all duration-300 ease-in-out
      ${isOpen ? 'left-0' : '-left-full'} 
      lg:left-0 lg:rounded-[20px]
    `}>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Menu</h3>
        {/* Tombol Close hanya muncul di mobile */}
        <button onClick={closeSidebar} className="lg:hidden text-gray-500 p-2">✕</button>
      </div>
      
      <hr className="border-orange-200 mb-6" />
      
      <nav>
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={index}>
                <Link
                  to={item.path}
                  onClick={closeSidebar}
                  className={`flex items-center gap-3 p-3 rounded-xl transition-all relative ${
                    isActive 
                      ? 'font-bold text-black bg-orange-100/50' 
                      : 'text-gray-600 hover:text-orange-500 hover:bg-orange-50/30'
                  }`}
                >
                  {/* Indikator aktif di samping */}
                  {isActive && (
                    <div className="absolute left-0 w-1 h-6 bg-orange-500 rounded-r-lg" />
                  )}
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-sm md:text-base">{item.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;