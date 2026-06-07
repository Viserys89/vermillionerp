import React, { useState } from 'react';
import { Search, Plus, Upload, Edit, Trash2, Eye, X, CheckCircle, FileText, FileImage } from 'lucide-react';
import ConfirmationModal from '../../components/common/ConfirmationModal';

const TechModul = () => {
  const [view, setView] = useState('list'); // 'list' atau 'editor'
  const [notification, setNotification] = useState(null);
  
  const [modules, setModules] = useState([
    { id: 1, title: 'Cara Mengatasi Akun Tiktok Kena Suspend', date: '2024-04-10', status: 'Published' },
    { id: 2, title: 'SOP Troubleshooting Wifi Putus', date: '2024-04-05', status: 'Published' },
  ]);

  // State untuk Editor
  const [editorTitle, setEditorTitle] = useState('');
  const [editorContent, setEditorContent] = useState('');
  const [isSimulatingUpload, setIsSimulatingUpload] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentEditId, setCurrentEditId] = useState(null);

  // Modal State
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedMod, setSelectedMod] = useState(null);

  const showNotification = (message) => {
    setNotification({ type: 'success', message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenEditor = (mod = null) => {
    if (mod) {
      setEditorTitle(mod.title);
      setIsEditMode(true);
      setCurrentEditId(mod.id);
      setEditorContent(`## ${mod.title}\n\nIni adalah panduan langkah demi langkah.\n\n1. Restart aplikasi.\n2. Cek koneksi internet.\n3. Login ulang.\n\n![Ilustrasi Gambar](https://via.placeholder.com/400x200?text=Gambar+Preview)`);
    } else {
      setEditorTitle('');
      setEditorContent('');
      setIsEditMode(false);
      setCurrentEditId(null);
    }
    setView('editor');
  };

  const handleSave = () => {
    if (!editorTitle) return alert('Judul wajib diisi!');
    
    if (isEditMode) {
      setModules(modules.map(m => m.id === currentEditId ? { ...m, title: editorTitle, date: new Date().toISOString().split('T')[0] } : m));
      showNotification('Modul berhasil diperbarui!');
    } else {
      const newMod = { id: Date.now(), title: editorTitle, date: new Date().toISOString().split('T')[0], status: 'Published' };
      setModules([newMod, ...modules]);
      showNotification('Modul berhasil disimpan dan dipublikasikan!');
    }
    setView('list');
  };

  const handleDeleteClick = (mod) => {
    setSelectedMod(mod);
    setDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setModules(modules.filter(m => m.id !== selectedMod.id));
    showNotification(`Modul "${selectedMod.title}" berhasil dihapus.`);
  };

  // Simulasi Import File
  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsSimulatingUpload(true);
      setTimeout(() => {
        setEditorTitle(file.name.split('.')[0].replace(/[-_]/g, ' '));
        setEditorContent(`## Hasil Import: ${file.name}\n\nSistem berhasil mengekstrak teks dari file dokumen yang Anda unggah.\n\n**Poin Penting:**\n- Pastikan perangkat terhubung internet.\n- Buka menu Settings > Network.\n\n*(Sistem Auto-Convert Vermillion ERP)*\n\n![Gambar Otomatis Terdeteksi](https://via.placeholder.com/400x200?text=Gambar+Dari+Dokumen)`);
        setIsSimulatingUpload(false);
        showNotification('File berhasil di-convert ke modul!');
      }, 1500);
    }
  };

  return (
    <div className="animate-fade-in space-y-4 md:space-y-6 h-[calc(100vh-80px)] flex flex-col">
      {notification && (
        <div className="fixed top-4 right-4 z-[10000] p-4 rounded-xl bg-green-500 border border-green-600 text-white shadow-lg flex items-center gap-3 animate-slide-up">
          <CheckCircle size={20} /> <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {view === 'list' ? (
        <>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Pusat Pengetahuan (Modul)</h1>
            <button onClick={() => handleOpenEditor()} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all font-bold shadow-lg shadow-orange-200">
              <Plus size={18} /> Buat Modul Baru
            </button>
          </div>

          <div className="bg-white rounded-[24px] border border-orange-100 shadow-sm p-4 md:p-6 flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map(mod => (
                <div key={mod.id} className="p-6 border border-gray-100 rounded-2xl hover:shadow-xl hover:border-orange-200 transition-all flex flex-col justify-between group bg-gray-50/30">
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><FileText size={24} /></div>
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-[10px] font-black rounded-lg uppercase tracking-widest">{mod.status}</span>
                    </div>
                    <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight line-clamp-2">{mod.title}</h3>
                    <p className="text-xs text-gray-400 font-medium">Diperbarui: {mod.date}</p>
                  </div>
                  <div className="mt-8 flex gap-2">
                    <button onClick={() => handleOpenEditor(mod)} className="flex-1 flex justify-center items-center gap-2 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all text-xs font-bold">
                      <Edit size={16} /> Edit
                    </button>
                    <button onClick={() => handleDeleteClick(mod)} className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-orange-100 shadow-sm gap-4">
            <h1 className="text-xl font-bold text-gray-800">{isEditMode ? 'Edit Modul' : 'Buat Modul Baru'}</h1>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={() => setView('list')} className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">Batal</button>
              <button onClick={handleSave} className="flex-1 sm:flex-none px-6 py-2.5 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">Simpan Modul</button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 bg-white rounded-[24px] border border-orange-100 shadow-sm p-4 md:p-6 flex flex-col h-full overflow-y-auto">
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Modul</label>
                <input type="text" value={editorTitle} onChange={(e) => setEditorTitle(e.target.value)} placeholder="Contoh: SOP Penanganan PC Blue Screen..." className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none font-bold text-lg transition-all"/>
              </div>

              <div className="mb-6">
                <label className="flex-1 cursor-pointer flex items-center justify-center gap-3 py-4 border-2 border-dashed border-blue-200 bg-blue-50/50 text-blue-600 rounded-2xl hover:bg-blue-50 transition-all">
                  {isSimulatingUpload ? <span className="animate-pulse font-bold text-sm">Sedang mengonversi file...</span> : <><Upload size={20}/> <span className="font-bold text-sm">Import File (PDF/Word)</span></>}
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleImportFile} disabled={isSimulatingUpload} />
                </label>
              </div>

              <div className="flex-1 flex flex-col min-h-[300px]">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                  <span>Isi Konten (Markdown)</span>
                  <span className="text-[10px] text-orange-500 font-bold bg-orange-50 px-2 py-0.5 rounded-md uppercase tracking-wider">Preview Otomatis</span>
                </label>
                <textarea 
                  value={editorContent} 
                  onChange={(e) => setEditorContent(e.target.value)} 
                  placeholder="Ketik isi modul di sini, atau import dokumen..." 
                  className="w-full flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none resize-none font-mono text-sm leading-relaxed"
                ></textarea>
              </div>
            </div>

            <div className="flex-1 bg-white rounded-[24px] border border-gray-200 shadow-inner p-6 md:p-10 flex flex-col h-full overflow-y-auto bg-grid-slate-100">
              <div className="flex items-center gap-2 mb-8 border-b border-gray-100 pb-4">
                <Eye size={20} className="text-gray-400" />
                <span className="font-bold text-[10px] text-gray-400 uppercase tracking-[0.2em]">Tampilan Host</span>
              </div>
              
              <div className="prose prose-orange max-w-none">
                {editorTitle ? <h1 className="text-3xl font-black mb-8 text-gray-800">{editorTitle}</h1> : <h1 className="text-3xl font-black mb-8 text-gray-200 italic">Judul Modul...</h1>}
                
                {editorContent ? (
                  <div className="whitespace-pre-wrap space-y-6 text-gray-600 leading-relaxed">
                    {editorContent.split('\n\n').map((paragraph, idx) => {
                      if(paragraph.startsWith('![')) {
                        const url = paragraph.match(/\((.*?)\)/)?.[1];
                        return <img key={idx} src={url || 'https://via.placeholder.com/400x200'} alt="preview" className="rounded-2xl border border-gray-100 shadow-lg w-full object-cover max-h-80" />;
                      } else if (paragraph.startsWith('## ')) {
                        return <h2 key={idx} className="text-xl font-bold text-gray-800 mt-10 mb-4 border-l-4 border-orange-500 pl-4">{paragraph.replace('## ', '')}</h2>;
                      } else {
                        return <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                      }
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-64 text-gray-300 space-y-4">
                    <FileImage size={64} className="opacity-20" />
                    <p className="font-bold text-sm uppercase tracking-widest opacity-40">Belum ada konten</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <ConfirmationModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={confirmDelete}
        title="Hapus Modul?"
        message={`Apakah Anda yakin ingin menghapus modul "${selectedMod?.title}"? Tindakan ini tidak dapat dibatalkan.`}
        confirmText="Ya, Hapus"
        type="danger"
      />
    </div>
  );
};

export default TechModul;
