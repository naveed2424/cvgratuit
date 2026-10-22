import { TemplateId, FontFamily } from '../types/resume';

export interface TemplateDefinition {
  id: TemplateId;
  name: string;
  tagline: string;
  badge: string;
  description: string;
  previewBg: string;
  recommendedFor: string[];
}

export const TEMPLATES: TemplateDefinition[] = [
  {
    id: 'modern-cobalt',
    name: 'Moderne Cobalt',
    tagline: 'Le plus populaire auprès des recruteurs',
    badge: 'Recommandé 2026',
    description: 'Bandeau latéral soigné, hiérarchie visuelle impeccable et mise en valeur des compétences.',
    previewBg: 'bg-blue-600',
    recommendedFor: ['Vente & Commerce', 'Marketing & Communication', 'Management', 'Tertiaire'],
  },
  {
    id: 'executive-gold',
    name: 'Exécutif Prestige',
    tagline: 'Élégance sobre pour cadres & dirigeants',
    badge: 'Cadres & ETI',
    description: 'En-tête raffiné avec typographie serif noble, idéal pour les profils seniors et la finance.',
    previewBg: 'bg-slate-900',
    recommendedFor: ['Direction', 'Finance & Audit', 'Conseil & Juridique', 'Santé'],
  },
  {
    id: 'minimalist-clean',
    name: 'Minimaliste Épuré',
    tagline: 'Sobriété suisse & lisibilité maximale',
    badge: 'Ultra Lisible',
    description: 'Espaces aérés, typographie soignée et lignes légères. Fait ressortir le contenu sans artifice.',
    previewBg: 'bg-zinc-800',
    recommendedFor: ['Recherche & Enseignement', 'Architecture', 'Administratif', 'Édition'],
  },
  {
    id: 'creative-emerald',
    name: 'Créatif Émeraude',
    tagline: 'Dynamique et captivant au premier coup d\'œil',
    badge: 'Audacieux',
    description: 'Touches vert émeraude, puces dynamiques et badges modernes pour marquer les esprits.',
    previewBg: 'bg-emerald-600',
    recommendedFor: ['Design', 'Communication', 'Événementiel', 'Startups'],
  },
  {
    id: 'compact-tech',
    name: 'Compact Tech',
    tagline: 'Optimisé 1 page pour profils denses',
    badge: 'Tech & Ingénierie',
    description: 'Disposition en colonnes denses, badges techniques et focus sur les projets et compétences concrètes.',
    previewBg: 'bg-indigo-600',
    recommendedFor: ['Développeurs', 'Ingénieurs', 'Data & Cyber', 'Chefs de projet'],
  },
  {
    id: 'classic-ats',
    name: 'Classique 100% ATS',
    tagline: 'La garantie absolue de passage des robots RH',
    badge: '100% Conforme ATS',
    description: 'Structure linéaire universelle sans tableau complexe, décryptée à 100% par tous les logiciels ATS.',
    previewBg: 'bg-neutral-700',
    recommendedFor: ['Grands groupes', 'Institutions publiques', 'Banques', 'International'],
  },
];

export const COLOR_PALETTES = [
  { name: 'Bleu Cobalt', hex: '#2563eb', bg: 'bg-blue-600', light: '#eff6ff' },
  { name: 'Émeraude Vif', hex: '#059669', bg: 'bg-emerald-600', light: '#ecfdf5' },
  { name: 'Bordeaux Rubis', hex: '#991b1b', bg: 'bg-red-800', light: '#fef2f2' },
  { name: 'Noir Ardoise', hex: '#1e293b', bg: 'bg-slate-800', light: '#f8fafc' },
  { name: 'Indigo Profond', hex: '#4338ca', bg: 'bg-indigo-700', light: '#eef2ff' },
  { name: 'Ambre Cuivré', hex: '#d97706', bg: 'bg-amber-600', light: '#fffbeb' },
  { name: 'Cyan Moderne', hex: '#0891b2', bg: 'bg-cyan-600', light: '#ecfeff' },
  { name: 'Violet Impérial', hex: '#7c3aed', bg: 'bg-violet-600', light: '#f5f3ff' },
];

export const FONT_OPTIONS: { id: FontFamily; name: string; fontClass: string; desc: string }[] = [
  { id: 'sans', name: 'Plus Jakarta Sans', fontClass: 'font-sans-cv', desc: 'Moderne, clair et très lisible' },
  { id: 'serif', name: 'Merriweather', fontClass: 'font-serif-cv', desc: 'Traditionnel, élégant et noble' },
  { id: 'display', name: 'Playfair Display', fontClass: 'font-display-cv', desc: 'Prestige, luxe et distinction' },
  { id: 'mono', name: 'JetBrains Mono', fontClass: 'font-mono-cv', desc: 'Technologique, précis et sobre' },
];
