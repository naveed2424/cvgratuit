import React from 'react';
import { ArrowLeft, AlertTriangle, Building, Server, Shield, HelpCircle } from 'lucide-react';

interface Props {
  onBackToHome: () => void;
  onOpenBlog: () => void;
  onStartCreating: () => void;
}

export const DisclaimerPage: React.FC<Props> = ({ onBackToHome, onOpenBlog, onStartCreating }) => {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-xs font-bold mb-3">
              <AlertTriangle className="w-3.5 h-3.5" />
              <span>Transparence Légale & Clauses de Non-Responsabilité</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Mentions Légales & Disclaimer
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Informations légales obligatoires en vertu de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN).
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Building className="w-5 h-5 text-blue-600" />
                <span>1. Identification de l'Éditeur</span>
              </h2>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs sm:text-sm space-y-1">
                <p><strong>Nom du service :</strong> CVGratuit.fr – Plateforme & Blog Emploi Francophone</p>
                <p><strong>Fondateur & Directeur de la publication :</strong> Naveed Afzal (Ingénieur Web & Consultant en technologies numériques, 20+ ans d'expérience)</p>
                <p><strong>Siège éditorial :</strong> Paris, Île-de-France, France</p>
                <p><strong>Contact électronique :</strong> contact@cvgratuit.fr / support@cvgratuit.fr</p>
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Server className="w-5 h-5 text-indigo-600" />
                <span>2. Hébergement du Site</span>
              </h2>
              <p>
                Le site est hébergé sur des infrastructures cloud haute sécurité répondant aux normes européennes de protection des données, assurant un chiffrement SSL/TLS continu de niveau bancaire.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Shield className="w-5 h-5 text-rose-600" />
                <span>3. Clause de non-responsabilité (Disclaimer Carrière & Emploi)</span>
              </h2>
              <p>
                Les articles, analyses de marché, baromètres de salaires, exemples de questions d'entretien et conseils méthodologiques publiés sur CVGratuit.fr sont fournis à titre exclusivement <strong>informatif et pédagogique</strong>.
              </p>
              <p>
                Bien que nos contenus soient rigoureusement rédigés par des spécialistes du recrutement et croisés avec des sources officielles (Insee, France Travail, Apec, Dares, Ministère du Travail), <strong>l'éditeur ne saurait garantir l'obtention d'un contrat de travail ou la réussite automatique à un processus de sélection</strong>. Chaque décision d'embauche relève du pouvoir discrétionnaire souverain de l'employeur.
              </p>
              <div className="p-4 bg-amber-50/80 border-l-4 border-amber-500 rounded-r-xl text-amber-900 text-xs leading-relaxed">
                <strong>Avertissement salarial et juridique :</strong> Les grilles indicatives de rémunération et les informations relatives aux aides à la reconversion (CPF, PTP, allocations) sont susceptibles d'évoluer selon les lois de finances et les conventions collectives de branche. Les candidats sont invités à se référer aux textes officiels en vigueur.
              </div>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-emerald-600" />
                <span>4. Liens hypertextes externes et indépendance éditoriale</span>
              </h2>
              <p>
                Le site contient des liens vers des sites institutionnels et des ressources documentaires tierces. L'éditeur n'exerce aucun contrôle sur le contenu de ces sites tiers et décline toute responsabilité quant à leur accessibilité ou exactitude.
              </p>
              <p>
                Les marques, logos et noms d'entreprises mentionnés dans les articles (ex: Workday, Google, LinkedIn) sont la propriété respective de leurs titulaires. Leur citation s'inscrit dans un strict cadre informatif d'actualité et ne suggère aucun lien capitalistique ou d'affiliation non déclaré.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-xs border-t border-slate-800 text-center">
        <p>© 2026 CVGratuit.fr – Mentions légales conformes à la loi française.</p>
      </footer>
    </div>
  );
};
