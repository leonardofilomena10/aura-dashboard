import React, { useState } from 'react';
import { 
  Sliders, 
  Sparkles, 
  Globe, 
  Search, 
  Star, 
  Play, 
  MessageSquareOff, 
  Plus, 
  Zap, 
  Rocket, 
  ExternalLink, 
  Download, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  ArrowLeft, 
  ArrowRight, 
  Terminal,
  X,
  Check,
  Loader
} from 'lucide-react';
import { AI_TOOLS_DATABASE } from '../constants';
import { getToolIconConfig, renderToolIcon } from '../utils';

export default function ScenariosTab({
  theme,
  gmbProfiles,
  activeProfileId,
  getBrandVoice,
  handleUpdateBrandVoice,
  handleScrapeGoogleMapsReviews,
  isScrapingReviews,
  scrapingLogs,
  scrapingProgress,
  scrapedReviews,
  handleExecuteScenarioOnReview,
  scenarioSearchTerm,
  setScenarioSearchTerm,
  scenarioSelectedCategory,
  setScenarioSelectedCategory,
  scenarioCategories,
  handleCreateScenario,
  newScenarioName,
  setNewScenarioName,
  newScenarioCategory,
  setNewScenarioCategory,
  filteredScenarios,
  setSelectedScenarioId,
  selectedScenarioId,
  deployedScenarios,
  activeScenario,
  scenariosViewMode,
  setScenariosViewMode,
  runScenarioSimulation,
  isSimulating,
  isDeploying,
  startDeployment,
  handleLaunchAutomationPipeline,
  isLaunchingAutomation,
  exportScenarioConfig,
  handleDeleteScenario,
  simCurrentStep,
  moveStep,
  removeStep,
  reorderSteps,
  setEditingStep,
  setModalToolInput,
  setModalActionInput,
  setInsertStepIndex,
  simLogs,
  simEfficiency,
  newStepTool,
  setNewStepTool,
  newStepAction,
  setNewStepAction,
  addStep,
  handleRunInAura,
  showLiveExecPanel,
  setShowLiveExecPanel,
  liveExecSteps,
  liveExecLog,
  scenarioExecutions,
  setScenarioExecutions
}) {
  const [selectedHistoricalExec, setSelectedHistoricalExec] = useState(null);
  return (
    <>
    <div className="space-y-8 animate-fadeIn">
      {/* Active target banner inside scenarios */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>Configuration du Scénario & Voix de Marque</span>
            <Sliders className={`w-6 h-6 ${theme.text}`} />
          </h2>
          <p className="text-slate-400 text-sm">
            Configurez le persona IA et importez les avis en temps réel pour l'établissement cible : <strong className="text-white">{gmbProfiles.find(p => p.id === activeProfileId)?.location || ''}</strong>.
          </p>
        </div>
      </div>

      {/* Scraper & Voix de Marque de l'Établissement Actif */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Voix de Marque IA Customizer */}
          <div className="lg:col-span-5">
            {(() => {
              const activeVoice = getBrandVoice(activeProfileId);
              return (
                <div className="space-y-4 text-slate-100">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-2">
                    <Sparkles className="w-4 h-4 text-indigo-400" />
                    <span>Voix de Marque IA (Persona Client)</span>
                  </h4>
                  
                  <div className="space-y-3.5 text-xs">
                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ton de la Rédaction</label>
                      <select
                        value={activeVoice.tone}
                        onChange={(e) => handleUpdateBrandVoice('tone', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                      >
                        <option value="professionnel">Professionnel & Courtois (Défaut)</option>
                        <option value="humoristique">Humoristique & Décalé</option>
                        <option value="formel">Formel & Institutionnel</option>
                        <option value="amical">Amical & Chaleureux</option>
                        <option value="empathique">Empathique & À l'écoute</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Utilisation des Emojis</label>
                      <select
                        value={activeVoice.emojiUsage}
                        onChange={(e) => handleUpdateBrandVoice('emojiUsage', e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                      >
                        <option value="aucun">Aucun emoji (Strict)</option>
                        <option value="faible">Modéré (1 à 2 emojis par message)</option>
                        <option value="eleved">Abondant (3+ emojis de façon dynamique)</option>
                      </select>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Mots Tabous & Interdits</label>
                      <input
                        type="text"
                        placeholder="Ex: désolé, regretter, pardon"
                        value={activeVoice.tabooWords ? activeVoice.tabooWords.join(', ') : ''}
                        onChange={(e) => handleUpdateBrandVoice('tabooWords', e.target.value.split(',').map(w => w.trim()))}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 placeholder:text-slate-600"
                      />
                      <span className="text-[9px] text-slate-500 italic block">Ces mots seront nettoyés et exclus à la génération.</span>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Signature de Réponse</label>
                      <textarea
                        placeholder="Ex: L'équipe de la Boulangerie Gourmande 🥖"
                        value={activeVoice.signature || ''}
                        onChange={(e) => handleUpdateBrandVoice('signature', e.target.value)}
                        rows={2}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 placeholder:text-slate-600 resize-none"
                      />
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Right Column: Google Maps Scraper */}
          <div className="lg:col-span-7 space-y-4">
            <div className="space-y-1">
              <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">Scraper Google Maps (Simulateur temps réel)</label>
              <button
                onClick={handleScrapeGoogleMapsReviews}
                disabled={isScrapingReviews}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                  isScrapingReviews
                    ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-650 hover:to-orange-500 text-white shadow-lg shadow-orange-950/20'
                }`}
              >
                <Globe className="w-4 h-4" />
                {isScrapingReviews 
                  ? 'Scraping en cours...' 
                  : `Scroller & Importer les avis Google Maps pour "${gmbProfiles.find(p => p.id === activeProfileId)?.location || ''}"`
                }
              </button>
            </div>

            {/* Scraper logs panel */}
            {isScrapingReviews || scrapingLogs.length > 0 ? (
              <div className="glass-card bg-black/90 p-4 rounded-xl border border-slate-850 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-indigo-400 font-bold">CONSOLE SCRAPER GOOGLE MAPS</span>
                  <span className="text-[10px] font-mono text-slate-400">{scrapingProgress}%</span>
                </div>
                
                <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-300"
                    style={{ width: `${scrapingProgress}%` }}
                  />
                </div>

                <div className="h-28 overflow-y-auto font-mono text-[10px] text-emerald-400 space-y-1 scrollbar-thin">
                  {scrapingLogs.map((log, idx) => (
                    <div key={idx} className="leading-relaxed">{log}</div>
                  ))}
                  {isScrapingReviews && (
                    <div className="flex items-center gap-1.5 text-slate-500 font-bold">
                      <span className="animate-pulse">●</span> Scraping en cours...
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="glass-card bg-slate-900/30 p-5 rounded-xl border border-slate-850 flex flex-col items-center justify-center text-center h-[178px] text-slate-500">
                <Search className="w-8 h-8 text-slate-700 mb-2" />
                <p className="text-xs">Aucun scraping d'avis en cours</p>
                <p className="text-[10px] text-slate-600 mt-1 max-w-sm">Cliquez sur le bouton ci-dessus pour simuler l'extraction en temps réel des avis Google Maps pour cet établissement.</p>
              </div>
            )}
          </div>

        </div>

        {/* Scraped reviews list */}
        <div className="space-y-3 pt-4 border-t border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Star className="w-4 h-4 text-amber-500" />
            <span>Derniers Avis Google Maps Importés ({scrapedReviews[activeProfileId]?.length || 0})</span>
          </h4>

          {scrapedReviews[activeProfileId] && scrapedReviews[activeProfileId].length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {scrapedReviews[activeProfileId].map((rev) => (
                <div key={rev.id} className="glass-card p-4 rounded-xl border border-slate-800/80 bg-slate-900/40 hover:border-slate-700/80 transition-all flex flex-col justify-between space-y-3">
                  <div className="space-y-2">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-bold text-white block">{rev.author}</span>
                        <span className="text-[10px] text-slate-500">{rev.time}</span>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className="flex items-center text-amber-400 gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star key={i} className={`w-3 h-3 ${i < rev.rating ? 'fill-current' : 'text-slate-850'}`} />
                          ))}
                        </div>
                        <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold uppercase tracking-wider ${
                          rev.sentiment === 'positive'
                            ? 'bg-emerald-500/10 text-emerald-400'
                            : 'bg-red-500/10 text-red-400'
                        }`}>
                          {rev.sentiment === 'positive' ? 'Positif' : 'Négatif'}
                        </span>
                      </div>
                    </div>
                    <p className="text-slate-300 text-xs italic leading-relaxed">
                      "{rev.text}"
                    </p>
                  </div>
                  
                  <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                    <span className="text-[9px] text-slate-500">
                      Réponse requise via l'Autopilot
                    </span>
                    <button
                      onClick={() => handleExecuteScenarioOnReview(rev)}
                      className="px-3 py-1.5 bg-indigo-600/20 hover:bg-indigo-600/40 text-indigo-300 hover:text-white rounded-lg text-[10px] font-bold flex items-center gap-1.5 transition-all border border-indigo-500/20"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      Répondre via le Scénario Actif
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card bg-slate-900/20 p-8 rounded-xl border border-slate-850 flex flex-col items-center justify-center text-center text-slate-500">
              <MessageSquareOff className="w-10 h-10 text-slate-700 mb-2" />
              <p className="text-xs">Aucun avis importé pour le moment.</p>
              <p className="text-[10px] text-slate-600 mt-1">Veuillez cliquer sur le bouton d'importation Google Maps ci-dessus pour charger les avis clients de cet établissement.</p>
            </div>
          )}
        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: List of scenarios */}
        <div className="lg:col-span-4 space-y-6">
          {/* Filters card */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-4">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Filtres de recherche</span>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-500" />
              <input
                type="text"
                placeholder="Filtrer par nom ou outil..."
                value={scenarioSearchTerm}
                onChange={(e) => setScenarioSearchTerm(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 placeholder:text-slate-500"
              />
            </div>

            <div>
              <label className="block text-[9px] font-bold text-slate-500 uppercase mb-1">Catégorie</label>
              <select
                value={scenarioSelectedCategory}
                onChange={(e) => setScenarioSelectedCategory(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-350 text-xs focus:outline-none"
              >
                <option value="all">Toutes les catégories</option>
                {scenarioCategories.filter(cat => cat !== 'all').map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Scenario Creation Form */}
          <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-4">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Créer un Scénario</span>
            <form onSubmit={handleCreateScenario} className="space-y-3">
              <div>
                <input
                  type="text"
                  placeholder="Nom du scénario..."
                  value={newScenarioName}
                  onChange={(e) => setNewScenarioName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none placeholder:text-slate-500"
                />
              </div>
              <div>
                <select
                  value={newScenarioCategory}
                  onChange={(e) => setNewScenarioCategory(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-355 text-xs focus:outline-none"
                >
                  {["Restauration / Commerces", "Création de Contenu", "SaaS & Développement", "Prospection & B2B", "Immobilier & Hôtellerie", "E-Commerce & Publicité", "Juridique & Conformité", "Santé & Médical", "Autre"].map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2 rounded-xl transition-all shadow-lg shadow-indigo-600/15 flex items-center justify-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Ajouter scénario</span>
              </button>
            </form>
          </div>

          {/* Scenario List */}
          <div className="glass-card p-4 rounded-2xl border border-slate-800/80 space-y-2">
            <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block px-2 mb-2">Scénarios disponibles</span>
            <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
              {filteredScenarios.map(scen => (
                <button
                  key={scen.id}
                  onClick={() => setSelectedScenarioId(scen.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs font-bold flex items-center justify-between transition-all duration-300 ${
                    selectedScenarioId === scen.id
                      ? 'bg-slate-900 border-indigo-500/60 text-indigo-400 shadow-md'
                      : 'bg-slate-950 border-slate-850 hover:bg-slate-900/50 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="flex flex-col gap-0.5 max-w-[70%]">
                    <span className="truncate">{scen.name}</span>
                    <span className="text-[9px] text-slate-500 font-normal truncate">{scen.category || 'Général'}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    {deployedScenarios.includes(scen.id) && (
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse shrink-0" title="Actif en Production"></span>
                    )}
                    <span className="bg-slate-900 border border-slate-800 text-[10px] px-2 py-0.5 rounded font-mono text-slate-500">
                      {scen.steps?.length || 0} étapes
                    </span>
                  </div>
                </button>
              ))}
              {filteredScenarios.length === 0 && (
                <p className="text-slate-600 italic text-xs text-center py-4">Aucun scénario trouvé</p>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Workflow sequence editor */}
        <div className="lg:col-span-8 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-6">
            {/* Active scenario metadata */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-900 pb-4">
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Éditeur de flux de travail</span>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-white leading-snug">{activeScenario.name}</h3>
                  {deployedScenarios.includes(activeScenario.id) && (
                    <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full text-[9px] font-bold flex items-center gap-1.5 animate-pulse shrink-0">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                      Actif en Production
                    </span>
                  )}
                </div>
                
                {/* View mode toggle */}
                <div className="inline-flex p-0.5 bg-slate-950 rounded-lg border border-slate-850">
                  <button
                    onClick={() => setScenariosViewMode('list')}
                    className={`px-3 py-1 text-[9px] font-bold rounded transition-all ${
                      scenariosViewMode === 'list'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-550 hover:text-slate-300'
                    }`}
                  >
                    Vue Liste
                  </button>
                  <button
                    onClick={() => setScenariosViewMode('canvas')}
                    className={`px-3 py-1 text-[9px] font-bold rounded transition-all ${
                      scenariosViewMode === 'canvas'
                        ? 'bg-indigo-600 text-white shadow'
                        : 'text-slate-550 hover:text-slate-300'
                    }`}
                  >
                    Vue Canvas (Graphique)
                  </button>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 items-center">
                <button
                  onClick={runScenarioSimulation}
                  disabled={isSimulating || isDeploying || activeScenario.steps.length === 0}
                  className="bg-indigo-650 hover:bg-indigo-600 disabled:bg-slate-900 disabled:text-slate-600 disabled:border-slate-850 border border-indigo-500/20 text-white py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                  title="Simuler visuellement le flux d'étapes sur le dashboard"
                >
                  <Zap className="w-4 h-4 text-yellow-300 animate-pulse" />
                  <span>Simuler visuellement</span>
                </button>
                <button
                  onClick={handleLaunchAutomationPipeline}
                  disabled={isLaunchingAutomation || activeScenario.steps.length === 0}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-550 hover:to-teal-550 disabled:from-slate-900 disabled:to-slate-900 disabled:text-slate-600 disabled:border-slate-850 border border-emerald-500/30 text-white py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/20"
                  title="Déployer et configurer ce scénario sur n8n ou Make"
                >
                  <ExternalLink className="w-4 h-4 text-emerald-300" />
                  <span>{isLaunchingAutomation ? "Lancement..." : "Lancer sur n8n (Production)"}</span>
                </button>
                <button
                  onClick={handleRunInAura}
                  disabled={activeScenario.steps.length === 0}
                  className="bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-550 hover:to-violet-550 disabled:from-slate-900 disabled:to-slate-900 disabled:text-slate-600 border border-indigo-500/30 text-white py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-indigo-950/20"
                  title="Exécuter et tester le scénario en direct sur Aura"
                >
                  <Play className="w-4 h-4 text-indigo-200" />
                  <span>Exécuter dans Aura (Test Live)</span>
                </button>
                <button
                  onClick={() => exportScenarioConfig(activeScenario)}
                  className="bg-slate-900 hover:bg-slate-805 border border-slate-800 text-slate-350 py-2 px-3.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5"
                >
                  <Download className="w-4 h-4 text-indigo-400" /> Export JSON
                </button>
                <button
                  onClick={() => handleDeleteScenario(activeScenario.id)}
                  className="bg-slate-900 hover:bg-rose-950/40 border border-slate-800 hover:border-rose-900/50 text-slate-400 hover:text-rose-455 py-2 px-3.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" /> Supprimer
                </button>
              </div>
            </div>
            
            {/* Help guidelines about execution choices */}
            <div className="px-6 pb-2 grid grid-cols-1 md:grid-cols-2 gap-4 text-[10px] text-slate-500 border-t border-slate-900/40 pt-3 mt-1">
              <p className="flex items-start gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1"></span>
                <span><strong>Production n8n :</strong> Génère et active le workflow en direct sur votre serveur n8n pour fonctionner de manière autonome.</span>
              </p>
              <p className="flex items-start gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0 mt-1"></span>
                <span><strong>Exécution Aura :</strong> Lance le scénario en direct avec vos vraies clés d'API (Claude, Gemini, etc.) et montre l'exécution pas à pas.</span>
              </p>
            </div>
            <div className="hidden">
            </div>

            {/* Vertical steps timeline / Graphical Canvas */}
            {scenariosViewMode === 'list' ? (
              <div className="space-y-4 relative before:absolute before:left-6 before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-900">
                {(activeScenario?.steps || []).filter(Boolean).map((step, index) => (
                  <div key={step.id} className="relative pl-12 flex items-start justify-between gap-4 animate-slideDown group">
                    {/* Timeline bubble */}
                    <span className={`absolute left-3 top-1 -translate-x-1/2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold z-10 border-2 transition-all duration-300 ${
                      isSimulating && index === simCurrentStep
                        ? 'bg-indigo-500 border-indigo-400 text-white animate-pulse shadow-md shadow-indigo-500/50'
                        : isSimulating && index < simCurrentStep
                        ? 'bg-emerald-500 border-emerald-400 text-white shadow-md shadow-emerald-500/20'
                        : 'bg-slate-900 border-indigo-500/50 text-slate-300'
                    }`}>
                      {isSimulating && index < simCurrentStep ? '✓' : index + 1}
                    </span>

                    <div className={`flex-1 p-4 border rounded-2xl transition-all flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 ${
                      isSimulating && index === simCurrentStep
                        ? 'bg-indigo-950/20 border-indigo-500/50 shadow-lg shadow-indigo-500/5 text-white'
                        : isSimulating && index < simCurrentStep
                        ? 'bg-slate-900/60 border-slate-800 opacity-60'
                        : 'bg-slate-900/40 hover:bg-slate-900/60 border-slate-850'
                    }`}>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="bg-slate-950 border border-slate-800 text-[10px] px-2 py-0.5 rounded font-bold text-indigo-400 uppercase tracking-wide">
                            {step.tool}
                          </span>
                          <Sliders className="w-3 h-3 text-slate-500 hover:text-indigo-400 cursor-pointer transition-colors animate-pulse" title="Paramètres disponibles (cliquer pour modifier)" />
                        </div>
                        <p className="text-slate-300 text-xs font-medium mt-1.5">{step.action}</p>
                        {step.config && Object.keys(step.config).filter(k => k !== 'apiKey' && k !== 'accessToken' && k !== 'authToken' && k !== 'apiToken').length > 0 && (
                          <div className="flex items-center gap-1.5 flex-wrap mt-2 font-mono text-[9px] text-slate-500">
                            <span className="bg-slate-950 px-1 py-0.5 rounded text-[8px] text-indigo-300 font-bold uppercase tracking-wider">Params</span>
                            <span className="truncate max-w-[320px] md:max-w-md">
                              {Object.keys(step.config)
                                .filter(k => k !== 'apiKey' && k !== 'accessToken' && k !== 'authToken' && k !== 'apiToken')
                                .map(k => `${k}: ${step.config[k]}`)
                                .join(' | ')}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Steps re-order & Delete */}
                      <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => moveStep(activeScenario.id, index, 'up')}
                          disabled={index === 0}
                          className="p-1 rounded bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-400 disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <ArrowUp className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => moveStep(activeScenario.id, index, 'down')}
                          disabled={index === activeScenario.steps.length - 1}
                          className="p-1 rounded bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-400 disabled:opacity-30 disabled:pointer-events-none"
                        >
                          <ArrowDown className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => removeStep(activeScenario.id, step.id)}
                          className="p-1 rounded bg-slate-950 border border-slate-850 hover:border-rose-950 hover:text-rose-400 text-slate-400 transition-colors"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {activeScenario.steps.length === 0 && (
                  <p className="text-slate-550 italic text-xs pl-12">Aucune étape configurée. Ajoutez une action ci-dessous.</p>
                )}
              </div>
            ) : (
              /* Graphical Canvas view */
              <div className="space-y-4">
                <style>{`
                  @keyframes dash {
                    to {
                      stroke-dashoffset: -20;
                    }
                  }
                  .animate-dash {
                    animation: dash 1.5s linear infinite;
                  }
                `}</style>
                <div className="overflow-x-auto flex items-center gap-6 py-6 px-4 bg-slate-950/40 border border-slate-850 rounded-2xl relative min-h-[280px] scrollbar-thin scrollbar-thumb-indigo-500/20 scrollbar-track-transparent">
                  {(activeScenario?.steps || []).filter(Boolean).map((step, index) => {
                    const isSimCurrent = isSimulating && index === simCurrentStep;
                    const isSimDone = isSimulating && index < simCurrentStep;
                    const config = getToolIconConfig(step.tool);
                    return (
                      <React.Fragment key={step.id}>
                        {/* Step Node Card */}
                        <div 
                          draggable={!isSimulating}
                          onDragStart={(e) => { e.dataTransfer.setData('text/plain', index.toString()); }}
                          onDragOver={(e) => e.preventDefault()}
                          onDrop={(e) => {
                            e.preventDefault();
                            const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
                            const toIdx = index;
                            if (fromIdx !== toIdx) {
                              reorderSteps(activeScenario.id, fromIdx, toIdx);
                            }
                          }}
                          onClick={() => {
                            if (isSimulating) return;
                            setEditingStep({ ...step, scenarioId: activeScenario.id });
                            setModalToolInput(step.tool);
                            setModalActionInput(step.action);
                          }}
                          className={`w-56 shrink-0 p-4 border rounded-2xl transition-all duration-300 flex flex-col justify-between h-[160px] relative cursor-grab active:cursor-grabbing group hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/5 ${
                            isSimCurrent
                              ? 'bg-indigo-950/30 border-indigo-500 shadow-lg shadow-indigo-500/10 text-white scale-[1.02]'
                              : isSimDone
                              ? 'bg-slate-900/60 border-slate-850 opacity-60'
                              : 'bg-slate-900/40 border-slate-850 hover:bg-slate-900/60 hover:border-slate-800'
                          }`}
                        >
                          <div className="space-y-2 overflow-hidden">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 overflow-hidden max-w-[80%] animate-fadeIn">
                                <div className={`w-6 h-6 rounded-full bg-gradient-to-tr ${config.color} p-0.5 flex items-center justify-center shrink-0`}>
                                  <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center overflow-hidden">
                                    {React.cloneElement(renderToolIcon(config.iconName), { className: 'w-3 h-3 text-white' })}
                                  </div>
                                </div>
                                <span className="bg-slate-950 border border-slate-800 text-[9px] px-1.5 py-0.5 rounded font-bold text-indigo-400 uppercase tracking-wide truncate">
                                  {step.tool}
                                </span>
                              </div>
                              <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold border shrink-0 ${
                                isSimCurrent
                                  ? 'bg-indigo-500 border-indigo-400 text-white animate-pulse'
                                  : isSimDone
                                  ? 'bg-emerald-500 border-emerald-400 text-white'
                                  : 'bg-slate-950 border-slate-800 text-slate-500'
                              }`}>
                                {isSimDone ? '✓' : index + 1}
                              </span>
                            </div>
                            <p className="text-slate-300 text-[10px] leading-relaxed font-medium line-clamp-2">
                              {step.action}
                            </p>
                            {step.config && Object.keys(step.config).filter(k => k !== 'apiKey' && k !== 'accessToken' && k !== 'authToken' && k !== 'apiToken').length > 0 && (
                              <div className="text-[8px] font-mono text-slate-500 truncate mt-1 bg-slate-950/60 px-1.5 py-0.5 rounded border border-slate-900">
                                {Object.keys(step.config)
                                  .filter(k => k !== 'apiKey' && k !== 'accessToken' && k !== 'authToken' && k !== 'apiToken')
                                  .map(k => `${k}: ${step.config[k]}`)
                                  .join(' | ')}
                              </div>
                            )}
                          </div>

                          <div className="flex items-center justify-between border-t border-slate-950 pt-2 mt-2">
                            <span className="text-[9px] font-semibold text-slate-550">Étape {index + 1}</span>
                            
                            <div className="flex items-center gap-1">
                              <button
                                onClick={(e) => { e.stopPropagation(); moveStep(activeScenario.id, index, 'up'); }}
                                disabled={index === 0}
                                className="p-1 rounded bg-slate-950 border border-slate-855 hover:bg-slate-900 text-slate-400 disabled:opacity-30 disabled:pointer-events-none"
                                title="Déplacer vers la gauche"
                              >
                                <ArrowLeft className="w-3 h-3" />
                              </button>
                              <button
                                onClick={(e) => { e.stopPropagation(); moveStep(activeScenario.id, index, 'down'); }}
                                disabled={index === activeScenario.steps.length - 1}
                                className="p-1 rounded bg-slate-950 border border-slate-855 hover:bg-slate-900 text-slate-400 disabled:opacity-30 disabled:pointer-events-none"
                                title="Déplacer vers la droite"
                              >
                                <ArrowRight className="w-3 h-3" />
                              </button>
                              {!isSimulating && (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setEditingStep({ ...step, scenarioId: activeScenario.id });
                                    setModalToolInput(step.tool);
                                    setModalActionInput(step.action);
                                  }}
                                  className="p-1 rounded bg-slate-950 border border-slate-855 hover:bg-slate-900 hover:text-indigo-400 text-slate-400"
                                  title="Modifier l'étape"
                                >
                                  <Sliders className="w-3 h-3" />
                                </button>
                              )}
                              <button
                                onClick={(e) => { e.stopPropagation(); removeStep(activeScenario.id, step.id); }}
                                className="p-1 rounded bg-slate-950 border border-slate-855 hover:border-rose-950 hover:text-rose-400 text-slate-400 transition-colors"
                                title="Supprimer"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* Connective line */}
                        {index < activeScenario.steps.length - 1 && (
                          <div className="group/arrow flex items-center justify-center shrink-0 w-10 relative h-14">
                            <svg className="w-full h-5" viewBox="0 0 40 24" fill="none">
                              <defs>
                                <linearGradient id={`grad-${index}`} x1="0%" y1="0%" x2="100%" y2="0%">
                                  <stop offset="0%" stopColor={isSimDone ? "#10b981" : "#6366f1"} stopOpacity="0.4" />
                                  <stop offset="50%" stopColor={isSimCurrent ? "#a855f7" : isSimDone ? "#10b981" : "#6366f1"} stopOpacity="1" />
                                  <stop offset="100%" stopColor={isSimCurrent ? "#6366f1" : isSimDone ? "#10b981" : "#475569"} stopOpacity="0.4" />
                                </linearGradient>
                              </defs>
                              <path
                                d="M0 12h32"
                                stroke={`url(#grad-${index})`}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeDasharray={isSimCurrent ? "6 3" : undefined}
                                className={isSimCurrent ? "animate-dash" : undefined}
                              />
                              <path
                                d="M28 8l4 4-4 4"
                                stroke={isSimCurrent ? "#a855f7" : isSimDone ? "#10b981" : "#6366f1"}
                                strokeWidth="2.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>

                            {/* Hover plus to insert step */}
                            {!isSimulating && (
                              <button
                                onClick={() => { setInsertStepIndex(index + 1); setModalToolInput(''); setModalActionInput(''); }}
                                className="w-5 h-5 bg-indigo-600 hover:bg-indigo-500 border border-indigo-550 text-white rounded-full flex items-center justify-center text-xs font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg cursor-pointer z-30 opacity-0 group-hover/arrow:opacity-100 transition-opacity duration-200 animate-fadeIn"
                                title="Insérer une étape"
                              >
                                +
                              </button>
                            )}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}

                  {/* Final append plus node */}
                  {activeScenario?.steps?.length > 0 && !isSimulating && (
                    <React.Fragment>
                      <div className="flex items-center justify-center shrink-0 w-10 relative h-14">
                        <svg className="w-full h-5" viewBox="0 0 40 24" fill="none">
                          <path d="M0 12h32" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="2.5" strokeDasharray="6 3" strokeLinecap="round" />
                          <polygon points="28,8 32,12 28,16" fill="rgba(71, 85, 105, 0.4)" />
                        </svg>
                      </div>
                      <button
                        onClick={() => { setInsertStepIndex(activeScenario.steps.length); setModalToolInput(''); setModalActionInput(''); }}
                        className="w-56 shrink-0 border-2 border-dashed border-slate-800 hover:border-indigo-500/50 bg-slate-900/20 hover:bg-slate-900/40 rounded-2xl flex flex-col items-center justify-center h-[160px] transition-all duration-300 group cursor-pointer"
                        title="Ajouter une étape à la fin"
                      >
                        <Plus className="w-8 h-8 text-slate-500 group-hover:text-indigo-400 transition-colors mb-2" />
                        <span className="text-[10px] font-bold text-slate-500 group-hover:text-indigo-400 transition-colors uppercase tracking-wider">Ajouter une étape</span>
                      </button>
                    </React.Fragment>
                  )}

                  {activeScenario.steps.length === 0 && (
                    <div className="w-full text-center py-12 flex flex-col items-center justify-center gap-2">
                      <Sliders className="w-8 h-8 text-slate-800 animate-pulse mb-1" />
                      <p className="text-slate-500 italic text-xs">Aucune étape configurée dans ce canvas.</p>
                      <button
                        onClick={() => { setInsertStepIndex(0); setModalToolInput(''); setModalActionInput(''); }}
                        className="mt-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-1.5 px-3 rounded-lg transition-colors flex items-center gap-1.5 mx-auto"
                      >
                        <Plus className="w-3.5 h-3.5" /> Créer la première étape
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Simulator Terminal Output Box */}
            {(isSimulating || simLogs.length > 0) && (
              <div className="border border-slate-850 rounded-2xl bg-slate-950 shadow-2xl overflow-hidden mt-6 animate-slideDown flex flex-col h-[220px]">
                {/* Console Header */}
                <div className="flex items-center justify-between bg-slate-900/80 px-4 py-3 border-b border-slate-800/80">
                  <span className="text-[10px] font-bold font-mono text-slate-400 uppercase flex items-center gap-1.5">
                    <Terminal className="w-3.5 h-3.5 text-indigo-400 animate-pulse" /> Console de Simulation
                  </span>
                  {isSimulating ? (
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                      <span className="text-[9px] font-mono text-indigo-400 font-bold">Exécution en cours...</span>
                    </div>
                  ) : (
                    <span className="text-[9px] font-mono text-emerald-400 font-bold">Exécution complétée</span>
                  )}
                </div>
                
                {/* Console Body */}
                <div className="flex-1 p-4 font-mono text-[10px] leading-relaxed overflow-y-auto bg-slate-950/40 space-y-2 select-text">
                  {simLogs.map((log, idx) => {
                    let colorClass = 'text-slate-400';
                    if (log.type === 'success') colorClass = 'text-emerald-400 font-semibold';
                    if (log.type === 'error') colorClass = 'text-rose-400 font-semibold';
                    if (log.type === 'system') colorClass = 'text-indigo-400 font-semibold';
                    return (
                      <div key={idx} className="flex items-start gap-2.5">
                        <span className="text-slate-650">{log.time}</span>
                        <span className={colorClass}>{log.text}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Efficiency Report Card */}
            {simEfficiency && (
              <div className="p-5 bg-gradient-to-br from-indigo-950/20 to-purple-950/10 border border-indigo-500/20 rounded-2xl space-y-4 animate-fadeIn">
                <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  <span>Rapport de Rentabilité de Production AURA AI</span>
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="bg-slate-950/50 p-3.5 border border-slate-900 rounded-xl">
                    <span className="block text-[9px] text-slate-500 uppercase font-bold">Temps Épargné</span>
                    <span className="text-base font-black text-indigo-400 mt-1 block">{simEfficiency.timeSaved} min</span>
                  </div>
                  <div className="bg-slate-950/50 p-3.5 border border-slate-900 rounded-xl">
                    <span className="block text-[9px] text-slate-500 uppercase font-bold">Coût Estimé</span>
                    <span className="text-base font-black text-purple-400 mt-1 block">{simEfficiency.estimatedCost} €</span>
                  </div>
                  <div className="bg-slate-950/50 p-3.5 border border-slate-900 rounded-xl">
                    <span className="block text-[9px] text-slate-500 uppercase font-bold">Actions Réalisées</span>
                    <span className="text-base font-black text-cyan-400 mt-1 block">{simEfficiency.stepsExecuted} / {simEfficiency.stepsExecuted}</span>
                  </div>
                  <div className="bg-slate-950/50 p-3.5 border border-slate-900 rounded-xl">
                    <span className="block text-[9px] text-slate-500 uppercase font-bold">Score d'Efficacité</span>
                    <span className="text-base font-black text-emerald-400 mt-1 block">{simEfficiency.efficiencyRating} %</span>
                  </div>
                </div>
              </div>
            )}

            {/* Add step form card */}
            <div className="p-5 bg-slate-900/50 border border-slate-800/80 rounded-2xl space-y-4">
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">Ajouter une étape au scénario</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Outil IA Associé</label>
                  <select
                    value={newStepTool}
                    onChange={(e) => setNewStepTool(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-855 rounded-xl px-3 py-2 text-slate-300 text-xs focus:outline-none"
                  >
                    {AI_TOOLS_DATABASE.map(t => (
                      <option key={t.id} value={t.name}>{t.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Description de l'action</label>
                  <input
                    type="text"
                    placeholder="Ex: Rédiger le résumé exécutif..."
                    value={newStepAction}
                    onChange={(e) => setNewStepAction(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-855 rounded-xl px-3.5 py-2 text-slate-300 text-xs focus:outline-none"
                  />
                </div>
              </div>
              <button
                onClick={() => addStep(activeScenario.id)}
                className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-855 hover:border-indigo-500/50 text-indigo-400 font-bold text-xs py-2 rounded-xl transition-all"
              >
                Ajouter l'étape
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section Historique des Exécutions ── */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Terminal className="w-4 h-4 text-indigo-400" />
            <span>Historique des exécutions (Temps Réel)</span>
          </h4>
          {(scenarioExecutions || []).length > 0 && (
            <button
              onClick={() => {
                if (window.confirm("Voulez-vous vraiment vider tout l'historique des exécutions ?")) {
                  setScenarioExecutions([]);
                }
              }}
              className="text-[10px] text-rose-455 hover:underline font-semibold"
            >
              Vider l'historique
            </button>
          )}
        </div>

        {(!scenarioExecutions || scenarioExecutions.length === 0) ? (
          <div className="p-8 bg-slate-900/10 border border-slate-850 rounded-xl text-center text-slate-500 text-xs">
            <p>Aucune exécution enregistrée pour le moment.</p>
            <p className="text-[10px] text-slate-600 mt-0.5">Utilisez le bouton "Exécuter dans Aura" ci-dessus pour lancer votre scénario en direct.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {scenarioExecutions.map((exec) => (
              <div
                key={exec.id}
                className="p-4 bg-slate-955 border border-slate-855 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs hover:border-slate-800 transition-all animate-fadeIn"
              >
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <span className="font-bold text-white">{exec.scenarioName}</span>
                    <span className="text-[10px] text-slate-500">• {exec.date} à {exec.time}</span>
                    <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                      exec.status === 'success' ? 'bg-emerald-500/10 text-emerald-400' :
                      exec.status === 'blocked' ? 'bg-amber-500/10 text-amber-400' :
                      'bg-rose-500/10 text-rose-450'
                    }`}>
                      {exec.status === 'success' ? 'Success' : exec.status === 'blocked' ? 'Blocked' : 'Error'}
                    </span>
                  </div>
                  {exec.output && (
                    <p className="text-slate-400 italic text-[11px] line-clamp-1">
                      Dernier retour : "{exec.output}"
                    </p>
                  )}
                  <p className="text-[10px] text-slate-500 font-mono">
                    {exec.steps.filter(s => s.status === 'done').length}/{exec.steps.length} etapes validees
                  </p>
                </div>
                <button
                  onClick={() => setSelectedHistoricalExec(exec)}
                  className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-indigo-400 px-3.5 py-2 rounded-xl font-bold transition-all text-xs shrink-0 self-start md:self-center"
                >
                  Rapport complet
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
      {/* ── Live Execution Panel Modal ───────────────────────────────────────── */}
      {showLiveExecPanel && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="glass-card w-full max-w-2xl rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden animate-scaleIn flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-5 border-b border-slate-800/60 flex items-center justify-between bg-gradient-to-r from-indigo-950/40 to-violet-950/40">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <Terminal className="w-5 h-5 text-indigo-400 animate-pulse" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Exécution en Direct — Aura</h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {liveExecSteps.filter(s => s.status === 'done').length}/{liveExecSteps.length} étapes terminées
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowLiveExecPanel(false)}
                className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Steps pipeline */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-thin">
              {liveExecSteps.map((step, idx) => (
                <div
                  key={step.id || idx}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all ${
                    step.status === 'running'
                      ? 'bg-indigo-500/5 border-indigo-500/30 shadow-lg shadow-indigo-500/5'
                      : step.status === 'done'
                        ? 'bg-emerald-500/5 border-emerald-500/20'
                        : 'bg-slate-950/40 border-slate-900'
                  }`}
                >
                  {/* Status icon */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    step.status === 'running'
                      ? 'bg-indigo-500/20 text-indigo-400'
                      : step.status === 'done'
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-slate-900 text-slate-600'
                  }`}>
                    {step.status === 'running' ? (
                      <Loader className="w-3.5 h-3.5 animate-spin" />
                    ) : step.status === 'done' ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : (
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">{step.tool}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        step.status === 'running' ? 'bg-indigo-500/15 text-indigo-400 animate-pulse' :
                        step.status === 'done' ? 'bg-emerald-500/15 text-emerald-400' :
                        'bg-slate-900 text-slate-500'
                      }`}>
                        {step.status === 'running' ? 'En cours...' : step.status === 'done' ? 'Terminé' : 'En attente'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{step.action}</p>
                    {step.result && (
                      <p className="text-[11px] text-emerald-300 mt-1 leading-relaxed font-medium">
                        → {step.result}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Console Log */}
            <div className="border-t border-slate-800/60 p-4 bg-black/30">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-3 h-3 text-slate-500" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Console d'Exécution</span>
              </div>
              <div className="max-h-28 overflow-y-auto scrollbar-thin space-y-0.5">
                {liveExecLog.map((log, i) => (
                  <p key={i} className="text-[10px] font-mono text-slate-400 leading-relaxed">
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer */}
            {liveExecSteps.length > 0 && liveExecSteps.every(s => s.status === 'done') && (
              <div className="p-4 border-t border-slate-800/60 flex justify-end gap-3">
                <button
                  onClick={() => setShowLiveExecPanel(false)}
                  className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-550 hover:to-teal-550 text-white text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-950/20"
                >
                  <Check className="w-4 h-4" />
                  Scénario accompli — Retour au Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ── Historical Execution Report Modal ── */}
      {selectedHistoricalExec && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-fadeIn">
          <div className="glass-card w-full max-w-2xl rounded-3xl border border-slate-800/80 shadow-2xl overflow-hidden animate-scaleIn flex flex-col max-h-[85vh]">
            {/* Header */}
            <div className="p-5 border-b border-slate-800/60 flex items-center justify-between bg-gradient-to-r from-slate-900 to-indigo-950/20">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
                  <Terminal className="w-5 h-5 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">Rapport Historique : {selectedHistoricalExec.scenarioName}</h3>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    Lance le {selectedHistoricalExec.date} a {selectedHistoricalExec.time}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSelectedHistoricalExec(null)}
                className="p-1.5 hover:bg-slate-900 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Steps pipeline */}
            <div className="flex-1 overflow-y-auto p-5 space-y-3 scrollbar-thin">
              {selectedHistoricalExec.steps.map((step, idx) => (
                <div
                  key={step.id || idx}
                  className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all ${
                    step.status === 'done'
                      ? 'bg-emerald-500/5 border-emerald-500/20'
                      : step.status === 'missing'
                      ? 'bg-amber-500/5 border-amber-500/20'
                      : step.status === 'error'
                      ? 'bg-rose-500/5 border-rose-500/20'
                      : 'bg-slate-955 border-slate-900'
                  }`}
                >
                  {/* Status icon */}
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                    step.status === 'done'
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : step.status === 'missing'
                      ? 'bg-amber-500/20 text-amber-400'
                      : step.status === 'error'
                      ? 'bg-rose-500/20 text-rose-455'
                      : 'bg-slate-900 text-slate-600'
                  }`}>
                    {step.status === 'done' ? (
                      <Check className="w-3.5 h-3.5" />
                    ) : step.status === 'missing' ? (
                      <span className="text-[11px] font-bold">!</span>
                    ) : step.status === 'error' ? (
                      <span className="text-[11px] font-bold">x</span>
                    ) : (
                      <span className="text-[10px] font-bold">{idx + 1}</span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-white">{step.tool}</span>
                      <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider ${
                        step.status === 'done' ? 'bg-emerald-500/15 text-emerald-400' :
                        step.status === 'missing' ? 'bg-amber-500/15 text-amber-400' :
                        step.status === 'error' ? 'bg-rose-500/15 text-rose-400' :
                        'bg-slate-900 text-slate-500'
                      }`}>
                        {step.status === 'done' ? 'Termine' : step.status === 'missing' ? 'Bloque' : step.status === 'error' ? 'Erreur' : 'En attente'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">{step.action}</p>
                    
                    {step.result && (
                      <div className="mt-2 p-2 bg-slate-900/60 rounded-xl border border-slate-850">
                        <span className="text-[8px] font-bold text-slate-500 uppercase tracking-widest block mb-0.5">Resultat obtenu</span>
                        <p className="text-[11px] text-emerald-300 leading-relaxed font-medium">
                          {step.result}
                        </p>
                      </div>
                    )}

                    {step.errorMsg && (
                      <p className="text-[11px] text-rose-400 mt-1 leading-relaxed font-medium">
                        {step.errorMsg}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Console Log */}
            <div className="border-t border-slate-800/60 p-4 bg-black/30">
              <div className="flex items-center gap-2 mb-2">
                <Terminal className="w-3 h-3 text-slate-500" />
                <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Logs de la session</span>
              </div>
              <div className="max-h-28 overflow-y-auto scrollbar-thin space-y-0.5">
                {(selectedHistoricalExec.logs || []).map((log, i) => (
                  <p key={i} className="text-[10px] font-mono text-slate-400 leading-relaxed">
                    {log}
                  </p>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-slate-800/60 flex justify-end">
              <button
                onClick={() => setSelectedHistoricalExec(null)}
                className="px-5 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl transition-all"
              >
                Fermer le rapport
              </button>
            </div>
          </div>
        </div>
      )}

    </>
  );
}
