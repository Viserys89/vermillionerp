import React, { useState } from "react";
import {
  User,
  Mail,
  MapPin,
  Phone,
  Calendar,
  ShieldCheck,
  Camera,
  Edit3,
  KeyRound,
  LogOut,
} from "lucide-react";

const ProfilePage = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userData = {
    nama: user?.name,
    email: user?.email,
    telepon: user?.phone,
    alamat: user?.address,
    joinDate: user?.created_at,
    role: user?.role,
    team: user?.team,
  };
  const [isHRModalOpen, setHRModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({ title: "", message: "" });

  const openHRModal = (type) => {
    if (type === "edit") {
      setModalContent({
        title: "Edit Profil",
        message:
          "Untuk melakukan perubahan data profil, silakan hubungi bagian HR melalui WhatsApp.",
      });
    } else {
      setModalContent({
        title: "Ubah Kata Sandi",
        message:
          "Untuk bantuan reset atau ubah kata sandi, silakan hubungi bagian HR melalui WhatsApp.",
      });
    }
    setHRModalOpen(true);
  };

  const handleWhatsAppHR = () => {
    // Ganti dengan nomor WA HR yang sebenarnya
    window.open("https://wa.me/6281234567890", "_blank");
  };
  const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/login";
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
            <h1 className="text-3xl font-extrabold text-gray-800">
              {userData.nama}
            </h1>
            <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2 italic">
              <ShieldCheck size={16} className="text-emerald-500" />{" "}
              {userData.team}
            </p>
            <div className="flex gap-2 mt-4">
              <button
                onClick={() => openHRModal("edit")}
                className="flex items-center gap-2 px-6 py-2 bg-orange-500 text-white rounded-xl font-bold text-sm shadow-lg shadow-orange-200 hover:bg-orange-600 transition-all"
              >
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
          <h3 className="font-bold text-gray-800 border-b border-white/60 pb-3">
            Informasi Kontak
          </h3>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-50 text-blue-500 rounded-2xl">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  Email
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {userData.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-50 text-green-500 rounded-2xl">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  No. Telepon
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {userData.telepon}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-50 text-purple-500 rounded-2xl">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  Alamat Cabang
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {userData.alamat}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Akun & Aktivitas */}
        <section className="bg-white/40 backdrop-blur-xl border border-white rounded-[30px] p-8 shadow-sm space-y-6">
          <h3 className="font-bold text-gray-800 border-b border-white/60 pb-3">
            Detail Akun
          </h3>

          <div className="space-y-5">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-50 text-orange-500 rounded-2xl">
                <Calendar size={20} />
              </div>
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  Bergabung Sejak
                </p>
                <p className="text-sm font-medium text-gray-700">
                  {userData.joinDate
                    ? new Date(userData.joinDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    : "-"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl">
                <KeyRound size={20} />
              </div>
              <div className="flex-1">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                  Keamanan
                </p>
                <button
                  onClick={() => openHRModal("password")}
                  className="text-sm font-bold text-rose-500 hover:underline"
                >
                  Ubah Kata Sandi
                </button>
              </div>
            </div>

            {/* Logout khusus mobile/tambahan */}
            <div className="pt-4 mt-4 border-t border-white/40">
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-4 bg-red-50 text-red-500 rounded-2xl font-bold hover:bg-red-100 transition-colors">
                <LogOut size={20} /> Keluar dari Akun
              </button>
            </div>
          </div>
        </section>
      </div>
      {/* Modal HR */}
{isHRModalOpen && (
  <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
    <div className="bg-white p-8 rounded-[30px] w-full max-w-sm text-center shadow-2xl">
      <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
        <Phone size={32} />
      </div>
      <h3 className="text-xl font-bold mb-2">{modalContent.title}</h3>
      <p className="text-sm text-gray-500 mb-6">{modalContent.message}</p>
      
      <div className="flex gap-3">
        <button 
          onClick={() => setHRModalOpen(false)}
          className="flex-1 py-3 bg-gray-100 rounded-xl font-bold text-gray-600"
        >
          Tutup
        </button>
        <button 
          onClick={handleWhatsAppHR}
          className="flex-1 py-3 bg-green-500 text-white rounded-xl font-bold hover:bg-green-600"
        >
          Hubungi HR
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default ProfilePage;
