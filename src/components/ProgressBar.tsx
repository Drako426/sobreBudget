interface Props {
  percentage: number;
  status: 'green' | 'yellow' | 'red';
}

export default function ProgressBar({ percentage, status }: Props) {
  const colors = {
    green: 'bg-emerald-500',
    yellow: 'bg-yellow-500',
    red: 'bg-red-500',
  };

  const bgColors = {
    green: 'bg-emerald-100',
    yellow: 'bg-yellow-100',
    red: 'bg-red-100',
  };

  return (
    <div className={`w-full h-2 rounded-full ${bgColors[status]} overflow-hidden`}>
      <div
        className={`h-full ${colors[status]} transition-all`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
}
