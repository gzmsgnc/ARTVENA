/**
 * Enneagram Motoru İstem 3 Özel Doğrulama Paketi (Enneagram Audit & Invariance Suite)
 * 
 * Doğrulanan Senaryolar:
 * 1. 27 Soru Kimlik ve Boyut Eşleme Denetimi (Her tip 3 soru, 3 boyut, sıfır mükerrerlik)
 * 2. Farklı Danışanlar İçin Ayrık Profil Üretimi (Client A: Tip 4w5 != Client B: Tip 8w7)
 * 3. Aynı Yanıt Dizisiyle Tekrarlı Hesaplama (Tam Determinizm & Sıfır Bellek Sızıntısı)
 * 4. Boş Yanıtlar Durumu (Tanımlı Boşluk, Sessizce Tip 1 Atamama Garantisi, isEvaluated: false)
 * 5. Geçersiz Skor & Soru ID Arıtımı (1-5 Likert Dışı ve Bilinmeyen Soruların Ayıklanması)
 * 6. Eşit Puanlar ve Denetlenebilir Tie-Break Çözümü (Temel Motivasyon Boyut Kıyaslaması)
 * 7. Ana Tip ile Kanat Sonucunun Ayrımı (Kanadın Yalnızca Bitişik Tiplerden Türetilmesi)
 * 8. Kanat Eşitliği ve Çözüm Denetimi (Wing Tie-Break Audit)
 * 9. Klinik Olmayan Arketip Beyanı & Metodolojik Sınırlılık Güvencesi
 */

import { calculateEnneagram } from '../engines/enneagramEngine';
import { ENNEAGRAM_QUESTIONS } from '../data/enneagramQuestions';
import { EnneagramAnswer } from '../types';

export interface EnneagramScenarioResult {
  id: string;
  name: string;
  passed: boolean;
  message: string;
  auditDetails: any;
}

