/**
 * Comprehensive Master Symbol Catalog
 * Across all mandatory categories: Geometri, Bitkiler, Hayvanlar, Mitoloji, Kutsal,
 * Kozmik, Elementler, Astral, Alchemy, Rünik, Doğa, Deniz, Koruma, vb.
 */

import { SymbolItem } from '../types';

export const MASTER_SYMBOLS: SymbolItem[] = [
  // --- GEOMETRİ & SACRED GEOMETRY ---
  {
    id: 'sym_cember',
    name: 'Daire / Kutsal Çember',
    category: 'GEOMETRİ',
    originOrCulture: 'Evrensel',
    symbolicMeaning: 'Birlik, sonsuzluk, döngüsel zaman, bütünlük ve kutsal koruma alanı.',
    keywords: ['sonsuzluk', 'birlik', 'döngü', 'koruma', 'merkez'],
    element: 'Eter',
    compatibleStyles: ['Geometric', 'Sacred Geometry', 'Minimalist', 'Fine Line', 'Ornamental'],
    isActive: true
  },
  {
    id: 'sym_ucgen',
    name: 'Eşkenar Üçgen',
    category: 'GEOMETRİ',
    originOrCulture: 'Pitagorik / Ezoterik',
    symbolicMeaning: 'Beden-zihin-ruh üçlemesi, yukarı bakarsa ateş ve yükseliş, aşağı bakarsa su ve zarafet.',
    keywords: ['üçleme', 'ateş', 'yükseliş', 'denge', 'odak'],
    element: 'Ateş',
    compatibleStyles: ['Geometric', 'Minimal Geometric', 'Fine Line', 'Blackwork'],
    isActive: true
  },
  {
    id: 'sym_vesica_piscis',
    name: 'Vesica Piscis',
    category: 'GEOMETRİ',
    originOrCulture: 'Kutsal Geometri / Antik Mısır',
    symbolicMeaning: 'İki dünyanın kesişimi, yaratılışın rahmi, ikilikten birliğe geçiş kapısı.',
    keywords: ['yaratılış', 'ikilik', 'portal', 'geometri', 'ışık'],
    element: 'Su',
    compatibleStyles: ['Sacred Geometry', 'Fine Line', 'Single Needle', 'Ornamental'],
    isActive: true
  },
  {
    id: 'sym_yasam_cicegi',
    name: 'Yaşam Çiçeği (Flower of Life)',
    category: 'GEOMETRİ',
    originOrCulture: 'Kadim Mısır / Abydos',
    symbolicMeaning: 'Evrenin tüm yaratılış kodlarını ve atomik matrisini barındıran temel kutsal geometri.',
    keywords: ['yaratılış', 'evrensel matris', 'sacred geometry', 'uyum', 'kutsal oran'],
    element: 'Eter',
    compatibleStyles: ['Sacred Geometry', 'Mandala', 'Dotwork', 'Geometric', 'Pointillism'],
    isActive: true
  },
  {
    id: 'sym_metatron_kupu',
    name: 'Metatron Küpü',
    category: 'GEOMETRİ',
    originOrCulture: 'Kabalistik / Ezoterik',
    symbolicMeaning: 'Evrendeki 5 Platonik cismi içeren, negatif enerjileri dağıtan yüksek koruma kalkanı.',
    keywords: ['koruma', 'platonik cisimler', 'yüksek bilinç', 'mimari'],
    element: 'Ateş',
    compatibleStyles: ['Sacred Geometry', 'Geometric', 'Linework', 'Blackwork'],
    isActive: true
  },
  {
    id: 'sym_merkaba',
    name: 'Merkaba (Işık Bedeni)',
    category: 'GEOMETRİ',
    originOrCulture: 'Antik Mısır / İbrani',
    symbolicMeaning: 'Zıt yönlü iç içe dönen iki tetrahedron; ruhsal boyutlararası seyahat ve denge aracı.',
    keywords: ['ışık', 'yükseliş', 'tetrahedron', 'boyut kapısı'],
    element: 'Hava',
    compatibleStyles: ['Sacred Geometry', 'Geometric', 'Fine Line', 'Dotwork'],
    isActive: true
  },
  {
    id: 'sym_torus',
    name: 'Torus Enerji Alanı',
    category: 'GEOMETRİ',
    originOrCulture: 'Kozmoloji / Fraktal Fizik',
    symbolicMeaning: 'Kendi içine dönen ve kendini yenileyen evrensel kalp ve enerji dinamiği.',
    keywords: ['enerji', 'öz yenilenme', 'akış', 'manyetizma'],
    element: 'Eter',
    compatibleStyles: ['Sacred Geometry', 'Abstract Geometric', 'Fine Line', 'Dotwork'],
    isActive: true
  },
  {
    id: 'sym_spiral_altin_oran',
    name: 'Fibonacci Altın Sarmalı',
    category: 'GEOMETRİ',
    originOrCulture: 'Doğa / Matematik',
    symbolicMeaning: 'Doğadaki organik büyümenin, galaksilerin ve deniz kabuklarının kutsal altın oranı.',
    keywords: ['büyüme', 'altın oran', 'doğal nizam', 'evrim'],
    element: 'Toprak',
    compatibleStyles: ['Fine Line', 'Geometric', 'Single Needle', 'Minimalist'],
    isActive: true
  },
  {
    id: 'sym_labirent',
    name: 'Klasik Labirent (Girit Labirenti)',
    category: 'GEOMETRİ',
    originOrCulture: 'Minos / Girit',
    symbolicMeaning: 'Kaybolmak için değil, merkeze ulaşıp kendi özüyle yüzleşmek için yapılan içsel hac yolculuğu.',
    keywords: ['içsel yolculuk', 'uyanış', 'merkez', 'hakikat'],
    element: 'Toprak',
    compatibleStyles: ['Linework', 'Dotwork', 'Etching', 'Geometric'],
    isActive: true
  },
  {
    id: 'sym_sri_yantra',
    name: 'Sri Yantra',
    category: 'GEOMETRİ',
    originOrCulture: 'Vedik / Hint',
    symbolicMeaning: '9 kesişen üçgen ile ilahi dişil ve eril enerjinin kozmik birliği ve bolluk frekansı.',
    keywords: ['bolluk', 'yantra', 'eril dişil', 'kutsal birlik'],
    element: 'Eter',
    compatibleStyles: ['Sacred Geometry', 'Mandala', 'Dotwork', 'Fine Line'],
    isActive: true
  },
  {
    id: 'sym_sonsuzluk_lemniskat',
    name: 'Lemniskat (Sonsuzluk Döngüsü)',
    category: 'GEOMETRİ',
    originOrCulture: 'Matematik & Simya',
    symbolicMeaning: 'Sonsuz enerji akışı, alma-verme dengesi, zamansızlık ve ruhun ölümsüzlüğü.',
    keywords: ['sonsuzluk', 'denge', 'döngü', 'zamansızlık'],
    element: 'Hava',
    compatibleStyles: ['Minimalist', 'Fine Line', 'Lettering', 'Single Needle'],
    isActive: true
  },

  // --- BİTKİLER (BOTANICAL) ---
  {
    id: 'sym_lotus',
    name: 'Kutsal Nilüfer / Lotus',
    category: 'BİTKİLER',
    originOrCulture: 'Doğu Mistisizmi / Mısır / Budizm',
    symbolicMeaning: 'Bulanık çamurdan doğup lekesizce açan saf ruhsal uyanış, aydınlanma ve yeniden doğum.',
    keywords: ['arınma', 'aydınlanma', 'safiyet', 'uyanış', 'çamurdan ışığa'],
    element: 'Su',
    compatibleStyles: ['Fine Line Botanical', 'Japanese / Irezumi', 'Dotwork', 'Mandala', 'Single Needle'],
    isActive: true
  },
  {
    id: 'sym_ginkgo',
    name: 'Ginkgo Biloba Yaprağı',
    category: 'BİTKİLER',
    originOrCulture: 'Uzak Doğu',
    symbolicMeaning: 'Milyonlarca yıldır ayakta kalan yaşam direnci, dayanıklılık, umut ve ikili zıtlıkların uyumu.',
    keywords: ['dayanıklılık', 'uzun ömür', 'zarafet', 'hafıza', 'umut'],
    element: 'Toprak',
    compatibleStyles: ['Fine Line Botanical', 'Single Needle', 'Minimalist', 'Watercolor'],
    isActive: true
  },
  {
    id: 'sym_zeytin_dali',
    name: 'Zeytin Dalı & Yaprakları',
    category: 'BİTKİLER',
    originOrCulture: 'Akdeniz / Antik Yunan',
    symbolicMeaning: 'Ebedi barış, bereket, kutsal antlaşma, bilgelik ve fırtına sonrası dinginlik.',
    keywords: ['barış', 'bereket', 'bilgelik', 'akdeniz', 'şifa'],
    element: 'Toprak',
    compatibleStyles: ['Fine Line Botanical', 'Single Needle', 'Etching', 'Black & Grey'],
    isActive: true
  },
  {
    id: 'sym_lavanta',
    name: 'Lavanta Çiçeği',
    category: 'BİTKİLER',
    originOrCulture: 'Akdeniz',
    symbolicMeaning: 'Ruhsal sükunet, saflık, dingin zihin, huzur ve zarif adanmışlık.',
    keywords: ['huzur', 'dinginlik', 'arındırma', 'şifa', 'zarafet'],
    element: 'Hava',
    compatibleStyles: ['Fine Line Botanical', 'Single Needle', 'Watercolor'],
    isActive: true
  },
  {
    id: 'sym_gul',
    name: 'Mistik Gül (Rose)',
    category: 'BİTKİLER',
    originOrCulture: 'Evrensel & Tasavvuf',
    symbolicMeaning: 'Dikenleriyle sınırını koruyan saf ilahi sevgi, sırların saklandığı gonca ve kalbin açılışı.',
    keywords: ['aşk', 'tutku', 'sır', 'koruma', 'güzellik'],
    element: 'Ateş',
    compatibleStyles: ['Traditional / American Traditional', 'Neo Traditional', 'Black & Grey', 'Fine Line Botanical'],
    isActive: true
  },
  {
    id: 'sym_defne_taci',
    name: 'Defne Yaprakları & Tacı',
    category: 'BİTKİLER',
    originOrCulture: 'Antik Yunan / Apollon',
    symbolicMeaning: 'Onurlu zafer, şiirsel ilham, asalet, ölümsüz başarı ve arınma.',
    keywords: ['zafer', 'onur', 'apollon', 'başarı', 'taç'],
    element: 'Ateş',
    compatibleStyles: ['Linework', 'Fine Line Botanical', 'Etching', 'Neo Traditional'],
    isActive: true
  },
  {
    id: 'sym_mese_yaprak_palamut',
    name: 'Kadim Meşe & Palamut',
    category: 'BİTKİLER',
    originOrCulture: 'Kelt / Druid',
    symbolicMeaning: 'Sarsılmaz güç, asırlık kökler, sabırlı büyüme ve ormanın kadim hükümdarı.',
    keywords: ['güç', 'köklenme', 'dayanıklılık', 'kelt', 'kadim'],
    element: 'Toprak',
    compatibleStyles: ['Etching', 'Woodcut / Engraving', 'Fine Line Botanical', 'Traditional'],
    isActive: true
  },
  {
    id: 'sym_has-has',
    name: 'Haşhaş Kapsülü & Çiçeği',
    category: 'BİTKİLER',
    originOrCulture: 'Akdeniz & Mezopotamya',
    symbolicMeaning: 'Rüyalar, derin uyku, anma, ruhun huzurlu geçişi ve gizli vizyonlar.',
    keywords: ['rüya', 'uyku', 'anma', 'gizem', 'derinlik'],
    element: 'Su',
    compatibleStyles: ['Fine Line Botanical', 'Dotwork', 'Black & Grey', 'Illustrative'],
    isActive: true
  },
  {
    id: 'sym_egrelti_otu',
    name: 'Eğrelti Otu (Fern)',
    category: 'BİTKİLER',
    originOrCulture: 'Orman / Maori (Koru)',
    symbolicMeaning: 'Yeni başlangıçlar, açılan sarmal filiz (Koru), gençleşme, gizli büyü ve alçakgönüllülük.',
    keywords: ['yeni başlangıç', 'koru', 'filiz', 'büyüme', 'orman'],
    element: 'Toprak',
    compatibleStyles: ['Fine Line Botanical', 'Tribal / Polynesian', 'Linework', 'Dotwork'],
    isActive: true
  },
  {
    id: 'sym_sarmasik',
    name: 'Sarmaşık (Ivy)',
    category: 'BİTKİLER',
    originOrCulture: 'Kelt / Dionysos',
    symbolicMeaning: 'Kopmayan bağlar, sadakat, engellerin üzerinden aşarak tırmanma azmi ve sonsuz yaşam.',
    keywords: ['sadakat', 'bağ', 'tırmanış', 'azim', 'sarılma'],
    element: 'Toprak',
    compatibleStyles: ['Ornamental', 'Fine Line Botanical', 'Linework'],
    isActive: true
  },
  {
    id: 'sym_servi_agaci',
    name: 'Servi Ağacı (Cypress)',
    category: 'BİTKİLER',
    originOrCulture: 'Akdeniz & Anadolu',
    symbolicMeaning: 'Göğe yükselen dimdik duruş, sabır, yasın asil sessizliği ve ölümsüz ruh.',
    keywords: ['asalet', 'dimdik duruş', 'sabır', 'ebediyet'],
    element: 'Toprak',
    compatibleStyles: ['Etching', 'Linework', 'Fine Line Botanical', 'Blackwork'],
    isActive: true
  },
  {
    id: 'sym_sogut_agaci',
    name: 'Salkım Söğüt (Willow)',
    category: 'BİTKİLER',
    originOrCulture: 'Kelt & Anadolu',
    symbolicMeaning: 'Fırtınada kırılmayan esneklik, duygusal gözyaşlarının bilgeliği, ay döngüleri ve şifa.',
    keywords: ['esneklik', 'şifa', 'su kenarı', 'duygu', 'kırılmazlık'],
    element: 'Su',
    compatibleStyles: ['Fine Line Botanical', 'Illustrative', 'Single Needle'],
    isActive: true
  },

  // --- HAYVANLAR (ANIMALS) ---
  {
    id: 'sym_kurt',
    name: 'Kurt (Bozkurt / Wolf)',
    category: 'HAYVANLAR',
    originOrCulture: 'Türk / Kelt / Şamanik',
    symbolicMeaning: 'Yol gösterici kutsal rehber, sarsılmaz sürü sadakati, vahşi içgüdü ve özgürlük.',
    keywords: ['liderlik', 'sadakat', 'sezgi', 'özgürlük', 'sürü'],
    element: 'Toprak',
    compatibleStyles: ['Geometric', 'Blackwork', 'Fine Line', 'Illustrative', 'Dotwork'],
    isActive: true
  },
  {
    id: 'sym_baykus',
    name: 'Baykuş (Owl)',
    category: 'HAYVANLAR',
    originOrCulture: 'Yunan (Athena) / Kelt',
    symbolicMeaning: 'Karanlıkta gören göz, saklı hakikat, derin ezoterik bilgi ve sessiz gözlemcilik.',
    keywords: ['bilgelik', 'gözlem', 'gece', 'gizli hakikat', 'sezgi'],
    element: 'Hava',
    compatibleStyles: ['Single Needle', 'Dotwork', 'Sacred Geometry', 'Etching', 'Black & Grey'],
    isActive: true
  },
  {
    id: 'sym_kuzgun',
    name: 'Kuzgun & Karga (Raven / Crow)',
    category: 'HAYVANLAR',
    originOrCulture: 'İskandinav (Odin: Huginn & Muninn) / Şamanik',
    symbolicMeaning: 'Hafıza ve düşünce elçisi, simyasal dönüşüm, görünmeyen dünyaların habercisi.',
    keywords: ['simya', 'odin', 'hafıza', 'dönüşüm', 'haberci'],
    element: 'Eter',
    compatibleStyles: ['Blackwork', 'Dark Art', 'Linework', 'Illustrative', 'Engraving'],
    isActive: true
  },
  {
    id: 'sym_kartal',
    name: 'Kartal (Eagle)',
    category: 'HAYVANLAR',
    originOrCulture: 'Selçuklu / Roma / Şamanik',
    symbolicMeaning: 'Güneşin ışığına doğrudan bakan yüksek vizyon, göklerin hakimiyeti, adalet ve kudret.',
    keywords: ['vizyon', 'kudret', 'güneş', 'yükseliş', 'çift başlı'],
    element: 'Ateş',
    compatibleStyles: ['Traditional / American Traditional', 'Neo Traditional', 'Black & Grey', 'Geometric'],
    isActive: true
  },
  {
    id: 'sym_geyik',
    name: 'Asil Geyik (Stag / Deer)',
    category: 'HAYVANLAR',
    originOrCulture: 'Kelt (Cernunnos) / Türk / Şamanik',
    symbolicMeaning: 'Ormanın koruyucu asil ruhu, yenilenen taç boynuzlar, kalbin şefkati ve zarafet.',
    keywords: ['zarafet', 'asalet', 'yenilenme', 'orman', 'şefkat'],
    element: 'Toprak',
    compatibleStyles: ['Fine Line', 'Fine Line Botanical', 'Dotwork', 'Single Needle'],
    isActive: true
  },
  {
    id: 'sym_yilan_ouroboros',
    name: 'Yılan / Ouroboros',
    category: 'HAYVANLAR',
    originOrCulture: 'Kadim Mısır / Yunan / Gnostik',
    symbolicMeaning: 'Kendi kuyruğunu ısıran yılan; ebedi döngü, ölüm ve yeniden doğum, kundalini şifası.',
    keywords: ['döngü', 'sonsuzluk', 'kundalini', 'şifa', 'kabuk değiştirme'],
    element: 'Su',
    compatibleStyles: ['Ornamental', 'Fine Line', 'Linework', 'Dotwork', 'Black & Grey'],
    isActive: true
  },
  {
    id: 'sym_panter',
    name: 'Kara Panter (Black Panther)',
    category: 'HAYVANLAR',
    originOrCulture: 'Orman / Şamanik',
    symbolicMeaning: 'Bilinçaltının cesur fatihi, sessiz adımlar, dişil gizem ve gölge ile korkusuzca yüzleşme.',
    keywords: ['gölge gücü', 'sessizlik', 'cesaret', 'gece', 'gizli güç'],
    element: 'Su',
    compatibleStyles: ['Blackwork', 'Micro Realism', 'Dark Art', 'Whip Shading'],
    isActive: true
  },
  {
    id: 'sym_ayi',
    name: 'Ayı (Bear)',
    category: 'HAYVANLAR',
    originOrCulture: 'Kuzey / Şamanik',
    symbolicMeaning: 'Kış uykusundan uyanan dirayet, köklere dönen şamanik şifa ve sarsılmaz koruma.',
    keywords: ['güç', 'topraklanma', 'şifa', 'koruma', 'içsel mağara'],
    element: 'Toprak',
    compatibleStyles: ['Neo Traditional', 'Traditional / American Traditional', 'Etching', 'Blackwork'],
    isActive: true
  },
  {
    id: 'sym_tilki',
    name: 'Tilki (Fox / Kitsune)',
    category: 'HAYVANLAR',
    originOrCulture: 'Japon / Kelt / Evrensel',
    symbolicMeaning: 'Kıvrak zeka, kamuflaj, görünmeden engelleri aşma yeteneği ve kılavuzluk.',
    keywords: ['kıvrak zeka', 'uyum', 'kamuflaj', 'yol bulucu'],
    element: 'Ateş',
    compatibleStyles: ['Japanese / Irezumi', 'Sketch', 'Fine Line', 'Geometric'],
    isActive: true
  },
  {
    id: 'sym_kelebek',
    name: 'Kelebek (Butterfly / Metamorphosis)',
    category: 'HAYVANLAR',
    originOrCulture: 'Yunan (Psyche) / Evrensel',
    symbolicMeaning: 'Ruhun karanlık kozadan kanatlanarak özgürleşmesi, tam metamorfoz ve saf güzellik.',
    keywords: ['dönüşüm', 'özgürlük', 'ruh', 'metamorfoz', 'hafiflik'],
    element: 'Hava',
    compatibleStyles: ['Micro Realism', 'Fine Line Botanical', 'Single Needle', 'Dotwork'],
    isActive: true
  },
  {
    id: 'sym_manta_vatozu',
    name: 'Manta Vatozu (Manta Ray)',
    category: 'HAYVANLAR',
    originOrCulture: 'Polinezya / Okyanus',
    symbolicMeaning: 'Zahmetsiz süzülme, derin okyanus huzuru, akışa teslimiyet ve zarif seyahat.',
    keywords: ['akış', 'okyanus', 'dinginlik', 'süzülme', 'huzur'],
    element: 'Su',
    compatibleStyles: ['Fine Line', 'Dotwork', 'Minimalist', 'Abstract Geometric'],
    isActive: true
  },
  {
    id: 'sym_balina',
    name: 'Balina (Whale)',
    category: 'HAYVANLAR',
    originOrCulture: 'Kozmik / Okyanus',
    symbolicMeaning: 'Kadim dünya hafızası, kozmik okyanus şarkısı, duygusal derinlik ve koruyucu güç.',
    keywords: ['hafıza', 'derinlik', 'şarkı', 'okyanus', 'kadim ruh'],
    element: 'Su',
    compatibleStyles: ['Single Needle', 'Fine Line', 'Micro Realism', 'Illustrative'],
    isActive: true
  },
  {
    id: 'sym_ari',
    name: 'Bal Arısı (Honeybee)',
    category: 'HAYVANLAR',
    originOrCulture: 'Antik Mısır / Kelt',
    symbolicMeaning: 'Kutsal geometri (altıgen petek), özverili emek, topluluk ahengi ve yaşamın tatlılığı.',
    keywords: ['emek', 'altıgen', 'kutsal geometri', 'bereket', 'topluluk'],
    element: 'Toprak',
    compatibleStyles: ['Fine Line Botanical', 'Dotwork', 'Micro Realism', 'Single Needle'],
    isActive: true
  },
  {
    id: 'sym_anka_kusu',
    name: 'Anka Kuşu / Simurg (Phoenix)',
    category: 'HAYVANLAR',
    originOrCulture: 'İran / Anadolu / Mısır (Bennu)',
    symbolicMeaning: 'Kendi küllerinden doğan ebedi ruh, yenilmez direnç, arınma ateşi ve mutlak uyanış.',
    keywords: ['yeniden doğuş', 'küllerinden doğma', 'ölümsüzlük', 'ateş', 'simurg'],
    element: 'Ateş',
    compatibleStyles: ['Neo Traditional', 'Japanese / Irezumi', 'Black & Grey', 'Illustrative'],
    isActive: true
  },

  // --- MİTOLOJİ & TARİHSEL ---
  {
    id: 'sym_gorgon_medusa',
    name: 'Medusa Başı',
    category: 'MİTOLOJİ',
    originOrCulture: 'Antik Yunan',
    symbolicMeaning: 'Taşa çeviren bakışıyla kötülüğü savuran apotropaik kalkan (Aegis), dişil öfke ve koruma.',
    keywords: ['koruma', 'dişil güç', 'yılanlar', 'apotropaik', 'antik yunan'],
    element: 'Toprak',
    compatibleStyles: ['Black & Grey', 'Neo Traditional', 'Etching', 'Micro Realism'],
    isActive: true
  },
  {
    id: 'sym_horus_gozu',
    name: 'Horus’un Gözü (Wedjat)',
    category: 'MİTOLOJİ',
    originOrCulture: 'Kadim Mısır',
    symbolicMeaning: 'Kusursuz korunma, matematiksel oranlarla şifalanma, her şeyi gören ilahi adalet gözü.',
    keywords: ['mısır', 'koruma', 'şifa', 'horus', 'altın oran'],
    element: 'Ateş',
    compatibleStyles: ['Linework', 'Geometric', 'Single Needle', 'Blackwork'],
    isActive: true
  },
  {
    id: 'sym_ankh',
    name: 'Ankh (Yaşam Anahtarı)',
    category: 'MİTOLOJİ',
    originOrCulture: 'Kadim Mısır',
    symbolicMeaning: 'Fiziksel ve ebedi yaşamın anahtarı, eril ve dişil prensibin kutsal düğümü.',
    keywords: ['yaşam', 'ebediyet', 'mısır', 'anahtar', 'ruh'],
    element: 'Hava',
    compatibleStyles: ['Minimalist', 'Fine Line', 'Geometric', 'Single Needle'],
    isActive: true
  },
  {
    id: 'sym_selcuklu_kartali',
    name: 'Çift Başlı Selçuklu Kartalı',
    category: 'MİTOLOJİ',
    originOrCulture: 'Selçuklu / Anadolu / Avrasya',
    symbolicMeaning: 'Doğu ve batıya, geçmişe ve geleceğe aynı anda hakim olan kozmik egemenlik ve koruma.',
    keywords: ['selçuklu', 'anadolu', 'çift başlı', 'egemenlik', 'koruma'],
    element: 'Ateş',
    compatibleStyles: ['Linework', 'Blackwork', 'Ornamental', 'Etching'],
    isActive: true
  },
  {
    id: 'sym_valknut',
    name: 'Valknut (Odin Düğümü)',
    category: 'MİTOLOJİ',
    originOrCulture: 'İskandinav / Viking',
    symbolicMeaning: 'İç içe geçmiş 3 üçgen; 9 kozmik alemin bağı, kader ağları ve savaşçı onuru.',
    keywords: ['odin', 'iskandinav', 'dokuz alem', 'kader', 'üçgenler'],
    element: 'Ateş',
    compatibleStyles: ['Geometric', 'Blackwork', 'Dotwork', 'Linework'],
    isActive: true
  },
  {
    id: 'sym_triquetra_kelt',
    name: 'Kelt Triquetra Düğümü',
    category: 'MİTOLOJİ',
    originOrCulture: 'Kelt',
    symbolicMeaning: 'Kopmayan üçlü döngü: doğum-yaşam-ölüm, yer-gök-deniz, geçmiş-şimdi-gelecek.',
    keywords: ['kelt', 'düğüm', 'üçlü denge', 'sonsuzluk', 'koruma'],
    element: 'Hava',
    compatibleStyles: ['Ornamental', 'Linework', 'Dotwork', 'Fine Line'],
    isActive: true
  },

  // --- KOZMİK & GÖKYÜZÜ ---
  {
    id: 'sym_ay_fazlari',
    name: 'Ay Fazları (Lunar Cycle)',
    category: 'KOZMİK',
    originOrCulture: 'Evrensel',
    symbolicMeaning: 'Büyüme, dolma, küçülme ve yenilenme; dişil bilgelik, gelgitler ve zamanın ritmi.',
    keywords: ['ay', 'hilal', 'dolunay', 'döngü', 'gelgit', 'gece'],
    element: 'Su',
    compatibleStyles: ['Fine Line', 'Dotwork', 'Single Needle', 'Minimalist'],
    isActive: true
  },
  {
    id: 'sym_gunes_halosu',
    name: 'Kutsal Güneş & Işınlar (Sol Invictus)',
    category: 'KOZMİK',
    originOrCulture: 'Evrensel',
    symbolicMeaning: 'Yenilmeyen ışık, yaşam veren merkez, bilinç açıklığı, cömertlik ve canlılık.',
    keywords: ['güneş', 'ışık', 'canlılık', 'bilinç', 'merkez'],
    element: 'Ateş',
    compatibleStyles: ['Fine Line', 'Sacred Geometry', 'Illustrative', 'Engraving'],
    isActive: true
  },
  {
    id: 'sym_kuzey_yildizi',
    name: 'Kuzey Yıldızı (Polaris / Star of Bethlehem)',
    category: 'KOZMİK',
    originOrCulture: 'Seyr-üsefer / Denizcilik / Ezoterik',
    symbolicMeaning: 'Gökyüzünün sabit ekseni; yönünü asla kaybetmeyen ruhlar için şaşmaz kılavuz feneri.',
    keywords: ['pusula', 'kılavuz', 'kuzey yıldızı', 'istikamet', 'umut'],
    element: 'Hava',
    compatibleStyles: ['Minimalist', 'Fine Line', 'Single Needle', 'Dotwork'],
    isActive: true
  },
  {
    id: 'sym_gunes_tutulmasi',
    name: 'Güneş Tutulması (Solar Eclipse)',
    category: 'KOZMİK',
    originOrCulture: 'Astronomi & Ezoterizm',
    symbolicMeaning: 'Güneş ile Ayın kusursuz hizalanması; ışığın gölgeyle kucaklaşması, portal anı.',
    keywords: ['tutulma', 'hizalanma', 'korona', 'portal', 'ışık gölge'],
    element: 'Eter',
    compatibleStyles: ['Blackwork', 'Fine Line', 'Dotwork', 'Abstract'],
    isActive: true
  },

  // --- SİMYA & ALCHEMY ---
  {
    id: 'sym_dort_element_simya',
    name: 'Dört Klasik Element Glifleri (Ateş, Su, Hava, Toprak)',
    category: 'ALCHEMY',
    originOrCulture: 'Hermetizm / Simya',
    symbolicMeaning: 'Maddenin ve bilincin dört temel hali; üçgen bazlı simyasal denge sembolleri.',
    keywords: ['simya', 'elementler', 'üçgen glifler', 'hermetik', 'denge'],
    element: 'Eter',
    compatibleStyles: ['Minimalist', 'Linework', 'Fine Line', 'Geometric'],
    isActive: true
  },
  {
    id: 'sym_felsefe_tasi',
    name: 'Felsefe Taşı Geometrisi (Squared Circle)',
    category: 'ALCHEMY',
    originOrCulture: 'Batı Simyası',
    symbolicMeaning: 'Daire içinde üçgen, üçgen içinde kare, merkezinde nokta; kurşunu altına çeviren büyük sır.',
    keywords: ['simya', 'felsefe taşı', 'kare dairesi', 'büyük yapıt', 'magnum opus'],
    element: 'Eter',
    compatibleStyles: ['Sacred Geometry', 'Linework', 'Etching', 'Fine Line'],
    isActive: true
  },
  {
    id: 'sym_caduceus_hermes',
    name: 'Caduceus (Hermes Asası)',
    category: 'ALCHEMY',
    originOrCulture: 'Hermetizm / Antik Yunan',
    symbolicMeaning: 'Kanatlı asanın etrafına dolanan iki yılan; zıt güçlerin dengelenmesi ve ruhsal şifa.',
    keywords: ['hermes', 'asa', 'yılanlar', 'şifa', 'kanatlar', 'denge'],
    element: 'Hava',
    compatibleStyles: ['Fine Line', 'Etching', 'Black & Grey', 'Linework'],
    isActive: true
  },

  // --- KORUMA & SINIRLAR ---
  {
    id: 'sym_kalkan_ve_kilic',
    name: 'Muhafız Kalkanı & Adalet Kılıcı',
    category: 'KORUMA',
    originOrCulture: 'Şövalyelik & Kadim Savaşçılar',
    symbolicMeaning: 'Kişisel sınırları onurla koruma, hakikati yanılsamadan kesip ayıran berrak zihin.',
    keywords: ['koruma', 'sınır', 'kılıç', 'adalet', 'kalkan'],
    element: 'Ateş',
    compatibleStyles: ['Neo Traditional', 'Black & Grey', 'Etching', 'Illustrative'],
    isActive: true
  },
  {
    id: 'sym_nazar_goz',
    name: 'Koruyucu Göz / Şamanik Nazar Sembolü',
    category: 'KORUMA',
    originOrCulture: 'Anadolu & Akdeniz',
    symbolicMeaning: 'Kıskanç ve yıkıcı bakışları emip dağıtan, ruhun aurasını koruyan ezoterik kalkankuşu.',
    keywords: ['nazar', 'koruma', 'göz', 'anadolu', 'aura'],
    element: 'Su',
    compatibleStyles: ['Dotwork', 'Fine Line', 'Traditional', 'Ornamental'],
    isActive: true
  },
  {
    id: 'sym_hamsa_fatma_eli',
    name: 'Hamsa (Fatıma Eli / Miriam Eli)',
    category: 'KORUMA',
    originOrCulture: 'Mezopotamya & Orta Doğu',
    symbolicMeaning: 'Kötülüğe karşı açık avuç, beş erdem, bereket, sabır ve ilahi himaye.',
    keywords: ['hamsa', 'koruma', 'avuç', 'bereket', 'sabır'],
    element: 'Toprak',
    compatibleStyles: ['Ornamental', 'Mandala', 'Dotwork', 'Fine Line'],
    isActive: true
  }
];
