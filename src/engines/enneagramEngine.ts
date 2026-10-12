/**
 * Enneagram Calculation Engine
 * Accurately analyzes 27 questions across Types 1-9, calculates core type, wing,
 * growth (integration), and stress (disintegration) lines, along with symbolic tattoo directions.
 */

import {
  EnneagramAnswer,
  EnneagramResult,
  EnneagramEvaluationStatus,
  EnneagramRankingEntry,
  EnneagramTieBreakAudit,
  EnneagramWingTieBreakAudit
} from '../types';
import { ENNEAGRAM_QUESTIONS } from '../data/enneagramQuestions';

interface TypeMeta {
  name: string;
  motivation: string;
  fear: string;
  growth: number;
  stress: number;
  strengths: string[];
  shadows: string[];
  tattooDirections: string[];
}

const TYPE_METADATA: Record<number, TypeMeta> = {
  1: {
    name: 'Mükemmeliyetçi & Reformer',
    motivation: 'Doğru, adil, ahlaklı olmak ve bozulmuş olanı ıslah etmek.',
    fear: 'Kusurlu, yozlaşmış, adaletsiz veya ahlaken suçlu olmak.',
    growth: 7,
    stress: 4,
    strengths: ['Sarsılmaz dürüstlük', 'Yüksek adalet duygusu', 'İlham verici disiplin'],
    shadows: ['Katı eleştirellik', 'Bastırılmış öfke', 'Bağışlama güçlüğü'],
    tattooDirections: ['Geometrik kusursuzluk', 'Düz teraziler ve adalet kılıçları', 'Akışkan altın oran hatları']
  },
  2: {
    name: 'Fedakar & Yardımsever',
    motivation: 'Koşulsuz sevilmek, değer görmek ve başkalarının hayatında vazgeçilmez bir şifa olmak.',
    fear: 'İstenmeyen, değersiz, yalnız veya sevilmeye layık bulunmamak.',
    growth: 4,
    stress: 8,
    strengths: ['Empatik şefkat', 'Sıcak kapsayıcılık', 'Sezgisel cömertlik'],
    shadows: ['Kendi ihtiyaçlarını inkar', 'Alıngan manipülasyon', 'Bağımlılık yaratma'],
    tattooDirections: ['Saran botanik sarmaşıklar', 'Açık eller ve kutsal kalp motifleri', 'Koruyucu kanat örtüleri']
  },
  3: {
    name: 'Başarılı Stratejist & İlham Verici',
    motivation: 'Üretmek, yetkinliğini kanıtlamak ve parlayan sonuçlarla ilham kaynağı olmak.',
    fear: 'Başarısız, değersiz, yetersiz veya sıradan görünmek.',
    growth: 6,
    stress: 9,
    strengths: ['Hedefe kilitlenme', 'Dinamik üretkenlik', 'Motive edici karizma'],
    shadows: ['Duyguları bastırma', 'İmaj kaygısı', 'Aşırı işkoliklik'],
    tattooDirections: ['Yükselen oklar ve zirve sembolleri', 'Pusula ve yıldız kılavuzları', 'Güneş taçları']
  },
  4: {
    name: 'Özgün Sanatçı & Bireyci',
    motivation: 'Kendi derinliğini, otantik ruhunu ve benzersiz estetiğini dünyaya yansıtmak.',
    fear: 'Sıradanlaşmak, özünü kaybetmek veya içsel bir kusura sahip olmak.',
    growth: 1,
    stress: 2,
    strengths: ['Derin sezgisellik', 'Eşsiz estetik vizyon', 'Duygusal dürüstlük'],
    shadows: ['Melankoliye saplanma', 'Eksiklik hissi', 'Ulaşılamayana hasret'],
    tattooDirections: ['Simyasal dönüşüm sembolleri', 'Gece açan çiçekler', 'Hilal ve karanlık-aydınlık kontrastı']
  },
  5: {
    name: 'Gözlemci & Bilge Araştırmacı',
    motivation: 'Evrenin mekanizmasını kavramak, zihinsel bağımsızlığını ve enerjisini korumak.',
    fear: 'Tükenmek, işgal edilmek, bilgisiz veya yetersiz kalmak.',
    growth: 8,
    stress: 7,
    strengths: ['Derin odaklanma', 'Nesnel analitik zeka', 'Sessiz dirayet'],
    shadows: ['Duygusal yabancılaşma', 'Aşırı inziva', 'Mizantropi eğilimi'],
    tattooDirections: ['Labirent çözümleri', 'Kozmik takımyıldız ızgaraları', 'Baykuş ve geometrik prizmalar']
  },
  6: {
    name: 'Sadık Muhafız & Tedbirli Sorgulayıcı',
    motivation: 'Güvenli, istikrarlı bir zemin kurmak ve güvenilir bağlara sadık kalmak.',
    fear: 'Desteksiz kalmak, ihanete uğramak, güvensizlik ve kaos.',
    growth: 9,
    stress: 3,
    strengths: ['Sarsılmaz vefa', 'Krize hazırlıklı öngörü', 'Cesur koruma içgüdüsü'],
    shadows: ['Kronik evham ve şüphe', 'Otorite çatışması', 'Karar felci'],
    tattooDirections: ['Koruyucu kalkan ve mühürler', 'Derin ağaç kökleri', 'Fener ve rehber ışıklar']
  },
  7: {
    name: 'Maceracı Vizyoner & İyimser Kaşif',
    motivation: 'Hayatın sonsuz olanaklarını tatmak, özgür olmak ve neşeyle üretmek.',
    fear: 'Acıya hapsolmak, kısıtlanmak, mahrum kalmak ve can sıkıntısı.',
    growth: 5,
    stress: 1,
    strengths: ['Yaratıcı kıvılcım', 'Hızlı sentez gücü', 'Bulaşıcı yaşama sevinci'],
    shadows: ['Acıdan ve sorumluluktan kaçış', 'Maymun iştahlılık', 'Yüzeyselleşme'],
    tattooDirections: ['Kozmik rüzgar spiralleri', 'Özgür kuş kanatları', 'Yıldız patlamaları ve dinamik akış']
  },
  8: {
    name: 'Güçlü Meydan Okuyucu & Koruyucu Önder',
    motivation: 'Kendi gücüne sahip çıkmak, adaletsizliğe dur demek ve sevdiklerini korumak.',
    fear: 'Zayıf düşmek, başkalarının kontrolüne girmek, ezilmek ve kırılmak.',
    growth: 2,
    stress: 5,
    strengths: ['Korkusuz cesaret', 'Doğal liderlik', 'Korumacı asalet'],
    shadows: ['Öfke patlamaları', 'Hükmetme arzusu', 'Kırılganlığı kabul edememe'],
    tattooDirections: ['Yırtıcı kudret hatları', 'Aslan ve kurt profilleri', 'Zırh ve kalkan geometrileri']
  },
  9: {
    name: 'Barışçıl Dengeleyici & Kapsayıcı Ruh',
    motivation: 'İç huzurunu muhafaza etmek, çatışmayı çözmek ve evrensel ahengi yaşamak.',
    fear: 'Ayrışmak, dışlanmak, çatışmanın parçalaması ve huzurun yok olması.',
    growth: 3,
    stress: 6,
    strengths: ['Kapsayıcı dinginlik', 'Arabulucu bilgelik', 'Koşulsuz kabul'],
    shadows: ['Pasif direnç ve atalet', 'Kendi sesini unutma', 'Uyuşma eğilimi'],
    tattooDirections: ['Sonsuzluk döngüleri', 'Dingin su dalgaları', 'Kutsal lotus ve dengeli mandalalar']
  }
};

