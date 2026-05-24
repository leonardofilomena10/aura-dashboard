import React, { useMemo } from 'react';
import { Sparkles, Copy } from 'lucide-react';

export default function RoiTab({
  gmbProfiles,
  roiNumReviews,
  setRoiNumReviews,
  roiMinutesPerReview,
  setRoiMinutesPerReview,
  roiHourlyRate,
  setRoiHourlyRate,
  roiExternalAgencyFee,
  setRoiExternalAgencyFee,
  copyToClipboard
}) {
  const roiCalculations = useMemo(() => {
    const manualHoursPerMonth = (roiNumReviews * roiMinutesPerReview) / 60;
    const manualCostPerMonth = manualHoursPerMonth * roiHourlyRate;
    const totalCurrentMonthlyCost = manualCostPerMonth + roiExternalAgencyFee;
    const hoursSavedPerMonth = manualHoursPerMonth * 0.9;
    const savingsCostPerMonth = hoursSavedPerMonth * roiHourlyRate + roiExternalAgencyFee;
    const annualSavingsEur = savingsCostPerMonth * 12;
    const annualHoursSaved = hoursSavedPerMonth * 12;
    
    const locationName = gmbProfiles[0]?.location || "Votre établissement";

    return {
      manualHoursPerMonth: Number(manualHoursPerMonth.toFixed(1)),
      manualCostPerMonth: Math.round(manualCostPerMonth),
      totalCurrentMonthlyCost: Math.round(totalCurrentMonthlyCost),
      hoursSavedPerMonth: Number(hoursSavedPerMonth.toFixed(1)),
      savingsCostPerMonth: Math.round(savingsCostPerMonth),
      annualSavingsEur: Math.round(annualSavingsEur),
      annualHoursSaved: Math.round(annualHoursSaved),
      locationName
    };
  }, [gmbProfiles, roiNumReviews, roiMinutesPerReview, roiHourlyRate, roiExternalAgencyFee]);

  const salesPitchText = useMemo(() => {
    return `PROPOSITION COMMERCIALE AURA AI GMB AUTOPILOT

Destinataire : ${roiCalculations.locationName}
Date : ${new Date().toLocaleDateString()}

Objet : Proposition d'automatisation intelligente de votre e-réputation Google Business Profile.

Actuellement, la gestion manuelle de vos ${roiNumReviews} avis mensuels à raison de ${roiMinutesPerReview} minutes par avis représente environ ${roiCalculations.manualHoursPerMonth} heures de travail et un coût de traitement estimé à ${roiCalculations.manualCostPerMonth}€/mois.

En déployant l'Auto-Pilot AURA AI :
1. Taux de réponse sous 5 minutes : Vos clients reçoivent instantanément des réponses professionnelles, ultra-chaleureuses et optimisées pour votre SEO local.
2. Gain de temps : Économie de ${roiCalculations.hoursSavedPerMonth} heures de travail mensuelles (soit ${roiCalculations.annualHoursSaved} heures/an).
3. Gain financier net : Une économie estimée à ${roiCalculations.savingsCostPerMonth}€/mois (soit ${roiCalculations.annualSavingsEur.toLocaleString()}€/an) sur vos coûts de traitement et frais d'agence associés.

AURA AI prend en charge votre gestion d'avis 24/7 de manière totalement sécurisée et conforme aux conditions de Google.

Restons en contact pour configurer votre essai gratuit de 14 jours !`;
  }, [roiCalculations, roiNumReviews, roiMinutesPerReview]);

  return (
    <div className="space-y-8 animate-fadeIn">
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>Calculateur de ROI & Pitch GBP</span>
          <span className="inline-flex items-center bg-indigo-950/80 border border-indigo-800/80 text-indigo-400 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded tracking-wide">
            Outil Commercial Pro
          </span>
        </h2>
        <p className="text-slate-400 text-sm">Simulez les gains financiers et le temps économisé grâce à l'automatisation locale AURA.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Inputs */}
        <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-slate-800/80 space-y-5">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider border-b border-slate-900 pb-3">Paramètres de l'Établissement</h3>
          
          <div>
            <label className="block text-xs text-slate-400 font-bold uppercase mb-1.5">Établissement Google Business</label>
            <div className="w-full bg-slate-900/60 border border-slate-800/80 rounded-xl px-4 py-2.5 text-slate-400 text-xs font-semibold text-ellipsis overflow-hidden whitespace-nowrap">
              {roiCalculations.locationName}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 font-bold uppercase mb-1.5">Avis reçus / mois</label>
              <input
                type="number"
                value={roiNumReviews}
                onChange={(e) => setRoiNumReviews(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-bold uppercase mb-1.5">Temps / avis (mins)</label>
              <input
                type="number"
                value={roiMinutesPerReview}
                onChange={(e) => setRoiMinutesPerReview(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-slate-400 font-bold uppercase mb-1.5">Coût horaire (€/h)</label>
              <input
                type="number"
                value={roiHourlyRate}
                onChange={(e) => setRoiHourlyRate(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              />
            </div>
            <div>
              <label className="block text-xs text-slate-400 font-bold uppercase mb-1.5">Frais d'agence ext. (€/m)</label>
              <input
                type="number"
                value={roiExternalAgencyFee}
                onChange={(e) => setRoiExternalAgencyFee(Number(e.target.value))}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              />
            </div>
          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Result metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-1 bg-gradient-to-br from-indigo-950/20 to-slate-900/40">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Temps Économisé</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-white">{roiCalculations.hoursSavedPerMonth}</span>
                <span className="text-xs text-indigo-400 font-bold">h / mois</span>
              </div>
              <span className="text-[9px] text-slate-500 block">({roiCalculations.annualHoursSaved} h / an)</span>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-800/80 space-y-1 bg-gradient-to-br from-indigo-950/20 to-slate-900/40">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">Économies Mensuelles</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-white">{roiCalculations.savingsCostPerMonth}</span>
                <span className="text-xs text-indigo-400 font-bold">€ / mois</span>
              </div>
              <span className="text-[9px] text-slate-500 block">(Net de charges & frais)</span>
            </div>

            <div className="glass-card p-5 rounded-2xl border border-slate-850 space-y-1 bg-gradient-to-br from-purple-950/20 to-slate-900/40 border-indigo-500/30">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block">ROI Annuel Projeté</span>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-extrabold text-indigo-450">{roiCalculations.annualSavingsEur.toLocaleString()}</span>
                <span className="text-xs text-indigo-450 font-bold">€ / an</span>
              </div>
              <span className="text-[9px] text-indigo-400 block font-semibold">Taux de rentabilité immédiat</span>
            </div>
          </div>

          {/* Sales pitch proposal card */}
          <div className="glass-card p-6 rounded-2xl border border-indigo-500/25 space-y-4 relative overflow-hidden bg-slate-900/40">
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex items-center justify-between border-b border-slate-900/80 pb-3">
              <h3 className="text-xs font-bold text-indigo-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span>Proposition Commerciale Générée</span>
              </h3>
              <button
                onClick={() => copyToClipboard(salesPitchText)}
                className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-slate-200 px-3.5 py-1.5 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md"
              >
                <Copy className="w-3.5 h-3.5 text-indigo-400" />
                <span>Copier la proposition</span>
              </button>
            </div>

            <div className="bg-slate-950/80 border border-slate-850 p-4 rounded-xl max-h-72 overflow-y-auto text-xs text-slate-300 leading-relaxed font-mono whitespace-pre-wrap select-text">
              {salesPitchText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
