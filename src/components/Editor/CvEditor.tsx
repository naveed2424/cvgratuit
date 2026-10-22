import React, { useState } from 'react';
import { ResumeData, JobPreset, StyleOptions, CoverLetterData } from '../../types/resume';
import { PersonalInfoSection } from './PersonalInfoSection';
import { ExperienceSection } from './ExperienceSection';
import { EducationSection } from './EducationSection';
import { SkillsSection } from './SkillsSection';
import { LanguagesInterestsSection } from './LanguagesInterestsSection';
import { StyleCustomizer } from './StyleCustomizer';
import { JobPresetsModal } from './JobPresetsModal';
import { ResumePreview } from '../Preview/ResumePreview';
import { CoverLetterView } from '../CoverLetter/CoverLetterView';
import { AtsCheckerModal, calculateAtsScore } from '../AtsChecker/AtsCheckerModal';
import { 
  User, Briefcase, GraduationCap, Award, Languages, Palette, 
  Sparkles, FileText, Download, Upload, RotateCcw, Check, ChevronLeft, Eye
} from 'lucide-react';

interface Props {
  data: ResumeData;
  onChange: (updated: ResumeData) => void;
  onBackToHome: () => void;
}

type TabType = 'personal' | 'experience' | 'education' | 'skills' | 'languages' | 'style' | 'cover-letter';

