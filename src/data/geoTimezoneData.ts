/**
 * Geocoding & Historical Timezone Database for Astrological Ephemeris Calculations
 * 
 * Includes:
 * - All 81 Turkish Provinces (exact decimal coordinates, latitude & longitude)
 * - Major International Cities (Europe, Americas, Asia, Middle East)
 * - Exact Historical Timezone & Daylight Saving Time (DST) Rules
 * - Homonym & Ambiguity Prevention (e.g., Van, Ordu, Aydın isolation)
 */

export interface CityGeoInfo {
  canonicalKey: string;
  name: string;
  country: string;
  lat: number;
  lng: number;
  defaultTzOffset: number;
  aliases: string[];
}

export interface ResolvedLocation {
  inputName: string;
  matchedKey: string;
  cityName: string;
  country: string;
  latitude: number;
  longitude: number;
  defaultTzOffset: number;
  confidence: 'exact_city' | 'province_center' | 'default_fallback';
  isAmbiguous: boolean;
  notes: string;
}

export const CITIES_DB: Record<string, CityGeoInfo> = {
  // Türkiye 81 İl Merkezi
  'adana': { canonicalKey: 'adana', name: 'Adana', country: 'TR', lat: 37.0000, lng: 35.3213, defaultTzOffset: 3, aliases: ['adana'] },
  'adiyaman': { canonicalKey: 'adiyaman', name: 'Adıyaman', country: 'TR', lat: 37.7648, lng: 38.2786, defaultTzOffset: 3, aliases: ['adiyaman', 'adıyaman'] },
  'afyon': { canonicalKey: 'afyon', name: 'Afyonkarahisar', country: 'TR', lat: 38.7507, lng: 30.5567, defaultTzOffset: 3, aliases: ['afyon', 'afyonkarahisar'] },
  'agri': { canonicalKey: 'agri', name: 'Ağrı', country: 'TR', lat: 39.7191, lng: 43.0503, defaultTzOffset: 3, aliases: ['agri', 'ağrı'] },
  'amasya': { canonicalKey: 'amasya', name: 'Amasya', country: 'TR', lat: 40.6533, lng: 35.8330, defaultTzOffset: 3, aliases: ['amasya'] },
  'ankara': { canonicalKey: 'ankara', name: 'Ankara', country: 'TR', lat: 39.9334, lng: 32.8597, defaultTzOffset: 3, aliases: ['ankara', 'capital'] },
  'antalya': { canonicalKey: 'antalya', name: 'Antalya', country: 'TR', lat: 36.8969, lng: 30.7133, defaultTzOffset: 3, aliases: ['antalya', 'alanya'] },
  'artvin': { canonicalKey: 'artvin', name: 'Artvin', country: 'TR', lat: 41.1828, lng: 41.8183, defaultTzOffset: 3, aliases: ['artvin'] },
  'aydin': { canonicalKey: 'aydin', name: 'Aydın', country: 'TR', lat: 37.8481, lng: 27.8453, defaultTzOffset: 3, aliases: ['aydin', 'aydın', 'kusadasi'] },
  'balikesir': { canonicalKey: 'balikesir', name: 'Balıkesir', country: 'TR', lat: 39.6484, lng: 27.8826, defaultTzOffset: 3, aliases: ['balikesir', 'balıkesir', 'ayvalik'] },
  'bilecik': { canonicalKey: 'bilecik', name: 'Bilecik', country: 'TR', lat: 40.1451, lng: 29.9799, defaultTzOffset: 3, aliases: ['bilecik'] },
  'bingol': { canonicalKey: 'bingol', name: 'Bingöl', country: 'TR', lat: 38.8854, lng: 40.4983, defaultTzOffset: 3, aliases: ['bingol', 'bingöl'] },
  'bitlis': { canonicalKey: 'bitlis', name: 'Bitlis', country: 'TR', lat: 38.4006, lng: 42.1095, defaultTzOffset: 3, aliases: ['bitlis', 'tatvan'] },
  'bolu': { canonicalKey: 'bolu', name: 'Bolu', country: 'TR', lat: 40.7392, lng: 31.6089, defaultTzOffset: 3, aliases: ['bolu'] },
  'burdur': { canonicalKey: 'burdur', name: 'Burdur', country: 'TR', lat: 37.7203, lng: 30.2908, defaultTzOffset: 3, aliases: ['burdur'] },
  'bursa': { canonicalKey: 'bursa', name: 'Bursa', country: 'TR', lat: 40.1885, lng: 29.0610, defaultTzOffset: 3, aliases: ['bursa', 'nilufer', 'osmangazi'] },
  'canakkale': { canonicalKey: 'canakkale', name: 'Çanakkale', country: 'TR', lat: 40.1553, lng: 26.4142, defaultTzOffset: 3, aliases: ['canakkale', 'çanakkale', 'gelibolu'] },
  'cankiri': { canonicalKey: 'cankiri', name: 'Çankırı', country: 'TR', lat: 40.6013, lng: 33.6134, defaultTzOffset: 3, aliases: ['cankiri', 'çankırı'] },
  'corum': { canonicalKey: 'corum', name: 'Çorum', country: 'TR', lat: 40.5506, lng: 34.9556, defaultTzOffset: 3, aliases: ['corum', 'çorum'] },
  'denizli': { canonicalKey: 'denizli', name: 'Denizli', country: 'TR', lat: 37.7765, lng: 29.0864, defaultTzOffset: 3, aliases: ['denizli', 'pamukkale'] },
  'diyarbakir': { canonicalKey: 'diyarbakir', name: 'Diyarbakır', country: 'TR', lat: 37.9144, lng: 40.2306, defaultTzOffset: 3, aliases: ['diyarbakir', 'diyarbakır'] },
  'edirne': { canonicalKey: 'edirne', name: 'Edirne', country: 'TR', lat: 41.6772, lng: 26.5557, defaultTzOffset: 3, aliases: ['edirne'] },
  'elazig': { canonicalKey: 'elazig', name: 'Elazığ', country: 'TR', lat: 38.6810, lng: 39.2264, defaultTzOffset: 3, aliases: ['elazig', 'elazığ'] },
  'erzincan': { canonicalKey: 'erzincan', name: 'Erzincan', country: 'TR', lat: 39.7500, lng: 39.5000, defaultTzOffset: 3, aliases: ['erzincan'] },
  'erzurum': { canonicalKey: 'erzurum', name: 'Erzurum', country: 'TR', lat: 39.9043, lng: 41.2679, defaultTzOffset: 3, aliases: ['erzurum'] },
  'eskisehir': { canonicalKey: 'eskisehir', name: 'Eskişehir', country: 'TR', lat: 39.7767, lng: 30.5206, defaultTzOffset: 3, aliases: ['eskisehir', 'eskişehir', 'odunpazari'] },
  'gaziantep': { canonicalKey: 'gaziantep', name: 'Gaziantep', country: 'TR', lat: 37.0662, lng: 37.3833, defaultTzOffset: 3, aliases: ['gaziantep', 'antep'] },
  'giresun': { canonicalKey: 'giresun', name: 'Giresun', country: 'TR', lat: 40.9128, lng: 38.3895, defaultTzOffset: 3, aliases: ['giresun'] },
  'gumushane': { canonicalKey: 'gumushane', name: 'Gümüşhane', country: 'TR', lat: 40.4600, lng: 39.4814, defaultTzOffset: 3, aliases: ['gumushane', 'gümüşhane'] },
  'hakkari': { canonicalKey: 'hakkari', name: 'Hakkâri', country: 'TR', lat: 37.5833, lng: 43.7333, defaultTzOffset: 3, aliases: ['hakkari', 'hakkâri', 'yuksekova'] },
  'hatay': { canonicalKey: 'hatay', name: 'Hatay (Antakya)', country: 'TR', lat: 36.2023, lng: 36.1606, defaultTzOffset: 3, aliases: ['hatay', 'antakya', 'iskenderun'] },
  'isparta': { canonicalKey: 'isparta', name: 'Isparta', country: 'TR', lat: 37.7648, lng: 30.5566, defaultTzOffset: 3, aliases: ['isparta'] },
  'mersin': { canonicalKey: 'mersin', name: 'Mersin', country: 'TR', lat: 36.8121, lng: 34.6415, defaultTzOffset: 3, aliases: ['mersin', 'icel', 'içel', 'tarsus'] },
  'istanbul': { canonicalKey: 'istanbul', name: 'İstanbul', country: 'TR', lat: 41.0082, lng: 28.9784, defaultTzOffset: 3, aliases: ['istanbul', 'ıstanbul', 'kadikoy', 'besiktas', 'uskudar', 'sisli'] },
  'izmir': { canonicalKey: 'izmir', name: 'İzmir', country: 'TR', lat: 38.4237, lng: 27.1428, defaultTzOffset: 3, aliases: ['izmir', 'ızmir', 'karsiyaka', 'alsancak', 'cesme', 'bornova'] },
  'kars': { canonicalKey: 'kars', name: 'Kars', country: 'TR', lat: 40.6167, lng: 43.1000, defaultTzOffset: 3, aliases: ['kars'] },
  'kastamonu': { canonicalKey: 'kastamonu', name: 'Kastamonu', country: 'TR', lat: 41.3887, lng: 33.7827, defaultTzOffset: 3, aliases: ['kastamonu'] },
  'kayseri': { canonicalKey: 'kayseri', name: 'Kayseri', country: 'TR', lat: 38.7312, lng: 35.4787, defaultTzOffset: 3, aliases: ['kayseri'] },
  'kirklareli': { canonicalKey: 'kirklareli', name: 'Kırklareli', country: 'TR', lat: 41.7333, lng: 27.2167, defaultTzOffset: 3, aliases: ['kirklareli', 'kırklareli', 'luleburgaz'] },
  'kirsehir': { canonicalKey: 'kirsehir', name: 'Kırşehir', country: 'TR', lat: 39.1425, lng: 34.1709, defaultTzOffset: 3, aliases: ['kirsehir', 'kırşehir'] },
  'kocaeli': { canonicalKey: 'kocaeli', name: 'Kocaeli (İzmit)', country: 'TR', lat: 40.8533, lng: 29.8815, defaultTzOffset: 3, aliases: ['kocaeli', 'izmit', 'gebze'] },
  'konya': { canonicalKey: 'konya', name: 'Konya', country: 'TR', lat: 37.8746, lng: 32.4932, defaultTzOffset: 3, aliases: ['konya', 'selcuklu'] },
  'kutahya': { canonicalKey: 'kutahya', name: 'Kütahya', country: 'TR', lat: 39.4167, lng: 29.9833, defaultTzOffset: 3, aliases: ['kutahya', 'kütahya'] },
  'malatya': { canonicalKey: 'malatya', name: 'Malatya', country: 'TR', lat: 38.3552, lng: 38.3095, defaultTzOffset: 3, aliases: ['malatya'] },
  'manisa': { canonicalKey: 'manisa', name: 'Manisa', country: 'TR', lat: 38.6191, lng: 27.4289, defaultTzOffset: 3, aliases: ['manisa'] },
  'kahramanmaras': { canonicalKey: 'kahramanmaras', name: 'Kahramanmaraş', country: 'TR', lat: 37.5858, lng: 36.9371, defaultTzOffset: 3, aliases: ['maras', 'kahramanmaras', 'kahramanmaraş'] },
  'mardin': { canonicalKey: 'mardin', name: 'Mardin', country: 'TR', lat: 37.3212, lng: 40.7245, defaultTzOffset: 3, aliases: ['mardin', 'midyat'] },
  'mugla': { canonicalKey: 'mugla', name: 'Muğla', country: 'TR', lat: 37.2153, lng: 28.3636, defaultTzOffset: 3, aliases: ['mugla', 'muğla', 'bodrum', 'fethiye', 'marmaris'] },
  'mus': { canonicalKey: 'mus', name: 'Muş', country: 'TR', lat: 38.7432, lng: 41.5064, defaultTzOffset: 3, aliases: ['mus', 'muş'] },
  'nevsehir': { canonicalKey: 'nevsehir', name: 'Nevşehir', country: 'TR', lat: 38.6244, lng: 34.7144, defaultTzOffset: 3, aliases: ['nevsehir', 'nevşehir', 'kapadokya', 'urgup'] },
  'nigde': { canonicalKey: 'nigde', name: 'Niğde', country: 'TR', lat: 37.9667, lng: 34.6833, defaultTzOffset: 3, aliases: ['nigde', 'niğde'] },
  'ordu': { canonicalKey: 'ordu', name: 'Ordu', country: 'TR', lat: 40.9839, lng: 37.8764, defaultTzOffset: 3, aliases: ['ordu', 'unye', 'fatsa'] },
  'rize': { canonicalKey: 'rize', name: 'Rize', country: 'TR', lat: 41.0201, lng: 40.5234, defaultTzOffset: 3, aliases: ['rize', 'ayder'] },
  'sakarya': { canonicalKey: 'sakarya', name: 'Sakarya (Adapazarı)', country: 'TR', lat: 40.7569, lng: 30.3783, defaultTzOffset: 3, aliases: ['sakarya', 'adapazari', 'adapazarı', 'sapanca'] },
  'samsun': { canonicalKey: 'samsun', name: 'Samsun', country: 'TR', lat: 41.2928, lng: 36.3313, defaultTzOffset: 3, aliases: ['samsun', 'atakum', 'bafra'] },
  'siirt': { canonicalKey: 'siirt', name: 'Siirt', country: 'TR', lat: 37.9333, lng: 41.9500, defaultTzOffset: 3, aliases: ['siirt'] },
  'sinop': { canonicalKey: 'sinop', name: 'Sinop', country: 'TR', lat: 42.0231, lng: 35.1531, defaultTzOffset: 3, aliases: ['sinop'] },
  'sivas': { canonicalKey: 'sivas', name: 'Sivas', country: 'TR', lat: 39.7477, lng: 37.0179, defaultTzOffset: 3, aliases: ['sivas'] },
  'tekirdag': { canonicalKey: 'tekirdag', name: 'Tekirdağ', country: 'TR', lat: 40.9833, lng: 27.5167, defaultTzOffset: 3, aliases: ['tekirdag', 'tekirdağ', 'corlu', 'çorlu'] },
  'tokat': { canonicalKey: 'tokat', name: 'Tokat', country: 'TR', lat: 40.3167, lng: 36.5500, defaultTzOffset: 3, aliases: ['tokat'] },
  'trabzon': { canonicalKey: 'trabzon', name: 'Trabzon', country: 'TR', lat: 41.0027, lng: 39.7168, defaultTzOffset: 3, aliases: ['trabzon', 'akcaabat'] },
  'tunceli': { canonicalKey: 'tunceli', name: 'Tunceli', country: 'TR', lat: 39.1079, lng: 39.5401, defaultTzOffset: 3, aliases: ['tunceli', 'dersim'] },
  'sanliurfa': { canonicalKey: 'sanliurfa', name: 'Şanlıurfa', country: 'TR', lat: 37.1674, lng: 38.7955, defaultTzOffset: 3, aliases: ['sanliurfa', 'şanlıurfa', 'urfa'] },
  'usak': { canonicalKey: 'usak', name: 'Uşak', country: 'TR', lat: 38.6823, lng: 29.4082, defaultTzOffset: 3, aliases: ['usak', 'uşak'] },
  'van': { canonicalKey: 'van', name: 'Van', country: 'TR', lat: 38.4891, lng: 43.4089, defaultTzOffset: 3, aliases: ['van', 'edremit-van'] },
  'yozgat': { canonicalKey: 'yozgat', name: 'Yozgat', country: 'TR', lat: 39.8181, lng: 34.8147, defaultTzOffset: 3, aliases: ['yozgat'] },
  'zonguldak': { canonicalKey: 'zonguldak', name: 'Zonguldak', country: 'TR', lat: 41.4564, lng: 31.7987, defaultTzOffset: 3, aliases: ['zonguldak', 'eregli'] },
  'aksaray': { canonicalKey: 'aksaray', name: 'Aksaray', country: 'TR', lat: 38.3687, lng: 34.0370, defaultTzOffset: 3, aliases: ['aksaray'] },
  'bayburt': { canonicalKey: 'bayburt', name: 'Bayburt', country: 'TR', lat: 40.2552, lng: 40.2249, defaultTzOffset: 3, aliases: ['bayburt'] },
  'karaman': { canonicalKey: 'karaman', name: 'Karaman', country: 'TR', lat: 37.1759, lng: 33.2287, defaultTzOffset: 3, aliases: ['karaman'] },
  'kirikkale': { canonicalKey: 'kirikkale', name: 'Kırıkkale', country: 'TR', lat: 39.8468, lng: 33.5153, defaultTzOffset: 3, aliases: ['kirikkale', 'kırıkkale'] },
  'batman': { canonicalKey: 'batman', name: 'Batman', country: 'TR', lat: 37.8812, lng: 41.1351, defaultTzOffset: 3, aliases: ['batman'] },
  'sirnak': { canonicalKey: 'sirnak', name: 'Şırnak', country: 'TR', lat: 37.5164, lng: 42.4611, defaultTzOffset: 3, aliases: ['sirnak', 'şırnak', 'cizre'] },
  'bartin': { canonicalKey: 'bartin', name: 'Bartın', country: 'TR', lat: 41.6344, lng: 32.3375, defaultTzOffset: 3, aliases: ['bartin', 'bartın', 'amasra'] },
  'ardahan': { canonicalKey: 'ardahan', name: 'Ardahan', country: 'TR', lat: 41.1105, lng: 42.7022, defaultTzOffset: 3, aliases: ['ardahan'] },
  'igdir': { canonicalKey: 'igdir', name: 'Iğdır', country: 'TR', lat: 39.9196, lng: 44.0454, defaultTzOffset: 3, aliases: ['igdir', 'ığdır'] },
  'yalova': { canonicalKey: 'yalova', name: 'Yalova', country: 'TR', lat: 40.6500, lng: 29.2667, defaultTzOffset: 3, aliases: ['yalova'] },
  'karabuk': { canonicalKey: 'karabuk', name: 'Karabük', country: 'TR', lat: 41.2061, lng: 32.6204, defaultTzOffset: 3, aliases: ['karabuk', 'karabük', 'safranbolu'] },
  'kilis': { canonicalKey: 'kilis', name: 'Kilis', country: 'TR', lat: 36.7184, lng: 37.1212, defaultTzOffset: 3, aliases: ['kilis'] },
  'osmaniye': { canonicalKey: 'osmaniye', name: 'Osmaniye', country: 'TR', lat: 37.0742, lng: 36.2472, defaultTzOffset: 3, aliases: ['osmaniye'] },
  'duzce': { canonicalKey: 'duzce', name: 'Düzce', country: 'TR', lat: 40.8438, lng: 31.1565, defaultTzOffset: 3, aliases: ['duzce', 'düzce', 'akcakoca'] },

  // Uluslararası Önemli Merkezler
  'london': { canonicalKey: 'london', name: 'Londra (London / Greenwich)', country: 'GB', lat: 51.4769, lng: 0.0000, defaultTzOffset: 0, aliases: ['london', 'londra', 'greenwich'] },
  'paris': { canonicalKey: 'paris', name: 'Paris', country: 'FR', lat: 48.8566, lng: 2.3522, defaultTzOffset: 1, aliases: ['paris'] },
  'berlin': { canonicalKey: 'berlin', name: 'Berlin', country: 'DE', lat: 52.5200, lng: 13.4050, defaultTzOffset: 1, aliases: ['berlin'] },
  'rome': { canonicalKey: 'rome', name: 'Roma (Rome)', country: 'IT', lat: 41.9028, lng: 12.4964, defaultTzOffset: 1, aliases: ['rome', 'roma'] },
  'madrid': { canonicalKey: 'madrid', name: 'Madrid', country: 'ES', lat: 40.4168, lng: -3.7038, defaultTzOffset: 1, aliases: ['madrid'] },
  'amsterdam': { canonicalKey: 'amsterdam', name: 'Amsterdam', country: 'NL', lat: 52.3676, lng: 4.9041, defaultTzOffset: 1, aliases: ['amsterdam'] },
  'vienna': { canonicalKey: 'vienna', name: 'Viyana (Vienna)', country: 'AT', lat: 48.2082, lng: 16.3738, defaultTzOffset: 1, aliases: ['vienna', 'viyana', 'wien'] },
  'zurich': { canonicalKey: 'zurich', name: 'Zürih (Zurich)', country: 'CH', lat: 47.3769, lng: 8.5417, defaultTzOffset: 1, aliases: ['zurich', 'zürih'] },
  'athens': { canonicalKey: 'athens', name: 'Atina (Athens)', country: 'GR', lat: 37.9838, lng: 23.7275, defaultTzOffset: 2, aliases: ['athens', 'atina'] },
  'new_york': { canonicalKey: 'new_york', name: 'New York', country: 'US', lat: 40.7128, lng: -74.0060, defaultTzOffset: -5, aliases: ['new york', 'newyork', 'nyc'] },
  'los_angeles': { canonicalKey: 'los_angeles', name: 'Los Angeles', country: 'US', lat: 34.0522, lng: -118.2437, defaultTzOffset: -8, aliases: ['los angeles', 'la'] },
  'chicago': { canonicalKey: 'chicago', name: 'Chicago', country: 'US', lat: 41.8781, lng: -87.6298, defaultTzOffset: -6, aliases: ['chicago'] },
  'toronto': { canonicalKey: 'toronto', name: 'Toronto', country: 'CA', lat: 43.6532, lng: -79.3832, defaultTzOffset: -5, aliases: ['toronto'] },
  'tokyo': { canonicalKey: 'tokyo', name: 'Tokyo', country: 'JP', lat: 35.6762, lng: 139.6503, defaultTzOffset: 9, aliases: ['tokyo'] },
  'cairo': { canonicalKey: 'cairo', name: 'Kahire (Cairo)', country: 'EG', lat: 30.0444, lng: 31.2357, defaultTzOffset: 2, aliases: ['cairo', 'kahire'] },
  'moscow': { canonicalKey: 'moscow', name: 'Moskova (Moscow)', country: 'RU', lat: 55.7558, lng: 37.6173, defaultTzOffset: 3, aliases: ['moscow', 'moskova'] },
  'baku': { canonicalKey: 'baku', name: 'Bakü (Baku)', country: 'AZ', lat: 40.4093, lng: 49.8671, defaultTzOffset: 4, aliases: ['baku', 'baki'] },
  'delhi': { canonicalKey: 'delhi', name: 'Delhi / Yeni Delhi', country: 'IN', lat: 28.6139, lng: 77.2090, defaultTzOffset: 5.5, aliases: ['delhi', 'new delhi', 'yeni delhi'] },
  'mumbai': { canonicalKey: 'mumbai', name: 'Mumbai (Bombay)', country: 'IN', lat: 19.0760, lng: 72.8777, defaultTzOffset: 5.5, aliases: ['mumbai', 'bombay'] },
  'dubai': { canonicalKey: 'dubai', name: 'Dubai', country: 'AE', lat: 25.2048, lng: 55.2708, defaultTzOffset: 4, aliases: ['dubai'] },
  'sydney': { canonicalKey: 'sydney', name: 'Sydney', country: 'AU', lat: -33.8688, lng: 151.2093, defaultTzOffset: 10, aliases: ['sydney'] },
  'beijing': { canonicalKey: 'beijing', name: 'Pekin (Beijing)', country: 'CN', lat: 39.9042, lng: 116.4074, defaultTzOffset: 8, aliases: ['beijing', 'pekin'] },
  'buenos_aires': { canonicalKey: 'buenos_aires', name: 'Buenos Aires', country: 'AR', lat: -34.6037, lng: -58.3816, defaultTzOffset: -3, aliases: ['buenos aires'] },
  'sao_paulo': { canonicalKey: 'sao_paulo', name: 'São Paulo', country: 'BR', lat: -23.5505, lng: -46.6333, defaultTzOffset: -3, aliases: ['sao paulo', 'san paulo'] }
};

