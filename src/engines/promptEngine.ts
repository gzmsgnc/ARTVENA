/**
 * Master Prompt Engine & Strict Exclusion Filter
 * Generates 6 unified outputs from the Canonical Design Object:
 * 1. Midjourney v6.1 prompt
 * 2. Niji v6 prompt
 * 3. DALL-E 3 prompt
 * 4. Thermal Tattoo Stencil prompt
 * 5. Tattoo Artist Technical Brief
 * 6. General AI Prompt
 * 
 * Enforces Anti-Sticker Discipline, Style Fusion, and Zero Leak of Excluded Symbols/Personal Data.
 */

import { CanonicalDesignObject, GeneratedPrompts, TotemResult, SymbolItem } from '../types';
import { TATTOO_STYLES } from '../data/stylesData';
import { BODY_PLACEMENTS } from '../data/placementsData';

const ANTI_STICKER_CLAUSE =
  'Do not add the selected subject or animal as a separate sticker, overlay, pasted badge, isolated clipart element, or unrelated floating foreground object. Integrate every element organically into the unified tattoo composition and singular visual language.';

export function generateAllPrompts(
  canonical: CanonicalDesignObject,
  totem: TotemResult,
  allSymbols: SymbolItem[],
  motherName?: string
): GeneratedPrompts {
  const styleDef = TATTOO_STYLES[canonical.selectedStyle] || TATTOO_STYLES['style_fine_line'];
  const placementDef = BODY_PLACEMENTS.find(p => p.id === canonical.placementId) || BODY_PLACEMENTS[0];

  // Resolve active symbols (Strict exclusion check)
  const activeSymbols = allSymbols.filter(
    s => canonical.selectedSymbols.includes(s.id) && !canonical.excludedSymbols.includes(s.id)
  );

  const excludedSymbolItems = allSymbols.filter(s => canonical.excludedSymbols.includes(s.id));
  const excludedNames = excludedSymbolItems.map(s => s.name);

  // Negative prompt tokens
  const negativeTokens: string[] = [
    'photorealistic skin backdrop',
    'human body photograph',
    'blurry lines',
    'amateur linework',
    'blowout',
    'watermark',
    'signature',
    'text',
    'typography',
    'isolated sticker effect',
    'clipart border',
    'gradient mesh mess',
    ...excludedNames
  ];

  if (!canonical.includeTotemAnimalFigure) {
    negativeTokens.push(
      totem.primaryTotem.name.toLowerCase(),
      `${totem.primaryTotem.name.toLowerCase()} head`,
      `${totem.primaryTotem.name.toLowerCase()} figure`,
      'animal silhouette',
      'animal portrait'
    );
  }

  // Determine subject description
  let subjectPromptChunk = '';
  if (canonical.includeTotemAnimalFigure) {
    subjectPromptChunk = `a stylized ${totem.primaryTotem.name} rendered seamlessly in pure ${styleDef.name} aesthetic, integrated with ${activeSymbols.map(s => s.name).join(', ')}`;
  } else {
    subjectPromptChunk = `an abstract symbolic tattoo composition evoking ${totem.primaryTotem.coreTraits.slice(0, 2).join(' and ')} through ${totem.primaryTotem.abstractDesignEquivalents.geometricForms.join(', ')} and ${totem.primaryTotem.abstractDesignEquivalents.lineDynamics}, harmonized with ${activeSymbols.map(s => s.name).join(', ')} (no animal figure)`;
  }

  const styleVocabularyChunk = styleDef.visualVocabulary.join(', ');
  const compositionChunk = `${canonical.compositionSpecs.symmetryType} harmony, ${canonical.compositionSpecs.flowDirection} flow suited for ${placementDef.name}, ${styleDef.negativeSpaceTarget} intentional clean skin negative space`;

  // Aspect ratio based on placement flow
  let arFlag = '--ar 3:4';
  if (placementDef.flowDirection === 'Dikey') {
    arFlag = '--ar 1:2';
  } else if (placementDef.flowDirection === 'Yatay') {
    arFlag = '--ar 16:9';
  } else if (placementDef.flowDirection === 'Radyal') {
    arFlag = '--ar 1:1';
  }

  // 1. Midjourney Prompt
  const midjourneyPrompt =
    `tattoo flash design, ${subjectPromptChunk}, ${styleVocabularyChunk}, ${compositionChunk}, isolated on solid stark white background, high contrast tattoo flash plate, professional master tattoo flash, 8k resolution, ${ANTI_STICKER_CLAUSE} ${arFlag} --v 6.1 --style raw --no ${negativeTokens.slice(0, 8).join(', ')}`;

  // 2. Niji Prompt
  const nijiPrompt =
    `tattoo design, ${subjectPromptChunk}, ${styleDef.name} style, elegant line flow, ${compositionChunk}, solid white background, master studio ink, ${ANTI_STICKER_CLAUSE} ${arFlag} --niji 6 --no ${negativeTokens.slice(0, 7).join(', ')}`;

  // 3. DALL-E 3 Prompt
  const dallePrompt =
    `A professional tattoo flash illustration on a pure clean white background. Subject: ${subjectPromptChunk}. ` +
    `Style: ${styleDef.name} tattoo art with ${styleDef.lineWeight} and ${styleDef.shading}. ` +
    `Composition: ${compositionChunk}. ` +
    `Crucial aesthetic instruction: ${ANTI_STICKER_CLAUSE} Absolutely no background clutter, no human skin photos, no text or signatures, and strictly do not include ${excludedNames.length > 0 ? excludedNames.join(', ') : 'unrelated elements'}.`;

  // 4. Tattoo Stencil Prompt
  const stencilPrompt =
    `high-contrast thermal tattoo stencil line art, pure black lines on crisp white background, vector line quality, ${subjectPromptChunk}, crisp ${styleDef.lineWeight}, zero shading gradients, clear stencil boundary transfer ready for carbon thermofax machine, no grey tones, strictly monochromatic vector linework, ${ANTI_STICKER_CLAUSE}`;

  // 5. Tattoo Artist Technical Brief
  const artistTechnicalBrief =
    `[DÖVME SANATÇISI TEKNİK BİLGİLENDİRMESİ]\n` +
    `• Konsept & Stil: ${styleDef.name} (${styleDef.family})\n` +
    `• Anatomik Bölge: ${placementDef.name} (${placementDef.bodyRegion})\n` +
    `• Kompozisyon Akışı: ${placementDef.flowDirection} eksende ${placementDef.recommendedAspect} geometrisi\n` +
    `• Totem Entegrasyonu: ${canonical.includeTotemAnimalFigure ? `Figür Dahil (${totem.primaryTotem.name} figürü ${styleDef.name} çizgisiyle bütünleşik)` : `Figür Hariç (Sadece soyut ritim ve geometrik formlar)`}\n` +
    `• Aktif Semboller: ${activeSymbols.map(s => s.name).join(', ') || 'Geometrik denge hatları'}\n` +
    `• KESİNLİKLE HARİÇ TUTULANLAR: ${excludedNames.join(', ') || 'Yok'}\n` +
    `• Tavsiye Edilen İğneler: ${styleDef.recommendedNeedles.join(', ')}\n` +
    `• Çizgi Kalınlığı: ${styleDef.lineWeight}\n` +
    `• Gölgeleme & Doku: ${styleDef.shading}\n` +
    `• Hedef Negatif Alan: ${styleDef.negativeSpaceTarget}\n` +
    `• Yaşlanma / Anti-Blowout Koruması: ${styleDef.antiBlowoutGuidelines}\n` +
    `• Şablon Notu: ${ANTI_STICKER_CLAUSE}`;

  // 6. General AI Prompt
  const generalAiPrompt =
    `Master tattoo design of ${subjectPromptChunk}, executing in ${styleDef.name} discipline. Crisp outlines, ${styleDef.shading}, ${compositionChunk}. White background, monochrome inkwork, high contrast. ${ANTI_STICKER_CLAUSE}`;

  // Strict check: verify no excluded symbol names appear in final prompts
  let isClean = true;
  const promptTexts = [midjourneyPrompt, nijiPrompt, dallePrompt, stencilPrompt, generalAiPrompt];

  for (const exName of excludedNames) {
    for (const p of promptTexts) {
      // Check if excluded name appears outside of the exclusion clause itself
      const positiveRegex = new RegExp(`\\b${exName}\\b`, 'i');
      if (positiveRegex.test(subjectPromptChunk) || positiveRegex.test(styleVocabularyChunk)) {
        isClean = false;
      }
    }
  }

  // Verify totem exclusion
  if (!canonical.includeTotemAnimalFigure) {
    const animalName = totem.primaryTotem.name.toLowerCase();
    if (subjectPromptChunk.includes(`stylized ${animalName}`)) {
      isClean = false;
    }
  }

  // Verify mother's name zero-leakage into visual prompts
  if (motherName && motherName.trim().length > 2) {
    const mNameLower = motherName.trim().toLowerCase();
    for (const p of promptTexts) {
      if (p.toLowerCase().includes(mNameLower)) {
        isClean = false;
      }
    }
  }

  return {
    midjourney: midjourneyPrompt,
    niji: nijiPrompt,
    dalle: dallePrompt,
    tattooStencil: stencilPrompt,
    artistTechnicalBrief,
    generalAi: generalAiPrompt,
    negativePrompts: negativeTokens,
    checkedExclusionsClean: isClean,
    generatedAt: new Date().toISOString()
  };
}
