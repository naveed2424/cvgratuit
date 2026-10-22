import React from 'react';
import { ResumeData } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Terminal, Code2 } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const CompactTech: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills, softSkills, languages, interests, style } = data;
  const primaryColor = style.primaryColor || '#4338ca';

  return (
    <div className={`a4-sheet bg-white text-slate-800 ${style.fontFamily === 'mono' ? 'font-mono-cv' : 'font-sans-cv'} p-7 flex flex-col justify-between min-h-[297mm] shadow-lg print:shadow-none print:w-full`}>
      <div>
        {/* Header Tech */}
        <header className="border-b-2 pb-4 mb-4 flex justify-between items-center" style={{ borderColor: primaryColor }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Terminal className="w-4 h-4" style={{ color: primaryColor }} />
              <h1 className="text-2xl font-bold tracking-tight text-slate-900 font-mono">
                {personalInfo.firstName} {personalInfo.lastName}
              </h1>
            </div>
            <p className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              {personalInfo.title}
            </p>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-slate-600">
              {personalInfo.email && (
                <span className="flex items-center gap-1 font-mono">
                  <Mail className="w-3 h-3 text-slate-400" /> {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1 font-mono">
                  <Phone className="w-3 h-3 text-slate-400" /> {personalInfo.phone}
                </span>
              )}
              {personalInfo.city && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-slate-400" /> {personalInfo.postalCode} {personalInfo.city}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1 font-mono">
                  <Linkedin className="w-3 h-3 text-slate-400" /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
                </span>
              )}
              {personalInfo.website && (
                <span className="flex items-center gap-1 font-mono">
                  <Globe className="w-3 h-3 text-slate-400" /> {personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}
                </span>
              )}
            </div>
          </div>

          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <img
              src={personalInfo.photoUrl}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-20 h-20 rounded object-cover border border-slate-300"
            />
          )}
        </header>

        {/* Profil Synthétique */}
        {personalInfo.summary && (
          <div className="mb-4 bg-slate-50 p-2.5 rounded border border-slate-200 text-[11px] text-slate-700 leading-relaxed font-mono">
            {personalInfo.summary}
          </div>
        )}

        {/* Stack Technique & Compétences en bandeau */}
        {skills && skills.length > 0 && (
          <div className="mb-4 p-2.5 bg-indigo-50/50 rounded border border-indigo-100">
            <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-indigo-900 mb-1.5">
              <Code2 className="w-3.5 h-3.5 text-indigo-600" />
              <span>Stack Technique & Outils</span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((s, idx) => (
                <span key={idx} className="bg-white border border-indigo-200 text-indigo-900 text-[10px] font-mono px-2 py-0.5 rounded shadow-2xs font-medium">
                  {s}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Colonnes Expériences (70%) et Formations/Extras (30%) */}
        <div className="grid grid-cols-12 gap-5">
          <div className="col-span-8 space-y-4">
            {experiences && experiences.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5" style={{ borderColor: primaryColor }}>
                  Expériences Professionnelles & Projets
                </h2>
                <div className="space-y-3">
                  {experiences.map((exp) => (
                    <div key={exp.id} className="cv-item-break">
                      <div className="flex justify-between items-baseline">
                        <span className="text-xs font-bold text-slate-900">{exp.role}</span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                        </span>
                      </div>
                      <div className="text-[10.5px] font-semibold text-indigo-800 mb-1">
                        {exp.company} {exp.location ? `• ${exp.location}` : ''}
                      </div>
                      {exp.description && (
                        <p className="text-[10.5px] text-slate-600 mb-1 leading-snug">{exp.description}</p>
                      )}
                      {exp.highlights && exp.highlights.length > 0 && (
                        <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[10.5px] text-slate-600 leading-snug">
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
          </div>

          <div className="col-span-4 space-y-4">
            {education && education.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2" style={{ borderColor: primaryColor }}>
                  Formation
                </h2>
                <div className="space-y-2">
                  {education.map((edu) => (
                    <div key={edu.id} className="cv-item-break">
                      <div className="text-[11px] font-bold text-slate-900">{edu.degree}</div>
                      <div className="text-[10px] text-slate-600">{edu.institution} ({edu.year})</div>
                      {edu.details && <div className="text-[10px] text-slate-500 italic">{edu.details}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {softSkills && softSkills.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-1.5" style={{ borderColor: primaryColor }}>
                  Méthodologies
                </h2>
                <ul className="space-y-0.5 text-[10.5px] text-slate-600">
                  {softSkills.map((s, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="w-1 h-1 rounded-full bg-indigo-500"></span>
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {languages && languages.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-1.5" style={{ borderColor: primaryColor }}>
                  Langues
                </h2>
                <ul className="space-y-1 text-[10.5px] text-slate-700">
                  {languages.map((l, idx) => (
                    <li key={idx} className="flex justify-between items-baseline font-mono">
                      <span>{l.language}</span>
                      <span className="text-slate-500 text-[10px]">{l.level}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {interests && interests.length > 0 && (
              <section>
                <h2 className="text-[11px] font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-1" style={{ borderColor: primaryColor }}>
                  Passions
                </h2>
                <p className="text-[10px] text-slate-600 leading-snug">
                  {interests.join(' • ')}
                </p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
