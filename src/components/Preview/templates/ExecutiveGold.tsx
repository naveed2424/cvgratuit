import React from 'react';
import { ResumeData } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ExecutiveGold: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills, softSkills, languages, interests, style } = data;
  const primaryColor = style.primaryColor || '#1e293b';

  return (
    <div className={`a4-sheet bg-white text-slate-800 ${style.fontFamily === 'sans' ? 'font-sans-cv' : style.fontFamily === 'display' ? 'font-display-cv' : style.fontFamily === 'mono' ? 'font-mono-cv' : 'font-serif-cv'} flex flex-col min-h-[297mm] shadow-lg print:shadow-none print:w-full`}>
      {/* Top Banner Executive */}
      <header 
        className="p-8 text-white flex justify-between items-center"
        style={{ backgroundColor: primaryColor }}
      >
        <div className="space-y-1 max-w-[70%]">
          <h1 className="text-2xl font-bold tracking-tight text-white uppercase font-display-cv">
            {personalInfo.firstName} {personalInfo.lastName}
          </h1>
          <p className="text-sm font-medium text-amber-300 tracking-wider uppercase">
            {personalInfo.title}
          </p>
          {personalInfo.summary && (
            <p className="text-xs text-slate-200 mt-2 leading-relaxed opacity-95">
              {personalInfo.summary}
            </p>
          )}
        </div>

        {personalInfo.showPhoto && personalInfo.photoUrl && (
          <div className="shrink-0">
            <img
              src={personalInfo.photoUrl}
              alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
              className="w-24 h-24 rounded-md object-cover border-2 border-amber-400 shadow-md"
            />
          </div>
        )}
      </header>

      {/* Sub-header Contact strip */}
      <div className="bg-slate-100 border-b border-slate-200 px-8 py-2 text-xs flex flex-wrap gap-4 text-slate-600 justify-between items-center">
        {personalInfo.email && (
          <div className="flex items-center gap-1.5">
            <Mail className="w-3.5 h-3.5 text-slate-500" />
            <span>{personalInfo.email}</span>
          </div>
        )}
        {personalInfo.phone && (
          <div className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-slate-500" />
            <span>{personalInfo.phone}</span>
          </div>
        )}
        {(personalInfo.city || personalInfo.postalCode) && (
          <div className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-slate-500" />
            <span>{personalInfo.postalCode} {personalInfo.city}</span>
          </div>
        )}
        {personalInfo.linkedin && (
          <div className="flex items-center gap-1.5">
            <Linkedin className="w-3.5 h-3.5 text-slate-500" />
            <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
          </div>
        )}
        {personalInfo.website && (
          <div className="flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-slate-500" />
            <span>{personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
          </div>
        )}
      </div>

      {/* Main Body: 2 Columns */}
      <div className="p-8 grid grid-cols-12 gap-7">
        {/* Left main column: Expériences & Formations (8 cols) */}
        <div className="col-span-8 space-y-6">
          {experiences && experiences.length > 0 && (
            <section>
              <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 border-b-2 pb-1 mb-4 flex items-center justify-between" style={{ borderColor: primaryColor }}>
                <span>Expériences professionnelles</span>
              </h2>

              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="cv-item-break">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-[11px] font-semibold text-slate-500">
                        {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-amber-700 mb-1">
                      {exp.company} {exp.location ? `| ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <p className="text-[11px] text-slate-600 mb-1 leading-snug">
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
              <h2 className="text-xs uppercase font-bold tracking-widest text-slate-900 border-b-2 pb-1 mb-4" style={{ borderColor: primaryColor }}>
                <span>Formations & Diplômes</span>
              </h2>

              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="cv-item-break">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                      <span className="text-[11px] font-semibold text-slate-500">{edu.year}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium">
                      {edu.institution} {edu.location ? `| ${edu.location}` : ''}
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

        {/* Right side column: Compétences, Langues, Loisirs (4 cols) */}
        <div className="col-span-4 space-y-6 bg-slate-50/60 p-4 rounded border border-slate-100">
          {skills && skills.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5" style={{ borderColor: primaryColor }}>
                Compétences clés
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, idx) => (
                  <span key={idx} className="bg-white border border-slate-200 text-slate-800 text-[10.5px] px-2 py-0.5 rounded shadow-2xs font-medium">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          )}

          {softSkills && softSkills.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5" style={{ borderColor: primaryColor }}>
                Savoir-être
              </h3>
              <ul className="space-y-1 text-xs text-slate-600">
                {softSkills.map((soft, sidx) => (
                  <li key={sidx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                    <span>{soft}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {languages && languages.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2.5" style={{ borderColor: primaryColor }}>
                Langues
              </h3>
              <ul className="space-y-1.5 text-xs text-slate-700">
                {languages.map((lang, lidx) => (
                  <li key={lidx} className="flex justify-between items-baseline">
                    <span className="font-semibold">{lang.language}</span>
                    <span className="text-[11px] text-slate-500">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {interests && interests.length > 0 && (
            <section>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b pb-1 mb-2" style={{ borderColor: primaryColor }}>
                Intérêts
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
