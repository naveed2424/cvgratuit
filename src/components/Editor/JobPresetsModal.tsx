import React from 'react';
import { JOB_PRESETS } from '../../data/jobPresets';
import { JobPreset } from '../../types/resume';
import { Sparkles, X, Check, Briefcase } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSelectPreset: (preset: JobPreset) => void;
  currentTitle?: string;
}

export const JobPresetsModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onSelectPreset,
  currentTitle,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-600" />
              <span>Bibliothèque Métiers Pré-remplis</span>
            </div>
            <h2 className="text-base font-bold text-slate-900">
              Choisissez votre métier pour pré-remplir votre CV
            </h2>
            <p className="text-xs text-slate-500">
              Chaque exemple contient des formulations réelles, compétences et réalisations chiffrées approuvées par des recruteurs.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List */}
        <div className="p-5 overflow-y-auto space-y-3 divide-y divide-slate-100">
          {JOB_PRESETS.map((preset) => {
            const isMatch = currentTitle?.toLowerCase().includes(preset.title.toLowerCase());

            return (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectPreset(preset);
                  onClose();
                }}
                className="pt-3 first:pt-0 p-3 rounded-xl hover:bg-blue-50/50 cursor-pointer transition border border-transparent hover:border-blue-200 group flex items-start justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                      {preset.category}
                    </span>
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-700 transition">
                      {preset.title}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {preset.summary}
                  </p>
                  <div className="flex flex-wrap gap-1 pt-1">
                    {preset.skills.slice(0, 4).map((s, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-1.5 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                    {preset.skills.length > 4 && (
                      <span className="text-[10px] text-slate-400">+{preset.skills.length - 4} autres</span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="shrink-0 mt-2 px-3 py-1.5 bg-blue-600 group-hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition"
                >
                  Charger ce modèle
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-between items-center text-xs text-slate-500">
          <span>Vous pourrez modifier librement toutes les rubriques après sélection.</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg border border-slate-300 text-slate-700 hover:bg-white transition"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
