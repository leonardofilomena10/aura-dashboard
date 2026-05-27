import React, { useMemo, useState } from 'react';
import { 
  Search, Sparkles, AlertTriangle, ArrowRight, Check, X, 
  Terminal, ExternalLink, Copy, Zap, Cpu, Building, Mic, 
  Video, Mail, FileText, Database, Layers, Settings, ShieldCheck,
  Code
} from 'lucide-react';
import { AI_TOOLS_DATABASE } from '../constants';

export default function CatalogTab({
  searchTerm,
  setSearchTerm,
  selectedCategory,
  setSelectedCategory,
  categories,
  selectedTool,
  setSelectedTool,
  apiKeys,
  getCategoryDetails,
  copyToClipboard,
  setActiveTab,
  setActionMode
}) {
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'workflows'
  const [selectedWorkflowId, setSelectedWorkflowId] = useState('gmb-auto');

  const workflows = [
    {
      id: 'gmb-auto',
      name: "Pilotage Auto GMB & Avis Client",
      description: "Scraper, modérer et répondre automatiquement aux avis Google Maps de vos clients locaux.",
      icon: <Building className="w-4 h-4 text-emerald-400" />,
      actionLabel: "Lancer dans le Terminal (GMB Avis)",
      actionTab: "live-action",
      actionMode: "gmb",
      steps: [
        {
          num: 1,
          name: "Scraping & Détection",
          desc: "Extraction automatique des avis Google Maps par e-mail ou API localisée.",
          toolId: "gmb-autoresponder",
          toolLabel: "GMB Profile Manager AI",
        },
        {
          num: 2,
          name: "Raisonnement & Voix",
          desc: "Génération de réponses haut de gamme respectant la charte et le ton du client.",
          toolId: "claude-3-5",
          toolLabel: "Claude 3.5 Sonnet",
        },
        {
          num: 3,
          name: "Chef d'Orchestre",
          desc: "Orchestration en temps réel des flux et publication automatique.",
          toolId: "n8n",
          toolLabel: "n8n Workflow Engine",
        }
      ]
    },
    {
      id: 'b2b-outreach',
      name: "Tunnel de Prospection B2B",
      description: "Qualifier des leads locaux et générer des mails de prospection hyper-personnalisés.",
      icon: <Mail className="w-4 h-4 text-indigo-400" />,
      actionLabel: "Configurer la Prospection (Terminal)",
      actionTab: "live-action",
      actionMode: "outreach",
      steps: [
        {
          num: 1,
          name: "Extraction & Veille",
          desc: "Recherche intelligente de commerces locaux et qualification des points faibles.",
          toolId: "perplexity",
          toolLabel: "Perplexity AI Pro",
        },
        {
          num: 2,
          name: "Automatisation CRM",
          desc: "Routage des informations extraites et stockage structuré dans les bases prospects.",
          toolId: "make",
          toolLabel: "Make.com Router",
        },
        {
          num: 3,
          name: "Génération de Copie",
          desc: "Rédaction automatisée de propositions de valeur impactantes par mail.",
          toolId: "gpt-4o",
          toolLabel: "OpenAI GPT-4o",
        }
      ]
    },
    {
      id: 'tiktok-creator',
      name: "Automatisation Médias (TikTok)",
      description: "Générer des scripts viraux et des voix-off réalistes de synthèse pour vidéos promotionnelles.",
      icon: <Video className="w-4 h-4 text-purple-400" />,
      actionLabel: "Créer un Script TikTok (Terminal)",
      actionTab: "live-action",
      actionMode: "tiktok",
      steps: [
        {
          num: 1,
          name: "Rédaction Script",
          desc: "Écriture de scripts courts avec accroches psychologiques et call-to-action.",
          toolId: "claude-3-5",
          toolLabel: "Claude 3.5 Sonnet",
        },
        {
          num: 2,
          name: "Synthèse Vocale",
          desc: "Génération de la voix-off avec intonation naturelle et émotions réalistes.",
          toolId: "elevenlabs",
          toolLabel: "ElevenLabs Voice Engine",
        },
        {
          num: 3,
          name: "Rendu & Montage",
          desc: "Génération vidéo d'avatars parlants ou montage assisté par IA.",
          toolId: "heygen",
          toolLabel: "HeyGen Avatars",
        },
        {
          num: 4,
          name: "Notification Pipeline",
          desc: "Envoi automatique du fichier audio généré et alertes aux administrateurs.",
          toolId: "n8n",
          toolLabel: "n8n Workflow Engine",
        }
      ]
    },
    {
      id: 'saas-builder',
      name: "Idéation & SaaS Builder",
      description: "Prendre une idée de micro-logiciel, en créer l'interface React et gérer la facturation Stripe.",
      icon: <Code className="w-4 h-4 text-cyan-400" />,
      actionLabel: "Lancer SaaS Builder (Terminal)",
      actionTab: "live-action",
      actionMode: "saas",
      steps: [
        {
          num: 1,
          name: "Idéation & Analyse",
          desc: "Validation d'opportunités de micro-SaaS local et structures de base de données.",
          toolId: "gemini-omni",
          toolLabel: "Google Gemini Omni",
        },
        {
          num: 2,
          name: "Design Composants",
          desc: "Génération d'interfaces interactives modernes et épurées.",
          toolId: "v0-dev",
          toolLabel: "v0.dev (Vercel)",
        },
        {
          num: 3,
          name: "Codage Web",
          desc: "Assemblage de l'application web full-stack réactive utilisable en direct.",
          toolId: "lovable",
          toolLabel: "Lovable.dev",
        },
        {
          num: 4,
          name: "Monétisation",
          desc: "Abonnements récurrents et encaissement sécurisé par Stripe.",
          toolId: "stripe",
          toolLabel: "Stripe API",
        }
      ]
    }
  ];

  const filteredTools = useMemo(() => {
    return AI_TOOLS_DATABASE.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tool.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.utility.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const renderSidebarDetails = () => {
    if (!selectedTool) return null;
    return (
      <div className="glass-card p-6 rounded-2xl border border-indigo-500/30 static lg:sticky top-24 self-start animate-slideLeft space-y-6">
        {/* Sidebar Header */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase text-indigo-400 tracking-wider">
              Fiche technique détaillée
            </span>
            <h3 className="text-xl font-extrabold text-white mt-1">
              {selectedTool.name}
            </h3>
          </div>
          <button
            onClick={() => setSelectedTool(null)}
            className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-all focus:outline-none"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Core details */}
        <div className="space-y-4 text-xs leading-relaxed text-slate-300">
          <div className="grid grid-cols-2 gap-4 bg-slate-900/50 p-4 rounded-xl border border-slate-800/40">
            <div>
              <span className="block text-[10px] text-slate-500 font-semibold uppercase">Plan d'essai</span>
              <span className="text-slate-200 font-bold mt-0.5 block">{selectedTool.freeTier}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-semibold uppercase">Prix Moyen</span>
              <span className="text-slate-200 font-bold mt-0.5 block">{selectedTool.price}</span>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-white flex items-center gap-1.5 mb-1 text-xs">
              <Terminal className="w-4 h-4 text-indigo-400" /> Utilité principale & Cas d'usage
            </h4>
            <p className="bg-slate-900/30 p-3 rounded-lg border border-slate-800/40 text-slate-400">
              {selectedTool.utility}
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white flex items-center gap-1.5 mb-1 text-xs">
              <Sparkles className="w-4 h-4 text-purple-400" /> Best Combo (Combinaison optimale)
            </h4>
            <p className="bg-slate-900/30 p-3 rounded-lg border border-slate-800/40 text-slate-400">
              {selectedTool.bestCombo}
            </p>
          </div>
        </div>

        {/* Action buttons */}
        <div className="flex flex-col gap-2 pt-2 border-t border-slate-900">
          <a
            href={selectedTool.link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-2.5 px-4 rounded-xl text-center font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20"
          >
            <span>{selectedTool.linkLabel || "Visiter le site officiel"}</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          
          <button
            onClick={() => copyToClipboard(`${selectedTool.name} - ${selectedTool.shortDesc}\nUtilité: ${selectedTool.utility}\nCombinaison: ${selectedTool.bestCombo}`)}
            className="w-full bg-slate-900 border border-slate-800 hover:bg-slate-800 text-slate-200 py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all focus:outline-none"
          >
            <Copy className="w-4 h-4" />
            <span>Copier la fiche outil</span>
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top row controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Catalogue d'Élite des Outils IA</span>
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          </h2>
          <p className="text-slate-400 text-sm">Découvrez, recherchez et interconnectez les meilleures applications IA du marché.</p>
        </div>

        {/* Mode selector */}
        <div className="flex bg-slate-900/60 p-1 rounded-xl border border-slate-800/80">
          <button
            onClick={() => setViewMode('grid')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'grid'
                ? 'bg-indigo-600 text-white shadow shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Vue Liste
          </button>
          <button
            onClick={() => setViewMode('workflows')}
            className={`px-4 py-2 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === 'workflows'
                ? 'bg-indigo-600 text-white shadow shadow-indigo-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Symphonie d'Automatisation (Tâches)</span>
          </button>
        </div>

        {/* Search input - only shown in list view */}
        {viewMode === 'grid' && (
          <div className="relative w-full md:w-80 animate-fadeIn">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Rechercher un outil, une utilité..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-500"
            />
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {viewMode === 'grid' ? (
        <>
          {/* Categories filter buttons */}
          <div className="flex flex-wrap gap-2 pb-2 overflow-x-auto">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-semibold whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === cat.id
                    ? `bg-slate-900 border-indigo-500/70 text-indigo-400 shadow-md shadow-indigo-500/5`
                    : 'bg-slate-950 border-slate-800/80 text-slate-400 hover:border-slate-700/80 hover:text-slate-200'
                }`}
              >
                <span className={`p-1 rounded ${selectedCategory === cat.id ? 'bg-indigo-500/10 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                  {cat.icon}
                </span>
                <span>{cat.name}</span>
              </button>
            ))}
          </div>

          {/* Grid of Tools & Detail Sidebar */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Grid content */}
            <div className={`${selectedTool ? 'lg:col-span-8' : 'lg:col-span-12'} grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 transition-all duration-500`}>
              {filteredTools.map(tool => {
                const details = getCategoryDetails(tool.category);
                const isKeySet = apiKeys[tool.id] && apiKeys[tool.id].trim() !== '';

                return (
                  <div
                    key={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    className={`group relative glass-card p-6 rounded-2xl border transition-all duration-300 hover:border-indigo-500/40 hover:-translate-y-1 cursor-pointer flex flex-col justify-between ${
                      selectedTool?.id === tool.id ? 'border-indigo-500 shadow-xl shadow-indigo-500/5' : 'border-slate-800/75'
                    }`}
                  >
                    <div>
                      {/* Header card with category details */}
                      <div className="flex items-center justify-between mb-4">
                        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide uppercase ${details.color} ${details.text}`}>
                          {details.icon}
                          {details.name}
                        </span>
                        <span className="text-amber-400 font-bold text-sm flex items-center gap-1">
                          ★ {tool.rating}
                        </span>
                      </div>

                      {/* Title and Key indicators */}
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                          {tool.name}
                        </h3>
                        {isKeySet && (
                          <span className="bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                            <Check className="w-3 h-3" /> Clé Active
                          </span>
                        )}
                      </div>

                      <p className="text-slate-400 text-xs leading-relaxed mb-4">
                        {tool.shortDesc}
                      </p>
                    </div>

                    {/* Card Footer utilities */}
                    <div className="border-t border-slate-900 pt-4 flex items-center justify-between">
                      <span className="text-[11px] text-slate-500 font-semibold">{tool.freeTier}</span>
                      <span className="text-indigo-400 text-xs font-bold flex items-center gap-1 group-hover:underline">
                        Voir détails <ArrowRight className="w-3 h-3 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                );
              })}

              {filteredTools.length === 0 && (
                <div className="col-span-full py-16 text-center">
                  <AlertTriangle className="w-12 h-12 text-slate-600 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-slate-300">Aucun outil trouvé</h3>
                  <p className="text-slate-500 text-sm">Vérifiez vos termes de recherche ou la catégorie sélectionnée.</p>
                </div>
              )}
            </div>

            {/* Sidebar detail drawer */}
            {selectedTool && renderSidebarDetails()}
          </div>
        </>
      ) : (
        /* Workflows & Task Groupings Dashboard View */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left panel: Workflows selector & diagram */}
          <div className={`${selectedTool ? 'lg:col-span-8' : 'lg:col-span-12'} space-y-6 transition-all duration-500`}>
            {/* Task list selection buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
              {workflows.map(wf => (
                <button
                  key={wf.id}
                  onClick={() => setSelectedWorkflowId(wf.id)}
                  className={`glass-card p-4 rounded-xl border text-left transition-all duration-300 flex flex-col justify-between h-32 hover:border-indigo-500/40 relative overflow-hidden group ${
                    selectedWorkflowId === wf.id
                      ? 'border-indigo-500 bg-indigo-950/10 shadow-lg shadow-indigo-500/5'
                      : 'border-slate-800/80 bg-slate-900/10'
                  }`}
                >
                  <div className="flex items-start justify-between w-full">
                    <div className="p-2 bg-slate-950 border border-slate-850 rounded-lg group-hover:text-indigo-400 transition-colors">
                      {wf.icon}
                    </div>
                    {selectedWorkflowId === wf.id && (
                      <span className="w-2 h-2 rounded-full bg-indigo-400" />
                    )}
                  </div>
                  <div className="mt-4">
                    <h4 className="text-xs font-extrabold text-white tracking-wide group-hover:text-indigo-400 transition-colors">
                      {wf.name}
                    </h4>
                    <p className="text-[10px] text-slate-500 line-clamp-1 mt-0.5">{wf.description}</p>
                  </div>
                </button>
              ))}
            </div>

            {/* Flowchart Diagram Area */}
            {(() => {
              const activeWf = workflows.find(w => w.id === selectedWorkflowId);
              if (!activeWf) return null;

              return (
                <div className="glass-card p-8 rounded-2xl border border-slate-800/80 bg-slate-900/15 space-y-6 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />
                  
                  {/* Workflow header metadata */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-850 pb-5">
                    <div className="space-y-1">
                      <span className="text-[10px] bg-indigo-500/10 text-indigo-400 px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wide">
                        Symphonie d'Automatisation active
                      </span>
                      <h3 className="text-lg font-extrabold text-white tracking-wide">{activeWf.name}</h3>
                      <p className="text-xs text-slate-450">{activeWf.description}</p>
                    </div>

                    <button
                      onClick={() => {
                        setActionMode(activeWf.actionMode);
                        setActiveTab(activeWf.actionTab);
                      }}
                      className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5 self-start sm:self-center"
                    >
                      <Zap className="w-3.5 h-3.5 text-white" />
                      <span>{activeWf.actionLabel}</span>
                    </button>
                  </div>

                  {/* Steps horizontal/vertical flowchart */}
                  <div className="flex flex-col md:flex-row items-stretch justify-between gap-6 py-4">
                    {activeWf.steps.map((step, idx) => {
                      const stepTool = AI_TOOLS_DATABASE.find(t => t.id === step.toolId);
                      const isKeySet = apiKeys[step.toolId] && apiKeys[step.toolId].trim() !== '';
                      
                      return (
                        <React.Fragment key={step.toolId}>
                          {/* Step card */}
                          <div
                            onClick={() => {
                              if (stepTool) {
                                setSelectedTool(stepTool);
                              }
                            }}
                            className={`flex-1 glass-card p-5 rounded-xl border hover:border-indigo-500/50 hover:scale-[1.02] transition-all cursor-pointer flex flex-col justify-between gap-4 bg-slate-950/40 relative overflow-hidden group ${
                              selectedTool?.id === step.toolId ? 'border-indigo-500 bg-indigo-950/5' : 'border-slate-850'
                            }`}
                          >
                            <div className="space-y-3">
                              {/* Step number badge & Key status */}
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] font-extrabold text-indigo-400 uppercase tracking-widest bg-indigo-500/10 px-2 py-0.5 rounded">
                                  Étape {step.num}
                                </span>
                                <span className={`px-2 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                                  isKeySet 
                                    ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                    : 'bg-rose-500/10 text-rose-450 border border-rose-500/20'
                                }`}>
                                  {isKeySet ? 'Actif' : 'Clé requise'}
                                </span>
                              </div>

                              {/* Step contents */}
                              <div>
                                <h4 className="text-xs font-bold text-white group-hover:text-indigo-400 transition-colors">
                                  {step.name}
                                </h4>
                                <span className="text-[10px] text-indigo-300 block mt-0.5 font-medium">{step.toolLabel}</span>
                                <p className="text-[10px] text-slate-500 leading-relaxed mt-2">{step.desc}</p>
                              </div>
                            </div>

                            {/* Small footer link */}
                            <div className="border-t border-slate-900 pt-3 flex items-center justify-between text-[9px]">
                              <span className="text-slate-650 font-bold uppercase">Configurer la clé</span>
                              <span className="text-indigo-400 font-bold group-hover:underline flex items-center gap-0.5">
                                Fiche outil <ArrowRight className="w-2.5 h-2.5 transition-transform group-hover:translate-x-0.5" />
                              </span>
                            </div>
                          </div>

                          {/* Arrow spacer between cards (only on md sizes and up) */}
                          {idx < activeWf.steps.length - 1 && (
                            <div className="hidden md:flex items-center justify-center text-slate-700 select-none animate-pulse">
                              <ArrowRight className="w-5 h-5 shrink-0" />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Right panel: Sidebar detail drawer */}
          {selectedTool && (
            <div className="lg:col-span-4">
              {renderSidebarDetails()}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
