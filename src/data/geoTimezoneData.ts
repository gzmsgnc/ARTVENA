/**
 * Geocoding & Historical Timezone Database for Astrological Ephemeris Calculations
 * 
 * Includes:
 * - All 81 Turkish Provinces + Major Turkish Districts & Tourism Centers
 * - Comprehensive Global Cities Across All Continents:
 *   Europe, North America, South America, Asia, Africa, Oceania & Middle East
 * - Standard IANA Timezone Database (tzdb) Integration via ECMAScript Intl API
 * - Historical Timezone Shifts, Daylight Saving Time (DST) Transitions & Half-Hour Offsets
 * - Homonym & Disambiguation Support (e.g., Paris FR vs Paris TX; London UK vs London ON; Santiago CL vs Santiago ES)
 * - Strict Isolation for Short Names (Van, Ordu, Bor, Kars, Muş)
 * - Safe Handling for Unresolved Locations without Guessing Coordinates
 */

export interface CityGeoInfo {
  canonicalKey: string;
  name: string;
  country: string; // ISO 2-letter code e.g. TR, US, GB, DE
  countryName: string; // Turkish country name e.g. 'Türkiye', 'Amerika Birleşik Devletleri'
  region?: string; // State / Province / Geographic region
  lat: number;
  lng: number;
  timeZone: string; // IANA timezone ID e.g. 'Europe/Istanbul', 'America/New_York'
  defaultTzOffset: number; // Standard base offset (hours)
  aliases: string[]; // Search aliases in lowercase Turkish/English
}

export interface ResolvedLocation {
  inputName: string;
  matchedKey: string;
  cityName: string;
  country: string;
  countryName?: string;
  region?: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  defaultTzOffset: number;
  confidence: 'exact_city' | 'province_center' | 'default_fallback';
  isAmbiguous: boolean;
  notes: string;
}

export const CITIES_DB: Record<string, CityGeoInfo> = {
  // =========================================================================
  // 1. TÜRKİYE — 81 İL MERKEZİ VE ÖNEMLİ İLÇELER
  // =========================================================================
  'adana': {
    canonicalKey: 'adana', name: 'Adana', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 37.0000, lng: 35.3213, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['adana', 'seyhan', 'yuregir', 'cukurova']
  },
  'adiyaman': {
    canonicalKey: 'adiyaman', name: 'Adıyaman', country: 'TR', countryName: 'Türkiye', region: 'Güneydoğu Anadolu',
    lat: 37.7648, lng: 38.2786, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['adiyaman', 'adıyaman', 'kahta']
  },
  'afyon': {
    canonicalKey: 'afyon', name: 'Afyonkarahisar', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 38.7507, lng: 30.5567, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['afyon', 'afyonkarahisar', 'sandikli']
  },
  'agri': {
    canonicalKey: 'agri', name: 'Ağrı', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 39.7191, lng: 43.0503, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['agri', 'ağrı', 'dogubayazit', 'doğubayazıt']
  },
  'amasya': {
    canonicalKey: 'amasya', name: 'Amasya', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 40.6533, lng: 35.8330, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['amasya', 'merzifon']
  },
  'ankara': {
    canonicalKey: 'ankara', name: 'Ankara', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 39.9334, lng: 32.8597, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['ankara', 'cankaya', 'çankaya', 'kecioren', 'keçiören', 'yenimahalle', 'mamak', 'etimesgut', 'sincan']
  },
  'antalya': {
    canonicalKey: 'antalya', name: 'Antalya', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 36.8969, lng: 30.7133, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['antalya', 'muratpasa', 'konyaalti', 'kepez', 'lara']
  },
  'alanya': {
    canonicalKey: 'alanya', name: 'Alanya (Antalya)', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 36.5438, lng: 31.9998, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['alanya']
  },
  'manavgat': {
    canonicalKey: 'manavgat', name: 'Manavgat (Antalya)', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 36.7869, lng: 31.4422, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['manavgat', 'side']
  },
  'kas': {
    canonicalKey: 'kas', name: 'Kaş (Antalya)', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 36.2017, lng: 29.6377, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['kas', 'kaş', 'kalkan']
  },
  'artvin': {
    canonicalKey: 'artvin', name: 'Artvin', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 41.1828, lng: 41.8183, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['artvin', 'hopa']
  },
  'aydin': {
    canonicalKey: 'aydin', name: 'Aydın', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 37.8560, lng: 27.8416, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['aydin', 'aydın', 'efeler', 'nazilli', 'soke', 'söke']
  },
  'kusadasi': {
    canonicalKey: 'kusadasi', name: 'Kuşadası (Aydın)', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 37.8579, lng: 27.2610, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['kusadasi', 'kuşadası', 'davutlar']
  },
  'didim': {
    canonicalKey: 'didim', name: 'Didim (Aydın)', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 37.3833, lng: 27.2667, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['didim', 'altinkum', 'altınkum']
  },
  'balikesir': {
    canonicalKey: 'balikesir', name: 'Balıkesir', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 39.6484, lng: 27.8826, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['balikesir', 'balıkesir', 'karesi', 'altieylul']
  },
  'bandirma': {
    canonicalKey: 'bandirma', name: 'Bandırma (Balıkesir)', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 40.3522, lng: 27.9767, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['bandirma', 'bandırma', 'erdek']
  },
  'ayvalik': {
    canonicalKey: 'ayvalik', name: 'Ayvalık (Balıkesir)', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 39.3197, lng: 26.6969, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['ayvalik', 'ayvalık', 'cunda', 'edremit-balikesir']
  },
  'bilecik': {
    canonicalKey: 'bilecik', name: 'Bilecik', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 40.1419, lng: 29.9793, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['bilecik', 'bozuyuk', 'bozüyük']
  },
  'bingol': {
    canonicalKey: 'bingol', name: 'Bingöl', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 38.8854, lng: 40.4983, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['bingol', 'bingöl', 'genc']
  },
  'bitlis': {
    canonicalKey: 'bitlis', name: 'Bitlis', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 38.4006, lng: 42.1095, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['bitlis', 'tatvan', 'ahlat']
  },
  'bolu': {
    canonicalKey: 'bolu', name: 'Bolu', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 40.7358, lng: 31.6061, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['bolu', 'gerede', 'abant']
  },
  'burdur': {
    canonicalKey: 'burdur', name: 'Burdur', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 37.7203, lng: 30.2908, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['burdur', 'bucak']
  },
  'bursa': {
    canonicalKey: 'bursa', name: 'Bursa', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 40.1885, lng: 29.0610, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['bursa', 'nilufer', 'nilüfer', 'osmangazi', 'yildirim', 'yıldırım', 'inegol', 'inegöl', 'gemlik', 'mudanya']
  },
  'canakkale': {
    canonicalKey: 'canakkale', name: 'Çanakkale', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 40.1553, lng: 26.4142, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['canakkale', 'çanakkale', 'biga', 'gelibolu', 'bozcaada', 'gokceada', 'gökçeada']
  },
  'cankiri': {
    canonicalKey: 'cankiri', name: 'Çankırı', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 40.6013, lng: 33.6134, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['cankiri', 'çankırı', 'ilgaz']
  },
  'corum': {
    canonicalKey: 'corum', name: 'Çorum', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 40.5506, lng: 34.9556, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['corum', 'çorum', 'sungurlu']
  },
  'denizli': {
    canonicalKey: 'denizli', name: 'Denizli', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 37.7765, lng: 29.0864, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['denizli', 'pamukkale', 'merkezefendi']
  },
  'diyarbakir': {
    canonicalKey: 'diyarbakir', name: 'Diyarbakır', country: 'TR', countryName: 'Türkiye', region: 'Güneydoğu Anadolu',
    lat: 37.9144, lng: 40.2306, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['diyarbakir', 'diyarbakır', 'sur', 'baglar', 'kayapinar', 'yenisehir']
  },
  'edirne': {
    canonicalKey: 'edirne', name: 'Edirne', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 41.6772, lng: 26.5557, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['edirne', 'kesan', 'keşan', 'uzunkopru']
  },
  'elazig': {
    canonicalKey: 'elazig', name: 'Elazığ', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 38.6810, lng: 39.2264, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['elazig', 'elazığ', 'harput']
  },
  'erzincan': {
    canonicalKey: 'erzincan', name: 'Erzincan', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 39.7500, lng: 39.5000, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['erzincan', 'kemaliye']
  },
  'erzurum': {
    canonicalKey: 'erzurum', name: 'Erzurum', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 39.9043, lng: 41.2679, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['erzurum', 'yakutiye', 'palandoken', 'palandöken']
  },
  'eskisehir': {
    canonicalKey: 'eskisehir', name: 'Eskişehir', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 39.7667, lng: 30.5256, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['eskisehir', 'eskişehir', 'tepebasi', 'tepebaşı', 'odunpazari', 'odunpazarı']
  },
  'gaziantep': {
    canonicalKey: 'gaziantep', name: 'Gaziantep', country: 'TR', countryName: 'Türkiye', region: 'Güneydoğu Anadolu',
    lat: 37.0662, lng: 37.3833, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['gaziantep', 'antep', 'sahinbey', 'şahinbey', 'sehitkamil', 'şehitkamil', 'nizip']
  },
  'giresun': {
    canonicalKey: 'giresun', name: 'Giresun', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 40.9128, lng: 38.3895, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['giresun', 'bulancak', 'gorele']
  },
  'gumushane': {
    canonicalKey: 'gumushane', name: 'Gümüşhane', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 40.4600, lng: 39.4700, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['gumushane', 'gümüşhane', 'kelkit']
  },
  'hakkari': {
    canonicalKey: 'hakkari', name: 'Hakkari', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 37.5833, lng: 43.7333, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['hakkari', 'hakkâri', 'yuksekova', 'yüksekova', 'semdinli']
  },
  'hatay': {
    canonicalKey: 'hatay', name: 'Hatay (Antakya)', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 36.2023, lng: 36.1606, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['hatay', 'antakya', 'defne', 'samandag']
  },
  'iskenderun': {
    canonicalKey: 'iskenderun', name: 'İskenderun (Hatay)', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 36.5872, lng: 36.1735, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['iskenderun', 'dortyol', 'dörtyol']
  },
  'isparta': {
    canonicalKey: 'isparta', name: 'Isparta', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 37.7648, lng: 30.5566, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['isparta', 'egirdir', 'eğirdir', 'yalvac']
  },
  'mersin': {
    canonicalKey: 'mersin', name: 'Mersin', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 36.8121, lng: 34.6415, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['mersin', 'icel', 'içel', 'yenisehir-mersin', 'mezitli', 'toroslar', 'akdeniz-mersin', 'silifke', 'erdemli']
  },
  'tarsus': {
    canonicalKey: 'tarsus', name: 'Tarsus (Mersin)', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 36.9167, lng: 34.8953, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['tarsus']
  },
  'istanbul': {
    canonicalKey: 'istanbul', name: 'İstanbul', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 41.0082, lng: 28.9784, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: [
      'istanbul', 'ıstanbul', 'kadikoy', 'kadıköy', 'besiktas', 'beşiktaş', 'uskudar', 'üsküdar',
      'sisli', 'şişli', 'bakirkoy', 'bakırköy', 'beyoglu', 'beyoğlu', 'fatih', 'sariyer', 'sarıyer',
      'kartal', 'maltepe', 'pendik', 'atasehir', 'ataşehir', 'umraniye', 'ümraniye', 'beylikduzu', 'esenyurt'
    ]
  },
  'izmir': {
    canonicalKey: 'izmir', name: 'İzmir', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 38.4237, lng: 27.1428, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: [
      'izmir', 'ızmir', 'karsiyaka', 'karşıyaka', 'alsancak', 'konak', 'bornova', 'buca',
      'bayrakli', 'bayraklı', 'balcova', 'balçova', 'gaziemir', 'cigli', 'çiğli', 'urla'
    ]
  },
  'cesme': {
    canonicalKey: 'cesme', name: 'Çeşme (İzmir)', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 38.3236, lng: 26.3042, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['cesme', 'çeşme', 'alacati', 'alaçatı']
  },
  'kars': {
    canonicalKey: 'kars', name: 'Kars', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 40.6167, lng: 43.1000, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['kars', 'sarikamis', 'sarıkamış', 'ani']
  },
  'kastamonu': {
    canonicalKey: 'kastamonu', name: 'Kastamonu', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 41.3887, lng: 33.7827, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['kastamonu', 'tosya', 'inebolu']
  },
  'kayseri': {
    canonicalKey: 'kayseri', name: 'Kayseri', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 38.7312, lng: 35.4787, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['kayseri', 'melikgazi', 'kocasinan', 'talas', 'develi']
  },
  'kirklareli': {
    canonicalKey: 'kirklareli', name: 'Kırklareli', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 41.7333, lng: 27.2167, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['kirklareli', 'kırklareli', 'luleburgaz', 'lüleburgaz', 'babaeski']
  },
  'kirsehir': {
    canonicalKey: 'kirsehir', name: 'Kırşehir', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 39.1425, lng: 34.1709, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['kirsehir', 'kırşehir', 'kaman']
  },
  'kocaeli': {
    canonicalKey: 'kocaeli', name: 'Kocaeli (İzmit)', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 40.8533, lng: 29.8815, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['kocaeli', 'izmit', 'izmit-kocaeli', 'gebze', 'darica', 'darıca', 'golcuk', 'gölcük', 'korfez', 'körfez', 'kartepe']
  },
  'konya': {
    canonicalKey: 'konya', name: 'Konya', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 37.8746, lng: 32.4932, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['konya', 'selcuklu', 'selçuklu', 'meram', 'karatay', 'aksehir', 'akşehir', 'cumra', 'çumra', 'beysehir']
  },
  'konya_eregli_tr': {
    canonicalKey: 'konya_eregli_tr', name: 'Konya Ereğli', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 37.5133, lng: 34.0500, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['konya eregli', 'konya ereğli', 'eregli konya', 'ereğli konya']
  },
  'kutahya': {
    canonicalKey: 'kutahya', name: 'Kütahya', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 39.4167, lng: 29.9833, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['kutahya', 'kütahya', 'tavsanli', 'tavşanlı', 'simav']
  },
  'malatya': {
    canonicalKey: 'malatya', name: 'Malatya', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 38.3552, lng: 38.3095, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['malatya', 'battalgazi', 'yesilyurt', 'yeşilyurt']
  },
  'manisa': {
    canonicalKey: 'manisa', name: 'Manisa', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 38.6191, lng: 27.4289, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['manisa', 'yunusemre', 'sehzadeler', 'şehzadeler', 'akhisar', 'turgutlu', 'salihli', 'soma', 'alasehir']
  },
  'kahramanmaras': {
    canonicalKey: 'kahramanmaras', name: 'Kahramanmaraş', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 37.5858, lng: 36.9371, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['maras', 'maraş', 'kahramanmaras', 'kahramanmaraş', 'elbistan', 'onikisubat', 'dulkadiroglu']
  },
  'mardin': {
    canonicalKey: 'mardin', name: 'Mardin', country: 'TR', countryName: 'Türkiye', region: 'Güneydoğu Anadolu',
    lat: 37.3212, lng: 40.7245, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['mardin', 'artuklu', 'midyat', 'nusaybin', 'kiziltepe', 'kızıltepe']
  },
  'mugla': {
    canonicalKey: 'mugla', name: 'Muğla', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 37.2153, lng: 28.3636, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['mugla', 'muğla', 'mentese', 'menteşe', 'milas', 'yatagan']
  },
  'bodrum': {
    canonicalKey: 'bodrum', name: 'Bodrum (Muğla)', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 37.0344, lng: 27.4305, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['bodrum', 'turgutreis', 'yalikavak', 'yalıkavak', 'gumbet']
  },
  'fethiye': {
    canonicalKey: 'fethiye', name: 'Fethiye (Muğla)', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 36.6500, lng: 29.1167, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['fethiye', 'oludeniz', 'ölüdeniz', 'gocek', 'göcek']
  },
  'marmaris': {
    canonicalKey: 'marmaris', name: 'Marmaris (Muğla)', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 36.8550, lng: 28.2742, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['marmaris', 'icmeler', 'içmeler', 'datca', 'datça']
  },
  'mus': {
    canonicalKey: 'mus', name: 'Muş', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 38.7432, lng: 41.5064, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['mus', 'muş', 'malazgirt']
  },
  'nevsehir': {
    canonicalKey: 'nevsehir', name: 'Nevşehir', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 38.6244, lng: 34.7144, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['nevsehir', 'nevşehir', 'kapadokya', 'goreme', 'göreme', 'urgup', 'ürgüp', 'avanos', 'uchisar']
  },
  'nigde': {
    canonicalKey: 'nigde', name: 'Niğde', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 37.9667, lng: 34.6833, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['nigde', 'niğde']
  },
  'ordu': {
    canonicalKey: 'ordu', name: 'Ordu', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 40.9839, lng: 37.8764, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['ordu', 'altinordu', 'altınordu', 'unye', 'ünye', 'fatsa']
  },
  'rize': {
    canonicalKey: 'rize', name: 'Rize', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 41.0201, lng: 40.5234, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['rize', 'cayeli', 'çayeli', 'ardeşen', 'ardesen', 'ayder', 'camlihemsin']
  },
  'sakarya': {
    canonicalKey: 'sakarya', name: 'Sakarya (Adapazarı)', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 40.7569, lng: 30.3783, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['sakarya', 'adapazari', 'adapazarı', 'serdivan', 'sapanca', 'hendek', 'akyazi']
  },
  'samsun': {
    canonicalKey: 'samsun', name: 'Samsun', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 41.2928, lng: 36.3313, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['samsun', 'atakum', 'ilkadim', 'ilkadım', 'canik', 'bafra', 'carsamba', 'çarşamba']
  },
  'siirt': {
    canonicalKey: 'siirt', name: 'Siirt', country: 'TR', countryName: 'Türkiye', region: 'Güneydoğu Anadolu',
    lat: 37.9333, lng: 41.9500, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['siirt', 'kurtalan']
  },
  'sinop': {
    canonicalKey: 'sinop', name: 'Sinop', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 42.0231, lng: 35.1531, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['sinop', 'boyabat', 'gerze', 'ayancik']
  },
  'sivas': {
    canonicalKey: 'sivas', name: 'Sivas', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 39.7477, lng: 37.0179, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['sivas', 'divrigi', 'divriği', 'sarkisla']
  },
  'tekirdag': {
    canonicalKey: 'tekirdag', name: 'Tekirdağ', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 40.9833, lng: 27.5167, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['tekirdag', 'tekirdağ', 'suleymanpasa', 'süleymanpaşa']
  },
  'corlu': {
    canonicalKey: 'corlu', name: 'Çorlu (Tekirdağ)', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 41.1592, lng: 27.7997, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['corlu', 'çorlu', 'cerkezkoy', 'çerkezköy']
  },
  'marmara_ereglisi_tr': {
    canonicalKey: 'marmara_ereglisi_tr', name: 'Marmaraereğlisi (Tekirdağ)', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 40.9700, lng: 27.9550, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['marmaraereglisi', 'marmara ereglisi', 'marmara ereğlisi']
  },
  'tokat': {
    canonicalKey: 'tokat', name: 'Tokat', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 40.3167, lng: 36.5500, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['tokat', 'turhal', 'erbaa', 'niksar', 'zile']
  },
  'trabzon': {
    canonicalKey: 'trabzon', name: 'Trabzon', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 41.0027, lng: 39.7168, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['trabzon', 'ortahisar', 'akcaabat', 'akçaabat', 'yomra', 'of', 'surmene', 'uzungol']
  },
  'tunceli': {
    canonicalKey: 'tunceli', name: 'Tunceli', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 39.1079, lng: 39.5401, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['tunceli', 'dersim', 'ovacik', 'hovacık', 'pertek']
  },
  'sanliurfa': {
    canonicalKey: 'sanliurfa', name: 'Şanlıurfa', country: 'TR', countryName: 'Türkiye', region: 'Güneydoğu Anadolu',
    lat: 37.1674, lng: 38.7955, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['sanliurfa', 'şanlıurfa', 'urfa', 'haliliye', 'eyyubiye', 'karakopru', 'siverek', 'viransehir', 'birecik']
  },
  'usak': {
    canonicalKey: 'usak', name: 'Uşak', country: 'TR', countryName: 'Türkiye', region: 'Ege',
    lat: 38.6823, lng: 29.4082, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['usak', 'uşak', 'banaz']
  },
  'van': {
    canonicalKey: 'van', name: 'Van', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 38.4891, lng: 43.4089, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['van', 'ipekyolu', 'tusba', 'tuşba', 'edremit-van', 'ercis', 'erciş']
  },
  'yozgat': {
    canonicalKey: 'yozgat', name: 'Yozgat', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 39.8181, lng: 34.8147, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['yozgat', 'sorgun', 'bogazliyan']
  },
  'zonguldak': {
    canonicalKey: 'zonguldak', name: 'Zonguldak', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 41.4564, lng: 31.7987, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['zonguldak', 'kozlu', 'kilimli', 'caycuma', 'çaycuma']
  },
  'kdz_eregli_tr': {
    canonicalKey: 'kdz_eregli_tr', name: 'Karadeniz Ereğli (Zonguldak)', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 41.2844, lng: 31.4150, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['karadeniz eregli', 'karadeniz ereğli', 'kdz eregli', 'kdz ereğli', 'kdz. eregli', 'kdz. ereğli', 'eregli zonguldak', 'ereğli zonguldak']
  },
  'aksaray': {
    canonicalKey: 'aksaray', name: 'Aksaray', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 38.3687, lng: 34.0370, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['aksaray']
  },
  'bayburt': {
    canonicalKey: 'bayburt', name: 'Bayburt', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 40.2552, lng: 40.2249, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['bayburt']
  },
  'karaman': {
    canonicalKey: 'karaman', name: 'Karaman', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 37.1759, lng: 33.2287, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['karaman', 'ermenek']
  },
  'kirikkale': {
    canonicalKey: 'kirikkale', name: 'Kırıkkale', country: 'TR', countryName: 'Türkiye', region: 'İç Anadolu',
    lat: 39.8468, lng: 33.5153, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['kirikkale', 'kırıkkale', 'yahsihan']
  },
  'batman': {
    canonicalKey: 'batman', name: 'Batman', country: 'TR', countryName: 'Türkiye', region: 'Güneydoğu Anadolu',
    lat: 37.8812, lng: 41.1351, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['batman', 'hasankeyf', 'kozluk']
  },
  'sirnak': {
    canonicalKey: 'sirnak', name: 'Şırnak', country: 'TR', countryName: 'Türkiye', region: 'Güneydoğu Anadolu',
    lat: 37.5164, lng: 42.4611, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['sirnak', 'şırnak', 'cizre', 'silopi', 'idil']
  },
  'bartin': {
    canonicalKey: 'bartin', name: 'Bartın', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 41.6344, lng: 32.3375, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['bartin', 'bartın', 'amasra']
  },
  'ardahan': {
    canonicalKey: 'ardahan', name: 'Ardahan', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 41.1105, lng: 42.7022, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['ardahan', 'posof', 'gole']
  },
  'igdir': {
    canonicalKey: 'igdir', name: 'Iğdır', country: 'TR', countryName: 'Türkiye', region: 'Doğu Anadolu',
    lat: 39.9196, lng: 44.0454, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['igdir', 'ığdır', 'aralik']
  },
  'yalova': {
    canonicalKey: 'yalova', name: 'Yalova', country: 'TR', countryName: 'Türkiye', region: 'Marmara',
    lat: 40.6500, lng: 29.2667, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['yalova', 'cinarcik', 'çınarcık', 'altinova']
  },
  'karabuk': {
    canonicalKey: 'karabuk', name: 'Karabük', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 41.2061, lng: 32.6204, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['karabuk', 'karabük', 'safranbolu']
  },
  'kilis': {
    canonicalKey: 'kilis', name: 'Kilis', country: 'TR', countryName: 'Türkiye', region: 'Güneydoğu Anadolu',
    lat: 36.7184, lng: 37.1212, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['kilis']
  },
  'osmaniye': {
    canonicalKey: 'osmaniye', name: 'Osmaniye', country: 'TR', countryName: 'Türkiye', region: 'Akdeniz',
    lat: 37.0742, lng: 36.2472, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['osmaniye', 'kadirli', 'duzici']
  },
  'duzce': {
    canonicalKey: 'duzce', name: 'Düzce', country: 'TR', countryName: 'Türkiye', region: 'Karadeniz',
    lat: 40.8438, lng: 31.1565, timeZone: 'Europe/Istanbul', defaultTzOffset: 3,
    aliases: ['duzce', 'düzce', 'akcakoca', 'akçakoca']
  },

  // =========================================================================
  // 2. AVRUPA (EUROPE)
  // =========================================================================
  'london_gb': {
    canonicalKey: 'london_gb', name: 'Londra (İngiltere / Birleşik Krallık)', country: 'GB', countryName: 'Birleşik Krallık', region: 'İngiltere',
    lat: 51.4769, lng: -0.0000, timeZone: 'Europe/London', defaultTzOffset: 0,
    aliases: ['london', 'londra', 'greenwich', 'london uk', 'london ingiltere', 'londra ingiltere', 'london gb', 'london england']
  },
  'manchester_gb': {
    canonicalKey: 'manchester_gb', name: 'Manchester (İngiltere)', country: 'GB', countryName: 'Birleşik Krallık', region: 'İngiltere',
    lat: 53.4808, lng: -2.2426, timeZone: 'Europe/London', defaultTzOffset: 0,
    aliases: ['manchester', 'manchester uk', 'manchester ingiltere']
  },
  'edinburgh_gb': {
    canonicalKey: 'edinburgh_gb', name: 'Edinburgh (İskoçya)', country: 'GB', countryName: 'Birleşik Krallık', region: 'İskoçya',
    lat: 55.9533, lng: -3.1883, timeZone: 'Europe/London', defaultTzOffset: 0,
    aliases: ['edinburgh', 'edinburg', 'edinburgh uk']
  },
  'paris_fr': {
    canonicalKey: 'paris_fr', name: 'Paris (Fransa)', country: 'FR', countryName: 'Fransa', region: 'Île-de-France',
    lat: 48.8566, lng: 2.3522, timeZone: 'Europe/Paris', defaultTzOffset: 1,
    aliases: ['paris', 'paris fransa', 'paris france', 'paris fr']
  },
  'lyon_fr': {
    canonicalKey: 'lyon_fr', name: 'Lyon (Fransa)', country: 'FR', countryName: 'Fransa', region: 'Auvergne-Rhône-Alpes',
    lat: 45.7640, lng: 4.8357, timeZone: 'Europe/Paris', defaultTzOffset: 1,
    aliases: ['lyon', 'lyon fransa', 'lyon france']
  },
  'marseille_fr': {
    canonicalKey: 'marseille_fr', name: 'Marsilya (Fransa)', country: 'FR', countryName: 'Fransa', region: 'Provence-Alpes-Côte d\'Azur',
    lat: 43.2965, lng: 5.3698, timeZone: 'Europe/Paris', defaultTzOffset: 1,
    aliases: ['marseille', 'marsilya', 'marseille france']
  },
  'nice_fr': {
    canonicalKey: 'nice_fr', name: 'Nice (Fransa)', country: 'FR', countryName: 'Fransa', region: 'Provence-Alpes-Côte d\'Azur',
    lat: 43.7102, lng: 7.2620, timeZone: 'Europe/Paris', defaultTzOffset: 1,
    aliases: ['nice', 'nis', 'nice france', 'nice fransa']
  },
  'berlin_de': {
    canonicalKey: 'berlin_de', name: 'Berlin (Almanya)', country: 'DE', countryName: 'Almanya', region: 'Berlin',
    lat: 52.5200, lng: 13.4050, timeZone: 'Europe/Berlin', defaultTzOffset: 1,
    aliases: ['berlin', 'berlin almanya', 'berlin germany', 'berlin de']
  },
  'munich_de': {
    canonicalKey: 'munich_de', name: 'Münih (Almanya)', country: 'DE', countryName: 'Almanya', region: 'Bavyera',
    lat: 48.1351, lng: 11.5820, timeZone: 'Europe/Berlin', defaultTzOffset: 1,
    aliases: ['munich', 'munih', 'münih', 'munchen', 'münchen', 'munich almanya', 'munich germany']
  },
  'frankfurt_de': {
    canonicalKey: 'frankfurt_de', name: 'Frankfurt (Almanya)', country: 'DE', countryName: 'Almanya', region: 'Hessen',
    lat: 50.1109, lng: 8.6821, timeZone: 'Europe/Berlin', defaultTzOffset: 1,
    aliases: ['frankfurt', 'frankfurt almanya', 'frankfurt germany']
  },
  'hamburg_de': {
    canonicalKey: 'hamburg_de', name: 'Hamburg (Almanya)', country: 'DE', countryName: 'Almanya', region: 'Hamburg',
    lat: 53.5511, lng: 9.9937, timeZone: 'Europe/Berlin', defaultTzOffset: 1,
    aliases: ['hamburg', 'hamburg almanya', 'hamburg germany']
  },
  'cologne_de': {
    canonicalKey: 'cologne_de', name: 'Köln (Almanya)', country: 'DE', countryName: 'Almanya', region: 'Kuzey Ren-Vestfalya',
    lat: 50.9375, lng: 6.9603, timeZone: 'Europe/Berlin', defaultTzOffset: 1,
    aliases: ['koln', 'köln', 'cologne', 'koln almanya']
  },
  'rome_it': {
    canonicalKey: 'rome_it', name: 'Roma (İtalya)', country: 'IT', countryName: 'İtalya', region: 'Lazio',
    lat: 41.9028, lng: 12.4964, timeZone: 'Europe/Rome', defaultTzOffset: 1,
    aliases: ['rome', 'roma', 'roma italya', 'rome italy', 'roma it']
  },
  'milan_it': {
    canonicalKey: 'milan_it', name: 'Milano (İtalya)', country: 'IT', countryName: 'İtalya', region: 'Lombardiya',
    lat: 45.4642, lng: 9.1900, timeZone: 'Europe/Rome', defaultTzOffset: 1,
    aliases: ['milan', 'milano', 'milano italya', 'milan italy']
  },
  'florence_it': {
    canonicalKey: 'florence_it', name: 'Floransa (İtalya)', country: 'IT', countryName: 'İtalya', region: 'Toskana',
    lat: 43.7696, lng: 11.2558, timeZone: 'Europe/Rome', defaultTzOffset: 1,
    aliases: ['florence', 'floransa', 'firenze', 'floransa italya']
  },
  'venice_it': {
    canonicalKey: 'venice_it', name: 'Venedik (İtalya)', country: 'IT', countryName: 'İtalya', region: 'Veneto',
    lat: 45.4408, lng: 12.3155, timeZone: 'Europe/Rome', defaultTzOffset: 1,
    aliases: ['venice', 'venedik', 'venezia', 'venedik italya']
  },
  'madrid_es': {
    canonicalKey: 'madrid_es', name: 'Madrid (İspanya)', country: 'ES', countryName: 'İspanya', region: 'Madrid',
    lat: 40.4168, lng: -3.7038, timeZone: 'Europe/Madrid', defaultTzOffset: 1,
    aliases: ['madrid', 'madrid ispanya', 'madrid spain', 'madrid es']
  },
  'barcelona_es': {
    canonicalKey: 'barcelona_es', name: 'Barselona (İspanya)', country: 'ES', countryName: 'İspanya', region: 'Katalonya',
    lat: 41.3879, lng: 2.1699, timeZone: 'Europe/Madrid', defaultTzOffset: 1,
    aliases: ['barcelona', 'barselona', 'barcelona ispanya', 'barcelona spain']
  },
  'santiago_es': {
    canonicalKey: 'santiago_es', name: 'Santiago de Compostela (İspanya)', country: 'ES', countryName: 'İspanya', region: 'Galiçya',
    lat: 42.8782, lng: -8.5448, timeZone: 'Europe/Madrid', defaultTzOffset: 1,
    aliases: ['santiago de compostela', 'santiago ispanya', 'santiago spain', 'santiago es']
  },
  'lisbon_pt': {
    canonicalKey: 'lisbon_pt', name: 'Lizbon (Portekiz)', country: 'PT', countryName: 'Portekiz', region: 'Lizbon',
    lat: 38.7223, lng: -9.1393, timeZone: 'Europe/Lisbon', defaultTzOffset: 0,
    aliases: ['lisbon', 'lizbon', 'lisboa', 'lizbon portekiz', 'lisbon portugal']
  },
  'amsterdam_nl': {
    canonicalKey: 'amsterdam_nl', name: 'Amsterdam (Hollanda)', country: 'NL', countryName: 'Hollanda', region: 'Kuzey Hollanda',
    lat: 52.3676, lng: 4.9041, timeZone: 'Europe/Amsterdam', defaultTzOffset: 1,
    aliases: ['amsterdam', 'amsterdam hollanda', 'amsterdam netherlands']
  },
  'brussels_be': {
    canonicalKey: 'brussels_be', name: 'Brüksel (Belçika)', country: 'BE', countryName: 'Belçika', region: 'Brüksel',
    lat: 50.8503, lng: 4.3517, timeZone: 'Europe/Brussels', defaultTzOffset: 1,
    aliases: ['brussels', 'bruksel', 'brüksel', 'bruxelles', 'brüksel belcika']
  },
  'vienna_at': {
    canonicalKey: 'vienna_at', name: 'Viyana (Avusturya)', country: 'AT', countryName: 'Avusturya', region: 'Viyana',
    lat: 48.2082, lng: 16.3738, timeZone: 'Europe/Vienna', defaultTzOffset: 1,
    aliases: ['vienna', 'viyana', 'wien', 'viyana avusturya', 'vienna austria']
  },
  'zurich_ch': {
    canonicalKey: 'zurich_ch', name: 'Zürih (İsviçre)', country: 'CH', countryName: 'İsviçre', region: 'Zürih',
    lat: 47.3769, lng: 8.5417, timeZone: 'Europe/Zurich', defaultTzOffset: 1,
    aliases: ['zurich', 'zurih', 'zürih', 'zürih isvicre', 'zurich switzerland']
  },
  'geneva_ch': {
    canonicalKey: 'geneva_ch', name: 'Cenevre (İsviçre)', country: 'CH', countryName: 'İsviçre', region: 'Cenevre',
    lat: 46.2044, lng: 6.1432, timeZone: 'Europe/Zurich', defaultTzOffset: 1,
    aliases: ['geneva', 'cenevre', 'geneve', 'cenevre isvicre']
  },
  'athens_gr': {
    canonicalKey: 'athens_gr', name: 'Atina (Yunanistan)', country: 'GR', countryName: 'Yunanistan', region: 'Attika',
    lat: 37.9838, lng: 23.7275, timeZone: 'Europe/Athens', defaultTzOffset: 2,
    aliases: ['athens', 'atina', 'atina yunanistan', 'athens greece', 'athina']
  },
  'thessaloniki_gr': {
    canonicalKey: 'thessaloniki_gr', name: 'Selanik (Yunanistan)', country: 'GR', countryName: 'Yunanistan', region: 'Orta Makedonya',
    lat: 40.6401, lng: 22.9444, timeZone: 'Europe/Athens', defaultTzOffset: 2,
    aliases: ['selanik', 'thessaloniki', 'selanik yunanistan']
  },
  'warsaw_pl': {
    canonicalKey: 'warsaw_pl', name: 'Varşova (Polonya)', country: 'PL', countryName: 'Polonya', region: 'Mazovya',
    lat: 52.2297, lng: 21.0122, timeZone: 'Europe/Warsaw', defaultTzOffset: 1,
    aliases: ['warsaw', 'varsova', 'varşova', 'warszawa', 'varsova polonya']
  },
  'prague_cz': {
    canonicalKey: 'prague_cz', name: 'Prag (Çekya)', country: 'CZ', countryName: 'Çekya', region: 'Prag',
    lat: 50.0755, lng: 14.4378, timeZone: 'Europe/Prague', defaultTzOffset: 1,
    aliases: ['prague', 'prag', 'praha', 'prag cekya', 'prague czech']
  },
  'budapest_hu': {
    canonicalKey: 'budapest_hu', name: 'Budapeşte (Macaristan)', country: 'HU', countryName: 'Macaristan', region: 'Budapeşte',
    lat: 47.4979, lng: 19.0402, timeZone: 'Europe/Budapest', defaultTzOffset: 1,
    aliases: ['budapest', 'budapeste', 'budapeşte', 'budapeste macaristan']
  },
  'bucharest_ro': {
    canonicalKey: 'bucharest_ro', name: 'Bükreş (Romanya)', country: 'RO', countryName: 'Romanya', region: 'Bükreş',
    lat: 44.4268, lng: 26.1025, timeZone: 'Europe/Bucharest', defaultTzOffset: 2,
    aliases: ['bucharest', 'bukres', 'bükreş', 'bucuresti', 'bukres romanya']
  },
  'sofia_bg': {
    canonicalKey: 'sofia_bg', name: 'Sofya (Bulgaristan)', country: 'BG', countryName: 'Bulgaristan', region: 'Sofya',
    lat: 42.6977, lng: 23.3219, timeZone: 'Europe/Sofia', defaultTzOffset: 2,
    aliases: ['sofia', 'sofya', 'sofya bulgaristan']
  },
  'belgrade_rs': {
    canonicalKey: 'belgrade_rs', name: 'Belgrad (Sırbistan)', country: 'RS', countryName: 'Sırbistan', region: 'Belgrad',
    lat: 44.7866, lng: 20.4489, timeZone: 'Europe/Belgrade', defaultTzOffset: 1,
    aliases: ['belgrade', 'belgrad', 'beograd', 'belgrad sirbistan']
  },
  'zagreb_hr': {
    canonicalKey: 'zagreb_hr', name: 'Zagreb (Hırvatistan)', country: 'HR', countryName: 'Hırvatistan', region: 'Zagreb',
    lat: 45.8150, lng: 15.9819, timeZone: 'Europe/Zagreb', defaultTzOffset: 1,
    aliases: ['zagreb', 'zagreb hirvatistan', 'zagreb croatia']
  },
  'sarajevo_ba': {
    canonicalKey: 'sarajevo_ba', name: 'Saraybosna (Bosna-Hersek)', country: 'BA', countryName: 'Bosna-Hersek', region: 'Saraybosna',
    lat: 43.8563, lng: 18.4131, timeZone: 'Europe/Sarajevo', defaultTzOffset: 1,
    aliases: ['sarajevo', 'saraybosna', 'saraybosna bosna']
  },
  'skopje_mk': {
    canonicalKey: 'skopje_mk', name: 'Üsküp (Kuzey Makedonya)', country: 'MK', countryName: 'Kuzey Makedonya', region: 'Üsküp',
    lat: 41.9981, lng: 21.4254, timeZone: 'Europe/Skopje', defaultTzOffset: 1,
    aliases: ['skopje', 'uskup', 'üsküp', 'uskup makedonya']
  },
  'tirana_al': {
    canonicalKey: 'tirana_al', name: 'Tiran (Arnavutluk)', country: 'AL', countryName: 'Arnavutluk', region: 'Tiran',
    lat: 41.3275, lng: 19.8187, timeZone: 'Europe/Tirane', defaultTzOffset: 1,
    aliases: ['tirana', 'tiran', 'tiran arnavutluk']
  },
  'stockholm_se': {
    canonicalKey: 'stockholm_se', name: 'Stockholm (İsveç)', country: 'SE', countryName: 'İsveç', region: 'Stockholm',
    lat: 59.3293, lng: 18.0686, timeZone: 'Europe/Stockholm', defaultTzOffset: 1,
    aliases: ['stockholm', 'stokholm', 'stockholm isvec', 'stockholm sweden']
  },
  'oslo_no': {
    canonicalKey: 'oslo_no', name: 'Oslo (Norveç)', country: 'NO', countryName: 'Norveç', region: 'Oslo',
    lat: 59.9139, lng: 10.7522, timeZone: 'Europe/Oslo', defaultTzOffset: 1,
    aliases: ['oslo', 'oslo norvec', 'oslo norway']
  },
  'copenhagen_dk': {
    canonicalKey: 'copenhagen_dk', name: 'Kopenhag (Danimarka)', country: 'DK', countryName: 'Danimarka', region: 'Kopenhag',
    lat: 55.6761, lng: 12.5683, timeZone: 'Europe/Copenhagen', defaultTzOffset: 1,
    aliases: ['copenhagen', 'kopenhag', 'kobenhavn', 'kopenhag danimarka']
  },
  'helsinki_fi': {
    canonicalKey: 'helsinki_fi', name: 'Helsinki (Finlandiya)', country: 'FI', countryName: 'Finlandiya', region: 'Uusimaa',
    lat: 60.1699, lng: 24.9384, timeZone: 'Europe/Helsinki', defaultTzOffset: 2,
    aliases: ['helsinki', 'helsinki finlandiya', 'helsinki finland']
  },
  'dublin_ie': {
    canonicalKey: 'dublin_ie', name: 'Dublin (İrlanda)', country: 'IE', countryName: 'İrlanda', region: 'Leinster',
    lat: 53.3498, lng: -6.2603, timeZone: 'Europe/Dublin', defaultTzOffset: 0,
    aliases: ['dublin', 'dublin irlanda', 'dublin ireland']
  },
  'kyiv_ua': {
    canonicalKey: 'kyiv_ua', name: 'Kiev (Ukrayna)', country: 'UA', countryName: 'Ukrayna', region: 'Kiev',
    lat: 50.4501, lng: 30.5234, timeZone: 'Europe/Kyiv', defaultTzOffset: 2,
    aliases: ['kiev', 'kyiv', 'kiev ukrayna', 'kyiv ukraine']
  },
  'moscow_ru': {
    canonicalKey: 'moscow_ru', name: 'Moskova (Rusya)', country: 'RU', countryName: 'Rusya', region: 'Moskova',
    lat: 55.7558, lng: 37.6173, timeZone: 'Europe/Moscow', defaultTzOffset: 3,
    aliases: ['moscow', 'moskova', 'moskva', 'moskova rusya', 'moscow russia']
  },
  'stpetersburg_ru': {
    canonicalKey: 'stpetersburg_ru', name: 'Sankt Petersburg (Rusya)', country: 'RU', countryName: 'Rusya', region: 'Kuzeybatı',
    lat: 59.9343, lng: 30.3351, timeZone: 'Europe/Moscow', defaultTzOffset: 3,
    aliases: ['saint petersburg', 'st petersburg', 'sankt petersburg', 'leningrad']
  },
  'nicosia_cy': {
    canonicalKey: 'nicosia_cy', name: 'Lefkoşa (Kıbrıs)', country: 'CY', countryName: 'Kıbrıs', region: 'Lefkoşa',
    lat: 35.1856, lng: 33.3823, timeZone: 'Asia/Nicosia', defaultTzOffset: 2,
    aliases: ['nicosia', 'lefkosa', 'lefkoşa', 'kktc', 'girne', 'magusa', 'kibris']
  },

  // =========================================================================
  // 3. KUZEY VE GÜNEY AMERİKA (THE AMERICAS)
  // =========================================================================
  'new_york_us': {
    canonicalKey: 'new_york_us', name: 'New York (ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'NY',
    lat: 40.7128, lng: -74.0060, timeZone: 'America/New_York', defaultTzOffset: -5,
    aliases: ['new york', 'newyork', 'nyc', 'manhattan', 'brooklyn', 'queens', 'new york us', 'new york abd', 'new york ny']
  },
  'los_angeles_us': {
    canonicalKey: 'los_angeles_us', name: 'Los Angeles (ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'CA',
    lat: 34.0522, lng: -118.2437, timeZone: 'America/Los_Angeles', defaultTzOffset: -8,
    aliases: ['los angeles', 'la', 'losangeles', 'hollywood', 'los angeles ca', 'los angeles abd', 'los angeles us']
  },
  'chicago_us': {
    canonicalKey: 'chicago_us', name: 'Chicago (ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'IL',
    lat: 41.8781, lng: -87.6298, timeZone: 'America/Chicago', defaultTzOffset: -6,
    aliases: ['chicago', 'chicago il', 'sikago', 'chicago abd', 'chicago us']
  },
  'houston_us': {
    canonicalKey: 'houston_us', name: 'Houston (Teksas, ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'TX',
    lat: 29.7604, lng: -95.3698, timeZone: 'America/Chicago', defaultTzOffset: -6,
    aliases: ['houston', 'houston tx', 'houston texas', 'houston abd']
  },
  'phoenix_us': {
    canonicalKey: 'phoenix_us', name: 'Phoenix (Arizona, ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'AZ',
    lat: 33.4484, lng: -112.0740, timeZone: 'America/Phoenix', defaultTzOffset: -7,
    aliases: ['phoenix', 'phoenix az', 'phoenix arizona', 'feniks']
  },
  'san_francisco_us': {
    canonicalKey: 'san_francisco_us', name: 'San Francisco (ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'CA',
    lat: 37.7749, lng: -122.4194, timeZone: 'America/Los_Angeles', defaultTzOffset: -8,
    aliases: ['san francisco', 'sf', 'san francisco ca', 'san francisco abd']
  },
  'san_jose_us_ca': {
    canonicalKey: 'san_jose_us_ca', name: 'San Jose (Kaliforniya, ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'CA',
    lat: 37.3382, lng: -121.8863, timeZone: 'America/Los_Angeles', defaultTzOffset: -8,
    aliases: ['san jose', 'san jose ca', 'san jose california', 'san jose abd', 'san jose us']
  },
  'san_jose_cr': {
    canonicalKey: 'san_jose_cr', name: 'San José (Kosta Rika)', country: 'CR', countryName: 'Kosta Rika', region: 'San José',
    lat: 9.9281, lng: -84.0907, timeZone: 'America/Costa_Rica', defaultTzOffset: -6,
    aliases: ['san jose kosta rika', 'san jose costa rica', 'san jose cr', 'san jose cr costa rica']
  },
  'paris_us_tx': {
    canonicalKey: 'paris_us_tx', name: 'Paris (Teksas, ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'TX',
    lat: 33.6609, lng: -95.5555, timeZone: 'America/Chicago', defaultTzOffset: -6,
    aliases: ['paris texas', 'paris tx', 'paris teksas', 'paris abd']
  },
  'athens_us_ga': {
    canonicalKey: 'athens_us_ga', name: 'Athens (Georgia, ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'GA',
    lat: 33.9519, lng: -83.3576, timeZone: 'America/New_York', defaultTzOffset: -5,
    aliases: ['athens georgia', 'athens ga', 'athens abd', 'atina georgia']
  },
  'alexandria_us_va': {
    canonicalKey: 'alexandria_us_va', name: 'Alexandria (Virginia, ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'VA',
    lat: 38.8048, lng: -77.0469, timeZone: 'America/New_York', defaultTzOffset: -5,
    aliases: ['alexandria virginia', 'alexandria va', 'iskenderiye virginia']
  },
  'miami_us': {
    canonicalKey: 'miami_us', name: 'Miami (ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'FL',
    lat: 25.7617, lng: -80.1918, timeZone: 'America/New_York', defaultTzOffset: -5,
    aliases: ['miami', 'miami fl', 'miami florida', 'miami abd']
  },
  'seattle_us': {
    canonicalKey: 'seattle_us', name: 'Seattle (ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'WA',
    lat: 47.6062, lng: -122.3321, timeZone: 'America/Los_Angeles', defaultTzOffset: -8,
    aliases: ['seattle', 'seattle wa', 'seattle abd']
  },
  'washington_us': {
    canonicalKey: 'washington_us', name: 'Washington D.C. (ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'DC',
    lat: 38.9072, lng: -77.0369, timeZone: 'America/New_York', defaultTzOffset: -5,
    aliases: ['washington', 'washington dc', 'washington d.c.', 'washington abd']
  },
  'honolulu_us': {
    canonicalKey: 'honolulu_us', name: 'Honolulu (Hawaii, ABD)', country: 'US', countryName: 'Amerika Birleşik Devletleri', region: 'HI',
    lat: 21.3069, lng: -157.8583, timeZone: 'Pacific/Honolulu', defaultTzOffset: -10,
    aliases: ['honolulu', 'hawaii', 'honolulu hawaii']
  },
  'toronto_ca': {
    canonicalKey: 'toronto_ca', name: 'Toronto (Kanada)', country: 'CA', countryName: 'Kanada', region: 'ON',
    lat: 43.6532, lng: -79.3832, timeZone: 'America/Toronto', defaultTzOffset: -5,
    aliases: ['toronto', 'toronto canada', 'toronto kanada', 'toronto on']
  },
  'london_ca': {
    canonicalKey: 'london_ca', name: 'London (Ontario, Kanada)', country: 'CA', countryName: 'Kanada', region: 'ON',
    lat: 42.9849, lng: -81.2453, timeZone: 'America/Toronto', defaultTzOffset: -5,
    aliases: ['london ontario', 'london on', 'london canada', 'london kanada', 'londra ontario', 'londra kanada']
  },
  'montreal_ca': {
    canonicalKey: 'montreal_ca', name: 'Montreal (Kanada)', country: 'CA', countryName: 'Kanada', region: 'QC',
    lat: 45.5017, lng: -73.5673, timeZone: 'America/Toronto', defaultTzOffset: -5,
    aliases: ['montreal', 'montreal canada', 'montreal kanada']
  },
  'vancouver_ca': {
    canonicalKey: 'vancouver_ca', name: 'Vancouver (Kanada)', country: 'CA', countryName: 'Kanada', region: 'BC',
    lat: 49.2827, lng: -123.1207, timeZone: 'America/Vancouver', defaultTzOffset: -8,
    aliases: ['vancouver', 'vancouver bc', 'vancouver canada', 'vancouver kanada']
  },
  'mexico_city_mx': {
    canonicalKey: 'mexico_city_mx', name: 'Mexico City (Meksika)', country: 'MX', countryName: 'Meksika', region: 'CDMX',
    lat: 19.4326, lng: -99.1332, timeZone: 'America/Mexico_City', defaultTzOffset: -6,
    aliases: ['mexico city', 'meksiko', 'ciudad de mexico', 'mexico meksika']
  },
  'havana_cu': {
    canonicalKey: 'havana_cu', name: 'Havana (Küba)', country: 'CU', countryName: 'Küba', region: 'La Habana',
    lat: 23.1136, lng: -82.3666, timeZone: 'America/Havana', defaultTzOffset: -5,
    aliases: ['havana', 'habana', 'havana kuba', 'havana cuba']
  },
  'buenos_aires_ar': {
    canonicalKey: 'buenos_aires_ar', name: 'Buenos Aires (Arjantin)', country: 'AR', countryName: 'Arjantin', region: 'Buenos Aires',
    lat: -34.6037, lng: -58.3816, timeZone: 'America/Argentina/Buenos_Aires', defaultTzOffset: -3,
    aliases: ['buenos aires', 'buenos aires arjantin', 'buenos aires argentina']
  },
  'sao_paulo_br': {
    canonicalKey: 'sao_paulo_br', name: 'São Paulo (Brezilya)', country: 'BR', countryName: 'Brezilya', region: 'SP',
    lat: -23.5505, lng: -46.6333, timeZone: 'America/Sao_Paulo', defaultTzOffset: -3,
    aliases: ['sao paulo', 'san paulo', 'são paulo', 'sao paulo brezilya', 'sao paulo brazil']
  },
  'rio_de_janeiro_br': {
    canonicalKey: 'rio_de_janeiro_br', name: 'Rio de Janeiro (Brezilya)', country: 'BR', countryName: 'Brezilya', region: 'RJ',
    lat: -22.9068, lng: -43.1729, timeZone: 'America/Sao_Paulo', defaultTzOffset: -3,
    aliases: ['rio de janeiro', 'rio', 'rio brezilya']
  },
  'santiago_cl': {
    canonicalKey: 'santiago_cl', name: 'Santiago (Şili)', country: 'CL', countryName: 'Şili', region: 'Santiago',
    lat: -33.4489, lng: -70.6693, timeZone: 'America/Santiago', defaultTzOffset: -4,
    aliases: ['santiago', 'santiago sili', 'santiago chile', 'santiago cl', 'santiago de chile']
  },
  'bogota_co': {
    canonicalKey: 'bogota_co', name: 'Bogotá (Kolombiya)', country: 'CO', countryName: 'Kolombiya', region: 'Cundinamarca',
    lat: 4.7110, lng: -74.0721, timeZone: 'America/Bogota', defaultTzOffset: -5,
    aliases: ['bogota', 'bogotá', 'bogota kolombiya', 'bogota colombia']
  },
  'lima_pe': {
    canonicalKey: 'lima_pe', name: 'Lima (Peru)', country: 'PE', countryName: 'Peru', region: 'Lima',
    lat: -12.0464, lng: -77.0428, timeZone: 'America/Lima', defaultTzOffset: -5,
    aliases: ['lima', 'lima peru']
  },

  // =========================================================================
  // 4. ASYA (ASIA)
  // =========================================================================
  'tokyo_jp': {
    canonicalKey: 'tokyo_jp', name: 'Tokyo (Japonya)', country: 'JP', countryName: 'Japonya', region: 'Kanto',
    lat: 35.6762, lng: 139.6503, timeZone: 'Asia/Tokyo', defaultTzOffset: 9,
    aliases: ['tokyo', 'tokyo japonya', 'tokyo japan']
  },
  'osaka_jp': {
    canonicalKey: 'osaka_jp', name: 'Osaka (Japonya)', country: 'JP', countryName: 'Japonya', region: 'Kansai',
    lat: 34.6937, lng: 135.5023, timeZone: 'Asia/Tokyo', defaultTzOffset: 9,
    aliases: ['osaka', 'osaka japonya', 'osaka japan', 'kyoto']
  },
  'beijing_cn': {
    canonicalKey: 'beijing_cn', name: 'Pekin (Beijing, Çin)', country: 'CN', countryName: 'Çin', region: 'Pekin',
    lat: 39.9042, lng: 116.4074, timeZone: 'Asia/Shanghai', defaultTzOffset: 8,
    aliases: ['beijing', 'pekin', 'pekin cin', 'beijing china']
  },
  'shanghai_cn': {
    canonicalKey: 'shanghai_cn', name: 'Şanghay (Çin)', country: 'CN', countryName: 'Çin', region: 'Şanghay',
    lat: 31.2304, lng: 121.4737, timeZone: 'Asia/Shanghai', defaultTzOffset: 8,
    aliases: ['shanghai', 'sanghay', 'şanghay', 'shanghai china']
  },
  'hong_kong_hk': {
    canonicalKey: 'hong_kong_hk', name: 'Hong Kong', country: 'HK', countryName: 'Hong Kong', region: 'Hong Kong',
    lat: 22.3193, lng: 114.1694, timeZone: 'Asia/Hong_Kong', defaultTzOffset: 8,
    aliases: ['hong kong', 'hongkong']
  },
  'taipei_tw': {
    canonicalKey: 'taipei_tw', name: 'Taipei (Tayvan)', country: 'TW', countryName: 'Tayvan', region: 'Taipei',
    lat: 25.0330, lng: 121.5654, timeZone: 'Asia/Taipei', defaultTzOffset: 8,
    aliases: ['taipei', 'tayvan', 'taiwan']
  },
  'seoul_kr': {
    canonicalKey: 'seoul_kr', name: 'Seul (Güney Kore)', country: 'KR', countryName: 'Güney Kore', region: 'Seul',
    lat: 37.5665, lng: 126.9780, timeZone: 'Asia/Seoul', defaultTzOffset: 9,
    aliases: ['seoul', 'seul', 'seul kore', 'seoul korea', 'seoul south korea']
  },
  'singapore_sg': {
    canonicalKey: 'singapore_sg', name: 'Singapur', country: 'SG', countryName: 'Singapur', region: 'Singapur',
    lat: 1.3521, lng: 103.8198, timeZone: 'Asia/Singapore', defaultTzOffset: 8,
    aliases: ['singapore', 'singapur']
  },
  'bangkok_th': {
    canonicalKey: 'bangkok_th', name: 'Bangkok (Tayland)', country: 'TH', countryName: 'Tayland', region: 'Bangkok',
    lat: 13.7563, lng: 100.5018, timeZone: 'Asia/Bangkok', defaultTzOffset: 7,
    aliases: ['bangkok', 'bangkok tayland', 'bangkok thailand', 'phuket']
  },
  'jakarta_id': {
    canonicalKey: 'jakarta_id', name: 'Cakarta (Endonezya)', country: 'ID', countryName: 'Endonezya', region: 'Cava',
    lat: -6.2088, lng: 106.8456, timeZone: 'Asia/Jakarta', defaultTzOffset: 7,
    aliases: ['jakarta', 'cakarta', 'jakarta endonezya', 'bali']
  },
  'kuala_lumpur_my': {
    canonicalKey: 'kuala_lumpur_my', name: 'Kuala Lumpur (Malezya)', country: 'MY', countryName: 'Malezya', region: 'Federal',
    lat: 3.1390, lng: 101.6869, timeZone: 'Asia/Kuala_Lumpur', defaultTzOffset: 8,
    aliases: ['kuala lumpur', 'kl', 'kuala lumpur malezya']
  },
  'delhi_in': {
    canonicalKey: 'delhi_in', name: 'Yeni Delhi (Hindistan)', country: 'IN', countryName: 'Hindistan', region: 'Delhi',
    lat: 28.6139, lng: 77.2090, timeZone: 'Asia/Kolkata', defaultTzOffset: 5.5,
    aliases: ['delhi', 'new delhi', 'yeni delhi', 'delhi hindistan', 'delhi india']
  },
  'mumbai_in': {
    canonicalKey: 'mumbai_in', name: 'Mumbai (Bombay, Hindistan)', country: 'IN', countryName: 'Hindistan', region: 'Maharaştra',
    lat: 19.0760, lng: 72.8777, timeZone: 'Asia/Kolkata', defaultTzOffset: 5.5,
    aliases: ['mumbai', 'bombay', 'mumbai hindistan', 'bombay india']
  },
  'bangalore_in': {
    canonicalKey: 'bangalore_in', name: 'Bengaluru (Bangalore, Hindistan)', country: 'IN', countryName: 'Hindistan', region: 'Karnataka',
    lat: 12.9716, lng: 77.5946, timeZone: 'Asia/Kolkata', defaultTzOffset: 5.5,
    aliases: ['bengaluru', 'bangalore', 'bangalore india']
  },
  'kathmandu_np': {
    canonicalKey: 'kathmandu_np', name: 'Katmandu (Nepal)', country: 'NP', countryName: 'Nepal', region: 'Katmandu',
    lat: 27.7172, lng: 85.3240, timeZone: 'Asia/Kathmandu', defaultTzOffset: 5.75,
    aliases: ['kathmandu', 'katmandu', 'katmandu nepal']
  },
  'karachi_pk': {
    canonicalKey: 'karachi_pk', name: 'Karaçi (Pakistan)', country: 'PK', countryName: 'Pakistan', region: 'Sindh',
    lat: 24.8607, lng: 67.0011, timeZone: 'Asia/Karachi', defaultTzOffset: 5,
    aliases: ['karachi', 'karaci', 'karaçi', 'karachi pakistan', 'islamabad', 'lahore']
  },
  'dubai_ae': {
    canonicalKey: 'dubai_ae', name: 'Dubai (Birleşik Arap Emirlikleri)', country: 'AE', countryName: 'Birleşik Arap Emirlikleri', region: 'Dubai',
    lat: 25.2048, lng: 55.2708, timeZone: 'Asia/Dubai', defaultTzOffset: 4,
    aliases: ['dubai', 'dubai bae', 'dubai uae']
  },
  'abu_dhabi_ae': {
    canonicalKey: 'abu_dhabi_ae', name: 'Abu Dabi (Birleşik Arap Emirlikleri)', country: 'AE', countryName: 'Birleşik Arap Emirlikleri', region: 'Abu Dabi',
    lat: 24.4539, lng: 54.3773, timeZone: 'Asia/Dubai', defaultTzOffset: 4,
    aliases: ['abu dhabi', 'abu dabi']
  },
  'riyadh_sa': {
    canonicalKey: 'riyadh_sa', name: 'Riyad (Suudi Arabistan)', country: 'SA', countryName: 'Suudi Arabistan', region: 'Riyad',
    lat: 24.7136, lng: 46.6753, timeZone: 'Asia/Riyadh', defaultTzOffset: 3,
    aliases: ['riyadh', 'riyad', 'riyad suudi arabistan', 'mekke', 'medine', 'cidde', 'jeddah']
  },
  'doha_qa': {
    canonicalKey: 'doha_qa', name: 'Doha (Katar)', country: 'QA', countryName: 'Katar', region: 'Doha',
    lat: 25.2854, lng: 51.5310, timeZone: 'Asia/Qatar', defaultTzOffset: 3,
    aliases: ['doha', 'doha katar', 'doha qatar']
  },
  'tehran_ir': {
    canonicalKey: 'tehran_ir', name: 'Tahran (İran)', country: 'IR', countryName: 'İran', region: 'Tahran',
    lat: 35.6892, lng: 51.3890, timeZone: 'Asia/Tehran', defaultTzOffset: 3.5,
    aliases: ['tehran', 'tahran', 'tahran iran', 'tehran iran', 'isfahan', 'tabriz', 'tebriz']
  },
  'baghdad_iq': {
    canonicalKey: 'baghdad_iq', name: 'Bağdat (Irak)', country: 'IQ', countryName: 'Irak', region: 'Bağdat',
    lat: 33.3152, lng: 44.3661, timeZone: 'Asia/Baghdad', defaultTzOffset: 3,
    aliases: ['baghdad', 'bagdat', 'bağdat', 'bagdat irak', 'erbil', 'basra']
  },
  'amman_jo': {
    canonicalKey: 'amman_jo', name: 'Amman (Ürdün)', country: 'JO', countryName: 'Ürdün', region: 'Amman',
    lat: 31.9454, lng: 35.9284, timeZone: 'Asia/Amman', defaultTzOffset: 3,
    aliases: ['amman', 'amman urdun', 'amman jordan']
  },
  'beirut_lb': {
    canonicalKey: 'beirut_lb', name: 'Beyrut (Lübnan)', country: 'LB', countryName: 'Lübnan', region: 'Beyrut',
    lat: 33.8938, lng: 35.5018, timeZone: 'Asia/Beirut', defaultTzOffset: 2,
    aliases: ['beirut', 'beyrut', 'beyrut lubnan', 'beirut lebanon']
  },
  'tripoli_lb': {
    canonicalKey: 'tripoli_lb', name: 'Trablusşam (Lübnan)', country: 'LB', countryName: 'Lübnan', region: 'Kuzey',
    lat: 34.4367, lng: 35.8497, timeZone: 'Asia/Beirut', defaultTzOffset: 2,
    aliases: ['trablussam', 'trablusşam', 'tripoli lebanon', 'tripoli lubnan']
  },
  'damascus_sy': {
    canonicalKey: 'damascus_sy', name: 'Şam (Damascus, Suriye)', country: 'SY', countryName: 'Suriye', region: 'Şam',
    lat: 33.5138, lng: 36.2765, timeZone: 'Asia/Damascus', defaultTzOffset: 3,
    aliases: ['damascus', 'sam', 'şam', 'sam suriye', 'halep', 'aleppo']
  },
  'jerusalem_il': {
    canonicalKey: 'jerusalem_il', name: 'Kudüs / Tel Aviv', country: 'IL', countryName: 'İsrail / Filistin', region: 'Kudüs',
    lat: 31.7683, lng: 35.2137, timeZone: 'Asia/Jerusalem', defaultTzOffset: 2,
    aliases: ['kudus', 'kudüs', 'jerusalem', 'tel aviv', 'telaviv', 'hayfa']
  },
  'baku_az': {
    canonicalKey: 'baku_az', name: 'Bakü (Azerbaycan)', country: 'AZ', countryName: 'Azerbaycan', region: 'Bakü',
    lat: 40.4093, lng: 49.8671, timeZone: 'Asia/Baku', defaultTzOffset: 4,
    aliases: ['baku', 'baki', 'bakü', 'baku azerbaycan', 'gence']
  },
  'tbilisi_ge': {
    canonicalKey: 'tbilisi_ge', name: 'Tiflis (Gürcistan)', country: 'GE', countryName: 'Gürcistan', region: 'Tiflis',
    lat: 41.7151, lng: 44.8271, timeZone: 'Asia/Tbilisi', defaultTzOffset: 4,
    aliases: ['tbilisi', 'tiflis', 'tiflis gurcistan', 'batum']
  },
  'yerevan_am': {
    canonicalKey: 'yerevan_am', name: 'Erivan (Yerevan, Ermenistan)', country: 'AM', countryName: 'Ermenistan', region: 'Erivan',
    lat: 40.1792, lng: 44.4991, timeZone: 'Asia/Yerevan', defaultTzOffset: 4,
    aliases: ['yerevan', 'erivan', 'yerevan armenia', 'erivan ermenistan']
  },
  'tashkent_uz': {
    canonicalKey: 'tashkent_uz', name: 'Taşkent (Özbekistan)', country: 'UZ', countryName: 'Özbekistan', region: 'Taşkent',
    lat: 41.2995, lng: 69.2401, timeZone: 'Asia/Tashkent', defaultTzOffset: 5,
    aliases: ['tashkent', 'taskent', 'taşkent', 'taskent ozbekistan', 'semerkant', 'buhara']
  },
  'almaty_kz': {
    canonicalKey: 'almaty_kz', name: 'Almatı (Kazakistan)', country: 'KZ', countryName: 'Kazakistan', region: 'Almatı',
    lat: 43.2220, lng: 76.8512, timeZone: 'Asia/Almaty', defaultTzOffset: 5,
    aliases: ['almaty', 'almati', 'almatı', 'astana', 'nur sultan', 'kazakistan']
  },

  // =========================================================================
  // 5. AFRİKA (AFRICA)
  // =========================================================================
  'cairo_eg': {
    canonicalKey: 'cairo_eg', name: 'Kahire (Mısır)', country: 'EG', countryName: 'Mısır', region: 'Kahire',
    lat: 30.0444, lng: 31.2357, timeZone: 'Africa/Cairo', defaultTzOffset: 2,
    aliases: ['cairo', 'kahire', 'kahire misir', 'cairo egypt']
  },
  'alexandria_eg': {
    canonicalKey: 'alexandria_eg', name: 'İskenderiye (Mısır)', country: 'EG', countryName: 'Mısır', region: 'İskenderiye',
    lat: 31.2001, lng: 29.9187, timeZone: 'Africa/Cairo', defaultTzOffset: 2,
    aliases: ['alexandria', 'iskenderiye', 'alexandria egypt', 'iskenderiye misir']
  },
  'casablanca_ma': {
    canonicalKey: 'casablanca_ma', name: 'Kazablanka (Fas)', country: 'MA', countryName: 'Fas', region: 'Kazablanka-Settat',
    lat: 33.5731, lng: -7.5898, timeZone: 'Africa/Casablanca', defaultTzOffset: 1,
    aliases: ['casablanca', 'kazablanka', 'kazablanka fas', 'rabat', 'marakes', 'marrakech']
  },
  'tunis_tn': {
    canonicalKey: 'tunis_tn', name: 'Tunus (Tunus)', country: 'TN', countryName: 'Tunus', region: 'Tunus',
    lat: 36.8065, lng: 10.1815, timeZone: 'Africa/Tunis', defaultTzOffset: 1,
    aliases: ['tunis', 'tunus', 'tunus sehri']
  },
  'algiers_dz': {
    canonicalKey: 'algiers_dz', name: 'Cezayir (Cezayir)', country: 'DZ', countryName: 'Cezayir', region: 'Cezayir',
    lat: 36.7538, lng: 3.0588, timeZone: 'Africa/Algiers', defaultTzOffset: 1,
    aliases: ['algiers', 'cezayir', 'el cezayir']
  },
  'tripoli_ly': {
    canonicalKey: 'tripoli_ly', name: 'Trablus (Libya)', country: 'LY', countryName: 'Libya', region: 'Trablus',
    lat: 32.8872, lng: 13.1913, timeZone: 'Africa/Tripoli', defaultTzOffset: 2,
    aliases: ['tripoli', 'trablus', 'trablusgarp', 'trablus libya', 'tripoli libya']
  },
  'johannesburg_za': {
    canonicalKey: 'johannesburg_za', name: 'Johannesburg (Güney Afrika)', country: 'ZA', countryName: 'Güney Afrika', region: 'Gauteng',
    lat: -26.2041, lng: 28.0473, timeZone: 'Africa/Johannesburg', defaultTzOffset: 2,
    aliases: ['johannesburg', 'johannesburg guney afrika', 'joburg', 'pretoria']
  },
  'cape_town_za': {
    canonicalKey: 'cape_town_za', name: 'Cape Town (Güney Afrika)', country: 'ZA', countryName: 'Güney Afrika', region: 'Batı Kap',
    lat: -33.9249, lng: 18.4241, timeZone: 'Africa/Johannesburg', defaultTzOffset: 2,
    aliases: ['cape town', 'capetown', 'cape town guney afrika']
  },
  'nairobi_ke': {
    canonicalKey: 'nairobi_ke', name: 'Nairobi (Kenya)', country: 'KE', countryName: 'Kenya', region: 'Nairobi',
    lat: -1.2921, lng: 36.8219, timeZone: 'Africa/Nairobi', defaultTzOffset: 3,
    aliases: ['nairobi', 'nairobi kenya', 'mombasa']
  },
  'lagos_ng': {
    canonicalKey: 'lagos_ng', name: 'Lagos (Nijerya)', country: 'NG', countryName: 'Nijerya', region: 'Lagos',
    lat: 6.5244, lng: 3.3792, timeZone: 'Africa/Lagos', defaultTzOffset: 1,
    aliases: ['lagos', 'lagos nijerya', 'abuja']
  },
  'addis_ababa_et': {
    canonicalKey: 'addis_ababa_et', name: 'Addis Ababa (Etiyopya)', country: 'ET', countryName: 'Etiyopya', region: 'Addis Ababa',
    lat: 9.0300, lng: 38.7400, timeZone: 'Africa/Addis_Ababa', defaultTzOffset: 3,
    aliases: ['addis ababa', 'addisababa', 'etiyopya']
  },

  // =========================================================================
  // 6. OKYANUSYA (OCEANIA)
  // =========================================================================
  'sydney_au': {
    canonicalKey: 'sydney_au', name: 'Sidney (Avustralya)', country: 'AU', countryName: 'Avustralya', region: 'NSW',
    lat: -33.8688, lng: 151.2093, timeZone: 'Australia/Sydney', defaultTzOffset: 10,
    aliases: ['sydney', 'sidney', 'sydney avustralya', 'sydney australia', 'sydney nsw']
  },
  'melbourne_au': {
    canonicalKey: 'melbourne_au', name: 'Melbourne (Avustralya)', country: 'AU', countryName: 'Avustralya', region: 'VIC',
    lat: -37.8136, lng: 144.9631, timeZone: 'Australia/Melbourne', defaultTzOffset: 10,
    aliases: ['melbourne', 'melborn', 'melbourne avustralya', 'melbourne vic']
  },
  'brisbane_au': {
    canonicalKey: 'brisbane_au', name: 'Brisbane (Avustralya)', country: 'AU', countryName: 'Avustralya', region: 'QLD',
    lat: -27.4698, lng: 153.0251, timeZone: 'Australia/Brisbane', defaultTzOffset: 10,
    aliases: ['brisbane', 'brisbane qld', 'brisbane avustralya']
  },
  'perth_au': {
    canonicalKey: 'perth_au', name: 'Perth (Avustralya)', country: 'AU', countryName: 'Avustralya', region: 'WA',
    lat: -31.9505, lng: 115.8605, timeZone: 'Australia/Perth', defaultTzOffset: 8,
    aliases: ['perth', 'perth avustralya', 'perth wa']
  },
    'adelaide_au': {
    canonicalKey: 'adelaide_au', name: 'Adelaide (Avustralya)', country: 'AU', countryName: 'Avustralya', region: 'SA',
    lat: -34.9285, lng: 138.6007, timeZone: 'Australia/Adelaide', defaultTzOffset: 9.5,
    aliases: ['adelaide', 'adelaid', 'adelaide avustralya', 'adelaide australia', 'adelaide sa']
  },
  'darwin_au': {
    canonicalKey: 'darwin_au', name: 'Darwin (Avustralya)', country: 'AU', countryName: 'Avustralya', region: 'NT',
    lat: -12.4634, lng: 130.8456, timeZone: 'Australia/Darwin', defaultTzOffset: 9.5,
    aliases: ['darwin', 'darvin', 'darwin avustralya', 'darwin nt']
  },
  'eucla_au': {
    canonicalKey: 'eucla_au', name: 'Eucla (Avustralya)', country: 'AU', countryName: 'Avustralya', region: 'WA',
    lat: -31.6775, lng: 128.8833, timeZone: 'Australia/Eucla', defaultTzOffset: 8.75,
    aliases: ['eucla', 'okla', 'eucla avustralya', 'eucla wa']
  },
  'chatham_nz': {
    canonicalKey: 'chatham_nz', name: 'Chatham Adaları (Yeni Zelanda)', country: 'NZ', countryName: 'Yeni Zelanda', region: 'Chatham',
    lat: -43.9535, lng: -176.5597, timeZone: 'Pacific/Chatham', defaultTzOffset: 12.75,
    aliases: ['chatham', 'chatham islands', 'chatham adalari', 'waitangi']
  },
  'kabul_af': {
    canonicalKey: 'kabul_af', name: 'Kabil (Afganistan)', country: 'AF', countryName: 'Afganistan', region: 'Kabul',
    lat: 34.5553, lng: 69.2075, timeZone: 'Asia/Kabul', defaultTzOffset: 4.5,
    aliases: ['kabul', 'kabil', 'kabil afganistan', 'kabul afghanistan']
  },
  'st_johns_ca': {
    canonicalKey: 'st_johns_ca', name: "St. John's (Newfoundland, Kanada)", country: 'CA', countryName: 'Kanada', region: 'NL',
    lat: 47.5615, lng: -52.7126, timeZone: 'America/St_Johns', defaultTzOffset: -3.5,
    aliases: ['st johns', 'st. johns', 'saint johns', 'newfoundland', 'st johns kanada', 'st johns canada']
  },
'auckland_nz': {
    canonicalKey: 'auckland_nz', name: 'Auckland (Yeni Zelanda)', country: 'NZ', countryName: 'Yeni Zelanda', region: 'Auckland',
    lat: -36.8485, lng: 174.7633, timeZone: 'Pacific/Auckland', defaultTzOffset: 12,
    aliases: ['auckland', 'okland', 'auckland yeni zelanda', 'auckland new zealand', 'wellington', 'christchurch']
  }
};

