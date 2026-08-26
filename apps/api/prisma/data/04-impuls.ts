import type { SectionSeed } from './types';

const ACCENT = '#8B5CF6';

export const impuls: SectionSeed = {
  code: '4',
  slug: 'impuls-toqnashish',
  order: 4,
  titleUz: "Impuls va to'qnashish",
  titleEn: 'Momentum and collisions',
  description:
    "Impuls, kuch impulsi, impuls saqlanish qonuni va turli xil to'qnashish turlari.",
  icon: 'circle-dot',
  color: ACCENT,
  topics: [
    {
      code: '4.1',
      slug: 'impuls-tushunchasi',
      order: 1,
      titleUz: 'Impuls tushunchasi',
      titleEn: 'Momentum',
      difficulty: 'OSON',
      summary: "Massa va tezlik ko'paytmasi sifatidagi vektor kattalik.",
      keywords: ['impuls', 'harakat miqdori', 'momentum', 'vektor', 'kg m/s'],
      theory: `Impuls jismning harakat miqdorini tavsiflaydi va massa bilan tezlikning ko'paytmasiga teng. Bu vektor kattalik: yo'nalishi har doim tezlik yo'nalishi bilan bir xil bo'ladi.

Impuls jismni to'xtatish qanchalik qiyinligini ko'rsatadi. Sekin harakatlanayotgan og'ir yuk mashinasi va tez uchayotgan yengil o'q bir xil impulsga ega bo'lishi mumkin — ikkalasini to'xtatish uchun ham bir xil kuch impulsi kerak bo'ladi.

Kinetik energiyadan farqli o'laroq, impuls yo'nalishni hisobga oladi. Qarama-qarshi yo'nalishda harakatlanayotgan bir xil ikki jismning umumiy impulsi nolga teng, lekin kinetik energiyasi noldan katta. Aynan shu farq to'qnashishlarni tahlil qilishda hal qiluvchi rol o'ynaydi.

Impuls kilogramm-metr bo'lingan sekundda o'lchanadi.

### Hayotiy misol
Futbol to'pini to'xtatish oson, lekin xuddi shu tezlikda kelayotgan bouling sharini to'xtatish deyarli imkonsiz — massalar farqi impulsda aks etadi.`,
      formulas: [
        { latex: '\\vec{p} = m \\vec{v}', label: 'Impuls' },
        { latex: 'p = \\sqrt{p_x^2 + p_y^2}', label: 'Impuls moduli' },
        { latex: 'E_k = \\frac{p^2}{2m}', label: 'Kinetik energiya bilan' },
        { latex: '[p] = \\text{kg} \\cdot \\text{m/s}', label: 'Birlik' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: '\\vec{p} = m \\vec{v}',
        paramA: { key: 'm', label: 'Massa m', unit: 'kg', min: 0.1, max: 50, step: 0.1, value: 5 },
        paramB: { key: 'v', label: 'Tezlik v', unit: 'm/s', min: -30, max: 30, step: 0.5, value: 12 },
      },
    },
    {
      code: '4.2',
      slug: 'kuch-impulsi',
      order: 2,
      titleUz: 'Kuch impulsi',
      titleEn: 'Impulse of force',
      difficulty: 'ORTA',
      summary: "Kuch va ta'sir vaqti ko'paytmasi hamda impuls o'zgarishi bilan bog'lanishi.",
      keywords: ['kuch impulsi', 'impulse', "ta'sir vaqti", 'zarba', 'xavfsizlik yostiqchasi'],
      theory: `Kuch impulsi kuchning ta'sir vaqti bilan ko'paytmasiga teng va u jism impulsining o'zgarishini beradi. Bu bog'lanish impuls-moment teoremasi deb ataladi.

Teoremaning amaliy ahamiyati juda katta. Impuls o'zgarishi qat'iy belgilangan bo'lsa, ta'sir vaqtini uzaytirish orqali kuchni kamaytirish mumkin. Aynan shu prinsip barcha zarbani yumshatuvchi qurilmalar asosida yotadi.

Kuch o'zgaruvchan bo'lganda kuch impulsi kuch-vaqt grafigi ostidagi yuza sifatida topiladi. Real zarbalarda kuch juda qisqa vaqt ichida keskin ortib, so'ng kamayadi — grafik o'tkir cho'qqi shaklida bo'ladi.

### Hayotiy misol
Avtomobil xavfsizlik yostiqchasi to'qnashuv vaqtini bir necha o'n barobar uzaytiradi va shu hisobga odamga ta'sir qiluvchi kuchni keskin kamaytiradi. Sportchi tushishda tizzasini bukishi ham xuddi shu maqsadga xizmat qiladi.`,
      formulas: [
        { latex: '\\vec{J} = \\vec{F} \\Delta t', label: 'Kuch impulsi' },
        { latex: '\\vec{J} = \\Delta \\vec{p}', label: 'Impuls-moment teoremasi' },
        { latex: 'F \\Delta t = m v_2 - m v_1', label: 'Kengaytirilgan ko\u2018rinish' },
        { latex: 'F_{ort} = \\frac{\\Delta p}{\\Delta t}', label: "O'rtacha kuch" },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 'F \\Delta t = \\Delta p',
        paramA: { key: 'F', label: 'Kuch F', unit: 'N', min: 0, max: 5000, step: 10, value: 500 },
        paramB: {
          key: 'dt',
          label: "Ta'sir vaqti Δt",
          unit: 's',
          min: 0.001,
          max: 2,
          step: 0.001,
          value: 0.1,
        },
      },
    },
    {
      code: '4.3',
      slug: 'impuls-saqlanish-qonuni',
      order: 3,
      titleUz: 'Impuls saqlanish qonuni',
      titleEn: 'Conservation of momentum',
      difficulty: 'ORTA',
      summary: "Yopiq sistemada umumiy impulsning o'zgarmasligi.",
      keywords: ['saqlanish qonuni', 'yopiq sistema', 'reaktiv harakat', 'momentum conservation'],
      theory: `Tashqi kuchlar ta'sir qilmaydigan yoki ular bir-birini muvozanatlaydigan sistemada jismlarning umumiy impulsi o'zgarmas bo'lib qoladi. Bunday sistema yopiq sistema deb ataladi.

Qonun Nyutonning uchinchi qonunidan kelib chiqadi: sistema ichidagi jismlar bir-biriga teng va qarama-qarshi kuchlar bilan ta'sir qilgani uchun ularning impuls o'zgarishlari ham teng va qarama-qarshi bo'ladi, yig'indi esa o'zgarmaydi.

Impuls vektor bo'lgani sababli saqlanish qonuni har bir koordinata o'qi bo'yicha alohida bajariladi. Ikki o'lchovli masalalarda gorizontal va vertikal tashkil etuvchilar mustaqil ravishda yoziladi.

Qonun to'qnashish, portlash va reaktiv harakat masalalarida ishlaydi, hatto o'zaro ta'sir kuchlari noma'lum bo'lganda ham.

### Hayotiy misol
Miltiqdan o'q uzilganda o'q oldinga, miltiq esa orqaga tepadi. Kosmik kemaning dvigatelsiz manevr qilishi ham shu qonun asosida.`,
      formulas: [
        { latex: '\\sum \\vec{p}_{boshl} = \\sum \\vec{p}_{oxir}', label: 'Saqlanish qonuni' },
        {
          latex: 'm_1 v_1 + m_2 v_2 = m_1 v_1\u2019 + m_2 v_2\u2019',
          label: 'Ikki jism uchun',
        },
        { latex: '\\sum p_x = \\text{const}', label: 'x o\u2018qi bo\u2018yicha' },
        { latex: '0 = m_1 v_1 + m_2 v_2', label: 'Portlash (tinch holatdan)' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: '\\sum \\vec{p} = \\text{const}',
        paramA: {
          key: 'm1',
          label: 'Birinchi massa m1',
          unit: 'kg',
          min: 0.5,
          max: 20,
          step: 0.5,
          value: 2,
        },
        paramB: {
          key: 'm2',
          label: 'Ikkinchi massa m2',
          unit: 'kg',
          min: 0.5,
          max: 20,
          step: 0.5,
          value: 8,
        },
      },
    },
    {
      code: '4.4',
      slug: 'elastik-toqnashish',
      order: 4,
      titleUz: "Elastik to'qnashish",
      titleEn: 'Elastic collision',
      difficulty: 'QIYIN',
      summary: "Ham impuls, ham kinetik energiya saqlanadigan to'qnashish turi.",
      keywords: ['elastik toqnashish', 'billiard', 'restitution', 'elastic collision'],
      theory: `Elastik to'qnashishda ham impuls, ham kinetik energiya to'liq saqlanadi. Bu ideallashtirilgan holat bo'lib, unda jismlar deformatsiyalanmaydi va issiqlik ajralmaydi.

Ikki tenglamani birga yechish orqali to'qnashishdan keyingi tezliklar uchun aniq formulalar olinadi. Natijalar juda qiziq. Massalar teng bo'lsa, jismlar tezliklarini bir-biriga almashtiradi: harakatdagi shar to'xtaydi, tinch turgani esa uning tezligi bilan uchib ketadi.

Yengil jism og'ir jismga urilsa, u deyarli o'z tezligi bilan orqaga qaytadi. Aksincha, og'ir jism yengiliga urilsa, deyarli sekinlashmaydi, yengil jism esa ikki barobar tezlik oladi.

Elastiklik koeffitsiyenti bunday to'qnashishda birga teng bo'ladi.

### Hayotiy misol
Billiard sharlari va Nyuton beshigi deb ataladigan sharchali qurilma elastik to'qnashishga eng yaqin misollar hisoblanadi.`,
      formulas: [
        {
          latex: 'm_1 v_1 + m_2 v_2 = m_1 u_1 + m_2 u_2',
          label: 'Impuls saqlanishi',
        },
        {
          latex: '\\frac{m_1 v_1^2}{2} + \\frac{m_2 v_2^2}{2} = \\frac{m_1 u_1^2}{2} + \\frac{m_2 u_2^2}{2}',
          label: 'Energiya saqlanishi',
        },
        {
          latex: 'u_1 = \\frac{(m_1 - m_2) v_1 + 2 m_2 v_2}{m_1 + m_2}',
          label: 'Birinchi jism tezligi',
        },
        { latex: 'e = 1', label: 'Elastiklik koeffitsiyenti' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 'e = 1',
        paramA: {
          key: 'm1',
          label: 'Birinchi massa m1',
          unit: 'kg',
          min: 0.5,
          max: 20,
          step: 0.5,
          value: 4,
        },
        paramB: {
          key: 'v1',
          label: 'Birinchi tezlik v1',
          unit: 'm/s',
          min: 0,
          max: 20,
          step: 0.5,
          value: 8,
        },
      },
    },
    {
      code: '4.5',
      slug: 'noelastik-toqnashish',
      order: 5,
      titleUz: "Noelastik to'qnashish",
      titleEn: 'Perfectly inelastic collision',
      difficulty: 'ORTA',
      summary: "Jismlar birikib ketadigan, kinetik energiyaning bir qismi yo'qoladigan to'qnashish.",
      keywords: ['noelastik', 'birikish', 'energiya yoqolishi', 'inelastic collision'],
      theory: `Mutlaqo noelastik to'qnashishda jismlar to'qnashgandan keyin birikib, birgalikda bir xil tezlik bilan harakatlanadi. Impuls saqlanish qonuni bu yerda ham bajariladi va u umumiy tezlikni topish uchun yetarli.

Kinetik energiya esa saqlanmaydi. Uning bir qismi jismlarning deformatsiyasiga, issiqlik ajralishiga va tovushga sarflanadi. Yo'qolgan energiyani boshlang'ich va oxirgi kinetik energiyalar ayirmasi sifatida hisoblash mumkin.

Massalar teng va jismlar bir-biriga qarama-qarshi bir xil tezlikda kelsa, ular to'qnashgandan keyin butunlay to'xtaydi va butun kinetik energiya yo'qoladi. Bu impuls saqlanishiga zid emas, chunki umumiy impuls dastlab ham nolga teng edi.

Elastiklik koeffitsiyenti bunday to'qnashishda nolga teng.

### Hayotiy misol
Loyga botgan o'q, birikib ketgan ikki vagon va plastilin sharchalarining urilishi — barchasi noelastik to'qnashish.`,
      formulas: [
        {
          latex: 'm_1 v_1 + m_2 v_2 = (m_1 + m_2) u',
          label: 'Impuls saqlanishi',
        },
        {
          latex: 'u = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}',
          label: 'Umumiy tezlik',
        },
        {
          latex: '\\Delta E_k = E_{k1} - E_{k2}',
          label: "Yo'qolgan energiya",
        },
        { latex: 'e = 0', label: 'Elastiklik koeffitsiyenti' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 'u = \\frac{m_1 v_1 + m_2 v_2}{m_1 + m_2}',
        paramA: {
          key: 'm1',
          label: 'Birinchi massa m1',
          unit: 'kg',
          min: 0.5,
          max: 20,
          step: 0.5,
          value: 3,
        },
        paramB: {
          key: 'v1',
          label: 'Birinchi tezlik v1',
          unit: 'm/s',
          min: 0,
          max: 20,
          step: 0.5,
          value: 10,
        },
      },
    },
    {
      code: '4.6',
      slug: 'qisman-elastik-toqnashish',
      order: 6,
      titleUz: "Qisman elastik to'qnashish",
      titleEn: 'Partially elastic collision',
      difficulty: 'QIYIN',
      summary: "Elastiklik koeffitsiyenti nol bilan bir orasida bo'lgan real to'qnashishlar.",
      keywords: ['restitution', 'elastiklik koeffitsiyenti', 'sakrash balandligi', 'real toqnashish'],
      theory: `Real hayotdagi to'qnashishlarning aksariyati na to'liq elastik, na to'liq noelastik bo'ladi. Ularni tavsiflash uchun elastiklik (restitutsiya) koeffitsiyenti kiritiladi — u to'qnashishdan keyingi va oldingi nisbiy tezliklar nisbatiga teng.

Koeffitsiyent birga teng bo'lsa to'qnashish elastik, nolga teng bo'lsa mutlaqo noelastik. Oraliq qiymatlar qanchalik ko'p energiya yo'qolganini ko'rsatadi: koeffitsiyent kichraygan sari yo'qotish ortadi.

Koeffitsiyentni o'lchashning eng oddiy usuli — to'pni ma'lum balandlikdan tashlab, sakrash balandligini o'lchash. Koeffitsiyent balandliklar nisbatining kvadrat ildiziga teng bo'ladi.

Koeffitsiyent materialga bog'liq: po'lat va rezina uchun yuqori, yog'och va qum uchun juda past.

### Hayotiy misol
Basketbol to'pi taxminan 0,75 koeffitsiyentga ega — shuning uchun har sakrashda balandlik sezilarli kamayadi.`,
      formulas: [
        {
          latex: 'e = \\frac{u_2 - u_1}{v_1 - v_2}',
          label: 'Elastiklik koeffitsiyenti',
        },
        { latex: '0 < e < 1', label: 'Qisman elastik shart' },
        { latex: 'e = \\sqrt{\\frac{h_2}{h_1}}', label: 'Sakrash balandligi orqali' },
        { latex: 'h_n = h_0 e^{2n}', label: 'n-sakrash balandligi' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 'e = \\sqrt{\\frac{h_2}{h_1}}',
        paramA: {
          key: 'e',
          label: 'Koeffitsiyent e',
          unit: '',
          min: 0,
          max: 1,
          step: 0.01,
          value: 0.75,
        },
        paramB: {
          key: 'h0',
          label: "Boshlang'ich balandlik",
          unit: 'm',
          min: 0.2,
          max: 10,
          step: 0.1,
          value: 2,
        },
      },
    },
    {
      code: '4.7',
      slug: 'ikki-olchovli-toqnashish',
      order: 7,
      titleUz: "Ikki o'lchovli to'qnashish",
      titleEn: 'Two-dimensional collision',
      difficulty: 'QIYIN',
      summary: "Burchak ostidagi to'qnashishlar va impuls komponentlarining alohida saqlanishi.",
      keywords: ['2D toqnashish', 'burchakli urilish', 'billiard', 'komponentlar'],
      theory: `Jismlar bir to'g'ri chiziq bo'ylab emas, balki burchak ostida to'qnashsa, masala ikki o'lchovli bo'ladi. Impuls vektor kattalik bo'lgani uchun saqlanish qonuni har bir o'q bo'yicha alohida yoziladi: gorizontal komponentlar yig'indisi ham, vertikal komponentlar yig'indisi ham o'zgarmaydi.

Shunday qilib, ikkita mustaqil tenglama hosil bo'ladi. Elastik to'qnashishda ularga energiya saqlanish tenglamasi ham qo'shiladi.

Alohida qiziq holat: bir xil massali ikki shardan biri tinch turganda elastik to'qnashsa, ular to'qnashishdan keyin har doim bir-biriga aniq to'g'ri burchak ostida uchib ketadi. Bu natija billiard o'yinchilariga yaxshi tanish.

Masalalarni yechishda tezlik vektorlarini komponentlarga ajratish eng muhim qadam hisoblanadi.

### Hayotiy misol
Billiard sharlarining urilishi, atom yadrolarining sochilish tajribalari va yo'l chorrahasidagi avtomobil to'qnashuvi ekspertizasi.`,
      formulas: [
        {
          latex: 'm_1 v_{1x} + m_2 v_{2x} = m_1 u_{1x} + m_2 u_{2x}',
          label: 'x bo\u2018yicha saqlanish',
        },
        {
          latex: 'm_1 v_{1y} + m_2 v_{2y} = m_1 u_{1y} + m_2 u_{2y}',
          label: 'y bo\u2018yicha saqlanish',
        },
        { latex: 'v_x = v \\cos\\theta', label: 'Komponentga ajratish' },
        { latex: '\\theta_1 + \\theta_2 = 90^\\circ', label: 'Teng massalar uchun' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: '\\theta_1 + \\theta_2 = 90^\\circ',
        paramA: {
          key: 'v1',
          label: 'Urilish tezligi v1',
          unit: 'm/s',
          min: 1,
          max: 20,
          step: 0.5,
          value: 8,
        },
        paramB: {
          key: 'theta',
          label: 'Urilish burchagi',
          unit: '°',
          min: 0,
          max: 80,
          step: 1,
          value: 30,
        },
      },
    },
  ],
};
