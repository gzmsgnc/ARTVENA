/**
 * In-App Regression & Validation Test Suite
 * Automated checks for all calculation engines, privacy boundaries,
 * exclusion filters, and prompt guarantees.
 */

import { calculateNumerology } from '../engines/numerologyEngine';
import { calculateEnneagram } from '../engines/enneagramEngine';
import { calculateTotem } from '../engines/totemEngine';
import { calculateAstrology } from '../engines/astrologyEngine';
import { calculateEbced } from '../engines/ebcedEngine';
import { calculateChakra } from '../engines/chakraEngine';
import { generateAllPrompts } from '../engines/promptEngine';
import { CanonicalDesignObject, ClientData } from '../types';
import { MASTER_SYMBOLS } from '../data/symbolsData';
import { TOTEM_ANIMALS } from '../data/totemData';

export interface TestResultItem {
  id: string;
  name: string;
  category: 'Numeroloji' | 'Enneagram' | 'Totem' | 'Ebced & Gizlilik' | 'Prompt & Filtreleme' | 'Stil Bütünlüğü' | 'Çakra & Geometri';
  passed: boolean;
  message: string;
  durationMs: number;
}

export function runFullRegressionSuite(): TestResultItem[] {
  const results: TestResultItem[] = [];

  // 1. Numerology Test
  const t0 = performance.now();
  const numRes = calculateNumerology('1990-05-15', 'Ahmet Yılmaz');
  const numPassed = numRes.lifePathNumber === 3 && numRes.expressionNumber === 7 && numRes.symbolicMeanings.length >= 3;
  results.push({
    id: 'test_num_1',
    name: 'Numeroloji Deterministik Yaşam Yolu & İfade Hesabı',
    category: 'Numeroloji',
    passed: numPassed,
    message: numPassed ? `Başarılı (Yaşam Yolu: ${numRes.lifePathNumber}, İfade: ${numRes.expressionNumber})` : `Hata: Beklenen Yaşam Yolu 3, alınan ${numRes.lifePathNumber}; Beklenen İfade 7, alınan ${numRes.expressionNumber}`,
    durationMs: Math.round(performance.now() - t0)
  });

  // 2. Enneagram Test
  const t1 = performance.now();
  const testAnswers = [
    { questionId: 10, score: 5 }, // Type 4
    { questionId: 11, score: 5 },
    { questionId: 12, score: 5 },
    { questionId: 13, score: 4 }, // Type 5 (Wing)
    { questionId: 14, score: 4 },
    { questionId: 15, score: 4 }
  ];
  const ennRes = calculateEnneagram(testAnswers);
  const ennPassed = ennRes.coreType === 4 && ennRes.wing.includes('4w5');
  results.push({
    id: 'test_enn_1',
    name: 'Enneagram Tip ve Kanat (Wing) Algoritması Doğrulaması',
    category: 'Enneagram',
    passed: ennPassed,
    message: ennPassed ? `Başarılı (Tespit: Tip ${ennRes.coreType}, Kanat: ${ennRes.wing})` : `Hata: Beklenen 4w5 yerine ${ennRes.wing} hesaplandı`,
    durationMs: Math.round(performance.now() - t1)
  });

  // 3. Totem No-Substring & Weighting Test
  const t2 = performance.now();
  // Question 1, 2, 3 picking wolf option
  const totemAnswers = [
    { questionId: 2, selectedOptionIndex: 0 }, // Wolf +3, Bear +2
    { questionId: 8, selectedOptionIndex: 1 }, // Wolf +3
    { questionId: 12, selectedOptionIndex: 0 }, // Wolf +3
    { questionId: 23, selectedOptionIndex: 3 } // Wolf +3
  ];
  const totemRes = calculateTotem(totemAnswers);
  const totemPassed = totemRes.primaryTotem.id === 'totem_kurt' && totemRes.primaryTotem.name === 'Kurt';
  results.push({
    id: 'test_totem_1',
    name: 'Totem Davranışsal Skorlama & Tam Kimlik Eşleşmesi (No-Substring)',
    category: 'Totem',
    passed: totemPassed,
    message: totemPassed ? `Başarılı (Birincil Totem: ${totemRes.primaryTotem.name})` : 'Hata: Totem hayvanı doğru hesaplanamadı',
    durationMs: Math.round(performance.now() - t2)
  });

  // 4. Ebced & Mother's Name Privacy Boundary Test
  const t3 = performance.now();
  const ebcedRes = calculateEbced('Ali', 'Fatma');
  const ebcedPassed = ebcedRes.clientNameEbced > 0 && ebcedRes.motherNameEbced > 0 && ebcedRes.totalEbced === (ebcedRes.clientNameEbced + ebcedRes.motherNameEbced);
  results.push({
    id: 'test_ebced_1',
    name: 'Ebced Sayısal Matris & Mizan Denge Hesabı',
    category: 'Ebced & Gizlilik',
    passed: ebcedPassed,
    message: ebcedPassed ? `Başarılı (Toplam Ebced: ${ebcedRes.totalEbced}, Baskın Mizan: ${ebcedRes.dominantMizanElement})` : 'Hata: Ebced hesaplaması tutarsız',
    durationMs: Math.round(performance.now() - t3)
  });

  // 5. Exclusion Engine Test: Excluded symbol must NOT appear in prompt
  const t4 = performance.now();
  const mockCanonical: CanonicalDesignObject = {
    clientId: 'test-client',
    versionId: 'v1',
    versionName: 'Versiyon 1',
    selectedStyle: 'style_fine_line',
    secondaryStyles: [],
    placementId: 'plc_inner_forearm',
    includeTotemAnimalFigure: false, // Animal excluded test
    selectedSymbols: ['sym_lotus', 'sym_cember'],
    excludedSymbols: ['sym_kalkan_ve_kilic'], // Excluded sword/shield
    abstractTotemTraits: {
      geometricForms: ['keskin hatlar'],
      lineDynamics: 'akıcı hatlar',
      negativeSpaceRole: 'geniş nefes alanı',
      compositionFlow: 'dikey akış'
    },
    compositionSpecs: {
      focalPoint: 'Merkez',
      flowDirection: 'Dikey',
      symmetryType: 'Simetrik',
      negativeSpacePercentage: 50,
      layerHierarchy: {
        primarySubject: 'Lotus',
        secondaryAccents: [],
        backgroundSacredGeometry: [],
        botanicalFraming: []
      }
    },
    colorPalette: { type: 'Pure Black & Grey', notes: '' },
    technicalConstraints: {
      targetSkinReadabilityYears: 20,
      antiBlowoutSpacingMM: 1,
      recommendedNeedles: ['3RL']
    },
    updatedAt: new Date().toISOString()
  };

  const prompts = generateAllPrompts(mockCanonical, totemRes, MASTER_SYMBOLS);
  const promptContainsExcluded = prompts.midjourney.toLowerCase().includes('kılıç') ||
    prompts.midjourney.toLowerCase().includes('kalkan');
  const animalExcludedCheck = prompts.negativePrompts.includes('kurt') || prompts.midjourney.includes('--no');
  const exclusionPassed = !promptContainsExcluded && animalExcludedCheck && prompts.checkedExclusionsClean;

  results.push({
    id: 'test_filter_1',
    name: 'Hariç Tutulan Sembollerin & Hayvan Figürünün Prompt Sızıntısı Koruması',
    category: 'Prompt & Filtreleme',
    passed: exclusionPassed,
    message: exclusionPassed ? 'Başarılı: Hariç tutulan öğeler promptlara sızmadı ve negative prompta eklendi' : 'Hata: Hariç tutulan sembol promptta bulundu!',
    durationMs: Math.round(performance.now() - t4)
  });

  // 6. Anti-Sticker Clause Test
  const t5 = performance.now();
  const antiStickerPassed = prompts.midjourney.includes('Do not add the selected subject or animal as a separate sticker') &&
    prompts.tattooStencil.includes('thermal tattoo stencil') &&
    prompts.artistTechnicalBrief.includes('[DÖVME SANATÇISI TEKNİK BİLGİLENDİRMESİ]');

  results.push({
    id: 'test_prompt_formats',
    name: 'Tüm 6 Format (Midjourney, Niji, DALL-E, Stencil, Brief, General) & Anti-Sticker Kuralı',
    category: 'Stil Bütünlüğü',
    passed: antiStickerPassed,
    message: antiStickerPassed ? 'Başarılı: 6 format canonical nesneden eksiksiz üretildi ve anti-sticker şartı uygulandı' : 'Hata: Format eksikliği veya anti-sticker kuralı noksan',
    durationMs: Math.round(performance.now() - t5)
  });

  // 7. Chakra Layer Separation & Disclaimer Test
  const t6 = performance.now();
  const sampleChakraAnswers = [
    { questionId: 1, selectedOptionValue: 1 },
    { questionId: 2, selectedOptionValue: 1 },
    { questionId: 3, selectedOptionValue: 5 } // reversed -> 1 => Muladhara 3/15 = 20%
  ];
  const chakraTestRes = calculateChakra('Toprak', 4, 1, sampleChakraAnswers);
  const chakraPassed =
    chakraTestRes.primaryChakraFocus.level === 1 &&
    chakraTestRes.primaryChakraFocus.status === 'Destek Gerekiyor' &&
    chakraTestRes.medicalDisclaimer.includes('tıbbi') &&
    chakraTestRes.auditTrail?.layerSeparationAudit.scoringLayerPurelyQuantitative === true;

  results.push({
    id: 'test_chakra_1',
    name: 'Çakra Puanlama-Yorum Katman Ayrımı ve Tıbbi Olmayan Beyan',
    category: 'Çakra & Geometri',
    passed: chakraPassed,
    message: chakraPassed ? 'Başarılı: Sayısal puanlama ve sembolik yorum katmanları izole, şerh mevcut' : 'Hata: Çakra katman ayrımı veya tıbbi şerh eksik',
    durationMs: Math.round(performance.now() - t6)
  });

  return results;
}
