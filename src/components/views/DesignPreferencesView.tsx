import React from 'react';
import { CanonicalDesignObject, TotemResult } from '../../types';
import { TATTOO_STYLES } from '../../data/stylesData';
import { BODY_PLACEMENTS } from '../../data/placementsData';
import { ArrowRight, ShieldCheck, Sparkles, Layers, Sliders, AlertTriangle } from 'lucide-react';

interface DesignPreferencesViewProps {
  canonical: CanonicalDesignObject;
  totem: TotemResult;
  onUpdateCanonical: (updater: (prev: CanonicalDesignObject) => CanonicalDesignObject) => void;
  onNext: () => void;
}

export const DesignPreferencesView: React.FC<DesignPreferencesViewProps> = ({
  canonical,
  totem,
  onUpdateCanonical,
  onNext
}) => {
  const currentStyle = TATTOO_STYLES[canonical.selectedStyle] || TATTOO_STYLES['style_fine_line'];
  const currentPlacement = BODY_PLACEMENTS.find(p => p.id === canonical.placementId) || BODY_PLACEMENTS[0];

  const handleStyleChange = (styleId: string) => {
    onUpdateCanonical(prev => ({
      ...prev,
      selectedStyle: styleId,
      updatedAt: new Date().toISOString()
    }));
  };

  const handlePlacementChange = (placementId: string) => {
    onUpdateCanonical(prev => ({
      ...prev,
      placementId,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleTotemToggle = (include: boolean) => {
    onUpdateCanonical(prev => ({
      ...prev,
      includeTotemAnimalFigure: include,
      updatedAt: new Date().toISOString()
    }));
  };

  const handleSymmetryChange = (sym: any) => {
    onUpdateCanonical(prev => ({
      ...prev,
      compositionSpecs: {
        ...prev.compositionSpecs,
        symmetryType: sym
      },
      updatedAt: new Date().toISOString()
    }));
  };

  const handleNegSpaceChange = (val: number) => {
    onUpdateCanonical(prev => ({
      ...prev,
      compositionSpecs: {
        ...prev.compositionSpecs,
        negativeSpacePercentage: val
      },
      updatedAt: new Date().toISOString()
    }));
  };

  const handlePaletteChange = (pal: any) => {
    onUpdateCanonical(prev => ({
      ...prev,
      colorPalette: {
        ...prev.colorPalette,
        type: pal
      },
      updatedAt: new Date().toISOString()
    }));
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">Tasarım Tercihleri & Stil Motoru</h2>
          <p className="text-xs text-slate-400">
            Dövme stili, anatomik yerleşim, kompozisyon hiyerarşisi ve totem entegrasyon kuralları
          </p>
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs rounded transition-colors self-start sm:self-auto"
        >
          <span>Reçeteyi Oluştur</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* 1. TOTEM ENTEGRASYON KURALI (MANDATORY TOGGLE) */}
      <div className="bg-[#12161c] border border-amber-500/40 rounded-lg p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block mb-1">
              Kritik Entegrasyon Kuralı (Şartname Madde 7 & 8)
            </span>
            <h3 className="text-base font-semibold text-slate-100">
              Totem Hayvanı Tasarım Entegrasyon Modu: {totem.primaryTotem.name}
            </h3>
          </div>
          <ShieldCheck className="w-5 h-5 text-amber-400 shrink-0" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => handleTotemToggle(true)}
            className={`p-4 rounded-lg border text-left transition-all ${
              canonical.includeTotemAnimalFigure
                ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="font-semibold text-xs mb-1">
              Totem Hayvanını Tasarıma Dahil Et (Organik Bütünlük)
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              {totem.primaryTotem.name} figürü, seçilen dövme stiliyle ({currentStyle.name}) birebir aynı çizgi ve gölge dilinde çözümlenir. Asla ayrı bir çıkartma (sticker) gibi görünmez.
            </p>
          </button>

          <button
            type="button"
            onClick={() => handleTotemToggle(false)}
            className={`p-4 rounded-lg border text-left transition-all ${
              !canonical.includeTotemAnimalFigure
                ? 'border-amber-400 bg-amber-500/10 text-amber-300'
                : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
            }`}
          >
            <div className="font-semibold text-xs mb-1">
              Totem Hayvanını Tasarıma Dahil Etme (Yalnızca Soyut Dil)
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Görselde kesinlikle hayvan figürü veya silüeti YER ALMAZ. Hayvanın enerjisi soyut geometri, çizgi ritmi, yön ve negatif alan oranına dönüştürülür.
            </p>
          </button>
        </div>

        {!canonical.includeTotemAnimalFigure && (
          <div className="p-3 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-400 flex items-center gap-2">
            <span className="text-amber-400 font-semibold shrink-0">Soyut Çözümleme:</span>
            <span>{totem.primaryTotem.abstractDesignEquivalents.geometricForms.join(', ')} ve {totem.primaryTotem.abstractDesignEquivalents.lineDynamics} kullanılacaktır.</span>
          </div>
        )}
      </div>

      {/* 2. DÖVME STİLİ SEÇİMİ (ALL TATTOO STYLES) */}
      <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Dövme Stili Seçimi (Tüm Stiller)</h3>
          <p className="text-xs text-slate-400">Seçilen stil, kompozisyondaki tüm sembollere ve çizgi hiyerarşisine uygulanır.</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-2.5">
          {Object.values(TATTOO_STYLES).map(style => {
            const isSelected = canonical.selectedStyle === style.id;
            return (
              <button
                key={style.id}
                type="button"
                onClick={() => handleStyleChange(style.id)}
                className={`p-3 rounded border text-left transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-medium'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-300'
                }`}
              >
                <div className="text-xs leading-tight mb-1">{style.name}</div>
                <div className="text-[10px] text-slate-500 truncate">{style.family}</div>
              </button>
            );
          })}
        </div>

        {/* Selected Style Detail Card */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-3 text-xs mt-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="font-semibold text-amber-400">{currentStyle.name} Teknik Şartnamesi</span>
            <span className="text-slate-400 font-mono text-[11px]">{currentStyle.family}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-slate-300">
            <div>
              <span className="text-slate-500 block mb-0.5">Çizgi Kalınlığı:</span>
              <span>{currentStyle.lineWeight}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Gölgeleme Tekniği:</span>
              <span>{currentStyle.shading}</span>
            </div>
            <div>
              <span className="text-slate-500 block mb-0.5">Hedef Negatif Alan:</span>
              <span className="text-emerald-400 font-medium">{currentStyle.negativeSpaceTarget}</span>
            </div>
          </div>
          <div className="pt-2 border-t border-slate-800/80 text-[11px] text-slate-400">
            <strong>Anti-Blowout Önlemi:</strong> {currentStyle.antiBlowoutGuidelines}
          </div>
        </div>
      </div>

      {/* 3. ANATOMİK YERLEŞİM (PLACEMENTS) */}
      <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-4">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Anatomik Bölge & Yerleşim</h3>
          <p className="text-xs text-slate-400">Dövmenin yerleşeceği kas anatomisi ve doğal akış doğrultusu</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5">
          {BODY_PLACEMENTS.map(plc => {
            const isSelected = canonical.placementId === plc.id;
            return (
              <button
                key={plc.id}
                type="button"
                onClick={() => handlePlacementChange(plc.id)}
                className={`p-3 rounded border text-left transition-all ${
                  isSelected
                    ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-medium'
                    : 'border-slate-800 hover:border-slate-700 bg-slate-900/60 text-slate-300'
                }`}
              >
                <div className="text-xs leading-tight mb-1">{plc.name}</div>
                <div className="text-[10px] text-slate-500">{plc.flowDirection} Akış · Acı: {plc.painLevel}/5</div>
              </button>
            );
          })}
        </div>

        {/* Selected Placement Details */}
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-semibold text-slate-200">{currentPlacement.name} Anatomik Kılavuzu</span>
            <span className="text-slate-400 font-mono text-[11px]">Akış: {currentPlacement.flowDirection}</span>
          </div>
          <p className="text-slate-300 leading-relaxed">{currentPlacement.anatomicalAdvice}</p>
          <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800">
            <strong>Yaşlanma / Esneme Notu:</strong> {currentPlacement.agingConsiderations}
          </div>
        </div>
      </div>

      {/* 4. KOMPOZİSYON & RENK PALETİ */}
      <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
        <div>
          <h3 className="text-sm font-semibold text-slate-100">Kompozisyon Dinamiği & Renk Paleti</h3>
          <p className="text-xs text-slate-400">Görsel hiyerarşi, simetri ve ten nefesi</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Simetri */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Simetri / Denge Türü</label>
            <div className="grid grid-cols-2 gap-2">
              {['Simetrik', 'Asimetrik', 'Radyal Geometrik', 'Akışkan Dinamik'].map(sym => (
                <button
                  key={sym}
                  type="button"
                  onClick={() => handleSymmetryChange(sym)}
                  className={`p-2.5 rounded border text-xs text-left transition-colors ${
                    canonical.compositionSpecs.symmetryType === sym
                      ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-medium'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {sym}
                </button>
              ))}
            </div>
          </div>

          {/* Renk Paleti */}
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-2">Mürekkep & Renk Yaklaşımı</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                'Pure Black & Grey',
                'Blackwork Minimal',
                'Monochrome with Red Accent',
                'Muted Earth Tones',
                'Watercolor Hue Wash',
                'Full Color'
              ].map(pal => (
                <button
                  key={pal}
                  type="button"
                  onClick={() => handlePaletteChange(pal)}
                  className={`p-2.5 rounded border text-xs text-left transition-colors ${
                    canonical.colorPalette.type === pal
                      ? 'border-amber-400 bg-amber-500/10 text-amber-300 font-medium'
                      : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                  }`}
                >
                  {pal}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Negative Space Slider */}
        <div className="space-y-2 pt-2 border-t border-slate-800/80">
          <div className="flex justify-between text-xs text-slate-300">
            <span>Hedef Açık Ten Negatif Alanı:</span>
            <span className="font-mono text-amber-400 font-semibold">%{canonical.compositionSpecs.negativeSpacePercentage}</span>
          </div>
          <input
            type="range"
            min={25}
            max={70}
            step={5}
            value={canonical.compositionSpecs.negativeSpacePercentage}
            onChange={e => handleNegSpaceChange(parseInt(e.target.value, 10))}
            className="w-full accent-amber-400 cursor-pointer"
          />
          <div className="flex justify-between text-[11px] text-slate-500">
            <span>%25 (Yoğun Dolgu)</span>
            <span>%45 - %55 (İdeal Cilt Nefesi & Yaşlanma Koruması)</span>
            <span>%70 (Ultra Minimalist)</span>
          </div>
        </div>
      </div>
    </div>
  );
};
