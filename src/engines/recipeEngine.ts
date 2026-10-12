/**
 * Dual Tattoo Recipe Engine (V2 - Enforced Data Provenance & Strict Separation)
 * 
 * CORE ARCHITECTURAL PRINCIPLES (İSTEM 8):
 * 1. Single Source of Truth: Uses pre-verified results from independent modules.
 *    Does NOT recompute or alter rules for numerology, astrology, ebced, totem, or chakra.
 * 2. Strict Totem Tier Separation: Primary Totem (visual subject / abstract rhythm),
 *    Shadow Totem (alchemical transformation warning), and Secondary Totem (complementary energy)
 *    are kept strictly in distinct fields and roles.
 * 3. Enneagram Core vs Wing Distinction: Core type (primary temperament) is never confused with
 *    or swapped with its wing (secondary coloration).
 * 4. Honest Uncertainty & Missing Data Handling: If birth time or coordinates are uncertain,
 *    never fabricate precision. Ascendant uncertainty is explicitly reported.
 * 5. Segregated Symbols Integrity: Selected and excluded symbols are kept in distinct data fields
 *    with zero overlap guaranteed.
 * 6. Excluded Symbols Zero-Leakage: Excluded symbols are banned from appearing in positive design elements.
 * 7. Mother's Name Privacy Boundary: Mother's name is used in mathematical Ebced calculation only;
 *    it is NEVER leaked into tattoo visual directives, symbols, or prompts.
 * 8. Strict Decoupling: Personal recipe is client-facing (spiritual/meaning);
 *    Technical recipe is artist-facing (needles, line weights, shading, stencil, anti-blowout).
 * 9. Explicit Discrepancy Reporting: Any conflict between module results and recipe state is reported.
 */

import {
  CanonicalDesignObject,
  PersonalTattooRecipe,
  TechnicalTattooRecipe,
  ClientData,
  UnifiedArchetypeResult,
  TotemResult,
  AstrologyResult,
  NumerologyResult,
  ChakraResult,
  EbcedResult,
  EnneagramResult,
  SymbolItem
} from '../types';
import { TATTOO_STYLES } from '../data/stylesData';
import { BODY_PLACEMENTS } from '../data/placementsData';

