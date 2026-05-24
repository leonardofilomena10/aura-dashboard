import React, { useState } from 'react';
import {
  MessageSquare,
  Video,
  Code,
  Mail,
  Play,
  UserCheck,
  Sliders,
  RotateCw,
  Zap,
  Cpu,
  CheckCircle2,
  Copy,
  Terminal,
  Plus,
  Trash2
} from 'lucide-react';
import { getToolIconConfig, renderToolIcon } from '../utils';

export default function LiveActionTab({
  theme,
  actionMode,
  setActionMode,
  gmbLocation,
  setGmbLocation,
  gmbReviewInput,
  setGmbReviewInput,
  gmbSentiment,
  setGmbSentiment,
  tiktokTopic,
  setTiktokTopic,
  tiktokTone,
  setTiktokTone,
  saasIdea,
  setSaasIdea,
  outreachIndustry,
  setOutreachIndustry,
  outreachValueProp,
  setOutreachValueProp,
  outreachTone,
  setOutreachTone,
  youtubeTopic,
  setYoutubeTopic,
  youtubeAudience,
  setYoutubeAudience,
  youtubeDuration,
  setYoutubeDuration,
  multiAgentTask,
  setMultiAgentTask,
  multiAgentA1,
  setMultiAgentA1,
  multiAgentA2,
  setMultiAgentA2,
  selectedScenarioId,
  setSelectedScenarioId,
  scenarios,
  activeScenario,
  executeLiveAction,
  executeMultiAgentSimulation,
  isAiLoading,
  isMultiAgentSimulating,
  multiAgentStep,
  multiAgentDialogue,
  copyToClipboard,
  isSimulating,
  simCurrentStep,
  reorderSteps,
  setEditingStep,
  setModalToolInput,
  setModalActionInput,
  removeStep,
  setInsertStepIndex,
  aiLogs,
  setAiLogs,
  terminalBottomRef,
  aiOutput,
  apiKeys,
  executeRealElevenLabsTTS,
  primaryBrandTheme,
  setPrimaryBrandTheme,
  triggerToast,
  runScenarioSimulation,
  selectedGeminiModel,
  setSelectedGeminiModel
}) {
  const [cliInput, setCliInput] = useState('');

  const handleCliSubmit = async (cmd) => {
    if (!cmd.trim()) return;
    const cleanCmd = cmd.trim();
    const parts = cleanCmd.split(' ');
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    const pushLog = (text, type = 'info') => {
      setAiLogs(prev => [...prev, { time: new Date().toLocaleTimeString(), text, type }]);
    };

    pushLog(`aura-cli> ${cleanCmd}`, 'system');

    switch (command) {
      case 'help':
        pushLog("=== Commandes disponibles ===", 'system');
        pushLog("help            - Affiche cette aide", 'info');
        pushLog("scenarios       - Liste les scénarios d'automatisation", 'info');
        pushLog("simulate <id>   - Simule le scénario avec l'ID indiqué", 'info');
        pushLog("clear           - Vide l'historique du terminal", 'info');
        pushLog("theme <color>   - Change le thème (indigo, emerald, rose, amber)", 'info');
        pushLog("api-test        - Teste les clés d'API configurées", 'info');
        pushLog("roi <heures>    - Calcule le ROI annuel pour <heures> de travail par semaine", 'info');
        break;
      case 'scenarios':
        pushLog("=== Liste des Scénarios ===", 'system');
        if (scenarios.length === 0) {
          pushLog("Aucun scénario disponible.", 'error');
        } else {
          scenarios.forEach(scen => {
            pushLog(`ID: ${scen.id} | Nom: ${scen.name} (${scen.steps?.length || 0} étapes)`, 'info');
          });
        }
        break;
      case 'simulate':
        if (args.length === 0) {
          pushLog("Usage: simulate <id>", 'error');
        } else {
          const targetId = args[0];
          const targetScen = scenarios.find(s => s.id === targetId || s.id.toString() === targetId);
          if (!targetScen) {
            pushLog(`Scénario avec l'ID "${targetId}" introuvable.`, 'error');
          } else {
            pushLog(`Simulation du scénario "${targetScen.name}" démarrée...`, 'success');
            setSelectedScenarioId(targetScen.id);
            // Run simulation (we invoke this from parent)
            runScenarioSimulation(targetScen.id);
          }
        }
        break;
      case 'clear':
        setAiLogs([]);
        break;
      case 'theme':
        if (args.length === 0) {
          pushLog("Usage: theme <indigo|emerald|rose|amber>", 'error');
        } else {
          const newColor = args[0].toLowerCase();
          if (['indigo', 'emerald', 'rose', 'amber'].includes(newColor)) {
            setPrimaryBrandTheme(newColor);
            pushLog(`Thème modifié vers : ${newColor}`, 'success');
            triggerToast(`Thème d'application configuré sur : ${newColor}`);
          } else {
            pushLog(`Thème invalide. Choisissez parmi: indigo, emerald, rose, amber.`, 'error');
          }
        }
        break;
      case 'api-test':
        pushLog("[SYSTEM] Lancement du test de connectivité API...", 'system');
        const hasGemini = apiKeys["gemini-omni"] && apiKeys["gemini-omni"].trim() !== '';
        pushLog(`- Gemini API (gemini-omni) : ${hasGemini ? "Clé présente. Prête pour l'exécution." : "Absente (Mode Simulation activé)."}`, hasGemini ? 'success' : 'error');
        const hasEleven = apiKeys["elevenlabs"] && apiKeys["elevenlabs"].trim() !== '';
        pushLog(`- ElevenLabs TTS (elevenlabs) : ${hasEleven ? "Clé présente. Audio actif." : "Absente (fictif)."}`, hasEleven ? 'success' : 'error');
        break;
      case 'roi':
        if (args.length === 0) {
          pushLog("Usage: roi <heures de travail/semaine>", 'error');
        } else {
          const hours = parseFloat(args[0]);
          if (isNaN(hours) || hours <= 0) {
            pushLog("Veuillez indiquer un nombre d'heures positif.", 'error');
          } else {
            const timeSavedYear = hours * 52;
            const moneySavedYear = timeSavedYear * 50;
            pushLog(`=== Analyse de rentabilité AURA AI ===`, 'system');
            pushLog(`- Temps épargné par an : ${timeSavedYear.toLocaleString()} heures`, 'success');
            pushLog(`- Gain financier estimé (taux horaire 50€) : ${moneySavedYear.toLocaleString()} € / an`, 'success');
            pushLog(`- Score d'efficacité augmenté : +${(hours * 3.5).toFixed(1)}%`, 'success');
          }
        }
        break;
      default:
        pushLog(`Commande inconnue: "${command}". Tapez "help" pour voir la liste des commandes.`, 'error');
    }
  };

  const handleCliKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleCliSubmit(cliInput);
      setCliInput('');
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header info */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>Terminal de Liaison IA & Console Autopilot</span>
          <span className="inline-flex items-center bg-indigo-950/80 border border-indigo-800/80 text-indigo-400 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide animate-pulse">
            Simulation live
          </span>
        </h2>
        <p className="text-slate-400 text-sm">Exécutez vos automatisations de manière unifiée à travers nos API connectées et pilotez le système en ligne de commande.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form Settings */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-6">
            {/* Mode selector tab-like */}
            <div className="flex flex-wrap gap-1.5 p-1 bg-slate-900 rounded-xl border border-slate-800/60">
              {[
                { id: 'gmb', label: 'GMB Avis', icon: <MessageSquare className="w-3.5 h-3.5" /> },
                { id: 'tiktok', label: 'Script TikTok', icon: <Video className="w-3.5 h-3.5" /> },
                { id: 'saas', label: 'SaaS Builder', icon: <Code className="w-3.5 h-3.5" /> },
                { id: 'outreach', label: 'B2B Prospection', icon: <Mail className="w-3.5 h-3.5" /> },
                { id: 'youtube', label: 'Vidéo YouTube', icon: <Play className="w-3.5 h-3.5" /> },
                { id: 'multi-agent', label: 'Multi-Agents', icon: <UserCheck className="w-3.5 h-3.5" /> },
                { id: 'scenario', label: 'Scénarios IA', icon: <Sliders className="w-3.5 h-3.5" /> },
              ].map(mode => (
                <button
                  key={mode.id}
                  onClick={() => setActionMode(mode.id)}
                  className={`flex-1 min-w-[110px] flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-[10px] font-bold transition-all duration-300 ${
                    actionMode === mode.id
                      ? 'bg-slate-950 text-indigo-400 border border-indigo-500/30'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {mode.icon}
                  <span>{mode.label}</span>
                </button>
              ))}
            </div>

            {/* Settings based on selected mode */}
            {actionMode === 'gmb' && (
              <div className="space-y-4 text-sm animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Établissement ciblé</label>
                  <input
                    type="text"
                    value={gmbLocation}
                    onChange={(e) => setGmbLocation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Avis client à traiter</label>
                  <textarea
                    rows={4}
                    value={gmbReviewInput}
                    onChange={(e) => setGmbReviewInput(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Ton / Sentiment de la réponse</label>
                  <select
                    value={gmbSentiment}
                    onChange={(e) => setGmbSentiment(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  >
                    <option value="warm">Warm & Chaleureux (Recommandé)</option>
                    <option value="SEO">Optimisé SEO Local & Mots-Clés</option>
                    <option value="diplomatic">Diplomatique & Professionnel</option>
                  </select>
                </div>
              </div>
            )}

            {actionMode === 'tiktok' && (
              <div className="space-y-4 text-sm animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Thématique ou titre de la vidéo</label>
                  <input
                    type="text"
                    value={tiktokTopic}
                    onChange={(e) => setTiktokTopic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Style / Ton de la voix & ambiance</label>
                  <select
                    value={tiktokTone}
                    onChange={(e) => setTiktokTone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  >
                    <option value="mysterious">Mystérieux & Captivant</option>
                    <option value="inspiring">Inspirant & Énergique</option>
                    <option value="educational">Éducatif & Clair</option>
                    <option value="dramatic">Dramatique & Intense</option>
                  </select>
                </div>
              </div>
            )}

            {actionMode === 'saas' && (
              <div className="space-y-4 text-sm animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Description de l'idée Micro-SaaS</label>
                  <textarea
                    rows={6}
                    value={saasIdea}
                    onChange={(e) => setSaasIdea(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none"
                  />
                </div>
              </div>
            )}

            {actionMode === 'outreach' && (
              <div className="space-y-4 text-sm animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Cible B2B (ex: Agences, Hôtels, Plombiers)</label>
                  <input
                    type="text"
                    value={outreachIndustry}
                    onChange={(e) => setOutreachIndustry(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Proposition de valeur</label>
                  <textarea
                    rows={3}
                    value={outreachValueProp}
                    onChange={(e) => setOutreachValueProp(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Ton du Cold Email</label>
                  <select
                    value={outreachTone}
                    onChange={(e) => setOutreachTone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  >
                    <option value="direct">Direct & Ultra-Court</option>
                    <option value="friendly">Amical & Conversationnel</option>
                    <option value="formal">Formel & Institutionnel</option>
                  </select>
                </div>
              </div>
            )}

            {actionMode === 'youtube' && (
              <div className="space-y-4 text-sm animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Sujet de la vidéo</label>
                  <input
                    type="text"
                    value={youtubeTopic}
                    onChange={(e) => setYoutubeTopic(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Audience cible</label>
                  <input
                    type="text"
                    value={youtubeAudience}
                    onChange={(e) => setYoutubeAudience(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Format de durée</label>
                  <select
                    value={youtubeDuration}
                    onChange={(e) => setYoutubeDuration(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  >
                    <option value="5 min">Format court (5 min)</option>
                    <option value="10 min">Format standard (10 min)</option>
                    <option value="20 min">Analyse approfondie (20 min)</option>
                  </select>
                </div>
              </div>
            )}

            {actionMode === 'multi-agent' && (
              <div className="space-y-4 text-sm animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Tâche ou Mission des Agents</label>
                  <textarea
                    rows={4}
                    value={multiAgentTask}
                    onChange={(e) => setMultiAgentTask(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50 resize-none"
                    placeholder="Ex: Rédiger un post LinkedIn..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Agent 1 (Rédacteur)</label>
                    <input
                      type="text"
                      value={multiAgentA1}
                      onChange={(e) => setMultiAgentA1(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Agent 2 (Critique)</label>
                    <input
                      type="text"
                      value={multiAgentA2}
                      onChange={(e) => setMultiAgentA2(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                    />
                  </div>
                </div>
              </div>
            )}

            {actionMode === 'scenario' && (
              <div className="space-y-4 text-sm animate-fadeIn">
                <div>
                  <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Sélectionner un scénario d'automatisation</label>
                  <select
                    value={selectedScenarioId}
                    onChange={(e) => setSelectedScenarioId(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  >
                    {scenarios.map(scen => (
                      <option key={scen.id} value={scen.id}>
                        {scen.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-3.5 space-y-2">
                  <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-wider block">Description & Objectif</span>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Ce scénario comporte <span className="text-white font-semibold">{activeScenario?.steps?.length || 0} étapes</span> de liaison d'outils et d'IA. Il est optimisé pour simplifier et accélérer les tâches répétitives des clients.
                  </p>
                </div>
              </div>
            )}

            {/* Real Gemini Model Selection Dropdown */}
            <div className="space-y-1.5 border-t border-slate-900 pt-4">
              <label className="block text-[10px] font-bold uppercase text-indigo-400 tracking-wider">Modèle de Liaison Gemini (API Réelle)</label>
              <select
                value={selectedGeminiModel}
                onChange={(e) => setSelectedGeminiModel(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              >
                <option value="gemini-2.5-flash-preview-09-2025">Gemini 2.5 Flash Preview-09 (Recommandé)</option>
                <option value="gemini-2.5-pro">Gemini 2.5 Pro (Raisonnement Complexe)</option>
                <option value="gemini-2.0-flash">Gemini 2.0 Flash (Production Rapide)</option>
                <option value="gemini-2.0-pro-exp-02-05">Gemini 2.0 Pro Exp-02 (Haute Fidélité)</option>
              </select>
            </div>

            {/* CTA Trigger */}
            <button
              onClick={actionMode === 'multi-agent' ? executeMultiAgentSimulation : executeLiveAction}
              disabled={isAiLoading || isMultiAgentSimulating}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-650 hover:from-indigo-400 hover:to-purple-550 text-white font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-indigo-500/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAiLoading || isMultiAgentSimulating ? (
                <RotateCw className="w-5 h-5 animate-spin" />
              ) : (
                <Zap className="w-5 h-5 text-yellow-300 animate-pulse" />
              )}
              <span>
                {actionMode === 'multi-agent' 
                  ? (isMultiAgentSimulating ? "Débat d'agents en cours..." : "Lancer le co-working IA")
                  : "Exécuter la requête AURA IA"}
              </span>
            </button>
          </div>
        </div>

        {/* Right Column: Cyberpunk Terminal Logs or Multi-Agent debate */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          {actionMode === 'multi-agent' ? (
            <div className="glass-card border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[520px] overflow-hidden animate-fadeIn bg-slate-950/20">
              {/* Header */}
              <div className="flex items-center justify-between bg-slate-900/80 px-5 py-4 border-b border-slate-800/80 shrink-0">
                <div className="flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-indigo-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-350">
                    Co-Working Multi-Agents Collaboratif
                  </span>
                </div>
                {isMultiAgentSimulating ? (
                  <div className="flex items-center gap-1.5 bg-indigo-950/60 border border-indigo-900/60 px-2 py-0.5 rounded text-[10px] font-bold text-indigo-400">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
                    <span>Simulation en cours</span>
                  </div>
                ) : (
                  <div className="w-0 h-0 overflow-hidden" />
                )}
              </div>

              {/* Stepper bar */}
              <div className="bg-slate-950/40 border-b border-slate-900 px-5 py-3 flex items-center justify-between shrink-0 text-[10px] font-bold">
                {[
                  { step: 1, label: "1. Rédaction" },
                  { step: 2, label: "2. Critique" },
                  { step: 3, label: "3. Révision" },
                  { step: 4, label: "4. Terminé" }
                ].map((s) => {
                  const isCurrent = multiAgentStep === s.step;
                  const isDone = multiAgentStep > s.step;
                  return (
                    <div key={s.step} className="flex items-center gap-1.5">
                      <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] border transition-all duration-300 ${
                        isCurrent 
                          ? 'bg-indigo-600 border-indigo-400 text-white animate-pulse' 
                          : isDone 
                          ? 'bg-emerald-500 border-emerald-400 text-white' 
                          : 'bg-slate-900 border-slate-800 text-slate-500'
                      }`}>
                        <span>{isDone ? "✓" : s.step}</span>
                      </span>
                      <span className={isCurrent ? 'text-indigo-400' : isDone ? 'text-emerald-400' : 'text-slate-500'}>
                        {s.label}
                      </span>
                      <span className="text-slate-500 ml-1">
                        {s.step < 4 ? "→" : ""}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Messages */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-slate-950/20 max-h-[380px] scrollbar-thin">
                {multiAgentDialogue.length === 0 ? (
                  <div className="text-slate-650 italic py-16 text-center flex flex-col items-center justify-center gap-3">
                    <Cpu className="w-10 h-10 text-slate-850 animate-pulse" />
                    <p className="text-xs max-w-xs leading-relaxed text-slate-500 font-medium">
                      Prêt pour le co-working. Configurez la mission puis cliquez sur "Lancer le co-working IA" à gauche.
                    </p>
                  </div>
                ) : (
                  multiAgentDialogue.map((msg, idx) => {
                    const isCritic = msg.role === 'critic';
                    return (
                      <div key={idx} className={`flex flex-col space-y-1 animate-slideDown ${isCritic ? 'items-end' : 'items-start'}`}>
                        <div className="flex items-center gap-2 text-[10px] text-slate-550 font-bold px-1">
                          <span>{msg.sender}</span>
                          <span>•</span>
                          <span className="font-mono font-normal">{msg.time}</span>
                        </div>
                        <div className={`p-4 rounded-2xl text-xs leading-relaxed max-w-[85%] whitespace-pre-wrap ${
                          isCritic 
                            ? 'bg-gradient-to-br from-purple-950/30 to-slate-900 border border-purple-900/30 rounded-tr-none text-purple-200' 
                            : 'bg-gradient-to-br from-indigo-950/30 to-slate-900 border border-indigo-900/30 rounded-tl-none text-indigo-200'
                        }`}>
                          {msg.content}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Actions on output */}
              {multiAgentStep === 4 && multiAgentDialogue.length > 0 && (
                <div className="p-4 bg-slate-900/60 border-t border-slate-900/80 flex items-center justify-between shrink-0">
                  <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400" /> Tâche accomplie
                  </span>
                  <button
                    onClick={() => {
                      const lastMsg = multiAgentDialogue[multiAgentDialogue.length - 1];
                      copyToClipboard(lastMsg ? lastMsg.content : '');
                    }}
                    className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-300 py-1.5 px-3 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5 text-indigo-400" /> Copier la version finale
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {['scenario', 'gmb', 'tiktok', 'saas', 'outreach', 'youtube'].includes(actionMode) && (
                <div className="relative border border-slate-850 rounded-2xl bg-slate-950 flex flex-col justify-center min-h-[170px] overflow-hidden flex-shrink-0">
                  {/* Grid Canvas containing Nodes */}
                  <div className="flex-1 p-5 overflow-x-auto overflow-y-hidden flex items-center justify-start gap-3 bg-slate-950/40 relative z-10 scrollbar-thin">
                    {activeScenario?.steps?.length === 0 && (
                      <div className="w-full text-center py-12 flex flex-col items-center justify-center gap-2">
                        <Sliders className="w-8 h-8 text-slate-800 animate-pulse" />
                        <p className="text-slate-500 italic text-xs">Aucune étape configurée dans ce scénario.</p>
                      </div>
                    )}

                    {(activeScenario?.steps || []).filter(Boolean).map((step, idx) => {
                      const config = getToolIconConfig(step.tool);
                      const isCurrent = isSimulating && idx === simCurrentStep;
                      const isDone = isSimulating && idx < simCurrentStep;
                      
                      return (
                        <React.Fragment key={step.id}>
                          {/* Node Module */}
                          <div 
                            draggable={!isSimulating}
                            onDragStart={(e) => { e.dataTransfer.setData('text/plain', idx.toString()); }}
                            onDragOver={(e) => e.preventDefault()}
                            onDrop={(e) => {
                              e.preventDefault();
                              const fromIdx = parseInt(e.dataTransfer.getData('text/plain'));
                              const toIdx = idx;
                              if (fromIdx !== toIdx) {
                                reorderSteps(activeScenario.id, fromIdx, toIdx);
                              }
                            }}
                            className="flex flex-col items-center shrink-0 w-32 relative group cursor-grab active:cursor-grabbing"
                          >
                            <div 
                              className={`w-14 h-14 rounded-full bg-gradient-to-tr ${config.color} p-0.5 shadow-lg flex items-center justify-center relative transition-all duration-300 ${
                                isCurrent 
                                  ? 'scale-110 border-2 border-white' 
                                  : isDone 
                                  ? 'opacity-90' 
                                  : 'hover:scale-105'
                              }`}
                              style={{
                                boxShadow: isCurrent ? `0 0 20px ${config.shadowColor}` : isDone ? `0 0 10px rgba(16, 185, 129, 0.2)` : 'none'
                              }}
                            >
                              {/* Glass inside */}
                              <div className="w-full h-full rounded-full bg-slate-950 flex items-center justify-center relative overflow-hidden">
                                {renderToolIcon(config.iconName)}
                                
                                {isDone && (
                                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-emerald-500 border border-emerald-400 text-[8px] font-bold flex items-center justify-center text-white shadow-md">
                                    ✓
                                  </span>
                                )}
                                
                                {isCurrent && (
                                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-indigo-600 border border-indigo-400 text-[8px] font-bold flex items-center justify-center text-white shadow-md animate-spin">
                                    <RotateCw className="w-2.5 h-2.5 text-white" />
                                  </span>
                                )}

                                {!isCurrent && !isDone && (
                                  <span className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full bg-slate-800 border border-slate-700 text-[8px] font-bold flex items-center justify-center text-slate-400 shadow-md">
                                    {idx + 1}
                                  </span>
                                )}

                                {!isSimulating && (
                                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute inset-0 bg-slate-950/85 rounded-full flex items-center justify-center gap-1 z-20">
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setEditingStep({ ...step, scenarioId: activeScenario.id });
                                        setModalToolInput(step.tool);
                                        setModalActionInput(step.action);
                                      }}
                                      className="p-1 rounded-full bg-indigo-905 hover:bg-indigo-800 text-indigo-200 border border-indigo-750 transition-colors"
                                      title="Modifier"
                                    >
                                      <Sliders className="w-2.5 h-2.5" />
                                    </button>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        removeStep(activeScenario.id, step.id);
                                      }}
                                      className="p-1 rounded-full bg-rose-955 hover:bg-rose-900 text-rose-350 border border-rose-900/60 transition-colors"
                                      title="Supprimer"
                                    >
                                      <Trash2 className="w-2.5 h-2.5" />
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                            <span className={`text-[10px] font-bold text-center mt-2 truncate max-w-full px-1 ${
                              isCurrent ? 'text-indigo-400' : isDone ? 'text-emerald-400' : 'text-slate-200'
                            }`}>
                              {config.label}
                            </span>
                            <span className="text-[8px] text-slate-500 text-center font-normal line-clamp-2 mt-0.5 px-1 h-5 overflow-hidden">
                              {step.action}
                            </span>
                          </div>

                          {idx < activeScenario.steps.length - 1 && (
                            <div className="group/arrow flex items-center justify-center shrink-0 w-10 z-10 relative h-14">
                              <svg className="w-full h-5" viewBox="0 0 48 24">
                                <path 
                                  d="M0 12h40" 
                                  stroke={isDone ? '#10b981' : isCurrent ? '#6366f1' : 'rgba(71, 85, 105, 0.4)'} 
                                  strokeWidth="3.5" 
                                  strokeDasharray="6,4" 
                                  strokeLinecap="round" 
                                  className={isCurrent || isDone ? 'animate-dash' : ''} 
                                />
                                <polygon 
                                  points="40,8 48,12 40,16" 
                                  fill={isDone ? '#10b981' : isCurrent ? '#6366f1' : 'rgba(71, 85, 105, 0.4)'} 
                                />
                              </svg>
                              {!isSimulating && (
                                <button
                                  onClick={() => { setInsertStepIndex(idx + 1); setModalToolInput(''); setModalActionInput(''); }}
                                  className="w-5 h-5 bg-indigo-650 hover:bg-indigo-500 border border-indigo-550 text-white rounded-full flex items-center justify-center text-xs font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg cursor-pointer z-30 opacity-0 group-hover/arrow:opacity-100 transition-opacity duration-200"
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

                    {activeScenario?.steps?.length > 0 && !isSimulating && (
                      <div className="flex items-center shrink-0">
                        <div className="flex items-center justify-center shrink-0 w-10 z-10 relative h-14">
                          <svg className="w-full h-5" viewBox="0 0 48 24">
                            <path d="M0 12h40" stroke="rgba(71, 85, 105, 0.4)" strokeWidth="3.5" strokeDasharray="6,4" strokeLinecap="round" />
                            <polygon points="40,8 48,12 40,16" fill="rgba(71, 85, 105, 0.4)" />
                          </svg>
                        </div>
                        <button 
                          onClick={() => { setInsertStepIndex(activeScenario.steps.length); setModalToolInput(''); setModalActionInput(''); }}
                          className="flex flex-col items-center shrink-0 w-32 relative group cursor-pointer"
                        >
                          <div className="w-14 h-14 rounded-full border-2 border-dashed border-slate-800 hover:border-indigo-500 bg-slate-900/40 hover:bg-slate-900/60 flex items-center justify-center transition-all duration-300">
                            <Plus className="w-5 h-5 text-slate-500 group-hover:text-indigo-400" />
                          </div>
                          <span className="text-[10px] font-bold text-slate-500 group-hover:text-indigo-400 mt-2 transition-colors">
                            Ajouter une étape
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Visual Terminal */}
              <div className="bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl flex flex-col h-[340px] overflow-hidden">
                {/* Top bar */}
                <div className="flex items-center justify-between bg-slate-900 px-4 py-3 border-b border-slate-850">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1.5">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                    </div>
                    <span className="text-[10px] font-bold font-mono text-slate-400 tracking-wider uppercase ml-2 flex items-center gap-2">
                      <Terminal className="w-3.5 h-3.5 text-indigo-400" /> Output Terminal & Interactive CLI
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <span className="text-[9px] font-mono font-bold text-slate-550">CLI Active</span>
                  </div>
                </div>

                {/* Logs area */}
                <div className="flex-1 p-4 font-mono text-[11px] overflow-y-auto space-y-2.5 bg-slate-950/60 leading-relaxed text-slate-300 select-text scrollbar-thin">
                  {aiLogs.length === 0 ? (
                    <div className="text-slate-600 italic py-8 text-center flex flex-col items-center justify-center gap-2">
                      <Cpu className="w-8 h-8 text-slate-800 animate-pulse" />
                      <span>Console prête. Exécutez l'IA à gauche ou entrez des commandes CLI ci-dessous (ex: 'help').</span>
                    </div>
                  ) : (
                    aiLogs.map((log, idx) => {
                      let colorClass = 'text-slate-400';
                      if (log.type === 'success') colorClass = 'text-emerald-400 font-bold';
                      if (log.type === 'error') colorClass = 'text-rose-400 font-bold';
                      if (log.type === 'system') colorClass = 'text-purple-400 font-bold';

                      return (
                        <div key={idx} className="flex items-start gap-3">
                          <span className="text-slate-650 font-semibold">{log.time}</span>
                          <span className={colorClass}>{log.text}</span>
                        </div>
                      );
                    })
                  )}
                  <div ref={terminalBottomRef} />
                </div>

                {/* Cyberpunk CLI Command Input Line */}
                <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2.5 border-t border-slate-850">
                  <span className="text-indigo-400 font-mono text-[11px] font-bold shrink-0">aura-cli&gt;</span>
                  <input
                    type="text"
                    value={cliInput}
                    onChange={(e) => setCliInput(e.target.value)}
                    onKeyDown={handleCliKeyDown}
                    placeholder="Tapez 'help' pour les commandes CLI supportées..."
                    className="flex-1 bg-transparent border-none text-[11px] text-white font-mono focus:outline-none placeholder:text-slate-600"
                  />
                </div>
              </div>

              {/* Final Output Content */}
              {aiOutput && (
                <div className="glass-card p-6 rounded-2xl border border-indigo-500/20 space-y-4 animate-slideDown bg-slate-900/30">
                  <div className="flex items-center justify-between border-b border-slate-900 pb-3">
                    <span className="text-xs font-bold text-indigo-400 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4" /> Résultat de génération finale
                    </span>
                    <div className="flex gap-2">
                      {actionMode === 'gmb' && apiKeys["elevenlabs"] && (
                        <button
                          onClick={() => executeRealElevenLabsTTS(aiOutput)}
                          className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
                        >
                          <Play className="w-3.5 h-3.5 text-emerald-400" /> Écouter la voix
                        </button>
                      )}
                      <button
                        onClick={() => copyToClipboard(aiOutput)}
                        className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
                      >
                        <Copy className="w-3.5 h-3.5 text-indigo-400" /> Copier
                      </button>
                    </div>
                  </div>
                  <div className="text-slate-300 text-xs leading-relaxed whitespace-pre-wrap font-sans max-h-96 overflow-y-auto p-4 bg-slate-950/40 rounded-xl border border-slate-800/30">
                    {aiOutput}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
