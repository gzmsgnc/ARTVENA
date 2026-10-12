/**
 * Unified Archetype Synthesis Engine
 * Merges Numerology + Enneagram + Totem + Astroloji + Ebced + Çakra
 * into a single cohesive archetypal narrative and visual metaphor.
 */

import {
  UnifiedArchetypeResult,
  NumerologyResult,
  EnneagramResult,
  TotemResult,
  AstrologyResult,
  EbcedResult,
  ChakraResult,
  ClassicalElement
} from '../types';

export function calculateUnifiedArchetype(
  numerology: NumerologyResult,
  enneagram: EnneagramResult,
  totem: TotemResult,
  astrology: AstrologyResult,
  ebced: EbcedResult,
  chakra: ChakraResult
): UnifiedArchetypeResult {
  const elementsCount: Record<ClassicalElement, number> = {
    Ateş: 0,
    Toprak: 0,
    Hava: 0,
    Su: 0,
    Eter: 0
  };

  elementsCount[astrology.element] = (elementsCount[astrology.element] || 0) + 2;
  elementsCount[ebced.dominantMizanElement] = (elementsCount[ebced.dominantMizanElement] || 0) + 2;
  elementsCount[totem.primaryTotem.element] = (elementsCount[totem.primaryTotem.element] || 0) + 2;
  elementsCount[chakra.primaryChakraFocus.element] = (elementsCount[chakra.primaryChakraFocus.element] || 0) + 1;

  const dominantElements = (Object.entries(elementsCount) as [ClassicalElement, number][])
    .sort((a, b) => b[1] - a[1])
    .map(entry => entry[0])
    .slice(0, 2);

  // Generate evocative archetypal title
  const coreArchetypeMap: Record<number, string> = {
    1: 'Adaletin & Saf Düzenin Mimarı',
    2: 'Şefkatli Kalbin Kutsal Koruyucusu',
    3: 'Güneş Taçlı Vizyoner Öncü',
    4: 'Derin Gölgelerden Doğan Simyacı',
    5: 'Kozmik Hakikatin Sessiz Gözlemcisi',
    6: 'Kadim Köklerin Sadık Muhafızı',
    7: 'Sonsuz Ufukların Özgür Kaşifi',
    8: 'Korkusuz İradenin Kudretli Önderi',
    9: 'Evrensel Dinginliğin Barışçıl Dengesi'
  };

  const baseTitle = coreArchetypeMap[enneagram.coreType] || 'Kutsal Arayışın Yolcusu';
  const archetitle = `${totem.primaryTotem.name} Ruhlu ${baseTitle}`;
  const subtitle = `${astrology.sunSign} Güneşi · Yaşam Yolu ${numerology.lifePathNumber} · ${enneagram.wing} · ${totem.primaryTotem.name} Totemi`;

  const coreTension = `${enneagram.coreFear} korkusu ile ${totem.primaryTotem.name} doğasındaki ${totem.primaryTotem.coreTraits[0]} arasındaki dinamik gerilim; ` +
    `kişiyi hem sınırlarını korumaya hem de derin bir özgürleşmeye çağırıyor.`;

  const coreGift = `${totem.primaryTotem.spiritualMeaning} Yaşam Yolu ${numerology.lifePathNumber} titreşimiyle birleştiğinde ` +
    `kişiye ${enneagram.strengths.slice(0, 2).join(' ve ')} gibi eşsiz bir ruhsal dirayet kazandırıyor.`;

  const shadowWork = `Gölge Totem olan ${totem.shadowTotem.name}'ın uyardığı "${totem.shadowTotem.shadowTrait}" ile yüzleşmek ve ` +
    `${enneagram.shadowTraits[0]} eğilimini yüksek farkındalıkla dönüştürmek.`;

  const visualMetaphor = `${totem.primaryTotem.abstractDesignEquivalents.compositionFlow}; ` +
    `${chakra.primaryChakraFocus.yantraGeometry} geometrisi ile çerçevelenmiş, ` +
    `${astrology.cosmicSymbols[0]} ve ${astrology.cosmicSymbols[1]} ile dengelenmiş kutsal bir denge kompozisyonu.`;

  const recommendedGeometricAnchors = [
    chakra.primaryChakraFocus.yantraGeometry,
    ...totem.primaryTotem.abstractDesignEquivalents.geometricForms,
    ...numerology.symbolicMeanings.map(s => s.split(':')[0])
  ].slice(0, 4);

  const recommendedFlora = [
    chakra.primaryChakraFocus.symbolicFlora.split(',')[0].trim(),
    chakra.secondaryChakraFocus.symbolicFlora.split(',')[0].trim(),
    'Zeytin Dalı (Barış & Kutsallık)',
    'Lotus (Saf Uyanış)'
  ].slice(0, 3);

  const recommendedTotemAbstracts = [
    totem.primaryTotem.abstractDesignEquivalents.lineDynamics,
    totem.primaryTotem.abstractDesignEquivalents.negativeSpaceRole,
    ...totem.primaryTotem.abstractDesignEquivalents.symbolicMotifs
  ];

  return {
    archetitle,
    subtitle,
    coreTension,
    coreGift,
    shadowWork,
    visualMetaphor,
    dominantElements,
    recommendedGeometricAnchors,
    recommendedFlora,
    recommendedTotemAbstracts
  };
}
