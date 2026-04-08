import { CategorySummary } from '../types';

interface Props {
  category: CategorySummary;
}

export default function CategoryBadge({ category }: Props) {
  const statusColors = {
    green: 'bg-emerald-100 text-emerald-800',
    yellow: 'bg-yellow-100 text-yellow-800',
    red: 'bg-red-100 text-red-800',
  };

  return (
    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${statusColors[category.status]}`}>
      <span
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: category.color }}
      />
      {category.name}
    </span>
  );
}
