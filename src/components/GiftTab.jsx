import React from 'react';
import { Gift, Share2 } from 'lucide-react';

export default function GiftTab({
  giftRecipient,
  setGiftRecipient,
  giftMessage,
  setGiftMessage,
  giftThemeColor,
  setGiftThemeColor,
  isGiftActive,
  setIsGiftActive,
  copyToClipboard,
  triggerToast
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header info */}
      <div>
        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
          <span>Générateur de Carte Cadeau IA</span>
          <Gift className="w-5 h-5 text-indigo-400 animate-pulse" />
        </h2>
        <p className="text-slate-400 text-sm">Créez des cadeaux de fidélisation interactifs augmentés par l'IA pour vos clients locaux.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-5 text-sm">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Nom du client récipiendaire</label>
              <input
                type="text"
                placeholder="Ex: Boulangerie Gourmande, Paris 11"
                value={giftRecipient}
                onChange={(e) => setGiftRecipient(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Message personnalisé de remerciement</label>
              <textarea
                rows={4}
                value={giftMessage}
                onChange={(e) => setGiftMessage(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-slate-200 text-xs focus:outline-none resize-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase text-slate-400 mb-1.5">Couleur du thème visuel</label>
              <div className="flex gap-3">
                {[
                  { id: 'indigo', colorClass: 'bg-indigo-500 border-indigo-400' },
                  { id: 'emerald', colorClass: 'bg-emerald-500 border-emerald-400' },
                  { id: 'rose', colorClass: 'bg-rose-500 border-rose-400' },
                  { id: 'amber', colorClass: 'bg-amber-500 border-amber-400' },
                ].map(theme => (
                  <button
                    key={theme.id}
                    type="button"
                    onClick={() => setGiftThemeColor(theme.id)}
                    className={`w-7 h-7 rounded-full border-2 transition-all ${theme.colorClass} ${
                      giftThemeColor === theme.id ? 'ring-2 ring-white scale-110 shadow-lg' : 'opacity-60 hover:opacity-100'
                    }`}
                  />
                ))}
              </div>
            </div>

            <button
              onClick={() => {
                setIsGiftActive(true);
                triggerToast("Carte Cadeau AURA générée !");
              }}
              className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-sm py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-md shadow-indigo-500/20"
            >
              <Gift className="w-5 h-5 text-white" />
              <span>Générer le Cadeau interactif</span>
            </button>
          </div>
        </div>

        {/* Right Column: Card Preview */}
        <div className="lg:col-span-7 flex items-center justify-center">
          {isGiftActive ? (
            <div className={`relative max-w-md w-full p-8 rounded-3xl border shadow-2xl transition-all duration-500 transform hover:scale-[1.02] bg-slate-900/80 ${
              giftThemeColor === 'indigo' ? 'border-indigo-500/30 shadow-indigo-500/10' :
              giftThemeColor === 'emerald' ? 'border-emerald-500/30 shadow-emerald-500/10' :
              giftThemeColor === 'rose' ? 'border-rose-500/30 shadow-rose-500/10' :
              'border-amber-500/30 shadow-amber-500/10'
            }`}>
              {/* Glowing effect inside card */}
              <div className={`absolute top-0 right-0 w-32 h-32 rounded-full opacity-20 blur-3xl ${
                giftThemeColor === 'indigo' ? 'bg-indigo-400' :
                giftThemeColor === 'emerald' ? 'bg-emerald-400' :
                giftThemeColor === 'rose' ? 'bg-rose-400' :
                'bg-amber-400'
              }`} />

              <div className="flex items-center justify-between mb-8">
                <span className={`text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-opacity-10 border ${
                  giftThemeColor === 'indigo' ? 'bg-indigo-500 text-indigo-400 border-indigo-500/20' :
                  giftThemeColor === 'emerald' ? 'bg-emerald-500 text-emerald-400 border-emerald-500/20' :
                  giftThemeColor === 'rose' ? 'bg-rose-500 text-rose-400 border-rose-500/20' :
                  'bg-amber-500 text-amber-400 border-amber-500/20'
                }`}>
                  Offert par AURA 2026
                </span>
                <Gift className={`w-6 h-6 ${
                  giftThemeColor === 'indigo' ? 'text-indigo-400' :
                  giftThemeColor === 'emerald' ? 'text-emerald-400' :
                  giftThemeColor === 'rose' ? 'text-rose-400' :
                  'text-amber-400'
                }`} />
              </div>

              <div className="space-y-6">
                <div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase block tracking-wider">Récipiendaire d'honneur</span>
                  <h4 className="text-xl font-black text-white mt-1 leading-snug">{giftRecipient || "Établissement Client"}</h4>
                </div>

                <div className="p-4 bg-slate-950/40 border border-slate-850 rounded-2xl italic text-xs leading-relaxed text-slate-300">
                  "{giftMessage || "Aucun message personnalisé spécifié."}"
                </div>

                <div className="border-t border-slate-850 pt-6 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-500 font-bold block uppercase tracking-wider">Audit de valeur</span>
                    <span className={`text-base font-black ${
                      giftThemeColor === 'indigo' ? 'text-indigo-400' :
                      giftThemeColor === 'emerald' ? 'text-emerald-400' :
                      giftThemeColor === 'rose' ? 'text-rose-400' :
                      'text-amber-400'
                    }`}>149 € Offerts</span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(`Félicitations ${giftRecipient} ! Vous avez reçu une carte cadeau de fidélité AURA d'une valeur de 149€ pour votre e-réputation : "${giftMessage}"`)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold text-slate-950 flex items-center gap-1.5 transition-all shadow-md ${
                      giftThemeColor === 'indigo' ? 'bg-indigo-400 hover:bg-indigo-300' :
                      giftThemeColor === 'emerald' ? 'bg-emerald-400 hover:bg-emerald-300' :
                      giftThemeColor === 'rose' ? 'bg-rose-400 hover:bg-rose-300' :
                      'bg-amber-400 hover:bg-amber-300'
                    }`}
                  >
                    <Share2 className="w-3.5 h-3.5" /> Partager
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-16 text-slate-600 border border-dashed border-slate-800 rounded-3xl w-full max-w-md">
              <Gift className="w-12 h-12 text-slate-800 mx-auto mb-4 animate-bounce" />
              <h4 className="text-sm font-bold text-slate-300">Aperçu interactif indisponible</h4>
              <p className="text-slate-500 text-xs px-6">Configurez et générez la carte cadeau à gauche pour l'afficher en temps réel.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
