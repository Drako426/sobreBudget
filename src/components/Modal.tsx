import { ReactNode } from 'react';
import { X } from 'lucide-react';

interface Props {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export default function Modal({ title, isOpen, onClose, children, size = 'md' }: Props) {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className={`relative bg-white rounded-xl shadow-xl ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto`}>
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-lg font-bold text-slate-800">{title}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
          >
            <X size={20} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}
