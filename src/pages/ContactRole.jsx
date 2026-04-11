import React, { useState, useMemo } from 'react';
import { Search, MessageCircle, Phone, Filter, Users, ShieldCheck, Briefcase } from 'lucide-react';

const ContactRole = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");

  const divisions = ["All", "Performance", "Procurement", "Finance", "IT Support", "Management"];

  const contactData = [
    { id: 1, name: "Hanifi Santoso", division: "Performance", role: "Division Head", phone: "6281234567890" },
    { id: 2, name: "Harmoni Natanael", division: "Procurement", role: "Purchasing Officer", phone: "6289876543210" },
    { id: 3, name: "Habibie", division: "Finance", role: "Accountant", phone: "6281122334455" },
    { id: 4, name: "Nabil Rizki", division: "Performance", role: "Team Leader", phone: "6285566778899" },
    { id: 5, name: "Mursyid Daniswara", division: "IT Support", role: "Technical Lead", phone: "628123123123" },
    { id: 6, name: "Akmal Romdhoni", division: "Management", role: "General Manager", phone: "628111222333" },
  ];

  const filteredContacts = useMemo(() => {
    return contactData.filter((contact) => {
      const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            contact.division.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === "All" || contact.division === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  const openWhatsApp = (number) => {
    window.open(`https://wa.me/${number}`, '_blank');
  };

  return (
    <div className="space-y-6 animate-fade-in pb-10">
      {/* --- HEADER & SEARCH SECTION --- */}
      <section className="bg-white/40 backdrop-blur-xl border border-white rounded-[35px] p-6 md:p-8 shadow-lg">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-2xl font-extrabold text-gray-800 flex items-center gap-3">
              <Users className="text-orange-500" /> Kontak Divisi
            </h1>
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Cari nama atau divisi..."
              className="w-full pl-12 pr-4 py-3 bg-white/60 border border-white rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all shadow-inner"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex flex-wrap gap-2 mt-6">
          {divisions.map((div) => (
            <button
              key={div}
              onClick={() => setActiveFilter(div)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all ${
                activeFilter === div 
                ? 'bg-orange-500 text-white shadow-lg shadow-orange-200 scale-105' 
                : 'bg-white/50 text-gray-500 hover:bg-orange-100 border border-white'
              }`}
            >
              {div}
            </button>
          ))}
        </div>
      </section>

      {/* --- CONTACT GRID --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredContacts.length > 0 ? (
          filteredContacts.map((contact) => (
            <div 
              key={contact.id} 
              className="group bg-white/40 backdrop-blur-md border border-white rounded-[30px] p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden"
            >
              {/* Dekorasi kartu */}
              <div className="absolute -right-4 -top-4 w-20 h-20 bg-orange-500/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-14 h-14 bg-gradient-to-tr from-orange-100 to-white border border-orange-200 rounded-2xl flex items-center justify-center text-orange-600 shadow-sm">
                  <Briefcase size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{contact.name}</h4>
                  <p className="text-[10px] font-bold text-orange-500 uppercase tracking-widest mb-1">{contact.division} Division</p>
                  <p className="text-xs text-gray-400 flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-500" /> {contact.role}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex gap-2 relative z-10">
                <button 
                  onClick={() => openWhatsApp(contact.phone)}
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-100 transition-all active:scale-95"
                >
                  <MessageCircle size={18} /> WhatsApp
                </button>
                <a 
                  href={`tel:${contact.phone}`}
                  className="p-3 bg-white hover:bg-gray-50 text-gray-400 rounded-2xl border border-gray-100 transition-all"
                >
                  <Phone size={18} />
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center">
            <div className="bg-white/20 inline-block p-6 rounded-full mb-4">
              <Users size={48} className="text-gray-300" />
            </div>
            <p className="text-gray-400 font-medium italic">Kontak tidak ditemukan...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactRole;