import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import ContactPage from './pages/ContactPage';
import MainLayout from './components/layout/MainLayout';
import BerandaHost from './pages/host/BerandaHost';
import LaporanHost from './pages/host/LaporanHost';

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
      </Routes>
    </Router>
  );
}

export default App;