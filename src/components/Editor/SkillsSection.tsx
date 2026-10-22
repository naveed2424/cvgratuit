import React, { useState } from 'react';
import { Award, Plus, X, Sparkles } from 'lucide-react';

interface Props {
  skills: string[];
  softSkills: string[];
  onChangeSkills: (skills: string[]) => void;
  onChangeSoftSkills: (softSkills: string[]) => void;
  jobTitle?: string;
}

const COMMON_SUGGESTIONS = [
  'Gestion de projet', 'Techniques de vente', 'Pack Office (Excel)', 'Communication écrite & orale',
  'Relation client', 'Négociation B2B', 'Merchandising', 'Anglais professionnel', 'Management d\'équipe',
  'Résolution de problèmes', 'Analyse de données', 'CRM Salesforce', 'ERP SAP', 'Travail en équipe'
];

const SOFT_SKILLS_SUGGESTIONS = [
  'Rigueur & Organisation', 'Sens du service client', 'Esprit d\'équipe', 'Autonomie',
  'Adaptabilité & Agilité', 'Aisance relationnelle', 'Gestion du stress', 'Écoute active',
  'Force de proposition', 'Ponctualité'
];

export const SkillsSection: React.FC<Props> = ({
  skills,
  softSkills,
  onChangeSkills,
  onChangeSoftSkills,
}) => {
  const [skillInput, setSkillInput] = useState('');
  const [softInput, setSoftInput] = useState('');

  const handleAddSkill = (val?: string) => {
    const text = (val || skillInput).trim();
    if (text && !skills.includes(text)) {
      onChangeSkills([...skills, text]);
      if (!val) setSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    onChangeSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddSoftSkill = (val?: string) => {
    const text = (val || softInput).trim();
    if (text && !softSkills.includes(text)) {
      onChangeSoftSkills([...softSkills, text]);
      if (!val) setSoftInput('');
    }
  };

  const handleRemoveSoftSkill = (softToRemove: string) => {
    onChangeSoftSkills(softSkills.filter(s => s !== softToRemove));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <Award className="w-5 h-5 text-blue-600" />
          <span>Compétences techniques & Savoir-être</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Les compétences sont analysées en priorité par les robots ATS et les recruteurs.
        </p>
      </div>

      {/* Hard Skills */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
        <label className="block text-xs font-bold text-slate-800">
          Compétences techniques & Outils (Hard skills)
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            value={skillInput}
            onChange={(e) => setSkillInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSkill())}
            placeholder="Ex : Négociation, Excel TCD, React, Cegid..."
            className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => handleAddSkill()}
            className="inline-flex items-center gap-1 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter</span>
          </button>
        </div>

        {/* Current chips */}
        <div className="flex flex-wrap gap-1.5 pt-1">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 bg-blue-50 text-blue-800 border border-blue-200 text-xs px-2.5 py-1 rounded-full font-medium"
            >
              <span>{skill}</span>
              <button
                type="button"
                onClick={() => handleRemoveSkill(skill)}
                className="hover:text-red-500 transition cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {skills.length === 0 && (
            <p className="text-xs text-slate-400 italic">Aucune compétence ajoutée pour l'instant.</p>
          )}
        </div>

        {/* Suggestions */}
        <div className="pt-2 border-t border-slate-100">
          <p className="text-[11px] text-slate-500 mb-1.5 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Suggestions populaires (cliquez pour ajouter) :</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {COMMON_SUGGESTIONS.filter(s => !skills.includes(s)).slice(0, 8).map((sugg, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAddSkill(sugg)}
                className="text-[11px] bg-slate-100 hover:bg-blue-50 hover:text-blue-700 text-slate-700 px-2 py-0.5 rounded border border-slate-200 transition"
              >
                + {sugg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Soft Skills */}
      <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3 shadow-2xs">
        <label className="block text-xs font-bold text-slate-800">
          Qualités relationnelles & Savoir-être (Soft skills)
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            value={softInput}
            onChange={(e) => setSoftInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSoftSkill())}
            placeholder="Ex : Esprit d'équipe, Sens de l'organisation, Rigueur..."
            className="flex-1 text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            type="button"
            onClick={() => handleAddSoftSkill()}
            className="inline-flex items-center gap-1 px-3 py-2 bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold rounded-lg transition"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Ajouter</span>
          </button>
        </div>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {softSkills.map((soft, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-1.5 bg-slate-100 text-slate-800 border border-slate-300 text-xs px-2.5 py-1 rounded-full font-medium"
            >
              <span>{soft}</span>
              <button
                type="button"
                onClick={() => handleRemoveSoftSkill(soft)}
                className="hover:text-red-500 transition cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          {softSkills.length === 0 && (
            <p className="text-xs text-slate-400 italic">Aucun savoir-être ajouté.</p>
          )}
        </div>

        {/* Soft skills suggestions */}
        <div className="pt-2 border-t border-slate-100">
          <p className="text-[11px] text-slate-500 mb-1.5 flex items-center gap-1 font-medium">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Qualités appréciées par les recruteurs :</span>
          </p>
          <div className="flex flex-wrap gap-1.5">
            {SOFT_SKILLS_SUGGESTIONS.filter(s => !softSkills.includes(s)).slice(0, 7).map((sugg, i) => (
              <button
                key={i}
                type="button"
                onClick={() => handleAddSoftSkill(sugg)}
                className="text-[11px] bg-slate-100 hover:bg-slate-200 text-slate-700 px-2 py-0.5 rounded border border-slate-200 transition"
              >
                + {sugg}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
