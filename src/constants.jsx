// ==========================================
// SCÉNARIOS DE DÉPART DE L'APPLICATION
// =========================================
export const INITIAL_SCENARIOS = [
  // --- RESTAURANTS & COMMERCES PHYSIQUES ---
  {
    id: "gmb-responder",
    name: "GMB Auto-Pilot Responder",
    steps: [
      { id: "step-1", tool: "Google Business Profile Manager AI", action: "Détecter l'avis client entrant sur Google Business Profile." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Générer une réponse ultra-qualitative optimisée pour le SEO local." },
      { id: "step-3", tool: "Make.com (Integromat)", action: "Envoyer la réponse automatiquement à l'API Google Business Profile." }
    ]
  },
  {
    id: "restaurant-feedback",
    name: "Restaurant Feedback & Promo Loop",
    steps: [
      { id: "step-1", tool: "Make.com (Integromat)", action: "Détecter une addition réglée via SumUp ou Stripe Terminal." },
      { id: "step-2", tool: "n8n.io Workflow", action: "Envoyer un SMS demandant un retour client 30 minutes après le repas." },
      { id: "step-3", tool: "Claude 3.5 Sonnet / Opus", action: "Analyser l'avis : si positif (+4★), rediriger vers Google Maps ; si négatif, offrir un bon de réduction." }
    ]
  },
  {
    id: "restaurant-menu",
    name: "Interactive Restaurant Menu",
    steps: [
      { id: "step-1", tool: "Midjourney v6", action: "Créer des photos culinaires haut de gamme pour les plats de la carte." },
      { id: "step-2", tool: "OpenAI GPT-4o / o3", action: "Rédiger des descriptions d'ingrédients gourmandes axées sur le terroir." },
      { id: "step-3", tool: "Lovable.dev", action: "Développer l'application de menu interactif accessible par QR Code." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Mettre à jour automatiquement le menu sur la fiche Google Maps." }
    ]
  },

  // --- CRÉATION DE CONTENU & RÉSEAUX SOCIAUX ---
  {
    id: "tiktok-production",
    name: "TikTok Faceless Video Generator",
    steps: [
      { id: "step-1", tool: "Perplexity AI Pro", action: "Rechercher des faits historiques insolites ou des tendances virales." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Rédiger un script de 60 secondes avec accroche forte et rythme soutenu." },
      { id: "step-3", tool: "ElevenLabs Voice Engine", action: "Synthétiser la voix off avec le profil de voix 'Rachel' en français." },
      { id: "step-4", tool: "Midjourney v6", action: "Générer les visuels correspondants pour chaque scène du script." },
      { id: "step-5", tool: "Runway Gen-3 Alpha", action: "Animer les images fixes pour créer des plans cinématiques." }
    ]
  },
  {
    id: "youtube-automation",
    name: "YouTube Faceless Channel",
    steps: [
      { id: "step-1", tool: "DeepSeek R1 / V3", action: "Analyser les tendances actuelles et rédiger le script complet de la vidéo." },
      { id: "step-2", tool: "ElevenLabs Voice Engine", action: "Générer la voix off synthétique avec un ton captivant et dynamique." },
      { id: "step-3", tool: "Flux.1 (Black Forest Labs)", action: "Générer une vignette YouTube percutante en ultra-haute résolution." },
      { id: "step-4", tool: "Runway Gen-3 Alpha", action: "Animer les images clés du script pour générer les séquences vidéo." },
      { id: "step-5", tool: "Make.com (Integromat)", action: "Publier la vidéo automatiquement sur YouTube avec optimisation SEO." }
    ]
  },
  {
    id: "podcast-editor",
    name: "Podcast Snippets Generator",
    steps: [
      { id: "step-1", tool: "Descript Editor", action: "Importer et retranscrire l'enregistrement audio complet du podcast." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Sélectionner les 3 citations les plus engageantes pour les réseaux sociaux." },
      { id: "step-3", tool: "Veed.io", action: "Générer les clips verticaux enrichis de sous-titres animés esthétiques." },
      { id: "step-4", tool: "Activepieces", action: "Publier automatiquement les clips sur TikTok, YouTube Shorts et Instagram Reels." }
    ]
  },
  {
    id: "video-dubbing",
    name: "Automated Video Dubbing",
    steps: [
      { id: "step-1", tool: "Descript Editor", action: "Extraire l'audio d'origine et générer la transcription horodatée." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Traduire le script de la vidéo tout en préservant le sens culturel." },
      { id: "step-3", tool: "ElevenLabs Voice Engine", action: "Générer la voix off traduite en clonant l'empreinte vocale originale." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Assembler le nouveau doublage et synchroniser les mouvements des lèvres." }
    ]
  },
  {
    id: "linkedin-authority",
    name: "LinkedIn Thought Leadership Engine",
    steps: [
      { id: "step-1", tool: "Perplexity AI Pro", action: "Faire une veille stratégique quotidienne sur l'actualité tech/business." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Générer des publications LinkedIn impactantes et engageantes." },
      { id: "step-3", tool: "Flux.1 (Black Forest Labs)", action: "Générer une infographie ou un visuel pro assorti au post." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Programmer la publication sur le profil du dirigeant." }
    ]
  },

  // --- SAAS & DÉVELOPPEMENT WEB ---
  {
    id: "saas-launch",
    name: "SaaS Launch Roadmap",
    steps: [
      { id: "step-1", tool: "Lovable.dev", action: "Générer l'interface utilisateur et le dashboard client à partir d'un prompt initial." },
      { id: "step-2", tool: "Bolt.new", action: "Configurer la base de données relationnelle et les routes d'API." },
      { id: "step-3", tool: "Stripe", action: "Mettre en place la page de tarification et l'abonnement mensuel récurrent." }
    ]
  },
  {
    id: "saas-onboarding",
    name: "SaaS User Onboarding Optimizer",
    steps: [
      { id: "step-1", tool: "n8n.io Workflow", action: "Détecter l'inscription d'un nouvel utilisateur dans l'application SaaS." },
      { id: "step-2", tool: "OpenAI GPT-4o / o3", action: "Personnaliser les e-mails d'onboarding selon le secteur d'activité renseigné." },
      { id: "step-3", tool: "Make.com (Integromat)", action: "Planifier l'envoi de conseils d'utilisation à J+1, J+3 et J+7 par e-mail." },
      { id: "step-4", tool: "Activepieces", action: "Alerter le support technique sur Slack si l'utilisateur est inactif après 48h." }
    ]
  },

  // --- MARKETING B2B & PROSPECTION ---
  {
    id: "b2b-outreach",
    name: "B2B Cold Outreach Campaign",
    steps: [
      { id: "step-1", tool: "Claude 3.5 Sonnet / Opus", action: "Extraire et qualifier les prospects B2B de LinkedIn Sales Navigator." },
      { id: "step-2", tool: "Google Gemini Omni / Astra", action: "Rédiger un e-mail de prospection ultra-personnalisé selon le profil du lead." },
      { id: "step-3", tool: "Make.com (Integromat)", action: "Intégrer les leads qualifiés et lancer la séquence automatisée d'envoi." },
      { id: "step-4", tool: "n8n.io Workflow", action: "Notifier Slack instantanément lors d'une réponse positive du prospect." }
    ]
  },
  {
    id: "lead-magnet",
    name: "Interactive Lead Magnet Funnel",
    steps: [
      { id: "step-1", tool: "Lovable.dev", action: "Concevoir une landing page interactive et son formulaire de capture d'e-mail." },
      { id: "step-2", tool: "n8n.io Workflow", action: "Déclencher un audit automatique de la présence web dès la soumission du formulaire." },
      { id: "step-3", tool: "Claude 3.5 Sonnet / Opus", action: "Compiler les données d'audit dans un rapport PDF personnalisé de 5 pages." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Envoyer le rapport par email et insérer le lead dans le CRM ActiveCampaign." }
    ]
  },
  {
    id: "sponsor-outreach",
    name: "Sponsorship Outreach Engine",
    steps: [
      { id: "step-1", tool: "Perplexity AI Pro", action: "Identifier les marques actives en sponsoring de contenu dans la même niche." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Rédiger un email d'approche mettant en avant la portée et le taux de clic." },
      { id: "step-3", tool: "Activepieces", action: "Planifier l'envoi de la séquence et la facturation automatique via Stripe Billing." }
    ]
  },
  {
    id: "voice-outreach",
    name: "AI Voice Lead Qualification",
    steps: [
      { id: "step-1", tool: "Claude 3.5 Sonnet / Opus", action: "Analyser les leads entrants pour rédiger un brief de qualification contextualisé." },
      { id: "step-2", tool: "ElevenLabs Voice Engine", action: "Paramétrer un agent vocal virtuel doté d'une voix réaliste et chaleureuse." },
      { id: "step-3", tool: "n8n.io Workflow", action: "Lancer l'appel automatique de qualification via l'intégration Bland.ai." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Enregistrer la retranscription et qualifier le prospect dans HubSpot CRM." }
    ]
  },

  // --- IMMOBILIER & HOSPITALITÉ ---
  {
    id: "real-estate",
    name: "AI Real-Estate Listing Generator",
    steps: [
      { id: "step-1", tool: "Google Gemini Omni / Astra", action: "Scraper et détecter les nouvelles annonces immobilières locales de particulier à particulier." },
      { id: "step-2", tool: "Midjourney v6", action: "Générer des visuels d'aménagement d'intérieur (virtual home staging) professionnels." },
      { id: "step-3", tool: "Claude 3.5 Sonnet / Opus", action: "Rédiger une description d'annonce attractive et optimisée pour le SEO immobilier." },
      { id: "step-4", tool: "Activepieces", action: "Programmer et publier l'annonce sur l'ensemble des réseaux de l'agence." }
    ]
  },
  {
    id: "airbnb-host",
    name: "Airbnb Guest Welcomer",
    steps: [
      { id: "step-1", tool: "Make.com (Integromat)", action: "Détecter une nouvelle réservation d'hébergement confirmée sur la plateforme." },
      { id: "step-2", tool: "OpenAI GPT-4o / o3", action: "Rédiger les instructions d'arrivée et d'accès dans la langue du voyageur." },
      { id: "step-3", tool: "Leonardo.ai", action: "Générer un plan visuel de stationnement et d'accès à la boîte à clés." },
      { id: "step-4", tool: "n8n.io Workflow", action: "Envoyer le guide d'accueil par e-mail et WhatsApp 24 heures avant l'arrivée." }
    ]
  },
  {
    id: "rental-yield",
    name: "Rental Yield Predictor & Report",
    steps: [
      { id: "step-1", tool: "Perplexity AI Pro", action: "Rechercher la tendance des loyers et le prix au m² dans la zone ciblée." },
      { id: "step-2", tool: "DeepSeek R1 / V3", action: "Calculer le rendement brut/net et simuler le cashflow mensuel attendu." },
      { id: "step-3", tool: "Claude 3.5 Sonnet / Opus", action: "Rédiger une fiche technique d'investissement claire pour les acquéreurs." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Compiler en PDF sur le Drive et envoyer l'alerte immobilière par e-mail." }
    ]
  },

  // --- E-COMMERCE & PUBLICITÉ ---
  {
    id: "ecom-ads",
    name: "E-Commerce Copywriting & Ads",
    steps: [
      { id: "step-1", tool: "Perplexity AI Pro", action: "Analyser les avis négatifs des concurrents pour en tirer des angles publicitaires." },
      { id: "step-2", tool: "OpenAI GPT-4o / o3", action: "Rédiger 5 déclinaisons de textes publicitaires pour Facebook & TikTok Ads." },
      { id: "step-3", tool: "Flux.1 (Black Forest Labs)", action: "Créer des rendus de produits en studio publicitaire d'un réalisme parfait." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Lancer automatiquement les groupes d'annonces publicitaires via l'API Meta Ads." }
    ]
  },
  {
    id: "ecom-winback",
    name: "E-Commerce Customer Winback Flow",
    steps: [
      { id: "step-1", tool: "n8n.io Workflow", action: "Identifier les clients Shopify n'ayant pas passé commande depuis 90 jours." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Rédiger un email ciblé basé sur leur dernière catégorie d'achat." },
      { id: "step-3", tool: "Midjourney v6", action: "Générer un visuel promotionnel exclusif adapté aux intérêts du client." },
      { id: "step-4", tool: "Activepieces", action: "Déclencher l'envoi de la campagne e-mail (Klaviyo) et d'un code promo par SMS." }
    ]
  },
  {
    id: "testimonial-widget",
    name: "Interactive Testimonial Collector",
    steps: [
      { id: "step-1", tool: "Lovable.dev", action: "Générer un widget dynamique de récolte d'avis clients à insérer sur les sites." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Qualifier la polarité de l'avis client et extraire les points d'amélioration." },
      { id: "step-3", tool: "Magnific AI", action: "Sublimer la qualité des photos de profils clients associées aux avis reçus." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Publier les avis positifs sur le site web et inciter à laisser un avis GBP." }
    ]
  },

  // --- RECRUTEMENT & RESSOURCES HUMAINES ---
  {
    id: "hr-screener",
    name: "Recruitment & HR Screening",
    steps: [
      { id: "step-1", tool: "Make.com (Integromat)", action: "Récupérer automatiquement les candidatures reçues par e-mail ou via Indeed." },
      { id: "step-2", tool: "Google Gemini Omni / Astra", action: "Analyser les CVs reçus pour extraire les compétences clés et les diplômes." },
      { id: "step-3", tool: "Claude 3.5 Sonnet / Opus", action: "Comparer le profil avec la fiche de poste et attribuer une note de pertinence." },
      { id: "step-4", tool: "n8n.io Workflow", action: "Programmer un entretien vidéo sur Google Meet si le score de matching dépasse 80%." }
    ]
  },

  // --- SUPPORT & SERVICE CLIENT ---
  {
    id: "support-agent",
    name: "Smart Customer Support Agent",
    steps: [
      { id: "step-1", tool: "Zapier Platform", action: "Intercepter les tickets d'assistance client entrants sur Zendesk ou Intercom." },
      { id: "step-2", tool: "OpenAI GPT-4o / o3", action: "Analyser l'urgence et détecter le sentiment général du client." },
      { id: "step-3", tool: "Groq LPU Cloud", action: "Rechercher dans la documentation technique et générer une réponse en <1s." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Renvoyer la réponse au client et mettre à jour le statut du ticket." }
    ]
  },

  // --- JURIDIQUE & CONFORMITÉ ---
  {
    id: "legal-reviewer",
    name: "AI Legal Contract Reviewer",
    steps: [
      { id: "step-1", tool: "n8n.io Workflow", action: "Détecter le téléversement d'un nouveau contrat commercial dans le Drive." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Extraire les clauses de résiliation, d'indemnisation et de responsabilité." },
      { id: "step-3", tool: "DeepSeek R1 / V3", action: "Identifier les risques légaux cachés et suggérer des rédactions alternatives." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Générer un tableau de synthèse PDF des risques et l'envoyer au pôle juridique." }
    ]
  },
  {
    id: "gdpr-compliance",
    name: "Automated GDPR Compliance Audit",
    steps: [
      { id: "step-1", tool: "Google Gemini Omni / Astra", action: "Scraper et analyser les pages légales (CGV, vie privée) du site d'un client." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Lister les manquements RGPD et cartographier l'utilisation des cookies." },
      { id: "step-3", tool: "n8n.io Workflow", action: "Mettre en forme le rapport de conformité sous forme de document PDF complet." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Alerter l'équipe produit sur Slack et envoyer l'audit finalisé au client." }
    ]
  },

  // --- SANTÉ & MÉDICAL ---
  {
    id: "medical-followup",
    name: "Medical Consultation Autopilot",
    steps: [
      { id: "step-1", tool: "Activepieces", action: "Récupérer la liste quotidienne des patients ayant consulté depuis le logiciel métier." },
      { id: "step-2", tool: "Google Gemini Omni / Astra", action: "Créer un SMS de suivi personnalisé contenant des conseils de soin préventifs." },
      { id: "step-3", tool: "n8n.io Workflow", action: "Expédier le SMS de suivi de manière automatisée via l'intégration Twilio." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Planifier un rappel de rendez-vous de contrôle dans l'agenda médical." }
    ]
  },

  // --- VEILLE & ANALYSE DE MARCHÉ ---
  {
    id: "market-sentiment",
    name: "Market Sentiment Reporter",
    steps: [
      { id: "step-1", tool: "Perplexity AI Pro", action: "Analyser les flux d'actualités financières et les posts sur les réseaux sociaux." },
      { id: "step-2", tool: "DeepSeek R1 / V3", action: "Calculer un indice de sentiment du marché crypto et boursier en temps réel." },
      { id: "step-3", tool: "Google Gemini Omni / Astra", action: "Rédiger une synthèse de marché de 400 mots pour les investisseurs." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Envoyer le flash financier quotidien sur le canal Telegram premium." }
    ]
  },

  // --- RÉFÉRENCEMENT & CONTENU WEB ---
  {
    id: "newsletter-repurpose",
    name: "Newsletter & Content Repurposing",
    steps: [
      { id: "step-1", tool: "Claude 3.5 Sonnet / Opus", action: "Analyser la transcription d'une vidéo YouTube de 15 minutes." },
      { id: "step-2", tool: "SEOWriting.ai", action: "Rédiger un article de blog structuré et optimisé SEO de 2500 mots." },
      { id: "step-3", tool: "OpenAI GPT-4o / o3", action: "Générer une newsletter synthétique et 5 publications pour LinkedIn." },
      { id: "step-4", tool: "Activepieces", action: "Programmer la publication sur WordPress et automatiser l'envoi de la newsletter." }
    ]
  },
  {
    id: "local-seo",
    name: "Local SEO Citations Autopilot",
    steps: [
      { id: "step-1", tool: "Google Business Profile Manager AI", action: "Analyser les positions SEO localisées du commerce dans sa zone géographique." },
      { id: "step-2", tool: "SEOWriting.ai", action: "Rédiger 3 fiches de services optimisées sur les requêtes géociblées." },
      { id: "step-3", tool: "Make.com (Integromat)", action: "Créer automatiquement des citations géolocalisées sur les annuaires locaux." },
      { id: "step-4", tool: "Activepieces", action: "Publier les mises à jour et les nouvelles offres de services sur Google Maps." }
    ]
  },

  // --- ÉDUCATION & ENSEIGNEMENT EN LIGNE ---
  {
    id: "online-course",
    name: "Online Course Content Builder",
    steps: [
      { id: "step-1", tool: "Claude 3.5 Sonnet / Opus", action: "Concevoir le programme de formation structuré en 8 modules thématiques." },
      { id: "step-2", tool: "SEOWriting.ai", action: "Générer les scripts de cours complets et les quiz de validation pour chaque module." },
      { id: "step-3", tool: "ElevenLabs Voice Engine", action: "Synthétiser la voix du formateur pour sonoriser les diaporamas du cours." },
      { id: "step-4", tool: "Lovable.dev", action: "Créer la plateforme LMS d'apprentissage en ligne pour les étudiants." }
    ]
  },
  {
    id: "course-certification",
    name: "AI Course Certification Autopilot",
    steps: [
      { id: "step-1", tool: "Claude 3.5 Sonnet / Opus", action: "Générer un examen final interactif de 20 questions d'après les vidéos de cours." },
      { id: "step-2", tool: "Lovable.dev", action: "Développer l'application web d'évaluation et de notation automatisée." },
      { id: "step-3", tool: "n8n.io Workflow", action: "Générer un certificat de réussite PDF dynamique si le score atteint 85%." },
      { id: "step-4", tool: "Make.com (Integromat)", action: "Délivrer le certificat par e-mail et insérer l'étudiant dans l'annuaire des certifiés." }
    ]
  },

  // --- SPORT & BIEN-ÊTRE ---
  {
    id: "gym-lead-flow",
    name: "Gym Lead Reactivation Campaign",
    steps: [
      { id: "step-1", tool: "Make.com (Integromat)", action: "Extraire les anciens clients inactifs depuis le logiciel de planning (Mindbody/Deciplus)." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Générer une offre personnalisée de réactivation (1 séance offerte + bilan corporel)." },
      { id: "step-3", tool: "n8n.io Workflow", action: "Envoyer l'invitation par SMS (Twilio) et programmer un rappel WhatsApp interactif." },
      { id: "step-4", tool: "Google Gemini Omni / Astra", action: "Traiter les confirmations de réponse et réserver le créneau dans l'agenda du coach." }
    ]
  },

  // --- ARTISANAT & SERVICES À DOMICILE ---
  {
    id: "artisan-quote-builder",
    name: "AI Estimate & Quote Generator",
    steps: [
      { id: "step-1", tool: "Make.com (Integromat)", action: "Récupérer la description de la panne et la photo du problème envoyées par le client." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Analyser l'image du sinistre pour identifier le problème matériel et estimer la main d'œuvre." },
      { id: "step-3", tool: "n8n.io Workflow", action: "Générer le devis PDF officiel via Invoice Ninja et le soumettre par mail pour signature." }
    ]
  },

  // --- ÉVÉNEMENTIEL ---
  {
    id: "webinar-autopilot",
    name: "Webinar Funnel & Engagement Engine",
    steps: [
      { id: "step-1", tool: "Lovable.dev", action: "Concevoir la landing page d'inscription et l'espace de diffusion en direct." },
      { id: "step-2", tool: "Claude 3.5 Sonnet / Opus", action: "Rédiger la séquence d'emails de relance de J-5 à H-10min pour maximiser le taux de présence." },
      { id: "step-3", tool: "Activepieces", action: "Diffuser des notifications par SMS et inviter à rejoindre la salle Zoom/Meet." },
      { id: "step-4", tool: "OpenAI GPT-4o / o3", action: "Modérer et synthétiser les questions du chat en cours de direct pour l'animateur." }
    ]
  },

  // --- PRICING & VEILLE TARIFAIRE ---
  {
    id: "competitor-price",
    name: "AI Competitor Pricing Monitor",
    steps: [
      { id: "step-1", tool: "Perplexity AI Pro", action: "Scraper quotidiennement les fiches produits des concurrents cibles." },
      { id: "step-2", tool: "DeepSeek R1 / V3", action: "Ajuster nos prix de vente selon notre marge cible (ex: s'aligner à -1% du concurrent)." },
      { id: "step-3", tool: "Make.com (Integromat)", action: "Mettre à jour la base de données et la boutique Shopify en temps réel." },
      { id: "step-4", tool: "n8n.io Workflow", action: "Notifier l'équipe marketing par Slack de la mise à jour des prix." }
    ]
  },
  {
    id: "invoice-extraction",
    name: "Agent d'extraction de factures",
    category: "Finance & Comptabilité",
    steps: [
      { id: "step-1", tool: "google-email", action: "Récupérer la facture reçue par e-mail." },
      { id: "step-2", tool: "agent local d'IA", action: "Extraire les informations clés (fournisseur, montant, TVA, date) avec l'IA." },
      { id: "step-3", tool: "Google Sheets", action: "Enregistrer les données extraites dans une feuille de calcul." },
      { id: "step-4", tool: "util", action: "Classer la facture dans le bon répertoire local." }
    ]
  },
  {
    id: "receipt-extraction",
    name: "Agent d'extraction de reçus",
    category: "Finance & Comptabilité",
    steps: [
      { id: "step-1", tool: "google-email", action: "Récupérer le reçu ou ticket de caisse reçu par e-mail." },
      { id: "step-2", tool: "agent local d'IA", action: "Analyser l'image ou le PDF du reçu pour en extraire le marchand, la date et le montant." },
      { id: "step-3", tool: "Google Sheets", action: "Ajouter une ligne de note de frais dans la feuille de suivi." },
      { id: "step-4", tool: "util", action: "Archiver le reçu avec un nom normalisé." }
    ]
  },
  {
    id: "trend-detection",
    name: "Agent de détection des tendances",
    category: "Veille & Marché",
    steps: [
      { id: "step-1", tool: "faire-ai-recherche-web", action: "Rechercher sur le web les sujets et mots-clés émergents." },
      { id: "step-2", tool: "agent local d'IA", action: "Analyser les données collectées pour dégager les tendances fortes." },
      { id: "step-3", tool: "Google Docs", action: "Rédiger un rapport de synthèse des tendances détectées." },
      { id: "step-4", tool: "util", action: "Formater et exporter le rapport final." }
    ]
  },
  {
    id: "customer-feedback",
    name: "Agent de retour client",
    category: "Support & Service Client",
    steps: [
      { id: "step-1", tool: "google-forms", action: "Récupérer les nouveaux commentaires clients soumis via le formulaire." },
      { id: "step-2", tool: "agent local d'IA", action: "Analyser le sentiment (positif, neutre, négatif) du commentaire." },
      { id: "step-3", tool: "mou", action: "Alerter l'équipe sur Slack si un retour négatif est détecté." },
      { id: "step-4", tool: "google-email", action: "Envoyer un e-mail automatique d'excuses ou de suivi au client." }
    ]
  },
  {
    id: "access-request",
    name: "Agent de demande d'accès",
    category: "Ressources Humaines",
    steps: [
      { id: "step-1", tool: "mou", action: "Recevoir la demande d'accès d'un employé via le canal Slack." },
      { id: "step-2", tool: "agent local d'IA", action: "Vérifier la légitimité et le niveau d'autorisation requis." },
      { id: "step-3", tool: "Google Sheets", action: "Mettre à jour le registre d'accès des employés." },
      { id: "step-4", tool: "google-email", action: "Envoyer les accès configurés ou notifier l'approbation." }
    ]
  },
  {
    id: "email-summary",
    name: "Agent de résumé de courriel",
    category: "Productivité",
    steps: [
      { id: "step-1", tool: "google-email", action: "Récupérer tous les e-mails non lus de la boîte de réception." },
      { id: "step-2", tool: "agent local d'IA", action: "Résumer les messages et les classer par ordre de priorité." },
      { id: "step-3", tool: "util", action: "Formater la liste ordonnée des résumés." },
      { id: "step-4", tool: "google-email", action: "Envoyer le récapitulatif synthétique à l'adresse spécifiée." }
    ]
  },
  {
    id: "hr-onboarding-qa",
    name: "Agent de questions et réponses sur l'intégration RH",
    category: "Ressources Humaines",
    steps: [
      { id: "step-1", tool: "mou", action: "Recevoir la question du nouvel employé sur Slack." },
      { id: "step-2", tool: "connaissance", action: "Rechercher la réponse dans la base de connaissances RH de l'entreprise." },
      { id: "step-3", tool: "agent local d'IA", action: "Formuler une réponse claire, chaleureuse et personnalisée." },
      { id: "step-4", tool: "mou", action: "Envoyer la réponse directement à l'employé." }
    ]
  },
  {
    id: "market-research",
    name: "Agent d'études de marché",
    category: "Veille & Marché",
    steps: [
      { id: "step-1", tool: "faire-ai-recherche-web", action: "Scraper et rechercher des informations sur le marché cible sur le web." },
      { id: "step-2", tool: "agent local d'IA", action: "Analyser le positionnement et synthétiser les données d'études." },
      { id: "step-3", tool: "Google Docs", action: "Générer un rapport d'étude de marché complet et structuré." },
      { id: "step-4", tool: "util", action: "Sauvegarder et exporter le rapport final." }
    ]
  },
  {
    id: "sales-coaching",
    name: "Agent de coaching des ventes",
    category: "Ventes & CRM",
    steps: [
      { id: "step-1", tool: "Google Sheets", action: "Lire les transcriptions ou logs des appels de vente." },
      { id: "step-2", tool: "connaissance", action: "Comparer avec les meilleures pratiques de vente enregistrées." },
      { id: "step-3", tool: "agent local d'IA", action: "Identifier les points forts et les axes d'amélioration du commercial." },
      { id: "step-4", tool: "Google Docs", action: "Générer une fiche de feedback personnalisée pour le coaching." }
    ]
  },
  {
    id: "document-agent",
    name: "Agent de documents",
    category: "Productivité",
    steps: [
      { id: "step-1", tool: "faire-ai-recherche-web", action: "Rechercher des modèles ou informations de référence." },
      { id: "step-2", tool: "agent local d'IA", action: "Analyser et structurer le contenu du nouveau document." },
      { id: "step-3", tool: "Google Docs", action: "Créer et formater le document automatiquement dans Google Drive." }
    ]
  },
  {
    id: "competitor-price-monitor",
    name: "Agent de surveillance des prix de la concurrence",
    category: "Pricing & Veille",
    steps: [
      { id: "step-1", tool: "http", action: "Récupérer les pages produits des sites concurrents via des requêtes HTTP." },
      { id: "step-2", tool: "agent local d'IA", action: "Extraire les prix actuels et détecter les changements par rapport à l'historique." },
      { id: "step-3", tool: "util", action: "Mettre à jour le fichier d'historique des prix." },
      { id: "step-4", tool: "mou", action: "Alerter l'équipe en cas de baisse de prix de la concurrence." }
    ]
  },
  {
    id: "contract-data-extractor",
    name: "Agent d'extraction de données contractuelles",
    category: "Juridique & Conformité",
    steps: [
      { id: "step-1", tool: "mou", action: "Recevoir un contrat partagé dans la conversation Slack." },
      { id: "step-2", tool: "agent local d'IA", action: "Analyser les clauses juridiques, dates d'expiration et montants." },
      { id: "step-3", tool: "Google Docs", action: "Générer une fiche de synthèse du contrat dans Google Docs." }
    ]
  },
  {
    id: "icp-content-alignment",
    name: "Agent d'alignement de contenu ICP",
    category: "Création de Contenu",
    steps: [
      { id: "step-1", tool: "mou", action: "Récupérer le projet de contenu soumis par un rédacteur." },
      { id: "step-2", tool: "connaissance", action: "Consulter la fiche descriptive du profil client idéal (ICP) de l'entreprise." },
      { id: "step-3", tool: "agent local d'IA", action: "Vérifier si le contenu cible les bonnes problématiques de l'ICP." },
      { id: "step-4", tool: "mou", action: "Renvoyer le verdict et des suggestions d'optimisation." }
    ]
  },
  {
    id: "agent-firewall",
    name: "Pare-feu d'agent",
    category: "Sécurité",
    steps: [
      { id: "step-1", tool: "porte", action: "Intercepter le prompt ou message entrant destiné à l'agent." },
      { id: "step-2", tool: "agent local d'IA", action: "Analyser le message pour détecter d'éventuelles injections SQL/LLM ou fuites." },
      { id: "step-3", tool: "json", action: "Formater la réponse d'évaluation de sécurité." },
      { id: "step-4", tool: "porte", action: "Bloquer le message suspect ou le transmettre nettoyé à l'agent final." }
    ]
  },
  {
    id: "ticket-triage",
    name: "Agent de triage des billets",
    category: "SaaS & Développement",
    steps: [
      { id: "step-1", tool: "linéaire", action: "Récupérer les nouveaux tickets non triés de l'arriéré dans Linear." },
      { id: "step-2", tool: "agent local d'IA", action: "Analyser la sévérité et attribuer les labels / priorités adaptés." },
      { id: "step-3", tool: "util", action: "Mettre à jour le statut et réassigner le ticket au bon développeur." }
    ]
  },
  {
    id: "lead-researcher",
    name: "Agent de recherche principal",
    category: "Prospection & B2B",
    steps: [
      { id: "step-1", tool: "mou", action: "Recevoir le nom du prospect ou de l'entreprise cible." },
      { id: "step-2", tool: "faire-ai-recherche-web", action: "Rechercher l'actualité récente et le profil public de l'entreprise." },
      { id: "step-3", tool: "http", action: "Récupérer les détails clés du site de l'entreprise." },
      { id: "step-4", tool: "agent local d'IA", action: "Synthétiser un pitch personnalisé et un résumé sur le prospect." }
    ]
  },
  {
    id: "customer-order-management",
    name: "Agent de gestion des commandes clients",
    category: "E-Commerce & Publicité",
    steps: [
      { id: "step-1", tool: "mou", action: "Recevoir une demande de statut de commande par chat." },
      { id: "step-2", tool: "Shopify", action: "Rechercher les informations de la commande correspondante." },
      { id: "step-3", tool: "agent local d'IA", action: "Formuler la réponse sur l'avancement de la livraison." },
      { id: "step-4", tool: "mou", action: "Renvoyer les informations de suivi à l'utilisateur." }
    ]
  },
  {
    id: "event-communication",
    name: "Agent de communication événementielle",
    category: "Événementiel",
    steps: [
      { id: "step-1", tool: "mou", action: "Recevoir une question logistique ou sur le programme de l'événement." },
      { id: "step-2", tool: "apify", action: "Scraper ou chercher les informations à jour sur la page de l'événement." },
      { id: "step-3", tool: "agent local d'IA", action: "Synthétiser la réponse en fonction de l'agenda officiel." },
      { id: "step-4", tool: "mou", action: "Répondre instantanément au participant." }
    ]
  },
  {
    id: "brand-voice-consistency",
    name: "Agent de cohérence de la voix de la marque",
    category: "Création de Contenu",
    steps: [
      { id: "step-1", tool: "mou", action: "Récupérer le texte d'interface (microcopie, tooltip) rédigé." },
      { id: "step-2", tool: "connaissance", action: "Consulter la charte éditoriale et le glossaire de marque." },
      { id: "step-3", tool: "agent local d'IA", action: "Reformuler le texte pour correspondre exactement au ton de la marque." },
      { id: "step-4", tool: "mou", action: "Livrer la version optimisée." }
    ]
  },
  {
    id: "content-draft-creator",
    name: "Créateur de brouillons de contenu",
    category: "Création de Contenu",
    steps: [
      { id: "step-1", tool: "mou", action: "Recevoir la demande d'écriture et les instructions initiales sur Slack." },
      { id: "step-2", tool: "faire-ai-recherche-web", action: "Faire des recherches complémentaires sur le sujet." },
      { id: "step-3", tool: "agent local d'IA", action: "Générer un premier jet structuré selon le format choisi." },
      { id: "step-4", tool: "Google Sheets", action: "Consigner la création dans le calendrier éditorial." },
      { id: "step-5", tool: "Google Docs", action: "Créer le document prêt pour édition dans Google Docs." }
    ]
  },
  {
    id: "slack-search-agent",
    name: "Agent de recherche Slack",
    category: "Productivité",
    steps: [
      { id: "step-1", tool: "mou", action: "Intercepter une nouvelle question sur le canal public." },
      { id: "step-2", tool: "agent local d'IA", action: "Rechercher et analyser les messages passés traitant du même sujet." },
      { id: "step-3", tool: "mou", action: "Afficher les liens vers les fils de discussion historiques correspondants." }
    ]
  },
  {
    id: "production-release-automation",
    name: "Agent d'automatisation de la mise en production",
    category: "SaaS & Développement",
    steps: [
      { id: "step-1", tool: "Jira", action: "Extraire les tickets validés de la prochaine release." },
      { id: "step-2", tool: "agent local d'IA", action: "Vulgariser les aspects techniques en fonctionnalités et bénéfices." },
      { id: "step-3", tool: "confluence", action: "Créer la documentation de release et la FAQ interne." },
      { id: "step-4", tool: "mou", action: "Notifier les équipes produit et marketing du lancement." }
    ]
  },
  {
    id: "inventory-order-management",
    name: "Agent de gestion des stocks et des commandes",
    category: "E-Commerce & Publicité",
    steps: [
      { id: "step-1", tool: "mou", action: "Recevoir une instruction de mouvement de stock ou de commande." },
      { id: "step-2", tool: "agent local d'IA", action: "Interpréter la commande et formater l'action." },
      { id: "step-3", tool: "Google Sheets", action: "Mettre à jour la feuille de calcul d'inventaire en temps réel." }
    ]
  },
  {
    id: "slack-hr-assistant",
    name: "Assistant RH Slack",
    category: "Ressources Humaines",
    steps: [
      { id: "step-1", tool: "mou", action: "Intercepter la question d'un employé sur Slack." },
      { id: "step-2", tool: "connaissance", action: "Rechercher la réponse dans la documentation RH." },
      { id: "step-3", tool: "Airtable", action: "Vérifier le solde de congés ou les détails de l'employé." },
      { id: "step-4", tool: "agent local d'IA", action: "Générer une réponse claire et personnalisée." }
    ]
  },
  {
    id: "knowledge-support-agent",
    name: "Agent de soutien aux connaissances",
    category: "Support & Service Client",
    steps: [
      { id: "step-1", tool: "télégramme", action: "Recevoir la demande d'aide du client." },
      { id: "step-2", tool: "connaissance", action: "Interroger les bases de connaissances et manuels internes." },
      { id: "step-3", tool: "faire-ai-recherche-web", action: "Chercher des compléments d'information en temps réel sur le web." },
      { id: "step-4", tool: "agent local d'IA", action: "Formuler la réponse guidée avec citations." },
      { id: "step-5", tool: "télégramme", action: "Transmettre la réponse au client." }
    ]
  },
  {
    id: "social-media-planning",
    name: "Agent de contenu et de planification des médias sociaux",
    category: "Création de Contenu",
    steps: [
      { id: "step-1", tool: "http", action: "Récupérer le contenu de l'article de blog publié." },
      { id: "step-2", tool: "agent local d'IA", action: "Extraire les citations clés et définir des angles de posts pour les réseaux sociaux." },
      { id: "step-3", tool: "notion", action: "Enregistrer les brouillons de publication dans Notion." },
      { id: "step-4", tool: "porte", action: "Planifier automatiquement les posts sans conflits d'horaire." }
    ]
  },
  {
    id: "incident-postmortem-report",
    name: "Agent de rapport d'autopsie d'incident",
    category: "Juridique & Conformité",
    steps: [
      { id: "step-1", tool: "porte", action: "Déclencher l'analyse à la fermeture d'un incident de production." },
      { id: "step-2", tool: "mou", action: "Récupérer la transcription des discussions de l'équipe de garde." },
      { id: "step-3", tool: "agent local d'IA", action: "Reconstruire la chronologie des faits et identifier la cause racine." },
      { id: "step-4", tool: "Google Docs", action: "Générer et formater le rapport officiel d'incident (Post-Mortem)." }
    ]
  },
  {
    id: "seo-keyword-optimization",
    name: "Agent de référencement et d'optimisation des mots clés",
    category: "SEO & Contenu Web",
    steps: [
      { id: "step-1", tool: "notion", action: "Récupérer le brouillon de l'article de blog à optimiser." },
      { id: "step-2", tool: "agent local d'IA", action: "Analyser la densité des mots-clés et suggérer des améliorations SEO." },
      { id: "step-3", tool: "Google Docs", action: "Sauvegarder l'article révisé avec la structure H1-H3 optimisée." }
    ]
  },
  {
    id: "inbox-priority-manager",
    name: "Gestionnaire de priorité de la boîte de réception",
    category: "Productivité",
    steps: [
      { id: "step-1", tool: "google-email", action: "Surveiller les e-mails entrants dans la boîte aux lettres." },
      { id: "step-2", tool: "agent local d'IA", action: "Classifier l'e-mail selon son urgence et son importance." },
      { id: "step-3", tool: "notifier", action: "Envoyer une alerte immédiate (SMS ou push) pour les e-mails urgents." }
    ]
  },
  {
    id: "email-assistant",
    name: "Assistant de messagerie",
    category: "Productivité",
    steps: [
      { id: "step-1", tool: "google-email", action: "Récupérer le nouvel e-mail entrant." },
      { id: "step-2", tool: "agent local d'IA", action: "Analyser le sujet et rédiger une suggestion de réponse contextuelle." },
      { id: "step-3", tool: "mou", action: "Notifier l'utilisateur sur Slack avec le résumé et le brouillon de réponse." }
    ]
  },
  {
    id: "job-fit-evaluator",
    name: "Évaluation de l'adéquation au poste et agent d'entretien",
    category: "Ressources Humaines",
    steps: [
      { id: "step-1", tool: "remplir", action: "Récupérer la candidature et les réponses du formulaire candidat." },
      { id: "step-2", tool: "http", action: "Récupérer la fiche de poste de l'entreprise." },
      { id: "step-3", tool: "gemini-ai", action: "Évaluer la correspondance entre le profil et le poste." },
      { id: "step-4", tool: "Airtable", action: "Sauvegarder l'analyse d'adéquation et préparer les questions d'entretien." }
    ]
  },
  {
    id: "social-media-reply",
    name: "Répondre aux commentaires sur les réseaux sociaux",
    category: "Création de Contenu",
    steps: [
      { id: "step-1", tool: "YouTube", action: "Détecter un nouveau commentaire publié sous une vidéo." },
      { id: "step-2", tool: "agent local d'IA", action: "Rédiger une réponse adaptée et respectueuse de la marque." },
      { id: "step-3", tool: "mou", action: "Alerter l'équipe en cas de commentaire nécessitant une attention particulière." },
      { id: "step-4", tool: "Airtable", action: "Enregistrer le commentaire et le statut de la réponse." }
    ]
  },
  {
    id: "industry-news-analyst",
    name: "Agent d'actualités et d'analyses sectorielles",
    category: "Veille & Marché",
    steps: [
      { id: "step-1", tool: "faire-ai-recherche-web", action: "Parcourir le web pour trouver les actualités marquantes de la veille." },
      { id: "step-2", tool: "agent local d'IA", action: "Sélectionner et résumer l'article le plus pertinent pour le secteur." },
      { id: "step-3", tool: "mou", action: "Publier le résumé matinal sur le canal Slack de l'équipe." }
    ]
  },
  {
    id: "multichannel-content-agent",
    name: "Agent de contenu multicanal",
    category: "Création de Contenu",
    steps: [
      { id: "step-1", tool: "notion", action: "Lire les notes brutes de mise à jour produit dans Notion." },
      { id: "step-2", tool: "agent local d'IA", action: "Rédiger l'article de blog, le post social et l'annonce e-mail." },
      { id: "step-3", tool: "Google Docs", action: "Enregistrer les différents formats prêts à l'envoi." }
    ]
  },
  {
    id: "market-research-analyst",
    name: "Analyste d'études de marché",
    category: "Veille & Marché",
    steps: [
      { id: "step-1", tool: "remplir", action: "Recevoir l'URL de l'entreprise cible via le formulaire de saisie." },
      { id: "step-2", tool: "faire-ai-recherche-web", action: "Rechercher les offres, tarifs et avis sur l'entreprise." },
      { id: "step-3", tool: "agent local d'IA", action: "Analyser le positionnement et identifier les concurrents clés." },
      { id: "step-4", tool: "Airtable", action: "Enregistrer le rapport d'analyse concurrentielle dans le CRM." }
    ]
  },
  {
    id: "sales-prospecting-agent",
    name: "Agent de prospection commerciale",
    category: "Prospection & B2B",
    steps: [
      { id: "step-1", tool: "faire-ai-recherche-web", action: "Rechercher des leads qualifiés répondant aux critères cibles." },
      { id: "step-2", tool: "agent local d'IA", action: "Rédiger des messages d'introduction personnalisés pour chaque lead." },
      { id: "step-3", tool: "calendrier Google", action: "Vérifier les créneaux disponibles pour un rendez-vous dans l'agenda." },
      { id: "step-4", tool: "google-email", action: "Envoyer l'e-mail de prospection avec propositions de rendez-vous." }
    ]
  },
  {
    id: "active-deals-watcher",
    name: "Observateur de transactions en cours",
    category: "Ventes & CRM",
    steps: [
      { id: "step-1", tool: "attio", action: "Extraire la liste des opportunités et deals en cours du CRM Attio." },
      { id: "step-2", tool: "agent local d'IA", action: "Analyser l'inactivité ou la progression de chaque transaction (système de feu tricolore)." },
      { id: "step-3", tool: "google-email", action: "Envoyer le rapport quotidien de santé des ventes par e-mail au manager." }
    ]
  },
  {
    id: "customer-feedback-router",
    name: "Agent de routage de retour client",
    category: "Support & Service Client",
    steps: [
      { id: "step-1", tool: "porte", action: "Réceptionner le feedback client via le canal d'entrée." },
      { id: "step-2", tool: "openai-gpt-3", action: "Analyser le ressenti, l'urgence et la catégorie de la réclamation." },
      { id: "step-3", tool: "client mcp", action: "Consulter l'historique et les données du client via MCP." },
      { id: "step-4", tool: "agent local d'IA", action: "Déterminer le service destinataire (Produit, Ventes, Support) et acheminer la demande." }
    ]
  }
];

// ==========================================
// BASE DE DONNÉES GÉANTE DES 32 MEILLEURS OUTILS IA (2026)
// ==========================================
export const AI_TOOLS_DATABASE = [
  // --- TEXTE & RAISONNEMENT ---
  {
    id: "gemini-omni",
    name: "Google Gemini Omni / Astra",
    category: "text",
    rating: 4.9,
    freeTier: "Gratuit (Limites généreuses)",
    price: "Advanced : 21.99€/mois",
    link: "https://aistudio.google.com/",
    linkLabel: "Obtenir une clé Gemini gratuite",
    shortDesc: "IA multimodale temps réel de Google combinant voix, vidéo et texte sans latence.",
    utility: "Analyse instantanée de flux vidéo en direct, traduction haute fidélité, programmation assistée par les modèles DeepMind.",
    bestCombo: "Idéal pour le connecter à des agents de support client vidéo ou audio en direct."
  },
  {
    id: "claude-3-5",
    name: "Claude 3.5 Sonnet / Opus",
    category: "text",
    rating: 4.9,
    freeTier: "Accès web gratuit limité",
    price: "Pro : 20$/mois",
    link: "https://console.anthropic.com/",
    linkLabel: "Console de Clé API Anthropic",
    shortDesc: "La référence absolue pour le copywriting premium, la programmation intelligente et l'analyse.",
    utility: "Rédaction d'e-books, création de chartes éditoriales complexes, audit de codes sources, génération de contenu.",
    bestCombo: "À associer avec Make.com pour générer des newsletters automatisées."
  },
  {
    id: "gpt-4o",
    name: "OpenAI GPT-4o / o3",
    category: "text",
    rating: 4.8,
    freeTier: "Accès limité au modèle mini",
    price: "Plus : 20$/mois",
    link: "https://platform.openai.com/",
    linkLabel: "Console développeur OpenAI",
    shortDesc: "L'outil universel pour le raisonnement séquentiel, la logique et la création d'agents.",
    utility: "Création de GPTs sur-mesure pour vos clients, de l'analyse massive de données structurées, brainstormings de campagnes.",
    bestCombo: "Idéal pour orchestrer des workflows de messagerie complexes et des chatbots."
  },
  {
    id: "perplexity",
    name: "Perplexity AI Pro",
    category: "text",
    rating: 4.8,
    freeTier: "Recherche basique illimitée",
    price: "Pro : 20$/mois",
    link: "https://www.perplexity.ai/settings/api",
    linkLabel: "Générer une clé API Perplexity",
    shortDesc: "Moteur de recherche hybride assisté par IA qui explore le web et cite des sources vérifiées.",
    utility: "Veille concurrentielle automatisée, collecte d'informations qualifiées, rapports d'audit.",
    bestCombo: "Utilisez-le pour alimenter vos bases de connaissances d'agents autonomes."
  },
  {
    id: "deepseek-r1",
    name: "DeepSeek R1 / V3",
    category: "text",
    rating: 4.8,
    freeTier: "Entièrement gratuit ou API ultra-low cost",
    price: "Pay-as-you-go extrêmement bas",
    link: "https://platform.deepseek.com/",
    linkLabel: "Console API DeepSeek",
    shortDesc: "Modèle de raisonnement open-source ultra-performant, rivalisant avec les meilleurs d'OpenAI.",
    utility: "Calculs de modèles financiers, audit de contrats, traitement de requêtes complexes.",
    bestCombo: "À intégrer dans vos scripts d'automatisation n8n pour réduire les coûts d'API."
  },
  {
    id: "groq",
    name: "Groq LPU Cloud",
    category: "text",
    rating: 4.7,
    freeTier: "Accès gratuit avec quotas",
    price: "Pay-as-you-go ultra-bas",
    link: "https://console.groq.com/",
    linkLabel: "Obtenir mon API Key Groq",
    shortDesc: "Le moteur d'inférence le plus rapide du monde sur les architectures LPU.",
    utility: "Idéal pour les chatbots à réponse vocale instantanée ou l'analyse ultra-rapide.",
    bestCombo: "Connectez-le à des services vocaux pour éliminer toute latence."
  },

  // --- IMAGES & DESIGN ---
  {
    id: "midjourney-v6",
    name: "Midjourney v6",
    category: "image",
    rating: 4.9,
    freeTier: "Pas de plan gratuit",
    price: "À partir de 10$/mois",
    link: "https://www.midjourney.com/",
    linkLabel: "Accéder à l'interface Midjourney",
    shortDesc: "Le générateur d'images artistiques et photoréalistes le plus récompensé au monde.",
    utility: "Génération de chartes graphiques, mockups de produits, photos de stock exclusives.",
    bestCombo: "À combiner avec Runway Gen-3 pour générer des vidéos publicitaires."
  },
  {
    id: "flux-1",
    name: "Flux.1 (Black Forest Labs)",
    category: "image",
    rating: 4.8,
    freeTier: "Gratuit sur HuggingFace / Replicate",
    price: "API payante à la tâche",
    link: "https://replicate.com/collections/flux",
    linkLabel: "Clés d'API Flux sur Replicate",
    shortDesc: "Modèle de génération d'images open-source révolutionnant le rendu du texte écrit.",
    utility: "Création d'affiches publicitaires contenant du texte lisible, packagings réalistes.",
    bestCombo: "Générez des maquettes d'applications sur-mesure pour vos présentations."
  },
  {
    id: "leonardo-ai",
    name: "Leonardo.ai",
    category: "image",
    rating: 4.7,
    freeTier: "150 crédits gratuits par jour",
    price: "À partir de 10$/mois",
    link: "https://docs.leonardo.ai/",
    linkLabel: "Clé API Leonardo de Canva",
    shortDesc: "Plateforme graphique complète avec modèles personnalisés et édition en direct.",
    utility: "Génération d'assets de jeux vidéo, designs pour Print-on-Demand, édition au pinceau IA.",
    bestCombo: "Idéal pour alimenter une boutique e-commerce de design à grande vitesse."
  },
  {
    id: "adobe-firefly",
    name: "Adobe Firefly",
    category: "image",
    rating: 4.6,
    freeTier: "25 crédits gratuits par mois",
    price: "Inclus dans Creative Cloud",
    link: "https://developer.adobe.com/firefly-api/",
    linkLabel: "Firefly API Console",
    shortDesc: "IA générative commerciale garantie sans violation de droits d'auteur.",
    utility: "Remplissage génératif dans Photoshop, extension d'images, vectorisation de logos.",
    bestCombo: "L'allié indispensable des graphistes pour des contrats de grands groupes."
  },
  {
    id: "magnific-ai",
    name: "Magnific AI",
    category: "image",
    rating: 4.8,
    freeTier: "Quelques essais limités",
    price: "À partir de 39$/mois",
    link: "https://magnific.ai/",
    linkLabel: "Site officiel Magnific AI",
    shortDesc: "L'outil ultime d'upscaling et de ré-imagination de détails haute résolution.",
    utility: "Transformer une image générée basse résolution en un chef-d'œuvre de clarté 8K.",
    bestCombo: "Sublimez vos créations Midjourney avant de les envoyer pour impression."
  },
  {
    id: "stability-ai",
    name: "Stable Diffusion (Stability AI)",
    category: "image",
    rating: 4.7,
    freeTier: "Crédits de bienvenue",
    price: "Pay-as-you-go par clés API",
    link: "https://platform.stability.ai/",
    linkLabel: "Générer mon API Key Stability",
    shortDesc: "Le moteur open-source de génération d'images haute flexibilité.",
    utility: "Génération par lots, contrôles fins de pose (ControlNet), retouches logicielles intégrées.",
    bestCombo: "Idéal pour créer des workflows de filtres photos personnalisés pour des applications."
  },

  // --- PRODUCTION VIDÉO ---
  {
    id: "runway-gen3",
    name: "Runway Gen-3 Alpha",
    category: "video",
    rating: 4.8,
    freeTier: "Quelques crédits d'essai",
    price: "À partir de 12$/mois",
    link: "https://runwayml.com/",
    linkLabel: "Espace Développeur Runway",
    shortDesc: "Moteur de génération vidéo cinématique avec contrôle précis du mouvement.",
    utility: "Création de clips publicitaires réalistes, clips musicaux, effets spéciaux de transition.",
    bestCombo: "Idéal pour animer des images fixes complexes générées par Midjourney."
  },
  {
    id: "kling-ai",
    name: "Kling AI",
    category: "video",
    rating: 4.8,
    freeTier: "66 crédits gratuits par jour",
    price: "À partir de 10$/mois",
    link: "https://klingai.com/",
    linkLabel: "Console API Kling AI",
    shortDesc: "IA de génération vidéo longue durée simulant avec brio les lois de la physique.",
    utility: "Création de scènes narratives immersives pour TikTok, demo de produits.",
    bestCombo: "Parfait pour créer des chaînes de vidéos courtes automatisées."
  },
  {
    id: "luma-dream",
    name: "Luma Dream Machine",
    category: "video",
    rating: 4.7,
    freeTier: "30 générations gratuites par mois",
    price: "À partir de 9.99$/mois",
    link: "https://lumalabs.ai/dream-machine/api",
    linkLabel: "API Key Luma Labs",
    shortDesc: "IA vidéo ultra-rapide capable de modéliser des mouvements de caméra 3D parfaits.",
    utility: "Création de travellings, d'effets de zoom dynamique, d'animations de paysages.",
    bestCombo: "Parfait pour créer des présentations d'architecture d'une qualité immersive."
  },
  {
    id: "heygen",
    name: "HeyGen Avatars",
    category: "video",
    rating: 4.9,
    freeTier: "1 crédit gratuit",
    price: "À partir de 24$/mois",
    link: "https://docs.heygen.com/",
    linkLabel: "HeyGen API Key",
    shortDesc: "La Rolls-Royce des avatars vidéo parlants hyperréalistes avec traduction labiale.",
    utility: "Création de vidéos de formation sans présentateur physique, prospection commerciale.",
    bestCombo: "Idéal pour automatiser l'envoi de démos personnalisées à vos leads."
  },
  {
    id: "synthesia",
    name: "Synthesia 2.0",
    category: "video",
    rating: 4.7,
    freeTier: "Pas de plan gratuit permanent",
    price: "À partir de 22$/mois",
    link: "https://www.synthesia.io/api",
    linkLabel: "Synthesia API Console",
    shortDesc: "Plateforme d'avatars IA d'entreprise pour automatiser la communication interne.",
    utility: "Vidéos de onboarding RH, tutoriels interactifs logiciels, présentations d'études.",
    bestCombo: "À proposer aux grandes PME pour moderniser leur communication interne."
  },
  {
    id: "pika-labs",
    name: "Pika Labs",
    category: "video",
    rating: 4.6,
    freeTier: "Crédits de bienvenue",
    price: "À partir de 8$/mois",
    link: "https://pika.art/",
    linkLabel: "Plateforme créative Pika",
    shortDesc: "Moteur d'effets visuels et d'animations de styles 3D et cartoon d'excellence.",
    utility: "Idéal pour créer des courtes animations promotionnelles amusantes, modifications d'arrière-plan.",
    bestCombo: "Excellent pour des formats rapides à publier sur réseaux sociaux."
  },

  // --- AUDIO & VOIX ---
  {
    id: "elevenlabs",
    name: "ElevenLabs Voice Engine",
    category: "audio",
    rating: 4.9,
    freeTier: "10 000 caractères par mois",
    price: "À partir de 5$/mois",
    link: "https://elevenlabs.io/app/settings/api-keys",
    linkLabel: "Obtenir ma clé ElevenLabs",
    shortDesc: "Le leader absolu du clonage de voix et du text-to-speech émotionnel.",
    utility: "Doublage de voix multilingue, création de voix-off pour publicités et livres audio.",
    bestCombo: "Clonez la voix d'un client pour lui permettre de produire des podcasts rapidement."
  },
  {
    id: "suno-ai",
    name: "Suno AI (v4)",
    category: "audio",
    rating: 4.8,
    freeTier: "50 crédits par jour",
    price: "À partir de 8$/mois",
    link: "https://suno.com/",
    linkLabel: "Site de création Suno AI",
    shortDesc: "Générateur de chansons complètes avec paroles et voix qualité radio.",
    utility: "Création de jingles de marques, musiques d'ambiance publicitaires libres de droits.",
    bestCombo: "Développez l'identité sonore unique d'un client local en 2 minutes."
  },
  {
    id: "udio",
    name: "Udio Music",
    category: "audio",
    rating: 4.7,
    freeTier: "Créations de base gratuites",
    price: "À partir de 10$/mois",
    link: "https://udio.com/",
    linkLabel: "Plateforme musicale Udio",
    shortDesc: "Générateur de musique réputé pour sa fidélité et clarté acoustique d'élite.",
    utility: "Production de bandes-son cinématiques d'ambiance de niveau professionnel.",
    bestCombo: "Parfait pour générer des musiques de fond immersives pour des vidéos de luxe."
  },
  {
    id: "descript",
    name: "Descript Editor",
    category: "audio",
    rating: 4.7,
    freeTier: "1 heure de transcription",
    price: "À partir de 12$/mois",
    link: "https://www.descript.com/",
    linkLabel: "Télécharger Descript",
    shortDesc: "Éditeur audio et vidéo révolutionnaire basé entièrement sur le script textuel.",
    utility: "Nettoyage des bruits de fond, suppression des blancs, montage de podcasts au clavier.",
    bestCombo: "Idéal pour monter et calibrer les voix off générées par ElevenLabs en un clin d'œil."
  },
  {
    id: "veed-io",
    name: "Veed.io",
    category: "audio",
    rating: 4.6,
    freeTier: "Export basique avec filigrane",
    price: "À partir de 15$/mois",
    link: "https://www.veed.io/",
    linkLabel: "Console d'édition Veed.io",
    shortDesc: "Plateforme complète de montage vidéo et audio en ligne assistée par IA.",
    utility: "Ajout de sous-titres esthétiques automatiques, suppression du bruit de fond de microphones.",
    bestCombo: "Idéal pour assembler les plans rapides de vos contenus TikTok."
  },
  {
    id: "murf-ai",
    name: "Murf.ai",
    category: "audio",
    rating: 4.6,
    freeTier: "10 minutes de rendu vocal",
    price: "À partir de 19$/mois",
    link: "https://murf.ai/",
    linkLabel: "Console Murf Studio",
    shortDesc: "IA spécialisée dans les voix off narratives d'apprentissage et de formation professionnelle.",
    utility: "Idéal pour les modules d'onboarding, les tutoriels vidéos éducatifs à gros volumes.",
    bestCombo: "Une alternative robuste pour des voix d'entreprises posées et pédagogiques."
  },

  // --- AUTOMATISATION & SYSTÈMES ---
  {
    id: "make",
    name: "Make.com (Integromat)",
    category: "automation",
    rating: 4.9,
    freeTier: "1 000 opérations gratuites par mois",
    price: "À partir de 9$/mois",
    link: "https://www.make.com/en/help/tools/make-api",
    linkLabel: "Obtenir mon API Token Make.com",
    shortDesc: "L'outil visuel d'automatisation de flux le plus populaire pour connecter vos outils.",
    utility: "Automatiser la collecte de l'acquisition de leads, l'analyse par IA, la mise à jour de CRM.",
    bestCombo: "Le chef d'orchestre indispensable pour interconnecter toutes les IA."
  },
  {
    id: "n8n",
    name: "n8n.io Workflow",
    category: "automation",
    rating: 4.9,
    freeTier: "Version auto-hébergée 100% gratuite",
    price: "Cloud à partir de 20$/mois",
    link: "https://docs.n8n.io/api/",
    linkLabel: "Accéder à l'API Key de votre n8n",
    shortDesc: "Plateforme d'automatisation open-source intégrant des noeuds d'agents autonomes.",
    utility: "Développement de scénarios d'automatisation complexes avec boucles logiques.",
    bestCombo: "Hébergez-le sur votre propre serveur VPS pour faire tourner des millions de tâches."
  },
  {
    id: "stripe",
    name: "Stripe",
    category: "automation",
    rating: 4.9,
    freeTier: "Sans abonnement fixe",
    price: "Frais par transaction (2.9% + 0.30$)",
    link: "https://dashboard.stripe.com/apikeys",
    linkLabel: "Obtenir une clé Stripe API",
    shortDesc: "La plateforme de paiement et facturation de référence pour vos SaaS et e-commerce.",
    utility: "Créer des liens de paiement, gérer des abonnements récurrents et suivre vos revenus.",
    bestCombo: "À connecter avec un bot Slack/n8n pour notifier en direct votre équipe de chaque vente."
  },
  {
    id: "activepieces",
    name: "Activepieces",
    category: "automation",
    rating: 4.6,
    freeTier: "Version cloud limitée",
    price: "À partir de 15$/mois",
    link: "https://www.activepieces.com/docs/",
    linkLabel: "Clef API Activepieces",
    shortDesc: "Alternative ultra-simplifiée, moderne et open-source à Zapier.",
    utility: "Création d'automatisations d'entreprise très légères et adaptées aux interfaces simples.",
    bestCombo: "Idéal pour intégrer de petites automatisations directement chez vos clients."
  },
  {
    id: "zapier",
    name: "Zapier Platform",
    category: "automation",
    rating: 4.5,
    freeTier: "100 tâches par mois",
    price: "À partir de 19.99$/mois",
    link: "https://zapier.com/engineering/platform/",
    linkLabel: "Créer un Token Développeur Zapier",
    shortDesc: "Le pionnier historique de l'interconnexion d'applications d'entreprises.",
    utility: "Lier des logiciels anciens ou de comptabilité très spécifiques absents d'autres plateformes.",
    bestCombo: "À utiliser si un logiciel client est introuvable sur Make ou n8n."
  },

  // --- CRÉATION D'APPLICATIONS ---
  {
    id: "lovable",
    name: "Lovable.dev",
    category: "code",
    rating: 4.9,
    freeTier: "Développement de base gratuit",
    price: "À partir de 20$/mois",
    link: "https://lovable.dev/",
    linkLabel: "Se connecter à Lovable",
    shortDesc: "Le générateur d'applications web full-stack utilisable en langage naturel.",
    utility: "Création rapide de plateformes SaaS, CRM internes et portails clients connectés.",
    bestCombo: "Concevez l'application, branchez Stripe et vendez vos services en récurrence."
  },
  {
    id: "bolt-new",
    name: "Bolt.new",
    category: "code",
    rating: 4.9,
    freeTier: "Essai gratuit limité",
    price: "Développeur : 20$/mois",
    link: "https://bolt.new/",
    linkLabel: "Démarrer un projet sur Bolt.new",
    shortDesc: "Environnement de développement complet qui écrit, compile et déploie vos applications.",
    utility: "Prototypage ultra-rapide d'interfaces web réactives et d'applications interactives.",
    bestCombo: "Idéal pour designer et coder un projet complet sous les yeux de votre client."
  },
  {
    id: "v0-dev",
    name: "v0.dev (Vercel)",
    category: "code",
    rating: 4.8,
    freeTier: "Crédits gratuits mensuels",
    price: "Premium : 20$/mois",
    link: "https://v0.dev/",
    linkLabel: "Générer mon Token d'accès v0",
    shortDesc: "Moteur de création de composants d'interface utilisateur en Tailwind CSS et React.",
    utility: "Génération de landing pages, de formulaires et de graphismes d'une qualité exceptionnelle.",
    bestCombo: "Copiez le code de v0 et injectez-le dans Lovable pour une finition parfaite."
  },
  {
    id: "cursor",
    name: "Cursor Editor",
    category: "code",
    rating: 4.9,
    freeTier: "Usage basique gratuit",
    price: "Pro : 20$/mois",
    link: "https://cursor.com/",
    linkLabel: "Abonnements et API Cursor",
    shortDesc: "Le fork de VS Code augmenté par intelligence artificielle comprenant votre projet complet.",
    utility: "Écriture de code ultra-rapide, débogage de dossiers entiers, refactorisation complexe.",
    bestCombo: "Le compagnon indispensable du développeur de scripts et de micro-services."
  },

  // --- SEO & LOCAL ---
  {
    id: "gmb-autoresponder",
    name: "Google Business Profile Manager AI",
    category: "seo",
    rating: 4.8,
    freeTier: "Création libre via API de base",
    price: "Coûts d'API Gemini minimes",
    link: "https://make.com",
    linkLabel: "Intégration via Make",
    shortDesc: "Agent autonome sur-mesure pour surveiller et répondre aux avis de vos fiches clients.",
    utility: "Réponses instantanées, personnalisées, chaleureuses et optimisées SEO local.",
    bestCombo: "Vendez cette solution 149€/mois aux commerces physiques pour leur e-réputation."
  },
  {
    id: "seowriting",
    name: "SEOWriting.ai",
    category: "seo",
    rating: 4.6,
    freeTier: "5 documents gratuits d'essai",
    price: "À partir de 12$/mois",
    link: "https://seowriting.ai/",
    linkLabel: "Mon API Key SEOWriting.ai",
    shortDesc: "Générateur d'articles de blog structurés et optimisés pour les moteurs de recherche.",
    utility: "Génération en un clic d'articles à haut classement Google avec titres et images intégrés.",
    bestCombo: "À coupler avec une automatisation d'envoi automatique sur WordPress chaque semaine."
  },
  {
    id: "google-email",
    name: "google-email",
    category: "automation",
    rating: 4.8,
    freeTier: "Gratuit via compte Gmail",
    price: "Gratuit / Google Workspace",
    link: "https://workspace.google.com/products/gmail/",
    linkLabel: "Documentation Google Gmail",
    shortDesc: "Intégration de messagerie Gmail pour l'envoi, la réception et l'analyse de courriels par l'IA.",
    utility: "Récupération des emails entrants, envoi de résumés automatiques, alertes et notifications.",
    bestCombo: "Idéal avec un Agent Local d'IA pour trier et répondre automatiquement à vos emails."
  },
  {
    id: "local-ai-agent",
    name: "agent local d'IA",
    category: "text",
    rating: 4.7,
    freeTier: "100% Gratuit et Open-source",
    price: "Hébergement local gratuit",
    link: "https://ollama.com/",
    linkLabel: "Télécharger Ollama localement",
    shortDesc: "Modèle de langage exécuté localement (Llama 3, Mistral) via Ollama ou LM Studio pour préserver la confidentialité.",
    utility: "Extraction de données sensibles (factures, reçus, contrats) sans envoyer les données dans le cloud.",
    bestCombo: "À coupler avec des utilitaires de fichiers locaux pour automatiser la comptabilité."
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    category: "automation",
    rating: 4.8,
    freeTier: "Gratuit",
    price: "Gratuit",
    link: "https://workspace.google.com/products/sheets/",
    linkLabel: "API Google Sheets",
    shortDesc: "Tableur cloud de Google pour stocker, structurer et analyser vos données d'agents.",
    utility: "Enregistrement de leads, notes de frais, comptabilité, historiques d'exécution.",
    bestCombo: "Idéal pour exporter des rapports d'activité générés par l'IA."
  },
  {
    id: "util",
    name: "util",
    category: "automation",
    rating: 4.6,
    freeTier: "Gratuit (intégré)",
    price: "Gratuit",
    link: "https://aura-agent.com/docs/utils",
    linkLabel: "Aide Utilitaire Système",
    shortDesc: "Module utilitaire système pour la gestion des fichiers locaux, le formatage des chaînes et le tri de fichiers.",
    utility: "Renommer des documents, archiver des fichiers locaux, structurer des répertoires.",
    bestCombo: "Essentiel pour finaliser les processus d'archivage d'extraction de factures."
  },
  {
    id: "web-search-ai",
    name: "faire-ai-recherche-web",
    category: "text",
    rating: 4.9,
    freeTier: "Limites d'essai de recherche",
    price: "Pay-as-you-go",
    link: "https://exa.ai/",
    linkLabel: "Console API Exa / Perplexity",
    shortDesc: "Agent de recherche web en temps réel conçu pour trouver les faits récents et actualités sectorielles.",
    utility: "Veille concurrentielle, recherche de prospects, détection des tendances émergentes.",
    bestCombo: "Idéal avec un Rédacteur IA pour générer des brouillons d'articles de blog d'actualité."
  },
  {
    id: "google-docs",
    name: "Google Docs",
    category: "text",
    rating: 4.7,
    freeTier: "Gratuit",
    price: "Gratuit",
    link: "https://workspace.google.com/products/docs/",
    linkLabel: "API Google Docs",
    shortDesc: "Traitement de texte collaboratif de Google pour la rédaction automatisée de rapports et d'articles.",
    utility: "Génération de rapports d'études de marché, de brouillons d'articles et d'autopsies d'incidents.",
    bestCombo: "À connecter à Slack pour rédiger un rapport à partir d'une simple discussion."
  },
  {
    id: "google-forms",
    name: "google-forms",
    category: "automation",
    rating: 4.6,
    freeTier: "Gratuit",
    price: "Gratuit",
    link: "https://workspace.google.com/products/forms/",
    linkLabel: "API Google Forms",
    shortDesc: "Créateur de formulaires en ligne de Google pour collecter les commentaires clients et données.",
    utility: "Détection automatique de nouveaux formulaires soumis et envoi des données à l'IA pour analyse.",
    bestCombo: "Associez-le à Slack pour recevoir les alertes d'avis négatifs en temps réel."
  },
  {
    id: "integrated",
    name: "intégré",
    category: "automation",
    rating: 4.8,
    freeTier: "Inclus dans AURA",
    price: "Inclus dans la licence",
    link: "https://aura-agent.com/docs/core",
    linkLabel: "Fonctions Intégrées AURA",
    shortDesc: "Fonctionnalités et passerelles internes d'AURA pour le routage de données et la logique système.",
    utility: "Routage d'alertes, traitement de base, aiguillage de flux.",
    bestCombo: "Parfait pour orchestrer la logique interne de vos agents."
  },
  {
    id: "mou-slack",
    name: "mou",
    category: "automation",
    rating: 4.9,
    freeTier: "Plan Slack Gratuit",
    price: "Pro : à partir de 6.75€/user",
    link: "https://slack.com/",
    linkLabel: "Intégration API Slack",
    shortDesc: "Messagerie collaborative Slack (mou) pour interagir en direct avec vos agents et recevoir vos alertes.",
    utility: "Canal de communication principal pour envoyer des commandes à vos agents et recevoir leurs notifications.",
    bestCombo: "Le hub central pour piloter vos agents RH et de support directement en équipe."
  },
  {
    id: "knowledge-base",
    name: "connaissance",
    category: "text",
    rating: 4.8,
    freeTier: "Essai gratuit de base",
    price: "Selon le volume de tokens",
    link: "https://aura-agent.com/docs/knowledge",
    linkLabel: "Documentation Bases Vectorielles",
    shortDesc: "Base de connaissances vectorielle RAG (Retrieval-Augmented Generation) pour stocker vos documents internes.",
    utility: "Réponses aux questions d'intégration RH, Q&A clients basés sur des manuels ou des chartes de marque.",
    bestCombo: "Idéal pour alimenter un agent d'onboarding sur Slack avec le règlement intérieur."
  },
  {
    id: "http",
    name: "http",
    category: "automation",
    rating: 4.9,
    freeTier: "Gratuit",
    price: "Gratuit",
    link: "https://developer.mozilla.org/fr/docs/Web/HTTP",
    linkLabel: "Guide HTTP",
    shortDesc: "Module de requêtes HTTP et Webhooks universels pour communiquer avec n'importe quelle API tierce.",
    utility: "Envoi et réception de données brutes vers des services non intégrés nativement.",
    bestCombo: "Indispensable pour connecter un CRM de niche ou un serveur privé."
  },
  {
    id: "porte-firewall",
    name: "porte",
    category: "automation",
    rating: 4.8,
    freeTier: "Inclus dans AURA",
    price: "Gratuit",
    link: "https://owasp.org/www-project-top-10-large-language-model-applications/",
    linkLabel: "Normes de Sécurité LLM",
    shortDesc: "Passerelle de sécurité et pare-feu d'agent pour filtrer les entrées/sorties et prévenir les injections d'instructions.",
    utility: "Vérification de sécurité, détection des menaces (Prompt Injection), protection contre l'exfiltration de données.",
    bestCombo: "À placer impérativement en première étape de tout agent exposé publiquement."
  },
  {
    id: "json-parser",
    name: "json",
    category: "automation",
    rating: 4.7,
    freeTier: "Gratuit",
    price: "Gratuit",
    link: "https://www.json.org/",
    linkLabel: "Spécification JSON",
    shortDesc: "Outil de parsing, de validation et de formatage des données JSON structurées.",
    utility: "Validation de format de payload, transformation de données brutes d'API pour les réseaux sociaux.",
    bestCombo: "À intercaler entre une API de recherche et un outil de publication."
  },
  {
    id: "linear",
    name: "linéaire",
    category: "automation",
    rating: 4.7,
    freeTier: "Gratuit pour les petites équipes",
    price: "À partir de 8$/user",
    link: "https://linear.app/",
    linkLabel: "API Linear",
    shortDesc: "Outil de gestion de tickets de développement logiciel moderne et ultra-rapide.",
    utility: "Triage automatique de tickets, création de tâches techniques, attribution de priorités.",
    bestCombo: "À brancher à un canal Slack d'alertes techniques pour assigner les bugs de prod."
  },
  {
    id: "shopify",
    name: "Shopify",
    category: "automation",
    rating: 4.8,
    freeTier: "Partenaire Shopify gratuit",
    price: "À partir de 32€/mois",
    link: "https://shopify.dev/docs/api/admin-rest",
    linkLabel: "API Shopify Admin",
    shortDesc: "Plateforme e-commerce leader pour synchroniser et gérer vos stocks, produits et commandes.",
    utility: "Suivi des commandes client par chat, mise à jour des prix, alertes de rupture de stock.",
    bestCombo: "Associez-le à Slack pour permettre aux équipes logistiques de suivre les envois en direct."
  },
  {
    id: "apify",
    name: "apify",
    category: "automation",
    rating: 4.7,
    freeTier: "5$ de crédits gratuits par mois",
    price: "À partir de 49$/mois",
    link: "https://apify.com/",
    linkLabel: "Console Développeur Apify",
    shortDesc: "Plateforme de web scraping cloud pour extraire des informations structurées de sites et plateformes.",
    utility: "Extraction de plannings d'événements, profils sociaux, données de plateformes e-commerce.",
    bestCombo: "Idéal pour alimenter un agent de communication événementielle."
  },
  {
    id: "ai-tools",
    name: "outils d'IA",
    category: "text",
    rating: 4.7,
    freeTier: "Gratuit",
    price: "Pay-as-you-go",
    link: "https://aura-agent.com/docs/ai-tools",
    linkLabel: "Guide Outils d'IA",
    shortDesc: "Moteur de modèles d'IA tiers combinant diverses fonctionnalités cognitives secondaires.",
    utility: "Traduction, classification d'images, classification de textes secondaires.",
    bestCombo: "Pratique pour des tâches de traitement d'appoint au sein de vos pipelines."
  },
  {
    id: "jira",
    name: "Jira",
    category: "automation",
    rating: 4.6,
    freeTier: "Gratuit jusqu'à 10 utilisateurs",
    price: "À partir de 8.15$/user",
    link: "https://developer.atlassian.com/cloud/jira/platform/rest/v3/",
    linkLabel: "API Jira Cloud",
    shortDesc: "Logiciel de gestion de projets agiles pour le suivi des tickets de développement et de release.",
    utility: "Génération automatique de fiches produit et FAQ à partir de tickets Jira fermés.",
    bestCombo: "Idéal avec Confluence pour documenter les mises en production de vos équipes ingénierie."
  },
  {
    id: "confluence",
    name: "confluence",
    category: "text",
    rating: 4.6,
    freeTier: "Gratuit jusqu'à 10 utilisateurs",
    price: "À partir de 6$/user",
    link: "https://developer.atlassian.com/cloud/confluence/rest/v2/",
    linkLabel: "API Confluence Cloud",
    shortDesc: "Espace de documentation wiki d'entreprise collaboratif pour centraliser les connaissances.",
    utility: "Publication automatique de notes de release internes, FAQ de lancements produit.",
    bestCombo: "Idéal avec Jira pour la transition de l'ingénierie vers les équipes de vente."
  },
  {
    id: "airtable",
    name: "Airtable",
    category: "automation",
    rating: 4.8,
    freeTier: "Gratuit (Limité à 1000 lignes)",
    price: "À partir de 20$/user",
    link: "https://airtable.com/developers/web/api",
    linkLabel: "API Airtable REST",
    shortDesc: "Base de données relationnelle hybride alliant la puissance d'un tableur et la flexibilité d'une base SQL.",
    utility: "Stockage des profils de candidats, suivi de campagnes d'outreach, gestion d'études de marché.",
    bestCombo: "À coupler avec un Agent d'entretien pour évaluer l'adéquation d'un profil de candidat."
  },
  {
    id: "telegram",
    name: "télégramme",
    category: "automation",
    rating: 4.7,
    freeTier: "Gratuit",
    price: "Gratuit",
    link: "https://core.telegram.org/bots/api",
    linkLabel: "API de Bot Telegram",
    shortDesc: "Messagerie instantanée sécurisée Telegram pour diffuser des alertes et créer des assistants chat.",
    utility: "Diffusion d'avis de recherche, support client par chat en direct, questions-réponses sur les documentations.",
    bestCombo: "Idéal pour offrir un support de connaissance nomade et accessible à vos clients."
  },
  {
    id: "notion",
    name: "notion",
    category: "automation",
    rating: 4.8,
    freeTier: "Gratuit pour usage personnel",
    price: "Plus : à partir de 8$/user",
    link: "https://developers.notion.com/",
    linkLabel: "Portail Développeurs Notion",
    shortDesc: "Espace de travail tout-en-un pour organiser vos bases de données, notes et calendriers éditoriaux.",
    utility: "Planification des médias sociaux, stockage d'articles rédigés, gestion de mots-clés SEO.",
    bestCombo: "Idéal pour planifier et générer vos briefs de contenu multicanaux automatiquement."
  },
  {
    id: "notifier",
    name: "notifier",
    category: "automation",
    rating: 4.6,
    freeTier: "Inclus",
    price: "Inclus",
    link: "https://aura-agent.com/docs/notifier",
    linkLabel: "Documentation Notifications",
    shortDesc: "Micro-service de notification pour l'envoi d'alertes système en temps réel (SMS, push, email).",
    utility: "Alerter l'équipe en cas d'email hautement prioritaire détecté dans la boîte de réception.",
    bestCombo: "À connecter en sortie d'un Agent de classification d'e-mails urgents."
  },
  {
    id: "fill-forms",
    name: "remplir",
    category: "automation",
    rating: 4.7,
    freeTier: "Gratuit",
    price: "Inclus",
    link: "https://aura-agent.com/docs/fill",
    linkLabel: "Documentation Form Fillers",
    shortDesc: "Outil de remplissage automatique de formulaires web et documents structurés.",
    utility: "Remplissage automatisé de dossiers de candidatures, génération de formulaires d'évaluation RH.",
    bestCombo: "À coupler avec Airtable pour exporter des fiches d'entretien consolidées."
  },
  {
    id: "gemini-ai-advanced",
    name: "gemini-ai",
    category: "text",
    rating: 4.9,
    freeTier: "Limites d'essai de clé API",
    price: "Pay-as-you-go",
    link: "https://aistudio.google.com/",
    linkLabel: "Obtenir une clé API Gemini Studio",
    shortDesc: "Modèles d'IA avancés Google Gemini pour l'analyse logique, le raisonnement et l'évaluation structurée.",
    utility: "Évaluation de l'adéquation d'un candidat à un poste à partir de son CV et de l'offre d'emploi.",
    bestCombo: "Idéal avec Airtable pour automatiser les pré-sélections de CV."
  },
  {
    id: "youtube",
    name: "YouTube",
    category: "video",
    rating: 4.8,
    freeTier: "Gratuit via compte Google",
    price: "Gratuit / API Quotas",
    link: "https://developers.google.com/youtube/v3",
    linkLabel: "Documentation API YouTube",
    shortDesc: "Plateforme vidéo leader de Google pour la surveillance de chaîne et gestion des commentaires.",
    utility: "Récupération automatique des nouveaux commentaires vidéos et envoi pour génération de réponses.",
    bestCombo: "À brancher à un canal Slack pour approuver les réponses proposées par l'IA."
  },
  {
    id: "google-calendar",
    name: "calendrier Google",
    category: "automation",
    rating: 4.8,
    freeTier: "Gratuit",
    price: "Gratuit",
    link: "https://workspace.google.com/products/calendar/",
    linkLabel: "API Google Calendar",
    shortDesc: "Calendrier cloud de Google pour gérer vos plannings, réunions et rendez-vous professionnels.",
    utility: "Vérification des disponibilités à 7 jours, planification automatique de rendez-vous de prospection.",
    bestCombo: "À coupler avec un Agent Gmail pour fixer des rendez-vous sans échange manuel d'emails."
  },
  {
    id: "attio-crm",
    name: "attio",
    category: "automation",
    rating: 4.8,
    freeTier: "Essai gratuit disponible",
    price: "À partir de 29$/user",
    link: "https://attio.com/docs/api",
    linkLabel: "Portail API Attio CRM",
    shortDesc: "CRM nouvelle génération ultra-flexible et orienté développeurs pour le suivi de transactions commerciales.",
    utility: "Suivi des opportunités, détection automatique de transactions stagnantes et mises à jour logiques.",
    bestCombo: "À coupler avec des alertes emails quotidiennes pour relancer les prospects."
  },
  {
    id: "mcp-client",
    name: "client mcp",
    category: "automation",
    rating: 4.9,
    freeTier: "Open-source",
    price: "Gratuit",
    link: "https://modelcontextprotocol.io/",
    linkLabel: "Documentation MCP Client",
    shortDesc: "Client Model Context Protocol (MCP) pour interconnecter dynamiquement les agents d'IA à des serveurs de données distants.",
    utility: "Routage dynamique des requêtes d'agent vers des bases de données SQL, scripts ou APIs personnalisées.",
    bestCombo: "Parfait pour brancher des outils sécurisés en local à votre agent AURA principal."
  },
  {
    id: "openai-gpt3",
    name: "openai-gpt-3",
    category: "text",
    rating: 4.5,
    freeTier: "Limites d'essai API",
    price: "Pay-as-you-go ultra-bas",
    link: "https://platform.openai.com/",
    linkLabel: "OpenAI Legacy models API",
    shortDesc: "Modèles d'IA hérités OpenAI GPT-3.5 Turbo rapides pour les tâches simples de classification.",
    utility: "Analyse rapide de sentiments, classification de demandes, routage de tickets simples.",
    bestCombo: "Idéal pour réduire les coûts d'inférence sur des volumes élevés de textes courts."
  }
];
