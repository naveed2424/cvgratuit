import React, { useState, useEffect } from 'react';
import { TestimonialItem, TESTIMONIALS } from '../data/seoData';
import { 
  Star, MessageSquare, Plus, CheckCircle2, Building2, User, 
  Briefcase, MapPin, ArrowLeft, Filter, Sparkles, ThumbsUp 
} from 'lucide-react';

interface Props {
  onBackToHome: () => void;
  onStartCreating: () => void;
}

const STORAGE_COMMENTS_KEY = 'cvgratuit_user_reviews_v1';

export const CommentsPage: React.FC<Props> = ({ onBackToHome, onStartCreating }) => {
  const [reviews, setReviews] = useState<TestimonialItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_COMMENTS_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return TESTIMONIALS;
  });

  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  // Form fields
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [companyHired, setCompanyHired] = useState('');
  const [city, setCity] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [text, setText] = useState('');

  // Persist reviews to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_COMMENTS_KEY, JSON.stringify(reviews));
    } catch {}
  }, [reviews]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newReview: TestimonialItem = {
      id: `review-${Date.now()}`,
      name: name.trim(),
      role: role.trim() || 'Candidat qualifié',
      companyHired: companyHired.trim() || 'Entreprise partenaire',
      city: city.trim() || 'France',
      rating,
      text: text.trim(),
      date: 'À l\'instant',
    };

    setReviews([newReview, ...reviews]);
    setSubmittedSuccess(true);
    setName('');
    setRole('');
    setCompanyHired('');
    setCity('');
    setText('');
    setRating(5);
    setShowForm(false);

    setTimeout(() => {
      setSubmittedSuccess(false);
    }, 5000);
  };

  const filteredReviews = filterRating 
    ? reviews.filter(r => r.rating === filterRating)
    : reviews;

  const averageRating = (
    reviews.reduce((acc, curr) => acc + curr.rating, 0) / (reviews.length || 1)
  ).toFixed(1);

  return (
    <div className="min-h-screen bg-[#f7f1e5] bg-office-dots-champagne text-slate-900 font-sans flex flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToHome}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-slate-600 hover:text-slate-900 px-3 py-1.5 rounded-lg hover:bg-slate-100 transition cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Retour à l'accueil</span>
            </button>
            <div className="h-4 w-px bg-slate-200 hidden sm:block"></div>
            <div className="items-center gap-2 hidden sm:flex">
              <span className="text-base font-bold text-slate-900">
                CV<span className="text-blue-600">Gratuit</span>
              </span>
              <span className="text-xs text-slate-400 font-medium">| Témoignages & Avis Candidats</span>
            </div>
          </div>

          <button
            onClick={onStartCreating}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-bold rounded-xl shadow-sm transition cursor-pointer"
          >
            Créer mon CV gratuit
          </button>
        </div>
      </header>

      {/* Hero Banner with Visible Office & Corporate Architecture Background */}
      <div className="relative overflow-hidden bg-slate-900 text-white py-14 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        {/* High-visibility Office & Building Workspace Backdrop */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <img
            src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=1920&auto=format&fit=crop&q=80"
            alt="Bureau moderne et open space"
            className="w-full h-full object-cover object-center opacity-25 mix-blend-screen filter brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60"></div>
          <div className="absolute inset-0 bg-office-grid opacity-30"></div>
        </div>

        <div className="relative max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 border border-blue-400/30 text-blue-300 text-xs font-semibold backdrop-blur-xs">
            <MessageSquare className="w-3.5 h-3.5 text-blue-400" />
            <span>Avis vérifiés de candidats & recruteurs</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight">
            Expériences & Avis des utilisateurs
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Découvrez comment des milliers de candidats ont décroché leur nouvel emploi en France grâce à nos modèles de CV gratuits et optimisés pour les ATS.
          </p>

          {/* Stats bar */}
          <div className="pt-4 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400" />
                ))}
              </div>
              <span className="font-extrabold text-white text-base">{averageRating} / 5</span>
              <span className="text-slate-400">({reviews.length} avis certifiés)</span>
            </div>

            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <CheckCircle2 className="w-4 h-4" />
              <span>98% de taux de recommandation</span>
            </div>

            <div className="flex items-center gap-2 text-blue-300 font-semibold">
              <Building2 className="w-4 h-4" />
              <span>Embauches chez Carrefour, Tesla, SNCF...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-1 w-full space-y-8">
        {/* Success alert */}
        {submittedSuccess && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="text-xs sm:text-sm font-bold">Merci pour votre retour d'expérience !</p>
                <p className="text-xs text-emerald-700">Votre avis a été publié avec succès et est visible ci-dessous.</p>
              </div>
            </div>
          </div>
        )}

        {/* Action bar : Filter + Leave review CTA */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Filters */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <Filter className="w-3.5 h-3.5" />
              <span>Filtrer :</span>
            </span>
            <button
              onClick={() => setFilterRating(null)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 ${
                filterRating === null 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Tous les avis ({reviews.length})
            </button>
            <button
              onClick={() => setFilterRating(5)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 flex items-center gap-1 ${
                filterRating === 5 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>5 étoiles</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
            <button
              onClick={() => setFilterRating(4)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition shrink-0 flex items-center gap-1 ${
                filterRating === 4 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>4 étoiles</span>
              <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
            </button>
          </div>

          {/* CTA to open review form */}
          <button
            onClick={() => setShowForm(!showForm)}
            className="w-full sm:w-auto px-4 py-2 bg-slate-900 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>{showForm ? 'Masquer le formulaire' : 'Laisser un commentaire'}</span>
          </button>
        </div>

        {/* Review Form Card (Accordion or Toggle) */}
        {showForm && (
          <div className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-blue-500 shadow-xl animate-in fade-in zoom-in-95 duration-150">
            <div className="mb-6">
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold mb-1">
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Votre témoignage compte</span>
              </div>
              <h2 className="text-lg font-bold text-slate-900">
                Partagez votre expérience sur CVGratuit
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Aidez les futurs candidats à trouver leur voie et donnez votre avis sur l'éditeur, les modèles et l'export PDF.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Rating Star selector */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Votre note globale *
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(null)}
                      className="p-1 focus:outline-none transition transform hover:scale-110"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          (hoverRating !== null ? star <= hoverRating : star <= rating)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 ml-2">
                    {rating} / 5 étoiles
                  </span>
                </div>
              </div>

              {/* Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Votre nom ou prénom *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ex : Maxime L."
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-400" />
                    <span>Votre métier ou profil *</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="Ex : Commercial B2B, Développeur Web..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Company & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>Entreprise ciblée ou décrochée</span>
                  </label>
                  <input
                    type="text"
                    value={companyHired}
                    onChange={(e) => setCompanyHired(e.target.value)}
                    placeholder="Ex : BNP Paribas, Decathlon, PME..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    <span>Ville</span>
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Ex : Lyon, Bordeaux, Paris..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Votre avis détaillé *
                </label>
                <textarea
                  required
                  rows={4}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Racontez votre expérience : rapidité de prise en main, clarté du PDF, nombre d'entretiens décrochés..."
                  className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none leading-relaxed"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 text-xs font-semibold rounded-lg hover:bg-slate-50 transition"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-lg shadow-sm transition"
                >
                  Publier mon avis
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredReviews.map((item) => (
            <div
              key={item.id}
              className="bg-white p-6 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                {/* Rating stars & verified badge */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex text-amber-400 gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    <span>Avis vérifié</span>
                  </span>
                </div>

                {/* Comment text */}
                <p className="text-xs text-slate-700 leading-relaxed italic mb-4">
                  "{item.text}"
                </p>
              </div>

              {/* Author info */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <h4 className="font-bold text-slate-900">{item.name}</h4>
                  <p className="text-[11px] text-slate-500">{item.role} ({item.city})</p>
                  {item.companyHired && (
                    <p className="text-[10px] text-blue-600 font-medium mt-0.5 flex items-center gap-1">
                      <Building2 className="w-3 h-3" />
                      <span>{item.companyHired}</span>
                    </p>
                  )}
                </div>
                <span className="text-[10px] text-slate-400 self-end">{item.date}</span>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-950 text-slate-400 py-8 text-xs border-t border-slate-800 text-center">
        <p>© 2026 CVGratuit.fr – La plateforme française de CV & lettres de motivation 100% gratuits.</p>
      </footer>
    </div>
  );
};
