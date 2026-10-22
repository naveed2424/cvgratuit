import { JobPreset } from '../types/resume';

export const JOB_PRESETS: JobPreset[] = [
  {
    id: 'conseiller-vente',
    category: 'Vente & Commerce',
    title: 'Conseiller de Vente Prêt-à-Porter & Luxe',
    summary: 'Conseiller de vente passionné avec plus de 4 ans d\'expérience dans le commerce de détail haut de gamme. Expert en accueil personnalisé, techniques d\'upselling et fidélisation d\'une clientèle exigeante. Reconnu pour mon dynamisme commercial et le dépassement constant des objectifs de chiffre d\'affaires.',
    skills: ['Techniques de vente consultative', 'Gestion de caisse & encaissement', 'Merchandising visuel', 'Gestion des stocks & réassort', 'Logiciels Retail (Cegid, Salesforce)', 'Fidélisation VIP'],
    softSkills: ['Sens du service client', 'Excellente communication', 'Esprit d\'équipe', 'Résistance au stress', 'Rigueur'],
    experiences: [
      {
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
        degree: 'BTS Négociation et Digitalisation de la Relation Client (NDRC)',
        field: 'Commerce & Vente',
        institution: 'Lycée Turgot',
        location: 'Paris',
        year: '2021',
        details: 'Major de promotion - Option relation client multicanal.'
      },
      {
        degree: 'Baccalauréat Professionnel Métiers du Commerce',
        field: 'Commerce',
        institution: 'Lycée Jean Monnet',
        location: 'Montreuil',
        year: '2019',
        details: 'Mention Bien.'
      }
    ],
    languages: [
      { language: 'Français', level: 'Langue maternelle' },
      { language: 'Anglais', level: 'Courant professionnel (C1)' },
      { language: 'Espagnol', level: 'Intermédiaire (B1)' }
    ],
    interests: ['Histoire de la mode & Haute Couture', 'Photographie urbaine', 'Course à pied (semi-marathon de Paris 2024)']
  },
  {
    id: 'developpeur-web',
    category: 'Informatique & Tech',
    title: 'Développeur Full Stack React / Node.js',
    summary: 'Développeur Full Stack rigoureux avec 3 ans d\'expérience dans la conception d\'applications web réactives et performantes. Spécialisé en écosystème TypeScript, React, Next.js, Node.js et bases de données SQL/NoSQL. Passionné par l\'architecture propre (Clean Code) et l\'optimisation de l\'expérience utilisateur.',
    skills: ['TypeScript / JavaScript', 'React 19 / Next.js', 'Node.js / Express', 'Tailwind CSS', 'PostgreSQL / Supabase', 'Docker & CI/CD', 'Git / GitHub', 'Tests unitaires (Jest, Vitest)'],
    softSkills: ['Résolution de problèmes', 'Travail en mode Agile / Scrum', 'Curiosité technique', 'Communication claire', 'Autonomie'],
    experiences: [
      {
        role: 'Développeur Full Stack',
        company: 'Fintech NovaPay',
        location: 'Lyon, France',
        startDate: 'Mars 2023',
        endDate: 'Présent',
        current: true,
        description: 'Développement de fonctionnalités critiques sur le tableau de bord marchand utilisé par 50 000+ commerçants.',
        highlights: [
          'Réduction de 40% du temps de chargement des pages clés grâce au server-side rendering et à l\'optimisation des requêtes SQL.',
          'Implémentation du module de paiement récurrent et gestion des webhooks bancaires sécurisés (Stripe API).',
          'Conception et documentation d\'une bibliothèque de composants d\'interface interne réutilisée par 4 équipes.'
        ]
      },
      {
        role: 'Développeur Front-End React',
        company: 'Agence Digitale Pulse',
        location: 'Lyon, France',
        startDate: 'Septembre 2021',
        endDate: 'Février 2023',
        current: false,
        description: 'Intégration d\'applications SaaS et plateformes e-commerce pour des clients B2B et B2C.',
        highlights: [
          'Livraison de 8 projets web dans le respect strict des délais et des standards d\'accessibilité RGAA.',
          'Migration d\'une base de code legacy jQuery vers React 18, réduisant le taux de bugs signalés de 30%.'
        ]
      }
    ],
    education: [
      {
        degree: 'Master 2 Ingénierie du Web et du Logiciel',
        field: 'Informatique',
        institution: 'Université Claude Bernard Lyon 1',
        location: 'Lyon',
        year: '2021',
        details: 'Projet de fin d\'études primé : Plateforme de mise en relation d\'artisans écoresponsables.'
      },
      {
        degree: 'Licence Informatique',
        field: 'Sciences pour l\'Ingénieur',
        institution: 'Université de Strasbourg',
        location: 'Strasbourg',
        year: '2019'
      }
    ],
    languages: [
      { language: 'Français', level: 'Langue maternelle' },
      { language: 'Anglais', level: 'Bilingue / C2 (TOEIC 965)' }
    ],
    interests: ['Contributions Open Source', 'Randonnée en montagne', 'Échecs en compétition']
  },
  {
    id: 'infirmier',
    category: 'Santé & Soins',
    title: 'Infirmier Diplômé d\'État (IDE)',
    summary: 'Infirmier polyvalent et bienveillant disposant de 5 ans d\'exercice en milieu hospitalier public et médico-chirurgical. Rigoureux dans l\'application des protocoles de soins d\'urgence, l\'administration médicamenteuse et la traçabilité informatique du dossier patient. Doté d\'une grande empathie envers les patients et leurs familles.',
    skills: ['Soins infirmiers techniques & d\'urgence', 'Surveillance post-opératoire', 'Pharmacologie & calcul de doses', 'Prélèvements & perfusions', 'Logiciels hospitaliers (Gilda, DxCare)', 'Hygiène & asepsie hospitalière'],
    softSkills: ['Empathie & écoute active', 'Résistance physique et émotionnelle', 'Gestion des urgences', 'Esprit d\'équipe pluridisciplinaire', 'Réactivité'],
    experiences: [
      {
        role: 'Infirmier de Soins Polyvalents',
        company: 'Centre Hospitalier Universitaire (CHU)',
        location: 'Bordeaux, France',
        startDate: 'Janvier 2022',
        endDate: 'Présent',
        current: true,
        description: 'Prise en charge globale de 12 à 15 patients par garde au sein du service de médecine interne.',
        highlights: [
          'Réalisation des bilans hémodynamiques, pansements complexes et préparation des protocoles de chimiothérapie.',
          'Référent hygiène du service : organisation de sessions de sensibilisation aux gestes barrières et traçabilité.',
          'Accompagnement psychologique personnalisé des patients en soins palliatifs et de leurs proches.'
        ]
      },
      {
        role: 'Infirmier en Chirurgie Ambulatoire',
        company: 'Clinique du Parc',
        location: 'Bordeaux, France',
        startDate: 'Juillet 2019',
        endDate: 'Décembre 2021',
        current: false,
        description: 'Accueil, préparation pré-opératoire et surveillance post-interventionnelle des patients.',
        highlights: [
          'Supervision du réveil et évaluation de la douleur chez 20+ patients par jour.',
          'Formation et encadrement de 6 étudiants en stage IFSI.'
        ]
      }
    ],
    education: [
      {
        degree: 'Diplôme d\'État d\'Infirmier (IDE)',
        field: 'Soins Infirmiers',
        institution: 'IFSI CHU de Bordeaux',
        location: 'Bordeaux',
        year: '2019',
        details: 'Mémoire sur la communication thérapeutique et la gestion du stress préopératoire.'
      }
    ],
    languages: [
      { language: 'Français', level: 'Langue maternelle' },
      { language: 'Anglais', level: 'Intermédiaire (B2 médical)' }
    ],
    interests: ['Secourisme bénévole (Croix-Rouge)', 'Natation synchronisée', 'Jardinage potager']
  },
  {
    id: 'marketing-digital',
    category: 'Marketing & Communication',
    title: 'Chargé de Marketing Digital & Acquisition',
    summary: 'Spécialiste du marketing digital avec 3 ans d\'expérience dans le pilotage de campagnes d\'acquisition payantes (Google Ads, Meta Ads) et l\'optimisation SEO. Orienté ROI et data-driven, capable de définir et déployer des tunnels de conversion rentables pour accroître la notoriété et le volume de prospects qualifiés.',
    skills: ['Google Ads & Meta Ads', 'SEO sémantique & technique', 'Google Analytics 4 & Looker Studio', 'Inbound marketing & Newsletters (HubSpot, Brevo)', 'Copywriting persuasif', 'A/B Testing & Taux de conversion'],
    softSkills: ['Esprit d\'analyse', 'Créativité & force d\'innovation', 'Sens du résultat', 'Organisation rigoureuse'],
    experiences: [
      {
        role: 'Chargé de Marketing Digital',
        company: 'GreenEats France',
        location: 'Nantes, France',
        startDate: 'Mai 2022',
        endDate: 'Présent',
        current: true,
        description: 'Gestion du budget publicitaire mensuel (45 000 €) et des leviers d\'acquisition online.',
        highlights: [
          'Augmentation de 65% du trafic organique via une stratégie de grappes thématiques et refonte SEO du blog.',
          'Baisse du coût par acquisition (CPA) de 22% sur les campagnes Google Ads Search et Performance Max.',
          'Lancement d\'une séquence automatisée de lead nurturing générant 150 000 € de CA additionnel en 1 an.'
        ]
      },
      {
        role: 'Assistant Marketing & Community Manager',
        company: 'Start-up TrendLab',
        location: 'Rennes, France',
        startDate: 'Septembre 2020',
        endDate: 'Avril 2022',
        current: false,
        description: 'Animation des réseaux sociaux (Instagram, LinkedIn, TikTok) et création de contenu éditorial.',
        highlights: [
          'Croissance de la communauté LinkedIn de 2 500 à 18 000 abonnés qualifiés.',
          'Coordination de partenariats influenceurs avec un taux d\'engagement moyen de 4.8%.'
        ]
      }
    ],
    education: [
      {
        degree: 'Master Marketing Stratégique et Digital',
        field: 'Sciences de Gestion',
        institution: 'Audencia Business School',
        location: 'Nantes',
        year: '2021'
      },
      {
        degree: 'Bachelor Communication & Médias',
        field: 'Communication',
        institution: 'SciencesCom',
        location: 'Nantes',
        year: '2019'
      }
    ],
    languages: [
      { language: 'Français', level: 'Langue maternelle' },
      { language: 'Anglais', level: 'Courant (C1)' },
      { language: 'Allemand', level: 'Notions (A2)' }
    ],
    interests: ['Veille intelligence artificielle & prompt engineering', 'Podcasts économiques', 'Course à pied']
  },
  {
    id: 'assistant-administratif',
    category: 'Administration & Gestion',
    title: 'Assistant Administratif & Polyvalent',
    summary: 'Assistant administratif rigoureux et méthodique fort de 6 ans d\'expérience dans la gestion opérationnelle de PME et cabinets professionnels. Maîtrise complète de la suite bureautique Office 365, de la facturation client/fournisseur et de l\'accueil des usagers. Sens aigu de la confidentialité et des priorités.',
    skills: ['Gestion administrative & secrétariat', 'Facturation & pré-comptabilité (Sage, Cegid)', 'Pack Office avancé (Excel TCD, Word, Outlook)', 'Accueil physique et téléphonique', 'Gestion d\'agendas complexes & déplacements', 'Archivage physique et dématérialisé'],
    softSkills: ['Rigueur & discrétion absolue', 'Sens de l\'organisation', 'Ponctualité', 'Aisance relationnelle', 'Polyvalence'],
    experiences: [
      {
        role: 'Assistant Administratif Polyvalent',
        company: 'Cabinet Juridique & Associés',
        location: 'Toulouse, France',
        startDate: 'Février 2020',
        endDate: 'Présent',
        current: true,
        description: 'Prise en charge intégrale de la gestion administrative quotidienne du cabinet de 12 juristes.',
        highlights: [
          'Gestion des plannings d\'audiences, réservations logistiques et rédaction des comptes-rendus de réunions.',
          'Suivi de la facturation et recouvrement amiable réduisant les délais de paiement clients de 45 à 28 jours.',
          'Mise en place d\'un système de classement numérique conforme aux normes de protection des données RGPD.'
        ]
      },
      {
        role: 'Secrétaire Polyvalente',
        company: 'Société Batimex BTP',
        location: 'Toulouse, France',
        startDate: 'Juin 2017',
        endDate: 'Janvier 2020',
        current: false,
        description: 'Accueil des clients, standard téléphonique (80 appels/jour) et préparation des devis.',
        highlights: [
          'Rédaction et mise en page des dossiers d\'appels d\'offres publics.',
          'Gestion des commandes de fournitures et négociation de tarifs préférentiels (-12%).'
        ]
      }
    ],
    education: [
      {
        degree: 'BTS Gestion de la PME (ex BTS AG PME-PMI)',
        field: 'Administration des Entreprises',
        institution: 'Lycée Ozenne',
        location: 'Toulouse',
        year: '2017'
      },
      {
        degree: 'Baccalauréat STMG - Option Gestion et Finance',
        field: 'Gestion',
        institution: 'Lycée Saint-Sernin',
        location: 'Toulouse',
        year: '2015'
      }
    ],
    languages: [
      { language: 'Français', level: 'Langue maternelle' },
      { language: 'Espagnol', level: 'Professionnel (B2)' },
      { language: 'Anglais', level: 'Intermédiaire (B1)' }
    ],
    interests: ['Bénévolat associatif', 'Cuisine méditerranéenne', 'Lecture de romans policiers']
  },
  {
    id: 'commercial-b2b',
    category: 'Vente & Commerce',
    title: 'Commercial B2B / Ingénieur Commercial',
    summary: 'Commercial B2B dynamique et négociateur aguerri avec 4 ans d\'expérience dans la vente de solutions logicielles SaaS et services professionnels. Maîtrise du cycle de vente complexe de la prospection téléphonique à la signature contractuelle. Tempérament de chasseur axé sur le dépassement des quotas.',
    skills: ['Prospection commerciale (Cold calling, Social selling)', 'Négociation contractuelle & Closing B2B', 'CRM Salesforce & HubSpot', 'Vente de solutions SaaS', 'Animation de rendez-vous de démonstration', 'Gestion de pipeline commercial'],
    softSkills: ['Tenacité & combativité', 'Écoute active & empathie', 'Culture du résultat', 'Sens de la persuasion', 'Autonomie'],
    experiences: [
      {
        role: 'Business Developer B2B',
        company: 'SaaS CloudSecure',
        location: 'Lille, France',
        startDate: 'Septembre 2022',
        endDate: 'Présent',
        current: true,
        description: 'Développement d\'un portefeuille de comptes PME et ETI sur le secteur Nord de France et Belgique.',
        highlights: [
          'Génération de 420 000 € d\'ARR sur l\'exercice 2024, soit 125% du quota annuel imposé.',
          'Signature de 18 nouveaux contrats grands comptes avec un cycle moyen de 4 mois.',
          'Mise en place de séquences d\'emails personnalisés avec un taux d\'ouverture de 48% et 18% de prise de RDV.'
        ]
      },
      {
        role: 'Chargé de Clientèle Entreprises',
        company: 'Groupe Bureau & Co',
        location: 'Lille, France',
        startDate: 'Novembre 2020',
        endDate: 'Août 2022',
        current: false,
        description: 'Fidélisation et développement d\'un parc existant de 110 comptes professionnels.',
        highlights: [
          'Réduction du taux d\'attrition (churn) de 14% à 6% en 18 mois grâce à des bilans trimestriels réguliers.',
          'Cross-selling de services complémentaires générant +28% de marge brute.'
        ]
      }
    ],
    education: [
      {
        degree: 'Master 2 Management et Négociation Commerciale',
        field: 'Commerce & Vente',
        institution: 'IAE de Lille',
        location: 'Lille',
        year: '2020'
      },
      {
        degree: 'DUT Techniques de Commercialisation',
        field: 'Vente',
        institution: 'IUT de Valenciennes',
        location: 'Valenciennes',
        year: '2018'
      }
    ],
    languages: [
      { language: 'Français', level: 'Langue maternelle' },
      { language: 'Anglais', level: 'Négociation professionnelle (C1)' },
      { language: 'Néerlandais', level: 'Notions élémentaires (A2)' }
    ],
    interests: ['Football en club régional', 'Investissement immobilier', 'Voyages et découvertes culturelles']
  },
  {
    id: 'comptable',
    category: 'Finance & Comptabilité',
    title: 'Comptable Général & Fiscalité',
    summary: 'Comptable général chevronné avec 5 années de pratique en cabinet d\'expertise comptable et en entreprise. Maîtrise éprouvée des écritures d\'inventaire, des clôtures mensuelles et annuelles, des déclarations fiscales (TVA, IS, CVAE) et de la préparation de la liasse fiscale. Rigoureux, fiable et à l\'aise avec les ERP comptables.',
    skills: ['Comptabilité générale & analytique', 'Clôtures bilans & liasse fiscale', 'Déclarations fiscales (TVA, CFE, IS)', 'ERP (SAP, Sage 1000, Cegid)', 'Rapprochements bancaires & lettrage', 'Gestion de la trésorerie prévisionnelle'],
    softSkills: ['Précision & rigueur mathématique', 'Sens critique et d\'analyse', 'Discrétion', 'Respect strict des échéances légales'],
    experiences: [
      {
        role: 'Comptable Général',
        company: 'Groupe AgroAlim France',
        location: 'Strasbourg, France',
        startDate: 'Avril 2021',
        endDate: 'Présent',
        current: true,
        description: 'Tenue de la comptabilité générale pour 3 filiales générant 18M€ de CA consolidé.',
        highlights: [
          'Élaboration autonome des bilans comptables et comptes de résultat avec certification sans réserve des CAC.',
          'Dématérialisation complète du traitement des 800 factures mensuelles avec réduction des coûts de traitement de 35%.',
          'Gestion quotidienne de la trésorerie et prévisions glissantes à 3 mois.'
        ]
      },
      {
        role: 'Collaborateur Comptable Junior',
        company: 'Cabinet d\'Expertise FiduConseil',
        location: 'Strasbourg, France',
        startDate: 'Septembre 2019',
        endDate: 'Mars 2021',
        current: false,
        description: 'Gestion d\'un portefeuille de 25 dossiers d\'artisans, commerçants et professions libérales.',
        highlights: [
          'Saisie comptable, révision des comptes et établissement des déclarations de TVA périodiques.',
          'Conseil régulier aux chefs d\'entreprise sur le pilotage de leur rentabilité.'
        ]
      }
    ],
    education: [
      {
        degree: 'DCG - Diplôme de Comptabilité et de Gestion (Bac+3)',
        field: 'Comptabilité & Finance',
        institution: 'Lycée René Cassin',
        location: 'Strasbourg',
        year: '2019'
      },
      {
        degree: 'BTS Comptabilité et Gestion (CG)',
        field: 'Comptabilité',
        institution: 'Lycée Kléber',
        location: 'Strasbourg',
        year: '2017'
      }
    ],
    languages: [
      { language: 'Français', level: 'Langue maternelle' },
      { language: 'Allemand', level: 'Intermédiaire professionnel (B2)' },
      { language: 'Anglais', level: 'Comptable & financier (B1)' }
    ],
    interests: ['Course de fond (Marathon de Colmar)', 'Généalogie', 'Bricolage et restauration de meubles anciens']
  },
  {
    id: 'restauration-serveur',
    category: 'Hôtellerie & Restauration',
    title: 'Chef de Rang / Serveur en Restauration Gastronomique',
    summary: 'Professionnel de la restauration enthousiaste et endurant avec 4 ans d\'expérience dans des établissements renommés et brasseries haut de gamme. Passionné par l\'art de la table, le conseil oenologique et l\'expérience client irréprochable. Gestion efficace d\'un rang de 30 couverts en service continu.',
    skills: ['Service en salle & découpe', 'Prise de commande & encaissement tactile (L\'Addition, Micros)', 'Conseil mets & vins (œnologie)', 'Normes d\'hygiène HACCP', 'Gestion du passe & coordination cuisine', 'Anglais de table'],
    softSkills: ['Sens aigu de l\'accueil et de l\'élégance', 'Rapidité & endurance physique', 'Gestion du coup de feu', 'Sourire et amabilité constants'],
    experiences: [
      {
        role: 'Chef de Rang',
        company: 'Brasserie Le Grand Colbert',
        location: 'Paris, France',
        startDate: 'Mai 2022',
        endDate: 'Présent',
        current: true,
        description: 'Responsable d\'un rang de 8 tables (32 couverts) en service midi et soir.',
        highlights: [
          'Augmentation des ventes de desserts et de digestifs de 20% par un conseil actif et personnalisé.',
          'Fidélisation d\'une clientèle d\'affaires et touristique avec des retours élogieux réguliers sur TripAdvisor/Google.',
          'Encadrement de 2 commis de salle et vérification de la mise en place irréprochable des tables.'
        ]
      },
      {
        role: 'Serveur Polyvalent',
        company: 'Hôtel Restaurant Mercure',
        location: 'Marseille, France',
        startDate: 'Juin 2020',
        endDate: 'Avril 2022',
        current: false,
        description: 'Service des petits-déjeuners, déjeuners séminaires et room service.',
        highlights: [
          'Gestion des buffets séminaires de 150 convives dans le respect strict des horaires et de la propreté.',
          'Application rigoureuse des normes sanitaires et désinfection.'
        ]
      }
    ],
    education: [
      {
        degree: 'Baccalauréat Professionnel Commercialisation et Services en Restauration',
        field: 'Hôtellerie-Restauration',
        institution: 'Lycée Hôtelier Guillaume Tirel',
        location: 'Paris',
        year: '2020',
        details: 'Option sommellerie et bar.'
      },
      {
        degree: 'CAP Restaurant',
        field: 'Métiers de la Salle',
        institution: 'CFA Méditerranée',
        location: 'Marseille',
        year: '2018'
      }
    ],
    languages: [
      { language: 'Français', level: 'Langue maternelle' },
      { language: 'Anglais', level: 'Courant de service (B2)' },
      { language: 'Italien', level: 'Notions d\'accueil (A2)' }
    ],
    interests: ['Dégustation oenologique & terroirs', 'Cuisine du monde', 'Cyclisme sur route']
  }
];

export const INITIAL_RESUME_DATA = JOB_PRESETS[0];
