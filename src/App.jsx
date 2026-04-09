import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import ContactPage from "./pages/ContactPage";
import MainLayout from "./components/layout/MainLayout";
import BerandaHost from "./pages/host/BerandaHost";
import LaporanHost from "./pages/host/LaporanHost";
import BerandaProcurement from "./pages/procurement/BerandaProcurement"; 
import BerandaFinance from "./pages/finance/BerandaFinance";
import PenghasilanFinance from "./pages/finance/PenghasilanFinance";

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
        </Route>
        {/* Dashboard Role: PROCUREMENT */}
        <Route path="/dashboard-procurement" element={<MainLayout />}>
          <Route index element={<BerandaProcurement />} />
        </Route>
         {/* Dashboard Role: Finance */}
        <Route path="/dashboard-finance" element={<MainLayout />}>
          <Route index element={<BerandaFinance />} />
          <Route path="penghasilan" element={<PenghasilanFinance />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
