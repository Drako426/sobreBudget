import { Category, Transaction } from '../types';

const VERSION = 'v1';
const CATEGORIES_KEY = `sobrebudget:${VERSION}:categories`;
const TRANSACTIONS_KEY = `sobrebudget:${VERSION}:transactions`;

function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getCategories(): Category[] {
  const data = localStorage.getItem(CATEGORIES_KEY);
  return data ? JSON.parse(data) : [];
}

export function setCategories(categories: Category[]): void {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export function getTransactions(): Transaction[] {
  const data = localStorage.getItem(TRANSACTIONS_KEY);
  return data ? JSON.parse(data) : [];
}

export function setTransactions(transactions: Transaction[]): void {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
}

export function addCategory(
  name: string,
  color: string,
  monthlyBudget: number
): Category {
  const category: Category = {
    id: generateId(),
    name,
    color,
    monthlyBudget,
  };
  const categories = getCategories();
  categories.push(category);
  setCategories(categories);
  return category;
}

export function updateCategory(id: string, updates: Partial<Category>): Category | null {
  const categories = getCategories();
  const index = categories.findIndex((c) => c.id === id);
  if (index === -1) return null;
  categories[index] = { ...categories[index], ...updates };
  setCategories(categories);
  return categories[index];
}

export function deleteCategory(id: string): boolean {
  const transactions = getTransactions();
  if (transactions.some((t) => t.categoryId === id)) {
    return false;
  }
  const categories = getCategories();
  const filtered = categories.filter((c) => c.id !== id);
  setCategories(filtered);
  return true;
}

export function addTransaction(
  type: 'income' | 'expense',
  amount: number,
  categoryId: string,
  date: string,
  note?: string
): Transaction {
  const transaction: Transaction = {
    id: generateId(),
    type,
    amount,
    categoryId,
    date,
    note,
  };
  const transactions = getTransactions();
  transactions.push(transaction);
  setTransactions(transactions);
  return transaction;
}

export function updateTransaction(
  id: string,
  updates: Partial<Transaction>
): Transaction | null {
  const transactions = getTransactions();
  const index = transactions.findIndex((t) => t.id === id);
  if (index === -1) return null;
  transactions[index] = { ...transactions[index], ...updates };
  setTransactions(transactions);
  return transactions[index];
}

export function deleteTransaction(id: string): boolean {
  const transactions = getTransactions();
  const filtered = transactions.filter((t) => t.id !== id);
  setTransactions(filtered);
  return true;
}

export function exportData(): string {
  return JSON.stringify(
    {
      categories: getCategories(),
      transactions: getTransactions(),
    },
    null,
    2
  );
}

export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    if (data.categories && Array.isArray(data.categories)) {
      setCategories(data.categories);
    }
    if (data.transactions && Array.isArray(data.transactions)) {
      setTransactions(data.transactions);
    }
    return true;
  } catch {
    return false;
  }
}

export function resetData(): void {
  localStorage.removeItem(CATEGORIES_KEY);
  localStorage.removeItem(TRANSACTIONS_KEY);
}

export function hasData(): boolean {
  return Boolean(localStorage.getItem(CATEGORIES_KEY) || localStorage.getItem(TRANSACTIONS_KEY));
}

export function initializeDefaultData(): void {
  if (hasData()) return;

  const defaultCategories: Category[] = [
    { id: generateId(), name: 'Alimentación', color: '#10b981', monthlyBudget: 800000 },
    { id: generateId(), name: 'Transporte', color: '#f59e0b', monthlyBudget: 300000 },
    { id: generateId(), name: 'Entretenimiento', color: '#8b5cf6', monthlyBudget: 200000 },
    { id: generateId(), name: 'Servicios', color: '#3b82f6', monthlyBudget: 400000 },
    { id: generateId(), name: 'Salud', color: '#ef4444', monthlyBudget: 500000 },
    { id: generateId(), name: 'Otros', color: '#6b7280', monthlyBudget: 300000 },
  ];

  const today = new Date();
  const currentMonth = today.toISOString().split('T')[0].slice(0, 7);

  const defaultTransactions: Transaction[] = [
    {
      id: generateId(),
      type: 'income',
      amount: 4000000,
      categoryId: defaultCategories[4].id,
      date: `${currentMonth}-01`,
      note: 'Salario',
    },
    {
      id: generateId(),
      type: 'expense',
      amount: 150000,
      categoryId: defaultCategories[0].id,
      date: `${currentMonth}-05`,
      note: 'Supermercado',
    },
    {
      id: generateId(),
      type: 'expense',
      amount: 45000,
      categoryId: defaultCategories[1].id,
      date: `${currentMonth}-06`,
      note: 'Uber',
    },
    {
      id: generateId(),
      type: 'expense',
      amount: 80000,
      categoryId: defaultCategories[0].id,
      date: `${currentMonth}-08`,
      note: 'Restaurante',
    },
    {
      id: generateId(),
      type: 'expense',
      amount: 50000,
      categoryId: defaultCategories[2].id,
      date: `${currentMonth}-10`,
      note: 'Cine',
    },
    {
      id: generateId(),
      type: 'expense',
      amount: 120000,
      categoryId: defaultCategories[3].id,
      date: `${currentMonth}-12`,
      note: 'Internet',
    },
    {
      id: generateId(),
      type: 'expense',
      amount: 200000,
      categoryId: defaultCategories[0].id,
      date: `${currentMonth}-15`,
      note: 'Mercado semanal',
    },
    {
      id: generateId(),
      type: 'expense',
      amount: 60000,
      categoryId: defaultCategories[4].id,
      date: `${currentMonth}-18`,
      note: 'Farmacia',
    },
  ];

  setCategories(defaultCategories);
  setTransactions(defaultTransactions);
}
