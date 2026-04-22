import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Diamond, 
  Calendar, 
  TrendingUp, 
  Upload, 
  History, 
  Download,
  Filter
} from 'lucide-react';
import ConfirmationModal from '../../components/common/ConfirmationModal';

const HostDetailPage = () => {
  const { hostId } = useParams();
  const navigate = useNavigate();
  
  // Mock Host Data
  const [host] = useState({
    id: hostId,
    name: 'Eka Kumar',
    team: 'Team Alpha',
    joinedDate: '2023-12-01',
    totalDiamonds: 154000,
    monthlyTarget: 50000,
    currentMonthDiamonds: 42000
  });

  // Mock Daily History
  const [history] = useState([
    { date: '2024-04-23', diamonds: 5400, status: 'Target' },
    { date: '2024-04-22', diamonds: 3200, status: 'Below' },
    { date: '2024-04-21', diamonds: 7800, status: 'Exceed' },
    { date: '2024-04-20', diamonds: 4500, status: 'Target' },
    { date: '2024-04-19', diamonds: 1200, status: 'Below' },
  ]);

  const [isImportModalOpen, setImportModalOpen] = useState(false);

  const handleImport = () => {
    alert('Simulasi: Data dari Excel berhasil diimpor!');
  };

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-all shadow-sm"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Detail Performa Host</h1>
            <p className="text-gray-500 text-sm">{host.name} • {host.team}</p>
          </div>
        </div>
        <button 
          onClick={() => setImportModalOpen(true)}
          className="w-full md:w-auto px-6 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <Upload size={20} /> Impor Data Excel
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-[24px] border border-orange-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Diamond size={24} /></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Akumulasi</p>
          </div>
          <p className="text-sm text-gray-500 font-medium">Total Berlian All-Time</p>
          <h3 className="text-2xl font-black text-gray-800">{host.totalDiamonds.toLocaleString()}</h3>
        </div>

        <div className="bg-white p-6 rounded-[24px] border border-orange-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl"><TrendingUp size={24} /></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Bulan Ini</p>
          </div>
          <p className="text-sm text-gray-500 font-medium">Total Berlian April</p>
          <h3 className="text-2xl font-black text-gray-800">{host.currentMonthDiamonds.toLocaleString()}</h3>
          <div className="mt-2 w-full bg-gray-100 h-2 rounded-full overflow-hidden">
            <div className="bg-green-500 h-full" style={{ width: `${(host.currentMonthDiamonds/host.monthlyTarget)*100}%` }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-[24px] border border-orange-100 shadow-sm">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl"><Calendar size={24} /></div>
            <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Info</p>
          </div>
          <p className="text-sm text-gray-500 font-medium">Bergabung Sejak</p>
          <h3 className="text-2xl font-black text-gray-800">{host.joinedDate}</h3>
        </div>
      </div>

      {/* History Table */}
      <div className="bg-white rounded-[24px] border border-orange-100 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-50 flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
            <History size={20} className="text-orange-500" /> Riwayat Harian
          </h2>
          <button className="p-2 text-gray-400 hover:text-orange-500 transition-all">
            <Filter size={20} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4">Tanggal</th>
                <th className="px-6 py-4">Jumlah Berlian</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-6 py-4 text-right">Laporan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {history.map((row, i) => (
                <tr key={i} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-medium text-gray-700">{row.date}</td>
                  <td className="px-6 py-4 font-bold text-gray-800">{row.diamonds.toLocaleString()} 💎</td>
                  <td className="px-6 py-4 text-center">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      row.status === 'Exceed' ? 'bg-green-100 text-green-700' :
                      row.status === 'Target' ? 'bg-blue-100 text-blue-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {row.status === 'Exceed' ? 'Melewati Target' : row.status === 'Target' ? 'Mencapai Target' : 'Dibawah Target'}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmationModal 
        isOpen={isImportModalOpen}
        onClose={() => setImportModalOpen(false)}
        onConfirm={handleImport}
        title="Impor Data Historis"
        message="Pilih file Excel (.xlsx) atau CSV yang berisi rekap harian host ini. Sistem akan otomatis mengakumulasi data ke dalam database performa."
        confirmText="Pilih File & Impor"
        type="info"
      />
    </div>
  );
};

export default HostDetailPage;
