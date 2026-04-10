import React, { useState } from 'react';
import { Download, FileText, Search, Users, Clock, CheckCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const HRLaporan = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  
  // State untuk Notifikasi Kanan Atas
  const [notification, setNotification] = useState(null);

  const [reports] = useState([
    { id: 1, name: 'Laporan Kehadiran Karyawan - April 2024', date: '2024-04-30', type: 'Excel' },
    { id: 2, name: 'Rekap Izin & Cuti Q1 2024', date: '2024-04-05', type: 'PDF' },
    { id: 3, name: 'Data Master Karyawan Aktif', date: '2024-04-01', type: 'CSV' },
    { id: 4, name: 'Analisis Pengaduan Bulanan - Maret', date: '2024-03-31', type: 'PDF' },
    { id: 5, name: 'Laporan Kehadiran Karyawan - Maret 2024', date: '2024-03-30', type: 'Excel' },
    { id: 6, name: 'Evaluasi Kontrak Habis Bulan Ini', date: '2024-04-10', type: 'Excel' },
    { id: 7, name: 'Rekap Absensi Tahunan 2023', date: '2024-01-15', type: 'PDF' },
  ]);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredReports = reports.filter(r => r.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const currentReports = filteredReports.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleDownload = (report) => {
    // FIX NOTIFIKASI: Pake Toast, jangan Alert Pop Up biar nggak ngeblok layar user (Prinsip IMK)
    showNotification('success', `Dokumen "${report.name}" berhasil diunduh!`);
  };

  return (
    <div className="animate-fade-in space-y-4 md:space-y-6">
      {/* Toast Notification Element */}
      {notification && (
        <div className={`fixed top-4 right-4 z-[10000] p-4 rounded-xl backdrop-blur-xl border ${
          notification.type === 'success' 
            ? 'bg-status-success/90 border-status-success text-white' 
            : 'bg-status-error/90 border-status-error text-white'
        } shadow-lg flex items-center gap-3 animate-slide-up max-w-md`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium text-sm md:text-base">{notification.message}</span>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Pusat Laporan</h1>
      
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl"><FileText size={24} /></div>
          <div><p className="text-sm text-text-secondary">Total Dokumen</p><p className="text-xl font-bold text-text-primary">{reports.length}</p></div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-green-50 text-status-success rounded-xl"><Users size={24} /></div>
          <div><p className="text-sm text-text-secondary">Laporan Karyawan</p><p className="text-xl font-bold text-text-primary">4</p></div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl"><Clock size={24} /></div>
          <div><p className="text-sm text-text-secondary">Dibuat Bulan Ini</p><p className="text-xl font-bold text-text-primary">3</p></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-bold text-text-primary">Arsip Dokumen & Laporan</h2>
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama laporan..." 
              value={searchTerm} 
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange outline-none text-sm transition-all"
            />
          </div>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0 border rounded-lg border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Nama Dokumen</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 hidden sm:table-cell">Tanggal Valid</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 hidden md:table-cell">Format</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 w-28">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentReports.length > 0 ? currentReports.map(report => (
                <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-bold text-text-primary">{report.name}</p>
                    <p className="text-xs text-text-secondary sm:hidden mt-1">{report.date} • {report.type}</p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">{report.date}</td>
                  <td className="px-4 py-3 text-center hidden md:table-cell">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                      report.type === 'PDF' ? 'bg-red-50 text-red-600' : 
                      report.type === 'Excel' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-600'
                    }`}>
                      {report.type}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => handleDownload(report)} className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-orange-50 text-brand-orange rounded-lg hover:bg-brand-orange hover:text-white transition-all text-xs font-bold border border-orange-100">
                      <Download size={16} /> <span className="hidden md:inline">Unduh</span>
                    </button>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan="4" className="text-center py-8 text-gray-500">Laporan tidak ditemukan</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Konsisten (Pake UI yang sama kayak Dashboard) */}
        {filteredReports.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 pt-2">
            <span className="text-xs md:text-sm text-text-secondary text-center sm:text-left">
              Menampilkan <span className="font-semibold text-text-primary">{((currentPage - 1) * itemsPerPage) + 1}</span> - <span className="font-semibold text-text-primary">{Math.min(currentPage * itemsPerPage, filteredReports.length)}</span> dari <span className="font-semibold text-text-primary">{filteredReports.length}</span> data
            </span>
            <div className="flex items-center gap-2">
              <button onClick={() => setCurrentPage(p => Math.max(p - 1, 1))} disabled={currentPage === 1} className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <ChevronLeft size={16} />
              </button>
              <div className="hidden sm:flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${currentPage === i + 1 ? 'bg-brand-orange text-white' : 'hover:bg-orange-50 text-gray-600'}`}>
                    {i + 1}
                  </button>
                ))}
              </div>
              <button onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HRLaporan;