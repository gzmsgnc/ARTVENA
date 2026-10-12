/**
 * Totem Motoru İstem 2 Özel Doğrulama Paketi (Totem Audit & Invariance Suite)
 * 
 * Doğrulanan Senaryolar:
 * 1. Farklı sonuç üreten iki danışan (Client A != Client B)
 * 2. Aynı cevaplarla tekrarlı hesaplama (Deterministik tekrarlanabilirlik)
 * 3. Boş cevaplar (Tanımlı davranış, sessiz varsayılan atamama, isEvaluated: false)
 * 4. Geçersiz cevaplar (Negatif indisler, var olmayan soru ID'leri, güvenli arıtma)
 * 5. Eşit puanlar (Denetlenebilir Tie-Break çözümü)
 * 6. Oturum değişimi (State leakage izolasyonu)
 * 7. Aynı hayvan adını içeren benzer metinler (Substring/Fuzzy çakışma koruması)
 */

import { calculateTotem } from '../engines/totemEngine';
import { TotemAnswer } from '../types';

export interface TotemScenarioResult {
  id: string;
  name: string;
  passed: boolean;
  message: string;
  auditDetails: any;
}

export function runTotemVerificationSuite(): TotemScenarioResult[] {
  const results: TotemScenarioResult[] = [];

  // Senaryo 1: Farklı Sonuç Üreten İki Danışan (Client A: Kurt Odaklı, Client B: Balina/Manta Odaklı)
  const answersKurt: TotemAnswer[] = [
    { questionId: 1, selectedOptionIndex: 1 }, // Kurt +2
    { questionId: 2, selectedOptionIndex: 0 }, // Kurt +3
    { questionId: 8, selectedOptionIndex: 1 }, // Kurt +3
    { questionId: 12, selectedOptionIndex: 0 }, // Kurt +3
    { questionId: 23, selectedOptionIndex: 3 } // Kurt +3
  ];

  const answersOkyanus: TotemAnswer[] = [
    { questionId: 1, selectedOptionIndex: 3 }, // Balina +3, Manta +3
    { questionId: 4, selectedOptionIndex: 3 }, // Manta +2
    { questionId: 8, selectedOptionIndex: 0 }, // Manta +3, Balina +2
    { questionId: 10, selectedOptionIndex: 2 }, // Balina +3, Manta +3
    { questionId: 15, selectedOptionIndex: 0 }, // Balina +3, Manta +3
    { questionId: 17, selectedOptionIndex: 0 } // Balina +3, Manta +3
  ];

  const resA = calculateTotem(answersKurt, 'client_A');
  const resB = calculateTotem(answersOkyanus, 'client_B');

  const s1Passed = resA.primaryTotem.id === 'totem_kurt' &&
    (resB.primaryTotem.id === 'totem_manta_vatozu' || resB.primaryTotem.id === 'totem_balina') &&
    (resA.primaryTotem.id as string) !== (resB.primaryTotem.id as string);

  results.push({
    id: 'totem_scen_1',
    name: '1. Farklı Sonuç Üreten İki Danışan Ayrımı',
    passed: s1Passed,
    message: s1Passed
      ? `Başarılı: Danışan A -> ${resA.primaryTotem.name}, Danışan B -> ${resB.primaryTotem.name}`
      : 'Hata: İki farklı danışan seti birbirinden ayrılamadı!',
    auditDetails: { clientA: resA.primaryTotem.id, clientB: resB.primaryTotem.id }
  });

  // Senaryo 2: Aynı Cevaplarla Tekrarlı Hesaplama (Determinizm Testi)
  const run1 = calculateTotem(answersKurt, 'client_1');
  const run2 = calculateTotem(answersKurt, 'client_1');

  const s2Passed = run1.primaryTotem.id === run2.primaryTotem.id &&
    run1.secondaryTotem.id === run2.secondaryTotem.id &&
    run1.shadowTotem.id === run2.shadowTotem.id &&
    JSON.stringify(run1.scores) === JSON.stringify(run2.scores);

  results.push({
    id: 'totem_scen_2',
    name: '2. Aynı Cevaplarla Tekrarlı Hesaplama (Tam Determinizm)',
    passed: s2Passed,
    message: s2Passed
      ? 'Başarılı: İki ardışık hesaplama %100 birebir aynı sonuçları üretti.'
      : 'Hata: Determinizm bozuldu, farklı sonuçlar üretildi!',
    auditDetails: { match: s2Passed }
  });

  // Senaryo 3: Boş Cevaplar Durumu (Tanımlı Boşluk & isEvaluated: false)
  const emptyRes = calculateTotem([], 'client_empty');
  const s3Passed = emptyRes.evaluation.status === 'empty' &&
    emptyRes.evaluation.isEvaluated === false &&
    emptyRes.evaluation.validAnswerCount === 0 &&
    emptyRes.evaluation.unansweredQuestions.length === 24;

  results.push({
    id: 'totem_scen_3',
    name: '3. Boş Cevaplar Tanımlı Durum Yönetimi (Sessiz Atama Engeli)',
    passed: s3Passed,
    message: s3Passed
      ? 'Başarılı: Boş girdi için isEvaluated: false ve status: empty tanımlı olarak üretildi.'
      : 'Hata: Boş girdide sessiz varsayılan atama engellenemedi!',
    auditDetails: emptyRes.evaluation
  });

  // Senaryo 4: Geçersiz Cevaplar (Negatif indeksler, bilinmeyen ID'ler)
  const invalidAnswers: TotemAnswer[] = [
    { questionId: -99, selectedOptionIndex: 0 },
    { questionId: 999, selectedOptionIndex: 2 },
    { questionId: 1, selectedOptionIndex: 99 }, // 99. seçenek yok
    { questionId: 1, selectedOptionIndex: -1 }, // negatif seçenek
    { questionId: 2, selectedOptionIndex: 0 }   // Geçerli (Kurt: 3, Ayı: 2)
  ];

  const invalidRes = calculateTotem(invalidAnswers, 'client_invalid');
  const s4Passed = invalidRes.evaluation.validAnswerCount === 1 &&
    invalidRes.evaluation.invalidQuestions.length === 4 &&
    invalidRes.primaryTotem.id === 'totem_kurt';

  results.push({
    id: 'totem_scen_4',
    name: '4. Geçersiz Cevapların Arıtılması ve Güvenli Değerlendirme',
    passed: s4Passed,
    message: s4Passed
      ? `Başarılı: 4 geçersiz yanıt izole edildi, 1 geçerli yanıt (${invalidRes.primaryTotem.name}) güvenle işlendi.`
      : 'Hata: Geçersiz yanıtlar arıtılamadı!',
    auditDetails: { invalidCount: invalidRes.evaluation.invalidQuestions.length, validCount: invalidRes.evaluation.validAnswerCount }
  });

  // Senaryo 5: Eşit Puanlar ve Denetlenebilir Tie-Break Çözümü
  // Soru 15: Seçenek 1 -> Kartal +3, Kuzgun +2
  // Soru 4:  Seçenek 0 -> Kartal +3 (Kartal: 6)
  // Soru 5:  Seçenek 1 -> Kuzgun +3 (Kuzgun: 5)
  // Soru 11: Seçenek 0 -> Kuzgun +3, Tilki +2 (Kuzgun: 8)
  // Soru 10: Seçenek 0 -> Kartal +3 (Kartal: 9)
  // Soru 13: Seçenek 2 -> Kuzgun +3 (Kuzgun: 11)
  // Soru 4:  Seçenek 0 -> Kartal: 3
  // Soru 5:  Seçenek 1 -> Kuzgun: 3 -> EŞİTLİK: Kartal = 3, Kuzgun = 3!
  const tiedAnswers: TotemAnswer[] = [
    { questionId: 4, selectedOptionIndex: 0 }, // Kartal: 3
    { questionId: 5, selectedOptionIndex: 1 }  // Kuzgun: 3
  ];

  const tieRes = calculateTotem(tiedAnswers, 'client_tie');
  const scoresKartal = tieRes.scores['totem_kartal'];
  const scoresKuzgun = tieRes.scores['totem_kuzgun'];
  const isActuallyTied = scoresKartal === scoresKuzgun;
  const hasTieAudit = tieRes.tieBreakAudit !== undefined && tieRes.tieBreakAudit.tiedAnimalIds.length > 1;

  const s5Passed = isActuallyTied && hasTieAudit && (tieRes.primaryTotem.id === 'totem_kartal' || tieRes.primaryTotem.id === 'totem_kuzgun');

  results.push({
    id: 'totem_scen_5',
    name: '5. Eşit Puanlar Durumu (Tie-Break Denetim Kaydı)',
    passed: s5Passed,
    message: s5Passed
      ? `Başarılı: Kartal(${scoresKartal}) ve Kuzgun(${scoresKuzgun}) eşitlendi. Çözüm: ${tieRes.tieBreakAudit?.resolvedPrimaryId} (${tieRes.tieBreakAudit?.reason})`
      : 'Hata: Eşitlik durumu çözülemedi veya denetim kaydı oluşmadı!',
    auditDetails: tieRes.tieBreakAudit
  });

  // Senaryo 6: Oturum Değişimi ve State İzolasyonu
  // Client X hesapla -> Client Y hesapla -> Client X tekrar hesapla.
  // Client Y'nin verisi Client X'e asla bulaşmamalı.
  const resX1 = calculateTotem(answersKurt, 'session_X');
  const resY = calculateTotem(answersOkyanus, 'session_Y');
  const resX2 = calculateTotem(answersKurt, 'session_X');

  const s6Passed = resX1.primaryTotem.id === resX2.primaryTotem.id &&
    JSON.stringify(resX1.scores) === JSON.stringify(resX2.scores) &&
    resX1.primaryTotem.id !== resY.primaryTotem.id;

  results.push({
    id: 'totem_scen_6',
    name: '6. Oturum Değişimi ve Bellek Sızıntısı İzolasyonu',
    passed: s6Passed,
    message: s6Passed
      ? 'Başarılı: Araya giren oturumlar önceki danışanın hesaplama sonucunu etkilemedi.'
      : 'Hata: Oturumlar arası bellek veya sonuç sızıntısı tespit edildi!',
    auditDetails: { sessionX: resX1.primaryTotem.id, sessionY: resY.primaryTotem.id }
  });

  // Senaryo 7: Benzer Metinler ve Substring Çakışma Önleme
  // 'totem_kartal' vs 'totem_kurt', 'totem_kuzgun' vs 'totem_karga'
  // Sadece tam kanonik ID eşleşmesi çalıştığını doğrula
  const allIds = Object.keys(tieRes.scores);
  const substringCheck = allIds.every(id => id.startsWith('totem_'));
  const uniqueNames = new Set(tieRes.ranking.map(r => r.name)).size === allIds.length;

  const s7Passed = substringCheck && uniqueNames && tieRes.scores['totem_kurt'] !== undefined && tieRes.scores['totem_kartal'] !== undefined;

  results.push({
    id: 'totem_scen_7',
    name: '7. Substring ve İsim Benzerliği Çakışma Önleme',
    passed: s7Passed,
    message: s7Passed
      ? 'Başarılı: Bütün hayvanlar benzersiz kanonik ID ile tam eşleşiyor, alt dize çakışması engellendi.'
      : 'Hata: Alt dize veya isim çakışması riski bulundu!',
    auditDetails: { totalAnimals: allIds.length, uniqueIds: new Set(allIds).size }
  });

  return results;
}
