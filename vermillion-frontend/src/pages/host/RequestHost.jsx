import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus, X, CheckCircle, Send } from 'lucide-react';
import { API_BASE_URL } from '../../api';

const RequestHost = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const [facilityRequests, setFacilityRequests] = useState([]);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [isModalOpen, setModalOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); 

  const [formData, setFormData] = useState({
    nama_barang: '',
    link_toko: '',
    deskripsi: ''
  });

  useEffect(() => {
    let isMounted = true; 

    const fetchRequests = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/facility-requests/user/${user.id}`);
        if (isMounted) setFacilityRequests(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        if (isMounted) setLoadingRequests(false);
      }
    };

    if (user.id) {
      fetchRequests();
    }

    return () => {
      isMounted = false;
    };
  }, [user.id, refreshKey]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`${API_BASE_URL}/facility-requests`, {
        user_id: user.id,
        nama_barang: formData.nama_barang,
        link_toko: formData.link_toko,
        deskripsi: formData.deskripsi,
        status: 'Pending'
      });

      setModalOpen(false);
      setSuccessOpen(true);
      
      // Reset form data
      setFormData({
        nama_barang: '',
        link_toko: '',
        deskripsi: ''
      });
      setRefreshKey(oldKey => oldKey + 1);

    } catch (error) {
      console.error(error);
      alert('Gagal mengajukan request');
    }
  };

  // Handler hapus pengajuan
  const handleDeleteRequest = async (id) => {
    const confirmDelete = window.confirm('Yakin ingin menghapus pengajuan ini?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_BASE_URL}/facility-requests/${id}`);
      setRefreshKey(oldKey => oldKey + 1);
      
    } catch (error) {
      console.error(error);
      alert('Gagal menghapus pengajuan');
    }
  };

  return (
    <div className="animate-fade-in">
      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Request Barang
      </h1>

      {/* Header tabel */}
      <div className="flex items-center gap-4 mb-4">
        <h2 className="text-xl font-medium">Tabel Request</h2>
        <button
          onClick={() => setModalOpen(true)}
          className="ml-auto bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow hover:opacity-90 transition"
        >
          <Plus size={16} />
          Buat Request
        </button>
      </div>

      {/* Tabel Request */}
      <div className="w-full border bg-white shadow-sm">
        <div className="grid grid-cols-5 bg-[#fffef0] text-black font-semibold px-6 py-4 border-b">
          <div>Nama Barang</div>
          <div>Link Toko</div>
          <div>Deskripsi</div>
          <div>Status</div>
          <div>Aksi</div>
        </div>

        <div className={facilityRequests.length > 5 ? 'max-h-[300px] overflow-y-auto' : ''}>
          {loadingRequests ? (
            <div className="p-6 text-center">Loading...</div>
          ) : facilityRequests.length === 0 ? (
            <div className="p-6 text-center text-gray-500">Tidak ada request barang</div>
          ) : (
            facilityRequests.map((request) => (
              <div key={request.id} className="grid grid-cols-5 items-center px-6 py-4 border-b hover:bg-gray-50">
                <div>{request.nama_barang}</div>
                <div>
                  <a href={request.link_toko} target="_blank" rel="noreferrer" className="text-blue-500 underline text-sm break-all">
                    Buka Link
                  </a>
                </div>
                <div>{request.deskripsi}</div>
                <div>
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      request.status === 'Approved'
                        ? 'bg-green-100 text-green-700'
                        : request.status === 'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <div>
                  <button
                    onClick={() => handleDeleteRequest(request.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Modal Form Input */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white p-8 rounded-[30px] w-full max-w-md shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-bold">Request Pengadaan Barang</h3>
              <X className="cursor-pointer hover:text-red-500" onClick={() => setModalOpen(false)} />
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block mb-2 font-medium text-gray-700">Nama Barang</label>
                <input
                  type="text"
                  required
                  value={formData.nama_barang}
                  onChange={(e) => setFormData({ ...formData, nama_barang: e.target.value })}
                  className="w-full p-3 rounded-xl border focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  placeholder="Laptop ASUS Vivobook"
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Link Toko</label>
                <input
                  type="url"
                  value={formData.link_toko}
                  onChange={(e) => setFormData({ ...formData, link_toko: e.target.value })}
                  className="w-full p-3 rounded-xl border focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  placeholder="https://tokopedia.com/..."
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700">Deskripsi</label>
                <textarea
                  rows="4"
                  required
                  value={formData.deskripsi}
                  onChange={(e) => setFormData({ ...formData, deskripsi: e.target.value })}
                  className="w-full p-3 rounded-xl border focus:outline-none focus:border-brand-orange focus:ring-1 focus:ring-brand-orange"
                  placeholder="Spesifikasi dan alasan pengadaan..."
                />
              </div>

              <button type="submit" className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors">
                <Send size={18} />
                Kirim Pengajuan
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Modal Success */}
      {successOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white p-8 rounded-[30px] w-full max-w-sm text-center shadow-2xl animate-slide-up">
            <CheckCircle size={80} className="mx-auto text-green-500 mb-4" />
            <h3 className="text-2xl font-bold mb-2">Request Berhasil!</h3>
            <p className="text-gray-500 mb-6">Request sedang menunggu persetujuan.</p>
            <button onClick={() => setSuccessOpen(false)} className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold hover:bg-orange-600 transition-colors">
              Tutup
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RequestHost;