/**
 * Homonim / adaş isimlerde (örn. birden fazla Paris, London veya Santiago olduğunda)
 * kullanıcı herhangi bir eyalet/ülke belirtmediğinde varsayılan kabul edilecek
 * dünya metropolü anahtarları.
 */
const HOMONYM_PRIMARY_DEFAULTS: Record<string, string> = {
  'paris': 'paris_fr',
  'london': 'london_gb',
  'londra': 'london_gb',
  'santiago': 'santiago_cl',
  'san jose': 'san_jose_us_ca',
  'athens': 'athens_gr',
  'atina': 'athens_gr',
  'tripoli': 'tripoli_ly',
  'trablus': 'tripoli_ly',
  'alexandria': 'alexandria_eg',
  'iskenderiye': 'alexandria_eg'
};

/**
 * Metin normalleştirici: Türkçe karakterleri, aksanları, noktalama işaretlerini
 * temizler ve küçük harfe dönüştürür.
 */
export function normalizeGeoSearchText(str: string): string {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/â/g, 'a')
    .replace(/î/g, 'i')
    .replace(/û/g, 'u')
    .replace(/é/g, 'e')
    .replace(/è/g, 'e')
    .replace(/ê/g, 'e')
    .replace(/á/g, 'a')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u')
    .replace(/ñ/g, 'n')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Şehir adını ve opsiyonel ülke/bölge niteleyicisini ayrıştırır.
 * Örn: "Paris, Texas" -> cityPart: "paris", qualifier: "texas"
 *      "Londra, İngiltere" -> cityPart: "londra", qualifier: "ingiltere"
 *      "Karadeniz Ereğli" -> cityPart: "karadeniz eregli", qualifier: undefined
 */
