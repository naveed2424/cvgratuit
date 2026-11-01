export type BlogCategoryId = 
  | 'redaction-cv'
  | 'lettres-motivation'
  | 'entretien-embauche'
  | 'recherche-emploi'
  | 'reconversion-competences'
  | 'tendances-salaires';

export interface BlogCategory {
  id: BlogCategoryId;
  slug: string;
  name: string;
  shortName: string;
  description: string;
  iconName: string;
  badgeColor: string;
  accentColor: string;
  bannerImage: string;
}

export interface ArticleImage {
  url: string;
  alt: string;
  caption: string;
  placementNote: string;
}

export interface ArticleSection {
  id: string;
  heading: string;
  subheading?: string;
  content: string; // paragraphs or markdown-like formatted text
  callout?: {
    type: 'stat' | 'quote' | 'tip' | 'warning';
    title: string;
    text: string;
    source?: string;
  };
  bullets?: string[];
  image?: ArticleImage;
}

export interface ArticleFaq {
  question: string;
  answer: string;
}

export interface InternalLinkSuggestion {
  text: string;
  targetView: 'landing' | 'editor' | 'blog' | 'about' | 'contact';
  articleSlug?: string;
  context: string;
}

export interface ExternalSource {
  title: string;
  url: string;
  authoritativeOrg: string;
  citationContext: string;
}

export interface SocialPostSnippets {
  linkedin: string;
  twitter: string;
  newsletter: string;
  whatsapp: string;
}

export interface ScheduledDailyTopic {
  dayOffset: number; // 0 for today, 1 for tomorrow, etc.
  dateString: string; // e.g. "2 Novembre 2026"
  isoDate: string; // "2026-11-02"
  title: string;
  category: BlogCategoryId;
  primaryKeyword: string;
  secondaryKeywords: string[];
  trendingReason: string;
  estimatedSearchVolume: string;
  targetAudience: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  categoryId: BlogCategoryId;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishDate: string;
  lastUpdated: string;
  readingTime: string;
  wordCount: number;
  primaryKeyword: string;
  secondaryKeywords: string[];
  isFeatured?: boolean;
  isTrending?: boolean;
  isDailyTopic?: boolean;
  scheduledDate?: string;
  views: number;
  likes: number;
  socialSnippets?: SocialPostSnippets;
  
  // SEO prompt structured content
  intro: {
    hook: string;
    background: string;
    importanceNow: string;
  };
  featuredImage: ArticleImage;
  keyTakeaways: string[];
  sections: ArticleSection[]; // contains the 4 in-content images distributed
  faqs: ArticleFaq[];
  internalLinks: InternalLinkSuggestion[];
  externalSources: ExternalSource[];
  conclusion: {
    summary: string;
    futureOutlook: string;
    ctaText: string;
    ctaButton: string;
  };
}

