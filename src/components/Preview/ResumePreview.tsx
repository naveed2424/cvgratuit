import React, { useState } from 'react';
import { ResumeData } from '../../types/resume';
import { ModernCobalt } from './templates/ModernCobalt';
import { ExecutiveGold } from './templates/ExecutiveGold';
import { MinimalistClean } from './templates/MinimalistClean';
import { CreativeEmerald } from './templates/CreativeEmerald';
import { CompactTech } from './templates/CompactTech';
import { ClassicAts } from './templates/ClassicAts';
import { Download, ZoomIn, ZoomOut, RotateCcw, Share2, Check, FileText, Sparkles } from 'lucide-react';

interface ResumePreviewProps {
  data: ResumeData;
  onOpenAtsScore?: () => void;
  atsScore?: number;
}

export const ResumePreview: React.FC<ResumePreviewProps> = ({ data, onOpenAtsScore, atsScore = 88 }) => {
  const [zoom, setZoom] = useState<number>(85); // Default 85% for nice screen fit
  const [copied, setCopied] = useState<boolean>(false);

  const handlePrint = () => {
    window.print();
  };

  const handleCopyText = () => {
    const text = `
${data.personalInfo.firstName} ${data.personalInfo.lastName}
${data.personalInfo.title}
Email: ${data.personalInfo.email} | Tél: ${data.personalInfo.phone} | Ville: ${data.personalInfo.city}

PROFIL:
${data.personalInfo.summary}

EXPÉRIENCES:
${data.experiences.map(e => `• ${e.role} chez ${e.company} (${e.startDate} - ${e.current ? 'Présent' : e.endDate})\n  ${e.highlights.join('\n  ')}`).join('\n\n')}

FORMATIONS:
${data.education.map(ed => `• ${ed.degree} - ${ed.institution} (${ed.year})`).join('\n')}

COMPÉTENCES:
${data.skills.join(', ')}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderTemplate = () => {
    switch (data.style.template) {
      case 'executive-gold':
        return <ExecutiveGold data={data} />;
      case 'minimalist-clean':
        return <MinimalistClean data={data} />;
      case 'creative-emerald':
        return <CreativeEmerald data={data} />;
      case 'compact-tech':
        return <CompactTech data={data} />;
      case 'classic-ats':
        return <ClassicAts data={data} />;
      case 'modern-cobalt':
      default:
        return <ModernCobalt data={data} />;
    }
  };

  return (
    <div className="flex flex-col h-full bg-desk-surface border-l border-slate-300 relative">
      {/* Top Preview Control Bar (Hidden when printing) */}
      <div className="no-print bg-white/95 backdrop-blur-md px-4 py-2.5 border-b border-slate-200 flex flex-wrap items-center justify-between gap-3 sticky top-0 z-20 shadow-xs">
        {/* ATS Score quick badge */}
        <button
          onClick={onOpenAtsScore}
          type="button"
          className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold hover:bg-emerald-100 transition shadow-2xs"
          title="Cliquez pour voir l'audit détaillé ATS"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
          <span>Score ATS : <strong>{atsScore}/100</strong></span>
        </button>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setZoom(Math.max(50, zoom - 10))}
            className="p-1 rounded text-slate-600 hover:bg-white hover:text-slate-900 transition"
            title="Zoom arrière"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="text-xs font-mono font-medium text-slate-700 px-1.5 w-12 text-center">
            {zoom}%
          </span>
          <button
            onClick={() => setZoom(Math.min(130, zoom + 10))}
            className="p-1 rounded text-slate-600 hover:bg-white hover:text-slate-900 transition"
            title="Zoom avant"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoom(85)}
            className="p-1 rounded text-slate-500 hover:bg-white hover:text-slate-900 transition ml-1"
            title="Réinitialiser le zoom"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyText}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition"
            title="Copier le texte complet du CV"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <FileText className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copié !' : 'Copier texte'}</span>
          </button>

          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm hover:shadow transition cursor-pointer"
            title="Télécharger votre CV au format PDF standard A4"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Télécharger en PDF (Gratuit)</span>
          </button>
        </div>
      </div>

      {/* Sheet Preview Container with zoom scale */}
      <div className="flex-1 overflow-auto p-4 md:p-8 flex justify-center items-start">
        <div 
          className="transition-transform duration-150 origin-top shadow-[0_25px_60px_-15px_rgba(100,70,20,0.25)] ring-2 ring-white/90 rounded-xs print:shadow-none print:transform-none print:ring-0"
          style={{ transform: `scale(${zoom / 100})` }}
        >
          {renderTemplate()}
        </div>
      </div>
    </div>
  );
};