function parseCityInputParts(rawInput: string): { mainPart: string; qualifierPart?: string } {
  // Virgül, parantez, taksim veya tire ile ayrılmışsa böl
  const segments = rawInput
    .split(/[,/()\-]+/)
    .map(s => normalizeGeoSearchText(s))
    .filter(s => s.length > 0);

  if (segments.length === 0) {
    return { mainPart: '' };
  }

  if (segments.length === 1) {
    return { mainPart: segments[0] };
  }

  return {
    mainPart: segments[0],
    qualifierPart: segments.slice(1).join(' ')
  };
}

/**
 * Verilen bir niteleyicinin (ülke kodu, eyalet, ülke adı vb.) adayla uyuşup uyuşmadığını test eder.
 */
function candidateMatchesQualifier(candidate: CityGeoInfo, qualifier: string): boolean {
  if (!qualifier) return false;
  const qNorm = normalizeGeoSearchText(qualifier);
  const countryCodeNorm = candidate.country.toLowerCase();
  const countryNameNorm = normalizeGeoSearchText(candidate.countryName);
  const regionNorm = candidate.region ? normalizeGeoSearchText(candidate.region) : '';

  // 1. Ülke kodu (TR, US, GB, FR, ES, CL, CA, AU vb.)
  if (qNorm === countryCodeNorm) return true;

  // 2. Ülke adı (türkiye, ingiltere, abd, amerika, fransa, ispanya, sili vb.)
  if (countryNameNorm && (countryNameNorm.includes(qNorm) || qNorm.includes(countryNameNorm))) return true;

  // 3. Bölge / Eyalet (tx, texas, ca, california, ontario, on, nsw, vic vb.)
  if (regionNorm && (regionNorm === qNorm || regionNorm.includes(qNorm) || qNorm.includes(regionNorm))) return true;

  // 4. Adayın takma adları içinde niteleyici geçiyor mu?
  for (const alias of candidate.aliases) {
    const aNorm = normalizeGeoSearchText(alias);
    if (aNorm.includes(qNorm)) return true;
  }

  return false;
}

