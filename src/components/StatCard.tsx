import { ReactNode } from 'react';

interface Props {
  label: string;
  value: string;
  icon?: ReactNode;
  variant?: 'default' | 'income' | 'expense' | 'balance';
}

export default function StatCard({ label, value, icon, variant = 'default' }: Props) {
  const variantStyles = {
    default: 'bg-white border-slate-200',
    income: 'bg-emerald-50 border-emerald-200',
    expense: 'bg-red-50 border-red-200',
    balance: 'bg-blue-50 border-blue-200',
  };

  const textStyles = {
    default: 'text-slate-700',
    income: 'text-emerald-700',
    expense: 'text-red-700',
    balance: 'text-blue-700',
  };

  return (
    <div className={`border rounded-xl p-6 ${variantStyles[variant]}`}>
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500 mb-1">{label}</p>
          <p className={`text-2xl font-bold ${textStyles[variant]}`}>{value}</p>
        </div>
        {icon && <div className="text-3xl">{icon}</div>}
      </div>
    </div>
  );
}
