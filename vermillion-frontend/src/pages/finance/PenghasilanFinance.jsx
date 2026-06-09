import React, { useState, useEffect } from 'react';
import { Users, Wallet, ChevronLeft, ChevronRight, Search } from 'lucide-react';
import { API_BASE_URL } from '../../api';

const PenghasilanFinance = () => {
  const [incomes, setIncomes] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [period, setPeriod] = useState({
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear()
  });
  const itemsPerPage = 10;

  const fetchIncomes = () => {
    const query = new URLSearchParams({
      month: period.month,
      year: period.year,
      search: searchTerm
    }).toString();
    
    fetch(`${API_BASE_URL}/finance/income?${query}`)
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setIncomes(data);
        }
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    fetchIncomes();
  }, [period, searchTerm]);

  const totalOverallIncome = incomes.reduce((sum, item) => sum + item.total_income, 0);
  const totalPages = Math.ceil(incomes.length / itemsPerPage);
  const currentItems = incomes.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const months = [
    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
  ];

  return (
    <div className="animate-fade-in space-y-4">
      {/* Header Title */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-text-primary">
          Rekap Penghasilan
        </h1>
        <p className="text-sm md:text-base text-text-secondary mt-1">
          Ringkasan perolehan bulanan berdasarkan laporan yang disetujui.
        </p>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow p-4 md:p-6 md:col-span-2 flex items-center gap-4">
          <div className="p-3 bg-orange-100 rounded-full">
             <Wallet size={28} className="text-brand-orange" />
          </div>
          <div>
            <p className="text-xs md:text-sm text-text-secondary truncate uppercase font-bold">
              Total Penghasilan Gaji ({incomes[0]?.period || 'Bulan Ini'})
            </p>
            <p className="text-2xl md:text-3xl font-bold text-brand-orange mt-1">
              Rp. {Number(totalOverallIncome).toLocaleString('id-ID')}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Card */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 space-y-4">
        
        {/* Filters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <select 
            value={period.month}
            onChange={(e) => setPeriod({...period, month: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm bg-white"
          >
            {months.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>

          <select 
            value={period.year}
            onChange={(e) => setPeriod({...period, year: e.target.value})}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm bg-white"
          >
            {[2024, 2025, 2026].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>

          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input
              type="text"
              placeholder="Cari Nama Host atau Tim..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset page on search
              }}
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-orange focus:border-transparent transition-all text-sm bg-white"
            />
          </div>
        </div>
          
        {/* Table */}
        <div className="overflow-x-auto -mx-4 md:mx-0 pt-2">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="px-4 py-3 text-left font-bold text-text-primary">Host & Tim</th>
                <th className="px-4 py-3 text-left font-bold text-text-primary">Total Diamond</th>
                <th className="px-4 py-3 text-left font-bold text-text-primary">Total Shift</th>
                <th className="px-4 py-3 text-left font-bold text-text-primary">Total Penghasilan</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((host) => (
                <tr key={host.id} className="border-b border-gray-100 hover:bg-light-bg/50 transition-colors">
                  <td className="px-4 py-3 font-medium">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-gray-100 rounded-full flex items-center justify-center shrink-0">
                        <Users size={18} className="text-gray-500" />
                      </div>
                      <div>
                        <div className="text-text-primary font-bold">{host.name}</div>
                        <div className="text-xs text-text-secondary">{host.team}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-brand-orange">
                    {Number(host.total_diamonds).toLocaleString('id-ID')}
                  </td>
                  <td className="px-4 py-3 font-semibold text-text-secondary">
                    {host.total_shifts} Shift
                  </td>
                  <td className="px-4 py-3 font-bold text-brand-orange">
                    Rp. {Number(host.total_income).toLocaleString('id-ID')}
                  </td>
                </tr>
              ))}
              {currentItems.length === 0 && (
                <tr>
                  <td colSpan="4" className="text-center py-8 text-gray-500 text-sm md:text-base">
                    Tidak ada data untuk periode ini.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination UI */}
        {totalPages > 0 && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs md:text-sm text-text-secondary text-center sm:text-left">
              Menampilkan{" "}
              <span className="font-semibold text-text-primary">
                {incomes.length === 0 ? 0 : ((currentPage - 1) * itemsPerPage) + 1}
              </span>{" "}
              -{" "}
              <span className="font-semibold text-text-primary">
                {Math.min(currentPage * itemsPerPage, incomes.length)}
              </span>{" "}
              dari{" "}
              <span className="font-semibold text-text-primary">
                {incomes.length}
              </span>{" "}
              data
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                    className={`w-8 h-8 rounded-lg text-xs font-medium transition-all ${
                      currentPage === i + 1 
                        ? "bg-brand-orange text-white" 
                        : "hover:bg-orange-50 text-gray-600"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                disabled={currentPage >= totalPages || totalPages === 0}
                className="p-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PenghasilanFinance;