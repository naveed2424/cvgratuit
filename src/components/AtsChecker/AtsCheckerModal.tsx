import React from 'react';
import { ResumeData } from '../../types/resume';
import { Sparkles, CheckCircle2, AlertCircle, X, ShieldCheck, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  data: ResumeData;
  onGoToSection?: (sectionId: string) => void;
}

export function calculateAtsScore(data: ResumeData): {
  score: number;
  checks: { title: string; passed: boolean; tip: string; weight: number }[];
} {
  const { personalInfo, experiences, education, skills, softSkills, languages } = data;

  const checks = [
    {
      title: 'Titre professionnel précis',
      passed: Boolean(personalInfo.title && personalInfo.title.length > 3),
      tip: 'Indiquez un titre de poste identique à l\'offre visée pour matcher à 100% dans l\'ATS.',
      weight: 10,
    },
    {
      title: 'Email et téléphone renseignés',
      passed: Boolean(personalInfo.email && personalInfo.phone),
      tip: 'Les coordonnées sont indispensables pour que les recruteurs vous convoquent.',
      weight: 15,
    },
    {
      title: 'Accroche / Profil professionnel rédigé',
      passed: Boolean(personalInfo.summary && personalInfo.summary.length >= 60),
      tip: 'Une synthèse de 3 lignes capte l\'attention du recruteur en moins de 6 secondes.',
      weight: 15,
    },
    {
      title: 'Expériences avec réalisations chiffrées',
      passed: experiences.length >= 2 && experiences.some(e => e.highlights && e.highlights.length >= 2),
      tip: 'Incluez des chiffres (%, CA, nombre de clients) pour prouver votre impact réel.',
      weight: 20,
    },
    {
      title: 'Compétences techniques clés (Hard skills)',
      passed: skills.length >= 5,
      tip: 'Les robots ATS scannent prioritairement ces mots-clés techniques.',
      weight: 15,
    },
    {
      title: 'Qualités humaines & Savoir-être',
      passed: softSkills.length >= 3,
      tip: 'Très valorisé par les cabinets de recrutement et managers en France.',
      weight: 10,
    },
    {
      title: 'Diplômes et parcours de formation',
      passed: education.length >= 1,
      tip: 'Mentionnez votre diplôme le plus élevé et l\'année d\'obtention.',
      weight: 10,
    },
    {
      title: 'Langues vivantes avec niveau CECRL',
      passed: languages.length >= 1,
      tip: 'Précisez votre niveau réel (ex : B2, C1 ou Langue maternelle).',
      weight: 5,
    },
  ];

  const totalScore = checks.reduce((acc, curr) => acc + (curr.passed ? curr.weight : 0), 0);

  return { score: totalScore, checks };
}

export const AtsCheckerModal: React.FC<Props> = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  const { score, checks } = calculateAtsScore(data);

  const getScoreColor = () => {
    if (score >= 85) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 70) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreLabel = () => {
    if (score >= 85) return 'Excellent – CV optimisé pour 98% des logiciels ATS';
    if (score >= 70) return 'Bon niveau – Quelques ajustements conseillés';
    return 'À peaufiner – Renseignez les rubriques clés pour maximiser vos chances';
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">
                Audit de compatibilité ATS & Recruteurs
              </h2>
              <p className="text-xs text-slate-500">
                Analyse en temps réel de votre CV selon les critères des DRH en France.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200 rounded-lg transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Score overview */}
        <div className="p-5 border-b border-slate-100 flex items-center gap-5">
          <div className={`w-20 h-20 shrink-0 rounded-2xl border-2 flex flex-col items-center justify-center font-bold ${getScoreColor()}`}>
            <span className="text-2xl font-black">{score}</span>
            <span className="text-[10px] uppercase tracking-wider font-semibold">/ 100</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-sm font-bold text-slate-900">{getScoreLabel()}</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Les recruteurs et robots de tri (Taleo, Workday, Welcome to the Jungle) recherchent une structure claire, des mots-clés précis et des réalisations mesurables.
            </p>
          </div>
        </div>

        {/* Detailed checklist */}
        <div className="p-5 overflow-y-auto space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
            Critères vérifiés sur votre CV :
          </h4>

          {checks.map((check, idx) => (
            <div
              key={idx}
              className={`p-3 rounded-xl border flex items-start gap-3 transition ${
                check.passed ? 'bg-emerald-50/40 border-emerald-100' : 'bg-amber-50/40 border-amber-200'
              }`}
            >
              <div className="shrink-0 mt-0.5">
                {check.passed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                )}
              </div>
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900">{check.title}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                    check.passed ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {check.passed ? `+${check.weight} pts` : `À compléter`}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 leading-snug">
                  {check.tip}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 bg-slate-50 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg transition"
          >
            Continuer la modification du CV
          </button>
        </div>
      </div>
    </div>
  );
};
