import React, { useState, useEffect } from "react";
import {
  Download,
  FileText,
  Search,
  Users,
  Clock,
  CheckCircle,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Trash2,
} from "lucide-react";
import axios from "axios";

const HRLaporan = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // State untuk Notifikasi Kanan Atas
  const [notification, setNotification] = useState(null);

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const [reports, setReports] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    report_date: "",
    type: "PDF",
    file: null,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fetchReports = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/reports");

      setReports(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const filteredReports = reports.filter((r) =>
    (r.name || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredReports.length / itemsPerPage);
  const currentReports = filteredReports.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );
  const handleSaveReport = async (e) => {
    e.preventDefault();

    try {
      const data = new FormData();

      data.append("name", formData.name);
      data.append("report_date", formData.report_date);
      data.append("type", formData.type);
      data.append("file", formData.file);

      await axios.post("http://localhost:8000/api/reports", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setIsModalOpen(false);

      showNotification("success", "Laporan berhasil ditambahkan");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDeleteReport = async (id) => {
    if (!window.confirm("Hapus laporan ini?")) return;

    try {
      await axios.delete(`http://localhost:8000/api/reports/${id}`);

      fetchReports();

      showNotification("success", "Laporan berhasil dihapus");
    } catch (error) {
      console.error(error);
    }
  };
  const handleDownload = (report) => {
    // 1. Buat elemen link (a) secara virtual di background
    const link = document.createElement("a");
    link.href = `http://localhost:8000/storage/${report.file_path}`;

    // 2. Paksa browser untuk mengunduh, bukan membuka file di tab baru
    // Kita gunakan nama laporan asli untuk nama file unduhannya
    link.setAttribute("download", report.name);
    link.target = "_blank"; // Sebagai fallback jika browser tetap ingin membukanya

    // 3. Eksekusi klik pada link bayangan tersebut lalu hapus lagi
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // 4. Munculkan notifikasi sukses
    showNotification("success", `Dokumen "${report.name}" berhasil diunduh!`);
  };

  return (
    <div className="animate-fade-in space-y-4 md:space-y-6">
      {/* Toast Notification Element */}
      {notification && (
        <div
          className={`fixed top-4 right-4 z-[10000] p-4 rounded-xl backdrop-blur-xl border ${
            notification.type === "success"
              ? "bg-status-success/90 border-status-success text-white"
              : "bg-status-error/90 border-status-error text-white"
          } shadow-lg flex items-center gap-3 animate-slide-up max-w-md`}
        >
          {notification.type === "success" ? (
            <CheckCircle size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-medium text-sm md:text-base">
            {notification.message}
          </span>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
        Pusat Laporan
      </h1>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
            <FileText size={24} />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Total Dokumen</p>
            <p className="text-xl font-bold text-text-primary">
              {reports.length}
            </p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-green-50 text-status-success rounded-xl">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Laporan Karyawan</p>
            <p className="text-xl font-bold text-text-primary">4</p>
          </div>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-gray-200 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
          <div className="p-3 bg-purple-50 text-purple-600 rounded-xl">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-text-secondary">Dibuat Bulan Ini</p>
            <p className="text-xl font-bold text-text-primary">3</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 md:p-6 space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h2 className="text-lg font-bold text-text-primary">
            Arsip Dokumen & Laporan
          </h2>

          {/* Kontainer Flex untuk Search dan Tombol agar sejajar */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Input Search */}
            <div className="relative w-full md:w-72">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Cari nama laporan..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange outline-none text-sm transition-all"
              />
            </div>

            {/* Tombol Tambah */}
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-4 py-2.5 bg-brand-orange text-white rounded-lg text-sm font-medium whitespace-nowrap hover:bg-orange-600 transition-colors"
            >
              Tambah Laporan
            </button>
          </div>
        </div>
        <div className="overflow-x-auto -mx-4 md:mx-0 border rounded-lg border-gray-100">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-gray-600">
                  Nama Dokumen
                </th>
                <th className="px-4 py-3 text-left font-semibold text-gray-600 hidden sm:table-cell">
                  Tanggal Valid
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 hidden md:table-cell">
                  Format
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 w-28">
                  Unduh
                </th>
                <th className="px-4 py-3 text-center font-semibold text-gray-600 w-28">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {currentReports.length > 0 ? (
                currentReports.map((report) => (
                  <tr
                    key={report.id}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-4 py-3">
                      <p className="font-bold text-text-primary">
                        {report.name}
                      </p>
                      <p className="text-xs text-text-secondary sm:hidden mt-1">
                        {report.report_date}
                      </p>
                    </td>
                    <td className="px-4 py-3 text-gray-600 hidden sm:table-cell">
                     {report.report_date}
                    </td>
                    <td className="px-4 py-3 text-center hidden md:table-cell">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          report.type === "PDF"
                            ? "bg-red-50 text-red-600"
                            : report.type === "Excel"
                              ? "bg-green-50 text-green-600"
                              : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {report.type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <td className="px-4 py-3">
                        <button
                          onClick={() => handleDownload(report)}
                          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-orange-50 text-brand-orange rounded-lg hover:bg-brand-orange hover:text-white transition-all text-xs font-bold border border-orange-100"
                        >
                          Unduh
                        </button>
                      </td>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => handleDeleteReport(report.id)}
                        className="p-2 bg-red-50 text-red-600 rounded-lg"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center py-8 text-gray-500">
                    Laporan tidak ditemukan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Konsisten (Pake UI yang sama kayak Dashboard) */}
        {filteredReports.length > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 pt-2">
            <span className="text-xs md:text-sm text-text-secondary text-center sm:text-left">
              Menampilkan{" "}
              <span className="font-semibold text-text-primary">
                {(currentPage - 1) * itemsPerPage + 1}
              </span>{" "}
              -{" "}
              <span className="font-semibold text-text-primary">
                {Math.min(currentPage * itemsPerPage, filteredReports.length)}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-text-primary">
                {filteredReports.length}
              </span>{" "}
              data
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft size={16} />
              </button>
              <div className="hidden sm:flex items-center gap-1">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${currentPage === i + 1 ? "bg-brand-orange text-white" : "hover:bg-orange-50 text-gray-600"}`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(p + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[400px]">
            <h3 className="text-lg font-bold mb-4">Tambah Laporan</h3>

            <form onSubmit={handleSaveReport} className="space-y-3">
              <input
                type="text"
                placeholder="Nama Laporan"
                value={formData.name}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    name: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />

              <input
                type="date"
                value={formData.report_date}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    report_date: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              />

              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    type: e.target.value,
                  })
                }
                className="w-full border p-2 rounded"
              >
                <option>PDF</option>
                <option>Excel</option>
                <option>CSV</option>
              </select>
              <input
                type="file"
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    file: e.target.files[0],
                  })
                }
                className="w-full border p-2 rounded"
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-brand-orange text-white py-2 rounded"
                >
                  Simpan
                </button>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-200 py-2 rounded"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default HRLaporan;
