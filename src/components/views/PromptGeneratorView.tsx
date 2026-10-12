import React, { useState } from 'react';
import {
  GeneratedPrompts,
  CanonicalDesignObject,
  ClientData,
  PersonalTattooRecipe,
  TechnicalTattooRecipe,
  TotemResult,
  EnneagramResult,
  NumerologyResult,
  AstrologyResult,
  EbcedResult,
  ChakraResult,
  EnneagramAnswer,
  TotemAnswer
} from '../../types';
import { Copy, Check, ShieldCheck, Sparkles, Save, FileText, CheckCircle2, Layers } from 'lucide-react';
import { ENNEAGRAM_QUESTIONS } from '../../data/enneagramQuestions';
import { TOTEM_QUESTIONS } from '../../data/totemData';

interface PromptGeneratorViewProps {
  prompts: GeneratedPrompts;
  canonical: CanonicalDesignObject;
  client: ClientData;
  personalRecipe: PersonalTattooRecipe;
  technicalRecipe: TechnicalTattooRecipe;
  totem: TotemResult;
  enneagram: EnneagramResult;
  numerology: NumerologyResult;
  astrology: AstrologyResult;
  ebced: EbcedResult;
  chakra: ChakraResult;
  enneagramAnswers: EnneagramAnswer[];
  totemAnswers: TotemAnswer[];
  onSaveToArchive: () => void;
  onNewDesignVersion: () => void;
  savedToArchiveStatus: boolean;
}

