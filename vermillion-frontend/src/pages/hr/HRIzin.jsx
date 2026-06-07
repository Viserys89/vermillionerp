import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  CheckCircle,
  X,
  AlertCircle,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const API_URL =  `${import.meta.env.VITE_API_URL}`;

const HRIzin = () => {
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('Semua');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState(null);
  const [confirmAction, setConfirmAction] = useState(null);
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const fetchLeaves = async () => {
    try {
      const token = localStorage.getItem('token');

      const response = await axios.get(`${API_URL}/leaves`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: 'application/json'
        }
      });

      setLeaves(response.data);
    } catch (error) {
      console.error('Gagal mengambil data izin:', error);

      showNotification(
        'error',
        'Gagal mengambil data pengajuan izin'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeaves();
  }, []);

  const handleApprove = (leave) => {
    setSelectedLeave(leave);
    setConfirmAction('approve');
    setIsConfirmOpen(true);
  };

  const handleReject = (leave) => {
    setSelectedLeave(leave);
    setConfirmAction('reject');
    setIsConfirmOpen(true);
  };

  const confirmAction_Execute = async () => {
    if (!selectedLeave) return;

    try {
      const token = localStorage.getItem('token');

      const newStatus =
        confirmAction === 'approve'
          ? 'Approved'
          : 'Rejected';

      await axios.put(
        `${API_URL}/leaves/${selectedLeave.id}/status`,
        {
          status: newStatus
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/json'
          }
        }
      );

      setLeaves(prev =>
        prev.map(item =>
          item.id === selectedLeave.id
            ? { ...item, status: newStatus }
            : item
        )
      );

      showNotification(
        'success',
        confirmAction === 'approve'
          ? 'Pengajuan berhasil disetujui'
          : 'Pengajuan berhasil ditolak'
      );

      setIsConfirmOpen(false);
      setSelectedLeave(null);
      setConfirmAction(null);
    } catch (error) {
  console.error("FULL ERROR:", error);

  if (error.response) {
    console.log("LARAVEL ERROR:", error.response.data);
  }

  alert("Gagal mengirim pengajuan");
}
  };

  const filteredLeaves = leaves.filter(l => {
    const matchSearch = (l.user?.name || '')
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchStatus =
      filterStatus === 'Semua' ||
      l.status === filterStatus;

    return matchSearch && matchStatus;
  });

  const totalPages = Math.ceil(
    filteredLeaves.length / itemsPerPage
  );

  const indexOfLastItem =
    currentPage * itemsPerPage;

  const indexOfFirstItem =
    indexOfLastItem - itemsPerPage;

  const currentLeaves = filteredLeaves.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <p>Memuat data izin...</p>
      </div>
    );
  }

  return (
    <div className="animate-fade-in space-y-4">
      {notification && (
        <div
          className={`fixed top-4 right-4 z-[10000] p-4 rounded-xl backdrop-blur-xl border ${
            notification.type === 'success'
              ? 'bg-status-success/90 border-status-success text-white'
              : 'bg-status-error/90 border-status-error text-white'
          } shadow-lg flex items-center gap-3 animate-slide-up max-w-md`}
        >
          {notification.type === 'success' ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}

          <span className="font-medium">
            {notification.message}
          </span>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
        Izin & Cuti Karyawan
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-xs text-text-secondary">
            Total Request
          </p>
          <p className="text-3xl font-bold text-brand-orange mt-2">
            {leaves.length}
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-xs text-text-secondary">
            Approved
          </p>
          <p className="text-3xl font-bold text-status-success mt-2">
            {
              leaves.filter(
                l => l.status === 'Approved'
              ).length
            }
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-xs text-text-secondary">
            Pending
          </p>
          <p className="text-3xl font-bold text-status-warning mt-2">
            {
              leaves.filter(
                l => l.status === 'Pending'
              ).length
            }
          </p>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
          <p className="text-xs text-text-secondary">
            Rejected
          </p>
          <p className="text-3xl font-bold text-status-error mt-2">
            {
              leaves.filter(
                l => l.status === 'Rejected'
              ).length
            }
          </p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 space-y-4">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <h2 className="text-xl font-bold">
            Daftar Izin & Cuti
          </h2>

          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />

              <input
                type="text"
                placeholder="Cari nama karyawan..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="pl-9 pr-4 py-2 border rounded-lg"
              />
            </div>

            <select
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 border rounded-lg"
            >
              <option value="Semua">
                Semua Status
              </option>
              <option value="Pending">
                Pending
              </option>
              <option value="Approved">
                Approved
              </option>
              <option value="Rejected">
                Rejected
              </option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b">
                <th className="px-4 py-3 text-left">
                  Karyawan
                </th>
                <th className="px-4 py-3 text-left">
                  Tipe
                </th>
                <th className="px-4 py-3 text-left">
                  Tanggal
                </th>
                <th className="px-4 py-3 text-left">
                  Alasan
                </th>
                <th className="px-4 py-3 text-left">
                  Status
                </th>
                <th className="px-4 py-3 text-center">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {currentLeaves.map((leave) => (
                <tr
                  key={leave.id}
                  className="border-b"
                >
                  <td className="px-4 py-3">
                    {leave.user?.name}
                  </td>

                  <td className="px-4 py-3">
                    {leave.leave_type}
                  </td>

                  <td className="px-4 py-3">
                    {leave.date_range}
                  </td>

                  <td className="px-4 py-3">
                    {leave.reason}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-bold ${
                        leave.status ===
                        'Approved'
                          ? 'bg-green-100 text-green-600'
                          : leave.status ===
                            'Pending'
                          ? 'bg-yellow-100 text-yellow-600'
                          : 'bg-red-100 text-red-600'
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    {leave.status ===
                    'Pending' ? (
                      <div className="flex justify-center gap-2">
                        <button
                          onClick={() =>
                            handleApprove(leave)
                          }
                          className="px-3 py-2 bg-green-100 text-green-600 rounded-lg"
                        >
                          Setujui
                        </button>

                        <button
                          onClick={() =>
                            handleReject(leave)
                          }
                          className="px-3 py-2 bg-red-100 text-red-600 rounded-lg"
                        >
                          Tolak
                        </button>
                      </div>
                    ) : (
                      <div className="text-center text-gray-500 italic">
                        Selesai
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() =>
              setCurrentPage(prev =>
                Math.max(prev - 1, 1)
              )
            }
            disabled={currentPage === 1}
          >
            <ChevronLeft />
          </button>

          <span>
            Halaman {currentPage} dari{' '}
            {totalPages || 1}
          </span>

          <button
            onClick={() =>
              setCurrentPage(prev =>
                Math.min(prev + 1, totalPages)
              )
            }
            disabled={
              currentPage === totalPages
            }
          >
            <ChevronRight />
          </button>
        </div>
      </div>

      {isConfirmOpen && selectedLeave && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-[9999]">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h3 className="text-xl font-bold text-center mb-3">
              {confirmAction === 'approve'
                ? 'Setujui Izin'
                : 'Tolak Izin'}
            </h3>

            <p className="text-center">
              {selectedLeave.user?.name}
            </p>

            <p className="text-center text-gray-500 mb-6">
              {selectedLeave.leave_type} •{' '}
              {selectedLeave.date_range}
            </p>

            <div className="flex gap-2">
              <button
                onClick={confirmAction_Execute}
                className={`flex-1 text-white py-3 rounded-lg ${
                  confirmAction ===
                  'approve'
                    ? 'bg-green-600'
                    : 'bg-red-600'
                }`}
              >
                Konfirmasi
              </button>

              <button
                onClick={() => {
                  setIsConfirmOpen(false);
                  setSelectedLeave(null);
                  setConfirmAction(null);
                }}
                className="flex-1 bg-gray-200 py-3 rounded-lg"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRIzin;