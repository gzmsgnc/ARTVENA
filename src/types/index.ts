/**
 * Core type definitions for Tattoo Design Assistant V2
 */

export interface ClientData {
  id: string;
  firstName: string;
  lastName: string;
  birthDate: string; // YYYY-MM-DD
  birthTime: string; // HH:mm
  birthPlace: string;
  motherName: string; // Strictly only for Ebced calculation; NEVER included in prompt or tattoo symbols
  phone: string;
  email: string;
  notes: string;
  preferredAstrologySystem?: 'Tropikal Zodyak (Tropical)';
  preferredHouseSystem?: 'Placidus' | 'Whole Sign' | 'Equal';
  createdAt: string;
  updatedAt: string;
}

export type ZodiacSign =
  | 'Koç'
  | 'Boğa'
  | 'İkizler'
  | 'Yengeç'
  | 'Aslan'
  | 'Başak'
  | 'Terazi'
  | 'Akrep'
  | 'Yay'
  | 'Oğlak'
  | 'Kova'
  | 'Balık';

export type ClassicalElement = 'Ateş' | 'Toprak' | 'Hava' | 'Su' | 'Eter';
export type Modality = 'Öncü' | 'Sabit' | 'Değişken';

export interface CelestialCoordinate {
  longitude: number; // 0 - 360 ecliptic longitude
  sign: ZodiacSign;
  degreeInSign: number; // 0 - 29.999
  deg: number; // 0 - 29
  min: number; // 0 - 59
  sec: number; // 0 - 59
  formatted: string; // e.g. "14° 28' 42\""
}

export interface HousePlacement {
  houseNumber: number; // 1 - 12
  sign: ZodiacSign;
  degree: number;
  formatted: string;
}

export interface PlanetPosition {
  name: string;
  longitude: number;
  sign: ZodiacSign;
  degreeInSign: number;
  house?: number; // Sadece doğum saati biliniyorsa (1 - 12); bilinmiyorsa tanımsız
  isRetrograde?: boolean;
  formatted: string;
}

export interface LunarNodePosition {
  type: 'mean' | 'true';
  point: 'Rahu' | 'Ketu';
  name: string; // e.g. "Ortalama Kuzey Düğümü (Mean Rahu)"
  longitude: number; // 0 - 360
  sign: ZodiacSign;
  degreeInSign: number; // 0 - 29.999
  deg: number;
  min: number;
  sec: number;
  house?: number; // Sadece doğum saati biliniyorsa (1 - 12); bilinmiyorsa tanımsız
  formatted: string;
  zodiacSystem: 'Tropikal Zodyak (Tropical)';
}

export interface LunarNodesResult {
  mean: {
    rahu: LunarNodePosition;
    ketu: LunarNodePosition;
  };
  trueNode: {
    rahu: LunarNodePosition;
    ketu: LunarNodePosition;
  };
  oscillationDeltaDeg: number; // True Rahu - Mean Rahu difference in degrees (-1.75 to +1.75)
  sourceFormula: string; // e.g. "Jean Meeus Astronomical Algorithms Ch. 47 / IAU Mean & Periodic Perturbations"
}

export interface AstrologyAstronomicalAudit {
  timeStandardUsed: 'UTC' | 'LOCAL' | 'LMT';
  calculatedJulianDate: number;
  greenwichSiderealTimeDeg: number;
  localSiderealTimeDeg: number;
  obliquityDeg: number;
  ephemerisSource: string; // e.g. "Jean Meeus Astronomical Algorithms / VSOP87 Tropical Standard"
  zodiacSystem: 'Tropikal Zodyak (Tropical)';
  houseSystem: 'Placidus' | 'Whole Sign' | 'Equal';
  locationResolution: {
    cityName: string;
    matchedCityKey: string;
    latitude: number;
    longitude: number;
    timezoneOffsetHours: number;
    isDaylightSavingTime: boolean;
    isAmbiguous: boolean;
    confidence: 'exact_city' | 'province_center' | 'default_fallback';
  };
  timePrecision: {
    birthTimeProvided: boolean;
    hasExactAscendant: boolean;
    uncertaintyNotice?: string;
    isNonExistentTime?: boolean;
    isAmbiguousFold?: boolean;
  };
}

