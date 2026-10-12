/**
 * Anatomical Placements Master Data
 * Detailed anatomical guidelines, curvature flow, pain levels, and aging considerations.
 */

import { PlacementDefinition } from '../types';

export const BODY_PLACEMENTS: PlacementDefinition[] = [
  {
    id: 'plc_inner_forearm',
    name: 'İç Önkol (Inner Forearm)',
    bodyRegion: 'Kol / Kolun İç Yüzü',
    flowDirection: 'Dikey',
    painLevel: 2,
    agingConsiderations: 'Güneşe doğrudan maruziyet orta düzeydedir; ince çizgiler ve yazılar çok uzun yıllar netliğini korur.',
    recommendedAspect: 'Dikey uzayan eliptik kompozisyon (en-boy 1:2.5)',
    anatomicalAdvice: 'Bileğin bükülme çizgisi ile dirsek kıvrımı arasında ortalanmalı; bilek döndüğünde tasarımın doğal esnemesi hesaba katılmalıdır.'
  },
  {
    id: 'plc_outer_forearm',
    name: 'Dış Önkol (Outer Forearm)',
    bodyRegion: 'Kol / Dış Yüzey',
    flowDirection: 'Dikey',
    painLevel: 2,
    agingConsiderations: 'Güneşe en çok maruz kalan bölgelerden biridir; yüksek kontrast ve güçlü çizgiler yaşlanmayı engeller.',
    recommendedAspect: 'Dikey uzayan silindirik sarma (en-boy 1:2)',
    anatomicalAdvice: 'Kol kaslarının dış kavisini takip eden dinamik akış.'
  },
  {
    id: 'plc_upper_arm_deltoid',
    name: 'Üst Kol / Pazu & Omuz Başı (Upper Arm / Deltoid)',
    bodyRegion: 'Üst Kol',
    flowDirection: 'Radyal',
    painLevel: 2,
    agingConsiderations: 'Deri kalın ve dayanıklıdır; büyük dövmeler için en az bozulma riski olan bölgedir.',
    recommendedAspect: 'Geniş kalkan veya yarım kol sarması (en-boy 1:1.5)',
    anatomicalAdvice: 'Deltoid kasının kubbesine oturan merkezli kompozisyonlar gücü vurgular.'
  },
  {
    id: 'plc_shoulder_blade',
    name: 'Kürek Kemiği (Scapula / Shoulder)',
    bodyRegion: 'Sırt Üstü',
    flowDirection: 'Organik Kontur',
    painLevel: 3,
    agingConsiderations: 'Güneşten korunması kolaydır; 25+ yıl boyunca ilk günkü detay seviyesini korur.',
    recommendedAspect: 'Üçgen veya radyal formlar (en-boy 1:1 veya 4:3)',
    anatomicalAdvice: 'Kürek kemiğinin hareketine uyum sağlayacak şekilde kemik ucunu saran kompozisyon.'
  },
  {
    id: 'plc_chest_pec',
    name: 'Göğüs / Pektoral Kas (Chest / Pec)',
    bodyRegion: 'Ön Gövde',
    flowDirection: 'Yatay',
    painLevel: 3,
    agingConsiderations: 'Kas yapısına göre yaşla birlikte hafif esneyebilir; simetrik veya kalkan formları çok asil durur.',
    recommendedAspect: 'Geniş yatay veya kanat formu (en-boy 2:1)',
    anatomicalAdvice: 'Göğüs ucundan ve köprücük kemiğinden güvenli mesafe bırakılarak kas kıvrımına oturtulmalıdır.'
  },
  {
    id: 'plc_sternum',
    name: 'Göğüs Ortası / İman Tahtası (Sternum)',
    bodyRegion: 'Merkez Gövde',
    flowDirection: 'Dikey',
    painLevel: 5,
    agingConsiderations: 'Deri ince ve doğrudan kemik üstüdür; yüksek acı eşiği gerektirir ancak nefes kesici bir zarafet sunar.',
    recommendedAspect: 'Dikey uzayan lotus, hançer veya mandala sarması',
    anatomicalAdvice: 'Merkez ekseni tam simetrik tutulmalı; alt uçlar göğüs kafesi çizgilerini hafifçe kucaklamalıdır.'
  },
  {
    id: 'plc_spine',
    name: 'Omurga Hattı (Full Spine Line)',
    bodyRegion: 'Sırt Merkezi',
    flowDirection: 'Dikey',
    painLevel: 4,
    agingConsiderations: 'Omurga boyunca dikey akan tasarımlar bedenin duruşunu dikleştirir ve zamana karşı mükemmel direnir.',
    recommendedAspect: 'Ultra dikey ve ince uzun akış (en-boy 1:5)',
    anatomicalAdvice: 'Her bir omurga boğumunun merkez hattı milimetrik takip edilmeli; nefes alıp verirken eğrilmemelidir.'
  },
  {
    id: 'plc_full_back',
    name: 'Tam Sırt (Full Back Canvas)',
    bodyRegion: 'Sırt',
    flowDirection: 'Organik Kontur',
    painLevel: 3,
    agingConsiderations: 'Bedenin en büyük ve en düz tuvalidir; detayların ömür boyu en berrak kalacağı bölgedir.',
    recommendedAspect: 'Geniş anıtsal kompozisyon (en-boy 3:4)',
    anatomicalAdvice: 'Merkezi ana figür, omuzlara doğru kanatlanan açılımlar ve bele doğru köklenen kaide.'
  },
  {
    id: 'plc_rib_cage',
    name: 'Kaburga / Yan Gövde (Rib Cage / Side)',
    bodyRegion: 'Yan Gövde',
    flowDirection: 'Dikey',
    painLevel: 5,
    agingConsiderations: 'Deri incedir ve nefesle sürekli hareket eder; ustalık gerektirir.',
    recommendedAspect: 'Akışkan kavisli dikey süzülüş (en-boy 1:3)',
    anatomicalAdvice: 'Kaburga kemiklerinin doğal yay kavislerini takip eden bitkisel veya soyut akış.'
  },
  {
    id: 'plc_collarbone',
    name: 'Köprücük Kemiği (Collarbone / Clavicle)',
    bodyRegion: 'Boyun Altı / Omuz Geçişi',
    flowDirection: 'Yatay',
    painLevel: 4,
    agingConsiderations: 'Zarif ince çizgiler ve botanik dallar için kusursuz; kemik üzeri hassasiyet.',
    recommendedAspect: 'Yatay uzanan zarif kavis (en-boy 3:1)',
    anatomicalAdvice: 'Kemiğin kendi kavisli hattını takip ederek omuza doğru tatlı bir yükseliş.'
  },
  {
    id: 'plc_thigh_front',
    name: 'Ön / Yan Uyluk (Thigh)',
    bodyRegion: 'Bacak / Üst Bacak',
    flowDirection: 'Dikey',
    painLevel: 2,
    agingConsiderations: 'Geniş yüzey, düşük acı, minimum güneş tahribatı; büyük detaylı işler için ideal.',
    recommendedAspect: 'Geniş dikey elips (en-boy 1:2)',
    anatomicalAdvice: 'Dört başlı uyluk kasının hacmine göre oturtulmalı; yürürken şekil bozulması yaşanmaz.'
  },
  {
    id: 'plc_calf',
    name: 'Baldır (Calf)',
    bodyRegion: 'Alt Bacak',
    flowDirection: 'Dikey',
    painLevel: 2,
    agingConsiderations: 'Kas kütlesi sayesinde şok emilimi yüksektir; renkler ve siyahlar uzun yıllar canlı kalır.',
    recommendedAspect: 'Dikey kalkan formu (en-boy 1:2)',
    anatomicalAdvice: 'Gastroknemius kasının iki kanadını dengeleyen simetrik veya yarı sarmal yerleşim.'
  },
  {
    id: 'plc_ankle',
    name: 'Ayak Bileği (Ankle)',
    bodyRegion: 'Ayak / Bilek',
    flowDirection: 'Radyal',
    painLevel: 4,
    agingConsiderations: 'Sürtünme (çorap, ayakkabı) olan bölgedir; çizgiler net ve ferah aralıklı olmalıdır.',
    recommendedAspect: 'Halka veya mikro motif (en-boy 1:1)',
    anatomicalAdvice: 'Aşil tendonu ve aşık kemiği konturlarına çarpmadan etrafından sarmalanmalı.'
  },
  {
    id: 'plc_wrist',
    name: 'El Bileği (Inner / Outer Wrist)',
    bodyRegion: 'El / Bilek',
    flowDirection: 'Yatay',
    painLevel: 3,
    agingConsiderations: 'Bükülme çizgilerinden en az 1.5 cm uzakta tutulmalı; aksi halde mürekkep dağılabilir.',
    recommendedAspect: 'Küçük yatay şerit veya zarif mühür (en-boy 1:1)',
    anatomicalAdvice: 'Bilek damarlarının üzerinden geçerken kontrollü derinlik.'
  },
  {
    id: 'plc_neck_back',
    name: 'Ense (Back of Neck / Nape)',
    bodyRegion: 'Boyun / Ense',
    flowDirection: 'Dikey',
    painLevel: 3,
    agingConsiderations: 'Saç hizasının altında saç diplerinden temiz mesafe; omurga başlangıcıyla uyum.',
    recommendedAspect: 'Dikey sarkıt veya küçük koruyucu mandala (en-boy 1:1.5)',
    anatomicalAdvice: 'Baş eğildiğinde ve dik durduğunda kompozisyonun ekseni korunmalıdır.'
  },
  {
    id: 'plc_behind_ear',
    name: 'Kulak Arkası (Behind Ear)',
    bodyRegion: 'Kafa / Kulak Arkası',
    flowDirection: 'Organik Kontur',
    painLevel: 4,
    agingConsiderations: 'Mikro boyutlu işler; zamanla çizgilerin kalınlaşmaması için minimal çizgi sayısı.',
    recommendedAspect: 'Hilal veya mikro botanik filiz (en-boy 1:2 kavisli)',
    anatomicalAdvice: 'Kulak kıkırdağının arka yayını takip eden zarif yarım ay hareketi.'
  },
  {
    id: 'plc_hip_waist',
    name: 'Kalça / Bel Kavisi (Hip & Waist)',
    bodyRegion: 'Gövde / Yan Alt',
    flowDirection: 'Sarmal',
    painLevel: 4,
    agingConsiderations: 'Bedenin en dişil ve estetik kıvrımlarından biri; ten elastikiyeti yüksektir.',
    recommendedAspect: 'Sarmal olarak öne ve aşağı kıvrılan hatlar (en-boy 1:2)',
    anatomicalAdvice: 'Pelvis kemiğinin üzerinden kasığa doğru uzanan akışkan kavisler.'
  }
];
