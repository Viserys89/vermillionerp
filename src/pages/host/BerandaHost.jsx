import React from 'react';
import { Users, Diamond, Award, Megaphone, Send } from 'lucide-react';

const BerandaHost = () => {
  return (
    <div className="animate-fade-in">
      <h1 className="text-xl font-medium mb-6">
        Halo, <span className="text-orange-500 font-bold">Vicky!</span>
      </h1>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card Team */}
        <div className="md:col-span-2 relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-[#e9cbfb] to-[#a855f7] shadow-lg group">
          <h3 className="text-xl font-bold relative z-10">Team</h3>
          <div className="flex items-center gap-3 text-3xl font-bold mt-4 relative z-10">
            <Users size={32} className="text-purple-700" />
            <span>Ventura</span>
          </div>
          <Users size={150} className="absolute -right-4 -bottom-6 opacity-15 rotate-[-15deg] z-0" />
        </div>

        {/* Card Diamonds */}
        <div className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-[#f8cda8] to-[#ff8000] shadow-lg">
          <h3 className="text-xl font-bold relative z-10">Diamonds</h3>
          <div className="flex items-center gap-3 text-3xl font-bold mt-4 relative z-10">
            <Diamond size={32} className="text-orange-700" />
            <span>12.000</span>
          </div>
          <Diamond size={150} className="absolute -right-4 -bottom-6 opacity-15 rotate-[-15deg]" />
        </div>

        {/* Card Tier */}
        <div className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-[#e2e2e2] to-[#a5a5a5] shadow-lg">
          <h3 className="text-xl font-bold relative z-10">Tier</h3>
          <div className="flex items-center gap-3 text-3xl font-bold mt-4 relative z-10">
            <Award size={32} className="text-gray-600" />
            <span>Silver</span>
          </div>
          <Award size={150} className="absolute -right-4 -bottom-6 opacity-15 rotate-[-15deg]" />
        </div>

        {/* Card Pengaduan */}
        <div className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-[#ffd3c9] to-[#ef4444] shadow-lg">
          <h3 className="text-xl font-bold relative z-10 text-gray-800">Pengaduan Terkirim</h3>
          <div className="flex items-center gap-3 text-3xl font-bold mt-4 relative z-10 text-gray-800">
            <Megaphone size={32} className="text-red-700" />
            <span>3</span>
          </div>
          <Megaphone size={150} className="absolute -right-4 -bottom-6 opacity-15 rotate-[-15deg]" />
        </div>

        {/* Card Request */}
        <div className="relative overflow-hidden p-8 rounded-2xl bg-gradient-to-br from-[#bfdbfe] to-[#3b82f6] shadow-lg">
          <h3 className="text-xl font-bold relative z-10 text-gray-800">Request Terkirim</h3>
          <div className="flex items-center gap-3 text-3xl font-bold mt-4 relative z-10 text-gray-800">
            <Send size={32} className="text-blue-700" />
            <span>1</span>
          </div>
          <Send size={150} className="absolute -right-4 -bottom-6 opacity-15 rotate-[-15deg]" />
        </div>
      </section>
    </div>
  );
};

export default BerandaHost;