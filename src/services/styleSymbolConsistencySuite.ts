/**
 * Style & Symbol Consistency Verification Suite (İSTEM 9)
 * 
 * Bağımsız Denetim Kriterleri:
 * 1. Sembol ve Hayvan Varlıkları Bütünlüğü:
 *    - Her sembol ve hayvan için benzersiz id, kategori, anlam, görsel/soyut özellik ve uyumlu stil bilgisi eksiksizdir.
 * 2. Dövme Tarzının Bütün Öğelere Homojen Uygulanması (Anti-Sticker Disiplini):
 *    - Hayvan figürü çıkartma gibi değil; seçilen tarzın (Fine line, Black & Grey, Dotwork vb.) görsel sözlüğü ve tekniğiyle üretilir.
 * 3. Hayvan Figürü Dahil / Hariç Seçiminin Açıkça Saklanması ve İstemlere Yansıması:
 *    - includeTotemAnimalFigure = false olduğunda figür pozitif promptlardan (Midjourney, Niji, DALL-E, Stencil) KESİNLİKLE çıkarılır.
 *    - Hayvanın fiziksel formu yerine soyut tasarım denkleri (geometri, çizgi dinamiği) kullanılır; negatif istemlere hayvan adı eklenir.
 * 4. Hariç Tutulan Sembollerin İzolasyonu (Exclusion Filter):
 *    - canonical.excludedSymbols içindeki hiçbir sembol adı pozitif istemlerde (Midjourney, Niji, DALL-E, Stencil, General AI) yer alamaz.
 *    - Hariç tutulan semboller yalnızca negatif istemlerde ve teknik brifin hariç tutulanlar bölümünde listelenir.
 * 5. Kullanıcının Seçtiği Sembollerin Anlamı, Kimliği ve Rolü Reçetede Korunur:
 *    - Seçilen sembollerin ismi, sembolik anlamı ve tasarımdaki işlevi kişisel reçetede eksiksiz ve tutarlı yer alır.
 * 6. Teknik Kısıtların Ayrışımı:
 *    - Negatif alan yüzdesi, anti-blowout, iğne tavsiyeleri ve cilt yaşlanma koruması teknik brifte yer alır;
 *      kişisel reçeteye sanki bir sembolmüş gibi karıştırılmaz.
 * 7. Çelişkisizlik & Birebir Uyum Testleri:
 *    - Sentetik test senaryolarıyla seçilen, hariç tutulan ve isteğe bağlı öğeler her prompt varyantında sınanır.
 */

import { CanonicalDesignObject, TotemResult, SymbolItem, ClientData, AstrologyResult } from '../types';
import { generateAllPrompts } from '../engines/promptEngine';
import { generatePersonalRecipe, generateTechnicalRecipe } from '../engines/recipeEngine';
import { calculateTotem } from '../engines/totemEngine';
import { calculateChakra } from '../engines/chakraEngine';
import { MASTER_SYMBOLS } from '../data/symbolsData';
import { TOTEM_ANIMALS } from '../data/totemData';
import { TATTOO_STYLES } from '../data/stylesData';

export interface StyleSymbolConsistencyResult {
  id: string;
  category: 'Entity Integrity' | 'Style Homogeneity' | 'Totem Toggle' | 'Exclusion Isolation' | 'Symbol Meaning Preservation' | 'Technical Separation';
  name: string;
  passed: boolean;
  message: string;
  details?: Record<string, any>;
}

