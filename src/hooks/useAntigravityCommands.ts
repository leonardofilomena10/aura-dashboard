import { callGeminiAPI } from '../services/geminiService';
import { executeRealElevenLabsTTS } from '../services/elevenLabsService';
import useUIStore from '../stores/useUIStore';
import useApiKeysStore from '../stores/useApiKeysStore';
import useClientsStore from '../stores/useClientsStore';

export const startSpeechRecognition = (onTranscript, onEnd, triggerToast) => {
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SpeechRecognition) {
    triggerToast("⚠️ La reconnaissance vocale n'est pas supportée dans votre navigateur.");
    return null;
  }
  const recognition = new SpeechRecognition();
  recognition.lang = 'fr-FR';
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.maxAlternatives = 1;

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    onTranscript(transcript);
  };

  recognition.onend = () => {
    if (onEnd) onEnd();
  };

  recognition.onerror = (event) => {
    console.error("Speech recognition error", event.error);
    if (onEnd) onEnd();
  };

  recognition.start();
  return recognition;
};

export const parseStepVoiceDescription = (text) => {
  const textLower = text.toLowerCase();
  let detectedTool = "";
  
  if (textLower.includes("slack")) {
    detectedTool = "Slack";
  } else if (textLower.includes("gmail") || textLower.includes("email") || textLower.includes("e-mail") || textLower.includes("courriel")) {
    detectedTool = "Gmail";
  } else if (textLower.includes("sheet") || textLower.includes("sheets") || textLower.includes("tableur") || textLower.includes("google sheets") || textLower.includes("excel")) {
    detectedTool = "Google Sheets";
  } else if (textLower.includes("twilio") || textLower.includes("sms")) {
    detectedTool = "Twilio";
  } else if (textLower.includes("bland") || textLower.includes("appel") || textLower.includes("téléphone") || textLower.includes("voix")) {
    detectedTool = "Bland.ai";
  } else if (textLower.includes("elevenlabs") || textLower.includes("synthèse vocale") || textLower.includes("audio")) {
    detectedTool = "ElevenLabs";
  } else if (textLower.includes("notion")) {
    detectedTool = "Notion";
  } else if (textLower.includes("openai") || textLower.includes("gemini") || textLower.includes("claude") || textLower.includes("gpt") || textLower.includes("ia") || textLower.includes("llm") || textLower.includes("intelligence artificielle")) {
    detectedTool = "Gemini IA";
  } else if (textLower.includes("airtable")) {
    detectedTool = "Airtable";
  } else if (textLower.includes("stripe") || textLower.includes("paiement")) {
    detectedTool = "Stripe";
  } else if (textLower.includes("shopify") || textLower.includes("boutique")) {
    detectedTool = "Shopify";
  }
  
  return { tool: detectedTool, action: text };
};

