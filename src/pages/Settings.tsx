import { useRef, useState } from 'react';
import { Download, Upload, RotateCcw } from 'lucide-react';
import { exportData, importData, resetData } from '../lib/storage';
import Layout from '../components/Layout';
import Modal from '../components/Modal';

export default function Settings() {
  const [importModal, setImportModal] = useState(false);
  const [importJson, setImportJson] = useState('');
  const [importError, setImportError] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    const data = exportData();
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sobrebudget-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportClick() {
    fileInputRef.current?.click();
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        setImportJson(content);
        setImportError('');
        setImportModal(true);
      } catch {
        setImportError('Error al leer el archivo');
      }
    };
    reader.readAsText(file);
  }

  function handleImportConfirm() {
    if (!importJson.trim()) {
      setImportError('JSON vacío');
      return;
    }

    if (importData(importJson)) {
      alert('Datos importados correctamente');
      setImportModal(false);
      setImportJson('');
      setImportError('');
      window.location.reload();
    } else {
      setImportError('JSON inválido');
    }
  }

  function handleReset() {
    if (confirm('¿Estás seguro? Esto eliminará todos los datos permanentemente.')) {
      resetData();
      alert('Datos eliminados');
      window.location.reload();
    }
  }

  return (
    <Layout>
      <div className="max-w-2xl space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Configuración</h1>
          <p className="text-slate-500">Gestiona tus datos</p>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">Exportar datos</h3>
              <p className="text-sm text-slate-500 mt-1">Descarga un archivo JSON con todas tus categorías y transacciones</p>
            </div>
            <button
              onClick={handleExport}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
            >
              <Download size={18} />
              Exportar
            </button>
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">Importar datos</h3>
              <p className="text-sm text-slate-500 mt-1">Carga un archivo JSON exportado previamente</p>
            </div>
            <button
              onClick={handleImportClick}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Upload size={18} />
              Importar
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-semibold text-slate-800">Resetear datos</h3>
              <p className="text-sm text-slate-500 mt-1">Elimina todos tus datos y reinicia la aplicación</p>
            </div>
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <RotateCcw size={18} />
              Resetear
            </button>
          </div>
        </div>

        <Modal
          title="Confirmar importación"
          isOpen={importModal}
          onClose={() => setImportModal(false)}
          size="md"
        >
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">JSON a importar</label>
              <textarea
                value={importJson}
                onChange={(e) => setImportJson(e.target.value)}
                className="w-full h-48 px-3 py-2 border border-slate-300 rounded-lg font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            {importError && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {importError}
              </div>
            )}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setImportModal(false)}
                className="flex-1 px-4 py-2 border border-slate-300 rounded-lg text-slate-700 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleImportConfirm}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Importar
              </button>
            </div>
          </div>
        </Modal>
      </div>
    </Layout>
  );
}
