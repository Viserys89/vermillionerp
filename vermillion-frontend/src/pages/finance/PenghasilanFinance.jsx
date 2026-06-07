import React, { useState, useEffect } from 'react';
import { Users, Wallet, SortAsc, ChevronLeft, ChevronRight, Calendar } from 'lucide-react';

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
    
    fetch(`${import.meta.env.VITE_API_URL}/finance/income?${query}`)
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
    <div className="animate-fade-in">
      <h1 className="text-xl font-medium mb-1">
        Rekap Penghasilan
      </h1>
      <h1 className='mb-6 text-gray-500'>Ringkasan perolehan bulanan berdasarkan laporan yang disetujui.</h1>
      
      <div className="flex items-center gap-6 mb-6">
        <div className="bg-[#fffef0] border-2 border-[#fde8d8] p-6 rounded-xl flex items-center gap-5 min-w-[300px] min-h-[120px]">
          <div className="flex flex-row gap-6">
            <Wallet size={32} className="text-orange-500 size-auto" />
            <div>
              <p className="text-sm text-gray-500 flex items-center gap-2 uppercase font-bold">
                Total Penghasilan Gaji ({incomes[0]?.period})
              </p>
              <h2 className="text-2xl font-bold text-orange-500">
                  Rp. {Number(totalOverallIncome).toLocaleString('id-ID')}
              </h2>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white shadow rounded-2xl p-6 mb-6">
        <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
          <Calendar size={20} className="text-orange-500" /> Pilih Periode & Filter
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <select 
            value={period.month}
            onChange={(e) => setPeriod({...period, month: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm bg-white focus:border-orange-500 focus:outline-none"
          >
            {months.map((m, i) => (
              <option key={i} value={i + 1}>{m}</option>
            ))}
          </select>
          <select 
            value={period.year}
            onChange={(e) => setPeriod({...period, year: e.target.value})}
            className="border rounded-lg px-3 py-2 text-sm bg-white focus:border-orange-500 focus:outline-none"
          >
            {[2024, 2025, 2026].map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Cari Nama Host atau Tim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border rounded-lg px-3 py-2 text-sm bg-white focus:border-orange-500 focus:outline-none"
          />
        </div>
      </div>
          
      <div className="w-full border rounded-xl overflow-x-auto bg-white">
        <div className="grid grid-cols-4 min-w-[800px] bg-[#fffef0] text-black text-sm font-semibold px-6 py-4">
            <div>HOST & TIM</div>
            <div>TOTAL DIAMOND</div>
            <div>TOTAL SHIFT</div>
            <div>TOTAL PENGHASILAN</div>
        </div>
    
        <div className="flex flex-col">
          {currentItems.map((host) => (
            <div key={host.id} className="grid grid-cols-4 min-w-[800px] items-center px-6 py-4 border-t">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <Users size={20} className="text-gray-600" />
                </div>
                <div>
                    <p className="font-medium">{host.name}</p>
                    <p className="text-sm text-gray-400">{host.team}</p>
                </div>
              </div>
      
              <div className="text-orange-500 font-semibold">
                {Number(host.total_diamonds).toLocaleString('id-ID')}
              </div>
      
              <div className="text-gray-600 font-semibold">
                {host.total_shifts} Shift
              </div>

              <div className="text-orange-500 font-bold">
                Rp. {Number(host.total_income).toLocaleString('id-ID')}
              </div>
            </div>
          ))}

          {currentItems.length === 0 && (
            <p className="text-center text-gray-500 py-6">Tidak ada data untuk periode ini.</p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t bg-gray-50">
            <span className="text-sm text-gray-500">
              Menampilkan {currentItems.length} data
            </span>
            <div className="flex gap-2">
              <button disabled={currentPage === 1} onClick={() => setCurrentPage(p => p - 1)} className="p-1 rounded bg-white border shadow-sm disabled:opacity-50 hover:bg-gray-100">
                <ChevronLeft size={20} />
              </button>
              <button disabled={currentPage === totalPages} onClick={() => setCurrentPage(p => p + 1)} className="p-1 rounded bg-white border shadow-sm disabled:opacity-50 hover:bg-gray-100">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PenghasilanFinance;