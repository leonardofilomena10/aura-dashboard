export interface ConfigField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'password' | 'select' | 'number';
  defaultValue: any;
  options?: Array<{ value: string; label: string }>;
  helpText?: string;
}

// Normalized names for matching
export function normalizeToolName(toolName: string): string {
  const name = (toolName || '').toLowerCase().trim();
  if (name === 'mou' || name.includes('slack')) return 'slack';
  if (name.includes('gemini') || name === 'gemini-ai') return 'gemini';
  if (name.includes('claude') || name.includes('anthropic')) return 'claude';
  if (name.includes('gpt') || name.includes('openai')) return 'openai';
  if (name.includes('perplexity')) return 'perplexity';
  if (name.includes('deepseek')) return 'deepseek';
  if (name.includes('groq')) return 'groq';
  if (name.includes('midjourney')) return 'midjourney';
  if (name.includes('flux')) return 'flux';
  if (name.includes('runway')) return 'runway';
  if (name.includes('elevenlabs')) return 'elevenlabs';
  if (name.includes('make.com') || name.includes('make') || name.includes('integromat')) return 'make';
  if (name.includes('n8n')) return 'n8n';
  if (name.includes('stripe')) return 'stripe';
  if (name.includes('activepieces')) return 'activepieces';
  if (name.includes('zapier')) return 'zapier';
  if (name.includes('sheets')) return 'google_sheets';
  if (name.includes('docs')) return 'google_docs';
  if (name.includes('email') || name.includes('gmail')) return 'google_email';
  if (name.includes('business profile') || name.includes('gmb')) return 'gmb';
  if (name.includes('notion')) return 'notion';
  if (name.includes('airtable')) return 'airtable';
  if (name.includes('youtube')) return 'youtube';
  if (name.includes('shopify')) return 'shopify';
  if (name === 'linéaire' || name.includes('linear')) return 'linear';
  if (name.includes('jira')) return 'jira';
  if (name.includes('confluence')) return 'confluence';
  if (name.includes('attio')) return 'attio';
  if (name.includes('apify')) return 'apify';
  if (name.includes('twilio') || name.includes('twillio')) return 'twilio';
  if (name === 'http') return 'http';
  if (name === 'json') return 'json';
  if (name === 'porte' || name === 'gate' || name.includes('firewall')) return 'firewall';
  if (name.includes('connaissance') || name.includes('knowledge')) return 'knowledge';
  if (name.includes('recherche-web') || name.includes('web-search') || name.includes('search')) return 'search';
  if (name.includes('agent local')) return 'local_agent';
  if (name.includes('lovable')) return 'lovable';
  if (name.includes('bolt.new') || name.includes('bolt')) return 'bolt';
  if (name.includes('v0.dev') || name.includes('v0')) return 'v0';
  if (name.includes('seowriting')) return 'seowriting';
  return 'generic';
}

export function getFieldsForTool(toolName: string): ConfigField[] {
  const norm = normalizeToolName(toolName);
  switch (norm) {
    case 'gemini':
      return [
        {
          key: 'model',
          label: 'Modèle Gemini',
          type: 'select',
          defaultValue: 'gemini-2.5-flash',
          options: [
            { value: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash' },
            { value: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro' },
            { value: 'gemini-1.5-flash', label: 'Gemini 1.5 Flash' }
          ]
        },
        { key: 'apiKey', label: 'Clé API Gemini', type: 'password', defaultValue: '' },
        { key: 'temperature', label: 'Température', type: 'number', defaultValue: 0.4 },
        { key: 'systemPrompt', label: 'Prompt Système', type: 'textarea', defaultValue: 'Tu es un assistant de traitement de données.' }
      ];
    case 'claude':
      return [
        {
          key: 'model',
          label: 'Modèle Claude',
          type: 'select',
          defaultValue: 'claude-3-5-sonnet',
          options: [
            { value: 'claude-3-5-sonnet', label: 'Claude 3.5 Sonnet' },
            { value: 'claude-3-opus', label: 'Claude 3 Opus' },
            { value: 'claude-3-5-haiku', label: 'Claude 3.5 Haiku' }
          ]
        },
        { key: 'apiKey', label: 'Clé API Anthropic', type: 'password', defaultValue: '' },
        { key: 'temperature', label: 'Température', type: 'number', defaultValue: 0.7 },
        { key: 'systemPrompt', label: 'Prompt Système', type: 'textarea', defaultValue: 'Rédige une réponse optimisée pour le SEO local.' }
      ];
    case 'openai':
      return [
        {
          key: 'model',
          label: 'Modèle OpenAI',
          type: 'select',
          defaultValue: 'gpt-4o',
          options: [
            { value: 'gpt-4o', label: 'GPT-4o' },
            { value: 'gpt-4o-mini', label: 'GPT-4o Mini' },
            { value: 'o3-mini', label: 'o3-mini' }
          ]
        },
        { key: 'apiKey', label: 'Clé API OpenAI', type: 'password', defaultValue: '' },
        { key: 'temperature', label: 'Température', type: 'number', defaultValue: 0.5 },
        { key: 'systemPrompt', label: 'Prompt Système', type: 'textarea', defaultValue: 'Tu es un agent conversationnel logique.' }
      ];
    case 'perplexity':
      return [
        { key: 'apiKey', label: 'Clé API Perplexity', type: 'password', defaultValue: '' },
        { key: 'query', label: 'Requête de recherche', type: 'textarea', defaultValue: 'Actualités récentes et tendances tech/business' }
      ];
    case 'deepseek':
      return [
        {
          key: 'model',
          label: 'Modèle DeepSeek',
          type: 'select',
          defaultValue: 'deepseek-chat',
          options: [
            { value: 'deepseek-chat', label: 'DeepSeek-V3' },
            { value: 'deepseek-reasoner', label: 'DeepSeek-R1 (Raisonnement)' }
          ]
        },
        { key: 'apiKey', label: 'Clé API DeepSeek', type: 'password', defaultValue: '' },
        { key: 'temperature', label: 'Température', type: 'number', defaultValue: 0.6 }
      ];
    case 'groq':
      return [
        {
          key: 'model',
          label: 'Modèle Groq',
          type: 'select',
          defaultValue: 'llama-3.3-70b-versatile',
          options: [
            { value: 'llama-3.3-70b-versatile', label: 'Llama 3.3 70B' },
            { value: 'mixtral-8x7b-32768', label: 'Mixtral 8x7B' }
          ]
        },
        { key: 'apiKey', label: 'Clé API Groq', type: 'password', defaultValue: '' }
      ];
    case 'midjourney':
    case 'flux':
    case 'leonardo':
      return [
        { key: 'prompt', label: 'Prompt de Génération Image', type: 'textarea', defaultValue: 'Gourmet restaurant burger, commercial studio food photography, 8k resolution' },
        {
          key: 'aspectRatio',
          label: 'Format de l\'image (Aspect Ratio)',
          type: 'select',
          defaultValue: '16:9',
          options: [
            { value: '1:1', label: 'Carré (1:1)' },
            { value: '16:9', label: 'Paysage (16:9)' },
            { value: '9:16', label: 'Vertical (9:16)' }
          ]
        },
        { key: 'apiKey', label: 'Clé API (Optionnelle)', type: 'password', defaultValue: '' }
      ];
    case 'runway':
      return [
        { key: 'prompt', label: 'Prompt d\'Animation Vidéo', type: 'textarea', defaultValue: 'Cinematic movement, steam rising, slow motion, high definition' },
        {
          key: 'duration',
          label: 'Durée de la vidéo',
          type: 'select',
          defaultValue: '4',
          options: [
            { value: '4', label: '4 Secondes' },
            { value: '10', label: '10 Secondes' }
          ]
        },
        { key: 'apiKey', label: 'Clé API Runway', type: 'password', defaultValue: '' }
      ];
    case 'elevenlabs':
      return [
        { key: 'apiKey', label: 'Clé API ElevenLabs', type: 'password', defaultValue: '' },
        {
          key: 'voiceId',
          label: 'Profil Vocal',
          type: 'select',
          defaultValue: 'Rachel',
          options: [
            { value: 'Rachel', label: 'Rachel (Féminin, Chaleureux)' },
            { value: 'Drew', label: 'Drew (Masculin, Professionnel)' },
            { value: 'Adam', label: 'Adam (Masculin, Captivant)' }
          ]
        },
        { key: 'stability', label: 'Stabilité de la voix', type: 'number', defaultValue: 0.75 },
        { key: 'similarity', label: 'Clarté / Similarité', type: 'number', defaultValue: 0.85 }
      ];
    case 'make':
      return [
        { key: 'webhookUrl', label: 'URL du Webhook Make.com', type: 'text', defaultValue: 'https://hook.us1.make.com/xxxxxxxxxxxx' },
        {
          key: 'method',
          label: 'Méthode HTTP',
          type: 'select',
          defaultValue: 'POST',
          options: [
            { value: 'POST', label: 'POST (Envoyer)' },
            { value: 'GET', label: 'GET (Récupérer)' }
          ]
        }
      ];
    case 'n8n':
      return [
        { key: 'webhookUrl', label: 'URL du Webhook n8n', type: 'text', defaultValue: 'http://localhost:5678/webhook/xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx' },
        { key: 'apiKey', label: 'Clé API n8n', type: 'password', defaultValue: '' }
      ];
    case 'stripe':
      return [
        { key: 'apiKey', label: 'Clé API Stripe (Secret Key)', type: 'password', defaultValue: '' },
        { key: 'currency', label: 'Devise', type: 'select', defaultValue: 'EUR', options: [{ value: 'EUR', label: 'Euro (EUR)' }, { value: 'USD', label: 'Dollar (USD)' }] },
        { key: 'amount', label: 'Montant (en centimes)', type: 'number', defaultValue: 4900 }
      ];
    case 'activepieces':
    case 'zapier':
      return [
        { key: 'webhookUrl', label: 'URL du Webhook / Trigger', type: 'text', defaultValue: 'https://hooks.zapier.com/hooks/catch/...' }
      ];
    case 'google_sheets':
      return [
        { key: 'spreadsheetId', label: 'ID de la Feuille Google Sheets', type: 'text', defaultValue: '1sA-B2C3D4...' },
        { key: 'sheetName', label: 'Nom de l\'onglet', type: 'text', defaultValue: 'Avis Clients' },
        {
          key: 'operation',
          label: 'Opération',
          type: 'select',
          defaultValue: 'append',
          options: [
            { value: 'append', label: 'Ajouter une ligne' },
            { value: 'read', label: 'Lire les données' },
            { value: 'clear', label: 'Effacer' }
          ]
        }
      ];
    case 'google_docs':
      return [
        { key: 'documentId', label: 'ID du Document Google Docs', type: 'text', defaultValue: '1dDocId...' },
        {
          key: 'operation',
          label: 'Opération',
          type: 'select',
          defaultValue: 'create',
          options: [
            { value: 'create', label: 'Créer un nouveau document' },
            { value: 'append', label: 'Ajouter du texte à la fin' }
          ]
        }
      ];
    case 'google_email':
      return [
        { key: 'recipient', label: 'Destinataire (E-mail)', type: 'text', defaultValue: 'client@example.com' },
        { key: 'subject', label: 'Objet du mail', type: 'text', defaultValue: 'Notification de suivi' }
      ];
    case 'gmb':
      return [
        { key: 'locationId', label: 'ID du Lieu (Location ID)', type: 'text', defaultValue: 'accounts/12345/locations/67890' },
        {
          key: 'operation',
          label: 'Action',
          type: 'select',
          defaultValue: 'reply_review',
          options: [
            { value: 'reply_review', label: 'Répondre à l\'avis client' },
            { value: 'list_reviews', label: 'Lister les derniers avis' }
          ]
        }
      ];
    case 'notion':
      return [
        { key: 'apiKey', label: 'Jeton d\'intégration Notion', type: 'password', defaultValue: '' },
        { key: 'databaseId', label: 'ID de la base de données', type: 'text', defaultValue: 'notionDb123...' },
        { key: 'operation', label: 'Opération', type: 'select', defaultValue: 'create_page', options: [{ value: 'create_page', label: 'Créer une page' }, { value: 'query_db', label: 'Interroger la base' }] }
      ];
    case 'airtable':
      return [
        { key: 'apiKey', label: 'Clé API / Token Airtable', type: 'password', defaultValue: '' },
        { key: 'baseId', label: 'ID de la base Airtable', type: 'text', defaultValue: 'appXyz123...' },
        { key: 'tableName', label: 'Nom de la table', type: 'text', defaultValue: 'Avis' }
      ];
    case 'slack':
      return [
        { key: 'webhookUrl', label: 'URL du Webhook Slack', type: 'text', defaultValue: 'https://hooks.slack.com/services/T00/B00/Xxx' },
        { key: 'channel', label: 'Canal (#)', type: 'text', defaultValue: '#notifications' },
        { key: 'message', label: 'Format du message', type: 'textarea', defaultValue: 'Alerte : Nouveau retour client détecté.' }
      ];
    case 'youtube':
      return [
        { key: 'channelId', label: 'ID de la chaîne YouTube', type: 'text', defaultValue: 'UC-xxxxxxxxxxxxxx' },
        { key: 'operation', label: 'Action YouTube', type: 'select', defaultValue: 'list_comments', options: [{ value: 'list_comments', label: 'Lire les commentaires' }, { value: 'reply_comment', label: 'Répondre' }, { value: 'upload', label: 'Publier une vidéo' }] }
      ];
    case 'shopify':
      return [
        { key: 'storeUrl', label: 'URL de la boutique Shopify', type: 'text', defaultValue: 'mystore.myshopify.com' },
        { key: 'accessToken', label: 'Token d\'accès API', type: 'password', defaultValue: '' }
      ];
    case 'linear':
      return [
        { key: 'apiKey', label: 'Clé API Linear', type: 'password', defaultValue: '' },
        { key: 'teamKey', label: 'Clé de l\'équipe (Team Key)', type: 'text', defaultValue: 'ENG' }
      ];
    case 'jira':
      return [
        { key: 'jiraUrl', label: 'URL Jira Cloud', type: 'text', defaultValue: 'company.atlassian.net' },
        { key: 'projectKey', label: 'Clé du projet', type: 'text', defaultValue: 'PROJ' }
      ];
    case 'confluence':
      return [
        { key: 'spaceKey', label: 'Clé de l\'espace (Space Key)', type: 'text', defaultValue: 'TECH' }
      ];
    case 'attio':
      return [
        { key: 'apiKey', label: 'Clé API Attio', type: 'password', defaultValue: '' },
        { key: 'listId', label: 'ID de liste CRM', type: 'text', defaultValue: 'leads-list' }
      ];
    case 'apify':
      return [
        { key: 'apiToken', label: 'Jeton d\'accès Apify', type: 'password', defaultValue: '' },
        { key: 'actorId', label: 'ID de l\'Actor Apify', type: 'text', defaultValue: 'apify/google-maps-reviews-scraper' }
      ];
    case 'twilio':
      return [
        { key: 'accountSid', label: 'Twilio Account SID', type: 'text', defaultValue: 'ACxxxxxxxxxx' },
        { key: 'authToken', label: 'Twilio Auth Token', type: 'password', defaultValue: '' }
      ];
    case 'http':
      return [
        { key: 'url', label: 'URL de destination', type: 'text', defaultValue: 'https://api.example.com/v1' },
        {
          key: 'method',
          label: 'Méthode HTTP',
          type: 'select',
          defaultValue: 'POST',
          options: [
            { value: 'GET', label: 'GET' },
            { value: 'POST', label: 'POST' },
            { value: 'PUT', label: 'PUT' },
            { value: 'DELETE', label: 'DELETE' }
          ]
        },
        { key: 'headers', label: 'En-têtes HTTP (JSON)', type: 'textarea', defaultValue: '{\n  "Content-Type": "application/json"\n}' },
        { key: 'body', label: 'Corps de la requête (JSON)', type: 'textarea', defaultValue: '{\n  "status": "success"\n}' }
      ];
    case 'json':
      return [
        { key: 'expression', label: 'Expression d\'extraction (JSONPath)', type: 'text', defaultValue: '$.reviews[*].text' }
      ];
    case 'firewall':
      return [
        { key: 'ruleName', label: 'Nom de la règle de sécurité', type: 'text', defaultValue: 'LLM Injection Prevention' },
        { key: 'blockPattern', label: 'Motifs bloqués (Regex)', type: 'text', defaultValue: '(ignore user prompt|ignore previous instruction)' }
      ];
    case 'knowledge':
      return [
        { key: 'query', label: 'Requête de recherche', type: 'text', defaultValue: 'Conditions d\'onboarding' },
        { key: 'chunkSize', label: 'Taille des blocs (Chunck size)', type: 'number', defaultValue: 500 }
      ];
    case 'search':
      return [
        { key: 'query', label: 'Mots-clés de recherche', type: 'text', defaultValue: 'Avis sur ' }
      ];
    case 'local_agent':
      return [
        { key: 'agentType', label: 'Type d\'agent local', type: 'select', defaultValue: 'parser', options: [{ value: 'parser', label: 'Analyseur de document' }, { value: 'reasoner', label: 'Raisonnement logique' }] }
      ];
    case 'lovable':
      return [
        { key: 'prompt', label: 'Instructions de développement UI', type: 'textarea', defaultValue: 'Create a premium dark-themed customer review widget' }
      ];
    case 'bolt':
      return [
        { key: 'prompt', label: 'Instructions de configuration DB/API', type: 'textarea', defaultValue: 'Initialize SQLite database and REST API endpoints' }
      ];
    case 'v0':
      return [
        { key: 'prompt', label: 'Prompt de composant React', type: 'textarea', defaultValue: 'Sleek glassmorphism testimonial card component' }
      ];
    case 'seowriting':
      return [
        { key: 'keyword', label: 'Mot-clé principal', type: 'text', defaultValue: 'SEO local restaurant' }
      ];
    default:
      return [
        { key: 'apiKey', label: 'Clé API (Optionnelle)', type: 'password', defaultValue: '' },
        { key: 'operation', label: 'Opération', type: 'text', defaultValue: 'default_operation' }
      ];
  }
}

export function getDefaultConfigForTool(toolName: string, actionText?: string): Record<string, any> {
  const fields = getFieldsForTool(toolName);
  const config: Record<string, any> = {};
  for (const field of fields) {
    config[field.key] = field.defaultValue;
  }

  // Smart context override based on actionText if provided
  const actionLower = (actionText || '').toLowerCase();
  const norm = normalizeToolName(toolName);

  if (actionLower) {
    if (norm === 'claude' || norm === 'gemini' || norm === 'openai') {
      config.systemPrompt = `Tu es l'agent en charge de l'action suivante : "${actionText}". Rédige des réponses adaptées.`;
    } else if (norm === 'slack') {
      config.message = `[AURA ALERT] Action : "${actionText}" déclenchée avec succès.`;
    } else if (norm === 'http') {
      if (actionLower.includes('get')) {
        config.method = 'GET';
      }
    } else if (norm === 'google_sheets') {
      if (actionLower.includes('lire') || actionLower.includes('read') || actionLower.includes('get')) {
        config.operation = 'read';
      }
    }
  }

  return config;
}
