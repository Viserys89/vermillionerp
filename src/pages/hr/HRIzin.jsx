import React, { useState } from 'react';
import { CheckCircle, X, AlertCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';

const HRIzin = () => {
  const [leaves, setLeaves] = useState([
    { id: 1, employee: 'Eka Kumar', type: 'Cuti', date: '2024-04-10 - 2024-04-12', status: 'Approved', reason: 'Personal' },
    { id: 2, employee: 'Siti Nurhaliza', type: 'Izin', date: '2024-04-08', status: 'Pending', reason: 'Sakit' },
    { id: 3, employee: 'Budi Santo', type: 'Cuti', date: '2024-04-15 - 2024-04-17', status: 'Rejected', reason: 'Liburan' },
    { id: 4, employee: 'Maya Indah', type: 'Izin', date: '2024-04-20', status: 'Pending', reason: 'Checkup RS' },
    { id: 5, employee: 'Andi Wijaya', type: 'Cuti', date: '2024-04-22 - 2024-04-23', status: 'Approved', reason: 'Acara Keluarga' },
  ]);

  // State untuk Search, Filter & Pagination
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const handleApprove = (leave) => {
    setSelectedLeave(leave);
    setConfirmAction('approve');
    setIsConfirmOpen(true);
  };

  const handleReject = (leave) => {
    setSelectedLeave(leave);
    setConfirmAction('reject');
    setIsConfirmOpen(true);
  };

  const confirmAction_Execute = () => {
    if (!selectedLeave) return;
    
    const newStatus = confirmAction === 'approve' ? 'Approved' : 'Rejected';
    setLeaves(leaves.map(l => l.id === selectedLeave.id ? { ...l, status: newStatus } : l));
    
    const message = confirmAction === 'approve' 
      ? `Izin ${selectedLeave.employee} telah disetujui`
      : `Izin ${selectedLeave.employee} telah ditolak`;
    
    showNotification('success', message);
    setIsConfirmOpen(false);
    setSelectedLeave(null);
    setConfirmAction(null);
  };

  // Filter Data
  const filteredLeaves = leaves.filter(l => {
    const matchSearch = l.employee.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'Semua' || l.status === filterStatus;
    return matchSearch && matchStatus;
  });

  // Logika Pagination
  const totalPages = Math.ceil(filteredLeaves.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLeaves = filteredLeaves.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="animate-fade-in space-y-4">
      {notification && (
        <div className={`fixed top-4 right-4 z-[10000] p-4 rounded-xl backdrop-blur-xl border ${
          notification.type === 'success' 
            ? 'bg-status-success/90 border-status-success text-white' 
            : 'bg-status-error/90 border-status-error text-white'
        } shadow-lg flex items-center gap-3 animate-slide-up max-w-md`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Izin & Cuti Karyawan</h1>
      
      {/* Stats Grid - Mobile First */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
          <p className="text-xs md:text-sm text-text-secondary truncate">Total Request</p>
          <p className="text-2xl md:text-3xl font-bold text-brand-orange mt-2">{leaves.length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
          <p className="text-xs md:text-sm text-text-secondary truncate">Approved</p>
          <p className="text-2xl md:text-3xl font-bold text-status-success mt-2">{leaves.filter(l => l.status === 'Approved').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
          <p className="text-xs md:text-sm text-text-secondary truncate">Pending</p>
          <p className="text-2xl md:text-3xl font-bold text-status-warning mt-2">{leaves.filter(l => l.status === 'Pending').length}</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
          <p className="text-xs md:text-sm text-text-secondary truncate">Rejected</p>
          <p className="text-2xl md:text-3xl font-bold text-status-error mt-2">{leaves.filter(l => l.status === 'Rejected').length}</p>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 space-y-4">
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg md:text-xl font-bold text-text-primary">Daftar Izin & Cuti</h2>
          
          {/* Fitur Search & Filter */}
          <div className="flex flex-col sm:flex-row gap-2 w-full md:w-auto">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Cari nama karyawan..." 
                value={searchTerm} 
                onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}} 
                className="w-full pl-9 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange outline-none text-sm transition-all"
              />
            </div>
            <select 
              value={filterStatus} 
              onChange={(e) => {setFilterStatus(e.target.value); setCurrentPage(1);}} 
              className="w-full sm:w-40 px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange outline-none text-sm bg-white transition-all"
            >
              <option value="Semua">Semua Status</option>
              <option value="Pending">Pending</option>
              <option value="Approved">Approved</option>
              <option value="Rejected">Rejected</option>
            </select>
          </div>
        </div>
        
        {filteredLeaves.length > 0 ? (
          <>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-bold text-text-primary">Karyawan</th>
                    <th className="px-4 py-3 text-left font-bold text-text-primary hidden sm:table-cell">Tipe</th>
                    <th className="px-4 py-3 text-left font-bold text-text-primary hidden md:table-cell">Tanggal</th>
                    <th className="px-4 py-3 text-left font-bold text-text-primary hidden lg:table-cell">Alasan</th>
                    <th className="px-4 py-3 text-left font-bold text-text-primary">Status</th>
                    <th className="px-4 py-3 text-center font-bold text-text-primary">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {currentLeaves.map(leave => (
                    <tr key={leave.id} className="border-b border-gray-100 hover:bg-light-bg/50 transition-colors">
                      <td className="px-4 py-3 font-medium">
                        <div className="text-text-primary">{leave.employee}</div>
                        <div className="text-xs text-text-secondary sm:hidden">{leave.type} • {leave.date}</div>
                      </td>
                      <td className="px-4 py-3 text-text-primary hidden sm:table-cell">{leave.type}</td>
                      <td className="px-4 py-3 text-text-secondary hidden md:table-cell text-xs">{leave.date}</td>
                      <td className="px-4 py-3 text-text-primary hidden lg:table-cell truncate max-w-[150px]">{leave.reason}</td>
                      <td className="px-4 py-3">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                          leave.status === 'Approved' ? 'bg-green-100 text-status-success' :
                          leave.status === 'Pending' ? 'bg-yellow-100 text-status-warning' :
                          'bg-red-100 text-status-error'
                        }`}>
                          {leave.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {leave.status === 'Pending' ? (
                          <div className="flex justify-center gap-2">
                            {/* FIX BUTTON AKSI: Soft color, ada text-nya di desktop, jelas bisa di-klik */}
                            <button
                              onClick={() => handleApprove(leave)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 text-status-success rounded-lg hover:bg-green-100 transition-all font-bold text-xs"
                              title="Setujui"
                            >
                              <CheckCircle size={16} /> <span className="hidden lg:inline">Setujui</span>
                            </button>
                            <button
                              onClick={() => handleReject(leave)}
                              className="flex items-center gap-1.5 px-3 py-1.5 bg-red-50 text-status-error rounded-lg hover:bg-red-100 transition-all font-bold text-xs"
                              title="Tolak"
                            >
                              <X size={16} /> <span className="hidden lg:inline">Tolak</span>
                            </button>
                          </div>
                        ) : (
                          <div className="text-center text-xs text-text-light font-medium italic">Selesai</div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* Pagination */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs md:text-sm text-text-secondary text-center sm:text-left">
                Menampilkan <span className="font-semibold text-text-primary">{indexOfFirstItem + 1}</span> - <span className="font-semibold text-text-primary">{Math.min(indexOfLastItem, filteredLeaves.length)}</span> dari <span className="font-semibold text-text-primary">{filteredLeaves.length}</span> data
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft size={16} />
                </button>
                <div className="hidden sm:flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${currentPage === i + 1 ? 'bg-brand-orange text-white' : 'hover:bg-orange-50 text-gray-600'}`}>
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-text-secondary text-sm md:text-base">Tidak ada data izin/cuti yang sesuai</p>
          </div>
        )}
      </div>

      {/* Confirmation Modal */}
      {isConfirmOpen && selectedLeave && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white/90 backdrop-blur-2xl border border-white p-6 md:p-8 rounded-2xl md:rounded-[30px] w-full max-w-md shadow-2xl animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-full ${confirmAction === 'approve' ? 'bg-green-100' : 'bg-red-100'}`}>
                {confirmAction === 'approve' ? 
                  <CheckCircle size={32} className="text-status-success" /> :
                  <X size={32} className="text-status-error" />
                }
              </div>
            </div>
            
            <h3 className="text-lg md:text-xl font-bold text-center mb-2">
              {confirmAction === 'approve' ? 'Setujui Izin' : 'Tolak Izin'}
            </h3>
            <p className="text-center text-gray-600 text-sm md:text-base mb-2">
              <strong>{selectedLeave.employee}</strong>
            </p>
            <p className="text-center text-gray-500 text-xs md:text-sm mb-6">
              {selectedLeave.type} • {selectedLeave.date}
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={confirmAction_Execute}
                className={`flex-1 text-white py-3 rounded-lg font-bold hover:opacity-90 transition-all text-sm md:text-base ${
                  confirmAction === 'approve' ? 'bg-status-success' : 'bg-status-error'
                }`}
              >
                {confirmAction === 'approve' ? 'Setujui' : 'Tolak'}
              </button>
              {/* FIX BUTTON BATAL: Soft grey biar ngga mendominasi */}
              <button
                onClick={() => {
                  setIsConfirmOpen(false);
                  setSelectedLeave(null);
                  setConfirmAction(null);
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all text-sm md:text-base"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRIzin;