import { Link, useLocation } from 'react-router-dom';
import { BarChart3, DollarSign, Tags, TrendingUp } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const links = [
    { path: '/', label: 'Dashboard', icon: BarChart3 },
    { path: '/transacciones', label: 'Transacciones', icon: DollarSign },
    { path: '/categorias', label: 'Categorías', icon: Tags },
    { path: '/reportes', label: 'Reportes', icon: TrendingUp },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <DollarSign size={18} className="text-white" />
            </div>
            <span className="font-bold text-lg text-slate-800">SobreBudget</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {links.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive(path)
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-slate-600 hover:text-slate-800 hover:bg-slate-50'
                }`}
              >
                <Icon size={16} />
                <span>{label}</span>
              </Link>
            ))}
          </div>

          <div className="md:hidden flex items-center gap-2">
            {links.map(({ path, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`p-2 rounded-lg transition-all ${
                  isActive(path)
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                <Icon size={20} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
