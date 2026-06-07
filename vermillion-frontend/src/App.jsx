import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// main
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import MainLayout from "./components/layout/MainLayout";
import ProfilePage from "./pages/ProfilePage";
import ContactRole from "./pages/ContactRole";
// Host
import BerandaHost from "./pages/host/BerandaHost";
import LaporanHost from "./pages/host/LaporanHost";
import IzinHost from "./pages/host/IzinHost";
import PengaduanHost from "./pages/host/PengaduanHost";
import RequestHost from "./pages/host/RequestHost";
// HR
import HRDashboard from './pages/hr/HRDashboard';
import HRKaryawan from './pages/hr/HRKaryawan';
import HRIzin from './pages/hr/HRIzin';
import HRLaporan from './pages/hr/HRLaporan';
import HRLayout from './components/layout/HRLayout';
// Finance
import BerandaFinance from "./pages/finance/BerandaFinance";
import PenghasilanFinance from "./pages/finance/PenghasilanFinance";

//postponed
// import BerandaProcurement from "./pages/procurement/BerandaProcurement"; 
// import TechLayout from './components/layout/TechLayout';
// import TechDashboard from './pages/technician/TechDasboard';
// import TechKendala from './pages/technician/TechKendala';
// import TechModul from './pages/technician/TechModul';
// import PerformanceLayout from './components/layout/PerformanceLayout';
// import PerformanceDashboard from './pages/performance/PerformanceDashboard';
// import TeamTargetPage from './pages/performance/TeamTargetPage';
// import HostPerformancePage from './pages/performance/HostPerformancePage';
// import RedMarkPage from './pages/performance/RedMarkPage';
// import HostDetailPage from './pages/performance/HostDetailPage';
// import LeaderboardPage from './pages/performance/LeaderboardPage';

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
          <Route path="izin" element={<IzinHost />} />
          <Route path="pengaduan" element={<PengaduanHost />} />
          <Route path="request" element={<RequestHost />} />
        </Route>
        
         {/* Dashboard Role: Finance */}
        <Route path="/dashboard-finance" element={<MainLayout />}>
          <Route index element={<BerandaFinance />} />
          <Route path="penghasilan" element={<PenghasilanFinance />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="contact" element={<ContactRole />} />
        </Route>

        {/* Dashboard Role: HR */}
        <Route path="/dashboard-hr" element={<HRLayout />}>
          <Route index element={<HRDashboard />} /> 
          <Route path="karyawan" element={<HRKaryawan />} /> 
          <Route path="izin" element={<HRIzin />} /> 
          <Route path="laporan" element={<HRLaporan />} /> 
          <Route path="contact" element={<ContactRole />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>

        {/* Dashboard Role: Technician */}
        {/* <Route path="/dashboard-tech" element={<TechLayout />}>
          <Route index element={<TechDashboard />} />
          <Route path="kendala" element={<TechKendala />} />
          <Route path="modul" element={<TechModul />} />
          <Route path="contact" element={<ContactRole />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route> */}
        {/* Dashboard Role: Performance */}
        {/* <Route path="/dashboard-performance" element={<PerformanceLayout />}>
          <Route index element={<PerformanceDashboard />} />
          <Route path="targets" element={<TeamTargetPage />} />
          <Route path="hosts" element={<HostPerformancePage />} />
          <Route path="hosts/:hostId" element={<HostDetailPage />} />
          <Route path="red-marks" element={<RedMarkPage />} />
          <Route path="leaderboard" element={<LeaderboardPage />} />
          <Route path="contact" element={<ContactRole />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route> */}
        {/* Dashboard Role: PROCUREMENT */}
        {/* <Route path="/dashboard-procurement" element={<MainLayout />}>
          <Route index element={<BerandaProcurement />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="contact" element={<ContactRole />} />
        </Route> */}
      </Routes>
    </Router>
  );
}

export default App;
