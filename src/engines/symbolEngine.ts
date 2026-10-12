/**
 * Symbol Selection & Matching Engine
 * Matches client analytical outputs to symbol library, tracks inclusions and strict exclusions.
 */

import { SymbolItem, NumerologyResult, EnneagramResult, TotemResult, AstrologyResult, ChakraResult, EbcedResult } from '../types';
import { MASTER_SYMBOLS } from '../data/symbolsData';

export function getRecommendedSymbols(
  numerology: NumerologyResult,
  enneagram: EnneagramResult,
  totem: TotemResult,
  astrology: AstrologyResult,
  chakra: ChakraResult,
  ebced: EbcedResult,
  customSymbols: SymbolItem[] = []
): {
  coreRecommended: SymbolItem[];
  elementalHarmonics: SymbolItem[];
  allActiveSymbols: SymbolItem[];
} {
  const allSymbols = [...MASTER_SYMBOLS, ...customSymbols].filter(s => s.isActive);

  const matchedIds = new Set<string>();

  // 1. Totem direct match
  const totemIdMatch = allSymbols.find(s => s.name.toLowerCase().includes(totem.primaryTotem.name.toLowerCase()));
  if (totemIdMatch) matchedIds.add(totemIdMatch.id);

  // 2. Astrology cosmic symbols
  for (const s of allSymbols) {
    for (const cosmicSym of astrology.cosmicSymbols) {
      if (s.name.toLowerCase().includes(cosmicSym.toLowerCase()) || cosmicSym.toLowerCase().includes(s.name.toLowerCase())) {
        matchedIds.add(s.id);
      }
    }
  }

  // 3. Sacred geometry and Chakra
  for (const s of allSymbols) {
    if (s.category === 'GEOMETRİ') {
      if (chakra.primaryChakraFocus.yantraGeometry.toLowerCase().includes(s.name.toLowerCase()) ||
          s.keywords.some(k => chakra.primaryChakraFocus.associatedKeywords.some(ck => ck.toLowerCase().includes(k)))) {
        matchedIds.add(s.id);
      }
    }
    if (s.category === 'BİTKİLER') {
      if (chakra.primaryChakraFocus.symbolicFlora.toLowerCase().includes(s.name.toLowerCase()) ||
          chakra.secondaryChakraFocus.symbolicFlora.toLowerCase().includes(s.name.toLowerCase())) {
        matchedIds.add(s.id);
      }
    }
  }

  // 4. Numerology themes
  for (const s of allSymbols) {
    for (const nTheme of numerology.tattooThemes) {
      if (s.keywords.some(k => nTheme.toLowerCase().includes(k))) {
        matchedIds.add(s.id);
      }
    }
  }

  // Filter core recommended
  const coreRecommended = allSymbols.filter(s => matchedIds.has(s.id));

  // If fewer than 4 matched, pad with harmonious elements
  if (coreRecommended.length < 5) {
    const dominantElem = astrology.element;
    const elementalPads = allSymbols.filter(s => s.element === dominantElem && !matchedIds.has(s.id)).slice(0, 5 - coreRecommended.length);
    coreRecommended.push(...elementalPads);
  }

  const elementalHarmonics = allSymbols.filter(s => s.element === astrology.element || s.element === ebced.dominantMizanElement);

  return {
    coreRecommended,
    elementalHarmonics,
    allActiveSymbols: allSymbols
  };
}

export function filterSymbolsByQuery(
  symbols: SymbolItem[],
  query: string,
  categoryFilter?: string
): SymbolItem[] {
  const cleanQ = query.toLowerCase().trim();

  return symbols.filter(s => {
    if (categoryFilter && categoryFilter !== 'TÜMÜ' && s.category !== categoryFilter) {
      return false;
    }
    if (!cleanQ) return true;

    return (
      s.name.toLowerCase().includes(cleanQ) ||
      s.symbolicMeaning.toLowerCase().includes(cleanQ) ||
      (s.originOrCulture && s.originOrCulture.toLowerCase().includes(cleanQ)) ||
      s.keywords.some(k => k.toLowerCase().includes(cleanQ)) ||
      s.compatibleStyles.some(style => style.toLowerCase().includes(cleanQ))
    );
  });
}
