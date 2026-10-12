/**
 * Comprehensive 7 Chakra Question Bank & Dimension Mapping
 * 
 * METHODOLOGY & SCORING DOCUMENTATION:
 * - 21 calibrated self-assessment questions evenly distributed across the 7 classical chakras (3 per chakra).
 * - Dimensions: 'Temel Kapasite' (Core Capacity), 'İçsel Denge & Akış' (Internal Flow), 'Gölge & Tıkanıklık' (Shadow/Blockage).
 * - Scoring Direction:
 *   - 'positive': Direct contribution. Raw choice (1 to 5) directly maps to chakra vital strength.
 *   - 'reversed': Inverted contribution. High agreement signals energetic stagnation or over-compensation.
 *     Formula: Effective Score = 6 - Selected Option Value (e.g. 5 becomes 1, 1 becomes 5).
 * - Scale: 5-Point Likert Scale (1 = Hiç Katılmıyorum ... 5 = Tamamen Katılıyorum).
 * - Medical Disclaimer: This is an archetypal self-reflection questionnaire for artistic tattoo composition,
 *   NOT a medical or psychiatric diagnostic tool.
 */

import { ChakraQuestionDef } from '../types';

export interface ChakraLikertOption {
  value: number;
  label: string;
  description: string;
}

export const CHAKRA_LIKERT_OPTIONS: ChakraLikertOption[] = [
  { value: 1, label: 'Hiç Katılmıyorum', description: 'Bu durum benim deneyimimi kesinlikle yansıtmıyor.' },
  { value: 2, label: 'Az Katılıyorum', description: 'Nadiren veya zayıf bir şekilde deneyimliyorum.' },
  { value: 3, label: 'Kısmen Katılıyorum / Nötr', description: 'Bazen geçerli, bazen değil; dengeli bir nötr alan.' },
  { value: 4, label: 'Büyük Ölçüde Katılıyorum', description: 'Genellikle güçlü bir şekilde hissettiğim durum.' },
  { value: 5, label: 'Tamamen Katılıyorum', description: 'Beni ve içsel halimi bütünüyle tanımlıyor.' }
];

