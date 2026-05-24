import React from 'react';
import { 
  Layers, 
  Cpu, 
  Zap, 
  Sparkles, 
  Video, 
  Mic, 
  Building, 
  Gift, 
  Sliders, 
  Code, 
  Mail, 
  FileText, 
  Database, 
  Search, 
  CheckCircle2, 
  Globe, 
  Key, 
  MessageSquare, 
  UserCheck, 
  Settings 
} from 'lucide-react';
import { AI_TOOLS_DATABASE } from './constants';

export const getToolIdByName = (toolName) => {
  if (!toolName) return null;
  const nameClean = toolName.toLowerCase();
  let tool = AI_TOOLS_DATABASE.find(t => t.name.toLowerCase() === nameClean);
  if (tool) return tool.id;
  tool = AI_TOOLS_DATABASE.find(t => nameClean.includes(t.name.toLowerCase()) || t.name.toLowerCase().includes(nameClean));
  if (tool) return tool.id;
  if (nameClean.includes("google business") || nameClean.includes("gmb")) return "gmb-autoresponder";
  if (nameClean.includes("gemini")) return "gemini-omni";
  if (nameClean.includes("claude")) return "claude-3-5";
  if (nameClean.includes("openai") || nameClean.includes("gpt")) return "gpt-4o";
  if (nameClean.includes("perplexity")) return "perplexity";
  if (nameClean.includes("deepseek")) return "deepseek-r1";
  if (nameClean.includes("make")) return "make";
  if (nameClean.includes("n8n")) return "n8n";
  if (nameClean.includes("activepieces")) return "activepieces";
  if (nameClean.includes("elevenlabs")) return "elevenlabs";
  if (nameClean.includes("midjourney")) return "midjourney";
  if (nameClean.includes("runway")) return "runway";
  if (nameClean.includes("descript")) return "descript";
  if (nameClean.includes("flux")) return "flux";
  return null;
};

