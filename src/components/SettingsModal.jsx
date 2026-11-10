import React, { useState } from 'react';
import { 
  Settings, 
  Key, 
  ShieldCheck, 
  Download, 
  Upload, 
  RotateCcw, 
  Check, 
  Lock,
  Flame,
  AlertCircle
} from 'lucide-react';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  apiKeys, 
  setApiKeys, 
  calendarDays, 
  products, 
  onRestoreDefaults 
}) {
  if (!isOpen) return null;

  const [formKeys, setFormKeys] = useState({ ...apiKeys });
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    setApiKeys(formKeys);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  const handleExportFullAgencyBackup = () => {
    const backupData = {
      agency: "JABALÍ 21",
      exportedAt: new Date().toISOString(),
      products,
      calendarDays,
      apiKeysConfigured: Object.keys(apiKeys).filter(k => !!apiKeys[k])
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Jabali21_Agency_Backup_${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-carbon-900 border border-dorado-500/50 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto animate-fadeIn">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-carbon-800 pb-4">
          <div className="flex items-center space-x-2">
            <Settings className="w-5 h-5 text-dorado-400" />
            <h3 className="font-brand text-xl font-bold text-white">
              Configuración & Integración de APIs
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-lg font-bold"
          >
            ✕
          </button>
        </div>

        {savedSuccess && (
          <div className="p-3 rounded-lg bg-olivo-950 border border-olivo-500 text-xs text-olivo-200 flex items-center space-x-2">
            <Check className="w-4 h-4 text-olivo-400" />
            <span>Configuración de APIs guardada correctamente.</span>
          </div>
        )}

        {/* API Keys Configuration */}
        <div className="space-y-4 text-xs">
          <h4 className="font-bold text-dorado-300 uppercase tracking-wider flex items-center space-x-1.5">
            <Key className="w-4 h-4 text-dorado-400" />
            <span>Conectar Herramientas de IA Mediante API</span>
          </h4>
          <p className="text-gray-400">
            Conecte sus claves API para habilitar la generación directa con modelos avanzados en la nube:
          </p>

          <div className="space-y-3">
            <div>
              <label className="block text-gray-300 font-semibold mb-1">
                OpenAI / Google Gemini API Key (Guiones & Copys)
              </label>
              <input
                type="password"
                placeholder="sk-..."
                value={formKeys.openai || ''}
                onChange={(e) => setFormKeys({ ...formKeys, openai: e.target.value })}
                className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2.5 text-white font-mono text-xs focus:border-dorado-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">
                ElevenLabs API Key (Voz en Off en Español Latino de Alta Fidelidad)
              </label>
              <input
                type="password"
                placeholder="xi-api-key-..."
                value={formKeys.elevenlabs || ''}
                onChange={(e) => setFormKeys({ ...formKeys, elevenlabs: e.target.value })}
                className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2.5 text-white font-mono text-xs focus:border-dorado-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">
                Runway / Kling / Pika / Luma API Key (Generación de Video IA)
              </label>
              <input
                type="password"
                placeholder="runway-key-..."
                value={formKeys.runway || ''}
                onChange={(e) => setFormKeys({ ...formKeys, runway: e.target.value })}
                className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2.5 text-white font-mono text-xs focus:border-dorado-500"
              />
            </div>

            <div>
              <label className="block text-gray-300 font-semibold mb-1">
                Replicate / Flux.1 API Key (Generación de Imágenes Cinematográficas)
              </label>
              <input
                type="password"
                placeholder="r8_..."
                value={formKeys.replicate || ''}
                onChange={(e) => setFormKeys({ ...formKeys, replicate: e.target.value })}
                className="w-full bg-carbon-950 border border-carbon-700 rounded-lg p-2.5 text-white font-mono text-xs focus:border-dorado-500"
              />
            </div>
          </div>
        </div>

        {/* Security Guardrails (Strict Enforcement) */}
        <div className="pt-4 border-t border-carbon-800 space-y-3 text-xs">
          <h4 className="font-bold text-olivo-400 uppercase tracking-wider flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-olivo-400" />
            <span>Políticas de Seguridad & Guardrails Obligatorios</span>
          </h4>

          <div className="space-y-2">
            <div className="p-3 rounded-lg bg-carbon-950 border border-carbon-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Aprobación Humana Obligatoria</span>
                <span className="text-gray-400 text-[11px]">
                  Ningún contenido se publicará ni se pautará sin autorización explícita del dueño.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-olivo-900/60 text-olivo-400 border border-olivo-700">
                ACTIVO
              </span>
            </div>

            <div className="p-3 rounded-lg bg-carbon-950 border border-carbon-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Protección Financiera de Pauta</span>
                <span className="text-gray-400 text-[11px]">
                  Bloqueo total de cargos o gastos publicitarios automáticos.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-olivo-900/60 text-olivo-400 border border-olivo-700">
                BLOQUEADO $0
              </span>
            </div>

            <div className="p-3 rounded-lg bg-carbon-950 border border-carbon-800 flex items-center justify-between">
              <div>
                <span className="font-semibold text-white block">Transparencia en Producción Audiovisual</span>
                <span className="text-gray-400 text-[11px]">
                  No simular video renderizado cuando solo exista el guion o imagen.
                </span>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-olivo-900/60 text-olivo-400 border border-olivo-700">
                GARANTIZADO
              </span>
            </div>
          </div>
        </div>

        {/* Backup & Restore */}
        <div className="pt-4 border-t border-carbon-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={handleExportFullAgencyBackup}
            className="flex items-center space-x-1.5 px-3 py-2 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-dorado-300 font-semibold border border-carbon-700"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Descargar Copia de Seguridad JSON</span>
          </button>

          <button
            onClick={() => {
              if (confirm("¿Deseas restaurar la campaña de 30 días y el catálogo a sus valores originales?")) {
                onRestoreDefaults();
                onClose();
              }
            }}
            className="flex items-center space-x-1 text-gray-500 hover:text-brasa-400 text-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restablecer Campaña Predeterminada</span>
          </button>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end space-x-3 pt-4 border-t border-carbon-800">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-carbon-800 hover:bg-carbon-700 text-gray-300 text-xs font-semibold"
          >
            Cerrar
          </button>
          <button
            onClick={handleSave}
            className="px-5 py-2 rounded-lg bg-dorado-500 hover:bg-dorado-400 text-carbon-950 text-xs font-bold shadow-lg"
          >
            Guardar Ajustes
          </button>
        </div>
      </div>
    </div>
  );
}
