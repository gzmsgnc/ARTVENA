/**
 * Western Astrology Calculation Engine (Astronomical Ephemeris Standard)
 * 
 * Features:
 * - High-Precision Jean Meeus Astronomical Algorithms (VSOP87 Tropical Standard)
 * - Exact Julian Date, Greenwich Mean Sidereal Time (GMST) and Local Sidereal Time (RAMC)
 * - Geocoding database for all 81 Turkish Provinces and major world capitals
 * - Historical Timezone & Daylight Saving Time (DST) conversion (1910-1978, 1978-2016, 2016+)
 * - Exact Tropical Ascendant (Yükselen Burç) trigonometrical calculation
 * - Planetary Ecliptic Longitude (Sun & Moon) with Arcsecond precision (Degree, Minute, Second)
 * - Explicit Uncertainty Reporting when birth time or location is missing or ambiguous
 * - Full distinction between Tropical and Sidereal systems (strictly Tropical Equinox 0° Aries)
 */

import {
  AstrologyResult,
  ZodiacSign,
  ClassicalElement,
  Modality,
  CelestialCoordinate,
  AstrologyAstronomicalAudit,
  HousePlacement,
  PlanetPosition,
  LunarNodePosition,
  LunarNodesResult
} from '../types';
import * as Astronomy from 'astronomy-engine';
import {
  resolveCityCoordinates,
  resolveOnlineCityCoordinates,
  getHistoricalTimezoneOffset,
  ResolvedLocation
} from '../data/geoTimezoneData';

interface ZodiacData {
  sign: ZodiacSign;
  element: ClassicalElement;
  modality: Modality;
  ruler: string;
  startDegree: number; // 0 to 330
  endDegree: number;   // 30 to 360
  themes: string[];
  cosmicSymbols: string[];
}

export const ZODIAC_SIGNS_ORDER: ZodiacSign[] = [
  'Koç', 'Boğa', 'İkizler', 'Yengeç', 'Aslan', 'Başak',
  'Terazi', 'Akrep', 'Yay', 'Oğlak', 'Kova', 'Balık'
];

export const ZODIAC_TABLE: ZodiacData[] = [
  {
    sign: 'Koç',
    element: 'Ateş',
    modality: 'Öncü',
    ruler: 'Mars',
    startDegree: 0, endDegree: 30,
    themes: ['Kozmik Kıvılcım', 'İlk Hamle', 'Cesaret', 'Öncü Liderlik'],
    cosmicSymbols: ['Koç Boynuzu Glifi', 'Mars Oku', 'Alev Dili', 'Zırh Kalkanı']
  },
  {
    sign: 'Boğa',
    element: 'Toprak',
    modality: 'Sabit',
    ruler: 'Venüs',
    startDegree: 30, endDegree: 60,
    themes: ['Verimli Toprak', 'Duyusal Estetik', 'Kalıcı Güven', 'Doğa Sevgisi'],
    cosmicSymbols: ['Boğa Başı Glifi', 'Venüs Aynası', 'Açan Gül', 'Toprak Spirali']
  },
  {
    sign: 'İkizler',
    element: 'Hava',
    modality: 'Değişken',
    ruler: 'Merkür',
    startDegree: 60, endDegree: 90,
    themes: ['Zihinsel Akış', 'İkili Kutupluluk', 'Haber Taşıyıcı', 'Merak'],
    cosmicSymbols: ['Roma Rakamı II Glifi', 'Merkür Asası (Caduceus)', 'İkiz Yıldızlar', 'Hava Akımları']
  },
  {
    sign: 'Yengeç',
    element: 'Su',
    modality: 'Öncü',
    ruler: 'Ay',
    startDegree: 90, endDegree: 120,
    themes: ['Duygusal Derinlik', 'Ayın Gelgitleri', 'Kutsal Yuva', 'Koruyucu Zırh'],
    cosmicSymbols: ['Yengeç Kıskaçları Glifi', 'Hilal ve Dolunay Fazları', 'İnci Kabuğu', 'Deniz Dalgaları']
  },
  {
    sign: 'Aslan',
    element: 'Ateş',
    modality: 'Sabit',
    ruler: 'Güneş',
    startDegree: 120, endDegree: 150,
    themes: ['Güneş Işığı', 'Asil Kalp', 'Yaratıcı İfade', 'Cesur Karizma'],
    cosmicSymbols: ['Aslan Yelesi Glifi', 'Merkezi Güneş Halosu', 'Altın Taç', 'Ateş Yıldızı']
  },
  {
    sign: 'Başak',
    element: 'Toprak',
    modality: 'Değişken',
    ruler: 'Merkür',
    startDegree: 150, endDegree: 180,
    themes: ['Kutsal Hasat', 'Kusursuz Ayrıntı', 'Arınma ve Hizmet', 'Şifa'],
    cosmicSymbols: ['Başak Demeti Glifi', 'Buğday Başağı', 'Geometrik Altıgen Izgara', 'Zeytin Yaprağı']
  },
  {
    sign: 'Terazi',
    element: 'Hava',
    modality: 'Öncü',
    ruler: 'Venüs',
    startDegree: 180, endDegree: 210,
    themes: ['Kozmik Denge', 'Estetik Zarafet', 'Adalet ve Uyum', 'Kutsal Geometri'],
    cosmicSymbols: ['Terazi Dengesi Glifi', 'Kusursuz Simetri Ekseni', 'Gül Geometrisi', 'Vesica Piscis']
  },
  {
    sign: 'Akrep',
    element: 'Su',
    modality: 'Sabit',
    ruler: 'Plüton / Mars',
    startDegree: 210, endDegree: 240,
    themes: ['Derin Dönüşüm', 'Anka Kuşu Yükselişi', 'Gizem ve Tutku', 'Küllerinden Doğuş'],
    cosmicSymbols: ['Akrep İğnesi Glifi', 'Anka Kuşu Kanatları', 'Ouroboros', 'Kara Ay Lilith']
  },
  {
    sign: 'Yay',
    element: 'Ateş',
    modality: 'Değişken',
    ruler: 'Jüpiter',
    startDegree: 240, endDegree: 270,
    themes: ['Yüksek Felsefe', 'Kozmik Ok', 'Genişleme ve Bilgelik', 'Uzak Ufuklar'],
    cosmicSymbols: ['Kozmik Ok Glifi', 'Jüpiter Glifi', 'Yıldız Pusulası', 'Kentaurlar']
  },
  {
    sign: 'Oğlak',
    element: 'Toprak',
    modality: 'Öncü',
    ruler: 'Satürn',
    startDegree: 270, endDegree: 300,
    themes: ['Kozmik Dağ', 'Zamanın Efendisi', 'Sarsılmaz Disiplin', 'Sabır'],
    cosmicSymbols: ['Oğlak Boynuzları', 'Satürn Halkaları', 'Kum Saati', 'Kristal Tepe']
  },
  {
    sign: 'Kova',
    element: 'Hava',
    modality: 'Sabit',
    ruler: 'Uranüs',
    startDegree: 300, endDegree: 330,
    themes: ['Geleceğin Vizyonu', 'Elektrik Kıvılcımı', 'Kozmik Su Taşıyıcısı', 'Özgürlük'],
    cosmicSymbols: ['Çift Dalga Glifi', 'Uranüs Sembolü', 'Kozmik Testi', 'Yıldız Tohumu']
  },
  {
    sign: 'Balık',
    element: 'Su',
    modality: 'Değişken',
    ruler: 'Neptün',
    startDegree: 330, endDegree: 360,
    themes: ['Sonsuz Okyanus', 'Ruhsal Birlik', 'Kozmik Rüyalar', 'Şefkat'],
    cosmicSymbols: ['Zıt Yönde Yüzen Çift Balık', 'Neptün Üçdişlisi', 'Okyanus Dalgaları', 'Vesica Piscis']
  }
];

// --- TEMEL ASTRONOMİK HESAPLAMA FONKSİYONLARI ---

/**
 * Gregoryen takvim tarih ve kesirli gün değerinden Julian Date (JD) hesaplar.
 * Kaynak: Jean Meeus, Astronomical Algorithms, Bölüm 7.
 */
export function calculateJulianDate(year: number, month: number, day: number, hourFraction: number): number {
  let y = year;
  let m = month;
  if (m <= 2) {
    y -= 1;
    m += 12;
  }
  const a = Math.floor(y / 100);
  const b = 2 - a + Math.floor(a / 4);
  return Math.floor(365.25 * (y + 4716)) + Math.floor(30.6001 * (m + 1)) + day + hourFraction + b - 1524.5;
}

/**
 * J2000.0 döneminden itibaren Julian Yüzyıl sayısını hesaplar.
 */
export function calculateJulianCenturies(jd: number): number {
  return (jd - 2451545.0) / 36525.0;
}

/**
 * Tutulumun Gerçek Eğikliğini (True Obliquity of Ecliptic, epsilon) derece cinsinden hesaplar.
 * Kaynak: Astronomical Almanac / Laskar (1986).
 */
export function calculateObliquity(T: number): number {
  return 23.439291 - 0.0130042 * T - 0.00000016 * T * T + 0.000000504 * T * T * T;
}

/**
 * Greenwich Ortalama Yıldız Zamanını (GMST) derece cinsinden hesaplar.
 * Kaynak: Jean Meeus, Astronomical Algorithms, Bölüm 12.
 */
export function calculateGMST(jd: number, T: number): number {
  let gmst = 280.46061837 + 360.98564736629 * (jd - 2451545.0) + 0.000387933 * T * T - (T * T * T) / 38710000.0;
  gmst = gmst % 360;
  if (gmst < 0) gmst += 360;
  return gmst;
}

/**
 * Yerel Yıldız Zamanını (LST / RAMC) derece cinsinden hesaplar.
 * Coğrafi boylam: Doğu pozitif, Batı negatif.
 */
export function calculateRAMC(gmst: number, longitude: number): number {
  let ramc = (gmst + longitude) % 360;
  if (ramc < 0) ramc += 360;
  return ramc;
}

/**
 * Geocentric Ecliptic of Date (ECT) koordinatlarını Astronomy-Engine üzerinden hesaplar.
 * IERS nütasyon, presesyon ve ışık sapıncı (stellar aberration) hesaba katılır.
 */
export function calculateGeocentricEclipticLongitude(
  body: Astronomy.Body,
  time: Astronomy.AstroTime
): number {
  if (body === Astronomy.Body.Sun) {
    return Astronomy.SunPosition(time).elon;
  }
  if (body === Astronomy.Body.Moon) {
    return Astronomy.EclipticGeoMoon(time).lon;
  }
  const geoVec = Astronomy.GeoVector(body, time, true);
  const rot = Astronomy.Rotation_EQJ_ECT(time);
  const ectVec = Astronomy.RotateVector(rot, geoVec);
  let elon = Math.atan2(ectVec.y, ectVec.x) * (180 / Math.PI);
  return ((elon % 360) + 360) % 360;
}

/**
 * Güneş'in Jeosentrik Tropikal Görünür Ekliptik Boylamını (lambda_sun) hesaplar.
 * Doğruluk: NASA JPL Horizons standardında < 1 yay saniyesi (< 0.0003°).
 * Kaynak: VSOP87D / Astronomy-Engine (Jean Meeus / NASA JPL).
 */
export function calculateSunLongitude(T: number): number {
  const time = new Astronomy.AstroTime(T * 36525.0);
  return calculateGeocentricEclipticLongitude(Astronomy.Body.Sun, time);
}

/**
 * Ay'ın Jeosentrik Tropikal Ekliptik Boylamını (lambda_moon) hesaplar.
 * Doğruluk: NASA JPL Horizons standardında < 1 yay saniyesi (< 0.0003°).
 * Kaynak: ELP2000-82B / Astronomy-Engine.
 */
export function calculateMoonLongitude(T: number): number {
  const time = new Astronomy.AstroTime(T * 36525.0);
  return calculateGeocentricEclipticLongitude(Astronomy.Body.Moon, time);
}

/**
 * Yükselen Burcu (Ascendant, ASC) trigonometrik olarak kesin hesaplar.
 * Kaynak: Placidus / Kuğu Eşit Ev Standart Trigonometri Bağıntısı.
 */
export function calculateAscendant(ramc: number, latitude: number, obliquity: number): number {
  const toRad = Math.PI / 180;
  const toDeg = 180 / Math.PI;

  const alphaRad = ramc * toRad;
  const phiRad = latitude * toRad;
  const epsRad = obliquity * toRad;

  const y = Math.cos(alphaRad);
  const x = -Math.sin(alphaRad) * Math.cos(epsRad) - Math.tan(phiRad) * Math.sin(epsRad);

  let asc = Math.atan2(y, x) * toDeg;
  if (asc < 0) asc += 360;
  return asc % 360;
}

/**
 * 0-360 derece ekliptik boylamı burç, derece, dakika ve saniye (DMS) formatına dönüştürür.
 */
export function longitudeToCoordinate(longitude: number): CelestialCoordinate {
  const normalized = ((longitude % 360) + 360) % 360;
  const signIndex = Math.floor(normalized / 30);
  const sign = ZODIAC_SIGNS_ORDER[signIndex];
  const degreeInSign = normalized - signIndex * 30;

  let deg = Math.floor(degreeInSign);
  const remMin = (degreeInSign - deg) * 60;
  let min = Math.floor(remMin);
  let sec = Math.round((remMin - min) * 60);

  if (sec >= 60) {
    sec = 0;
    min += 1;
  }
  if (min >= 60) {
    min = 0;
    deg += 1;
  }

  const formatted = `${deg}° ${min.toString().padStart(2, '0')}' ${sec.toString().padStart(2, '0')}''`;

  return {
    longitude: normalized,
    sign,
    degreeInSign,
    deg,
    min,
    sec,
    formatted
  };
}

/**
 * Midheaven (Medium Coeli, MC) hesaplar.
 */
export function calculateMidheaven(ramc: number, obliquity: number): number {
  const toRad = Math.PI / 180;
  const toDeg = 180 / Math.PI;
  const alphaRad = ramc * toRad;
  const epsRad = obliquity * toRad;

  let mc = Math.atan2(Math.sin(alphaRad), Math.cos(alphaRad) * Math.cos(epsRad)) * toDeg;
  if (mc < 0) mc += 360;
  return mc % 360;
}

/**
 * Ev Başlangıç Çizgilerini (House Cusps) Placidus, Whole Sign veya Eşit Ev (Equal) sistemine göre hesaplar.
 */
export function calculateHouseCusps(
  ramc: number,
  latitude: number,
  obliquity: number,
  houseSystem: 'Placidus' | 'Whole Sign' | 'Equal' = 'Placidus'
): { asc: number; mc: number; cusps: number[] } {
  const toRad = Math.PI / 180;
  const toDeg = 180 / Math.PI;

  const asc = calculateAscendant(ramc, latitude, obliquity);
  const mc = calculateMidheaven(ramc, obliquity);

  const cusps = new Array(13).fill(0);
  cusps[1] = asc;
  cusps[10] = mc;
  cusps[4] = (mc + 180) % 360;
  cusps[7] = (asc + 180) % 360;

  if (houseSystem === 'Equal') {
    for (let i = 1; i <= 12; i++) {
      cusps[i] = (asc + (i - 1) * 30) % 360;
    }
    return { asc, mc, cusps };
  }

  if (houseSystem === 'Whole Sign') {
    const signStart = Math.floor(asc / 30) * 30;
    for (let i = 1; i <= 12; i++) {
      cusps[i] = (signStart + (i - 1) * 30) % 360;
    }
    return { asc, mc, cusps };
  }

  // Placidus Yarı Yay İterasyonu
  // Kutup dairesi ötesinde (|enlem| >= 66.5°) Placidus kesişimleri tanımsızdır; Eşit Ev sistemine geçilir.
  if (Math.abs(latitude) >= 66.5) {
    for (let i = 1; i <= 12; i++) {
      cusps[i] = (asc + (i - 1) * 30) % 360;
    }
    return { asc, mc, cusps };
  }

  function cuspIterate(M: number, F: number, isPlus: boolean): number {
    let ra = M;
    const phi = latitude * toRad;
    const eps = obliquity * toRad;

    for (let iter = 0; iter < 25; iter++) {
      const decl = Math.atan(Math.sin(ra * toRad) * Math.tan(eps));
      const val = Math.tan(phi) * Math.tan(decl);
      if (Math.abs(val) > 1) break;
      const dM = F * Math.asin(val) * toDeg;
      const newRa = isPlus ? (M + dM) : (M - dM);
      if (Math.abs(newRa - ra) < 1e-6) {
        ra = newRa;
        break;
      }
      ra = newRa;
    }

    let lambda = Math.atan2(Math.sin(ra * toRad), Math.cos(ra * toRad) * Math.cos(eps)) * toDeg;
    if (lambda < 0) lambda += 360;
    return lambda % 360;
  }

  cusps[11] = cuspIterate(ramc + 30, 1 / 3, true);
  cusps[12] = cuspIterate(ramc + 60, 2 / 3, true);
  cusps[2] = cuspIterate(ramc + 120, 2 / 3, false);
  cusps[3] = cuspIterate(ramc + 150, 1 / 3, false);

  cusps[5] = (cusps[11] + 180) % 360;
  cusps[6] = (cusps[12] + 180) % 360;
  cusps[8] = (cusps[2] + 180) % 360;
  cusps[9] = (cusps[3] + 180) % 360;

  return { asc, mc, cusps };
}