export const CvEditor: React.FC<Props> = ({ data, onChange, onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<TabType>('personal');
  const [showPresetsModal, setShowPresetsModal] = useState(false);
  const [showAtsModal, setShowAtsModal] = useState(false);
  const [mobilePreviewOpen, setMobilePreviewOpen] = useState(false);

  const { score: atsScore } = calculateAtsScore(data);

  // AI helper: calls server `/api/gemini/generate` or client fallback
  const handleAiSummary = async (jobTitle: string, current: string): Promise<string> => {
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'summary', jobTitle, currentText: current }),
      });
      const resData = await res.json();
      return resData.text || '';
    } catch {
      return `${jobTitle || 'Professionnel'} motivé et rigoureux, fort d'une expérience réussie dans l'atteinte d'objectifs ambitieux. Reconnu pour mon relationnel, mon autonomie et mon esprit d'équipe, je souhaite apporter une valeur ajoutée concrète à vos projets.`;
    }
  };

  const handleAiBullets = async (role: string): Promise<string[]> => {
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'bullets', jobTitle: role }),
      });
      const resData = await res.json();
      if (resData.text) {
        return resData.text
          .split('\n')
          .map((line: string) => line.replace(/^[-*•]\s*/, '').trim())
          .filter((line: string) => line.length > 5);
      }
    } catch {}
    return [
      `Pilotage de dossiers stratégiques avec un taux d'atteinte des objectifs de 115%.`,
      `Optimisation des processus internes permettant un gain de temps de 25%.`,
      `Coordination fluide avec les partenaires et satisfaction client évaluée à 4.9/5.`
    ];
  };

  const handleAiCoverLetter = async (jobTitle: string): Promise<string> => {
    try {
      const res = await fetch('/api/gemini/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ type: 'cover_letter', jobTitle }),
      });
      const resData = await res.json();
      return resData.text || '';
    } catch {
      return `Fort(e) de mes précédentes expériences dans ce secteur, j'ai développé une solide expertise opérationnelle ainsi qu'une capacité éprouvée à collaborer efficacement en équipe pluridisciplinaire.`;
    }
  };

  const handleSelectPreset = (preset: JobPreset) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        title: preset.title,
        summary: preset.summary,
      },
      experiences: preset.experiences.map((e, idx) => ({ ...e, id: `exp-${Date.now()}-${idx}` })),
      education: preset.education.map((e, idx) => ({ ...e, id: `edu-${Date.now()}-${idx}` })),
      skills: [...preset.skills],
      softSkills: [...preset.softSkills],
      languages: preset.languages.map((l, idx) => ({ ...l, id: `lang-${Date.now()}-${idx}` })),
      interests: [...preset.interests],
    });
  };

  const handleExportJson = () => {
    const jsonStr = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_${data.personalInfo.lastName || 'MonCV'}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed.personalInfo) {
            onChange(parsed);
          }
        } catch {
          alert('Fichier JSON invalide.');
        }
      };
      reader.readAsText(file);
    }
  };

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'personal', label: 'Coordonnées', icon: <User className="w-4 h-4" /> },
    { id: 'experience', label: 'Expériences', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'education', label: 'Formations', icon: <GraduationCap className="w-4 h-4" /> },
    { id: 'skills', label: 'Compétences', icon: <Award className="w-4 h-4" /> },
    { id: 'languages', label: 'Langues & Loisirs', icon: <Languages className="w-4 h-4" /> },
    { id: 'style', label: 'Modèles & Couleurs', icon: <Palette className="w-4 h-4" /> },
    { id: 'cover-letter', label: 'Lettre de Motivation', icon: <FileText className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Studio Navbar (hidden on print) */}
      <nav className="no-print bg-white border-b border-slate-200 sticky top-0 z-30 px-4 py-2.5 flex items-center justify-between shadow-2xs">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Accueil</span>
          </button>

          <div className="h-4 w-px bg-slate-200"></div>

          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-slate-900 tracking-tight">
              CV<span className="text-blue-600">Gratuit</span>
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              Éditeur en direct
            </span>
          </div>
        </div>

        {/* Center: Presets & ATS score quick button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setShowPresetsModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-700 text-xs font-semibold border border-blue-200 transition cursor-pointer shadow-2xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span className="hidden sm:inline">Changer de métier pré-rempli</span>
            <span className="sm:hidden">Métiers</span>
          </button>

          <button
            type="button"
            onClick={() => setShowAtsModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 text-xs font-semibold border border-emerald-200 transition cursor-pointer"
            title="Cliquez pour voir votre audit ATS complet"
          >
            <span>Score ATS : <strong>{atsScore}/100</strong></span>
          </button>
        </div>

        {/* Right tools: Save JSON, Load JSON, Mobile preview toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExportJson}
            className="hidden md:inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition"
            title="Sauvegarder vos données au format JSON sur votre ordinateur"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Sauvegarder</span>
          </button>

          <label
            className="hidden md:inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 px-2 py-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            title="Importer une sauvegarde JSON"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>Importer</span>
            <input type="file" accept=".json" onChange={handleImportJson} className="hidden" />
          </label>

          {/* Mobile Preview toggle */}
          <button
            type="button"
            onClick={() => setMobilePreviewOpen(!mobilePreviewOpen)}
            className="lg:hidden inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-900 text-white text-xs font-bold"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{mobilePreviewOpen ? 'Retour Écriture' : 'Voir CV'}</span>
          </button>
        </div>
      </nav>

      {/* Main Split Screen */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Form Editor Panel (Tabs + Fields) */}
        <div className={`w-full lg:w-[48%] xl:w-[42%] flex flex-col bg-white border-r border-slate-200 overflow-y-auto ${mobilePreviewOpen ? 'hidden lg:flex' : 'flex'}`}>
          {/* Sub Navigation Tabs */}
          <div className="no-print bg-slate-50 border-b border-slate-200 p-2 overflow-x-auto flex gap-1 scrollbar-none sticky top-0 z-10">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition cursor-pointer shrink-0 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:bg-white hover:text-slate-900'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Form Content per Active Tab */}
          <div className="p-5 md:p-7 flex-1">
            {activeTab === 'personal' && (
              <PersonalInfoSection
                info={data.personalInfo}
                onChange={(personalInfo) => onChange({ ...data, personalInfo })}
                onGenerateAiSummary={handleAiSummary}
              />
            )}

            {activeTab === 'experience' && (
              <ExperienceSection
                experiences={data.experiences}
                onChange={(experiences) => onChange({ ...data, experiences })}
                onGenerateAiBullets={handleAiBullets}
              />
            )}

            {activeTab === 'education' && (
              <EducationSection
                education={data.education}
                onChange={(education) => onChange({ ...data, education })}
              />
            )}

            {activeTab === 'skills' && (
              <SkillsSection
                skills={data.skills}
                softSkills={data.softSkills}
                onChangeSkills={(skills) => onChange({ ...data, skills })}
                onChangeSoftSkills={(softSkills) => onChange({ ...data, softSkills })}
                jobTitle={data.personalInfo.title}
              />
            )}

            {activeTab === 'languages' && (
              <LanguagesInterestsSection
                languages={data.languages}
                interests={data.interests}
                onChangeLanguages={(languages) => onChange({ ...data, languages })}
                onChangeInterests={(interests) => onChange({ ...data, interests })}
              />
            )}

            {activeTab === 'style' && (
              <StyleCustomizer
                style={data.style}
                onChange={(style) => onChange({ ...data, style })}
              />
            )}

            {activeTab === 'cover-letter' && (
              <div className="space-y-4">
                <p className="text-xs text-slate-500">
                  Votre lettre de motivation utilise automatiquement la même charte graphique et couleur que votre CV.
                </p>
                <CoverLetterView
                  resumeData={data}
                  onUpdateCoverLetter={(coverLetter) => onChange({ ...data, coverLetter })}
                  onGenerateAiCoverLetter={handleAiCoverLetter}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Live Preview Panel */}
        <div className={`w-full lg:w-[52%] xl:w-[58%] h-[calc(100vh-53px)] overflow-hidden ${mobilePreviewOpen ? 'block' : 'hidden lg:block'}`}>
          {activeTab === 'cover-letter' ? (
            <div className="h-full overflow-y-auto p-4 bg-slate-200">
              <CoverLetterView
                resumeData={data}
                onUpdateCoverLetter={(coverLetter) => onChange({ ...data, coverLetter })}
                onGenerateAiCoverLetter={handleAiCoverLetter}
              />
            </div>
          ) : (
            <ResumePreview
              data={data}
              onOpenAtsScore={() => setShowAtsModal(true)}
              atsScore={atsScore}
            />
          )}
        </div>
      </div>

      {/* Modals */}
      <JobPresetsModal
        isOpen={showPresetsModal}
        onClose={() => setShowPresetsModal(false)}
        onSelectPreset={handleSelectPreset}
        currentTitle={data.personalInfo.title}
      />

      <AtsCheckerModal
        isOpen={showAtsModal}
        onClose={() => setShowAtsModal(false)}
        data={data}
      />
    </div>
  );
};
