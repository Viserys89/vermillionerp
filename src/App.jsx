import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import MainLayout from "./components/layout/MainLayout";
import BerandaHost from "./pages/host/BerandaHost";
import LaporanHost from "./pages/host/LaporanHost";
import BerandaProcurement from "./pages/procurement/BerandaProcurement"; 
import BerandaFinance from "./pages/finance/BerandaFinance";
import PenghasilanFinance from "./pages/finance/PenghasilanFinance";
import ProfilePage from "./pages/ProfilePage";
import ContactRole from "./pages/ContactRole";
import HRDashboard from './pages/hr/HRDashboard';
import HRKaryawan from './pages/hr/HRKaryawan';
import HRIzin from './pages/hr/HRIzin';
import HRLaporan from './pages/hr/HRLaporan';
import TechLayout from './components/layout/TechLayout';
import TechDashboard from './pages/technician/TechDasboard';
import TechKendala from './pages/technician/TechKendala';
import TechModul from './pages/technician/TechModul';
import HRLayout from './components/layout/HRLayout';


function App() {
  return (
    <Router>
      <Routes>
        {/* Halaman tanpa Sidebar */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/contact" element={<ContactPage />} />
        {/* Dashboard Role: HOST */}
        <Route path="/dashboard-host" element={<MainLayout />}>
          <Route index element={<BerandaHost />} />
          <Route path="laporan" element={<LaporanHost />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="contact" element={<ContactRole />} />
        </Route>
        {/* Dashboard Role: PROCUREMENT */}
        <Route path="/dashboard-procurement" element={<MainLayout />}>
          <Route index element={<BerandaProcurement />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="contact" element={<ContactRole />} />
        </Route>
         {/* Dashboard Role: Finance */}
        <Route path="/dashboard-finance" element={<MainLayout />}>
          <Route index element={<BerandaFinance />} />
          <Route path="penghasilan" element={<PenghasilanFinance />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="contact" element={<ContactRole />} />
        </Route>

        <Route path="/dashboard-hr" element={<HRLayout />}>
          <Route index element={<HRDashboard />} /> 
          <Route path="karyawan" element={<HRKaryawan />} /> 
          <Route path="izin" element={<HRIzin />} /> 
          <Route path="laporan" element={<HRLaporan />} /> 
          <Route path="contact" element={<ContactRole />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
        <Route path="/dashboard-tech" element={<TechLayout />}>
          <Route index element={<TechDashboard />} />
          <Route path="kendala" element={<TechKendala />} />
          <Route path="modul" element={<TechModul />} />
          <Route path="contact" element={<ContactRole />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