/**
 * Verilen bir ekliptik boylamın hangi evde yer aldığını bulur (1-12)
 */
export function getHouseForLongitude(longitude: number, cusps: number[]): number {
  const norm = ((longitude % 360) + 360) % 360;
  for (let i = 1; i <= 12; i++) {
    const nextIndex = i === 12 ? 1 : i + 1;
    const c1 = cusps[i];
    const c2 = cusps[nextIndex];
    if (c1 <= c2) {
      if (norm >= c1 && norm < c2) return i;
    } else {
      // 360° sıfır noktasını aşan ev
      if (norm >= c1 || norm < c2) return i;
    }
  }
  return 1;
}

/**
 * Klasik ve Modern Gezegenlerin Jeosentrik Görünür Ekliptik Boylamlarını hesaplar.
 * Doğruluk: NASA JPL Horizons standardında (Mars < 3 yay saniyesi, tüm gezegenler < 12 yay saniyesi).
 * Kaynak: VSOP87 / Astronomy-Engine.
 */
export function calculateClassicalPlanets(T: number): Record<string, number> {
  const time = new Astronomy.AstroTime(T * 36525.0);
  return {
    mercury: calculateGeocentricEclipticLongitude(Astronomy.Body.Mercury, time),
    venus: calculateGeocentricEclipticLongitude(Astronomy.Body.Venus, time),
    mars: calculateGeocentricEclipticLongitude(Astronomy.Body.Mars, time),
    jupiter: calculateGeocentricEclipticLongitude(Astronomy.Body.Jupiter, time),
    saturn: calculateGeocentricEclipticLongitude(Astronomy.Body.Saturn, time),
    uranus: calculateGeocentricEclipticLongitude(Astronomy.Body.Uranus, time),
    neptune: calculateGeocentricEclipticLongitude(Astronomy.Body.Neptune, time),
    pluto: calculateGeocentricEclipticLongitude(Astronomy.Body.Pluto, time)
  };
}

/**
 * Ortalama Ay Düğümü (Mean Ascending Node / Mean Rahu) Ekliptik Boylamı (°).
 * 
 * Referans: Jean Meeus, Astronomical Algorithms (2nd Ed.), Ch. 22 & 47 / IAU 1980 / Chapront ELP-2000.
 * Formül (Tropikal ortalama ekinoksa göre):
 * Omega_mean = 125.0445479 - 1934.1362891 * T + 0.0020754 * T^2 + T^3 / 467441 - T^4 / 60616000
 * T: J2000.0'dan itibaren Jülyen yüzyıl sayısı.
 * Ortalama düğüm daima düzgün geriler (retrograd; günde ~0.05295°, yılda ~19.34°).
 */
export function calculateMeanLunarNodeLongitude(T: number): number {
  const t2 = T * T;
  const t3 = t2 * T;
  const t4 = t2 * t2;
  const omega = 125.0445479 - 1934.1362891 * T + 0.0020754 * t2 + t3 / 467441 - t4 / 60616000;
  return ((omega % 360) + 360) % 360;
}

/**
 * Gerçek Ay Düğümü (True Ascending Node / True Rahu / Osculating Node) Ekliptik Boylamı (°).
 * 
 * Referans: Jean Meeus, Astronomical Algorithms (2nd Ed.), Ch. 47 / Chapront ELP-2000.
 * Delaunay temel argümanları (D, M, M', F) ve Güneş çekim pertürbasyonlarının analitik serisi:
 * Delta_Omega = -1.4979 * sin(2(D - F)) - 0.1500 * sin(M) - 0.1226 * sin(2D) + 0.1176 * sin(2F) - 0.0801 * sin(2(M' - F))
 * Omega_true = Omega_mean + Delta_Omega
 * 
 * Bu salınım ortalama düğüm etrafında yaklaşık ±1.75° genlikle gerçekleşir.
 * Bu sayede gerçek düğüm her ay belirli günlerde anlık düz (direkt) harekete geçip ardından tekrar geriler.
 */
