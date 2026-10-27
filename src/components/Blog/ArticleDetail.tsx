import React, { useState } from 'react';
import { BlogPost, BlogCategory } from '../../types/blog';
import { BLOG_CATEGORIES } from '../../data/blogData';
import { AdSenseSlot } from './AdSenseSlot';
import { 
  ArrowLeft, Clock, Calendar, Eye, ThumbsUp, 
  Share2, CheckCircle2, HelpCircle, ChevronDown, 
  ExternalLink, ArrowRight, Sparkles, BookOpen, 
  Bookmark, Award, ShieldCheck, FileText, Check 
} from 'lucide-react';

interface Props {
  article: BlogPost;
  allPosts: BlogPost[];
  onBackToBlog: () => void;
  onSelectArticle: (article: BlogPost) => void;
  onStartCreating: () => void;
  onOpenAbout: () => void;
  onOpenContact: () => void;
  onOpenTerms: () => void;
  onOpenPrivacy: () => void;
  onOpenDisclaimer: () => void;
}

export const ArticleDetail: React.FC<Props> = ({
  article,
  allPosts,
  onBackToBlog,
  onSelectArticle,
  onStartCreating,
  onOpenAbout,
  onOpenContact,
  onOpenTerms,
  onOpenPrivacy,
  onOpenDisclaimer,
}) => {
  const [likes, setLikes] = useState(article.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const category = BLOG_CATEGORIES.find(c => c.id === article.categoryId);

  const relatedArticles = allPosts
    .filter(p => p.id !== article.id && p.categoryId === article.categoryId)
    .slice(0, 3);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleLike = () => {
    if (!hasLiked) {
      setLikes(prev => prev + 1);
      setHasLiked(true);
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'like_article', {
          article_slug: article.slug,
          article_title: article.title,
        });
      }
    }
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f1e5] bg-office-grid-champagne text-slate-900 font-sans flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToBlog}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-lg hover:bg-amber-100/50 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour au Mag</span>
            </button>
            <div className="h-4 w-px bg-amber-200 hidden sm:block"></div>
            <span className="text-xs text-slate-500 hidden sm:inline truncate max-w-xs md:max-w-md">
              {category?.name || 'Blog Emploi'}
            </span>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 transition flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copiedLink ? 'Lien copié !' : 'Partager'}</span>
            </button>

            <button
              onClick={onStartCreating}
              className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
            >
              Créer mon CV
            </button>
          </div>
        </div>
      </header>

      {/* Top AdSense Leaderboard */}
      <AdSenseSlot slotType="leaderboard" />

      {/* Main Article Container */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full flex-1">
        <article className="bg-white rounded-3xl border-2 border-white ring-1 ring-amber-300/40 shadow-xl overflow-hidden p-6 sm:p-10 space-y-8">
          {/* Article Header & Metadata */}
          <div className="space-y-4 border-b border-slate-100 pb-6">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-blue-50 text-blue-800 border border-blue-200">
                {category?.name || article.categoryId}
              </span>
              <span className="text-xs text-slate-500 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                {article.readingTime}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-slate-500">
                Publié le {article.publishDate}
              </span>
              <span className="text-xs text-slate-400">•</span>
              <span className="text-xs text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded">
                {article.wordCount} mots vérifiés
              </span>
            </div>

            {/* Clickable Emotional SEO Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              {article.title}
            </h1>

            {/* Author Byline (E-E-A-T) */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-3">
                <img
                  src={article.author.avatar}
                  alt={article.author.name}
                  className="w-11 h-11 rounded-full object-cover border-2 border-amber-300 shadow-2xs"
                />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {article.author.name}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {article.author.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleLike}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition cursor-pointer ${
                    hasLiked
                      ? 'bg-rose-50 border-rose-200 text-rose-600'
                      : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                  }`}
                >
                  <ThumbsUp className={`w-3.5 h-3.5 ${hasLiked ? 'fill-rose-500' : ''}`} />
                  <span>{likes}</span>
                </button>
              </div>
            </div>

            {/* SEO Metadata Box */}
            <div className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
              <p><strong>Mot-clé principal :</strong> <span className="font-semibold text-blue-700">« {article.primaryKeyword} »</span></p>
              <p><strong>Mots-clés secondaires :</strong> {article.secondaryKeywords.join(', ')}</p>
              <p className="text-[11px] text-slate-500"><strong>Meta Description :</strong> {article.metaDescription}</p>
            </div>
          </div>

          {/* Featured Hero Image (Image 1 of 5) with ALT Badge */}
          <div className="space-y-2">
            <div className="relative rounded-2xl overflow-hidden aspect-16/9 bg-slate-100 shadow-md border border-slate-200">
              <img
                src={article.featuredImage.url}
                alt={article.featuredImage.alt}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-md font-mono">
                ALT : {article.featuredImage.alt.slice(0, 70)}...
              </div>
            </div>
            <p className="text-xs text-slate-500 italic text-center">
              {article.featuredImage.caption}
            </p>
          </div>

          {/* Key Takeaways Box (Points Clés à retenir) */}
          <div className="p-6 bg-gradient-to-r from-blue-50/90 via-amber-50/70 to-blue-50/90 rounded-2xl border-2 border-blue-200/80 shadow-xs space-y-3">
            <div className="flex items-center gap-2 text-blue-950 font-extrabold text-sm sm:text-base">
              <Award className="w-5 h-5 text-blue-600" />
              <span>Points Clés & Enseignements Majeurs (En Résumé)</span>
            </div>
            <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
              {article.keyTakeaways.map((takeaway, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Introduction Section */}
          <div className="space-y-4 text-sm sm:text-base text-slate-800 leading-relaxed font-normal">
            <p className="text-base sm:text-lg font-semibold text-slate-900 leading-relaxed bg-amber-50/60 p-4 rounded-2xl border-l-4 border-amber-500">
              {article.intro.hook}
            </p>
            <p>{article.intro.background}</p>
            <p>{article.intro.importanceNow}</p>
          </div>

          {/* Table of Contents */}
          <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2 text-xs">
            <span className="font-extrabold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <span>Sommaire de l'article</span>
            </span>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700 font-medium">
              {article.sections.map((section, idx) => (
                <li key={section.id}>
                  <a href={`#${section.id}`} className="hover:text-blue-600 transition flex items-center gap-1.5">
                    <span className="text-blue-600 font-bold">{idx + 1}.</span>
                    <span className="truncate">{section.heading.replace(/^\d+\.\s*/, '')}</span>
                  </a>
                </li>
              ))}
              <li>
                <a href="#section-faq" className="hover:text-blue-600 transition flex items-center gap-1.5">
                  <span className="text-blue-600 font-bold">5.</span>
                  <span>Foire Aux Questions (FAQ)</span>
                </a>
              </li>
              <li>
                <a href="#section-conclusion" className="hover:text-blue-600 transition flex items-center gap-1.5">
                  <span className="text-blue-600 font-bold">6.</span>
                  <span>Conclusion & Perspectives</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Main Content Sections (with H2/H3 and the 4 In-Content Images with ALT) */}
          <div className="space-y-12">
            {article.sections.map((section, sIndex) => (
              <section key={section.id} id={section.id} className="space-y-5 scroll-mt-20">
                <div className="border-b border-slate-100 pb-2">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {section.heading}
                  </h2>
                  {section.subheading && (
                    <h3 className="text-xs sm:text-sm font-semibold text-blue-700 mt-1">
                      {section.subheading}
                    </h3>
                  )}
                </div>

                <div className="text-sm sm:text-base text-slate-700 leading-relaxed whitespace-pre-line space-y-3">
                  {section.content}
                </div>

                {/* Callout Box if present */}
                {section.callout && (
                  <div className={`p-4 rounded-2xl border-l-4 text-xs sm:text-sm leading-relaxed ${
                    section.callout.type === 'stat'
                      ? 'bg-blue-50/80 border-blue-600 text-blue-950'
                      : section.callout.type === 'quote'
                      ? 'bg-purple-50/80 border-purple-600 text-purple-950 italic'
                      : section.callout.type === 'warning'
                      ? 'bg-rose-50/80 border-rose-600 text-rose-950'
                      : 'bg-emerald-50/80 border-emerald-600 text-emerald-950'
                  }`}>
                    <span className="font-extrabold block not-italic mb-1">
                      {section.callout.title}
                    </span>
                    <p>{section.callout.text}</p>
                    {section.callout.source && (
                      <span className="text-[11px] opacity-75 block mt-1 not-italic">
                        Source : {section.callout.source}
                      </span>
                    )}
                  </div>
                )}

                {/* Bullets if present */}
                {section.bullets && section.bullets.length > 0 && (
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                      {section.bullets.map((bullet, bIdx) => (
                        <li key={bIdx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-2 shrink-0"></span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* In-Content Image with ALT Badge (Images 2, 3, 4, 5) */}
                {section.image && (
                  <div className="space-y-2 pt-2">
                    <div className="relative rounded-2xl overflow-hidden aspect-16/10 bg-slate-100 shadow-sm border border-slate-200">
                      <img
                        src={section.image.url}
                        alt={section.image.alt}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-3 left-3 bg-slate-950/80 backdrop-blur-xs text-white text-[10px] px-2.5 py-1 rounded-md font-mono">
                        ALT : {section.image.alt.slice(0, 65)}...
                      </div>
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-slate-800 text-[10px] px-2 py-0.5 rounded font-bold">
                        Visuel {sIndex + 1}/4 in-content
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 italic text-center">
                      {section.image.caption}
                    </p>
                  </div>
                )}

                {/* AdSense In-Article Slot after Section 2 */}
                {sIndex === 1 && (
                  <AdSenseSlot slotType="in-article" />
                )}
              </section>
            ))}
          </div>

          {/* FAQ Section (Accordion) */}
          <section id="section-faq" className="space-y-4 pt-4 border-t border-slate-100 scroll-mt-20">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-purple-600" />
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Foire Aux Questions (FAQ) sur le Sujet
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              Réponses précises de nos recruteurs partenaires aux interrogations les plus fréquentes.
            </p>

            <div className="space-y-3">
              {article.faqs.map((faq, fIndex) => {
                const isOpen = activeFaq === fIndex;
                return (
                  <div
                    key={fIndex}
                    className="border border-slate-200 rounded-2xl overflow-hidden bg-slate-50/50 transition"
                  >
                    <button
                      onClick={() => toggleFaq(fIndex)}
                      className="w-full px-5 py-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-100/60 transition"
                    >
                      <span>{faq.question}</span>
                      <ChevronDown
                        className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-blue-600' : ''
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-4 text-xs sm:text-sm text-slate-700 leading-relaxed bg-white border-t border-slate-100 pt-3">
                        {faq.answer}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>

          {/* Internal Linking Suggestions */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Maillage Interne Recommandé & Poursuivre la lecture
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {article.internalLinks.map((link, lIdx) => (
                <div
                  key={lIdx}
                  onClick={() => {
                    if (link.targetView === 'editor') onStartCreating();
                    else if (link.targetView === 'landing') onBackToBlog();
                    else if (link.articleSlug) {
                      const found = allPosts.find(p => p.slug === link.articleSlug);
                      if (found) onSelectArticle(found);
                    }
                  }}
                  className="p-3.5 bg-slate-50 hover:bg-blue-50 border border-slate-200 hover:border-blue-300 rounded-2xl transition cursor-pointer space-y-1"
                >
                  <span className="text-xs font-bold text-blue-700 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5" />
                    <span>{link.text}</span>
                  </span>
                  <p className="text-[11px] text-slate-500">{link.context}</p>
                </div>
              ))}
            </div>
          </section>

          {/* External Authoritative Sources */}
          <section className="space-y-3 pt-4 border-t border-slate-100">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Sources Officielles & Références Institutionnelles
            </span>
            <div className="space-y-2">
              {article.externalSources.map((source, sIdx) => (
                <a
                  key={sIdx}
                  href={source.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs text-slate-700 transition"
                >
                  <div>
                    <span className="font-bold text-slate-900 block">{source.title}</span>
                    <span className="text-[11px] text-slate-500">{source.citationContext} ({source.authoritativeOrg})</span>
                  </div>
                  <ExternalLink className="w-4 h-4 text-slate-400 shrink-0 ml-2" />
                </a>
              ))}
            </div>
          </section>

          {/* Conclusion & Actionable CTA */}
          <section id="section-conclusion" className="p-6 sm:p-8 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-3xl shadow-xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-300">
              Conclusion & Perspectives
            </span>
            <h3 className="text-xl sm:text-2xl font-black">
              Passez à l'action dès aujourd'hui
            </h3>
            <p className="text-xs sm:text-sm text-blue-100 leading-relaxed">
              {article.conclusion.summary}
            </p>
            <p className="text-xs sm:text-sm text-blue-200 leading-relaxed">
              {article.conclusion.futureOutlook}
            </p>
            <div className="pt-2">
              <button
                onClick={onStartCreating}
                className="w-full sm:w-auto px-7 py-3.5 bg-white text-blue-800 hover:bg-slate-100 font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{article.conclusion.ctaButton}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </section>
        </article>

        {/* Related Articles in same Category */}
        {relatedArticles.length > 0 && (
          <section className="mt-12 space-y-4">
            <h3 className="text-lg font-black text-slate-900">
              Dans la même catégorie : {category?.name}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectArticle(rel)}
                  className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {rel.readingTime}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2">
                      {rel.title}
                    </h4>
                  </div>
                  <span className="text-[11px] text-blue-600 font-semibold pt-2 flex items-center gap-1">
                    Lire <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-10 text-xs border-t border-slate-800 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 CVGratuit.fr – Article rédigé selon la charte SEO journalistique.</p>
          <div className="flex flex-wrap gap-4 text-slate-400">
            <button onClick={onOpenAbout} className="hover:text-white transition">À Propos</button>
            <button onClick={onOpenTerms} className="hover:text-white transition">CGU</button>
            <button onClick={onOpenDisclaimer} className="hover:text-white transition">Disclaimer</button>
            <button onClick={onOpenPrivacy} className="hover:text-white transition">Confidentialité</button>
            <button onClick={onOpenContact} className="hover:text-white transition">Contact</button>
          </div>
        </div>
      </footer>
    </div>
  );
};
