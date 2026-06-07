import React, { useState, useEffect } from 'react';
import { Users, Diamond, SortAsc, Clock, CheckCircle, XCircle, Download, Eye, X } from 'lucide-react';

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
    fetch(`http://127.0.0.1:8000/api/finance/dashboard?${query}`)
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
    fetch(`http://127.0.0.1:8000/api/finance/reports/${id}/status`, {
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
    <div className="animate-fade-in relative">
      <h1 className="text-xl font-medium mb-1">
        Finance Dashboard
      </h1>
      <h1 className='mb-6 text-gray-500'>Verifikasi dan kelola pendapatan host dengan filter dan export data</h1>
      
      <div className="flex items-center gap-6 mb-6 flex-wrap">
        <div className="bg-[#fffef0] border-2 border-[#fde8d8] p-6 rounded-xl flex items-center gap-5 min-w-[300px] min-h-[120px]">
          <div className="flex flex-row gap-6">
            <Diamond size={32} className="text-orange-500 size-auto" />
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                TOTAL DIAMOND (DISETUJUI)
              </p>
              <h2 className="text-2xl font-bold text-orange-500">
                {Number(dashboardData.total_diamonds).toLocaleString('id-ID')}
              </h2>
            </div>
          </div>
        </div>

        <button className="ml-auto bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow hover:opacity-90 transition">
          <Download size={16} className="text-white size-auto" />
          Export CSV
        </button>
      </div>
    
      <div className="bg-white shadow rounded-2xl p-6">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <SortAsc size={20} className="text-orange-500" /> Filter Data
        </h2>

        <div className="mb-3">
          <input
            type="date"
            value={filters.date}
            onChange={(e) => setFilters({...filters, date: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm shadow-sm bg-white focus:border-orange-500 focus:outline-none"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
          <select 
            value={filters.shift}
            onChange={(e) => setFilters({...filters, shift: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm bg-white focus:border-orange-500 focus:outline-none"
          >
            <option>Pilih Shift</option>
            <option>06.00 - 12.00</option>
            <option>12.00 - 18.00</option>
            <option>18.00 - 00.00</option>
          </select>

          <select className="border rounded-lg px-3 py-2 text-sm bg-white focus:border-orange-500 focus:outline-none">
            <option>Pilih Tim</option>
          </select>

          <select 
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm bg-white focus:border-orange-500 focus:outline-none"
          >
            <option>Pilih Status</option>
            <option>Menunggu</option>
            <option>Disetujui</option>
            <option>Ditolak</option>
          </select>
        </div>

        <input
          type="text"
          placeholder="Cari Nama Host"
          value={filters.search}
          onChange={(e) => setFilters({...filters, search: e.target.value})}
          className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:border-orange-500 focus:outline-none"/>
      </div>

      <div className="w-full border rounded-xl overflow-x-auto mt-6 bg-white">
        <div className="grid grid-cols-6 min-w-[900px] bg-[#fffef0] text-black text-sm font-semibold px-6 py-4">
            <div>HOST & TIM</div>
            <div>SHIFT & TANGGAL</div>
            <div>TOTAL DIAMOND</div>
            <div>STATUS</div>
            <div>BUKTI</div>
            <div>VERIFIKASI</div>
        </div>

        <div className="flex flex-col">
          {dashboardData.reports.map((report) => (
            <div key={report.id} className="grid grid-cols-6 min-w-[900px] items-center px-6 py-4 border-t">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-gray-600" />
                </div>
                <div>
                    <p className="font-medium">{report.host?.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-400">{report.host?.host_profile?.team || '-'}</p>
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-700 font-medium">{report.shift_schedule}</p>
                <p className="text-xs text-gray-400">{report.report_date}</p>
              </div>

              <div className="text-orange-500 font-semibold">
                {Number(report.diamond_earned).toLocaleString('id-ID')}
              </div>

              <div>
                <span className={`px-3 py-1 rounded-lg text-sm flex items-center gap-2 w-fit ${
                  report.status === 'Disetujui' ? 'bg-green-100 text-green-700' :
                  report.status === 'Ditolak' ? 'bg-red-100 text-red-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                    {report.status === 'Disetujui' && <CheckCircle size={16} />}
                    {report.status === 'Ditolak' && <XCircle size={16} />}
                    {report.status === 'Menunggu' && <Clock size={16} />}
                    {report.status}
                </span>
              </div>

              <div>
                <button 
                  onClick={() => setSelectedImages(report.evidences)}
                  className="text-blue-500 flex items-center gap-1 hover:underline text-sm"
                >
                  <Eye size={16} /> Lihat ({report.evidences?.length || 0})
                </button>
              </div>

              <div className="flex items-center gap-2">
                {report.status === 'Menunggu' || report.status === 'Diperiksa' ? (
                  <>
                    <button onClick={() => handleStatusUpdate(report.id, 'Disetujui')} className="text-white bg-green-500 hover:bg-green-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition">Terima</button>
                    <button onClick={() => handleStatusUpdate(report.id, 'Ditolak')} className="text-white bg-red-500 hover:bg-red-600 px-3 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition">Tolak</button>
                  </>
                ) : (
                  <span className="text-gray-400 text-sm italic">Selesai</span>
                )}
              </div>
            </div>
          ))}
          {dashboardData.reports.length === 0 && (
            <p className="text-center text-gray-500 py-6">Belum ada laporan.</p>
          )}
        </div>
      </div>

      {selectedImages && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative shadow-2xl">
            <button onClick={() => setSelectedImages(null)} className="absolute right-4 top-4 p-2 hover:bg-gray-100 rounded-full transition"><X /></button>
            <h3 className="text-lg font-bold mb-6">Bukti Screenshot Laporan</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {selectedImages.map((img, idx) => (
                <img key={idx} src={`http://127.0.0.1:8000/storage/${img.image_path}`} alt="bukti" className="w-full rounded-xl border border-gray-200" />
              ))}
              {selectedImages.length === 0 && <p className="text-gray-500 italic">Tidak ada gambar bukti.</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BerandaFinance;