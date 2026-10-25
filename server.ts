import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// Initialize Gemini SDK with User-Agent as instructed by guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// API endpoint for AI CV assistance (Summary, bullet points, ATS keywords, cover letter)
app.post('/api/gemini/generate', async (req, res) => {
  try {
    const { prompt, type, jobTitle, currentText } = req.body;

    if (!process.env.GEMINI_API_KEY) {
      return res.status(200).json({
        fallback: true,
        text: getFrenchFallback(type, jobTitle, currentText),
      });
    }

    const systemPrompt = `Tu es un expert recruteur en France et consultant en ressources humaines certifié.
Tu aides les candidats à rédiger un Curriculum Vitae et une lettre de motivation professionnels, percutants et optimisés pour les logiciels ATS.
Règles strictes :
1. Langue : Français soigné, professionnel et dynamique.
2. Utilise des verbes d'action au passé composé ou présent actif (ex: "Piloté", "Optimisé", "Développé", "Accru").
3. Mets en valeur les chiffres, pourcentages et résultats concrets quand c'est pertinent.
4. Réponds de façon concise et directement utilisable dans un CV.`;

    let userPrompt = prompt;
    if (type === 'summary') {
      userPrompt = `Rédige une accroche / profil professionnel percutant de 3 à 4 phrases pour un(e) "${jobTitle || 'Professionnel'}". Texte actuel : "${currentText || ''}". Donne uniquement le texte final prêt à copier.`;
    } else if (type === 'bullets') {
      userPrompt = `Génère 3 puces de réalisations chiffrées et concrètes avec des verbes d'action pour le poste de "${jobTitle || 'Poste'}". Réponds sous forme de liste avec des tirets "- ".`;
    } else if (type === 'cover_letter') {
      userPrompt = `Rédige une lettre de motivation professionnelle et percutante pour un poste de "${jobTitle || 'Professionnel'}". Inclus les salutations, le corps en 3 paragraphes (Vous, Moi, Nous) et la formule de politesse finale.`;
    } else if (type === 'ats_audit') {
      userPrompt = `Analyse ce contenu de CV pour le métier "${jobTitle}": "${currentText}". Donne 3 recommandations concrètes et 5 mots-clés ATS indispensables à inclure en France.`;
    }

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: userPrompt,
      config: {
        systemInstruction: systemPrompt,
        temperature: 0.7,
      },
    });

    const generatedText = response.text || '';
    return res.json({ text: generatedText, fallback: false });
  } catch (error: any) {
    console.error('Erreur Gemini API:', error);
    // Graceful fallback to guarantee UI always works
    return res.json({
      fallback: true,
      text: getFrenchFallback(req.body?.type, req.body?.jobTitle, req.body?.currentText),
    });
  }
});

function getFrenchFallback(type?: string, jobTitle?: string, currentText?: string): string {
  const job = jobTitle || 'Professionnel passionné';
  if (type === 'summary') {
    return `${job} rigoureux et force de proposition, justifiant d'une solide expérience dans la gestion de projets et l'optimisation des performances. Reconnu pour mon sens du relationnel et mon autonomie, je souhaite mettre mes compétences au service d'une entreprise innovante et stimulante.`;
  }
  if (type === 'bullets') {
    return `- Pilotage d'activités opérationnelles et atteinte de 115% des objectifs annuels fixés.\n- Amélioration de la satisfaction client de +25% grâce à la mise en place de processus de suivi rigoureux.\n- Collaboration transversale avec les équipes internes pour optimiser les délais de livraison de 15%.`;
  }
  if (type === 'cover_letter') {
    return `Madame, Monsieur,\n\nVivement intéressé(e) par les opportunités de développement au sein de votre structure, je vous soumets ma candidature pour le poste de ${job}.\n\nFort(e) de mes précédentes expériences réussies, j'ai développé une solide expertise opérationnelle ainsi qu'une capacité éprouvée à collaborer efficacement en équipe. Mon sens de l'organisation et mon adaptabilité me permettent de relever rapidement de nouveaux défis.\n\nRejoindre votre entreprise représente pour moi l'opportunité d'apporter une contribution concrète et mesurée à vos projets stratégiques.\n\nJe reste à votre entière disposition pour convenir d'un entretien et vous prie d'agréer, Madame, Monsieur, l'expression de mes salutations distinguées.`;
  }
  return `Suggestions professionnelles validées par nos recruteurs pour ${job}.`;
}

// Explicit endpoints for Google Search Console verification file
app.get('/googleAI5M8f3ekFXNXe6T0f9eKCjkJJY9777CITc5Sn0MQwg.html', (_req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send('google-site-verification: googleAI5M8f3ekFXNXe6T0f9eKCjkJJY9777CITc5Sn0MQwg.html');
});

// Dynamic fallback for any Google verification code HTML file
app.get('/google:code([a-zA-Z0-9_-]+).html', (req, res) => {
  const code = req.params.code;
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.status(200).send(`google-site-verification: google${code}.html`);
});

// Serve public directory static files
const publicPath = path.resolve(process.cwd(), 'public');
app.use(express.static(publicPath));

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Serveur CVGratuit démarré sur http://localhost:${PORT}`);
  });
}

startServer();