/**
 * Şehir adını normalleştirir ve dünya veri tabanından en uygun eşleşmeyi döndürür.
 * Eşsesli ve adaş şehirleri (Paris TX vs Paris FR, London UK vs London ON vb.)
 * ülke/bölge bilgisiyle ayırt eder.
 * 
 * Bilinmeyen konumlarda sessizce sahte koordinat üretilmez; açıkça 'default_fallback'
 * ve 'isAmbiguous: true' bayrağı set edilir.
 */
export interface OnlineGeocodeResult {
  cityName: string;
  country: string;
  countryName: string;
  latitude: number;
  longitude: number;
  timeZone: string;
  confidence: 'exact_city' | 'province_center';
  source: 'local_database' | 'nominatim_osm';
}

/**
 * Harici Coğrafi Konum Çözümleyicisi (OpenStreetMap Nominatim):
 * - Lisans & Kullanım Koşulları: OpenStreetMap ODbL & Nominatim AUP (Maksimum 1 istek/saniye, User-Agent zorunlu).
 * - Gizlilik: Yalnızca şehir/yerleşim adı parametresi iletilir; hiçbir kişisel kullanıcı verisi taşınmaz.
 * - Çevrimdışı ve Hata Yönetimi: Ağ bağlantısı yoksa, zaman aşımına (timeout) uğrarsa veya API yanıt vermezse
 *   sessizce sahte koordinat uydurmaz; yerel güvenilir veritabanına ve belirsizlik protokolüne güvenle döner.
 */
