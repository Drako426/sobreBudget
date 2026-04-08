import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { initializeDefaultData } from './lib/storage';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Categories from './pages/Categories';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

export default function App() {
  useEffect(() => {
    initializeDefaultData();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/transacciones" element={<Transactions />} />
        <Route path="/categorias" element={<Categories />} />
        <Route path="/reportes" element={<Reports />} />
        <Route path="/configuracion" element={<Settings />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
