import React, { useState } from 'react';
import { SymbolItem, SymbolCategory } from '../../types';
import { Search, Check, Ban, Eye, Sparkles, ArrowRight, Filter } from 'lucide-react';
import { filterSymbolsByQuery } from '../../engines/symbolEngine';

interface SymbolSelectionViewProps {
  allSymbols: SymbolItem[];
  selectedSymbols: string[];
  excludedSymbols: string[];
  recommendedSymbols: SymbolItem[];
  onToggleSelect: (symbolId: string) => void;
  onToggleExclude: (symbolId: string) => void;
  onSetNeutral: (symbolId: string) => void;
  onApplyRecommended: (ids: string[]) => void;
  onNext: () => void;
}

const CATEGORIES: (SymbolCategory | 'TÜMÜ')[] = [
  'TÜMÜ',
  'GEOMETRİ',
  'BİTKİLER',
  'HAYVANLAR',
  'MİTOLOJİ',
  'KOZMİK',
  'ELEMENTLER',
  'ALCHEMY',
  'KORUMA'
];

export const SymbolSelectionView: React.FC<SymbolSelectionViewProps> = ({
  allSymbols,
  selectedSymbols,
  excludedSymbols,
  recommendedSymbols,
  onToggleSelect,
  onToggleExclude,
  onSetNeutral,
  onApplyRecommended,
  onNext
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('TÜMÜ');

  const filtered = filterSymbolsByQuery(allSymbols, searchQuery, selectedCategory);

  const selectedSet = new Set(selectedSymbols);
  const excludedSet = new Set(excludedSymbols);

  const handleIncludeAllRecommended = () => {
    const ids = recommendedSymbols.map(s => s.id);
    onApplyRecommended(ids);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">Sembol Kütüphanesi & Seçim Motoru</h2>
          <p className="text-xs text-slate-400">
            Dövmeye dahil edilecek kutsal sembolleri seçin veya kesinlikle yasaklanacak öğeleri hariç tutun.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleIncludeAllRecommended}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-amber-400 border border-amber-500/30 hover:border-amber-400 bg-amber-500/10 rounded transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Önerilenleri Dahil Et</span>
          </button>

          <button
            onClick={onNext}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs rounded transition-colors"
          >
            <span>Tasarım Tercihlerine Geç</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Summary Counters */}
      <div className="flex items-center gap-4 text-xs">
        <div className="text-emerald-400 font-medium">
          Dahil Edilen: <span className="font-mono">{selectedSymbols.length}</span>
        </div>
        <div className="text-slate-600">·</div>
        <div className="text-rose-400 font-medium">
          Hariç Tutulan (Yasaklı): <span className="font-mono">{excludedSymbols.length}</span>
        </div>
        <div className="text-slate-600">·</div>
        <div className="text-slate-400">
          Toplam Aktif Katalog: <span className="font-mono">{allSymbols.length}</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="bg-[#12161c] border border-slate-800 rounded-lg p-4 space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Sembol adı, anlamı, kültürü veya anahtar kelime ara (örn: Lotus, Vesica, Meşe, Yılan)..."
            className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-800 focus:border-amber-500 focus:outline-none rounded text-slate-100 text-xs"
          />
        </div>

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded text-xs transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-slate-950 font-semibold'
                  : 'bg-slate-900 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Symbol Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(symbol => {
          const isSelected = selectedSet.has(symbol.id);
          const isExcluded = excludedSet.has(symbol.id);

          return (
            <div
              key={symbol.id}
              className={`bg-[#12161c] border rounded-lg p-4 flex flex-col justify-between transition-all ${
                isSelected
                  ? 'border-emerald-500/50 bg-emerald-950/10'
                  : isExcluded
                  ? 'border-rose-500/50 bg-rose-950/10'
                  : 'border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <h4 className="text-sm font-semibold text-slate-100 leading-tight">
                    {symbol.name}
                  </h4>
                  <span className="text-[10px] font-mono text-slate-400 px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 shrink-0">
                    {symbol.category}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {symbol.symbolicMeaning}
                </p>

                <div className="text-[11px] text-slate-500 flex flex-wrap gap-1 pt-1">
                  {symbol.originOrCulture && (
                    <span className="text-slate-400">Köken: {symbol.originOrCulture} ·</span>
                  )}
                  {symbol.element && (
                    <span className="text-amber-500/90">Element: {symbol.element}</span>
                  )}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-3 mt-3 border-t border-slate-800/80 flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => onToggleSelect(symbol.id)}
                  className={`flex-1 py-1.5 px-2 rounded text-[11px] font-medium flex items-center justify-center gap-1 transition-colors ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 font-bold'
                      : 'bg-slate-900 hover:bg-emerald-950/40 text-slate-300 hover:text-emerald-300 border border-slate-800'
                  }`}
                >
                  <Check className="w-3 h-3" />
                  <span>Dahil Et</span>
                </button>

                <button
                  type="button"
                  onClick={() => onToggleExclude(symbol.id)}
                  className={`flex-1 py-1.5 px-2 rounded text-[11px] font-medium flex items-center justify-center gap-1 transition-colors ${
                    isExcluded
                      ? 'bg-rose-500 text-white font-bold'
                      : 'bg-slate-900 hover:bg-rose-950/40 text-slate-300 hover:text-rose-300 border border-slate-800'
                  }`}
                >
                  <Ban className="w-3 h-3" />
                  <span>Hariç Tut</span>
                </button>

                {(isSelected || isExcluded) && (
                  <button
                    type="button"
                    onClick={() => onSetNeutral(symbol.id)}
                    className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-800"
                    title="Nötr Yap"
                  >
                    <Eye className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
