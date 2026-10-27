import React from 'react';
import { ArrowLeft, Lock, ShieldCheck, Cookie, Eye, CheckCircle2 } from 'lucide-react';

interface Props {
  onBackToHome: () => void;
  onOpenBlog: () => void;
  onStartCreating: () => void;
}

export const PrivacyPage: React.FC<Props> = ({ onBackToHome, onOpenBlog, onStartCreating }) => {
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
              <span>Accueil</span>
            </button>
            <div className="h-4 w-px bg-amber-200 hidden sm:block"></div>
            <button
              onClick={onOpenBlog}
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-800 transition hidden sm:inline"
            >
              Le Blog Emploi
            </button>
          </div>

          <button
            onClick={onStartCreating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition cursor-pointer"
          >
            Créer mon CV
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-2 border-white ring-1 ring-amber-300/40 shadow-xl space-y-8">
          <div className="border-b border-slate-100 pb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold mb-3">
              <Lock className="w-3.5 h-3.5" />
              <span>Protection des Données & Conformité RGPD (UE 2016/679)</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Politique de Confidentialité & Gestion des Cookies
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Dernière mise à jour : 27 Octobre 2026 • Respect strict de votre vie privée et de la confidentialité de vos candidatures.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>1. Principe d'Architecture : Données CV stockées localement</span>
              </h2>
              <p>
                Contrairement aux services payants qui stockent l'ensemble de vos coordonnées et expériences professionnelles sur des serveurs distants pour vous relancer commercialement, <strong>CVGratuit.fr adopte une architecture respectueuse de votre vie privée (Privacy-First)</strong>.
              </p>
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                <div className="flex items-center gap-2 text-emerald-900 font-bold text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Stockage 100% Local (Client-Side)</span>
                </div>
                <p className="text-xs text-emerald-900">
                  Les textes que vous saisissez dans l'éditeur de CV (nom, prénom, adresse, historique d'emploi, diplômes) sont sauvegardés exclusivement dans la mémoire locale de votre propre navigateur web (via <code>localStorage</code>). Aucune de ces informations sensibles n'est vendue, louée ou exploitée à des fins de profilage commercial.
                </p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Eye className="w-5 h-5 text-blue-600" />
                <span>2. Mesure d'Audience & Google Analytics (gtag.js)</span>
              </h2>
              <p>
                Afin d'analyser la fréquentation du site, de détecter d'éventuels dysfonctionnements techniques et d'améliorer la pertinence de nos articles de blog, nous utilisons le service de mesure d'audience <strong>Google Analytics 4</strong> via le tag officiel <code>G-ZM8R2JF6WT</code>.
              </p>
              <p>
                Les données collectées sont strictement anonymisées (adresses IP anonymisées, URL consultées, type de navigateur, durée de lecture). Ces mesures nous permettent d'optimiser l'ergonomie générale du service sans identifier nominativement les personnes physiques.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Cookie className="w-5 h-5 text-amber-600" />
                <span>3. Publicité Google AdSense & Cookies Partenaires</span>
              </h2>
              <p>
                Pour maintenir la gratuité totale de nos outils de candidature, le site diffuse des annonces publicitaires via le réseau <strong>Google AdSense</strong>.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-600">
                <li>
                  Des fournisseurs tiers, y compris Google, utilisent des cookies pour diffuser des annonces pertinentes en fonction des visites antérieures des internautes sur ce site ou sur d'autres sites web.
                </li>
                <li>
                  Grâce aux cookies publicitaires, Google et ses partenaires adaptent les annonces diffusées auprès des visiteurs en fonction de leur navigation.
                </li>
                <li>
                  Les utilisateurs peuvent désactiver la publicité personnalisée à tout moment en se rendant sur la page officielle des paramètres des annonces Google : <a href="https://adssettings.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Paramètres des annonces Google</a>.
                </li>
              </ul>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">4. Vos droits d'accès, de rectification et d'effacement</h2>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi « Informatique et Libertés », vous disposez d'un droit permanent d'accès, d'opposition, de rectification et de suppression totale de vos données.
              </p>
              <p>
                Puisque vos données de CV sont stockées localement sur votre appareil, vous pouvez les effacer instantanément et définitivement à tout moment en vidant simplement le cache et les données de navigation de votre navigateur pour le domaine <code>cvgratuit.fr</code>.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">5. Délégué à la Protection des Données & Contact</h2>
              <p>
                Pour toute question relative à cette politique de confidentialité ou pour exercer vos droits, vous pouvez contacter notre référent vie privée à l'adresse suivante : <strong>rgpd@cvgratuit.fr</strong>.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-xs border-t border-slate-800 text-center">
        <p>© 2026 CVGratuit.fr – Politique de confidentialité certifiée conforme RGPD.</p>
      </footer>
    </div>
  );
};