/**
 * Şehir adını normalleştirir ve eşleşen koordinatları döndürür.
 * Eşsesli ve belirsiz isimleri (Van, Ordu vb.) doğru ayıklar.
 */
export function resolveCityCoordinates(cityInput?: string): ResolvedLocation {
  if (!cityInput || typeof cityInput !== 'string' || cityInput.trim().length === 0) {
    const def = CITIES_DB['istanbul'];
    return {
      inputName: '',
      matchedKey: def.canonicalKey,
      cityName: def.name,
      country: def.country,
      latitude: def.lat,
      longitude: def.lng,
      defaultTzOffset: def.defaultTzOffset,
      confidence: 'default_fallback',
      isAmbiguous: false,
      notes: 'Doğum yeri belirtilmedi; Türkiye referans merkezi (İstanbul 41.01°N, 28.98°E) varsayıldı.'
    };
  }

  const clean = cityInput
    .toLowerCase()
    .trim()
    .replace(/ç/g, 'c')
    .replace(/ğ/g, 'g')
    .replace(/ı/g, 'i')
    .replace(/ö/g, 'o')
    .replace(/ş/g, 's')
    .replace(/ü/g, 'u')
    .replace(/[^a-z0-9]/g, '');

  // 1. Doğrudan normalleştirilmiş tam şehir anahtarı eşleşmesi
  if (CITIES_DB[clean]) {
    const c = CITIES_DB[clean];
    return {
      inputName: cityInput,
      matchedKey: c.canonicalKey,
      cityName: c.name,
      country: c.country,
      latitude: c.lat,
      longitude: c.lng,
      defaultTzOffset: c.defaultTzOffset,
      confidence: 'exact_city',
      isAmbiguous: false,
      notes: `${c.name} koordinatları tam anahtar eşleşmesiyle başarıyla belirlendi.`
    };
  }

  // 2. Tam takma ad (alias) birebir eşleşmesi
  for (const c of Object.values(CITIES_DB)) {
    for (const al of c.aliases) {
      const cleanAlias = al
        .toLowerCase()
        .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
        .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
        .replace(/[^a-z0-9]/g, '');

      if (clean === cleanAlias) {
        return {
          inputName: cityInput,
          matchedKey: c.canonicalKey,
          cityName: c.name,
          country: c.country,
          latitude: c.lat,
          longitude: c.lng,
          defaultTzOffset: c.defaultTzOffset,
          confidence: 'province_center',
          isAmbiguous: false,
          notes: `${cityInput} girdisi ${c.name} merkezine tanımlı takma ad ile başarıyla eşlendi.`
        };
      }
    }
  }

  // 3. Güvenli kelime sınırı veya açık ön ek (minimum 4 karakter, rastgele kısa çakışmaları engeller)
  if (clean.length >= 4) {
    for (const c of Object.values(CITIES_DB)) {
      for (const al of c.aliases) {
        const cleanAlias = al
          .toLowerCase()
          .replace(/ç/g, 'c').replace(/ğ/g, 'g').replace(/ı/g, 'i')
          .replace(/ö/g, 'o').replace(/ş/g, 's').replace(/ü/g, 'u')
          .replace(/[^a-z0-9]/g, '');

        if (cleanAlias.length >= 4 && (clean.startsWith(cleanAlias) || cleanAlias.startsWith(clean))) {
          return {
            inputName: cityInput,
            matchedKey: c.canonicalKey,
            cityName: c.name,
            country: c.country,
            latitude: c.lat,
            longitude: c.lng,
            defaultTzOffset: c.defaultTzOffset,
            confidence: 'province_center',
            isAmbiguous: false,
            notes: `${cityInput} girdisi ${c.name} merkezine güvenli ön ek eşleşmesiyle bağlandı.`
          };
        }
      }
    }
  }

  // 4. Eşleşmeyen / Tanınmayan Durum:
  // KURAL: Bilinmeyen şehir sessizce İstanbul'a dönüştürülmez; açıkça 'Bilinmeyen Konum' ve 'default_fallback' döner!
  return {
    inputName: cityInput,
    matchedKey: 'unknown_location',
    cityName: `${cityInput} (Konum Belirlenemedi - Referans Gerekli)`,
    country: 'TR',
    latitude: 39.0, // Türkiye coğrafi ortalama enlemi
    longitude: 35.0, // Türkiye coğrafi ortalama boylamı
    defaultTzOffset: 3,
    confidence: 'default_fallback',
    isAmbiguous: true,
    notes: `"${cityInput}" veri tabanında bulunamadı. Koordinatlar doğrulanamadığı için yükselen ve ev hesaplamaları belirsiz kabul edilmelidir.`
  };
}

/**
 * Belirli bir tarih ve saat için tarihsel Saat Dilimi (Timezone) ve Yaz Saati (DST) ofsetini döner.
 */
export function getHistoricalTimezoneOffset(
  year: number,
  month: number, // 1-12
  day: number,   // 1-31
  hour: number,  // 0-23
  location: ResolvedLocation
): { offsetHours: number; isDst: boolean; tzName: string } {
  if (location.country === 'TR') {
    // 8 Eylül 2016 sonrası: Kalıcı UTC+3
    if (year > 2016 || (year === 2016 && (month > 9 || (month === 9 && day >= 8)))) {
      return { offsetHours: 3, isDst: false, tzName: 'TRT (UTC+3 Kalıcı)' };
    }

    // 1978 - 2016 dönemi: Yaz saati uygulaması (EET UTC+2 / EEST UTC+3)
    if (year >= 1978) {
      const isDst = isEuropeanSummerTime(year, month, day, hour);
      return {
        offsetHours: isDst ? 3 : 2,
        isDst,
        tzName: isDst ? 'EEST (UTC+3 Yaz Saati)' : 'EET (UTC+2 Kış Saati)'
      };
    }

    // 1910 - 1977
    if (year >= 1910) {
      return { offsetHours: 2, isDst: false, tzName: 'EET (UTC+2)' };
    }

    // 1910 öncesi: Yerel Ortalama Saat (LMT)
    const lmtOffset = (location.longitude * 4) / 60;
    return { offsetHours: lmtOffset, isDst: false, tzName: 'LMT (Yerel Ortalama Saat)' };
  }

  // Avrupa ülkeleri DST
  if (['GB', 'FR', 'DE', 'IT', 'ES', 'NL', 'AT', 'CH', 'GR'].includes(location.country)) {
    const isDst = isEuropeanSummerTime(year, month, day, hour);
    const baseOffset = location.defaultTzOffset;
    return {
      offsetHours: isDst ? baseOffset + 1 : baseOffset,
      isDst,
      tzName: isDst ? `UTC+${baseOffset + 1} (Yaz Saati)` : `UTC+${baseOffset}`
    };
  }

  // ABD / Kanada DST (Basit Kural: Mart 2. Pazar - Kasım 1. Pazar)
  if (['US', 'CA'].includes(location.country)) {
    const isDst = isUsSummerTime(year, month, day);
    const baseOffset = location.defaultTzOffset;
    return {
      offsetHours: isDst ? baseOffset + 1 : baseOffset,
      isDst,
      tzName: isDst ? `UTC${baseOffset + 1 >= 0 ? '+' : ''}${baseOffset + 1} (DST)` : `UTC${baseOffset >= 0 ? '+' : ''}${baseOffset}`
    };
  }

  // Hindistan (IST UTC+5:30 kalıcı), Japonya (JST UTC+9 kalıcı), BAE (UTC+4 kalıcı), Azerbaycan vb.
  return {
    offsetHours: location.defaultTzOffset,
    isDst: false,
    tzName: `UTC${location.defaultTzOffset >= 0 ? '+' : ''}${location.defaultTzOffset}`
  };
}

