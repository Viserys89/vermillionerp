import React from 'react';
import { Info, MessageCircle, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import logoVermillion2 from '../assets/vermil-logo.png';

const ContactPage = () => {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-orange-400 to-[#FFF8F0] p-5 relative">
      {/* Fixed Logo */}
      <div className="fixed top-6 left-6">
        <img src={logoVermillion2} alt="Logo" className="h-10 w-auto" />
      </div>
      <div className="w-full max-w-[420px] bg-white/75 backdrop-blur-md border border-orange-100 rounded-[20px] p-10 shadow-2xl text-center animate-slide-up">
        <Info className="w-16 h-16 text-orange-500 mx-auto mb-5" />
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Request Information</h1>
        <p className="text-gray-600 leading-relaxed mb-10">
          Please Contact HR or Admin to make Forgot Password and Register Request
        </p>

        <div className="flex flex-col gap-3">
          <a 
            href="https://wa.me/628123456789" 
            target="_blank" 
            className="flex items-center justify-center gap-3 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg hover:-translate-y-1 transition-all"
          >
            <MessageCircle className="w-5 h-5" />
            Contact Admin via WhatsApp
          </a>
          
          <Link 
            to="/" 
            className="flex items-center justify-center gap-3 bg-orange-50 text-orange-500 border-2 border-orange-200 font-bold py-3 rounded-xl hover:-translate-y-1 transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;