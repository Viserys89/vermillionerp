import React from 'react';
import { Megaphone, CheckCircle, X } from 'lucide-react';

const HRPengaduan = () => {
  const complaints = [
    { id: 1, employee: 'Eka Kumar', date: '2024-04-05', issue: 'Masalah dengan sistem hardware', status: 'Pending' },
    { id: 2, employee: 'Siti Nurhaliza', date: '2024-04-04', issue: 'Request training untuk software baru', status: 'Resolved' },
  ];

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Pengaduan & Masalah Karyawan</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
          <p className="text-sm text-gray-600">Total Pengaduan</p>
          <p className="text-3xl font-bold text-orange-500 mt-2">{complaints.length}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
          <p className="text-sm text-gray-600">Pending</p>
          <p className="text-3xl font-bold text-yellow-500 mt-2">{complaints.filter(c => c.status === 'Pending').length}</p>
        </div>
        <div className="p-6 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
          <p className="text-sm text-gray-600">Resolved</p>
          <p className="text-3xl font-bold text-green-500 mt-2">{complaints.filter(c => c.status === 'Resolved').length}</p>
        </div>
      </div>

      <div className="p-8 rounded-2xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg">
        <h2 className="text-lg font-bold mb-4">Daftar Pengaduan</h2>
        <div className="space-y-3">
          {complaints.map(complaint => (
            <div key={complaint.id} className="flex items-center justify-between p-4 rounded-lg bg-white/50 border border-gray-200">
              <div className="flex items-center gap-4 flex-1">
                <Megaphone size={24} className="text-orange-500" />
                <div>
                  <h3 className="font-bold">{complaint.employee}</h3>
                  <p className="text-sm text-gray-600">{complaint.issue}</p>
                  <p className="text-xs text-gray-500">{complaint.date}</p>
                </div>
              </div>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                complaint.status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
              }`}>
                {complaint.status}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HRPengaduan;
