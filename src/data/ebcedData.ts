/**
 * Ebced & Mizan Standart Harf ve Element Referans Veritabanı
 * 
 * Standartlar:
 * 1. Ebced-i Kebir (Büyük Ebced / Cemel-i Kebir): 28 Klasik Arapça Harf Değeri
 * 2. Osmanlı / Farsça İlaveler: Pe (پ = 2), Çim (چ = 3), Je (ژ = 7), Gaf (گ = 20)
 * 3. Türkçe Latin Dönüşümü: Ç, Ğ, I, İ, Ö, Ş, Ü harflerinin fonetik ve etimolojik karşılıkları
 * 4. Dört Unsur (Mizan-ı Anâsır): Ateş (Nâr), Hava (Bâd), Su (Âb), Toprak (Hâk)
 * 5. Denetlenebilir Harf Dökümü ve Dönüşüm Kaydı
 */

export type MizanElement = 'Ateş' | 'Hava' | 'Su' | 'Toprak';

export interface EbcedCharDefinition {
  latinChar: string;
  arabicName: string;
  arabicLetter: string;
  numericValue: number;
  element: MizanElement;
  elementTier: number; // 1-7 basamak
  notes: string;
}

export interface CharBreakdownItem {
  index: number;
  rawChar: string;
  normalizedChar: string;
  arabicLetter: string;
  arabicName: string;
  value: number;
  element: MizanElement;
  sourceRole: 'client' | 'mother';
}

/**
 * Ebced-i Kebir Klasik Latin ve Türkçe Harf Karşılıkları Tablosu
 * Kaynak: Kâtib Çelebi, Mizanü'l-Hak; İbn Haldun, Mukaddime; Ahmed Ziyâeddin Gümüşhânevi, Mecmuatü'l-Ahzab.
 */