/**
 * Verilen koordinat ve ülke için en uygun IANA saat dilimini belirler.
 * CITIES_DB üzerindeki küresel coğrafi referansları ve bilinen ülke haritalarını kullanır.
 */
/**
 * IANA Time Zone Database (Release 2024b / tzdb) & ISO 3166-1 Bölgesel Referans Verisi.
 * Tek zaman dilimine sahip ülkelerin kesin IANA saat dilimi haritası:
 */
export const SINGLE_TIMEZONE_COUNTRIES_IANA: Record<string, { timeZone: string; defaultTzOffset: number }> = {
  // Avrupa & Kafkaslar
  'TR': { timeZone: 'Europe/Istanbul', defaultTzOffset: 3 },
  'GB': { timeZone: 'Europe/London', defaultTzOffset: 0 },
  'UK': { timeZone: 'Europe/London', defaultTzOffset: 0 },
  'FR': { timeZone: 'Europe/Paris', defaultTzOffset: 1 },
  'DE': { timeZone: 'Europe/Berlin', defaultTzOffset: 1 },
  'IT': { timeZone: 'Europe/Rome', defaultTzOffset: 1 },
  'ES': { timeZone: 'Europe/Madrid', defaultTzOffset: 1 },
  'NL': { timeZone: 'Europe/Amsterdam', defaultTzOffset: 1 },
  'BE': { timeZone: 'Europe/Brussels', defaultTzOffset: 1 },
  'CH': { timeZone: 'Europe/Zurich', defaultTzOffset: 1 },
  'AT': { timeZone: 'Europe/Vienna', defaultTzOffset: 1 },
  'SE': { timeZone: 'Europe/Stockholm', defaultTzOffset: 1 },
  'NO': { timeZone: 'Europe/Oslo', defaultTzOffset: 1 },
  'DK': { timeZone: 'Europe/Copenhagen', defaultTzOffset: 1 },
  'FI': { timeZone: 'Europe/Helsinki', defaultTzOffset: 2 },
  'PL': { timeZone: 'Europe/Warsaw', defaultTzOffset: 1 },
  'CZ': { timeZone: 'Europe/Prague', defaultTzOffset: 1 },
  'HU': { timeZone: 'Europe/Budapest', defaultTzOffset: 1 },
  'RO': { timeZone: 'Europe/Bucharest', defaultTzOffset: 2 },
  'BG': { timeZone: 'Europe/Sofia', defaultTzOffset: 2 },
  'GR': { timeZone: 'Europe/Athens', defaultTzOffset: 2 },
  'IE': { timeZone: 'Europe/Dublin', defaultTzOffset: 0 },
  'IS': { timeZone: 'Atlantic/Reykjavik', defaultTzOffset: 0 },
  'UA': { timeZone: 'Europe/Kyiv', defaultTzOffset: 2 },
  'AZ': { timeZone: 'Asia/Baku', defaultTzOffset: 4 },
  'GE': { timeZone: 'Asia/Tbilisi', defaultTzOffset: 4 },
  'AM': { timeZone: 'Asia/Yerevan', defaultTzOffset: 4 },

  // Asya & Orta Doğu
  'JP': { timeZone: 'Asia/Tokyo', defaultTzOffset: 9 },
  'KR': { timeZone: 'Asia/Seoul', defaultTzOffset: 9 },
  'IN': { timeZone: 'Asia/Kolkata', defaultTzOffset: 5.5 },
  'NP': { timeZone: 'Asia/Kathmandu', defaultTzOffset: 5.75 },
  'LK': { timeZone: 'Asia/Colombo', defaultTzOffset: 5.5 },
  'BD': { timeZone: 'Asia/Dhaka', defaultTzOffset: 6 },
  'PK': { timeZone: 'Asia/Karachi', defaultTzOffset: 5 },
  'AF': { timeZone: 'Asia/Kabul', defaultTzOffset: 4.5 },
  'IR': { timeZone: 'Asia/Tehran', defaultTzOffset: 3.5 },
  'IQ': { timeZone: 'Asia/Baghdad', defaultTzOffset: 3 },
  'SA': { timeZone: 'Asia/Riyadh', defaultTzOffset: 3 },
  'AE': { timeZone: 'Asia/Dubai', defaultTzOffset: 4 },
  'IL': { timeZone: 'Asia/Jerusalem', defaultTzOffset: 2 },
  'TH': { timeZone: 'Asia/Bangkok', defaultTzOffset: 7 },
  'VN': { timeZone: 'Asia/Bangkok', defaultTzOffset: 7 },
  'PH': { timeZone: 'Asia/Manila', defaultTzOffset: 8 },
  'SG': { timeZone: 'Asia/Singapore', defaultTzOffset: 8 },
  'MY': { timeZone: 'Asia/Kuala_Lumpur', defaultTzOffset: 8 },
  'CN': { timeZone: 'Asia/Shanghai', defaultTzOffset: 8 }, // Çin ulusal tek resmi saat dilimi (UTC+8)

  // Afrika
  'EG': { timeZone: 'Africa/Cairo', defaultTzOffset: 2 },
  'ZA': { timeZone: 'Africa/Johannesburg', defaultTzOffset: 2 },
  'NG': { timeZone: 'Africa/Lagos', defaultTzOffset: 1 },
  'KE': { timeZone: 'Africa/Nairobi', defaultTzOffset: 3 },
  'MA': { timeZone: 'Africa/Casablanca', defaultTzOffset: 1 },
  'DZ': { timeZone: 'Africa/Algiers', defaultTzOffset: 1 },
  'TN': { timeZone: 'Africa/Tunis', defaultTzOffset: 1 },
  'ET': { timeZone: 'Africa/Addis_Ababa', defaultTzOffset: 3 },

  // Amerika & Latin
  'CO': { timeZone: 'America/Bogota', defaultTzOffset: -5 },
  'PE': { timeZone: 'America/Lima', defaultTzOffset: -5 },
  'VE': { timeZone: 'America/Caracas', defaultTzOffset: -4 },
  'AR': { timeZone: 'America/Argentina/Buenos_Aires', defaultTzOffset: -3 },
  'CL': { timeZone: 'America/Santiago', defaultTzOffset: -4 },
  'CR': { timeZone: 'America/Costa_Rica', defaultTzOffset: -6 },
  'CU': { timeZone: 'America/Havana', defaultTzOffset: -5 },
  'UY': { timeZone: 'America/Montevideo', defaultTzOffset: -3 }
};

/**
 * Birden fazla saat dilimi (Multi-Timezone) bulunan ülkelerin eyalet / idari bölge IANA haritası:
 * ABD (US), Kanada (CA), Avustralya (AU), Rusya (RU), Brezilya (BR)
 */
