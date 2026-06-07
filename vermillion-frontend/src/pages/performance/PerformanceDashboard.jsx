import React, { useState } from 'react';
import { 
  Trophy, 
  Users, 
  Target, 
  AlertCircle, 
  TrendingUp,
  Diamond,
  Flag,
  ArrowUpRight,
  Medal
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PerformanceDashboard = () => {
  const navigate = useNavigate();
  
  const stats = [
    { title: 'Total Berlian', value: '142,000', change: '+12%', icon: <Diamond size={24}/>, color: 'blue' },
    { title: 'Host Aktif', value: '24', change: '85%', icon: <Users size={24}/>, color: 'orange' },
    { title: 'Tim Berjalan', value: '3', change: 'Live Now', icon: <Target size={24}/>, color: 'purple' },
    { title: 'Total Red Marks', value: '12', change: '-2', icon: <AlertCircle size={24}/>, color: 'red' },
  ];

  const topHosts = [
    { name: 'Siti Nurhaliza', diamonds: '25,000', team: 'Team Bravo', rank: 1 },
    { name: 'Ani Wijaya', diamonds: '18,000', team: 'Team Alpha', rank: 2 },
    { name: 'Rudi Tabuti', diamonds: '15,000', team: 'Team Bravo', rank: 3 },
  ];

  // Helper for dynamic colors (Tailwind safe)
  const colorMap = {
    blue: 'bg-blue-50 text-blue-600',
    orange: 'bg-orange-50 text-orange-600',
    purple: 'bg-purple-50 text-purple-600',
    red: 'bg-red-50 text-red-600'
  };

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Ringkasan Performa</h1>
          <p className="text-gray-500 text-sm md:text-base">Statistik utama agensi hari ini</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-white border border-orange-200 text-orange-600 rounded-xl font-bold shadow-sm hover:bg-orange-50 transition-all w-full sm:w-auto justify-center">
          <Flag size={20} /> Unduh Laporan
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-[24px] border border-orange-100 shadow-sm group hover:border-orange-300 transition-all">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl ${colorMap[stat.color]}`}>
                {stat.icon}
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-lg ${stat.change.includes('+') ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-sm text-gray-500 font-medium">{stat.title}</p>
            <h3 className="text-2xl font-black text-gray-800 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Performers Section */}
        <div className="bg-white p-6 rounded-[24px] border border-orange-100 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Medal size={20} className="text-yellow-500" /> Host Terbaik
            </h2>
            <button 
              onClick={() => navigate('/dashboard-performance/leaderboard')}
              className="text-orange-500 text-sm font-bold hover:underline flex items-center gap-1"
            >
              Lihat Semua <ArrowUpRight size={14}/>
            </button>
          </div>
          <div className="space-y-4">
            {topHosts.map((host, i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-2xl border border-transparent hover:border-orange-200 transition-all cursor-pointer group" onClick={() => navigate('/dashboard-performance/leaderboard')}>
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold shadow-sm ${i === 0 ? 'bg-yellow-400 text-white' : i === 1 ? 'bg-gray-300 text-white' : 'bg-orange-300 text-white'}`}>
                    {host.rank}
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{host.name}</p>
                    <p className="text-xs text-gray-400">{host.team}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-black text-gray-800">{host.diamonds}</p>
                  <p className="text-[10px] text-gray-400 uppercase font-bold">Berlian</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Quick Links */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div 
            onClick={() => navigate('/dashboard-performance/targets')}
            className="bg-orange-500 p-6 rounded-[32px] text-white shadow-lg shadow-orange-100 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all flex flex-col justify-between"
          >
            <Target size={32} className="opacity-80" />
            <div>
              <h3 className="text-xl font-bold mt-4">Kelola Target</h3>
              <p className="text-orange-100 text-sm">Update target berlian tim</p>
            </div>
          </div>
          <div 
            onClick={() => navigate('/dashboard-performance/red-marks')}
            className="bg-red-500 p-6 rounded-[32px] text-white shadow-lg shadow-red-100 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all flex flex-col justify-between"
          >
            <AlertCircle size={32} className="opacity-80" />
            <div>
              <h3 className="text-xl font-bold mt-4">Red Marks</h3>
              <p className="text-red-100 text-sm">Input & kelola poin pelanggaran</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
