import React, { useState } from 'react';
import { AlertCircle, Search, UserMinus, ShieldAlert, History, Plus, Trash2, RotateCcw, UserPlus } from 'lucide-react';
import ConfirmationModal from '../../components/common/ConfirmationModal';

const RedMarkPage = () => {
  const [redMarkData, setRedMarkData] = useState([
    { id: 1, name: 'Budi Santoso', team: 'Team Charlie', total: 5, status: 'Critical' },
    { id: 2, name: 'Rudi Tabuti', team: 'Team Bravo', total: 3, status: 'Warning' },
    { id: 3, name: 'Eka Kumar', team: 'Team Alpha', total: 2, status: 'Active' },
  ]);

  const [actionHistory] = useState([
    { id: 1, host: 'Budi Santoso', action: 'Tambah Red Mark', date: '2024-04-23 10:00', by: 'Admin Performance' },
    { id: 2, host: 'Eka Kumar', action: 'Reset Red Mark', date: '2024-04-22 14:30', by: 'Admin Performance' },
    { id: 3, host: 'Siti Nurhaliza', action: 'Kurangi Red Mark', date: '2024-04-21 09:15', by: 'Admin Performance' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('add'); // 'add', 'remove', 'reset', 'history'
  const [selectedHost, setSelectedHost] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAction = (type, host = null) => {
    setSelectedHost(host);
    setModalType(type);
    setIsModalOpen(true);
  };

  const confirmAction = () => {
    if (modalType === 'add') {
       setRedMarkData(redMarkData.map(h => h.id === selectedHost.id ? { ...h, total: h.total + 1 } : h));
    } else if (modalType === 'remove') {
       setRedMarkData(redMarkData.map(h => h.id === selectedHost.id ? { ...h, total: Math.max(0, h.total - 1) } : h));
    } else if (modalType === 'reset') {
       setRedMarkData(redMarkData.map(h => h.id === selectedHost.id ? { ...h, total: 0 } : h));
    }
  };

  const filteredHosts = redMarkData.filter(h => h.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Manajemen Red Marks</h1>
          <p className="text-gray-500 text-sm">Kelola poin pelanggaran dan riwayat hukuman host</p>
        </div>
        <button 
          onClick={() => handleAction('history')}
          className="w-full sm:w-auto px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-bold shadow-sm hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
        >
          <History size={20} /> Lihat Riwayat Aksi
        </button>
      </div>

      {/* Action Bar */}
      <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Cari nama host..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <button 
          onClick={() => handleAction('add', redMarkData[0])} // Simulation: add to first host for demo
          className="px-6 py-3 bg-red-600 text-white rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-red-100"
        >
          <UserPlus size={20} /> Tambah Red Mark
        </button>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-[24px] border border-orange-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Nama Host</th>
                <th className="px-6 py-4">Tim</th>
                <th className="px-6 py-4 text-center">Total Red Marks</th>
                <th className="px-6 py-4 text-right">Kelola Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filteredHosts.map(host => (
                <tr key={host.id} className="hover:bg-red-50/30 transition-colors group">
                  <td className="px-6 py-4 font-bold text-gray-800">{host.name}</td>
                  <td className="px-6 py-4 text-gray-500">{host.team}</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`inline-flex items-center justify-center w-10 h-10 rounded-xl font-black ${host.total >= 5 ? 'bg-red-600 text-white shadow-lg shadow-red-200' : 'bg-red-100 text-red-600'}`}>
                      {host.total}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => handleAction('add', host)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-600 hover:text-white transition-all border border-red-100"
                        title="Tambah Mark"
                      >
                        <Plus size={18} />
                      </button>
                      <button 
                        onClick={() => handleAction('remove', host)}
                        className="p-2 bg-orange-50 text-orange-600 rounded-lg hover:bg-orange-600 hover:text-white transition-all border border-orange-100"
                        title="Kurangi Mark"
                      >
                        <Trash2 size={18} />
                      </button>
                      <button 
                        onClick={() => handleAction('reset', host)}
                        className="p-2 bg-gray-100 text-gray-500 rounded-lg hover:bg-gray-800 hover:text-white transition-all border border-gray-200"
                        title="Reset Semua"
                      >
                        <RotateCcw size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Modals */}
      {modalType !== 'history' && (
        <ConfirmationModal 
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onConfirm={confirmAction}
          title={modalType === 'add' ? 'Tambah Red Mark?' : modalType === 'remove' ? 'Kurangi Red Mark?' : 'Reset Red Marks?'}
          message={
            modalType === 'add' ? `Berikan 1 poin Red Mark kepada ${selectedHost?.name} karena tidak mencapai target harian.` :
            modalType === 'remove' ? `Kurangi 1 poin Red Mark dari ${selectedHost?.name}?` :
            `Apakah Anda yakin ingin menghapus SEMUA Red Mark untuk ${selectedHost?.name}?`
          }
          confirmText={modalType === 'add' ? 'Ya, Tambahkan' : 'Ya, Lanjutkan'}
          type={modalType === 'reset' ? 'danger' : 'warning'}
        />
      )}

      {/* History Modal (Simulated as another modal) */}
      {isModalOpen && modalType === 'history' && (
        <div className="fixed inset-0 z-[10000] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-[24px] shadow-2xl w-full max-w-2xl overflow-hidden animate-slide-up">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50">
              <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2">
                <History className="text-orange-500" /> Riwayat Aksi Performance
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 font-bold text-2xl">×</button>
            </div>
            <div className="p-0 max-h-[400px] overflow-y-auto">
               <table className="w-full text-left text-sm">
                 <thead className="bg-gray-50 text-gray-400 uppercase text-[10px] font-black sticky top-0">
                   <tr>
                     <th className="px-6 py-3">Host</th>
                     <th className="px-6 py-3">Aksi</th>
                     <th className="px-6 py-3 text-right">Waktu & Oleh</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-gray-100">
                   {actionHistory.map(item => (
                     <tr key={item.id} className="hover:bg-gray-50">
                       <td className="px-6 py-4 font-bold text-gray-700">{item.host}</td>
                       <td className="px-6 py-4">
                         <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                           item.action.includes('Tambah') ? 'bg-red-100 text-red-600' : 
                           item.action.includes('Reset') ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'
                         }`}>{item.action}</span>
                       </td>
                       <td className="px-6 py-4 text-right">
                         <p className="text-gray-500 text-[11px]">{item.date}</p>
                         <p className="text-gray-400 text-[10px] italic">{item.by}</p>
                       </td>
                     </tr>
                   ))}
                 </tbody>
               </table>
            </div>
            <div className="p-6 bg-gray-50 text-right">
               <button onClick={() => setIsModalOpen(false)} className="px-6 py-2 bg-gray-800 text-white rounded-xl font-bold">Tutup</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RedMarkPage;
