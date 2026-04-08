import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { getCategories, getTransactions } from '../lib/storage';
import { formatCurrency, getCurrentMonthString, getMonthName } from '../lib/formatters';
import { getExpensesByCategory, getExpensesByDay, getAverageDailyExpense } from '../lib/helpers';
import Layout from '../components/Layout';

export default function Reports() {
  const [month, setMonth] = useState(getCurrentMonthString());
  const [pieData, setPieData] = useState<any[]>([]);
  const [lineData, setLineData] = useState<any[]>([]);
  const [stats, setStats] = useState({ count: 0, avgDaily: 0 });

  useEffect(() => {
    const cats = getCategories();
    const trans = getTransactions();

    const pie = getExpensesByCategory(cats, trans, month);
    setPieData(pie);

    const line = getExpensesByDay(trans, month).map((d) => ({
      ...d,
      day: `${d.day}`,
    }));
    setLineData(line);

    const avgDaily = getAverageDailyExpense(trans, month);
    const count = trans.filter((t) => t.date.startsWith(month)).length;

    setStats({ count, avgDaily });
  }, [month]);


  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Reportes</h1>
          <p className="text-slate-500">Análisis detallado de tus gastos</p>
        </div>

        <div className="flex items-center gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mes</label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="pt-6">
            <p className="text-slate-600 font-medium">{getMonthName(month)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-sm text-slate-600 mb-1">Transacciones</p>
            <p className="text-3xl font-bold text-slate-800">{stats.count}</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-xl p-4">
            <p className="text-sm text-slate-600 mb-1">Gasto promedio por día</p>
            <p className="text-3xl font-bold text-slate-800">{formatCurrency(stats.avgDaily)}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Distribución por categoría</h2>
            {pieData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent = 0 }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value as number)} />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-slate-500">
                Sin datos
              </div>
            )}
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-4">Gastos por día</h2>
            {lineData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="day" stroke="#94a3b8" />
                  <YAxis stroke="#94a3b8" />
                  <Tooltip
                    formatter={(value) => formatCurrency(value as number)}
                    contentStyle={{ backgroundColor: '#f8fafc', borderRadius: '8px' }}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="amount"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6' }}
                    name="Gasto diario"
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-64 flex items-center justify-center text-slate-500">
                Sin datos
              </div>
            )}
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="text-lg font-bold text-blue-900 mb-2">Detalles del mes</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-blue-700">Total de transacciones</p>
              <p className="text-2xl font-bold text-blue-900">{stats.count}</p>
            </div>
            <div>
              <p className="text-sm text-blue-700">Gasto promedio/día</p>
              <p className="text-2xl font-bold text-blue-900">{formatCurrency(stats.avgDaily)}</p>
            </div>
            <div>
              <p className="text-sm text-blue-700">Total categorías</p>
              <p className="text-2xl font-bold text-blue-900">{pieData.length}</p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
