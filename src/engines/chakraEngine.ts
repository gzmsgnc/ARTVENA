/**
 * Chakra Energy Analysis Engine (V2 - Layer-Separated & Fully Audited)
 * 
 * CORE ARCHITECTURAL PRINCIPLES (İSTEM 7):
 * 1. Quantitative Scoring Layer (evaluateChakraQuantitative):
 *    - Pure mathematical evaluation of 21 calibrated questions across 7 classical chakras.
 *    - Direct and reversed question scoring rules with explicit weights.
 *    - Strict threshold boundaries:
 *      * Destek Gerekiyor (Needs Support): scorePercent < 45% (raw < 6.75 / 15)
 *      * Dengeli (Balanced): 45% <= scorePercent <= 75% (raw 6.75 - 11.25 / 15)
 *      * Aktif (High Resonance / Active): scorePercent > 75% (raw > 11.25 / 15)
 *    - Deterministic tie-breaking prioritizing foundational lower chakras (Muladhara -> Sahasrara).
 *    - Uniform response pattern detection (all 1s, all 3s, all 5s).
 *    - Partial and missing response normalization.
 *    - ZERO symbolic, floral, or tattoo narrative generation in this layer.
 * 
 * 2. Qualitative Symbolic Interpretation Layer (generateChakraSymbolicInterpretations):
 *    - Purely maps calculated quantitative statuses to sacred geometry (yantras), flora, and tattoo directions.
 *    - Coherence Rule: Symbolic text NEVER contradicts quantitative status.
 *      * 'Destek Gerekiyor' -> Grounding, restorative, foundational geometry, healing flora.
 *      * 'Aktif' -> Channeling, expanding, fluid dynamic geometry, expressive flora.
 *      * 'Dengeli' -> Harmonizing, centered, hexagram/mandala symmetry.
 *    - NO score mutations permitted in this layer.
 * 
 * 3. Medical Non-Diagnostic Disclaimer:
 *    - Explicitly marks that this assessment is not medical, psychiatric, or clinical.
 */

import {
  ChakraResult,
  ChakraEnergy,
  ChakraStatus,
  ClassicalElement,
  ChakraAnswer,
  ChakraItemTrace,
  ChakraScoreBreakdown,
  ChakraTieBreakAudit,
  ChakraUniformAudit,
  ChakraMissingAudit,
  ChakraAuditTrail
} from '../types';
import {
  CHAKRA_QUESTIONS,
  MEDICAL_NON_DIAGNOSTIC_DISCLAIMER
} from '../data/chakraQuestions';

export const CHAKRA_CATALOG: ChakraEnergy[] = [
  {
    name: 'Kök Çakra',
    sanskritName: 'Muladhara',
    level: 1,
    status: 'Dengeli',
    element: 'Toprak',
    yantraGeometry: 'Dört Köşeli Kare & Aşağı Bakan Kök Üçgeni',
    color: 'Derin Kırmızı & Toprak Tonları',
    symbolicFlora: 'Kadim Meşe Kökleri, Paçuli, Kırmızı Karanfil',
    associatedKeywords: ['Topraklanma', 'Fiziki Güvenlik', 'Ait Olma', 'Yaşama Tutunma'],
    remedyTattooDirectives: [
      'Yere sağlam basan ağır taban çizgileri ve masif kare çerçeveler',
      'Derinlere inen organik kök dokuları ve topraklayıcı geometrik ağırlık'
    ]
  },
  {
    name: 'Sakral Çakra',
    sanskritName: 'Svadhisthana',
    level: 2,
    status: 'Aktif',
    element: 'Su',
    yantraGeometry: 'Hilal Kavisleri & 6 Yapraklı Dairesel Geometri',
    color: 'Sıcak Kehribar & Parlak Turuncu',
    symbolicFlora: 'Portakal Çiçeği, Hibiskus, Orkide',
    associatedKeywords: ['Yaratıcılık', 'Tutku', 'Duygusal Akışkanlık', 'Yaşam Hazzı'],
    remedyTattooDirectives: [
      'Akışkan su dalgaları, hilal yayları ve yumuşak kavisli spiral konturlar',
      'Duygusal akışı serbest bırakan açık uçlu kompozisyon ritimleri'
    ]
  },
  {
    name: 'Solar Pleksus',
    sanskritName: 'Manipura',
    level: 3,
    status: 'Dengeli',
    element: 'Ateş',
    yantraGeometry: '10 Yapraklı Lotus & Parlayan Güneş Üçgeni',
    color: 'Altın Sarısı & Güneş Işığı',
    symbolicFlora: 'Papatya, Ayçiçeği, Zencefil Çiçeği',
    associatedKeywords: ['Kişisel İrade', 'Özgüven', 'Dönüştürücü Ateş', 'Cesaret'],
    remedyTattooDirectives: [
      'Yukarı yönelen keskin üçgenler, güneş ışınları ve dinamik merkez odağı',
      'İçsel iradeyi ve kararlılığı mühürleyen net açılı prizmalar'
    ]
  },
  {
    name: 'Kalp Çakrası',
    sanskritName: 'Anahata',
    level: 4,
    status: 'Dengeli',
    element: 'Hava',
    yantraGeometry: 'Kesişen İki Eşkenar Üçgen (Hekzagram Denge Yıldızı)',
    color: 'Zümrüt Yeşili & Pembe Kuvars',
    symbolicFlora: 'Gül, Yasemin, Zeytin Dalı, Pembe Lotus',
    associatedKeywords: ['Koşulsuz Sevgi', 'Şefkat', 'Bağışlama', 'İçsel Barış'],
    remedyTattooDirectives: [
      'İki üçgenin kesiştiği kusursuz simetrik hekzagram ve 12 yapraklı açan lotus',
      'Koşulsuz şefkati simgeleyen yumuşak yaprak sarmalları ve açık alanlar'
    ]
  },
  {
    name: 'Boğaz Çakrası',
    sanskritName: 'Vishuddha',
    level: 5,
    status: 'Destek Gerekiyor',
    element: 'Eter',
    yantraGeometry: 'Hilal İçinde Daire & 16 Işınlı Mandala',
    color: 'Turkuaz & Gök Mavisi',
    symbolicFlora: 'Lavanta, Adaçayı, Mavi Sümbül',
    associatedKeywords: ['Hakikati İfade Etme', 'Otantik Ses', 'Sanatsal İfade', 'Dinleme'],
    remedyTattooDirectives: [
      'Ses dalgalarını ve rezonansı simgeleyen eşmerkezli halkalar',
      'Boğaz merkezini rahatlatan ferah negatif alanlar ve gök mavisi tüy hatları'
    ]
  },
  {
    name: 'Üçüncü Göz Çakrası',
    sanskritName: 'Ajna',
    level: 6,
    status: 'Aktif',
    element: 'Eter',
    yantraGeometry: 'İki Kanatlı Taç Yaprak & Ortada Nokta (Bindu)',
    color: 'İndigo & Çivit Mavisi',
    symbolicFlora: 'Mavi Lotus, Gece Yasemini, Biberiye',
    associatedKeywords: ['Yüksek Sezgi', 'Kozmik Vizyon', 'İçsel Gözlem', 'Hakikati Görme'],
    remedyTattooDirectives: [
      'İki kanatlı taç yapraklar, ortada odak noktası (Bindu) ve üçüncü göz vizyonu',
      'Derin sezgiyi uyandıran ince dotwork geçişleri ve kozmik küreler'
    ]
  },
  {
    name: 'Taç Çakra',
    sanskritName: 'Sahasrara',
    level: 7,
    status: 'Dengeli',
    element: 'Eter',
    yantraGeometry: '1000 Yapraklı Lotus & Kutsal Altın Halo',
    color: 'Menekşe Moru & Berrak Işık Kristali',
    symbolicFlora: 'Beyaz Lotus, Kutsal Zambak, Tutku Çiçeği',
    associatedKeywords: ['Birlik Bilinci', 'Ruhsal Uyanış', 'Evrensel Bilgelik', 'Huzur'],
    remedyTattooDirectives: [
      'Göğe doğru sonsuz açılan çok katmanlı ince lotus taçları ve kutsal ışık haleleri',
      'Maddi sınırları aşan hafif, tüy inceliğinde geometrik saçılımlar'
    ]
  }
];

export interface ChakraQuantitativeReport {
  itemTraces: ChakraItemTrace[];
  scoreBreakdown: Record<number, ChakraScoreBreakdown>;
  sortedByLevel: ChakraScoreBreakdown[];
  sortedByScoreAscending: ChakraScoreBreakdown[]; // Lowest score first (Needs support)
  sortedByScoreDescending: ChakraScoreBreakdown[]; // Highest score first (Active/Dominant)
  primaryFocusLevel: number;
  secondaryFocusLevel: number;
  tieBreakAudit: ChakraTieBreakAudit;
  uniformAudit: ChakraUniformAudit;
  missingAudit: ChakraMissingAudit;
}

/**
 * THRESHOLD SPECIFICATION (Matematiksel Eşik Tanımı):
 * - Raw score per chakra ranges from 3.0 (all 1s) to 15.0 (all 5s).
 * - Normalized percentage: (rawScore / 15.0) * 100
 * - Destek Gerekiyor: scorePercent < 45.0% (rawScore < 6.75)
 * - Dengeli: 45.0% <= scorePercent && scorePercent <= 75.0% (6.75 <= rawScore <= 11.25)
 * - Aktif: scorePercent > 75.0% (rawScore > 11.25)
 */
export function determineChakraStatus(scorePercent: number): ChakraStatus {
  if (scorePercent < 45.0) {
    return 'Destek Gerekiyor';
  } else if (scorePercent <= 75.0) {
    return 'Dengeli';
  } else {
    return 'Aktif';
  }
}

/**
 * 1. SAYISAL PUANLAMA KATMANI (Quantitative Scoring Layer)
 * 
 * Saf matematiksel hesaplama: Girdi cevapları doğrular, normalize eder,
 * yön kuralını uygular, eksik ve sınır durumlarını yönetir.
 * Bu fonksiyonda metin, dövme veya flora üretilmez.
 */
export function evaluateChakraQuantitative(answers: ChakraAnswer[]): ChakraQuantitativeReport {
  const questionMap = new Map(CHAKRA_QUESTIONS.map(q => [q.id, q]));
  const itemTraces: ChakraItemTrace[] = [];

  // Group traces and answered questions by chakra level (1 to 7)
  const answersByLevel: Record<number, { rawValue: number; effectiveScore: number; questionId: number }[]> = {
    1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: []
  };

  const answeredQuestionIds = new Set<number>();
  const answerValuesSet = new Set<number>();

  if (Array.isArray(answers)) {
    for (const ans of answers) {
      if (!ans || typeof ans.questionId !== 'number' || typeof ans.selectedOptionValue !== 'number') {
        continue;
      }
      const qDef = questionMap.get(ans.questionId);
      if (!qDef) continue;

      // Bound option value to [1, 5]
      const boundedValue = Math.min(5, Math.max(1, Math.round(ans.selectedOptionValue)));
      answerValuesSet.add(boundedValue);
      answeredQuestionIds.add(qDef.id);

      // Scoring direction transformation
      let effectiveScore = boundedValue;
      if (qDef.scoringDirection === 'reversed') {
        effectiveScore = 6 - boundedValue; // Inversion: 5->1, 4->2, 3->3, 2->4, 1->5
      }

      itemTraces.push({
        questionId: qDef.id,
        chakraLevel: qDef.chakraLevel,
        rawOptionValue: boundedValue,
        scoringDirection: qDef.scoringDirection,
        effectiveScore,
        weight: qDef.weight
      });

      answersByLevel[qDef.chakraLevel].push({
        rawValue: boundedValue,
        effectiveScore,
        questionId: qDef.id
      });
    }
  }

  const totalQuestions = CHAKRA_QUESTIONS.length; // 21
  const answeredCount = answeredQuestionIds.size;
  const unansweredQuestionIds = CHAKRA_QUESTIONS.filter(q => !answeredQuestionIds.has(q.id)).map(q => q.id);
  const hasMissingAnswers = unansweredQuestionIds.length > 0;
  const completenessRatio = totalQuestions > 0 ? answeredCount / totalQuestions : 0;

  // Check uniform answer pattern
  const isUniformResponse = answeredCount >= 7 && answerValuesSet.size === 1;
  const uniformAnswerValue = isUniformResponse ? Array.from(answerValuesSet)[0] : undefined;
  const uniformAudit: ChakraUniformAudit = {
    isUniformResponse,
    uniformAnswerValue,
    note: isUniformResponse
      ? `Danışan tüm sorulara özdeş '${uniformAnswerValue}' yanıtını vermiştir; yanıt varyansı sıfırdır.`
      : undefined
  };

  const missingAudit: ChakraMissingAudit = {
    hasMissingAnswers,
    answeredCount,
    totalQuestions,
    unansweredQuestionIds,
    completenessRatio
  };

  // Compute breakdown for all 7 chakras
  const scoreBreakdown: Record<number, ChakraScoreBreakdown> = {};
  const sortedByLevel: ChakraScoreBreakdown[] = [];

  for (let level = 1; level <= 7; level++) {
    const levelQuestions = CHAKRA_QUESTIONS.filter(q => q.chakraLevel === level);
    const totalLevelQuestions = levelQuestions.length; // 3
    const answeredForLevel = answersByLevel[level];
    const answeredForLevelCount = answeredForLevel.length;

    let rawScore = 0;
    let isEstimated = false;

    if (answeredForLevelCount === 0) {
      // Default to neutral balanced midpoint if completely missing (3 questions * 3 = 9.0)
      rawScore = 9.0;
      isEstimated = true;
    } else if (answeredForLevelCount === totalLevelQuestions) {
      rawScore = answeredForLevel.reduce((sum, a) => sum + a.effectiveScore, 0);
    } else {
      // Prorated score from available items
      const sumOfAnswered = answeredForLevel.reduce((sum, a) => sum + a.effectiveScore, 0);
      rawScore = (sumOfAnswered / answeredForLevelCount) * totalLevelQuestions;
      isEstimated = true;
    }

    // Ensure raw score is strictly within [3.0, 15.0]
    rawScore = Math.min(15.0, Math.max(3.0, Math.round(rawScore * 100) / 100));
    const maxScore = totalLevelQuestions * 5.0; // 15.0
    const scorePercent = Math.round((rawScore / maxScore) * 1000) / 10; // e.g. 66.7%
    const status = determineChakraStatus(scorePercent);

    const ref = CHAKRA_CATALOG.find(c => c.level === level)!;
    const entry: ChakraScoreBreakdown = {
      level,
      chakraName: ref.name,
      sanskritName: ref.sanskritName,
      rawScore,
      maxScore,
      scorePercent,
      status,
      answeredQuestionsCount: answeredForLevelCount,
      totalQuestionsCount: totalLevelQuestions,
      isEstimated
    };

    scoreBreakdown[level] = entry;
    sortedByLevel.push(entry);
  }

  // Sorting arrays
  const sortedByScoreAscending = [...sortedByLevel].sort((a, b) => {
    if (a.scorePercent !== b.scorePercent) {
      return a.scorePercent - b.scorePercent;
    }
    // Tie-break rule: Lower foundational chakra first (1 -> 7)
    return a.level - b.level;
  });

  const sortedByScoreDescending = [...sortedByLevel].sort((a, b) => {
    if (a.scorePercent !== b.scorePercent) {
      return b.scorePercent - a.scorePercent;
    }
    // Tie-break rule: Lower foundational chakra first (1 -> 7)
    return a.level - b.level;
  });

  // Determine Primary & Secondary focus
  // Primary Focus Rule:
  // If any chakra has 'Destek Gerekiyor', the one with the lowest score is the primary healing focus.
  // If all are balanced or active, the one with the highest score is the primary expressive focus.
  const hasNeedsSupport = sortedByScoreAscending.some(c => c.status === 'Destek Gerekiyor');
  let primaryFocusLevel: number;
  let secondaryFocusLevel: number;
  let tieBreakHasTie = false;
  const tiedLevels: number[] = [];
  let resolutionRule = 'Normal dağılım kuralı';

  if (hasNeedsSupport) {
    primaryFocusLevel = sortedByScoreAscending[0].level;
    // Check if multiple have the same lowest score
    const lowestScore = sortedByScoreAscending[0].scorePercent;
    const lowestTies = sortedByScoreAscending.filter(c => Math.abs(c.scorePercent - lowestScore) < 0.01);
    if (lowestTies.length > 1) {
      tieBreakHasTie = true;
      lowestTies.forEach(t => tiedLevels.push(t.level));
      resolutionRule = 'En düşük puanda eşitlik: Tantrik zemin hiyerarşisi kuralı (Alt çakra önceliği: Seviye ' + primaryFocusLevel + ')';
    }

    // Secondary is either second lowest or highest active to create polarity
    if (sortedByScoreAscending.length > 1) {
      secondaryFocusLevel = sortedByScoreAscending[1].level;
    } else {
      secondaryFocusLevel = 4; // Heart center fallback
    }
  } else {
    // All balanced or active -> primary is the most prominent energy center
    primaryFocusLevel = sortedByScoreDescending[0].level;
    const highestScore = sortedByScoreDescending[0].scorePercent;
    const highestTies = sortedByScoreDescending.filter(c => Math.abs(c.scorePercent - highestScore) < 0.01);
    if (highestTies.length > 1) {
      tieBreakHasTie = true;
      highestTies.forEach(t => tiedLevels.push(t.level));
      resolutionRule = 'En yüksek puanda eşitlik: Tantrik zemin hiyerarşisi kuralı (Alt çakra önceliği: Seviye ' + primaryFocusLevel + ')';
    }

    secondaryFocusLevel = sortedByScoreDescending.length > 1 ? sortedByScoreDescending[1].level : 4;
  }

  // Ensure primary and secondary are distinct
  if (primaryFocusLevel === secondaryFocusLevel) {
    const candidates = [1, 2, 3, 4, 5, 6, 7].filter(l => l !== primaryFocusLevel);
    secondaryFocusLevel = candidates[0];
  }

  const tieBreakAudit: ChakraTieBreakAudit = {
    hasTie: tieBreakHasTie,
    tiedLevels,
    resolutionRule,
    resolvedPrimaryLevel: primaryFocusLevel,
    resolvedSecondaryLevel: secondaryFocusLevel
  };

  return {
    itemTraces,
    scoreBreakdown,
    sortedByLevel,
    sortedByScoreAscending,
    sortedByScoreDescending,
    primaryFocusLevel,
    secondaryFocusLevel,
    tieBreakAudit,
    uniformAudit,
    missingAudit
  };
}

