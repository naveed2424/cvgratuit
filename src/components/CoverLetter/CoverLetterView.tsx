import React, { useState } from 'react';
import { ResumeData, CoverLetterData } from '../../types/resume';
import { Mail, Phone, MapPin, Sparkles, Download, RotateCcw, Copy, Check, FileText, Loader2 } from 'lucide-react';

interface Props {
  resumeData: ResumeData;
  onUpdateCoverLetter: (letter: CoverLetterData) => void;
  onGenerateAiCoverLetter?: (jobTitle: string) => Promise<string | void>;
}

export const CoverLetterView: React.FC<Props> = ({
  resumeData,
  onUpdateCoverLetter,
  onGenerateAiCoverLetter,
}) => {
  const { personalInfo, style, coverLetter } = resumeData;
  const [copied, setCopied] = useState(false);
  const [loadingAi, setLoadingAi] = useState(false);

  const primaryColor = style.primaryColor || '#2563eb';

  const handleChange = (field: keyof CoverLetterData, value: string) => {
    onUpdateCoverLetter({ ...coverLetter, [field]: value });
  };

  const handleApplyPreset = (presetType: 'reponse' | 'spontanee' | 'reconversion' | 'stage') => {
    const job = personalInfo.title || 'le poste proposé';
    if (presetType === 'reponse') {
      handleChange('subject', `Candidature pour le poste de ${job}`);
      handleChange('intro', `Vivement intéressé(e) par l'opportunité de rejoindre votre entreprise au poste de ${job}, je vous soumets avec enthousiasme mon dossier de candidature.`);
      handleChange('bodyParagraph1', `Fort(e) de mes précédentes expériences réussies, j'ai développé une solide expertise dans ce domaine et une rigueur quotidienne pour dépasser les objectifs fixés. Mes réalisations m'ont permis d'acquérir une véritable aisance technique et un sens aigu de la relation client.`);
      handleChange('bodyParagraph2', `Votre entreprise bénéficie d'une renommée remarquable pour ses standards de qualité et son dynamisme. Je suis convaincu(e) que mes compétences et mon sens du collectif s'intégreront harmonieusement au sein de vos équipes pour contribuer activement à vos succès futurs.`);
      handleChange('conclusion', `Dans l'attente de pouvoir vous exposer plus en détail mes motivations lors d'un prochain entretien, je vous remercie pour l'attention portée à ma démarche.`);
    } else if (presetType === 'spontanee') {
      handleChange('subject', `Candidature spontanée – ${job}`);
      handleChange('intro', `Suivant avec un vif intérêt le développement et les projets récents de votre structure, je prends l'initiative de vous proposer ma collaboration en tant que ${job}.`);
      handleChange('bodyParagraph1', `Mon parcours m'a permis de développer une polyvalence opérationnelle et une réactivité indispensable pour mener à bien des missions variées, du suivi rigoureux des dossiers à la gestion des imprévus.`);
      handleChange('bodyParagraph2', `Rejoindre vos équipes me permettrait d'apporter mon dynamisme et mon expertise opérationnelle à vos nouveaux défis de croissance.`);
      handleChange('conclusion', `Je me tiens à votre entière disposition pour échanger lors d'une rencontre sur les opportunités de collaboration qui pourraient se présenter.`);
    } else if (presetType === 'stage') {
      handleChange('subject', `Candidature – Stage conventionné ${job}`);
      handleChange('intro', `Actuellement en formation et désireux(se) de mettre en pratique mes acquis théoriques, je sollicite un stage au sein de votre entreprise pour une durée de 6 mois.`);
      handleChange('bodyParagraph1', `Curieux(se), méthodique et motivé(e), j'ai déjà mené avec succès plusieurs projets académiques et associatifs nécessitant autonomie, esprit d'analyse et sens des responsabilités.`);
      handleChange('bodyParagraph2', `Intégrer vos équipes représente pour moi une formidable occasion d'apprendre aux côtés de professionnels reconnus tout en vous apportant une contribution concrète et appliquée.`);
      handleChange('conclusion', `Je reste à votre entière disposition pour tout renseignement complémentaire ou pour fixer la date d'un entretien.`);
    }
  };

  const handleAiClick = async () => {
    if (!onGenerateAiCoverLetter) return;
    setLoadingAi(true);
    try {
      const generated = await onGenerateAiCoverLetter(personalInfo.title);
      if (generated) {
        handleChange('bodyParagraph1', generated);
      }
    } finally {
      setLoadingAi(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    const text = `
${personalInfo.firstName} ${personalInfo.lastName}
${personalInfo.email} | ${personalInfo.phone}
${personalInfo.city}

À l'attention de : ${coverLetter.recipientName || 'Responsable du Recrutement'}
${coverLetter.recipientCompany}
${coverLetter.recipientAddress}

Date : ${coverLetter.date}
Objet : ${coverLetter.subject}

${coverLetter.salutation},

${coverLetter.intro}

${coverLetter.bodyParagraph1}

${coverLetter.bodyParagraph2}

${coverLetter.conclusion}

${coverLetter.signoff},

${personalInfo.firstName} ${personalInfo.lastName}
    `.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-4 md:p-6 max-w-7xl mx-auto">
      {/* Formulaire Lettre (5 colonnes) */}
      <div className="no-print lg:col-span-5 space-y-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-xs h-fit">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[11px] font-bold mb-1">
            <FileText className="w-3.5 h-3.5 text-blue-600" />
            <span>Lettre de motivation assortie</span>
          </div>
          <h2 className="text-base font-bold text-slate-900">
            Rédigez votre lettre avec la même charte graphique
          </h2>
          <p className="text-xs text-slate-500">
            Personnalisez les coordonnées du destinataire et adaptez le corps du texte.
          </p>
        </div>

        {/* Modèles d'inspiration rapide */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1.5">
            Charger un modèle type :
          </label>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleApplyPreset('reponse')}
              className="p-2 border border-slate-200 hover:border-blue-400 rounded-lg text-slate-700 hover:bg-blue-50 text-left transition font-medium"
            >
              📄 Réponse à une annonce
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('spontanee')}
              className="p-2 border border-slate-200 hover:border-blue-400 rounded-lg text-slate-700 hover:bg-blue-50 text-left transition font-medium"
            >
              ✉️ Candidature spontanée
            </button>
            <button
              type="button"
              onClick={() => handleApplyPreset('stage')}
              className="p-2 border border-slate-200 hover:border-blue-400 rounded-lg text-slate-700 hover:bg-blue-50 text-left transition font-medium"
            >
              🎓 Stage / Alternance
            </button>
            <button
              type="button"
              onClick={handleAiClick}
              disabled={loadingAi}
              className="p-2 border border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg text-left transition font-semibold flex items-center gap-1"
            >
              {loadingAi ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
              <span>Rédiger avec l'IA</span>
            </button>
          </div>
        </div>

        {/* Destinataire */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <h3 className="text-xs font-bold text-slate-800">Coordonnées de l'entreprise</h3>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Entreprise ciblée</label>
            <input
              type="text"
              value={coverLetter.recipientCompany}
              onChange={(e) => handleChange('recipientCompany', e.target.value)}
              placeholder="Ex : Groupe Carrefour, Direction des Ressources Humaines"
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Destinataire (Nom / Titre)</label>
              <input
                type="text"
                value={coverLetter.recipientName}
                onChange={(e) => handleChange('recipientName', e.target.value)}
                placeholder="Ex : Madame la Directrice RH"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-600 mb-1">Date</label>
              <input
                type="text"
                value={coverLetter.date}
                onChange={(e) => handleChange('date', e.target.value)}
                placeholder="22 Octobre 2026"
                className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Objet de la lettre</label>
            <input
              type="text"
              value={coverLetter.subject}
              onChange={(e) => handleChange('subject', e.target.value)}
              placeholder="Candidature au poste de..."
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 font-semibold"
            />
          </div>
        </div>

        {/* Paragraphes */}
        <div className="space-y-3 pt-3 border-t border-slate-100">
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Introduction & Démarche</label>
            <textarea
              rows={3}
              value={coverLetter.intro}
              onChange={(e) => handleChange('intro', e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Vos compétences & Réalisations clés (Vous)</label>
            <textarea
              rows={4}
              value={coverLetter.bodyParagraph1}
              onChange={(e) => handleChange('bodyParagraph1', e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">L'adéquation avec l'entreprise (Nous)</label>
            <textarea
              rows={3}
              value={coverLetter.bodyParagraph2}
              onChange={(e) => handleChange('bodyParagraph2', e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">Demande d'entretien & Remerciements</label>
            <textarea
              rows={2}
              value={coverLetter.conclusion}
              onChange={(e) => handleChange('conclusion', e.target.value)}
              className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 leading-relaxed"
            />
          </div>
        </div>
      </div>

      {/* Aperçu Feuille A4 Lettre de Motivation (7 colonnes) */}
      <div className="lg:col-span-7 flex flex-col items-center">
        {/* Actions bar */}
        <div className="no-print w-full flex items-center justify-between pb-3">
          <span className="text-xs font-medium text-slate-500">
            Aperçu impression format A4
          </span>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-medium transition cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copié' : 'Copier'}</span>
            </button>
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-sm transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Télécharger la lettre en PDF</span>
            </button>
          </div>
        </div>

        {/* Sheet */}
        <div className="a4-sheet bg-white p-12 shadow-xl print:shadow-none print:w-full flex flex-col justify-between text-slate-800 text-xs leading-relaxed border-t-8" style={{ borderColor: primaryColor }}>
          <div>
            {/* Header Expéditeur & Destinataire */}
            <div className="flex justify-between items-start mb-8 pb-4 border-b border-slate-200">
              <div>
                <h1 className="text-xl font-bold uppercase tracking-tight text-slate-900" style={{ color: primaryColor }}>
                  {personalInfo.firstName} {personalInfo.lastName}
                </h1>
                <p className="font-semibold text-slate-700 mt-0.5">{personalInfo.title}</p>
                <div className="text-[11px] text-slate-500 space-y-0.5 mt-2">
                  {personalInfo.email && <p>{personalInfo.email}</p>}
                  {personalInfo.phone && <p>{personalInfo.phone}</p>}
                  {personalInfo.city && <p>{personalInfo.postalCode} {personalInfo.city}</p>}
                </div>
              </div>

              <div className="text-right max-w-[45%] text-[11px] text-slate-700">
                <p className="font-bold text-slate-900 text-xs">{coverLetter.recipientCompany || 'Entreprise'}</p>
                {coverLetter.recipientName && <p>{coverLetter.recipientName}</p>}
                {coverLetter.recipientAddress && <p>{coverLetter.recipientAddress}</p>}
                <p className="mt-3 text-slate-500 italic">
                  Fait à {personalInfo.city || 'Paris'}, le {coverLetter.date || '22 Octobre 2026'}
                </p>
              </div>
            </div>

            {/* Objet */}
            <div className="mb-6">
              <p className="font-bold text-slate-900 text-xs">
                <span className="uppercase text-slate-500 font-normal mr-2">Objet :</span>
                {coverLetter.subject}
              </p>
            </div>

            {/* Corps de la lettre */}
            <div className="space-y-4 text-justify leading-relaxed text-slate-800">
              <p>{coverLetter.salutation},</p>
              <p>{coverLetter.intro}</p>
              <p>{coverLetter.bodyParagraph1}</p>
              <p>{coverLetter.bodyParagraph2}</p>
              <p>{coverLetter.conclusion}</p>
              <p className="pt-2">{coverLetter.signoff},</p>
            </div>
          </div>

          {/* Signature */}
          <div className="mt-8 text-right pr-4">
            <p className="font-bold text-slate-900 text-xs">
              {personalInfo.firstName} {personalInfo.lastName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
