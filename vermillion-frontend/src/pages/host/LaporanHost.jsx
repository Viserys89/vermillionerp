import React, { useState, useEffect } from 'react';
import { CheckCircle, X, Gem, Clock } from 'lucide-react';

const LaporanHost = () => {
  const user = JSON.parse(localStorage.getItem("user")) || { id: 1 };
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSuccessOpen, setSuccessOpen] = useState(false);
  const [files, setFiles] = useState([]);
  const [fileCount, setFileCount] = useState(0);
  const [riwayat, setRiwayat] = useState([]);
  const [formData, setFormData] = useState({
    report_date: new Date().toISOString().split('T')[0],
    shift_schedule: '',
    diamond_earned: ''
  });

  const fetchReports = () => {
    fetch(`${import.meta.env.VITE_API_URL}/host/${user.id}/reports`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setRiwayat(data);
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchReports();
  }, [user.id]);

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    if (selectedFiles.length > 5) {
      alert("Maksimal 5 foto!");
      e.target.value = "";
      setFiles([]);
      setFileCount(0);
    } else {
      setFiles(selectedFiles);
      setFileCount(selectedFiles.length);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('report_date', formData.report_date);
    data.append('shift_schedule', formData.shift_schedule);
    data.append('diamond_earned', formData.diamond_earned);
    files.forEach((file, index) => {
      data.append(`images[${index}]`, file);
    });

    fetch(`http://127.0.0.1:8000/api/host/${user.id}/reports`, {
      method: 'POST',
      body: data
    })
    .then(res => res.json())
    .then(result => {
      if (result.message === 'Laporan berhasil dikirim') {
        setModalOpen(false);
        setSuccessOpen(true);
        setFiles([]);
        setFileCount(0);
        fetchReports();
      } else {
        alert(result.message || 'Gagal mengirim laporan');
      }
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="p-8 rounded-3xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-lg flex flex-col gap-5">
        <h2 className="text-xl font-bold text-gray-800">Buat Laporan Hari Ini?</h2>
        <button 
          onClick={() => setModalOpen(true)}
          className="w-full bg-orange-500 text-white font-bold py-4 rounded-xl hover:bg-orange-600 transition-all active:scale-95"
        >
          Buat Laporan
        </button>
      </div>

      <section className="space-y-4">
        <h3 className="text-lg font-bold border-b-2 border-gray-800 inline-block pb-1">Riwayat Laporan</h3>
        <div className="flex flex-col gap-3">
          {riwayat.map((item) => (
            <div key={item.id} className="flex justify-between items-center p-5 rounded-2xl bg-gradient-to-r from-[#fcf2ea] to-[#f6c8a5] shadow-sm">
              <div>
                <h4 className="font-bold">Laporan {item.report_date}</h4>
                <p className="text-xs text-gray-600">{item.shift_schedule} | {Number(item.diamond_earned).toLocaleString('id-ID')} Diamonds</p>
                <p className="text-xs font-semibold mt-1">Status: {item.status}</p>
              </div>
              {item.status === 'Disetujui' ? <CheckCircle className="text-green-500" size={28} /> : <Clock className="text-orange-500" size={28} />}
            </div>
          ))}
          {riwayat.length === 0 && <p className="text-sm text-gray-500 text-center py-4">Belum ada riwayat laporan.</p>}
        </div>
      </section>

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
                <select 
                  required 
                  value={formData.shift_schedule}
                  onChange={(e) => setFormData({...formData, shift_schedule: e.target.value})}
                  className="p-3 rounded-xl border border-gray-200 bg-white/50 outline-none focus:border-orange-500 transition-all"
                >
                  <option value="">Pilih jadwal shift...</option>
                  <option value="06.00 - 12.00">06.00 - 12.00</option>
                  <option value="12.00 - 18.00">12.00 - 18.00</option>
                  <option value="18.00 - 00.00">18.00 - 00.00</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold">Perolehan Diamond</label>
                <div className="relative">
                  <Gem className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500" size={18} />
                  <input 
                    type="number" 
                    required 
                    value={formData.diamond_earned}
                    onChange={(e) => setFormData({...formData, diamond_earned: e.target.value})}
                    placeholder="Contoh: 12000" 
                    className="w-full p-3 pl-12 rounded-xl border border-gray-200 bg-white/50 outline-none focus:border-orange-500" 
                  />
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