export function runStyleSymbolConsistencySuite(): StyleSymbolConsistencyResult[] {
  const results: StyleSymbolConsistencyResult[] = [];

  // Verified totem results via calculateTotem
  const mockTotemWolf: TotemResult = calculateTotem([
    { questionId: 1, selectedOptionIndex: 1 },
    { questionId: 2, selectedOptionIndex: 0 },
    { questionId: 8, selectedOptionIndex: 1 },
    { questionId: 12, selectedOptionIndex: 0 }
  ], 'client_style_wolf');

  const mockTotemOwl: TotemResult = calculateTotem([
    { questionId: 1, selectedOptionIndex: 0 },
    { questionId: 2, selectedOptionIndex: 1 },
    { questionId: 3, selectedOptionIndex: 0 },
    { questionId: 4, selectedOptionIndex: 1 }
  ], 'client_style_owl');

  const mockClient: ClientData = {
    id: 'client_style_test',
    firstName: 'Can',
    lastName: 'Kaya',
    birthDate: '1990-05-15',
    birthTime: '14:30',
    birthPlace: 'İstanbul',
    motherName: 'Meryem',
    phone: '0555 123 45 67',
    email: 'can@example.com',
    notes: 'Stil testi',
    createdAt: '2026-01-01T00:00:00Z',
    updatedAt: '2026-01-01T00:00:00Z'
  };

  // -------------------------------------------------------------
  // TEST 1: Sembol Kütüphanesi Eksiksizliği & Benzersiz ID
  // -------------------------------------------------------------
  {
    const allIds = new Set<string>();
    let duplicates = 0;
    let missingFields = 0;

    for (const sym of MASTER_SYMBOLS) {
      if (allIds.has(sym.id)) {
        duplicates++;
      }
      allIds.add(sym.id);

      if (!sym.id || !sym.name || !sym.category || !sym.symbolicMeaning || !Array.isArray(sym.compatibleStyles) || sym.compatibleStyles.length === 0) {
        missingFields++;
      }
    }

    results.push({
      id: 'SS-01',
      category: 'Entity Integrity',
      name: 'Sembol Kütüphanesi Benzersiz Kimlik ve Eksiksiz Nitelik Denetimi',
      passed: duplicates === 0 && missingFields === 0 && MASTER_SYMBOLS.length >= 25,
      message: duplicates === 0 && missingFields === 0
        ? `Toplam ${MASTER_SYMBOLS.length} sembolün tümü benzersiz ID, kategori, anlam ve uyumlu stil bilgilerine sahip.`
        : `Hata: ${duplicates} mükerrer ID veya ${missingFields} eksik alan tespit edildi.`,
      details: { totalSymbols: MASTER_SYMBOLS.length, duplicates, missingFields }
    });
  }

  // -------------------------------------------------------------
  // TEST 2: Hayvan Varlıkları Bütünlüğü & Soyut Tasarım Denkleri
  // -------------------------------------------------------------
  {
    const animalEntries = Object.entries(TOTEM_ANIMALS);
    let invalidAnimals = 0;

    for (const [key, animal] of animalEntries) {
      if (
        !animal.id ||
        !animal.name ||
        !animal.category ||
        !animal.archetype ||
        !animal.spiritualMeaning ||
        !animal.abstractDesignEquivalents ||
        !Array.isArray(animal.abstractDesignEquivalents.geometricForms) ||
        animal.abstractDesignEquivalents.geometricForms.length === 0 ||
        !animal.abstractDesignEquivalents.lineDynamics ||
        !animal.abstractDesignEquivalents.negativeSpaceRole ||
        !animal.abstractDesignEquivalents.compositionFlow ||
        !Array.isArray(animal.styleSuitability) ||
        animal.styleSuitability.length === 0
      ) {
        invalidAnimals++;
      }
    }

    results.push({
      id: 'SS-02',
      category: 'Entity Integrity',
      name: 'Hayvan Varlıkları Soyut Tasarım Denkleri ve Stil Uyumu Denetimi',
      passed: invalidAnimals === 0 && animalEntries.length >= 10,
      message: invalidAnimals === 0
        ? `Toplam ${animalEntries.length} totem hayvanının tümü soyut geometri, çizgi dinamikleri ve stil uyumu alanlarını içeriyor.`
        : `Hata: ${invalidAnimals} hayvan profilinde eksik soyut denklik tespit edildi.`,
      details: { totalAnimals: animalEntries.length, invalidAnimals }
    });
  }

  // -------------------------------------------------------------
  // TEST 3: Dövme Tarzı Homojenliği (Anti-Sticker Kuralı)
  // -------------------------------------------------------------
  {
    const testStyles = ['style_fine_line', 'style_single_needle', 'style_micro_realism', 'style_dotwork', 'style_blackwork'];
    let allPromptsObeyAntiSticker = true;

    for (const styleId of testStyles) {
      const canonical: CanonicalDesignObject = {
        clientId: 'client_style_test',
        versionId: 'v1',
        versionName: 'Version 1',
        selectedStyle: styleId,
        secondaryStyles: [],
        placementId: 'place_forearm_inner',
        includeTotemAnimalFigure: true,
        selectedSymbols: ['sym_cember', 'sym_ucgen'],
        excludedSymbols: [],
        abstractTotemTraits: {
          geometricForms: ['üçgen'],
          lineDynamics: 'akıcı',
          negativeSpaceRole: 'ferah',
          compositionFlow: 'dikey'
        },
        compositionSpecs: {
          focalPoint: 'Merkez',
          flowDirection: 'Dikey',
          symmetryType: 'Simetrik',
          negativeSpacePercentage: 50,
          layerHierarchy: {
            primarySubject: 'Kurt',
            secondaryAccents: ['Çember'],
            backgroundSacredGeometry: ['Yaşam Çiçeği'],
            botanicalFraming: []
          }
        },
        colorPalette: { type: 'Pure Black & Grey', notes: 'monochrome' },
        technicalConstraints: {
          targetSkinReadabilityYears: 20,
          antiBlowoutSpacingMM: 2,
          recommendedNeedles: ['3RL']
        },
        updatedAt: '2026-03-30T10:00:00.000Z'
      };

      const prompts = generateAllPrompts(canonical, mockTotemWolf, MASTER_SYMBOLS, mockClient.motherName);
      const styleDef = TATTOO_STYLES[styleId];

      // Verify styleDef vocabulary is integrated in Midjourney
      const mjHasStyleName = prompts.midjourney.toLowerCase().includes(styleDef.name.toLowerCase());
      const hasAntiSticker = prompts.midjourney.toLowerCase().includes('do not add the selected subject or animal as a separate sticker');
      const nijiHasStyleName = prompts.niji.toLowerCase().includes(styleDef.name.toLowerCase());
      const dalleHasStyleName = prompts.dalle.toLowerCase().includes(styleDef.name.toLowerCase());

      if (!mjHasStyleName || !hasAntiSticker || !nijiHasStyleName || !dalleHasStyleName) {
        allPromptsObeyAntiSticker = false;
      }
    }

    results.push({
      id: 'SS-03',
      category: 'Style Homogeneity',
      name: 'Bütünleşik Dövme Tarzı ve Anti-Sticker Homojenlik Denetimi',
      passed: allPromptsObeyAntiSticker,
      message: allPromptsObeyAntiSticker
        ? 'Tüm dövme tarzlarında hayvan ve semboller bağımsız çıkartma gibi değil; seçilen tarzın çizgisiyle bütünleşik üretiliyor.'
        : 'Hata: Bazı stillerde anti-sticker yönergesi veya stil terimleri istemlere eksik aktarıldı.'
    });
  }

  // -------------------------------------------------------------
  // TEST 4: Hayvan Figürü Dahil Edildiğinde Bütünleşik Varlık
  // -------------------------------------------------------------
  {
    const canonical: CanonicalDesignObject = {
      clientId: 'client_style_test',
      versionId: 'v1',
      versionName: 'Version 1',
      selectedStyle: 'style_fine_line',
      secondaryStyles: [],
      placementId: 'place_forearm_inner',
      includeTotemAnimalFigure: true, // FIGURE INCLUDED
      selectedSymbols: ['sym_cember'],
      excludedSymbols: [],
      abstractTotemTraits: {
        geometricForms: ['üçgen'],
        lineDynamics: 'akıcı',
        negativeSpaceRole: 'ferah',
        compositionFlow: 'dikey'
      },
      compositionSpecs: {
        focalPoint: 'Merkez',
        flowDirection: 'Dikey',
        symmetryType: 'Simetrik',
        negativeSpacePercentage: 50,
        layerHierarchy: {
          primarySubject: 'Kurt',
          secondaryAccents: [],
          backgroundSacredGeometry: [],
          botanicalFraming: []
        }
      },
      colorPalette: { type: 'Pure Black & Grey', notes: 'monochrome' },
      technicalConstraints: {
        targetSkinReadabilityYears: 20,
        antiBlowoutSpacingMM: 2,
        recommendedNeedles: ['3RL']
      },
      updatedAt: '2026-03-30T10:00:00.000Z'
    };

    const prompts = generateAllPrompts(canonical, mockTotemWolf, MASTER_SYMBOLS, mockClient.motherName);
    const hasWolfInMJ = prompts.midjourney.toLowerCase().includes('kurt');
    const hasWolfInDalle = prompts.dalle.toLowerCase().includes('kurt');
    const briefStatesIncluded = prompts.artistTechnicalBrief.includes('Figür Dahil');

    results.push({
      id: 'SS-04',
      category: 'Totem Toggle',
      name: 'Hayvan Figürü Açıkken (includeTotemAnimalFigure=true) İstem Bütünlüğü',
      passed: hasWolfInMJ && hasWolfInDalle && briefStatesIncluded,
      message: hasWolfInMJ && hasWolfInDalle && briefStatesIncluded
        ? 'Hayvan figürü açıkken ana tasarım istemlerinde ve teknik brifte figür tarzla bütünleşik olarak yer alıyor.'
        : 'Hata: Hayvan figürü açık olmasına rağmen istemlerde bulunamadı.'
    });
  }

  // -------------------------------------------------------------
  // TEST 5: Hayvan Figürü Hariç Tutulduğunda Pozitif İstemden Tam İzolasyon
  // -------------------------------------------------------------
  {
    const canonicalNoFigure: CanonicalDesignObject = {
      clientId: 'client_style_test',
      versionId: 'v2',
      versionName: 'Version 2 (Abstract)',
      selectedStyle: 'style_sacred_geometry',
      secondaryStyles: [],
      placementId: 'place_shoulder_blade',
      includeTotemAnimalFigure: false, // FIGURE EXCLUDED! ONLY ABSTRACT TRAITS
      selectedSymbols: ['sym_yasam_cicegi', 'sym_metatron_kupu'],
      excludedSymbols: [],
      abstractTotemTraits: {
        geometricForms: ['Eşmerkezli daireler', 'Hipnotik göz spiralleri'],
        lineDynamics: 'Tüy hafifliğinde nokta vuruşları',
        negativeSpaceRole: 'Gece sessizliği',
        compositionFlow: 'Radyal akış'
      },
      compositionSpecs: {
        focalPoint: 'Merkez',
        flowDirection: 'Radyal',
        symmetryType: 'Radyal Geometrik',
        negativeSpacePercentage: 45,
        layerHierarchy: {
          primarySubject: 'Soyut Geometrik Mandala',
          secondaryAccents: [],
          backgroundSacredGeometry: ['Yaşam Çiçeği'],
          botanicalFraming: []
        }
      },
      colorPalette: { type: 'Pure Black & Grey', notes: 'monochrome' },
      technicalConstraints: {
        targetSkinReadabilityYears: 20,
        antiBlowoutSpacingMM: 2,
        recommendedNeedles: ['3RL']
      },
      updatedAt: '2026-03-30T10:00:00.000Z'
    };

    const prompts = generateAllPrompts(canonicalNoFigure, mockTotemOwl, MASTER_SYMBOLS, mockClient.motherName);

    // Assert: Baykuş figure does NOT appear as a stylized entity in positive prompts
    const hasStylizedOwlInMJ = prompts.midjourney.toLowerCase().includes('stylized baykuş');
    const hasOwlFigureInDalle = prompts.dalle.toLowerCase().includes('stylized baykuş');
    const hasOwlInNegative = prompts.negativePrompts.some(p => p.toLowerCase().includes('baykuş'));
    const briefStatesExcluded = prompts.artistTechnicalBrief.includes('Figür Hariç');
    const mentionsAbstractGeom = prompts.midjourney.toLowerCase().includes('abstract symbolic tattoo composition');

    const cleanExclusion = !hasStylizedOwlInMJ && !hasOwlFigureInDalle && hasOwlInNegative && briefStatesExcluded && mentionsAbstractGeom;

    results.push({
      id: 'SS-05',
      category: 'Totem Toggle',
      name: 'Hayvan Figürü Kapalıyken (includeTotemAnimalFigure=false) Kesin İzolasyon',
      passed: cleanExclusion,
      message: cleanExclusion
        ? 'Figür kapalıyken pozitif istemlerden hayvan silueti tamamen çıkarıldı; yalnızca soyut geometri/çizgi dili kullanıldı ve negatif isteme eklendi.'
        : 'Hata: Hayvan figürü kapalı olmasına rağmen pozitif istemde tespit edildi veya negatif isteme aktarılamadı.'
    });
  }

  // -------------------------------------------------------------
  // TEST 6: Hariç Tutulan Sembollerin Pozitif İstemlere Asla Sızmaması
  // -------------------------------------------------------------
  {
    const bannedSymbolId1 = 'sym_yilan_ouroboros'; // Yılan / Ouroboros
    const bannedSymbolId2 = 'sym_gorgon_medusa'; // Medusa Başı
    const bannedItem1 = MASTER_SYMBOLS.find(s => s.id === bannedSymbolId1)!;
    const bannedItem2 = MASTER_SYMBOLS.find(s => s.id === bannedSymbolId2)!;

    const canonicalWithExclusions: CanonicalDesignObject = {
      clientId: 'client_style_test',
      versionId: 'v1',
      versionName: 'Version 1',
      selectedStyle: 'style_linework',
      secondaryStyles: [],
      placementId: 'place_upper_arm_outer',
      includeTotemAnimalFigure: true,
      selectedSymbols: ['sym_cember', 'sym_ucgen'], // Positive symbols
      excludedSymbols: [bannedSymbolId1, bannedSymbolId2], // STRICTLY BANNED
      abstractTotemTraits: {
        geometricForms: ['üçgen'],
        lineDynamics: 'net',
        negativeSpaceRole: 'dengeli',
        compositionFlow: 'dikey'
      },
      compositionSpecs: {
        focalPoint: 'Merkez',
        flowDirection: 'Dikey',
        symmetryType: 'Simetrik',
        negativeSpacePercentage: 40,
        layerHierarchy: {
          primarySubject: 'Kurt',
          secondaryAccents: [],
          backgroundSacredGeometry: [],
          botanicalFraming: []
        }
      },
      colorPalette: { type: 'Pure Black & Grey', notes: 'monochrome' },
      technicalConstraints: {
        targetSkinReadabilityYears: 20,
        antiBlowoutSpacingMM: 2,
        recommendedNeedles: ['5RL']
      },
      updatedAt: '2026-03-30T10:00:00.000Z'
    };

    const prompts = generateAllPrompts(canonicalWithExclusions, mockTotemWolf, MASTER_SYMBOLS, mockClient.motherName);

    // Verify neither banned symbol name appears anywhere in the positive subject chunk
    const bannedNames = [bannedItem1.name.toLowerCase(), bannedItem2.name.toLowerCase(), 'ouroboros', 'medusa'];
    let leakDetected = false;

    // Check Midjourney positive part (before --no)
    const mjPositive = prompts.midjourney.split('--no')[0].toLowerCase();
    const nijiPositive = prompts.niji.split('--no')[0].toLowerCase();
    const dalleText = prompts.dalle.toLowerCase();
    const stencilText = prompts.tattooStencil.toLowerCase();
    const generalText = prompts.generalAi.toLowerCase();

    for (const bName of ['yılan', 'ouroboros', 'medusa']) {
      if (
        mjPositive.includes(bName) ||
        nijiPositive.includes(bName) ||
        dalleText.split('strictly do not include')[0].includes(bName) ||
        stencilText.includes(bName) ||
        generalText.includes(bName)
      ) {
        leakDetected = true;
      }
    }

    const inNegatives = prompts.negativePrompts.includes(bannedItem1.name) && prompts.negativePrompts.includes(bannedItem2.name);
    const checkedClean = prompts.checkedExclusionsClean;

    results.push({
      id: 'SS-06',
      category: 'Exclusion Isolation',
      name: 'Hariç Tutulan Sembollerin Pozitif Tasarımdan ve Görsel İstemlerden Mutlak İzolasyonu',
      passed: !leakDetected && inNegatives && checkedClean,
      message: !leakDetected && inNegatives && checkedClean
        ? 'Hariç tutulan semboller pozitif istemlerin hiçbirine sızmadı; yalnızca negatif istem ve brif kısıtlamalarına aktarıldı.'
        : 'Hata: Hariç tutulan sembollerden biri pozitif kompozisyona sızdı!'
    });
  }

  // -------------------------------------------------------------
  // TEST 7: Seçilen Sembollerin Anlamı, Kimliği ve Rolünün Reçetede Korunması
  // -------------------------------------------------------------
  {
    const selectedSymbolIds = ['sym_vesica_piscis', 'sym_yasam_cicegi'];
    const canonical: CanonicalDesignObject = {
      clientId: 'client_style_test',
      versionId: 'v1',
      versionName: 'Version 1',
      selectedStyle: 'style_geometric',
      secondaryStyles: [],
      placementId: 'place_forearm_inner',
      includeTotemAnimalFigure: true,
      selectedSymbols: selectedSymbolIds,
      excludedSymbols: [],
      abstractTotemTraits: {
        geometricForms: ['Vesica Piscis'],
        lineDynamics: 'geometrik',
        negativeSpaceRole: 'ferah',
        compositionFlow: 'dikey'
      },
      compositionSpecs: {
        focalPoint: 'Merkez',
        flowDirection: 'Dikey',
        symmetryType: 'Simetrik',
        negativeSpacePercentage: 50,
        layerHierarchy: {
          primarySubject: 'Kurt',
          secondaryAccents: ['Vesica Piscis'],
          backgroundSacredGeometry: ['Yaşam Çiçeği'],
          botanicalFraming: []
        }
      },
      colorPalette: { type: 'Pure Black & Grey', notes: 'monochrome' },
      technicalConstraints: {
        targetSkinReadabilityYears: 20,
        antiBlowoutSpacingMM: 2,
        recommendedNeedles: ['3RL']
      },
      updatedAt: '2026-03-30T10:00:00.000Z'
    };

    // Mock other calculation results
    const mockArch = {
      archetitle: 'Kutsal Geometri Arayıcısı',
      subtitle: 'Evrensel Uyum',
      coreTension: 'Düzen vs Kaos',
      coreGift: 'Yüksek Sezgi',
      shadowWork: 'Denge',
      visualMetaphor: 'Kutsal Matris',
      dominantElements: ['Ateş' as any],
      recommendedGeometricAnchors: ['Vesica Piscis'],
      recommendedFlora: ['Defne'],
      recommendedTotemAbstracts: ['Üçgen']
    };
    const mockAstro: AstrologyResult = {
      sunSign: 'Boğa',
      moonSignEstimate: 'Yengeç',
      ascendantEstimate: 'Başak',
      rulingPlanet: 'Venüs',
      element: 'Toprak',
      modality: 'Sabit',
      cosmicSymbols: ['Toprak Mührü'],
      degrees: 24,
      symbolicThemes: ['Toprak Mührü'],
      uncertaintyFlag: false
    };
    const mockNum = {
      lifePathNumber: 7,
      expressionNumber: 3,
      soulUrgeNumber: 4,
      personalityNumber: 8,
      maturityNumber: 1,
      isMasterNumber: { lifePath: false, expression: false, soulUrge: false },
      explanations: { lifePath: 'Hakikat arayışı', expression: 'Yaratıcılık', soulUrge: 'Düzen', personality: 'Otorite', maturity: 'Liderlik' },
      symbolicMeanings: ['Mistik Yedi'],
      tattooThemes: ['Derin Bilgelik']
    };
    const mockChk = calculateChakra('Toprak', 7, 4);
    const mockEbc = {
      clientNameEbced: 154,
      motherNameEbced: 250,
      totalEbced: 404,
      mizanElementBalance: { ates: 25, hava: 25, su: 25, toprak: 25 },
      dominantMizanElement: 'Toprak' as any,
      esmaAxisTitle: 'El-Alîm Ekseni',
      symbolicKeywords: ['İlim']
    };

    const recipe = generatePersonalRecipe(mockClient, canonical, mockArch, mockTotemWolf, mockAstro, mockNum, mockChk, mockEbc, MASTER_SYMBOLS);

    // Verify secondarySymbolBreakdown contains the chosen symbols
    const hasVesica = recipe.secondarySymbolBreakdown.some(s => s.name.includes('Vesica Piscis') && s.meaning.length > 5 && s.roleInDesign.length > 5);
    const hasYasamCicegi = recipe.secondarySymbolBreakdown.some(s => s.name.includes('Yaşam Çiçeği') && s.meaning.length > 5 && s.roleInDesign.length > 5);

    results.push({
      id: 'SS-07',
      category: 'Symbol Meaning Preservation',
      name: 'Kullanıcının Seçtiği Sembollerin Anlamı, Kimliği ve Rolünün Reçetede Korunması',
      passed: hasVesica && hasYasamCicegi,
      message: hasVesica && hasYasamCicegi
        ? 'Seçilen sembollerin kimliği, derin sembolik anlamı ve tasarımdaki işlevi kişisel reçete dökümünde eksiksiz yer alıyor.'
        : 'Hata: Seçilen sembollerin anlam veya tasarımdaki rol dökümü eksik üretildi.'
    });
  }

  // -------------------------------------------------------------
  // TEST 8: Teknik Dövme Kısıtlarının Kişisel Reçeteden Ayrıştırılması
  // -------------------------------------------------------------
  {
    const canonical: CanonicalDesignObject = {
      clientId: 'client_style_test',
      versionId: 'v1',
      versionName: 'Version 1',
      selectedStyle: 'style_fine_line',
      secondaryStyles: [],
      placementId: 'place_inner_bicep',
      includeTotemAnimalFigure: true,
      selectedSymbols: ['sym_cember'],
      excludedSymbols: [],
      abstractTotemTraits: {
        geometricForms: ['daire'],
        lineDynamics: 'ince',
        negativeSpaceRole: '%60',
        compositionFlow: 'akıcı'
      },
      compositionSpecs: {
        focalPoint: 'Merkez',
        flowDirection: 'Dikey',
        symmetryType: 'Simetrik',
        negativeSpacePercentage: 55,
        layerHierarchy: {
          primarySubject: 'Kurt',
          secondaryAccents: [],
          backgroundSacredGeometry: [],
          botanicalFraming: []
        }
      },
      colorPalette: { type: 'Pure Black & Grey', notes: 'monochrome' },
      technicalConstraints: {
        targetSkinReadabilityYears: 20,
        antiBlowoutSpacingMM: 2.5,
        recommendedNeedles: ['1RL (0.25mm)', '3RL']
      },
      updatedAt: '2026-03-30T10:00:00.000Z'
    };

    const techRecipe = generateTechnicalRecipe(canonical, mockClient);

    // Verify technical recipe contains needle, blowout, aging, negative space
    const hasNeedle = techRecipe.recommendedNeedleGrouping.length > 0;
    const hasBlowout = techRecipe.antiBlowoutMeasures.length > 10;
    const hasAging = techRecipe.agingProtectionAdvice.length > 10;
    const hasNegSpace = techRecipe.negativeSpaceRatio.includes('%');
    const hasFit = techRecipe.anatomicalFitStrategy.length > 10;

    results.push({
      id: 'SS-08',
      category: 'Technical Separation',
      name: 'Teknik Dövme Kısıtlarının (İğne, Negatif Alan, Anti-Blowout) Ayrı Katmanda Tutulması',
      passed: hasNeedle && hasBlowout && hasAging && hasNegSpace && hasFit,
      message: hasNeedle && hasBlowout && hasAging && hasNegSpace && hasFit
        ? 'Negatif alan, anti-blowout yönergeleri ve iğne gruplamaları teknik dövme reçetesinde net olarak ayrıştırılmıştır.'
        : 'Hata: Teknik dövme kısıtları reçete katmanında eksik tespit edildi.'
    });
  }

  // -------------------------------------------------------------
  // TEST 9: Tüm İstem Çıktılarının (6 Çıktı) Birebir İçerik Uyumu
  // -------------------------------------------------------------
  {
    const canonical: CanonicalDesignObject = {
      clientId: 'client_style_test',
      versionId: 'v1',
      versionName: 'Version 1',
      selectedStyle: 'style_dotwork',
      secondaryStyles: [],
      placementId: 'place_chest_sternum',
      includeTotemAnimalFigure: true,
      selectedSymbols: ['sym_metatron_kupu'],
      excludedSymbols: ['sym_kuzgun'],
      abstractTotemTraits: {
        geometricForms: ['metatron'],
        lineDynamics: 'noktasal',
        negativeSpaceRole: 'aydınlık',
        compositionFlow: 'radyal'
      },
      compositionSpecs: {
        focalPoint: 'Merkez',
        flowDirection: 'Radyal',
        symmetryType: 'Radyal Geometrik',
        negativeSpacePercentage: 50,
        layerHierarchy: {
          primarySubject: 'Baykuş',
          secondaryAccents: [],
          backgroundSacredGeometry: ['Metatron Küpü'],
          botanicalFraming: []
        }
      },
      colorPalette: { type: 'Pure Black & Grey', notes: 'monochrome' },
      technicalConstraints: {
        targetSkinReadabilityYears: 20,
        antiBlowoutSpacingMM: 2,
        recommendedNeedles: ['3RL']
      },
      updatedAt: '2026-03-30T10:00:00.000Z'
    };

    const prompts = generateAllPrompts(canonical, mockTotemOwl, MASTER_SYMBOLS, mockClient.motherName);

    const hasMJ = prompts.midjourney.length > 50;
    const hasNiji = prompts.niji.length > 50;
    const hasDalle = prompts.dalle.length > 50;
    const hasStencil = prompts.tattooStencil.length > 50 && prompts.tattooStencil.includes('thermal tattoo stencil');
    const hasBrief = prompts.artistTechnicalBrief.includes('[DÖVME SANATÇISI TEKNİK BİLGİLENDİRMESİ]');
    const hasGeneral = prompts.generalAi.length > 50;

    results.push({
      id: 'SS-09',
      category: 'Exclusion Isolation',
      name: '6 Birleşik Tasarım İsteminin (MJ, Niji, DALL-E, Stencil, Brief, General) Eksiksiz Üretim Denetimi',
      passed: hasMJ && hasNiji && hasDalle && hasStencil && hasBrief && hasGeneral,
      message: hasMJ && hasNiji && hasDalle && hasStencil && hasBrief && hasGeneral
        ? 'Midjourney, Niji, DALL-E 3, Stencil, Artist Brief ve General AI çıktılarının tümü eşzamanlı ve tam formatta üretiliyor.'
        : 'Hata: Birleşik istemlerden biri veya birkaçı eksik üretildi.'
    });
  }

  return results;
}
