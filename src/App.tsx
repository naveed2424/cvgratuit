/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { ResumeData, JobPreset, TemplateId } from './types/resume';
import { BlogPost } from './types/blog';
import { INITIAL_BLOG_POSTS } from './data/blogData';
import { LandingPage } from './components/LandingPage';
import { CvEditor } from './components/Editor/CvEditor';
import { AtsCheckerModal } from './components/AtsChecker/AtsCheckerModal';
import { CommentsPage } from './components/CommentsPage';
import { AboutPage } from './components/AboutPage';
import { BlogHome } from './components/Blog/BlogHome';
import { ArticleDetail } from './components/Blog/ArticleDetail';
import { DailyTopicGeneratorModal } from './components/Blog/DailyTopicGeneratorModal';
import { TermsPage } from './components/Legal/TermsPage';
import { DisclaimerPage } from './components/Legal/DisclaimerPage';
import { PrivacyPage } from './components/Legal/PrivacyPage';
import { ContactPage } from './components/Contact/ContactPage';

const STORAGE_KEY = 'cvgratuit_user_resume_v1';
const BLOG_STORAGE_KEY = 'cvgratuit_blog_posts_v1';

const DEFAULT_RESUME_DATA: ResumeData = {
  personalInfo: {
    firstName: 'Elsa',
    lastName: 'Manet',
    title: 'Conseillère de Vente Senior & Prêt-à-Porter',
    email: 'elsa.manet@email.com',
    phone: '06 14 28 92 01',
    address: '12 Rue de Rivoli',
    city: 'Paris',
    postalCode: '75004',
    country: 'France',
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80',
    showPhoto: true,
    drivingLicense: 'Permis B - Véhiculé',
    linkedin: 'linkedin.com/in/elsa-manet-retail',
    website: '',
    summary: 'Conseillère de vente passionnée avec 4 ans d\'expérience dans le prêt-à-porter haut de gamme. Expert en accueil personnalisé, merchandising visuel et fidélisation d\'une clientèle exigeante. Reconnu pour le dépassement constant des objectifs de chiffre d\'affaires.',
  },
  experiences: [
    {
      id: 'exp-1',
      role: 'Conseillère de vente Senior - Prêt-à-porter Féminin',
      company: 'Boutique Sandro Paris',
      location: 'Paris, France',
      startDate: 'Septembre 2023',
      endDate: 'Présent',
      current: true,
      description: 'Animation du point de vente et conseil sur-mesure d\'une clientèle internationale.',
      highlights: [
        'Dépassement de 118% des objectifs mensuels individuels de chiffre d\'affaires sur 12 mois consécutifs.',
        'Création d\'un fichier de 250+ clients VIP fidélisés avec un panier moyen supérieur de 35% à la moyenne boutique.',
        'Mise en place des vitrines hebdomadaires selon les directives du Visual Merchandising du groupe.'
      ]
    },
    {
      id: 'exp-2',
      role: 'Conseillère de vente Produits de Luxe',
      company: 'Galeries Lafayette Haussmann',
      location: 'Paris, France',
      startDate: 'Octobre 2021',
      endDate: 'Août 2023',
      current: false,
      description: 'Vente assistée sur le corner maroquinerie et accessoires haut de gamme.',
      highlights: [
        'Accueil et conseil bilingue (français/anglais) auprès d\'une clientèle touristique et locale.',
        'Gestion quotidienne des flux d\'inventaire et réapprovisionnement sans aucune rupture constatée.',
        'Formation et tutorat de 3 nouveaux vendeurs juniors aux techniques d\'argumentaire de vente.'
      ]
    }
  ],
  education: [
    {
      id: 'edu-1',
      degree: 'BTS Négociation et Digitalisation de la Relation Client (NDRC)',
      field: 'Commerce & Vente',
      institution: 'Lycée Turgot',
      location: 'Paris',
      year: '2021',
      details: 'Major de promotion - Option relation client multicanal.'
    },
    {
      id: 'edu-2',
      degree: 'Baccalauréat Professionnel Métiers du Commerce',
      field: 'Commerce',
      institution: 'Lycée Jean Monnet',
      location: 'Montreuil',
      year: '2019',
      details: 'Mention Bien.'
    }
  ],
  skills: [
    'Techniques de vente consultative',
    'Gestion de caisse & encaissement',
    'Merchandising visuel',
    'Gestion des stocks & réassort',
    'Logiciels Retail (Cegid, Salesforce)',
    'Fidélisation VIP'
  ],
  softSkills: [
    'Sens du service client',
    'Excellente communication',
    'Esprit d\'équipe',
    'Résistance au stress',
    'Rigueur'
  ],
  languages: [
    { id: 'lang-1', language: 'Français', level: 'Langue maternelle' },
    { id: 'lang-2', language: 'Anglais', level: 'Courant professionnel (C1)' },
    { id: 'lang-3', language: 'Espagnol', level: 'Intermédiaire (B1)' }
  ],
  interests: [
    'Histoire de la mode & Haute Couture',
    'Photographie urbaine',
    'Course à pied (semi-marathon)'
  ],
  certifications: [
    'Certification Cegid Retail Y2',
    'Sauveteur Secouriste du Travail (SST)'
  ],
  style: {
    template: 'modern-cobalt',
    primaryColor: '#2563eb',
    fontFamily: 'sans',
    spacing: 'normal',
    accentLight: '#eff6ff',
  },
  coverLetter: {
    recipientName: 'Madame la Directrice des Ressources Humaines',
    recipientCompany: 'Boutique Maje & Sandro',
    recipientAddress: '75008 Paris',
    date: '27 Octobre 2026',
    subject: 'Candidature au poste de Conseillère de Vente Senior',
    salutation: 'Madame, Monsieur',
    intro: 'Vivement intéressée par le rayonnement et l\'excellence de votre maison, je vous soumets avec enthousiasme ma candidature pour le poste de Conseillère de Vente Senior.',
    bodyParagraph1: 'Forte de 4 années d\'expérience réussies dans l\'univers de la mode et du prêt-à-porter haut de gamme, j\'ai su développer un sens pointu de l\'accueil personnalisé et du conseil sur-mesure. Lors de mon précédent poste, j\'ai régulièrement dépassé mes objectifs de chiffre d\'affaires de plus de 18% tout en développant un portefeuille de clients fidélisés.',
    bodyParagraph2: 'Rejoindre votre équipe représente pour moi l\'opportunité d\'exprimer mon dynamisme commercial au sein d\'un environnement stimulant et d\'incarner avec fierté les valeurs de qualité de votre enseigne.',
    conclusion: 'Je serais ravie de vous rencontrer lors d\'un entretien afin de vous exposer de vive voix ma motivation et ma vision du service client.',
    signoff: 'Je vous prie d\'agréer, Madame, Monsieur, l\'expression de mes salutations distinguées.',
  }
};

