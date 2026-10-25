import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const WORK_DIR = '/tmp/ugc_build';
const OUT_DIR = '/app/applet/public/downloads';

if (!fs.existsSync(WORK_DIR)) fs.mkdirSync(WORK_DIR, { recursive: true });
if (!fs.existsSync(OUT_DIR)) fs.mkdirSync(OUT_DIR, { recursive: true });

console.log('=== STEP 1: Creating 10 High-Definition 1080x1920 UGC Scenes ===');

// Helper for SVG base styling
function getSvgWrapper(content) {
  return `<svg width="1080" height="1920" viewBox="0 0 1080 1920" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#070b14"/>
      <stop offset="40%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="gold" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="50%" stop-color="#fbbf24"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
    <linearGradient id="blueGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#2563eb"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
    <linearGradient id="greenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
    <linearGradient id="cardGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="100%" stop-color="#0f172a"/>
    </linearGradient>
    <filter id="shadow" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="12" stdDeviation="16" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>
  <rect width="1080" height="1920" fill="url(#bg)"/>
  
  <!-- Subtle ambient glow spheres -->
  <circle cx="200" cy="300" r="350" fill="#2563eb" opacity="0.08"/>
  <circle cx="880" cy="1400" r="400" fill="#f59e0b" opacity="0.05"/>
  <circle cx="540" cy="960" r="500" fill="#10b981" opacity="0.04"/>

  ${content}
</svg>`;
}

