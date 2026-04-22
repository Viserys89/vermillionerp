import React, { useState } from 'react';
import { Trophy, Target, Edit2, Plus, Users, Search } from 'lucide-react';
import ConfirmationModal from '../../components/common/ConfirmationModal';

const TeamTargetPage = () => {
  const [teams, setTeams] = useState([
    { id: 1, name: 'Team Alpha', target: 50000, current: 42000, leader: 'Alex', members: 5 },
    { id: 2, name: 'Team Bravo', target: 75000, current: 68000, leader: 'Sarah', members: 8 },
    { id: 3, name: 'Team Charlie', target: 30000, current: 15000, leader: 'Mike', members: 4 },
  ]);

  const [isEditModalOpen, setEditModalOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [newTarget, setNewTarget] = useState('');

  const handleEditClick = (team) => {
    setSelectedTeam(team);
    setNewTarget(team.target);
    setEditModalOpen(true);
  };

  const handleUpdateTarget = () => {
    setTeams(teams.map(t => t.id === selectedTeam.id ? { ...t, target: parseInt(newTarget) } : t));
  };

  return (
    <div className="animate-fade-in space-y-6 pb-10">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Target Tim</h1>
          <p className="text-gray-500 text-sm md:text-base">Kelola target berlian untuk setiap tim streaming</p>
        </div>
        <button className="w-full sm:w-auto bg-orange-500 text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-orange-200 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2">
          <Plus size={20} /> Tambah Tim
        </button>
      </div>

      {/* Grid of Team Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {teams.map(team => (
          <div key={team.id} className="bg-white rounded-[24px] border border-orange-100 shadow-sm p-6 hover:shadow-md transition-all group">
            <div className="flex justify-between items-start mb-6">
              <div className="p-3 bg-orange-50 text-orange-600 rounded-2xl">
                <Trophy size={24} />
              </div>
              <button 
                onClick={() => handleEditClick(team)}
                className="p-2 text-gray-400 hover:text-orange-500 hover:bg-orange-50 rounded-lg transition-all"
              >
                <Edit2 size={18} />
              </button>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800">{team.name}</h3>
              <div className="flex items-center gap-4 mt-2">
                <p className="text-sm text-gray-500 flex items-center gap-1">
                  <Users size={14} /> {team.members} Anggota
                </p>
                <p className="text-sm text-gray-500">Leader: <span className="font-semibold text-gray-700">{team.leader}</span></p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-end">
                <p className="text-xs font-bold text-gray-400 uppercase">Progres Target</p>
                <p className="text-sm font-bold text-gray-800">
                  {team.current.toLocaleString()} / <span className="text-orange-500">{team.target.toLocaleString()}</span>
                </p>
              </div>
              
              <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-1000 ${
                    (team.current/team.target) >= 1 ? 'bg-green-500' : 
                    (team.current/team.target) >= 0.7 ? 'bg-orange-400' : 'bg-red-400'
                  }`}
                  style={{ width: `${Math.min((team.current/team.target) * 100, 100)}%` }}
                />
              </div>

              <div className="flex justify-between items-center text-xs font-bold">
                <span className={`${(team.current/team.target) >= 1 ? 'text-green-500' : 'text-gray-500'}`}>
                  {(team.current/team.target) >= 1 ? 'Target Tercapai!' : `${Math.round((team.current/team.target) * 100)}% Selesai`}
                </span>
                <span className="text-gray-400">Sisa: {Math.max(0, team.target - team.current).toLocaleString()} 💎</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Target Modal Logic */}
      <ConfirmationModal 
        isOpen={isEditModalOpen}
        onClose={() => setEditModalOpen(false)}
        onConfirm={handleUpdateTarget}
        title="Ubah Target Tim"
        message={
          <div className="mt-4 space-y-4">
            <p>Masukkan jumlah target berlian baru untuk {selectedTeam?.name}:</p>
            <div className="relative">
              <input 
                type="number" 
                value={newTarget}
                onChange={(e) => setNewTarget(e.target.value)}
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none transition-all font-bold text-lg"
                placeholder="Contoh: 50000"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">💎</span>
            </div>
          </div>
        }
        confirmText="Simpan Perubahan"
        type="info"
      />
    </div>
  );
};

export default TeamTargetPage;