const TOTAL_QUESTION_COUNT = ENNEAGRAM_QUESTIONS.length;

export function calculateEnneagram(answers: EnneagramAnswer[], clientId?: string): EnneagramResult {
  // 1. Sıfırdan temiz puan tabloları ve boyut kırılımları
  const scores: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };
  const dimensionScores: Record<number, { motivation: number; stress: number; shadow: number }> = {};
  const highIntensityCounts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0 };

  for (let t = 1; t <= 9; t++) {
    dimensionScores[t] = { motivation: 0, stress: 0, shadow: 0 };
  }

  // Soru tanımları haritası
  const questionDefMap = new Map(ENNEAGRAM_QUESTIONS.map(q => [q.id, q]));

  // 2. Girdilerin Doğrulanması ve Arıtılması (Input Sanitization)
  const answerMap = new Map<number, number>();
  const invalidQuestionIds: number[] = [];

  if (Array.isArray(answers)) {
    for (const ans of answers) {
      if (!ans || typeof ans.questionId !== 'number' || typeof ans.score !== 'number') {
        continue;
      }
      const qDef = questionDefMap.get(ans.questionId);
      if (!qDef) {
        invalidQuestionIds.push(ans.questionId);
        continue;
      }
      // Likert ölçeği 1 ile 5 arasında tamsayı olmalıdır
      if (ans.score < 1 || ans.score > 5 || !Number.isInteger(ans.score)) {
        invalidQuestionIds.push(ans.questionId);
        continue;
      }
      answerMap.set(ans.questionId, ans.score);
    }
  }

  const validAnswerCount = answerMap.size;
  const unansweredQuestions: number[] = [];
  for (const q of ENNEAGRAM_QUESTIONS) {
    if (!answerMap.has(q.id)) {
      unansweredQuestions.push(q.id);
    }
  }

  // 3. Eksik ve Geçersiz Cevaplarda Tanımlı Davranış (Sessizce Tip 1 atamama garantisi)
  if (validAnswerCount === 0) {
    const defaultMeta = TYPE_METADATA[4]; // Örnek fallback
    const emptyStatus: EnneagramEvaluationStatus = {
      status: answers.length > 0 && invalidQuestionIds.length > 0 ? 'invalid' : 'empty',
      isEvaluated: false,
      validAnswerCount: 0,
      totalQuestions: TOTAL_QUESTION_COUNT,
      unansweredQuestions,
      invalidQuestions: invalidQuestionIds,
      validationMessage: answers.length > 0
        ? 'Girilen Enneagram yanıtlarının tümü geçersiz soru ID veya skor değerleri (1-5 dışı) içeriyor.'
        : 'Enneagram testi için henüz yanıt girilmemiştir.'
    };

    const emptyRanking: EnneagramRankingEntry[] = Array.from({ length: 9 }, (_, i) => i + 1).map((t, idx) => ({
      rank: idx + 1,
      type: t,
      typeName: TYPE_METADATA[t].name,
      score: 0,
      percentage: 0,
      dimensionScores: { motivation: 0, stress: 0, shadow: 0 },
      matchRationale: 'Değerlendirilmedi (Yanıt bulunmuyor)'
    }));

    return {
      coreType: 4,
      typeName: defaultMeta.name,
      wing: '4w5',
      wingName: `${defaultMeta.name} (5 Kanadı ile - Gözlemci)`,
      typeScores: scores,
      coreMotivation: defaultMeta.motivation,
      coreFear: defaultMeta.fear,
      growthDirection: defaultMeta.growth,
      stressDirection: defaultMeta.stress,
      shadowTraits: defaultMeta.shadows,
      strengths: defaultMeta.strengths,
      tattooSymbolicDirections: defaultMeta.tattooDirections,
      evaluation: emptyStatus,
      ranking: emptyRanking,
      clientId,
      calculatedAt: new Date().toISOString(),
      methodology: 'Riso-Hudson Enneagram Modeli (27 Eksenli Likert Kendini Bildirim Envanteri)',
      disclaimer: 'Bu değerlendirme klinik/psikiyatrik bir tanı veya kişilik patolojisi ölçümü DEĞİLDİR. Dövme tasarımı bağlamında sembolik arketip eğilimlerini ve estetik yönelimleri belirlemek amacıyla hazırlanmıştır.',
      methodLimitations: 'Kendini bildirim (self-report) yöntemi bireyin güncel farkındalığına ve öznel beyanına dayanır; klinik kişilik testlerinin yerini tutmaz.'
    };
  }

  // 4. Puanların ve Boyut Kırılımlarının Hesaplanması
  let totalDistributedPoints = 0;
  for (const [qid, score] of answerMap.entries()) {
    const qDef = questionDefMap.get(qid)!;
    scores[qDef.typeTarget] += score;
    totalDistributedPoints += score;

    if (score === 5) {
      highIntensityCounts[qDef.typeTarget] += 1;
    }

    if (qDef.dimension === 'Temel Motivasyon') {
      dimensionScores[qDef.typeTarget].motivation += score;
    } else if (qDef.dimension === 'Stres & Savunma') {
      dimensionScores[qDef.typeTarget].stress += score;
    } else if (qDef.dimension === 'Gölge & İlişki Dinamiği') {
      dimensionScores[qDef.typeTarget].shadow += score;
    }
  }

  // 5. Tiplerin Puan Sıralaması
  const sortedTypes = Object.entries(scores)
    .map(([tStr, sc]) => ({ type: parseInt(tStr, 10), score: sc }))
    .sort((a, b) => b.score - a.score);

  // 6. Eşitlik (Tie-Break) Çözümü ve Denetimi
  const maxScore = sortedTypes[0].score;
  const tiedForFirst = sortedTypes.filter(item => item.score === maxScore).map(item => item.type);

  let coreType = tiedForFirst[0];
  let tieBreakAudit: EnneagramTieBreakAudit | undefined = undefined;

  if (tiedForFirst.length > 1) {
    // Eşitlik Çözüm Stratejisi:
    // Aşama 1: Temel Motivasyon Boyut Puanı Karşılaştırması
    let bestMotivationScore = -1;
    let topMotivationType: number | null = null;
    let motivationTied = false;

    for (const t of tiedForFirst) {
      const motScore = dimensionScores[t].motivation;
      if (motScore > bestMotivationScore) {
        bestMotivationScore = motScore;
        topMotivationType = t;
        motivationTied = false;
      } else if (motScore === bestMotivationScore) {
        motivationTied = true;
      }
    }

    if (topMotivationType && !motivationTied) {
      coreType = topMotivationType;
      tieBreakAudit = {
        tiedTypeNumbers: tiedForFirst,
        resolvedCoreType: coreType,
        method: 'motivation_dimension_break',
        reason: `Eşit puan alan tipler (${tiedForFirst.join(', ')}) arasında Tip ${coreType}, 'Temel Motivasyon' sorusundaki ${bestMotivationScore} puanlık üstünlük ile birincil seçildi.`
      };
    } else {
      // Aşama 2: 5 Puanlık Yüksek Yoğunluklu Yanıt Sayısı (High-Intensity Count)
      let best5Count = -1;
      let top5Type: number | null = null;
      let count5Tied = false;

      for (const t of tiedForFirst) {
        const c5 = highIntensityCounts[t];
        if (c5 > best5Count) {
          best5Count = c5;
          top5Type = t;
          count5Tied = false;
        } else if (c5 === best5Count) {
          count5Tied = true;
        }
      }

      if (top5Type && !count5Tied) {
        coreType = top5Type;
        tieBreakAudit = {
          tiedTypeNumbers: tiedForFirst,
          resolvedCoreType: coreType,
          method: 'high_intensity_count',
          reason: `Temel motivasyon puanları eşitti; Tip ${coreType}, ${best5Count} adet 5 tam puanlık yanıt yoğunluğu ile eşitliği bozdu.`
        };
      } else {
        // Aşama 3: Deterministik Kanonik Sıralama
        coreType = tiedForFirst[0];
        tieBreakAudit = {
          tiedTypeNumbers: tiedForFirst,
          resolvedCoreType: coreType,
          method: 'canonical_invariant',
          reason: `Tüm alt boyutlar eşitti; sistem kanonik sıra gereğince ilk sırada yer alan Tip ${coreType}'i deterministik olarak seçti.`
        };
      }
    }
  }

  // 7. Kanat (Wing) Belirleme ve Kanat Eşitlik Çözümü
  // Kural: Yalnızca ana tipe bitişik komşu tipler (çembersel 1-9 bağlantısı)
  const leftWing = coreType === 1 ? 9 : coreType - 1;
  const rightWing = coreType === 9 ? 1 : coreType + 1;

  let wingType: number;
  let wingTieBreakAudit: EnneagramWingTieBreakAudit | undefined = undefined;

  if (scores[leftWing] > scores[rightWing]) {
    wingType = leftWing;
  } else if (scores[rightWing] > scores[leftWing]) {
    wingType = rightWing;
  } else {
    // Kanatlar Eşit Puanda: Temel motivasyon boyutunu kıyasla
    const leftMot = dimensionScores[leftWing].motivation;
    const rightMot = dimensionScores[rightWing].motivation;

    if (leftMot > rightMot) {
      wingType = leftWing;
      wingTieBreakAudit = {
        candidateWings: [leftWing, rightWing],
        resolvedWing: leftWing,
        reason: `Sol kanat (Tip ${leftWing}) ve sağ kanat (Tip ${rightWing}) eşit puan aldı; Tip ${leftWing} temel motivasyon puanı (${leftMot}) ile kanat seçildi.`
      };
    } else if (rightMot > leftMot) {
      wingType = rightWing;
      wingTieBreakAudit = {
        candidateWings: [leftWing, rightWing],
        resolvedWing: rightWing,
        reason: `Sol kanat (Tip ${leftWing}) ve sağ kanat (Tip ${rightWing}) eşit puan aldı; Tip ${rightWing} temel motivasyon puanı (${rightMot}) ile kanat seçildi.`
      };
    } else {
      // Deterministik sol kanat seçimi
      wingType = leftWing;
      wingTieBreakAudit = {
        candidateWings: [leftWing, rightWing],
        resolvedWing: leftWing,
        reason: `Her iki komşu kanat da (${leftWing} ve ${rightWing}) eşit puanda; kanonik sol kanat kuralı ile Tip ${leftWing} atandı.`
      };
    }
  }

  const wing = `${coreType}w${wingType}`;
  const coreMeta = TYPE_METADATA[coreType];
  const wingMeta = TYPE_METADATA[wingType];

  // 8. Tüm 9 Tipin Denetlenebilir Sıralama Listesi (Ranking)
  const ranking: EnneagramRankingEntry[] = sortedTypes.map((item, idx) => {
    const meta = TYPE_METADATA[item.type];
    const pct = totalDistributedPoints > 0 ? Math.round((item.score / totalDistributedPoints) * 100) : 0;
    let rationale = `${item.score} puan (%${pct})`;
    if (item.type === coreType) rationale += ' [BİRİNCİL ANA TİP]';
    else if (item.type === wingType) rationale += ` [${coreType} TİPİ KANADI]`;
    else if (item.type === coreMeta.growth) rationale += ' [BÜYÜME / ENTEGRASYON HATTI]';
    else if (item.type === coreMeta.stress) rationale += ' [STRES / DEZENTEGRASYON HATTI]';

    return {
      rank: idx + 1,
      type: item.type,
      typeName: meta.name,
      score: item.score,
      percentage: pct,
      dimensionScores: dimensionScores[item.type],
      matchRationale: rationale
    };
  });

  // 9. Değerlendirme Durumu
  const evaluation: EnneagramEvaluationStatus = {
    status: validAnswerCount === TOTAL_QUESTION_COUNT ? 'completed' : 'partial',
    isEvaluated: true,
    validAnswerCount,
    totalQuestions: TOTAL_QUESTION_COUNT,
    unansweredQuestions,
    invalidQuestions: invalidQuestionIds,
    validationMessage: validAnswerCount === TOTAL_QUESTION_COUNT
      ? 'Enneagram testi 27 sorunun tamamı eksiksiz yanıtlanarak hesaplandı.'
      : `Test kısmi olarak yanıtlandı (${validAnswerCount}/${TOTAL_QUESTION_COUNT} soru).`
  };

  return {
    coreType,
    typeName: coreMeta.name,
    wing,
    wingName: `${coreMeta.name} (${wingType} Kanadı ile - ${wingMeta.name.split('&')[0].trim()})`,
    typeScores: scores,
    coreMotivation: coreMeta.motivation,
    coreFear: coreMeta.fear,
    growthDirection: coreMeta.growth,
    stressDirection: coreMeta.stress,
    shadowTraits: coreMeta.shadows,
    strengths: coreMeta.strengths,
    tattooSymbolicDirections: [
      ...coreMeta.tattooDirections,
      `Kanat Dengelemesi (${wing}): ${wingMeta.tattooDirections[0]}`
    ],
    evaluation,
    ranking,
    tieBreakAudit,
    wingTieBreakAudit,
    clientId,
    calculatedAt: new Date().toISOString(),
    methodology: 'Riso-Hudson Enneagram Modeli (27 Eksenli Likert Kendini Bildirim Envanteri)',
    disclaimer: 'Bu değerlendirme klinik/psikiyatrik bir tanı veya kişilik patolojisi ölçümü DEĞİLDİR. Dövme tasarımı bağlamında sembolik arketip eğilimlerini ve estetik yönelimleri belirlemek amacıyla hazırlanmıştır.',
    methodLimitations: 'Kendini bildirim (self-report) yöntemi bireyin güncel farkındalığına ve öznel beyanına dayanır; klinik kişilik testlerinin yerini tutmaz.'
  };
}