export const PromptGeneratorView: React.FC<PromptGeneratorViewProps> = ({
  prompts,
  canonical,
  client,
  personalRecipe,
  technicalRecipe,
  totem,
  enneagram,
  numerology,
  astrology,
  ebced,
  chakra,
  enneagramAnswers,
  totemAnswers,
  onSaveToArchive,
  onNewDesignVersion,
  savedToArchiveStatus
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [masterCopied, setMasterCopied] = useState(false);

  const handleCopySingle = (key: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Requirement 21: "HER ŞEYİ KOPYALA" Single Master Copy Button
  const handleCopyEverything = () => {
    const lines = [
      '================================================================',
      '        DÖVME TASARIM ASİSTANI V2 - TAM DANIŞAN DOSYASI        ',
      '================================================================',
      '',
      '1. DANIŞAN BİLGİLERİ',
      `• Ad Soyad: ${client.firstName} ${client.lastName}`,
      `• Doğum Tarihi: ${client.birthDate}`,
      `• Doğum Saati: ${client.birthTime || 'Belirtilmedi'}`,
      `• Doğum Yeri: ${client.birthPlace || 'Belirtilmedi'}`,
      `• Telefon: ${client.phone || 'Belirtilmedi'}`,
      `• E-posta: ${client.email || 'Belirtilmedi'}`,
      `• Notlar: ${client.notes || 'Yok'}`,
      '',
      '2. NUMEROLOJİ ANALİZİ',
      `• Yaşam Yolu Sayısı: ${numerology.lifePathNumber}`,
      `• İfade Sayısı: ${numerology.expressionNumber}`,
      `• Ruh Arzusu: ${numerology.soulUrgeNumber}`,
      `• Kişilik Sayısı: ${numerology.personalityNumber}`,
      `• Olgunluk Sayısı: ${numerology.maturityNumber}`,
      `• Açıklama: ${numerology.explanations.lifePath}`,
      '',
      '3. ASTROLOJİ ANALİZİ',
      `• Güneş Burcu: ${astrology.sunSign} (${astrology.element} Elementi, ${astrology.modality})`,
      `• Ay Burcu Tahmini: ${astrology.moonSignEstimate}`,
      `• Yükselen Burç Tahmini: ${astrology.ascendantEstimate}`,
      `• Yönetici Gezegen: ${astrology.rulingPlanet}`,
      `• Kozmik Semboller: ${astrology.cosmicSymbols.join(', ')}`,
      '',
      '4. EBCED & MİZAN ANALİZİ',
      `• Danışan İsim Ebcedi: ${ebced.clientNameEbced}`,
      `• Toplam Ebced Sayısal Frekansı: ${ebced.totalEbced}`,
      `• Baskın Mizan Elementi: ${ebced.dominantMizanElement}`,
      `• Esma / Mizan Ekseni: ${ebced.esmaAxisTitle}`,
      '• Gizlilik Notu: Anne adı yalnızca Ebced hesabında kullanılmıştır, tasarım/promptlara kesinlikle dahil edilmemiştir.',
      '',
      '5. ÇAKRA ANALİZİ',
      `• Birincil Odak: ${chakra.primaryChakraFocus.name} (${chakra.primaryChakraFocus.yantraGeometry})`,
      `• İkincil Destek: ${chakra.secondaryChakraFocus.name} (${chakra.secondaryChakraFocus.yantraGeometry})`,
      `• Sentez: ${chakra.synthesisTheme}`,
      '',
      '6. ENNEAGRAM TESTİ & CEVAPLARI',
      `• Tespit Edilen Tip: Tip ${enneagram.coreType} (${enneagram.typeName})`,
      `• Kanat (Wing): ${enneagram.wingName}`,
      `• Temel Motivasyon: ${enneagram.coreMotivation}`,
      `• Temel Korku: ${enneagram.coreFear}`,
      `• Gelişim Yönü: Tip ${enneagram.growthDirection} · Stres Yönü: Tip ${enneagram.stressDirection}`,
      '• Verilen Cevaplar: ' + enneagramAnswers.map(a => `S${a.questionId}:${a.score}/5`).join(', '),
      '',
      '7. TOTEM TESTİ & CEVAPLARI',
      `• Birincil Totem: ${totem.primaryTotem.name} (${totem.primaryTotem.archetype})`,
      `• İkincil Totem: ${totem.secondaryTotem.name} (${totem.secondaryTotem.archetype})`,
      `• Gölge Totem: ${totem.shadowTotem.name} (${totem.shadowTotem.archetype})`,
      `• Özet: ${totem.behavioralSummary}`,
      '• Verilen Seçimler: ' + totemAnswers.map(a => `S${a.questionId}:${String.fromCharCode(65 + a.selectedOptionIndex)}`).join(', '),
      '',
      '8. TASARIM TERCİHLERİ & STİL',
      `• Seçilen Dövme Stili: ${technicalRecipe.styleName}`,
      `• Anatomik Yerleşim: ${technicalRecipe.placementName}`,
      `• Totem Figür Entegrasyonu: ${canonical.includeTotemAnimalFigure ? 'Figür Dahil (Stille Organik Bütünleşik)' : 'Figür Hariç (Yalnızca Soyut Dil ve Geometri)'}`,
      `• Seçilen Semboller: ${canonical.selectedSymbols.join(', ') || 'Yok'}`,
      `• Kesinlikle Hariç Tutulanlar: ${canonical.excludedSymbols.join(', ') || 'Yok'}`,
      `• Simetri / Akış: ${canonical.compositionSpecs.symmetryType} · Negatif Alan: %${canonical.compositionSpecs.negativeSpacePercentage}`,
      '',
      '9. KİŞİSEL SEMBOL REÇETESİ',
      personalRecipe.archetypeNarrative,
      `Odak: ${personalRecipe.primarySubjectDescription}`,
      `Ruhsal Anlam: ${personalRecipe.spiritualMeaningSummary}`,
      '',
      '10. TEKNİK DÖVME REÇETESİ',
      `• İğneler: ${technicalRecipe.recommendedNeedleGrouping.join(', ')}`,
      `• Çizgi Kalınlığı: ${technicalRecipe.lineWeightStrategy}`,
      `• Gölgeleme: ${technicalRecipe.shadingTechnique}`,
      `• Anti-Blowout: ${technicalRecipe.antiBlowoutMeasures}`,
      `• Şablon Notu: ${technicalRecipe.stencilTransferNotes}`,
      '',
      '11. PROFESYONEL PROMPTLAR',
      '--- MIDJOURNEY v6.1 ---',
      prompts.midjourney,
      '',
      '--- NIJI v6 ---',
      prompts.niji,
      '',
      '--- DALL-E 3 ---',
      prompts.dalle,
      '',
      '--- TATTOO STENCIL (ŞABLON) ---',
      prompts.tattooStencil,
      '',
      '--- ARTIST TECHNICAL BRIEF ---',
      prompts.artistTechnicalBrief,
      '',
      '--- GENERAL AI PROMPT ---',
      prompts.generalAi,
      '',
      '================================================================'
    ];

    navigator.clipboard.writeText(lines.join('\n'));
    setMasterCopied(true);
    setTimeout(() => setMasterCopied(false), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header & Master Action Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-[#12161c] border border-slate-800 rounded-lg p-6">
        <div>
          <span className="text-[11px] font-mono text-amber-400 uppercase tracking-wider block mb-1">
            Canonical Design Model
          </span>
          <h2 className="text-xl font-semibold text-slate-100">
            Profesyonel Dövme Promptları & Şartname
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Tek bir merkezi tasarım nesnesinden (Canonical Design Object) türetilmiş 6 tutarlı çıktı
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* HER ŞEYİ KOPYALA (Requirement 21) */}
          <button
            onClick={handleCopyEverything}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded transition-colors shadow-lg shadow-amber-500/10"
          >
            {masterCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
            <span>{masterCopied ? 'TÜM DOSYA KOPYALANDI!' : 'HER ŞEYİ KOPYALA'}</span>
          </button>

          <button
            onClick={onSaveToArchive}
            className={`flex items-center gap-1.5 px-3 py-2 text-xs font-medium rounded transition-colors ${
              savedToArchiveStatus
                ? 'bg-emerald-600 text-white'
                : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
            }`}
          >
            {savedToArchiveStatus ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            <span>{savedToArchiveStatus ? 'Arşive Kaydedildi' : 'Arşive Kaydet'}</span>
          </button>

          <button
            onClick={onNewDesignVersion}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium border border-slate-800 hover:border-slate-700 bg-slate-900 text-slate-300 rounded transition-colors"
            title="Aynı danışan için yeni bir stil varyasyonu oluşturur"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Yeni Versiyon (V{canonical.versionName.replace(/\D/g, '') || '2'})</span>
          </button>
        </div>
      </div>

      {/* Compliance / Safety Audit Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded flex items-center gap-2.5 text-xs">
          <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
          <div>
            <span className="font-semibold text-slate-200 block">Exclusion Sızıntı Kontrolü</span>
            <span className="text-[11px] text-slate-400">
              {prompts.checkedExclusionsClean ? 'Sıfır Sızıntı · Yasaklı semboller pozitif istemlerden arındırıldı' : 'Uyarı: Kontrol gerekli'}
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded flex items-center gap-2.5 text-xs">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <div>
            <span className="font-semibold text-slate-200 block">Anti-Sticker & Stil Bütünlüğü</span>
            <span className="text-[11px] text-slate-400">Tüm öğeler seçilen dövme tarzıyla homojen harmanlandı</span>
          </div>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded flex items-center gap-2.5 text-xs">
          <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
          <div>
            <span className="font-semibold text-slate-200 block">Totem Entegrasyon Durumu</span>
            <span className="text-[11px] text-slate-400">
              {canonical.includeTotemAnimalFigure ? 'Figür Dahil (Stille Füzyon)' : 'Figür Hariç (Yalnızca Soyut Dil ve Geometri)'}
            </span>
          </div>
        </div>

        <div className="p-3 bg-slate-900/60 border border-slate-800 rounded flex items-center gap-2.5 text-xs">
          <Layers className="w-4 h-4 text-purple-400 shrink-0" />
          <div>
            <span className="font-semibold text-slate-200 block">Teknik Kısıtlar Katmanı</span>
            <span className="text-[11px] text-slate-400">Negatif alan ve iğne kısıtları teknik brifte ayrıldı</span>
          </div>
        </div>
      </div>

      {/* 6 Output Cards */}
      <div className="space-y-4">
        {/* 1. Midjourney v6.1 */}
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Midjourney v6.1 Prompt (Flash & Studio Ready)
              </h3>
            </div>
            <button
              onClick={() => handleCopySingle('midjourney', prompts.midjourney)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900 transition-colors"
            >
              {copiedKey === 'midjourney' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'midjourney' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-900 rounded font-mono text-xs text-slate-300 leading-relaxed break-words select-all">
            {prompts.midjourney}
          </div>
        </div>

        {/* 2. Niji v6 */}
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-purple-400" />
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Niji v6 Prompt (Illustrative & East Fusion)
              </h3>
            </div>
            <button
              onClick={() => handleCopySingle('niji', prompts.niji)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900 transition-colors"
            >
              {copiedKey === 'niji' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'niji' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-900 rounded font-mono text-xs text-slate-300 leading-relaxed break-words select-all">
            {prompts.niji}
          </div>
        </div>

        {/* 3. DALL-E 3 */}
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                DALL-E 3 Prompt (High Fidelity & Descriptive)
              </h3>
            </div>
            <button
              onClick={() => handleCopySingle('dalle', prompts.dalle)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900 transition-colors"
            >
              {copiedKey === 'dalle' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'dalle' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-900 rounded font-mono text-xs text-slate-300 leading-relaxed break-words select-all">
            {prompts.dalle}
          </div>
        </div>

        {/* 4. Thermal Tattoo Stencil */}
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sky-400" />
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Tattoo Stencil Prompt (Termal Karbon Şablon Çizgisi)
              </h3>
            </div>
            <button
              onClick={() => handleCopySingle('stencil', prompts.tattooStencil)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900 transition-colors"
            >
              {copiedKey === 'stencil' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'stencil' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-900 rounded font-mono text-xs text-slate-300 leading-relaxed break-words select-all">
            {prompts.tattooStencil}
          </div>
        </div>

        {/* 5. Tattoo Artist Technical Brief */}
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Dövme Sanatçısı Teknik Bilgilendirmesi (Studio Brief)
              </h3>
            </div>
            <button
              onClick={() => handleCopySingle('brief', prompts.artistTechnicalBrief)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900 transition-colors"
            >
              {copiedKey === 'brief' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'brief' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>
          <pre className="p-3 bg-slate-950 border border-slate-900 rounded font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-wrap select-all">
            {prompts.artistTechnicalBrief}
          </pre>
        </div>

        {/* 6. General AI Prompt */}
        <div className="bg-[#12161c] border border-slate-800 rounded-lg p-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-slate-400" />
              <h3 className="text-xs font-semibold text-slate-200 uppercase tracking-wide">
                Genel AI Görüntü Promptu (Evrensel Format)
              </h3>
            </div>
            <button
              onClick={() => handleCopySingle('general', prompts.generalAi)}
              className="flex items-center gap-1.5 px-2.5 py-1 text-xs text-slate-300 hover:text-white border border-slate-800 rounded bg-slate-900 transition-colors"
            >
              {copiedKey === 'general' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              <span>{copiedKey === 'general' ? 'Kopyalandı' : 'Kopyala'}</span>
            </button>
          </div>
          <div className="p-3 bg-slate-950 border border-slate-900 rounded font-mono text-xs text-slate-300 leading-relaxed break-words select-all">
            {prompts.generalAi}
          </div>
        </div>
      </div>
    </div>
  );
};