export const CHAKRA_QUESTIONS: ChakraQuestionDef[] = [
  // 1. Kök Çakra (Muladhara - Seviye 1 - Toprak)
  {
    id: 1,
    chakraLevel: 1,
    chakraId: 'muladhara',
    chakraName: 'Kök Çakra',
    sanskritName: 'Muladhara',
    dimension: 'Temel Kapasite',
    text: 'Hayatın beklenmedik fırtınalarında fiziksel güvenliğimi koruyabileceğime ve zeminde sağlam durabileceğime inanırım.',
    contextHint: 'Fiziki güvenlik, temel yaşamsal istikrar ve topraklanma hissi',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 2,
    chakraLevel: 1,
    chakraId: 'muladhara',
    chakraName: 'Kök Çakra',
    sanskritName: 'Muladhara',
    dimension: 'İçsel Denge & Akış',
    text: 'Bedenimle ve maddi dünyayla sağlıklı, köklenmiş bir bağ kurarım; dünyada bir yuvaya ait olduğumu hissederim.',
    contextHint: 'Bedensel farkındalık, aidiyet ve fiziksel dünyayla uyum',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 3,
    chakraLevel: 1,
    chakraId: 'muladhara',
    chakraName: 'Kök Çakra',
    sanskritName: 'Muladhara',
    dimension: 'Gölge & Tıkanıklık',
    text: 'Gelecek kaygısı ve maddi güvensizlik korkusu nedeniyle kendimi sıklıkla gergin, köksüz ve tetikte hissederim.',
    contextHint: 'Ters puanlanan gölge soru: Yüksek katılım kök enerjisinde tıkanıklık veya zayıflık gösterir',
    scoringDirection: 'reversed',
    weight: 1.0
  },

  // 2. Sakral Çakra (Svadhisthana - Seviye 2 - Su)
  {
    id: 4,
    chakraLevel: 2,
    chakraId: 'svadhisthana',
    chakraName: 'Sakral Çakra',
    sanskritName: 'Svadhisthana',
    dimension: 'Temel Kapasite',
    text: 'Duygularımı bastırmadan doğal bir akışkanlıkla hisseder, yaşamdan keyif alma ve yaratıcı üretkenlik kapasitemi canlı tutarım.',
    contextHint: 'Duygusal akışkanlık, yaratıcı ilham ve yaşam hazzı',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 5,
    chakraLevel: 2,
    chakraId: 'svadhisthana',
    chakraName: 'Sakral Çakra',
    sanskritName: 'Svadhisthana',
    dimension: 'İçsel Denge & Akış',
    text: 'Değişen yaşam koşullarına bir nehir gibi adapte olabilir, ilişkilerimde sağlıklı ve samimi bir yakınlık kurabilirim.',
    contextHint: 'Duygusal esneklik, yakınlık kurabilme ve adaptasyon yeteneği',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 6,
    chakraLevel: 2,
    chakraId: 'svadhisthana',
    chakraName: 'Sakral Çakra',
    sanskritName: 'Svadhisthana',
    dimension: 'Gölge & Tıkanıklık',
    text: 'Duygusal iniş çıkışlarımı yönetmekte zorlanır; ya aşırı tutkusal kilitlenmeler ya da yaratıcılık krizleri ve haz suçluluğu yaşarım.',
    contextHint: 'Ters puanlanan gölge soru: Yüksek katılım duygusal dalgalanma veya yaratıcılık blokajı gösterir',
    scoringDirection: 'reversed',
    weight: 1.0
  },

  // 3. Solar Pleksus (Manipura - Seviye 3 - Ateş)
  {
    id: 7,
    chakraLevel: 3,
    chakraId: 'manipura',
    chakraName: 'Solar Pleksus',
    sanskritName: 'Manipura',
    dimension: 'Temel Kapasite',
    text: 'Kişisel hedeflerime ve hayallerime ulaşmak için gereken içsel iradeye, özsaygıya ve dönüştürücü cesarete sahibim.',
    contextHint: 'Özgüven, kişisel irade ateşi ve kararlılık',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 8,
    chakraLevel: 3,
    chakraId: 'manipura',
    chakraName: 'Solar Pleksus',
    sanskritName: 'Manipura',
    dimension: 'İçsel Denge & Akış',
    text: 'Kendi sınırlarımı başkalarını incitmeden ve kendimi ezdirtmeden net, adil ve sakin bir biçimde koruyabilirim.',
    contextHint: 'Dengeli sınır koyma ve güç dengesi',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 9,
    chakraLevel: 3,
    chakraId: 'manipura',
    chakraName: 'Solar Pleksus',
    sanskritName: 'Manipura',
    dimension: 'Gölge & Tıkanıklık',
    text: 'Eleştiri karşısında aşırı öfkelenir veya yetersizlik hissine kapılır; kontrolü kaybetme korkusuyla ya fazlaca otoriterleşir ya da sinerim.',
    contextHint: 'Ters puanlanan gölge soru: Yüksek katılım irade çatışması veya bastırılmış öfke gösterir',
    scoringDirection: 'reversed',
    weight: 1.0
  },

  // 4. Kalp Çakrası (Anahata - Seviye 4 - Hava)
  {
    id: 10,
    chakraLevel: 4,
    chakraId: 'anahata',
    chakraName: 'Kalp Çakrası',
    sanskritName: 'Anahata',
    dimension: 'Temel Kapasite',
    text: 'Kendime ve çevremdeki canlılara karşı içten gelen koşulsuz şefkat, merhamet ve sevgi besleyebilirim.',
    contextHint: 'Koşulsuz sevgi, empatik kalp ve derin şefkat',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 11,
    chakraLevel: 4,
    chakraId: 'anahata',
    chakraName: 'Kalp Çakrası',
    sanskritName: 'Anahata',
    dimension: 'İçsel Denge & Akış',
    text: 'Geçmiş kırgınlıkları serbest bırakıp affedebilir, ilişkilerimde kalbimi açıklık ve güvenle sunabilirim.',
    contextHint: 'Bağışlama, duygusal açıklık ve kalp dengesi',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 12,
    chakraLevel: 4,
    chakraId: 'anahata',
    chakraName: 'Kalp Çakrası',
    sanskritName: 'Anahata',
    dimension: 'Gölge & Tıkanıklık',
    text: 'İncitilme ve terk edilme korkusuyla kalbimi zırhların ardına kilitler; ya aşırı fedakarlıkla tükenir ya da insanlara mesafe koyarım.',
    contextHint: 'Ters puanlanan gölge soru: Yüksek katılım kalp kilitlenmesi veya sınır yoksunu fedakarlık gösterir',
    scoringDirection: 'reversed',
    weight: 1.0
  },

  // 5. Boğaz Çakrası (Vishuddha - Seviye 5 - Eter)
  {
    id: 13,
    chakraLevel: 5,
    chakraId: 'vishuddha',
    chakraName: 'Boğaz Çakrası',
    sanskritName: 'Vishuddha',
    dimension: 'Temel Kapasite',
    text: 'İçsel hakikatimi, fikirlerimi ve hislerimi çekinmeden, dürüst, net ve otantik bir dille ifade edebilirim.',
    contextHint: 'Otantik ses, hakikati ifade etme ve sanatsal ifade açıklığı',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 14,
    chakraLevel: 5,
    chakraId: 'vishuddha',
    chakraName: 'Boğaz Çakrası',
    sanskritName: 'Vishuddha',
    dimension: 'İçsel Denge & Akış',
    text: 'Başkalarını yargılamadan derin bir dikkatle dinleyebilir, konuşma ile dinleme arasında ahenkli bir denge kurarım.',
    contextHint: 'Aktif dinleme, diyalog dengesi ve yapıcı iletişim',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 15,
    chakraLevel: 5,
    chakraId: 'vishuddha',
    chakraName: 'Boğaz Çakrası',
    sanskritName: 'Vishuddha',
    dimension: 'Gölge & Tıkanıklık',
    text: 'Anlaşılmama veya dışlanma endişesiyle sesimi bastırır, boğazımda bir düğüm hisseder ya da gerginliği çok konuşarak maskelerim.',
    contextHint: 'Ters puanlanan gölge soru: Yüksek katılım ifade tıkanıklığı veya ses bastırma gösterir',
    scoringDirection: 'reversed',
    weight: 1.0
  },

  // 6. Üçüncü Göz Çakrası (Ajna - Seviye 6 - Eter)
  {
    id: 16,
    chakraLevel: 6,
    chakraId: 'ajna',
    chakraName: 'Üçüncü Göz Çakrası',
    sanskritName: 'Ajna',
    dimension: 'Temel Kapasite',
    text: 'Mantıksal aklımın ötesinde çalışan güçlü bir sezgiye, duru bir içgörüye ve içsel pusulama derinlemesine güvenirim.',
    contextHint: 'Yüksek sezgi, içgörü ve üçüncü göz vizyonu',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 17,
    chakraLevel: 6,
    chakraId: 'ajna',
    chakraName: 'Üçüncü Göz Çakrası',
    sanskritName: 'Ajna',
    dimension: 'İçsel Denge & Akış',
    text: 'Olayların ve yaşam deneyimlerinin yüzeysel görünümünün ardındaki sembolik anlamları ve büyük resmi kavrayabilirim.',
    contextHint: 'Büyük resmi görme, arketipal algı ve derin idrak',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 18,
    chakraLevel: 6,
    chakraId: 'ajna',
    chakraName: 'Üçüncü Göz Çakrası',
    sanskritName: 'Ajna',
    dimension: 'Gölge & Tıkanıklık',
    text: 'Zihinsel illüzyonlara, takıntılı vesveselere kapılır ya da sezgilerimden tamamen kopup katı ve kuşkucu bir rasyonalizme sıkışırım.',
    contextHint: 'Ters puanlanan gölge soru: Yüksek katılım zihinsel sis veya sezgisel inkar gösterir',
    scoringDirection: 'reversed',
    weight: 1.0
  },

  // 7. Taç Çakra (Sahasrara - Seviye 7 - Eter)
  {
    id: 19,
    chakraLevel: 7,
    chakraId: 'sahasrara',
    chakraName: 'Taç Çakra',
    sanskritName: 'Sahasrara',
    dimension: 'Temel Kapasite',
    text: 'Evrenle, yaşamın bütünüyle veya aşkın bir kaynakla derin bir ruhsal bağ, dinginlik ve huşu hissederim.',
    contextHint: 'Birlik bilinci, manevi uyanış ve kozmik aidiyet',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 20,
    chakraLevel: 7,
    chakraId: 'sahasrara',
    chakraName: 'Taç Çakra',
    sanskritName: 'Sahasrara',
    dimension: 'İçsel Denge & Akış',
    text: 'Maddi dünyanın geçiciliğini idrak ederken, içsel huzurumu gündelik kaosun gelgitlerinden koruyabilirim.',
    contextHint: 'Ruhsal sükunet, yüksek idrak ve içsel barış',
    scoringDirection: 'positive',
    weight: 1.0
  },
  {
    id: 21,
    chakraLevel: 7,
    chakraId: 'sahasrara',
    chakraName: 'Taç Çakra',
    sanskritName: 'Sahasrara',
    dimension: 'Gölge & Tıkanıklık',
    text: 'Kendimi evrenden yalıtılmış, anlamsız bir varoluşsal boşlukta veya dünyadan kopuk spiritüel bir kibir içinde bulurum.',
    contextHint: 'Ters puanlanan gölge soru: Yüksek katılım varoluşsal yalıtılmışlık veya dünyevi kopukluk gösterir',
    scoringDirection: 'reversed',
    weight: 1.0
  }
];

export const MEDICAL_NON_DIAGNOSTIC_DISCLAIMER =
  'Bu çakra analizi ve öz değerlendirme aracı; tıbbi, psikiyatrik veya klinik bir tanı ve tedavi yöntemi DEĞİLDİR. ' +
  'Sonuçlar yalnızca kadim geleneksel sembolizm, Tantrik yantra arketipleri ve kişiye özel dövme kompozisyonunda ' +
  'sanatsal/geometrik ilham oluşturma amacıyla hazırlanmış sembolik bir öz değerlendirmedir.';
