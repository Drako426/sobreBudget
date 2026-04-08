import { useState, useEffect } from 'react';
import { Plus, CreditCard as Edit2, Trash2 } from 'lucide-react';
import {
  getCategories,
  getTransactions,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../lib/storage';
import { formatCurrency } from '../lib/formatters';
import Layout from '../components/Layout';
import Modal from '../components/Modal';
import { Category } from '../types';

const colors = [
  '#10b981', '#f59e0b', '#8b5cf6', '#3b82f6', '#ef4444',
  '#ec4899', '#06b6d4', '#f97316', '#6b7280', '#14b8a6',
];

export default function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    name: '',
    color: colors[0],
    monthlyBudget: '',
  });

  useEffect(() => {
    loadCategories();
  }, []);

  function loadCategories() {
    const cats = getCategories();
    setCategories(cats);
  }

  function handleOpenModal(category?: Category) {
    if (category) {
      setForm({
        name: category.name,
        color: category.color,
        monthlyBudget: category.monthlyBudget.toString(),
      });
      setEditingId(category.id);
    } else {
      setForm({ name: '', color: colors[0], monthlyBudget: '' });
      setEditingId(null);
    }
    setError('');
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setEditingId(null);
    setError('');
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (!form.name.trim()) {
      setError('El nombre es requerido');
      return;
    }

    const budget = parseFloat(form.monthlyBudget);
    if (!form.monthlyBudget || isNaN(budget) || budget <= 0) {
      setError('El presupuesto debe ser mayor a 0');
      return;
    }

    if (editingId) {
      updateCategory(editingId, {
        name: form.name,
        color: form.color,
        monthlyBudget: budget,
      });
    } else {
      addCategory(form.name, form.color, budget);
    }

    loadCategories();
    handleCloseModal();
  }

  function handleDelete(id: string) {
    const transactions = getTransactions();
    const hasTransactions = transactions.some((t) => t.categoryId === id);

    if (hasTransactions) {
      alert('No puedes eliminar una categoría que tiene transacciones asociadas.');
      return;
    }

    if (confirm('¿Eliminar esta categoría?')) {
      deleteCategory(id);
      loadCategories();
    }
  }

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Categorías</h1>
            <p className="text-slate-500">Gestiona tus categorías de presupuesto</p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus size={18} />
            Nueva
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <div key={cat.id} className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <h3 className="font-semibold text-slate-800">{cat.name}</h3>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleOpenModal(cat)}
                    className="p-1 rounded text-slate-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(cat.id)}
                    className="p-1 rounded text-slate-500 hover:text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
              <p className="text-sm text-slate-600">
                Presupuesto mensual: <span className="font-semibold">{formatCurrency(cat.monthlyBudget)}</span>
              </p>
            </div>
          ))}

          {categories.length === 0 && (
            <div className="col-span-full text-center py-12 text-slate-500">
              No hay categorías. Crea una para comenzar.
            </div>
          )}
        </div>

        <Modal
          title={editingId ? 'Editar categoría' : 'Nueva categoría'}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          size="sm"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Nombre</label>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ej: Alimentación"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Color</label>
              <div className="grid grid-cols-5 gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setForm({ ...form, color })}
                    className={`w-8 h-8 rounded-lg border-2 transition-all ${
                      form.color === color ? 'border-slate-800' : 'border-slate-300'
                    }`}
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Presupuesto mensual</label>
              <input
                type="number"
                step="0.01"
                value={form.monthlyBudget}
                onChange={(e) => setForm({ ...form, monthlyBudget: e.target.value })}
                placeholder="0"
                className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {error}
              </div>
            )}

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
