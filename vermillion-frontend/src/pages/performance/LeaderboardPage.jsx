import React, { useState } from 'react';
import { Trophy, Medal, Users, Diamond, Download, ChevronLeft, ChevronRight, Image as ImageIcon, FileSpreadsheet } from 'lucide-react';

const LeaderboardPage = () => {
  const [activeTab, setActiveTab] = useState('host'); // 'host' or 'team'
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock Host Leaderboard
  const [hostLeaderboard] = useState([
    { rank: 1, name: 'Siti Nurhaliza', team: 'Team Bravo', diamonds: 125000 },
    { rank: 2, name: 'Ani Wijaya', team: 'Team Alpha', diamonds: 98000 },
    { rank: 3, name: 'Eka Kumar', team: 'Team Alpha', diamonds: 85000 },
    { rank: 4, name: 'Rudi Tabuti', team: 'Team Bravo', diamonds: 72000 },
    { rank: 5, name: 'Budi Santoso', team: 'Team Charlie', diamonds: 45000 },
    { rank: 6, name: 'Maya Indah', team: 'Team Charlie', diamonds: 42000 },
    { rank: 7, name: 'Dewi Persik', team: 'Team Alpha', diamonds: 38000 },
  ]);

  // Mock Team Leaderboard
  const [teamLeaderboard] = useState([
    { rank: 1, name: 'Team Bravo', leader: 'Sarah', diamonds: 345000, growth: '+15%' },
    { rank: 2, name: 'Team Alpha', leader: 'Alex', diamonds: 298000, growth: '+10%' },
    { rank: 3, name: 'Team Charlie', leader: 'Mike', diamonds: 125000, growth: '+5%' },
  ]);

  const currentData = activeTab === 'host' ? hostLeaderboard : teamLeaderboard;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = currentData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(currentData.length / itemsPerPage);

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Leaderboard Bulanan</h1>
          <p className="text-gray-500 text-sm">Peringkat performa akumulatif periode April 2024</p>
        </div>
        <div className="flex gap-2 w-full md:w-auto">
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-green-100 hover:bg-green-700 transition-all">
            <FileSpreadsheet size={18} /> CSV
          </button>
          <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100 hover:bg-blue-700 transition-all">
            <ImageIcon size={18} /> Image
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex p-1 bg-gray-100 rounded-2xl w-full sm:w-72">
        <button 
          onClick={() => {setActiveTab('host'); setCurrentPage(1);}}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'host' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Top Host
        </button>
        <button 
          onClick={() => {setActiveTab('team'); setCurrentPage(1);}}
          className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === 'team' ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
        >
          Top Tim
        </button>
      </div>

      {/* Podium for Top 3 (Only for Host) */}
      {activeTab === 'host' && currentPage === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end pb-4 pt-8">
          {/* Rank 2 */}
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm text-center order-2 md:order-1 relative h-64 flex flex-col justify-center">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center border-4 border-white font-bold text-gray-600 shadow-md">2</div>
             <p className="font-bold text-gray-800 text-lg">{hostLeaderboard[1].name}</p>
             <p className="text-sm text-gray-400 mb-4">{hostLeaderboard[1].team}</p>
             <p className="text-xl font-black text-orange-500">{hostLeaderboard[1].diamonds.toLocaleString()} 💎</p>
          </div>
          {/* Rank 1 */}
          <div className="bg-white p-8 rounded-[32px] border-2 border-yellow-400 shadow-xl text-center order-1 md:order-2 relative h-80 flex flex-col justify-center scale-105 z-10">
             <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                <Medal size={32} className="text-white" />
             </div>
             <p className="font-black text-gray-800 text-xl mb-1">{hostLeaderboard[0].name}</p>
             <p className="text-sm text-gray-500 mb-6 font-bold">{hostLeaderboard[0].team}</p>
             <p className="text-3xl font-black text-yellow-500">{hostLeaderboard[0].diamonds.toLocaleString()} <span className="text-sm">💎</span></p>
          </div>
          {/* Rank 3 */}
          <div className="bg-white p-6 rounded-[32px] border border-gray-100 shadow-sm text-center order-3 md:order-3 relative h-60 flex flex-col justify-center">
             <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center border-4 border-white font-bold text-orange-700 shadow-md">3</div>
             <p className="font-bold text-gray-800 text-lg">{hostLeaderboard[2].name}</p>
             <p className="text-sm text-gray-400 mb-4">{hostLeaderboard[2].team}</p>
             <p className="text-xl font-black text-orange-500">{hostLeaderboard[2].diamonds.toLocaleString()} 💎</p>
          </div>
        </div>
      )}

      {/* Main Table */}
      <div className="bg-white rounded-[24px] border border-orange-100 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase font-bold">
              <tr>
                <th className="px-6 py-4 w-20">Rank</th>
                <th className="px-6 py-4">{activeTab === 'host' ? 'Nama Host' : 'Nama Tim'}</th>
                <th className="px-6 py-4">{activeTab === 'host' ? 'Tim' : 'Leader'}</th>
                <th className="px-6 py-4 text-right">Total Berlian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {currentItems.map((item) => (
                <tr key={item.rank} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 font-black text-gray-400">#{item.rank}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      {activeTab === 'host' ? (
                        <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center font-bold text-xs">
                          {item.name.charAt(0)}
                        </div>
                      ) : (
                        <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Users size={16} /></div>
                      )}
                      <span className="font-bold text-gray-800">{item.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">{activeTab === 'host' ? item.team : item.leader}</td>
                  <td className="px-6 py-4 text-right font-black text-gray-800">
                    {item.diamonds.toLocaleString()} <span className="text-orange-500">💎</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="p-6 bg-gray-50 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-500 font-medium">
            Menampilkan <span className="font-bold text-gray-800">{indexOfFirstItem + 1}</span> - <span className="font-bold text-gray-800">{Math.min(indexOfLastItem, currentData.length)}</span> dari <span className="font-bold text-gray-800">{currentData.length}</span> data
          </p>
          <div className="flex gap-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              className="p-2 bg-white border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-100 transition-all shadow-sm"
            >
              <ChevronLeft size={20} />
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button 
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-10 h-10 rounded-xl font-bold text-sm transition-all shadow-sm ${currentPage === i + 1 ? 'bg-orange-500 text-white border-orange-500' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-100'}`}
              >
                {i + 1}
              </button>
            ))}
            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              className="p-2 bg-white border border-gray-200 rounded-xl disabled:opacity-50 hover:bg-gray-100 transition-all shadow-sm"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
