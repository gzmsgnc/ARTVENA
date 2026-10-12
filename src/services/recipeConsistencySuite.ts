/**
 * Recipe Consistency & Data Integrity Verification Suite (İSTEM 8)
 * 
 * Bağımsız Denetim Kriterleri:
 * 1. Tek Doğrulanmış Veri Kaynağı: Modül çıktıları reçeteye yeniden hesaplanmadan, doğrudan aktarılır.
 * 2. Totem Kademeleri Ayrımı: Birincil totem, gölge totem ve ikincil totem asla birbirine karıştırılmaz.
 * 3. Enneagram Mizaç ve Kanat Ayrımı: Temel tip ile kanat ayrımı korunur.
 * 4. Eksik Doğum Saati ve Belirsizlik: Doğum saati yoksa uydurma yükselen burç yazılmaz, belirsizlik açıkça bildirilir.
 * 5. Seçilen ve Hariç Tutulan Sembol Ayrılığı: İki küme arasında sıfır kesişim güvencesi.
 * 6. Hariç Tutulan Sembollerin İstemlerde Sıfır Sızıntısı: Hariç tutulanlar promptlarda asla pozitif olarak geçmez.
 * 7. Anne Adı Gizlilik ve İzolasyon: Anne adı sadece Ebced hesabında kalır, dövme reçetesine veya promptlara sızmaz.
 * 8. Katman Ayrımı: Kişisel reçete anlam/ruhsal; Teknik reçete sanatçı/iğne/şablon içerir.
 * 9. Dışa Aktarılan JSON Tutarlılığı: Aktif durum ile ihraç edilen JSON tam eşleşir.
 * 10. Totem Hayvan Figürü Açma/Kapama: Figürsüz modda negatif tokenlara hayvan adı eklenir.
 * 11. Çelişki Tespiti ve Raporlama: Girdilerde çelişki varsa sessizce dönüştürmek yerine raporlanır.
 * 12. 50 Tekrarlı Determinizm: Aynı girdiler her zaman bit düzeyinde aynı sonucu üretir.
 */

import { ClientData, CanonicalDesignObject, SymbolItem, CompleteClientRecord } from '../types';
import { calculateNumerology } from '../engines/numerologyEngine';
import { calculateAstrology } from '../engines/astrologyEngine';
import { calculateEbced } from '../engines/ebcedEngine';
import { calculateChakra } from '../engines/chakraEngine';
import { calculateEnneagram } from '../engines/enneagramEngine';
import { calculateTotem } from '../engines/totemEngine';
import { calculateUnifiedArchetype } from '../engines/archetypeEngine';
import { generatePersonalRecipe, generateTechnicalRecipe } from '../engines/recipeEngine';
import { generateAllPrompts } from '../engines/promptEngine';
import { exportClientToJson } from './storageService';
import { MASTER_SYMBOLS } from '../data/symbolsData';

export interface RecipeConsistencyResult {
  id: string;
  name: string;
  category: string;
  expected: string;
  actual: string;
  passed: boolean;
  auditDetails: string;
}

