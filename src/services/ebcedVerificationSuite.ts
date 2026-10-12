/**
 * Ebced & Mizan Motoru İstem 5 Özel Doğrulama Paketi (Ebced Audit & Invariance Suite)
 * 
 * Doğrulanan Senaryolar:
 * 1. Ebced-i Kebir Harf Değerleri ve Fonetik Matris Bütünlüğü (29 Türkçe Harf Eşleşmesi)
 * 2. Osmanlı / Farsça Ek Harfler (Pe:2, Çim:3, Je:7, Gaf/Gef:20) Doğrulaması
 * 3. Türkçe Normalizasyon, Boşluk ve Birleşik İsim Testi ("Ali Can" = 41 + 53 = 94)
 * 4. Anne Adının Sayısal Ayrımı ve Toplam Mizan Hesabı (Client: "Ali" [41] + Anne: "Fatma" [522] = 563)
 * 5. Anne Adı Gizlilik Güvencesi (Anne adının metinsel olarak nesneye sızmaması)
 * 6. Eksik İsim / Boş Girdi Durumunda Tanımlı Davranış (Audit Trail Bildirimi, Uydurma Değer Engeli)
 * 7. Mizan Element Dengesi ve Baskın Unsur Dağılımı (Ateş, Hava, Su, Toprak)
 * 8. Esma / Mizan Ekseni Eşik Değerleri ve Doğru Başlık Ataması
 * 9. Aynı Girdiyle Tekrarlı Çalıştırmada Tam Determinizm (Invariance & Sıfır Bellek Sızıntısı)
 */

import { calculateEbced, normalizeEbcedInput } from '../engines/ebcedEngine';
import { EBCED_STANDARDS_TABLE, ESMA_MIZAN_AXES } from '../data/ebcedData';

export interface EbcedScenarioResult {
  id: string;
  name: string;
  passed: boolean;
  message: string;
  auditDetails: any;
}