export const getToolIconConfig = (toolName) => {
  const name = (toolName || '').toLowerCase();
  if (name.includes('make') || name.includes('integromat')) {
    return {
      iconName: 'Layers',
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-400',
      shadowColor: 'rgba(59, 130, 246, 0.4)',
      label: 'Make.com'
    };
  }
  if (name.includes('n8n')) {
    return {
      iconName: 'Cpu',
      color: 'from-rose-500 to-red-600',
      textColor: 'text-rose-400',
      shadowColor: 'rgba(244, 63, 94, 0.4)',
      label: 'n8n'
    };
  }
  if (name.includes('zapier')) {
    return {
      iconName: 'Zap',
      color: 'from-amber-500 to-orange-600',
      textColor: 'text-amber-400',
      shadowColor: 'rgba(245, 158, 11, 0.4)',
      label: 'Zapier'
    };
  }
  if (name.includes('gpt') || name.includes('openai')) {
    return {
      iconName: 'Sparkles',
      color: 'from-emerald-500 to-green-600',
      textColor: 'text-emerald-400',
      shadowColor: 'rgba(16, 185, 129, 0.4)',
      label: 'OpenAI GPT'
    };
  }
  if (name.includes('claude') || name.includes('anthropic')) {
    return {
      iconName: 'Cpu',
      color: 'from-orange-500 to-red-500',
      textColor: 'text-orange-400',
      shadowColor: 'rgba(249, 115, 22, 0.4)',
      label: 'Claude'
    };
  }
  if (name.includes('gemini') || name.includes('google')) {
    if (name.includes('business') || name.includes('profile') || name.includes('gmb')) {
      return {
        iconName: 'Building',
        color: 'from-blue-600 to-cyan-500',
        textColor: 'text-cyan-400',
        shadowColor: 'rgba(37, 99, 235, 0.4)',
        label: 'GMB Profile'
      };
    }
    if (name.includes('sheet') || name.includes('sheets')) {
      return {
        iconName: 'Database',
        color: 'from-emerald-600 to-teal-500',
        textColor: 'text-emerald-400',
        shadowColor: 'rgba(16, 185, 129, 0.4)',
        label: 'Google Sheets'
      };
    }
    if (name.includes('doc') || name.includes('docs')) {
      return {
        iconName: 'FileText',
        color: 'from-blue-600 to-indigo-500',
        textColor: 'text-blue-400',
        shadowColor: 'rgba(37, 99, 235, 0.4)',
        label: 'Google Docs'
      };
    }
    if (name.includes('form') || name.includes('forms')) {
      return {
        iconName: 'CheckCircle2',
        color: 'from-purple-650 to-indigo-550',
        textColor: 'text-purple-400',
        shadowColor: 'rgba(147, 51, 234, 0.4)',
        label: 'Google Forms'
      };
    }
    if (name.includes('mail') || name.includes('email') || name.includes('gmail')) {
      return {
        iconName: 'Mail',
        color: 'from-violet-500 to-indigo-600',
        textColor: 'text-violet-400',
        shadowColor: 'rgba(139, 92, 246, 0.4)',
        label: 'Google Gmail'
      };
    }
    if (name.includes('calendar') || name.includes('calendrier')) {
      return {
        iconName: 'Building',
        color: 'from-sky-500 to-blue-650',
        textColor: 'text-sky-400',
        shadowColor: 'rgba(14, 165, 233, 0.4)',
        label: 'Google Calendar'
      };
    }
    return {
      iconName: 'Sparkles',
      color: 'from-indigo-500 to-purple-600',
      textColor: 'text-indigo-400',
      shadowColor: 'rgba(99, 102, 241, 0.4)',
      label: 'Google Gemini'
    };
  }
  if (name.includes('midjourney') || name.includes('flux') || name.includes('runway') || name.includes('leonardo') || name.includes('stability')) {
    return {
      iconName: 'Video',
      color: 'from-purple-500 to-fuchsia-600',
      textColor: 'text-purple-400',
      shadowColor: 'rgba(168, 85, 247, 0.4)',
      label: 'AI Media'
    };
  }
  if (name.includes('elevenlabs') || name.includes('voice') || name.includes('audio') || name.includes('suno') || name.includes('udio')) {
    return {
      iconName: 'Mic',
      color: 'from-pink-500 to-rose-500',
      textColor: 'text-pink-400',
      shadowColor: 'rgba(236, 72, 153, 0.4)',
      label: 'AI Audio'
    };
  }
  if (name.includes('stripe') || name.includes('sumup') || name.includes('credit') || name.includes('pay')) {
    return {
      iconName: 'Gift',
      color: 'from-teal-500 to-emerald-600',
      textColor: 'text-teal-400',
      shadowColor: 'rgba(20, 184, 166, 0.4)',
      label: 'Payment'
    };
  }
  if (name.includes('activepieces')) {
    return {
      iconName: 'Sliders',
      color: 'from-sky-500 to-blue-500',
      textColor: 'text-sky-400',
      shadowColor: 'rgba(14, 165, 233, 0.4)',
      label: 'Activepieces'
    };
  }
  if (name.includes('lovable') || name.includes('bolt') || name.includes('v0') || name.includes('dev')) {
    return {
      iconName: 'Code',
      color: 'from-cyan-500 to-blue-600',
      textColor: 'text-cyan-400',
      shadowColor: 'rgba(6, 182, 212, 0.4)',
      label: 'No-Code Dev'
    };
  }
  if (name.includes('mail') || name.includes('email') || name.includes('outreach') || name.includes('sendgrid') || name.includes('gmail')) {
    return {
      iconName: 'Mail',
      color: 'from-violet-500 to-indigo-600',
      textColor: 'text-violet-400',
      shadowColor: 'rgba(139, 92, 246, 0.4)',
      label: 'Email'
    };
  }
  if (name.includes('local') || name.includes('agent local') || name.includes('ia local') || name.includes('agent d\'ia')) {
    return {
      iconName: 'Cpu',
      color: 'from-amber-500 to-yellow-600',
      textColor: 'text-amber-400',
      shadowColor: 'rgba(245, 158, 11, 0.4)',
      label: 'Agent Local d\'IA'
    };
  }
  if (name.includes('airtable')) {
    return {
      iconName: 'Database',
      color: 'from-emerald-600 to-teal-500',
      textColor: 'text-emerald-400',
      shadowColor: 'rgba(16, 185, 129, 0.4)',
      label: 'Airtable'
    };
  }
  if (name.includes('util') || name.includes('utility') || name.includes('outil')) {
    return {
      iconName: 'Settings',
      color: 'from-slate-600 to-slate-700',
      textColor: 'text-slate-400',
      shadowColor: 'rgba(100, 116, 139, 0.3)',
      label: 'Utilitaire'
    };
  }
  if (name.includes('recherche') || name.includes('search') || name.includes('recherche-web')) {
    return {
      iconName: 'Search',
      color: 'from-cyan-500 to-blue-500',
      textColor: 'text-cyan-400',
      shadowColor: 'rgba(6, 182, 212, 0.4)',
      label: 'Recherche Web AI'
    };
  }
  if (name.includes('form') || name.includes('forms') || name.includes('remplir')) {
    return {
      iconName: 'CheckCircle2',
      color: 'from-purple-600 to-indigo-500',
      textColor: 'text-purple-450',
      shadowColor: 'rgba(147, 51, 234, 0.4)',
      label: 'Formulaire'
    };
  }
  if (name.includes('connaissance') || name.includes('knowledge')) {
    return {
      iconName: 'Database',
      color: 'from-violet-650 to-purple-550',
      textColor: 'text-violet-400',
      shadowColor: 'rgba(124, 58, 237, 0.4)',
      label: 'Base de Connaissances'
    };
  }
  if (name.includes('http') || name.includes('url')) {
    return {
      iconName: 'Globe',
      color: 'from-sky-500 to-cyan-500',
      textColor: 'text-sky-400',
      shadowColor: 'rgba(14, 165, 233, 0.4)',
      label: 'Requête HTTP'
    };
  }
  if (name.includes('porte') || name.includes('gateway') || name.includes('firewall') || name.includes('pare-feu')) {
    return {
      iconName: 'Key',
      color: 'from-rose-600 to-pink-500',
      textColor: 'text-rose-400',
      shadowColor: 'rgba(225, 29, 72, 0.4)',
      label: 'Sécurité / Passerelle'
    };
  }
  if (name.includes('jira') || name.includes('confluence')) {
    return {
      iconName: 'Code',
      color: 'from-blue-600 to-cyan-600',
      textColor: 'text-blue-400',
      shadowColor: 'rgba(37, 99, 235, 0.4)',
      label: name.includes('jira') ? 'Jira' : 'Confluence'
    };
  }
  if (name.includes('telegram') || name.includes('télégramme')) {
    return {
      iconName: 'MessageSquare',
      color: 'from-sky-400 to-blue-500',
      textColor: 'text-sky-300',
      shadowColor: 'rgba(56, 189, 248, 0.4)',
      label: 'Telegram'
    };
  }
  if (name.includes('shopify')) {
    return {
      iconName: 'Building',
      color: 'from-lime-500 to-green-600',
      textColor: 'text-lime-400',
      shadowColor: 'rgba(132, 204, 22, 0.4)',
      label: 'Shopify'
    };
  }
  if (name.includes('attio')) {
    return {
      iconName: 'UserCheck',
      color: 'from-indigo-600 to-violet-500',
      textColor: 'text-indigo-400',
      shadowColor: 'rgba(79, 70, 229, 0.4)',
      label: 'Attio CRM'
    };
  }
  if (name.includes('mcp')) {
    return {
      iconName: 'Cpu',
      color: 'from-slate-600 to-slate-700',
      textColor: 'text-indigo-300',
      shadowColor: 'rgba(71, 85, 105, 0.4)',
      label: 'Client MCP'
    };
  }
  if (name.includes('linear') || name.includes('lineaire')) {
    return {
      iconName: 'Sliders',
      color: 'from-purple-600 to-indigo-650',
      textColor: 'text-purple-400',
      shadowColor: 'rgba(147, 51, 234, 0.4)',
      label: 'Linear'
    };
  }
  if (name.includes('apify')) {
    return {
      iconName: 'Cpu',
      color: 'from-orange-600 to-red-500',
      textColor: 'text-orange-400',
      shadowColor: 'rgba(234, 88, 12, 0.4)',
      label: 'Apify scraper'
    };
  }
  if (name.includes('slack') || name.includes('mou')) {
    return {
      iconName: 'MessageSquare',
      color: 'from-pink-500 to-purple-600',
      textColor: 'text-pink-400',
      shadowColor: 'rgba(219, 39, 119, 0.4)',
      label: 'Slack'
    };
  }
  if (name.includes('notifier') || name.includes('notification')) {
    return {
      iconName: 'Sparkles',
      color: 'from-amber-500 to-orange-500',
      textColor: 'text-amber-400',
      shadowColor: 'rgba(245, 158, 11, 0.4)',
      label: 'Notifier'
    };
  }
  return {
    iconName: 'Zap',
    color: 'from-slate-700 to-slate-800 border border-slate-700',
    textColor: 'text-indigo-400',
    shadowColor: 'rgba(99, 102, 241, 0.3)',
    label: toolName
  };
};

