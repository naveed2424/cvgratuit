import React from 'react';
import { ResumeData } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const MinimalistClean: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills, softSkills, languages, interests, style } = data;
  const primaryColor = style.primaryColor || '#0f172a';

  return (
    <div className={`a4-sheet bg-white text-slate-800 ${style.fontFamily === 'serif' ? 'font-serif-cv' : style.fontFamily === 'display' ? 'font-display-cv' : style.fontFamily === 'mono' ? 'font-mono-cv' : 'font-sans-cv'} p-10 flex flex-col justify-between min-h-[297mm] shadow-lg print:shadow-none print:w-full`}>
      <div>
        {/* En-tête minimaliste */}
        <header className="border-b-2 border-slate-900 pb-5 mb-6 flex justify-between items-start">
          <div className="space-y-1">
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 uppercase">
              {personalInfo.firstName} {personalInfo.lastName}
            </h1>
            <p className="text-sm font-semibold tracking-wide text-slate-600 uppercase">
              {personalInfo.title}
            </p>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500 pt-2">
              {personalInfo.email && <span>{personalInfo.email}</span>}
              {personalInfo.phone && <span>• {personalInfo.phone}</span>}
              {personalInfo.city && <span>• {personalInfo.postalCode} {personalInfo.city}</span>}
              {personalInfo.linkedin && <span>• {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
            </div>
          </div>

          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-20 h-20 grayscale rounded-sm object-cover border border-slate-300"
            />
          )}
        </header>

        {/* Profil / Accroche */}
        {personalInfo.summary && (
          <section className="mb-6">
            <p className="text-xs leading-relaxed text-slate-700 italic border-l-2 pl-3 border-slate-300">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Layout en 2 colonnes asymétriques */}
        <div className="grid grid-cols-12 gap-8">
          {/* Colonne Principale (8 cols) */}
          <div className="col-span-8 space-y-6">
            {experiences && experiences.length > 0 && (
              <section>
                <h2 className="text-xs font-bold tracking-widest uppercase text-slate-900 border-b border-slate-200 pb-1 mb-4">
                  Expérience Professionnelle
                </h2>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="cv-item-break">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                        <span className="text-[11px] text-slate-500 font-mono">
                          {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                        </span>
                      </div>
                      <div className="text-[11px] font-medium text-slate-600 mb-1">
                        {exp.company} {exp.location ? `• ${exp.location}` : ''}
                      </div>
                      {exp.description && (
                        <p className="text-[11px] text-slate-600 mb-1 leading-relaxed">
                          {exp.description}
                        </p>
                      )}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="list-disc list-outside ml-3.5 space-y-1 text-[11px] text-slate-600 leading-snug">
                          {exp.highlights.map((hl, hidx) => (
                            <li key={hidx}>{hl}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {education && education.length > 0 && (
              <section>
                <h2 className="text-xs font-bold tracking-widest uppercase text-slate-900 border-b border-slate-200 pb-1 mb-4">
                  Formation & Diplômes
                </h2>
                <div className="space-y-3">
                  {education.map((edu) => (
                    <div key={edu.id} className="cv-item-break">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold text-slate-900">{edu.degree}</span>
                        <span className="text-[11px] text-slate-500 font-mono">{edu.year}</span>
                      </div>
                      <div className="text-[11px] text-slate-600">
                        {edu.institution} {edu.location ? `• ${edu.location}` : ''}
                      </div>
                      {edu.details && (
                        <p className="text-[11px] text-slate-500 italic mt-0.5">{edu.details}</p>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Colonne Secondaire (4 cols) */}
          <div className="col-span-4 space-y-6">
            {skills && skills.length > 0 && (
              <section>
                <h2 className="text-xs font-bold tracking-widest uppercase text-slate-900 border-b border-slate-200 pb-1 mb-3">
                  Compétences
                </h2>
                <ul className="space-y-1 text-xs text-slate-700">
                  {skills.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-900"></span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {softSkills && softSkills.length > 0 && (
              <section>
                <h2 className="text-xs font-bold tracking-widest uppercase text-slate-900 border-b border-slate-200 pb-1 mb-3">
                  Atouts
                </h2>
                <ul className="space-y-1 text-xs text-slate-600">
                  {softSkills.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-slate-400"></span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {languages && languages.length > 0 && (
              <section>
                <h2 className="text-xs font-bold tracking-widest uppercase text-slate-900 border-b border-slate-200 pb-1 mb-3">
                  Langues
                </h2>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {languages.map((l, idx) => (
                    <li key={idx} className="flex justify-between items-baseline">
                      <span className="font-medium">{l.language}</span>
                      <span className="text-[11px] text-slate-500">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {interests && interests.length > 0 && (
              <section>
                <h2 className="text-xs font-bold tracking-widest uppercase text-slate-900 border-b border-slate-200 pb-1 mb-2">
                  Loisirs
                </h2>
                <p className="text-[11px] leading-relaxed text-slate-600">
                  {interests.join(', ')}
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
