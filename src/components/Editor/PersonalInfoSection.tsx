import React, { useState } from 'react';
import { PersonalInfo } from '../../types/resume';
import { User, Mail, Phone, MapPin, Car, Globe, Linkedin, Sparkles, Image, Eye, EyeOff, Loader2 } from 'lucide-react';

interface Props {
  info: PersonalInfo;
  onChange: (updated: PersonalInfo) => void;
  onGenerateAiSummary?: (jobTitle: string, current: string) => Promise<string | void>;
}

export const PersonalInfoSection: React.FC<Props> = ({ info, onChange, onGenerateAiSummary }) => {
  const [loadingAi, setLoadingAi] = useState(false);

  const handleChange = (field: keyof PersonalInfo, value: any) => {
    onChange({ ...info, [field]: value });
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('photoUrl', reader.result as string);
        handleChange('showPhoto', true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAiClick = async () => {
    if (!onGenerateAiSummary) return;
    setLoadingAi(true);
    try {
      const result = await onGenerateAiSummary(info.title, info.summary);
      if (result) {
        handleChange('summary', result);
      }
    } finally {
      setLoadingAi(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-base font-bold text-slate-900 flex items-center gap-2">
          <User className="w-5 h-5 text-blue-600" />
          <span>Informations personnelles & Coordonnées</span>
        </h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Renseignez vos coordonnées directes pour permettre aux recruteurs de vous contacter facilement.
        </p>
      </div>

      {/* Titre & Nom */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Prénom *</label>
          <input
            type="text"
            value={info.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            placeholder="Ex : Alexandre"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">Nom *</label>
          <input
            type="text"
            value={info.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            placeholder="Ex : Dupont"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold text-slate-700 mb-1">Titre professionnel ciblé *</label>
        <input
          type="text"
          value={info.title}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Ex : Développeur Web Full Stack, Conseiller de Vente..."
          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-900"
        />
        <p className="text-[11px] text-slate-400 mt-1">
          Conseil recruteur : Alignez ce titre exactement avec l'intitulé de l'offre d'emploi visée.
        </p>
      </div>

      {/* Contact Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Mail className="w-3.5 h-3.5 text-slate-400" />
            <span>Adresse email *</span>
          </label>
          <input
            type="email"
            value={info.email}
            onChange={(e) => handleChange('email', e.target.value)}
            placeholder="alexandre.dupont@email.com"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Phone className="w-3.5 h-3.5 text-slate-400" />
            <span>Numéro de téléphone *</span>
          </label>
          <input
            type="tel"
            value={info.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="06 12 34 56 78"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>
      </div>

      {/* Localisation & Mobilité */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Code Postal</label>
          <input
            type="text"
            value={info.postalCode}
            onChange={(e) => handleChange('postalCode', e.target.value)}
            placeholder="75001"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-slate-700 mb-1">Ville</label>
          <input
            type="text"
            value={info.city}
            onChange={(e) => handleChange('city', e.target.value)}
            placeholder="Paris"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>
        <div className="sm:col-span-1">
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Car className="w-3.5 h-3.5 text-slate-400" />
            <span>Permis & Véhicule</span>
          </label>
          <input
            type="text"
            value={info.drivingLicense}
            onChange={(e) => handleChange('drivingLicense', e.target.value)}
            placeholder="Permis B - Véhiculé"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>
      </div>

      {/* Réseaux & Liens */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Linkedin className="w-3.5 h-3.5 text-blue-600" />
            <span>Lien LinkedIn</span>
          </label>
          <input
            type="text"
            value={info.linkedin}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            placeholder="linkedin.com/in/alexandre-dupont"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1 flex items-center gap-1">
            <Globe className="w-3.5 h-3.5 text-slate-400" />
            <span>Site web ou Portfolio</span>
          </label>
          <input
            type="text"
            value={info.website}
            onChange={(e) => handleChange('website', e.target.value)}
            placeholder="monportfolio.fr ou github.com/user"
            className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
          />
        </div>
      </div>

      {/* Photo de profil (Optionnelle selon la norme française) */}
      <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image className="w-4 h-4 text-slate-600" />
            <span className="text-xs font-bold text-slate-800">Photo de profil (Norme France : optionnelle)</span>
          </div>
          <button
            type="button"
            onClick={() => handleChange('showPhoto', !info.showPhoto)}
            className={`inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium transition ${
              info.showPhoto ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-600'
            }`}
          >
            {info.showPhoto ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{info.showPhoto ? 'Visible sur le CV' : 'Masquée'}</span>
          </button>
        </div>

        {info.showPhoto && (
          <div className="flex items-center gap-4 pt-1">
            {info.photoUrl ? (
              <img
                src={info.photoUrl}
                alt="Aperçu photo"
                className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 shadow-xs"
              />
            ) : (
              <div className="w-14 h-14 rounded-full bg-slate-200 flex items-center justify-center text-slate-400 text-xs">
                Photo
              </div>
            )}
            <div className="flex-1">
              <label className="inline-block cursor-pointer px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-lg text-xs font-medium text-slate-700 shadow-2xs transition">
                Choisir une photo depuis votre appareil
                <input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  className="hidden"
                />
              </label>
              <p className="text-[10.5px] text-slate-400 mt-1">
                Format carré recommandé (JPG, PNG). Photo professionnelle sur fond sobre.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Accroche / Profil */}
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="text-xs font-semibold text-slate-700">
            Accroche / Profil professionnel
          </label>
          <button
            type="button"
            onClick={handleAiClick}
            disabled={loadingAi}
            className="inline-flex items-center gap-1.5 text-xs text-blue-600 hover:text-blue-700 font-semibold bg-blue-50 hover:bg-blue-100 px-2.5 py-1 rounded-md transition cursor-pointer"
          >
            {loadingAi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 text-blue-600" />}
            <span>{loadingAi ? 'Rédaction IA...' : 'Optimiser avec l\'IA'}</span>
          </button>
        </div>
        <textarea
          rows={4}
          value={info.summary}
          onChange={(e) => handleChange('summary', e.target.value)}
          placeholder="Ex : Conseiller de vente passionné avec 4 ans d'expérience dans le prêt-à-porter de luxe. Expert en fidélisation client et merchandising..."
          className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white leading-relaxed"
        />
        <p className="text-[11px] text-slate-400 mt-1">
          Une bonne accroche résume en 3 phrases votre valeur ajoutée, vos années d'expérience et votre objectif.
        </p>
      </div>
    </div>
  );
};
