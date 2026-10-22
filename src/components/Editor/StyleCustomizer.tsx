import React from 'react';
import { StyleOptions, TemplateId, FontFamily } from '../../types/resume';
import { TEMPLATES, COLOR_PALETTES, FONT_OPTIONS } from '../../data/templates';
import { Palette, Check, Type, Layout } from 'lucide-react';

interface Props {
  style: StyleOptions;
  onChange: (updated: StyleOptions) => void;
}

export const StyleCustomizer: React.FC<Props> = ({ style, onChange }) => {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Palette className="w-5 h-5 text-blue-600" />
          <span>Personnalisation du style & Modèles</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Sélectionnez un modèle de CV, votre couleur dominante et la typographie souhaitée.
        </p>
      </div>

      {/* Choix du Modèle */}
      <div className="space-y-3">
        <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Layout className="w-4 h-4 text-blue-600" />
          <span>Modèles professionnels de CV (100% gratuits)</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {TEMPLATES.map((tmpl) => {
            const isSelected = style.template === tmpl.id;

            return (
              <div
                key={tmpl.id}
                onClick={() => onChange({ ...style, template: tmpl.id })}
                className={`p-3.5 rounded-xl border-2 cursor-pointer transition relative flex flex-col justify-between ${
                  isSelected
                    ? 'border-blue-600 bg-blue-50/40 shadow-xs'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-slate-900">{tmpl.name}</span>
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-100 px-2 py-0.5 rounded-full">
                      {tmpl.badge}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 line-clamp-2">
                    {tmpl.description}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-3 h-3 rounded-full ${tmpl.previewBg}`}></span>
                    <span className="text-[10px] text-slate-400">Recommandé pour : {tmpl.recommendedFor[0]}</span>
                  </div>
                  {isSelected && (
                    <span className="w-4 h-4 rounded-full bg-blue-600 text-white flex items-center justify-center">
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Palette de Couleurs */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
        <label className="block text-xs font-bold text-slate-800">
          Couleur principale d'accentuation
        </label>

        <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
          {COLOR_PALETTES.map((color) => {
            const isSelected = style.primaryColor === color.hex;

            return (
              <button
                key={color.hex}
                type="button"
                onClick={() => onChange({ ...style, primaryColor: color.hex, accentLight: color.light })}
                className={`flex flex-col items-center gap-1.5 p-2 rounded-lg border transition ${
                  isSelected ? 'border-slate-900 bg-slate-50 ring-2 ring-blue-500/30' : 'border-slate-200 hover:bg-slate-50'
                }`}
                title={color.name}
              >
                <span
                  className="w-7 h-7 rounded-full shadow-2xs flex items-center justify-center text-white"
                  style={{ backgroundColor: color.hex }}
                >
                  {isSelected && <Check className="w-4 h-4" />}
                </span>
                <span className="text-[10px] font-medium text-slate-600 truncate w-full text-center">
                  {color.name.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Typographie */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
        <label className="block text-xs font-bold text-slate-800 flex items-center gap-1.5">
          <Type className="w-4 h-4 text-blue-600" />
          <span>Police de caractères</span>
        </label>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {FONT_OPTIONS.map((f) => {
            const isSelected = style.fontFamily === f.id;

            return (
              <div
                key={f.id}
                onClick={() => onChange({ ...style, fontFamily: f.id })}
                className={`p-3 rounded-lg border cursor-pointer transition flex items-center justify-between ${
                  isSelected ? 'border-blue-600 bg-blue-50/50' : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className={`text-xs font-bold text-slate-900 ${f.fontClass}`}>
                    {f.name}
                  </div>
                  <div className="text-[10px] text-slate-500">{f.desc}</div>
                </div>
                {isSelected && <Check className="w-4 h-4 text-blue-600" />}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
