import { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';
import {
  getCategories,
  getTransactions,
  addTransaction,
  updateTransaction,
  deleteTransaction,
} from '../lib/storage';
import { formatCurrency, formatShortDate, getCurrentMonthString } from '../lib/formatters';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { Transaction } from '../types';

export default function Transactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [month, setMonth] = useState(getCurrentMonthString());
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [form, setForm] = useState({
    type: 'expense' as 'income' | 'expense',
    amount: '',
    categoryId: '',
    date: new Date().toISOString().split('T')[0],
    note: '',
  });

  useEffect(() => {
    const cats = getCategories();
    setCategories(cats);
    setForm((f) => ({ ...f, categoryId: cats[0]?.id || '' }));
    loadTransactions();
  }, []);

  useEffect(() => {
    loadTransactions();
  }, [month, categoryFilter, search]);

  function loadTransactions() {
    let trans = getTransactions();

    if (month) {
      trans = trans.filter((t) => t.date.startsWith(month));
    }

    if (categoryFilter !== 'all') {
      trans = trans.filter((t) => t.categoryId === categoryFilter);
    }

    if (search) {
      trans = trans.filter((t) =>
        t.note?.toLowerCase().includes(search.toLowerCase())
      );
    }

    trans.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    setTransactions(trans);
  }

  function handleOpenModal(transaction?: Transaction) {
    if (transaction) {
      setForm({
        type: transaction.type,
        amount: transaction.amount.toString(),
        categoryId: transaction.categoryId,
        date: transaction.date,
        note: transaction.note || '',
      });
      setEditingId(transaction.id);
    } else {
      setForm({
        type: 'expense',
        amount: '',
        categoryId: categories[0]?.id || '',
        date: new Date().toISOString().split('T')[0],
        note: '',
      });
      setEditingId(null);
    }
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingId(null);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const amount = parseFloat(form.amount);
    if (!form.amount || isNaN(amount) || amount <= 0) {
      alert('El monto debe ser mayor a 0');
      return;
    }

    if (!form.date) {
      alert('La fecha es requerida');
      return;
    }

    if (!form.categoryId) {
      alert('La categoría es requerida');
      return;
    }

    if (editingId) {
      updateTransaction(editingId, {
        type: form.type,
        amount,
        categoryId: form.categoryId,
        date: form.date,
        note: form.note || undefined,
      });
    } else {
      addTransaction(
        form.type,
        amount,
        form.categoryId,
        form.date,
        form.note || undefined
      );
    }

    loadTransactions();
    handleCloseModal();
  }

  function handleDelete(id: string) {
    if (confirm('¿Eliminar esta transacción?')) {
      deleteTransaction(id);
      loadTransactions();
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Transacciones</h1>
            <p className="text-slate-500">Gestiona tus ingresos y gastos</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Nueva
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Mes</label>
            <input
              type="month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Categoría</label>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">Todas</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-slate-700 mb-2">Buscar nota</label>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar..."
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
          {transactions.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b border-slate-200 bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Fecha</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Categoría</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700">Nota</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Monto</th>
                    <th className="px-4 py-3 text-right text-sm font-semibold text-slate-700">Acciones</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {transactions.map((t) => {
                    const cat = categories.find((c) => c.id === t.categoryId);
                    return (
                      <tr key={t.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-4 py-3 text-sm text-slate-800">{formatShortDate(t.date)}</td>
                        <td className="px-4 py-3 text-sm">
                          <span
                            className="inline-block w-2 h-2 rounded-full mr-2"
                            style={{ backgroundColor: cat?.color }}
                          />
                          {cat?.name}
                        </td>
                        <td className="px-4 py-3 text-sm text-slate-600">{t.note || '—'}</td>
                        <td className={`px-4 py-3 text-sm font-semibold text-right ${t.type === 'income' ? 'text-emerald-600' : 'text-red-600'}`}>
                          {t.type === 'income' ? '+' : '−'} {formatCurrency(t.amount)}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => handleOpenModal(t)}
                            className="p-1 rounded text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => handleDelete(t.id)}
                            className="p-1 rounded text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500">
              No hay transacciones
            </div>
          )}
        </div>

        <Modal
          title={editingId ? 'Editar transacción' : 'Nueva transacción'}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          size="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tipo</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm({ ...form, type: e.target.value as 'income' | 'expense' })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="expense">Gasto</option>
                  <option value="income">Ingreso</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Monto</label>
                <input
                  type="number"
                  step="0.01"
                  value={form.amount}
                  onChange={(e) => setForm({ ...form, amount: e.target.value })}
                  placeholder="0"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Categoría</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Fecha</label>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nota (opcional)</label>
              <input
                type="text"
                value={form.note}
                onChange={(e) => setForm({ ...form, note: e.target.value })}
                placeholder="Descripción"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCloseModal}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                {editingId ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </form>
        </Modal>
      </div>
    </Layout>
  );
}
