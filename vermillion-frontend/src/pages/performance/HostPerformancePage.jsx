import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Search, Filter, Diamond, Calendar, MoreVertical, Eye } from 'lucide-react';

const HostPerformancePage = () => {
  const navigate = useNavigate();
  const [hosts] = useState([
    { id: 1, name: 'Eka Kumar', team: 'Team Alpha', diamonds: 12000, target: 15000, redMarks: 2, lastStream: 'Today' },
    { id: 2, name: 'Siti Nurhaliza', team: 'Team Bravo', diamonds: 25000, target: 20000, redMarks: 0, lastStream: 'Today' },
    { id: 3, name: 'Budi Santoso', team: 'Team Charlie', diamonds: 5000, target: 10000, redMarks: 5, lastStream: 'Yesterday' },
    { id: 4, name: 'Ani Wijaya', team: 'Team Alpha', diamonds: 18000, target: 15000, redMarks: 1, lastStream: 'Today' },
    { id: 5, name: 'Rudi Tabuti', team: 'Team Bravo', diamonds: 15000, target: 20000, redMarks: 3, lastStream: 'Today' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterTeam, setFilterTeam] = useState('Semua');

  const filteredHosts = hosts.filter(host => {
    const matchesSearch = host.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTeam = filterTeam === 'Semua' || host.team === filterTeam;
    return matchesSearch && matchesTeam;
  });

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Performa Host</h1>
          <p className="text-gray-500 text-sm md:text-base">Pantau pencapaian berlian harian setiap host</p>
        </div>
      </div>

      {/* Filters Area */}
      <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Cari nama host..."
            className="w-full pl-10 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select 
          className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-orange-400 font-medium text-gray-700"
          value={filterTeam}
          onChange={(e) => setFilterTeam(e.target.value)}
        >
          <option value="Semua">Semua Tim</option>
          <option value="Team Alpha">Team Alpha</option>
          <option value="Team Bravo">Team Bravo</option>
          <option value="Team Charlie">Team Charlie</option>
        </select>
      </div>

      {/* Table Desktop */}
      <div className="hidden lg:block bg-white rounded-[24px] border border-orange-100 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-gray-500 text-xs uppercase font-bold">
            <tr>
              <th className="px-6 py-4">Host</th>
              <th className="px-6 py-4">Tim</th>
              <th className="px-6 py-4 text-center">Progress Berlian</th>
              <th className="px-6 py-4 text-center">Total Red Mark</th>
              <th className="px-6 py-4 text-right">Detail</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {filteredHosts.map(host => (
              <tr key={host.id} className="hover:bg-orange-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center text-orange-600 font-bold">
                      {host.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-gray-800">{host.name}</p>
                      <p className="text-xs text-gray-400">Live terakhir: {host.lastStream}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium">{host.team}</span>
                </td>
                <td className="px-6 py-4 text-center">
                   <div className="flex flex-col items-center gap-1.5">
                    <div className="w-24 bg-gray-100 h-1.5 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${(host.diamonds/host.target) >= 1 ? 'bg-green-500' : 'bg-orange-400'}`}
                        style={{ width: `${Math.min((host.diamonds/host.target) * 100, 100)}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-gray-500">{host.diamonds.toLocaleString()} / {host.target.toLocaleString()} 💎</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <span className={`inline-flex items-center justify-center w-8 h-8 rounded-lg font-bold ${host.redMarks >= 3 ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>
                    {host.redMarks}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button 
                    onClick={() => navigate(`/dashboard-performance/hosts/${host.id}`)}
                    className="p-2.5 bg-orange-50 text-orange-600 rounded-xl hover:bg-orange-500 hover:text-white transition-all shadow-sm border border-orange-100 flex items-center gap-2 font-bold text-xs"
                  >
                    <Eye size={16} /> Preview Performa
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Cards Mobile */}
      <div className="lg:hidden grid grid-cols-1 gap-4">
        {filteredHosts.map(host => (
          <div key={host.id} className="bg-white p-5 rounded-[20px] border border-orange-100 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 font-bold text-lg">{host.name.charAt(0)}</div>
                <div>
                  <h3 className="font-bold text-gray-800">{host.name}</h3>
                  <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">{host.team}</span>
                </div>
              </div>
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${host.redMarks >= 3 ? 'bg-red-100 text-red-600' : 'bg-yellow-100 text-yellow-600'}`}>{host.redMarks}</div>
            </div>
            <button 
              onClick={() => navigate(`/dashboard-performance/hosts/${host.id}`)}
              className="w-full py-3 bg-orange-50 text-orange-600 rounded-xl font-bold flex items-center justify-center gap-2 border border-orange-100"
            >
              <Eye size={18} /> Preview Performa
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HostPerformancePage;