export const renderToolIcon = (iconName) => {
  switch (iconName) {
    case 'Layers': return <Layers className="w-5 h-5 text-white" />;
    case 'Cpu': return <Cpu className="w-5 h-5 text-white" />;
    case 'Zap': return <Zap className="w-5 h-5 text-white" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5 text-white" />;
    case 'Video': return <Video className="w-5 h-5 text-white" />;
    case 'Mic': return <Mic className="w-5 h-5 text-white" />;
    case 'Building': return <Building className="w-5 h-5 text-white" />;
    case 'Gift': return <Gift className="w-5 h-5 text-white" />;
    case 'Sliders': return <Sliders className="w-5 h-5 text-white" />;
    case 'Code': return <Code className="w-5 h-5 text-white" />;
    case 'Mail': return <Mail className="w-5 h-5 text-white" />;
    case 'FileText': return <FileText className="w-5 h-5 text-white" />;
    case 'Database': return <Database className="w-5 h-5 text-white" />;
    case 'Search': return <Search className="w-5 h-5 text-white" />;
    case 'CheckCircle2': return <CheckCircle2 className="w-5 h-5 text-white" />;
    case 'Globe': return <Globe className="w-5 h-5 text-white" />;
    case 'Key': return <Key className="w-5 h-5 text-white" />;
    case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-white" />;
    case 'UserCheck': return <UserCheck className="w-5 h-5 text-white" />;
    case 'Settings': return <Settings className="w-5 h-5 text-white" />;
    default: return <Zap className="w-5 h-5 text-white" />;
  }
};

