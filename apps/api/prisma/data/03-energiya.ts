import type { SectionSeed } from './types';

const ACCENT = '#F59E0B';

export const energiya: SectionSeed = {
  code: '3',
  slug: 'ish-energiya-quvvat',
  order: 3,
  titleUz: 'Ish, energiya va quvvat',
  titleEn: 'Work, energy and power',
  description:
    "Mexanik ish, kinetik va potensial energiya, energiya saqlanish qonuni hamda quvvat tushunchasi.",
  icon: 'battery-charging',
  color: ACCENT,
  topics: [
    {
      code: '3.1',
      slug: 'mexanik-ish',
      order: 1,
      titleUz: 'Mexanik ish',
      titleEn: 'Mechanical work',
      difficulty: 'OSON',
      summary: "Kuch va ko'chishning skalyar ko'paytmasi; musbat, manfiy va nol ish.",
      keywords: ['ish', 'joul', 'kuch', "ko'chish", 'work', 'skalyar ko\u2018paytma'],
      theory: `Mexanik ish kuch jismni ko'chirganda bajariladi va kuch, ko'chish hamda ular orasidagi burchak kosinusining ko'paytmasiga teng. Ish skalyar kattalik bo'lib, joulda o'lchanadi.

Burchakka qarab ish uch xil bo'ladi. Kuch ko'chish bilan bir yo'nalishda bo'lsa ish musbat: kuch jismga energiya beradi. Kuch qarama-qarshi yo'nalgan bo'lsa ish manfiy: ishqalanish kuchi doim manfiy ish bajaradi. Kuch ko'chishga perpendikulyar bo'lsa ish nolga teng.

Shu sababli og'ir sumkani gorizontal yo'lda ko'tarib borganda og'irlik kuchi hech qanday ish bajarmaydi, chunki u pastga, ko'chish esa yon tomonga yo'nalgan.

Kuch o'zgaruvchan bo'lsa, ish kuch-ko'chish grafigi ostidagi yuza sifatida topiladi.

### Hayotiy misol
Yukni ikkinchi qavatga ko'tarish uchun bajarilgan ish uni qaysi zina orqali ko'targaningizga bog'liq emas — faqat balandlik muhim.`,
      formulas: [
        { latex: 'W = F s \\cos\\theta', label: 'Mexanik ish' },
        { latex: 'W = \\vec{F} \\cdot \\vec{s}', label: 'Vektor ko\u2018rinishi' },
        { latex: 'W = \\Delta E_k', label: 'Ish-energiya teoremasi' },
        { latex: '1\\ \\text{J} = 1\\ \\text{N} \\cdot \\text{m}', label: 'Birlik' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 'W = F s \\cos\\theta',
        paramA: { key: 'F', label: 'Kuch F', unit: 'N', min: 0, max: 200, step: 1, value: 60 },
        paramB: {
          key: 'theta',
          label: 'Burchak θ',
          unit: '°',
          min: 0,
          max: 180,
          step: 1,
          value: 30,
        },
      },
    },
    {
      code: '3.2',
      slug: 'kinetik-energiya',
      order: 2,
      titleUz: 'Kinetik energiya',
      titleEn: 'Kinetic energy',
      difficulty: 'OSON',
      summary: "Harakat energiyasi va uning tezlik kvadratiga bog'liqligi.",
      keywords: ['kinetik energiya', 'harakat energiyasi', 'tezlik kvadrati', 'kinetic energy'],
      theory: `Kinetik energiya — jismning harakati tufayli ega bo'lgan energiyasi. U massaga to'g'ri proporsional va tezlik kvadratiga proporsional.

Tezlik kvadratiga bog'liqlik juda muhim amaliy oqibatlarga ega. Tezlik ikki barobar ortsa, kinetik energiya to'rt barobar ortadi; uch barobar ortsa — to'qqiz barobar. Aynan shu sabab yuqori tezlikdagi avtohalokatlar nomutanosib darajada xavfli bo'ladi.

Kinetik energiya har doim musbat yoki nolga teng, chunki tezlik kvadratga ko'tariladi. U skalyar kattalik: yo'nalishga bog'liq emas.

Ish-energiya teoremasiga ko'ra, jismga bajarilgan to'liq ish uning kinetik energiyasi o'zgarishiga teng. Bu teorema ko'plab masalalarni Nyuton qonunlarisiz yechish imkonini beradi.

### Hayotiy misol
Shahar ichida 60 km/soat o'rniga 80 km/soat tezlikda ketish kinetik energiyani deyarli ikki barobar oshiradi — tormozlash masofasi ham shunga mos ravishda uzayadi.`,
      formulas: [
        { latex: 'E_k = \\frac{m v^2}{2}', label: 'Kinetik energiya' },
        { latex: 'E_k = \\frac{p^2}{2m}', label: 'Impuls orqali' },
        { latex: 'W = \\Delta E_k = E_{k2} - E_{k1}', label: 'Ish-energiya teoremasi' },
        { latex: 'v = \\sqrt{\\frac{2 E_k}{m}}', label: 'Tezlik' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 'E_k = \\frac{m v^2}{2}',
        paramA: { key: 'm', label: 'Massa m', unit: 'kg', min: 0.5, max: 100, step: 0.5, value: 10 },
        paramB: { key: 'v', label: 'Tezlik v', unit: 'm/s', min: 0, max: 40, step: 0.5, value: 10 },
      },
    },
    {
      code: '3.3',
      slug: 'gravitatsion-potensial-energiya',
      order: 3,
      titleUz: 'Gravitatsion potensial energiya',
      titleEn: 'Gravitational potential energy',
      difficulty: 'OSON',
      summary: "Yer sirtiga yaqin balandlikdagi jismning energiyasi: Ep = mgh.",
      keywords: ['potensial energiya', 'balandlik', 'mgh', 'nol sath', 'potential energy'],
      theory: `Gravitatsion potensial energiya jismning tanlangan nol sathdan balandligi tufayli ega bo'lgan energiyasidir. Yer sirtiga yaqin masofalarda u massa, erkin tushish tezlanishi va balandlikning ko'paytmasiga teng.

Muhim jihat: potensial energiyaning mutlaq qiymati emas, balki o'zgarishi ma'noga ega. Nol sathni ixtiyoriy tanlash mumkin — stol usti, pol yoki yer sathi. Nol sath ostida potensial energiya manfiy bo'ladi.

Og'irlik kuchi konservativ kuch hisoblanadi: u bajargan ish faqat boshlang'ich va oxirgi balandliklarga bog'liq, yo'lning shakliga esa bog'liq emas. Shuning uchun jismni tik ko'tarish yoki uzun qiya yo'l bilan ko'tarish bir xil ish talab qiladi.

### Hayotiy misol
Gidroelektr stansiyalar aynan shu energiyadan foydalanadi: to'g'ondagi suv balandlikdan tushib, potensial energiyasini turbinaning harakat energiyasiga aylantiradi.`,
      formulas: [
        { latex: 'E_p = m g h', label: 'Potensial energiya' },
        { latex: '\\Delta E_p = m g \\Delta h', label: "O'zgarishi" },
        { latex: 'W = -\\Delta E_p', label: "Og'irlik kuchi ishi" },
        { latex: 'h = \\frac{E_p}{m g}', label: 'Balandlik' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 'E_p = m g h',
        paramA: { key: 'm', label: 'Massa m', unit: 'kg', min: 0.5, max: 100, step: 0.5, value: 10 },
        paramB: { key: 'h', label: 'Balandlik h', unit: 'm', min: 0, max: 50, step: 0.5, value: 10 },
      },
    },
    {
      code: '3.4',
      slug: 'elastik-potensial-energiya',
      order: 4,
      titleUz: 'Elastik potensial energiya',
      titleEn: 'Elastic potential energy',
      difficulty: 'ORTA',
      summary: "Deformatsiyalangan prujinada to'plangan energiya va uning kvadratik bog'liqligi.",
      keywords: ['elastik energiya', 'prujina', 'deformatsiya', 'bikrlik', 'elastic energy'],
      theory: `Prujina cho'zilganda yoki siqilganda unda potensial energiya to'planadi. Bu energiya bikrlik koeffitsiyenti va deformatsiya kvadratining ko'paytmasining yarmiga teng.

Kvadratik bog'liqlik shuni anglatadiki, deformatsiyani ikki barobar oshirsak, to'plangan energiya to'rt barobar ortadi. Shuning uchun kamonni ikki barobar ko'proq tortish o'qqa to'rt barobar ko'p energiya beradi.

Energiya deformatsiya ishorasiga bog'liq emas: prujina 5 sm cho'zilganda ham, 5 sm siqilganda ham bir xil energiya saqlaydi, chunki kattalik kvadratga ko'tariladi.

Formula Guk qonunidan kelib chiqadi: kuch-cho'zilish grafigi to'g'ri chiziq bo'lgani uchun uning ostidagi yuza uchburchak shaklida bo'ladi va aynan shu yuza bajarilgan ishni beradi.

### Hayotiy misol
Batut, poyabzal tagligi, avtomobil bamperi va mexanik soat prujinasi — barchasi energiyani vaqtincha saqlab, keyin qaytaradi.`,
      formulas: [
        { latex: 'E_p = \\frac{k x^2}{2}', label: 'Elastik energiya' },
        { latex: 'F = k x', label: 'Elastik kuch' },
        { latex: 'W = \\frac{k x^2}{2}', label: 'Deformatsiya ishi' },
        { latex: 'x = \\sqrt{\\frac{2 E_p}{k}}', label: "Cho'zilish" },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'E_p = \\frac{k x^2}{2}',
        paramA: {
          key: 'k',
          label: 'Bikrlik k',
          unit: 'N/m',
          min: 10,
          max: 800,
          step: 10,
          value: 200,
        },
        paramB: {
          key: 'x',
          label: 'Deformatsiya x',
          unit: 'm',
          min: 0,
          max: 0.5,
          step: 0.01,
          value: 0.2,
        },
      },
    },
    {
      code: '3.5',
      slug: 'energiya-saqlanish-qonuni',
      order: 5,
      titleUz: 'Energiya saqlanish qonuni',
      titleEn: 'Conservation of energy',
      difficulty: 'ORTA',
      summary: "To'liq mexanik energiyaning o'zgarmasligi va energiya turlarining bir-biriga o'tishi.",
      keywords: ['saqlanish qonuni', 'mexanik energiya', 'mayatnik', 'conservation'],
      theory: `Ishqalanish va boshqa dissipativ kuchlar bo'lmaganda jismning to'liq mexanik energiyasi — kinetik va potensial energiyalar yig'indisi — o'zgarmas bo'lib qoladi. Energiya yo'qolmaydi, faqat bir turdan ikkinchisiga aylanadi.

Mayatnik eng yaqqol misol. Eng chekka nuqtada tezlik nolga teng va butun energiya potensial ko'rinishda bo'ladi. Muvozanat holatidan o'tayotganda balandlik minimal, tezlik esa maksimal — energiya to'liq kinetikka aylanadi. Oraliq nuqtalarda ikkalasi ham mavjud, lekin yig'indi doim bir xil.

Real sharoitda ishqalanish energiyaning bir qismini issiqlikka aylantiradi, shuning uchun tebranishlar asta-sekin so'nadi. Lekin energiya baribir yo'qolmaydi — u shunchaki mexanik bo'lmagan shaklga o'tadi.

### Hayotiy misol
Amerika gorkasida vagon eng yuqori nuqtadan boshlaydi va keyingi tepaliklar undan past bo'ladi, chunki energiyaning bir qismi ishqalanishga sarflanadi.`,
      formulas: [
        { latex: 'E = E_k + E_p = \\text{const}', label: "To'liq energiya" },
        {
          latex: '\\frac{m v_1^2}{2} + m g h_1 = \\frac{m v_2^2}{2} + m g h_2',
          label: 'Ikki nuqta uchun',
        },
        { latex: 'v = \\sqrt{2 g h}', label: 'Balandlikdan tushish tezligi' },
        { latex: '\\Delta E = -W_{ishq}', label: 'Ishqalanish bilan' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'E_k + E_p = \\text{const}',
        paramA: {
          key: 'h',
          label: "Boshlang'ich balandlik",
          unit: 'm',
          min: 0.5,
          max: 30,
          step: 0.5,
          value: 10,
        },
        paramB: { key: 'm', label: 'Massa m', unit: 'kg', min: 0.5, max: 50, step: 0.5, value: 5 },
      },
    },
    {
      code: '3.6',
      slug: 'quvvat',
      order: 6,
      titleUz: 'Quvvat',
      titleEn: 'Power',
      difficulty: 'OSON',
      summary: "Ish bajarish tezligi, vatt birligi va samaradorlik.",
      keywords: ['quvvat', 'vatt', 'samaradorlik', 'ot kuchi', 'power'],
      theory: `Quvvat ish bajarish tezligini ko'rsatadi va bajarilgan ishning shu ishga ketgan vaqtga nisbatiga teng. Vattda o'lchanadi: 1 vatt — bu 1 sekundda 1 joul ish bajarish.

Muhim tushuncha: bir xil ishni turli quvvat bilan bajarish mumkin. Yukni ikkinchi qavatga bir daqiqada yoki o'n daqiqada ko'tarish bir xil ish talab qiladi, lekin quvvat o'n barobar farq qiladi.

O'zgarmas tezlikda harakatda quvvatni kuch va tezlik ko'paytmasi orqali ham hisoblash mumkin. Bu formula avtomobil dvigateli uchun juda qulay: yuqori tezlikda havo qarshiligini yengish uchun ancha katta quvvat kerak bo'ladi.

Real qurilmalarda foydali ish sarflangan ishdan doimo kichik. Ularning nisbati samaradorlikni beradi va u har doim yuz foizdan kam bo'ladi.

### Hayotiy misol
100 vattli lampa va 2000 vattli choynak bir xil vaqtda juda turlicha miqdorda energiya sarflaydi.`,
      formulas: [
        { latex: 'P = \\frac{W}{t}', label: 'Quvvat' },
        { latex: 'P = F v', label: 'Kuch va tezlik orqali' },
        { latex: '\\eta = \\frac{P_{foydali}}{P_{sarflangan}}', label: 'Samaradorlik' },
        { latex: '1\\ \\text{Vt} = 1\\ \\text{J/s}', label: 'Birlik' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 'P = F v',
        paramA: { key: 'F', label: 'Kuch F', unit: 'N', min: 0, max: 2000, step: 10, value: 500 },
        paramB: { key: 'v', label: 'Tezlik v', unit: 'm/s', min: 0, max: 40, step: 0.5, value: 15 },
      },
    },
  ],
};