const scenes = [
  // Scene 1: The Hook
  {
    num: "01 / 10",
    tag: "ENQUETE EMPLOI • PIEGE FREQUENT",
    content: `
      <!-- Top Brand Pill -->
      <rect x="240" y="140" width="600" height="56" rx="28" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <text x="540" y="177" fill="#94a3b8" font-family="Liberation Sans" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">01 / 10 • ENQUETE CANDIDATS</text>

      <!-- Hook Headline -->
      <text x="540" y="340" fill="#94a3b8" font-family="Liberation Sans" font-size="32" font-weight="bold" text-anchor="middle" letter-spacing="1">TU PASSES 45 MINUTES A CREER TON CV...</text>
      <text x="540" y="440" fill="#ffffff" font-family="Liberation Sans" font-size="58" font-weight="bold" text-anchor="middle">Et au moment de telecharger ?</text>
      
      <!-- Trap Card -->
      <g filter="url(#shadow)">
        <rect x="100" y="540" width="880" height="560" rx="32" fill="url(#cardGrad)" stroke="#ef4444" stroke-width="3"/>
        
        <!-- Warning Badge -->
        <rect x="360" y="600" width="360" height="52" rx="26" fill="#7f1d1d" stroke="#dc2626" stroke-width="2"/>
        <text x="540" y="635" fill="#fca5a5" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">LE PIEGE DES FAUX SITES</text>

        <!-- Strikethrough Price -->
        <text x="540" y="770" fill="#ef4444" font-family="Liberation Sans" font-size="76" font-weight="bold" text-anchor="middle">29,90 € / mois</text>
        <line x1="260" y1="745" x2="820" y2="745" stroke="#ffffff" stroke-width="6"/>

        <text x="540" y="850" fill="#f87171" font-family="Liberation Sans" font-size="30" font-weight="bold" text-anchor="middle">Abonnement cache obligatoire</text>

        <!-- Red Warning Items -->
        <g transform="translate(180, 930)">
          <circle cx="20" cy="10" r="14" fill="#ef4444"/>
          <text x="20" y="16" fill="#ffffff" font-family="Liberation Sans" font-size="18" font-weight="bold" text-anchor="middle">X</text>
          <text x="50" y="17" fill="#e2e8f0" font-family="Liberation Sans" font-size="24">Carte bancaire exigee en fin de parcours</text>
        </g>
        <g transform="translate(180, 990)">
          <circle cx="20" cy="10" r="14" fill="#ef4444"/>
          <text x="20" y="16" fill="#ffffff" font-family="Liberation Sans" font-size="18" font-weight="bold" text-anchor="middle">X</text>
          <text x="50" y="17" fill="#e2e8f0" font-family="Liberation Sans" font-size="24">Filigrane geant si vous refusez de payer</text>
        </g>
      </g>

      <!-- Callout Bubble -->
      <g filter="url(#shadow)">
        <rect x="140" y="1220" width="800" height="260" rx="28" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
        <text x="540" y="1300" fill="#60a5fa" font-family="Liberation Sans" font-size="34" font-weight="bold" text-anchor="middle">NE VOUS FAITES PLUS PIEGER</text>
        <text x="540" y="1360" fill="#ffffff" font-family="Liberation Sans" font-size="28" text-anchor="middle">Postuler a un emploi ne devrait jamais couter 30 €.</text>
        <text x="540" y="1415" fill="#94a3b8" font-family="Liberation Sans" font-size="24" text-anchor="middle">Il existe desormais une solution honnete et gratuite.</text>
      </g>

      <!-- UGC Voiceover Subtitle Bar -->
      <rect x="80" y="1660" width="920" height="150" rx="26" fill="#0b1120" stroke="#38bdf8" stroke-width="2"/>
      <text x="540" y="1725" fill="#ffffff" font-family="Liberation Sans" font-size="30" font-weight="bold" text-anchor="middle">« Tu passes 45 minutes a faire ton CV, et a la fin on te demande 29 € ? »</text>
      <text x="540" y="1775" fill="#38bdf8" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">UGC CVGratuit • Partage d'experience candidat</text>
    `
  },

  // Scene 2: The Solution: CVGratuit.fr
  {
    num: "02 / 10",
    tag: "LA SOLUTION REVOLUTIONNAIRE",
    content: `
      <!-- Top Pill -->
      <rect x="240" y="140" width="600" height="56" rx="28" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <text x="540" y="177" fill="#38bdf8" font-family="Liberation Sans" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">02 / 10 • LA VRAIE ALTERNATIVE</text>

      <!-- Main Logo / Hero -->
      <text x="540" y="330" fill="#94a3b8" font-family="Liberation Sans" font-size="28" font-weight="bold" text-anchor="middle" letter-spacing="2">DECOUVREZ LA PLATEFORME LIBRE</text>
      <text x="540" y="440" fill="#ffffff" font-family="Liberation Sans" font-size="78" font-weight="bold" text-anchor="middle">CVGratuit.fr</text>
      <text x="540" y="520" fill="#e6c875" font-family="Liberation Sans" font-size="36" font-weight="bold" text-anchor="middle">100% Gratuit. Vraiment. Pour Tous.</text>

      <!-- 3 Key Value Cards -->
      <g filter="url(#shadow)">
        <!-- Card 1 -->
        <rect x="100" y="600" width="880" height="170" rx="24" fill="url(#cardGrad)" stroke="#10b981" stroke-width="2"/>
        <circle cx="170" cy="685" r="36" fill="#065f46"/>
        <path d="M156 685 L166 695 L186 675" stroke="#34d399" stroke-width="5" fill="none" stroke-linecap="round"/>
        <text x="230" y="670" fill="#ffffff" font-family="Liberation Sans" font-size="32" font-weight="bold">Zero Carte Bancaire Demandee</text>
        <text x="230" y="710" fill="#94a3b8" font-family="Liberation Sans" font-size="22">Aucun numero de carte, aucun essai piege, 0 € a vie.</text>

        <!-- Card 2 -->
        <rect x="100" y="800" width="880" height="170" rx="24" fill="url(#cardGrad)" stroke="#3b82f6" stroke-width="2"/>
        <circle cx="170" cy="885" r="36" fill="#1e3a8a"/>
        <path d="M156 885 L166 895 L186 875" stroke="#60a5fa" stroke-width="5" fill="none" stroke-linecap="round"/>
        <text x="230" y="870" fill="#ffffff" font-family="Liberation Sans" font-size="32" font-weight="bold">Aucun Filigrane Sur Votre PDF</text>
        <text x="230" y="910" fill="#94a3b8" font-family="Liberation Sans" font-size="22">Rendu vectoriel pur, net et immacule pour les recruteurs.</text>

        <!-- Card 3 -->
        <rect x="100" y="1000" width="880" height="170" rx="24" fill="url(#cardGrad)" stroke="#f59e0b" stroke-width="2"/>
        <circle cx="170" cy="1085" r="36" fill="#78350f"/>
        <path d="M156 1085 L166 1095 L186 1075" stroke="#fbbf24" stroke-width="5" fill="none" stroke-linecap="round"/>
        <text x="230" y="1070" fill="#ffffff" font-family="Liberation Sans" font-size="32" font-weight="bold">Telechargement Immediat en 1 Clic</text>
        <text x="230" y="1110" fill="#94a3b8" font-family="Liberation Sans" font-size="22">Format PDF haute definition pret a etre envoye aujourd'hui.</text>
      </g>

      <!-- Trust Badge Box -->
      <g filter="url(#shadow)">
        <rect x="140" y="1250" width="800" height="240" rx="28" fill="#1e293b" stroke="#e6c875" stroke-width="2"/>
        <text x="540" y="1330" fill="#e6c875" font-family="Liberation Sans" font-size="32" font-weight="bold" text-anchor="middle">LE NOUVEAU STANDARD EN FRANCE</text>
        <text x="540" y="1390" fill="#ffffff" font-family="Liberation Sans" font-size="26" text-anchor="middle">Concu pour donner a chaque chercheur d'emploi les memes chances.</text>
        <text x="540" y="1440" fill="#94a3b8" font-family="Liberation Sans" font-size="22" text-anchor="middle">Simple • Elegant • Sans Publicite Envahissante</text>
      </g>

      <!-- UGC Voiceover Subtitle Bar -->
      <rect x="80" y="1660" width="920" height="150" rx="26" fill="#0b1120" stroke="#10b981" stroke-width="2"/>
      <text x="540" y="1725" fill="#ffffff" font-family="Liberation Sans" font-size="30" font-weight="bold" text-anchor="middle">« Voici CVGratuit.fr : 100% gratuit, sans carte et sans filigrane. »</text>
      <text x="540" y="1775" fill="#34d399" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">La reference libre de redaction de CV en France</text>
    `
  },

  // Scene 3: Naveed Afzal (Creator & Vision)
  {
    num: "03 / 10",
    tag: "LE FONDATEUR & LA MISSION",
    content: `
      <!-- Top Pill -->
      <rect x="240" y="140" width="600" height="56" rx="28" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <text x="540" y="177" fill="#fbbf24" font-family="Liberation Sans" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">03 / 10 • L'ENGAGEMENT HUMAIN</text>

      <!-- Creator Header -->
      <text x="540" y="320" fill="#94a3b8" font-family="Liberation Sans" font-size="26" font-weight="bold" text-anchor="middle" letter-spacing="2">UNE INITIATIVE TECHNOLOGIQUE ET SOLIDAIRE</text>
      <text x="540" y="420" fill="#ffffff" font-family="Liberation Sans" font-size="62" font-weight="bold" text-anchor="middle">Concu par Naveed Afzal</text>
      <text x="540" y="490" fill="#38bdf8" font-family="Liberation Sans" font-size="32" font-weight="bold" text-anchor="middle">20+ Ans d'Expertise en Ingenierie Tech</text>

      <!-- Main Profile & Mission Card -->
      <g filter="url(#shadow)">
        <rect x="100" y="570" width="880" height="630" rx="32" fill="url(#cardGrad)" stroke="#3b82f6" stroke-width="2"/>
        
        <!-- Experience Badge -->
        <rect x="300" y="630" width="480" height="52" rx="26" fill="#1e3a8a" stroke="#60a5fa" stroke-width="2"/>
        <text x="540" y="665" fill="#93c5fd" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">EXPERIENCE &amp; RIGUEUR TECHNIQUE</text>

        <!-- Quote -->
        <text x="540" y="780" fill="#e2e8f0" font-family="Liberation Sans" font-size="30" font-style="italic" text-anchor="middle">« L'acces a l'emploi est un droit fondamental.</text>
        <text x="540" y="830" fill="#e2e8f0" font-family="Liberation Sans" font-size="30" font-style="italic" text-anchor="middle">Un candidat ne devrait jamais payer</text>
        <text x="540" y="880" fill="#e2e8f0" font-family="Liberation Sans" font-size="30" font-style="italic" text-anchor="middle">pour envoyer sa candidature. »</text>

        <line x1="240" y1="940" x2="840" y2="940" stroke="#334155" stroke-width="2"/>

        <!-- 3 Pillars -->
        <g transform="translate(140, 980)">
          <rect x="0" y="0" width="240" height="150" rx="18" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="120" y="60" fill="#38bdf8" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">EXPERTISE</text>
          <text x="120" y="100" fill="#cbd5e1" font-family="Liberation Sans" font-size="18" text-anchor="middle">20+ ans Tech</text>
        </g>
        <g transform="translate(420, 980)">
          <rect x="0" y="0" width="240" height="150" rx="18" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="120" y="60" fill="#10b981" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">ETHIQUE</text>
          <text x="120" y="100" fill="#cbd5e1" font-family="Liberation Sans" font-size="18" text-anchor="middle">0 Revente Donnees</text>
        </g>
        <g transform="translate(700, 980)">
          <rect x="0" y="0" width="240" height="150" rx="18" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="120" y="60" fill="#fbbf24" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">MISSION</text>
          <text x="120" y="100" fill="#cbd5e1" font-family="Liberation Sans" font-size="18" text-anchor="middle">100% Solidaire</text>
        </g>
      </g>

      <!-- Mission Statement Card -->
      <g filter="url(#shadow)">
        <rect x="140" y="1280" width="800" height="230" rx="28" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
        <text x="540" y="1360" fill="#38bdf8" font-family="Liberation Sans" font-size="30" font-weight="bold" text-anchor="middle">UNE SOLUTION CITOYENNE ET UTILE</text>
        <text x="540" y="1415" fill="#ffffff" font-family="Liberation Sans" font-size="26" text-anchor="middle">Mettre les meilleures technologies au service</text>
        <text x="540" y="1460" fill="#ffffff" font-family="Liberation Sans" font-size="26" text-anchor="middle">des etudiants, actifs et demandeurs d'emploi.</text>
      </g>

      <!-- UGC Voiceover Subtitle Bar -->
      <rect x="80" y="1660" width="920" height="150" rx="26" fill="#0b1120" stroke="#fbbf24" stroke-width="2"/>
      <text x="540" y="1725" fill="#ffffff" font-family="Liberation Sans" font-size="28" font-weight="bold" text-anchor="middle">« Concu par Naveed Afzal, ingenieur fort de 20 ans d'experience tech. »</text>
      <text x="540" y="1775" fill="#fbbf24" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">Un projet libre et independant dedie a la reussite de tous</text>
    `
  },

  // Scene 4: 6 ATS-Friendly Templates
  {
    num: "04 / 10",
    tag: "MODELES & FORMATS ATS",
    content: `
      <!-- Top Pill -->
      <rect x="240" y="140" width="600" height="56" rx="28" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <text x="540" y="177" fill="#60a5fa" font-family="Liberation Sans" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">04 / 10 • COMPATIBILITE RECRUTEURS</text>

      <!-- Title -->
      <text x="540" y="320" fill="#94a3b8" font-family="Liberation Sans" font-size="26" font-weight="bold" text-anchor="middle" letter-spacing="2">VALIDES PAR LES RECRUTEURS FRANCAIS</text>
      <text x="540" y="420" fill="#ffffff" font-family="Liberation Sans" font-size="62" font-weight="bold" text-anchor="middle">6 Modeles Conformes ATS</text>
      <text x="540" y="490" fill="#10b981" font-family="Liberation Sans" font-size="32" font-weight="bold" text-anchor="middle">Franchissez les robots de tri sans obstacle</text>

      <!-- Grid of 6 Templates -->
      <g filter="url(#shadow)" transform="translate(100, 560)">
        <rect x="0" y="0" width="880" height="660" rx="32" fill="url(#cardGrad)" stroke="#3b82f6" stroke-width="2"/>
        
        <!-- Template Mini Cards -->
        <g transform="translate(40, 50)">
          <!-- 1. Moderne -->
          <rect x="0" y="0" width="240" height="250" rx="18" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
          <text x="120" y="50" fill="#38bdf8" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">MODERNE</text>
          <text x="120" y="90" fill="#94a3b8" font-family="Liberation Sans" font-size="16" text-anchor="middle">Polyvalent &amp; Elegant</text>
          <rect x="30" y="120" width="180" height="6" rx="3" fill="#475569"/>
          <rect x="30" y="140" width="130" height="6" rx="3" fill="#475569"/>
          <rect x="30" y="160" width="160" height="6" rx="3" fill="#475569"/>
          <rect x="30" y="195" width="180" height="28" rx="14" fill="#0284c7"/>
          <text x="120" y="214" fill="#ffffff" font-family="Liberation Sans" font-size="14" font-weight="bold" text-anchor="middle">Score ATS: 98%</text>

          <!-- 2. Minimaliste -->
          <rect x="280" y="0" width="240" height="250" rx="18" fill="#1e293b" stroke="#94a3b8" stroke-width="2"/>
          <text x="400" y="50" fill="#ffffff" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">MINIMALISTE</text>
          <text x="400" y="90" fill="#94a3b8" font-family="Liberation Sans" font-size="16" text-anchor="middle">Efficacite Pure</text>
          <rect x="310" y="120" width="180" height="6" rx="3" fill="#475569"/>
          <rect x="310" y="140" width="140" height="6" rx="3" fill="#475569"/>
          <rect x="310" y="160" width="170" height="6" rx="3" fill="#475569"/>
          <rect x="310" y="195" width="180" height="28" rx="14" fill="#334155"/>
          <text x="400" y="214" fill="#ffffff" font-family="Liberation Sans" font-size="14" font-weight="bold" text-anchor="middle">Score ATS: 100%</text>

          <!-- 3. Classique -->
          <rect x="560" y="0" width="240" height="250" rx="18" fill="#1e293b" stroke="#e6c875" stroke-width="2"/>
          <text x="680" y="50" fill="#fbbf24" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">CLASSIQUE</text>
          <text x="680" y="90" fill="#94a3b8" font-family="Liberation Sans" font-size="16" text-anchor="middle">Intemporel &amp; Sobre</text>
          <rect x="590" y="120" width="180" height="6" rx="3" fill="#475569"/>
          <rect x="590" y="140" width="120" height="6" rx="3" fill="#475569"/>
          <rect x="590" y="160" width="150" height="6" rx="3" fill="#475569"/>
          <rect x="590" y="195" width="180" height="28" rx="14" fill="#b45309"/>
          <text x="680" y="214" fill="#ffffff" font-family="Liberation Sans" font-size="14" font-weight="bold" text-anchor="middle">Score ATS: 97%</text>
        </g>

        <!-- Row 2 -->
        <g transform="translate(40, 340)">
          <!-- 4. Executif -->
          <rect x="0" y="0" width="240" height="250" rx="18" fill="#1e293b" stroke="#a855f7" stroke-width="2"/>
          <text x="120" y="50" fill="#c084fc" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">EXECUTIF</text>
          <text x="120" y="90" fill="#94a3b8" font-family="Liberation Sans" font-size="16" text-anchor="middle">Cadres &amp; Direction</text>
          <rect x="30" y="120" width="180" height="6" rx="3" fill="#475569"/>
          <rect x="30" y="140" width="150" height="6" rx="3" fill="#475569"/>
          <rect x="30" y="160" width="130" height="6" rx="3" fill="#475569"/>
          <rect x="30" y="195" width="180" height="28" rx="14" fill="#7e22ce"/>
          <text x="120" y="214" fill="#ffffff" font-family="Liberation Sans" font-size="14" font-weight="bold" text-anchor="middle">Score ATS: 96%</text>

          <!-- 5. Technique -->
          <rect x="280" y="0" width="240" height="250" rx="18" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
          <text x="400" y="50" fill="#34d399" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">TECHNIQUE</text>
          <text x="400" y="90" fill="#94a3b8" font-family="Liberation Sans" font-size="16" text-anchor="middle">Dev, Ingenieurs &amp; IT</text>
          <rect x="310" y="120" width="180" height="6" rx="3" fill="#475569"/>
          <rect x="310" y="140" width="160" height="6" rx="3" fill="#475569"/>
          <rect x="310" y="160" width="120" height="6" rx="3" fill="#475569"/>
          <rect x="310" y="195" width="180" height="28" rx="14" fill="#047857"/>
          <text x="400" y="214" fill="#ffffff" font-family="Liberation Sans" font-size="14" font-weight="bold" text-anchor="middle">Score ATS: 99%</text>

          <!-- 6. Creatif -->
          <rect x="560" y="0" width="240" height="250" rx="18" fill="#1e293b" stroke="#ec4899" stroke-width="2"/>
          <text x="680" y="50" fill="#f472b6" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">COMPACT</text>
          <text x="680" y="90" fill="#94a3b8" font-family="Liberation Sans" font-size="16" text-anchor="middle">1 Page Haute Densite</text>
          <rect x="590" y="120" width="180" height="6" rx="3" fill="#475569"/>
          <rect x="590" y="140" width="130" height="6" rx="3" fill="#475569"/>
          <rect x="590" y="160" width="170" height="6" rx="3" fill="#475569"/>
          <rect x="590" y="195" width="180" height="28" rx="14" fill="#be185d"/>
          <text x="680" y="214" fill="#ffffff" font-family="Liberation Sans" font-size="14" font-weight="bold" text-anchor="middle">Score ATS: 95%</text>
        </g>
      </g>

      <!-- Stat Box -->
      <g filter="url(#shadow)">
        <rect x="140" y="1280" width="800" height="230" rx="28" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
        <text x="540" y="1360" fill="#34d399" font-family="Liberation Sans" font-size="34" font-weight="bold" text-anchor="middle">+65% DE TAUX DE REPONSE</text>
        <text x="540" y="1415" fill="#ffffff" font-family="Liberation Sans" font-size="26" text-anchor="middle">Structure optimisee pour franchir les logiciels de tri</text>
        <text x="540" y="1460" fill="#94a3b8" font-family="Liberation Sans" font-size="22" text-anchor="middle">Workday • Taleo • SmartRecruiters • Greenhouse</text>
      </g>

      <!-- UGC Voiceover Subtitle Bar -->
      <rect x="80" y="1660" width="920" height="150" rx="26" fill="#0b1120" stroke="#60a5fa" stroke-width="2"/>
      <text x="540" y="1725" fill="#ffffff" font-family="Liberation Sans" font-size="30" font-weight="bold" text-anchor="middle">« 6 modeles professionnels calibres pour passer les filtres ATS. »</text>
      <text x="540" y="1775" fill="#93c5fd" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">Des designs clairs et percutants pour retenir l'attention du recruteur</text>
    `
  },

  // Scene 5: Cover Letter Generator
  {
    num: "05 / 10",
    tag: "SUITE DE CANDIDATURE COMPLETE",
    content: `
      <!-- Top Pill -->
      <rect x="240" y="140" width="600" height="56" rx="28" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <text x="540" y="177" fill="#c084fc" font-family="Liberation Sans" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">05 / 10 • LETTRE DE MOTIVATION</text>

      <!-- Title -->
      <text x="540" y="320" fill="#94a3b8" font-family="Liberation Sans" font-size="26" font-weight="bold" text-anchor="middle" letter-spacing="2">NE LAISSEZ PLUS LA PAGE BLANCHE VOUS BLOQUER</text>
      <text x="540" y="420" fill="#ffffff" font-family="Liberation Sans" font-size="60" font-weight="bold" text-anchor="middle">Generateur de Lettre Integre</text>
      <text x="540" y="490" fill="#e879f9" font-family="Liberation Sans" font-size="32" font-weight="bold" text-anchor="middle">Personnalisee en fonction de l'offre visee</text>

      <!-- Letter Mockup Card -->
      <g filter="url(#shadow)">
        <rect x="100" y="560" width="880" height="660" rx="32" fill="url(#cardGrad)" stroke="#c084fc" stroke-width="2"/>
        
        <!-- Header of Letter -->
        <g transform="translate(160, 620)">
          <text x="0" y="30" fill="#ffffff" font-family="Liberation Sans" font-size="26" font-weight="bold">Thomas Moreau</text>
          <text x="0" y="60" fill="#94a3b8" font-family="Liberation Sans" font-size="18">thomas.moreau@email.com • 06 12 34 56 78</text>
          
          <rect x="420" y="0" width="220" height="34" rx="17" fill="#581c87"/>
          <text x="530" y="23" fill="#f5d0fe" font-family="Liberation Sans" font-size="16" font-weight="bold" text-anchor="middle">Style Assorti au CV</text>
        </g>
        
        <line x1="160" y1="710" x2="920" y2="710" stroke="#334155" stroke-width="2"/>

        <!-- Structured paragraphs -->
        <g transform="translate(160, 750)">
          <rect x="0" y="0" width="160" height="28" rx="6" fill="#3b82f6" opacity="0.3"/>
          <text x="80" y="20" fill="#60a5fa" font-family="Liberation Sans" font-size="16" font-weight="bold" text-anchor="middle">1. L'ACCROCHE</text>
          <text x="0" y="55" fill="#cbd5e1" font-family="Liberation Sans" font-size="20">« Fort de 5 annees d'experience dans la gestion de projets, »</text>
          <text x="0" y="85" fill="#cbd5e1" font-family="Liberation Sans" font-size="20">« je vous propose d'optimiser le developpement de vos equipes. »</text>

          <rect x="0" y="125" width="160" height="28" rx="6" fill="#10b981" opacity="0.3"/>
          <text x="80" y="145" fill="#34d399" font-family="Liberation Sans" font-size="16" font-weight="bold" text-anchor="middle">2. VOS ATOUTS</text>
          <text x="0" y="180" fill="#cbd5e1" font-family="Liberation Sans" font-size="20">« Mes realisations cles chez mes precedents employeurs : »</text>
          <text x="0" y="210" fill="#94a3b8" font-family="Liberation Sans" font-size="18">• +35% de productivite et maitrise des outils de reporting</text>
          <text x="0" y="235" fill="#94a3b8" font-family="Liberation Sans" font-size="18">• Coordination transversale de 8 intervenants metiers</text>

          <rect x="0" y="275" width="160" height="28" rx="6" fill="#f59e0b" opacity="0.3"/>
          <text x="80" y="295" fill="#fbbf24" font-family="Liberation Sans" font-size="16" font-weight="bold" text-anchor="middle">3. PROPOSITION</text>
          <text x="0" y="330" fill="#cbd5e1" font-family="Liberation Sans" font-size="20">« Rencontrons-nous pour echanger sur vos objectifs 2026. »</text>
        </g>
      </g>

      <!-- Feature highlight banner -->
      <g filter="url(#shadow)">
        <rect x="140" y="1280" width="800" height="230" rx="28" fill="#1e293b" stroke="#e879f9" stroke-width="2"/>
        <text x="540" y="1360" fill="#f5d0fe" font-family="Liberation Sans" font-size="30" font-weight="bold" text-anchor="middle">UN DOSSIER DE CANDIDATURE HARMONIEUX</text>
        <text x="540" y="1415" fill="#ffffff" font-family="Liberation Sans" font-size="26" text-anchor="middle">Meme typographie • Meme palette • Meme niveau de finition</text>
        <text x="540" y="1460" fill="#94a3b8" font-family="Liberation Sans" font-size="22" text-anchor="middle">Telechargeable en PDF separement ou avec le CV</text>
      </g>

      <!-- UGC Voiceover Subtitle Bar -->
      <rect x="80" y="1660" width="920" height="150" rx="26" fill="#0b1120" stroke="#c084fc" stroke-width="2"/>
      <text x="540" y="1725" fill="#ffffff" font-family="Liberation Sans" font-size="28" font-weight="bold" text-anchor="middle">« Fini le casse-tete : genere ta lettre de motivation parfaitement assortie. »</text>
      <text x="540" y="1775" fill="#e879f9" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">Un texte sur-mesure pret a convaincre en un instant</text>
    `
  },

  // Scene 6: Live ATS Scoring
  {
    num: "06 / 10",
    tag: "AUDIT EN DIRECT",
    content: `
      <!-- Top Pill -->
      <rect x="240" y="140" width="600" height="56" rx="28" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <text x="540" y="177" fill="#34d399" font-family="Liberation Sans" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">06 / 10 • ANALYSEUR INTELLIGENT</text>

      <!-- Title -->
      <text x="540" y="320" fill="#94a3b8" font-family="Liberation Sans" font-size="26" font-weight="bold" text-anchor="middle" letter-spacing="2">MAXIMISEZ VOS CHANCES D'ETRE RAPPELE</text>
      <text x="540" y="420" fill="#ffffff" font-family="Liberation Sans" font-size="62" font-weight="bold" text-anchor="middle">Score ATS en Direct</text>
      <text x="540" y="490" fill="#34d399" font-family="Liberation Sans" font-size="32" font-weight="bold" text-anchor="middle">Audit instantane de chaque rubrique de votre CV</text>

      <!-- Gauge Card -->
      <g filter="url(#shadow)">
        <rect x="100" y="560" width="880" height="660" rx="32" fill="url(#cardGrad)" stroke="#10b981" stroke-width="2"/>
        
        <!-- Big Score Gauge -->
        <circle cx="540" cy="740" r="110" fill="none" stroke="#1e293b" stroke-width="22"/>
        <circle cx="540" cy="740" r="110" fill="none" stroke="#10b981" stroke-width="22" stroke-dasharray="690" stroke-dashoffset="40"/>
        
        <text x="540" y="735" fill="#ffffff" font-family="Liberation Sans" font-size="64" font-weight="bold" text-anchor="middle">96</text>
        <text x="540" y="780" fill="#34d399" font-family="Liberation Sans" font-size="26" font-weight="bold" text-anchor="middle">/ 100 • EXCELLENT</text>

        <!-- Detailed Audit Checklist -->
        <g transform="translate(160, 890)">
          <!-- Item 1 -->
          <circle cx="20" cy="18" r="16" fill="#065f46"/>
          <path d="M12 18 L18 24 L28 12" stroke="#34d399" stroke-width="3" fill="none"/>
          <text x="50" y="24" fill="#ffffff" font-family="Liberation Sans" font-size="24" font-weight="bold">Mots-cles metier detectes</text>
          <text x="640" y="24" fill="#34d399" font-family="Liberation Sans" font-size="22" font-weight="bold">100%</text>

          <!-- Item 2 -->
          <circle cx="20" cy="78" r="16" fill="#065f46"/>
          <path d="M12 78 L18 84 L28 72" stroke="#34d399" stroke-width="3" fill="none"/>
          <text x="50" y="84" fill="#ffffff" font-family="Liberation Sans" font-size="24" font-weight="bold">Structure des dates &amp; postes valide</text>
          <text x="640" y="84" fill="#34d399" font-family="Liberation Sans" font-size="22" font-weight="bold">100%</text>

          <!-- Item 3 -->
          <circle cx="20" cy="138" r="16" fill="#065f46"/>
          <path d="M12 138 L18 144 L28 132" stroke="#34d399" stroke-width="3" fill="none"/>
          <text x="50" y="144" fill="#ffffff" font-family="Liberation Sans" font-size="24" font-weight="bold">Coordonnees &amp; liens conformes</text>
          <text x="640" y="144" fill="#34d399" font-family="Liberation Sans" font-size="22" font-weight="bold">100%</text>

          <!-- Item 4 -->
          <circle cx="20" cy="198" r="16" fill="#065f46"/>
          <path d="M12 198 L18 204 L28 192" stroke="#34d399" stroke-width="3" fill="none"/>
          <text x="50" y="204" fill="#ffffff" font-family="Liberation Sans" font-size="24" font-weight="bold">Densite textuelle optimisee</text>
          <text x="640" y="204" fill="#34d399" font-family="Liberation Sans" font-size="22" font-weight="bold">92%</text>
        </g>
      </g>

      <!-- Advice Card -->
      <g filter="url(#shadow)">
        <rect x="140" y="1280" width="800" height="230" rx="28" fill="#1e293b" stroke="#34d399" stroke-width="2"/>
        <text x="540" y="1360" fill="#34d399" font-family="Liberation Sans" font-size="30" font-weight="bold" text-anchor="middle">CORRIGEZ VOS ERREURS AVANT D'ENVOYER</text>
        <text x="540" y="1415" fill="#ffffff" font-family="Liberation Sans" font-size="26" text-anchor="middle">Des recommandations claires pour perfectionner</text>
        <text x="540" y="1460" fill="#94a3b8" font-family="Liberation Sans" font-size="22" text-anchor="middle">votre profil en temps reel pendant la saisie.</text>
      </g>

      <!-- UGC Voiceover Subtitle Bar -->
      <rect x="80" y="1660" width="920" height="150" rx="26" fill="#0b1120" stroke="#34d399" stroke-width="2"/>
      <text x="540" y="1725" fill="#ffffff" font-family="Liberation Sans" font-size="28" font-weight="bold" text-anchor="middle">« Verifie ton score ATS en direct pour etre sur d'etre selectionne. »</text>
      <text x="540" y="1775" fill="#34d399" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">L'outil d'audit qui booste le taux d'invitations en entretien</text>
    `
  },

  // Scene 7: Privacy & RGPD
  {
    num: "07 / 10",
    tag: "SECURITE & CONFIDENTIALITE",
    content: `
      <!-- Top Pill -->
      <rect x="240" y="140" width="600" height="56" rx="28" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <text x="540" y="177" fill="#38bdf8" font-family="Liberation Sans" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">07 / 10 • DONNEES PROTEGEES</text>

      <!-- Title -->
      <text x="540" y="320" fill="#94a3b8" font-family="Liberation Sans" font-size="26" font-weight="bold" text-anchor="middle" letter-spacing="2">RESPECT ABSOLU DE LA VIE PRIVEE</text>
      <text x="540" y="420" fill="#ffffff" font-family="Liberation Sans" font-size="62" font-weight="bold" text-anchor="middle">Vos Donnees Sont a Vous</text>
      <text x="540" y="490" fill="#38bdf8" font-family="Liberation Sans" font-size="32" font-weight="bold" text-anchor="middle">Zero revente • Zero pistage commercial</text>

      <!-- Shield / Security Card -->
      <g filter="url(#shadow)">
        <rect x="100" y="560" width="880" height="660" rx="32" fill="url(#cardGrad)" stroke="#38bdf8" stroke-width="2"/>
        
        <!-- Big Shield Icon -->
        <g transform="translate(540, 680)">
          <path d="M0 -60 L50 -40 L50 20 C50 60 0 85 0 85 C0 85 -50 60 -50 20 L-50 -40 Z" fill="#0369a1" stroke="#38bdf8" stroke-width="4"/>
          <path d="M-15 15 L-5 25 L20 -5" stroke="#ffffff" stroke-width="6" fill="none" stroke-linecap="round"/>
        </g>

        <!-- Privacy Points -->
        <g transform="translate(160, 830)">
          <rect x="0" y="0" width="560" height="80" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="40" y="48" fill="#ffffff" font-family="Liberation Sans" font-size="24" font-weight="bold">Stockage 100% Local sur votre appareil</text>
        </g>
        <g transform="translate(160, 930)">
          <rect x="0" y="0" width="560" height="80" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="40" y="48" fill="#ffffff" font-family="Liberation Sans" font-size="24" font-weight="bold">Conforme aux reglementations RGPD</text>
        </g>
        <g transform="translate(160, 1030)">
          <rect x="0" y="0" width="560" height="80" rx="16" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="40" y="48" fill="#ffffff" font-family="Liberation Sans" font-size="24" font-weight="bold">Aucune creation de compte requise</text>
        </g>
      </g>

      <!-- Reassurance Banner -->
      <g filter="url(#shadow)">
        <rect x="140" y="1280" width="800" height="230" rx="28" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
        <text x="540" y="1360" fill="#38bdf8" font-family="Liberation Sans" font-size="30" font-weight="bold" text-anchor="middle">VOUS GARDEZ LE CONTROLE TOTAL</text>
        <text x="540" y="1415" fill="#ffffff" font-family="Liberation Sans" font-size="26" text-anchor="middle">Vos coordonnees et votre CV ne sont jamais partages</text>
        <text x="540" y="1460" fill="#94a3b8" font-family="Liberation Sans" font-size="22" text-anchor="middle">ni revendu a des bases de donnees de tiers.</text>
      </g>

      <!-- UGC Voiceover Subtitle Bar -->
      <rect x="80" y="1660" width="920" height="150" rx="26" fill="#0b1120" stroke="#38bdf8" stroke-width="2"/>
      <text x="540" y="1725" fill="#ffffff" font-family="Liberation Sans" font-size="28" font-weight="bold" text-anchor="middle">« Tes donnees restent privees sur ton navigateur : zero spam, zero revente. »</text>
      <text x="540" y="1775" fill="#38bdf8" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">La confidentialite comme engagement intransigeant</text>
    `
  },

  // Scene 8: 1,000,000+ Candidates & Reviews
  {
    num: "08 / 10",
    tag: "COMMUNAUTE & REUSSITE",
    content: `
      <!-- Top Pill -->
      <rect x="240" y="140" width="600" height="56" rx="28" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <text x="540" y="177" fill="#fbbf24" font-family="Liberation Sans" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">08 / 10 • IMPACT REEL EN FRANCE</text>

      <!-- Title -->
      <text x="540" y="320" fill="#94a3b8" font-family="Liberation Sans" font-size="26" font-weight="bold" text-anchor="middle" letter-spacing="2">ILS ONT DEJA REUSSI AVEC CVGRATUIT</text>
      <text x="540" y="420" fill="#ffffff" font-family="Liberation Sans" font-size="64" font-weight="bold" text-anchor="middle">+1 000 000 Candidats</text>
      <text x="540" y="490" fill="#fbbf24" font-family="Liberation Sans" font-size="34" font-weight="bold" text-anchor="middle">Note Moyenne : 4.9 / 5 Etoiles</text>

      <!-- Community Review Card -->
      <g filter="url(#shadow)">
        <rect x="100" y="560" width="880" height="660" rx="32" fill="url(#cardGrad)" stroke="#f59e0b" stroke-width="2"/>
        
        <!-- Star Icons -->
        <g transform="translate(380, 620)">
          <text x="0" y="36" fill="#fbbf24" font-family="Liberation Sans" font-size="38">★ ★ ★ ★ ★</text>
        </g>

        <!-- Testimonial 1 -->
        <g transform="translate(140, 700)">
          <rect x="0" y="0" width="600" height="200" rx="20" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="30" y="50" fill="#ffffff" font-family="Liberation Sans" font-size="22" font-style="italic">« J'ai decroche 3 entretiens des la premiere semaine.</text>
          <text x="30" y="85" fill="#ffffff" font-family="Liberation Sans" font-size="22" font-style="italic">La clarte du modele Moderne a fait toute la difference. »</text>
          <text x="30" y="145" fill="#38bdf8" font-family="Liberation Sans" font-size="20" font-weight="bold">Sarah L. — Responsable Commerciale (Paris)</text>
          <text x="30" y="175" fill="#94a3b8" font-family="Liberation Sans" font-size="16">Embauchee en CDI • Avis Verifie</text>
        </g>

        <!-- Testimonial 2 -->
        <g transform="translate(140, 930)">
          <rect x="0" y="0" width="600" height="200" rx="20" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
          <text x="30" y="50" fill="#ffffff" font-family="Liberation Sans" font-size="22" font-style="italic">« Enfin un vrai site gratuit sans piege de paiement.</text>
          <text x="30" y="85" fill="#ffffff" font-family="Liberation Sans" font-size="22" font-style="italic">Mon CV en PDF etait pret en 7 minutes chrono ! »</text>
          <text x="30" y="145" fill="#34d399" font-family="Liberation Sans" font-size="20" font-weight="bold">Karim B. — Developpeur Web (Lyon)</text>
          <text x="30" y="175" fill="#94a3b8" font-family="Liberation Sans" font-size="16">Embauche en ESN • Avis Verifie</text>
        </g>
      </g>

      <!-- Sectors badge -->
      <g filter="url(#shadow)">
        <rect x="140" y="1280" width="800" height="230" rx="28" fill="#1e293b" stroke="#fbbf24" stroke-width="2"/>
        <text x="540" y="1360" fill="#fbbf24" font-family="Liberation Sans" font-size="30" font-weight="bold" text-anchor="middle">POUR TOUS LES PROFILS ET METIERS</text>
        <text x="540" y="1415" fill="#ffffff" font-family="Liberation Sans" font-size="24" text-anchor="middle">Commerce • Tech • Sante • Restauration • Logistique • Finance</text>
        <text x="540" y="1460" fill="#94a3b8" font-family="Liberation Sans" font-size="22" text-anchor="middle">Etudiants • Reconversion • Cadres Superieurs</text>
      </g>

      <!-- UGC Voiceover Subtitle Bar -->
      <rect x="80" y="1660" width="920" height="150" rx="26" fill="#0b1120" stroke="#fbbf24" stroke-width="2"/>
      <text x="540" y="1725" fill="#ffffff" font-family="Liberation Sans" font-size="28" font-weight="bold" text-anchor="middle">« Deja plus d'un million de candidats accompagnes avec une note de 4.9/5 ! »</text>
      <text x="540" y="1775" fill="#fbbf24" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">Des milliers de recrutements concrétises chaque mois</text>
    `
  },

  // Scene 9: Ready in 3 Steps
  {
    num: "09 / 10",
    tag: "SIMPLICITE & RAPIDITE",
    content: `
      <!-- Top Pill -->
      <rect x="240" y="140" width="600" height="56" rx="28" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <text x="540" y="177" fill="#60a5fa" font-family="Liberation Sans" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">09 / 10 • PRÊT EN 3 ÉTAPES</text>

      <!-- Title -->
      <text x="540" y="320" fill="#94a3b8" font-family="Liberation Sans" font-size="26" font-weight="bold" text-anchor="middle" letter-spacing="2">CREEZ VOTRE CV SANS AUCUNE PRISE DE TETE</text>
      <text x="540" y="420" fill="#ffffff" font-family="Liberation Sans" font-size="62" font-weight="bold" text-anchor="middle">Pret en Moins de 10 Minutes</text>
      <text x="540" y="490" fill="#38bdf8" font-family="Liberation Sans" font-size="32" font-weight="bold" text-anchor="middle">Accessible sur mobile, tablette et PC</text>

      <!-- 3 Steps Visual Flow -->
      <g filter="url(#shadow)">
        <rect x="100" y="560" width="880" height="660" rx="32" fill="url(#cardGrad)" stroke="#3b82f6" stroke-width="2"/>
        
        <!-- Step 1 -->
        <g transform="translate(160, 620)">
          <circle cx="40" cy="40" r="32" fill="#2563eb"/>
          <text x="40" y="50" fill="#ffffff" font-family="Liberation Sans" font-size="28" font-weight="bold" text-anchor="middle">1</text>
          <text x="100" y="35" fill="#ffffff" font-family="Liberation Sans" font-size="26" font-weight="bold">Choisissez votre modele pro</text>
          <text x="100" y="65" fill="#94a3b8" font-family="Liberation Sans" font-size="20">6 designs epures adaptes a votre secteur d'activite</text>
        </g>
        
        <line x1="200" y1="720" x2="200" y2="760" stroke="#3b82f6" stroke-width="4" stroke-dasharray="6"/>

        <!-- Step 2 -->
        <g transform="translate(160, 780)">
          <circle cx="40" cy="40" r="32" fill="#10b981"/>
          <text x="40" y="50" fill="#ffffff" font-family="Liberation Sans" font-size="28" font-weight="bold" text-anchor="middle">2</text>
          <text x="100" y="35" fill="#ffffff" font-family="Liberation Sans" font-size="26" font-weight="bold">Renseignez vos experiences</text>
          <text x="100" y="65" fill="#94a3b8" font-family="Liberation Sans" font-size="20">Formulaire intuitif et suggestions de competences</text>
        </g>

        <line x1="200" y1="880" x2="200" y2="920" stroke="#10b981" stroke-width="4" stroke-dasharray="6"/>

        <!-- Step 3 -->
        <g transform="translate(160, 940)">
          <circle cx="40" cy="40" r="32" fill="#f59e0b"/>
          <text x="40" y="50" fill="#ffffff" font-family="Liberation Sans" font-size="28" font-weight="bold" text-anchor="middle">3</text>
          <text x="100" y="35" fill="#ffffff" font-family="Liberation Sans" font-size="26" font-weight="bold">Telechargez votre PDF Pro</text>
          <text x="100" y="65" fill="#94a3b8" font-family="Liberation Sans" font-size="20">1 clic, zero euro, export vectoriel sans filigrane</text>
        </g>

        <!-- Step Complete Banner -->
        <rect x="160" y="1080" width="560" height="70" rx="20" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
        <text x="440" y="1124" fill="#34d399" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">POSTULEZ IMMEDIATEMENT AUX OFFRES</text>
      </g>

      <!-- Reassurance Banner -->
      <g filter="url(#shadow)">
        <rect x="140" y="1280" width="800" height="230" rx="28" fill="#1e293b" stroke="#3b82f6" stroke-width="2"/>
        <text x="540" y="1360" fill="#38bdf8" font-family="Liberation Sans" font-size="30" font-weight="bold" text-anchor="middle">AUCUN LOGICIEL A INSTALLER</text>
        <text x="540" y="1415" fill="#ffffff" font-family="Liberation Sans" font-size="26" text-anchor="middle">Fonctionne instantanement dans votre navigateur web.</text>
        <text x="540" y="1460" fill="#94a3b8" font-family="Liberation Sans" font-size="22" text-anchor="middle">Mises a jour et modifications illimitees a tout moment.</text>
      </g>

      <!-- UGC Voiceover Subtitle Bar -->
      <rect x="80" y="1660" width="920" height="150" rx="26" fill="#0b1120" stroke="#60a5fa" stroke-width="2"/>
      <text x="540" y="1725" fill="#ffffff" font-family="Liberation Sans" font-size="28" font-weight="bold" text-anchor="middle">« Choisi ton modele, remplis tes infos, telecharge ton PDF en 1 clic. »</text>
      <text x="540" y="1775" fill="#93c5fd" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">Le moyen le plus rapide et efficace pour postuler aujourd'hui</text>
    `
  },

  // Scene 10: Final CTA
  {
    num: "10 / 10",
    tag: "PASSEZ A L'ACTION",
    content: `
      <!-- Top Pill -->
      <rect x="240" y="140" width="600" height="56" rx="28" fill="#1e293b" stroke="#334155" stroke-width="2"/>
      <text x="540" y="177" fill="#fbbf24" font-family="Liberation Sans" font-size="20" font-weight="bold" text-anchor="middle" letter-spacing="2">10 / 10 • PASSEZ A L'ACTION</text>

      <!-- Big Final Headline -->
      <text x="540" y="320" fill="#94a3b8" font-family="Liberation Sans" font-size="28" font-weight="bold" text-anchor="middle" letter-spacing="2">VOTRE PROCHAIN EMPLOI COMMENCE ICI</text>
      <text x="540" y="440" fill="#ffffff" font-family="Liberation Sans" font-size="82" font-weight="bold" text-anchor="middle">CVGratuit.fr</text>
      <text x="540" y="520" fill="#e6c875" font-family="Liberation Sans" font-size="36" font-weight="bold" text-anchor="middle">100% Gratuit. Sans Engagement.</text>

      <!-- CTA Big Action Card -->
      <g filter="url(#shadow)">
        <rect x="100" y="580" width="880" height="640" rx="36" fill="url(#cardGrad)" stroke="#fbbf24" stroke-width="3"/>
        
        <!-- Big Button Mockup -->
        <rect x="160" y="660" width="760" height="120" rx="30" fill="url(#gold)"/>
        <text x="540" y="735" fill="#0f172a" font-family="Liberation Sans" font-size="40" font-weight="bold" text-anchor="middle">CREER MON CV GRATUITEMENT</text>

        <!-- URL Badge -->
        <rect x="260" y="830" width="560" height="70" rx="20" fill="#1e293b" stroke="#38bdf8" stroke-width="2"/>
        <text x="540" y="875" fill="#38bdf8" font-family="Liberation Sans" font-size="32" font-weight="bold" text-anchor="middle">www.cvgratuit.fr</text>

        <!-- Final Checklist -->
        <g transform="translate(200, 960)">
          <path d="M0 12 L8 20 L22 6" stroke="#10b981" stroke-width="4" fill="none"/>
          <text x="36" y="16" fill="#ffffff" font-family="Liberation Sans" font-size="24">Aucune carte bancaire requise</text>
        </g>
        <g transform="translate(200, 1020)">
          <path d="M0 12 L8 20 L22 6" stroke="#10b981" stroke-width="4" fill="none"/>
          <text x="36" y="16" fill="#ffffff" font-family="Liberation Sans" font-size="24">Telechargement PDF vectoriel immediat</text>
        </g>
        <g transform="translate(200, 1080)">
          <path d="M0 12 L8 20 L22 6" stroke="#10b981" stroke-width="4" fill="none"/>
          <text x="36" y="16" fill="#ffffff" font-family="Liberation Sans" font-size="24">6 Modeles ATS + Lettre de motivation</text>
        </g>
        <g transform="translate(200, 1140)">
          <path d="M0 12 L8 20 L22 6" stroke="#10b981" stroke-width="4" fill="none"/>
          <text x="36" y="16" fill="#ffffff" font-family="Liberation Sans" font-size="24">Concu par Naveed Afzal (20+ ans tech)</text>
        </g>
      </g>

      <!-- Punchline Box -->
      <g filter="url(#shadow)">
        <rect x="140" y="1280" width="800" height="230" rx="28" fill="#1e293b" stroke="#10b981" stroke-width="2"/>
        <text x="540" y="1360" fill="#34d399" font-family="Liberation Sans" font-size="34" font-weight="bold" text-anchor="middle">NE PAYEZ PLUS POUR POSTULER.</text>
        <text x="540" y="1415" fill="#ffffff" font-family="Liberation Sans" font-size="26" text-anchor="middle">Rejoignez le million de candidats qui nous font confiance.</text>
        <text x="540" y="1460" fill="#e6c875" font-family="Liberation Sans" font-size="24" font-weight="bold" text-anchor="middle">Rendez-vous des maintenant sur CVGratuit.fr</text>
      </g>

      <!-- UGC Voiceover Subtitle Bar -->
      <rect x="80" y="1660" width="920" height="150" rx="26" fill="#0b1120" stroke="#fbbf24" stroke-width="2"/>
      <text x="540" y="1725" fill="#ffffff" font-family="Liberation Sans" font-size="30" font-weight="bold" text-anchor="middle">« Clique sur le lien et cree ton CV pro gratuitement sur CVGratuit.fr ! »</text>
      <text x="540" y="1775" fill="#fbbf24" font-family="Liberation Sans" font-size="22" font-weight="bold" text-anchor="middle">Votre carriere merite le meilleur outil gratuit de France</text>
    `
  }
];

