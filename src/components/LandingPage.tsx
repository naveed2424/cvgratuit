import React, { useState } from 'react';
import { TEMPLATES } from '../data/templates';
import { JOB_PRESETS } from '../data/jobPresets';
import { TESTIMONIALS, FAQ_ITEMS, RECRUITER_BRANDS, EEAT_CREDENTIALS } from '../data/seoData';
import { JobPreset, TemplateId } from '../types/resume';
import { 
  Sparkles, CheckCircle2, ArrowRight, Star, ShieldCheck, Download, 
  FileText, Palette, Users, ChevronRight, ChevronDown, Check, Zap, Eye,
  Building2, Laptop, Monitor, Briefcase, MessageSquare
} from 'lucide-react';

interface Props {
  onStartCreating: () => void;
  onSelectJobPreset: (preset: JobPreset) => void;
  onSelectTemplate: (templateId: TemplateId) => void;
  onOpenLetter: () => void;
  onOpenAtsChecker: () => void;
  onOpenComments: () => void;
}

export const LandingPage: React.FC<Props> = ({
  onStartCreating,
  onSelectJobPreset,
  onSelectTemplate,
  onOpenLetter,
  onOpenAtsChecker,
  onOpenComments,
}) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [selectedLanguage, setSelectedLanguage] = useState('FR');
  const [carouselIndex, setCarouselIndex] = useState(0);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans">
      {/* 1. Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Logo MakeMyCV style */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={onStartCreating}>
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold shadow-xs">
              <FileText className="w-4 h-4" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              CV<span className="text-blue-600">Gratuit</span>
            </span>
          </div>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-5 text-sm font-semibold text-slate-600">
            <a href="#modeles" className="hover:text-blue-600 transition">Modèles de CV</a>
            <a href="#metiers" className="hover:text-blue-600 transition">Exemples par métier</a>
            <a href="#etapes" className="hover:text-blue-600 transition">Comment ça marche</a>
            <a href="#ats-checker" className="hover:text-blue-600 transition">ATS Checker</a>
            <button 
              onClick={onOpenComments}
              className="hover:text-blue-600 transition cursor-pointer flex items-center gap-1.5 font-semibold text-slate-600"
            >
              <span>Avis & Témoignages</span>
              <span className="text-[10px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-bold">★ 4.9</span>
            </button>
            <a href="#faq" className="hover:text-blue-600 transition">FAQ</a>
          </nav>

          {/* Right: Language switch + CTA */}
          <div className="flex items-center gap-3">
            <div className="relative inline-block text-left text-xs font-semibold text-slate-700 bg-slate-100 px-2.5 py-1.5 rounded-lg border border-slate-200">
              <span className="flex items-center gap-1.5 cursor-pointer">
                <span>🇫🇷 {selectedLanguage}</span>
              </span>
            </div>

            <button
              onClick={onStartCreating}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md hover:shadow-lg transition cursor-pointer flex items-center gap-1.5"
            >
              <span>Créer mon CV</span>
              <ArrowRight className="w-4 h-4 hidden sm:inline" />
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section (Inspiration MakeMyCV with warm Champagne background and brilliant flashy white card) */}
      <section className="relative overflow-hidden pt-8 pb-16 md:pt-14 md:pb-24 bg-gradient-to-b from-[#f7f1e5] via-[#faf5ec] to-[#f4ebe0]">
        {/* Clearly Visible Modern Glass Office, Building & Computer Workspace Backdrop in Champagne Glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
          {/* Luminous modern high-tech office building and computer desks with warm champagne tone */}
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&auto=format&fit=crop&q=80"
            alt="Bureau moderne et ordinateurs de travail"
            className="w-full h-full object-cover object-center opacity-30 mix-blend-multiply filter contrast-125 sepia-[0.25]"
          />
          {/* Modern office building glass facade subtle overlay on right side */}
          <div 
            className="absolute top-0 right-0 w-1/2 h-full opacity-20 bg-cover bg-no-repeat bg-right"
            style={{
              backgroundImage: `url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80')`
            }}
          ></div>

          {/* Soft architectural blueprint grid in warm champagne gold */}
          <div className="absolute inset-0 bg-office-grid-champagne opacity-80"></div>

          {/* Light champagne gradient mask ensuring all headings and buttons remain 100% legible */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#fbf8f2]/90 via-[#faf5eb]/80 to-[#f6efe2]/60"></div>

          {/* Visible architectural badges */}
          <div className="absolute top-6 right-10 hidden xl:flex items-center gap-2 text-xs font-semibold text-amber-900 bg-white/95 backdrop-blur-md border border-amber-300/80 px-3.5 py-1.5 rounded-full shadow-md">
            <Building2 className="w-4 h-4 text-amber-600" />
            <span>Tour d'affaires & Espace RH certifié</span>
          </div>

          <div className="absolute bottom-8 left-10 hidden xl:flex items-center gap-2 text-xs font-semibold text-amber-900 bg-white/95 backdrop-blur-md border border-amber-300/80 px-3.5 py-1.5 rounded-full shadow-md">
            <Laptop className="w-4 h-4 text-amber-700" />
            <span>Postes informatiques de test ATS</span>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Column (Hero Text) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Trust Badge with Avatars in Brilliant White */}
              <div className="inline-flex items-center gap-3 bg-white border border-amber-200/80 shadow-md px-3.5 py-1.5 rounded-full">
                <div className="flex -space-x-2">
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=60&auto=format&fit=crop&q=80" alt="Utilisateur" />
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=60&auto=format&fit=crop&q=80" alt="Utilisateur" />
                  <img className="inline-block h-6 w-6 rounded-full ring-2 ring-white object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=60&auto=format&fit=crop&q=80" alt="Utilisateur" />
                </div>
                <span className="text-xs font-bold text-slate-800">
                  +1 million d'utilisateurs satisfaits
                </span>
              </div>

              {/* H1 Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
                Créez un CV parfait <br />
                en quelques minutes <br />
                <span className="text-blue-600 underline decoration-amber-300 decoration-wavy">grâce à l'IA</span>
              </h1>

              {/* Subtitle */}
              <p className="text-base sm:text-lg text-slate-700 max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium">
                Créez un CV percutant grâce à nos modèles approuvés par les recruteurs et notre assistant intelligent. <strong>100% gratuit</strong>, sans abonnement caché, téléchargement PDF direct.
              </p>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3.5 justify-center lg:justify-start pt-2">
                <button
                  onClick={onStartCreating}
                  className="px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold text-base rounded-xl shadow-lg hover:shadow-xl transition transform active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-5 h-5 text-blue-200" />
                  <span>Créer mon CV gratuit</span>
                </button>

                <a
                  href="#metiers"
                  className="px-6 py-3.5 bg-white hover:bg-amber-50/50 text-slate-800 font-bold text-base rounded-xl border border-amber-300/80 shadow-sm hover:border-amber-400 transition flex items-center justify-center gap-2"
                >
                  <FileText className="w-5 h-5 text-amber-600" />
                  <span>Choisir un exemple par métier</span>
                </a>
              </div>

              {/* Trustpilot Review Strip */}
              <div className="pt-3 flex flex-wrap items-center justify-center lg:justify-start gap-3 text-xs text-slate-700">
                <span className="font-extrabold text-slate-900 tracking-wide">EXCELLENT</span>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="w-4 h-4 bg-emerald-500 text-white text-[10px] flex items-center justify-center font-bold">
                      ★
                    </span>
                  ))}
                </div>
                <span>sur <strong>Trustpilot</strong> (plus de 14 000 avis vérifiés)</span>
              </div>
            </div>

            {/* Right Column (Hero Visual Mockup in Flashy Brilliant White) */}
            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                {/* Decorative background glow in amber/blue */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-400 to-blue-500 rounded-2xl blur-lg opacity-35"></div>

                {/* Main Resume Card Mockup in Pure Brilliant Flashy White */}
                <div className="relative card-flashy-white-hero bg-white rounded-2xl p-6 overflow-hidden">
                  {/* Floating AI Assistant pill */}
                  <div className="absolute top-4 right-4 bg-slate-900 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1.5 animate-pulse">
                    <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                    <span>AI assistant</span>
                  </div>

                  {/* Header of Mockup */}
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                    <img
                      src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"
                      alt="Elsa Manet"
                      className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow-xs"
                    />
                    <div>
                      <h4 className="text-base font-bold text-slate-900">Elsa Manet</h4>
                      <p className="text-xs font-semibold text-blue-600">Conseillère de vente Prêt-à-Porter</p>
                      <p className="text-[11px] text-slate-400">Paris, France • Permis B</p>
                    </div>
                  </div>

                  {/* Mock content lines */}
                  <div className="space-y-3 text-[11px] text-slate-600">
                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Expérience professionnelle
                      </div>
                      <div className="font-bold text-slate-800 text-xs">Conseillère Senior - Boutique Sandro</div>
                      <div className="text-slate-400 text-[10px] mb-1">2023 - Présent</div>
                      <p className="line-clamp-2 leading-relaxed">
                        • Dépassement de 118% des objectifs mensuels de chiffre d'affaires.<br />
                        • Fidélisation d'une clientèle VIP internationale.
                      </p>
                    </div>

                    <div>
                      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                        Compétences clés
                      </div>
                      <div className="flex flex-wrap gap-1">
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-medium">Techniques de vente</span>
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-medium">Merchandising</span>
                        <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded text-[10px] font-medium">Cegid Retail</span>
                      </div>
                    </div>
                  </div>

                  {/* Formatting Toolbar Mockup (B I U Colors) */}
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600 bg-slate-100 px-2.5 py-1 rounded-md font-mono">
                      <span className="font-bold">B</span>
                      <span className="italic">I</span>
                      <span className="underline">U</span>
                      <span className="text-slate-300">|</span>
                      <div className="flex gap-1">
                        <span className="w-3 h-3 rounded-full bg-blue-600"></span>
                        <span className="w-3 h-3 rounded-full bg-emerald-600"></span>
                        <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                      </div>
                    </div>

                    {/* Resume Score 95 badge */}
                    <div className="flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 text-emerald-800 px-3 py-1 rounded-full text-xs font-bold shadow-2xs">
                      <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                      <span>Score ATS : 95%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Social Proof Recruiter Logos Ticker (Carrefour, Tesla, Renault, Decathlon, La Poste...) */}
      <section className="bg-slate-900 py-6 text-white border-y border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest text-center md:text-left">
              Nos candidats sont embauchés par les plus grandes entreprises* :
            </span>
            <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8 opacity-80 text-xs sm:text-sm font-bold tracking-wider">
              {RECRUITER_BRANDS.map((brand, i) => (
                <span key={i} className="hover:text-blue-400 transition cursor-default">
                  {brand.logoText}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. "Créez votre CV en 4 étapes" (PDF Page 1) in Champagne & Flashy White */}
      <section id="etapes" className="py-20 bg-[#f6efe2] bg-office-grid-champagne relative border-t border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100/80 text-amber-900 text-xs font-bold mb-3 border border-amber-300/60 shadow-2xs">
            <span>Processus rapide & 100% sans frais</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Créez votre CV en 4 étapes simples
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-700 max-w-2xl mx-auto font-medium">
            Un processus fluide, intuitif et sans barrière financière pour concevoir une candidature gagnante.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12 text-left">
            {/* Étape 1 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-white ring-1 ring-amber-300/40 shadow-lg hover:shadow-xl transition relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-4">
                  01
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Démarrez à votre façon
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Importez un CV existant, partez d'une feuille blanche ou sélectionnez un métier pré-rempli par nos experts RH.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-blue-600 font-semibold">
                +10 métiers disponibles
              </div>
            </div>

            {/* Étape 2 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-white ring-1 ring-amber-300/40 shadow-lg hover:shadow-xl transition relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-4">
                  02
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Rédigez avec l'IA
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Bénéficiez de formulations percutantes, d'accroches ciblées et de verbes d'action avec résultats chiffrés.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-blue-600 font-semibold">
                Optimisé pour les ATS
              </div>
            </div>

            {/* Étape 3 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-white ring-1 ring-amber-300/40 shadow-lg hover:shadow-xl transition relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-4">
                  03
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Personnalisez-le
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Ajustez les couleurs, typographies, espacements et activez la photo en un clic selon votre convenance.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-blue-600 font-semibold">
                6 thèmes graphiques
              </div>
            </div>

            {/* Étape 4 */}
            <div className="bg-white p-6 rounded-2xl border-2 border-white ring-1 ring-amber-300/40 shadow-lg hover:shadow-xl transition relative flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 font-bold flex items-center justify-center text-sm mb-4">
                  04
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  Téléchargez et postulez
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Exportez directement en PDF standard A4 haute qualité sans payer, sans abonnement et sans filigrane.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
                <Check className="w-3.5 h-3.5" /> 100% Gratuit & Illimité
              </div>
            </div>
          </div>

          <div className="mt-10">
            <button
              onClick={onStartCreating}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm rounded-xl shadow-md transition cursor-pointer"
            >
              Créer mon CV maintenant
            </button>
          </div>
        </div>
      </section>

      {/* 5. "Choisissez votre modèle de CV professionnel" (PDF Page 1 & 2) */}
      <section id="modeles" className="py-20 bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-900/60 text-blue-300 text-xs font-semibold mb-3 border border-blue-700/50">
            <Palette className="w-3.5 h-3.5" />
            <span>Galerie de thèmes professionnels</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
            Choisissez votre modèle de CV professionnel
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-400 max-w-xl mx-auto">
            Tous nos modèles de CV sont rigoureusement testés et approuvés par des recruteurs en France.
          </p>

          {/* Model Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-left">
            {TEMPLATES.map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => {
                  onSelectTemplate(tmpl.id);
                  onStartCreating();
                }}
                className="bg-slate-800 rounded-2xl border border-slate-700 overflow-hidden hover:border-blue-500 hover:shadow-xl transition cursor-pointer group flex flex-col justify-between"
              >
                {/* Visual Preview Header */}
                <div className="p-6 bg-slate-850 border-b border-slate-700/80">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-bold text-blue-400 bg-blue-950/80 px-2.5 py-0.5 rounded-full border border-blue-800/60">
                      {tmpl.badge}
                    </span>
                    <span className={`w-3.5 h-3.5 rounded-full ${tmpl.previewBg}`}></span>
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition">
                    {tmpl.name}
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {tmpl.tagline}
                  </p>
                </div>

                {/* Details */}
                <div className="p-6 space-y-4">
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {tmpl.description}
                  </p>
                  <div>
                    <span className="text-[11px] font-semibold text-slate-400 block mb-1">
                      Idéal pour :
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {tmpl.recommendedFor.map((rec, i) => (
                        <span key={i} className="text-[10px] bg-slate-700 text-slate-300 px-2 py-0.5 rounded">
                          {rec}
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-1.5"
                  >
                    <span>Utiliser ce modèle</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. "6 raisons de créer votre CV avec CVGratuit" (PDF Page 2) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            6 raisons de créer votre CV avec CVGratuit
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            La seule plateforme pensée de bout en bout pour simplifier votre recherche d'emploi en France.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 text-left">
            {/* 1 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Créateur de CV en ligne
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Créez votre CV en ligne dans un éditeur épuré, sans distraction et avec prévisualisation temps réel en format A4.
              </p>
            </div>

            {/* 2 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Contenus pré-rédigés
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Vous ne savez pas quoi écrire ? Partez d'un contenu validé par des recruteurs par métier et personnalisez-le.
              </p>
            </div>

            {/* 3 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Assistant IA intelligent
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Obtenez des suggestions de contenu sur mesure pour votre CV, élaborées par notre IA et approuvées par des recruteurs.
              </p>
            </div>

            {/* 4 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Modèles multilingues & Francophonie
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conforme aux standards du recrutement en France, Belgique, Suisse et Québec. Niveaux de langue CECRL inclus.
              </p>
            </div>

            {/* 5 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                <FileText className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Créateur de lettre de motivation
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Créez une lettre de motivation assortie en quelques clics, reprenant le même code couleur et le même design que votre CV.
              </p>
            </div>

            {/* 6 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:shadow-md transition">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center font-bold mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-1.5">
                Modèles 100% optimisés ATS
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Passez sans encombre le filtre des robots de recrutement (Taleo, Workday, Taleez) grâce à une structure normalisée.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. "Bibliothèque d'exemples par métier" (#metiers) in Champagne & Flashy White */}
      <section id="metiers" className="py-20 bg-[#f7f1e5] bg-office-dots-champagne border-t border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Exemples de CV rédigés par métier
            </h2>
            <p className="mt-2 text-sm text-slate-700 font-medium">
              Cliquez sur un métier pour charger un modèle complet pré-rempli avec des réalisations chiffrées et compétences ciblées.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {JOB_PRESETS.map((preset) => (
              <div
                key={preset.id}
                onClick={() => {
                  onSelectJobPreset(preset);
                  onStartCreating();
                }}
                className="bg-white p-5 rounded-2xl border-2 border-white ring-1 ring-amber-300/40 hover:ring-blue-400 shadow-md hover:shadow-xl transition cursor-pointer group flex flex-col justify-between"
              >
                <div>
                  <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                    {preset.category}
                  </span>
                  <h3 className="text-sm font-bold text-slate-900 group-hover:text-blue-600 transition mt-2 mb-1">
                    {preset.title}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                    {preset.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-blue-600">
                  <span>Charger cet exemple</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. "Tout ce qu'il vous faut pour décrocher des entretiens" (PDF Page 3) */}
      <section id="ats-checker" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Tout ce qu'il vous faut pour décrocher des entretiens
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-xl mx-auto">
            Les 3 piliers indispensables d'une candidature victorieuse réunis au même endroit.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 text-left">
            {/* Card 1 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Créateur de CV
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Créez un CV clair et professionnel que les recruteurs lisent en un coup d'œil. Téléchargement PDF haute définition immédiat.
                </p>
              </div>
              <button
                onClick={onStartCreating}
                className="text-xs font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
              >
                <span>Créer mon CV maintenant</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 2 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Lettre de motivation
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Rédigez une lettre de motivation percutante assortie à la charte de votre CV avec nos modèles pré-rédigés.
                </p>
              </div>
              <button
                onClick={onOpenLetter}
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
              >
                <span>Rédiger ma lettre de motivation</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* Card 3 */}
            <div className="p-6 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-600 text-white flex items-center justify-center mb-4">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  Resume checker (Score ATS)
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Obtenez un retour clair et concret sur votre score de compatibilité ATS et les mots-clés manquants.
                </p>
              </div>
              <button
                onClick={onOpenAtsChecker}
                className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
              >
                <span>Tester mon score CV</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Avis Utilisateurs (Trustpilot Reviews - PDF Page 3) in Champagne & Flashy White */}
      <section id="avis" className="py-20 bg-[#f5ede1] bg-office-grid-champagne border-t border-amber-200/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <div className="inline-flex items-center gap-1 text-amber-900 bg-amber-100/90 border border-amber-300/60 px-3 py-1 rounded-full font-bold text-xs mb-2 shadow-2xs">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
              <span>4.9 / 5 sur plus de 14 000 avis certifiés</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Ce que disent nos candidats
            </h2>
            <p className="mt-1 text-sm text-slate-700 font-medium">
              Des milliers de professionnels ont décroché leur nouvel emploi grâce à CVGratuit.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t) => (
              <div key={t.id} className="bg-white p-6 rounded-2xl border-2 border-white ring-1 ring-amber-300/40 shadow-lg hover:shadow-xl flex flex-col justify-between">
                <div>
                  <div className="flex gap-0.5 text-emerald-500 mb-3">
                    {[...Array(t.rating)].map((_, i) => (
                      <span key={i} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-xs text-slate-700 italic leading-relaxed mb-4">
                    "{t.text}"
                  </p>
                </div>
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-slate-900 block">{t.name}</span>
                    <span className="text-[11px] text-slate-500">{t.role} ({t.city})</span>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-semibold">
                    Embauché chez {t.companyHired}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <button
              onClick={onOpenComments}
              className="px-6 py-3.5 bg-white border-2 border-blue-600 hover:bg-blue-600 text-blue-700 hover:text-white font-bold text-xs sm:text-sm rounded-xl shadow-xs transition inline-flex items-center gap-2 cursor-pointer"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Consulter tous les avis et laisser un commentaire</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* 10. E-E-A-T Guide : Conseils d'Experts RH pour le marché français */}
      <section id="guide-eeat" className="py-20 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="border-l-4 border-blue-600 pl-4 mb-8">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Guide Recrutement 2026 – E-E-A-T & Autorité RH
            </span>
            <h2 className="text-2xl font-bold text-slate-900 mt-1">
              Comment réussir son CV en France : Les normes des recruteurs
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Rédigé et validé par notre comité de consultants en ressources humaines certifiés (APEC, France Travail).
            </p>
          </div>

          <div className="space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">1. La structure universelle du CV en France</h3>
              <p>
                Un CV français efficace se décompose impérativement en 5 blocs stratégiques :
                l'en-tête de contact (sans mention inutile d'état civil non professionnel), le titre précis du poste recherché, le résumé d'accroche (3 lignes percutantes), les expériences professionnelles (avec réalisations chiffrées), les formations et diplômes, et les compétences clés.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">2. Faut-il mettre une photo en France ?</h3>
              <p>
                La législation française (Code du travail) interdit toute discrimination à l'embauche basée sur l'apparence physique. La photo n'est donc en aucun cas obligatoire. Cependant, dans les métiers de la vente, du luxe, de l'hôtellerie ou de la représentation commerciale, une photo professionnelle et sobre est couramment appréciée. Notre créateur vous permet d'activer ou masquer la photo en un clic.
              </p>
            </div>

            <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-sm">3. Comment passer le filtre des logiciels ATS ?</h3>
              <p>
                En 2026, plus de 80% des grandes entreprises filtrent les candidatures avec des systèmes ATS (Applicant Tracking Systems). Pour garantir un score de 95%+, évitez les images contenant du texte, privilégiez des intitulés de postes standards, mentionnez vos outils techniques clés et téléchargez impérativement votre CV au format PDF standard A4.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. FAQ Accordions (PDF Page 4) */}
      <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              Questions Fréquentes (FAQ)
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-slate-600">
              Tout ce que vous devez savoir sur la création de votre CV gratuit.
            </p>
          </div>

          <div className="space-y-3">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = activeFaq === idx;

              return (
                <div
                  key={idx}
                  className="bg-white border border-slate-200 rounded-xl overflow-hidden transition"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-4 text-left font-bold text-xs sm:text-sm text-slate-900 flex justify-between items-center gap-4 hover:bg-slate-50 cursor-pointer"
                  >
                    <span>{item.question}</span>
                    <ChevronDown className={`w-4 h-4 shrink-0 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-4 pt-1 text-xs text-slate-600 leading-relaxed border-t border-slate-100">
                      {item.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 12. Bottom CTA Banner (PDF Page 4) */}
      <section className="py-16 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 space-y-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold">
            Démarquez-vous avec un modèle de CV élégant et décrochez le job de vos rêves.
          </h2>
          <p className="text-sm text-blue-100 max-w-xl mx-auto">
            Rejoignez plus d'un million de candidats qui ont transformé leur carrière grâce à notre outil 100% gratuit.
          </p>
          <div className="pt-2">
            <button
              onClick={onStartCreating}
              className="px-8 py-3.5 bg-white text-blue-600 hover:bg-blue-50 font-extrabold text-sm rounded-xl shadow-xl transition cursor-pointer"
            >
              Créer mon CV gratuit en 2 minutes
            </button>
          </div>
        </div>
      </section>

      {/* 13. Footer (PDF Page 4) */}
      <footer className="bg-slate-950 text-slate-400 py-12 text-xs border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Col 1 */}
            <div className="space-y-3">
              <span className="text-base font-extrabold text-white">
                CV<span className="text-blue-500">Gratuit</span>
              </span>
              <p className="text-[11px] leading-relaxed text-slate-400">
                La plateforme de référence en France pour concevoir gratuitement son Curriculum Vitae et sa lettre de motivation au format PDF conforme aux normes ATS.
              </p>
              <p className="text-[10px] text-slate-500">
                * Les noms et logos de sociétés mentionnés sont des marques déposées appartenant à leurs détenteurs respectifs. Sauf indication contraire, ces références ne visent en aucun cas à suggérer une affiliation ou une association avec CVGratuit.
              </p>
            </div>

            {/* Col 2 */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
                Toutes les fonctionnalités
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li><button onClick={onStartCreating} className="hover:text-white transition">Créateur de CV</button></li>
                <li><button onClick={onOpenLetter} className="hover:text-white transition">Créateur de lettre de motivation</button></li>
                <li><button onClick={onOpenAtsChecker} className="hover:text-white transition">Vérificateur de score ATS</button></li>
                <li><button onClick={onOpenComments} className="hover:text-white transition">Avis & Commentaires utilisateurs</button></li>
                <li><a href="#metiers" className="hover:text-white transition">Exemples de CV par métier</a></li>
                <li><a href="#modeles" className="hover:text-white transition">Modèles de CV professionnels</a></li>
              </ul>
            </div>

            {/* Col 3 */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
                Conseils & Guides RH
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li><a href="#guide-eeat" className="hover:text-white transition">Guide du CV en France 2026</a></li>
                <li><a href="#faq" className="hover:text-white transition">Faut-il mettre une photo ?</a></li>
                <li><a href="#faq" className="hover:text-white transition">Comment passer les robots ATS</a></li>
                <li><a href="#etapes" className="hover:text-white transition">Longueur idéale du CV (1 page)</a></li>
              </ul>
            </div>

            {/* Col 4 */}
            <div>
              <h4 className="font-bold text-white text-xs uppercase tracking-wider mb-3">
                Informations & Légal
              </h4>
              <ul className="space-y-2 text-[11px]">
                <li><span>Données stockées localement (RGPD)</span></li>
                <li><span>Sans filigrane publicitaire</span></li>
                <li><span>Sans abonnement ni carte bancaire</span></li>
                <li><span>Hébergé en Europe & Netlify ready</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500">
            <p>© 2026 CVGratuit.fr – Tous droits réservés.</p>
            <div className="flex gap-4">
              <span>Mentions légales</span>
              <span>Politique de confidentialité</span>
              <span>Conditions d'utilisation</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