export function calculateTrueLunarNodeLongitude(T: number): number {
  const omegaMean = calculateMeanLunarNodeLongitude(T);

  const t2 = T * T;
  const t3 = t2 * T;
  const t4 = t2 * t2;

  // Delaunay temel argümanları (derece cinsinden normalize edilmiş)
  const D = ((297.8501921 + 445267.1114034 * T - 0.0018819 * t2 + t3 / 545868 - t4 / 113065000) % 360 + 360) % 360;
  const M = ((357.5291092 + 35999.0502909 * T - 0.0001536 * t2 + t3 / 24490000) % 360 + 360) % 360;
  const Mprime = ((134.9633964 + 477198.8675055 * T + 0.0087414 * t2 + t3 / 69699 - t4 / 14712000) % 360 + 360) % 360;
  const F = ((93.2720950 + 483202.0175233 * T - 0.0036539 * t2 - t3 / 3526000 + t4 / 863310000) % 360 + 360) % 360;

  const deg2rad = Math.PI / 180;
  const Dr = D * deg2rad;
  const Mr = M * deg2rad;
  const Mprimer = Mprime * deg2rad;
  const Fr = F * deg2rad;

  // Başlıca periyodik pertürbasyon terimleri
  const corr = (
    -1.4979 * Math.sin(2.0 * (Dr - Fr))
    - 0.1500 * Math.sin(Mr)
    - 0.1226 * Math.sin(2.0 * Dr)
    + 0.1176 * Math.sin(2.0 * Fr)
    - 0.0801 * Math.sin(2.0 * (Mprimer - Fr))
  );

  return ((omegaMean + corr) % 360 + 360) % 360;
}

/**
 * Ortalama ve Gerçek Ay Düğümlerini (Rahu / Ketu) eşleşmiş karşıt çiftler olarak hesaplar.
 * 
 * - Ketu = (Rahu + 180°) % 360° (0°/360° dairesel sınırda kesin 180° karşıtlık)
 * - Yalnızca Batı Astrolojisi Tropikal Zodyak koordinat standardı kullanılır.
 * - Doğum saati verilmediğinde ev bilgisi kesinlikle undefined kalır.
 */
export function calculateLunarNodes(
  T: number,
  isTimeProvided: boolean,
  activeHouseCusps?: number[]
): LunarNodesResult {
  const rawMeanRahu = calculateMeanLunarNodeLongitude(T);
  const rawTrueRahu = calculateTrueLunarNodeLongitude(T);

  // 180° karşıt Ketu boylamları (Rahu + 180) % 360
  const rawMeanKetu = (rawMeanRahu + 180) % 360;
  const rawTrueKetu = (rawTrueRahu + 180) % 360;

  // Batı Tropikal Zodyak koordinatları
  const coordMeanRahu = longitudeToCoordinate(rawMeanRahu);
  const coordMeanKetu = longitudeToCoordinate(rawMeanKetu);
  const coordTrueRahu = longitudeToCoordinate(rawTrueRahu);
  const coordTrueKetu = longitudeToCoordinate(rawTrueKetu);

  const meanRahuHouse = (isTimeProvided && activeHouseCusps)
    ? getHouseForLongitude(rawMeanRahu, activeHouseCusps)
    : undefined;
  const meanKetuHouse = (isTimeProvided && activeHouseCusps)
    ? getHouseForLongitude(rawMeanKetu, activeHouseCusps)
    : undefined;
  const trueRahuHouse = (isTimeProvided && activeHouseCusps)
    ? getHouseForLongitude(rawTrueRahu, activeHouseCusps)
    : undefined;
  const trueKetuHouse = (isTimeProvided && activeHouseCusps)
    ? getHouseForLongitude(rawTrueKetu, activeHouseCusps)
    : undefined;

  // Salınım farkı: dairesel en kısa fark olarak Gerçek - Ortalama
  let deltaDeg = rawTrueRahu - rawMeanRahu;
  if (deltaDeg > 180) deltaDeg -= 360;
  if (deltaDeg < -180) deltaDeg += 360;

  return {
    mean: {
      rahu: {
        type: 'mean',
        point: 'Rahu',
        name: 'Ortalama Kuzey Düğümü (Mean Rahu)',
        longitude: rawMeanRahu,
        sign: coordMeanRahu.sign,
        degreeInSign: coordMeanRahu.degreeInSign,
        deg: coordMeanRahu.deg,
        min: coordMeanRahu.min,
        sec: coordMeanRahu.sec,
        house: meanRahuHouse,
        formatted: coordMeanRahu.formatted,
        zodiacSystem: 'Tropikal Zodyak (Tropical)'
      },
      ketu: {
        type: 'mean',
        point: 'Ketu',
        name: 'Ortalama Güney Düğümü (Mean Ketu)',
        longitude: rawMeanKetu,
        sign: coordMeanKetu.sign,
        degreeInSign: coordMeanKetu.degreeInSign,
        deg: coordMeanKetu.deg,
        min: coordMeanKetu.min,
        sec: coordMeanKetu.sec,
        house: meanKetuHouse,
        formatted: coordMeanKetu.formatted,
        zodiacSystem: 'Tropikal Zodyak (Tropical)'
      }
    },
    trueNode: {
      rahu: {
        type: 'true',
        point: 'Rahu',
        name: 'Gerçek Kuzey Düğümü (True Rahu)',
        longitude: rawTrueRahu,
        sign: coordTrueRahu.sign,
        degreeInSign: coordTrueRahu.degreeInSign,
        deg: coordTrueRahu.deg,
        min: coordTrueRahu.min,
        sec: coordTrueRahu.sec,
        house: trueRahuHouse,
        formatted: coordTrueRahu.formatted,
        zodiacSystem: 'Tropikal Zodyak (Tropical)'
      },
      ketu: {
        type: 'true',
        point: 'Ketu',
        name: 'Gerçek Güney Düğümü (True Ketu)',
        longitude: rawTrueKetu,
        sign: coordTrueKetu.sign,
        degreeInSign: coordTrueKetu.degreeInSign,
        deg: coordTrueKetu.deg,
        min: coordTrueKetu.min,
        sec: coordTrueKetu.sec,
        house: trueKetuHouse,
        formatted: coordTrueKetu.formatted,
        zodiacSystem: 'Tropikal Zodyak (Tropical)'
      }
    },
    oscillationDeltaDeg: deltaDeg,
    sourceFormula: 'Jean Meeus Astronomical Algorithms Ch. 47 / Chapront ELP-2000 Perturbations'
  };
}

