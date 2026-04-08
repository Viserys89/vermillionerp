import React from 'react';
import { Users, Diamond, Award, Megaphone, Send, Wallet, DiamondIcon, SortAsc, Clock, Eye, Download } from 'lucide-react';

const BerandaFinance = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-xl font-medium mb-1">
        Finance Dashboard
      </h1>
      <h1 className='mb-6'>Verifikasi dan kelola pendapatan host dengan filter dan export data</h1>
      
    
    <div className="flex items-center gap-6 mb-6">

    <div className="flex flex-col min-[865px]:flex-row items-center gap-4">
        
    </div>
  {/* Card Total Diamond */}
  <div className="bg-[#fffef0] border-2 border-[#fde8d8] p-6 rounded-xl flex items-center gap-5 min-w-[300px] min-h-[120px]">
    
    <div className="text-orange-500 text-3xl">
      <i className="bx bx-gem"></i>
    </div>

    <div className="flex flex-row gap-6">
      <Diamond size={32} className="text-orange-500 size-auto" />
      <div>
        <p className="text-sm text-gray-500 flex items-center gap-2">
        <i className="bx bx-wallet"></i> TOTAL DIAMOND
        </p>
        <h2 className="text-2xl font-bold text-orange-500">
            25.000
        </h2>
      </div>
    </div>

  </div>

  {/* Card Total Penghasilan */}
  <div className="bg-[#fffef0] border-2 border-[#fde8d8] p-6 rounded-xl flex items-center gap-5 min-w-[300px] min-h-[120px]">
    
    <div className="text-orange-500 text-3xl">
      <i className="bx bx-wallet"></i>
    </div>

    <div className="flex flex-row gap-6">
      <Wallet size={32} className="text-orange-500 size-auto" />
      <div>
        <p className="text-sm text-gray-500 flex items-center gap-2">
        <i className="bx bx-wallet"></i> TOTAL PENGHASILAN
        </p>
        <h2 className="text-2xl font-bold text-orange-500">
            Rp. 225.000.000
        </h2>
      </div>
    </div>

  </div>

  {/* Export CSV */}
  <button className="ml-auto bg-gradient-to-r from-orange-400 to-orange-500 text-white px-6 py-3 rounded-xl flex items-center gap-2 shadow hover:opacity-90 transition">
    <i className="bx bx-download"></i>
    <Download size={16} className="text-white size-auto" />
    Export CSV
  </button>

</div>
    
      <div className="bg-white shadow rounded-2xl p-6">
      {/* Title */}
      <h2 className="text-sm font-semibold mb-3 flex items-center gap-2">
        <SortAsc size={32} className="text-orange-500 size-auto" /> Filter Data
      </h2>

      {/* Input tanggal */}
      <div className="mb-3">
        <input
          type="date"
          placeholder="hh/bb/ttt"
          className="border rounded-lg px-3 py-2 text-sm shadow-sm bg-white focus:border-orange-500 focus:outline-none"/>
      </div>

      {/* Dropdown */}
      <div className="grid grid-cols-3 gap-3 mb-3">
        <select className="border rounded-lg px-3 py-2 text-sm bg-white focus:border-orange-500 focus:outline-none">
          <option disabled selected>Pilih Shift</option>
          <option>Jam pagi</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm bg-white focus:border-orange-500 focus:outline-none">
          <option>Pilih Tim</option>
        </select>

        <select className="border rounded-lg px-3 py-2 text-sm bg-white focus:border-orange-500 focus:outline-none">
          <option>Pilih Status</option>
        </select>
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Cari Nama Host"
        className="w-full border rounded-lg px-3 py-2 text-sm bg-white focus:border-orange-500 focus:outline-none"/>
    </div>

    <div className="w-full border rounded-xl overflow-hidden mt-6">

    {/* Header tabel */}
    <div className="grid grid-cols-5 bg-[#fffef0] text-black text-sm font-semibold px-6 py-4">
        <div>HOST & TIM</div>
        <div>SHIFT & WAKTU</div>
        <div>TOTAL DIAMOND</div>
        <div>STATUS</div>
        <div>VERIFIKASI</div>
    </div>

    {/* Tabel host */}
    <div className="grid grid-cols-5 items-center px-6 py-4 border-t">

        {/* Host */}
        <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
            <i className="bx bx-user text-xl text-gray-600"></i>
        </div>
        <div>
            <p className="font-medium">Ghassan Ariq</p>
            <p className="text-sm text-gray-400">Provic</p>
        </div>
        </div>

        {/* Shift */}
        <div>
        <p className="flex items-center gap-2 text-gray-700">
            <i className="bx bx-time text-orange-500"></i>
            Dini Hari (00.00 - 06.00)
        </p>
        <p className="text-sm text-gray-400">27/02/28 - 05:40</p>
        </div>

        {/* Diamond */}
        <div className="text-orange-500 font-semibold">
        100.000
        </div>

        {/* Status */}
        <div>
        <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-lg text-sm flex items-center gap-2 w-fit">
            <i className="bx bx-time"></i>
            <Clock size={16} className="text-yellow-700 size-auto" />
            Menunggu
        </span>
        </div>

        {/* Verifikasi */}
        <div>
        <button className="text-blue-500 flex items-center gap-2 hover:underline">
            <i className="bx bx-show"></i>
            <Eye size={16} className="text-blue-500 size-auto" />
            Periksa
        </button>
        </div>

    </div>
    </div>
    </div>
  );
};

export default BerandaFinance;