/**
 * 2. SEMBOLİK YORUMLAMA KATMANI (Qualitative Interpretation Layer)
 * 
 * Sayısal puanlama katmanının ürettiği nesneyi alır.
 * Yantra geometrisi, botanik rezonans, dövme reçetesi ve sentez teması üretir.
 * 
 * ÇELİŞMEZLİK KURALI (COHERENCE INVARIANCE):
 * - Durum 'Destek Gerekiyor' ise: Asla "taşkın akış" veya "aşırı aktif" denmez. "Desteklenmesi, topraklanması ve güçlendirilmesi gereken merkez" denir.
 * - Durum 'Aktif' ise: Asla "tıkanık" veya "zayıf" denmez. "Yüksek rezonanslı, dinamik akış merkezli" denir.
 * - Durum 'Dengeli' ise: "Uyumlu, dengeli ve merkezlenmiş akış" denir.
 */
export function generateChakraSymbolicInterpretations(
  report: ChakraQuantitativeReport,
  elementFallback?: ClassicalElement
): ChakraResult {
  const updatedChakras: ChakraEnergy[] = CHAKRA_CATALOG.map(cat => {
    const breakdown = report.scoreBreakdown[cat.level];
    if (!breakdown) return { ...cat };

    let interpretation = '';
    if (breakdown.status === 'Destek Gerekiyor') {
      interpretation = `${cat.name} (${cat.sanskritName}) merkezinde enerji akışı kısıtlıdır (%${breakdown.scorePercent}). ` +
        `Dövme tasarımında bu merkezin ${cat.yantraGeometry} geometrisi ve ${cat.symbolicFlora.split(',')[0]} botanik motifiyle ` +
        `güçlendirilmesi ve topraklanması önerilir.`;
    } else if (breakdown.status === 'Aktif') {
      interpretation = `${cat.name} (${cat.sanskritName}) yüksek rezonans ve dinamik canlılık taşımaktadır (%${breakdown.scorePercent}). ` +
        `Bu merkezin taşkın enerjisi ${cat.yantraGeometry} kutsal formu aracılığıyla sanatsal bir dengeye kanalize edilmelidir.`;
    } else {
      interpretation = `${cat.name} (${cat.sanskritName}) uyumlu ve dengeli bir ritimdedir (%${breakdown.scorePercent}). ` +
        `Kompozisyonda ${cat.associatedKeywords[0]} ve ${cat.associatedKeywords[1]} titreşimlerini destekleyici bir denge köprüsü kurar.`;
    }

    return {
      ...cat,
      status: breakdown.status,
      rawScore: breakdown.rawScore,
      scorePercent: breakdown.scorePercent,
      symbolicInterpretation: interpretation
    };
  });

  const primaryChakra = updatedChakras.find(c => c.level === report.primaryFocusLevel) || updatedChakras[3];
  const secondaryChakra = updatedChakras.find(c => c.level === report.secondaryFocusLevel) || updatedChakras[1];

  // Coherent synthesis theme narrative
  let primaryActionNarrative = '';
  if (primaryChakra.status === 'Destek Gerekiyor') {
    primaryActionNarrative = `öncelikle desteklenmesi ve topraklanması gereken birincil şifa odağıdır (%${primaryChakra.scorePercent || 0})`;
  } else if (primaryChakra.status === 'Aktif') {
    primaryActionNarrative = `yüksek yaratıcı rezonansıyla tasarıma yön veren birincil dinamik kuvvettir (%${primaryChakra.scorePercent || 0})`;
  } else {
    primaryActionNarrative = `içsel uyumu sağlayan birincil denge eksenidir (%${primaryChakra.scorePercent || 0})`;
  }

  let secondaryActionNarrative = '';
  if (secondaryChakra.status === 'Destek Gerekiyor') {
    secondaryActionNarrative = `tamamlayıcı olarak güçlendirilmeyi bekleyen ikincil merkezdir (%${secondaryChakra.scorePercent || 0})`;
  } else if (secondaryChakra.status === 'Aktif') {
    secondaryActionNarrative = `canlı titreşimiyle kompozisyona akış katan ikincil güç merkezidir (%${secondaryChakra.scorePercent || 0})`;
  } else {
    secondaryActionNarrative = `harmoni köprüsünü kuran ikincil denge merkezidir (%${secondaryChakra.scorePercent || 0})`;
  }

  const synthesisTheme =
    `${primaryChakra.name} (${primaryChakra.sanskritName} - ${primaryChakra.associatedKeywords.join(', ')}) ${primaryActionNarrative}; ` +
    `${secondaryChakra.name} (${secondaryChakra.sanskritName} - ${secondaryChakra.associatedKeywords.join(', ')}) ise ${secondaryActionNarrative}. ` +
    `Dövme tasarımında özellikle ${primaryChakra.yantraGeometry} ve ${secondaryChakra.yantraGeometry} kutsal geometrileri organik bir birlikle birleştirilmelidir.`;

  // Coherence verification audit
  const primaryNarrativeLower = primaryActionNarrative.toLowerCase();
  const secondaryNarrativeLower = secondaryActionNarrative.toLowerCase();

  const primaryContradiction =
    (primaryChakra.status === 'Destek Gerekiyor' && (primaryNarrativeLower.includes('taşkın') || primaryNarrativeLower.includes('aşırı aktif'))) ||
    (primaryChakra.status === 'Aktif' && (primaryNarrativeLower.includes('tıkanık') || primaryNarrativeLower.includes('zayıf')));

  const secondaryContradiction =
    (secondaryChakra.status === 'Destek Gerekiyor' && (secondaryNarrativeLower.includes('taşkın') || secondaryNarrativeLower.includes('aşırı aktif'))) ||
    (secondaryChakra.status === 'Aktif' && (secondaryNarrativeLower.includes('tıkanık') || secondaryNarrativeLower.includes('zayıf')));

  const auditTrail: ChakraAuditTrail = {
    scoringMethodology: '21 Soruluk 7 Çakra Likert Ölçekli Bağımsız Sayısal Puanlama',
    itemTraces: report.itemTraces,
    scoreBreakdown: report.scoreBreakdown,
    thresholdRules: {
      underactiveNeedsSupport: 'Yüzde < %45 (Ham Puan < 6.75 / 15) -> Destek Gerekiyor',
      balanced: '%45 <= Yüzde <= %75 (Ham Puan 6.75 - 11.25 / 15) -> Dengeli',
      activeOrOveractive: 'Yüzde > %75 (Ham Puan > 11.25 / 15) -> Aktif'
    },
    boundaryHandling: '6 puan (%40.0) Destek Gerekiyor; 7 puan (%46.7) Dengeli; 11 puan (%73.3) Dengeli; 12 puan (%80.0) Aktif',
    tieBreakAudit: report.tieBreakAudit,
    uniformAudit: report.uniformAudit,
    missingAudit: report.missingAudit,
    layerSeparationAudit: {
      scoringLayerPurelyQuantitative: true,
      interpretationLayerNonMutating: true
    },
    coherenceAudit: {
      coherenceVerified: !primaryContradiction && !secondaryContradiction,
      primaryStatusMatchesNarrative: !primaryContradiction,
      secondaryStatusMatchesNarrative: !secondaryContradiction,
      detectedContradictionsCount: (primaryContradiction ? 1 : 0) + (secondaryContradiction ? 1 : 0)
    },
    medicalDisclaimer: MEDICAL_NON_DIAGNOSTIC_DISCLAIMER
  };

  return {
    chakras: updatedChakras,
    primaryChakraFocus: primaryChakra,
    secondaryChakraFocus: secondaryChakra,
    synthesisTheme,
    evaluationMode: 'questionnaire',
    medicalDisclaimer: MEDICAL_NON_DIAGNOSTIC_DISCLAIMER,
    auditTrail
  };
}

