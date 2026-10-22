import React, { useState } from 'react';
import { ExperienceItem } from '../../types/resume';
import { Briefcase, Plus, Trash2, ChevronDown, ChevronUp, Sparkles, Loader2, GripVertical } from 'lucide-react';

interface Props {
  experiences: ExperienceItem[];
  onChange: (updated: ExperienceItem[]) => void;
  onGenerateAiBullets?: (role: string) => Promise<string[] | void>;
}

export const ExperienceSection: React.FC<Props> = ({ experiences, onChange, onGenerateAiBullets }) => {
  const [expandedId, setExpandedId] = useState<string | null>(experiences[0]?.id || null);
  const [loadingAiId, setLoadingAiId] = useState<string | null>(null);

  const handleAdd = () => {
    const newItem: ExperienceItem = {
      id: `exp-${Date.now()}`,
      role: 'Nouveau Poste',
      company: 'Nom de l\'Entreprise',
      location: 'Paris, France',
      startDate: 'Janvier 2023',
      endDate: 'Présent',
      current: true,
      description: 'Missions principales et responsabilités confiées.',
      highlights: [
        'Dépassement des objectifs fixés de 15% grâce à une gestion proactive.',
        'Mise en place de nouveaux processus optimisant le temps de traitement de 20%.'
      ]
    };
    onChange([newItem, ...experiences]);
    setExpandedId(newItem.id);
  };

  const handleUpdate = (id: string, updates: Partial<ExperienceItem>) => {
    onChange(experiences.map(exp => exp.id === id ? { ...exp, ...updates } : exp));
  };

  const handleDelete = (id: string) => {
    onChange(experiences.filter(exp => exp.id !== id));
  };

  const handleAddHighlight = (expId: string) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    const newHighlights = [...exp.highlights, 'Nouvelle réalisation chiffrée avec verbe d\'action'];
    handleUpdate(expId, { highlights: newHighlights });
  };

  const handleUpdateHighlight = (expId: string, index: number, value: string) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    const updated = [...exp.highlights];
    updated[index] = value;
    handleUpdate(expId, { highlights: updated });
  };

  const handleDeleteHighlight = (expId: string, index: number) => {
    const exp = experiences.find(e => e.id === expId);
    if (!exp) return;
    const updated = exp.highlights.filter((_, i) => i !== index);
    handleUpdate(expId, { highlights: updated });
  };

  const handleAiSuggest = async (exp: ExperienceItem) => {
    if (!onGenerateAiBullets) return;
    setLoadingAiId(exp.id);
    try {
      const suggestions = await onGenerateAiBullets(exp.role);
      if (suggestions && suggestions.length > 0) {
        handleUpdate(exp.id, { highlights: [...exp.highlights, ...suggestions] });
      }
    } finally {
      setLoadingAiId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-blue-600" />
            <span>Expériences professionnelles</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Mettez en avant vos résultats chiffrés et compétences acquises.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ajouter un poste</span>
        </button>
      </div>

      <div className="space-y-4">
        {experiences.map((exp, index) => {
          const isExpanded = expandedId === exp.id;

          return (
            <div
              key={exp.id}
              className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs transition hover:border-slate-300"
            >
              {/* Card Header Accordion */}
              <div
                className="p-3.5 bg-slate-50/70 border-b border-slate-100 flex items-center justify-between cursor-pointer select-none"
                onClick={() => setExpandedId(isExpanded ? null : exp.id)}
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-bold flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">
                      {exp.role || 'Poste non renseigné'}
                    </h3>
                    <p className="text-[11px] text-slate-500">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''} | {exp.startDate} - {exp.current ? 'Présent' : exp.endDate}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(exp.id);
                    }}
                    className="p-1 text-slate-400 hover:text-red-600 transition"
                    title="Supprimer cette expérience"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-500" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-500" />
                  )}
                </div>
              </div>

              {/* Card Body */}
              {isExpanded && (
                <div className="p-4 space-y-4 bg-white">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Intitulé du poste *</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => handleUpdate(exp.id, { role: e.target.value })}
                        placeholder="Ex : Conseiller de vente Senior"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Entreprise *</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => handleUpdate(exp.id, { company: e.target.value })}
                        placeholder="Ex : Galeries Lafayette"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Ville / Lieu</label>
                      <input
                        type="text"
                        value={exp.location}
                        onChange={(e) => handleUpdate(exp.id, { location: e.target.value })}
                        placeholder="Ex : Paris, France"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Date de début *</label>
                      <input
                        type="text"
                        value={exp.startDate}
                        onChange={(e) => handleUpdate(exp.id, { startDate: e.target.value })}
                        placeholder="Ex : Septembre 2022"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      />
                    </div>
                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-xs font-semibold text-slate-700">Date de fin</label>
                        <label className="inline-flex items-center gap-1 text-[11px] text-slate-600 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={exp.current}
                            onChange={(e) => handleUpdate(exp.id, { current: e.target.checked })}
                            className="rounded text-blue-600 focus:ring-blue-500"
                          />
                          <span>En poste</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        disabled={exp.current}
                        value={exp.current ? 'Présent' : exp.endDate}
                        onChange={(e) => handleUpdate(exp.id, { endDate: e.target.value })}
                        placeholder="Ex : Août 2024"
                        className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:bg-slate-100 disabled:text-slate-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Contexte de la mission (optionnel)
                    </label>
                    <input
                      type="text"
                      value={exp.description}
                      onChange={(e) => handleUpdate(exp.id, { description: e.target.value })}
                      placeholder="Ex : Au sein d'une équipe de 8 personnes, animation du corner maroquinerie..."
                      className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                    />
                  </div>

                  {/* Highlights / Puces de réalisations */}
                  <div className="space-y-2 pt-2 border-t border-slate-100">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-semibold text-slate-800">
                        Réalisations concrètes & Chiffres clés (recommandé pour l'ATS)
                      </label>
                      <button
                        type="button"
                        onClick={() => handleAiSuggest(exp)}
                        disabled={loadingAiId === exp.id}
                        className="inline-flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 px-2 py-0.5 rounded transition cursor-pointer"
                      >
                        {loadingAiId === exp.id ? <Loader2 className="w-3 h-3 animate-spin" /> : <Sparkles className="w-3 h-3 text-blue-600" />}
                        <span>{loadingAiId === exp.id ? 'Génération...' : '+ Puces suggérées par l\'IA'}</span>
                      </button>
                    </div>

                    <div className="space-y-2">
                      {exp.highlights.map((hl, hlIdx) => (
                        <div key={hlIdx} className="flex items-start gap-2">
                          <span className="text-xs text-blue-500 font-bold mt-2">•</span>
                          <textarea
                            rows={2}
                            value={hl}
                            onChange={(e) => handleUpdateHighlight(exp.id, hlIdx, e.target.value)}
                            placeholder="Action + Résultat chiffré (Ex : Dépassement de 118% des objectifs de vente...)"
                            className="flex-1 text-xs px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                          />
                          <button
                            type="button"
                            onClick={() => handleDeleteHighlight(exp.id, hlIdx)}
                            className="p-1 text-slate-300 hover:text-red-500 transition mt-1"
                            title="Supprimer cette puce"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => handleAddHighlight(exp.id)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium inline-flex items-center gap-1 pt-1"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Ajouter une réalisation</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
