import React, { useMemo } from 'react';
import { Search, Sparkles, AlertTriangle, ArrowRight, Check, X, Terminal, ExternalLink, Copy } from 'lucide-react';
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
  copyToClipboard
}) {
  const filteredTools = useMemo(() => {
    return AI_TOOLS_DATABASE.filter(tool => {
      const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            tool.shortDesc.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            tool.utility.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top row controls */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            <span>Catalogue d'Élite des Outils IA</span>
            <Sparkles className="w-5 h-5 text-indigo-400 animate-pulse" />
          </h2>
          <p className="text-slate-400 text-sm">Découvrez, recherchez et connectez les 34 meilleures applications IA du marché.</p>
        </div>

        {/* Search input */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Rechercher un outil, une utilité..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all placeholder:text-slate-500"
          />
        </div>
      </div>

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
        {selectedTool && (
          <div className="lg:col-span-4 glass-card p-6 rounded-2xl border border-indigo-500/30 static lg:sticky top-24 self-start animate-slideLeft space-y-6">
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
        )}
      </div>
    </div>
  );
}