export type AppView = 
  | 'landing' 
  | 'editor' 
  | 'comments' 
  | 'about' 
  | 'blog' 
  | 'article' 
  | 'terms' 
  | 'disclaimer' 
  | 'privacy' 
  | 'contact';

export default function App() {
  const [view, setView] = useState<AppView>('blog'); // Default to blog as requested
  const [resumeData, setResumeData] = useState<ResumeData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_RESUME_DATA;
  });

  // Blog posts storage
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(() => {
    try {
      const saved = localStorage.getItem(BLOG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_BLOG_POSTS;
  });

  const [selectedArticle, setSelectedArticle] = useState<BlogPost>(blogPosts[0]);
  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isGeneratorModalOpen, setIsGeneratorModalOpen] = useState(false);

  // Auto-save resume data
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(resumeData));
    } catch {}
  }, [resumeData]);

  // Auto-save blog posts
  useEffect(() => {
    try {
      localStorage.setItem(BLOG_STORAGE_KEY, JSON.stringify(blogPosts));
    } catch {}
  }, [blogPosts]);

  // Track page views in Google Analytics (gtag.js with official ID G-ZM8R2JF6WT)
  useEffect(() => {
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      const pageTitleMap: Record<AppView, string> = {
        landing: 'Accueil - Créateur de CV Gratuit',
        editor: 'Éditeur de CV en Ligne',
        comments: 'Avis Utilisateurs & Témoignages',
        about: 'À Propos de CVGratuit & Fondateur',
        blog: 'Le Mag Emploi & Carrière - Blog CV & Recrutement',
        article: selectedArticle ? selectedArticle.title : 'Article de Blog',
        terms: 'Conditions Générales d\'Utilisation (CGU)',
        disclaimer: 'Mentions Légales & Disclaimer',
        privacy: 'Politique de Confidentialité & RGPD',
        contact: 'Contact & Support Utilisateurs',
      };

      (window as any).gtag('event', 'page_view', {
        page_title: pageTitleMap[view] || view,
        page_location: window.location.href,
        page_path: view === 'landing' ? '/' : `/${view}${view === 'article' ? `/${selectedArticle?.slug}` : ''}`,
      });
    }
  }, [view, selectedArticle]);

  const handleSelectJobPreset = (preset: JobPreset) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        title: preset.title,
        summary: preset.summary,
      },
      experiences: preset.experiences.map((e, idx) => ({ ...e, id: `exp-${Date.now()}-${idx}` })),
      education: preset.education.map((e, idx) => ({ ...e, id: `edu-${Date.now()}-${idx}` })),
      skills: [...preset.skills],
      softSkills: [...preset.softSkills],
      languages: preset.languages.map((l, idx) => ({ ...l, id: `lang-${Date.now()}-${idx}` })),
      interests: [...preset.interests],
    }));
    setView('editor');
  };

  const handleSelectTemplate = (templateId: TemplateId) => {
    setResumeData(prev => ({
      ...prev,
      style: {
        ...prev.style,
        template: templateId,
      }
    }));
  };

  const handleOpenArticle = (article: BlogPost) => {
    setSelectedArticle(article);
    setView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePublishNewArticle = (newArticle: BlogPost) => {
    setBlogPosts(prev => [newArticle, ...prev]);
    setSelectedArticle(newArticle);
    setView('article');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'article_published', {
        title: newArticle.title,
        category: newArticle.categoryId,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f1e5] font-sans">
      {view === 'blog' ? (
        <BlogHome
          posts={blogPosts}
          onSelectArticle={handleOpenArticle}
          onOpenGenerator={() => setIsGeneratorModalOpen(true)}
          onBackToHome={() => setView('landing')}
          onStartCreating={() => setView('editor')}
          onOpenAbout={() => setView('about')}
          onOpenContact={() => setView('contact')}
          onOpenTerms={() => setView('terms')}
          onOpenPrivacy={() => setView('privacy')}
          onOpenDisclaimer={() => setView('disclaimer')}
        />
      ) : view === 'article' && selectedArticle ? (
        <ArticleDetail
          article={selectedArticle}
          allPosts={blogPosts}
          onBackToBlog={() => setView('blog')}
          onSelectArticle={handleOpenArticle}
          onStartCreating={() => setView('editor')}
          onOpenAbout={() => setView('about')}
          onOpenContact={() => setView('contact')}
          onOpenTerms={() => setView('terms')}
          onOpenPrivacy={() => setView('privacy')}
          onOpenDisclaimer={() => setView('disclaimer')}
        />
      ) : view === 'terms' ? (
        <TermsPage
          onBackToHome={() => setView('landing')}
          onOpenBlog={() => setView('blog')}
          onStartCreating={() => setView('editor')}
        />
      ) : view === 'disclaimer' ? (
        <DisclaimerPage
          onBackToHome={() => setView('landing')}
          onOpenBlog={() => setView('blog')}
          onStartCreating={() => setView('editor')}
        />
      ) : view === 'privacy' ? (
        <PrivacyPage
          onBackToHome={() => setView('landing')}
          onOpenBlog={() => setView('blog')}
          onStartCreating={() => setView('editor')}
        />
      ) : view === 'contact' ? (
        <ContactPage
          onBackToHome={() => setView('landing')}
          onOpenBlog={() => setView('blog')}
          onStartCreating={() => setView('editor')}
        />
      ) : view === 'about' ? (
        <AboutPage
          onBackToHome={() => setView('landing')}
          onStartCreating={() => setView('editor')}
        />
      ) : view === 'comments' ? (
        <CommentsPage
          onBackToHome={() => setView('landing')}
          onStartCreating={() => setView('editor')}
        />
      ) : view === 'editor' ? (
        <CvEditor
          data={resumeData}
          onChange={setResumeData}
          onBackToHome={() => setView('landing')}
        />
      ) : (
        <LandingPage
          onStartCreating={() => setView('editor')}
          onSelectJobPreset={handleSelectJobPreset}
          onSelectTemplate={handleSelectTemplate}
          onOpenLetter={() => setView('editor')}
          onOpenAtsChecker={() => setIsAtsModalOpen(true)}
          onOpenComments={() => setView('comments')}
          onOpenAbout={() => setView('about')}
          onOpenBlog={() => setView('blog')}
          onOpenTerms={() => setView('terms')}
          onOpenPrivacy={() => setView('privacy')}
          onOpenDisclaimer={() => setView('disclaimer')}
          onOpenContact={() => setView('contact')}
        />
      )}

      {/* Standalone ATS audit modal if triggered */}
      <AtsCheckerModal
        isOpen={isAtsModalOpen}
        onClose={() => setIsAtsModalOpen(false)}
        data={resumeData}
      />

      {/* Daily Trending Topic Generator Modal */}
      <DailyTopicGeneratorModal
        isOpen={isGeneratorModalOpen}
        onClose={() => setIsGeneratorModalOpen(false)}
        onPublishArticle={handlePublishNewArticle}
      />
    </div>
  );
}