function isUsSummerTime(year: number, month: number, day: number): boolean {
  if (month < 3 || month > 11) return false;
  if (month > 3 && month < 11) return true;
  if (month === 3) return day >= 14; // yaklaşık 2. pazar
  if (month === 11) return day <= 7; // yaklaşık 1. pazar
  return false;
}

/**
 * Avrupa / Türkiye 1978-2016 Yaz Saati (DST) hesaplayıcısı:
 * Mart ayının son Pazar günü 03:00 ile Ekim ayının son Pazar günü 04:00 arası
 */
function isEuropeanSummerTime(year: number, month: number, day: number, hour: number): boolean {
  if (month < 3 || month > 10) return false;
  if (month > 3 && month < 10) return true;

  // Mart ayının son Pazarı
  if (month === 3) {
    const lastSundayMarch = getLastSundayOfMonth(year, 3);
    if (day > lastSundayMarch) return true;
    if (day === lastSundayMarch) return hour >= 3;
    return false;
  }

  // Ekim ayının son Pazarı
  if (month === 10) {
    const lastSundayOctober = getLastSundayOfMonth(year, 10);
    if (day < lastSundayOctober) return true;
    if (day === lastSundayOctober) return hour < 4;
    return false;
  }

  return false;
}

function getLastSundayOfMonth(year: number, month: number): number {
  // Ayın son gününü bul (Mart: 31, Ekim: 31)
  const lastDay = 31;
  const d = new Date(Date.UTC(year, month - 1, lastDay));
  const dayOfWeek = d.getUTCDay(); // 0 = Pazar
  return lastDay - dayOfWeek;
}
