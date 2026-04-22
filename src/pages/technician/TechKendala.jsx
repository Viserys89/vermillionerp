import React, { useState } from 'react';
import { Search, CheckCircle, AlertCircle, Clock, Activity, MessageSquare } from 'lucide-react';
import ConfirmationModal from '../../components/common/ConfirmationModal';

const TechKendala = () => {
  const [issues, setIssues] = useState([
    { id: 1, host: 'Eka Kumar', room: 'Studio A', type: 'Tiktok Live Studio Error', desc: 'Aplikasi force close pas buka OBS', time: '10:05 AM', status: 'Pending' },
    { id: 2, host: 'Siti Nurhaliza', room: 'Studio C', type: 'Akun Suspend', desc: 'Kena pelanggaran komunitas tiba-tiba', time: '09:45 AM', status: 'In Progress' },
    { id: 3, host: 'Budi Santoso', room: 'Studio B', type: 'PC Error', desc: 'Blue screen pas lagi live', time: '09:30 AM', status: 'Resolved' },
    { id: 4, host: 'Maya Indah', room: 'Studio A', type: 'Indofinity Error', desc: 'Gagal login ke sistem ERP', time: '08:15 AM', status: 'Resolved' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [notification, setNotification] = useState(null);

  // Modal State
  const [modalConfig, setModalConfig] = useState({ 
    isOpen: false, 
    type: 'info', 
    title: '', 
    message: '', 
    confirmText: 'Ya',
    onConfirm: () => {} 
  });

  const showNotification = (message) => {
    setNotification({ type: 'success', message });
    setTimeout(() => setNotification(null), 3000);
  };

  const filteredIssues = issues.filter(i => {
    const match = i.host.toLowerCase().includes(searchTerm.toLowerCase()) || i.type.toLowerCase().includes(searchTerm.toLowerCase());
    const matchStatus = filterStatus === 'Semua' || i.status === filterStatus;
    return match && matchStatus;
  });

  const handleUpdateAction = (issue, nextStatus) => {
    const isResolving = nextStatus === 'Resolved';
    setModalConfig({
      isOpen: true,
      type: isResolving ? 'info' : 'warning',
      title: isResolving ? 'Selesaikan Kendala?' : 'Proses Kendala?',
      message: isResolving 
        ? `Apakah Anda sudah memastikan kendala "${issue.type}" milik ${issue.host} sudah teratasi sepenuhnya?`
        : `Anda akan mulai menangani kendala "${issue.type}" milik ${issue.host}. Lanjutkan?`,
      confirmText: isResolving ? 'Ya, Selesai' : 'Ya, Mulai Proses',
      onConfirm: () => {
        setIssues(prevIssues => prevIssues.map(i => i.id === issue.id ? { ...i, status: nextStatus } : i));
        showNotification(isResolving ? `Kendala ${issue.host} telah diselesaikan!` : `Sedang memproses kendala ${issue.host}`);
      }
    });
  };

  return (
    <div className="animate-fade-in space-y-4 md:space-y-6">
      {notification && (
        <div className="fixed top-4 right-4 z-[10000] p-4 rounded-xl bg-green-500 border border-green-600 text-white shadow-lg flex items-center gap-3 animate-slide-up">
          <CheckCircle size={20} /> <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manajemen Kendala (Tiket)</h1>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3 justify-between">
          <div className="relative flex-1 sm:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama host atau jenis error..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)} 
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none text-sm"
            />
          </div>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)} 
            className="w-full sm:w-48 px-3 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-orange-500 outline-none text-sm bg-white"
          >
            <option value="Semua">Semua Status</option>
            <option value="Pending">Pending (Butuh Aksi)</option>
            <option value="In Progress">Sedang Diproses</option>
            <option value="Resolved">Selesai</option>
          </select>
        </div>

        <div className="overflow-x-auto -mx-4 md:mx-0 border rounded-lg border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Info Host & Ruangan</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">Detail Kendala</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600">Status</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 w-40">Aksi Teknisi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredIssues.map(issue => (
                <tr key={issue.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-bold text-gray-800">{issue.host}</p>
                    <p className="text-xs text-orange-600 font-medium mt-0.5">{issue.room}</p>
                    <p className="text-xs text-gray-500 flex items-center gap-1 mt-1"><Clock size={12}/> {issue.time}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-bold text-gray-800">{issue.type}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{issue.desc}</p>
                  </td>
                  <td className="px-4 py-3 text-center">
                     <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-xs font-bold w-28 ${
                        issue.status === 'Pending' ? 'bg-red-100 text-red-700 animate-pulse' : 
                        issue.status === 'In Progress' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'
                      }`}>
                        {issue.status}
                      </span>
                  </td>
                  <td className="px-4 py-3">
                    {issue.status === 'Pending' && (
                      <button 
                        onClick={() => handleUpdateAction(issue, 'In Progress')} 
                        className="w-full py-2 bg-yellow-50 text-yellow-600 border border-yellow-200 rounded-lg hover:bg-yellow-500 hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-1"
                      >
                        <Activity size={14} /> Proses
                      </button>
                    )}
                    {issue.status === 'In Progress' && (
                      <button 
                        onClick={() => handleUpdateAction(issue, 'Resolved')} 
                        className="w-full py-2 bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-500 hover:text-white transition-all text-xs font-bold flex items-center justify-center gap-1"
                      >
                        <CheckCircle size={14} /> Selesaikan
                      </button>
                    )}
                    {issue.status === 'Resolved' && (
                      <button 
                        disabled 
                        className="w-full py-2 bg-gray-100 text-gray-400 rounded-lg text-xs font-bold cursor-not-allowed"
                      >
                        Selesai
                      </button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredIssues.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500">Tidak ada tiket kendala</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={modalConfig.isOpen}
        onClose={() => setModalConfig({ ...modalConfig, isOpen: false })}
        onConfirm={modalConfig.onConfirm}
        title={modalConfig.title}
        message={modalConfig.message}
        confirmText={modalConfig.confirmText}
        type={modalConfig.type}
      />
    </div>
  );
};

export default TechKendala;
