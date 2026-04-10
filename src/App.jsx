import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import MainLayout from './components/layout/MainLayout';
import HRLayout from './components/layout/HRLayout';
import BerandaHost from './pages/host/BerandaHost';
import LaporanHost from './pages/host/LaporanHost';
import HRDashboard from './pages/hr/HRDashboard';
import HRKaryawan from './pages/hr/HRKaryawan';
import HRIzin from './pages/hr/HRIzin';
import HRLaporan from './pages/hr/HRLaporan';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route path="/dashboard-host" element={<MainLayout />}>
          <Route index element={<BerandaHost />} /> 
          <Route path="laporan" element={<LaporanHost />} /> 
        </Route>

        <Route path="/dashboard-hr" element={<HRLayout />}>
          <Route index element={<HRDashboard />} /> 
          <Route path="karyawan" element={<HRKaryawan />} /> 
          <Route path="izin" element={<HRIzin />} /> 
          <Route path="laporan" element={<HRLaporan />} /> 
        </Route>
      </Routes>
    </Router>
  );
}

export default App;