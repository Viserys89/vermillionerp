import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Plus,X,CheckCircle, Send } from 'lucide-react';

const RequestHost = () => {
  const [facilities, setFacilities] = useState([]);
  const [facilityRequests, setFacilityRequests] = useState([]);

  const [loadingFacilities, setLoadingFacilities] = useState(true);
  const [loadingRequests, setLoadingRequests] = useState(true);

  const user = JSON.parse(
    localStorage.getItem('user') || '{}'
  );

  const [isModalOpen, setModalOpen] = useState(false);

  const [successOpen, setSuccessOpen] = useState(false);

  const [formData, setFormData] = useState({
    facility_id: '',
    start_datetime: '',
    end_datetime: '',
    purpose: ''
  });

  const fetchFacilities = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8000/api/facilities'
      );

      setFacilities(response.data);

    } catch (error) {

      console.error(
        'Gagal mengambil data fasilitas:',
        error
      );

    } finally {

      setLoadingFacilities(false);

    }
  };

  const fetchFacilityRequests = async () => {
  try {

    const response = await axios.get(
      'http://localhost:8000/api/facility-requests'
    );

    const myRequests =
      response.data.filter(
        item => item.user_id === user.id
      );

    setFacilityRequests(myRequests);

  } catch (error) {

    console.error(
      'Gagal mengambil data request fasilitas:',
      error
    );

  } finally {

    setLoadingRequests(false);

  }
};

  useEffect(() => {
    fetchFacilities();
    fetchFacilityRequests();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      await axios.post(
        'http://localhost:8000/api/facility-requests',
        {
          user_id: user.id,
          facility_id: formData.facility_id,

          request_date: new Date()
            .toISOString()
            .split('T')[0],

          start_datetime:
            formData.start_datetime,

          end_datetime:
            formData.end_datetime,

          purpose:
            formData.purpose,

          status: 'Pending'
        }
      );

      setModalOpen(false);

      setSuccessOpen(true);

      setFormData({
        facility_id: '',
        start_datetime: '',
        end_datetime: '',
        purpose: ''
      });

      fetchFacilities();
      fetchFacilityRequests();

    } catch (error) {

      console.error(error);

      alert(
        'Gagal mengajukan peminjaman'
      );

    }
  };


    const handleDeleteRequest = async (id) => {
    const confirmDelete = window.confirm(
        'Yakin ingin menghapus pengajuan ini?'
    );

    if (!confirmDelete) return;

    try {
        await axios.delete(
        `http://localhost:8000/api/facility-requests/${id}`
        );

        fetchFacilityRequests();
        fetchFacilities();

    } catch (error) {
        console.error(error);
        alert('Gagal menghapus pengajuan');
    }
    };


  return (
    <div className="animate-fade-in">

      <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
        Request Fasilitas
      </h1>

      {/* Header */}
      <div className="flex items-center gap-4 mb-4">

        <h2 className="text-xl font-medium">
          Fasilitas Tersedia
        </h2>

        <button
          onClick={() => setModalOpen(true)}
          className="ml-auto bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow hover:opacity-90 transition"
        >
          <Plus size={16} />
          Ajukan Peminjaman
        </button>

      </div>

      {/* Tabel fasilitas */}
      <div className="w-full border bg-white shadow-sm">

        <div className="grid grid-cols-5 bg-[#fffef0] text-black font-semibold px-6 py-4 border-b">
          <div>Nama Fasilitas</div>
          <div>Tipe</div>
          <div>Kuantitas</div>
          <div>Jumlah Tersedia</div>
          <div>Status</div>
        </div>

        <div
          className={
            facilities.length > 5
              ? 'max-h-[300px] overflow-y-auto'
              : ''
          }
        >
          {loadingFacilities ? (
            <div className="p-6 text-center">
              Loading...
            </div>
          ) : facilities.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Tidak ada fasilitas
            </div>
          ) : (
            facilities.map((facility) => (
              <div
                key={facility.id}
                className="grid grid-cols-5 items-center px-6 py-4 border-b hover:bg-gray-50"
              >
                <div>
                  {facility.facility_name}
                </div>

                <div>
                  {facility.facility_type}
                </div>

                <div>
                  {facility.quantity}
                </div>

                <div>
                  {facility.available_quantity}
                </div>

                <div>
                  <span
                        className={`inline-block px-3 py-1 rounded text-sm ${
                            facility.available_quantity <= 0
                            ? 'bg-gray-100 text-gray-600'
                            : facility.status === 'Tersedia'
                            ? 'bg-green-100 text-green-700'
                            : facility.status === 'Maintenance'
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                        >
                        {facility.available_quantity <= 0
                            ? 'Tidak Tersedia'
                            : facility.status}
                </span>
                </div>
              </div>
            ))
          )}
        </div>

      </div>

      {/* Tabel peminjaman */}
      <h2 className="text-xl font-medium mb-4 mt-8">
        Fasilitas yang Dipinjam
      </h2>

      <div className="w-full border bg-white shadow-sm">

        <div className="grid grid-cols-5 bg-[#fffef0] text-black font-semibold px-6 py-4 border-b">
            <div>Fasilitas</div>
            <div>Tanggal Pinjam</div>
            <div>Tanggal Kembali</div>
            <div>Status</div>
            <div>Aksi</div>
        </div>

        <div
          className={
            facilityRequests.length > 5
              ? 'max-h-[300px] overflow-y-auto'
              : ''
          }
        >
          {loadingRequests ? (
            <div className="p-6 text-center">
              Loading...
            </div>
          ) : facilityRequests.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              Tidak ada fasilitas yang dipinjam
            </div>
          ) : (
            facilityRequests.map((request) => (
                <div
                    key={request.id}
                    className="grid grid-cols-5 items-center px-6 py-4 border-b hover:bg-gray-50"
                    >
                <div>
                  {
                    request.facility
                      ?.facility_name
                  }
                </div>

                <div>
                  {request.start_datetime}
                </div>

                <div>
                  {request.end_datetime}
                </div>

                <div>
                  <span
                    className={`px-3 py-1 rounded text-sm ${
                      request.status ===
                      'Approved'
                        ? 'bg-green-100 text-green-700'
                        : request.status ===
                          'Pending'
                        ? 'bg-yellow-100 text-yellow-700'
                        : 'bg-red-100 text-red-700'
                    }`}
                  >
                    {request.status}
                  </span>
                </div>
                <div>
                    <button
                        onClick={() =>
                        handleDeleteRequest(request.id)
                        }
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

      {/* Modal Input */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="bg-white p-8 rounded-[30px] w-full max-w-md shadow-2xl">

            <div className="flex justify-between items-center mb-6">

              <h3 className="text-lg font-bold">
                Pengajuan Peminjaman Fasilitas
              </h3>

              <X
                className="cursor-pointer"
                onClick={() =>
                  setModalOpen(false)
                }
              />

            </div>

            <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                    >

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                        Nama Fasilitas
                        </label>

                        <select
                        required
                        value={formData.facility_id}
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            facility_id: e.target.value
                            })
                        }
                        className="w-full p-3 rounded-xl border"
                        >
                        <option value="">
                            Pilih Fasilitas
                        </option>

                        {facilities
                            .filter(
                            facility =>
                                facility.available_quantity > 0 &&
                                facility.status === 'Tersedia'
                            )
                            .map((facility) => (
                            <option
                                key={facility.id}
                                value={facility.id}
                            >
                                {facility.facility_name}
                                {" "}
                                
                            </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                        Tanggal Pinjam
                        </label>

                        <input
                        type="datetime-local"
                        required
                        value={formData.start_datetime}
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            start_datetime: e.target.value
                            })
                        }
                        className="w-full p-3 rounded-xl border"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                        Tanggal Kembali
                        </label>

                        <input
                        type="datetime-local"
                        required
                        value={formData.end_datetime}
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            end_datetime: e.target.value
                            })
                        }
                        className="w-full p-3 rounded-xl border"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 font-medium text-gray-700">
                        Keperluan
                        </label>

                        <textarea
                        rows="4"
                        required
                        value={formData.purpose}
                        onChange={(e) =>
                            setFormData({
                            ...formData,
                            purpose: e.target.value
                            })
                        }
                        className="w-full p-3 rounded-xl border"
                        placeholder="Keperluan peminjaman..."
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-orange-500 text-white py-4 rounded-xl font-bold flex items-center justify-center gap-2"
                    >
                        <Send size={18} />
                        Kirim Pengajuan
                    </button>

                    </form>

          </div>

        </div>
      )}

      {/* Success Modal */}
      {successOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">

          <div className="bg-white p-8 rounded-[30px] w-full max-w-sm text-center shadow-2xl">

            <CheckCircle
              size={80}
              className="mx-auto text-green-500 mb-4"
            />

            <h3 className="text-2xl font-bold mb-2">
              Pengajuan Berhasil!
            </h3>

            <p className="text-gray-500 mb-6">
              Pengajuan sedang menunggu
              persetujuan.
            </p>

            <button
              onClick={() =>
                setSuccessOpen(false)
              }
              className="w-full bg-orange-500 text-white py-3 rounded-xl font-bold"
            >
              Tutup
            </button>

          </div>

        </div>
      )}

    </div>
  );
};

export default RequestHost;