export const getMockAiResponse = (prompt) => {
  const p = prompt || '';
  if (p.includes('avis client') || p.includes('établissement') || p.includes('GMB')) {
    let name = "Mon Établissement";
    const match = p.match(/établissement "([^"]+)"/) || p.match(/pour "([^"]+)"/);
    if (match) name = match[1];
    return `## 💬 Réponse Rédactionnelle Optimisée - AURA AI

Cher client,

Un immense merci pour votre retour d'expérience chaleureux concernant notre établissement ! Nous sommes ravis que notre équipe ait su répondre à vos attentes.

L'excellence de nos services au cœur de ${name} reste notre priorité absolue. Nous serons enchantés de vous accueillir à nouveau très prochainement pour vous faire découvrir nos dernières nouveautés.

À très bientôt !

*L'équipe de ${name}*

---
**💡 Optimisation SEO Local :**
- *Mots-clés insérés discrètement :* service client local, accueil chaleureux, équipe dévouée.
- *Impact local estimé :* Amélioration du score de pertinence locale (+12%).`;
  }

  if (p.includes('TikTok') || p.includes('script de vidéo courte') || p.includes('storyboard')) {
    let topic = "Création de contenu avec l'IA";
    const match = p.match(/thématique : "([^"]+)"/);
    if (match) topic = match[1];
    return `# 🎬 Script TikTok d'Élite - 60 Secondes Chrono

**Thématique :** ${topic}
**Ton :** Dynamique & Impactant

---

### ⏱️ Découpage Temporel & Storyboard

* **00:00 - 00:03 | Accroche (Hook)**
  * **Visuel :** Changement rapide de plan serré, grand geste vers la caméra.
  * **Audio (ElevenLabs Voice - 'Rachel') :** "Arrêtez de faire cette erreur monumentale tous les matins !"
  * **Prompt Midjourney v6 :** \`Close-up dynamic shot of an energetic entrepreneur showing a warning sign, neon tech style, 8k resolution --ar 9:16 --v 6.0\`

* **00:03 - 00:20 | Le Problème**
  * **Visuel :** Zoom progressif sur un écran affichant des tâches répétitives surchargées.
  * **Audio :** "90% des créateurs perdent 4 heures par jour sur des tâches répétitives qui n'apportent aucune valeur. C'est frustrant, n'est-ce pas ?"
  * **Prompt Midjourney v6 :** \`Tired worker looking at multiple glowing holographic screens, dark cyberpunk office, purple and blue ambient lighting --ar 9:16 --v 6.0\`

* **00:20 - 00:45 | La Solution (3 Points clés)**
  * **Visuel :** Textes animés en 3D à l'écran montrant les outils connectés.
  * **Audio :** "Voici comment AURA AI résout ça : 
    1. Automatisation des fiches avec l'IA.
    2. Scripts générés à la volée.
    3. Hub de commande centralisé."
  * **Prompt Midjourney v6 :** \`Abstract visualization of glowing artificial intelligence network nodes connecting, ultra futuristic aesthetic --ar 9:16 --v 6.0\`

* **00:45 - 00:60 | Appel à l'Action (CTA)**
  * **Visuel :** Pointage du doigt vers la biographie avec un badge AURA scintillant.
  * **Audio :** "Cliquez sur le lien dans ma bio pour obtenir votre accès anticipé gratuit dès aujourd'hui. Ne passez pas à côté !"
  * **Prompt Midjourney v6 :** \`Premium golden key glowing in a futuristic dark room, cinematic lighting, sleek design --ar 9:16 --v 6.0\`

---
**🎵 Recommandation Musique (Suno/Udio) :**
- Synthwave rythmée avec un BPM de 124, basses lourdes et nappes électroniques rétro-futuristes.`;
  }

  if (p.includes('architecture technique') || p.includes('SaaS') || p.includes('Lovable')) {
    let idea = "Micro-SaaS Plateforme";
    const match = p.match(/SaaS : "([^"]+)"/);
    if (match) idea = match[1];
    return `# 🛠️ Blueprint Technique & Architecture Micro-SaaS

**Concept :** ${idea}

---

### 📊 1. Modèle de Données (Prisma Schema)

\`\`\`prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

model User {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  projects  Project[]
}

model Project {
  id        String   @id @default(uuid())
  name      String
  status    String   @default("DRAFT")
  userId    String
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  createdAt DateTime @default(now())
}
\`\`\`

### 🛣️ 2. Routes d'API REST Principales (Next.js / Express)

- **\`GET /api/projects\`** : Récupérer tous les projets de l'utilisateur connecté.
- **\`POST /api/projects\`** : Créer un nouveau projet (limité par le plan Stripe).
- **\`DELETE /api/projects/[id]\`** : Supprimer un projet avec cascade.
- **\`POST /api/webhook/stripe\`** : Gérer les événements de paiement (inscription, annulation).

### 🤖 3. Prompts d'initiation Lovable.dev & Bolt.new

> **Prompt 1 (Init) :**
> "Créer une application React avec Tailwind CSS pour ${idea}. L'interface doit être un dashboard moderne avec un thème sombre cyberpunk, des graphiques interactifs (Recharts) pour suivre l'activité et un panneau latéral de navigation."

> **Prompt 2 (Intégration) :**
> "Ajoute une modale de configuration des clés API pour Stripe et Gemini, puis connecte-les à un backend simulé via le localStorage pour persister les états de l'utilisateur."

---
**🔌 Intégrations Make.com suggérées :**
- Déclencheur : webhook Stripe -> Action : Envoi d'email de bienvenue automatisé (via Resend) et création de ligne client dans Airtable.`;
  }

  if (p.includes('prospection') || p.includes('Cold Email') || p.includes('cible')) {
    let industry = "Entreprises";
    let valProp = "automatisation de processus";
    const matchInd = p.match(/cible "([^"]+)"/);
    const matchVal = p.match(/valeur : "([^"]+)"/) || p.match(/proposition de valeur : "([^"]+)"/);
    if (matchInd) industry = matchInd[1];
    if (matchVal) valProp = matchVal[1];
    return `# ✉️ Séquence Cold Emailing B2B - AURA Copywriting

**Cible :** ${industry}
**Valeur :** ${valProp}

---

### 📧 Email Principal (Premier Contact)

**Objet :** Améliorer l'efficacité de vos processus à ${industry} ?

Bonjour [Prénom],

Je me permets de vous contacter car j'ai remarqué que beaucoup d'acteurs du secteur de la/des ${industry} passent encore des heures chaque semaine à gérer ${valProp} manuellement.

Nous avons développé **AURA AI**, une solution intelligente conçue spécifiquement pour automatiser ces tâches complexes en quelques clics. Les premiers retours font état d'une baisse de 40% du temps de traitement opérationnel.

Seriez-vous ouvert à un rapide échange de 10 minutes ce jeudi à 14h pour voir si cela pourrait s'appliquer à votre structure ?

Bien cordialement,

*Votre Nom*  
*AURA Automation Specialist*

---

### 🕒 Email de Relance (J+3)

**Objet :** Re: Améliorer l'efficacité de vos processus à ${industry} ?

Bonjour [Prénom],

Je sais que votre temps est précieux. Je voulais simplement m'assurer que mon précédent email ne s'était pas perdu dans votre boîte de réception.

Pourriez-vous m'indiquer si l'optimisation de ${valProp} est un sujet d'intérêt pour vous ce trimestre ?

Excellente journée,

*Votre Nom*`;
  }

  if (p.includes('YouTube') || p.includes('vidéo YouTube')) {
    let topic = "Automatisation avec l'IA";
    let audience = "Créateurs et entrepreneurs";
    let duration = "10 min";
    const matchTop = p.match(/sujet : "([^"]+)"/);
    const matchAud = p.match(/Audience cible : "([^"]+)"/);
    const matchDur = p.match(/Durée prévue : "([^"]+)"/);
    if (matchTop) topic = matchTop[1];
    if (matchAud) audience = matchAud[1];
    if (matchDur) duration = matchDur[1];
    return `# 📺 Script Vidéo YouTube & Vignette

**Sujet :** ${topic}
**Audience :** ${audience}
**Format :** ${duration}

---

### 🎯 Propositions de Titres (CTR Opti)
1. *La méthode secrète pour maîtriser ${topic} en ${duration} !*
2. *Pourquoi 99% des gens échouent sur ${topic} (et comment l'éviter)*
3. *J'ai testé ${topic} pendant 30 jours : les résultats réels*

---

### 📝 Structure Narrative du Script

#### 🪝 1. L'Accroche / Hook (00:00 - 00:30)
* **Visuel :** Plan dynamique face caméra, graphiques animés montrant une courbe ascendante rapide.
* **Script :** "Si vous vous intéressez à ${topic}, vous avez probablement déjà rencontré ce problème majeur. Aujourd'hui, je vais briser les mythes et vous donner le guide ultime pas-à-pas."

#### 📚 2. Le Corps de la Vidéo
* **Chapitre 1 : Les Fondations indispensables (00:30 - 03:00)**
  * *Contenu :* Explication des concepts clés adaptés à un public ciblé de type ${audience}.
* **Chapitre 2 : La Mise en Pratique (03:00 - 07:00)**
  * *Contenu :* Démo en direct, exemples concrets, astuces peu connues.
* **Chapitre 3 : Les Pièges à éviter (07:00 - 09:30)**
  * *Contenu :* Ce que personne ne vous dit pour économiser du temps et de l'argent.

#### 🚪 3. Outro & Call to Action (09:30 - 10:00)
* **Script :** "Dites-moi en commentaire quelle partie vous a le plus surpris ! N'oubliez pas de liker et de vous abonner pour ne rien rater des prochaines analyses."

---

### 🖼️ Prompt de Vignette (Midjourney v6)
\`A glowing metallic sphere representing AI energy, floating above a workbench in a modern tech workshop, extreme depth of field, high contrast, cinematic lighting, 8k resolution --ar 16:9 --v 6.0\``;
  }

  if (p.includes('scénario') || p.includes('Make/n8n')) {
    let name = "Scénario AURA";
    const match = p.match(/Nom : "([^"]+)"/);
    if (match) name = match[1];
    return `# 🔗 Rapport de Liaison & Blueprint d'Intégration AURA

**Scénario :** ${name}

---

### 📋 1. Résumé Exécutif
Ce workflow interconnecte automatiquement les différents outils configurés dans votre panneau AURA. Il permet de synchroniser les flux de données métiers sans intervention humaine, assurant un gain de temps massif et éliminant tout risque d'erreur de saisie.

### ⚙️ 2. Rapport Technique de Liaison
Les modules suivants ont été configurés et liés avec succès dans le hub AURA.

### 🧬 3. Blueprint JSON pour Make / n8n
Vous pouvez copier l'objet JSON ci-dessous et l'importer directement dans votre espace de travail Make.com ou n8n pour déployer le flux instantanément.

\`\`\`json
{
  "name": "${name} - Production Link",
  "nodes": [
    {
      "id": "trigger-1",
      "type": "webhook",
      "name": "Webhook Entrant AURA",
      "parameters": {
        "path": "/v1/webhook/incoming"
      }
    },
    {
      "id": "router-1",
      "type": "router",
      "name": "Routage Intelligent",
      "parameters": {
        "conditions": []
      }
    }
  ],
  "connections": {
    "trigger-1": {
      "main": [
        [
          {
            "node": "router-1",
            "type": "main",
            "index": 0
          }
        ]
      ]
    }
  }
}
\`\`\`

### ✅ 4. Conformité & Statut de Liaison
- **Statut global :** Connecté & Actif
- **Intégrité du flux :** 100% opérationnel
- **Test de charge simulé :** Validé (0ms de latence de transit)`;
  }

  return `## Résultat de Simulation AURA AI

Votre requête a été traitée en mode simulation hors-ligne.

**Prompt reçu :**
"${p.substring(0, 100)}..."

**Recommandation :** Configurez votre clé d'API réelle Gemini dans l'onglet des configurations pour déverrouiller la génération dynamique en direct.`;
};