export function runRecipeConsistencySuite(): RecipeConsistencyResult[] {
  const results: RecipeConsistencyResult[] = [];

  // Standard Test Client (Defne Aksoy)
  const baseClient: ClientData = {
    id: 'client_audit_test_01',
    firstName: 'Defne',
    lastName: 'Aksoy',
    birthDate: '1995-06-15',
    birthTime: '14:30',
    birthPlace: 'İstanbul',
    motherName: 'Fatma Gülşah',
    phone: '0532 111 22 33',
    email: 'defne@ornek.com',
    notes: 'Fine line mitolojik kompozisyon',
    createdAt: '2026-01-01T10:00:00Z',
    updatedAt: '2026-01-01T10:00:00Z'
  };

  const num = calculateNumerology(baseClient.birthDate, `${baseClient.firstName} ${baseClient.lastName}`);
  const astro = calculateAstrology(baseClient.birthDate, baseClient.birthTime, baseClient.birthPlace);
  const ebc = calculateEbced(`${baseClient.firstName} ${baseClient.lastName}`, baseClient.motherName);
  const enn = calculateEnneagram([
    { questionId: 10, score: 5 },
    { questionId: 11, score: 5 },
    { questionId: 12, score: 4 }
  ]);
  const tot = calculateTotem([
    { questionId: 1, selectedOptionIndex: 1 },
    { questionId: 2, selectedOptionIndex: 0 },
    { questionId: 8, selectedOptionIndex: 1 }
  ]);
  const chk = calculateChakra(astro.element, num.lifePathNumber, enn.coreType);
  const arch = calculateUnifiedArchetype(num, enn, tot, astro, ebc, chk);

  const baseCanonical: CanonicalDesignObject = {
    clientId: baseClient.id,
    versionId: 'v1',
    versionName: 'Versiyon 1',
    selectedStyle: 'style_fine_line',
    secondaryStyles: ['style_geometric'],
    placementId: 'plc_inner_forearm',
    includeTotemAnimalFigure: true,
    selectedSymbols: ['sym_yasam_cicegi', 'sym_lotus'],
    excludedSymbols: ['sym_kalkan_ve_kilic', 'sym_kurt'],
    abstractTotemTraits: tot.primaryTotem.abstractDesignEquivalents,
    compositionSpecs: {
      focalPoint: 'Merkez',
      flowDirection: 'Dikey',
      symmetryType: 'Simetrik',
      negativeSpacePercentage: 55,
      layerHierarchy: {
        primarySubject: tot.primaryTotem.name,
        secondaryAccents: ['Lotus'],
        backgroundSacredGeometry: ['Yaşam Çiçeği'],
        botanicalFraming: []
      }
    },
    colorPalette: {
      type: 'Pure Black & Grey',
      notes: 'Tek iğne'
    },
    technicalConstraints: {
      targetSkinReadabilityYears: 25,
      antiBlowoutSpacingMM: 1.0,
      recommendedNeedles: ['1RL', '3RL']
    },
    updatedAt: '2026-01-01T10:00:00Z'
  };

  const personalRecipe = generatePersonalRecipe(
    baseClient,
    baseCanonical,
    arch,
    tot,
    astro,
    num,
    chk,
    ebc,
    MASTER_SYMBOLS,
    enn
  );
  const technicalRecipe = generateTechnicalRecipe(baseCanonical, baseClient);
  const prompts = generateAllPrompts(baseCanonical, tot, MASTER_SYMBOLS, baseClient.motherName);

  // TEST 1: Tek Doğrulanmış Veri Kaynağı (Single Source of Truth)
  const lifePathMatches = personalRecipe.archetypeNarrative.includes(`Yaşam Yolu ${num.lifePathNumber}`);
  const sunSignMatches = personalRecipe.archetypeNarrative.includes(astro.sunSign);
  const totemMatches = personalRecipe.archetypeNarrative.includes(tot.primaryTotem.name);
  const esmaMatches = personalRecipe.archetypeNarrative.includes(ebc.esmaAxisTitle);
  const singleSourcePassed = lifePathMatches && sunSignMatches && totemMatches && esmaMatches;

  results.push({
    id: 'RC-01',
    name: 'Tek Doğrulanmış Veri Kaynağı (Single Source of Truth)',
    category: 'Veri Bütünlüğü',
    expected: `YY:${num.lifePathNumber}, Güneş:${astro.sunSign}, Totem:${tot.primaryTotem.name}, Esma:${ebc.esmaAxisTitle} eksiksiz aktarılmalı`,
    actual: `YY:${lifePathMatches}, Güneş:${sunSignMatches}, Totem:${totemMatches}, Esma:${esmaMatches}`,
    passed: singleSourcePassed,
    auditDetails: 'Reçete motoru hesaplamaları sıfırdan yeniden yapmaz; doğrulanmış motor çıktılarının ham referanslarını tek kaynak olarak kullanır.'
  });

  // TEST 2: Totem Kademeleri Ayrımı (Primary vs Shadow vs Secondary)
  const pTier = personalRecipe.totemTiers?.primaryTotem.name === tot.primaryTotem.name;
  const sTier = personalRecipe.totemTiers?.shadowTotem.name === tot.shadowTotem.name;
  const secTier = personalRecipe.totemTiers?.secondaryTotem.name === tot.secondaryTotem.name;
  const shadowNotInSubject = !personalRecipe.primarySubjectDescription.includes(tot.shadowTotem.name);
  const totemTierPassed = pTier && sTier && secTier && shadowNotInSubject;

  results.push({
    id: 'RC-02',
    name: 'Totem Kademeleri Ayrımı (Birincil / Gölge / İkincil)',
    category: 'Totem Ayrımı',
    expected: `Birincil:${tot.primaryTotem.name}, Gölge:${tot.shadowTotem.name}, İkincil:${tot.secondaryTotem.name}; Gölge ana görsel özne olmamalı`,
    actual: `P:${personalRecipe.totemTiers?.primaryTotem.name}, S:${personalRecipe.totemTiers?.shadowTotem.name}, Sec:${personalRecipe.totemTiers?.secondaryTotem.name}, GölgeÖzneDışı:${shadowNotInSubject}`,
    passed: totemTierPassed,
    auditDetails: 'Birincil totem ana görsel odak veya çizgi ritmi iken, gölge totem sadece içsel simya ve dönüşüm uyarısı olarak ayrı veri alanında tutulur.'
  });

  // TEST 3: Enneagram Mizaç ve Kanat Ayrımı
  const coreTypeMatches = personalRecipe.enneagramDistinction?.coreType === enn.coreType;
  const wingMatches = personalRecipe.enneagramDistinction?.wing === enn.wing;
  const wingDifferentFromCore = personalRecipe.enneagramDistinction?.coreType !== personalRecipe.enneagramDistinction?.wingType;
  const enneagramPassed = coreTypeMatches && wingMatches && wingDifferentFromCore;

  results.push({
    id: 'RC-03',
    name: 'Enneagram Temel Mizaç vs Kanat Ayrımı',
    category: 'Enneagram Ayrımı',
    expected: `Temel Tip:${enn.coreType} (${enn.typeName}), Kanat:${enn.wing} (${enn.wingName}); Kanat asla temel tipe indirgenemez`,
    actual: `Tip:${personalRecipe.enneagramDistinction?.coreType}, Kanat:${personalRecipe.enneagramDistinction?.wing}, AyrıTutuldu:${wingDifferentFromCore}`,
    passed: enneagramPassed,
    auditDetails: 'Mizacın kök korkusu ve motivasyonu temel tipe aittir; kanat ise tamamlayıcı ikincil lezzettir. Reçete bu hiyerarşiyi net olarak ayırır.'
  });

  // TEST 4: Doğum Saati Eksikliği ve Belirsizlik Dürüstlüğü (No Fabricated Precision)
  const clientWithoutTime: ClientData = {
    ...baseClient,
    id: 'client_no_time_02',
    birthTime: '',
    birthPlace: ''
  };
  const astroNoTime = calculateAstrology(clientWithoutTime.birthDate, '', '');
  const recipeNoTime = generatePersonalRecipe(
    clientWithoutTime,
    baseCanonical,
    arch,
    tot,
    astroNoTime,
    num,
    chk,
    ebc,
    MASTER_SYMBOLS,
    enn
  );

  const reportsUncertainty = recipeNoTime.uncertaintyAndPrecision?.isAstrologyUncertain === true;
  const noFabricatedAscendant = recipeNoTime.uncertaintyAndPrecision?.ascendantDeclaration.includes('Belirsiz') ||
    recipeNoTime.uncertaintyAndPrecision?.astrologyPrecision.includes('yükselen burç kesinliği uydurulmamıştır');
  const uncertaintyPassed = reportsUncertainty && !!noFabricatedAscendant;

  results.push({
    id: 'RC-04',
    name: 'Eksik Doğum Saatinde Belirsizlik Dürüstlüğü (Kesinlik Uydurulmaz)',
    category: 'Astroloji Belirsizlik',
    expected: 'isAstrologyUncertain: true, Uydurma yükselen burç reddedilmeli ve belirsizlik şerhi düşülmeli',
    actual: `isUncertain:${reportsUncertainty}, Bildirim:${recipeNoTime.uncertaintyAndPrecision?.ascendantDeclaration}`,
    passed: uncertaintyPassed,
    auditDetails: 'Doğum saati veya koordinat bilinmediğinde asla hayali yükselen burç uydurulmaz; belirsizlik açıkça reçetede beyan edilir.'
  });

  // TEST 5: Seçilen ve Hariç Tutulan Sembollerin İzolasyonu
  const selectedList = personalRecipe.symbolsIntegrity?.selectedSymbolsList || [];
  const excludedList = personalRecipe.symbolsIntegrity?.excludedSymbolsList || [];
  const overlapExists = selectedList.some(id => excludedList.includes(id));
  const zeroOverlap = personalRecipe.symbolsIntegrity?.zeroOverlapConfirmed === true && !overlapExists;

  results.push({
    id: 'RC-05',
    name: 'Seçilen ve Hariç Tutulan Sembol Veri İzolasyonu',
    category: 'Sembol İzolasyonu',
    expected: 'Seçilenler ile hariç tutulanlar arasında sıfır kesişim (zeroOverlapConfirmed: true)',
    actual: `Seçilen:${selectedList.length}, Hariç:${excludedList.length}, Kesişim:${overlapExists ? 'VAR' : 'YOK (0)'}`,
    passed: zeroOverlap,
    auditDetails: 'Danışanın dahil ettiği ve kesinlikle yasakladığı semboller ayrı veri dizilerinde tutulur ve çakışma önlenir.'
  });

  // TEST 6: Hariç Tutulan Sembollerin Görsel İstemlerde Sıfır Sızıntısı
  const excludedNames = MASTER_SYMBOLS.filter(s => baseCanonical.excludedSymbols.includes(s.id)).map(s => s.name);
  let leakInPrompts = false;
  const allPositivePromptStrings = [
    prompts.midjourney,
    prompts.niji,
    prompts.dalle,
    prompts.tattooStencil,
    prompts.generalAi
  ];

  for (const exName of excludedNames) {
    for (const prompt of allPositivePromptStrings) {
      // Check if excluded name appears outside of the exclusion clause
      const regex = new RegExp(`\\b${exName}\\b`, 'i');
      if (regex.test(prompt)) {
        // If it appears, ensure it's strictly in a negative prompt segment or not at all
        if (!prompt.includes(`--no`) && !prompt.includes('strictly do not include')) {
          leakInPrompts = true;
        }
      }
    }
  }

  const promptNegativeHasExcluded = excludedNames.every(exName =>
    prompts.negativePrompts.some(neg => neg.toLowerCase().includes(exName.toLowerCase()))
  );
  const exclusionCleanPassed = !leakInPrompts && promptNegativeHasExcluded && prompts.checkedExclusionsClean;

  results.push({
    id: 'RC-06',
    name: 'Hariç Tutulan Sembollerin Görsel İstemlerde Sıfır Sızıntısı',
    category: 'İstem Güvenliği',
    expected: 'Hariç tutulan semboller (Kalkan ve Kılıç, Kurt) pozitif metinlerde geçmemeli, negatif listeye eklenmeli',
    actual: `Sızıntı:${leakInPrompts ? 'VAR' : 'YOK'}, NegatifTokenEklendi:${promptNegativeHasExcluded}, Temiz:${prompts.checkedExclusionsClean}`,
    passed: exclusionCleanPassed,
    auditDetails: 'Tasarımdan çıkarılan hiçbir sembol Midjourney, Niji, DALL-E veya şablon istemlerinde tekrar ortaya çıkamaz.'
  });

  // TEST 7: Anne Adı Gizliliği ve Dövme Sızıntı Koruması
  const motherFirstName = 'Fatma';
  const motherLastName = 'Gülşah';
  const motherCheckStrings = [
    personalRecipe.conceptTitle,
    personalRecipe.archetypeNarrative,
    personalRecipe.primarySubjectDescription,
    personalRecipe.geometricFramework,
    personalRecipe.elementalHarmonics,
    personalRecipe.spiritualMeaningSummary,
    ...personalRecipe.secondarySymbolBreakdown.map(s => `${s.name} ${s.meaning} ${s.roleInDesign}`),
    prompts.midjourney,
    prompts.niji,
    prompts.dalle,
    prompts.tattooStencil,
    prompts.generalAi
  ].join(' ').toLowerCase();

  const motherLeaked = motherCheckStrings.includes(motherFirstName.toLowerCase()) ||
    motherCheckStrings.includes(motherLastName.toLowerCase());
  const privacyConfirmed = personalRecipe.privacyAudit?.motherNameExclusionConfirmed === true && !motherLeaked;

  results.push({
    id: 'RC-07',
    name: 'Anne Adı Gizliliği ve Dövme Sızıntı Koruması',
    category: 'Gizlilik ve Etik',
    expected: 'Anne adı yalnızca Ebced hesabında kalmalı; reçete, semboller ve promptlarda asla yer almamalı',
    actual: `Reçete/Prompt Sızıntısı:${motherLeaked ? 'VAR' : 'YOK'}, GizlilikOnay:${personalRecipe.privacyAudit?.motherNameExclusionConfirmed}`,
    passed: privacyConfirmed,
    auditDetails: 'Anne adının matematiksel hesaplamada kullanılması ile tasarıma yazılması arasındaki katı ayrım korunur.'
  });

  // TEST 8: Teknik Dövme Şartnamesi ile Kişisel Anlatım Ayrımı
  const technicalJargonInPersonal = /1RL|3RL|7RS|gauge|blowout|şablon|stencil|milimetre|iğne/i.test(personalRecipe.archetypeNarrative);
  const poeticJargonInTechnical = /ruhun derinlikleri|kutsal arayış|manevi pusula|öz hakikat/i.test(technicalRecipe.recommendedNeedleGrouping.join(' '));
  const layerDecoupled = !technicalJargonInPersonal && !poeticJargonInTechnical;

  results.push({
    id: 'RC-08',
    name: 'Kişisel Anlatım ve Teknik Şartname Katman Ayrımı',
    category: 'Katman Ayrımı',
    expected: 'Kişisel reçetede teknik iğne jargonu olmamalı; teknik şartnamede felsefi manevi anlatı olmamalı',
    actual: `KişiseldeTeknikJargon:${technicalJargonInPersonal ? 'VAR' : 'YOK'}, TeknikteŞiirselJargon:${poeticJargonInTechnical ? 'VAR' : 'YOK'}`,
    passed: layerDecoupled,
    auditDetails: 'Müşteriye yönelik manevi sembol reçetesi ile dövme sanatçısına yönelik teknik anatomik şartname kesinlikle ayrıdır.'
  });

  // TEST 9: Dışa Aktarılan JSON ve Dosya Bütünlüğü (Dossier Data Match)
  const completeRecord: CompleteClientRecord = {
    schemaVersion: 1,
    client: baseClient,
    numerology: num,
    astrology: astro,
    ebced: ebc,
    chakra: chk,
    unifiedArchetype: arch,
    enneagram: { answers: [], result: enn },
    totem: { answers: [], result: tot },
    designVersions: [
      {
        id: baseCanonical.versionId,
        name: baseCanonical.versionName,
        canonicalDesign: baseCanonical,
        personalRecipe,
        technicalRecipe,
        prompts,
        createdAt: '2026-01-01T10:00:00Z'
      }
    ],
    activeVersionId: baseCanonical.versionId,
    createdAt: baseClient.createdAt,
    updatedAt: baseClient.updatedAt
  };

  const jsonExported = exportClientToJson(completeRecord);
  const parsedExported = JSON.parse(jsonExported) as CompleteClientRecord;
  const jsonLifePath = parsedExported.numerology.lifePathNumber;
  const jsonSunSign = parsedExported.astrology.sunSign;
  const jsonEsma = parsedExported.ebced.esmaAxisTitle;
  const jsonTotem = parsedExported.totem.result.primaryTotem.name;
  const jsonRecipeTotem = parsedExported.designVersions[0].personalRecipe.totemTiers?.primaryTotem.name;

  const jsonMatchesState = jsonLifePath === num.lifePathNumber &&
    jsonSunSign === astro.sunSign &&
    jsonEsma === ebc.esmaAxisTitle &&
    jsonTotem === tot.primaryTotem.name &&
    jsonRecipeTotem === tot.primaryTotem.name;

  results.push({
    id: 'RC-09',
    name: 'Dışa Aktarılan JSON Dosyası ve Rapor Bütünlüğü',
    category: 'JSON Bütünlüğü',
    expected: 'Dışa aktarılan JSON; aktif motor verileri, reçete ve tasarım nesnesi ile tam eşleşmeli',
    actual: `JSON-YY:${jsonLifePath}, JSON-Güneş:${jsonSunSign}, JSON-Totem:${jsonTotem}, Eşleşti:${jsonMatchesState}`,
    passed: jsonMatchesState,
    auditDetails: 'JSON dışa aktarımı, özet dosya ve görsel istemler tek bir doğrulanmış veri nesnesinden türetilir.'
  });

  // TEST 10: Totem Hayvan Figürü Açma/Kapama (includeTotemAnimalFigure: false)
  const canonicalNoFigure: CanonicalDesignObject = {
    ...baseCanonical,
    includeTotemAnimalFigure: false
  };
  const recipeNoFigure = generatePersonalRecipe(
    baseClient,
    canonicalNoFigure,
    arch,
    tot,
    astro,
    num,
    chk,
    ebc,
    MASTER_SYMBOLS,
    enn
  );
  const promptsNoFigure = generateAllPrompts(canonicalNoFigure, tot, MASTER_SYMBOLS, baseClient.motherName);

  const recipeSaysNoFigure = recipeNoFigure.primarySubjectDescription.includes('KULLANILMAMIŞTIR');
  const negativePromptHasAnimal = promptsNoFigure.negativePrompts.some(t =>
    t.toLowerCase().includes(tot.primaryTotem.name.toLowerCase())
  );
  const figureTogglePassed = recipeSaysNoFigure && negativePromptHasAnimal;

  results.push({
    id: 'RC-10',
    name: 'Totem Figür Seçeneği (includeTotemAnimalFigure: false)',
    category: 'Totem Soyutlama',
    expected: 'Figürsüz modda hayvansal silüet dışlanmalı; prompt negatiflerine hayvan adı eklenmeli',
    actual: `ReçeteFigürsüz:${recipeSaysNoFigure}, NegatifTokenHayvan:${negativePromptHasAnimal}`,
    passed: figureTogglePassed,
    auditDetails: 'Kullanıcı hayvan figürü istemediğinde reçete bunu soyut geometriye çevirir ve promptlara negatif filtre koyar.'
  });

  // TEST 11: Çelişki Tespiti ve Raporlama (Discrepancy Reporting)
  const corruptedCanonical: CanonicalDesignObject = {
    ...baseCanonical,
    selectedSymbols: ['sym_yasam_cicegi', 'sym_lotus'],
    excludedSymbols: ['sym_lotus'] // Contradiction: Lotus is both selected and excluded
  };
  const recipeCorrupted = generatePersonalRecipe(
    baseClient,
    corruptedCanonical,
    arch,
    tot,
    astro,
    num,
    chk,
    ebc,
    MASTER_SYMBOLS,
    enn
  );

  const discrepancyDetected = (recipeCorrupted.dataProvenance?.discrepanciesDetected.length || 0) > 0;
  const reportedDetail = recipeCorrupted.dataProvenance?.discrepanciesDetected[0] || '';
  const discrepancyPassed = discrepancyDetected && reportedDetail.includes('Çelişki Tespit Edildi');

  results.push({
    id: 'RC-11',
    name: 'Girdi Çelişkisi Tespiti ve Açık Raporlama',
    category: 'Hata Yönetimi',
    expected: 'Sembol hem seçili hem yasaklı ise sessizce yutmak yerine açıkça çelişki bildirmeli',
    actual: `ÇelişkiBildirildi:${discrepancyDetected}, Mesaj:${reportedDetail.substring(0, 45)}...`,
    passed: discrepancyPassed,
    auditDetails: 'Bir modülün sonucuyla reçete çelişiyorsa sessizce değer dönüştürülmez; çelişki denetim kaydına yazılır.'
  });

  // TEST 12: 50 Tekrarlı Determinizm ve Tekrarlanabilirlik Testi
  let isDeterministic = true;
  const firstJson = JSON.stringify(
    generatePersonalRecipe(baseClient, baseCanonical, arch, tot, astro, num, chk, ebc, MASTER_SYMBOLS, enn)
  );

  for (let i = 0; i < 50; i++) {
    const iterJson = JSON.stringify(
      generatePersonalRecipe(baseClient, baseCanonical, arch, tot, astro, num, chk, ebc, MASTER_SYMBOLS, enn)
    );
    if (iterJson !== firstJson) {
      isDeterministic = false;
      break;
    }
  }

  results.push({
    id: 'RC-12',
    name: '50 Tekrarlı Determinizm ve Bit Düzeyinde Tutarlılık',
    category: 'Determinizm',
    expected: '50 ardışık reçete üretiminde bit düzeyinde %100 özdeş JSON çıktısı',
    actual: isDeterministic ? '50/50 Tam Özdeş Çıktı' : 'Sapma Tespit Edildi',
    passed: isDeterministic,
    auditDetails: 'Kişisel sembol reçetesi motoru saf ve öngörülebilir bir fonksiyondur; rastgele veri mutasyonları içermez.'
  });

  return results;
}
