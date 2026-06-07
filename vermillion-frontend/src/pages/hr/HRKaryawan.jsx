import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Search,
  Eye,
  UserCircle,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Briefcase,
  CreditCard,
  X,
  AlertCircle
} from "lucide-react";

const HRKaryawan = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [filterRole, setFilterRole] = useState("Semua");
  
  // State untuk Modal Detail
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [error, setError] = useState(null);

  const roles = ["Host", "Manager", "Editor", "Admin", "Content Creator", "Producer", "Finance", "HR", "Procurement", "Technician", "Performance"];
  const statuses = ["Aktif", "Tidak Aktif", "Cuti", "Resigned"];

  // Fetch data dari database Laravel
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get( `${import.meta.env.VITE_API_URL}/employees`);
        setEmployees(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching employees:", err);
        setError("Gagal memuat data dari server.");
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  // Filter logika
  const filteredEmployees = employees.filter((emp) => {
    const matchesSearch =
      emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "Semua" || emp.status === filterStatus;
    const matchesRole = filterRole === "Semua" || emp.role === filterRole;
    return matchesSearch && matchesStatus && matchesRole;
  });

  const openDetail = (employee) => {
    setSelectedEmployee(employee);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="animate-fade-in space-y-4">
      <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Data Karyawan</h1>
      <p className="text-text-secondary text-sm md:text-base">Daftar lengkap seluruh karyawan Vermillion ERP.</p>

      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-lg flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Cari nama atau email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm"
            />
          </div>
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm bg-white"
          >
            <option value="Semua">Semua Status</option>
            {statuses.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange text-sm bg-white"
          >
            <option value="Semua">Semua Role</option>
            {roles.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table Data Karyawan */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-gray-500">Memuat data karyawan...</div>
        ) : filteredEmployees.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="border-b border-gray-200">
                  <th className="px-6 py-4 text-left font-bold text-gray-700">Nama Lengkap</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-700">Posisi (Role)</th>
                  <th className="px-6 py-4 text-left font-bold text-gray-700">Status</th>
                  <th className="px-6 py-4 text-center font-bold text-gray-700">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredEmployees.map((emp) => (
                  <tr key={emp.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-800">{emp.name}</div>
                      <div className="text-xs text-gray-500">{emp.email}</div>
                    </td>
                    <td className="px-6 py-4 font-medium text-gray-600">{emp.role}</td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        emp.status === "Aktif" ? "bg-green-100 text-green-700"
                        : emp.status === "Tidak Aktif" ? "bg-red-100 text-red-700"
                        : emp.status === "Cuti" ? "bg-yellow-100 text-yellow-700"
                        : "bg-gray-100 text-gray-600"
                      }`}>
                        {emp.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        onClick={() => openDetail(emp)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-blue-50 text-blue-600 hover:bg-blue-100 rounded-lg font-medium transition-colors"
                      >
                        <Eye size={16} /> Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-gray-500">Tidak ada data karyawan yang cocok.</div>
        )}
      </div>

      {/* MODAL DETAIL KARYAWAN */}
      {isDetailOpen && selectedEmployee && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[1000] p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full overflow-hidden animate-slide-up">
            
            {/* Header Modal */}
            <div className="bg-brand-orange p-6 relative">
              <button 
                onClick={closeDetail}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
              <div className="flex flex-col items-center text-white mt-2">
                <UserCircle size={80} strokeWidth={1} className="mb-3 opacity-90" />
                <h2 className="text-2xl font-bold">{selectedEmployee.name}</h2>
                <p className="text-orange-100 font-medium">{selectedEmployee.role}</p>
              </div>
            </div>

            {/* Konten Detail */}
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-y-4 gap-x-2 text-sm">
                
                <div className="col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Mail size={16} /> <span>Email</span>
                  </div>
                  <div className="font-semibold text-gray-800 break-words">{selectedEmployee.email}</div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Phone size={16} /> <span>Nomor Telepon</span>
                  </div>
                  <div className="font-semibold text-gray-800">{selectedEmployee.phone || "-"}</div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Calendar size={16} /> <span>Tanggal Lahir</span>
                  </div>
                  <div className="font-semibold text-gray-800">{selectedEmployee.dob || "-"}</div>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <Briefcase size={16} /> <span>Status & Kontrak</span>
                  </div>
                  <div className="font-semibold text-gray-800">
                    {selectedEmployee.status} • {selectedEmployee.contract}
                  </div>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <MapPin size={16} /> <span>Alamat Domisili</span>
                  </div>
                  <div className="font-semibold text-gray-800">{selectedEmployee.address || "-"}</div>
                </div>

                <div className="col-span-2">
                  <div className="flex items-center gap-2 text-gray-500 mb-1">
                    <CreditCard size={16} /> <span>Rekening Bank</span>
                  </div>
                  <div className="font-semibold text-gray-800">{selectedEmployee.bank_account || "-"}</div>
                </div>

              </div>
            </div>

            {/* Footer Modal */}
            <div className="p-4 border-t border-gray-100 bg-gray-50">
              <button
                onClick={closeDetail}
                className="w-full py-2.5 bg-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-300 transition-colors"
              >
                Tutup Profil
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRKaryawan;