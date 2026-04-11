import React, { useState } from 'react';
import { Search, Plus, Upload, Edit, Trash2, Eye, X, CheckCircle, FileText, FileImage } from 'lucide-react';

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

  const showNotification = (message) => {
    setNotification({ type: 'success', message });
    setTimeout(() => setNotification(null), 3000);
  };

  const handleOpenEditor = (mod = null) => {
    if (mod) {
      setEditorTitle(mod.title);
      // Dummy content untuk mode edit
      setEditorContent(`## ${mod.title}\n\nIni adalah panduan langkah demi langkah.\n\n1. Restart aplikasi.\n2. Cek koneksi internet.\n3. Login ulang.\n\n![Ilustrasi Gambar](https://via.placeholder.com/400x200?text=Gambar+Preview)`);
    } else {
      setEditorTitle('');
      setEditorContent('');
    }
    setView('editor');
  };

  const handleSave = () => {
    if (!editorTitle) return alert('Judul wajib diisi!');
    const newMod = { id: Date.now(), title: editorTitle, date: new Date().toISOString().split('T')[0], status: 'Published' };
    setModules([newMod, ...modules]);
    setView('list');
    showNotification('Modul berhasil disimpan dan dipublikasikan!');
  };

  // Simulasi Import File (Auto Convert jadi Preview Text)
  const handleImportFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsSimulatingUpload(true);
      // Simulasi loading extract text dari PDF/Word
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
        <div className="fixed top-4 right-4 z-[10000] p-4 rounded-xl bg-status-success/90 border-status-success text-white shadow-lg flex items-center gap-3 animate-slide-up">
          <CheckCircle size={20} /> <span className="font-medium">{notification.message}</span>
        </div>
      )}

      {view === 'list' ? (
        // === VIEW: LIST MODUL ===
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl md:text-3xl font-bold text-text-primary">Pusat Pengetahuan (Modul)</h1>
            <button onClick={() => handleOpenEditor()} className="flex items-center gap-2 px-4 py-2 bg-brand-orange text-white rounded-lg hover:bg-orange-600 transition-all font-bold shadow-sm shadow-orange-200">
              <Plus size={18} /> Buat Modul Baru
            </button>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {modules.map(mod => (
                <div key={mod.id} className="p-5 border border-gray-200 rounded-xl hover:shadow-md hover:border-brand-orange/30 transition-all flex flex-col justify-between group">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><FileText size={20} /></div>
                      <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] font-bold rounded uppercase tracking-wide">{mod.status}</span>
                    </div>
                    <h3 className="font-bold text-text-primary text-lg mb-1 leading-tight line-clamp-2">{mod.title}</h3>
                    <p className="text-xs text-text-secondary">Diperbarui: {mod.date}</p>
                  </div>
                  <div className="mt-6 flex gap-2">
                    <button onClick={() => handleOpenEditor(mod)} className="flex-1 flex justify-center items-center gap-1.5 py-2 bg-orange-50 text-brand-orange rounded-lg hover:bg-brand-orange hover:text-white transition-all text-xs font-bold border border-orange-100">
                      <Edit size={14} /> Edit
                    </button>
                    <button className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-500 hover:text-white transition-all border border-red-100">
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        // === VIEW: SPLIT PANE EDITOR & PREVIEW ===
        <div className="flex flex-col h-full space-y-4">
          <div className="flex justify-between items-center bg-white p-4 rounded-xl border border-gray-200 shadow-sm shrink-0">
            <h1 className="text-xl font-bold text-text-primary">Bikn/Edit Modul</h1>
            <div className="flex gap-2">
              <button onClick={() => setView('list')} className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-bold text-sm hover:bg-gray-200 transition-all">Batal</button>
              <button onClick={handleSave} className="px-4 py-2 bg-status-success text-white rounded-lg font-bold text-sm hover:bg-green-600 transition-all shadow-sm shadow-green-200">Publikasikan Modul</button>
            </div>
          </div>

          {/* Editor Area - Split Screen on Desktop */}
          <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-[500px]">
            
            {/* Kiri: Area Edit / Import */}
            <div className="flex-1 bg-white rounded-xl border border-gray-200 shadow-sm p-4 md:p-6 flex flex-col h-full">
              <div className="mb-4">
                <label className="block text-sm font-bold text-text-primary mb-2">Judul Modul</label>
                <input type="text" value={editorTitle} onChange={(e) => setEditorTitle(e.target.value)} placeholder="Contoh: Cara Mengatasi Error Studio..." className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange outline-none font-bold text-lg"/>
              </div>

              <div className="mb-4 flex gap-2">
                <label className="flex-1 cursor-pointer flex items-center justify-center gap-2 py-3 border-2 border-dashed border-blue-300 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-all">
                  {isSimulatingUpload ? <span className="animate-pulse font-bold text-sm">Mengonversi file...</span> : <><Upload size={18}/> <span className="font-bold text-sm">Import File (PDF/Word)</span></>}
                  <input type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleImportFile} disabled={isSimulatingUpload} />
                </label>
              </div>

              <div className="flex-1 flex flex-col">
                <label className="block text-sm font-bold text-text-primary mb-2 flex justify-between">
                  <span>Isi Konten (Markdown)</span>
                  <span className="text-xs text-brand-orange font-normal bg-orange-50 px-2 py-0.5 rounded">Auto-render di Preview</span>
                </label>
                <textarea 
                  value={editorContent} 
                  onChange={(e) => setEditorContent(e.target.value)} 
                  placeholder="Ketik isi modul di sini, atau import dokumen..." 
                  className="w-full flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-brand-orange outline-none resize-none font-mono text-sm leading-relaxed bg-gray-50/50"
                ></textarea>
              </div>
            </div>

            {/* Kanan: Live Preview Rendering */}
            <div className="flex-1 bg-light-bg rounded-xl border border-gray-300 shadow-inner p-4 md:p-8 flex flex-col h-full overflow-y-auto">
              <div className="flex items-center gap-2 mb-6 border-b border-gray-300 pb-3 opacity-50">
                <Eye size={18} className="text-text-secondary" />
                <span className="font-bold text-sm text-text-secondary uppercase tracking-widest">Live Preview Host</span>
              </div>
              
              {/* Tempat Preview Hasil Auto-Convert */}
              <div className="prose prose-sm md:prose-base max-w-none text-text-primary">
                {editorTitle ? <h1 className="text-3xl font-bold mb-6 text-brand-orange">{editorTitle}</h1> : <h1 className="text-3xl font-bold mb-6 text-gray-300 italic">Judul Modul...</h1>}
                
                {editorContent ? (
                  <div className="whitespace-pre-wrap space-y-4">
                    {/* Simulasi basic Markdown to UI Element rendering */}
                    {editorContent.split('\n\n').map((paragraph, idx) => {
                      if(paragraph.startsWith('![')) {
                        // Render Gambar
                        const url = paragraph.match(/\((.*?)\)/)?.[1];
                        return <img key={idx} src={url || 'https://via.placeholder.com/400x200'} alt="preview" className="rounded-xl border border-gray-200 shadow-sm w-full object-cover max-h-64" />;
                      } else if (paragraph.startsWith('## ')) {
                        // Render Heading 2
                        return <h2 key={idx} className="text-xl font-bold mt-6 mb-2 border-b pb-2">{paragraph.replace('## ', '')}</h2>;
                      } else {
                        // Render Text (bold dicover pake dangeruslySetInnerHTML simulasi)
                        return <p key={idx} dangerouslySetInnerHTML={{ __html: paragraph.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }}></p>
                      }
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-48 text-gray-400 space-y-2 opacity-50">
                    <FileImage size={48} />
                    <p className="text-sm font-medium">Preview konten akan muncul di sini</p>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

export default TechModul;