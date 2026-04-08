import { useState, useEffect } from 'react';
import { getCategories, getTransactions } from '../lib/storage';
import { formatCurrency, getCurrentMonthString, getMonthName } from '../lib/formatters';
import { calculateMonthStats, getCategoriesSummary } from '../lib/helpers';
import Layout from '../components/Layout';
import StatCard from '../components/StatCard';
import ProgressBar from '../components/ProgressBar';
import CategoryBadge from '../components/CategoryBadge';

export default function Dashboard() {
  const [month, setMonth] = useState(getCurrentMonthString());
  const [stats, setStats] = useState({ income: 0, expenses: 0, balance: 0, count: 0 });
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    const cats = getCategories();
    const trans = getTransactions();
    const monthStats = calculateMonthStats(trans, month);
    const summaries = getCategoriesSummary(cats, trans).filter(
      (c) => trans.filter((t) => t.categoryId === c.id && t.type === 'expense' && t.date.startsWith(month)).length > 0
    );

    setStats(monthStats);
    setCategories(summaries);
  }, [month]);

  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Dashboard</h1>
          <p className="text-slate-500">Resumen de tu presupuesto</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">Seleccionar mes</label>
          <input
            type="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full sm:w-48 px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-slate-600 text-sm mt-1">{getMonthName(month)}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            label="Ingresos"
            value={formatCurrency(stats.income)}
            icon="📈"
            variant="income"
          />
          <StatCard
            label="Gastos"
            value={formatCurrency(stats.expenses)}
            icon="📉"
            variant="expense"
          />
          <StatCard
            label="Balance"
            value={formatCurrency(stats.balance)}
            icon="💰"
            variant="balance"
          />
        </div>

        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-4">Top Categorías</h2>
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
            {categories.length > 0 ? (
              <div className="divide-y divide-slate-200">
                {categories.map((cat) => (
                  <div key={cat.id} className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <CategoryBadge category={cat} />
                        <div>
                          <p className="text-sm font-medium text-slate-700">
                            {formatCurrency(cat.spent)} / {formatCurrency(cat.monthlyBudget)}
                          </p>
                          <p className="text-xs text-slate-500">
                            Restante: {formatCurrency(cat.remaining)}
                          </p>
                        </div>
                      </div>
                      <span className="text-sm font-bold text-slate-800">{cat.percentage.toFixed(1)}%</span>
                    </div>
                    <ProgressBar percentage={cat.percentage} status={cat.status} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-500">
                Sin gastos en este mes
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
