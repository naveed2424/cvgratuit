import React, { useState } from 'react';
import { BlogPost } from '../../types/blog';
import { createSocialSnippets } from '../../utils/dailyEngine';
import { 
  Share2, X, Copy, Check, Linkedin, Twitter, Mail, 
  MessageCircle, TrendingUp, Sparkles, Zap, ExternalLink 
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  article: BlogPost;
}

export const SocialTrafficKitModal: React.FC<Props> = ({
  isOpen,
  onClose,
  article,
}) => {
  const [activeTab, setActiveTab] = useState<'linkedin' | 'twitter' | 'newsletter' | 'whatsapp'>('linkedin');
  const [copiedTab, setCopiedTab] = useState<string | null>(null);

  if (!isOpen) return null;

  const articleUrl = typeof window !== 'undefined' ? window.location.href : `https://cvgratuit.fr/blog/${article.slug}`;
  const snippets = article.socialSnippets || createSocialSnippets(article.title, article.primaryKeyword, articleUrl);

  const handleCopy = (text: string, tabName: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopiedTab(tabName);
      setTimeout(() => setCopiedTab(null), 2500);
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'share_snippet_copied', {
          platform: tabName,
          article_title: article.title,
        });
      }
    }
  };

  const getLinkedInShareUrl = () => {
    return `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`;
  };

  const getTwitterShareUrl = () => {
    const text = `🚨 ${article.title.slice(0, 100)}... Lire l'enquête complète :`;
    return `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(articleUrl)}&hashtags=Recrutement,Emploi,CV`;
  };

  const getWhatsAppShareUrl = () => {
    const text = `*Article Emploi du Jour sur CVGratuit :* ${article.title} 👉 ${articleUrl}`;
    return `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border-2 border-white ring-1 ring-amber-300/40 overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-800 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold">Kit d'Acquisition de Trafic Quotidien</h3>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  Boost Visiteurs
                </span>
              </div>
              <p className="text-xs text-blue-100">
                Messages viraux prêts à publier en 1 clic pour attirer des milliers de lecteurs chaque jour.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 transition text-white/80 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-5">
          {/* Article Reminder Card */}
          <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-2xl flex items-center justify-between gap-3 text-xs">
            <div className="truncate">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Article ciblé :</span>
              <p className="font-bold text-slate-900 truncate">{article.title}</p>
            </div>
            <span className="shrink-0 text-[11px] font-semibold text-blue-700 bg-blue-100 px-2.5 py-1 rounded-lg">
              {article.readingTime}
            </span>
          </div>

          {/* Social Channel Selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <button
              type="button"
              onClick={() => setActiveTab('linkedin')}
              className={`p-3 rounded-2xl border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-1.5 ${
                activeTab === 'linkedin'
                  ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Linkedin className="w-5 h-5 text-[#0077b5]" />
              <span>LinkedIn Post</span>
              <span className="text-[9px] font-normal text-slate-400">Canal #1 Emploi</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('twitter')}
              className={`p-3 rounded-2xl border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-1.5 ${
                activeTab === 'twitter'
                  ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Twitter className="w-5 h-5 text-[#1da1f2]" />
              <span>X / Twitter Thread</span>
              <span className="text-[9px] font-normal text-slate-400">Buzz & Viralité</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('newsletter')}
              className={`p-3 rounded-2xl border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-1.5 ${
                activeTab === 'newsletter'
                  ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <Mail className="w-5 h-5 text-amber-600" />
              <span>Newsletter Matinale</span>
              <span className="text-[9px] font-normal text-slate-400">Fidélisation</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('whatsapp')}
              className={`p-3 rounded-2xl border text-xs font-bold transition cursor-pointer flex flex-col items-center gap-1.5 ${
                activeTab === 'whatsapp'
                  ? 'border-blue-600 bg-blue-50 text-blue-900 ring-2 ring-blue-500/20'
                  : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
              }`}
            >
              <MessageCircle className="w-5 h-5 text-emerald-600" />
              <span>Groupes WhatsApp</span>
              <span className="text-[9px] font-normal text-slate-400">Partage direct</span>
            </button>
          </div>

          {/* Active Tab Content */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-blue-600" />
                <span>
                  {activeTab === 'linkedin' && 'Post LinkedIn à fort taux de clic (CTR)'}
                  {activeTab === 'twitter' && 'Tweet & Thread optimisé pour l\'engagement'}
                  {activeTab === 'newsletter' && 'Format e-mail prêt pour votre liste d\'abonnés'}
                  {activeTab === 'whatsapp' && 'Message court pour groupes d\'entraide et promo'}
                </span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleCopy(snippets[activeTab], activeTab)}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 shadow-2xs"
                >
                  {copiedTab === activeTab ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copié dans le presse-papier !</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copier le texte</span>
                    </>
                  )}
                </button>

                {activeTab === 'linkedin' && (
                  <a
                    href={getLinkedInShareUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#0077b5] hover:bg-[#005582] text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Ouvrir LinkedIn</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {activeTab === 'twitter' && (
                  <a
                    href={getTwitterShareUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-[#1da1f2] hover:bg-[#0c85d0] text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Tweeter</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}

                {activeTab === 'whatsapp' && (
                  <a
                    href={getWhatsAppShareUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition inline-flex items-center gap-1.5 shadow-2xs"
                  >
                    <span>Envoyer sur WhatsApp</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>
            </div>

            <textarea
              readOnly
              value={snippets[activeTab]}
              rows={9}
              className="w-full p-4 bg-slate-50 border border-slate-300 rounded-2xl text-xs font-mono text-slate-800 leading-relaxed focus:outline-none select-all"
            />
          </div>

          {/* Traffic Pro-Tips */}
          <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs text-amber-900 space-y-1.5">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <TrendingUp className="w-4 h-4 text-amber-600" />
              <span>Conseil de Croissance : Heures optimales de diffusion en France</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Pour maximiser les clics vers <strong>CVGratuit</strong>, publiez sur LinkedIn entre <strong>07h45 et 08h30</strong> (trajet du matin) ou entre <strong>12h15 et 13h15</strong> (pause déjeuner). Laissez le lien dans le corps du texte ou en premier commentaire pour maximiser la portée algorithmique.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between shrink-0">
          <span className="text-[11px] text-slate-500">
            Astuce : 1 publication par matin = 300 à 1 500 nouveaux visiteurs uniques par jour.
          </span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold rounded-xl transition cursor-pointer"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};
