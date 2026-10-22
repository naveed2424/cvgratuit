import React from 'react';
import { 
  Sparkles, Globe, Code, Award, CheckCircle2, 
  ArrowLeft, Laptop, ShieldCheck, Terminal, Users, 
  FileText, Check, Cpu, Layers
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
              <span className="text-xs text-amber-800 font-medium">| Origine & Engagements</span>
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

      {/* Hero Section: Professional Mission */}
      <section className="relative overflow-hidden py-14 sm:py-20 bg-gradient-to-b from-[#f5ede0] via-[#faf5ec] to-[#f4ebe0] border-b border-amber-200/60">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-blue-900 text-xs font-bold shadow-2xs">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                <span>Initiative Indépendante & 100% Gratuite</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
                Une technologie utile, accessible à chaque chercheur d'emploi.
              </h1>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium">
                CVGratuit est un projet conçu et développé par <strong>Naveed Afzal</strong>, ingénieur logiciel fort de plus de <strong>20 ans d'expérience</strong> dans les technologies web et les architectures numériques. Son ambition est simple : mettre à disposition des outils de candidature de haute précision, sans abonnement ni frais cachés.
              </p>

              {/* Founder Statement Card */}
              <div className="card-flashy-white bg-white p-5 rounded-2xl border-2 border-white ring-1 ring-amber-300/50 shadow-md">
                <p className="text-sm text-slate-800 leading-relaxed font-medium">
                  « La vocation d'un ingénieur est de concevoir des outils fiables qui résolvent de vrais problèmes. Permettre à toute personne d'éditer et de télécharger un CV professionnel sans payer d'abonnement abusif est un engagement d'utilité publique. »
                </p>
                <div className="mt-3 text-xs font-bold text-slate-900 flex items-center justify-between">
                  <span>— Naveed Afzal, Créateur de CVGratuit</span>
                  <span className="text-[11px] text-blue-700 font-semibold bg-blue-50 px-2 py-0.5 rounded">20+ ans d'expertise technologique</span>
                </div>
              </div>

              {/* 3 Technical Pillars */}
              <div className="grid grid-cols-3 gap-3 pt-2">
                <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 text-center shadow-xs">
                  <Code className="w-5 h-5 text-blue-600 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-slate-900 block">Excellence Web</span>
                  <span className="text-[10px] text-slate-500">20+ ans d'ingénierie</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 text-center shadow-xs">
                  <Cpu className="w-5 h-5 text-indigo-600 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-slate-900 block">Conforme ATS</span>
                  <span className="text-[10px] text-slate-500">Parsing RH certifié</span>
                </div>
                <div className="bg-white p-3.5 rounded-xl border border-amber-200/80 text-center shadow-xs">
                  <ShieldCheck className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-slate-900 block">Sans Piège</span>
                  <span className="text-[10px] text-slate-500">Zéro frais récurrents</span>
                </div>
              </div>
            </div>

            {/* Right: Technical Architecture Overview Card */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-white rounded-3xl border-2 border-white ring-2 ring-amber-300/40 shadow-2xl p-6 sm:p-7 space-y-6">
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Naveed Afzal</h3>
                      <p className="text-xs text-slate-500">Ingénieur & Fondateur Technique</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-blue-800 bg-blue-50 border border-blue-200 px-2 py-1 rounded-md">
                    France
                  </span>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Garanties de la plateforme
                  </h4>
                  <ul className="space-y-2.5 text-xs text-slate-700">
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Téléchargement PDF direct :</strong> Aucun abonnement requis à la fin de l'édition.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Zéro filigrane :</strong> Vos documents sont 100% prêts pour vos entretiens d'embauche.</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Confidentialité stricte :</strong> Vos données restent enregistrées localement sur votre navigateur (RGPD).</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span><strong>Modèles conformes ATS :</strong> Structurés pour maximiser le taux de réponse des recruteurs.</span>
                    </li>
                  </ul>
                </div>

                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-center">
                  <span className="text-xs text-slate-500 block mb-1">Impact & Accessibilité</span>
                  <span className="text-xl font-black text-slate-900">+1 000 000 d'utilisateurs</span>
                  <span className="text-[11px] text-slate-500 block mt-0.5">Partout en France et en Francophonie</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Origin Story: Why 100% Free */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full space-y-12">
        <div className="card-flashy-white bg-white p-8 sm:p-10 rounded-3xl border-2 border-white ring-1 ring-amber-300/50 shadow-xl space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              L'origine du projet
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
              Pourquoi avoir créé CVGratuit ?
            </h2>
          </div>

          <div className="text-sm sm:text-base text-slate-700 leading-relaxed space-y-4">
            <p>
              Sur Internet, la majorité des plateformes de création de CV utilisent des mécanismes trompeurs : après avoir passé plus de 45 minutes à soigner chaque détail de leur profil, les candidats découvrent un écran de paiement réclamant un abonnement mensuel de 20 € à 35 € pour débloquer leur fichier PDF.
            </p>
            <p>
              Pour <strong>Naveed Afzal</strong>, cette pratique pénalise injustement les personnes en recherche active ou en reconversion professionnelle. Fort de plus de <strong>20 ans d'expérience dans l'ingénierie web, le référencement naturel et les solutions logicielles</strong>, il a programmé CVGratuit avec une règle stricte :
            </p>
            <div className="p-4 bg-blue-50/70 border-l-4 border-blue-600 rounded-r-xl text-slate-900 font-semibold text-sm">
              « Chaque candidat a le droit d'accéder gratuitement à des outils professionnels pour construire son avenir, sans frais cachés, sans filigrane et sans aucune barrière financière. »
            </div>
            <p>
              Le site offre ainsi une ergonomie moderne, des modèles approuvés par les recruteurs et une compatibilité intégrale avec les logiciels de sélection de candidatures (ATS).
            </p>
          </div>
        </div>

        {/* 3 Core Principles */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-extrabold text-slate-900">Nos Engagements Fondamentaux</h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">Les standards techniques et éthiques appliqués à CVGratuit</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-2xl border-2 border-white ring-1 ring-amber-200/50 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-3">
                  <Laptop className="w-5 h-5 text-blue-700" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Accès Universel & Gratuit</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Pas de période d'essai trompeuse ni de carte bancaire demandée. Le téléchargement au format PDF reste entièrement accessible à tous.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-white ring-1 ring-amber-200/50 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-3">
                  <Code className="w-5 h-5 text-indigo-700" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Rigueur Technologique</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Développement soigné respectant les standards du web moderne : typographie A4 calibrée pour l'impression et structures lisibles par les ATS.
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border-2 border-white ring-1 ring-amber-200/50 shadow-md flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
                  <ShieldCheck className="w-5 h-5 text-emerald-700" />
                </div>
                <h4 className="text-base font-bold text-slate-900 mb-2">Protection des Données (RGPD)</h4>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Vos informations personnelles sont conservées sur votre navigateur et ne font l'objet d'aucun profilage publicitaire ni de revente à des tiers.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Expertise Summary */}
        <div className="bg-white p-8 rounded-3xl border-2 border-white ring-1 ring-amber-300/40 shadow-xl space-y-4">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            <span>Domaines d'expertise technique</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Plus de deux décennies d'expérience dans la conception d'architectures numériques à fort trafic :
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 text-xs font-semibold text-slate-800">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Ingénierie Web & SPA</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Optimisation SEO & Données</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Intégration d'outils IA</span>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Accessibilité & Ergonomie RH</span>
            </div>
          </div>
        </div>

        {/* Bottom CTA to build CV */}
        <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center space-y-4 shadow-xl">
          <h3 className="text-2xl sm:text-3xl font-extrabold">
            Prêt à valoriser vos compétences professionnelles ?
          </h3>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mx-auto">
            Créez votre CV professionnel en quelques minutes, personnalisez votre mise en page et téléchargez votre PDF sans frais.
          </p>
          <button
            onClick={onStartCreating}
            className="px-8 py-3.5 bg-white text-blue-700 hover:bg-slate-100 font-extrabold text-sm rounded-xl shadow-lg transition cursor-pointer"
          >
            Créer mon CV gratuit maintenant
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-xs border-t border-slate-800 text-center mt-auto">
        <p>© 2026 CVGratuit.fr – Développé par Naveed Afzal pour soutenir l'emploi en France et dans la Francophonie.</p>
      </footer>
    </div>
  );
};
