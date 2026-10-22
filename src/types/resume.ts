export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  highlights: string[];
}

export interface EducationItem {
  id: string;
  degree: string;
  field: string;
  institution: string;
  location: string;
  year: string;
  details?: string;
}

export interface LanguageItem {
  id: string;
  language: string;
  level: string; // e.g. "Langue maternelle", "Courant (C1)", "Intermédiaire (B2)", "Notions (A2)"
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface PersonalInfo {
  firstName: string;
  lastName: string;
  title: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  photoUrl: string;
  showPhoto: boolean;
  drivingLicense: string; // e.g. "Permis B - Véhiculé"
  linkedin: string;
  website: string;
  summary: string;
}

export type TemplateId =
  | 'modern-cobalt'
  | 'executive-gold'
  | 'minimalist-clean'
  | 'creative-emerald'
  | 'compact-tech'
  | 'classic-ats';

export type FontFamily = 'sans' | 'serif' | 'display' | 'mono';

export interface StyleOptions {
  template: TemplateId;
  primaryColor: string;
  fontFamily: FontFamily;
  spacing: 'compact' | 'normal' | 'spacious';
  accentLight: string;
}

export interface CoverLetterData {
  recipientName: string;
  recipientCompany: string;
  recipientAddress: string;
  date: string;
  subject: string;
  salutation: string;
  intro: string;
  bodyParagraph1: string;
  bodyParagraph2: string;
  conclusion: string;
  signoff: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: ExperienceItem[];
  education: EducationItem[];
  skills: string[];
  softSkills: string[];
  languages: LanguageItem[];
  interests: string[];
  certifications: string[];
  style: StyleOptions;
  coverLetter: CoverLetterData;
}

export interface JobPreset {
  id: string;
  category: string;
  title: string;
  summary: string;
  skills: string[];
  softSkills: string[];
  experiences: Omit<ExperienceItem, 'id'>[];
  education: Omit<EducationItem, 'id'>[];
  languages: Omit<LanguageItem, 'id'>[];
  interests: string[];
}
