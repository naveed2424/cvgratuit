import React from 'react';
import { ResumeData } from '../../../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Car, Award } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

export const ModernCobalt: React.FC<TemplateProps> = ({ data }) => {
  const { personalInfo, experiences, education, skills, softSkills, languages, interests, style } = data;
  const primaryColor = style.primaryColor || '#2563eb';

  return (
    <div className={`a4-sheet bg-white text-slate-800 ${style.fontFamily === 'serif' ? 'font-serif-cv' : style.fontFamily === 'display' ? 'font-display-cv' : style.fontFamily === 'mono' ? 'font-mono-cv' : 'font-sans-cv'} flex flex-row min-h-[297mm] shadow-lg print:shadow-none print:w-full`}>
      {/* Colonne latérale gauche (33%) */}
      <aside 
        className="w-[33%] p-6 text-white flex flex-col justify-between"
        style={{ backgroundColor: primaryColor }}
      >
        <div>
          {/* Photo */}
          {personalInfo.showPhoto && personalInfo.photoUrl && (
            <div className="flex justify-center mb-6">
              <img
                src={personalInfo.photoUrl}
                alt={`${personalInfo.firstName} ${personalInfo.lastName}`}
                className="w-32 h-32 rounded-full object-cover border-4 border-white/80 shadow-md"
              />
            </div>
          )}

          {/* Coordonnées */}
          <div className="mb-6">
            <h3 className="text-xs uppercase tracking-wider font-bold text-white/80 border-b border-white/30 pb-1 mb-3">
              Contact
            </h3>
            <ul className="space-y-2 text-xs text-white/90">
              {personalInfo.email && (
                <li className="flex items-center gap-2 break-all">
                  <Mail className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{personalInfo.email}</span>
                </li>
              )}
              {personalInfo.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{personalInfo.phone}</span>
                </li>
              )}
              {(personalInfo.city || personalInfo.postalCode) && (
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>
                    {personalInfo.postalCode} {personalInfo.city}
                    {personalInfo.country ? `, ${personalInfo.country}` : ''}
                  </span>
                </li>
              )}
              {personalInfo.drivingLicense && (
                <li className="flex items-center gap-2">
                  <Car className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{personalInfo.drivingLicense}</span>
                </li>
              )}
              {personalInfo.linkedin && (
                <li className="flex items-center gap-2 break-all">
                  <Linkedin className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{personalInfo.linkedin.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </li>
              )}
              {personalInfo.website && (
                <li className="flex items-center gap-2 break-all">
                  <Globe className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span>{personalInfo.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Compétences techniques */}
          {skills && skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider font-bold text-white/80 border-b border-white/30 pb-1 mb-2.5">
                Compétences
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {skills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-block bg-white/15 backdrop-blur-xs text-[11px] px-2 py-0.5 rounded-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Soft skills */}
          {softSkills && softSkills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider font-bold text-white/80 border-b border-white/30 pb-1 mb-2.5">
                Atouts & Savoir-être
              </h3>
              <ul className="space-y-1 text-xs text-white/90">
                {softSkills.map((soft, index) => (
                  <li key={index} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/70"></span>
                    <span>{soft}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Langues */}
          {languages && languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs uppercase tracking-wider font-bold text-white/80 border-b border-white/30 pb-1 mb-2.5">
                Langues
              </h3>
              <ul className="space-y-2 text-xs text-white/90">
                {languages.map((lang, index) => (
                  <li key={index} className="flex justify-between items-baseline">
                    <span className="font-medium text-white">{lang.language}</span>
                    <span className="text-[11px] text-white/80">{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Centres d'intérêt */}
          {interests && interests.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xs uppercase tracking-wider font-bold text-white/80 border-b border-white/30 pb-1 mb-2">
                Centres d'intérêt
              </h3>
              <p className="text-[11px] leading-relaxed text-white/85">
                {interests.join(' • ')}
              </p>
            </div>
          )}
        </div>
      </aside>

      {/* Colonne droite principale (67%) */}
      <main className="w-[67%] p-7 flex flex-col justify-between">
        <div>
          {/* Header avec Nom & Titre */}
          <header className="border-b pb-4 mb-5 border-slate-200">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 uppercase">
              {personalInfo.firstName} <span style={{ color: primaryColor }}>{personalInfo.lastName}</span>
            </h1>
            <p className="text-base font-semibold text-slate-700 mt-0.5 tracking-wide">
              {personalInfo.title}
            </p>

            {/* Accroche / Profil */}
            {personalInfo.summary && (
              <p className="mt-3 text-xs leading-relaxed text-slate-600">
                {personalInfo.summary}
              </p>
            )}
          </header>

          {/* Expériences professionnelles */}
          {experiences && experiences.length > 0 && (
            <section className="mb-6">
              <h2 
                className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 pb-1 border-b"
                style={{ color: primaryColor, borderColor: '#e2e8f0' }}
              >
                <span>Expérience professionnelle</span>
              </h2>

              <div className="space-y-4">
                {experiences.map((exp) => (
                  <div key={exp.id} className="cv-item-break">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">{exp.role}</h3>
                      <span className="text-[11px] font-medium text-slate-500">
                        {exp.startDate} – {exp.current ? 'Présent' : exp.endDate}
                      </span>
                    </div>
                    <div className="text-[11px] font-semibold text-slate-600 mb-1">
                      {exp.company} {exp.location ? `• ${exp.location}` : ''}
                    </div>
                    {exp.description && (
                      <p className="text-[11px] text-slate-600 mb-1.5 leading-snug">
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

          {/* Diplômes et Formations */}
          {education && education.length > 0 && (
            <section className="mb-4">
              <h2 
                className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2 pb-1 border-b"
                style={{ color: primaryColor, borderColor: '#e2e8f0' }}
              >
                <span>Diplômes et Formations</span>
              </h2>

              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id} className="cv-item-break">
                    <div className="flex justify-between items-baseline">
                      <h3 className="text-xs font-bold text-slate-900">{edu.degree}</h3>
                      <span className="text-[11px] font-medium text-slate-500">{edu.year}</span>
                    </div>
                    <div className="text-[11px] text-slate-600 font-medium">
                      {edu.institution} {edu.location ? `• ${edu.location}` : ''}
                    </div>
                    {edu.details && (
                      <p className="text-[11px] text-slate-500 italic mt-0.5">
                        {edu.details}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications additionnelles si existantes */}
          {data.certifications && data.certifications.length > 0 && (
            <section className="mb-2">
              <h2 
                className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2 pb-1 border-b"
                style={{ color: primaryColor, borderColor: '#e2e8f0' }}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Certifications</span>
              </h2>
              <ul className="list-disc list-outside ml-3.5 space-y-0.5 text-[11px] text-slate-600">
                {data.certifications.map((cert, cidx) => (
                  <li key={cidx}>{cert}</li>
                ))}
              </ul>
            </section>
          )}
        </div>
      </main>
    </div>
  );
};
