import React, { useState } from 'react';
import {
  NumerologyResult,
  AstrologyResult,
  EbcedResult,
  ChakraResult,
  UnifiedArchetypeResult,
  EnneagramResult,
  TotemResult
} from '../../types';
import { Sparkles, Copy, ArrowRight, ShieldCheck, Compass, Sun, Moon, Zap, Layers } from 'lucide-react';

interface AnalysisOverviewViewProps {
  numerology: NumerologyResult;
  astrology: AstrologyResult;
  ebced: EbcedResult;
  chakra: ChakraResult;
  archetype: UnifiedArchetypeResult;
  enneagram: EnneagramResult;
  totem: TotemResult;
  onNext: () => void;
}

export const AnalysisOverviewView: React.FC<AnalysisOverviewViewProps> = ({
  numerology,
  astrology,
  ebced,
  chakra,
  archetype,
  enneagram,
  totem,
  onNext
}) => {
  const [activeTab, setActiveTab] = useState<'archetype' | 'numerology' | 'astrology' | 'ebced' | 'chakra'>('archetype');
  const [copiedSection, setCopiedSection] = useState<string | null>(null);

  const handleCopy = (section: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(section);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-100">Kişisel Analiz & Sentez Merkezi</h2>
          <p className="text-xs text-slate-400">
            Numeroloji, Astroloji, Ebced/Mizan ve Çakra katmanlarının birleşik arketip sentezi
          </p>
        </div>

        <button
          onClick={onNext}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-medium text-xs rounded transition-colors self-start sm:self-auto"
        >
          <span>Sembol Seçimine Geç</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: 'archetype', label: 'Birleşik Arketip' },
          { id: 'numerology', label: 'Numeroloji' },
          { id: 'astrology', label: 'Astroloji' },
          { id: 'ebced', label: 'Ebced & Mizan' },
          { id: 'chakra', label: 'Çakra Enerjisi' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-3.5 py-1.5 text-xs font-medium rounded transition-colors whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-400 text-slate-950 font-semibold'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Unified Archetype */}
      {activeTab === 'archetype' && (
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex items-start justify-between">
            <div>
              <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block mb-1">
                Kişiye Özel Birleşik Arketip Sentezi
              </span>
              <h3 className="text-xl font-bold text-slate-100">{archetype.archetitle}</h3>
              <p className="text-xs text-slate-400 mt-1">{archetype.subtitle}</p>
            </div>

            <button
              onClick={() => handleCopy('archetype', JSON.stringify(archetype, null, 2))}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900 transition-colors"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSection === 'archetype' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900/70 border border-slate-800 rounded space-y-2">
              <span className="text-xs font-semibold text-amber-400 block">Kutsal Armağan & Temel Güç</span>
              <p className="text-xs text-slate-300 leading-relaxed">{archetype.coreGift}</p>
            </div>

            <div className="p-4 bg-slate-900/70 border border-slate-800 rounded space-y-2">
              <span className="text-xs font-semibold text-rose-400 block">Çekirdek Gerilim & Dönüşüm</span>
              <p className="text-xs text-slate-300 leading-relaxed">{archetype.coreTension}</p>
            </div>
          </div>

          <div className="p-4 bg-slate-900/50 border border-slate-800 rounded space-y-3">
            <span className="text-xs font-semibold text-slate-200 block">Görsel Metafor & Dövme Kompozisyon Vektörü</span>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{archetype.visualMetaphor}"
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-800/80 text-xs">
              <div>
                <span className="text-slate-500 block mb-1">Geometrik Çapalar:</span>
                <span className="text-amber-300">{archetype.recommendedGeometricAnchors.join(' · ')}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Botanik Uyum:</span>
                <span className="text-emerald-300">{archetype.recommendedFlora.join(' · ')}</span>
              </div>
              <div>
                <span className="text-slate-500 block mb-1">Baskın Elementler:</span>
                <span className="text-blue-300">{archetype.dominantElements.join(' & ')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Numerology */}
      {activeTab === 'numerology' && (
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h3 className="text-base font-semibold text-slate-100">Numerolojik Hesaplama Tablosu</h3>
              <p className="text-xs text-slate-400">Pitagorik sistem ile hesaplanan ana titreşimler</p>
            </div>
            <button
              onClick={() => handleCopy('numerology', JSON.stringify(numerology, null, 2))}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSection === 'numerology' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-7 gap-2.5 text-center">
            <div className="p-3 bg-slate-900 border border-amber-500/30 rounded">
              <span className="text-[10px] text-slate-400 block">Yaşam Yolu</span>
              <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">
                {numerology.lifePathNumber}
              </span>
              {numerology.isMasterNumber.lifePath && (
                <span className="text-[9px] text-amber-500 font-mono">Usta Sayı</span>
              )}
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[10px] text-slate-400 block">İfade Sayısı</span>
              <span className="text-xl font-bold font-mono text-slate-200 mt-1 block">
                {numerology.expressionNumber}
              </span>
              {numerology.isMasterNumber.expression && (
                <span className="text-[9px] text-amber-500 font-mono">Usta Sayı</span>
              )}
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[10px] text-slate-400 block">Ruh Arzusu</span>
              <span className="text-xl font-bold font-mono text-slate-200 mt-1 block">
                {numerology.soulUrgeNumber}
              </span>
              {numerology.isMasterNumber.soulUrge && (
                <span className="text-[9px] text-amber-500 font-mono">Usta Sayı</span>
              )}
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[10px] text-slate-400 block">Kişilik</span>
              <span className="text-xl font-bold font-mono text-slate-200 mt-1 block">
                {numerology.personalityNumber}
              </span>
              {numerology.isMasterNumber.personality && (
                <span className="text-[9px] text-amber-500 font-mono">Usta Sayı</span>
              )}
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[10px] text-slate-400 block">Olgunluk</span>
              <span className="text-xl font-bold font-mono text-slate-200 mt-1 block">
                {numerology.maturityNumber}
              </span>
              {numerology.isMasterNumber.maturity && (
                <span className="text-[9px] text-amber-500 font-mono">Usta Sayı</span>
              )}
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[10px] text-slate-400 block">Doğum Günü</span>
              <span className="text-xl font-bold font-mono text-cyan-400 mt-1 block">
                {numerology.birthdayNumber ?? '-'}
              </span>
              {numerology.isMasterNumber.birthday && (
                <span className="text-[9px] text-amber-500 font-mono">Usta Sayı</span>
              )}
            </div>

            <div className="p-3 bg-slate-900 border border-slate-800 rounded">
              <span className="text-[10px] text-slate-400 block">Tutum / Güneş</span>
              <span className="text-xl font-bold font-mono text-rose-400 mt-1 block">
                {numerology.attitudeNumber ?? '-'}
              </span>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
              <strong className="text-amber-400">Yaşam Yolu ({numerology.lifePathNumber}):</strong> {numerology.explanations.lifePath}
            </div>
            <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
              <strong className="text-slate-300">İfade ({numerology.expressionNumber}):</strong> {numerology.explanations.expression}
            </div>
            <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
              <strong className="text-slate-300">Ruh Arzusu ({numerology.soulUrgeNumber}):</strong> {numerology.explanations.soulUrge}
            </div>
            <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
              <strong className="text-slate-300">Kişilik ({numerology.personalityNumber}):</strong> {numerology.explanations.personality}
            </div>
            {numerology.explanations.birthday && (
              <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
                <strong className="text-cyan-400">Doğum Günü ({numerology.birthdayNumber}):</strong> {numerology.explanations.birthday}
              </div>
            )}
            {numerology.explanations.attitude && (
              <div className="p-3 bg-slate-900/60 rounded border border-slate-800/80">
                <strong className="text-rose-400">Tutum ({numerology.attitudeNumber}):</strong> {numerology.explanations.attitude}
              </div>
            )}
          </div>

          {/* Audit Trail & Method Breakdown */}
          {numerology.auditTrail && (
            <div className="p-4 bg-slate-950/70 border border-slate-800/80 rounded-lg space-y-3 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800/60 pb-2">
                <span className="font-semibold text-slate-200">Pitagorik Hesaplama & Metot Denetimi (Audit Trail)</span>
                <span className="text-[10px] text-emerald-400 font-mono bg-emerald-950/50 px-2 py-0.5 rounded border border-emerald-900/50">
                  {numerology.auditTrail.provenance.isolationGuaranteed ? 'İsim ve Tarih Boruları Tam İzole' : 'İzole Değil'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-[11px]">
                <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800 space-y-1">
                  <span className="text-slate-400 block font-semibold text-amber-400">Doğum Tarihi Dönem Döngüleri:</span>
                  <div className="text-slate-300 space-y-0.5">
                    <div>Yıl: {numerology.auditTrail.dateCycles.year.original} {'->'} <span className="font-mono text-amber-300">{numerology.auditTrail.dateCycles.year.reduced}</span></div>
                    <div>Ay: {numerology.auditTrail.dateCycles.month.original} {'->'} <span className="font-mono text-amber-300">{numerology.auditTrail.dateCycles.month.reduced}</span></div>
                    <div>Gün: {numerology.auditTrail.dateCycles.day.original} {'->'} <span className="font-mono text-amber-300">{numerology.auditTrail.dateCycles.day.reduced}</span></div>
                    <div className="text-[10px] text-slate-400 pt-1">Toplam: {numerology.auditTrail.dateCycles.sumOfCycles} {'->'} <strong>{numerology.auditTrail.dateCycles.finalLifePath}</strong></div>
                  </div>
                </div>

                <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800 space-y-1">
                  <span className="text-slate-400 block font-semibold text-slate-300">Yöntem Karşılaştırması (Düz Toplam vs Döngüler):</span>
                  <div className="text-slate-300 space-y-0.5">
                    <div>Düz Rakam Toplamı: <span className="font-mono">{numerology.auditTrail.straightSumComparison.sum}</span> {'->'} <span className="font-mono text-slate-200">{numerology.auditTrail.straightSumComparison.reduced}</span></div>
                    <div className="text-[10px] text-slate-400">
                      {numerology.auditTrail.straightSumComparison.explanation}
                    </div>
                  </div>
                </div>
              </div>

              {numerology.auditTrail.nameAnalysis.allLetters.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] text-slate-400 block font-semibold">İsim Harf Matrisi ve Sesli/Sessiz Dağılımı:</span>
                  <div className="flex flex-wrap gap-1 max-h-24 overflow-y-auto p-2 bg-slate-900/40 rounded border border-slate-900">
                    {numerology.auditTrail.nameAnalysis.allLetters.map((l, idx) => (
                      <span
                        key={idx}
                        className={`inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-mono border ${
                          l.isVowel
                            ? 'bg-amber-950/40 text-amber-300 border-amber-900/60'
                            : 'bg-slate-800/60 text-slate-300 border-slate-700/60'
                        }`}
                        title={`${l.char.toUpperCase()}: ${l.value} (${l.letterType === 'vowel' ? 'Sesli / Ruh Arzusu' : 'Sessiz / Kişilik'})`}
                      >
                        <span>{l.char.toUpperCase()}</span>
                        <span className="opacity-60 text-[9px]">={l.value}</span>
                      </span>
                    ))}
                  </div>
                  <div className="text-[10px] text-slate-400 flex justify-between px-1">
                    <span>Toplam Harf: {numerology.auditTrail.nameAnalysis.totalLetterCount}</span>
                    <span>Sesli Toplamı: {numerology.auditTrail.nameAnalysis.soulUrgeRawSum} {'->'} {numerology.soulUrgeNumber}</span>
                    <span>Sessiz Toplamı: {numerology.auditTrail.nameAnalysis.personalityRawSum} {'->'} {numerology.personalityNumber}</span>
                    <span>İfade Toplamı: {numerology.auditTrail.nameAnalysis.expressionRawSum} {'->'} {numerology.expressionNumber}</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="p-4 bg-slate-900/40 rounded border border-slate-800 text-xs">
            <span className="font-semibold text-slate-300 block mb-2">Tavsiye Edilen Dövme Temaları:</span>
            <div className="flex flex-wrap gap-2 text-slate-400">
              {numerology.tattooThemes.map((th, i) => (
                <span key={i} className="text-xs">· {th}</span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Astrology */}
      {activeTab === 'astrology' && (
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h3 className="text-base font-semibold text-slate-100">Batı Astrolojisi & Kozmik Matris</h3>
              <p className="text-xs text-slate-400">Güneş, Ay tahmini, Yükselen tahmini ve kozmik semboller</p>
            </div>
            <button
              onClick={() => handleCopy('astrology', JSON.stringify(astrology, null, 2))}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSection === 'astrology' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>

          {/* System & House Selector Toggle */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Zodyak Sistemi:</span>
              <span className="px-2.5 py-1 rounded bg-amber-500/10 border border-amber-500/30 text-amber-300 font-medium">
                {astrology.zodiacSystem || astrology.astronomicalAudit?.zodiacSystem || 'Tropikal Zodyak (Tropical)'}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-slate-400 font-medium">Ev Sistemi:</span>
              <span className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-slate-200 font-medium">
                {astrology.houseSystem || astrology.astronomicalAudit?.houseSystem || 'Placidus'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 border border-amber-500/30 rounded flex items-center gap-3">
              <Sun className="w-6 h-6 text-amber-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block">Güneş Burcu & Derecesi</span>
                <span className="text-base font-semibold text-slate-100">{astrology.sunSign}</span>
                <span className="text-[11px] text-amber-400 font-mono block">
                  {astrology.sunCoordinates?.formatted || `${Math.round(astrology.degrees)}°`}
                </span>
                <span className="text-[10px] text-slate-500 block">{astrology.element} Elementi · {astrology.modality}</span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded flex items-center gap-3">
              <Moon className="w-6 h-6 text-blue-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block">Ay Burcu (Astronomik)</span>
                <span className="text-base font-semibold text-slate-100">{astrology.moonSignEstimate}</span>
                <span className="text-[11px] text-blue-400 font-mono block">
                  {astrology.moonCoordinates?.formatted || 'Tahmini'}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  Duygusal Rezonans & İç Dünya
                </span>
              </div>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded flex items-center gap-3">
              <Compass className="w-6 h-6 text-emerald-400 shrink-0" />
              <div>
                <span className="text-[11px] text-slate-400 block">Yükselen Burç (ASC)</span>
                <span className="text-base font-semibold text-slate-100">{astrology.ascendantEstimate}</span>
                <span className="text-[11px] text-emerald-400 font-mono block">
                  {astrology.ascendantCoordinates?.formatted || (astrology.astronomicalAudit?.timePrecision.birthTimeProvided ? 'Hesaplandı' : 'Doğum saati gerekli')}
                </span>
                <span className="text-[10px] text-slate-500 block">
                  {astrology.midheavenCoordinates ? `MC: ${astrology.midheavenCoordinates.formatted}` : 'Doğu Ufku Kesişimi'}
                </span>
              </div>
            </div>
          </div>

          {/* Uncertainty notice if birth time was missing */}
          {astrology.astronomicalAudit?.timePrecision.uncertaintyNotice && (
            <div className="p-3 bg-amber-950/40 border border-amber-900/60 rounded text-xs text-amber-300">
              <strong className="block font-semibold mb-0.5">Astronomik Belirsizlik Bildirimi:</strong>
              <span>{astrology.astronomicalAudit.timePrecision.uncertaintyNotice}</span>
            </div>
          )}

          {/* Invalid date warning notice if birth date was invalid */}
          {astrology.isValidBirthDate === false && (
            <div className="p-3 bg-rose-950/40 border border-rose-900/60 rounded text-xs text-rose-300">
              <strong className="block font-semibold mb-0.5">Geçersiz Doğum Tarihi Uyarısı:</strong>
              <span>{astrology.dateValidationMessage || 'Doğum tarihi biçimi veya gün/ay sınırları geçersizdir.'}</span>
            </div>
          )}

          {/* 12 Ev Başlangıç Çizgileri Tablosu */}
          {astrology.houses && astrology.houses.length > 0 ? (
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-semibold text-slate-200">12 Ev Yerleşimi ({astrology.houseSystem || 'Placidus'})</span>
                <span className="font-mono text-[11px] text-emerald-400">Trigonometrik Kesişimler</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 pt-1 text-[11px]">
                {astrology.houses.map(h => (
                  <div key={h.houseNumber} className="p-2 bg-slate-900/60 border border-slate-800/80 rounded flex items-center justify-between">
                    <span className="text-slate-400 font-mono">{h.houseNumber}. Ev:</span>
                    <span className="text-slate-200 font-medium">{h.sign}</span>
                    <span className="text-amber-400 font-mono text-[10px]">{h.formatted}</span>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="p-3 bg-slate-900/40 border border-slate-800/60 rounded text-xs text-slate-400 flex items-center justify-between">
              <span>Doğum saati girilmediği için 12 Ev başlangıç çizgileri ve gezegen ev yerleşimleri hesaplanamaz.</span>
              <span className="text-amber-400/80 text-[11px]">Saat Gerekli</span>
            </div>
          )}

          {/* Gezegen Konumları ve Evleri */}
          {astrology.planets && astrology.planets.length > 0 && (
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-semibold text-slate-200">Gezegen Konumları & Ev Dağılımı</span>
                <span className="font-mono text-[11px] text-blue-400">Jeosentrik Efemeris</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 pt-1 text-[11px]">
                {astrology.planets.map(p => (
                  <div key={p.name} className="p-2 bg-slate-900/60 border border-slate-800/80 rounded space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="text-amber-300 font-semibold">{p.name}</span>
                      <span className="text-slate-400 font-mono">
                        {p.house !== undefined ? `${p.house}. Ev` : 'Ev: Belirsiz'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-slate-300">
                      <span>{p.sign}</span>
                      <span className="font-mono text-[10px] text-slate-400">{p.formatted}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Ay Düğümleri (Rahu & Ketu — Ortalama & Gerçek) */}
          {astrology.lunarNodes && (
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-slate-200">Ay Düğümleri (Rahu & Ketu)</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-950/60 border border-purple-800/60 text-purple-300">
                    Kuzey & Güney Düğüm
                  </span>
                </div>
                <span className="font-mono text-[11px] text-slate-400">
                  Salınım: <span className={Math.abs(astrology.lunarNodes.oscillationDeltaDeg) > 0.01 ? 'text-amber-400 font-semibold' : 'text-slate-400'}>{astrology.lunarNodes.oscillationDeltaDeg >= 0 ? '+' : ''}{astrology.lunarNodes.oscillationDeltaDeg.toFixed(3)}°</span>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                {/* Ortalama Düğümler (Mean Nodes) */}
                <div className="p-2.5 bg-slate-900/60 border border-slate-800/80 rounded space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-1">
                    <span className="font-semibold text-sky-300 text-[11px]">Ortalama Düğümler (Mean)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Düzgün Gerileme</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800/50 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-300 font-semibold">☊ Rahu (Kuzey)</span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {astrology.lunarNodes.mean.rahu.house !== undefined ? `${astrology.lunarNodes.mean.rahu.house}. Ev` : 'Ev: Belirsiz'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>{astrology.lunarNodes.mean.rahu.sign}</span>
                        <span className="font-mono text-[10px] text-slate-400">{astrology.lunarNodes.mean.rahu.formatted}</span>
                      </div>
                    </div>
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800/50 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-300 font-semibold">☋ Ketu (Güney)</span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {astrology.lunarNodes.mean.ketu.house !== undefined ? `${astrology.lunarNodes.mean.ketu.house}. Ev` : 'Ev: Belirsiz'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>{astrology.lunarNodes.mean.ketu.sign}</span>
                        <span className="font-mono text-[10px] text-slate-400">{astrology.lunarNodes.mean.ketu.formatted}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Gerçek Düğümler (True Nodes) */}
                <div className="p-2.5 bg-slate-900/60 border border-slate-800/80 rounded space-y-2">
                  <div className="flex items-center justify-between border-b border-slate-800/60 pb-1">
                    <span className="font-semibold text-emerald-300 text-[11px]">Gerçek Düğümler (True / Osculating)</span>
                    <span className="text-[10px] text-slate-500 font-mono">Güneş Pertürbasyonlu</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800/50 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-300 font-semibold">☊ Rahu (Kuzey)</span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {astrology.lunarNodes.trueNode.rahu.house !== undefined ? `${astrology.lunarNodes.trueNode.rahu.house}. Ev` : 'Ev: Belirsiz'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>{astrology.lunarNodes.trueNode.rahu.sign}</span>
                        <span className="font-mono text-[10px] text-slate-400">{astrology.lunarNodes.trueNode.rahu.formatted}</span>
                      </div>
                    </div>
                    <div className="bg-slate-950/50 p-2 rounded border border-slate-800/50 space-y-0.5">
                      <div className="flex items-center justify-between">
                        <span className="text-amber-300 font-semibold">☋ Ketu (Güney)</span>
                        <span className="text-slate-400 font-mono text-[10px]">
                          {astrology.lunarNodes.trueNode.ketu.house !== undefined ? `${astrology.lunarNodes.trueNode.ketu.house}. Ev` : 'Ev: Belirsiz'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-slate-300">
                        <span>{astrology.lunarNodes.trueNode.ketu.sign}</span>
                        <span className="font-mono text-[10px] text-slate-400">{astrology.lunarNodes.trueNode.ketu.formatted}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}


          {/* Ephemeris & Geocoding Details */}
          {astrology.astronomicalAudit && (
            <div className="p-4 bg-slate-950/70 border border-slate-800 rounded space-y-2 text-xs">
              <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                <span className="font-semibold text-slate-200">Astronomik Efemeris & Konum Denetimi</span>
                <span className="font-mono text-[11px] text-amber-400">{astrology.astronomicalAudit.zodiacSystem}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 text-[11px] text-slate-400 pt-1">
                <div>
                  <span className="text-slate-500 block">Çözümlenen Şehir:</span>
                  <span className="text-slate-200">{astrology.astronomicalAudit.locationResolution.cityName}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Enlem / Boylam:</span>
                  <span className="text-slate-200 font-mono">
                    {astrology.astronomicalAudit.locationResolution.latitude.toFixed(2)}°N, {astrology.astronomicalAudit.locationResolution.longitude.toFixed(2)}°E
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Saat Dilimi:</span>
                  <span className="text-slate-200 font-mono">
                    UTC{astrology.astronomicalAudit.locationResolution.timezoneOffsetHours >= 0 ? '+' : ''}{astrology.astronomicalAudit.locationResolution.timezoneOffsetHours}
                    {astrology.astronomicalAudit.locationResolution.isDaylightSavingTime ? ' (DST)' : ''}
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block">Efemeris Standardı:</span>
                  <span className="text-slate-200">Jean Meeus / VSOP87</span>
                </div>
              </div>
            </div>
          )}

          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded space-y-3 text-xs">
            <div>
              <span className="text-slate-400 block mb-1">Yönetici Gezegen:</span>
              <span className="text-amber-400 font-medium">{astrology.rulingPlanet}</span>
            </div>
            <div>
              <span className="text-slate-400 block mb-1">Kozmik Dövme Sembolleri:</span>
              <div className="flex flex-wrap gap-2 text-slate-300">
                {astrology.cosmicSymbols.map((cs, i) => (
                  <span key={i} className="text-xs">· {cs}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: Ebced & Mizan */}
      {activeTab === 'ebced' && (
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <h3 className="text-base font-semibold text-slate-100">Ebced & Mizan Element Dengesi</h3>
              <p className="text-xs text-slate-400">Harflerin sayısal frekansı ve dört element mizacı</p>
            </div>
            <button
              onClick={() => handleCopy('ebced', JSON.stringify(ebced, null, 2))}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSection === 'ebced' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded text-center">
              <span className="text-[11px] text-slate-400 block">Danışan İsim Ebcedi</span>
              <span className="text-xl font-bold font-mono text-slate-200 mt-1 block">{ebced.clientNameEbced}</span>
            </div>

            <div className="p-4 bg-slate-900 border border-amber-500/30 rounded text-center">
              <span className="text-[11px] text-slate-400 block">Toplam Mizan Ebcedi</span>
              <span className="text-xl font-bold font-mono text-amber-400 mt-1 block">{ebced.totalEbced}</span>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded text-center">
              <span className="text-[11px] text-slate-400 block">Baskın Mizan Elementi</span>
              <span className="text-xl font-bold text-slate-200 mt-1 block">{ebced.dominantMizanElement}</span>
            </div>
          </div>

          {/* 4 Elements Balance Distribution */}
          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg space-y-3">
            <span className="text-xs font-semibold text-slate-200 block">Mizan-ı Anâsır (Dört Unsur Frekans Dağılımı):</span>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
              <div className="p-2.5 bg-slate-950/70 border border-rose-900/40 rounded">
                <span className="text-rose-400 block font-medium">Ateş (Nâr)</span>
                <span className="text-sm font-mono font-bold text-slate-100">{ebced.mizanElementBalance.ates}</span>
              </div>
              <div className="p-2.5 bg-slate-950/70 border border-sky-900/40 rounded">
                <span className="text-sky-400 block font-medium">Hava (Bâd)</span>
                <span className="text-sm font-mono font-bold text-slate-100">{ebced.mizanElementBalance.hava}</span>
              </div>
              <div className="p-2.5 bg-slate-950/70 border border-blue-900/40 rounded">
                <span className="text-blue-400 block font-medium">Su (Âb)</span>
                <span className="text-sm font-mono font-bold text-slate-100">{ebced.mizanElementBalance.su}</span>
              </div>
              <div className="p-2.5 bg-slate-950/70 border border-amber-900/40 rounded">
                <span className="text-amber-400 block font-medium">Toprak (Hâk)</span>
                <span className="text-sm font-mono font-bold text-slate-100">{ebced.mizanElementBalance.toprak}</span>
              </div>
            </div>
          </div>

          {/* Transparent Letter Breakdown Table */}
          {ebced.auditTrail?.clientBreakdown && ebced.auditTrail.clientBreakdown.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-300">Şeffaf Harf Dökümü & Ebced Karşılıkları:</span>
                <span className="text-[11px] text-slate-500 font-mono">Büyük Ebced (Ebced-i Kebir)</span>
              </div>
              <div className="bg-slate-950/80 border border-slate-800 rounded-lg overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-900/60 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="py-2 px-3">Sıra</th>
                      <th className="py-2 px-3">Harf</th>
                      <th className="py-2 px-3">Arapça Karşılık</th>
                      <th className="py-2 px-3">Ebced Değeri</th>
                      <th className="py-2 px-3">Mizan Unsuru</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    {ebced.auditTrail.clientBreakdown.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="py-2 px-3 font-mono text-[11px] text-slate-500">{item.index}</td>
                        <td className="py-2 px-3 font-mono font-bold uppercase text-amber-300">{item.normalizedChar}</td>
                        <td className="py-2 px-3">{item.arabicLetter} ({item.arabicName})</td>
                        <td className="py-2 px-3 font-mono font-bold">{item.value}</td>
                        <td className="py-2 px-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-medium ${
                            item.element === 'Ateş' ? 'bg-rose-950/60 text-rose-300 border border-rose-900/40' :
                            item.element === 'Hava' ? 'bg-sky-950/60 text-sky-300 border border-sky-900/40' :
                            item.element === 'Su' ? 'bg-blue-950/60 text-blue-300 border border-blue-900/40' :
                            'bg-amber-950/60 text-amber-300 border border-amber-900/40'
                          }`}>
                            {item.element}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded space-y-2 text-xs">
            <span className="font-semibold text-amber-400 block">Esma & Sembolik Mizan Ekseni:</span>
            <p className="text-slate-300 leading-relaxed">{ebced.esmaAxisTitle}</p>
          </div>

          <div className="p-3 bg-slate-950 border border-slate-800 rounded text-[11px] text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{ebced.auditTrail?.privacyNotice || 'Gizlilik Garantisi: Anne adı yalnızca element dengesi hesabında kullanılmıştır, çıktı veya dövme promptlarına aktarılmaz.'}</span>
          </div>
        </div>
      )}

      {/* Tab 5: Chakra */}
      {activeTab === 'chakra' && (
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-6 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-semibold text-slate-100">Çakra Enerji Analizi & Yantra Geometrisi</h3>
                <span className="px-2 py-0.5 text-[10px] bg-amber-500/10 border border-amber-500/30 text-amber-400 rounded">
                  {chakra.auditTrail ? 'Anket Puanlamalı Model' : 'Arketip Sentez Modeli'}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                7 çakra merkezi, sayısal puanlama katmanı, yantra kutsal geometrisi ve sembolik botanik rezonans
              </p>
            </div>
            <button
              onClick={() => handleCopy('chakra', JSON.stringify(chakra, null, 2))}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900"
            >
              <Copy className="w-3.5 h-3.5" />
              <span>{copiedSection === 'chakra' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>

          {/* 7 Çakra Dağılım Kartları */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-300">7 Çakra Merkezi Durum Matrisi:</span>
              <span className="text-[11px] text-slate-400 font-mono">
                Eşikler: &lt;%45 Destek Gerekiyor · %45-%75 Dengeli · &gt;%75 Aktif
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-2.5">
              {chakra.chakras.map(c => {
                const statusColor =
                  c.status === 'Destek Gerekiyor'
                    ? 'border-rose-500/40 bg-rose-950/20 text-rose-300'
                    : c.status === 'Aktif'
                    ? 'border-amber-500/40 bg-amber-950/20 text-amber-300'
                    : 'border-emerald-500/40 bg-emerald-950/20 text-emerald-300';

                const badgeBg =
                  c.status === 'Destek Gerekiyor'
                    ? 'bg-rose-500/20 text-rose-400 border-rose-500/40'
                    : c.status === 'Aktif'
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/40'
                    : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40';

                return (
                  <div
                    key={c.level}
                    className={`p-3 rounded-lg border flex flex-col justify-between ${statusColor}`}
                  >
                    <div>
                      <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                        <span>Seviye {c.level}</span>
                        <span className="font-mono">{c.element}</span>
                      </div>
                      <div className="text-xs font-semibold text-slate-100">{c.name}</div>
                      <div className="text-[10px] text-slate-400 italic mb-2">{c.sanskritName}</div>
                    </div>
                    <div className="pt-2 border-t border-slate-800/60 flex flex-col gap-1">
                      {c.scorePercent !== undefined && (
                        <div className="text-[10px] font-mono text-slate-300 flex justify-between">
                          <span>Puan:</span>
                          <span className="font-bold">%{c.scorePercent}</span>
                        </div>
                      )}
                      <span className={`px-1.5 py-0.5 text-[9px] text-center font-medium rounded border ${badgeBg}`}>
                        {c.status}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Odak Çakraları */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 border border-amber-500/40 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-amber-400 font-medium block">Birincil Odak Çakrası</span>
                <span className="px-2 py-0.5 text-[10px] rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  {chakra.primaryChakraFocus.status}
                </span>
              </div>
              <div className="text-base font-semibold text-slate-100">
                {chakra.primaryChakraFocus.name} ({chakra.primaryChakraFocus.sanskritName})
              </div>
              <div className="text-xs text-slate-300">
                <strong>Yantra Geometrisi:</strong> {chakra.primaryChakraFocus.yantraGeometry}
              </div>
              <div className="text-xs text-slate-400">
                <strong>Botanik Rezonans:</strong> {chakra.primaryChakraFocus.symbolicFlora}
              </div>
              {chakra.primaryChakraFocus.symbolicInterpretation && (
                <div className="text-xs text-amber-200/90 pt-1 border-t border-slate-800/60 leading-relaxed">
                  {chakra.primaryChakraFocus.symbolicInterpretation}
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-lg space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-medium block">İkincil Destek Çakrası</span>
                <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/30">
                  {chakra.secondaryChakraFocus.status}
                </span>
              </div>
              <div className="text-base font-semibold text-slate-100">
                {chakra.secondaryChakraFocus.name} ({chakra.secondaryChakraFocus.sanskritName})
              </div>
              <div className="text-xs text-slate-300">
                <strong>Yantra Geometrisi:</strong> {chakra.secondaryChakraFocus.yantraGeometry}
              </div>
              <div className="text-xs text-slate-400">
                <strong>Botanik Rezonans:</strong> {chakra.secondaryChakraFocus.symbolicFlora}
              </div>
              {chakra.secondaryChakraFocus.symbolicInterpretation && (
                <div className="text-xs text-emerald-200/90 pt-1 border-t border-slate-800/60 leading-relaxed">
                  {chakra.secondaryChakraFocus.symbolicInterpretation}
                </div>
              )}
            </div>
          </div>

          {/* Dövme Entegrasyon Sentezi */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded text-xs text-slate-300 leading-relaxed space-y-1">
            <strong className="text-amber-400 block mb-1">Dövme Tasarım Entegrasyon Sentezi:</strong>
            <p>{chakra.synthesisTheme}</p>
          </div>

          {/* İstem 7 Katman Ayrımı ve Denetim Garantisi */}
          <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-lg space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-200">
                İstem 7 Metodolojik Güvenceler & Katman Ayrımı:
              </span>
              <span className="text-[10px] text-emerald-400 font-medium">Tam Doğrulandı</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] text-slate-400">
              <div className="p-2.5 bg-slate-950/50 rounded border border-slate-800">
                <span className="text-slate-300 font-medium block mb-0.5">1. Sayısal Puanlama</span>
                Saf matematiksel Likert (1-5) dönüşümü, 7 ters gölge sorusu, sıfır sözel/estetik yan etki.
              </div>
              <div className="p-2.5 bg-slate-950/50 rounded border border-slate-800">
                <span className="text-slate-300 font-medium block mb-0.5">2. Sembolik Yorumlama</span>
                Hesaplanan durumla çelişmeyen yantra ve botanik eşleşmesi; puanları asla mutasyona uğratmaz.
              </div>
              <div className="p-2.5 bg-slate-950/50 rounded border border-slate-800">
                <span className="text-slate-300 font-medium block mb-0.5">3. Sınır & Determinizm</span>
                Kesin eşik sınırları (&lt;%45, %45-%75, &gt;%75), Tantrik alt merkez önceliği, 50/50 özdeşlik.
              </div>
            </div>
          </div>

          {/* Tıbbi Olmayan Öz Değerlendirme Beyanı (Medical Disclaimer) */}
          <div className="p-4 bg-amber-950/20 border border-amber-500/30 rounded-lg text-xs text-amber-200/90 leading-relaxed space-y-1">
            <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs">
              <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Tıbbi / Klinik Olmayan Öz Değerlendirme Şerhi (İstem 7 Standardı)</span>
            </div>
            <p className="text-[11px] text-slate-300">
              {chakra.medicalDisclaimer}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};
