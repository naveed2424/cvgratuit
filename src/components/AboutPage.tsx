import React from 'react';
import { 
  Heart, Sparkles, Globe, Code, Award, CheckCircle2, 
  ArrowLeft, Mail, Linkedin, Compass, Brain, Lightbulb, Users, ShieldCheck, ExternalLink
} from 'lucide-react';

interface Props {
  onBackToHome: () => void;
  onStartCreating: () => void;
}

export const AboutPage: React.FC<Props> = ({ onBackToHome, onStartCreating }) => {
  return (
    <div className="min-h-screen bg-[#f7f1e5] bg-office-grid-champagne text-slate-900 font-sans flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-amber-200/60 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-950 px-3 py-1.5 rounded-lg hover:bg-amber-100/50 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </button>
            <div className="h-4 w-px bg-amber-200 hidden sm:block"></div>
            <div className="items-center gap-2 hidden sm:flex">
              <span className="text-base font-bold text-slate-900">
                CV<span className="text-blue-600">Gratuit</span>
              </span>
              <span className="text-xs text-amber-800 font-medium">| L'histoire de notre fondateur</span>
            </div>
          </div>

          <button
            onClick={onStartCreating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            Créer mon CV gratuit
          </button>
        </div>
      </header>

      {/* Hero Section: Founder & Mission */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-[#f5ede0] via-[#faf5ec] to-[#f4ebe0] border-b border-amber-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-bold shadow-2xs">
                <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" />
                <span>Pourquoi ce site a été créé : Aider les autres</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                « Aider chacun à réussir, sans barrière financière. »
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                CVGratuit est né d'une conviction profonde portée par <strong>Naveed Afzal</strong> : la technologie doit servir l'émancipation humaine, la solidarité et l'égalité des chances dans la recherche d'emploi.
              </p>

              {/* Quote Card */}
              <div className="card-flashy-white bg-white p-5 rounded-2xl border-2 border-white ring-1 ring-amber-300/50 shadow-md">
                <blockquote className="text-sm italic text-slate-800 font-serif leading-relaxed">
                  “ La technologie est ma profession. La pleine conscience est mon chemin. Ensemble, elles créent du sens. Le succès ne consiste pas seulement à créer des sites, mais à apporter une valeur réelle et à toucher des vies. ”
                </blockquote>
                <div className="mt-3 text-xs font-bold text-amber-900">
                  — Naveed Afzal, Fondateur de CVGratuit
                </div>
              </div>

              {/* 3 Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white/80 border border-amber-200/80 p-3 rounded-xl text-center shadow-2xs">
                  <Code className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-900 block">Innovateur Tech</span>
                  <span className="text-[10px] text-slate-500">20+ ans d'expérience</span>
                </div>
                <div className="bg-white/80 border border-amber-200/80 p-3 rounded-xl text-center shadow-2xs">
                  <Compass className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-900 block">Conscience & Cœur</span>
                  <span className="text-[10px] text-slate-500">Méditation & écoute</span>
                </div>
                <div className="bg-white/80 border border-amber-200/80 p-3 rounded-xl text-center shadow-2xs">
                  <Globe className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                  <span className="text-[11px] font-bold text-slate-900 block">Vision Globale</span>
                  <span className="text-[10px] text-slate-500">Basé en France</span>
                </div>
              </div>
            </div>

            {/* Right: Portfolio Portrait Visual */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative max-w-sm w-full">
                <div className="absolute -inset-2 bg-gradient-to-tr from-amber-300 to-blue-400 rounded-3xl blur-lg opacity-30"></div>
                <div className="relative card-flashy-white bg-white rounded-3xl overflow-hidden border-2 border-white ring-2 ring-amber-300/40 shadow-2xl">
                  <img
                    src="/assets/aistudio/Portfolio_technologique_et_m_ditatif_de_Naveed_Afzal_4cd849be.png"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/public/assets/aistudio/Portfolio_technologique_et_m_ditatif_de_Naveed_Afzal_4cd849be.png';
                    }}
                    alt="Portfolio de Naveed Afzal - Fondateur de CVGratuit"
                    className="w-full h-auto object-cover max-h-[460px] object-top"
                  />
                  <div className="p-4 bg-white border-t border-amber-100 flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Naveed Afzal</h3>
                      <p className="text-xs text-amber-800">Technologiste & Créateur Digital</p>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      France
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Origin Story: Why 100% Free */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="card-flashy-white bg-white p-8 sm:p-10 rounded-3xl border-2 border-white ring-1 ring-amber-300/50 shadow-xl space-y-6">
          <div className="border-b border-amber-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-800">
              L'engagement du créateur
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Pourquoi avoir créé CVGratuit ?
            </h2>
          </div>

          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            <p>
              Trop souvent sur Internet, des personnes en situation de recherche d'emploi, parfois précaires ou en reconversion, passent 45 minutes à soigner leur CV pour découvrir au dernier moment qu'un abonnement mensuel de 29 € ou des frais cachés leur sont réclamés pour télécharger leur fichier.
            </p>
            <p>
              Pour <strong>Naveed Afzal</strong>, cette pratique va à l'encontre de l'éthique du Web et des valeurs humaines fondamentales. Fort de plus de <strong>20 ans d'expertise dans le développement web, le SEO et les technologies numériques</strong> (Codra, Webdia), il a choisi de concevoir cet outil avec un principe absolu :
            </p>
            <div className="p-4 bg-amber-50/70 border-l-4 border-amber-500 rounded-r-xl text-slate-900 font-semibold text-sm">
              « Chaque chercheur d'emploi mérite d'avoir accès gratuitement à des modèles de CV professionnels, validés par des recruteurs et compatibles avec les logiciels ATS, sans filigrane et sans aucune contrepartie financière. »
            </div>
            <p>
              Guidé par la méditation, la pleine conscience et la sagesse orientale mariée à la rigueur technologique occidentale, Naveed a bâti CVGratuit comme un projet de cœur, conçu pour inspirer, éduquer et soutenir concrètement chaque candidature.
            </p>
          </div>
        </div>

        {/* What Drives Us Grid */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900">Ce qui nous anime au quotidien</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Les 5 principes fondateurs inspirés de la démarche de Naveed Afzal</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border-2 border-white ring-1 ring-amber-200/50 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-3">
                  <Heart className="w-5 h-5 text-amber-700" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Aider & Inspirer autrui</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Mettre son savoir-faire technique au service du bien commun pour faire une vraie différence dans la vie des gens.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-white ring-1 ring-amber-200/50 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                  <Lightbulb className="w-5 h-5 text-blue-700" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Amour des Nouvelles Technologies</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Exploiter l'intelligence artificielle et les standards du web pour simplifier la vie des candidats.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-white ring-1 ring-amber-200/50 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Intégrité & Honnêteté</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Transparence totale : pas de piège d'abonnement, pas de vente de données privées (respect RGPD local).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Summary */}
        <div className="bg-white p-8 rounded-3xl border-2 border-white ring-1 ring-amber-300/40 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-600" />
            <span>Compétences & Expérience de Naveed Afzal</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Plus de deux décennies d'expertise dans le développement d'écosystèmes web à fort impact :
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-semibold text-slate-800">
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
              ✓ Développement Web & WordPress
            </div>
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
              ✓ Stratégie SEO & Analytics
            </div>
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
              ✓ Outils IA & Automatisation
            </div>
            <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60">
              ✓ Contenus & Pleine Conscience
            </div>
          </div>
        </div>

        {/* Bottom CTA to build CV */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Prêt à propulser votre candidature vers le succès ?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
            Créez dès aujourd'hui votre CV professionnel, profitez des suggestions par métier et téléchargez votre PDF sans débourser un centime.
          </p>
          <button
            onClick={onStartCreating}
            className="px-8 py-3.5 bg-white text-blue-700 hover:bg-amber-50 font-extrabold text-sm rounded-xl shadow-lg transition cursor-pointer"
          >
            Créer mon CV gratuit maintenant
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-xs border-t border-slate-800 text-center mt-auto">
        <p>© 2026 CVGratuit.fr – Conçu avec cœur par Naveed Afzal pour soutenir l'emploi en France et dans la Francophonie.</p>
      </footer>
    </div>
  );
};