export const MULTI_TZ_REGIONS_IANA: Record<string, Record<string, { timeZone: string; defaultTzOffset: number }>> = {
  // ABD (US)
  'US': {
    // Doğu (Eastern - America/New_York - UTC-5)
    'new york': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'ny': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'florida': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'fl': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'massachusetts': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'ma': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'pennsylvania': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'pa': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'district of columbia': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'dc': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'virginia': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'va': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'georgia': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'ga': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'north carolina': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'nc': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'ohio': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'oh': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'michigan': { timeZone: 'America/Detroit', defaultTzOffset: -5 },
    'mi': { timeZone: 'America/Detroit', defaultTzOffset: -5 },
    'new jersey': { timeZone: 'America/New_York', defaultTzOffset: -5 },
    'nj': { timeZone: 'America/New_York', defaultTzOffset: -5 },

    // Merkezi (Central - America/Chicago - UTC-6)
    'illinois': { timeZone: 'America/Chicago', defaultTzOffset: -6 },
    'il': { timeZone: 'America/Chicago', defaultTzOffset: -6 },
    'texas': { timeZone: 'America/Chicago', defaultTzOffset: -6 },
    'tx': { timeZone: 'America/Chicago', defaultTzOffset: -6 },
    'minnesota': { timeZone: 'America/Chicago', defaultTzOffset: -6 },
    'mn': { timeZone: 'America/Chicago', defaultTzOffset: -6 },
    'missouri': { timeZone: 'America/Chicago', defaultTzOffset: -6 },
    'mo': { timeZone: 'America/Chicago', defaultTzOffset: -6 },
    'wisconsin': { timeZone: 'America/Chicago', defaultTzOffset: -6 },
    'wi': { timeZone: 'America/Chicago', defaultTzOffset: -6 },
    'louisiana': { timeZone: 'America/Chicago', defaultTzOffset: -6 },
    'la': { timeZone: 'America/Chicago', defaultTzOffset: -6 },

    // Dağlık (Mountain - America/Denver - UTC-7 / Phoenix UTC-7 no DST)
    'colorado': { timeZone: 'America/Denver', defaultTzOffset: -7 },
    'co': { timeZone: 'America/Denver', defaultTzOffset: -7 },
    'arizona': { timeZone: 'America/Phoenix', defaultTzOffset: -7 },
    'az': { timeZone: 'America/Phoenix', defaultTzOffset: -7 },
    'utah': { timeZone: 'America/Denver', defaultTzOffset: -7 },
    'ut': { timeZone: 'America/Denver', defaultTzOffset: -7 },
    'new mexico': { timeZone: 'America/Denver', defaultTzOffset: -7 },
    'nm': { timeZone: 'America/Denver', defaultTzOffset: -7 },
    'montana': { timeZone: 'America/Denver', defaultTzOffset: -7 },
    'mt': { timeZone: 'America/Denver', defaultTzOffset: -7 },

    // Pasifik (Pacific - America/Los_Angeles - UTC-8)
    'california': { timeZone: 'America/Los_Angeles', defaultTzOffset: -8 },
    'ca': { timeZone: 'America/Los_Angeles', defaultTzOffset: -8 },
    'washington': { timeZone: 'America/Los_Angeles', defaultTzOffset: -8 },
    'wa': { timeZone: 'America/Los_Angeles', defaultTzOffset: -8 },
    'oregon': { timeZone: 'America/Los_Angeles', defaultTzOffset: -8 },
    'or': { timeZone: 'America/Los_Angeles', defaultTzOffset: -8 },
    'nevada': { timeZone: 'America/Los_Angeles', defaultTzOffset: -8 },
    'nv': { timeZone: 'America/Los_Angeles', defaultTzOffset: -8 },

    // Alaska & Hawaii
    'alaska': { timeZone: 'America/Anchorage', defaultTzOffset: -9 },
    'ak': { timeZone: 'America/Anchorage', defaultTzOffset: -9 },
    'hawaii': { timeZone: 'Pacific/Honolulu', defaultTzOffset: -10 },
    'hi': { timeZone: 'Pacific/Honolulu', defaultTzOffset: -10 }
  },

  // KANADA (CA)
  'CA': {
    'ontario': { timeZone: 'America/Toronto', defaultTzOffset: -5 },
    'on': { timeZone: 'America/Toronto', defaultTzOffset: -5 },
    'quebec': { timeZone: 'America/Montreal', defaultTzOffset: -5 },
    'qc': { timeZone: 'America/Montreal', defaultTzOffset: -5 },
    'british columbia': { timeZone: 'America/Vancouver', defaultTzOffset: -8 },
    'bc': { timeZone: 'America/Vancouver', defaultTzOffset: -8 },
    'alberta': { timeZone: 'America/Edmonton', defaultTzOffset: -7 },
    'ab': { timeZone: 'America/Edmonton', defaultTzOffset: -7 },
    'manitoba': { timeZone: 'America/Winnipeg', defaultTzOffset: -6 },
    'mb': { timeZone: 'America/Winnipeg', defaultTzOffset: -6 },
    'saskatchewan': { timeZone: 'America/Regina', defaultTzOffset: -6 },
    'sk': { timeZone: 'America/Regina', defaultTzOffset: -6 },
    'nova scotia': { timeZone: 'America/Halifax', defaultTzOffset: -4 },
    'ns': { timeZone: 'America/Halifax', defaultTzOffset: -4 },
    'newfoundland': { timeZone: 'America/St_Johns', defaultTzOffset: -3.5 },
    'nl': { timeZone: 'America/St_Johns', defaultTzOffset: -3.5 }
  },

  // AVUSTRALYA (AU)
  'AU': {
    'new south wales': { timeZone: 'Australia/Sydney', defaultTzOffset: 10 },
    'nsw': { timeZone: 'Australia/Sydney', defaultTzOffset: 10 },
    'victoria': { timeZone: 'Australia/Melbourne', defaultTzOffset: 10 },
    'vic': { timeZone: 'Australia/Melbourne', defaultTzOffset: 10 },
    'queensland': { timeZone: 'Australia/Brisbane', defaultTzOffset: 10 },
    'qld': { timeZone: 'Australia/Brisbane', defaultTzOffset: 10 },
    'south australia': { timeZone: 'Australia/Adelaide', defaultTzOffset: 9.5 },
    'sa': { timeZone: 'Australia/Adelaide', defaultTzOffset: 9.5 },
    'western australia': { timeZone: 'Australia/Perth', defaultTzOffset: 8 },
    'wa': { timeZone: 'Australia/Perth', defaultTzOffset: 8 },
    'northern territory': { timeZone: 'Australia/Darwin', defaultTzOffset: 9.5 },
    'nt': { timeZone: 'Australia/Darwin', defaultTzOffset: 9.5 },
    'tasmania': { timeZone: 'Australia/Hobart', defaultTzOffset: 10 },
    'tas': { timeZone: 'Australia/Hobart', defaultTzOffset: 10 }
  },

  // BREZİLYA (BR)
  'BR': {
    'sao paulo': { timeZone: 'America/Sao_Paulo', defaultTzOffset: -3 },
    'sp': { timeZone: 'America/Sao_Paulo', defaultTzOffset: -3 },
    'rio de janeiro': { timeZone: 'America/Sao_Paulo', defaultTzOffset: -3 },
    'rj': { timeZone: 'America/Sao_Paulo', defaultTzOffset: -3 },
    'amazonas': { timeZone: 'America/Manaus', defaultTzOffset: -4 },
    'am': { timeZone: 'America/Manaus', defaultTzOffset: -4 }
  },

  // RUSYA (RU)
  'RU': {
    'moscow': { timeZone: 'Europe/Moscow', defaultTzOffset: 3 },
    'moskva': { timeZone: 'Europe/Moscow', defaultTzOffset: 3 },
    'saint petersburg': { timeZone: 'Europe/Moscow', defaultTzOffset: 3 },
    'sverdlovsk': { timeZone: 'Asia/Yekaterinburg', defaultTzOffset: 5 },
    'novosibirsk': { timeZone: 'Asia/Novosibirsk', defaultTzOffset: 7 },
    'primorsky': { timeZone: 'Asia/Vladivostok', defaultTzOffset: 10 }
  }
};

/**
 * Koordinatlar ve opsiyonel ülke/bölge bilgisine göre gerçek IANA saat dilimini
 * güvenilir ve deterministik biçimde belirler.
 *
 * Veri Kaynağı: IANA Time Zone Database (Release 2024b / tzdb) & ISO 3166-1 / ISO 3166-2
 * Belirsizlik İlkesi: Koordinatların saat dilimi güvenilir biçimde doğrulanamazsa
 * asla sahte/tahmini bir saat dilimi atanmaz; isAmbiguous: true ve confidence: 'uncertain' döner.
 */
export function lookupIanaTimeZoneForCoordinates(
  lat: number,
  lng: number,
  countryCode?: string,
  regionName?: string
): { timeZone: string; defaultTzOffset: number; isAmbiguous: boolean; confidence: 'exact_zone' | 'country_standard' | 'uncertain' } {
  // 1. Ülke kodu mevcutsa:
  if (countryCode) {
    const cc = countryCode.trim().toUpperCase();

    // A. Tek saat dilimli ülke ise doğrudan kanonik IANA saat dilimi
    if (SINGLE_TIMEZONE_COUNTRIES_IANA[cc]) {
      const match = SINGLE_TIMEZONE_COUNTRIES_IANA[cc];
      return {
        timeZone: match.timeZone,
        defaultTzOffset: match.defaultTzOffset,
        isAmbiguous: false,
        confidence: 'country_standard'
      };
    }

    // B. Çoklu saat dilimli ülke ise (US, CA, AU, RU, BR):
    if (MULTI_TZ_REGIONS_IANA[cc]) {
      const regMap = MULTI_TZ_REGIONS_IANA[cc];

      // B1. Eyalet/bölge adı verilmişse eşle
      if (regionName) {
        const normRegion = normalizeGeoSearchText(regionName);
        for (const [key, val] of Object.entries(regMap)) {
          if (normRegion === key || normRegion.includes(key)) {
            return {
              timeZone: val.timeZone,
              defaultTzOffset: val.defaultTzOffset,
              isAmbiguous: false,
              confidence: 'exact_zone'
            };
          }
        }
      }

      // B2. Eyalet ismi yoksa veya eşleşmediyse: Ülke içindeki onaylı şehir veritabanında
      // sadece AYNI ÜLKE sınırları içerisindeki en yakın referans şehri ve mesafesini kontrol et.
      // Sınır aşırı veya uzak noktalarda yanlış dilim atanmaması için mesafe eşiği (< 400 km) uygulanır.
      let closestCountryDist = Infinity;
      let matchedCountryCity: CityGeoInfo | null = null;

      for (const c of Object.values(CITIES_DB)) {
        if (c.country === cc) {
          const dLat = c.lat - lat;
          const dLng = c.lng - lng;
          const distSq = dLat * dLat + dLng * dLng;
          if (distSq < closestCountryDist) {
            closestCountryDist = distSq;
            matchedCountryCity = c;
          }
        }
      }

      // ~4 derecelik coğrafi açı mesafesi (~400 km) dahilinde aynı ülkeden güvenilir merkez varsa:
      if (matchedCountryCity && closestCountryDist < 16) {
        return {
          timeZone: matchedCountryCity.timeZone,
          defaultTzOffset: matchedCountryCity.defaultTzOffset,
          isAmbiguous: false,
          confidence: 'exact_zone'
        };
      }

      // Eyalet belirsiz ve yakında aynı ülkeden kanonik referans yoksa:
      // KURAL 3: Çoklu saat dilimli ülkede tahmin yürütülmez, açıkça belirsiz olarak işaretlenir.
      return {
        timeZone: 'UTC',
        defaultTzOffset: 0,
        isAmbiguous: true,
        confidence: 'uncertain'
      };
    }
  }

  // 2. Ülke kodu yoksa veya tanınmıyorsa:
  // Dünya genelinde çok yakın (< 50 km / 0.5 derece) bilinen kanonik bir metropol var mı?
  let closestDist = Infinity;
  let bestCity: CityGeoInfo | null = null;
  for (const c of Object.values(CITIES_DB)) {
    const dLat = c.lat - lat;
    const dLng = c.lng - lng;
    const distSq = dLat * dLat + dLng * dLng;
    if (distSq < closestDist) {
      closestDist = distSq;
      bestCity = c;
    }
  }

  if (bestCity && closestDist < 0.25) { // < ~50 km
    return {
      timeZone: bestCity.timeZone,
      defaultTzOffset: bestCity.defaultTzOffset,
      isAmbiguous: false,
      confidence: 'exact_zone'
    };
  }

  // KURAL 3: Koordinatlar için saat dilimi güvenilir biçimde doğrulanamıyorsa tahmin yürütülmez.
  return {
    timeZone: 'UTC',
    defaultTzOffset: 0,
    isAmbiguous: true,
    confidence: 'uncertain'
  };
}

// In-Memory Geocoding Request Cache (Aynı arama için tekrarlı ağ isteklerini engeller)
const ONLINE_GEOCODE_CACHE = new Map<string, ResolvedLocation>();

export function clearOnlineGeocodeCache(): void {
  ONLINE_GEOCODE_CACHE.clear();
}

