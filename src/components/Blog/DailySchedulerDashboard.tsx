import React, { useState } from 'react';
import { BlogPost, BlogCategoryId } from '../../types/blog';
import { 
  UPCOMING_30_DAYS_TOPICS, 
  getFrenchDateString, 
  buildComprehensiveDailyArticle 
} from '../../utils/dailyEngine';
import { 
  Calendar, Sparkles, CheckCircle2, Clock, 
  TrendingUp, ArrowRight, Share2, FileText, 
  Zap, Search, RefreshCw, Layers, Bell, Download,
  Copy, ShieldCheck, Check
} from 'lucide-react';
import { REGISTERED_MASTER_PROMPT, MASTER_PROMPT_METADATA } from '../../data/masterPrompt';

interface Props {
  posts: BlogPost[];
  onSelectArticle: (article: BlogPost) => void;
  onPublishArticle: (article: BlogPost) => void;
  onOpenGenerator: () => void;
  onOpenSocialKit: (article: BlogPost) => void;
  onClose: () => void;
}

export const DailySchedulerDashboard: React.FC<Props> = ({
  posts,
  onSelectArticle,
  onPublishArticle,
  onOpenGenerator,
  onOpenSocialKit,
  onClose,
}) => {
  const [publishingOffset, setPublishingOffset] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState<string | null>(null);
  const [showMasterPrompt, setShowMasterPrompt] = useState(false);
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  const todayStr = getFrenchDateString(new Date());
  const todayPost = posts.find(p => p.publishDate === todayStr || p.publishDate === "Aujourd'hui") || posts[0];

  const handlePublishUpcoming = (offset: number) => {
    setPublishingOffset(offset);
    const targetTopic = UPCOMING_30_DAYS_TOPICS.find(t => t.dayOffset === offset);
    if (!targetTopic) return;

    setTimeout(() => {
      const targetDate = new Date();
      targetDate.setDate(targetDate.getDate() + offset);
      const targetDateStr = getFrenchDateString(targetDate);

      const newArticle = buildComprehensiveDailyArticle({
        title: targetTopic.title,
        category: targetTopic.category,
        primaryKeyword: targetTopic.primaryKeyword,
        secondaryKeywords: targetTopic.secondaryKeywords,
      } as any, targetDateStr);

      onPublishArticle(newArticle);
      setPublishingOffset(null);
    }, 600);
  };

  const handleDownloadRss = () => {
    const rssXml = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>CVGratuit.fr - Le Mag Emploi &amp; Recrutement</title>
  <link>https://cvgratuit.fr/blog</link>
  <description>Flux quotidien d'articles SEO sur le recrutement, les CV et les salaires en France.</description>
  <language>fr-FR</language>
  <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
  ${posts.map(p => `
  <item>
    <title><![CDATA[${p.title}]]></title>
    <link>https://cvgratuit.fr/blog/${p.slug}</link>
    <guid>https://cvgratuit.fr/blog/${p.slug}</guid>
    <pubDate>${new Date().toUTCString()}</pubDate>
    <description><![CDATA[${p.metaDescription}]]></description>
    <category>${p.categoryId}</category>
  </item>`).join('\n')}
</channel>
</rss>`;

    const blob = new Blob([rssXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rss.xml';
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess('Flux RSS exporté avec succès !');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  const handleDownloadSitemap = () => {
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://cvgratuit.fr/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://cvgratuit.fr/blog</loc>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  ${posts.map(p => `
  <url>
    <loc>https://cvgratuit.fr/blog/${p.slug}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`).join('\n')}
</urlset>`;

    const blob = new Blob([sitemapXml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sitemap.xml';
    a.click();
    URL.revokeObjectURL(url);
    setDownloadSuccess('Sitemap XML exporté pour Google Search Console !');
    setTimeout(() => setDownloadSuccess(null), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-5xl bg-white rounded-3xl shadow-2xl border-2 border-white ring-1 ring-amber-300/40 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">Régie Quotidienne : 1 Article Publié Chaque Jour</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-slate-950" />
                  AUTOMATISÉ
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Garantit un flux continu d'articles SEO 2000+ mots pour propulser votre audience et votre référencement Google.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 transition text-xs font-semibold text-white cursor-pointer"
          >
            Fermer
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* Status banner */}
          <div className="p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 border border-emerald-200 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-200/60 px-2.5 py-0.5 rounded-full inline-block">
                Statut du Système Quotidien
              </span>
              <h4 className="text-sm font-bold text-slate-900">
                Aujourd'hui : {todayStr} • Moteur de Publication Quotidienne Actif
              </h4>
              <p className="text-xs text-slate-600">
                Chaque visiteur arrivant sur le site découvre le nouvel article du jour optimisé pour Google AdSense, avec 4 images et balises ALT SEO.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowMasterPrompt(true)}
                className="px-3.5 py-2 bg-white hover:bg-slate-50 border border-slate-300 text-slate-800 rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-2xs cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Master Prompt Enregistré</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              </button>
              <button
                type="button"
                onClick={onOpenGenerator}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Rédiger un Sujet Tendance</span>
              </button>
            </div>
          </div>

          {/* Today's Active Article Spotlight */}
          {todayPost && (
            <div className="bg-slate-900 text-white rounded-2xl p-5 border border-slate-800 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
                    ARTICLE DU JOUR EN LIGNE
                  </span>
                  <span className="text-slate-400">• {todayPost.publishDate}</span>
                  <span className="text-slate-400">• {todayPost.wordCount} mots</span>
                  <span className="text-emerald-400 font-semibold">• Score SEO 98/100</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onOpenSocialKit(todayPost);
                    }}
                    className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg text-xs font-bold transition flex items-center gap-1 cursor-pointer"
                  >
                    <Zap className="w-3.5 h-3.5" />
                    <span>Booster Trafic (LinkedIn/X)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onClose();
                      onSelectArticle(todayPost);
                    }}
                    className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-lg text-xs font-semibold transition flex items-center gap-1 cursor-pointer"
                  >
                    <span>Lire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-bold text-white line-clamp-2">
                  {todayPost.title}
                </h4>
                <p className="text-xs text-slate-300 mt-1 line-clamp-2">
                  {todayPost.metaDescription}
                </p>
              </div>
            </div>
          )}

          {/* Feed and Sitemap Export tools */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-blue-600" />
                  <span>Flux RSS 2.0 (Syndication & Indexation)</span>
                </span>
                <button
                  type="button"
                  onClick={handleDownloadRss}
                  className="px-3 py-1 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold transition cursor-pointer flex items-center gap-1 text-[11px]"
                >
                  <Download className="w-3 h-3" />
                  <span>Télécharger rss.xml</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                Permet aux robots agrégateurs et outils de republication (Zapier, Buffer, Feedly) de diffuser automatiquement vos articles dès publication.
              </p>
            </div>

            <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <Search className="w-4 h-4 text-emerald-600" />
                  <span>Sitemap XML (Google Search Console)</span>
                </span>
                <button
                  type="button"
                  onClick={handleDownloadSitemap}
                  className="px-3 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition cursor-pointer flex items-center gap-1 text-[11px]"
                >
                  <Download className="w-3 h-3" />
                  <span>Télécharger sitemap.xml</span>
                </button>
              </div>
              <p className="text-[11px] text-slate-500">
                À soumettre dans Google Search Console pour indexer chaque jour vos 2000 mots et vos 4 balises d'images ALT.
              </p>
            </div>
          </div>

          {downloadSuccess && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs font-semibold text-center flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              <span>{downloadSuccess}</span>
            </div>
          )}

          {/* 30-Day Editorial Queue */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">
                  Calendrier des Sujets Tendances Programmés (30 Jours)
                </h4>
                <p className="text-xs text-slate-500">
                  Sujets recherchés sur Google France & France Travail, avec volumétrie estimée et angle CTR.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-1 rounded-lg border border-blue-200">
                Queue de diffusion : 15+ sujets chauds
              </span>
            </div>

            <div className="space-y-2.5">
              {UPCOMING_30_DAYS_TOPICS.map((topic, idx) => {
                const targetDate = new Date();
                targetDate.setDate(targetDate.getDate() + topic.dayOffset);
                const isToday = topic.dayOffset === 0;
                const isPublished = isToday || posts.some(p => p.title === topic.title);

                return (
                  <div
                    key={idx}
                    className={`p-3.5 rounded-2xl border transition flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs ${
                      isPublished
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : 'bg-white hover:bg-slate-50 border-slate-200'
                    }`}
                  >
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center gap-2 text-[11px]">
                        <span className={`font-bold px-2 py-0.5 rounded ${
                          isPublished
                            ? 'bg-emerald-100 text-emerald-800'
                            : 'bg-slate-100 text-slate-700'
                        }`}>
                          {isToday ? "Aujourd'hui" : `Jour +${topic.dayOffset}`} : {getFrenchDateString(targetDate)}
                        </span>
                        <span className="text-slate-400">• {topic.category}</span>
                        <span className="text-amber-700 font-medium bg-amber-50 px-1.5 py-0.5 rounded">
                          {topic.estimatedSearchVolume}
                        </span>
                        {isPublished && (
                          <span className="text-emerald-700 font-bold inline-flex items-center gap-0.5">
                            <CheckCircle2 className="w-3 h-3" />
                            Publié
                          </span>
                        )}
                      </div>

                      <h5 className="font-bold text-slate-900 text-xs sm:text-sm">
                        {topic.title}
                      </h5>

                      <p className="text-[11px] text-slate-500 line-clamp-1">
                        Tendance : {topic.trendingReason} • Mot-clé : <strong className="text-slate-700">{topic.primaryKeyword}</strong>
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center gap-2 w-full sm:w-auto justify-end">
                      {isPublished ? (
                        <button
                          type="button"
                          onClick={() => {
                            const found = posts.find(p => p.title === topic.title) || todayPost;
                            onClose();
                            onSelectArticle(found);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition cursor-pointer flex items-center gap-1"
                        >
                          <span>Voir</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          disabled={publishingOffset === topic.dayOffset}
                          onClick={() => handlePublishUpcoming(topic.dayOffset)}
                          className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                        >
                          {publishingOffset === topic.dayOffset ? (
                            <>
                              <RefreshCw className="w-3 h-3 animate-spin" />
                              <span>Génération 2000 mots...</span>
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-3 h-3 text-amber-300" />
                              <span>Publier Immédiatement</span>
                            </>
                          )}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-xs text-slate-500">
            Astuce : La régularité quotidienne est le facteur #1 favorisé par l'algorithme Google pour classer vos articles en Top 3.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Fermer le Tableau de Bord
          </button>
        </div>
      </div>

      {/* Master Prompt Registered Inspector Modal */}
      {showMasterPrompt && (
        <div className="fixed inset-0 z-60 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
          <div className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border-2 border-white ring-1 ring-blue-500/30 overflow-hidden flex flex-col max-h-[88vh]">
            <div className="px-6 py-4 bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-400/40 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">Master Prompt Enregistré (Actif)</h3>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                      VERSION {MASTER_PROMPT_METADATA.version}
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Cadre éditorial permanent pour la rédaction et la génération de tous les articles du site.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(REGISTERED_MASTER_PROMPT);
                    setCopiedPrompt(true);
                    setTimeout(() => setCopiedPrompt(false), 2500);
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-sm"
                >
                  {copiedPrompt ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-300" />
                      <span>Copié dans le presse-papier !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier le Master Prompt</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setShowMasterPrompt(false)}
                  className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold cursor-pointer"
                >
                  Fermer
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto flex-1 space-y-4">
              {/* Metadata Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Statut</span>
                  <p className="font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    ACTIF & ENREGISTRÉ
                  </p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Volume Requis</span>
                  <p className="font-bold text-slate-900">{MASTER_PROMPT_METADATA.minWordCount}+ mots / article</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Images Obligatoires</span>
                  <p className="font-bold text-slate-900">{MASTER_PROMPT_METADATA.requiredImages} (1 Hero + 4 In-Content)</p>
                </div>
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-0.5">
                  <span className="text-[10px] font-bold uppercase text-slate-400">Langue</span>
                  <p className="font-bold text-slate-900">{MASTER_PROMPT_METADATA.language}</p>
                </div>
              </div>

              {/* Master Prompt Content Viewer */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-700 flex items-center justify-between">
                  <span>Texte Officiel du Master Prompt :</span>
                  <span className="text-[11px] text-slate-500 font-normal">Utilisé par l'IA et le planificateur quotidien</span>
                </span>
                <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono leading-relaxed whitespace-pre-wrap overflow-x-auto max-h-[46vh] border border-slate-800 selection:bg-blue-600">
                  {REGISTERED_MASTER_PROMPT}
                </pre>
              </div>
            </div>

            <div className="px-6 py-3.5 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
              <span className="text-xs text-slate-500">
                Tous les prochains articles créés ou générés appliqueront strictement ce protocole SEO & AdSense.
              </span>
              <button
                type="button"
                onClick={() => setShowMasterPrompt(false)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition cursor-pointer"
              >
                Compris
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
