import React, { useMemo } from 'react';
import { UserCheck, Building, Plus, Trash2, FileText, X, Download } from 'lucide-react';

export default function ClientsTab({
  theme,
  agencyName,
  setAgencyName,
  primaryBrandTheme,
  setPrimaryBrandTheme,
  agencyPricingBase,
  setAgencyPricingBase,
  agencyPricingPerReview,
  setAgencyPricingPerReview,
  gmbProfiles,
  newClientName,
  setNewClientName,
  newClientContact,
  setNewClientContact,
  newClientEmail,
  setNewClientEmail,
  newClientPhone,
  setNewClientPhone,
  newClientStatus,
  setNewClientStatus,
  newClientAssignedProfiles,
  setNewClientAssignedProfiles,
  clientsList,
  invoiceModalClient,
  setInvoiceModalClient,
  handleCreateClient,
  handleDeleteClient,
  triggerToast
}) {
  const agencyStats = useMemo(() => {
    let totalMRR = 0;
    let totalReviews = 0;
    let activeClientsCount = clientsList.filter(c => c.status === 'active').length;
    
    clientsList.forEach(client => {
      let clientReviews = 0;
      client.assignedProfiles.forEach(profId => {
        const prof = gmbProfiles.find(p => p.id === profId);
        if (prof) clientReviews += prof.totalReviews || 0;
      });
      
      totalReviews += clientReviews;
      if (client.status === 'active') {
        totalMRR += agencyPricingBase + (clientReviews * agencyPricingPerReview);
      }
    });

    const apiCostEst = totalReviews * 0.0015;
    const netProfit = totalMRR - apiCostEst;
    const profitMarginPercent = totalMRR > 0 ? ((netProfit / totalMRR) * 100).toFixed(1) : "100.0";
    
    return {
      totalMRR,
      totalReviews,
      activeClientsCount,
      apiCostEst,
      netProfit,
      profitMarginPercent
    };
  }, [clientsList, gmbProfiles, agencyPricingBase, agencyPricingPerReview]);

  return (
    <div className="space-y-8 animate-fadeIn text-slate-100">
      {/* Header info */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>Hub Clients & Agence (Monétisation White-Label)</span>
          <UserCheck className={`w-6 h-6 ${theme.text}`} />
        </h2>
        <p className="text-slate-400 text-sm">Gérez les comptes clients, personnalisez la marque blanche du dashboard, configurez la facturation et suivez vos marges de profit.</p>
      </div>

      {/* Financial Performance KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Chiffre d'Affaires Estimé (MRR)</span>
          <div className="text-2xl font-bold text-white flex items-baseline gap-1">
            <span>{agencyStats.totalMRR.toFixed(2)} €</span>
            <span className="text-[10px] text-slate-500 font-normal">/ mois</span>
          </div>
          <p className="text-[10px] text-slate-500">Abonnements de base + coût variable des avis</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Coûts API Gemini/Make (Est.)</span>
          <div className="text-2xl font-bold text-red-400">
            <span>{agencyStats.apiCostEst.toFixed(4)} €</span>
          </div>
          <p className="text-[10px] text-slate-500">Estimation à 0.0015€ par jeton/appel</p>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Marge Bénéficiaire Nette</span>
          <div className="text-2xl font-bold text-emerald-400 flex items-center gap-2">
            <span>{agencyStats.profitMarginPercent}%</span>
          </div>
          <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden">
            <div className={`bg-gradient-to-r ${theme.bgGradient} h-full rounded-full`} style={{ width: `${agencyStats.profitMarginPercent}%` }}></div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-2">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avis Gérés au Total</span>
          <div className="text-2xl font-bold text-white">
            <span>{agencyStats.totalReviews} avis</span>
          </div>
          <p className="text-[10px] text-slate-500">Pour {agencyStats.activeClientsCount} clients actifs</p>
        </div>
      </div>

      {/* Customization & Registration Forms */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Branding and Pricing setup */}
        <div className="lg:col-span-6 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              Personnalisation de la Marque Blanche
            </h3>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-400">Nom Commercial de l'Agence</label>
                <input
                  type="text"
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  placeholder="Ex: AURA Agency"
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                />
                <span className="text-[10px] text-slate-500 italic block">Ce nom remplace le logo par défaut en haut à gauche du dashboard.</span>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400">Thème de Couleur Principal</label>
                <div className="flex flex-wrap gap-2.5">
                  {[
                    { id: 'indigo', label: 'Indigo / Cyber', color: 'bg-indigo-500 border-indigo-400' },
                    { id: 'emerald', label: 'Émeraude / Bio', color: 'bg-emerald-500 border-emerald-400' },
                    { id: 'rose', label: 'Rose / Mode', color: 'bg-rose-500 border-rose-400' },
                    { id: 'violet', label: 'Violet / Luxe', color: 'bg-violet-500 border-violet-400' },
                    { id: 'cyan', label: 'Cyan / Tech', color: 'bg-cyan-500 border-cyan-400' }
                  ].map(colorTheme => (
                    <button
                      key={colorTheme.id}
                      type="button"
                      onClick={() => setPrimaryBrandTheme(colorTheme.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all ${
                        primaryBrandTheme === colorTheme.id
                          ? `bg-slate-900 border-white text-white shadow-lg`
                          : 'bg-slate-900/50 border-slate-800/80 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${colorTheme.color}`}></span>
                      <span>{colorTheme.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              Configuration de la Grille Tarifaire Clients
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-400">Abonnement de Base (€/mois)</label>
                <input
                  type="number"
                  value={agencyPricingBase}
                  onChange={(e) => setAgencyPricingBase(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                />
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-semibold text-slate-400">Coût par Avis Google Maps (€)</label>
                <input
                  type="number"
                  step="0.05"
                  value={agencyPricingPerReview}
                  onChange={(e) => setAgencyPricingPerReview(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                />
              </div>
            </div>
            <p className="text-[10px] text-slate-500 italic">
              Ces valeurs servent de base pour calculer les factures simulations et estimer vos gains.
            </p>
          </div>
        </div>

        {/* Add Client account form */}
        <div className="lg:col-span-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <h3 className="text-sm font-bold text-white border-b border-slate-800 pb-2">
              Enregistrer un Nouveau Client
            </h3>
            <form onSubmit={handleCreateClient} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-400">Nom de la Société / Client *</label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Pizzeria Napoli"
                    value={newClientName}
                    onChange={(e) => setNewClientName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-400">Nom du Contact référent</label>
                  <input
                    type="text"
                    placeholder="Ex: Giovanni Rossi"
                    value={newClientContact}
                    onChange={(e) => setNewClientContact(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-400">E-mail</label>
                  <input
                    type="email"
                    placeholder="Ex: g.rossi@napoli.fr"
                    value={newClientEmail}
                    onChange={(e) => setNewClientEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-semibold text-slate-400">Téléphone</label>
                  <input
                    type="text"
                    placeholder="Ex: 06 12..."
                    value={newClientPhone}
                    onChange={(e) => setNewClientPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  />
                </div>
                <div className="space-y-1 sm:col-span-2">
                  <label className="block text-xs font-semibold text-slate-400">Statut de la Souscription</label>
                  <select
                    value={newClientStatus}
                    onChange={(e) => setNewClientStatus(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
                  >
                    <option value="active">Actif (Facturation en cours)</option>
                    <option value="pending">En attente d'activation</option>
                    <option value="inactive">Suspendu / Inactif</option>
                  </select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="block text-xs font-semibold text-slate-400">Assigner des établissements GMB</label>
                <div className="flex flex-wrap gap-2 max-h-36 overflow-y-auto bg-slate-950 p-2 rounded-xl border border-slate-850">
                  {gmbProfiles.map(prof => {
                    const isAssigned = newClientAssignedProfiles.includes(prof.id);
                    return (
                      <button
                        key={prof.id}
                        type="button"
                        onClick={() => {
                          if (isAssigned) {
                            setNewClientAssignedProfiles(prev => prev.filter(id => id !== prof.id));
                          } else {
                            setNewClientAssignedProfiles(prev => [...prev, prof.id]);
                          }
                        }}
                        className={`px-2.5 py-1 rounded-lg text-xs font-semibold border transition-all ${
                          isAssigned
                            ? `${theme.bgMuted} ${theme.borderMuted} ${theme.text}`
                            : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200'
                        }`}
                      >
                        {prof.location}
                      </button>
                    );
                  })}
                  {gmbProfiles.length === 0 && (
                    <span className="text-[10px] text-slate-500 italic p-1">Aucune fiche GMB disponible.</span>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className={`w-full py-2.5 rounded-xl font-bold text-xs text-white transition-all shadow-md bg-gradient-to-r ${theme.bgGradient} ${theme.shadow} flex items-center justify-center gap-1.5`}
              >
                <Plus className="w-4 h-4" />
                <span>Enregistrer le client</span>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* List of Clients */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-4">
        <h3 className="text-sm font-bold text-white flex items-center gap-2">
          <Building className={`w-4 h-4 ${theme.text}`} />
          <span>Portefeuille Clients et Revenus Associés</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {clientsList.map(client => {
            let clientReviewsCount = 0;
            client.assignedProfiles.forEach(profId => {
              const prof = gmbProfiles.find(p => p.id === profId);
              if (prof) clientReviewsCount += prof.totalReviews || 0;
            });

            const currentInvoiceEst = agencyPricingBase + (clientReviewsCount * agencyPricingPerReview);

            return (
              <div key={client.id} className="bg-slate-900/40 border border-slate-800 p-5 rounded-2xl flex flex-col justify-between gap-4 relative group hover:border-slate-700/80 transition-all">
                <div className="space-y-3">
                  <div className="flex justify-between items-start gap-2">
                    <div>
                      <h4 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors">{client.name}</h4>
                      <span className="text-[10px] text-slate-500">Contact : {client.contact || 'N/A'}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      client.status === 'active'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        : client.status === 'pending'
                        ? 'bg-amber-500/10 text-amber-450 border border-amber-500/20'
                        : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                    }`}>
                      {client.status === 'active' ? 'Actif' : client.status === 'pending' ? 'Attente' : 'Suspendu'}
                    </span>
                  </div>

                  <div className="text-[11px] space-y-1 text-slate-400 border-t border-b border-slate-850 py-2.5">
                    <div className="flex justify-between">
                      <span className="text-slate-550">E-mail :</span>
                      <span className="text-slate-300 font-medium truncate max-w-[70%]">{client.email || 'Non renseigné'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-550">Téléphone :</span>
                      <span className="text-slate-300">{client.phone || 'Non renseigné'}</span>
                    </div>
                    <div className="flex justify-between items-start mt-1.5">
                      <span className="text-slate-550">Fiches :</span>
                      <div className="flex flex-col items-end gap-1 text-[10px] max-w-[60%]">
                        {client.assignedProfiles.map(pId => (
                          <span key={pId} className="bg-slate-950 border border-slate-800 text-slate-400 px-2 py-0.5 rounded font-medium text-right truncate w-full">
                            {gmbProfiles.find(pr => pr.id === pId)?.location || pId}
                          </span>
                        ))}
                        {client.assignedProfiles.length === 0 && (
                          <span className="text-slate-600 italic">Aucune fiche</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 pt-1">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-850 flex justify-between items-center text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block">Facturation HT (mois)</span>
                      <span className="font-bold text-white">{currentInvoiceEst.toFixed(2)} €</span>
                    </div>
                    <div className="text-right">
                      <span className="text-[10px] text-slate-500 block">Avis traités</span>
                      <span className={`font-mono font-bold ${theme.text}`}>{clientReviewsCount}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setInvoiceModalClient(client)}
                      className="flex-1 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-850 hover:border-slate-800 text-slate-300 font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-1.5 focus:outline-none"
                    >
                      <FileText className="w-3.5 h-3.5 text-indigo-400" />
                      <span>Facture proforma</span>
                    </button>
                    <button
                      onClick={() => handleDeleteClient(client.id)}
                      className="p-2 bg-slate-950 border border-slate-850 hover:bg-rose-950/30 hover:border-rose-900/40 text-slate-500 hover:text-rose-400 rounded-xl transition-all focus:outline-none"
                      title="Supprimer le client"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}

          {clientsList.length === 0 && (
            <div className="col-span-3 glass-card bg-slate-900/20 p-8 text-center text-slate-650">
              <UserCheck className="w-10 h-10 mx-auto text-slate-800 mb-2" />
              <p className="text-xs">Aucun client enregistré pour l'instant.</p>
            </div>
          )}
        </div>
      </div>

      {/* Simulated Invoice proforma Modal */}
      {invoiceModalClient && (() => {
        const client = invoiceModalClient;
        let clientReviewsCount = 0;
        client.assignedProfiles.forEach(profId => {
          const prof = gmbProfiles.find(p => p.id === profId);
          if (prof) clientReviewsCount += prof.totalReviews || 0;
        });

        const subtotalBase = agencyPricingBase;
        const subtotalVar = clientReviewsCount * agencyPricingPerReview;
        const totalDue = subtotalBase + subtotalVar;
        const invoiceNo = `FACT-${new Date().getFullYear()}-${client.id.replace('cli-', '').slice(0, 5).toUpperCase()}`;

        return (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
            <div className="glass-card bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-2xl w-full space-y-6 shadow-2xl relative">
              
              <button
                onClick={() => setInvoiceModalClient(null)}
                className="absolute right-6 top-6 p-1.5 rounded-lg bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-400 hover:text-slate-200 transition-all focus:outline-none"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Invoice design content */}
              <div className="space-y-6 border border-slate-800 p-6 rounded-2xl bg-slate-950/65 font-sans text-xs">
                <div className="flex justify-between items-start border-b border-slate-850 pb-5">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <span className={`w-3.5 h-3.5 rounded bg-gradient-to-tr ${theme.bgGradient}`}></span>
                      <span className="font-extrabold text-sm text-white tracking-wide">{agencyName}</span>
                    </div>
                    <span className="text-[10px] text-slate-500">Service de Réputation Autonome IA</span>
                  </div>
                  <div className="text-right">
                    <h4 className="font-bold text-white text-sm uppercase tracking-wider font-mono">Facture Proforma</h4>
                    <span className="font-mono text-[10px] text-slate-400 font-bold block">{invoiceNo}</span>
                    <span className="text-[9px] text-slate-500">Date : {new Date().toLocaleDateString('fr-FR')}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 border-b border-slate-800 pb-5 text-slate-350">
                  <div className="space-y-1">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide block font-bold">Émetteur</span>
                    <span className="font-bold text-slate-200">{agencyName}</span>
                    <span className="block text-[10px] text-slate-400">Contact : Facturation Agence</span>
                  </div>
                  <div className="space-y-1 text-right">
                    <span className="text-[10px] text-slate-500 uppercase tracking-wide block font-bold">Destinataire</span>
                    <span className="font-bold text-slate-200">{client.name}</span>
                    <span className="block text-[10px] text-slate-400">{client.contact || 'Contact Référent'}</span>
                    <span className="block text-[10px] text-slate-400">{client.email || 'N/A'}</span>
                  </div>
                </div>

                {/* Items table */}
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-slate-800 text-[10px] uppercase font-bold text-slate-505">
                      <th className="py-2.5">Description</th>
                      <th className="py-2.5 text-center">Quantité</th>
                      <th className="py-2.5 text-right">Prix Unitaire</th>
                      <th className="py-2.5 text-right">Total HT</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-300">
                    <tr className="border-b border-slate-850">
                      <td className="py-3">
                        <span className="font-bold text-slate-200 block">Abonnement Mensuel AURA Autopilot</span>
                        <span className="text-[10px] text-slate-500">Solution SaaS autonome tout-en-un.</span>
                      </td>
                      <td className="py-3 text-center">1</td>
                      <td className="py-3 text-right">{subtotalBase.toFixed(2)} €</td>
                      <td className="py-3 text-right">{subtotalBase.toFixed(2)} €</td>
                    </tr>
                    <tr className="border-b border-slate-850">
                      <td className="py-3">
                        <span className="font-bold text-slate-200 block">Modération & Automatisation d'avis</span>
                        <span className="text-[10px] text-slate-500">Traitement de l'historique de la télémétrie.</span>
                      </td>
                      <td className="py-3 text-center">{clientReviewsCount}</td>
                      <td className="py-3 text-right">{agencyPricingPerReview.toFixed(2)} €</td>
                      <td className="py-3 text-right">{subtotalVar.toFixed(2)} €</td>
                    </tr>
                  </tbody>
                </table>

                {/* Totals */}
                <div className="flex justify-end pt-3">
                  <div className="w-60 space-y-2 text-right">
                    <div className="flex justify-between text-slate-450">
                      <span>Total Brut HT :</span>
                      <span>{totalDue.toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-slate-450">
                      <span>TVA (Simulation 20%) :</span>
                      <span>{(totalDue * 0.20).toFixed(2)} €</span>
                    </div>
                    <div className="flex justify-between text-white font-extrabold text-sm border-t border-slate-800 pt-2">
                      <span>Total TTC :</span>
                      <span className={theme.text}>{(totalDue * 1.20).toFixed(2)} €</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal actions */}
              <div className="flex justify-end gap-3.5">
                <button
                  onClick={() => setInvoiceModalClient(null)}
                  className="px-5 py-2.5 bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-300 font-bold text-xs rounded-xl transition-all focus:outline-none"
                >
                  Fermer
                </button>
                <button
                  onClick={() => {
                    triggerToast("Facture PDF simulée téléchargée !");
                    setInvoiceModalClient(null);
                  }}
                  className={`px-6 py-2.5 text-white font-bold text-xs rounded-xl bg-gradient-to-r ${theme.bgGradient} ${theme.shadow} transition-all flex items-center gap-1.5 focus:outline-none`}
                >
                  <Download className="w-4 h-4" />
                  <span>Télécharger la facture</span>
                </button>
              </div>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