export interface AstrologyResult {
  sunSign: ZodiacSign;
  moonSignEstimate: ZodiacSign;
  ascendantEstimate: ZodiacSign | 'Belirsiz';
  element: ClassicalElement;
  modality: Modality;
  rulingPlanet: string;
  degrees: number;
  symbolicThemes: string[];
  cosmicSymbols: string[];
  // Astronomical Ephemeris Extensions:
  sunCoordinates?: CelestialCoordinate;
  moonCoordinates?: CelestialCoordinate;
  ascendantCoordinates?: CelestialCoordinate;
  midheavenCoordinates?: CelestialCoordinate;
  astronomicalAudit?: AstrologyAstronomicalAudit;
  uncertaintyFlag?: boolean;
  ascendantSign?: string;
  zodiacSystem?: 'Tropikal Zodyak (Tropical)';
  houseSystem?: 'Placidus' | 'Whole Sign' | 'Equal';
  houses?: HousePlacement[];
  planets?: PlanetPosition[];
  lunarNodes?: LunarNodesResult;
  // Date validation audit
  isValidBirthDate?: boolean;
  dateValidationMessage?: string;
}

export interface NumerologyLetterTrace {
  char: string;
  originalChar: string;
  value: number;
  isVowel: boolean;
  letterType: 'vowel' | 'consonant';
}

export interface NumerologyWordTrace {
  word: string;
  letterTraces: NumerologyLetterTrace[];
  wordSum: number;
  wordReduced: number;
  vowelSum: number;
  consonantSum: number;
}

export interface NumerologyBirthCycleTrace {
  original: number;
  reduced: number;
  isMaster: boolean;
  reductionSteps: string[];
}

export interface NumerologyAuditTrail {
  system: string; // e.g. "Batı Pitagorik Sistemi (Western Pythagorean System)"
  masterNumbersPreserved: number[]; // [11, 22, 33]
  inputRawName: string;
  inputRawBirthDate: string;
  normalizedName: string;
  dateCycles: {
    year: NumerologyBirthCycleTrace;
    month: NumerologyBirthCycleTrace;
    day: NumerologyBirthCycleTrace;
    sumOfCycles: number;
    finalLifePath: number;
    isMaster: boolean;
    reductionSteps: string[];
  };
  straightSumComparison: {
    digits: number[];
    sum: number;
    reduced: number;
    isMaster: boolean;
    reductionSteps: string[];
    matchesPeriodCycles: boolean;
    explanation: string;
  };
  nameAnalysis: {
    words: NumerologyWordTrace[];
    allLetters: NumerologyLetterTrace[];
    totalLetterCount: number;
    vowelCount: number;
    consonantCount: number;
    expressionRawSum: number;
    expressionReduced: number;
    expressionReductionSteps: string[];
    soulUrgeRawSum: number;
    soulUrgeReduced: number;
    soulUrgeReductionSteps: string[];
    personalityRawSum: number;
    personalityReduced: number;
    personalityReductionSteps: string[];
  };
  synthesisNumbers: {
    lifePath: number;
    expression: number;
    soulUrge: number;
    personality: number;
    maturity: {
      formula: string; // "Yaşam Yolu + İfade Sayısı"
      rawSum: number;
      reduced: number;
      isMaster: boolean;
    };
    birthdayNumber: {
      formula: string; // "Doğum Günü (1-31) İndirgemesi"
      rawDay: number;
      reduced: number;
      isMaster: boolean;
    };
    attitudeNumber: {
      formula: string; // "Gün + Ay İndirgemesi (Güneş / Tutum Sayısı)"
      rawSum: number;
      reduced: number;
      isMaster: boolean;
    };
  };
  provenance: {
    dateOriginCount: number;
    nameOriginCount: number;
    synthesisOriginCount: number;
    isolationGuaranteed: boolean;
  };
  edgeCaseFlags: {
    hasZeroDigits: boolean;
    isSingleDigitInput: boolean;
    isLeapYearOrTransition: boolean;
    isMasterNumberFound: boolean;
    hasTurkishSpecialChars: boolean;
    isEmptyNameFallback: boolean;
    isEmptyDateFallback: boolean;
  };
  calculatedAt: string;
}

export interface NumerologyResult {
  lifePathNumber: number;
  expressionNumber: number;
  soulUrgeNumber: number;
  personalityNumber: number;
  maturityNumber: number;
  birthdayNumber?: number;
  attitudeNumber?: number;
  isMasterNumber: {
    lifePath: boolean;
    expression: boolean;
    soulUrge: boolean;
    personality?: boolean;
    maturity?: boolean;
    birthday?: boolean;
  };
  explanations: {
    lifePath: string;
    expression: string;
    soulUrge: string;
    personality: string;
    maturity: string;
    birthday?: string;
    attitude?: string;
  };
  symbolicMeanings: string[];
  tattooThemes: string[];
  auditTrail?: NumerologyAuditTrail;
}

export interface EnneagramAnswer {
  questionId: number;
  score: number; // 1 to 5 (Likert scale)
}

export interface EnneagramRankingEntry {
  rank: number;
  type: number;
  typeName: string;
  score: number;
  percentage: number;
  dimensionScores: {
    motivation: number;
    stress: number;
    shadow: number;
  };
  matchRationale: string;
}

export interface EnneagramEvaluationStatus {
  status: 'completed' | 'partial' | 'empty' | 'invalid';
  isEvaluated: boolean;
  validAnswerCount: number;
  totalQuestions: number;
  unansweredQuestions: number[];
  invalidQuestions: number[];
  validationMessage: string;
}

export interface EnneagramTieBreakAudit {
  tiedTypeNumbers: number[];
  resolvedCoreType: number;
  method: 'direct_score' | 'motivation_dimension_break' | 'high_intensity_count' | 'canonical_invariant';
  reason: string;
}

export interface EnneagramWingTieBreakAudit {
  candidateWings: number[];
  resolvedWing: number;
  reason: string;
}

export interface EnneagramResult {
  coreType: number; // 1 to 9
  typeName: string;
  wing: string; // e.g., "4w5"
  wingName: string;
  wingType?: number;
  typeScores: Record<number, number>; // 1-9 -> score
  coreMotivation: string;
  coreFear: string;
  growthDirection: number; // Integration
  stressDirection: number; // Disintegration
  shadowTraits: string[];
  strengths: string[];
  tattooSymbolicDirections: string[];
  // Auditing and Invariance fields:
  evaluation?: EnneagramEvaluationStatus;
  ranking?: EnneagramRankingEntry[];
  tieBreakAudit?: EnneagramTieBreakAudit;
  wingTieBreakAudit?: EnneagramWingTieBreakAudit;
  clientId?: string;
  calculatedAt?: string;
  methodology?: string;
  disclaimer?: string;
  methodLimitations?: string;
}

export interface TotemAnswer {
  questionId: number;
  selectedOptionIndex: number;
}

export interface TotemAnimalProfile {
  id: string;
  name: string;
  latinName?: string;
  category: 'Memeli' | 'Kuş' | 'Sürüngen / Amfibi' | 'Deniz Canlısı' | 'Böcek / Eklembacaklı';
  coreTraits: string[];
  archetype: string;
  element: ClassicalElement;
  shadowTrait: string;
  spiritualMeaning: string;
  abstractDesignEquivalents: {
    geometricForms: string[];
    lineDynamics: string;
    negativeSpaceRole: string;
    compositionFlow: string;
    symbolicMotifs: string[];
  };
  styleSuitability: string[];
}

export interface TotemRankingEntry {
  rank: number;
  animalId: string;
  name: string;
  score: number;
  percentage: number;
  matchRationale: string;
}

export interface TotemEvaluationStatus {
  status: 'completed' | 'partial' | 'empty' | 'invalid';
  isEvaluated: boolean;
  validAnswerCount: number;
  totalQuestions: number;
  unansweredQuestions: number[];
  invalidQuestions: number[];
  validationMessage: string;
}

export interface TotemTieBreakAudit {
  tiedAnimalIds: string[];
  resolvedPrimaryId: string;
  tieBreakMethod: 'direct_score' | 'priority_axis_break' | 'canonical_invariant';
  reason: string;
}

export interface TotemResult {
  primaryTotem: TotemAnimalProfile;
  secondaryTotem: TotemAnimalProfile;
  shadowTotem: TotemAnimalProfile;
  scores: Record<string, number>;
  behavioralSummary: string;
  calculatedAt: string;
  clientId?: string;
  evaluation: TotemEvaluationStatus;
  ranking: TotemRankingEntry[];
  tieBreakAudit?: TotemTieBreakAudit;
  shadowAudit: {
    method: 'question_9_shadow_axis' | 'polar_tension' | 'lowest_affinity';
    reason: string;
  };
}

