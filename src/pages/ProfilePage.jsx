import React from 'react';
import { 
  User, Mail, MapPin, Phone, 
  Calendar, ShieldCheck, Camera, 
  Edit3, KeyRound, LogOut 
} from 'lucide-react';
import { useLocation } from 'react-router-dom';

const ProfilePage = () => {
  const location = useLocation();
  const isProcurement = location.pathname.includes('/procurement');
  const userData = {
    nama: "USER",
    email: "USER@gmail.com",
    telepon: "+62 812 3456 7890",
    alamat: "Jl. Gagak No. 12, Sukaluyu, Bandung",
    joinDate: "12 Januari 2024",
    role: isProcurement ? "Procurement" : "Host",
    team: "Ventura Team"
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fade-in pb-10">
      {/* --- HEADER PROFILE --- */}
      <section className="relative overflow-hidden bg-white/40 backdrop-blur-xl border border-white rounded-[35px] shadow-lg p-8">
        {/* Background Hiasan */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
          {/* Foto Profil */}
          <div className="relative group">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-tr from-orange-500 to-yellow-400 rounded-full p-1 shadow-2xl">
              <div className="w-full h-full bg-gray-200 rounded-full overflow-hidden border-4 border-white flex items-center justify-center">
                <User size={64} className="text-gray-400" />
              </div>
            </div>
            <button className="absolute bottom-2 right-2 bg-white p-2 rounded-full shadow-lg text-orange-600 hover:scale-110 transition-transform border border-orange-100">
              <Camera size={20} />
            </button>
          </div>

          {/* Nama & Status */}
          <div className="text-center md:text-left space-y-2">
            <div className="inline-block px-4 py-1 rounded-full bg-orange-100 text-orange-600 text-xs font-bold uppercase tracking-widest">
              {userData.role}
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800">{userData.nama}</h1>
            <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 italic">
              <ShieldCheck size={16} className="text-emerald-500" /> Divisi/Team
            </p>
            <div className="flex gap-2 mt-4">
               <button className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all">
                <Edit3 size={16} /> Edit Profil
               </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- DETAIL INFORMASI --- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Kontak Info */}
        <section className="bg-white/40 backdrop-blur-xl border border-white rounded-[30px] p-8 shadow-sm space-y-6">
          <h3 className="font-bold text-gray-800 border-b border-white/60 pb-3">Informasi Kontak</h3>
          
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl"><Mail size={20} /></div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Email</p>
                <p className="text-sm font-medium text-gray-700">{userData.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-500 rounded-2xl"><Phone size={20} /></div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">No. Telepon</p>
                <p className="text-sm font-medium text-gray-700">{userData.telepon}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl"><MapPin size={20} /></div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Alamat Cabang</p>
                <p className="text-sm font-medium text-gray-700">{userData.alamat}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Akun & Aktivitas */}
        <section className="bg-white/40 backdrop-blur-xl border border-white rounded-[30px] p-8 shadow-sm space-y-6">
          <h3 className="font-bold text-gray-800 border-b border-white/60 pb-3">Detail Akun</h3>
          
          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl"><Calendar size={20} /></div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Bergabung Sejak</p>
                <p className="text-sm font-medium text-gray-700">{userData.joinDate}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl"><KeyRound size={20} /></div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Keamanan</p>
                <button className="text-sm font-bold text-rose-500 hover:underline">Ubah Kata Sandi</button>
              </div>
            </div>

            {/* Logout khusus mobile/tambahan */}
            <div className="pt-4 mt-4 border-t border-white/40">
              <button className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-100 transition-colors">
                <LogOut size={20} /> Keluar dari Akun
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;