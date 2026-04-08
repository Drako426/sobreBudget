import { Category, CategorySummary, Transaction } from '../types';

export function calculateCategorySummary(
  category: Category,
  transactions: Transaction[]
): CategorySummary {
  const spent = transactions
    .filter(
      (t) =>
        t.categoryId === category.id &&
        t.type === 'expense'
    )
    .reduce((sum, t) => sum + t.amount, 0);

  const remaining = category.monthlyBudget - spent;
  const percentage = (spent / category.monthlyBudget) * 100;

  let status: 'green' | 'yellow' | 'red';
  if (percentage <= 70) {
    status = 'green';
  } else if (percentage <= 100) {
    status = 'yellow';
  } else {
    status = 'red';
  }

  return {
    ...category,
    spent,
    remaining,
    percentage: Math.min(percentage, 100),
    status,
  };
}

export function getCategoriesSummary(
  categories: Category[],
  transactions: Transaction[]
): CategorySummary[] {
  return categories.map((cat) =>
    calculateCategorySummary(cat, transactions)
  );
}

export function calculateMonthStats(transactions: Transaction[], monthStr: string) {
  const monthTransactions = transactions.filter((t) => t.date.startsWith(monthStr));

  const income = monthTransactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);

  const expenses = monthTransactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expenses;

  return { income, expenses, balance, count: monthTransactions.length };
}

export function getExpensesByDay(transactions: Transaction[], monthStr: string) {
  const monthTransactions = transactions.filter(
    (t) => t.type === 'expense' && t.date.startsWith(monthStr)
  );

  const byDay: Record<string, number> = {};
  monthTransactions.forEach((t) => {
    const day = parseInt(t.date.split('-')[2]);
    byDay[day] = (byDay[day] || 0) + t.amount;
  });

  return Array.from({ length: 31 }, (_, i) => ({
    day: i + 1,
    amount: byDay[i + 1] || 0,
  })).filter((d) => d.amount > 0 || d.day <= 28);
}

export function getExpensesByCategory(
  categories: Category[],
  transactions: Transaction[],
  monthStr: string
) {
  const monthTransactions = transactions.filter(
    (t) => t.type === 'expense' && t.date.startsWith(monthStr)
  );

  return categories.map((cat) => {
    const amount = monthTransactions
      .filter((t) => t.categoryId === cat.id)
      .reduce((sum, t) => sum + t.amount, 0);

    return {
      name: cat.name,
      value: amount,
      color: cat.color,
    };
  }).filter((d) => d.value > 0);
}

export function getAverageDailyExpense(
  transactions: Transaction[],
  monthStr: string
): number {
  const monthTransactions = transactions.filter(
    (t) => t.type === 'expense' && t.date.startsWith(monthStr)
  );

  const total = monthTransactions.reduce((sum, t) => sum + t.amount, 0);
  const daysWithExpenses = new Set(monthTransactions.map((t) => t.date)).size;

  return daysWithExpenses > 0 ? Math.round(total / daysWithExpenses) : 0;
}