export interface EbcedCharTrace {
  index: number;
  rawChar: string;
  normalizedChar: string;
  arabicLetter: string;
  arabicName: string;
  value: number;
  element: ClassicalElement;
  sourceRole: 'client' | 'mother';
}

export interface EbcedAuditTrail {
  methodology: string;
  clientRawInput: string;
  motherRawInputProvided: boolean;
  clientNormalized: string;
  motherNormalizedLength: number; // Only record character count, not the name string
  clientCharCount: number;
  motherCharCount: number;
  clientBreakdown: EbcedCharTrace[];
  isClientNameEmpty: boolean;
  isMotherNameEmpty: boolean;
  calculatedAt: string;
  privacyNotice: string;
}

export interface EbcedResult {
  clientNameEbced: number;
  motherNameEbced: number;
  totalEbced: number;
  mizanElementBalance: {
    ates: number;
    hava: number;
    su: number;
    toprak: number;
  };
  dominantMizanElement: ClassicalElement;
  esmaAxisTitle: string;
  symbolicKeywords: string[];
  calculationNote?: string;
  // Mother's name text is strictly NEVER exposed in the output object to prevent tattoo leaks
  auditTrail?: EbcedAuditTrail;
}

export type ChakraStatus = 'Dengeli' | 'Aktif' | 'Destek Gerekiyor';

export type ChakraId =
  | 'muladhara'
  | 'svadhisthana'
  | 'manipura'
  | 'anahata'
  | 'vishuddha'
  | 'ajna'
  | 'sahasrara';

export interface ChakraQuestionDef {
  id: number;
  chakraLevel: number; // 1 to 7
  chakraId: ChakraId;
  chakraName: string;
  sanskritName: string;
  dimension: 'Temel Kapasite' | 'İçsel Denge & Akış' | 'Gölge & Tıkanıklık';
  text: string;
  contextHint: string;
  scoringDirection: 'positive' | 'reversed';
  weight: number;
}

export interface ChakraAnswer {
  questionId: number;
  selectedOptionValue: number; // 1 to 5 (Likert scale)
}

export interface ChakraItemTrace {
  questionId: number;
  chakraLevel: number;
  rawOptionValue: number;
  scoringDirection: 'positive' | 'reversed';
  effectiveScore: number;
  weight: number;
}

export interface ChakraScoreBreakdown {
  level: number;
  chakraName: string;
  sanskritName: string;
  rawScore: number;
  maxScore: number;
  scorePercent: number;
  status: ChakraStatus;
  answeredQuestionsCount: number;
  totalQuestionsCount: number;
  isEstimated: boolean;
}

export interface ChakraTieBreakAudit {
  hasTie: boolean;
  tiedLevels: number[];
  resolutionRule: string;
  resolvedPrimaryLevel: number;
  resolvedSecondaryLevel: number;
}

export interface ChakraUniformAudit {
  isUniformResponse: boolean;
  uniformAnswerValue?: number;
  note?: string;
}

export interface ChakraMissingAudit {
  hasMissingAnswers: boolean;
  answeredCount: number;
  totalQuestions: number;
  unansweredQuestionIds: number[];
  completenessRatio: number;
}

export interface ChakraAuditTrail {
  scoringMethodology: string;
  itemTraces: ChakraItemTrace[];
  scoreBreakdown: Record<number, ChakraScoreBreakdown>;
  thresholdRules: {
    underactiveNeedsSupport: string;
    balanced: string;
    activeOrOveractive: string;
  };
  boundaryHandling: string;
  tieBreakAudit: ChakraTieBreakAudit;
  uniformAudit: ChakraUniformAudit;
  missingAudit: ChakraMissingAudit;
  layerSeparationAudit: {
    scoringLayerPurelyQuantitative: boolean;
    interpretationLayerNonMutating: boolean;
  };
  coherenceAudit: {
    coherenceVerified: boolean;
    primaryStatusMatchesNarrative: boolean;
    secondaryStatusMatchesNarrative: boolean;
    detectedContradictionsCount: number;
  };
  medicalDisclaimer: string;
}

