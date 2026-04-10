import React from 'react';
import { Download, FileText } from 'lucide-react';

const HRLaporan = () => {
  const reports = [
    { id: 1, name: 'Laporan Kehadiran Bulan April', date: '2024-04-01', type: 'CSV' },
    { id: 2, name: 'Laporan Pengaduan Q1 2024', date: '2024-04-05', type: 'PDF' },
    { id: 3, name: 'Rekapitulasi Cuti Tahunan', date: '2024-04-06', type: 'Excel' },
  ];

  const handleDownload = (report) => {
    alert(`Download: ${report.name}`);
  };

  return (
    <div className="animate-fade-in space-y-6">
      <h1 className="text-2xl font-bold text-text-primary mb-6">Laporan & Analitik</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <button className="p-6 rounded-2xl bg-blue-50 border border-blue-200 hover:shadow-md transition-all text-left">
          <FileText size={32} className="text-blue-600 mb-3" />
          <p className="font-bold text-text-primary">Generate Laporan Kehadiran</p>
          <p className="text-sm text-text-secondary mt-1">Buat laporan kehadiran bulanan</p>
        </button>
        
        <button className="p-6 rounded-2xl bg-green-50 border border-green-200 hover:shadow-md transition-all text-left">
          <FileText size={32} className="text-status-success mb-3" />
          <p className="font-bold text-text-primary">Export Data Karyawan</p>
          <p className="text-sm text-text-secondary mt-1">Export semua data dalam Excel</p>
        </button>
        
        <button className="p-6 rounded-2xl bg-purple-50 border border-purple-200 hover:shadow-md transition-all text-left">
          <FileText size={32} className="text-purple-600 mb-3" />
          <p className="font-bold text-text-primary">Analisis Pengaduan</p>
          <p className="text-sm text-text-secondary mt-1">Dashboard analisis pengaduan</p>
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 md:p-8">
        <h2 className="text-lg font-bold text-text-primary mb-6">Laporan Tersimpan</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map(report => (
            <div key={report.id} className="p-4 rounded-lg border border-gray-200 bg-white hover:shadow-md transition-all">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="font-bold text-text-primary">{report.name}</p>
                  <p className="text-xs text-text-secondary mt-1">{report.date} • {report.type}</p>
                </div>
                <button
                  onClick={() => handleDownload(report)}
                  className="p-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-all focus:ring-2 focus:ring-orange-300 focus:outline-none"
                >
                  <Download size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HRLaporan;
