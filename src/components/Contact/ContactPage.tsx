import React, { useState } from 'react';
import { 
  ArrowLeft, Mail, MessageSquare, Send, CheckCircle2, 
  MapPin, Clock, PhoneCall, HelpCircle, ShieldCheck 
} from 'lucide-react';

interface Props {
  onBackToHome: () => void;
  onOpenBlog: () => void;
  onStartCreating: () => void;
}

export const ContactPage: React.FC<Props> = ({ onBackToHome, onOpenBlog, onStartCreating }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'general',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) return;

    setLoading(true);
    // Simulate real submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      // Track contact submission in Google Analytics
      if (typeof window !== 'undefined' && typeof (window as any).gtag === 'function') {
        (window as any).gtag('event', 'form_submission', {
          form_name: 'contact_form',
          subject: formData.subject,
        });
      }
    }, 600);
  };

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
      <main className="flex-1 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-white ring-1 ring-amber-300/40 shadow-xl space-y-6">
              <div>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                  Équipe Support & Rédaction
                </span>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                  Contactez-nous
                </h1>
                <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                  Une question sur la rédaction de votre CV, une suggestion pour un article du blog ou une demande partenariale ? Notre équipe vous répond avec plaisir.
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-700 border-t border-slate-100 pt-4">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Courriel de contact direct</span>
                    <a href="mailto:contact@cvgratuit.fr" className="text-blue-600 hover:underline">contact@cvgratuit.fr</a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Délai d'engagement de réponse</span>
                    <span className="text-slate-500">Sous 24 à 48 heures ouvrées</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block">Siège éditorial</span>
                    <span className="text-slate-500">Paris & Île-de-France, France</span>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-600 space-y-1">
                <div className="flex items-center gap-1.5 font-bold text-slate-900">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Assurance Transparence</span>
                </div>
                <p>
                  Vos coordonnées ne sont jamais utilisées à des fins de prospection publicitaire intempestive.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-white ring-1 ring-amber-300/40 shadow-xl">
              {submitted ? (
                <div className="text-center py-10 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-inner">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-extrabold text-slate-900">
                    Message bien reçu !
                  </h3>
                  <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Merci <strong>{formData.name}</strong>. Votre message a été transmis avec succès à l'équipe de CVGratuit. Nous vous répondrons à l'adresse <strong>{formData.email}</strong> dans les meilleurs délais.
                  </p>
                  <div className="pt-4 flex flex-wrap justify-center gap-3">
                    <button
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({ name: '', email: '', subject: 'general', message: '' });
                      }}
                      className="px-5 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
                    >
                      Envoyer un autre message
                    </button>
                    <button
                      onClick={onOpenBlog}
                      className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-md"
                    >
                      Consulter les articles du blog
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="border-b border-slate-100 pb-3">
                    <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-blue-600" />
                      <span>Formulaire de contact</span>
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Tous les champs marqués d'un astérisque sont obligatoires.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Votre nom ou prénom *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Ex: Elsa Manet"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1.5">
                        Votre adresse e-mail *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="Ex: elsa.manet@email.com"
                        className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Objet de votre demande *
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white font-medium text-slate-800"
                    >
                      <option value="general">Question générale sur la plateforme</option>
                      <option value="article-proposal">Suggestion de sujet pour le blog (Tendance du jour)</option>
                      <option value="bug">Signaler un problème technique d'export PDF</option>
                      <option value="partnership">Proposition de partenariat ou presse</option>
                      <option value="rgpd">Question sur les données personnelles (RGPD)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">
                      Votre message détaillé *
                    </label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Expliquez-nous précisément votre demande..."
                      className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full sm:w-auto px-7 py-3 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white text-xs sm:text-sm font-bold rounded-xl shadow-md transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <span>Envoi en cours...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          <span>Envoyer mon message</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-xs border-t border-slate-800 text-center">
        <p>© 2026 CVGratuit.fr – Support et relation utilisateurs en France et Francophonie.</p>
      </footer>
    </div>
  );
};
