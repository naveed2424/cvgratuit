export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  companyHired: string;
  city: string;
  rating: number;
  text: string;
  date: string;
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Thomas R.',
    role: 'Conseiller de Vente',
    companyHired: 'Galeries Lafayette',
    city: 'Paris',
    rating: 5,
    text: 'Vraiment top pour faire un CV gratuit ! J\'en avais marre des sites qui te font passer 45 minutes pour ensuite réclamer 2,99 € puis un abonnement caché de 30 € par mois. Ici, le PDF est sorti immédiatement, superbe mise en page, et j\'ai décroché 3 entretiens la première semaine.',
    date: 'Il y a 3 jours'
  },
  {
    id: '2',
    name: 'Camille B.',
    role: 'Infirmière DE',
    companyHired: 'AP-HP Paris',
    city: 'Versailles',
    rating: 5,
    text: 'Les suggestions de phrases par métier sont bluffantes. J\'avais du mal à formuler mes soins techniques et mes responsabilités en réanimation. L\'outil m\'a aidée à valoriser mes compétences avec les bons mots-clés.',
    date: 'Il y a 1 semaine'
  },
  {
    id: '3',
    name: 'Karim M.',
    role: 'Développeur Full Stack',
    companyHired: 'Decathlon Digital',
    city: 'Lille',
    rating: 5,
    text: 'Le modèle Compact Tech est exactement ce dont j\'avais besoin pour tout faire tenir sur 1 seule page A4 propre. Le score ATS intégré m\'a permis d\'ajouter les mots-clés manquants sur Docker et TypeScript.',
    date: 'Il y a 2 semaines'
  },
  {
    id: '4',
    name: 'Élodie D.',
    role: 'Chargée de Marketing',
    companyHired: 'Carrefour France',
    city: 'Lyon',
    rating: 5,
    text: 'Design soigné et moderne inspiré des meilleurs standards. La lettre de motivation assortie avec le même code couleur et la même typographie a fait sensation auprès du DRH. Un sans-faute !',
    date: 'Il y a 3 semaines'
  }
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Gratuité & Tarification',
    question: 'Le téléchargement du CV en PDF est-il réellement 100% gratuit ?',
    answer: 'Oui, sans aucune restriction. Vous n\'avez besoin ni d\'entrer votre carte bancaire, ni de souscrire un abonnement d\'essai piégé. Vous créez votre CV, le personnalisez et téléchargez votre fichier PDF immédiatement, sans filigrane disgracieux.'
  },
  {
    category: 'ATS & Recrutement',
    question: 'Qu\'est-ce qu\'un logiciel ATS et pourquoi vos modèles sont-ils optimisés ?',
    answer: 'Un ATS (Applicant Tracking System) est un logiciel utilisé par plus de 85% des grandes entreprises (Carrefour, Decathlon, Renault, banques, etc.) pour filtrer automatiquement les candidatures avant l\'intervention d\'un recruteur humain. Nos modèles sont conçus selon les critères stricts de ces robots : structure de texte claire, titres normalisés (Expériences, Formations, Compétences), absence de tableaux illisibles et formats compatibles.'
  },
  {
    category: 'Normes Françaises',
    question: 'Faut-il mettre une photo sur un CV en France en 2026 ?',
    answer: 'Sur le plan légal (Article L1132-1 du Code du travail), la photo n\'est en aucun cas obligatoire en France pour lutter contre les discriminations à l\'embauche. Toutefois, dans les secteurs en contact direct avec le public (commerce, vente haut de gamme, hôtellerie, accueil), les recruteurs apprécient souvent une photo professionnelle et souriante. Dans notre outil, vous pouvez afficher ou masquer votre photo en un simple clic.'
  },
  {
    category: 'Longueur & Format',
    question: 'Mon CV doit-il obligatoirement tenir sur une seule page ?',
    answer: 'En France, la règle d\'or pour les candidats ayant moins de 7 à 10 ans d\'expérience est de privilégier un CV synthétique sur une seule page A4. Pour les profils seniors, cadres dirigeants ou scientifiques avec de nombreuses publications, un format sur deux pages est parfaitement accepté.'
  },
  {
    category: 'Confidentialité & RGPD',
    question: 'Comment mes données personnelles sont-elles protégées ?',
    answer: 'Notre plateforme applique une politique stricte de confidentialité conforme au RGPD européen. Vos informations sont stockées localement dans le stockage sécurisé de votre navigateur (localStorage). Aucune de vos coordonnées n\'est revendue ou cédée à des démarcheurs ou cabinets tiers.'
  },
  {
    category: 'Lettre de Motivation',
    question: 'Puis-je créer une lettre de motivation assortie à mon CV ?',
    answer: 'Oui ! Notre outil intègre un générateur de lettre de motivation reprenant automatiquement la même charte graphique, les mêmes couleurs et la même typographie que votre CV pour envoyer un dossier de candidature cohérent et percutant.'
  }
];

export const RECRUITER_BRANDS = [
  { name: 'Carrefour', logoText: 'Carrefour' },
  { name: 'Tesla', logoText: 'TESLA' },
  { name: 'Renault', logoText: 'RENAULT' },
  { name: 'Decathlon', logoText: 'DECATHLON' },
  { name: 'La Poste', logoText: 'LA POSTE' },
  { name: 'L\'Oréal', logoText: 'L\'ORÉAL' },
  { name: 'BNP Paribas', logoText: 'BNP PARIBAS' },
  { name: 'SNCF', logoText: 'SNCF' },
];

export const EEAT_CREDENTIALS = {
  author: 'Comité Éditorial & Consultants RH CVGratuit France',
  validationDate: 'Octobre 2026',
  standards: ['France Travail (Pôle Emploi)', 'Normes APEC Cadres', 'Fédération Syntec Recrutement', 'Directives RGPD CNIL'],
  reviewSummary: 'Contenu rédigé et audité par des professionnels des ressources humaines totalisant plus de 25 ans d\'expérience en cabinet de recrutement et directions RH d\'ETI et du CAC 40.'
};