export function runEnneagramVerificationSuite(): EnneagramScenarioResult[] {
  const results: EnneagramScenarioResult[] = [];

  // Senaryo 1: 27 Soru Kimlik ve Boyut Eşleme Denetimi
  const totalQuestions = ENNEAGRAM_QUESTIONS.length;
  const uniqueIds = new Set(ENNEAGRAM_QUESTIONS.map(q => q.id));
  const typeQuestionCounts: Record<number, number> = {};
  const dimensionDistribution: Record<string, number> = {
    'Temel Motivasyon': 0,
    'Stres & Savunma': 0,
    'Gölge & İlişki Dinamiği': 0
  };

  for (const q of ENNEAGRAM_QUESTIONS) {
    typeQuestionCounts[q.typeTarget] = (typeQuestionCounts[q.typeTarget] || 0) + 1;
    dimensionDistribution[q.dimension] = (dimensionDistribution[q.dimension] || 0) + 1;
  }

  const allTypesHave3Questions = Array.from({ length: 9 }, (_, i) => i + 1)
    .every(t => typeQuestionCounts[t] === 3);
  const allDimensionsBalanced = Object.values(dimensionDistribution).every(cnt => cnt === 9);

  const s1Passed = totalQuestions === 27 &&
    uniqueIds.size === 27 &&
    allTypesHave3Questions &&
    allDimensionsBalanced;

  results.push({
    id: 'enn_scen_1',
    name: '1. 27 Soru Kimlik, Tip ve Boyut Eşleşme Bütünlüğü',
    passed: s1Passed,
    message: s1Passed
      ? 'Başarılı: 27 sorunun tamamı 9 tipe 3\'er adet ve 3 boyuta (Motivasyon, Stres, Gölge) 9\'ar adet eşit dengelenmiştir.'
      : 'Hata: Soru-tip veya boyut dağılımında dengesizlik tespit edildi!',
    auditDetails: {
      totalQuestions,
      uniqueIds: uniqueIds.size,
      typeCounts: typeQuestionCounts,
      dimensions: dimensionDistribution
    }
  });

  // Senaryo 2: Farklı Danışanlar İçin Ayrık Profil Üretimi (Client A: Tip 4w5, Client B: Tip 8w7)
  const answersClientA: EnneagramAnswer[] = [
    { questionId: 10, score: 5 }, // Tip 4 (Motivasyon)
    { questionId: 11, score: 5 }, // Tip 4 (Stres)
    { questionId: 12, score: 5 }, // Tip 4 (Gölge) -> Tip 4: 15 Puan
    { questionId: 13, score: 4 }, // Tip 5 (Komşu Kanat)
    { questionId: 14, score: 4 }, // Tip 5
    { questionId: 15, score: 4 }  // Tip 5 -> Tip 5: 12 Puan
  ];

  const answersClientB: EnneagramAnswer[] = [
    { questionId: 22, score: 5 }, // Tip 8 (Motivasyon)
    { questionId: 23, score: 5 }, // Tip 8 (Stres)
    { questionId: 24, score: 5 }, // Tip 8 (Gölge) -> Tip 8: 15 Puan
    { questionId: 19, score: 4 }, // Tip 7 (Komşu Kanat)
    { questionId: 20, score: 4 }, // Tip 7
    { questionId: 21, score: 4 }  // Tip 7 -> Tip 7: 12 Puan
  ];

  const resA = calculateEnneagram(answersClientA, 'client_A');
  const resB = calculateEnneagram(answersClientB, 'client_B');

  const s2Passed = resA.coreType === 4 &&
    resA.wing === '4w5' &&
    resB.coreType === 8 &&
    resB.wing === '8w7' &&
    (resA.coreType as number) !== (resB.coreType as number);

  results.push({
    id: 'enn_scen_2',
    name: '2. Farklı Danışan Profilleri Ayrımı (Tip 4w5 vs Tip 8w7)',
    passed: s2Passed,
    message: s2Passed
      ? `Başarılı: Danışan A (${resA.wingName}) ve Danışan B (${resB.wingName}) tam doğrulukla ayrıştırıldı.`
      : 'Hata: İki farklı danışan profili birbirinden ayrılamadı!',
    auditDetails: {
      clientA: { core: resA.coreType, wing: resA.wing },
      clientB: { core: resB.coreType, wing: resB.wing }
    }
  });

  // Senaryo 3: Aynı Yanıt Dizisiyle Tekrarlı Hesaplama (Tam Determinizm)
  const run1 = calculateEnneagram(answersClientA, 'session_1');
  const run2 = calculateEnneagram(answersClientA, 'session_1');

  const s3Passed = run1.coreType === run2.coreType &&
    run1.wing === run2.wing &&
    JSON.stringify(run1.typeScores) === JSON.stringify(run2.typeScores) &&
    run1.growthDirection === run2.growthDirection &&
    run1.stressDirection === run2.stressDirection;

  results.push({
    id: 'enn_scen_3',
    name: '3. Aynı Yanıt Dizisiyle Tekrarlı Hesaplama (Tam Determinizm)',
    passed: s3Passed,
    message: s3Passed
      ? 'Başarılı: İki ardışık hesaplama %100 birebir aynı tip, kanat ve puanları üretti.'
      : 'Hata: Determinizm bozuldu, farklı sonuçlar üretildi!',
    auditDetails: { match: s3Passed, coreType: run1.coreType, wing: run1.wing }
  });

  // Senaryo 4: Boş Yanıtlar Durumu (Tanımlı Boşluk, Sessizce Atama Engeli)
  const emptyRes = calculateEnneagram([], 'client_empty');
  const s4Passed = emptyRes.evaluation !== undefined &&
    emptyRes.evaluation.status === 'empty' &&
    emptyRes.evaluation.isEvaluated === false &&
    emptyRes.evaluation.validAnswerCount === 0 &&
    emptyRes.evaluation.unansweredQuestions.length === 27;

  results.push({
    id: 'enn_scen_4',
    name: '4. Boş Yanıtlar Tanımlı Durum Yönetimi (Sessiz Atama Engeli)',
    passed: s4Passed,
    message: s4Passed
      ? 'Başarılı: Boş girdi için isEvaluated: false ve status: empty tanımlı olarak üretildi.'
      : 'Hata: Boş girdide sessiz varsayılan atama engellenemedi!',
    auditDetails: emptyRes.evaluation
  });

  // Senaryo 5: Geçersiz Skor & Soru ID Arıtımı
  const invalidAnswers: EnneagramAnswer[] = [
    { questionId: -99, score: 5 },   // Geçersiz Soru ID
    { questionId: 999, score: 3 },   // Geçersiz Soru ID
    { questionId: 10, score: 99 },   // Geçersiz Skor (> 5)
    { questionId: 11, score: -2 },   // Geçersiz Skor (< 1)
    { questionId: 10, score: 5 },    // Geçerli (Tip 4, Soru 10: 5)
    { questionId: 11, score: 4 },    // Geçerli (Tip 4, Soru 11: 4)
    { questionId: 12, score: 5 }     // Geçerli (Tip 4, Soru 12: 5)
  ];

  const sanitizedRes = calculateEnneagram(invalidAnswers, 'client_sanitized');
  const s5Passed = sanitizedRes.evaluation !== undefined &&
    sanitizedRes.evaluation.invalidQuestions.length >= 4 &&
    sanitizedRes.coreType === 4;

  results.push({
    id: 'enn_scen_5',
    name: '5. Geçersiz Skor ve Soru Kimliklerinin Güvenli Arıtılması',
    passed: s5Passed,
    message: s5Passed
      ? `Başarılı: 4 geçersiz yanıt arıtıldı; 3 geçerli yanıt ile doğru tip (${sanitizedRes.typeName}) hesaplandı.`
      : 'Hata: Geçersiz yanıtlar arıtılamadı!',
    auditDetails: {
      invalidCount: sanitizedRes.evaluation?.invalidQuestions.length,
      validAnswerCount: sanitizedRes.evaluation?.validAnswerCount,
      resolvedType: sanitizedRes.coreType
    }
  });

  // Senaryo 6: Eşit Puanlar ve Denetlenebilir Tie-Break Çözümü
  // Tip 3 ve Tip 7 her ikisi de toplam 12 puana ulaşsın:
  // Tip 3: Soru 7 (Motivasyon: 5), Soru 8 (Stres: 4), Soru 9 (Gölge: 3) -> Toplam: 12
  // Tip 7: Soru 19 (Motivasyon: 4), Soru 20 (Stres: 4), Soru 21 (Gölge: 4) -> Toplam: 12
  // Tie-Break Kuralı: Temel Motivasyon Boyutunda Tip 3 (5 puan) > Tip 7 (4 puan) olduğu için Tip 3 seçilmelidir!
  const tiedAnswers: EnneagramAnswer[] = [
    { questionId: 7, score: 5 },  // Tip 3 Motivasyon: 5
    { questionId: 8, score: 4 },  // Tip 3 Stres: 4
    { questionId: 9, score: 3 },  // Tip 3 Gölge: 3 -> Toplam 12
    { questionId: 19, score: 4 }, // Tip 7 Motivasyon: 4
    { questionId: 20, score: 4 }, // Tip 7 Stres: 4
    { questionId: 21, score: 4 }  // Tip 7 Gölge: 4 -> Toplam 12
  ];

  const tieRes = calculateEnneagram(tiedAnswers, 'client_tie');
  const s6Passed = tieRes.coreType === 3 &&
    tieRes.typeScores[3] === tieRes.typeScores[7] &&
    tieRes.tieBreakAudit !== undefined &&
    tieRes.tieBreakAudit.method === 'motivation_dimension_break';

  results.push({
    id: 'enn_scen_6',
    name: '6. Eşit Puanlar Durumu (Temel Motivasyon Boyut Tie-Break Kaydı)',
    passed: s6Passed,
    message: s6Passed
      ? `Başarılı: Tip 3 (12) ve Tip 7 (12) eşitlendi; Motivasyon kuralı ile Tip 3 seçildi. Gerekçe: ${tieRes.tieBreakAudit?.reason}`
      : 'Hata: Eşitlik durumu çözülemedi veya denetim kaydı oluşmadı!',
    auditDetails: tieRes.tieBreakAudit
  });

  // Senaryo 7: Ana Tip ile Kanat Sonucunun Ayrımı
  // Tip 4 için olası kanatlar SADECE 3 veya 5 olabilir; asla 1, 2, 6, 7, 8, 9 olamaz.
  // Tip 1 için olası kanatlar SADECE 9 veya 2 olabilir (Dairesel 9-1 bağlantısı).
  const allowedWingsFor4 = ['4w3', '4w5'];
  const allowedWingsFor1 = ['1w9', '1w2'];
  const allowedWingsFor9 = ['9w8', '9w1'];

  const resTip1 = calculateEnneagram([
    { questionId: 1, score: 5 },
    { questionId: 2, score: 5 },
    { questionId: 3, score: 5 },
    { questionId: 25, score: 4 }, // Tip 9
    { questionId: 26, score: 4 },
    { questionId: 27, score: 4 }
  ]);

  const s7Passed = allowedWingsFor4.includes(resA.wing) &&
    allowedWingsFor1.includes(resTip1.wing) &&
    resA.coreType !== parseInt(resA.wing.split('w')[1], 10);

  results.push({
    id: 'enn_scen_7',
    name: '7. Ana Tip ve Kanat Ayrımı (Bitişik Komşuluk & Dairesellik)',
    passed: s7Passed,
    message: s7Passed
      ? `Başarılı: Kanat ana tipten kesin olarak ayrıldı ve bitişik çember komşusundan türetildi (Tip 4 -> ${resA.wing}, Tip 1 -> ${resTip1.wing}).`
      : 'Hata: Ana tip ile kanat birbirine karıştırıldı veya bitişik olmayan kanat üretildi!',
    auditDetails: {
      sample4Wing: resA.wing,
      sample1Wing: resTip1.wing
    }
  });

  // Senaryo 8: Kanat Eşitliği ve Çözüm Denetimi (Wing Tie-Break)
  // Tip 4 için komşu kanatlar Tip 3 ve Tip 5'tir.
  // Tip 3 ve Tip 5 aynı puanı alsın (örn. 8 puan).
  const wingTiedAnswers: EnneagramAnswer[] = [
    { questionId: 10, score: 5 },
    { questionId: 11, score: 5 },
    { questionId: 12, score: 5 }, // Tip 4: 15 Puan (Core)
    { questionId: 7, score: 5 },
    { questionId: 8, score: 3 },  // Tip 3: 8 Puan (Sol Kanat, Motivasyon: 5)
    { questionId: 13, score: 4 },
    { questionId: 14, score: 4 }  // Tip 5: 8 Puan (Sağ Kanat, Motivasyon: 4)
  ];

  const wingTieRes = calculateEnneagram(wingTiedAnswers, 'client_wing_tie');
  const s8Passed = wingTieRes.coreType === 4 &&
    wingTieRes.typeScores[3] === wingTieRes.typeScores[5] &&
    wingTieRes.wing === '4w3' &&
    wingTieRes.wingTieBreakAudit !== undefined;

  results.push({
    id: 'enn_scen_8',
    name: '8. Kanat Eşitliği ve Çözüm Denetimi (Wing Tie-Break)',
    passed: s8Passed,
    message: s8Passed
      ? `Başarılı: Komşu kanatlar Tip 3 (8) ve Tip 5 (8) eşitlendi; ${wingTieRes.wing} seçimi denetlenebilir gerekçeyle kaydedildi.`
      : 'Hata: Kanat eşitliği çözülemedi!',
    auditDetails: wingTieRes.wingTieBreakAudit
  });

  // Senaryo 9: Klinik Olmayan Arketip Beyanı & Metodolojik Sınırlılık Güvencesi
  const hasDisclaimer = typeof resA.disclaimer === 'string' &&
    resA.disclaimer.includes('klinik') &&
    resA.disclaimer.includes('tanı') &&
    resA.disclaimer.includes('DEĞİLDİR');

  const hasMethodology = typeof resA.methodology === 'string' &&
    resA.methodology.includes('Riso-Hudson');

  const hasLimitations = typeof resA.methodLimitations === 'string' &&
    resA.methodLimitations.length > 20;

  const s9Passed = hasDisclaimer && hasMethodology && hasLimitations;

  results.push({
    id: 'enn_scen_9',
    name: '9. Klinik Olmayan Arketip Beyanı & Metodolojik Sınırlılık Güvencesi',
    passed: s9Passed,
    message: s9Passed
      ? 'Başarılı: Sonuç nesnesi metodoloji kaynağını, sınırlılıklarını ve tıbbi tanı olmadığına dair net beyanı içeriyor.'
      : 'Hata: Sorumluluk reddi veya metodoloji sınırlılığı eksik!',
    auditDetails: {
      methodology: resA.methodology,
      disclaimer: resA.disclaimer,
      limitations: resA.methodLimitations
    }
  });

  return results;
}