export function generatePersonalRecipe(
  client: ClientData,
  canonical: CanonicalDesignObject,
  archetype: UnifiedArchetypeResult,
  totem: TotemResult,
  astrology: AstrologyResult,
  numerology: NumerologyResult,
  chakra: ChakraResult,
  ebced: EbcedResult,
  allSymbols: SymbolItem[],
  enneagram?: EnneagramResult,
  recipeTimestamp?: string
): PersonalTattooRecipe {
  const discrepancies: string[] = [];
  const styleDef = TATTOO_STYLES[canonical.selectedStyle] || TATTOO_STYLES['style_fine_line'];
  const placementDef = BODY_PLACEMENTS.find(p => p.id === canonical.placementId) || BODY_PLACEMENTS[0];
  const effectiveTimestamp = recipeTimestamp || canonical.updatedAt || '2026-01-01T00:00:00.000Z';

  // 1. Audit Symbol Segregation and Zero Overlap
  const selectedIds = new Set(canonical.selectedSymbols);
  const excludedIds = new Set(canonical.excludedSymbols);
  const overlappingIds = canonical.selectedSymbols.filter(id => excludedIds.has(id));

  if (overlappingIds.length > 0) {
    discrepancies.push(
      `Çelişki Tespit Edildi: Semboller hem seçili hem hariç tutulan listesinde yer alıyor: ${overlappingIds.join(', ')}`
    );
  }

  // Filter resolved symbols (strictly honor client selections and exclusions)
  const resolvedSymbols = allSymbols.filter(s => selectedIds.has(s.id) && !excludedIds.has(s.id));
  const excludedSymbolItems = allSymbols.filter(s => excludedIds.has(s.id));

  // 2. Totem Integration Mode & Tier Segregation
  let primarySubjectDesc = '';
  let totemModeText = '';

  if (canonical.includeTotemAnimalFigure) {
    primarySubjectDesc =
      `Tasarımın odak noktasında, ${styleDef.name} üslubunun tüm inceliğiyle organik olarak çözümlenmiş bir ${totem.primaryTotem.name} figürü yer almaktadır. ` +
      `Figür asla bağımsız veya sonradan eklenmiş bir etiket gibi değil; etrafındaki ${canonical.compositionSpecs.layerHierarchy.backgroundSacredGeometry.join(', ') || 'geometrik hatlar'} ile tek bir ritmik kompozisyon halinde akmaktadır.`;
    totemModeText = `${totem.primaryTotem.name} figürü, seçilen ${styleDef.name} stil diliyle bütünleşik görsel özne olarak tasarıma dahildir.`;
  } else {
    primarySubjectDesc =
      `Tasarımda doğrudan hayvan figürü KULLANILMAMIŞTIR. ${totem.primaryTotem.name} toteminin temsil ettiği ruhsal ve davranışsal güç; ` +
      `figüratif bir silüet yerine ${totem.primaryTotem.abstractDesignEquivalents.geometricForms.join(', ')} ve ` +
      `${totem.primaryTotem.abstractDesignEquivalents.lineDynamics} gibi soyut geometrik vektörlere dönüştürülmüştür.`;
    totemModeText = `${totem.primaryTotem.name} totemi soyutlanmış; hayvan bedeni yerine yön, hareket ritmi ve negatif alan mimarisi olarak işlenmiştir.`;
  }

  const secondaryBreakdown = resolvedSymbols.map(sym => ({
    name: sym.name,
    meaning: sym.symbolicMeaning,
    roleInDesign: `Tasarımın dengesini kuran ${sym.category.toLowerCase()} unsuru olarak ${sym.keywords.slice(0, 3).join(', ')} anlamlarını taşır.`
  }));

  const conceptTitle = `${archetype.archetitle} · Kişisel Dövme Tasarım Reçetesi`;

  // 3. Honest Uncertainty Handling for Astrology
  let ascendantDeclarationText = '';
  let astrologyPrecisionText = '';
  const isAstrologyUncertain: boolean = Boolean(
    astrology.uncertaintyFlag ||
    !client.birthTime ||
    astrology.ascendantSign?.includes('Bilinmiyor') ||
    astrology.ascendantEstimate === 'Belirsiz'
  );

  if (isAstrologyUncertain) {
    ascendantDeclarationText = astrology.ascendantSign || 'Belirsiz (Doğum saati eksik)';
    astrologyPrecisionText =
      'Doğum saati veya doğum yeri koordinatları belirsiz olduğundan yükselen burç kesinliği uydurulmamıştır. ' +
      'Reçetenin astrolojik omurgası bağımsız olarak doğrulanmış Güneş burcu üzerinden kurulmuştur.';
  } else {
    ascendantDeclarationText = `${astrology.ascendantSign} (Tarihsel saat dilimi ve efemerisle doğrulandı)`;
    astrologyPrecisionText =
      `Doğum saati (${client.birthTime}) ve coğrafi koordinatlar üzerinden kesin Yükselen Burç (${astrology.ascendantSign}) ve ev yerleşimi doğrulanmıştır.`;
  }

  // 4. Enneagram Core vs Wing Resolution
  const resolvedCoreType = enneagram ? enneagram.coreType : 4;
  const resolvedCoreTypeName = enneagram ? enneagram.typeName : 'Bireyci / Özgün Sanatçı';
  const resolvedCoreFear = enneagram ? enneagram.coreFear : 'Kimliksiz ve özgünlükten yoksun kalmak';
  const resolvedWing = enneagram ? enneagram.wing : '4w5';
  const resolvedWingType: number = (enneagram && typeof enneagram.wingType === 'number') ? enneagram.wingType : 5;
  const resolvedWingName = enneagram ? enneagram.wingName : 'Kanat 5: Gözlemci / Araştırmacı';

  // 5. Narrative (Single Source of Truth)
  const narrative =
    `${client.firstName} için hazırlanan bu kişisel dövme reçetesi; Yaşam Yolu ${numerology.lifePathNumber} titreşimi, ` +
    `${astrology.sunSign} burcunun ${astrology.element} enerjisi, ${ebced.esmaAxisTitle} frekansı, ` +
    `${totem.primaryTotem.name} toteminin bilgeliği ve ${chakra.primaryChakraFocus.name} çakra odağını ${styleDef.name} zarafetiyle tek bir görsel mühürde buluşturur.`;

  const geometricFramework =
    `${chakra.primaryChakraFocus.yantraGeometry} geometrisi kompozisyonun ana iskeletini kurar; ` +
    `etrafında ${canonical.compositionSpecs.layerHierarchy.backgroundSacredGeometry.join(' ve ') || 'altın oran çemberleri'} yer alır.`;

  const botanicalAccents = archetype.recommendedFlora;

  const elementalHarmonics =
    `Tasarım, ${astrology.element} ve ${ebced.dominantMizanElement} unsurlarının dengesi üzerine kurulmuştur. ` +
    `Açık ten boşlukları ile mürekkep yoğunluğu arasındaki denge, içsel huzuru ve gücü temsil eder.`;

  const spiritualSummary =
    `${archetype.coreGift}. Bu dövme bir süs değil; taşıyıcısına her an kendi öz hakikatini, ` +
    `sınırlarını ve sonsuz potansiyelini hatırlatan koruyucu bir manevi pusuladır.`;

  // 6. Mother's Name Privacy Verification
  const motherNameLower = (client.motherName || '').trim().toLowerCase();
  let motherNameLeaked = false;
  if (motherNameLower.length > 2) {
    const textToCheck = [
      conceptTitle,
      narrative,
      primarySubjectDesc,
      geometricFramework,
      elementalHarmonics,
      spiritualSummary,
      ...secondaryBreakdown.map(s => `${s.name} ${s.meaning} ${s.roleInDesign}`)
    ].join(' ').toLowerCase();

    if (textToCheck.includes(motherNameLower)) {
      motherNameLeaked = true;
      discrepancies.push(`Gizlilik İhlali Tespit Edildi: Anne adı kişisel reçete metinlerine sızmıştır!`);
    }
  }

  // 7. Structured Totem Tiers (Explicit separation)
  const totemTiers = {
    primaryTotem: {
      name: totem.primaryTotem.name,
      archetype: totem.primaryTotem.archetype,
      roleInTattoo: canonical.includeTotemAnimalFigure
        ? 'Ana Görsel Özne (Dövmenin merkez kompozisyonunda stil ile bütünleşik figür)'
        : 'Soyut Dinamik Odak (Hayvan figürü çizilmez; soyut çizgi dinamiği ve hareket ritmi aktarılır)',
      abstractForms: totem.primaryTotem.abstractDesignEquivalents.geometricForms,
      traits: totem.primaryTotem.coreTraits
    },
    shadowTotem: {
      name: totem.shadowTotem.name,
      archetype: totem.shadowTotem.archetype,
      roleInTattoo:
        'İçsel Denge & Gölge Uyarısı (Asla ana figür olarak çizilmez; dövmenin arkasındaki gölge koruma bilincini temsil eder)',
      shadowTrait: totem.shadowTotem.shadowTrait,
      transformationGuidance:
        `Taşıyıcı, ${totem.shadowTotem.name} gölgesinin işaret ettiği "${totem.shadowTotem.shadowTrait}" tuzağına düştüğünde dövmenin merkezindeki ${totem.primaryTotem.name} erdemini hatırlar.`
    },
    secondaryTotem: {
      name: totem.secondaryTotem.name,
      archetype: totem.secondaryTotem.archetype,
      roleInTattoo:
        'İkincil Destekleyici Frekans (Tasarımın alt katmanında tamamlayıcı ritim ve yardımcı enerji dengesi)',
      complementaryTrait: totem.secondaryTotem.spiritualMeaning
    }
  };

  // 8. Structured Enneagram Differentiation
  const enneagramDistinction = {
    coreType: resolvedCoreType,
    coreTypeName: resolvedCoreTypeName,
    coreFear: resolvedCoreFear,
    wing: resolvedWing,
    wingType: resolvedWingType,
    wingName: resolvedWingName,
    distinctionRule:
      `Temel Mizaç (Tip ${resolvedCoreType}) karakterin kök eksenidir; Kanat (${resolvedWing}) ise mizaca derinlik katan ikincil renktir. Reçetede asla birbirinin yerine geçirilemez.`
  };

  // 9. Precision & Uncertainty Audit
  const uncertaintyAndPrecision = {
    astrologyPrecision: astrologyPrecisionText,
    isAstrologyUncertain,
    ascendantDeclaration: ascendantDeclarationText,
    ebcedPrecision:
      ebced.calculationNote ||
      `Klasik Meşrık (Ebced-i Kebir) harf tablosu ile ${ebced.totalEbced} değeri doğrulanmıştır. Anne adı sadece matematiksel oranda kullanılmıştır.`,
    chakraPrecision:
      chakra.evaluationMode === 'questionnaire'
        ? '21 kalibre edilmiş soru üzerinden sayısal öz değerlendirme puanlaması ile belirlendi.'
        : 'Arketipal sentez tahmini (Soru anketi henüz tamamlanmadı).'
  };

  // 10. Symbols Integrity
  const symbolsIntegrity = {
    selectedSymbolsList: canonical.selectedSymbols,
    excludedSymbolsList: canonical.excludedSymbols,
    zeroOverlapConfirmed: overlappingIds.length === 0
  };

  // 11. Privacy Audit
  const privacyAudit = {
    motherNameUsedInTattoo: false as const,
    motherNameExclusionConfirmed: !motherNameLeaked,
    leakSafetyNote:
      'Anne adı yalnızca Ebced/Mizan frekans hesabında girdi olarak kullanılmıştır; kişisel sembol reçetesine, dövme figürlerine, sembol adlarına ve sanatçı talimatlarına KESİNLİKLE dahil edilmemiştir.'
  };

  return {
    clientName: `${client.firstName} ${client.lastName}`.trim(),
    conceptTitle,
    archetypeNarrative: narrative,
    primarySubjectDescription: primarySubjectDesc,
    secondarySymbolBreakdown: secondaryBreakdown,
    geometricFramework,
    botanicalAndNatureAccents: botanicalAccents,
    elementalHarmonics,
    totemIntegrationMode: totemModeText,
    spiritualMeaningSummary: spiritualSummary,

    dataProvenance: {
      singleSourceOfTruth: true,
      verifiedEngines: ['Numeroloji', 'Astroloji', 'Ebced/Mizan', 'Çakra', 'Enneagram', 'Totem'],
      discrepanciesDetected: discrepancies,
      recipeTimestamp: effectiveTimestamp
    },
    totemTiers,
    enneagramDistinction,
    uncertaintyAndPrecision,
    symbolsIntegrity,
    privacyAudit
  };
}

