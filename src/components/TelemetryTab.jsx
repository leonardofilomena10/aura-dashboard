import React, { useMemo } from 'react';
import { Database } from 'lucide-react';

export default function TelemetryTab({
  telemetryRuns,
  setTelemetryRuns,
  expandedRunId,
  setExpandedRunId,
  triggerToast
}) {
  const telemetryStats = useMemo(() => {
    const totalRuns = telemetryRuns.length;
    if (totalRuns === 0) {
      return { avgDurationMs: 0, totalTokens: 0, totalCostEur: 0, successRate: 100 };
    }
    let successCount = 0;
    let totalDurationMs = 0;
    let totalTokens = 0;
    let totalCostEur = 0;

    telemetryRuns.forEach(run => {
      if (run.status === 'success') successCount++;
      totalDurationMs += run.durationMs || 0;
      totalTokens += run.tokensUsed || 0;
      totalCostEur += run.costEur || 0;
    });

    const successRate = Math.round((successCount / totalRuns) * 100);
    
    return {
      avgDurationMs: Math.round(totalDurationMs / totalRuns),
      totalTokens,
      totalCostEur: Number(totalCostEur.toFixed(5)),
      successRate
    };
  }, [telemetryRuns]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>Console de Télémétrie Industrielle</span>
          <span className="inline-flex items-center bg-indigo-950/80 border border-indigo-800/80 text-indigo-400 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">
            Logs & Métriques d'API
          </span>
        </h2>
        <p className="text-slate-400 text-sm">Contrôlez l'état de vos agents autonomes, les temps de réponse et la consommation budgétaire.</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Temps de réponse moyen</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-white">{telemetryStats.avgDurationMs}</span>
            <span className="text-xs text-indigo-400 font-bold">ms</span>
          </div>
          <p className="text-[10px] text-slate-500">Inférence de modèles Claude/Gemini</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Jetons d'API Consommés</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-white">{telemetryStats.totalTokens.toLocaleString()}</span>
            <span className="text-xs text-indigo-400 font-bold">tokens</span>
          </div>
          <p className="text-[10px] text-slate-500">Volume combiné entrée / sortie</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Coût d'API Estimé</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-white">{telemetryStats.totalCostEur.toFixed(4)}</span>
            <span className="text-xs text-indigo-400 font-bold">€</span>
          </div>
          <p className="text-[10px] text-slate-500">Calcul basé sur les tarifs officiels 2026</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-2">
          <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Taux de Succès des Flux</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-emerald-400">{telemetryStats.successRate}</span>
            <span className="text-xs text-emerald-400 font-bold">%</span>
          </div>
          <p className="text-[10px] text-slate-500">Pourcentage de requêtes sans échec</p>
        </div>
      </div>

      {/* Run Logs Table */}
      <div className="glass-card rounded-2xl border border-slate-800/80 overflow-hidden">
        <div className="px-6 py-4 bg-slate-900 border-b border-slate-800/80 flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            <span>Historique des Exécutions d'Agents</span>
          </h3>
          <button
            onClick={() => {
              setTelemetryRuns([]);
              triggerToast("Historique de télémétrie vidé.");
            }}
            className="text-[10px] text-rose-450 hover:underline font-bold bg-transparent border-0 cursor-pointer focus:outline-none"
          >
            Effacer l'historique
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/50 text-slate-500 border-b border-slate-900 font-bold uppercase tracking-wider">
                <th className="px-6 py-3">Statut</th>
                <th className="px-6 py-3">Date / Heure</th>
                <th className="px-6 py-3">Scénario d'Automatisation</th>
                <th className="px-6 py-3">Latence</th>
                <th className="px-6 py-3">Tokens</th>
                <th className="px-6 py-3">Coût Estimé</th>
                <th className="px-6 py-3 text-right">Détails</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-900 text-slate-300">
              {telemetryRuns.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-slate-500 italic animate-pulse">
                    Aucun log d'exécution dans la base de données.
                  </td>
                </tr>
              ) : (
                telemetryRuns.map((run) => {
                  const isExpanded = expandedRunId === run.id;
                  return (
                    <React.Fragment key={run.id}>
                      <tr className="hover:bg-slate-900/30 transition-colors">
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wide border ${
                            run.status === 'success' 
                              ? 'bg-emerald-950/80 border-emerald-800/80 text-emerald-400' 
                              : 'bg-rose-950/80 border-rose-800/80 text-rose-400'
                          }`}>
                            {run.status === 'success' ? 'Succès' : 'Échec'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-slate-400 font-semibold">
                          {new Date(run.timestamp).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 font-bold text-white">
                          {run.scenarioName}
                        </td>
                        <td className="px-6 py-4 font-semibold">
                          {run.durationMs} ms
                        </td>
                        <td className="px-6 py-4 text-slate-400 font-mono">
                          {run.tokensUsed}
                        </td>
                        <td className="px-6 py-4 text-slate-400 font-mono">
                          {run.costEur.toFixed(5)} €
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setExpandedRunId(isExpanded ? null : run.id)}
                            className="text-indigo-400 hover:text-indigo-300 font-bold transition-all bg-transparent border-none cursor-pointer focus:outline-none"
                          >
                            {isExpanded ? 'Masquer' : 'Inspecter'}
                          </button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr className="bg-slate-950/50">
                          <td colSpan={7} className="px-8 py-4 border-l border-indigo-500/50">
                            <div className="space-y-2.5">
                              <div className="flex items-center justify-between">
                                <span className="text-[10px] uppercase font-bold text-slate-500">Traces de débogage système</span>
                                <span className="text-[9px] font-mono text-slate-600">ID de transaction: {run.id}</span>
                              </div>
                              <div className="bg-slate-900 border border-slate-850 p-4 rounded-xl font-mono text-[10px] space-y-1 text-slate-300 select-text max-h-60 overflow-y-auto">
                                {run.logs && run.logs.length > 0 ? (
                                  run.logs.map((logLine, idx) => (
                                    <div key={idx} className="flex gap-2">
                                      <span className="text-slate-600 shrink-0">[{idx+1}]</span>
                                      <span>{logLine}</span>
                                    </div>
                                  ))
                                ) : (
                                  <div className="text-slate-600 italic">Pas de logs détaillés disponibles.</div>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
