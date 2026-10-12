/**
 * Ebced & Mizan Balance Calculation Engine (Refactored & Transparent)
 * 
 * STANDARDS & METHODOLOGY:
 * 1. Ebced-i Kebir (Büyük Ebced): Klasik 28 harfli Cemel-i Kebir harf matrisi
 * 2. Farsça & Osmanlı Ekleri: Pe (2), Çim (3), Je (7), Gef/Gaf (20)
 * 3. Türkçe Fonetik Normalizasyon: 
 *    - Küçük harfe çevirme, Türkçe I/İ, Ç, Ğ, Ö, Ş, Ü desteği
 *    - Birleşik isimler, çift isimler ve boşluklar temizlenir; her harf sırayla işlenir
 * 4. Anne Adı Entegrasyonu:
 *    - İsim ve anne adı ayrık olarak hesaplanır
 *    - Anne adı YALNIZCA Mizan sayısal ağırlığını ve element dengesini oluşturmak için kullanılır
 *    - KESİNLİKLE sonuç nesnesine string olarak sızdırılmaz, dövme sembollerine veya promptlara eklenmez
 * 5. Eksik İsim / Anne Adı Durumu:
 *    - Tanımlı denetim kaydı oluşturulur; gizlice uydurma değer verilmez
 *    - Anne adı yoksa anne Ebcedi 0 olarak net biçimde kaydedilir ve auditTrail'e bildirilir
 * 6. Şeffaf ve Denetlenebilir Harf Dökümü:
 *    - Her harfin Arapça karşılığı, değeri ve elementi `auditTrail.clientBreakdown` altında saklanır
 */

import { EbcedResult, ClassicalElement, EbcedCharTrace, EbcedAuditTrail } from '../types';
import { EBCED_STANDARDS_TABLE, ESMA_MIZAN_AXES } from '../data/ebcedData';

/**
 * İsmi standart Türkçe fonetik kuralına göre küçük harfe ve temiz karaktere dönüştürür.
 * Boşluklar, tireler, apostroflar (örn: Ali Can, Gül-Nihal, Mehmed'e) temizlenir.
 */
export function normalizeEbcedInput(rawName?: string): string {
  if (!rawName || typeof rawName !== 'string') return '';
  return rawName
    .toLocaleLowerCase('tr-TR')
    .trim()
    .replace(/[^abcçdefgğhıijklmnoöprsştuüvyz]/g, '');
}

/**
 * Tek bir harfin Ebced ve Mizan element değerini döndürür.
 */
export function getCharEbcedInfo(char: string) {
  return EBCED_STANDARDS_TABLE[char.toLowerCase()];
}

/**
 * Ana Ebced ve Mizan Hesaplama Fonksiyonu
 */
export function calculateEbced(clientName: string, motherName?: string): EbcedResult {
  const cleanClient = normalizeEbcedInput(clientName);
  const cleanMother = normalizeEbcedInput(motherName);

  const isClientEmpty = cleanClient.length === 0;
  const isMotherEmpty = cleanMother.length === 0;

  let clientEbced = 0;
  let motherEbced = 0;

  const elementCounts = {
    Ateş: 0,
    Hava: 0,
    Su: 0,
    Toprak: 0
  };

  const clientBreakdown: EbcedCharTrace[] = [];

  // 1. Danışan İsmi Harf Dökümü ve Puanlaması
  for (let i = 0; i < cleanClient.length; i++) {
    const ch = cleanClient[i];
    const def = EBCED_STANDARDS_TABLE[ch];
    if (def) {
      clientEbced += def.numericValue;
      elementCounts[def.element] += def.numericValue;
      clientBreakdown.push({
        index: i + 1,
        rawChar: ch,
        normalizedChar: ch,
        arabicLetter: def.arabicLetter,
        arabicName: def.arabicName,
        value: def.numericValue,
        element: def.element,
        sourceRole: 'client'
      });
    }
  }

  // 2. Anne Adı Sayısal Katkısı (Metin sızdırılmaz, yalnızca sayısal Mizan dengesi hesaplanır)
  for (let i = 0; i < cleanMother.length; i++) {
    const ch = cleanMother[i];
    const def = EBCED_STANDARDS_TABLE[ch];
    if (def) {
      motherEbced += def.numericValue;
      elementCounts[def.element] += def.numericValue;
    }
  }

  const totalEbced = clientEbced + motherEbced;

  // 3. Baskın Mizan Unsurunun Belirlenmesi
  const sortedElements = (Object.entries(elementCounts) as [ClassicalElement, number][])
    .sort((a, b) => b[1] - a[1]);

  const dominant = sortedElements[0] && sortedElements[0][1] > 0 ? sortedElements[0][0] : 'Ateş';

  // 4. Mizan Esma Ekseni Eşleşmesi
  const axis = ESMA_MIZAN_AXES.find(a => totalEbced <= a.threshold) || ESMA_MIZAN_AXES[ESMA_MIZAN_AXES.length - 1];

  // 5. Sembolik Anahtar Kelimeler
  const symbolicKeywords = [
    `Mizan Unsuru: ${dominant}`,
    `Sayısal Frekans: ${totalEbced}`,
    `Denge Karakteri: ${
      dominant === 'Ateş' ? 'Kıvılcım & Dönüştürücü İrade' :
      dominant === 'Su' ? 'Şifa & Sezgisel Akışkanlık' :
      dominant === 'Hava' ? 'Fikir & Ruhsal İletişim' : 'Köklenme & Somut Mimari'
    }`
  ];

  // 6. Şeffaf ve Denetlenebilir İz Kaydı (Audit Trail)
  const auditTrail: EbcedAuditTrail = {
    methodology: 'Büyük Ebced (Ebced-i Kebir / Cemel-i Kebir) & Osmanlı Farsça Ekleri (Pe, Çim, Je, Gef)',
    clientRawInput: clientName || '',
    motherRawInputProvided: !isMotherEmpty,
    clientNormalized: cleanClient,
    motherNormalizedLength: cleanMother.length,
    clientCharCount: cleanClient.length,
    motherCharCount: cleanMother.length,
    clientBreakdown,
    isClientNameEmpty: isClientEmpty,
    isMotherNameEmpty: isMotherEmpty,
    calculatedAt: new Date().toISOString(),
    privacyNotice: 'Anne adı yalnızca sayısal frekans mizanı için hesaplanmıştır; gizlilik gereği metin olarak saklanmaz veya tasarıma aktarılmaz.'
  };

  return {
    clientNameEbced: clientEbced,
    motherNameEbced: motherEbced,
    totalEbced,
    mizanElementBalance: {
      ates: elementCounts['Ateş'],
      hava: elementCounts['Hava'],
      su: elementCounts['Su'],
      toprak: elementCounts['Toprak']
    },
    dominantMizanElement: dominant,
    esmaAxisTitle: axis.title,
    symbolicKeywords,
    auditTrail
  };
}
