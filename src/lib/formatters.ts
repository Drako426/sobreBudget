export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatShortDate(dateStr: string): string {
  const [year, month, day] = dateStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  return date.toLocaleDateString('es-CO', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  });
}

export function getTodayString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0];
}

export function getCurrentMonthString(): string {
  const today = new Date();
  return today.toISOString().split('T')[0].slice(0, 7);
}

export function getMonthName(monthStr: string): string {
  const [year, month] = monthStr.split('-');
  const date = new Date(parseInt(year), parseInt(month) - 1);
  return date.toLocaleDateString('es-CO', { year: 'numeric', month: 'long' });
}

export function getTransactionsForMonth(
  transactions: any[],
  monthStr: string
): any[] {
  return transactions.filter((t) => t.date.startsWith(monthStr));
}

export function getDayOfMonth(dateStr: string): number {
  const [, , day] = dateStr.split('-');
  return parseInt(day);
}
