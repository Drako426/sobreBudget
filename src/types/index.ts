export type TransactionType = 'income' | 'expense';

export interface Category {
  id: string;
  name: string;
  color: string;
  monthlyBudget: number;
}

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  categoryId: string;
  date: string;
  note?: string;
}

export interface CategorySummary extends Category {
  spent: number;
  remaining: number;
  percentage: number;
  status: 'green' | 'yellow' | 'red';
}
