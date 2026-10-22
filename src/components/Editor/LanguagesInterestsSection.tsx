import React, { useState } from 'react';
import { LanguageItem } from '../../types/resume';
import { Languages, Heart, Plus, Trash2, X } from 'lucide-react';

interface Props {
  languages: LanguageItem[];
  interests: string[];
  onChangeLanguages: (languages: LanguageItem[]) => void;
  onChangeInterests: (interests: string[]) => void;
}

const CEFR_LEVELS = [
  'Langue maternelle',
  'Bilingue (C2)',
  'Courant professionnel (C1)',
  'Intermédiaire supérieur (B2)',
  'Intermédiaire (B1)',
  'Élémentaire / Notions (A2)'
];

export const LanguagesInterestsSection: React.FC<Props> = ({
  languages,
  interests,
  onChangeLanguages,
  onChangeInterests,
}) => {
  const [interestInput, setInterestInput] = useState('');

  const handleAddLanguage = () => {
    onChangeLanguages([
      ...languages,
      { id: `lang-${Date.now()}`, language: 'Espagnol', level: 'Intermédiaire (B1)' }
    ]);
  };

  const handleUpdateLanguage = (id: string, updates: Partial<LanguageItem>) => {
    onChangeLanguages(languages.map(l => l.id === id ? { ...l, ...updates } : l));
  };

  const handleDeleteLanguage = (id: string) => {
    onChangeLanguages(languages.filter(l => l.id !== id));
  };

  const handleAddInterest = () => {
    const text = interestInput.trim();
    if (text && !interests.includes(text)) {
      onChangeInterests([...interests, text]);
      setInterestInput('');
    }
  };

  const handleRemoveInterest = (item: string) => {
    onChangeInterests(interests.filter(i => i !== item));
  };

  return (
    <div className="space-y-6">
      {/* Langues */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-4 shadow-2xs">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Languages className="w-5 h-5 text-blue-600" />
            <span>Langues vivantes (Standard CECRL)</span>
          </h2>
          <button
            type="button"
            onClick={handleAddLanguage}
            className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter une langue</span>
          </button>
        </div>

        <div className="space-y-3">
          {languages.map((l) => (
            <div key={l.id} className="flex items-center gap-2">
              <input
                type="text"
                value={l.language}
                onChange={(e) => handleUpdateLanguage(l.id, { language: e.target.value })}
                placeholder="Ex : Anglais, Espagnol..."
                className="w-1/2 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <select
                value={l.level}
                onChange={(e) => handleUpdateLanguage(l.id, { level: e.target.value })}
                className="w-1/2 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                {CEFR_LEVELS.map((lvl, idx) => (
                  <option key={idx} value={lvl}>{lvl}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => handleDeleteLanguage(l.id)}
                className="p-1.5 text-slate-400 hover:text-red-500 transition"
                title="Supprimer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Centres d'intérêt */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Heart className="w-5 h-5 text-rose-500" />
          <span>Centres d'intérêt & Loisirs</span>
        </h2>
        <p className="text-xs text-slate-500">
          Les loisirs permettent d'engager la conversation lors de l'entretien et révèlent vos traits de personnalité.
        </p>

        <div className="flex gap-2">
          <input
            type="text"
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddInterest())}
            placeholder="Ex : Photographie argentique, Semi-marathon, Bénévolat..."
            className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddInterest}
            className="inline-flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {interests.map((item, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 bg-rose-50 text-rose-800 border border-rose-200 text-xs px-2.5 py-1 rounded-full font-medium"
            >
              <span>{item}</span>
              <button
                type="button"
                onClick={() => handleRemoveInterest(item)}
                className="hover:text-red-600 transition cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {interests.length === 0 && (
            <p className="text-xs text-slate-400 italic">Aucun loisir renseigné.</p>
          )}
        </div>
      </div>
    </div>
  );
};
