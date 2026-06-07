import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, Plus, Upload, Edit, Trash2, Eye, X, CheckCircle, FileText, FileImage } from 'lucide-react';
import ConfirmationModal from '../../components/common/ConfirmationModal';

const API_URL = "http://localhost:8000/api";

const PengaduanHost = () => {
  const [view, setView] = useState('list'); // 'list' atau 'editor'
  const [notification, setNotification] = useState(null);
  
  //form pengaduan
  const [modules, setModules] = useState([]);

  //ambil user
  const user = JSON.parse(
  localStorage.getItem("user") || "{}"
);

const [loading, setLoading] = useState(true);

const employeeId = user?.id;
//load complaints
const loadComplaints = async () => {
  try {

    setLoading(true);

    const response = await axios.get(
      `${API_URL}/complaints`
    );

    const myComplaints = response.data.filter(
      item => item.employee_id === employeeId
    );

    setModules(myComplaints);

  } catch (error) {

    console.error(error);

  } finally {

    setLoading(false);

  }
};

useEffect(() => {
  if (employeeId) {
    loadComplaints();
  }
}, [employeeId]);



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
      setEditorTitle(mod.issue_title);
      setIsEditMode(true);
      setCurrentEditId(mod.id);
      setEditorContent(mod.issue_description);
    } else {
      setEditorTitle('');
      setEditorContent('');
      setIsEditMode(false);
      setCurrentEditId(null);
    }
    setView('editor');
  };

 const handleSave = async () => {

  if (!editorTitle) {
    alert("Judul wajib diisi");
    return;
  }

  try {

  if (isEditMode) {

    await axios.put(
      `${API_URL}/complaints/${currentEditId}`,
      {
        issue_title: editorTitle,
        issue_description: editorContent
      }
    );

    showNotification(
      'Pengaduan berhasil diperbarui!'
    );

  } else {

    await axios.post(
      `${API_URL}/complaints`,
      {
        employee_id: employeeId,
        report_date: new Date()
          .toISOString()
          .split('T')[0],
        issue_title: editorTitle,
        issue_description: editorContent
      }
    );

    showNotification(
      'Pengaduan berhasil dikirim!'
    );
  }

  await loadComplaints();

  setView('list');

  setEditorTitle('');
  setEditorContent('');

} catch (error) {

  console.error(error);

  alert(
    'Gagal menyimpan pengaduan'
  );

}
};

  const handleDeleteClick = (mod) => {
    setSelectedMod(mod);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
  try {
    await axios.delete(
      `${API_URL}/complaints/${selectedMod.id}`
    );

    await loadComplaints();

    showNotification(
      "Pengaduan berhasil dihapus"
    );

  } catch (error) {
    console.error(error);
    alert("Gagal menghapus pengaduan");
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Pengaduan</h1>
            <button onClick={() => handleOpenEditor()} className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition-all font-bold shadow-lg shadow-orange-200">
              <Plus size={18} /> Buat Pengaduan Baru
            </button>
          </div>

          <div className="bg-white rounded-[24px] border border-orange-100 shadow-sm p-4 md:p-6 flex-1 overflow-y-auto">

  {loading ? (

    <div className="h-full flex items-center justify-center">
      <p className="text-gray-500 text-lg font-medium">
        Loading...
      </p>
    </div>

  ) : modules.length === 0 ? (

    <div className="h-full flex items-center justify-center">
      <p className="text-gray-400 text-lg font-medium">
        Belum ada pengaduan
      </p>
    </div>

  ) : (

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

      {modules.map(mod => (
        <div
          key={mod.id}
          className="p-6 border border-gray-100 rounded-2xl hover:shadow-xl hover:border-orange-200 transition-all flex flex-col justify-between group bg-gray-50/30"
        >
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                <FileText size={24} />
              </div>

              <span className="px-3 py-1 bg-yellow-200 text-yellow-700 text-[10px] font-black rounded-lg uppercase tracking-widest">
                {mod.status}
              </span>
            </div>

            <h3 className="font-bold text-gray-800 text-lg mb-2 leading-tight line-clamp-2">
              {mod.issue_title}
            </h3>

            <p className="text-xs text-gray-400 font-medium">
              Diperbarui: {mod.report_date}
            </p>
          </div>

          <div className="mt-8 flex gap-2">
            <button
              onClick={() => handleOpenEditor(mod)}
              className="flex-1 flex justify-center items-center gap-2 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all text-xs font-bold"
            >
              <Edit size={16} />
              Edit
            </button>

            <button
              onClick={() => handleDeleteClick(mod)}
              className="px-4 py-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all border border-red-100"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      ))}

    </div>

  )}

</div>
        </>
      ) : (
        <div className="flex flex-col h-full space-y-4">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white p-4 rounded-2xl border border-orange-100 shadow-sm gap-4">
            <h1 className="text-xl font-bold text-gray-800">{isEditMode ? 'Edit Pengaduan' : 'Buat Pengaduan Baru'}</h1>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={() => setView('list')} className="flex-1 sm:flex-none px-6 py-2.5 bg-gray-100 text-gray-600 rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">Batal</button>
              <button onClick={handleSave} className="flex-1 sm:flex-none px-6 py-2.5 bg-orange-500 text-white rounded-xl font-bold text-sm hover:bg-orange-600 transition-all shadow-lg shadow-orange-100">Simpan Pengaduan</button>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row gap-6 flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 bg-white rounded-[24px] border border-orange-100 shadow-sm p-4 md:p-6 flex flex-col h-full overflow-y-auto">
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-700 mb-2">Judul Pengaduan</label>
                <input type="text" value={editorTitle} onChange={(e) => setEditorTitle(e.target.value)} placeholder="Contoh: PC Blue Screen..." className="w-full px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none font-bold text-lg transition-all"/>
              </div>


              <div className="flex-1 flex flex-col min-h-[300px]">
                <label className="block text-sm font-bold text-gray-700 mb-2 flex justify-between">
                  <span>Deskripsi kendala</span>
                </label>
                <textarea 
                  value={editorContent} 
                  onChange={(e) => setEditorContent(e.target.value)} 
                  placeholder="Ketik deskripsi kendala yang dialami disini.." 
                  className="w-full flex-1 px-5 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-400 outline-none resize-none font-mono text-sm leading-relaxed"
                ></textarea>
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
        message={`Apakah Anda yakin ingin menghapus Pengaduan? "${selectedMod?.issue_title}"?`}
        confirmText="Ya, Hapus"
        type="danger"
      />
    </div>
  );
};

export default PengaduanHost;
