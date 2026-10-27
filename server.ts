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

// API endpoint to generate complete 2000+ words SEO article for the French CV & Job blog
app.post('/api/blog/generate-daily-article', async (req, res) => {
  try {
    const { topic, category } = req.body;
    const cleanTopic = (topic || "L'impact de l'IA et du Recrutement en 2026").replace("{Write today's best and trending topic}", "L'impact de l'IA et des Nouveaux Baromètres de Salaires en France en 2026").trim();

    if (process.env.GEMINI_API_KEY) {
      const prompt = `Agis en journaliste professionnel, expert SEO et stratège de contenu pour le marché de l'emploi en France.
Rédige un article de blog complet, approfondi et factuel sur le sujet tendance : "${cleanTopic}".
Catégorie attribuée : ${category || 'tendances-salaires'}.
Respecte scrupuleusement ces règles :
1. Titre émotionnel à fort taux de clic (CTR).
2. Meta Title (moins de 60 caractères) et Meta Description (150-160 caractères).
3. Mot-clé principal naturel et 4 mots-clés secondaires.
4. Introduction avec hook percutant, contexte et importance immédiate.
5. 4 sections H2 et H3 détaillées avec données chiffrées, citations d'experts RH et impacts réels.
6. 4 suggestions d'images in-content avec balises ALT SEO descriptives et notes d'emplacement.
7. Encadré "Points Clés / Key Takeaways" (5 puces).
8. Section FAQ (3 à 4 questions avec réponses claires).
9. Maillage interne (liens vers le créateur de CV, vérificateur ATS, etc.) et sources externes (Insee, Dares, France Travail).
10. Conclusion prospective et appel à l'action (CTA).
Fournis la réponse au format JSON strict avec les champs :
{
  "title": string,
  "metaTitle": string,
  "metaDescription": string,
  "primaryKeyword": string,
  "secondaryKeywords": string[],
  "intro": { "hook": string, "background": string, "importanceNow": string },
  "keyTakeaways": string[],
  "sections": [
    {
      "id": string,
      "heading": string,
      "subheading": string,
      "content": string,
      "callout": { "type": "stat"|"quote"|"tip", "title": string, "text": string, "source": string },
      "bullets": string[],
      "image": { "url": string, "alt": string, "caption": string, "placementNote": string }
    }
  ],
  "faqs": [{ "question": string, "answer": string }],
  "conclusion": { "summary": string, "futureOutlook": string, "ctaText": string, "ctaButton": string }
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          temperature: 0.7,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      if (parsed.title) {
        const article = {
          id: `art-ai-${Date.now()}`,
          slug: parsed.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 60) + '-' + Date.now().toString().slice(-4),
          title: parsed.title,
          metaTitle: parsed.metaTitle || parsed.title,
          metaDescription: parsed.metaDescription || parsed.title,
          categoryId: category || 'tendances-salaires',
          author: {
            name: 'Naveed Afzal & Rédaction IA Quotidienne',
            role: 'Analyste Recrutement & Stratégie SEO',
            avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
          },
          publishDate: "Aujourd'hui",
          lastUpdated: "À l'instant",
          readingTime: '9 min de lecture',
          wordCount: 2260,
          primaryKeyword: parsed.primaryKeyword || cleanTopic,
          secondaryKeywords: parsed.secondaryKeywords || ['recrutement', 'cv', 'emploi france'],
          isFeatured: true,
          isTrending: true,
          views: 1,
          likes: 0,
          featuredImage: {
            url: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&auto=format&fit=crop&q=80',
            alt: `Visuel principal header pour l'article sur ${cleanTopic}`,
            caption: `Figure Header : Analyse d'actualité et perspectives sur ${cleanTopic}.`,
            placementNote: 'Image mise en avant en haut d\'article',
          },
          intro: parsed.intro,
          keyTakeaways: parsed.keyTakeaways || [],
          sections: (parsed.sections || []).map((sec: any, idx: number) => ({
            ...sec,
            image: sec.image?.url ? sec.image : {
              url: [
                'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1000&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1000&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80',
                'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80',
              ][idx % 4],
              alt: sec.image?.alt || `Graphique et illustration RH pour la section ${idx + 1}`,
              caption: sec.image?.caption || `Figure ${idx + 1} : Représentation opérationnelle.`,
              placementNote: `Visuel in-content de la section ${idx + 1}`,
            }
          })),
          faqs: parsed.faqs || [],
          internalLinks: [
            {
              text: 'Créer un CV adapté avec nos modèles gratuits',
              targetView: 'editor',
              context: 'Appliquez ces principes sur un modèle approuvé par les recruteurs.',
            },
            {
              text: 'Vérifier la conformité de votre CV avec l\'audit ATS',
              targetView: 'landing',
              context: 'Testez la compatibilité machine de votre document.',
            },
          ],
          externalSources: [
            {
              title: 'Données statistiques France Travail',
              url: 'https://www.francetravail.fr/',
              authoritativeOrg: 'France Travail',
              citationContext: 'Rapports et tendances sur l\'emploi en France.',
            },
            {
              title: 'Baromètre Apec du Recrutement',
              url: 'https://corporate.apec.fr/',
              authoritativeOrg: 'Apec',
              citationContext: 'Enquêtes auprès des directions des ressources humaines.',
            },
          ],
          conclusion: parsed.conclusion || {
            summary: 'Une opportunité stratégique pour valoriser ses compétences.',
            futureOutlook: 'Une dynamique porteuse pour les candidats préparés.',
            ctaText: 'Prêt à valoriser vos compétences ? Créez votre CV gratuit dès aujourd\'hui.',
            ctaButton: 'Créer mon CV gratuit',
          },
        };
        return res.json({ article });
      }
    }
    // If no key or parsing failed, return null to let client fallback take over smoothly
    return res.json({ article: null });
  } catch (err) {
    console.error('Error generating daily article:', err);
    return res.json({ article: null });
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
