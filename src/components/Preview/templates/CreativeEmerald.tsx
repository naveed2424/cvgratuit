import React from 'react';
import { ResumeData } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const CreativeEmerald: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills, softSkills, languages, interests, style } = data;
  const primaryColor = style.primaryColor || '#059669';

  return (
    <div className={`a4-sheet bg-white text-slate-800 ${style.fontFamily === 'serif' ? 'font-serif-cv' : style.fontFamily === 'display' ? 'font-display-cv' : style.fontFamily === 'mono' ? 'font-mono-cv' : 'font-sans-cv'} flex flex-col min-h-[297mm] shadow-lg print:shadow-none print:w-full border-t-8`} style={{ borderColor: primaryColor }}>
      {/* Header Créatif */}
      <header className="p-8 pb-4 flex justify-between items-center bg-slate-50 border-b border-slate-200">
        <div className="space-y-1 max-w-[70%]">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase font-extrabold tracking-widest px-2 py-0.5 rounded text-white" style={{ backgroundColor: primaryColor }}>
              Curriculum Vitae
            </span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">
            {personalInfo.firstName} <span style={{ color: primaryColor }}>{personalInfo.lastName}</span>
          </h1>
          <p className="text-sm font-semibold text-slate-700">
            {personalInfo.title}
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600 pt-2">
            {personalInfo.email && (
              <span className="flex items-center gap-1">
                <Mail className="w-3.5 h-3.5" style={{ color: primaryColor }} /> {personalInfo.email}
              </span>
            )}
            {personalInfo.phone && (
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5" style={{ color: primaryColor }} /> {personalInfo.phone}
              </span>
            )}
            {personalInfo.city && (
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" style={{ color: primaryColor }} /> {personalInfo.postalCode} {personalInfo.city}
              </span>
            )}
            {personalInfo.linkedin && (
              <span className="flex items-center gap-1">
                <Linkedin className="w-3.5 h-3.5" style={{ color: primaryColor }} /> {personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}
              </span>
            )}
          </div>
        </div>

        {personalInfo.showPhoto && personalInfo.photoUrl && (
          <div className="shrink-0 p-1 rounded-full border-2 border-dashed" style={{ borderColor: primaryColor }}>
            <img
              src={personalInfo.photoUrl}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-24 h-24 rounded-full object-cover shadow"
            />
          </div>
        )}
      </header>

      {/* Accroche */}
      {personalInfo.summary && (
        <div className="mx-8 mt-5 p-3.5 rounded-lg bg-emerald-50/60 border border-emerald-100 text-xs text-slate-700 leading-relaxed flex items-start gap-2.5">
          <Sparkles className="w-4 h-4 shrink-0 mt-0.5" style={{ color: primaryColor }} />
          <span>{personalInfo.summary}</span>
        </div>
      )}

      {/* Main Content Grid */}
      <div className="p-8 grid grid-cols-12 gap-7">
        {/* Left Column (8 cols): Expériences & Éducation */}
        <div className="col-span-8 space-y-6">
          {experiences && experiences.length > 0 && (
            <section>
              <h2 className="text-xs font-extrabold uppercase tracking-wider mb-3.5 flex items-center gap-2 pb-1 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                <span>Expériences Professionnelles</span>
              </h2>
              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="cv-item-break pl-3 border-l-2" style={{ borderColor: primaryColor }}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-emerald-800 mb-1">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <p className="text-[11px] text-slate-600 mb-1 leading-snug">{exp.description}</p>
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
              <h2 className="text-xs font-extrabold uppercase tracking-wider mb-3 flex items-center gap-2 pb-1 border-b-2" style={{ color: primaryColor, borderColor: primaryColor }}>
                <span>Formations & Diplômes</span>
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="cv-item-break pl-3 border-l-2" style={{ borderColor: '#cbd5e1' }}>
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                      <span className="text-[11px] font-semibold text-slate-500">{edu.year}</span>
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

        {/* Right Column (4 cols): Compétences & Savoirs */}
        <div className="col-span-4 space-y-5">
          {skills && skills.length > 0 && (
            <section className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2.5 pb-1 border-b" style={{ color: primaryColor }}>
                Compétences
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((s, idx) => (
                  <span key={idx} className="bg-white border text-[11px] font-medium px-2 py-0.5 rounded shadow-2xs text-slate-800" style={{ borderColor: '#e2e8f0' }}>
                    {s}
                  </span>
                ))}
              </div>
            </section>
          )}

          {softSkills && softSkills.length > 0 && (
            <section className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: primaryColor }}>
                Qualités
              </h3>
              <ul className="space-y-1 text-xs text-slate-700">
                {softSkills.map((s, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }}></span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages && languages.length > 0 && (
            <section className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2 pb-1 border-b" style={{ color: primaryColor }}>
                Langues
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {languages.map((l, idx) => (
                  <li key={idx} className="flex justify-between items-baseline">
                    <span className="font-semibold">{l.language}</span>
                    <span className="text-[11px] text-slate-500">{l.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {interests && interests.length > 0 && (
            <section className="bg-slate-50 p-3.5 rounded-lg border border-slate-100">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-1.5 pb-1 border-b" style={{ color: primaryColor }}>
                Loisirs
              </h3>
              <p className="text-[11px] leading-relaxed text-slate-600">
                {interests.join(' • ')}
              </p>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
