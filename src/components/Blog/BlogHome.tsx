import React, { useState } from 'react';
import { BlogPost, BlogCategory, BlogCategoryId } from '../../types/blog';
import { BLOG_CATEGORIES } from '../../data/blogData';
import { AdSenseSlot } from './AdSenseSlot';
import { 
  Search, Sparkles, TrendingUp, Clock, Eye, 
  ArrowRight, FileText, Mail, Users, Compass, 
  Share2, ArrowLeft, Star, ShieldCheck, CheckCircle2, ChevronRight,
  Calendar, Zap
} from 'lucide-react';

interface Props {
  posts: BlogPost[];
  onSelectArticle: (article: BlogPost) => void;
  onOpenGenerator: () => void;
  onOpenScheduler?: () => void;
  onOpenSocialKit?: (article: BlogPost) => void;
  onBackToHome: () => void;
  onStartCreating: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenDisclaimer: () => void;
}

export const BlogHome: React.FC<Props> = ({
  posts,
  onSelectArticle,
  onOpenGenerator,
  onOpenScheduler,
  onOpenSocialKit,
  onBackToHome,
  onStartCreating,
  onOpenAbout,
  onOpenContact,
  onOpenTerms,
  onOpenPrivacy,
  onOpenDisclaimer,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<BlogCategoryId | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // Filter posts
  const filteredPosts = posts.filter((post) => {
    const matchesCategory = selectedCategory === 'all' || post.categoryId === selectedCategory;
    const matchesSearch = 
      searchQuery === '' ||
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.primaryKeyword.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.secondaryKeywords.some(k => k.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredPost = posts.find(p => p.isFeatured) || posts[0];

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterSubscribed(true);
    if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
      (window as any).gtag('event', 'newsletter_signup', {
        method: 'blog_footer',
      });
    }
  };

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'FileText': return <FileText className="w-4 h-4" />;
      case 'Mail': return <Mail className="w-4 h-4" />;
      case 'Users': return <Users className="w-4 h-4" />;
      case 'Compass': return <Compass className="w-4 h-4" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4" />;
      case 'TrendingUp': return <TrendingUp className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f1e5] bg-office-grid-champagne text-slate-900 font-sans flex flex-col">
      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-lg hover:bg-amber-100/50 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Accueil</span>
            </button>
            <div className="h-4 w-px bg-amber-200 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <span className="text-base font-extrabold text-slate-900">
                Le Mag <span className="text-blue-600">Emploi & CV</span>
              </span>
              <span className="text-[10px] font-bold bg-amber-100 text-amber-900 px-2 py-0.5 rounded-full hidden md:inline">
                Édition 2026
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={onStartCreating}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Créer mon CV Gratuit</span>
            </button>
          </div>
        </div>
      </header>

      {/* Top AdSense Leaderboard */}
      <AdSenseSlot slotType="leaderboard" />

      {/* Hero Banner with Featured Article */}
      <section className="py-6 sm:py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden border border-slate-800">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-black shadow-xs">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>À LA UNE • SUJET DU MOMENT</span>
                </span>
                <span className="text-xs text-blue-200">
                  {featuredPost.readingTime}
                </span>
              </div>

              <h1 
                onClick={() => onSelectArticle(featuredPost)}
                className="text-2xl sm:text-3xl md:text-4xl font-black text-white hover:text-amber-300 transition cursor-pointer leading-tight"
              >
                {featuredPost.title}
              </h1>

              <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                {featuredPost.intro.hook} {featuredPost.intro.background}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onSelectArticle(featuredPost)}
                  className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-lg transition flex items-center gap-2 cursor-pointer"
                >
                  <span>Lire l'enquête complète (2 200+ mots)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                {onOpenSocialKit && (
                  <button
                    onClick={() => onOpenSocialKit(featuredPost)}
                    className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold rounded-xl border border-white/20 transition flex items-center gap-1.5 cursor-pointer"
                    title="Générer les posts pour attirer du trafic depuis LinkedIn et Twitter"
                  >
                    <Zap className="w-4 h-4 text-amber-400" />
                    <span>Booster Trafic</span>
                  </button>
                )}

                <span className="text-xs text-slate-400">
                  Par {featuredPost.author.name} • {featuredPost.publishDate}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div 
                onClick={() => onSelectArticle(featuredPost)}
                className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white/10 group cursor-pointer aspect-video sm:aspect-4/3"
              >
                <img
                  src={featuredPost.featuredImage.url}
                  alt={featuredPost.featuredImage.alt}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                  <span className="text-[11px] text-white/90 line-clamp-2">
                    {featuredPost.featuredImage.caption}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6 Official Categories Tabs Bar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border-2 border-white ring-1 ring-amber-300/40 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900">
                Explorez nos 6 Catégories Spécialisées
              </h2>
              <p className="text-xs text-slate-500">
                Articles rédigés par des journalistes et experts RH selon notre charte d'optimisation SEO 2026.
              </p>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Rechercher un mot-clé (ex: ATS, entretien...)"
                className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
              />
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2 pt-1">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                selectedCategory === 'all'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
              }`}
            >
              <span>Tous les articles</span>
              <span className="text-[10px] opacity-75">({posts.length})</span>
            </button>

            {BLOG_CATEGORIES.map((cat) => {
              const count = posts.filter(p => p.categoryId === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {getCategoryIcon(cat.iconName)}
                  <span>{cat.shortName}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-blue-700 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Master Guides Banner (CV Creation & French Job Market Focus) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mb-8">
        <div className="bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl border-2 border-white/20 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <span className="text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-300/30">
                Dossiers Spéciaux 2026 • 100% Conformes &amp; Gratuits
              </span>
              <h2 className="text-lg sm:text-xl font-black">
                Guides Phares : Création de CV, Avantages Salaires &amp; Conditions de Travail en France
              </h2>
            </div>
            <span className="text-xs text-blue-200">
              Enquêtes approfondies (2 500+ mots) &amp; Données officielles Dares / Insee / Apec
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                id: 'art-seo-avantages-bon-cv-recrutement-salaire-2026',
                tag: 'Carrière & Salaire',
                tagColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/30',
                title: 'Les 7 Avantages d\'un Bon CV en 2026',
                subtitle: 'Multipliez vos entretiens par 4 et augmentez votre salaire de départ de 18%.',
                badge: 'Négociation RH',
              },
              {
                id: 'art-seo-conditions-travail-france-droits-salaires-2026',
                tag: 'Droits Salariés',
                tagColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
                title: 'Conditions de Travail en France 2026',
                subtitle: '35 heures, RTT, congés payés, télétravail encadré et avantages sociaux.',
                badge: 'Code du Travail',
              },
              {
                id: 'art-seo-faire-un-cv-gratuit-en-ligne-2026',
                tag: 'Anti-Arnaque',
                tagColor: 'bg-rose-500/20 text-rose-300 border-rose-400/30',
                title: 'Faire un CV Gratuit sans Abonnement',
                subtitle: 'Comment déjouer les prélèvements cachés et exporter en vrai PDF.',
                badge: '120k rech/mois',
              },
              {
                id: 'art-seo-modeles-cv-gratuits-telecharger-2026',
                tag: 'Design & ATS',
                tagColor: 'bg-blue-500/20 text-blue-300 border-blue-400/30',
                title: 'Modèles de CV Gratuits Validés 2026',
                subtitle: '10 formats A4 sobres et élégants plébiscités par les recruteurs.',
                badge: '85k rech/mois',
              },
              {
                id: 'art-seo-creer-un-cv-parfait-guide-2026',
                tag: 'Méthode Pratique',
                tagColor: 'bg-purple-500/20 text-purple-300 border-purple-400/30',
                title: 'Créer un CV Parfait (Débutants & Reconversion)',
                subtitle: 'Verbes d\'action, structure et astuces pour valoriser son parcours.',
                badge: '160k rech/mois',
              },
              {
                id: 'art-seo-marche-emploi-france-dares-apec-2026',
                tag: 'Enquête Emploi',
                tagColor: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
                title: 'Le Marché de l\'Emploi en France 2026',
                subtitle: 'Métiers qui recrutent le plus, salaires réels et tensions Dares.',
                badge: 'Données Dares',
              },
            ].map((guide, gIdx) => {
              const matchedPost = posts.find(p => p.id === guide.id);
              return (
                <div
                  key={gIdx}
                  onClick={() => matchedPost && onSelectArticle(matchedPost)}
                  className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/15 transition cursor-pointer flex flex-col justify-between group space-y-2.5 backdrop-blur-xs"
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-[10px]">
                      <span className={`px-2 py-0.5 rounded-full font-bold border ${guide.tagColor}`}>
                        {guide.tag}
                      </span>
                      <span className="text-slate-300 font-medium">{guide.badge}</span>
                    </div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition line-clamp-2">
                      {guide.title}
                    </h3>
                    <p className="text-[11px] text-slate-300 line-clamp-2 leading-relaxed">
                      {guide.subtitle}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-amber-300 font-semibold">
                    <span>Lire le guide complet</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Articles Grid + Sidebar */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Articles List (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            <div className="flex items-center justify-between border-b border-amber-200/60 pb-3">
              <span className="text-xs font-bold text-slate-700">
                {filteredPosts.length} article{filteredPosts.length > 1 ? 's' : ''} disponible{filteredPosts.length > 1 ? 's' : ''}
              </span>
              <span className="text-xs text-slate-500">
                Trié par date de publication récente
              </span>
            </div>

            {filteredPosts.length === 0 ? (
              <div className="p-12 bg-white rounded-3xl border border-slate-200 text-center space-y-3">
                <FileText className="w-10 h-10 text-slate-300 mx-auto" />
                <h4 className="text-base font-bold text-slate-800">Aucun article ne correspond à votre recherche</h4>
                <p className="text-xs text-slate-500">
                  Essayez d'autres mots-clés ou cliquez sur le bouton Rédacteur IA pour générer un nouvel article sur ce sujet !
                </p>
                <button
                  onClick={() => { setSelectedCategory('all'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-xl"
                >
                  Réinitialiser les filtres
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredPosts.map((post, index) => {
                  const category = BLOG_CATEGORIES.find(c => c.id === post.categoryId);
                  return (
                    <article
                      key={post.id}
                      onClick={() => onSelectArticle(post)}
                      className="bg-white rounded-3xl border-2 border-white ring-1 ring-amber-300/40 shadow-md hover:shadow-xl transition flex flex-col justify-between overflow-hidden cursor-pointer group"
                    >
                      <div>
                        {/* Image with alt preview */}
                        <div className="relative aspect-16/10 overflow-hidden bg-slate-100">
                          <img
                            src={post.featuredImage.url}
                            alt={post.featuredImage.alt}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                          />
                          <div className="absolute top-3 left-3">
                            <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-md text-blue-900 shadow-xs border border-white">
                              {category?.shortName || post.categoryId}
                            </span>
                          </div>
                          {post.isTrending && (
                            <div className="absolute top-3 right-3">
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 shadow-xs">
                                Tendance
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Text Content */}
                        <div className="p-5 space-y-2.5">
                          <div className="flex items-center gap-2 text-[11px] text-slate-400">
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {post.readingTime}
                            </span>
                            <span>•</span>
                            <span>{post.publishDate}</span>
                          </div>

                          <h3 className="text-sm sm:text-base font-extrabold text-slate-900 group-hover:text-blue-600 transition leading-snug line-clamp-2">
                            {post.title}
                          </h3>

                          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                            {post.metaDescription}
                          </p>
                        </div>
                      </div>

                      {/* Footer meta */}
                      <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                        <span className="font-semibold text-slate-700 truncate max-w-[150px]">
                          {post.author.name}
                        </span>
                        <div className="flex items-center gap-2">
                          {onOpenSocialKit && (
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                onOpenSocialKit(post);
                              }}
                              className="px-2 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-slate-950 font-bold transition cursor-pointer flex items-center gap-1 text-[10px]"
                              title="Booster le trafic sur LinkedIn, X et WhatsApp"
                            >
                              <Zap className="w-3 h-3 text-amber-700" />
                              <span className="hidden sm:inline">Boost</span>
                            </button>
                          )}
                          <span className="text-blue-600 font-bold group-hover:translate-x-0.5 transition flex items-center gap-1">
                            Lire
                            <ChevronRight className="w-3.5 h-3.5" />
                          </span>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}

            {/* In-feed AdSense Slot */}
            <AdSenseSlot slotType="in-feed" />
          </div>

          {/* Right Column: Sidebar (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Free CV Generator Action Card */}
            <div className="bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-800 text-white p-6 rounded-3xl shadow-xl space-y-3.5 border-2 border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-300" />
                  <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
                    Outil Gratuit en Ligne
                  </span>
                </div>
                <span className="text-[10px] font-bold bg-amber-400 text-slate-950 px-2.5 py-0.5 rounded-full">
                  100% Gratuit
                </span>
              </div>
              <h3 className="text-base font-black leading-snug">
                Créez Votre CV Professionnel Conforme ATS
              </h3>
              <p className="text-xs text-blue-100 leading-relaxed">
                Modèles français A4 validés par des recruteurs. Téléchargement PDF immédiat sans carte bancaire et sans abonnement caché.
              </p>
              <button
                onClick={onStartCreating}
                className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-bold rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Faire mon CV Gratuit</span>
                <ArrowRight className="w-4 h-4 text-slate-950" />
              </button>
            </div>

            {/* Free ATS Audit CTA Card */}
            <div className="bg-white p-5 rounded-3xl border-2 border-white ring-1 ring-amber-300/40 shadow-md space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-bold text-slate-900">
                  Votre CV passe-t-il les robots ?
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                78% des CV sont rejetés par les logiciels de tri ATS en moins de 6 secondes. Vérifiez la lisibilité de votre fichier avant d'envoyer votre candidature.
              </p>
              <button
                onClick={onStartCreating}
                className="w-full py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold rounded-xl transition cursor-pointer flex items-center justify-center gap-1.5"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Tester mon CV avec l'outil gratuit</span>
              </button>
            </div>

            {/* AdSense Sidebar Slot */}
            <AdSenseSlot slotType="sidebar" />

            {/* Categories Quick Navigation */}
            <div className="bg-white rounded-3xl p-5 border-2 border-white ring-1 ring-amber-300/40 shadow-md space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Nos 6 Thématiques Emploi
              </h4>
              <ul className="space-y-2 text-xs">
                {BLOG_CATEGORIES.map((cat) => (
                  <li key={cat.id}>
                    <button
                      onClick={() => setSelectedCategory(cat.id)}
                      className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-blue-600 transition text-left cursor-pointer font-medium"
                    >
                      <div className="flex items-center gap-2">
                        {getCategoryIcon(cat.iconName)}
                        <span>{cat.name}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-bold">
                        {posts.filter(p => p.categoryId === cat.id).length}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Free Career Newsletter (AdSense friendly retention) */}
            <div className="bg-white rounded-3xl p-6 border-2 border-white ring-1 ring-amber-300/40 shadow-md space-y-4">
              <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-extrabold text-slate-900">
                  La Veille Recrutement & Salaires
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Recevez chaque semaine nos analyses sur les tendances d'embauche, les modèles de CV en vogue et les opportunités cachées. 100% gratuit, zéro spam.
                </p>
              </div>

              {newsletterSubscribed ? (
                <div className="p-3 bg-emerald-50 text-emerald-800 rounded-xl text-xs font-bold flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Merci ! Vous êtes bien inscrit(e).</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder="Votre adresse e-mail professionnelle..."
                    className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-50"
                  />
                  <button
                    type="submit"
                    className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-xs cursor-pointer"
                  >
                    M'inscrire gratuitement
                  </button>
                </form>
              )}
            </div>

            {/* Author Credibility Card (E-E-A-T) */}
            <div className="bg-white rounded-3xl p-5 border-2 border-white ring-1 ring-amber-300/40 shadow-md space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">
                Ligne Éditoriale & Direction
              </span>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold text-sm">
                  NA
                </div>
                <div>
                  <h5 className="text-xs font-bold text-slate-900">Naveed Afzal</h5>
                  <p className="text-[11px] text-slate-500">Ingénieur Web (20+ ans) & Fondateur</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Tous les guides sont supervisés pour garantir l'absence de fausses promesses et une totale conformité avec les logiciels ATS français.
              </p>
              <button
                onClick={onOpenAbout}
                className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1 cursor-pointer"
              >
                <span>Découvrir notre histoire et engagements</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with required AdSense Legal Links */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-xs border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-3">
              <span className="text-base font-extrabold text-white">
                CV<span className="text-blue-500">Gratuit</span>.fr
              </span>
              <p className="text-slate-400 text-xs leading-relaxed">
                Le portail francophone de référence pour créer son CV gratuit, réussir ses entretiens et comprendre le marché du travail en 2026.
              </p>
              <p className="text-[11px] text-slate-500">
                Développé par Naveed Afzal • Hébergé en conformité stricte avec le RGPD.
              </p>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
                Nos 6 Catégories Blog
              </h5>
              <ul className="space-y-1.5 text-xs">
                {BLOG_CATEGORIES.map(c => (
                  <li key={c.id}>
                    <button onClick={() => setSelectedCategory(c.id)} className="hover:text-white transition">
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
                Outils de Candidature
              </h5>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={onStartCreating} className="hover:text-white transition">Créateur de CV en Ligne</button></li>
                <li><button onClick={onStartCreating} className="hover:text-white transition">Générateur de Lettre de Motivation</button></li>
                <li><button onClick={onBackToHome} className="hover:text-white transition">Vérificateur de score ATS</button></li>
                {onOpenScheduler && (
                  <li><button onClick={onOpenScheduler} className="hover:text-slate-300 transition text-[11px] text-slate-500">Administration &amp; Régie Éditoriale</button></li>
                )}
              </ul>
            </div>

            <div>
              <h5 className="font-bold text-white uppercase tracking-wider text-xs mb-3">
                Pages Légales & AdSense
              </h5>
              <ul className="space-y-1.5 text-xs">
                <li><button onClick={onOpenAbout} className="hover:text-white transition">À Propos du Fondateur (E-E-A-T)</button></li>
                <li><button onClick={onOpenTerms} className="hover:text-white transition">Conditions Générales d'Utilisation</button></li>
                <li><button onClick={onOpenDisclaimer} className="hover:text-white transition">Mentions Légales & Disclaimer</button></li>
                <li><button onClick={onOpenPrivacy} className="hover:text-white transition">Politique de Confidentialité (RGPD)</button></li>
                <li><button onClick={onOpenContact} className="hover:text-white transition font-bold text-blue-400">Contact & Support Éditorial</button></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500">
            <p>© 2026 CVGratuit.fr – Tous droits réservés. Conforme aux exigences du programme Google AdSense.</p>
            <p className="text-[11px]">Google Analytics ID : G-ZM8R2JF6WT</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
