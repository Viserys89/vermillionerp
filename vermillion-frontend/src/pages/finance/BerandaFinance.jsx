import React, { useState, useEffect } from 'react';
import { Users, Diamond, SortAsc, Clock, CheckCircle, XCircle, Download, Eye, X, Search } from 'lucide-react';
import { API_BASE_URL } from '../../api';

const BerandaFinance = () => {
  const [dashboardData, setDashboardData] = useState({
    total_diamonds: 0,
    reports: []
  });
  const [filters, setFilters] = useState({
    date: '',
    shift: 'Pilih Shift',
    status: 'Pilih Status',
    search: ''
  });
  const [selectedImages, setSelectedImages] = useState(null);

  const fetchDashboard = () => {
    const query = new URLSearchParams(filters).toString();
    fetch(`${API_BASE_URL}/finance/dashboard?${query}`)
      .then(res => res.json())
      .then(data => {
        if (!data.message) {
          setDashboardData(data);
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchDashboard();
  }, [filters]);

  const handleStatusUpdate = (id, status) => {
    fetch(`${API_BASE_URL}/finance/reports/${id}/status`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ status })
    })
    .then(res => res.json())
    .then(() => {
      fetchDashboard();
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
          Finance Dashboard
        </h1>
        <p className="text-sm md:text-base text-text-secondary mt-1">
          Verifikasi dan kelola pendapatan host dengan filter dan export data
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 md:p-6 md:col-span-2 flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-full">
            <Diamond size={28} className="text-brand-orange" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-text-secondary truncate">
              TOTAL DIAMOND (DISETUJUI)
            </p>
            <p className="text-2xl md:text-3xl font-bold text-brand-orange mt-1">
              {Number(dashboardData.total_diamonds).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>
    
      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 space-y-4">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 justify-end mb-4">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-status-success text-white text-sm md:text-base rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-green-300 focus:outline-none transition-all font-medium">
            <Download size={18} /> Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm bg-white"
          />

          <select 
            value={filters.shift}
            onChange={(e) => setFilters({...filters, shift: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm bg-white"
          >
            <option>Pilih Shift</option>
            <option>06.00 - 12.00</option>
            <option>12.00 - 18.00</option>
            <option>18.00 - 00.00</option>
          </select>

          <select className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm bg-white">
            <option>Pilih Tim</option>
          </select>

          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm bg-white"
          >
            <option>Pilih Status</option>
            <option>Menunggu</option>
            <option>Disetujui</option>
            <option>Ditolak</option>
          </select>

          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Cari Nama Host"
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm bg-white"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto -mx-4 md:mx-0 pt-2">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-bold text-text-primary">Host & Tim</th>
                <th className="px-4 py-3 text-left font-bold text-text-primary">Shift & Tanggal</th>
                <th className="px-4 py-3 text-left font-bold text-text-primary">Total Diamond</th>
                <th className="px-4 py-3 text-left font-bold text-text-primary">Status</th>
                <th className="px-4 py-3 text-left font-bold text-text-primary">Bukti</th>
                <th className="px-4 py-3 text-left font-bold text-text-primary">Verifikasi</th>
              </tr>
            </thead>
            <tbody>
              {dashboardData.reports.map((report) => (
                <tr key={report.id} className="border-b border-gray-100 hover:bg-light-bg/50 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                        <Users size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="text-text-primary font-bold">{report.host?.name || 'Unknown'}</div>
                        <div className="text-xs text-text-secondary">{report.host?.host_profile?.team || '-'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-text-secondary">
                    <div className="font-medium text-text-primary">{report.shift_schedule}</div>
                    <div className="text-xs">{report.report_date}</div>
                  </td>
                  <td className="px-4 py-3 font-bold text-brand-orange">
                    {Number(report.diamond_earned).toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap inline-flex items-center gap-1 ${
                      report.status === 'Disetujui' ? 'bg-green-100 text-status-success' :
                      report.status === 'Ditolak' ? 'bg-red-100 text-status-error' :
                      'bg-yellow-100 text-status-warning'
                    }`}>
                      {report.status === 'Disetujui' && <CheckCircle size={14} />}
                      {report.status === 'Ditolak' && <XCircle size={14} />}
                      {report.status === 'Menunggu' && <Clock size={14} />}
                      {report.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => setSelectedImages(report.evidences)}
                      className="text-blue-600 flex items-center gap-1 hover:text-blue-800 transition-colors text-xs md:text-sm font-medium"
                    >
                      <Eye size={16} /> Lihat ({report.evidences?.length || 0})
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      {report.status === 'Menunggu' || report.status === 'Diperiksa' ? (
                        <>
                          <button 
                            onClick={() => handleStatusUpdate(report.id, 'Disetujui')} 
                            className="px-3 py-1.5 bg-green-50 text-status-success rounded-lg hover:bg-green-100 transition-all text-xs md:text-sm font-medium"
                          >
                            Terima
                          </button>
                          <button 
                            onClick={() => handleStatusUpdate(report.id, 'Ditolak')} 
                            className="px-3 py-1.5 bg-red-50 text-status-error rounded-lg hover:bg-red-100 transition-all text-xs md:text-sm font-medium"
                          >
                            Tolak
                          </button>
                        </>
                      ) : (
                        <span className="text-text-secondary text-xs italic px-2">Selesai</span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
              {dashboardData.reports.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center py-8 text-gray-500 text-sm md:text-base">
                    Belum ada laporan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Modal */}
      {selectedImages && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-6 relative animate-slide-up">
            <button 
              onClick={() => setSelectedImages(null)} 
              className="absolute right-4 top-4 text-text-secondary hover:text-status-error transition-colors"
            >
              <X size={24} />
            </button>
            <h3 className="text-lg md:text-xl font-bold text-text-primary mb-6">Bukti Screenshot Laporan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedImages.map((img, idx) => (
                <img key={idx} src={`${API_BASE_URL.replace('/api', '')}/storage/${img.image_path}`} alt="bukti" className="w-full rounded-xl border border-gray-200 shadow-sm" />
              ))}
              {selectedImages.length === 0 && <p className="text-gray-500 text-sm italic col-span-2">Tidak ada gambar bukti.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BerandaFinance;