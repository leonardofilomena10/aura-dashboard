import React from 'react';
import { 
  UserCheck, Mail, RotateCw, ShieldCheck, Globe, 
  MapPin, Phone, Settings, Plus, PlusCircle, 
  Sliders, Play, X, Building
} from 'lucide-react';

export default function ProfilesTab({
  googleToken,
  fetchRealGmailInbox,
  isGmailLoading,
  handleGoogleOAuthLogout,
  handleGoogleOAuthLogin,
  gmailMessages,
  setGmbReviewInput,
  setActionMode,
  setActiveTab,
  triggerToast,
  placeSearchQuery,
  setPlaceSearchQuery,
  handleSearchPlaceWithIA,
  isSearchingPlace,
  placeSearchResult,
  setPlaceSearchResult,
  isEditingSearchResult,
  setIsEditingSearchResult,
  handleImportPlaceResult,
  handleImportAndAddImmediately,
  newProfileLocation,
  setNewProfileLocation,
  newProfileEmail,
  setNewProfileEmail,
  newProfileCategory,
  setNewProfileCategory,
  newProfileAddress,
  setNewProfileAddress,
  newProfilePhone,
  setNewProfilePhone,
  newProfileWebsite,
  setNewProfileWebsite,
  newProfileSiret,
  setNewProfileSiret,
  newProfileRating,
  setNewProfileRating,
  newProfileTotalReviews,
  setNewProfileTotalReviews,
  handleAddProfile,
  gmbProfiles,
  getProfileRules,
  handleToggleAutoReply,
  handleUpdateRule,
  setGmbLocation,
  handleDeleteProfile
}) {
  return (
    <div className="space-y-8 animate-fadeIn">
      {/* OAuth Connection Header status */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 rounded-2xl">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Authentification Google Cloud API</h3>
            <p className="text-slate-400 text-xs max-w-xl">
              Liez votre compte Google Console pour lire les mails Gmail non lus et répondre aux avis Google Maps automatiquement.
            </p>
          </div>
        </div>

        <div>
          {googleToken ? (
            <div className="flex flex-col sm:flex-row items-stretch gap-2.5">
              <button
                onClick={fetchRealGmailInbox}
                disabled={isGmailLoading}
                className="bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 px-4 rounded-xl flex items-center justify-center gap-2 transition-all focus:outline-none"
              >
                {isGmailLoading ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : <Mail className="w-3.5 h-3.5" />}
                <span>Sync Gmail</span>
              </button>
              <button
                onClick={handleGoogleOAuthLogout}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 font-bold text-xs py-2.5 px-4 rounded-xl transition-all focus:outline-none"
              >
                Déconnexion
              </button>
            </div>
          ) : (
            <button
              onClick={handleGoogleOAuthLogin}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-400 hover:to-purple-500 text-white font-bold text-xs py-3 px-5 rounded-xl flex items-center gap-2 transition-all shadow-md shadow-indigo-500/25 focus:outline-none"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Lier Google via OAuth</span>
            </button>
          )}
        </div>
      </div>

      {/* Live Gmail Messages list */}
      {gmailMessages.length > 0 && (
        <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-4 animate-slideDown">
          <h4 className="text-sm font-bold text-white flex items-center gap-2">
            <Mail className="w-4 h-4 text-indigo-400" />
            <span>Avis non lus détectés dans Gmail</span>
          </h4>
          <div className="space-y-3">
            {gmailMessages.map((msg) => (
              <div key={msg.id} className="p-4 bg-slate-900/60 border border-slate-850 rounded-xl flex items-start justify-between gap-4 text-xs">
                <div className="space-y-1">
                  <span className="font-bold text-indigo-300 block">{msg.from}</span>
                  <span className="font-semibold text-slate-200 block">{msg.subject}</span>
                  <p className="text-slate-400 italic">{msg.snippet}</p>
                </div>
                <button
                  onClick={() => {
                    setGmbReviewInput(msg.snippet);
                    setActionMode('gmb');
                    setActiveTab('live-action');
                    triggerToast("Texte de l'avis importé dans le Terminal !");
                  }}
                  className="bg-slate-950 hover:bg-slate-900 border border-slate-800 text-indigo-400 px-3 py-2 rounded-lg font-bold transition-all text-[11px] focus:outline-none"
                >
                  Traiter
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Smart GMB Discover */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Discover & Add Forms */}
        <div className="lg:col-span-5 space-y-6">
          {/* Discover card */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <Globe className="w-4 h-4 text-indigo-400" />
              <span>Smart GMB Discover (Maps Sync)</span>
            </h4>
            <p className="text-slate-400 text-xs">
              Recherchez un commerce existant sur Google Maps pour extraire ses détails grâce à l'IA (nom, adresse, téléphone, SIRET).
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Ex: Boulangerie Gourmande Lyon, SIRET, 014268..."
                value={placeSearchQuery}
                onChange={(e) => setPlaceSearchQuery(e.target.value)}
                className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs focus:outline-none focus:ring-1 focus:ring-indigo-500/50"
              />
              <button
                onClick={handleSearchPlaceWithIA}
                disabled={isSearchingPlace}
                className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-indigo-400 px-4 py-2 rounded-xl text-xs font-bold transition-all focus:outline-none"
              >
                {isSearchingPlace ? <RotateCw className="w-3.5 h-3.5 animate-spin" /> : "Chercher"}
              </button>
            </div>

            {placeSearchResult && (
              <div className="p-4 bg-indigo-950/10 border border-indigo-850/50 rounded-xl space-y-3 text-xs animate-slideDown relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-xl pointer-events-none" />
                
                <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-900/40 mb-1">
                  <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-wider">Résultat Extrait par l'IA</span>
                  <button
                    onClick={() => setIsEditingSearchResult(!isEditingSearchResult)}
                    className="text-[9px] text-slate-400 hover:text-white font-bold bg-slate-900 border border-slate-800 hover:border-slate-700 px-2 py-0.5 rounded transition-all flex items-center gap-1 focus:outline-none"
                  >
                    <Settings className="w-2.5 h-2.5" />
                    <span>{isEditingSearchResult ? "Visualiser" : "Ajuster les données"}</span>
                  </button>
                </div>

                {isEditingSearchResult ? (
                  <div className="space-y-2 pt-1">
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Nom de l'établissement</label>
                      <input
                        type="text"
                        value={placeSearchResult.location}
                        onChange={(e) => setPlaceSearchResult({...placeSearchResult, location: e.target.value})}
                        className="w-full bg-slate-955/80 border border-slate-800 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Secteur / Catégorie</label>
                        <input
                          type="text"
                          value={placeSearchResult.category}
                          onChange={(e) => setPlaceSearchResult({...placeSearchResult, category: e.target.value})}
                          className="w-full bg-slate-955/80 border border-slate-800 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Téléphone</label>
                        <input
                          type="text"
                          value={placeSearchResult.phone || ''}
                          onChange={(e) => setPlaceSearchResult({...placeSearchResult, phone: e.target.value})}
                          className="w-full bg-slate-955/80 border border-slate-800 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Adresse complète</label>
                      <input
                        type="text"
                        value={placeSearchResult.address}
                        onChange={(e) => setPlaceSearchResult({...placeSearchResult, address: e.target.value})}
                        className="w-full bg-slate-955/80 border border-slate-800 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">N° SIRET</label>
                        <input
                          type="text"
                          value={placeSearchResult.siret || ''}
                          onChange={(e) => setPlaceSearchResult({...placeSearchResult, siret: e.target.value})}
                          className="w-full bg-slate-955/80 border border-slate-800 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none font-mono"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">E-mail synchronisé</label>
                        <input
                          type="text"
                          value={placeSearchResult.email || ''}
                          onChange={(e) => setPlaceSearchResult({...placeSearchResult, email: e.target.value})}
                          className="w-full bg-slate-955/80 border border-slate-800 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="col-span-2">
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Site Web</label>
                        <input
                          type="text"
                          value={placeSearchResult.website || ''}
                          onChange={(e) => setPlaceSearchResult({...placeSearchResult, website: e.target.value})}
                          className="w-full bg-slate-955/80 border border-slate-800 rounded px-2.5 py-1 text-slate-200 text-xs focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-[9px] font-bold text-slate-500 uppercase mb-0.5">Note (★)</label>
                        <input
                          type="number"
                          step="0.1"
                          min="1"
                          max="5"
                          value={placeSearchResult.rating}
                          onChange={(e) => setPlaceSearchResult({...placeSearchResult, rating: parseFloat(e.target.value) || 4.5})}
                          className="w-full bg-slate-955/80 border border-slate-800 rounded px-2.5 py-1 text-slate-200 text-xs text-center focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[9px] bg-indigo-500/10 text-indigo-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide inline-block mb-1">
                          {placeSearchResult.category}
                        </span>
                        <span className="font-bold text-white block text-sm leading-snug">{placeSearchResult.location}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-amber-400 font-bold text-xs block">★ {placeSearchResult.rating}</span>
                        <span className="text-[10px] text-slate-500 block">{placeSearchResult.totalReviews} avis</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-slate-400 text-[11px] border-t border-slate-900/50 pt-2.5">
                      <span className="flex items-start gap-1.5 leading-tight">
                        <MapPin className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" /> 
                        <span>{placeSearchResult.address}</span>
                      </span>
                      {placeSearchResult.phone && (
                        <span className="flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span>{placeSearchResult.phone}</span>
                        </span>
                      )}
                      {placeSearchResult.website && (
                        <span className="flex items-center gap-1.5">
                          <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="text-indigo-400 truncate">{placeSearchResult.website}</span>
                        </span>
                      )}
                      {placeSearchResult.siret && (
                        <span className="flex items-center gap-1.5 font-mono text-[10px]">
                          <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                          <span>SIRET: {placeSearchResult.siret}</span>
                        </span>
                      )}
                      {placeSearchResult.email && (
                        <span className="flex items-center gap-1.5">
                          <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                          <span className="truncate">{placeSearchResult.email}</span>
                        </span>
                      )}
                    </div>
                  </>
                )}

                <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-900/40">
                  <button
                    type="button"
                    onClick={handleImportPlaceResult}
                    className="bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 py-2 rounded-lg font-bold transition-all text-[11px] focus:outline-none"
                  >
                    Importer
                  </button>
                  <button
                    type="button"
                    onClick={handleImportAndAddImmediately}
                    className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-lg font-bold transition-all text-[11px] flex items-center justify-center gap-1 shadow-lg shadow-indigo-600/15 focus:outline-none"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Ajouter & Activer</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Form to Add Profile Manual */}
          <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-4">
            <h4 className="text-sm font-bold text-white flex items-center gap-2">
              <PlusCircle className="w-4 h-4 text-purple-400" />
              <span>Ajouter un Profil Client Local</span>
            </h4>
            <form onSubmit={handleAddProfile} className="space-y-3.5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Nom du commerce</label>
                  <input
                    type="text"
                    placeholder="Ex: Boulangerie Gourmande"
                    value={newProfileLocation}
                    onChange={(e) => setNewProfileLocation(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">E-mail synchronisé du client</label>
                  <input
                    type="email"
                    placeholder="client@etablissement.fr"
                    value={newProfileEmail}
                    onChange={(e) => setNewProfileEmail(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Secteur d'activité</label>
                  <input
                    type="text"
                    placeholder="Ex: Boulangerie, BTP, SaaS..."
                    value={newProfileCategory}
                    onChange={(e) => setNewProfileCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs focus:outline-none"
                  />
                  <div className="flex flex-wrap gap-1 pt-1.5 max-h-24 overflow-y-auto bg-slate-950/40 p-1.5 rounded-lg border border-slate-900/60 mt-1">
                    {["Restauration", "Artisan / BTP", "Beauté / Spa", "Médical & Santé", "Immobilier", "Informatique / SaaS", "Boulangerie & Pâtisserie", "Garage Automobile", "Assurances & Banque", "Alimentation Générale & Commerces", "Transport & Logistique", "Conseil & Recrutement", "Agriculture & Viticulture", "Énergie & Écologie", "Industrie & Fabrication", "Sécurité & Gardiennage", "Propreté & Nettoyage", "Petite Enfance", "Art, Culture & Divertissement", "Architecture & Design"].map((sec) => (
                      <button
                        key={sec}
                        type="button"
                        onClick={() => setNewProfileCategory(sec)}
                        className={`text-[9px] px-1.5 py-0.5 rounded-md border transition-all focus:outline-none ${
                          newProfileCategory === sec
                            ? 'bg-indigo-500/20 border-indigo-500 text-indigo-400 font-bold'
                            : 'bg-slate-900/60 border-slate-800 text-slate-500 hover:text-slate-350'
                        }`}
                      >
                        {sec}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Adresse complète</label>
                  <input
                    type="text"
                    placeholder="Ex: 14 Rue de la Paix, 75002 Paris"
                    value={newProfileAddress}
                    onChange={(e) => setNewProfileAddress(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Téléphone</label>
                  <input
                    type="text"
                    placeholder="Ex: 01 42 68 53 00"
                    value={newProfilePhone}
                    onChange={(e) => setNewProfilePhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Site Web</label>
                  <input
                    type="text"
                    placeholder="Ex: https://etablissement.fr"
                    value={newProfileWebsite}
                    onChange={(e) => setNewProfileWebsite(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">N° SIRET</label>
                  <input
                    type="text"
                    placeholder="Ex: 48293049200021"
                    value={newProfileSiret}
                    onChange={(e) => setNewProfileSiret(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3.5 py-2 text-slate-200 text-xs focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-slate-500 mb-1">Note / Avis</label>
                  <div className="flex gap-1.5">
                    <input
                      type="number"
                      step="0.1"
                      min="1"
                      max="5"
                      placeholder="4.5"
                      value={newProfileRating}
                      onChange={(e) => setNewProfileRating(e.target.value)}
                      className="w-1/2 bg-slate-900 border border-slate-800 rounded-xl px-2 py-2 text-slate-200 text-xs text-center focus:outline-none"
                    />
                    <input
                      type="number"
                      min="0"
                      placeholder="12"
                      value={newProfileTotalReviews}
                      onChange={(e) => setNewProfileTotalReviews(e.target.value)}
                      className="w-1/2 bg-slate-900 border border-slate-800 rounded-xl px-2 py-2 text-slate-200 text-xs text-center focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs py-2.5 rounded-xl transition-all font-bold tracking-wide shadow-lg shadow-indigo-600/15 focus:outline-none"
              >
                Ajouter le profil
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Single Target Company Info */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <h4 className="text-lg font-bold text-white">Établissement Cible Actif</h4>
            <p className="text-slate-400 text-xs">Informations d'identification, de statut et règles de réponse pour le commerce actif.</p>
          </div>

          {gmbProfiles.length === 0 ? (
            <div className="glass-card p-10 rounded-2xl border border-dashed border-slate-800 text-center space-y-4">
              <div className="w-12 h-12 bg-slate-900 border border-slate-850 rounded-full flex items-center justify-center mx-auto text-slate-500 animate-pulse">
                <Building className="w-6 h-6" />
              </div>
              <div>
                <h5 className="font-bold text-white text-sm">Aucun établissement cible</h5>
                <p className="text-slate-400 text-xs mt-1">Utilisez l'outil de recherche Google Maps ou le formulaire pour cibler un commerce.</p>
              </div>
            </div>
          ) : (() => {
            const prof = gmbProfiles[0];
            const rules = getProfileRules(prof.id);
            return (
              <div className="space-y-6">
                {/* Active target company card */}
                <div className="glass-card p-6 rounded-2xl border border-indigo-500/80 bg-indigo-950/10 shadow-lg shadow-indigo-500/10 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[9px] bg-slate-900 border border-slate-800 text-indigo-400 px-2 py-0.5 rounded-full font-bold uppercase tracking-wide">
                          {prof.category}
                        </span>
                        <span className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded-full font-extrabold uppercase tracking-wide">
                          CIBLE ACTIVE
                        </span>
                        {prof.siret && (
                          <span className="text-[9px] bg-slate-900 border border-slate-800 text-slate-500 px-1.5 py-0.5 rounded font-mono">
                            SIRET: {prof.siret}
                          </span>
                        )}
                      </div>
                      <h4 className="text-base font-extrabold text-white leading-snug">{prof.location}</h4>
                    </div>
                    
                    <div className="flex flex-col items-end shrink-0 text-right">
                      <span className="text-amber-400 text-xs font-bold flex items-center gap-0.5">★ {prof.rating}</span>
                      <span className="text-[10px] text-slate-500 font-semibold">{prof.totalReviews} avis au total</span>
                    </div>
                  </div>

                  {/* Contacts details */}
                  <div className="space-y-2 border-t border-slate-900/60 pt-4 text-[11px] text-slate-400">
                    <div className="flex items-start gap-1.5 leading-tight">
                      <MapPin className="w-3.5 h-3.5 text-slate-500 mt-0.5 shrink-0" /> 
                      <span>{prof.address || "Adresse non renseignée"}</span>
                    </div>
                    {prof.phone && (
                      <div className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span>{prof.phone}</span>
                      </div>
                    )}
                    {prof.website && (
                      <a 
                        href={prof.website} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-300 transition-colors"
                      >
                        <Globe className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                        <span className="truncate">{prof.website.replace(/^https?:\/\/(www\.)?/, '')}</span>
                      </a>
                    )}
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                      <span className="truncate">{prof.email}</span>
                    </div>
                  </div>

                  {/* Auto-pilot status & toggle */}
                  <div className="border-t border-slate-900/60 pt-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-slate-200 text-xs font-bold block">Auto-Pilot IA</span>
                        <span className="text-[10px] text-slate-500 block">Répondre aux avis sans validation humaine</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => handleToggleAutoReply(prof.id)}
                        className={`relative inline-flex h-5.5 w-10 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                          prof.autoReply ? 'bg-indigo-500' : 'bg-slate-800 border border-slate-750'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-350 ${
                            prof.autoReply ? 'translate-x-5.5' : 'translate-x-0.5'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Inline auto-reply rules settings */}
                  <div className="border-t border-slate-900/60 pt-4 space-y-3.5">
                    <div className="flex items-center gap-1.5 text-indigo-400 text-xs font-bold uppercase tracking-wider">
                      <Sliders className="w-3.5 h-3.5" />
                      <span>Règles de Réponse Automatique</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div className="space-y-1">
                        <label className="block text-[9px] text-slate-400 uppercase font-bold">Seuil d'étoiles pour auto-réponse</label>
                        <select
                          value={rules.minRating}
                          onChange={(e) => handleUpdateRule(prof.id, 'minRating', Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-300 focus:outline-none"
                        >
                          <option value={1}>1 étoile ou plus (Tous)</option>
                          <option value={2}>2 étoiles ou plus</option>
                          <option value={3}>3 étoiles ou plus</option>
                          <option value={4}>4 étoiles ou plus (Recommandé)</option>
                          <option value={5}>Uniquement 5 étoiles</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-[9px] text-slate-400 uppercase font-bold">Alerte Slack sur modération</label>
                        <div className="flex items-center justify-between h-[30px] px-3 bg-slate-950 border border-slate-850 rounded-xl">
                          <span className="text-[10px] text-slate-500 font-semibold">Notifier le canal</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateRule(prof.id, 'notifySlack', !rules.notifySlack)}
                            className={`relative inline-flex h-4 w-7.5 items-center rounded-full transition-colors duration-300 focus:outline-none ${
                              rules.notifySlack ? 'bg-indigo-600' : 'bg-slate-800'
                            }`}
                          >
                            <span className={`inline-block h-2.5 w-2.5 transform rounded-full bg-white transition-transform duration-300 ${
                              rules.notifySlack ? 'translate-x-4' : 'translate-x-1'
                            }`} />
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[9px] text-slate-400 uppercase font-bold">Mots-clés sensibles à exclure</label>
                      <input
                        type="text"
                        placeholder="ex: remboursement, voleur, plainte"
                        value={rules.sensitiveKeywords.join(', ')}
                        onChange={(e) => {
                          const list = e.target.value.split(',').map(s => s.trim()).filter(Boolean);
                          handleUpdateRule(prof.id, 'sensitiveKeywords', list);
                        }}
                        className="w-full bg-slate-955 border border-slate-850 rounded-xl px-3 py-1.5 text-xs text-slate-350 focus:outline-none"
                      />
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-2 border-t border-slate-900/60 pt-4">
                    <button
                      type="button"
                      onClick={() => {
                        setGmbLocation(prof.location);
                        setActionMode('gmb');
                        setActiveTab('live-action');
                        triggerToast("Établissement cible ouvert dans le Terminal IA !");
                      }}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white py-2 rounded-xl text-xs font-bold text-center transition-all shadow-md shadow-indigo-500/10 flex items-center justify-center gap-1.5 focus:outline-none"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Ouvrir dans le Terminal IA</span>
                    </button>
                    
                    <button
                      type="button"
                      onClick={() => {
                        handleDeleteProfile(prof.id);
                        triggerToast("Établissement cible retiré.");
                      }}
                      className="bg-slate-900 hover:bg-rose-955/40 border border-slate-800 hover:border-rose-900/50 text-slate-450 hover:text-rose-450 px-4 py-2 rounded-xl text-xs font-semibold transition-all focus:outline-none"
                    >
                      Désassocier
                    </button>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
