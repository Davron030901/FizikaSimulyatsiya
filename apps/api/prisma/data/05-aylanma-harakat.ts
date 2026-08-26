import type { SectionSeed } from './types';

const ACCENT = '#06B6D4';

export const aylanmaHarakat: SectionSeed = {
  code: '5',
  slug: 'aylanma-harakat',
  order: 5,
  titleUz: 'Aylanma harakat',
  titleEn: 'Rotational motion',
  description:
    "Markazga intiluvchi kuch, inersiya momenti, aylanma energiya va impuls momenti saqlanishi.",
  icon: 'refresh-cw',
  color: ACCENT,
  topics: [
    {
      code: '5.1',
      slug: 'markazga-intiluvchi-kuch',
      order: 1,
      titleUz: 'Markazga intiluvchi kuch',
      titleEn: 'Centripetal force',
      difficulty: 'ORTA',
      summary: "Aylana bo'ylab harakatni saqlab turuvchi, markazga yo'nalgan kuch.",
      keywords: ['markazga intiluvchi', 'centripetal', 'aylana', 'burilish', 'ip taranglik'],
      theory: `Jism aylana bo'ylab harakatlanishi uchun unga markazga yo'nalgan kuch ta'sir qilishi shart. Bu kuch tezlik modulini o'zgartirmaydi, faqat uning yo'nalishini uzluksiz burib turadi.

Markazga intiluvchi kuch alohida tabiatga ega kuch emas — u har doim mavjud kuchlardan biri yoki ularning natijasi bo'ladi. Ipga bog'langan sharda bu ipning taranglik kuchi, burilishdagi avtomobilda ishqalanish kuchi, sun'iy yo'ldoshda esa tortishish kuchi.

Kuch tezlik kvadratiga proporsional: tezlik ikki barobar ortsa, kerakli kuch to'rt barobar ortadi. Radius kattalashsa esa kuch kamayadi. Aynan shu sabab keskin burilishlarni sekin bosib o'tish kerak.

Kerakli kuch yetishmasa, jism aylana bo'ylab qola olmaydi va urinma bo'ylab uchib chiqadi.

### Hayotiy misol
Muzli yo'lda burilishda ishqalanish yetishmasa avtomobil to'g'riga sirg'alib ketadi — bu markazga intiluvchi kuchning yetishmasligi.`,
      formulas: [
        { latex: 'F_c = \\frac{m v^2}{r}', label: 'Markazga intiluvchi kuch' },
        { latex: 'F_c = m \\omega^2 r', label: 'Burchak tezligi orqali' },
        { latex: 'a_c = \\frac{v^2}{r}', label: 'Markazga intiluvchi tezlanish' },
        { latex: 'v = \\sqrt{\\mu g r}', label: 'Burilishdagi maksimal tezlik' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'F_c = \\frac{m v^2}{r}',
        paramA: { key: 'v', label: 'Tezlik v', unit: 'm/s', min: 1, max: 30, step: 0.5, value: 10 },
        paramB: { key: 'r', label: 'Radius r', unit: 'm', min: 0.5, max: 50, step: 0.5, value: 5 },
      },
    },
    {
      code: '5.2',
      slug: 'markazdan-qochuvchi-kuch',
      order: 2,
      titleUz: 'Markazdan qochuvchi kuch',
      titleEn: 'Centrifugal force',
      difficulty: 'ORTA',
      summary: "Aylanuvchi sanoq sistemasida paydo bo'ladigan soxta (inersiya) kuchi.",
      keywords: ['markazdan qochuvchi', 'centrifugal', 'soxta kuch', 'noinertial sistema'],
      theory: `Markazdan qochuvchi kuch faqat aylanuvchi sanoq sistemasida kuzatiladi va soxta yoki inersiya kuchi deb ataladi. Uni hosil qiluvchi biror jism yo'q, shuning uchun unga aks ta'sir kuchi ham mavjud emas.

Tashqi kuzatuvchi uchun manzara boshqacha: u faqat markazga intiluvchi kuchni ko'radi va yo'lovchining tanasi inersiya tufayli to'g'ri chiziq bo'ylab harakatlanishga urinayotganini tushuntiradi. Ikkala tavsif ham to'g'ri, shunchaki turli sanoq sistemalarida.

Bu kuch kattaligi bo'yicha markazga intiluvchi kuchga teng, lekin markazdan tashqariga yo'nalgan.

Yer aylanishi tufayli yuzaga keladigan Koriolis effekti ham xuddi shunday soxta kuch bo'lib, siklonlarning aylanish yo'nalishini belgilaydi.

### Hayotiy misol
Markazdan qochuvchi kuch tibbiyot laboratoriyalarida qon tarkibini ajratuvchi sentrifugalarda va kir yuvish mashinasining suv siqish rejimida ishlatiladi.`,
      formulas: [
        { latex: 'F_{cf} = m \\omega^2 r', label: 'Markazdan qochuvchi kuch' },
        { latex: 'F_{cf} = \\frac{m v^2}{r}', label: 'Tezlik orqali' },
        { latex: '\\vec{F}_{cf} = -\\vec{F}_c', label: 'Markazga intiluvchi bilan' },
        { latex: 'F_{Cor} = 2 m v \\omega', label: 'Koriolis kuchi' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'F_{cf} = m \\omega^2 r',
        paramA: {
          key: 'omega',
          label: 'Burchak tezligi ω',
          unit: 'rad/s',
          min: 0,
          max: 30,
          step: 0.5,
          value: 8,
        },
        paramB: { key: 'r', label: 'Radius r', unit: 'm', min: 0.05, max: 3, step: 0.05, value: 0.3 },
      },
    },
    {
      code: '5.3',
      slug: 'inersiya-momenti',
      order: 3,
      titleUz: 'Inersiya momenti',
      titleEn: 'Moment of inertia',
      difficulty: 'QIYIN',
      summary: "Aylanma harakatdagi inersiya o'lchovi va massa taqsimotiga bog'liqligi.",
      keywords: ['inersiya momenti', 'moment of inertia', 'massa taqsimoti', 'Shteyner teoremasi'],
      theory: `Inersiya momenti aylanma harakatda massaning o'ynagan rolini bajaradi: u jismning aylanish holatini o'zgartirishga qarshiligini ko'rsatadi. Lekin oddiy massadan farqli o'laroq, u massaning aylanish o'qiga nisbatan qanday taqsimlanganiga ham bog'liq.

Har bir zarrachaning hissasi uning massasi va o'qgacha bo'lgan masofa kvadratining ko'paytmasiga teng. Masofa kvadratga ko'tarilgani uchun o'qdan uzoqdagi massa juda katta ta'sir ko'rsatadi.

Shu sababli bir xil massali disk va halqa turlicha inersiya momentiga ega: halqada butun massa chetda joylashgani uchun uning momenti ikki barobar katta.

Shteyner teoremasi o'q massa markazidan siljiganda inersiya momentini hisoblash imkonini beradi.

### Hayotiy misol
Bir xil massali to'liq va ichi bo'sh silindr qiyalikdan pastga dumalatilsa, to'liq silindr har doim oldinroq yetib keladi.`,
      formulas: [
        { latex: 'I = \\sum m_i r_i^2', label: 'Nuqtaviy massalar uchun' },
        { latex: 'I = \\frac{m R^2}{2}', label: 'Bir jinsli disk' },
        { latex: 'I = m R^2', label: 'Yupqa halqa' },
        { latex: 'I = I_c + m d^2', label: 'Shteyner teoremasi' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'I = \\sum m_i r_i^2',
        paramA: { key: 'm', label: 'Massa m', unit: 'kg', min: 0.5, max: 50, step: 0.5, value: 5 },
        paramB: { key: 'r', label: 'Radius r', unit: 'm', min: 0.1, max: 3, step: 0.05, value: 0.5 },
      },
    },
    {
      code: '5.4',
      slug: 'aylanma-kinetik-energiya',
      order: 4,
      titleUz: 'Aylanma kinetik energiya',
      titleEn: 'Rotational kinetic energy',
      difficulty: 'ORTA',
      summary: "Aylanayotgan jismning energiyasi va dumalash harakatidagi to'liq energiya.",
      keywords: ['aylanma energiya', 'dumalash', 'flywheel', 'rotational energy'],
      theory: `Aylanayotgan jism harakat energiyasiga ega bo'ladi, garchi uning massa markazi joyidan qimirlamasa ham. Bu energiya inersiya momenti va burchak tezligi kvadrati orqali ifodalanadi va to'g'ri chiziqli harakat formulasi bilan to'liq o'xshash tuzilishga ega.

Jism ham siljib, ham aylanayotgan bo'lsa — masalan, dumalayotgan sharda — to'liq kinetik energiya ikki qismdan iborat bo'ladi: massa markazining ilgarilanma harakat energiyasi va massa markazi atrofidagi aylanish energiyasi.

Aynan shu sabab qiyalikdan dumalab tushayotgan jismlar sirg'anib tushayotganlarga qaraganda sekinroq harakatlanadi: potensial energiyaning bir qismi aylanishga sarflanadi.

Inersiya momenti kichik bo'lgan jismlar tezroq dumalaydi.

### Hayotiy misol
Zamonaviy energiya saqlagichlarda katta massali maxovik juda tez aylantiriladi va shu tarzda energiya to'planadi.`,
      formulas: [
        { latex: 'E_k = \\frac{I \\omega^2}{2}', label: 'Aylanma energiya' },
        {
          latex: 'E = \\frac{m v^2}{2} + \\frac{I \\omega^2}{2}',
          label: "To'liq energiya (dumalash)",
        },
        { latex: 'v = \\omega R', label: 'Sirg\u2018anmasdan dumalash sharti' },
        { latex: 'E_k = \\frac{L^2}{2 I}', label: 'Impuls momenti orqali' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'E_k = \\frac{I \\omega^2}{2}',
        paramA: {
          key: 'I',
          label: 'Inersiya momenti I',
          unit: 'kg·m²',
          min: 0.1,
          max: 20,
          step: 0.1,
          value: 2,
        },
        paramB: {
          key: 'omega',
          label: 'Burchak tezligi ω',
          unit: 'rad/s',
          min: 0,
          max: 50,
          step: 0.5,
          value: 10,
        },
      },
    },
    {
      code: '5.5',
      slug: 'impuls-momenti',
      order: 5,
      titleUz: 'Impuls momenti',
      titleEn: 'Angular momentum',
      difficulty: 'QIYIN',
      summary: "Aylanma harakatning impulsi va uning vektor yo'nalishi.",
      keywords: ['impuls momenti', 'angular momentum', "o'ng qo'l qoidasi", 'vektor ko\u2018paytma'],
      theory: `Impuls momenti aylanma harakat uchun impulsning analogi hisoblanadi. Qattiq jism uchun u inersiya momenti va burchak tezligining ko'paytmasiga teng.

Nuqtaviy massa uchun impuls momenti radius-vektor va impulsning vektor ko'paytmasi sifatida aniqlanadi. Bu shuni anglatadiki, to'g'ri chiziq bo'ylab harakatlanayotgan jism ham tanlangan nuqtaga nisbatan nolga teng bo'lmagan impuls momentiga ega bo'lishi mumkin.

Impuls momenti vektor kattalik bo'lib, uning yo'nalishi o'ng qo'l qoidasi bilan aniqlanadi: barmoqlar aylanish yo'nalishi bo'ylab bukilsa, bosh barmoq vektor yo'nalishini ko'rsatadi. Bu vektor aylanish o'qi bo'ylab yotadi.

Tashqi kuch momenti impuls momentini o'zgartiradi — bu Nyutonning ikkinchi qonunining aylanma analogidir.

### Hayotiy misol
Velosipedning aylanayotgan g'ildiraklari impuls momentiga ega va aynan shu narsa velosipedni tik holatda ushlab turishga yordam beradi.`,
      formulas: [
        { latex: '\\vec{L} = I \\vec{\\omega}', label: 'Qattiq jism uchun' },
        { latex: '\\vec{L} = \\vec{r} \\times \\vec{p}', label: 'Nuqtaviy massa uchun' },
        { latex: 'L = m v r \\sin\\theta', label: 'Skalyar ko\u2018rinish' },
        { latex: '\\vec{M} = \\frac{d\\vec{L}}{dt}', label: 'Kuch momenti bilan' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: '\\vec{L} = I \\vec{\\omega}',
        paramA: {
          key: 'I',
          label: 'Inersiya momenti I',
          unit: 'kg·m²',
          min: 0.1,
          max: 20,
          step: 0.1,
          value: 3,
        },
        paramB: {
          key: 'omega',
          label: 'Burchak tezligi ω',
          unit: 'rad/s',
          min: 0,
          max: 40,
          step: 0.5,
          value: 6,
        },
      },
    },
    {
      code: '5.6',
      slug: 'impuls-momenti-saqlanishi',
      order: 6,
      titleUz: 'Impuls momenti saqlanishi',
      titleEn: 'Conservation of angular momentum',
      difficulty: 'ORTA',
      summary: "Tashqi moment bo'lmaganda impuls momentining o'zgarmasligi.",
      keywords: ['saqlanish', 'figurali uchish', 'skater', 'pulsar', 'angular momentum'],
      theory: `Sistemaga tashqi kuch momenti ta'sir qilmasa, uning impuls momenti o'zgarmas bo'lib qoladi. Bu esa juda qiziq oqibatga olib keladi: inersiya momenti kamaysa, burchak tezligi shunga mos ravishda ortishi kerak.

Eng mashhur namoyish — figurali uchuvchi sportchi. U qo'llarini yozib aylana boshlaydi, so'ng qo'llarini tanasiga yig'adi. Massa o'qqa yaqinlashgani uchun inersiya momenti keskin kamayadi va aylanish sezilarli tezlashadi.

Qiziq jihat: kinetik energiya bu jarayonda saqlanmaydi, u ortadi. Chunki sportchi qo'llarini yig'ish uchun mushak ishini bajaradi va shu ish energiyaga aylanadi.

Qonun kosmik masshtabda ham ishlaydi.

### Hayotiy misol
Yulduz o'z og'irligi ostida siqilganda aylanishi millionlab marta tezlashadi — natijada sekundiga o'nlab marta aylanadigan pulsarlar hosil bo'ladi.`,
      formulas: [
        { latex: 'L = I \\omega = \\text{const}', label: 'Saqlanish qonuni' },
        { latex: 'I_1 \\omega_1 = I_2 \\omega_2', label: 'Ikki holat uchun' },
        { latex: '\\omega_2 = \\omega_1 \\frac{I_1}{I_2}', label: 'Yangi burchak tezligi' },
        { latex: '\\sum \\vec{M} = 0', label: 'Saqlanish sharti' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'I_1 \\omega_1 = I_2 \\omega_2',
        paramA: {
          key: 'I1',
          label: "Boshlang'ich I1",
          unit: 'kg·m²',
          min: 0.5,
          max: 20,
          step: 0.1,
          value: 6,
        },
        paramB: {
          key: 'I2',
          label: 'Yangi I2',
          unit: 'kg·m²',
          min: 0.1,
          max: 20,
          step: 0.1,
          value: 2,
        },
      },
    },
    {
      code: '5.7',
      slug: 'giroskop-effekti',
      order: 7,
      titleUz: 'Giroskop effekti',
      titleEn: 'Gyroscopic effect',
      difficulty: 'QIYIN',
      summary: "Tez aylanuvchi jismning barqarorligi va pretsessiya harakati.",
      keywords: ['giroskop', 'pretsessiya', 'barqarorlik', 'navigatsiya', 'gyroscope'],
      theory: `Tez aylanayotgan jism o'z aylanish o'qining yo'nalishini saqlashga intiladi. Bu xossa giroskop effekti deb ataladi va impuls momentining vektor tabiatidan kelib chiqadi.

Bunday jismga tashqi kuch momenti ta'sir qilsa, u kutilganidek yiqilmaydi. Buning o'rniga aylanish o'qi kuch momentiga perpendikulyar yo'nalishda asta-sekin buriladi. Bu harakat pretsessiya deb ataladi.

Pretsessiya tezligi kuch momentiga to'g'ri, impuls momentiga esa teskari proporsional. Ya'ni jism qanchalik tez aylansa, uning o'qi shunchalik sekin buriladi va barqarorlik shunchalik yuqori bo'ladi.

Giroskop tashqi orientirlarsiz yo'nalishni aniqlash imkonini bergani uchun navigatsiyada keng qo'llaniladi.

### Hayotiy misol
Aylanayotgan zangi tik holatda qoladi va o'qi sekin doira chizadi. Xuddi shu prinsip samolyot avtopiloti va smartfondagi giroskop sensorida ishlatiladi.`,
      formulas: [
        { latex: '\\Omega = \\frac{M}{I \\omega}', label: 'Pretsessiya tezligi' },
        { latex: 'M = m g d', label: 'Kuch momenti' },
        { latex: '\\vec{M} = \\frac{d\\vec{L}}{dt}', label: 'Asosiy tenglama' },
        { latex: 'L = I \\omega', label: 'Impuls momenti' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: '\\Omega = \\frac{M}{I \\omega}',
        paramA: {
          key: 'omega',
          label: 'Aylanish tezligi ω',
          unit: 'rad/s',
          min: 1,
          max: 200,
          step: 1,
          value: 50,
        },
        paramB: {
          key: 'M',
          label: 'Kuch momenti M',
          unit: 'N·m',
          min: 0,
          max: 20,
          step: 0.1,
          value: 2,
        },
      },
    },
  ],
};
