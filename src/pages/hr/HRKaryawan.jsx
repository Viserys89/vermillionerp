import React, { useState } from 'react';
import { MapPin, Phone, Mail, Calendar, Banknote, AlertCircle, CheckCircle, X, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const HRKaryawan = () => {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Eka Kumar', email: 'eka@vermillion.com', phone: '08123456789', dob: '1990-05-15', address: 'Jl. Gatot Subroto No. 123, Jakarta', role: 'Host', status: 'Aktif', contract: '12 Bulan', bankAccount: '1234567890123456', photo: null },
    { id: 2, name: 'Siti Nurhaliza', email: 'siti@vermillion.com', phone: '08987654321', dob: '1992-08-22', address: 'Jl. Sudirman No. 456, Jakarta', role: 'Manager', status: 'Aktif', contract: '24 Bulan', bankAccount: '9876543210987654', photo: null },
    { id: 3, name: 'Budi Santoso', email: 'budi@vermillion.com', phone: '08112233445', dob: '1995-01-10', address: 'Jl. Merdeka No. 1, Bandung', role: 'Finance', status: 'Aktif', contract: '6 Bulan', bankAccount: '7890123456789012', photo: null },
    { id: 4, name: 'Maya Indah', email: 'maya@vermillion.com', phone: '08556677889', dob: '1998-11-30', address: 'Jl. Pahlawan No. 45, Surabaya', role: 'HR', status: 'Cuti', contract: '12 Bulan', bankAccount: '1011121314151617', photo: null },
    { id: 5, name: 'Andi Wijaya', email: 'andi@vermillion.com', phone: '08334455667', dob: '1993-04-05', address: 'Jl. Diponegoro No. 88, Semarang', role: 'Procurement', status: 'Tidak Aktif', contract: '3 Bulan', bankAccount: '2021222324252627', photo: null },
  ]);

  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [notification, setNotification] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  const showNotification = (type, message) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 4000);
  };

  const filteredEmployees = employees.filter(emp =>
    emp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    emp.phone.includes(searchTerm)
  );

  // Logika Pagination
  const totalPages = Math.ceil(filteredEmployees.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmployees = filteredEmployees.slice(indexOfFirstItem, indexOfLastItem);

  const handleDownloadProfile = (emp) => {
    const profileText = `
DATA KARYAWAN LENGKAP
=====================

Nama: ${emp.name}
Email: ${emp.email}
Telepon: ${emp.phone}
Tanggal Lahir: ${emp.dob}
Alamat: ${emp.address}
Role: ${emp.role}
Status: ${emp.status}
Durasi Kontrak: ${emp.contract}
No. Rekening Bank: ${emp.bankAccount}

Generated: ${new Date().toLocaleString('id-ID')}
    `;

    const blob = new Blob([profileText], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${emp.name.replace(/\s+/g, '_')}_profile.txt`;
    a.click();
    
    showNotification('success', `Profil ${emp.name} berhasil diunduh`);
  };

  return (
    <div className="animate-fade-in space-y-4">
      {notification && (
        <div className={`fixed top-4 right-4 z-[10000] p-4 rounded-xl backdrop-blur-xl border ${
          notification.type === 'success' 
            ? 'bg-status-success/90 border-status-success text-white' 
            : 'bg-status-error/90 border-status-error text-white'
        } shadow-lg flex items-center gap-3 animate-slide-up max-w-md`}>
          {notification.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
          <span className="font-medium">{notification.message}</span>
        </div>
      )}

      <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Data Karyawan</h1>

      {!selectedEmployee ? (
        <div className="space-y-4">
          {/* Search Bar */}
          <div className="p-4 md:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <input
              type="text"
              placeholder="Cari nama, email, atau telepon..."
              value={searchTerm}
              onChange={(e) => {setSearchTerm(e.target.value); setCurrentPage(1);}}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 bg-white outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent text-sm md:text-base transition-all"
            />
          </div>

          {/* Employee Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentEmployees.map(emp => (
              <div key={emp.id} className="p-4 md:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm hover:shadow-md transition-all cursor-pointer">
                <div onClick={() => setSelectedEmployee(emp)} className="space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-text-primary">{emp.name}</h3>
                      <p className="text-sm font-medium text-brand-orange">{emp.role}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
                      emp.status === 'Aktif' ? 'bg-green-100 text-status-success' :
                      emp.status === 'Tidak Aktif' ? 'bg-red-100 text-status-error' :
                      'bg-yellow-100 text-status-warning'
                    }`}>
                      {emp.status}
                    </span>
                  </div>

                  <div className="space-y-2 text-xs md:text-sm pt-2">
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Mail size={16} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{emp.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <Phone size={16} className="text-gray-400 flex-shrink-0" />
                      <span>{emp.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-text-secondary">
                      <MapPin size={16} className="text-gray-400 flex-shrink-0" />
                      <span className="truncate">{emp.address}</span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedEmployee(emp);
                    }}
                    className="w-full mt-4 px-3 py-2 bg-orange-50 text-brand-orange rounded-lg hover:bg-brand-orange hover:text-white border border-orange-100 hover:border-brand-orange transition-all font-bold text-sm"
                  >
                    Lihat Detail Lengkap
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination UI */}
          {filteredEmployees.length > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-2 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
              <span className="text-xs md:text-sm text-text-secondary text-center sm:text-left">
                Menampilkan <span className="font-semibold text-text-primary">{indexOfFirstItem + 1}</span> - <span className="font-semibold text-text-primary">{Math.min(indexOfLastItem, filteredEmployees.length)}</span> dari <span className="font-semibold text-text-primary">{filteredEmployees.length}</span> data
              </span>
              <div className="flex items-center gap-2">
                <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  <ChevronLeft size={16} />
                </button>
                <div className="hidden sm:flex items-center gap-1">
                  {[...Array(totalPages)].map((_, i) => (
                    <button key={i} onClick={() => setCurrentPage(i + 1)} className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${currentPage === i + 1 ? 'bg-brand-orange text-white' : 'hover:bg-orange-50 text-gray-600'}`}>
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all">
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

          {filteredEmployees.length === 0 && (
            <div className="text-center py-8 p-4 md:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
              <AlertCircle size={32} className="mx-auto text-text-light mb-2" />
              <p className="text-text-secondary text-sm md:text-base">Tidak ada data karyawan ditemukan</p>
            </div>
          )}
        </div>
      ) : (
        /* Employee Detail View */
        <div className="space-y-4">
          {/* FIX BUTTON KEMBALI: Warna soft abu-abu, konsisten sama dashboard */}
          <button
            onClick={() => setSelectedEmployee(null)}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all font-medium text-sm md:text-base flex items-center gap-2"
          >
            <ChevronLeft size={18} /> Kembali ke Daftar
          </button>

          <div className="p-4 md:p-6 rounded-2xl bg-white border border-gray-200 shadow-sm">
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-6">
                <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-text-primary">{selectedEmployee.name}</h2>
                    <p className="text-text-secondary text-sm md:text-base mt-2">{selectedEmployee.role}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                    selectedEmployee.status === 'Aktif' ? 'bg-green-100 text-status-success' :
                    selectedEmployee.status === 'Tidak Aktif' ? 'bg-red-100 text-status-error' :
                    'bg-yellow-100 text-status-warning'
                  }`}>
                    {selectedEmployee.status}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4">
                  <h3 className="font-bold text-text-primary text-lg">Informasi Pribadi</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Email</label>
                      <p className="text-sm md:text-base flex items-center gap-2 mt-1">
                        <Mail size={18} className="text-brand-orange flex-shrink-0" />
                        {selectedEmployee.email}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Telepon</label>
                      <p className="text-sm md:text-base flex items-center gap-2 mt-1">
                        <Phone size={18} className="text-brand-orange flex-shrink-0" />
                        {selectedEmployee.phone}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Tanggal Lahir</label>
                      <p className="text-sm md:text-base flex items-center gap-2 mt-1">
                        <Calendar size={18} className="text-brand-orange flex-shrink-0" />
                        {new Date(selectedEmployee.dob).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Alamat</label>
                      <p className="text-sm md:text-base flex items-start gap-2 mt-1">
                        <MapPin size={18} className="text-brand-orange flex-shrink-0 mt-0.5" />
                        <span>{selectedEmployee.address}</span>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-bold text-text-primary text-lg">Informasi Pekerjaan</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Posisi/Role</label>
                      <p className="text-sm md:text-base mt-1">{selectedEmployee.role}</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Status Kontrak</label>
                      <p className="text-sm md:text-base mt-1">{selectedEmployee.contract}</p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">Status Karyawan</label>
                      <p className="text-sm md:text-base mt-1">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          selectedEmployee.status === 'Aktif' ? 'bg-green-100 text-status-success' :
                          selectedEmployee.status === 'Tidak Aktif' ? 'bg-red-100 text-status-error' :
                          'bg-yellow-100 text-status-warning'
                        }`}>
                          {selectedEmployee.status}
                        </span>
                      </p>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-text-secondary uppercase tracking-wide">No. Rekening Bank</label>
                      <p className="text-sm md:text-base flex items-center gap-2 mt-1">
                        <Banknote size={18} className="text-brand-orange flex-shrink-0" />
                        {selectedEmployee.bankAccount}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6 flex flex-col sm:flex-row gap-2">
                <button
                  onClick={() => handleDownloadProfile(selectedEmployee)}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-status-success text-white rounded-lg hover:bg-emerald-700 focus:ring-2 focus:ring-green-300 focus:outline-none transition-all font-bold text-sm md:text-base"
                >
                  <Download size={20} /> Unduh Profil
                </button>
                {/* FIX BUTTON TUTUP: Sama kayak Batal, abu-abu cerah bersih */}
                <button
                  onClick={() => setSelectedEmployee(null)}
                  className="flex-1 px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-bold text-sm md:text-base transition-all"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HRKaryawan;