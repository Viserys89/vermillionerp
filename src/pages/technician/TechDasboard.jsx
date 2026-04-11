import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Monitor, Wifi, ShieldAlert } from 'lucide-react';

const TechDashboard = () => {
  // Data dummy kendala terbaru
  const [recentIssues] = useState([
    { id: 1, host: 'Eka Kumar', type: 'Tiktok Live Studio Error', time: '10:05 AM', status: 'Pending', severity: 'High' },
    { id: 2, host: 'Siti Nurhaliza', type: 'Akun Suspend', time: '09:45 AM', status: 'In Progress', severity: 'Critical' },
    { id: 3, host: 'Budi Santoso', type: 'Wifi Error', time: '09:30 AM', status: 'Resolved', severity: 'Medium' },
  ]);

  return (
    <div className="animate-fade-in space-y-4 md:space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Dashboard Teknisi</h1>
        <div className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-bold flex items-center gap-2 border border-red-100 shadow-sm">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
          </span>
          1 Kendala Darurat (Pending)
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-red-50 text-red-600 rounded-lg"><AlertTriangle size={20} /></div>
            <p className="text-xs md:text-sm text-text-secondary font-medium">Pending</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-text-primary">1</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg"><Clock size={20} /></div>
            <p className="text-xs md:text-sm text-text-secondary font-medium">Diproses</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-text-primary">3</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-green-50 text-green-600 rounded-lg"><CheckCircle size={20} /></div>
            <p className="text-xs md:text-sm text-text-secondary font-medium">Selesai Hari Ini</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-text-primary">12</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><Monitor size={20} /></div>
            <p className="text-xs md:text-sm text-text-secondary font-medium">Total Modul</p>
          </div>
          <p className="text-2xl md:text-3xl font-bold text-text-primary">24</p>
        </div>
      </div>

      {/* Latest Issues Alert Box */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6">
        <h2 className="text-lg font-bold text-text-primary mb-4 border-b pb-2">Laporan Masuk Terbaru</h2>
        <div className="space-y-3">
          {recentIssues.map(issue => (
            <div key={issue.id} className={`p-4 rounded-xl border flex flex-col md:flex-row justify-between items-start md:items-center gap-4 transition-all hover:shadow-sm ${
              issue.status === 'Pending' ? 'bg-red-50/50 border-red-100' : 
              issue.status === 'In Progress' ? 'bg-yellow-50/50 border-yellow-100' : 'bg-gray-50 border-gray-100'
            }`}>
              <div className="flex gap-3 items-start">
                <div className={`p-2 rounded-lg mt-1 ${
                  issue.type.includes('Suspend') ? 'bg-red-100 text-red-600' :
                  issue.type.includes('Wifi') ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-brand-orange'
                }`}>
                  {issue.type.includes('Suspend') ? <ShieldAlert size={20} /> : issue.type.includes('Wifi') ? <Wifi size={20} /> : <Monitor size={20} />}
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">{issue.type}</h3>
                  <p className="text-sm text-text-secondary">Host: <span className="font-semibold text-text-primary">{issue.host}</span> • Dilaporkan: {issue.time}</p>
                </div>
              </div>
              <div className="w-full md:w-auto">
                <span className={`inline-block w-full md:w-auto text-center px-4 py-2 rounded-lg text-sm font-bold ${
                  issue.status === 'Pending' ? 'bg-red-500 text-white shadow-sm shadow-red-200' : 
                  issue.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                }`}>
                  {issue.status === 'Pending' ? 'Tangani Sekarang' : issue.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TechDashboard;