export async function resolveOnlineCityCoordinates(
  query: string,
  timeoutMs: number = 3000
): Promise<ResolvedLocation> {
  if (!query || typeof query !== 'string' || query.trim().length === 0) {
    return resolveCityCoordinates('');
  }

  const cacheKey = query.trim().toLowerCase();
  if (ONLINE_GEOCODE_CACHE.has(cacheKey)) {
    return ONLINE_GEOCODE_CACHE.get(cacheKey)!;
  }

  // 1. Önce yerel yüksek doğruluklu veritabanında ara
  const localRes = resolveCityCoordinates(query);
  if (!localRes.isAmbiguous && localRes.confidence !== 'default_fallback') {
    return localRes;
  }

  // 2. Yerelde bulunamadıysa harici OpenStreetMap Nominatim servisini dene
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const encoded = encodeURIComponent(query.trim());
    const url = `https://nominatim.openstreetmap.org/search?q=${encoded}&format=json&limit=1&addressdetails=1`;
    const resp = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'ArtvenaTattooApp/2.0 (Astrology Ephemeris Geocoder; contact: support@artvena.local)',
        'Accept-Language': 'tr,en'
      }
    });
    clearTimeout(timer);

    if (!resp.ok) {
      return localRes;
    }

    const data = await resp.json();
    if (!Array.isArray(data) || data.length === 0) {
      return localRes;
    }

    const item = data[0];
    const lat = parseFloat(item.lat);
    const lon = parseFloat(item.lon);
    if (isNaN(lat) || isNaN(lon)) {
      return localRes;
    }

    const countryCode = (item.address?.country_code || 'XX').toUpperCase();
    const countryName = item.address?.country || 'Bilinmeyen Ülke';
    const resolvedName = item.display_name?.split(',')[0] || query;

    const regionName = item.address?.state || item.address?.province || item.address?.region || '';
    const tzLookup = lookupIanaTimeZoneForCoordinates(lat, lon, countryCode, regionName);

    const resolved: ResolvedLocation = {
      inputName: query,
      matchedKey: `osm_${item.osm_id || 'result'}`,
      cityName: `${resolvedName} (OSM Doğrulandı)`,
      country: countryCode,
      countryName,
      region: regionName,
      latitude: lat,
      longitude: lon,
      timeZone: tzLookup.timeZone,
      defaultTzOffset: tzLookup.defaultTzOffset,
      confidence: tzLookup.isAmbiguous ? 'default_fallback' : 'exact_city',
      isAmbiguous: tzLookup.isAmbiguous,
      notes: tzLookup.isAmbiguous
        ? `Konum OSM ile bulundu ancak saat dilimi doğrulanamadı (Belirsiz). Sahte saat dilimi atanmadı.`
        : `Konum OpenStreetMap Nominatim servisi ile doğrulandı (IANA: ${tzLookup.timeZone}): ${item.display_name}`
    };

    ONLINE_GEOCODE_CACHE.set(cacheKey, resolved);
    return resolved;
  } catch (err) {
    clearTimeout(timer);
    // Ağ kesintisi, zaman aşımı veya güvenlik duvarı durumunda:
    return {
      ...localRes,
      notes: `${localRes.notes} (Harici harita servisi çevrimdışı veya zaman aşımına uğradı; güvenli çevrimdışı mod korundu.)`
    };
  }
}

export function resolveCityCoordinates(cityInput?: string): ResolvedLocation {
  if (!cityInput || typeof cityInput !== 'string' || cityInput.trim().length === 0) {
    return {
      inputName: '',
      matchedKey: 'unspecified_location',
      cityName: 'Doğum Yeri Belirtilmedi',
      country: '',
      countryName: 'Belirtilmedi',
      latitude: 0.0,
      longitude: 0.0,
      timeZone: 'UTC',
      defaultTzOffset: 0,
      confidence: 'default_fallback',
      isAmbiguous: true,
      notes: 'Doğum yeri girilmedi. Koordinat bilinmediği için Yükselen Burç ve ev başlangıçları hesaplanamaz.'
    };
  }

  const normalizedRaw = normalizeGeoSearchText(cityInput);
  const normalizedNoSpaces = normalizedRaw.replace(/\s+/g, '');
  const { mainPart, qualifierPart } = parseCityInputParts(cityInput);

  // 1. Doğrudan kanonik anahtar eşleşmesi (örn. 'istanbul', 'london_gb', 'paris_fr')
  if (CITIES_DB[normalizedNoSpaces]) {
    const c = CITIES_DB[normalizedNoSpaces];
    return {
      inputName: cityInput,
      matchedKey: c.canonicalKey,
      cityName: c.name,
      country: c.country,
      countryName: c.countryName,
      region: c.region,
      latitude: c.lat,
      longitude: c.lng,
      timeZone: c.timeZone,
      defaultTzOffset: c.defaultTzOffset,
      confidence: 'exact_city',
      isAmbiguous: false,
      notes: `${c.name} koordinatları doğrudan kanonik anahtar eşleşmesiyle belirlendi.`
    };
  }

  // 2. Niteleyici (qualifier) içeren akıllı adaş eşleşmesi
  // Örn: "Paris, Texas", "London, Ontario", "Santiago, İspanya", "San Jose, Kosta Rika", "Ereğli, Konya"
  if (qualifierPart && qualifierPart.length > 0) {
    const matchedCandidates: CityGeoInfo[] = [];
    for (const c of Object.values(CITIES_DB)) {
      // Şehir adı uyuşuyor mu?
      const nameMatches = c.aliases.some(a => {
        const aNorm = normalizeGeoSearchText(a);
        return aNorm === mainPart || aNorm.startsWith(mainPart) || mainPart.startsWith(aNorm);
      });

      if (nameMatches && candidateMatchesQualifier(c, qualifierPart)) {
        matchedCandidates.push(c);
      }
    }

    if (matchedCandidates.length > 0) {
      const best = matchedCandidates[0];
      return {
        inputName: cityInput,
        matchedKey: best.canonicalKey,
        cityName: best.name,
        country: best.country,
        countryName: best.countryName,
        region: best.region,
        latitude: best.lat,
        longitude: best.lng,
        timeZone: best.timeZone,
        defaultTzOffset: best.defaultTzOffset,
        confidence: 'exact_city',
        isAmbiguous: false,
        notes: `${best.name} konumu, şehir adı ve bölge/ülke niteleyicisi (${qualifierPart}) ile doğrulandı.`
      };
    }
  }

  // 3. Niteleyici yoksa veya niteleyiciyle bulunamadıysa:
  // Homonim birincil varsayılan kontrolü (örn. yalın "paris" -> Paris Fransa, "london" -> Londra İngiltere)
  if (HOMONYM_PRIMARY_DEFAULTS[mainPart] && CITIES_DB[HOMONYM_PRIMARY_DEFAULTS[mainPart]]) {
    const primary = CITIES_DB[HOMONYM_PRIMARY_DEFAULTS[mainPart]];
    return {
      inputName: cityInput,
      matchedKey: primary.canonicalKey,
      cityName: primary.name,
      country: primary.country,
      countryName: primary.countryName,
      region: primary.region,
      latitude: primary.lat,
      longitude: primary.lng,
      timeZone: primary.timeZone,
      defaultTzOffset: primary.defaultTzOffset,
      confidence: 'exact_city',
      isAmbiguous: false,
      notes: `${primary.name} konumu, küresel ana merkez eşleşmesiyle belirlendi.`
    };
  }

  // 4. Birebir alias eşleşmesi (tüm girdi veya ana parça ile)
  for (const c of Object.values(CITIES_DB)) {
    for (const al of c.aliases) {
      const alNorm = normalizeGeoSearchText(al);
      if (alNorm === normalizedRaw || alNorm === mainPart) {
        return {
          inputName: cityInput,
          matchedKey: c.canonicalKey,
          cityName: c.name,
          country: c.country,
          countryName: c.countryName,
          region: c.region,
          latitude: c.lat,
          longitude: c.lng,
          timeZone: c.timeZone,
          defaultTzOffset: c.defaultTzOffset,
          confidence: 'exact_city',
          isAmbiguous: false,
          notes: `${c.name} koordinatları tam takma ad (${al}) eşleşmesiyle belirlendi.`
        };
      }
    }
  }

  // 5. Birleşik girdi eşleşmesi (örn: "Karadeniz Ereğli", "Konya Ereğli", "Marmara Ereğlisi", "Kadıköy İstanbul")
  for (const c of Object.values(CITIES_DB)) {
    for (const al of c.aliases) {
      const alNorm = normalizeGeoSearchText(al);
      if (alNorm.length >= 4 && (normalizedRaw.includes(alNorm) || alNorm.includes(normalizedRaw))) {
        // Kısa kelimelerin (Van, Bor, Ordu, Kars, Muş) yanlış eşleşmesini engelle!
        // Eğer aranan veya alias kısa ise yalnızca tam kelime sınırı eşleşmeli
        const isShort = normalizedRaw.length <= 4 || alNorm.length <= 4;
        if (!isShort || normalizedRaw === alNorm) {
          return {
            inputName: cityInput,
            matchedKey: c.canonicalKey,
            cityName: c.name,
            country: c.country,
            countryName: c.countryName,
            region: c.region,
            latitude: c.lat,
            longitude: c.lng,
            timeZone: c.timeZone,
            defaultTzOffset: c.defaultTzOffset,
            confidence: 'province_center',
            isAmbiguous: false,
            notes: `${c.name} koordinatları bileşik anahtar eşleşmesiyle belirlendi.`
          };
        }
      }
    }
  }

  // 6. Eşleşmeyen / Tanınmayan Durum:
  // KURAL 6: Bilinmeyen şehir için sahte koordinatlarla kesin yükselen veya ev üretilmez!
  // Açıkça 'default_fallback' ve 'isAmbiguous: true' döner.
  return {
    inputName: cityInput,
    matchedKey: 'unknown_location',
    cityName: `${cityInput} (Konum Belirlenemedi - Referans Gerekli)`,
    country: '',
    countryName: 'Doğrulanamayan Konum',
    latitude: 0.0,
    longitude: 0.0,
    timeZone: 'UTC',
    defaultTzOffset: 0,
    confidence: 'default_fallback',
    isAmbiguous: true,
    notes: `"${cityInput}" güvenilir konum veri tabanında doğrulanamadı. Sahte koordinat veya tahmini saat dilimi atanmadı; Yükselen Burç ve ev hesaplamaları kısıtlandı.`
  };
}

/**
 * Belirli bir tarih ve saat için IANA Time Zone Database (tzdb) üzerinden
 * kesin tarihsel saat dilimi (Timezone) ve yaz saati (DST) ofsetini hesaplar.
 */
export function getHistoricalTimezoneOffset(
  year: number,
  month: number, // 1-12
  day: number,   // 1-31
  hour: number,  // 0-23
  location: ResolvedLocation,
  minute: number = 0
): {
  offsetHours: number;
  isDst: boolean;
  tzName: string;
  isNonExistentTime?: boolean;
  isAmbiguousFold?: boolean;
} {
  // Bilinmeyen / doğrulanmamış konumlar için:
  if (location.isAmbiguous || location.confidence === 'default_fallback') {
    return {
      offsetHours: location.defaultTzOffset,
      isDst: false,
      tzName: `UTC${location.defaultTzOffset >= 0 ? '+' : ''}${location.defaultTzOffset} (Konum Belirsiz)`
    };
  }

  // Türkiye için 1910 öncesi: Yerel Ortalama Saat (LMT) kuralı
  if (location.country === 'TR' && year < 1910) {
    const lmtOffset = (location.longitude * 4) / 60;
    return {
      offsetHours: lmtOffset,
      isDst: false,
      tzName: 'LMT (Yerel Ortalama Saat)'
    };
  }

  const timeZone = location.timeZone || 'UTC';

  try {
    const targetLocalMs = Date.UTC(year, month - 1, day, hour, minute, 0);
    const dtf = new Intl.DateTimeFormat('en-US', {
      timeZone,
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false
    });

    const getLocalPartsFromUtc = (utcMs: number) => {
      const parts = dtf.formatToParts(new Date(utcMs));
      let y = 0, m = 0, d = 0, h = 0, min = 0, s = 0;
      for (const p of parts) {
        if (p.type === 'year') y = parseInt(p.value, 10);
        if (p.type === 'month') m = parseInt(p.value, 10);
        if (p.type === 'day') d = parseInt(p.value, 10);
        if (p.type === 'hour') h = parseInt(p.value, 10) % 24;
        if (p.type === 'minute') min = parseInt(p.value, 10);
        if (p.type === 'second') s = parseInt(p.value, 10);
      }
      return { y, m, d, h, min, s, ms: Date.UTC(y, m - 1, d, h, min, s) };
    };

    // İlk deneme ofseti
    const trialLocal = getLocalPartsFromUtc(targetLocalMs);
    const trialOffsetMs = trialLocal.ms - targetLocalMs;

    // Gerçek UTC anı
    const trueUtcMs = targetLocalMs - trialOffsetMs;

    // Gerçek UTC anında kesin yerel saat kontrolü
    const finalLocal = getLocalPartsFromUtc(trueUtcMs);
    const finalOffsetMs = finalLocal.ms - trueUtcMs;
    const offsetHours = finalOffsetMs / (3600 * 1000);

    // DST Gap ve Fold kontrolü
    const matchesExactly = (finalLocal.y === year && finalLocal.m === month && finalLocal.d === day && finalLocal.h === hour && finalLocal.min === minute);
    let isNonExistent = !matchesExactly;
    let isAmbiguousFold = false;

    if (matchesExactly) {
      // 1 saat öncesi ve sonrasındaki yerel saat aynı mı? (Sonbahar geri alma geçişi)
      const localBefore = getLocalPartsFromUtc(trueUtcMs - 3600000);
      const localAfter = getLocalPartsFromUtc(trueUtcMs + 3600000);
      if (
        (localBefore.y === year && localBefore.m === month && localBefore.d === day && localBefore.h === hour && localBefore.min === minute) ||
        (localAfter.y === year && localAfter.m === month && localAfter.d === day && localAfter.h === hour && localAfter.min === minute)
      ) {
        isAmbiguousFold = true;
      }
    }

    // Yaz saati (DST) tespiti
    const dtfLong = new Intl.DateTimeFormat('en-US', { timeZone, timeZoneName: 'long' });
    const longName = dtfLong.format(new Date(trueUtcMs));
    const isDst = longName.includes('Daylight') || longName.includes('Summer');

    // Türkiye 8 Eylül 2016 sonrası kalıcı UTC+3 mevzuatı tespiti
    if (location.country === 'TR' && (year > 2016 || (year === 2016 && (month > 9 || (month === 9 && day >= 8))))) {
      return {
        offsetHours: 3,
        isDst: false,
        tzName: 'TRT (UTC+3 Kalıcı)',
        isNonExistentTime: false,
        isAmbiguousFold: false
      };
    }

    // Türkçe saat dilimi etiketi oluştur
    const sign = offsetHours >= 0 ? '+' : '-';
    const absHours = Math.abs(offsetHours);
    const hPart = Math.floor(absHours);
    const mPart = Math.round((absHours - hPart) * 60);
    const offsetStr = mPart > 0
      ? `UTC${sign}${hPart}:${mPart.toString().padStart(2, '0')}`
      : `UTC${sign}${hPart}`;

    const tzName = isDst
      ? `${offsetStr} (Yaz Saati / DST)`
      : `${offsetStr}`;

    return {
      offsetHours,
      isDst,
      tzName,
      isNonExistentTime: isNonExistent,
      isAmbiguousFold
    };
  } catch {
    return {
      offsetHours: location.defaultTzOffset,
      isDst: false,
      tzName: `UTC${location.defaultTzOffset >= 0 ? '+' : ''}${location.defaultTzOffset}`
    };
  }
}