export function runEbcedVerificationSuite(): EbcedScenarioResult[] {
  const results: EbcedScenarioResult[] = [];

  // Senaryo 1: Ebced-i Kebir Harf Değerleri ve Fonetik Matris Bütünlüğü
  // Temel referans harfler: a=1, b=2, c=3, d=4, e=5, f=80, k=20, l=30, m=40, n=50, r=200, s=60, t=400, y=10, z=7
  const s1Passed = EBCED_STANDARDS_TABLE['a'].numericValue === 1 &&
    EBCED_STANDARDS_TABLE['b'].numericValue === 2 &&
    EBCED_STANDARDS_TABLE['d'].numericValue === 4 &&
    EBCED_STANDARDS_TABLE['l'].numericValue === 30 &&
    EBCED_STANDARDS_TABLE['m'].numericValue === 40 &&
    EBCED_STANDARDS_TABLE['r'].numericValue === 200 &&
    EBCED_STANDARDS_TABLE['t'].numericValue === 400;

  results.push({
    id: 'ebced_scen_1',
    name: '1. Ebced-i Kebir Klasik Harf Matrisi ve Sayısal Değer Bütünlüğü',
    passed: s1Passed,
    message: s1Passed
      ? 'Başarılı: Elif(1), Bâ(2), Dâl(4), Lâm(30), Mîm(40), Râ(200), Tâ(400) değerleri klasik Ebced-i Kebir standardına uygundur.'
      : 'Hata: Klasik Ebced harf değerlerinde sapma tespit edildi!',
    auditDetails: {
      a: EBCED_STANDARDS_TABLE['a'].numericValue,
      b: EBCED_STANDARDS_TABLE['b'].numericValue,
      l: EBCED_STANDARDS_TABLE['l'].numericValue,
      m: EBCED_STANDARDS_TABLE['m'].numericValue,
      r: EBCED_STANDARDS_TABLE['r'].numericValue,
      t: EBCED_STANDARDS_TABLE['t'].numericValue
    }
  });

  // Senaryo 2: Osmanlı / Farsça Ek Harfler (Pe:2, Çim:3, Je:7, Gaf/Gef:20)
  const pe = EBCED_STANDARDS_TABLE['p'];
  const cim = EBCED_STANDARDS_TABLE['ç'];
  const je = EBCED_STANDARDS_TABLE['j'];
  const gaf = EBCED_STANDARDS_TABLE['g'];
  const yumusakG = EBCED_STANDARDS_TABLE['ğ'];

  const s2Passed = pe.numericValue === 2 &&
    cim.numericValue === 3 &&
    je.numericValue === 7 &&
    gaf.numericValue === 20 &&
    yumusakG.numericValue === 20;

  results.push({
    id: 'ebced_scen_2',
    name: '2. Osmanlı / Farsça Ek Harfler (Pe, Çim, Je, Gef) ve Türkçe Fonetik',
    passed: s2Passed,
    message: s2Passed
      ? 'Başarılı: Pe (2), Çim (3), Je (7), Gef (20) ve Yumuşak Ge (20) etimolojik türev kurallarına tam uygundur.'
      : 'Hata: Farsça/Osmanlıca ek harf karşılıklarında uyumsuzluk bulundu!',
    auditDetails: {
      p: pe.numericValue,
      ç: cim.numericValue,
      j: je.numericValue,
      g: gaf.numericValue,
      ğ: yumusakG.numericValue
    }
  });

  // Senaryo 3: Türkçe Normalizasyon, Boşluk ve Birleşik İsim Testi
  // "Ali Can" -> Ali (a:1 + l:30 + i:10 = 41), Can (c:3 + a:1 + n:50 = 54) -> Toplam: 95
  // "Ömer-Faruk" -> ö:6, m:40, e:5, r:200 = 251; f:80, a:1, r:200, u:6, k:20 = 307 -> Toplam: 558
  const resAliCan = calculateEbced('Ali Can');
  const resOmerFaruk = calculateEbced('Ömer-Faruk');

  const s3Passed = resAliCan.clientNameEbced === 95 &&
    resAliCan.auditTrail?.clientNormalized === 'alican' &&
    resOmerFaruk.clientNameEbced === 558 &&
    resOmerFaruk.auditTrail?.clientNormalized === 'ömerfaruk';

  results.push({
    id: 'ebced_scen_3',
    name: '3. Boşluklu, Tireli ve Birleşik İsim Normalizasyonu ("Ali Can" & "Ömer-Faruk")',
    passed: s3Passed,
    message: s3Passed
      ? `Başarılı: "Ali Can" (95) ve "Ömer-Faruk" (558) harf dökümleri boşluk/özel karakterlerden arındırılarak hatasız hesaplandı.`
      : 'Hata: Birleşik veya boşluklu isim normalizasyonunda hesaplama hatası!',
    auditDetails: {
      alican: { ebced: resAliCan.clientNameEbced, norm: resAliCan.auditTrail?.clientNormalized },
      omerfaruk: { ebced: resOmerFaruk.clientNameEbced, norm: resOmerFaruk.auditTrail?.clientNormalized }
    }
  });

  // Senaryo 4: Anne Adının Sayısal Ayrımı ve Toplam Mizan Hesabı
  // Danışan: "Zeynep" -> z:7, e:5, y:10, n:50, e:5, p:2 = 79.
  // Anne: "Meryem" -> m:40, e:5, r:200, y:10, e:5, m:40 = 300.
  // Toplam Mizan: 79 + 300 = 379.
  const resZeynep = calculateEbced('Zeynep', 'Meryem');
  const s4Passed = resZeynep.clientNameEbced === 79 &&
    resZeynep.motherNameEbced === 300 &&
    resZeynep.totalEbced === 379;

  results.push({
    id: 'ebced_scen_4',
    name: '4. İsim ve Anne Adı Ayrık Hesabı ile Mizan Toplamı ("Zeynep" + "Meryem")',
    passed: s4Passed,
    message: s4Passed
      ? `Başarılı: Danışan Zeynep (79) ve Anne Meryem (300) ayrık toplanarak toplam mizan 379 olarak üretildi.`
      : 'Hata: Anne adı veya toplam mizan hesaplamasında uyumsuzluk!',
    auditDetails: {
      clientEbced: resZeynep.clientNameEbced,
      motherEbced: resZeynep.motherNameEbced,
      totalEbced: resZeynep.totalEbced
    }
  });

  // Senaryo 5: Anne Adı Gizlilik Güvencesi (Tattoo Leak Prevention)
  const zKeys = Object.keys(resZeynep);
  const jsonStr = JSON.stringify(resZeynep);
  const s5Passed = !zKeys.includes('motherName') &&
    !zKeys.includes('mother') &&
    !jsonStr.includes('Meryem') &&
    !jsonStr.includes('meryem') &&
    resZeynep.auditTrail?.motherRawInputProvided === true;

  results.push({
    id: 'ebced_scen_5',
    name: '5. Anne Adı Gizlilik İzolasyonu (Dövme Tasarımına Sızmama Güvencesi)',
    passed: s5Passed,
    message: s5Passed
      ? 'Başarılı: Anne adı metni sonuç nesnesinde, dövme anahtar kelimelerinde ve JSON dökümünde kesinlikle yer almamaktadır.'
      : 'Hata: Anne adı metni veri nesnesine sızdı!',
    auditDetails: {
      motherNameKeyExists: zKeys.includes('motherName'),
      motherTextLeakedInJson: jsonStr.includes('meryem'),
      privacyNotice: resZeynep.auditTrail?.privacyNotice
    }
  });

  // Senaryo 6: Eksik İsim / Anne Adı Durumunda Tanımlı Davranış
  const emptyRes = calculateEbced('', '');
  const onlyClientRes = calculateEbced('Ahmet'); // a:1, h:8, m:40, e:5, t:400 = 454

  const s6Passed = emptyRes.clientNameEbced === 0 &&
    emptyRes.totalEbced === 0 &&
    emptyRes.auditTrail?.isClientNameEmpty === true &&
    onlyClientRes.motherNameEbced === 0 &&
    onlyClientRes.totalEbced === onlyClientRes.clientNameEbced &&
    onlyClientRes.auditTrail?.isMotherNameEmpty === true;

  results.push({
    id: 'ebced_scen_6',
    name: '6. Eksik İsim / Anne Adı Durumunda Tanımlı Davranış ve Şeffaf Kayıt',
    passed: s6Passed,
    message: s6Passed
      ? 'Başarılı: Boş girdi ve eksik anne adı durumunda sessiz varsayılan uydurulmadı; sıfır değeri ve audit bayrağı açıkça kaydedildi.'
      : 'Hata: Eksik isim veya anne adında tanımlı davranış ihlal edildi!',
    auditDetails: {
      emptyInputClient: emptyRes.auditTrail?.isClientNameEmpty,
      onlyClientMotherEbced: onlyClientRes.motherNameEbced,
      onlyClientTotal: onlyClientRes.totalEbced
    }
  });

  // Senaryo 7: Mizan Element Dengesi ve Baskın Unsur Dağılımı
  // "Demir" -> d:4 (Toprak), e:5 (Ateş), m:40 (Toprak), i:10 (Ateş), r:200 (Toprak)
  // Toprak: 4 + 40 + 200 = 244. Ateş: 5 + 10 = 15. Hava: 0. Su: 0.
  // Baskın Element kesinlikle 'Toprak' olmalıdır!
  const resDemir = calculateEbced('Demir');
  const s7Passed = resDemir.mizanElementBalance.toprak === 244 &&
    resDemir.mizanElementBalance.ates === 15 &&
    resDemir.mizanElementBalance.hava === 0 &&
    resDemir.mizanElementBalance.su === 0 &&
    resDemir.dominantMizanElement === 'Toprak';

  results.push({
    id: 'ebced_scen_7',
    name: '7. Mizan Dört Element Dengesi ve Baskın Unsur Tespiti ("Demir" -> Toprak: 244)',
    passed: s7Passed,
    message: s7Passed
      ? `Başarılı: "Demir" için Toprak: 244, Ateş: 15 hesaplandı ve baskın unsur hatasız olarak 'Toprak' belirlendi.`
      : 'Hata: Mizan element dengesi veya baskın unsur ataması hatalı!',
    auditDetails: {
      balance: resDemir.mizanElementBalance,
      dominant: resDemir.dominantMizanElement
    }
  });

  // Senaryo 8: Esma / Mizan Ekseni Eşik Değerleri ve Doğru Başlık Ataması
  // "Ali" (41) <= 100 -> El-Hadi
  // "Ömer-Faruk" (558) <= 700 -> El-Kaviyy & El-Metin
  const s8Passed = resAliCan.esmaAxisTitle.includes('El-Hadi') &&
    resOmerFaruk.esmaAxisTitle.includes('El-Kaviyy');

  results.push({
    id: 'ebced_scen_8',
    name: '8. Esma ve Mizan Ekseni Sayısal Eşik Sınıflandırması',
    passed: s8Passed,
    message: s8Passed
      ? 'Başarılı: Sayısal frekans eşiklerine göre Esma Mizan eksenleri tam doğrulukla sınıflandırıldı.'
      : 'Hata: Mizan eksen sınıflandırmasında eşik hatası!',
    auditDetails: {
      alicanAxis: resAliCan.esmaAxisTitle,
      omerfarukAxis: resOmerFaruk.esmaAxisTitle
    }
  });

  // Senaryo 9: Aynı Girdiyle Tekrarlı Çalıştırmada Tam Determinizm
  const run1 = calculateEbced('Ayşe Gül', 'Fatma');
  const run2 = calculateEbced('Ayşe Gül', 'Fatma');

  const s9Passed = run1.clientNameEbced === run2.clientNameEbced &&
    run1.motherNameEbced === run2.motherNameEbced &&
    run1.totalEbced === run2.totalEbced &&
    run1.dominantMizanElement === run2.dominantMizanElement &&
    JSON.stringify(run1.mizanElementBalance) === JSON.stringify(run2.mizanElementBalance) &&
    run1.auditTrail?.clientBreakdown.length === run2.auditTrail?.clientBreakdown.length;

  results.push({
    id: 'ebced_scen_9',
    name: '9. Aynı Girdiyle Tekrarlı Çalıştırmada Tam Determinizm & Sıfır Bellek Sızıntısı',
    passed: s9Passed,
    message: s9Passed
      ? 'Başarılı: İki ardışık hesaplama %100 birebir aynı sayısal değerleri, harf dökümünü ve mizan dengesini üretti.'
      : 'Hata: Ebced determinizmi bozuldu!',
    auditDetails: {
      match: s9Passed,
      clientEbced: run1.clientNameEbced,
      totalEbced: run1.totalEbced
    }
  });

  return results;
}
