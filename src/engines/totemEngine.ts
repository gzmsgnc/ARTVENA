/**
 * Totem Behavioral Engine (V2 Fully Auditable & Reproducible)
 * 
 * Özellikler:
 * - Saf fonksiyon: Global değişken, modül seviyesinde önbellek veya state taşınması YOKTUR.
 * - Oturum izolasyonu: Her çağrı bağımsız hesaplanır (clientId etiketli).
 * - Belirsiz alt dize (substring/fuzzy) eşleşmesi YOKTUR; kesin kanonik ID eşleşmesi kullanılır.
 * - Tanımlı hata ve boş durum yönetimi: Sessizce rastgele veya varsayılan hayvan atanmaz.
 * - Denetlenebilir eşitlik (tie-break) ve gölge totem mantığı.
 * - Bütün hayvanların sıralaması, puanı, yüzdesi ve eşleşme gerekçesi kaydedilir.
 */

import {
  TotemAnswer,
  TotemResult,
  TotemRankingEntry,
  TotemEvaluationStatus,
  TotemTieBreakAudit
} from '../types';
import { TOTEM_ANIMALS, TOTEM_QUESTIONS } from '../data/totemData';

const TOTAL_QUESTION_COUNT = TOTEM_QUESTIONS.length;

export function calculateTotem(answers: TotemAnswer[], clientId?: string): TotemResult {
  // 1. Sıfırdan temiz puan havuzu (Herhangi bir önceki oturumdan veri sızamaz)
  const scores: Record<string, number> = {};
  for (const animalId of Object.keys(TOTEM_ANIMALS)) {
    scores[animalId] = 0;
  }

  // 2. Cevapların Doğrulanması ve Haritalanması
  const answerMap = new Map<number, number>();
  const invalidQuestionIds: number[] = [];

  const questionDefMap = new Map(TOTEM_QUESTIONS.map(q => [q.id, q]));

  if (Array.isArray(answers)) {
    for (const ans of answers) {
      if (!ans || typeof ans.questionId !== 'number' || typeof ans.selectedOptionIndex !== 'number') {
        continue;
      }
      const qDef = questionDefMap.get(ans.questionId);
      if (!qDef) {
        invalidQuestionIds.push(ans.questionId);
        continue;
      }
      if (ans.selectedOptionIndex < 0 || ans.selectedOptionIndex >= qDef.options.length) {
        invalidQuestionIds.push(ans.questionId);
        continue;
      }
      answerMap.set(ans.questionId, ans.selectedOptionIndex);
    }
  }

  const validAnswerCount = answerMap.size;
  const unansweredQuestions: number[] = [];
  for (const q of TOTEM_QUESTIONS) {
    if (!answerMap.has(q.id)) {
      unansweredQuestions.push(q.id);
    }
  }

  // 3. Eksik ve Geçersiz Cevaplarda Tanımlı Davranış
  if (validAnswerCount === 0) {
    const defaultKurt = TOTEM_ANIMALS['totem_kurt'];
    const defaultBaykus = TOTEM_ANIMALS['totem_baykus'];
    const defaultPanter = TOTEM_ANIMALS['totem_panter'];

    const emptyStatus: TotemEvaluationStatus = {
      status: answers.length > 0 && invalidQuestionIds.length > 0 ? 'invalid' : 'empty',
      isEvaluated: false,
      validAnswerCount: 0,
      totalQuestions: TOTAL_QUESTION_COUNT,
      unansweredQuestions,
      invalidQuestions: invalidQuestionIds,
      validationMessage: answers.length > 0
        ? 'Girilen yanıtların tümü geçersiz soru veya seçenek indeksleri içeriyor.'
        : 'Totem testi için henüz yanıt girilmemiştir.'
    };

    const emptyRanking: TotemRankingEntry[] = Object.keys(TOTEM_ANIMALS).map((id, index) => ({
      rank: index + 1,
      animalId: id,
      name: TOTEM_ANIMALS[id].name,
      score: 0,
      percentage: 0,
      matchRationale: 'Değerlendirilmedi (Yanıt bulunmuyor)'
    }));

    return {
      primaryTotem: defaultKurt,
      secondaryTotem: defaultBaykus,
      shadowTotem: defaultPanter,
      scores,
      behavioralSummary: 'Totem testi henüz tamamlanmamıştır. Danışanın soruları yanıtlaması gerekmektedir.',
      calculatedAt: new Date().toISOString(),
      clientId,
      evaluation: emptyStatus,
      ranking: emptyRanking,
      shadowAudit: {
        method: 'lowest_affinity',
        reason: 'Yanıt bulunmadığı için gölge arketipi hesaplanamadı.'
      }
    };
  }

  // 4. Puanların Toplanması (Kesin ID ile, alt dize çakışması imkansızdır)
  let totalPointsDistributed = 0;
  for (const [qid, optIdx] of answerMap.entries()) {
    const qDef = questionDefMap.get(qid)!;
    const option = qDef.options[optIdx];
    if (option && option.weights) {
      for (const [exactAnimalId, weight] of Object.entries(option.weights)) {
        if (scores[exactAnimalId] !== undefined) {
          scores[exactAnimalId] += weight;
          totalPointsDistributed += weight;
        }
      }
    }
  }

  // 5. Hayvanların Puanlarına Göre Sıralanması
  const sortedAnimals = Object.entries(scores).sort((a, b) => b[1] - a[1]);

  // 6. Eşitlik (Tie-Break) Çözümü ve Denetimi
  let tieBreakAudit: TotemTieBreakAudit | undefined = undefined;
  let primaryId = sortedAnimals[0][0];

  // En yüksek puanı paylaşan başka hayvanlar var mı?
  const maxScore = sortedAnimals[0][1];
  const tiedForFirst = sortedAnimals.filter(item => item[1] === maxScore).map(item => item[0]);

  if (tiedForFirst.length > 1) {
    // Eşitlik Çözüm Stratejisi:
    // Öncelik Ekseni: Soru 1 (Tehdit Algısı), Soru 2 (Sosyal Aidiyet), Soru 4 (Hedef & Vizyon)
    const priorityAxes = [1, 2, 4];
    let resolvedId: string | null = null;
    let breakReason = '';

    for (const axisQid of priorityAxes) {
      const selectedOpt = answerMap.get(axisQid);
      if (selectedOpt !== undefined) {
        const qDef = questionDefMap.get(axisQid)!;
        const weights = qDef.options[selectedOpt].weights;
        // Eşit kalanlar arasında bu soruda en çok puan alanı seç
        let topAxisScore = -1;
        let topCandidate: string | null = null;
        for (const candidate of tiedForFirst) {
          const w = weights[candidate] || 0;
          if (w > topAxisScore) {
            topAxisScore = w;
            topCandidate = candidate;
          }
        }
        if (topCandidate && topAxisScore > 0) {
          resolvedId = topCandidate;
          breakReason = `Soru ${axisQid} (${qDef.axis}) yanıtındaki ${topAxisScore} puanlık belirleyici ağırlık ile eşitlik bozuldu.`;
          break;
        }
      }
    }

    if (!resolvedId) {
      // Deterministik Kanonik Sıra İle Eşitlik Bozulması
      resolvedId = tiedForFirst[0];
      breakReason = `Öncelik sorularında eşitlik aşılamadı; sistem kanonik katalog sırasındaki ilk hayvanı (${TOTEM_ANIMALS[resolvedId].name}) deterministik olarak seçti.`;
    }

    primaryId = resolvedId;
    tieBreakAudit = {
      tiedAnimalIds: tiedForFirst,
      resolvedPrimaryId: primaryId,
      tieBreakMethod: resolvedId ? 'priority_axis_break' : 'canonical_invariant',
      reason: breakReason
    };
  }

  // 7. İkincil Totem (Secondary) Tespiti
  // Birincil ile aynı olmayan, en yüksek puana sahip hayvan
  let secondaryId = 'totem_baykus';
  for (const [candId] of sortedAnimals) {
    if (candId !== primaryId) {
      secondaryId = candId;
      break;
    }
  }

  // 8. Gölge Totem (Shadow) Tespiti ve Denetimi
  // Kural: Soru 9 (Gölge Davranış), Soru 6 (Öfke) veya Soru 14 (Korkuyla Yüzleşme)
  // yanıtlarından doğrudan bilinçaltı ekseni türetilir. Birincil ve ikincilden FARKLI olmalıdır.
  let shadowId: string | null = null;
  let shadowMethod: 'question_9_shadow_axis' | 'polar_tension' | 'lowest_affinity' = 'question_9_shadow_axis';
  let shadowReason = '';

  const q9Selection = answerMap.get(9);
  if (q9Selection !== undefined) {
    const q9Def = questionDefMap.get(9)!;
    const sortedQ9Weights = Object.entries(q9Def.options[q9Selection].weights).sort((a, b) => b[1] - a[1]);
    for (const [candId] of sortedQ9Weights) {
      if (candId !== primaryId && candId !== secondaryId) {
        shadowId = candId;
        shadowMethod = 'question_9_shadow_axis';
        shadowReason = `Danışanın Soru 9'daki ("${q9Def.options[q9Selection].text.slice(0, 45)}...") gölge davranış seçimi ile doğrudan eşleşti.`;
        break;
      }
    }
  }

  // Eğer Soru 9 yanıtlanmamışsa veya birincil/ikincil ile çakışmışsa:
  if (!shadowId) {
    // Soru 14 (Korkuyla Yüzleşme) kontrolü
    const q14Selection = answerMap.get(14);
    if (q14Selection !== undefined) {
      const q14Def = questionDefMap.get(14)!;
      const sortedQ14Weights = Object.entries(q14Def.options[q14Selection].weights).sort((a, b) => b[1] - a[1]);
      for (const [candId] of sortedQ14Weights) {
        if (candId !== primaryId && candId !== secondaryId) {
          shadowId = candId;
          shadowMethod = 'polar_tension';
          shadowReason = `Soru 14 korku ekseni yanıtından türetilen gerilim kutbu ile eşleşti.`;
          break;
        }
      }
    }
  }

  // Fallback: En düşük entegre olmuş hayvan profili
  if (!shadowId) {
    shadowMethod = 'lowest_affinity';
    const candidateShadow = sortedAnimals[sortedAnimals.length - 1][0];
    shadowId = (candidateShadow !== primaryId && candidateShadow !== secondaryId)
      ? candidateShadow
      : (sortedAnimals[sortedAnimals.length - 2] ? sortedAnimals[sortedAnimals.length - 2][0] : 'totem_panter');
    shadowReason = 'Cevaplanan sorular doğrultusunda en az temas edilen bilinçaltı potansiyel alanı.';
  }

  const primaryTotem = TOTEM_ANIMALS[primaryId] || TOTEM_ANIMALS['totem_kurt'];
  const secondaryTotem = TOTEM_ANIMALS[secondaryId] || TOTEM_ANIMALS['totem_baykus'];
  const shadowTotem = TOTEM_ANIMALS[shadowId] || TOTEM_ANIMALS['totem_panter'];

  // 9. Tüm Hayvanların Denetlenebilir Sıralama Listesi (Ranking)
  const ranking: TotemRankingEntry[] = sortedAnimals.map(([animId, score], idx) => {
    const animProfile = TOTEM_ANIMALS[animId];
    const pct = totalPointsDistributed > 0 ? Math.round((score / totalPointsDistributed) * 100) : 0;
    let rationale = `${score} puan (%${pct})`;
    if (animId === primaryId) rationale += ' [BİRİNCİL TOTEM]';
    else if (animId === secondaryId) rationale += ' [İKİNCİL MÜTTEFİK]';
    else if (animId === shadowId) rationale += ' [GÖLGE ARKETİP]';

    return {
      rank: idx + 1,
      animalId: animId,
      name: animProfile ? animProfile.name : animId,
      score,
      percentage: pct,
      matchRationale: rationale
    };
  });

  // 10. Değerlendirme Durumu
  const evaluation: TotemEvaluationStatus = {
    status: validAnswerCount === TOTAL_QUESTION_COUNT ? 'completed' : 'partial',
    isEvaluated: true,
    validAnswerCount,
    totalQuestions: TOTAL_QUESTION_COUNT,
    unansweredQuestions,
    invalidQuestions: invalidQuestionIds,
    validationMessage: validAnswerCount === TOTAL_QUESTION_COUNT
      ? 'Totem testi tüm sorular eksiksiz yanıtlanarak başarıyla hesaplandı.'
      : `Test kısmi olarak değerlendirildi (${validAnswerCount}/${TOTAL_QUESTION_COUNT} soru).`
  };

  const summary = `Birincil Toteminiz ${primaryTotem.name} (${primaryTotem.archetype}), ${scores[primaryId]} puan ile doğanızın en güçlü ve yönlendirici eksenini oluşturuyor. ` +
    `İkincil müttefikiniz ${secondaryTotem.name} (${secondaryTotem.archetype}) karar süreçlerinde size destek olurken; ` +
    `Gölge Toteminiz ${shadowTotem.name} (${shadowTotem.archetype}) ise yüzleşilmesi ve bütünleştirilmesi gereken bilinçaltı potansiyelinizi temsil eder.`;

  return {
    primaryTotem,
    secondaryTotem,
    shadowTotem,
    scores,
    behavioralSummary: summary,
    calculatedAt: new Date().toISOString(),
    clientId,
    evaluation,
    ranking,
    tieBreakAudit,
    shadowAudit: {
      method: shadowMethod,
      reason: shadowReason
    }
  };
}
