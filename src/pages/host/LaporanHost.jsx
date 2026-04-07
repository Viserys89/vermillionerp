import React, { useState } from 'react';
import { CheckCircle, X, Diamond, Upload } from 'lucide-react';

const LaporanHost = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [fileCount, setFileCount] = useState(0);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 5) {
      alert("Maksimal 5 foto!");
      e.target.value = "";
      setFileCount(0);
    } else {
      setFileCount(files.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setModalOpen(false);
    setSuccessOpen(true);
  };

  const riwayat = [
    { id: 5, time: "09.00 - 12.00", diamond: "12.000" },
    { id: 4, time: "09.00 - 12.00", diamond: "12.000" },
    { id: 3, time: "09.00 - 12.00", diamond: "12.000" },
    { id: 2, time: "09.00 - 12.00", diamond: "12.000" },
    { id: 1, time: "09.00 - 12.00", diamond: "12.000" },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Card Input Laporan */}
      <div className="p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg flex flex-col gap-5">
        <h2 className="text-xl font-bold text-gray-800">Buat Laporan Hari Ini?</h2>
        <button 
          onClick={() => setModalOpen(true)}
          className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all active:scale-95"
        >
          Buat Laporan
        </button>
      </div>

      {/* Riwayat Section */}
      <section className="space-y-4">
        <h3 className="text-lg font-bold border-b-2 border-gray-800 inline-block pb-1">Riwayat Laporan</h3>
        <div className="flex flex-col gap-3">
          {riwayat.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-5 rounded-2xl bg-gradient-to-r from-[#fcf2ea] to-[#f6c8a5] shadow-sm">
              <div>
                <h4 className="font-bold">Live Stream {item.id}</h4>
                <p className="text-xs text-gray-600">{item.time} | {item.diamond} Diamonds</p>
              </div>
              <CheckCircle className="text-green-400" size={28} />
            </div>
          ))}
        </div>
      </section>

      {/* MODAL INPUT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white/80 backdrop-blur-2xl border border-white p-8 rounded-[30px] w-full max-w-md shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Form Input Laporan</h3>
              <X className="cursor-pointer hover:text-red-500" onClick={() => setModalOpen(false)} />
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Jadwal Shift</label>
                <select required className="p-3 rounded-xl border border-gray-200 bg-white/50 outline-none focus:border-orange-500 transition-all">
                  <option value="">Pilih jadwal shift...</option>
                  <option>06.00 - 12.00</option>
                  <option>12.00 - 18.00</option>
                  <option>18.00 - 00.00</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Perolehan Diamond</label>
                <div className="relative">
                  <Diamond className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
                  <input type="number" required placeholder="Contoh: 12000" className="w-full p-3 pl-12 rounded-xl border border-gray-200 bg-white/50 outline-none focus:border-orange-500" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Bukti Screenshot <span className="text-xs font-normal text-gray-500">(Maks 5)</span></label>
                <input type="file" multiple required onChange={handleFileChange} className="text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer" />
                <p className={`text-[10px] ${fileCount > 0 ? 'text-green-600' : 'text-gray-500'}`}>
                  {fileCount > 0 ? `${fileCount} foto terpilih` : 'Format: JPG, PNG'}
                </p>
              </div>

              <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all">Kirim Laporan</button>
            </form>
          </div>
        </div>
      )}

      {/* SUCCESS MODAL */}
      {isSuccessOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-[30px] w-full max-w-sm text-center shadow-2xl animate-slide-up">
            <CheckCircle className="mx-auto text-green-400 mb-4" size={80} />
            <h3 className="text-2xl font-bold mb-2">Laporan Berhasil!</h3>
            <p className="text-sm text-gray-500 mb-6">Laporan shift kamu telah tersimpan ke dalam sistem.</p>
            <button onClick={() => setSuccessOpen(false)} className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold">Tutup</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LaporanHost;