export const EBCED_STANDARDS_TABLE: Record<string, EbcedCharDefinition> = {
  'a': { latinChar: 'a', arabicName: 'Elif', arabicLetter: 'ا', numericValue: 1, element: 'Ateş', elementTier: 1, notes: 'İlk harf, vahdet ve ateş' },
  'b': { latinChar: 'b', arabicName: 'Bâ', arabicLetter: 'ب', numericValue: 2, element: 'Hava', elementTier: 1, notes: 'Zuhur kapısı, hava unsuru' },
  'c': { latinChar: 'c', arabicName: 'Cîm', arabicLetter: 'ج', numericValue: 3, element: 'Su', elementTier: 1, notes: 'Cemal tecellisi, su unsuru' },
  'ç': { latinChar: 'ç', arabicName: 'Çîm (Farsî)', arabicLetter: 'چ', numericValue: 3, element: 'Su', elementTier: 1, notes: 'Cim türevi (3), su unsuru' },
  'd': { latinChar: 'd', arabicName: 'Dâl', arabicLetter: 'د', numericValue: 4, element: 'Toprak', elementTier: 1, notes: 'Daimiyet ve sebat, toprak unsuru' },
  'e': { latinChar: 'e', arabicName: 'He / Hemze', arabicLetter: 'ه / ء', numericValue: 5, element: 'Ateş', elementTier: 1, notes: 'He (5), nefes ve canlılık, ateş' },
  'f': { latinChar: 'f', arabicName: 'Fâ', arabicLetter: 'ف', numericValue: 80, element: 'Hava', elementTier: 2, notes: 'Fütuh ve nefha, hava unsuru' },
  'g': { latinChar: 'g', arabicName: 'Gef / Gaf (Farsî)', arabicLetter: 'گ', numericValue: 20, element: 'Hava', elementTier: 2, notes: 'Kef türevi gef (20), hava unsuru' },
  'ğ': { latinChar: 'ğ', arabicName: 'Gayn / Yumuşak Ge', arabicLetter: 'غ / گ', numericValue: 20, element: 'Hava', elementTier: 2, notes: 'Türkçe fonetikte Gef (20) dengesi, hava unsuru' },
  'h': { latinChar: 'h', arabicName: 'Hâ (Noktasız/Noktalı)', arabicLetter: 'ح', numericValue: 8, element: 'Ateş', elementTier: 1, notes: 'Hayat ve hararet, ateş unsuru' },
  'ı': { latinChar: 'ı', arabicName: 'Yâ (Kalın)', arabicLetter: 'ى', numericValue: 10, element: 'Ateş', elementTier: 2, notes: 'Yâ harfinin kalın seslisi, ateş unsuru' },
  'i': { latinChar: 'i', arabicName: 'Yâ (İnce)', arabicLetter: 'ي', numericValue: 10, element: 'Ateş', elementTier: 2, notes: 'Yâ harfi (10), ateş unsuru' },
  'j': { latinChar: 'j', arabicName: 'Jâ (Farsî)', arabicLetter: 'ژ', numericValue: 7, element: 'Su', elementTier: 1, notes: 'Ze türevi jâ (7), su unsuru' },
  'k': { latinChar: 'k', arabicName: 'Kâf', arabicLetter: 'ك', numericValue: 20, element: 'Hava', elementTier: 2, notes: 'Kelam ve kâinat, hava unsuru' },
  'l': { latinChar: 'l', arabicName: 'Lâm', arabicLetter: 'ل', numericValue: 30, element: 'Su', elementTier: 2, notes: 'Letafet ve akış, su unsuru' },
  'm': { latinChar: 'm', arabicName: 'Mîm', arabicLetter: 'م', numericValue: 40, element: 'Toprak', elementTier: 2, notes: 'Merhamet ve madde, toprak unsuru' },
  'n': { latinChar: 'n', arabicName: 'Nûn', arabicLetter: 'ن', numericValue: 50, element: 'Ateş', elementTier: 2, notes: 'Nur ve kalem, ateş unsuru' },
  'o': { latinChar: 'o', arabicName: 'Vâv (Kalın)', arabicLetter: 'و', numericValue: 6, element: 'Hava', elementTier: 1, notes: 'Vav harfi (6), hava unsuru' },
  'ö': { latinChar: 'ö', arabicName: 'Vâv (İnce)', arabicLetter: 'و', numericValue: 6, element: 'Hava', elementTier: 1, notes: 'Vav türevi (6), hava unsuru' },
  'p': { latinChar: 'p', arabicName: 'Pâ (Farsî)', arabicLetter: 'پ', numericValue: 2, element: 'Hava', elementTier: 1, notes: 'Bâ türevi pâ (2), hava unsuru' },
  'r': { latinChar: 'r', arabicName: 'Râ', arabicLetter: 'ر', numericValue: 200, element: 'Toprak', elementTier: 3, notes: 'Riyaset ve rükün, toprak unsuru' },
  's': { latinChar: 's', arabicName: 'Sîn', arabicLetter: 'س', numericValue: 60, element: 'Ateş', elementTier: 2, notes: 'Sır ve sirayet, ateş unsuru' },
  'ş': { latinChar: 'ş', arabicName: 'Şîn', arabicLetter: 'ش', numericValue: 300, element: 'Hava', elementTier: 3, notes: 'Şems ve şuur, hava unsuru' },
  't': { latinChar: 't', arabicName: 'Tâ', arabicLetter: 'ت', numericValue: 400, element: 'Su', elementTier: 3, notes: 'Teveccüh ve taharet, su unsuru' },
  'u': { latinChar: 'u', arabicName: 'Vâv (U sesi)', arabicLetter: 'و', numericValue: 6, element: 'Hava', elementTier: 1, notes: 'Vav harfi (6), hava unsuru' },
  'ü': { latinChar: 'ü', arabicName: 'Vâv (Ü sesi)', arabicLetter: 'و', numericValue: 6, element: 'Hava', elementTier: 1, notes: 'Vav harfi (6), hava unsuru' },
  'v': { latinChar: 'v', arabicName: 'Vâv', arabicLetter: 'و', numericValue: 6, element: 'Hava', elementTier: 1, notes: 'Vav harfi (6), hava unsuru' },
  'y': { latinChar: 'y', arabicName: 'Yâ', arabicLetter: 'ي', numericValue: 10, element: 'Ateş', elementTier: 2, notes: 'Yâ harfi (10), ateş unsuru' },
  'z': { latinChar: 'z', arabicName: 'Zâ', arabicLetter: 'ز', numericValue: 7, element: 'Su', elementTier: 1, notes: 'Zinet ve zeka, su unsuru' }
};

export const ESMA_MIZAN_AXES = [
  { threshold: 100, title: 'El-Hadi (Doğru Yola Kılavuzluk Eden Işık Ekseni)', description: 'İçsel kılavuzluk, sezgisel berraklık ve hakikat arayışı.' },
  { threshold: 250, title: 'El-Alim (İlmin & Bilgeliğin Saklı Kütüphanesi)', description: 'Derin idrak, zihinsel kavrayış ve analitik bilgelik.' },
  { threshold: 450, title: 'El-Basir & Es-Semi (Hakikati Gören ve Duyan Göz)', description: 'Görünmeyeni sezen basiret ve evrensel yankıyı duyan kulak.' },
  { threshold: 700, title: 'El-Kaviyy & El-Metin (Sarsılmaz Metanet ve Kudret)', description: 'Karakter dayanıklılığı, sarsılmaz irade ve koruyucu güç.' },
  { threshold: 1000, title: 'El-Vedud & En-Nur (Kozmik Sevgi ve Aydınlatıcı Nur)', description: 'Kalp cömertliği, şefkatli kapsayıcılık ve ışıyan neşe.' },
  { threshold: Infinity, title: 'El-Kuddus & Es-Selam (Saf Arınma ve Ebedi Barış Ekseni)', description: 'Kutsal dinginlik, çatışmasız arınma ve evrensel selamet.' }
];