export interface ChakraEnergy {
  name: string;
  sanskritName: string;
  level: number; // 1 to 7
  status: ChakraStatus;
  element: ClassicalElement;
  yantraGeometry: string;
  color: string;
  symbolicFlora: string;
  associatedKeywords: string[];
  rawScore?: number;
  scorePercent?: number;
  symbolicInterpretation?: string;
  remedyTattooDirectives?: string[];
}

export interface ChakraResult {
  chakras: ChakraEnergy[];
  primaryChakraFocus: ChakraEnergy;
  secondaryChakraFocus: ChakraEnergy;
  synthesisTheme: string;
  evaluationMode?: 'questionnaire' | 'archetypal_synthesis';
  medicalDisclaimer: string;
  auditTrail?: ChakraAuditTrail;
}

export interface UnifiedArchetypeResult {
  archetitle: string;
  subtitle: string;
  coreTension: string;
  coreGift: string;
  shadowWork: string;
  visualMetaphor: string;
  dominantElements: ClassicalElement[];
  recommendedGeometricAnchors: string[];
  recommendedFlora: string[];
  recommendedTotemAbstracts: string[];
}

export type SymbolCategory =
  | 'GEOMETRİ'
  | 'BİTKİLER'
  | 'HAYVANLAR'
  | 'MİTOLOJİ'
  | 'KUTSAL_SPIRITUEL'
  | 'KOZMİK'
  | 'ELEMENTLER'
  | 'ASTRAL_ASTROLOJİK'
  | 'ALCHEMY'
  | 'RUNİK_TARİHSEL'
  | 'ARKETİPLER'
  | 'SAYISAL_GLİF'
  | 'DOĞA'
  | 'DENİZ'
  | 'GÖKYÜZÜ'
  | 'ZAMAN_DÖNÜŞÜM'
  | 'KORUMA'
  | 'YOLCULUK'
  | 'AŞK_BAĞ'
  | 'GÜÇ_CESARET'
  | 'ŞİFA_DENGE'
  | 'GÖLGE'
  | 'ÖLÜM_YENİDEN_DOĞUŞ';

export interface SymbolItem {
  id: string;
  name: string;
  category: SymbolCategory;
  originOrCulture?: string;
  symbolicMeaning: string;
  keywords: string[];
  element?: ClassicalElement;
  compatibleStyles: string[];
  isCustom?: boolean;
  isActive: boolean;
}

export interface TattooStyleDefinition {
  id: string;
  name: string;
  family: string;
  description: string;
  lineWeight: string; // e.g. "0.2mm - 0.5mm single needle hairline"
  shading: string;
  contrastRatio: string;
  detailDensity: string;
  negativeSpaceTarget: string; // e.g. "40% - 50%"
  skinSuitability: string;
  antiBlowoutGuidelines: string;
  compositionPhilosophy: string;
  visualVocabulary: string[];
  recommendedNeedles: string[];
}

export interface PlacementDefinition {
  id: string;
  name: string;
  bodyRegion: string;
  flowDirection: 'Dikey' | 'Yatay' | 'Radyal' | 'Sarmal' | 'Organik Kontur';
  painLevel: number; // 1 to 5
  agingConsiderations: string;
  recommendedAspect: string;
  anatomicalAdvice: string;
}

export interface CanonicalDesignObject {
  clientId: string;
  versionId: string;
  versionName: string;
  selectedStyle: string; // Primary style ID
  secondaryStyles: string[]; // Blended style IDs
  placementId: string;
  customPlacementNote?: string;
  includeTotemAnimalFigure: boolean; // TRUE = figure included, FALSE = only abstract traits
  selectedSymbols: string[]; // Symbol IDs to include
  excludedSymbols: string[]; // Symbol IDs STRICTLY banned
  abstractTotemTraits: {
    geometricForms: string[];
    lineDynamics: string;
    negativeSpaceRole: string;
    compositionFlow: string;
  };
  compositionSpecs: {
    focalPoint: string;
    flowDirection: string;
    symmetryType: 'Simetrik' | 'Asimetrik' | 'Radyal Geometrik' | 'Akışkan Dinamik';
    negativeSpacePercentage: number;
    layerHierarchy: {
      primarySubject: string;
      secondaryAccents: string[];
      backgroundSacredGeometry: string[];
      botanicalFraming: string[];
    };
  };
  colorPalette: {
    type: 'Pure Black & Grey' | 'Blackwork Minimal' | 'Monochrome with Red Accent' | 'Muted Earth Tones' | 'Watercolor Hue Wash' | 'Full Color';
    notes: string;
  };
  technicalConstraints: {
    targetSkinReadabilityYears: number; // e.g. 20+ years
    antiBlowoutSpacingMM: number;
    recommendedNeedles: string[];
  };
  updatedAt: string;
}

