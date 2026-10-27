import React from 'react';
import { ArrowLeft, ShieldCheck, FileCheck, Scale, AlertCircle } from 'lucide-react';

interface Props {
  onBackToHome: () => void;
  onOpenBlog: () => void;
  onStartCreating: () => void;
}

export const TermsPage: React.FC<Props> = ({ onBackToHome, onOpenBlog, onStartCreating }) => {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-3">
              <Scale className="w-3.5 h-3.5" />
              <span>Cadre Juridique & Conditions Générales</span>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Conditions Générales d'Utilisation (CGU)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 mt-2">
              Dernière mise à jour : 27 Octobre 2026 • Applicable à l'ensemble des visiteurs et utilisateurs de CVGratuit.fr et de son blog.
            </p>
          </div>

          <div className="prose prose-slate max-w-none text-sm text-slate-700 space-y-6 leading-relaxed">
            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <FileCheck className="w-5 h-5 text-blue-600" />
                <span>1. Objet et champ d'application du service</span>
              </h2>
              <p>
                Le site internet <strong>CVGratuit.fr</strong> (ci-après « le Site ») a pour vocation de fournir aux internautes francophones des outils gratuits de création, d'édition et d'exportation de Curriculum Vitae et lettres de motivation, ainsi qu'un média d'information éditorial et journalistique sur l'emploi, les carrières, les entretiens et le recrutement en France.
              </p>
              <p>
                L'accès au Site et l'utilisation de ses fonctionnalités impliquent l'acceptation pleine, entière et sans réserve des présentes Conditions Générales d'Utilisation par l'utilisateur.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-600" />
                <span>2. Gratuité intégrale et absence d'abonnement payant</span>
              </h2>
              <p>
                L'ensemble des modèles de CV, modèles de lettres de motivation, vérificateurs de conformité ATS et articles d'information publiés sur le blog sont mis à disposition à titre <strong>100% gratuit</strong>.
              </p>
              <p>
                Aucune coordonnée bancaire, aucun abonnement payant récurrent et aucun paiement caché ne sont ni ne seront jamais exigés de l'utilisateur pour exporter son document final au format PDF. Le modèle économique du Site repose exclusivement sur l'affichage d'espaces publicitaires conventionnés (notamment Google AdSense) et d'éventuels partenariats éditoriaux déclarés.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Scale className="w-5 h-5 text-amber-600" />
                <span>3. Propriété intellectuelle et droits d'auteur</span>
              </h2>
              <p>
                La charte graphique, les algorithmes de mise en page, les textes explicatifs, les analyses de marché et les articles journalistiques du blog sont la propriété exclusive de l'éditeur ou de ses contributeurs réguliers, protégés au titre du Code de la propriété intellectuelle.
              </p>
              <p>
                Toute reproduction intégrale ou substantielle des articles du blog sans mention expresse de la source avec lien hypertexte actif est formellement interdite. En revanche, les Curriculum Vitae et lettres de motivation rédigés et exportés par les utilisateurs à partir de nos modèles restent l'entière propriété personnelle de leurs auteurs respectifs.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-rose-600" />
                <span>4. Responsabilité de l'utilisateur et contenu généré</span>
              </h2>
              <p>
                L'utilisateur s'engage à renseigner des informations véridiques, sincères et conformes à son parcours professionnel dans les formulaires de création de CV. L'éditeur ne saurait être tenu pour responsable de déclarations inexactes ou frauduleuses rédigées par l'utilisateur à destination d'un tiers recruteur.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">5. Disponibilité du service et maintenance</h2>
              <p>
                L'éditeur met en œuvre tous les moyens raisonnables pour assurer une disponibilité continue du Site 24 heures sur 24, 7 jours sur 7. Il se réserve néanmoins le droit de suspendre temporairement l'accès au Site pour des opérations de maintenance logicielle ou de mise à jour éditoriale sans préavis.
              </p>
            </section>

            <section className="space-y-3">
              <h2 className="text-lg font-bold text-slate-900">6. Loi applicable et juridiction compétente</h2>
              <p>
                Les présentes CGU sont régies par le droit français. En cas de litige relatif à l'interprétation ou à l'exécution des présentes, les tribunaux français compétents seront seuls habilités à statuer après tentative de résolution amiable.
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-xs border-t border-slate-800 text-center">
        <p>© 2026 CVGratuit.fr – Conditions Générales d'Utilisation régies par la législation française.</p>
      </footer>
    </div>
  );
};