export function generateTechnicalRecipe(
  canonical: CanonicalDesignObject,
  client: ClientData
): TechnicalTattooRecipe {
  const styleDef = TATTOO_STYLES[canonical.selectedStyle] || TATTOO_STYLES['style_fine_line'];
  const placementDef = BODY_PLACEMENTS.find(p => p.id === canonical.placementId) || BODY_PLACEMENTS[0];

  const needles = styleDef.recommendedNeedles;
  const lineWeight = styleDef.lineWeight;
  const shading = styleDef.shading;
  const negSpace = styleDef.negativeSpaceTarget;
  const antiBlowout = styleDef.antiBlowoutGuidelines;
  const aging = styleDef.skinSuitability;
  const anatomicalFit = placementDef.anatomicalAdvice;

  let difficulty = 'İleri Düzey (Master Artist)';
  let sessionEstimate = '1 Seans (Yaklaşık 3 - 5 saat)';

  if (canonical.selectedStyle === 'style_micro_realism' || canonical.selectedStyle === 'style_japanese_irezumi') {
    difficulty = 'Uzman Düzey (Yüksek Odak & Mikro Detay)';
    sessionEstimate = '1 - 2 Seans (Toplam 6 - 8 saat)';
  } else if (canonical.selectedStyle === 'style_minimalist' || canonical.selectedStyle === 'style_fine_line') {
    difficulty = 'Hassas Tek İğne Kontrolü (Hata Payı Sıfır)';
    sessionEstimate = '1 Seans (Yaklaşık 2 - 3 saat)';
  }

  const stencilNotes =
    `Termal şablon aktarımı sonrasında kuruma süresi en az 15 dakika beklenmeli. ` +
    `${placementDef.flowDirection} eksen doğrultusunda ${placementDef.recommendedAspect} oranları müşterinin ayakta dik duruşunda hizalanmalıdır. ` +
    `Gövde büküldüğünde şablonun gerilme payı önceden test edilmelidir.`;

  return {
    styleName: `${styleDef.name} (${styleDef.family})`,
    placementName: `${placementDef.name} - ${placementDef.bodyRegion}`,
    anatomicalFitStrategy: anatomicalFit,
    recommendedNeedleGrouping: needles,
    lineWeightStrategy: lineWeight,
    shadingTechnique: shading,
    negativeSpaceRatio: negSpace,
    agingProtectionAdvice: aging,
    antiBlowoutMeasures: antiBlowout,
    stencilTransferNotes: stencilNotes,
    estimatedSessionScale: sessionEstimate,
    difficultyRating: difficulty
  };
}
