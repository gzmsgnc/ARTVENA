/**
 * Comprehensive Totem Animal Profiles & 24 Behavioral Questions
 * Mapped across behavioral, instinctual, and psychological axes.
 */

import { TotemAnimalProfile } from '../types';

export const TOTEM_ANIMALS: Record<string, TotemAnimalProfile> = {
  totem_kurt: {
    id: 'totem_kurt',
    name: 'Kurt',
    latinName: 'Canis lupus',
    category: 'Memeli',
    coreTraits: ['Sürü Sadakati', 'Sezgisel Rehberlik', 'Stratejik Sabır', 'Yaban Özgürlüğü'],
    archetype: 'Yol Gösterici Muhafız & Sezgisel Avcı',
    element: 'Toprak',
    shadowTrait: 'Yalnız kalma paranoyası veya sürü dışına itilme öfkesi',
    spiritualMeaning: 'Kendi içsel pusulana güvenmek, topluluğunu korumak ve vahşi sezgilerini onurlandırmak.',
    abstractDesignEquivalents: {
      geometricForms: ['Keskin açılı dinamik üçgenler', 'Kuzey Yıldızı yön okları', 'Hilal-gece ufuk yayları'],
      lineDynamics: 'Hızlı, keskin, yönlü ve kararlı konturlar',
      negativeSpaceRole: 'Sis ve açık alan hissi veren geniş negatif alanlar',
      compositionFlow: 'Yukarı ve ileri yönelen atılım dinamiği',
      symbolicMotifs: ['Kuzey takımyıldızları', 'Dağ silüetleri', 'Kutsal geometri izleri']
    },
    styleSuitability: ['Geometric', 'Blackwork', 'Fine Line', 'Sketch', 'Dotwork']
  },

  totem_baykus: {
    id: 'totem_baykus',
    name: 'Baykuş',
    latinName: 'Strigiformes',
    category: 'Kuş',
    coreTraits: ['Karanlıkta Görme', 'Sessiz Uçuş', 'Ezoterik Bilgelik', 'Derin İnziva'],
    archetype: 'Görünmeyeni Gören Bilge Kahin',
    element: 'Hava',
    shadowTrait: 'Aşırı mesafeli soğukluk ve dünyadan kopuk gözlemcilik',
    spiritualMeaning: 'İllüzyonların ötesindeki hakikati yakalamak, gölgelerden korkmadan derin bilgeliği uyandırmak.',
    abstractDesignEquivalents: {
      geometricForms: ['Eşmerkezli daireler', 'Hipnotik göz spiralleri', 'Altın spiral kanat kavisleri'],
      lineDynamics: 'Çok ince, kadifemsi, tüy hafifliğinde nokta vuruşları (dotwork/stippling)',
      negativeSpaceRole: 'Gece sessizliğini simgeleyen derin boşluklar',
      compositionFlow: 'Merkezden dışa doğru genişleyen dairesel radyallik',
      symbolicMotifs: ['Ay fazları', 'Ezoterik gözler', 'Kozmik küreler']
    },
    styleSuitability: ['Single Needle', 'Dotwork', 'Sacred Geometry', 'Etching', 'Black & Grey']
  },

  totem_kuzgun: {
    id: 'totem_kuzgun',
    name: 'Kuzgun',
    latinName: 'Corvus corax',
    category: 'Kuş',
    coreTraits: ['Büyü & Simya', 'Boyutlararası Geçiş', 'Zeka', 'Dönüşüm Tetikleyicisi'],
    archetype: 'Simyacı & Gölge Elçisi',
    element: 'Eter',
    shadowTrait: 'Karanlık kehanetlere ve melankolik yıkıma takılı kalma',
    spiritualMeaning: 'Eski kimliğin ölümü ve yenilenmesi; görünmeyen dünyalar arasında haber taşıyıcılık.',
    abstractDesignEquivalents: {
      geometricForms: ['Kristal kırılma prizmaları', 'Kesişen hekzagramlar', 'Fraktal tüy açıları'],
      lineDynamics: 'Yoğun, kontrastlı, keskin ve jilet gibi net hatlar',
      negativeSpaceRole: 'Simyasal boşluk (nigredo ve albedo karşıtlığı)',
      compositionFlow: 'Spiral şeklinde içeri çekilen vorteks akışı',
      symbolicMotifs: ['Simya sembolleri', 'Ouroboros', 'Rünik çizgiler']
    },
    styleSuitability: ['Blackwork', 'Dark Art', 'Linework', 'Engraving', 'Illustrative']
  },

  totem_kartal: {
    id: 'totem_kartal',
    name: 'Kartal',
    latinName: 'Aquila chrysaetos',
    category: 'Kuş',
    coreTraits: ['Yüksek Vizyon', 'Güneşsel Güç', 'Cesaret', 'Tavizsiz Odaklanma'],
    archetype: 'Göklerin Hükümdarı & Işık Savaşçısı',
    element: 'Ateş',
    shadowTrait: 'Tepeden bakma kibri ve yerdeki detayları küçümseme',
    spiritualMeaning: 'Dünyevi kaygıların üzerine yükselip bütünü görmek, doğrudan güneşe bakabilme dirayeti.',
    abstractDesignEquivalents: {
      geometricForms: ['Güneş ışınları radyal hatları', 'Torus geometrisi', 'Genişleyen elipsler'],
      lineDynamics: 'Görkemli, güçlü, aerodinamik süpürme çizgileri',
      negativeSpaceRole: 'Sonsuz gökyüzünü temsil eden ferah tavan alanı',
      compositionFlow: 'Doruğa doğru kanat açan dikey yükseliş',
      symbolicMotifs: ['Güneş diski', 'Işık huzmeleri', 'Zirve hatları']
    },
    styleSuitability: ['Neo Traditional', 'Black & Grey', 'Geometric', 'Illustrative']
  },

  totem_geyik: {
    id: 'totem_geyik',
    name: 'Geyik',
    latinName: 'Cervidae',
    category: 'Memeli',
    coreTraits: ['Zarafet', 'Ormanın Ruhu', 'Kalp Şefkati', 'Boynuz Yenilenmesi'],
    archetype: 'Ormanın Asil Koruyucusu & Şefkat Rehberi',
    element: 'Toprak',
    shadowTrait: 'Aşırı ürkeklik ve tehlike anında donup kalma',
    spiritualMeaning: 'Yumuşak huyluluk ile yüksek asaleti birleştirmek; her yıl yeniden büyüyen taç gibi yenilenmek.',
    abstractDesignEquivalents: {
      geometricForms: ['Dallanan fraktal boynuz ağaçları', 'Vesica Piscis taç yaprakları', 'Altın oran sarmalları'],
      lineDynamics: 'Zarif, kavisli, nefes alan organik hatlar',
      negativeSpaceRole: 'Huzurlu orman boşluğu',
      compositionFlow: 'Aşağıdan yukarıya zarifçe dallanan ağaçsı yükseliş',
      symbolicMotifs: ['Hayat Ağacı', 'Botanik filizler', 'Yaban çiçekleri']
    },
    styleSuitability: ['Fine Line', 'Fine Line Botanical', 'Dotwork', 'Single Needle']
  },

  totem_panter: {
    id: 'totem_panter',
    name: 'Kara Panter',
    latinName: 'Panthera pardus',
    category: 'Memeli',
    coreTraits: ['Bilinçaltı Gücü', 'Sessiz Adımlar', 'Dişil Gizem', 'Korkusuz Yüzleşme'],
    archetype: 'Gecenin Koruyucusu & Gölge Avcısı',
    element: 'Su',
    shadowTrait: 'Yıkıcı hırçınlık ve derin güvensizlikten doğan saldırganlık',
    spiritualMeaning: 'Kendi karanlığından korkmamak, bilinçaltının en derin güçlerini ehlileştirmek.',
    abstractDesignEquivalents: {
      geometricForms: ['Sıvı kıvrımlar', 'Hilal gölgeleri', 'Gece sarmalları'],
      lineDynamics: 'Kaslı, esnek, ipeksi ve gergin yay hatları',
      negativeSpaceRole: 'Yoğun derin siyahlıkların arasından parlayan ten pencereleri',
      compositionFlow: 'Sinsice dolanan "S" kıvrımlı vücut ritmi',
      symbolicMotifs: ['Yeniay', 'Obsidyen kristalleri', 'Siyah orkide']
    },
    styleSuitability: ['Blackwork', 'Micro Realism', 'Dark Art', 'Whip Shading']
  },

  totem_ayi: {
    id: 'totem_ayi',
    name: 'Ayı',
    latinName: 'Ursus arctos',
    category: 'Memeli',
    coreTraits: ['İçsel Güç', 'Kış Uykusu & Arınma', 'Topraklanma', 'Koruyucu Şefkat'],
    archetype: 'Toprağın Sarsılmaz Kayası & Şifacı Şaman',
    element: 'Toprak',
    shadowTrait: 'Atalet, inatçı huysuzluk ve sınır ihlalinde ezici gazap',
    spiritualMeaning: 'Kendi mağarana çekilip güç toplamak, köklerin kadim şifasını dünyaya taşımak.',
    abstractDesignEquivalents: {
      geometricForms: ['Ağır kare ve kübik temeller', 'Yatay stabil hatlar', 'Taş blok ritimleri'],
      lineDynamics: 'Tok, kalın, ağırlıklı ve sarsılmaz vuruşlar',
      negativeSpaceRole: 'Sığınak hissi veren korunaklı boşluklar',
      compositionFlow: 'Aşağıya köklenen sağlam kaide yapısı',
      symbolicMotifs: ['Kaya katmanları', 'Kadim pençe mühürleri', 'Çam kozalakları']
    },
    styleSuitability: ['Traditional', 'Neo Traditional', 'Etching', 'Blackwork']
  },

  totem_yilan: {
    id: 'totem_yilan',
    name: 'Yılan',
    latinName: 'Serpentes',
    category: 'Sürüngen / Amfibi',
    coreTraits: ['Deri Değiştirme', 'Kundalini Enerjisi', 'Ölüm ve Yeniden Doğuş', 'Şifa'],
    archetype: 'Kadim Simyacı & Kundalini Uyanışı',
    element: 'Su',
    shadowTrait: 'Zehirli manipülasyon ve sinsice intikam bekleme',
    spiritualMeaning: 'Eski benliğin kabuğunu bırakmak, yaşam enerjisini omurga boyunca yükseltmek.',
    abstractDesignEquivalents: {
      geometricForms: ['Sinüzoidal dalga boyları', 'Kadüseus çift sarmalı', 'Ouroboros halkası'],
      lineDynamics: 'Sürekli, kesintisiz, akıcı ve birbirine sarılan kıvrımlar',
      negativeSpaceRole: 'Kıvrımların arasından süzülen soluk aralıkları',
      compositionFlow: 'Omurga veya uzuv boyunca sarmal yükseliş',
      symbolicMotifs: ['Ouroboros', 'Asklepios Asası', 'Botanik sarmaşıklar']
    },
    styleSuitability: ['Ornamental', 'Fine Line', 'Linework', 'Dotwork', 'Black & Grey']
  },

  totem_manta_vatozu: {
    id: 'totem_manta_vatozu',
    name: 'Manta Vatozu',
    latinName: 'Mobula birostris',
    category: 'Deniz Canlısı',
    coreTraits: ['Zahmetsiz Süzülme', 'Derin Dinginlik', 'Akışa Teslimiyet', 'Zarif Boyut'],
    archetype: 'Okyanus Derinliğinin Uçan Ruhani Gemisi',
    element: 'Su',
    shadowTrait: 'Akıntıya kapılıp yönünü kaybetme ve çatışmadan aşırı kaçış',
    spiritualMeaning: 'Hayatın akıntılarına karşı kürek çekmek yerine akışla dans etmek, derin huzuru kucaklamak.',
    abstractDesignEquivalents: {
      geometricForms: ['Geniş kanat yayları', 'Okyanus eğrileri', 'Möbius şeridi kavisleri'],
      lineDynamics: 'Geniş, nefes alan, aerodinamik ve yumuşak geçişler',
      negativeSpaceRole: 'Okyanus açıklığı sağlayan ultra geniş negatif alan',
      compositionFlow: 'Yataydan hafif diyagonale açılan süzülme vektörü',
      symbolicMotifs: ['Okyanus dalgaları', 'Deniz köpüğü spiral noktacıkları', 'Girdaplar']
    },
    styleSuitability: ['Fine Line', 'Dotwork', 'Minimalist', 'Abstract Geometric']
  },

  totem_balina: {
    id: 'totem_balina',
    name: 'Balina',
    latinName: 'Cetacea',
    category: 'Deniz Canlısı',
    coreTraits: ['Kadim Dünya Hafızası', 'Kozmik Şarkı', 'Duygusal Derinlik', 'Kapsayıcı Huzur'],
    archetype: 'Evrensel Hafızanın Koruyucusu & Okyanus Şarkıcısı',
    element: 'Su',
    shadowTrait: 'Duygusal okyanusta boğulma ve aşırı keder yükünü sırtlanma',
    spiritualMeaning: 'Ruhun en derin sularına dalıp oradaki paha biçilmez inciyi yüzeye çıkarmak.',
    abstractDesignEquivalents: {
      geometricForms: ['Torus akıntıları', 'Büyük eliptik küreler', 'Ses dalgası frekans hatları'],
      lineDynamics: 'Ağırbaşlı, derin nefesli, melodik kavisler',
      negativeSpaceRole: 'Dip suların derinliğini veren dingin boşluk',
      compositionFlow: 'Derinlikten ışığa doğru yükselen dikey dalga',
      symbolicMotifs: ['Ses dalgaları', 'Takımyıldız okyanusu', 'Deniz kabukları']
    },
    styleSuitability: ['Single Needle', 'Fine Line', 'Micro Realism', 'Illustrative']
  },

  totem_tilki: {
    id: 'totem_tilki',
    name: 'Tilki',
    latinName: 'Vulpes vulpes',
    category: 'Memeli',
    coreTraits: ['Kıvrak Zeka', 'Kamuflaj & Uyum', 'Fark Ettirmeden Geçme', 'Oyunculuk'],
    archetype: 'Kurnaz Yol Bulucu & Görünmez Gezgin',
    element: 'Ateş',
    shadowTrait: 'Aşırı kurnazlık, dürüstlükten kaçma ve güvenilmezlik',
    spiritualMeaning: 'Sert duvarları zekayla aşmak, her duruma hızla adapte olup görünmez kalabilmek.',
    abstractDesignEquivalents: {
      geometricForms: ['Üçgen origami kırılımları', 'Kuyruk alevi spiralleri', 'Dinamik köşegenler'],
      lineDynamics: 'Hafif, çevik, sıçrayan ve oyuncu konturlar',
      negativeSpaceRole: 'Kamuflaj sağlayan parçalı ten pencereleri',
      compositionFlow: 'Kıvrılarak dönen kuyruk hareketi',
      symbolicMotifs: ['Kıvılcımlar', 'Sonbahar yaprakları', 'Hilal']
    },
    styleSuitability: ['Sketch', 'Fine Line', 'Geometric', 'Watercolor']
  },

  totem_kelebek: {
    id: 'totem_kelebek',
    name: 'Kelebek',
    latinName: 'Lepidoptera',
    category: 'Böcek / Eklembacaklı',
    coreTraits: ['Tam Metamorfoz', 'Hafiflik', 'Güzelliğin Uyanışı', 'Kozadan Çıkış'],
    archetype: 'Ruhun Dönüşüm Sanatçısı & Zarafet',
    element: 'Hava',
    shadowTrait: 'Kalıcı olamama, yüzeysel çekicilik ve kırılganlık',
    spiritualMeaning: 'Karanlık kozayı sabırla bekleyip renkli kanatlarla özgürlüğe uçmak.',
    abstractDesignEquivalents: {
      geometricForms: ['Kusursuz bilateral simetri', 'Fraktal kanat hücreleri', 'Merkaba denge üçgenleri'],
      lineDynamics: 'Tül gibi mikro çizgiler, ultra ince iğne işçiliği',
      negativeSpaceRole: 'Kanat desenlerinin arasından parlayan berrak ten',
      compositionFlow: 'Merkezden iki yana açılan simetrik kanat dengesi',
      symbolicMotifs: ['Botanik filizler', 'Yıldız tozu', 'Krizalit']
    },
    styleSuitability: ['Micro Realism', 'Fine Line Botanical', 'Dotwork', 'Single Needle']
  }
};

