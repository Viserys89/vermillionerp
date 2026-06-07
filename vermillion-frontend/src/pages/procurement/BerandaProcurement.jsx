import React, { useState } from 'react';
import { 
  Plus, Search, Check, X, Eye, 
  ShoppingBag, ClipboardList, Wallet, 
  ExternalLink, Image as ImageIcon,
  CheckCircle2, XCircle
} from 'lucide-react';

const BerandaProcurement = () => {
  const [isAddModalOpen, setAddModalOpen] = useState(false);
  const [isRejectModalOpen, setRejectModalOpen] = useState(false);
  // const [selectedRequest, setSelectedRequest] = useState(null);
  const hostRequests = [
    { 
      id: 1, host: "Vicky - Ventura", branch: "Gagak", category: "Streaming", 
      item: "Webcam Logitech C922", qty: 1, reason: "Webcam lama rusak", 
      link: "https://shopee.co.id/...", img: "https://via.placeholder.com/50" 
    },
    { 
      id: 2, host: "Budi - Titan", branch: "Sukaluyu", category: "Kantor", 
      item: "Kertas A4 2 Rim", qty: 2, reason: "Stok bulanan habis", 
      link: "https://tokopedia.com/...", img: "https://via.placeholder.com/50" 
    },
  ];

  const purchaseHistory = [
    { id: 1, item: "Kursi Gaming", category: "Streaming", qty: 1, price: "Rp 1.500.000", date: "2026-04-01" },
    { id: 2, item: "AC Samsung 1PK", category: "Kantor", qty: 1, price: "Rp 3.200.000", date: "2026-03-28" },
    { id: 3, item: "Mic Condenser", category: "Hiburan", qty: 2, price: "Rp 800.000", date: "2026-03-25" },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* --- SECTION 1: REKAPITULASI (STATS) --- */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4">
          <div className="bg-orange-100 p-3 rounded-2xl text-orange-600"><ShoppingBag /></div>
          <div>
            <p className="text-xs text-gray-500 font-medium italic">Dibeli (Bulan Ini)</p>
            <h4 className="text-2xl font-bold text-gray-800">12 Barang</h4>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4">
          <div className="bg-blue-100 p-3 rounded-2xl text-blue-600"><ClipboardList /></div>
          <div>
            <p className="text-xs text-gray-500 font-medium italic">Total Request</p>
            <h4 className="text-2xl font-bold text-gray-800">45 Antrean</h4>
          </div>
        </div>
        <div className="bg-white/60 backdrop-blur-md p-6 rounded-3xl border border-white shadow-sm flex items-center gap-4">
          <div className="bg-emerald-100 p-3 rounded-2xl text-emerald-600"><Wallet /></div>
          <div>
            <p className="text-xs text-gray-500 font-medium italic">Pengeluaran (Bulan Ini)</p>
            <h4 className="text-2xl font-bold text-gray-800 tracking-tight">Rp 12.450.000</h4>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* --- SECTION 2: REQUEST DARI HOST (ACC/REJECT) --- */}
        <section className="xl:col-span-1 space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <ClipboardList size={20}/> Request Host
            </h3>
            <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">New</span>
          </div>
          
          <div className="space-y-3">
            {hostRequests.map((req) => (
              <div key={req.id} className="bg-white/40 border border-white p-4 rounded-2xl shadow-sm hover:bg-white/60 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <span className={`text-[10px] px-2 py-1 rounded-lg font-bold text-white ${req.category === 'Streaming' ? 'bg-purple-500' : 'bg-blue-500'}`}>
                    {req.category}
                  </span>
                  <div className="flex gap-1">
                    <button className="p-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-sm">
                      <Check size={16} />
                    </button>
                    <button 
                      onClick={() => setRejectModalOpen(true)}
                      className="p-1.5 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-sm"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>
                <h4 className="font-bold text-sm text-gray-800">{req.item} ({req.qty}x)</h4>
                <p className="text-[10px] text-gray-500 mb-2 leading-tight">Host: {req.host} | Cabang: {req.branch}</p>
                <div className="flex gap-2 mt-3">
                  <button className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-gray-100 text-[10px] font-bold rounded-lg text-gray-600 hover:bg-gray-200">
                    <ImageIcon size={12} /> Bukti
                  </button>
                  <a href={req.link} target="_blank" className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-orange-100 text-[10px] font-bold rounded-lg text-orange-600 hover:bg-orange-200">
                    <ExternalLink size={12} /> Link
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* --- SECTION 3: HISTORI PEMBELIAN --- */}
        <section className="xl:col-span-2 space-y-4">
          <div className="flex justify-between items-center px-2">
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <ShoppingBag size={20}/> Histori Pembelian
            </h3>
            <button 
              onClick={() => setAddModalOpen(true)}
              className="bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold py-2 px-4 rounded-xl flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <Plus size={16}/> Tambah Pembelian
            </button>
          </div>

          <div className="bg-white/40 backdrop-blur-md rounded-3xl border border-white overflow-hidden shadow-sm">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/60 text-gray-500 text-[11px] uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4 font-bold">Barang</th>
                  <th className="px-6 py-4 font-bold">Kategori</th>
                  <th className="px-6 py-4 font-bold">Harga</th>
                  <th className="px-6 py-4 font-bold text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/20">
                {purchaseHistory.map((item) => (
                  <tr key={item.id} className="hover:bg-white/20 transition-colors">
                    <td className="px-6 py-4 font-bold text-gray-800">
                      {item.item}
                      <p className="text-[10px] font-normal text-gray-400 italic">{item.date}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-200/50 px-2 py-1 rounded-md text-[10px] font-bold text-gray-600 uppercase">
                        {item.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-orange-600">{item.price}</td>
                    <td className="px-6 py-4 text-center">
                      <button className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded-lg"><Eye size={16}/></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>

      {/* --- MODAL: TAMBAH PEMBELIAN --- */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-[30px] w-full max-w-lg shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Tambah Data Pembelian</h3>
              <X className="cursor-pointer hover:text-red-500" onClick={() => setAddModalOpen(false)} />
            </div>
            <form className="grid grid-cols-2 gap-4">
              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-500 ml-1">Nama Barang</label>
                <input type="text" className="w-full p-3 bg-gray-50 border border-gray-100 rounded-xl focus:outline-orange-500" placeholder="Contoh: Meja Kursi Kantor" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-500 ml-1">Kategori</label>
                <select className="p-3 bg-gray-50 border border-gray-100 rounded-xl">
                  <option>Kantor</option>
                  <option>Streaming</option>
                  <option>Hiburan</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-500 ml-1">Jumlah (Qty)</label>
                <input type="number" className="p-3 bg-gray-50 border border-gray-100 rounded-xl" placeholder="0" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-500 ml-1">Total Harga</label>
                <input type="text" className="p-3 bg-gray-50 border border-gray-100 rounded-xl" placeholder="Rp 0" />
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-500 ml-1">Tanggal</label>
                <input type="date" className="p-3 bg-gray-50 border border-gray-100 rounded-xl" />
              </div>
              <div className="col-span-2 flex flex-col gap-1">
                <label className="text-[11px] font-bold text-gray-500 ml-1">Bukti Pembayaran (Foto)</label>
                <input type="file" className="text-xs file:bg-orange-50 file:text-orange-600 file:border-none file:px-4 file:py-2 file:rounded-lg" />
              </div>
              <button className="col-span-2 mt-4 bg-orange-500 text-white py-4 rounded-2xl font-bold shadow-lg shadow-orange-200">Simpan Data Pembelian</button>
            </form>
          </div>
        </div>
      )}

      {/* --- MODAL: REJECT REQUEST --- */}
      {isRejectModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white p-8 rounded-[30px] w-full max-w-sm shadow-2xl animate-slide-up">
            <h3 className="text-lg font-bold mb-2">Alasan Menolak</h3>
            <p className="text-xs text-gray-400 mb-4 italic">Berikan alasan yang jelas kepada Host.</p>
            <textarea className="w-full p-4 bg-gray-50 border border-gray-100 rounded-2xl h-32 focus:outline-red-500 mb-4" placeholder="Contoh: Stok di kantor Sukaluyu masih ada, silakan cek inventory."></textarea>
            <div className="flex gap-2">
              <button onClick={() => setRejectModalOpen(false)} className="flex-1 py-3 font-bold text-gray-500">Batal</button>
              <button className="flex-1 py-3 bg-red-500 text-white rounded-xl font-bold">Kirim Penolakan</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BerandaProcurement;