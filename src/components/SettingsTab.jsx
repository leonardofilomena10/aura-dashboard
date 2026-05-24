import React from 'react';
import { Search, Key, Database, ExternalLink, Mail, ShieldCheck } from 'lucide-react';

export default function SettingsTab({
  keysSearchTerm,
  setKeysSearchTerm,
  apiKeys,
  handleUpdateKey,
  filteredKeys,
  keyConfigMethod,
  handleUpdateKeyMethod,
  handleOAuthConnectInBg,
  testStatus,
  testSpecificConnection,
  getCategoryDetails
}) {
  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header info */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span>Configuration des Identifiants</span>
            <Key className="w-5 h-5 text-indigo-400" />
          </h2>
          <p className="text-slate-400 text-sm">Vos jetons d'accès API sont sauvegardés de manière sécurisée dans votre stockage local.</p>
        </div>

        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
          <input
            type="text"
            placeholder="Rechercher une clé d'API..."
            value={keysSearchTerm}
            onChange={(e) => setKeysSearchTerm(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-9 pr-4 py-2 text-xs text-slate-300 focus:outline-none"
          />
        </div>
      </div>

      {/* Keys form */}
      <div className="glass-card p-6 rounded-2xl border border-slate-800/80 space-y-6">
        {/* Google Client OAuth keys specifically */}
        <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl space-y-4">
          <h3 className="text-xs font-extrabold text-white uppercase tracking-wider flex items-center gap-1.5">
            <Database className="w-4 h-4 text-indigo-400" /> Identifiants Google Cloud Console (OAuth Credentials)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Google Client ID</label>
              <input
                type="text"
                placeholder="Générer un Client ID Web Application..."
                value={apiKeys["googleClientId"] || ''}
                onChange={(e) => handleUpdateKey("googleClientId", e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2 text-slate-300 text-xs font-mono focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[10px] text-slate-500 font-bold uppercase mb-1">Google Client Secret</label>
              <input
                type="password"
                placeholder="Générer un Client Secret..."
                value={apiKeys["googleClientSecret"] || ''}
                onChange={(e) => handleUpdateKey("googleClientSecret", e.target.value)}
                className="w-full bg-slate-950 border border-slate-850 rounded-xl px-3.5 py-2 text-slate-300 text-xs font-mono focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Main API Keys list */}
        <div className="divide-y divide-slate-900/60 space-y-2">
          {filteredKeys.map(tool => {
            const details = getCategoryDetails(tool.category);
            const status = testStatus[tool.id];
            const activeMethod = keyConfigMethod[tool.id] || 'api_key';

            return (
              <div key={tool.id} className="pt-6 pb-2 first:pt-2 flex flex-col lg:flex-row lg:items-center justify-between gap-6 text-xs">
                <div className="max-w-md space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{tool.name}</span>
                    <span className={`px-2 py-0.5 rounded text-[8px] font-extrabold uppercase tracking-wide bg-slate-900 border border-slate-800 ${details.text}`}>
                      {tool.category}
                    </span>
                  </div>
                  <p className="text-slate-500 text-[10px] leading-relaxed">{tool.shortDesc}</p>
                  {tool.link && (
                    <a 
                      href={tool.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="inline-flex items-center gap-1 text-[9px] text-indigo-400 hover:text-indigo-300 font-semibold mt-1 transition-colors"
                    >
                      <span>{tool.linkLabel || "Documentation"}</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 bg-slate-900/40 p-4 rounded-xl border border-slate-850 w-full lg:w-auto max-w-xl">
                  {/* Connection Method Selector */}
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[9px] text-slate-500 font-bold uppercase tracking-wider">Méthode de connexion</span>
                    <div className="flex bg-slate-950 p-1 rounded-lg border border-slate-850">
                      {[
                        { id: 'api_key', label: 'Clé API', icon: Key },
                        { id: 'credentials', label: 'Identifiants', icon: Mail },
                        { id: 'google_sso', label: 'Google SSO', icon: ShieldCheck }
                      ].map(method => {
                        const MethodIcon = method.icon;
                        const isActive = activeMethod === method.id;
                        return (
                          <button
                            key={method.id}
                            type="button"
                            onClick={() => handleUpdateKeyMethod(tool.id, method.id)}
                            className={`flex items-center gap-1 px-2.5 py-1 rounded text-[9px] font-bold transition-all ${
                              isActive 
                                ? 'bg-indigo-600 text-white shadow shadow-indigo-500/25' 
                                : 'text-slate-500 hover:text-slate-300'
                            }`}
                          >
                            <MethodIcon className="w-3 h-3" />
                            <span>{method.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Input Area based on Selected Method */}
                  <div className="flex-1 min-w-[240px] flex items-end">
                    {activeMethod === 'api_key' && (
                      <div className="w-full">
                        <label className="block text-[9px] text-slate-500 font-bold uppercase mb-1">Clé API / Token d'accès</label>
                        <input
                          type="password"
                          placeholder="Entrez le jeton/token..."
                          value={apiKeys[tool.id] || ''}
                          onChange={(e) => handleUpdateKey(tool.id, e.target.value)}
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-slate-300 font-mono text-[10px] focus:outline-none focus:border-indigo-500/50"
                        />
                      </div>
                    )}

                    {activeMethod === 'credentials' && (
                      <div className="w-full grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[9px] text-slate-500 font-bold uppercase mb-1">E-mail</label>
                          <input
                            type="email"
                            placeholder="nom@mail.com"
                            value={apiKeys[tool.id + "_email"] || ''}
                            onChange={(e) => handleUpdateKey(tool.id + "_email", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-slate-300 text-[10px] focus:outline-none focus:border-indigo-500/50"
                          />
                        </div>
                        <div>
                          <label className="block text-[9px] text-slate-500 font-bold uppercase mb-1">Mot de passe</label>
                          <input
                            type="password"
                            placeholder="Mot de passe"
                            value={apiKeys[tool.id + "_password"] || ''}
                            onChange={(e) => handleUpdateKey(tool.id + "_password", e.target.value)}
                            className="w-full bg-slate-950 border border-slate-850 rounded-lg px-3 py-1.5 text-slate-300 font-mono text-[10px] focus:outline-none focus:border-indigo-500/50"
                          />
                        </div>
                      </div>
                    )}

                    {activeMethod === 'google_sso' && (
                      <div className="w-full">
                        <label className="block text-[9px] text-slate-500 font-bold uppercase mb-1">Authentification Google</label>
                        {apiKeys[tool.id + "_google_linked"] ? (
                          <div className="flex items-center justify-between bg-slate-950 border border-slate-850 px-3 py-1.5 rounded-lg text-[10px] h-[30px]">
                            <div className="flex items-center gap-1.5 text-emerald-400 font-medium overflow-hidden text-ellipsis whitespace-nowrap max-w-[150px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              <span>Lié : {apiKeys[tool.id + "_google_linked"]}</span>
                            </div>
                            <button
                              onClick={() => handleUpdateKey(tool.id + "_google_linked", "")}
                              className="text-rose-400 hover:text-rose-300 font-bold text-[9px] uppercase tracking-wider pl-2"
                            >
                              Déconnecter
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleOAuthConnectInBg(tool.id)}
                            className="w-full bg-slate-950 border border-slate-850 hover:bg-slate-900 text-indigo-400 font-bold py-1.5 px-3 rounded-lg flex items-center justify-center gap-1.5 text-[10px] transition-colors h-[30px]"
                          >
                            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                            </svg>
                            <span>Se connecter avec Google</span>
                          </button>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Test Button & Status badge */}
                  <div className="flex items-center gap-2 self-end">
                    <button
                      onClick={() => testSpecificConnection(tool.id)}
                      disabled={status === 'testing'}
                      className="bg-slate-950 border border-slate-850 hover:bg-slate-900 text-indigo-400 px-3.5 py-1.5 rounded-lg font-bold font-mono transition-all text-[10px] h-[30px]"
                    >
                      {status === 'testing' ? 'Tests...' : 'Tester'}
                    </button>

                    {status === 'success' && (
                      <span className="bg-emerald-950/80 border border-emerald-800/80 text-emerald-400 px-2 py-1.5 rounded-lg font-bold text-[10px] h-[30px] flex items-center justify-center min-w-[28px]" title="Connexion validée">
                        ✓
                      </span>
                    )}
                    {status === 'error' && (
                      <span className="bg-rose-950/80 border border-rose-800/80 text-rose-400 px-2 py-1.5 rounded-lg font-bold text-[10px] h-[30px] flex items-center justify-center min-w-[28px]" title="Erreur d'accès">
                        ✗
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
