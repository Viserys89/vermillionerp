import React from 'react';
import { Users, Diamond, Award, Megaphone, Send, Wallet, DiamondIcon, SortAsc, Clock, Eye, Download } from 'lucide-react';

const PenghasilanFinance = () => {
  return (
     <div className="animate-fade-in">
          <h1 className="text-xl font-medium mb-1">
            Rekap Penghasilan
          </h1>
          <h1 className='mb-6'>Ringkasan total diamond, jam tayang, dan estimasi penghasilan Host.</h1>
          
        
        <div className="flex items-center gap-6 mb-6">
    
        <div className="flex flex-col min-[865px]:flex-row items-center gap-4">
            
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
    
     
    
    </div>
        
          
        <div className="w-full border rounded-xl overflow-hidden mt-6">
    
        {/* Header tabel */}
        <div className="grid grid-cols-4 bg-[#fffef0] text-black text-sm font-semibold px-6 py-4">
            <div>HOST & TIM</div>
            <div>TOTAL DIAMOND</div>
            <div>TOTAL JAM</div>
            <div>PENGHASILAN</div>
        </div>
    
        {/* Tabel host */}
        <div className="grid grid-cols-4 items-center px-6 py-4 border-t bg-white">
    
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
    
            
    
            {/* Diamond */}
            <div className="text-orange-500 font-semibold">
            100.000
            </div>
    
            {/* Status */}
            <div className="text-gray-600 font-semibold">
            Rp.12.000.000
            </div>
    
            {/* Verifikasi */}
            <div className="text-orange-500 font-semibold">
            Rp.12.000.000
            </div>
    
        </div>
        <div className="grid grid-cols-4 items-center px-6 py-4 border-t bg-white">
    
            {/* Host */}
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <i className="bx bx-user text-xl text-gray-600"></i>
            </div>
            <div>
                <p className="font-medium">Mukhammad Vicky</p>
                <p className="text-sm text-gray-400">Ventura</p>
            </div>
            </div>
    
            
    
            {/* Diamond */}
            <div className="text-orange-500 font-semibold">
            100.000
            </div>
    
            {/* Status */}
            <div className="text-gray-600 font-semibold">
            Rp.12.000.000
            </div>
    
            {/* Verifikasi */}
            <div className="text-orange-500 font-semibold">
            Rp.12.000.000
            </div>
    
        </div>
        <div className="grid grid-cols-4 items-center px-6 py-4 border-t bg-white">
    
            {/* Host */}
            <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                <i className="bx bx-user text-xl text-gray-600"></i>
            </div>
            <div>
                <p className="font-medium">Nabil</p>
                <p className="text-sm text-gray-400">Alvorn</p>
            </div>
            </div>
    
            
    
            {/* Diamond */}
            <div className="text-orange-500 font-semibold">
            100.000
            </div>
    
            {/* Status */}
            <div className="text-gray-600 font-semibold">
            Rp.12.000.000
            </div>
    
            {/* Verifikasi */}
            <div className="text-orange-500 font-semibold">
            Rp.12.000.000
            </div>
    
        </div>
        </div>
        </div>
  );
};

export default PenghasilanFinance;