export const useAntigravityCommands = (setAntigravityMessages, setAntigravityCommandInput) => {
  const setActiveTab = useUIStore(state => state.setActiveTab);
  const setPrimaryBrandTheme = useUIStore(state => state.setPrimaryBrandTheme);
  const setAgencyName = useUIStore(state => state.setAgencyName);
  const setAutomationPlatform = useUIStore(state => state.setAutomationPlatform);
  
  const setKey = useApiKeysStore(state => state.setKey);
  const apiKeys = useApiKeysStore(state => state.apiKeys);
  
  const addClient = useClientsStore(state => state.addClient);

  const processAntigravityCommand = async (cmdText) => {
    if (!cmdText.trim()) return;
    
    const userMsg = { sender: 'user', text: cmdText };
    setAntigravityMessages(prev => [...prev, userMsg]);
    setAntigravityCommandInput('');
    
    const text = cmdText.toLowerCase();
    let reply = null;
    let actionTaken = false;
    
    // 1. Navigation Commands
    if (text.includes("onglet") || text.includes("va sur") || text.includes("affiche") || text.includes("montre") || text.includes("ouvre")) {
      if (text.includes("réglage") || text.includes("setting") || text.includes("configuration")) {
        setActiveTab('settings');
        reply = "Fait ! J'ai ouvert l'onglet des configurations et réglages.";
        actionTaken = true;
      } else if (text.includes("scénario") || text.includes("scenario") || text.includes("flux")) {
        setActiveTab('scenarios');
        reply = "Fait ! J'ai ouvert l'onglet des scénarios et automatisation.";
        actionTaken = true;
      } else if (text.includes("client")) {
        setActiveTab('clients');
        reply = "Fait ! J'ai ouvert l'onglet de gestion des clients.";
        actionTaken = true;
      } else if (text.includes("profil") || text.includes("gmb")) {
        setActiveTab('profiles');
        reply = "Fait ! J'ai ouvert l'onglet des profils Google My Business.";
        actionTaken = true;
      } else if (text.includes("catalogue") || text.includes("outil")) {
        setActiveTab('catalog');
        reply = "Fait ! J'ai ouvert le catalogue des outils d'IA.";
        actionTaken = true;
      } else if (text.includes("télémétrie") || text.includes("telemetry") || text.includes("historique")) {
        setActiveTab('telemetry');
        reply = "Fait ! J'ai ouvert l'onglet de télémétrie des exécutions.";
        actionTaken = true;
      } else if (text.includes("roi") || text.includes("rentabilité") || text.includes("calcul")) {
        setActiveTab('roi');
        reply = "Fait ! J'ai ouvert le simulateur de ROI.";
        actionTaken = true;
      } else if (text.includes("live") || text.includes("chat")) {
        setActiveTab('live-action');
        reply = "Fait ! J'ai ouvert le module Live Action.";
        actionTaken = true;
      }
    }
    
    // 2. Theme Commands
    if (!actionTaken && (text.includes("thème") || text.includes("theme") || text.includes("couleur"))) {
      if (text.includes("émeraude") || text.includes("vert") || text.includes("emerald")) {
        setPrimaryBrandTheme('emerald');
        reply = "Fait ! J'ai activé le thème Émeraude.";
        actionTaken = true;
      } else if (text.includes("violet") || text.includes("purple") || text.includes("violette")) {
        setPrimaryBrandTheme('violet');
        reply = "Fait ! J'ai activé le thème Violet.";
        actionTaken = true;
      } else if (text.includes("rose") || text.includes("pink")) {
        setPrimaryBrandTheme('rose');
        reply = "Fait ! J'ai activé le thème Rose.";
        actionTaken = true;
      } else if (text.includes("ambre") || text.includes("orange") || text.includes("amber")) {
        setPrimaryBrandTheme('amber');
        reply = "Fait ! J'ai activé le thème Ambre.";
        actionTaken = true;
      } else if (text.includes("indigo") || text.includes("bleu")) {
        setPrimaryBrandTheme('indigo');
        reply = "Fait ! J'ai activé le thème Indigo.";
        actionTaken = true;
      }
    }
    
    // 3. API Keys Config Commands
    if (!actionTaken && (text.includes("clé api") || text.includes("api key") || text.includes("token"))) {
      const match = cmdText.match(/(openai|n8n|gemini|elevenlabs|bland)\s+sur\s+(.+)$/i);
      if (match) {
        const keyName = match[1].toLowerCase();
        const keyValue = match[2].trim();
        setKey(keyName, keyValue);
        reply = `Fait ! J'ai configuré la clé API pour "${keyName}".`;
        actionTaken = true;
      }
    }

    // 3b. Agency Rename Command
    if (!actionTaken && text.includes("agence") && (text.includes("nom") || text.includes("appelle") || text.includes("renomme") || text.includes("change"))) {
      const match = cmdText.match(/(?:agence en|agence|l'agence)\s+([^,.]+)/i);
      if (match) {
        const newName = match[1].trim();
        setAgencyName(newName);
        reply = `Fait ! Le nom de l'agence a été modifié pour : "${newName}".`;
        actionTaken = true;
      }
    }

    // 3c. Platform Selector Command
    if (!actionTaken && (text.includes("plateforme") || (text.includes("automation") && (text.includes("n8n") || text.includes("make"))))) {
      if (text.includes("n8n")) {
        setAutomationPlatform('n8n');
        reply = "Fait ! La plateforme d'automatisation active est désormais n8n.";
        actionTaken = true;
      } else if (text.includes("make")) {
        setAutomationPlatform('make');
        reply = "Fait ! La plateforme d'automatisation active est désormais Make.com.";
        actionTaken = true;
      }
    }
    
    // 4. Client creation
    if (!actionTaken && (text.includes("crée un client") || text.includes("ajoute le client") || text.includes("nouveau client"))) {
      const match = cmdText.match(/(?:client|l'utilisateur)\s+([^,.]+)/i);
      if (match) {
        const name = match[1].trim();
        const newClient = {
          id: `client-${Date.now()}`,
          name: name,
          businessType: "Commerce Local",
          location: "Paris, FR",
          joinedDate: new Date().toISOString().split('T')[0],
          monthlyReviews: 0,
          activeCampaigns: 0,
          automationActive: false,
          avatarUrl: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80`
        };
        addClient(newClient);
        reply = `Fait ! J'ai ajouté le client "${name}" dans la liste des clients.`;
        actionTaken = true;
      }
    }

    // 5. Advanced Gemini Fallback
    if (!reply) {
      const activeGeminiKey = apiKeys["gemini-omni"];
      if (activeGeminiKey) {
        try {
          reply = await callGeminiAPI(
            cmdText, 
            "Tu es l'assistant vocal IA du dashboard Aura. Réponds brièvement (2 phrases max).",
            activeGeminiKey
          );
        } catch (err) {
          reply = "Commande incomprise et l'API Gemini n'a pas pu répondre.";
        }
      } else {
        reply = "Commande vocale incomprise. Essayez 'Ouvre l'onglet catalogue' ou configurez Gemini pour des réponses IA.";
      }
    }

    const aiMsg = { sender: 'ai', text: reply };
    setAntigravityMessages(prev => [...prev, aiMsg]);

    const activeElevenKey = apiKeys["elevenlabs"];
    if (activeElevenKey) {
      try {
        const audioUrl = await executeRealElevenLabsTTS(reply, activeElevenKey);
        const audio = new Audio(audioUrl);
        audio.play();
      } catch (err) {
        console.error("Erreur ElevenLabs TTS", err);
      }
    }
  };

  return { processAntigravityCommand };
};
