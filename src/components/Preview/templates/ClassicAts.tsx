import React from 'react';
import { ResumeData } from '../../../types/resume';

interface TemplateProps {
  data: ResumeData;
}

export const ClassicAts: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills, softSkills, languages, interests, style } = data;
  const primaryColor = style.primaryColor || '#1e293b';

  return (
    <div className={`a4-sheet bg-white text-slate-900 ${style.fontFamily === 'serif' ? 'font-serif-cv' : 'font-sans-cv'} p-9 flex flex-col justify-between min-h-[297mm] shadow-lg print:shadow-none print:w-full`}>
      <div>
        {/* En-tête centré classique ATS */}
        <header className="text-center border-b pb-4 mb-4" style={{ borderColor: primaryColor }}>
          <h1 className="text-2xl font-bold tracking-tight uppercase text-slate-900">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-sm font-semibold text-slate-700 mt-0.5">
            {personalInfo.title}
          </p>

          <div className="flex flex-wrap justify-center gap-x-2 text-xs text-slate-600 mt-2">
            {personalInfo.email && <span>{personalInfo.email}</span>}
            {personalInfo.phone && <span>| {personalInfo.phone}</span>}
            {personalInfo.city && <span>| {personalInfo.postalCode} {personalInfo.city}</span>}
            {personalInfo.drivingLicense && <span>| {personalInfo.drivingLicense}</span>}
            {personalInfo.linkedin && <span>| {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>}
          </div>
        </header>

        {/* Profil / Accroche ATS */}
        {personalInfo.summary && (
          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-1.5 border-b border-slate-300" style={{ color: primaryColor }}>
              Profil Professionnel
            </h2>
            <p className="text-xs leading-relaxed text-slate-700">
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Compétences ATS */}
        {skills && skills.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-1.5 border-b border-slate-300" style={{ color: primaryColor }}>
              Compétences Clés & Outils
            </h2>
            <p className="text-xs text-slate-800 leading-snug">
              <strong className="text-slate-900">Savoir-faire : </strong>
              {skills.join(' • ')}
            </p>
            {softSkills && softSkills.length > 0 && (
              <p className="text-xs text-slate-700 mt-1 leading-snug">
                <strong className="text-slate-900">Savoir-être : </strong>
                {softSkills.join(' • ')}
              </p>
            )}
          </section>
        )}

        {/* Expériences Professionnelles */}
        {experiences && experiences.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-300" style={{ color: primaryColor }}>
              Expérience Professionnelle
            </h2>
            <div className="space-y-3.5">
              {experiences.map((exp) => (
                <div key={exp.id} className="cv-item-break">
                  <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                    <span>{exp.role}</span>
                    <span className="font-normal text-[11px] text-slate-600">
                      {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-700 italic mb-1">
                    {exp.company} {exp.location ? `, ${exp.location}` : ''}
                  </div>
                  {exp.description && (
                    <p className="text-[11px] text-slate-700 mb-1 leading-snug">{exp.description}</p>
                  )}
                  {exp.highlights && exp.highlights.length > 0 && (
                    <ul className="list-disc list-outside ml-4 space-y-0.5 text-[11px] text-slate-700 leading-snug">
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

        {/* Formation & Diplômes */}
        {education && education.length > 0 && (
          <section className="mb-4">
            <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-2 border-b border-slate-300" style={{ color: primaryColor }}>
              Formation & Diplômes
            </h2>
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id} className="cv-item-break">
                  <div className="flex justify-between items-baseline font-bold text-xs text-slate-900">
                    <span>{edu.degree}</span>
                    <span className="font-normal text-[11px] text-slate-600">{edu.year}</span>
                  </div>
                  <div className="text-[11px] text-slate-700">
                    {edu.institution} {edu.location ? `– ${edu.location}` : ''}
                  </div>
                  {edu.details && <div className="text-[11px] text-slate-600 italic">{edu.details}</div>}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Langues & Divers */}
        <section className="grid grid-cols-2 gap-4">
          {languages && languages.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-1.5 border-b border-slate-300" style={{ color: primaryColor }}>
                Langues
              </h2>
              <ul className="text-xs text-slate-700 space-y-0.5">
                {languages.map((l, idx) => (
                  <li key={idx}>
                    <strong>{l.language} :</strong> {l.level}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {interests && interests.length > 0 && (
            <div>
              <h2 className="text-xs font-bold uppercase tracking-wider pb-1 mb-1.5 border-b border-slate-300" style={{ color: primaryColor }}>
                Centres d'intérêt
              </h2>
              <p className="text-xs text-slate-700 leading-relaxed">
                {interests.join(' • ')}
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
