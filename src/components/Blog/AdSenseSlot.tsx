import React from 'react';

interface AdSenseSlotProps {
  slotType: 'leaderboard' | 'in-article' | 'sidebar' | 'in-feed';
  className?: string;
  adClient?: string; // e.g. "ca-pub-XXXXXXXXXXXXXXXX"
  adSlotId?: string; // e.g. "1234567890"
}

export const AdSenseSlot: React.FC<AdSenseSlotProps> = ({
  slotType,
  className = '',
  adClient = 'ca-pub-demo-adsense',
  adSlotId = '1234567890',
}) => {
  if (slotType === 'leaderboard') {
    return (
      <div className={`w-full max-w-5xl mx-auto my-6 px-4 ${className}`}>
        <div className="flex flex-col items-center">
          <div className="w-full flex items-center justify-between pb-1 text-[10px] uppercase font-bold tracking-wider text-slate-400">
            <span>Publicité</span>
            <span className="hover:underline cursor-pointer text-slate-400">Annonce Google AdSense</span>
          </div>
          <div className="w-full min-h-[90px] sm:min-h-[100px] bg-slate-50 border border-dashed border-slate-300 rounded-xl flex flex-col items-center justify-center p-3 text-center transition hover:border-slate-400">
            <span className="text-xs font-semibold text-slate-600">
              Espace Publicitaire Optimisé AdSense (Leaderboard 728x90 / Responsive)
            </span>
            <span className="text-[11px] text-slate-400 mt-1">
              Conforme aux exigences d'intégration du programme Google AdSense • Format adapté aux appareils mobiles et ordinateurs
            </span>
            {/* Real ins tag ready for active publisher ID */}
            <ins
              className="adsbygoogle"
              style={{ display: 'block', width: '100%' }}
              data-ad-client={adClient}
              data-ad-slot={adSlotId}
              data-ad-format="auto"
              data-full-width-responsive="true"
            />
          </div>
        </div>
      </div>
    );
  }

  if (slotType === 'in-article') {
    return (
      <div className={`my-8 p-4 bg-slate-50/80 border border-slate-200/90 rounded-2xl ${className}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] uppercase font-extrabold tracking-wider text-slate-400">
            Annonce Sponsorisée
          </span>
          <span className="text-[10px] text-slate-400">Partenaire certifié</span>
        </div>
        <div className="min-h-[120px] bg-white border border-dashed border-slate-200 rounded-xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <span className="inline-block px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-bold">
              Sélection Emploi & Carrière
            </span>
            <h4 className="text-sm font-bold text-slate-800">
              Préparez vos candidatures avec les meilleurs outils du marché
            </h4>
            <p className="text-xs text-slate-500">
              Emplacements natifs in-article garantissant une lecture fluide sans interruption intrusive.
            </p>
          </div>
          <div className="shrink-0">
            <span className="px-3.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition border border-slate-300">
              En savoir plus
            </span>
          </div>
        </div>
        <ins
          className="adsbygoogle"
          style={{ display: 'block', textAlign: 'center' }}
          data-ad-layout="in-article"
          data-ad-format="fluid"
          data-ad-client={adClient}
          data-ad-slot={adSlotId}
        />
      </div>
    );
  }

  if (slotType === 'sidebar') {
    return (
      <div className={`w-full ${className}`}>
        <div className="flex items-center justify-between pb-1.5 text-[10px] uppercase font-bold tracking-wider text-slate-400">
          <span>Publicité</span>
          <span className="text-[10px] text-slate-400">Annonce</span>
        </div>
        <div className="w-full min-h-[250px] bg-slate-50 border border-dashed border-slate-300 rounded-2xl p-4 flex flex-col items-center justify-center text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
            AD
          </div>
          <div>
            <span className="text-xs font-bold text-slate-800 block">
              Emplacement AdSense Sidebar
            </span>
            <span className="text-[11px] text-slate-500 block mt-1">
              Format Pavé 300x250 ou demi-page 300x600 responsive.
            </span>
          </div>
          <span className="text-[10px] text-slate-400 px-2 py-0.5 bg-white rounded border border-slate-200">
            Google AdSense Ready
          </span>
          <ins
            className="adsbygoogle"
            style={{ display: 'block' }}
            data-ad-client={adClient}
            data-ad-slot={adSlotId}
            data-ad-format="auto"
            data-full-width-responsive="true"
          />
        </div>
      </div>
    );
  }

  // in-feed
  return (
    <div className={`w-full p-4 bg-slate-50 border border-dashed border-slate-300 rounded-2xl ${className}`}>
      <div className="flex items-center justify-between mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
        <span>Annonce sponsorisée</span>
        <span>AdSense In-Feed</span>
      </div>
      <div className="text-xs text-slate-600 font-medium">
        Recommandations professionnelles & partenaires de recrutement sélectionnés.
      </div>
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-format="fluid"
        data-ad-layout-key="-fb+5w+4e-db+86"
        data-ad-client={adClient}
        data-ad-slot={adSlotId}
      />
    </div>
  );
};