export interface TotemQuestionOption {
  text: string;
  weights: Record<string, number>; // totem ID -> weight
}

export interface TotemQuestionDef {
  id: number;
  axis: string;
  prompt: string;
  options: TotemQuestionOption[];
}

export const TOTEM_QUESTIONS: TotemQuestionDef[] = [
  {
    id: 1,
    axis: 'Tehdit ve Tehlike Algısı',
    prompt: 'Beklenmedik bir tehdit veya krizle karşılaştığınızda ilk içgüdüsel tepkiniz ne olur?',
    options: [
      { text: 'Durumu uzaktan ve soğukkanlılıkla analiz eder, görünmeden strateji kurarım.', weights: { totem_baykus: 3, totem_kuzgun: 2, totem_tilki: 2 } },
      { text: 'Doğrudan göğüs göğüse karşı durur, alanımı ve sevdiklerimi şiddetle savunurum.', weights: { totem_ayi: 3, totem_kurt: 2, totem_kartal: 2 } },
      { text: 'Kıvrak bir manevrayla hemen pozisyon değiştirir, durumu kendi lehime çevirecek esnekliği ararım.', weights: { totem_tilki: 3, totem_yilan: 2, totem_manta_vatozu: 1 } },
      { text: 'Akışa güvenir, derin bir nefes alıp fırtınanın dinmesini sabırla beklerim.', weights: { totem_balina: 3, totem_manta_vatozu: 3, totem_geyik: 1 } }
    ]
  },
  {
    id: 2,
    axis: 'Sosyal Yaklaşım & Aidiyet',
    prompt: 'Topluluklar ve insan ilişkileri içinde kendinizi en çok hangi rolde doğal hissedersiniz?',
    options: [
      { text: 'Küçük, sadık bir çekirdek çevrenin can yoldaşı ve koruyucu neferi olarak.', weights: { totem_kurt: 3, totem_ayi: 2 } },
      { text: 'Kalabalıkların üzerinde bağımsız uçan, kimseye boyun eğmeyen bir gözlemci olarak.', weights: { totem_kartal: 3, totem_baykus: 2 } },
      { text: 'Her ortama hızla uyum sağlayan ama kimsenin gerçekte tam çözemediği bir gezgin olarak.', weights: { totem_tilki: 3, totem_kuzgun: 2 } },
      { text: 'Huzur ve şefkat yayan, çatışmaları dinginleştiren nazik bir varlık olarak.', weights: { totem_geyik: 3, totem_balina: 2, totem_kelebek: 1 } }
    ]
  },
  {
    id: 3,
    axis: 'Yalnızlık ve İnziva',
    prompt: 'Tek başınıza kaldığınız uzun sessizlik dönemleri size ne hissettirir?',
    options: [
      { text: 'Bilinmeyenin sırlarını çözdüğüm, en verimli ve kutsal çalışma alanımdır.', weights: { totem_baykus: 3, totem_kuzgun: 3 } },
      { text: 'Yaralarımı sardığım, köklerime döndüğüm derin bir kış uykusu ve şifalanmadır.', weights: { totem_ayi: 3, totem_balina: 2 } },
      { text: 'Yeni bir deri değiştirmek, eski benliğimi geride bırakıp yenilenmek için fırsattır.', weights: { totem_yilan: 3, totem_kelebek: 2 } },
      { text: 'Sürümden veya amaçlarımdan uzak kalmak beni bir süre sonra huzursuz edebilir.', weights: { totem_kurt: 3, totem_kartal: 1 } }
    ]
  },
  {
    id: 4,
    axis: 'Hedef ve Vizyon',
    prompt: 'Hayatta büyük bir hedefe odaklandığınızda tarzınız nasıldır?',
    options: [
      { text: 'En yüksek irtifadan tüm manzarayı görür, hedefe kilitlenip tereddütsüz dalarım.', weights: { totem_kartal: 3, totem_kurt: 1 } },
      { text: 'Görünmeden, fısıltı gibi adım atar, doğru an gelene kadar karanlıkta beklerim.', weights: { totem_panter: 3, totem_yilan: 2 } },
      { text: 'Zekamı ve şartları ustalıkla kullanarak kestirme yollar ve akıllıca çözümler üretirim.', weights: { totem_tilki: 3, totem_kuzgun: 2 } },
      { text: 'Doğal büyüme ritmine güvenir, acele etmeden zarafetle olgunlaşmasını sağlarım.', weights: { totem_geyik: 3, totem_kelebek: 2, totem_manta_vatozu: 2 } }
    ]
  },
  {
    id: 5,
    axis: 'Dönüşüm ve Kriz',
    prompt: 'Hayatınızda büyük bir kayıp, yıkım veya ani kırılma olduğunda nasıl yeniden doğarsınız?',
    options: [
      { text: 'Eski hayatımı eski bir deri gibi soyup atar, tamamen yeni bir biçimde ayağa kalkarım.', weights: { totem_yilan: 3, totem_kelebek: 3 } },
      { text: 'Yıkıntılardan simyasal bir anlam çıkarır, karanlığı bilgeliğe dönüştürürüm.', weights: { totem_kuzgun: 3, totem_baykus: 2 } },
      { text: 'Acımı içime gömer, sarsılmaz irademle yeniden inşa etmeye odaklanırım.', weights: { totem_ayi: 3, totem_kartal: 2 } },
      { text: 'Okyanusun derinliklerine iner, zamana ve evrensel hafızaya sığınarak iyileşirim.', weights: { totem_balina: 3, totem_manta_vatozu: 2 } }
    ]
  },
  {
    id: 6,
    axis: 'Öfke ve İntikam',
    prompt: 'Büyük bir haksızlığa uğradığınızda içinizde ilk uyanan güç nedir?',
    options: [
      { text: 'Kör edici bir kükreyiş; adaleti hemen şimdi kendi ellerimle sağlama isteği.', weights: { totem_ayi: 3, totem_kurt: 2 } },
      { text: 'Sessiz, ölümcül bir sabır; intikamın en kusursuz ve soğuk servis edileceği anı beklemek.', weights: { totem_panter: 3, totem_yilan: 3 } },
      { text: 'Haksızlığı yapanı kendi tuzağına düşürecek ince bir zeka oyunu kurmak.', weights: { totem_tilki: 3, totem_kuzgun: 2 } },
      { text: 'Bağları sessizce kesip kendi yüksek frekansıma dönmek, onlarla aynı seviyeye inmemek.', weights: { totem_kartal: 3, totem_geyik: 2 } }
    ]
  },
  {
    id: 7,
    axis: 'Sezgi ve İçsel Pusula',
    prompt: 'Önemli kararlar alırken rasyonel akıl ile sezgileriniz arasında denge nasıldır?',
    options: [
      { text: 'Tenimde hissettiğim, kokusunu aldığım vahşi ve ilkel sezgilerim asla yanıltmaz.', weights: { totem_kurt: 3, totem_panter: 2 } },
      { text: 'Rüyalarım, semboller ve evrenden gelen gizemli işaretler bana kılavuzluk eder.', weights: { totem_kuzgun: 3, totem_baykus: 3 } },
      { text: 'Zihnim rasyonel çalışır ancak en derin kararları kalbimin saf yankısıyla veririm.', weights: { totem_balina: 3, totem_geyik: 2 } },
      { text: 'Ortamdaki görünmez enerjileri ve tehlikeleri anında sezen keskin bir radarım vardır.', weights: { totem_tilki: 2, totem_kartal: 2, totem_yilan: 2 } }
    ]
  },
  {
    id: 8,
    axis: 'Hareket ve Ritim',
    prompt: 'Bedeninizin ve ruhunuzun en sevdiği hareket temposu hangisidir?',
    options: [
      { text: 'Zahmetsizce suyun içinde süzülen, sürtünmesiz ve sonsuz bir dalga akışı.', weights: { totem_manta_vatozu: 3, totem_balina: 2 } },
      { text: 'Yorulmak bilmeyen, saatlerce aynı tempoda koşan dayanıklı bir bozkır ritmi.', weights: { totem_kurt: 3, totem_kartal: 1 } },
      { text: 'Yavaş, temkinli, yere bastığı her santimi sarsan ağırbaşlı bir yürüyüş.', weights: { totem_ayi: 3, totem_geyik: 1 } },
      { text: 'Hafif, rüzgarda dans eden, çiçekten çiçeğe süzülen zarif bir uçuş.', weights: { totem_kelebek: 3, totem_geyik: 2 } }
    ]
  },
  {
    id: 9,
    axis: 'Gölge Davranış',
    prompt: 'Kendinizde en çok yüzleşmekte zorlandığınız gölge yönünüz nedir?',
    options: [
      { text: 'İnsanları aşırı mesafeli veya soğuk bularak kibrime ve yalnızlığıma çekilmek.', weights: { totem_baykus: 3, totem_kartal: 2 } },
      { text: 'Saldırganlaşma ve karşımdakini yok etme dürtümü zapt edememek.', weights: { totem_panter: 3, totem_ayi: 2 } },
      { text: 'Kırılmaktan korktuğum için kimseye gerçek savunmasız yüzümü göstermemek.', weights: { totem_kurt: 2, totem_yilan: 3 } },
      { text: 'Kendi gücümü sahiplenmekten korkup aşırı ürkek veya geri planda kalmak.', weights: { totem_geyik: 3, totem_kelebek: 2 } }
    ]
  },
  {
    id: 10,
    axis: 'Özgürlük ve Sınırlar',
    prompt: 'Sizin için "mutlak özgürlük" ne anlama gelir?',
    options: [
      { text: 'Hiçbir kafese sığmamak; kanatlarımı açtığımda sadece bulutların üstünde olmak.', weights: { totem_kartal: 3, totem_kuzgun: 1 } },
      { text: 'Sınırsız bozkırlarda kendi kuralımı kendim koyarak sürüyle koşabilmek.', weights: { totem_kurt: 3, totem_panter: 2 } },
      { text: 'Okyanusun enginliğinde, derinlik ile yüzey arasında serbestçe dalıp çıkabilmek.', weights: { totem_balina: 3, totem_manta_vatozu: 3 } },
      { text: 'Beni kısıtlayan tüm eski kalıpları yırtıp yepyeni bir formla göğe yükselmek.', weights: { totem_kelebek: 3, totem_yilan: 2 } }
    ]
  },
  {
    id: 11,
    axis: 'Merak ve Keşif',
    prompt: 'Bilinmeyen bir gizem veya yasak bir bölge gördüğünüzde tavrınız nedir?',
    options: [
      { text: 'Tereddüt etmeden içine dalar, parıldayan her sırrı toplar ve incelerim.', weights: { totem_kuzgun: 3, totem_tilki: 2 } },
      { text: 'Görünmeden kenarından dolaşır, tehlike seviyesini tartıp öyle yaklaşırım.', weights: { totem_panter: 2, totem_baykus: 3 } },
      { text: 'Korumacı içgüdümle önce oranın güvenli olup olmadığını test ederim.', weights: { totem_ayi: 2, totem_kurt: 2 } },
      { text: 'Doğal akış beni oraya çağırıyorsa korkusuzca eşlik ederim.', weights: { totem_manta_vatozu: 2, totem_geyik: 2 } }
    ]
  },
  {
    id: 12,
    axis: 'Bağlılık ve Vefa',
    prompt: 'Bir insana veya davaya bağlandığınızda sınırınız neresidir?',
    options: [
      { text: 'Ölüme kadar sadakat; dostum için gözümü kırpmadan canımı ortaya koyarım.', weights: { totem_kurt: 3, totem_ayi: 2 } },
      { text: 'Saygı ve ortak vizyon sürdüğü müddetçe müttefikimdir, ama ruhum daima bağımsızdır.', weights: { totem_kartal: 3, totem_baykus: 2 } },
      { text: 'Derin ve şefkatli bir bağ kurarım ancak ruhum incinirse sessizce uzaklaşırım.', weights: { totem_geyik: 3, totem_balina: 2 } },
      { text: 'Dönüşüm kaçınılmazdır; bağlar da zamanla kabuk değiştirip yeniden tanımlanmalıdır.', weights: { totem_yilan: 3, totem_kelebek: 2 } }
    ]
  },
  {
    id: 13,
    axis: 'İletişim ve Ses',
    prompt: 'Duygularınızı ve düşüncelerinizi dünyaya nasıl aktarırsınız?',
    options: [
      { text: 'Gereksiz sözden kaçınırım; bakışlarım ve sessiz varlığım her şeyi anlatır.', weights: { totem_panter: 3, totem_baykus: 2 } },
      { text: 'Yankılanan güçlü bir sesle; ya gökleri inletirim ya da sürümü toplarım.', weights: { totem_kurt: 2, totem_kartal: 3, totem_ayi: 2 } },
      { text: 'Sözcükleri bir simyacı gibi kullanır, nükteli ve derin hikayeler anlatırım.', weights: { totem_kuzgun: 3, totem_tilki: 2 } },
      { text: 'Gözle görülmeyen kalpten kalbe bir titreşim, sanatsal veya melodik bir ahenkle.', weights: { totem_balina: 3, totem_kelebek: 2 } }
    ]
  },
  {
    id: 14,
    axis: 'Korkuyla Yüzleşme',
    prompt: 'İçinizde derin bir korku hissettiğinizde o korkuyu nasıl karşılarsınız?',
    options: [
      { text: 'Korkunun kaynağını gözlerimi kırpmadan aydınlatır ve anatomisini çözerim.', weights: { totem_baykus: 3, totem_kartal: 2 } },
      { text: 'Korku beni daha da güçlendirir; korktuğum şeyin tam üzerine yürürüm.', weights: { totem_ayi: 3, totem_kurt: 2 } },
      { text: 'Karanlığa sığınır, korkumla yalnız kalıp onu güce dönüştürene kadar demlerim.', weights: { totem_panter: 3, totem_yilan: 2 } },
      { text: 'Korkunun geçici bir gölge olduğunu hatırlar, ruhsal dinginliğime sığınırım.', weights: { totem_manta_vatozu: 3, totem_balina: 2 } }
    ]
  },
  {
    id: 15,
    axis: 'Doğa ve Mekan',
    prompt: 'Ruhunuzun en çok şarj olduğu coğrafya hangisidir?',
    options: [
      { text: 'Sonsuz okyanus derinlikleri, uçsuz bucaksız denizler ve sessiz sular.', weights: { totem_balina: 3, totem_manta_vatozu: 3 } },
      { text: 'Rüzgarlı dağ dorukları, açık gökyüzü ve kanyonlar.', weights: { totem_kartal: 3, totem_kuzgun: 2 } },
      { text: 'Kadim meşe ve çam ormanları, sisli vadiler ve yosunlu patikalar.', weights: { totem_kurt: 3, totem_geyik: 3, totem_ayi: 2 } },
      { text: 'Gece çöken orman kuytuları, ay ışığında parlayan gölgeler.', weights: { totem_panter: 3, totem_baykus: 3, totem_tilki: 2 } }
    ]
  },
  {
    id: 16,
    axis: 'Liderlik Tarzı',
    prompt: 'Bir gruba liderlik etmeniz gerektiğinde üslubunuz ne olur?',
    options: [
      { text: 'Önden gider, yolu açar, en arkada kalanı bile korur ve gözetirim.', weights: { totem_kurt: 3, totem_ayi: 2 } },
      { text: 'Büyük resmi gösterir, yüksek standartlar koyar ve ilham vererek yönetirim.', weights: { totem_kartal: 3, totem_kuzgun: 1 } },
      { text: 'Görünmez bir akıl hocası gibi perde arkasından yönlendiririm.', weights: { totem_baykus: 3, totem_tilki: 3 } },
      { text: 'Baskı yapmadan, herkesin kendi potansiyeline çiçek açmasını desteklerim.', weights: { totem_geyik: 3, totem_kelebek: 2 } }
    ]
  },
  {
    id: 17,
    axis: 'Sabır ve Bekleme',
    prompt: 'Beklemeniz gereken uzun belirsizlik süreçlerine nasıl tahammül edersiniz?',
    options: [
      { text: 'Zaman kavramını unutup suyun altındaki sonsuz dinginliğe gömülürüm.', weights: { totem_balina: 3, totem_manta_vatozu: 3 } },
      { text: 'Kaslarımı gerer, tek bir kusursuz vuruş için nefesimi tutup beklerim.', weights: { totem_panter: 3, totem_yilan: 3 } },
      { text: 'Beklerken etrafı gözlemler, yeni bilgiler toplayarak hazırlık yaparım.', weights: { totem_baykus: 3, totem_kuzgun: 2 } },
      { text: 'Boş durmaktan hoşlanmam; alternatif fırsatlar kollar ve hareket ederim.', weights: { totem_tilki: 3, totem_kartal: 1 } }
    ]
  },
  {
    id: 18,
    axis: 'Güç Gösterisi',
    prompt: 'Gücünüzü başkalarına nasıl hissettirirsiniz?',
    options: [
      { text: 'Sessiz ve ağır bir mevcudiyetle; odaya girdiğimde herkes ağırlığımı hisseder.', weights: { totem_ayi: 3, totem_panter: 2 } },
      { text: 'Zekamın keskinliği ve hızlı manevra yeteneğimle.', weights: { totem_tilki: 3, totem_kuzgun: 2 } },
      { text: 'Yüksek duruşum ve tavizsiz asil bakışımla.', weights: { totem_kartal: 3, totem_geyik: 2 } },
      { text: 'Kırılmaz birlikteliğimiz ve sürüme olan sarsılmaz desteğimle.', weights: { totem_kurt: 3, totem_balina: 1 } }
    ]
  },
  {
    id: 19,
    axis: 'Yaratıcılık ve İlham',
    prompt: 'Yaratıcı fikirler ve sanatsal ilham zihninize nasıl akar?',
    options: [
      { text: 'Karanlık, melankolik ve gizemli derinliklerden parıldayan inciler gibi.', weights: { totem_kuzgun: 3, totem_baykus: 2 } },
      { text: 'Renkli, hafif, kelebek kanadı gibi dokunduğu her şeyi dönüştüren bir sevinçle.', weights: { totem_kelebek: 3, totem_geyik: 2 } },
      { text: 'Şimşek gibi aniden çakan, yüksek voltajlı vizyoner bir kıvılcımla.', weights: { totem_kartal: 3, totem_yilan: 2 } },
      { text: 'Derin okyanus dalgaları gibi kadim ve zamansız bir ezgiyle.', weights: { totem_balina: 3, totem_manta_vatozu: 2 } }
    ]
  },
  {
    id: 20,
    axis: 'Savunmasızlık ve Şefkat',
    prompt: 'Kırılganlığınızı ve derin sevginizi kime açabilirsiniz?',
    options: [
      { text: 'Yalnızca hayatımı emanet edebileceğim, sadakatini kanıtlamış can dostlarıma.', weights: { totem_kurt: 3, totem_ayi: 2 } },
      { text: 'Doğaya, evrene ve beni yargılamayan saf ruhlara.', weights: { totem_geyik: 3, totem_balina: 3 } },
      { text: 'Kimseye tam olarak açmam; kendi kabuğumun altında kendim korurum.', weights: { totem_panter: 3, totem_yilan: 2 } },
      { text: 'Dönüşüme hazır, ruhsal olarak olgunlaşmış derin yol arkadaşlarına.', weights: { totem_kelebek: 2, totem_kuzgun: 2 } }
    ]
  },
  {
    id: 21,
    axis: 'Rekabet ve Meydan Okuma',
    prompt: 'Karşınıza dişli bir rakip çıktığında içinizdeki hangi mekanizma devreye girer?',
    options: [
      { text: 'Gözlerimi doğrudan gözlerine diker, ilk geri adımı onun atmasını beklerim.', weights: { totem_ayi: 3, totem_kartal: 2 } },
      { text: 'Onun zaaflarını inceler, rakibin kendi gücünü ona karşı kullanırım.', weights: { totem_tilki: 3, totem_yilan: 2 } },
      { text: 'Sürümle omuz omuza verir, koordineli bir güçle karşı koyarım.', weights: { totem_kurt: 3 } },
      { text: 'Gereksiz egosal savaşlara girmem; derin sularıma çekilip kendi yoluma bakarım.', weights: { totem_manta_vatozu: 3, totem_balina: 2 } }
    ]
  },
  {
    id: 22,
    axis: 'Uyum ve Esneklik',
    prompt: 'Planlarınız tamamen altüst olduğunda ne kadar hızlı adapte olursunuz?',
    options: [
      { text: 'Rüzgardaki yaprak gibi anında yön değiştirir, yeni duruma hızla gülerim.', weights: { totem_tilki: 3, totem_kelebek: 2 } },
      { text: 'Yıkılan planın altındaki gizli fırsatı görür, simyasal olarak dönüştürürüm.', weights: { totem_kuzgun: 3, totem_yilan: 2 } },
      { text: 'Biraz direnç göstersem de köklerime tutunup sakinleşir, yeni temel kurarım.', weights: { totem_ayi: 2, totem_kurt: 2 } },
      { text: 'Akıntının beni götürdüğü yeni kıyının hikmetine güvenirim.', weights: { totem_manta_vatozu: 3, totem_balina: 2 } }
    ]
  },
  {
    id: 23,
    axis: 'Gece ve Rüya Dünyası',
    prompt: 'Gece vakti ve karanlık sizin için ne ifade eder?',
    options: [
      { text: 'Gerçek gözlerimin açıldığı, gündüzün gürültüsünden kurtulduğum berraklık.', weights: { totem_baykus: 3, totem_panter: 3 } },
      { text: 'Boyutlar arası perdenin inceldiği, ruhsal mesajların aktığı mistik zaman.', weights: { totem_kuzgun: 3, totem_yilan: 2 } },
      { text: 'Derin dinlenme, yenilenme ve huzur dolu güvenli liman.', weights: { totem_ayi: 2, totem_balina: 2, totem_geyik: 2 } },
      { text: 'Yıldızların altında özgürce uluma ve vahşi ruhumu hissetme anı.', weights: { totem_kurt: 3 } }
    ]
  },
  {
    id: 24,
    axis: 'Hayatın Anlamı ve Miras',
    prompt: 'Bu dünyadan ayrılırken geride ne bırakmak istersiniz?',
    options: [
      { text: 'Karanlıkları aydınlatmış kadim bir bilgelik ve hakikat vizyonu.', weights: { totem_baykus: 3, totem_kartal: 2 } },
      { text: 'Korumuş olduğum kutsal bağlar, güçlü bir aile/sürü ve sarsılmaz bir sadakat.', weights: { totem_kurt: 3, totem_ayi: 2 } },
      { text: 'Dönüşümün mucizesini gösteren ilham verici, özgün ve cesur bir iz.', weights: { totem_kelebek: 3, totem_yilan: 2, totem_kuzgun: 2 } },
      { text: 'İnsanların kalbine dokunmuş derin bir şefkat, huzur ve sonsuz bir şarkı.', weights: { totem_balina: 3, totem_geyik: 2, totem_manta_vatozu: 2 } }
    ]
  }
];