// Write SVGs and render each to high-res PNG
console.log('Writing 10 SVG scenes and rasterizing to PNG...');
for (let i = 0; i < scenes.length; i++) {
  const svgPath = path.join(WORK_DIR, `scene_${i + 1}.svg`);
  const pngPath = path.join(WORK_DIR, `scene_${i + 1}.png`);
  const svgContent = getSvgWrapper(scenes[i].content);
  fs.writeFileSync(svgPath, svgContent);
  console.log(`Rasterizing scene ${i + 1}/10 to PNG...`);
  execSync(`ffmpeg -y -i ${svgPath} -pix_fmt rgb24 ${pngPath}`, { stdio: 'pipe' });
}

console.log('=== STEP 2: Encoding 10 Video Segments (7.826s each, 30fps) ===');
const sceneDuration = 7.826; // 10 * 7.826 = 78.26 seconds (> 70s)
const concatListFile = path.join(WORK_DIR, 'concat_list.txt');
let concatContent = '';

for (let i = 0; i < scenes.length; i++) {
  const pngPath = path.join(WORK_DIR, `scene_${i + 1}.png`);
  const clipPath = path.join(WORK_DIR, `clip_${i + 1}.mp4`);
  console.log(`Encoding clip ${i + 1}/10 (${sceneDuration}s)...`);
  execSync(`ffmpeg -y -loop 1 -framerate 30 -t ${sceneDuration} -i ${pngPath} -c:v libx264 -preset veryfast -pix_fmt yuv420p -r 30 ${clipPath}`, { stdio: 'pipe' });
  concatContent += `file '${clipPath}'\n`;
}
fs.writeFileSync(concatListFile, concatContent);