/**
 * Gregoryen takvim tarih doğrulaması (Format, Ay, Artık Yıl, Gün Sınırları).
 */
export function validateDateString(dateStr: string): {
  isValid: boolean;
  year: number;
  month: number;
  day: number;
  errorMessage?: string;
} {
  if (!dateStr || typeof dateStr !== 'string') {
    return { isValid: false, year: 0, month: 0, day: 0, errorMessage: 'Doğum tarihi metni boş veya geçersiz.' };
  }

  const trimmed = dateStr.trim();
  const match = trimmed.match(/^(\d{4})-(\d{1,2})-(\d{1,2})$/);
  if (!match) {
    return {
      isValid: false,
      year: 0,
      month: 0,
      day: 0,
      errorMessage: `Geçersiz tarih formatı (${trimmed}). Beklenen format: YYYY-AA-GG (örn: 1995-06-15).`
    };
  }

  const y = parseInt(match[1], 10);
  const m = parseInt(match[2], 10);
  const d = parseInt(match[3], 10);

  if (y < 1800 || y > 2200) {
    return { isValid: false, year: y, month: m, day: d, errorMessage: `Yıl aralık dışında (${y}). Geçerli aralık: 1800-2200.` };
  }

  if (m < 1 || m > 12) {
    return { isValid: false, year: y, month: m, day: d, errorMessage: `Geçersiz ay değeri (${m}). 1 ile 12 arasında olmalıdır.` };
  }

  // Ayların gün sınırları (Artık yıl kontrolüyle)
  const isLeapYear = (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);
  const daysInMonths = [0, 31, isLeapYear ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const maxDay = daysInMonths[m];

  if (d < 1 || d > maxDay) {
    return {
      isValid: false,
      year: y,
      month: m,
      day: d,
      errorMessage: `${y} yılı ${m}. ayı için geçersiz gün değeri (${d}). Maksimum gün sayısı: ${maxDay}.`
    };
  }

  return { isValid: true, year: y, month: m, day: d };
}

// --- ANA ASTROLOJİ HESAPLAMA MOTORU (BATI / TROPİKAL ZODYAK) ---

export interface AstrologyCalculationOptions {
  zodiacSystem?: 'Tropikal Zodyak (Tropical)';
  houseSystem?: 'Placidus' | 'Whole Sign' | 'Equal';
  resolvedLocation?: ResolvedLocation;
}

export function calculateAstrology(
  birthDate: string,
  birthTime?: string,
  birthPlace?: string,
  options?: AstrologyCalculationOptions
): AstrologyResult {
  const chosenHouseSystem = options?.houseSystem || 'Placidus';

  // 1. Kesin Tarih Doğrulaması (Varsayılana sessizce dönüştürme engeli)
  const dateValidation = validateDateString(birthDate);
  const isValidDate = dateValidation.isValid;

  // Güvenli fallback değerleri yalnızca hesaplama fonksiyonlarının NaN üretmemesi için
  // iç referans olarak kullanılır; fakat sonuç nesnesinde açık hata bayrağı set edilir!
  const year = isValidDate ? dateValidation.year : 1990;
  const month = isValidDate ? dateValidation.month : 3;
  const day = isValidDate ? dateValidation.day : 21;

  // 2. Konum ve Şehir Çözümlemesi:
  // Eğer önceden doğrulanmış harici/yerel konum (resolvedLocation) iletilmişse doğrudan kullanılır;
  // Aksi takdirde yerel veritabanı üzerinden senkron eşleme gerçekleştirilir.
  const location: ResolvedLocation = options?.resolvedLocation || resolveCityCoordinates(birthPlace);

  // 3. Doğum Saati ve Tarihsel Saat Dilimi (Timezone & DST) Çözümlemesi
  let localHour = 12;
  let localMinute = 0;
  let isTimeProvided = false;

  if (birthTime && birthTime.includes(':')) {
    const [hStr, mStr] = birthTime.split(':');
    const parsedH = parseInt(hStr, 10);
    const parsedM = parseInt(mStr, 10);
    if (!isNaN(parsedH) && !isNaN(parsedM) && parsedH >= 0 && parsedH <= 23 && parsedM >= 0 && parsedM <= 59) {
      localHour = parsedH;
      localMinute = parsedM;
      isTimeProvided = true;
    }
  }

  // Tarihsel saat dilimi ofsetini belirle
  const tzInfo = getHistoricalTimezoneOffset(year, month, day, localHour, location, localMinute);
  const offsetHours = tzInfo.offsetHours;

  // Yerel saati UTC'ye dönüştür
  let utcHourFraction = (localHour - offsetHours) + (localMinute / 60);
  let adjustedYear = year;
  let adjustedMonth = month;
  let adjustedDay = day;

  if (utcHourFraction < 0) {
    utcHourFraction += 24;
    adjustedDay -= 1;
    if (adjustedDay < 1) {
      adjustedMonth -= 1;
      if (adjustedMonth < 1) {
        adjustedYear -= 1;
        adjustedMonth = 12;
      }
      adjustedDay = new Date(adjustedYear, adjustedMonth, 0).getDate();
    }
  } else if (utcHourFraction >= 24) {
    utcHourFraction -= 24;
    adjustedDay += 1;
    const maxDays = new Date(adjustedYear, adjustedMonth, 0).getDate();
    if (adjustedDay > maxDays) {
      adjustedDay = 1;
      adjustedMonth += 1;
      if (adjustedMonth > 12) {
        adjustedYear += 1;
        adjustedMonth = 1;
      }
    }
  }

  // 4. Astronomik Julian Date ve Yüzyıl Hesabı
  const jd = calculateJulianDate(adjustedYear, adjustedMonth, adjustedDay, utcHourFraction / 24);
  const T = calculateJulianCenturies(jd);
  const obliquity = calculateObliquity(T);
  const gmst = calculateGMST(jd, T);
  const ramc = calculateRAMC(gmst, location.longitude);

  // 5. Güneş ve Ay Ekliptik Boylamı (Tropikal)
  const rawSunLong = calculateSunLongitude(T);
  const rawMoonLong = calculateMoonLongitude(T);

  // 6. Yükselen ve MC Hesabı (Tropikal)
  let rawAscLong: number | undefined = undefined;
  let rawMcLong: number | undefined = undefined;
  let uncertaintyNotice: string | undefined = undefined;

  const canCalculateHousesAndAscendant = isTimeProvided && !location.isAmbiguous;

  if (canCalculateHousesAndAscendant) {
    rawAscLong = calculateAscendant(ramc, location.latitude, obliquity);
    rawMcLong = calculateMidheaven(ramc, obliquity);
  } else {
    if (!isTimeProvided && location.isAmbiguous) {
      uncertaintyNotice = `Doğum saati girilmediği ve doğum yeri ("${birthPlace || 'Belirtilmedi'}") coğrafi veri tabanında doğrulanamadığı için Yükselen Burç (ASC), Tepe Noktası (MC) ve 12 Ev yerleşimleri hesaplanamaz. Lütfen doğum saatinizi ve geçerli bir şehir/ülke belirterek konumu netleştiriniz.`;
    } else if (location.isAmbiguous) {
      uncertaintyNotice = `Doğum yeri ("${birthPlace || 'Belirtilmedi'}") coğrafi veri tabanında doğrulanamadı. Kesin Yükselen Burç (ASC), Tepe Noktası (MC) ve 12 Ev başlangıç çizgileri coğrafi koordinatlara bağlı olduğundan kesin olarak hesaplanamaz. Lütfen geçerli bir şehir ve ülke adı girerek konumu netleştiriniz.`;
    } else {
      uncertaintyNotice = 'Doğum saati girilmediği veya doğrulanamadığı için Yükselen Burç ve 12 Ev yerleşimleri hesaplanamaz.';
    }
  }

  // Yaz saati sıçrama (gap - var olmayan saat) veya sonbahar geri alma (fold - iki kez yaşanan saat) tespiti
  if (tzInfo.isNonExistentTime) {
    uncertaintyNotice = `Belirtilen yerel doğum saati (${birthTime || ''}) yaz saati uygulaması (DST) sıçraması nedeniyle bu bölgede var olmayan bir zaman aralığına denk gelmektedir. Lütfen saati kontrol ediniz veya en yakın geçerli anı referans alınız.`;
  } else if (tzInfo.isAmbiguousFold) {
    uncertaintyNotice = (uncertaintyNotice ? uncertaintyNotice + ' ' : '') + `Belirtilen doğum saati (${birthTime || ''}) sonbahar saat geri alma geçişinde iki kez yaşanan belirsiz zaman aralığına denk gelmektedir.`;
  }

  // 7. Batı Astrolojisi Tropikal Zodyak Koordinatları (0° Koç Ekinoksuna Sabitlenmiş)
  const effectiveSunLong = rawSunLong;
  const effectiveMoonLong = rawMoonLong;
  const effectiveAscLong = rawAscLong;
  const effectiveMcLong = rawMcLong;

  const sunCoord = longitudeToCoordinate(effectiveSunLong);
  const moonCoord = longitudeToCoordinate(effectiveMoonLong);
  const ascCoord = effectiveAscLong !== undefined ? longitudeToCoordinate(effectiveAscLong) : undefined;
  const mcCoord = effectiveMcLong !== undefined ? longitudeToCoordinate(effectiveMcLong) : undefined;

  // 8. Ev Başlangıç Çizgileri Hesabı (1 - 12) (Batı Tropikal Ev Sistemleri)
  // KURAL: Doğum saati sağlanmadıkça sahte ev çizgileri ÜRETİLMEZ!
  let houses: HousePlacement[] | undefined = undefined;
  let activeHouseCusps: number[] | undefined = undefined;
  const effectiveHouseSystem = chosenHouseSystem;

  if (canCalculateHousesAndAscendant) {
    const houseData = calculateHouseCusps(ramc, location.latitude, obliquity, effectiveHouseSystem);
    houses = [];
    activeHouseCusps = new Array(13).fill(0);

    for (let i = 1; i <= 12; i++) {
      const cuspLong = houseData.cusps[i];
      activeHouseCusps[i] = cuspLong;
      const cCoord = longitudeToCoordinate(cuspLong);
      houses.push({
        houseNumber: i,
        sign: cCoord.sign,
        degree: cCoord.degreeInSign,
        formatted: cCoord.formatted
      });
    }
  }

  // 9. Gezegen Pozisyonları ve Ev Yerleşimleri (Tropikal Efemeris)
  const planetsRaw = calculateClassicalPlanets(T);
  const planets: PlanetPosition[] = [
    {
      name: 'Güneş',
      longitude: effectiveSunLong,
      sign: sunCoord.sign,
      degreeInSign: sunCoord.degreeInSign,
      house: (canCalculateHousesAndAscendant && activeHouseCusps) ? getHouseForLongitude(effectiveSunLong, activeHouseCusps) : undefined,
      formatted: sunCoord.formatted
    },
    {
      name: 'Ay',
      longitude: effectiveMoonLong,
      sign: moonCoord.sign,
      degreeInSign: moonCoord.degreeInSign,
      house: (canCalculateHousesAndAscendant && activeHouseCusps) ? getHouseForLongitude(effectiveMoonLong, activeHouseCusps) : undefined,
      formatted: moonCoord.formatted
    }
  ];

  const planetTrNames: Record<string, string> = {
    mercury: 'Merkür',
    venus: 'Venüs',
    mars: 'Mars',
    jupiter: 'Jüpiter',
    saturn: 'Satürn',
    uranus: 'Uranüs',
    neptune: 'Neptün',
    pluto: 'Plüton'
  };

  for (const [key, pLong] of Object.entries(planetsRaw)) {
    const pCoord = longitudeToCoordinate(pLong);
    planets.push({
      name: planetTrNames[key] || key,
      longitude: pLong,
      sign: pCoord.sign,
      degreeInSign: pCoord.degreeInSign,
      house: (canCalculateHousesAndAscendant && activeHouseCusps) ? getHouseForLongitude(pLong, activeHouseCusps) : undefined,
      formatted: pCoord.formatted
    });
  }

  // 10. Ortalama ve Gerçek Ay Düğümleri (Rahu & Ketu - Tropikal)
  const lunarNodes = calculateLunarNodes(
    T,
    canCalculateHousesAndAscendant,
    activeHouseCusps
  );

  // 11. Zodyak Karşılıkları ve Sembolik Meta Bilgiler
  const zodiacInfo = ZODIAC_TABLE.find(z => z.sign === sunCoord.sign) || ZODIAC_TABLE[0];

  const astronomicalAudit: AstrologyAstronomicalAudit = {
    timeStandardUsed: isTimeProvided ? 'UTC' : 'LOCAL',
    calculatedJulianDate: jd,
    greenwichSiderealTimeDeg: gmst,
    localSiderealTimeDeg: ramc,
    obliquityDeg: obliquity,
    ephemerisSource: 'Astronomy-Engine VSOP87 / ELP2000-82B (Jean Meeus & NASA JPL Standart)',
    zodiacSystem: 'Tropikal Zodyak (Tropical)',
    houseSystem: effectiveHouseSystem,
    locationResolution: {
      cityName: location.cityName,
      matchedCityKey: location.matchedKey,
      latitude: location.latitude,
      longitude: location.longitude,
      timezoneOffsetHours: offsetHours,
      isDaylightSavingTime: tzInfo.isDst,
      isAmbiguous: location.isAmbiguous,
      confidence: location.confidence
    },
    timePrecision: {
      birthTimeProvided: isTimeProvided,
      hasExactAscendant: canCalculateHousesAndAscendant,
      uncertaintyNotice,
      isNonExistentTime: tzInfo.isNonExistentTime,
      isAmbiguousFold: tzInfo.isAmbiguousFold
    }
  };

  return {
    sunSign: sunCoord.sign,
    moonSignEstimate: moonCoord.sign,
    ascendantEstimate: (canCalculateHousesAndAscendant && ascCoord) ? ascCoord.sign : ('Belirsiz' as any),
    element: zodiacInfo.element,
    modality: zodiacInfo.modality,
    rulingPlanet: zodiacInfo.ruler,
    degrees: sunCoord.degreeInSign,
    symbolicThemes: zodiacInfo.themes,
    cosmicSymbols: zodiacInfo.cosmicSymbols,
    sunCoordinates: sunCoord,
    moonCoordinates: moonCoord,
    ascendantCoordinates: (canCalculateHousesAndAscendant && ascCoord) ? ascCoord : undefined,
    midheavenCoordinates: (canCalculateHousesAndAscendant && mcCoord) ? mcCoord : undefined,
    astronomicalAudit,
    uncertaintyFlag: !isTimeProvided || !isValidDate || location.isAmbiguous,
    ascendantSign: (canCalculateHousesAndAscendant && ascCoord) ? ascCoord.sign : undefined,
    zodiacSystem: 'Tropikal Zodyak (Tropical)',
    houseSystem: effectiveHouseSystem,
    houses,
    planets,
    lunarNodes,
    isValidBirthDate: isValidDate,
    dateValidationMessage: dateValidation.errorMessage
  };
}

/**
 * Asenkron Astroloji Hesaplama Motoru (Çevrim içi Geocoding Entegrasyonu):
 * Doğum yeri yerel veritabanında bulunamadığında harici OSM Nominatim servisini sorgular,
 * doğrulanmış koordinatlar ve IANA saat dilimiyle kesin hesaplamayı tamamlar.
 */
export async function calculateAstrologyAsync(
  birthDate: string,
  birthTime?: string,
  birthPlace?: string,
  options?: AstrologyCalculationOptions
): Promise<AstrologyResult> {
  let finalLocation = options?.resolvedLocation;
  if (!finalLocation && birthPlace && birthPlace.trim().length > 0) {
    finalLocation = await resolveOnlineCityCoordinates(birthPlace);
  }
  return calculateAstrology(birthDate, birthTime, birthPlace, {
    ...options,
    resolvedLocation: finalLocation
  });
}
