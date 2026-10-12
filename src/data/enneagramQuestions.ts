/**
 * Comprehensive Enneagram Question Bank
 * 27 deeply calibrated behavioral, stress, relational, and motivational questions
 * across Types 1 to 9.
 */

export interface EnneagramQuestionDef {
  id: number;
  typeTarget: number; // 1 to 9
  dimension: 'Temel Motivasyon' | 'Stres & Savunma' | 'Gölge & İlişki Dinamiği';
  text: string;
  contextHint: string;
}

export const ENNEAGRAM_QUESTIONS: EnneagramQuestionDef[] = [
  // Type 1: Reformer / Kusursuzluk Arayıcısı
  {
    id: 1,
    typeTarget: 1,
    dimension: 'Temel Motivasyon',
    text: 'Etrafımdaki eksiklikleri ve yanlışları anında fark eder, bunları düzeltmeden ve doğru standarda ulaştırmadan içsel rahatlık bulamam.',
    contextHint: 'Etik dürüstlük, mükemmeliyetçilik ve içsel prensipler'
  },
  {
    id: 2,
    typeTarget: 1,
    dimension: 'Stres & Savunma',
    text: 'Yoğun baskı ve kaos altındayken, içimdeki eleştirel ses şiddetlenir ve öfkemi açıkça patlatmak yerine bastırıp gergin bir kırgınlığa veya katı kontrole dönüştürürüm.',
    contextHint: 'Öfke bastırma ve katı içsel yargıç'
  },
  {
    id: 3,
    typeTarget: 1,
    dimension: 'Gölge & İlişki Dinamiği',
    text: 'İlişkilerimde karşımdakinin potansiyelini gördüğüm için onu sürekli geliştirmeye çalışırım; bu bazen fazlaca didaktik veya yargılayıcı algılanabilir.',
    contextHint: 'Düzeltme arzusu ve yüksek standartlar'
  },

  // Type 2: Helper / Fedakar Destekçi
  {
    id: 4,
    typeTarget: 2,
    dimension: 'Temel Motivasyon',
    text: 'Başkalarının ifade etmediği duygusal ve fiziksel ihtiyaçlarını sezgisel olarak hemen hisseder ve istenmeden yardım etme dürtüsü duyarım.',
    contextHint: 'Bağ kurma, sevilme arzusu ve empatik bakım'
  },
  {
    id: 5,
    typeTarget: 2,
    dimension: 'Stres & Savunma',
    text: 'Tükenmiş hissettiğimde kendi ihtiyaçlarımı söylemek yerine alınganlaşır veya "Ben herkes için her şeyi yaparken kimse beni düşünmüyor" duygusuna kapılırım.',
    contextHint: 'Görünmez fedakarlık ve kırgın sitem'
  },
  {
    id: 6,
    typeTarget: 2,
    dimension: 'Gölge & İlişki Dinamiği',
    text: 'Vazgeçilmez olma arzusuyla, bazen insanların sınırlarını aşarak onların hayatlarını onlar adına çözmeye çalışırken bulurum kendimi.',
    contextHint: 'Aşırı dahil olma ve bağımlılık riski'
  },

  // Type 3: Achiever / Başarı Odaklı Stratejist
  {
    id: 7,
    typeTarget: 3,
    dimension: 'Temel Motivasyon',
    text: 'Hedeflerime ulaşmak, somut sonuçlar üretmek ve yaptığım işte yetkinliğimin takdir görmesi benim temel yaşam yakıtımdır.',
    contextHint: 'Verimlilik, prestij ve görünür başarı'
  },
  {
    id: 8,
    typeTarget: 3,
    dimension: 'Stres & Savunma',
    text: 'Başarısızlık ihtimali belirdiğinde duygularımı tamamen dondurup bir iş makinesi gibi sadece taktiksel sonuca odaklanırım; tükenene kadar hızlanırım.',
    contextHint: 'Duygusal inkar ve aşırı işkoliklik'
  },
  {
    id: 9,
    typeTarget: 3,
    dimension: 'Gölge & İlişki Dinamiği',
    text: 'Farklı ortamlarda en çok kabul gören ve hayranlık uyandıran "başarılı persona"ya kolayca bürünebilirim; gerçekte ne hissettiğimi ben bile unutabilirim.',
    contextHint: 'İmaj uyumu ve içsel özün ötelenmesi'
  },

  // Type 4: Individualist / Özgün Bireyci & Trajik Romantik
  {
    id: 10,
    typeTarget: 4,
    dimension: 'Temel Motivasyon',
    text: 'Sıradan, yüzeysel veya kopyalanmış olan her şeyden uzaklaşır; hayatın trajik, derin ve melankolik güzelliğinde benzersiz özgünlüğümü ararım.',
    contextHint: 'Otantiklik, estetik derinlik ve anlam arayışı'
  },
  {
    id: 11,
    typeTarget: 4,
    dimension: 'Stres & Savunma',
    text: 'Anlaşılmadığımı hissettiğimde kendimi bir duygu kuyusuna çeker, dış dünyayı küçümseyerek içsel acımı ve eksiklik hissimi dramatize ederim.',
    contextHint: 'İçsel inziva ve melankoliye tutunma'
  },
  {
    id: 12,
    typeTarget: 4,
    dimension: 'Gölge & İlişki Dinamiği',
    text: 'Uzakta veya ulaşılamaz olanı tutkuyla özlerken, çok yakın ve elde edilmiş olan ilişkilerde bir kusur bulup mesafe koyma eğilimim vardır.',
    contextHint: 'İtme-çekme döngüsü ve daimi hasret'
  },

  // Type 5: Investigator / Gözlemci & Bilgi Kaşifi
  {
    id: 13,
    typeTarget: 5,
    dimension: 'Temel Motivasyon',
    text: 'Dünyayı güvenli kılmanın yolu onu derinlemesine anlamaktır; enerjimi ve zihinsel alanımı korumak için bağımsız ve yetkin kalmaya özen gösteririm.',
    contextHint: 'Zihinsel uzmanlık, analitik mesafe ve mahremiyet'
  },
  {
    id: 14,
    typeTarget: 5,
    dimension: 'Stres & Savunma',
    text: 'İnsanların duygusal beklentileri veya aşırı talepleri üzerime geldiğinde adeta kepenkleri indirir, sessizce fiziksel veya zihinsel kuleme çekilirim.',
    contextHint: 'Enerji tasarrufu ve duygusal izolasyon'
  },
  {
    id: 15,
    typeTarget: 5,
    dimension: 'Gölge & İlişki Dinamiği',
    text: 'Hayatı doğrudan yaşamak yerine onu dışarıdan izleyen bir araştırmacı gibi gözlemlemeyi tercih ederim; hislerimi sonradan yalnızken analiz ederim.',
    contextHint: 'Duyguları sonradan işleme ve katılım çekincesi'
  },

  // Type 6: Loyalist / Sadık Muhafız & Tedbirli Sorgulayıcı
  {
    id: 16,
    typeTarget: 6,
    dimension: 'Temel Motivasyon',
    text: 'Olası riskleri, tehlikeleri ve ters gidebilecek senaryoları önceden öngörmek; güvendiğim bir çevre ve sağlam ittifaklar inşa etmek benim için hayatidir.',
    contextHint: 'Sadakat, tedbir, sorgulama ve güvenlik'
  },
  {
    id: 17,
    typeTarget: 6,
    dimension: 'Stres & Savunma',
    text: 'Geleceğe dair belirsizlik arttığında zihnim ardı arkası kesilmeyen "Ya şöyle olursa?" felaket senaryoları üretir ve kuşkuculuğum tırmanır.',
    contextHint: 'Zihinsel şüphecilik ve kronik alarm hali'
  },
  {
    id: 18,
    typeTarget: 6,
    dimension: 'Gölge & İlişki Dinamiği',
    text: 'Otoriteyle ilişkim çelişkilidir: hem sığınılacak adil bir dayanak arar hem de manipüle edilme korkusuyla sorgulayan bir muhalefet sergilerim.',
    contextHint: 'Güven testi ve çifte tepki'
  },

  // Type 7: Enthusiast / Maceracı Vizyoner & İyimser Kaşif
  {
    id: 19,
    typeTarget: 7,
    dimension: 'Temel Motivasyon',
    text: 'Hayatın sunduğu tüm heyecan verici olasılıkları, yeni fikirleri ve deneyimleri keşfetmek ister; kısıtlanmaktan ve can sıkıntısından kaçınırım.',
    contextHint: 'Çok yönlülük, coşku ve sınırsız ufuklar'
  },
  {
    id: 20,
    typeTarget: 7,
    dimension: 'Stres & Savunma',
    text: 'Ağır bir acı, yas veya keder belirdiğinde onunla yüzleşmek yerine dikkatimi hemen yeni bir projeye, seyahate veya eğlenceli plana kaydırırım.',
    contextHint: 'Acıdan kaçış ve dikkat dağıtma'
  },
  {
    id: 21,
    typeTarget: 7,
    dimension: 'Gölge & İlişki Dinamiği',
    text: 'Bir konuya veya ilişkiye derinlemesine ve kalıcı olarak bağlanmak bazen bana seçeneklerimin kapanacağı bir kafes gibi hissettirebilir.',
    contextHint: 'Taahhüt zorluğu ve doyumsuz merak'
  },

  // Type 8: Challenger / Güçlü Meydan Okuyucu & Koruyucu Lider
  {
    id: 22,
    typeTarget: 8,
    dimension: 'Temel Motivasyon',
    text: 'Kendi kaderimin efendisi olmak, zayıflığıma izin vermemek ve haksızlığa uğrayan sevdiklerimi göğsümü siper ederek korumak benim doğamdır.',
    contextHint: 'Güç, adalet, cesaret ve doğrudan yüzleşme'
  },
  {
    id: 23,
    typeTarget: 8,
    dimension: 'Stres & Savunma',
    text: 'Biri bana boyun eğdirmeye veya beni kontrol etmeye kalkıştığında tereddüt etmeden çatışmaya girer, sesimi ve varlığımı tüm ağırlığımla ortaya koyarım.',
    contextHint: 'Kontrolü ele alma ve sert misilleme'
  },
  {
    id: 24,
    typeTarget: 8,
    dimension: 'Gölge & İlişki Dinamiği',
    text: 'İçimdeki kırılgan ve şefkatli çocuğu kimseye göstermek istemem; zayıf görünme korkusuyla bazen etrafımdakileri farkında olmadan sindirebilirim.',
    contextHint: 'Zırh kuşanma ve kırılganlığı gizleme'
  },

  // Type 9: Peacemaker / Barışçıl Dengeleyici & Kapsayıcı Ruh
  {
    id: 25,
    typeTarget: 9,
    dimension: 'Temel Motivasyon',
    text: 'İç huzurumu, dinginliğimi ve çevremdeki ahengi korumak için çatışmalardan kaçınır; herkesin bakış açısını kolaylıkla anlayıp kabullenirim.',
    contextHint: 'Huzur, uzlaşma, bütünlük ve dingin akış'
  },
  {
    id: 26,
    typeTarget: 9,
    dimension: 'Stres & Savunma',
    text: 'Gerilim yükseldiğinde fikrimi veya itirazımı dile getirmek yerine pasif dirence geçer, konuyu erteler ve uyum gösteriyormuş gibi yapıp içime kapanırım.',
    contextHint: 'Görünmez inatçılık ve uyuşma'
  },
  {
    id: 27,
    typeTarget: 9,
    dimension: 'Gölge & İlişki Dinamiği',
    text: 'Kendi isteklerimi, tutkularımı ve öfkemi öyle bir unutabilirim ki başkalarının hayat akışının içinde kendi varlığımı tamamen eritebilirim.',
    contextHint: 'Kendini unutma ve atalet'
  }
];