export interface PersonalTattooRecipe {
  clientName: string;
  conceptTitle: string;
  archetypeNarrative: string;
  primarySubjectDescription: string;
  secondarySymbolBreakdown: {
    name: string;
    meaning: string;
    roleInDesign: string;
  }[];
  geometricFramework: string;
  botanicalAndNatureAccents: string[];
  elementalHarmonics: string;
  totemIntegrationMode: string;
  spiritualMeaningSummary: string;

  // İSTEM 8: Single Source of Truth & Structural Integrity
  dataProvenance?: {
    singleSourceOfTruth: boolean;
    verifiedEngines: string[];
    discrepanciesDetected: string[];
    recipeTimestamp: string;
  };

  // İSTEM 8: Strict Totem Tier Separation (Primary vs Shadow vs Secondary)
  totemTiers?: {
    primaryTotem: {
      name: string;
      archetype: string;
      roleInTattoo: string;
      abstractForms: string[];
      traits: string[];
    };
    shadowTotem: {
      name: string;
      archetype: string;
      roleInTattoo: string;
      shadowTrait: string;
      transformationGuidance: string;
    };
    secondaryTotem: {
      name: string;
      archetype: string;
      roleInTattoo: string;
      complementaryTrait: string;
    };
  };

  // İSTEM 8: Enneagram Core vs Wing Distinction (Never confusable)
  enneagramDistinction?: {
    coreType: number;
    coreTypeName: string;
    coreFear: string;
    wing: string;
    wingType: number;
    wingName: string;
    distinctionRule: string;
  };

  // İSTEM 8: Uncertainty & Missing Data Handling (No false precision)
  uncertaintyAndPrecision?: {
    astrologyPrecision: string;
    isAstrologyUncertain: boolean;
    ascendantDeclaration: string;
    ebcedPrecision: string;
    chakraPrecision: string;
  };

  // İSTEM 8: Client Selection vs Excluded Symbols Segregation
  symbolsIntegrity?: {
    selectedSymbolsList: string[];
    excludedSymbolsList: string[];
    zeroOverlapConfirmed: boolean;
  };

  // İSTEM 8: Mother's Name Privacy & Leak Prevention
  privacyAudit?: {
    motherNameUsedInTattoo: false;
    motherNameExclusionConfirmed: boolean;
    leakSafetyNote: string;
  };
}

export interface TechnicalTattooRecipe {
  styleName: string;
  placementName: string;
  anatomicalFitStrategy: string;
  recommendedNeedleGrouping: string[];
  lineWeightStrategy: string;
  shadingTechnique: string;
  negativeSpaceRatio: string;
  agingProtectionAdvice: string;
  antiBlowoutMeasures: string;
  stencilTransferNotes: string;
  estimatedSessionScale: string;
  difficultyRating: string;
}

export interface GeneratedPrompts {
  midjourney: string;
  niji: string;
  dalle: string;
  tattooStencil: string;
  artistTechnicalBrief: string;
  generalAi: string;
  negativePrompts: string[];
  checkedExclusionsClean: boolean;
  generatedAt: string;
}

export interface CompleteClientRecord {
  schemaVersion: 1;
  client: ClientData;
  numerology: NumerologyResult;
  astrology: AstrologyResult;
  ebced: EbcedResult;
  chakra: ChakraResult;
  unifiedArchetype: UnifiedArchetypeResult;
  enneagram: {
    answers: EnneagramAnswer[];
    result: EnneagramResult;
  };
  totem: {
    answers: TotemAnswer[];
    result: TotemResult;
  };
  designVersions: {
    id: string;
    name: string;
    canonicalDesign: CanonicalDesignObject;
    personalRecipe: PersonalTattooRecipe;
    technicalRecipe: TechnicalTattooRecipe;
    prompts: GeneratedPrompts;
    createdAt: string;
  }[];
  activeVersionId: string;
  createdAt: string;
  updatedAt: string;
}