console.log('=== STEP 3: Concatenating All 10 Video Clips ===');
const mergedVideoPath = path.join(WORK_DIR, 'video_merged.mp4');
execSync(`ffmpeg -y -f concat -safe 0 -i ${concatListFile} -c copy ${mergedVideoPath}`, { stdio: 'pipe' });

console.log('=== STEP 4: Muxing with Mastered Soundtrack ===');
const audioTrackPath = '/tmp/ugc_music_mastered.wav';
const finalVideoPath = path.join(OUT_DIR, 'cvgratuit_ugc_promo.mp4');

// Mux video and audio, encode audio to AAC 192k, enable faststart for instant streaming/downloading
execSync(`ffmpeg -y -i ${mergedVideoPath} -i ${audioTrackPath} -c:v copy -c:a aac -b:a 192k -shortest -movflags +faststart ${finalVideoPath}`, { stdio: 'pipe' });

console.log(`SUCCESS! Promo video created at: ${finalVideoPath}`);

// Also copy a duplicate for easy access
const downloadCopy = path.join(OUT_DIR, 'cvgratuit_promo_ugc_78s.mp4');
fs.copyFileSync(finalVideoPath, downloadCopy);

console.log('=== STEP 5: Generating Standalone Video Player & Download Portal ===');
const downloadHtml = `<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Video Promotionnelle UGC • CVGratuit.fr</title>
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      background: radial-gradient(circle at 50% 20%, #0f172a 0%, #020617 100%);
      color: #f8fafc;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 30px 16px 60px 16px;
    }
    .header {
      text-align: center;
      max-width: 800px;
      margin-bottom: 28px;
    }
    .badge {
      display: inline-block;
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid #3b82f6;
      color: #60a5fa;
      padding: 6px 16px;
      border-radius: 9999px;
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    h1 {
      font-size: 32px;
      font-weight: 800;
      letter-spacing: -0.5px;
      margin-bottom: 8px;
      background: linear-gradient(135deg, #ffffff 0%, #cbd5e1 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p.lead {
      color: #94a3b8;
      font-size: 16px;
      line-height: 1.5;
    }
    .main-grid {
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: center;
      align-items: flex-start;
      gap: 32px;
      max-width: 1100px;
      width: 100%;
    }
    .video-card {
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 24px;
      padding: 16px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
      display: flex;
      flex-direction: column;
      align-items: center;
      max-width: 420px;
      width: 100%;
    }
    video {
      width: 100%;
      max-width: 380px;
      border-radius: 16px;
      aspect-ratio: 9 / 16;
      background: #000;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.5);
    }
    .download-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
      color: #0f172a;
      font-weight: 800;
      font-size: 16px;
      text-decoration: none;
      padding: 16px 24px;
      border-radius: 14px;
      margin-top: 16px;
      transition: all 0.2s ease;
      box-shadow: 0 10px 20px -5px rgba(245, 158, 11, 0.4);
    }
    .download-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 15px 25px -5px rgba(245, 158, 11, 0.6);
      filter: brightness(1.08);
    }
    .details-card {
      flex: 1;
      min-width: 320px;
      max-width: 580px;
      background: #0f172a;
      border: 1px solid #1e293b;
      border-radius: 24px;
      padding: 28px;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.7);
    }
    .spec-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #1e293b;
      font-size: 14px;
    }
    .spec-label { color: #94a3b8; }
    .spec-val { color: #f8fafc; font-weight: 600; }
    .transcript-title {
      font-size: 18px;
      font-weight: 700;
      margin: 24px 0 12px 0;
      color: #38bdf8;
    }
    .scene-item {
      background: #1e293b;
      border-radius: 12px;
      padding: 12px 14px;
      margin-bottom: 10px;
      font-size: 13px;
      line-height: 1.4;
      border-left: 3px solid #3b82f6;
    }
    .scene-time {
      color: #f59e0b;
      font-weight: 700;
      font-size: 12px;
      margin-bottom: 4px;
    }
    .scene-text {
      color: #e2e8f0;
    }
    .footer-note {
      margin-top: 36px;
      color: #64748b;
      font-size: 13px;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <div class="badge">UGC Video Creator • Format 9:16 (TikTok / Reels / Shorts)</div>
    <h1>Video Promotionnelle UGC • CVGratuit.fr</h1>
    <p class="lead">Video haute definition de plus de 70 secondes avec musique originale harmonieuse, script UGC percutant et presentation complete de la plateforme.</p>
  </div>

  <div class="main-grid">
    <!-- Video Player Card -->
    <div class="video-card">
      <video controls preload="metadata" playsinline poster="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='1080' height='1920'><rect fill='%230f172a' width='100%25' height='100%25'/><text x='50%25' y='50%25' fill='%2360a5fa' font-size='48' font-family='sans-serif' text-anchor='middle'>CVGratuit.fr UGC Video</text></svg>">
        <source src="cvgratuit_ugc_promo.mp4" type="video/mp4">
        Votre navigateur ne supporte pas la lecture directe de videos.
      </video>

      <a href="cvgratuit_ugc_promo.mp4" download="cvgratuit_ugc_promo_78s.mp4" class="download-btn">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
          <polyline points="7 10 12 15 17 10"></polyline>
          <line x1="12" y1="15" x2="12" y2="3"></line>
        </svg>
        Telecharger la Video MP4 (1080x1920)
      </a>
    </div>

    <!-- Details Card -->
    <div class="details-card">
      <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 16px; color: #ffffff;">Caracteristiques Techniques</h2>
      
      <div class="spec-row">
        <span class="spec-label">Duree exacte</span>
        <span class="spec-val" style="color: #34d399;">78,26 secondes (&gt; 70s conforme)</span>
      </div>
      <div class="spec-row">
        <span class="spec-label">Resolution</span>
        <span class="spec-val">1080 x 1920 pixels (Format Vertical 9:16)</span>
      </div>
      <div class="spec-row">
        <span class="spec-label">Piste Audio</span>
        <span class="spec-val">Musique originale stereo (Piano, Pad, Bell, Lo-Fi)</span>
      </div>
      <div class="spec-row">
        <span class="spec-label">Codec Video</span>
        <span class="spec-val">H.264 (AVC) • 30 images / sec</span>
      </div>
      <div class="spec-row">
        <span class="spec-label">Codec Audio</span>
        <span class="spec-val">AAC Stereo 192 kbps • 44,1 kHz</span>
      </div>
      <div class="spec-row">
        <span class="spec-label">Emplacement fichier</span>
        <span class="spec-val" style="font-family: monospace; font-size: 12px;">public/downloads/cvgratuit_ugc_promo.mp4</span>
      </div>

      <div class="transcript-title">Structure Narratif UGC (10 Scenes)</div>
      
      <div class="scene-item">
        <div class="scene-time">00:00 - 00:07 • Scene 1 : Le Piege Classique</div>
        <div class="scene-text">45 minutes a rediger un CV pour decouvrir un abonnement cache a 29,90 € / mois.</div>
      </div>
      <div class="scene-item">
        <div class="scene-time">00:07 - 00:15 • Scene 2 : La Solution CVGratuit.fr</div>
        <div class="scene-text">100% gratuit, 0 carte bancaire, aucun filigrane, telechargement immediat.</div>
      </div>
      <div class="scene-item">
        <div class="scene-time">00:15 - 00:23 • Scene 3 : Naveed Afzal (Fondateur)</div>
        <div class="scene-text">Concu par un ingenieur fort de 20+ ans d'expertise tech. Mission solidaire et ethique.</div>
      </div>
      <div class="scene-item">
        <div class="scene-time">00:23 - 00:31 • Scene 4 : 6 Modeles ATS</div>
        <div class="scene-text">Formats calibres pour passer les logiciels de tri (Workday, Taleo). +65% de reponses.</div>
      </div>
      <div class="scene-item">
        <div class="scene-time">00:31 - 00:39 • Scene 5 : Lettre de Motivation</div>
        <div class="scene-text">Generateur de lettre personnalisee assortie au design et au style du CV.</div>
      </div>
      <div class="scene-item">
        <div class="scene-time">00:39 - 00:46 • Scene 6 : Score ATS en Direct</div>
        <div class="scene-text">Audit instantane des mots-cles, coordonnees et rubriques (score 96/100).</div>
      </div>
      <div class="scene-item">
        <div class="scene-time">00:46 - 00:54 • Scene 7 : Confidentialite RGPD</div>
        <div class="scene-text">Traitement 100% local, donnees privees, zero compte obligatoire, zero revente.</div>
      </div>
      <div class="scene-item">
        <div class="scene-time">00:54 - 01:02 • Scene 8 : Preuve Sociale</div>
        <div class="scene-text">+1 000 000 de candidats accompagnes, note 4.9/5, temoignages concrets d'embauches.</div>
      </div>
      <div class="scene-item">
        <div class="scene-time">01:02 - 01:10 • Scene 9 : Pret en 3 Etapes</div>
        <div class="scene-text">Moins de 10 minutes sur mobile, tablette ou PC pour avoir un dossier parfait.</div>
      </div>
      <div class="scene-item">
        <div class="scene-time">01:10 - 01:18 • Scene 10 : Call To Action</div>
        <div class="scene-text">CVGratuit.fr : Le tremplin vers votre prochain emploi. Ne payez plus pour chercher un travail !</div>
      </div>
    </div>
  </div>

  <div class="footer-note">
    Fichier autonome genere specialement pour les reseaux sociaux (TikTok, Reels, Shorts).<br>
    Non affiche sur le site public principal conformement a la demande.
  </div>
</body>
</html>`;

fs.writeFileSync(path.join(OUT_DIR, 'index.html'), downloadHtml);
fs.writeFileSync('/app/applet/public/ugc-video-download.html', downloadHtml);
console.log('Download portals written to /public/downloads/index.html and /public/ugc-video-download.html');
