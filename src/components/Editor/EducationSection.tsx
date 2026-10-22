import React from 'react';
import { EducationItem } from '../../types/resume';
import { GraduationCap, Plus, Trash2 } from 'lucide-react';

interface Props {
  education: EducationItem[];
  onChange: (updated: EducationItem[]) => void;
}

export const EducationSection: React.FC<Props> = ({ education, onChange }) => {
  const handleAdd = () => {
    const newItem: EducationItem = {
      id: `edu-${Date.now()}`,
      degree: 'Nouveau Diplôme / Formation',
      field: 'Domaine d\'études',
      institution: 'Établissement / Université',
      location: 'Paris',
      year: '2022',
      details: 'Option, projet ou mention obtenue.'
    };
    onChange([...education, newItem]);
  };

  const handleUpdate = (id: string, updates: Partial<EducationItem>) => {
    onChange(education.map(item => item.id === id ? { ...item, ...updates } : item));
  };

  const handleDelete = (id: string) => {
    onChange(education.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-blue-600" />
            <span>Diplômes & Formations</span>
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Listez vos diplômes d'État, certifications et parcours universitaire.
          </p>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg shadow-2xs transition"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Ajouter une formation</span>
        </button>
      </div>

      <div className="space-y-4">
        {education.map((item, idx) => (
          <div
            key={item.id}
            className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 relative shadow-2xs"
          >
            <div className="flex justify-between items-start">
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wide">
                Formation #{idx + 1}
              </span>
              <button
                type="button"
                onClick={() => handleDelete(item.id)}
                className="text-slate-400 hover:text-red-500 transition"
                title="Supprimer cette formation"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Diplôme / Intitulé *
                </label>
                <input
                  type="text"
                  value={item.degree}
                  onChange={(e) => handleUpdate(item.id, { degree: e.target.value })}
                  placeholder="Ex : BTS NDRC, Licence Pro, Master 2..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Établissement / Université *
                </label>
                <input
                  type="text"
                  value={item.institution}
                  onChange={(e) => handleUpdate(item.id, { institution: e.target.value })}
                  placeholder="Ex : Université Paris 1 Panthéon-Sorbonne"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ville
                </label>
                <input
                  type="text"
                  value={item.location}
                  onChange={(e) => handleUpdate(item.id, { location: e.target.value })}
                  placeholder="Ex : Paris"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Année d'obtention *
                </label>
                <input
                  type="text"
                  value={item.year}
                  onChange={(e) => handleUpdate(item.id, { year: e.target.value })}
                  placeholder="Ex : 2023"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Mention ou précision
                </label>
                <input
                  type="text"
                  value={item.details || ''}
                  onChange={(e) => handleUpdate(item.id, { details: e.target.value })}
                  placeholder="Ex : Mention Très Bien, Major"
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
