import React, { useState } from 'react';
import { PersonalTattooRecipe, TechnicalTattooRecipe } from '../../types';
import { Copy, ArrowRight, Sparkles, Wrench, Shield, Check } from 'lucide-react';

interface RecipeViewProps {
  personalRecipe: PersonalTattooRecipe;
  technicalRecipe: TechnicalTattooRecipe;
  onNext: () => void;
}

export const RecipeView: React.FC<RecipeViewProps> = ({
  personalRecipe,
  technicalRecipe,
  onNext
}) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'technical'>('personal');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopyPersonal = () => {
    const text = [
      '=== KİŞİSEL DÖVME SEMBOL REÇETESİ ===',
      `Danışan: ${personalRecipe.clientName}`,
      `Konsept: ${personalRecipe.conceptTitle}`,
      '',
      '--- ARKETİPAL ANLATI ---',
      personalRecipe.archetypeNarrative,
      '',
      '--- ODAK ÖZNE VE TOTEM ENTEGRASYONU ---',
      personalRecipe.primarySubjectDescription,
      `Mod: ${personalRecipe.totemIntegrationMode}`,
      '',
      '--- SEMBOLİK BİLEŞENLER ---',
      ...personalRecipe.secondarySymbolBreakdown.map(s => `• ${s.name}: ${s.meaning} (${s.roleInDesign})`),
      '',
      '--- GEOMETRİK VE BOTANİK ÇERÇEVE ---',
      `Geometri: ${personalRecipe.geometricFramework}`,
      `Botanik: ${personalRecipe.botanicalAndNatureAccents.join(', ')}`,
      `Elementel Uyum: ${personalRecipe.elementalHarmonics}`,
      '',
      '--- RUHSAL ÖZET ---',
      personalRecipe.spiritualMeaningSummary
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopiedKey('personal');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleCopyTechnical = () => {
    const text = [
      '=== TEKNİK DÖVME REÇETESİ (ARTIST BRIEF) ===',
      `Uygulama Stili: ${technicalRecipe.styleName}`,
      `Anatomik Yerleşim: ${technicalRecipe.placementName}`,
      `Zorluk Seviyesi: ${technicalRecipe.difficultyRating}`,
      `Tahmini Seans: ${technicalRecipe.estimatedSessionScale}`,
      '',
      '--- İĞNE VE ÇİZGİ ŞARTNAMESİ ---',
      `Tavsiye Edilen İğneler: ${technicalRecipe.recommendedNeedleGrouping.join(', ')}`,
      `Çizgi Kalınlığı: ${technicalRecipe.lineWeightStrategy}`,
      `Gölgeleme Tekniği: ${technicalRecipe.shadingTechnique}`,
      `Negatif Alan Oranı: ${technicalRecipe.negativeSpaceRatio}`,
      '',
      '--- ANATOMİK FIT VE ANTI-BLOWOUT ---',
      `Anatomik Akış: ${technicalRecipe.anatomicalFitStrategy}`,
      `Anti-Blowout Koruması: ${technicalRecipe.antiBlowoutMeasures}`,
      `Yaşlanma Koruması: ${technicalRecipe.agingProtectionAdvice}`,
      `Şablon Aktarım Notu: ${technicalRecipe.stencilTransferNotes}`
    ].join('\n');

    navigator.clipboard.writeText(text);
    setCopiedKey('technical');
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">Dövme Tasarım Reçeteleri</h2>
          <p className="text-xs text-slate-400">
            Müşteri için anlam yüklü Kişisel Sembol Reçetesi ve Dövme Sanatçısı için Teknik Şartname
          </p>
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs rounded transition-colors self-start sm:self-auto"
        >
          <span>Prompt Üretimine Geç</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tab Switcher */}
      <div className="flex gap-3 border-b border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('personal')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded transition-colors ${
            activeTab === 'personal'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Kişisel Sembol Reçetesi (Danışan İçin)</span>
        </button>

        <button
          onClick={() => setActiveTab('technical')}
          className={`flex items-center gap-2 px-4 py-2 text-xs font-medium rounded transition-colors ${
            activeTab === 'technical'
              ? 'bg-amber-400 text-slate-950 font-semibold'
              : 'text-slate-400 hover:text-slate-200 bg-slate-900 border border-slate-800'
          }`}
        >
          <Wrench className="w-3.5 h-3.5" />
          <span>Teknik Dövme Reçetesi (Sanatçı İçin)</span>
        </button>
      </div>

      {/* Tab 1: Personal Recipe */}
      {activeTab === 'personal' && (
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block mb-1">
                Kişiye Özel Manevi Mühür
              </span>
              <h3 className="text-lg font-bold text-slate-100">{personalRecipe.conceptTitle}</h3>
              <p className="text-xs text-slate-400 mt-1">Danışan: {personalRecipe.clientName}</p>
            </div>

            <button
              onClick={handleCopyPersonal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900 transition-colors"
            >
              {copiedKey === 'personal' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'personal' ? 'Kopyalandı' : 'Kişisel Reçeteyi Kopyala'}</span>
            </button>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-amber-400 block">Arketipal Hikaye & Mana Bütünlüğü</span>
            <p className="text-xs text-slate-200 leading-relaxed">{personalRecipe.archetypeNarrative}</p>
          </div>

          <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 space-y-2">
            <span className="text-xs font-semibold text-slate-200 block">Odak Özne & Totem Entegrasyonu</span>
            <p className="text-xs text-slate-300 leading-relaxed">{personalRecipe.primarySubjectDescription}</p>
            <div className="text-[11px] text-amber-400/90 pt-1">
              <strong>Entegrasyon Modu:</strong> {personalRecipe.totemIntegrationMode}
            </div>
          </div>

          {/* Secondary Symbols */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-slate-300 block">Kompozisyondaki Sembolik Katmanlar:</span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {personalRecipe.secondarySymbolBreakdown.map((sym, idx) => (
                <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded text-xs space-y-1">
                  <span className="font-semibold text-amber-300 block">{sym.name}</span>
                  <p className="text-slate-400 leading-relaxed">{sym.meaning}</p>
                  <span className="text-[11px] text-slate-500 block">{sym.roleInDesign}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-900/40 border border-slate-800 rounded">
              <strong className="text-slate-300 block mb-1">Geometrik İskelet:</strong>
              <span className="text-slate-400">{personalRecipe.geometricFramework}</span>
            </div>
            <div className="p-3 bg-slate-900/40 border border-slate-800 rounded">
              <strong className="text-slate-300 block mb-1">Botanik Dokunuşlar:</strong>
              <span className="text-slate-400">{personalRecipe.botanicalAndNatureAccents.join(', ')}</span>
            </div>
          </div>

          {/* İSTEM 8: Totem Kademeleri Ayrımı */}
          {personalRecipe.totemTiers && (
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-amber-400">Totem Kademeleri Hiyerarşisi (İstem 8):</span>
                <span className="text-[10px] text-slate-500 font-mono">Birincil · Gölge · İkincil Ayrımı</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-amber-950/20 border border-amber-500/30 rounded space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-amber-300">1. Birincil Totem</strong>
                    <span className="text-[10px] text-amber-400/80 font-mono font-bold">Özne / Odak</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-100">{personalRecipe.totemTiers.primaryTotem.name}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{personalRecipe.totemTiers.primaryTotem.roleInTattoo}</p>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-purple-300">2. Gölge Totem</strong>
                    <span className="text-[10px] text-purple-400/80 font-mono font-bold">İçsel Simya</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-100">{personalRecipe.totemTiers.shadowTotem.name}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{personalRecipe.totemTiers.shadowTotem.roleInTattoo}</p>
                </div>

                <div className="p-3 bg-slate-900/60 border border-slate-800 rounded space-y-1">
                  <div className="flex items-center justify-between">
                    <strong className="text-cyan-300">3. İkincil Totem</strong>
                    <span className="text-[10px] text-cyan-400/80 font-mono font-bold">Ritim / Destek</span>
                  </div>
                  <div className="text-sm font-semibold text-slate-100">{personalRecipe.totemTiers.secondaryTotem.name}</div>
                  <p className="text-[11px] text-slate-400 leading-relaxed">{personalRecipe.totemTiers.secondaryTotem.roleInTattoo}</p>
                </div>
              </div>
            </div>
          )}

          {/* İSTEM 8: Enneagram Mizaç ve Kanat Ayrımı */}
          {personalRecipe.enneagramDistinction && (
            <div className="p-3 bg-slate-900/50 border border-slate-800 rounded space-y-2 text-xs">
              <span className="font-semibold text-slate-200 block">Enneagram Mizaç & Kanat Ayrımı (Asla Birbirine Karıştırılamaz):</span>
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-amber-400/10 text-amber-300 border border-amber-500/30 text-xs font-semibold">
                  Temel Tip: Tip {personalRecipe.enneagramDistinction.coreType} ({personalRecipe.enneagramDistinction.coreTypeName})
                </span>
                <span className="text-slate-500 font-mono">→</span>
                <span className="px-2 py-0.5 rounded bg-blue-400/10 text-blue-300 border border-blue-500/30 text-xs font-semibold">
                  Kanat (Wing): {personalRecipe.enneagramDistinction.wing} ({personalRecipe.enneagramDistinction.wingName})
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                {personalRecipe.enneagramDistinction.distinctionRule}
              </p>
            </div>
          )}

          {/* İSTEM 8: Doğruluk, Belirsizlik & Anne Adı Gizlilik Şerhi */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3 bg-slate-900/40 border border-slate-800 rounded space-y-1">
              <strong className="text-slate-300 block">Astroloji Kesinlik & Belirsizlik Bildirimi:</strong>
              <span className="text-slate-400 block text-[11px]">
                {personalRecipe.uncertaintyAndPrecision?.astrologyPrecision}
              </span>
              <span className="text-amber-400 font-mono text-[11px] block">
                Yükselen: {personalRecipe.uncertaintyAndPrecision?.ascendantDeclaration}
              </span>
            </div>

            <div className="p-3 bg-emerald-950/20 border border-emerald-500/30 rounded space-y-1">
              <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                <Shield className="w-3.5 h-3.5" />
                <span>Anne Adı Gizlilik & Sızıntı Koruması:</span>
              </div>
              <span className="text-slate-300 block text-[11px]">
                {personalRecipe.privacyAudit?.leakSafetyNote}
              </span>
            </div>
          </div>

          <div className="p-4 bg-slate-900/30 border border-slate-800 rounded text-xs text-slate-400 leading-relaxed">
            <strong className="text-amber-400 block mb-1">Ruhsal Özet:</strong>
            {personalRecipe.spiritualMeaningSummary}
          </div>
        </div>
      )}

      {/* Tab 2: Technical Recipe */}
      {activeTab === 'technical' && (
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex items-start justify-between border-b border-slate-800/80 pb-4">
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block mb-1">
                Tattoo Artist Technical Brief
              </span>
              <h3 className="text-lg font-bold text-slate-100">{technicalRecipe.styleName}</h3>
              <p className="text-xs text-slate-400 mt-1">Bölge: {technicalRecipe.placementName}</p>
            </div>

            <button
              onClick={handleCopyTechnical}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900 transition-colors"
            >
              {copiedKey === 'technical' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedKey === 'technical' ? 'Kopyalandı' : 'Teknik Reçeteyi Kopyala'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
            <div className="p-3 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[11px] text-slate-400 block">Zorluk Derecesi</span>
              <span className="text-xs font-semibold text-amber-400 mt-1 block">{technicalRecipe.difficultyRating}</span>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[11px] text-slate-400 block">Tahmini Seans</span>
              <span className="text-xs font-semibold text-slate-200 mt-1 block">{technicalRecipe.estimatedSessionScale}</span>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[11px] text-slate-400 block">Negatif Alan</span>
              <span className="text-xs font-semibold text-emerald-400 mt-1 block">{technicalRecipe.negativeSpaceRatio}</span>
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[11px] text-slate-400 block">İğne Grubu</span>
              <span className="text-xs font-semibold text-slate-200 mt-1 block truncate">
                {technicalRecipe.recommendedNeedleGrouping.join(' · ')}
              </span>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 bg-slate-900/60 rounded border border-slate-800 space-y-1">
              <strong className="text-amber-400 block">Çizgi Kalınlığı & Kontur Stratejisi:</strong>
              <p className="text-slate-300 leading-relaxed">{technicalRecipe.lineWeightStrategy}</p>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded border border-slate-800 space-y-1">
              <strong className="text-slate-200 block">Gölgeleme & Doku Yaklaşımı:</strong>
              <p className="text-slate-300 leading-relaxed">{technicalRecipe.shadingTechnique}</p>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded border border-slate-800 space-y-1">
              <strong className="text-emerald-400 block">Anatomik Akış & Yerleşim Kılavuzu:</strong>
              <p className="text-slate-300 leading-relaxed">{technicalRecipe.anatomicalFitStrategy}</p>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded border border-slate-800 space-y-1">
              <strong className="text-rose-400 block">Anti-Blowout & Deri Derinliği Koruması:</strong>
              <p className="text-slate-300 leading-relaxed">{technicalRecipe.antiBlowoutMeasures}</p>
            </div>

            <div className="p-3.5 bg-slate-900/60 rounded border border-slate-800 space-y-1">
              <strong className="text-blue-400 block">Şablon (Stencil) Aktarım Notu:</strong>
              <p className="text-slate-300 leading-relaxed">{technicalRecipe.stencilTransferNotes}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
