/**
 * Numerology Engine (Western Pythagorean System with Turkish Phonetic Normalization)
 * 
 * METHODOLOGY & FORMULAS:
 * 1. Life Path Number (Yaşam Yolu):
 *    - Period Cycle Reduction (Dönem Döngüleri): Year, Month, and Day are each reduced
 *      independently to single digits or master numbers (11, 22). The sum of these three cycles
 *      is then reduced to a single digit or master number (11, 22, 33).
 *    - Straight Sum Alternative (Bütünsel Basamak Toplamı): Provided in audit trail for comparison.
 * 2. Expression Number (İfade / Kader Sayısı):
 *    - Sum of all Pythagorean letter values in the complete full name, reduced to 1-9 or 11/22/33.
 * 3. Soul Urge Number (Ruh / Kalp Arzusu):
 *    - Sum of all vowels in the full name, reduced to 1-9 or 11/22/33.
 * 4. Personality Number (Kişilik Sayısı):
 *    - Sum of all consonants in the full name, reduced to 1-9 or 11/22/33.
 *    - Invariance: Soul Urge Raw Sum + Personality Raw Sum === Expression Raw Sum.
 * 5. Maturity Number (Olgunluk / Nihai Güç Sayısı):
 *    - Life Path Number + Expression Number, reduced to 1-9 or 11/22/33.
 * 6. Birthday Number (Doğum Günü Sayısı):
 *    - Day of birth (1-31), reduced to single digit or master number (11, 22).
 * 7. Attitude / Sun Number (Tutum / Güneş Sayısı):
 *    - Day of birth + Month of birth, reduced to 1-9 or master number.
 */

import {
  NumerologyResult,
  NumerologyAuditTrail,
  NumerologyLetterTrace,
  NumerologyWordTrace,
  NumerologyBirthCycleTrace
} from '../types';

export const PYTHAGOREAN_MAP: Record<string, number> = {
  a: 1, j: 1, s: 1, ş: 1,
  b: 2, k: 2, t: 2,
  c: 3, ç: 3, l: 3, u: 3, ü: 3,
  d: 4, m: 4, v: 4,
  e: 5, n: 5, w: 5,
  f: 6, o: 6, ö: 6, x: 6,
  g: 7, ğ: 7, p: 7, y: 7,
  h: 8, q: 8, z: 8,
  i: 9, ı: 9, r: 9
};

export const TURKISH_VOWELS = new Set(['a', 'e', 'ı', 'i', 'o', 'ö', 'u', 'ü']);

/**
 * Normalizes Turkish text preserving lowercase Turkish characters (ç, ğ, ı, i, ö, ş, ü)
 */
export function normalizeTurkishText(text: string): string {
  if (!text) return '';
  return text
    .toLocaleLowerCase('tr-TR')
    .replace(/[^a-zçğışöü\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Reduces a number to a single digit (1-9) or Master Number (11, 22, 33).
 * Records each step of the reduction process.
 */
export function reduceWithSteps(num: number): {
  value: number;
  isMaster: boolean;
  steps: string[];
} {
  const steps: string[] = [];
  if (num <= 0) {
    return { value: 1, isMaster: false, steps: ['0 -> 1 (nötr varsayılan)'] };
  }

  // Already single digit or master number
  if (num <= 9) {
    steps.push(`${num} (tek basamaklı kök sayı)`);
    return { value: num, isMaster: false, steps };
  }
  if (num === 11 || num === 22 || num === 33) {
    steps.push(`${num} (Usta Sayı - indirgenmeden korundu)`);
    return { value: num, isMaster: true, steps };
  }

  let current = num;
  while (current > 9 && current !== 11 && current !== 22 && current !== 33) {
    const digits = current.toString().split('').map(d => parseInt(d, 10));
    const next = digits.reduce((acc, digit) => acc + digit, 0);
    steps.push(`${digits.join(' + ')} = ${next}`);
    current = next;
  }

  const isMaster = current === 11 || current === 22 || current === 33;
  if (isMaster) {
    steps.push(`${current} (Usta Sayı olarak kilitlendi)`);
  }

  return { value: current, isMaster, steps };
}

export const NUMEROLOGY_THEMES: Record<
  number,
  { title: string; meaning: string; tattoo: string[]; symbols: string[] }
> = {
  1: {
    title: 'Öncü, Lider, Başlangıç Noktası',
    meaning: 'Bireysellik, bağımsızlık, cesur adımlar ve yaratıcı kıvılcım. İlk hareket gücü.',
    tattoo: ['Tekil merkezli kompozisyonlar', 'Düz dikey ok ve güneş ışını hatları', 'Minimalist eksen sembolleri'],
    symbols: ['Nokta (Birlik)', 'Güneş', 'Kuzey Yıldızı', 'Dikey Kılıç']
  },
  2: {
    title: 'Uyum, Sezgi, İkili Denge',
    meaning: 'Diplomasi, duyarlılık, yin-yang harmonisi ve gizli sezgisel bağlantılar.',
    tattoo: ['Vesica Piscis kesişimleri', 'İkiz ay hilalleri', 'Dengeli akışkan dalgalar'],
    symbols: ['Vesica Piscis', 'Hilal', 'Çift Spiral', 'Kuğu']
  },
  3: {
    title: 'Yaratıcılık, İfade, Üçlü Kutsallık',
    meaning: 'Kendini ifade, sanatsal akış, coşku, beden-zihin-ruh üçlemesi.',
    tattoo: ['Triquetra düğümleri', 'Eşkenar üçgen hiyerarşisi', 'Çiçek açan botanik dallar'],
    symbols: ['Triquetra', 'Üçgen', 'Lotus Yaprakları Üçlemesi', 'Ginkgo']
  },
  4: {
    title: 'Düzen, Temel, Sağlam Yapı',
    meaning: 'Disiplin, mimari temel, doğanın dört elementi ve sarsılmaz güven.',
    tattoo: ['Kare ve küp projeksiyonları', 'Hacimli sacred geometry ağları', 'Toprak kökleri'],
    symbols: ['Dörtgen / Kare', 'Küp', 'Dört Element Haçı', 'Meşe Ağacı']
  },
  5: {
    title: 'Özgürlük, Dönüşüm, Beş Element',
    meaning: 'Dinamizm, seyahat, uyum yeteneği ve zincirleri kırma arzusu.',
    tattoo: ['Pentagram altın oran sarmalları', 'Kanat formları', 'Rüzgar akıntıları'],
    symbols: ['Pentagram', 'Rüzgar Gülü', 'Kuş Kanatları', 'Yusufçuk']
  },
  6: {
    title: 'Sevgi, Şifa, Kutsal Geometri',
    meaning: 'Fedakarlık, koruma içgüdüsü, estetik mükemmellik ve kalp merkezi.',
    tattoo: ['Yaşam Çiçeği altıgen matrisleri', 'Koruyucu sarmal motifler', 'Şifalı sarmaşıklar'],
    symbols: ['Hekzagram', 'Yaşam Çiçeği', 'Zeytin Dalı', 'Kuğu']
  },
  7: {
    title: 'Gizem, Derin Bilgelik, İçsel Arayış',
    meaning: 'Mistisizm, felsefi derinlik, yalnızlıkta arınma ve hakikat arayışı.',
    tattoo: ['Yedi gök katmanı spiralleri', 'İç içe geçen labirent yolları', 'Kozmik takımyıldızlar'],
    symbols: ['Labirent', 'Yedi Işın', 'Baykuş', 'Pleyades']
  },
  8: {
    title: 'Güç, Bolluk, Sonsuz Denge',
    meaning: 'Maddi ve manevi enerjinin döngüsü, otorite, karmik adalet ve dirayet.',
    tattoo: ['Lemniskat (sonsuzluk) döngüsü', 'Ouroboros yılanı', 'Torus enerji kafesi'],
    symbols: ['Sonsuzluk (Lemniskat)', 'Ouroboros', 'Torus Alanı', 'Kartal']
  },
  9: {
    title: 'Evrensel İnsan, Tamamlanma, Ruhani Olgunluk',
    meaning: 'Yüksek bilinç, merhamet, döngüleri kapatma ve yeni çağa köprü kurma.',
    tattoo: ['Tamamlanmış mandala çemberleri', 'Ufka açılan kapı formları', 'Yıldız tohumu dizilimleri'],
    symbols: ['Enneagram Dairesi', 'Tam Açılmış Nilüfer', 'Anka Kuşu', 'Girdap Spiral']
  },
  11: {
    title: 'Usta Sayı 11: Sezgisel Işık Elçisi',
    meaning: 'Yüksek sezgi, aydınlanma, vizyoner ilham ve iki dünya arasında köprü.',
    tattoo: ['Çift sütun (Jachin & Boaz)', 'Paralel ışık hatları', 'Elektriksel ince çizgi geometrisi'],
    symbols: ['Çift Sütun', 'Şimşek', 'Üçüncü Göz Geometrisi', 'Kuzgun']
  },
  22: {
    title: 'Usta Sayı 22: Büyük Mimar & İnşa Edici',
    meaning: 'Hayalleri fiziki gerçekliğe dönüştürme gücü, evrensel yapı ustası.',
    tattoo: ['Metatron Küpü', 'Perspektifli sacred geometry', 'Katı kristal ızgaralar'],
    symbols: ['Metatron Küpü', 'Merkaba', 'Kristal Kafes', 'Antik Pusula']
  },
  33: {
    title: 'Usta Sayı 33: Evrensel Şifacı & Sevgi Öğretmeni',
    meaning: 'Koşulsuz şefkat, insanlığa adanmış ruhsal hizmet ve koruyucu aura.',
    tattoo: ['Altın oran kalpleri', 'Aura taçları', 'Genişleyen kutsal çiçeklenme'],
    symbols: ['Kutsal Kalp', 'Sri Yantra', 'Güneş Halosu', 'Hayat Ağacı']
  }
};

/**
 * Main Pure Function for Numerology Calculation and Comprehensive Audit Trail
 */
export function calculateNumerology(birthDate: string, fullName: string): NumerologyResult {
  // Edge Case Flags
  let hasZeroDigits = false;
  let isSingleDigitInput = false;
  let isLeapYearOrTransition = false;
  let isEmptyNameFallback = false;
  let isEmptyDateFallback = false;

  // =========================================================================
  // 1. DOĞUM TARİHİ KÖKENLİ HESAPLAMALAR (YAŞAM YOLU, DOĞUM GÜNÜ, TUTUM)
  // =========================================================================
  let yearVal = 2000;
  let monthVal = 1;
  let dayVal = 1;

  if (birthDate && birthDate.includes('-')) {
    const parts = birthDate.split('-');
    yearVal = parseInt(parts[0], 10) || 2000;
    monthVal = parseInt(parts[1], 10) || 1;
    dayVal = parseInt(parts[2], 10) || 1;
    if (birthDate.includes('0')) hasZeroDigits = true;
    if (monthVal === 12 && dayVal === 31) isLeapYearOrTransition = true;
    if (monthVal === 2 && dayVal === 29) isLeapYearOrTransition = true;
  } else {
    isEmptyDateFallback = true;
  }

  // A) Period Cycles (Dönem Döngüleri İndirgemesi - Goodwin & Decoz Metodu)
  const rYear = reduceWithSteps(yearVal);
  const rMonth = reduceWithSteps(monthVal);
  const rDay = reduceWithSteps(dayVal);

  const sumOfCycles = rYear.value + rMonth.value + rDay.value;
  const finalLifePathReduction = reduceWithSteps(sumOfCycles);
  const lifePathNumber = finalLifePathReduction.value;
  const isLifePathMaster = finalLifePathReduction.isMaster;

  const dateCycles: {
    year: NumerologyBirthCycleTrace;
    month: NumerologyBirthCycleTrace;
    day: NumerologyBirthCycleTrace;
    sumOfCycles: number;
    finalLifePath: number;
    isMaster: boolean;
    reductionSteps: string[];
  } = {
    year: {
      original: yearVal,
      reduced: rYear.value,
      isMaster: rYear.isMaster,
      reductionSteps: rYear.steps
    },
    month: {
      original: monthVal,
      reduced: rMonth.value,
      isMaster: rMonth.isMaster,
      reductionSteps: rMonth.steps
    },
    day: {
      original: dayVal,
      reduced: rDay.value,
      isMaster: rDay.isMaster,
      reductionSteps: rDay.steps
    },
    sumOfCycles,
    finalLifePath: lifePathNumber,
    isMaster: isLifePathMaster,
    reductionSteps: [
      `Dönem 1 (Yıl): ${yearVal} -> ${rYear.value}`,
      `Dönem 2 (Ay): ${monthVal} -> ${rMonth.value}`,
      `Dönem 3 (Gün): ${dayVal} -> ${rDay.value}`,
      `Döngü Toplamı: ${rYear.value} + ${rMonth.value} + ${rDay.value} = ${sumOfCycles}`,
      ...finalLifePathReduction.steps
    ]
  };

  // B) Straight Sum Comparison (Bütünsel Basamak Toplamı)
  const dateDigitsString = `${yearVal}${monthVal < 10 ? '0' + monthVal : monthVal}${dayVal < 10 ? '0' + dayVal : dayVal}`;
  const straightDigits = dateDigitsString.split('').map(d => parseInt(d, 10));
  const straightSum = straightDigits.reduce((acc, d) => acc + d, 0);
  const straightReduced = reduceWithSteps(straightSum);
  const matchesPeriodCycles = straightReduced.value === lifePathNumber;
  const straightSumExplanation = matchesPeriodCycles
    ? `Düz toplam (${straightSum} -> ${straightReduced.value}) dönem döngüleri metoduyla aynı sonucu üretti.`
    : `Düz toplam (${straightSum} -> ${straightReduced.value}) ile Dönem Döngüleri metodu (${lifePathNumber}) farklılık gösterdi. Pitagorik standart olan Dönem Döngüleri (${lifePathNumber}) esas alındı.`;

  // C) Ek Doğum Tarihi Sayıları (Doğum Günü Sayısı & Tutum Sayısı)
  const birthdayReduction = reduceWithSteps(dayVal);
  const birthdayNumber = birthdayReduction.value;
  const isBirthdayMaster = birthdayReduction.isMaster;

  const attitudeRawSum = dayVal + monthVal;
  const attitudeReduction = reduceWithSteps(attitudeRawSum);
  const attitudeNumber = attitudeReduction.value;

  // =========================================================================
  // 2. İSİM KÖKENLİ HESAPLAMALAR (İFADE, RUH ARZUSU, KİŞİLİK)
  // =========================================================================
  const normalizedName = normalizeTurkishText(fullName);
  let hasTurkishSpecialChars = false;
  if (/[çğışöü]/i.test(fullName)) {
    hasTurkishSpecialChars = true;
  }

  const rawWords = normalizedName.split(/\s+/).filter(Boolean);
  const wordTraces: NumerologyWordTrace[] = [];
  const allLetterTraces: NumerologyLetterTrace[] = [];

  let expressionRawSum = 0;
  let soulUrgeRawSum = 0;
  let personalityRawSum = 0;

  if (rawWords.length === 0) {
    isEmptyNameFallback = true;
    expressionRawSum = 1;
    soulUrgeRawSum = 1;
    personalityRawSum = 0;
  } else {
    for (const word of rawWords) {
      let wordSum = 0;
      let wordVowelSum = 0;
      let wordConsonantSum = 0;
      const wordLetterTraces: NumerologyLetterTrace[] = [];

      for (let i = 0; i < word.length; i++) {
        const char = word[i];
        const val = PYTHAGOREAN_MAP[char] || 0;
        const isVowel = TURKISH_VOWELS.has(char);
        const letterType: 'vowel' | 'consonant' = isVowel ? 'vowel' : 'consonant';

        const trace: NumerologyLetterTrace = {
          char,
          originalChar: char,
          value: val,
          isVowel,
          letterType
        };

        wordLetterTraces.push(trace);
        allLetterTraces.push(trace);

        wordSum += val;
        expressionRawSum += val;

        if (isVowel) {
          wordVowelSum += val;
          soulUrgeRawSum += val;
        } else {
          wordConsonantSum += val;
          personalityRawSum += val;
        }
      }

      const wordRed = reduceWithSteps(wordSum);
      wordTraces.push({
        word,
        letterTraces: wordLetterTraces,
        wordSum,
        wordReduced: wordRed.value,
        vowelSum: wordVowelSum,
        consonantSum: wordConsonantSum
      });
    }
  }

  // İsim toplamlarının tek basamağa veya usta sayıya indirgenmesi
  const exprReduction = reduceWithSteps(expressionRawSum);
  const expressionNumber = exprReduction.value;
  const isExpressionMaster = exprReduction.isMaster;

  const soulReduction = reduceWithSteps(soulUrgeRawSum || 1);
  const soulUrgeNumber = soulReduction.value;
  const isSoulUrgeMaster = soulReduction.isMaster;

  const persReduction = reduceWithSteps(personalityRawSum || 1);
  const personalityNumber = persReduction.value;
  const isPersonalityMaster = persReduction.isMaster;

  if (allLetterTraces.length === 1) {
    isSingleDigitInput = true;
  }

  // =========================================================================
  // 3. BİLEŞİK / SENTEZ SAYI (OLGUNLUK SAYISI = YAŞAM YOLU + İFADE)
  // =========================================================================
  const maturityRawSum = lifePathNumber + expressionNumber;
  const maturityReduction = reduceWithSteps(maturityRawSum);
  const maturityNumber = maturityReduction.value;
  const isMaturityMaster = maturityReduction.isMaster;

  // Master Sayı Tespiti
  const masterNumbersFound: number[] = [];
  if (isLifePathMaster) masterNumbersFound.push(lifePathNumber);
  if (isExpressionMaster) masterNumbersFound.push(expressionNumber);
  if (isSoulUrgeMaster) masterNumbersFound.push(soulUrgeNumber);
  if (isPersonalityMaster) masterNumbersFound.push(personalityNumber);
  if (isMaturityMaster) masterNumbersFound.push(maturityNumber);
  if (isBirthdayMaster) masterNumbersFound.push(birthdayNumber);

  // Tema Bilgileri
  const lpInfo = NUMEROLOGY_THEMES[lifePathNumber] || NUMEROLOGY_THEMES[1];
  const expInfo = NUMEROLOGY_THEMES[expressionNumber] || NUMEROLOGY_THEMES[1];
  const suInfo = NUMEROLOGY_THEMES[soulUrgeNumber] || NUMEROLOGY_THEMES[1];
  const perInfo = NUMEROLOGY_THEMES[personalityNumber] || NUMEROLOGY_THEMES[1];
  const matInfo = NUMEROLOGY_THEMES[maturityNumber] || NUMEROLOGY_THEMES[1];

  const uniqueSymbols = Array.from(
    new Set([...lpInfo.symbols, ...expInfo.symbols, ...suInfo.symbols])
  );

  const uniqueTattooThemes = Array.from(
    new Set([...lpInfo.tattoo, ...expInfo.tattoo, ...matInfo.tattoo])
  );

  // =========================================================================
  // 4. DENETLENEBİLİR AUDIT TRAIL OLUŞTURULMASI
  // =========================================================================
  const auditTrail: NumerologyAuditTrail = {
    system: 'Batı Pitagorik Sistemi (Western Pythagorean Period Cycle Reduction)',
    masterNumbersPreserved: [11, 22, 33],
    inputRawName: fullName,
    inputRawBirthDate: birthDate,
    normalizedName,
    dateCycles,
    straightSumComparison: {
      digits: straightDigits,
      sum: straightSum,
      reduced: straightReduced.value,
      isMaster: straightReduced.isMaster,
      reductionSteps: straightReduced.steps,
      matchesPeriodCycles,
      explanation: straightSumExplanation
    },
    nameAnalysis: {
      words: wordTraces,
      allLetters: allLetterTraces,
      totalLetterCount: allLetterTraces.length,
      vowelCount: allLetterTraces.filter(l => l.isVowel).length,
      consonantCount: allLetterTraces.filter(l => !l.isVowel).length,
      expressionRawSum,
      expressionReduced: expressionNumber,
      expressionReductionSteps: exprReduction.steps,
      soulUrgeRawSum,
      soulUrgeReduced: soulUrgeNumber,
      soulUrgeReductionSteps: soulReduction.steps,
      personalityRawSum,
      personalityReduced: personalityNumber,
      personalityReductionSteps: persReduction.steps
    },
    synthesisNumbers: {
      lifePath: lifePathNumber,
      expression: expressionNumber,
      soulUrge: soulUrgeNumber,
      personality: personalityNumber,
      maturity: {
        formula: 'Yaşam Yolu + İfade Sayısı',
        rawSum: maturityRawSum,
        reduced: maturityNumber,
        isMaster: isMaturityMaster
      },
      birthdayNumber: {
        formula: 'Doğum Günü (1-31) İndirgemesi',
        rawDay: dayVal,
        reduced: birthdayNumber,
        isMaster: isBirthdayMaster
      },
      attitudeNumber: {
        formula: 'Gün + Ay İndirgemesi (Güneş / Tutum Sayısı)',
        rawSum: attitudeRawSum,
        reduced: attitudeNumber,
        isMaster: attitudeReduction.isMaster
      }
    },
    provenance: {
      dateOriginCount: 3, // Yaşam Yolu, Doğum Günü, Tutum
      nameOriginCount: 3, // İfade, Ruh Arzusu, Kişilik
      synthesisOriginCount: 1, // Olgunluk
      isolationGuaranteed: true
    },
    edgeCaseFlags: {
      hasZeroDigits,
      isSingleDigitInput,
      isLeapYearOrTransition,
      isMasterNumberFound: masterNumbersFound.length > 0,
      hasTurkishSpecialChars,
      isEmptyNameFallback,
      isEmptyDateFallback
    },
    calculatedAt: new Date().toISOString()
  };

  return {
    lifePathNumber,
    expressionNumber,
    soulUrgeNumber,
    personalityNumber,
    maturityNumber,
    birthdayNumber,
    attitudeNumber,
    isMasterNumber: {
      lifePath: isLifePathMaster,
      expression: isExpressionMaster,
      soulUrge: isSoulUrgeMaster,
      personality: isPersonalityMaster,
      maturity: isMaturityMaster,
      birthday: isBirthdayMaster
    },
    explanations: {
      lifePath: `${lifePathNumber} - ${lpInfo.title}: ${lpInfo.meaning}`,
      expression: `${expressionNumber} - ${expInfo.title}: Yetenekler ve dünyevi dışa vurum kanalı.`,
      soulUrge: `${soulUrgeNumber} - ${suInfo.title}: Kalbin en derin ve saklı manevi arzusu.`,
      personality: `${personalityNumber} - ${perInfo.title}: İlk bakışta çevreye yansıyan manyetik auratik etki.`,
      maturity: `${maturityNumber} - ${matInfo.title}: Hayatın ikinci yarısında olgunlaşan nihai misyon.`,
      birthday: `${birthdayNumber}: Doğum gününüzün (ayın ${dayVal}. günü) getirdiği doğal yetenek.`,
      attitude: `${attitudeNumber}: Zorluklar karşısında sergilenen içsel refleks ve ilk izlenim tutumu.`
    },
    symbolicMeanings: [
      `Yaşam Yolu (${lifePathNumber}): ${lpInfo.meaning}`,
      `İfade Sayısı (${expressionNumber}): ${expInfo.meaning}`,
      `Ruh Arzusu (${soulUrgeNumber}): ${suInfo.meaning}`
    ],
    tattooThemes: uniqueTattooThemes,
    auditTrail
  };
}