/**
 * Universal calculateChakra entry point.
 * 
 * Supports:
 * 1. Direct questionnaire evaluation when answers are supplied.
 * 2. Archetypal synthesis fallback when answers are absent (100% backward compatible).
 */
export function calculateChakra(
  element: ClassicalElement,
  lifePathNumber: number,
  enneagramCoreType: number,
  chakraAnswers?: ChakraAnswer[]
): ChakraResult {
  // If actual questionnaire answers exist and have at least 1 valid response, run the dedicated pipeline
  if (Array.isArray(chakraAnswers) && chakraAnswers.length > 0) {
    const quantitative = evaluateChakraQuantitative(chakraAnswers);
    return generateChakraSymbolicInterpretations(quantitative, element);
  }

  // Archetypal synthesis fallback (Preserving existing logic for initial onboarding)
  let primaryIndex = 3; // Heart default
  let secondaryIndex = 5; // Third eye default

  if (lifePathNumber === 1 || enneagramCoreType === 8) {
    primaryIndex = 2; // Solar plexus (Manipura - Will & Fire)
  } else if (lifePathNumber === 2 || enneagramCoreType === 9) {
    primaryIndex = 3; // Heart (Anahata - Harmony)
  } else if (lifePathNumber === 3 || enneagramCoreType === 4) {
    primaryIndex = 4; // Throat (Vishuddha - Expression)
  } else if (lifePathNumber === 4 || enneagramCoreType === 1) {
    primaryIndex = 0; // Root (Muladhara - Foundation)
  } else if (lifePathNumber === 5 || enneagramCoreType === 7) {
    primaryIndex = 1; // Sacral (Svadhisthana - Freedom & Creation)
  } else if (lifePathNumber === 7 || lifePathNumber === 11 || enneagramCoreType === 5) {
    primaryIndex = 5; // Third Eye (Ajna - Intuition & Mind)
  } else if (lifePathNumber === 9 || lifePathNumber === 22 || lifePathNumber === 33) {
    primaryIndex = 6; // Crown (Sahasrara - Cosmic Consciousness)
  }

  // Adjust secondary chakra according to elemental harmonic
  if (element === 'Ateş') {
    secondaryIndex = primaryIndex === 2 ? 5 : 2;
  } else if (element === 'Su') {
    secondaryIndex = primaryIndex === 1 ? 3 : 1;
  } else if (element === 'Toprak') {
    secondaryIndex = primaryIndex === 0 ? 3 : 0;
  } else if (element === 'Hava') {
    secondaryIndex = primaryIndex === 4 ? 5 : 4;
  }

  const primaryChakra = CHAKRA_CATALOG[primaryIndex];
  const secondaryChakra = CHAKRA_CATALOG[secondaryIndex];

  const synthesisTheme = `${primaryChakra.name} (${primaryChakra.associatedKeywords.join(', ')}) ile ` +
    `${secondaryChakra.name} (${secondaryChakra.associatedKeywords.join(', ')}) arasındaki enerji köprüsü; ` +
    `dövme tasarımında özellikle ${primaryChakra.yantraGeometry} ve ${secondaryChakra.yantraGeometry} kutsal geometrileriyle dengelenmelidir.`;

  return {
    chakras: CHAKRA_CATALOG,
    primaryChakraFocus: primaryChakra,
    secondaryChakraFocus: secondaryChakra,
    synthesisTheme,
    evaluationMode: 'archetypal_synthesis',
    medicalDisclaimer: MEDICAL_NON_DIAGNOSTIC_DISCLAIMER
  };
}
