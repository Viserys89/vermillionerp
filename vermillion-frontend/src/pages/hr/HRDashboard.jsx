import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import {
  Search,
  Plus,
  Edit,
  Trash2,
  Upload,
  CheckCircle,
  X,
  Download,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const HRDashboard = () => {
  const [employees, setEmployees] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterRole, setFilterRole] = useState("Semua");

  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isImportOpen, setIsImportOpen] = useState(false);
  // const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [notification, setNotification] = useState(null);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    address: "",
    role: "",
    status: "Aktif",
    contract: "12 Bulan",
    bankAccount: "",
    photo: null,
  });

  const roles = [
    "host",
    "finance",
    "procurement",
    "hr",
    "technician",
    "performance",
  ];
  const statuses = ["Aktif", "Tidak Aktif", "Cuti", "Resigned"];
  const contracts = ["1 Bulan", "3 Bulan", "6 Bulan", "12 Bulan", "24 Bulan"];
  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/employees");
        setEmployees(response.data); // Memasukkan data dari Laravel ke dalam state
      } catch (error) {
        console.error("Gagal mengambil data karyawan:", error);
        showNotification("error", "Gagal memuat data dari server.");
      }
    };

    fetchEmployees();
  }, []);

  // Filter Data
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      (emp.name?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (emp.email?.toLowerCase() || "").includes(searchTerm.toLowerCase()) ||
      (emp.phone || "").includes(searchTerm);
    const matchesStatus =
      filterStatus === "Semua" || emp.status === filterStatus;
    const matchesRole = filterRole === "Semua" || emp.role === filterRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  // Logika Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  const handleOpenForm = (employee = null) => {
    if (employee) {
      // Jika edit, sediakan field password kosong (opsional diisi)
      setFormData({ ...employee, password: "" });
      setSelectedEmployee(employee);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        dob: "",
        address: "",
        role: "",
        status: "Aktif",
        contract: "12 Bulan",
        bankAccount: "",
        password: "",
      });

      setSelectedEmployee(null);
    }
    setIsModalOpen(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.role) {
      showNotification("error", "Silakan isi semua field yang wajib!");
      return;
    }

    try {
      // Kita siapkan data yang akan dikirim ke Laravel.
      // Ubah 'bankAccount' dari React state menjadi 'bank_account' sesuai kolom di database MySQL
      const payload = {
        ...formData,
        password: formData.password,
        bank_account: formData.bankAccount,
      };

      if (selectedEmployee) {
        // PROSES EDIT DATA (PUT)
        const response = await axios.put(
          `http://localhost:8000/api/employees/${selectedEmployee.id}`,
          payload,
        );

        // Update state lokal dengan data dari server
        setEmployees(
          employees.map((emp) =>
            emp.id === selectedEmployee.id ? response.data : emp,
          ),
        );
        showNotification(
          "success",
          `Karyawan ${formData.name} berhasil diperbarui!`,
        );
      } else {
        // PROSES TAMBAH DATA (POST)
        const response = await axios.post(
          "http://localhost:8000/api/employees",
          payload,
        );

        // Tambahkan data baru dari server ke state lokal
        setEmployees([...employees, response.data]);
        showNotification(
          "success",
          `Karyawan ${formData.name} berhasil ditambahkan!`,
        );
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error saving data:", error);
      // Tangkap pesan error dari Laravel jika email sudah dipakai
      const errorMsg =
        error.response?.data?.message || "Terjadi kesalahan pada server!";
      showNotification("error", errorMsg);
    }
  };

  const handleConfirmDelete = async () => {
    if (employeeToDelete) {
      try {
        // PROSES HAPUS DATA (DELETE)
        await axios.delete(
          `http://localhost:8000/api/employees/${employeeToDelete.id}`,
        );

        setEmployees(employees.filter((emp) => emp.id !== employeeToDelete.id));
        showNotification(
          "success",
          `Karyawan ${employeeToDelete.name} berhasil dihapus!`,
        );
        setIsDeleteConfirmOpen(false);
        setEmployeeToDelete(null);
      } catch (error) {
        console.error("Error deleting data:", error);
        showNotification("error", "Gagal menghapus data dari server.");
      }
    }
  };

  const handleDeleteClick = (id) => {
    const emp = employees.find((e) => e.id === id);
    setEmployeeToDelete(emp);
    setIsDeleteConfirmOpen(true);
  };

  // const handleConfirmDelete = () => {
  //   if (employeeToDelete) {
  //     setEmployees(employees.filter((emp) => emp.id !== employeeToDelete.id));
  //     showNotification(
  //       "success",
  //       `Karyawan ${employeeToDelete.name} berhasil dihapus!`,
  //     );
  //     setIsDeleteConfirmOpen(false);
  //     setEmployeeToDelete(null);
  //   }
  // };

  const handleExport = () => {
    // Membuat header CSV
    const csvHeader = [
      "ID",
      "Nama",
      "Email",
      "Telepon",
      "Tanggal Lahir",
      "Alamat",
      "Role",
      "Status",
      "Kontrak",
      "No. Rekening",
    ].join(",");

    // Mapping data karyawan ke baris CSV
    const csvRows = employees.map((emp) => {
      // Alamat dibungkus tanda kutip agar koma di dalam alamat tidak memisahkan kolom
      const safeAddress = emp.address ? `"${emp.address}"` : "";

      return [
        emp.id,
        emp.name,
        emp.email,
        emp.phone || "",
        emp.dob || "",
        safeAddress,
        emp.role,
        emp.status,
        emp.contract || "",
        emp.bank_account || "", // Sesuai dengan kolom di database
      ].join(",");
    });

    const csv = [csvHeader, ...csvRows].join("\n");

    // Proses Download File
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Data_Karyawan_Vermillion_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    showNotification("success", "Data berhasil diekspor ke CSV!");
  };

  const handleImportFile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async (event) => {
      try {
        const data = new Uint8Array(event.target.result);

        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];

        const rows = XLSX.utils.sheet_to_json(worksheet);

        let successCount = 0;
        let failCount = 0;

        for (const row of rows) {
          const payload = {
            name: row.Nama,
            email: row.Email,
            phone: row.Telepon,
            dob: row["Tanggal Lahir"],
            address: row.Alamat,
            role: row.Role,
            status: row.Status,
            contract: row.Kontrak,
            bank_account: row["No Rekening"] || row["No. Rekening"],
            password: "vermillion123",
          };

          try {
            await axios.post("http://localhost:8000/api/employees", payload);
            successCount++;
          } catch (apiError) {
            console.log("ERROR DATA:", apiError.response?.data);
            console.log("PAYLOAD:", payload);
            failCount++;
          }
        }

        // ambil ulang data setelah import selesai
        const response = await axios.get("http://localhost:8000/api/employees");
        setEmployees(response.data);

        showNotification(
          "success",
          `Import selesai. Berhasil: ${successCount}, Gagal: ${failCount}`,
        );
      } catch (error) {
        console.error(error);
        showNotification("error", "Gagal membaca file Excel");
      }
    };

    reader.readAsArrayBuffer(file);
  };
  return (
    <div className="animate-fade-in space-y-4">
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
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
        Dashboard HR
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
          <p className="text-xs md:text-sm text-text-secondary truncate">
            Total Karyawan
          </p>
          <p className="text-2xl md:text-3xl font-bold text-brand-orange mt-2">
            {employees.length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
          <p className="text-xs md:text-sm text-text-secondary truncate">
            Aktif
          </p>
          <p className="text-2xl md:text-3xl font-bold text-status-success mt-2">
            {employees.filter((e) => e.status === "Aktif").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
          <p className="text-xs md:text-sm text-text-secondary truncate">
            Tidak Aktif
          </p>
          <p className="text-2xl md:text-3xl font-bold text-status-error mt-2">
            {employees.filter((e) => e.status === "Tidak Aktif").length}
          </p>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 md:p-6">
          <p className="text-xs md:text-sm text-text-secondary truncate">
            Cuti
          </p>
          <p className="text-2xl md:text-3xl font-bold text-status-warning mt-2">
            {employees.filter((e) => e.status === "Cuti").length}
          </p>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 space-y-4">
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-2">
          <button
            onClick={() => handleOpenForm()}
            className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2 bg-brand-orange text-white text-sm md:text-base rounded-lg hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all font-medium"
          >
            <Plus size={18} /> Tambah
          </button>
          <button
            onClick={() => setIsImportOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2 bg-blue-600 text-white text-sm md:text-base rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-300 focus:outline-none transition-all font-medium"
          >
            <Upload size={18} /> Import
          </button>
          <button
            onClick={handleExport}
            className="flex-1 flex items-center justify-center gap-2 px-3 md:px-4 py-2 md:py-2 bg-status-success text-white text-sm md:text-base rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-green-300 focus:outline-none transition-all font-medium"
          >
            <Download size={18} /> Export
          </button>
        </div>

        {/* Filters - Saat filter diubah, pagination kembali ke 1 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <div className="relative col-span-1 sm:col-span-1">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Cari nama..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => {
              setFilterStatus(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm bg-white"
          >
            <option value="Semua">Semua Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <select
            value={filterRole}
            onChange={(e) => {
              setFilterRole(e.target.value);
              setCurrentPage(1);
            }}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm bg-white"
          >
            <option value="Semua">Semua Role</option>
            {roles.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
        </div>

        {/* Table */}
        {filteredEmployees.length > 0 ? (
          <>
            <div className="overflow-x-auto -mx-4 md:mx-0">
              <table className="w-full text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left font-bold text-text-primary">
                      Nama
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-text-primary hidden sm:table-cell">
                      Telepon
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-text-primary">
                      Role
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-text-primary hidden md:table-cell">
                      Status
                    </th>
                    <th className="px-4 py-3 text-left font-bold text-text-primary">
                      Aksi
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentEmployees.map((emp) => (
                    <tr
                      key={emp.id}
                      className="border-b border-gray-100 hover:bg-light-bg/50 transition-colors"
                    >
                      <td className="px-4 py-3 font-medium">
                        <div className="text-text-primary">{emp.name}</div>
                        <div className="text-xs text-text-secondary sm:hidden">
                          {emp.phone}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-text-secondary hidden sm:table-cell">
                        {emp.phone}
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-text-primary">
                        {emp.role}
                      </td>
                      <td className="px-4 py-3 hidden md:table-cell">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                            emp.status === "Aktif"
                              ? "bg-green-100 text-status-success"
                              : emp.status === "Tidak Aktif"
                                ? "bg-red-100 text-status-error"
                                : emp.status === "Cuti"
                                  ? "bg-yellow-100 text-status-warning"
                                  : "bg-gray-100 text-text-secondary"
                          }`}
                        >
                          {emp.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1 md:gap-2">
                          {/* FIX BUTTON: Warna lebih soft, outline ditiadakan biar bersih, jelas nggak disembunyiin */}
                          <button
                            onClick={() => handleOpenForm(emp)}
                            className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-all text-xs md:text-sm font-medium"
                            title="Edit"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(emp.id)}
                            className="p-2 bg-red-50 text-status-error rounded-lg hover:bg-red-100 transition-all text-xs md:text-sm font-medium"
                            title="Hapus"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination UI */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
              <span className="text-xs md:text-sm text-text-secondary text-center sm:text-left">
                Menampilkan{" "}
                <span className="font-semibold text-text-primary">
                  {indexOfFirstItem + 1}
                </span>{" "}
                -{" "}
                <span className="font-semibold text-text-primary">
                  {Math.min(indexOfLastItem, filteredEmployees.length)}
                </span>{" "}
                dari{" "}
                <span className="font-semibold text-text-primary">
                  {filteredEmployees.length}
                </span>{" "}
                data
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
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
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage >= totalPages || totalPages === 0}
                  className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500 text-sm md:text-base">
              Tidak ada data karyawan
            </p>
          </div>
        )}
      </div>

      {/* Add/Edit Employee Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-[90%] p-6 md:p-8 max-h-[95vh] overflow-y-auto animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg md:text-xl font-bold text-text-primary">
                {selectedEmployee ? "Edit Karyawan" : "Tambah Karyawan Baru"}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-text-secondary hover:text-status-error text-2xl"
              >
                <X size={24} />
              </button>
            </div>

            <form
              onSubmit={handleSave}
              className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4"
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm"
                  placeholder="Masukkan nama"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm"
                  placeholder="email@example.com"
                />
              </div>
              {/* Kolom Password Baru */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary">
                  Password{" "}
                  {selectedEmployee ? "(Kosongkan jika tidak diubah)" : "*"}
                </label>
                <input
                  type="text" // Gunakan 'text' agar HR bisa melihat password yang dibuatkan, atau 'password' jika ingin disensor
                  required={!selectedEmployee} // Wajib diisi JIKA karyawan baru (bukan mode edit)
                  value={formData.password || ""}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm"
                  placeholder={
                    selectedEmployee
                      ? "Kosongkan jika tetap pakai password lama"
                      : "Buatkan password"
                  }
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary">
                  Telepon
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm"
                  placeholder="08xxxxxxxxxx"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary">
                  Tanggal Lahir
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm"
                />
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-text-primary">
                  Alamat
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm"
                  placeholder="Jalan, Kota, Provinsi"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary">
                  Role *
                </label>
                <select
                  required
                  value={formData.role}
                  onChange={(e) =>
                    setFormData({ ...formData, role: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm"
                >
                  <option value="">Pilih Role</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm"
                >
                  {statuses.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-text-primary">
                  Durasi Kontrak
                </label>
                <select
                  value={formData.contract}
                  onChange={(e) =>
                    setFormData({ ...formData, contract: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm"
                >
                  {contracts.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-sm font-bold text-text-primary">
                  No. Rekening Bank
                </label>
                <input
                  type="text"
                  value={formData.bankAccount}
                  onChange={(e) =>
                    setFormData({ ...formData, bankAccount: e.target.value })
                  }
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm"
                  placeholder="Nomor rekening bank karyawan"
                />
              </div>

              <div className="md:col-span-2 flex flex-col sm:flex-row gap-2 mt-4">
                <button
                  type="submit"
                  className="flex-1 bg-brand-orange text-white py-3 rounded-lg font-bold hover:bg-orange-600 focus:ring-2 focus:ring-orange-300 focus:outline-none transition-all text-sm md:text-base"
                >
                  Simpan
                </button>
                {/* FIX BUTTON BATAL: Warna abu-abu cerah tanpa border ketuaan */}
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all text-sm md:text-base"
                >
                  Batal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteConfirmOpen && employeeToDelete && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-[90%] p-6 md:p-8 animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className="p-4 rounded-full bg-red-100">
                <AlertCircle size={32} className="text-status-error" />
              </div>
            </div>

            <h3 className="text-lg md:text-xl font-bold text-center text-text-primary mb-2">
              Konfirmasi Penghapusan
            </h3>
            <p className="text-center text-text-secondary text-sm md:text-base mb-6">
              Apakah Anda yakin ingin menghapus data{" "}
              <strong>{employeeToDelete.name}</strong>? Tindakan ini tidak dapat
              dibatalkan.
            </p>

            <div className="flex flex-col sm:flex-row gap-2">
              <button
                onClick={handleConfirmDelete}
                className="flex-1 bg-status-error text-white py-3 rounded-lg font-bold hover:bg-red-600 focus:ring-2 focus:ring-red-300 focus:outline-none transition-all text-sm md:text-base"
              >
                Hapus
              </button>
              {/* FIX BUTTON BATAL: Konsisten dengan form tambah */}
              <button
                onClick={() => {
                  setIsDeleteConfirmOpen(false);
                  setEmployeeToDelete(null);
                }}
                className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all text-sm md:text-base"
              >
                Batal
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Import Modal */}
      {isImportOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[1000] p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-[90%] p-6 md:p-8 animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg md:text-xl font-bold text-text-primary">
                Import Data Karyawan
              </h3>
              <button
                onClick={() => setIsImportOpen(false)}
                className="text-text-secondary hover:text-status-error text-2xl"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <p className="text-sm text-text-secondary">
                Pilih file CSV dengan format:
              </p>
              <code className="block bg-light-bg p-3 rounded text-xs overflow-x-auto font-mono text-text-primary">
                ID,Nama,Email,Telepon,Tgl Lahir,Alamat,Role,Status,Kontrak,No
                Rekening
              </code>
              <input
                type="file"
                accept=".csv,.xlsx,.xls"
                onChange={handleImportFile}
                className="w-full text-sm file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-brand-orange file:text-white hover:file:bg-orange-600 cursor-pointer"
              />
              {/* FIX BUTTON TUTUP: Konsisten abu-abu cerah */}
              <button
                onClick={() => setIsImportOpen(false)}
                className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-bold hover:bg-gray-200 transition-all text-sm md:text-base"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRDashboard;
