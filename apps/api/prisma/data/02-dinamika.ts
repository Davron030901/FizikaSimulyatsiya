import type { SectionSeed } from './types';

const ACCENT = '#EF4444';

export const dinamika: SectionSeed = {
  code: '2',
  slug: 'dinamika',
  order: 2,
  titleUz: 'Dinamika',
  titleEn: 'Dynamics',
  description:
    "Harakat sabablarini o'rganadigan bo'lim: kuchlar, massa, Nyuton qonunlari va ishqalanish.",
  icon: 'zap',
  color: ACCENT,
  topics: [
    {
      code: '2.1',
      slug: 'nyuton-birinchi-qonuni',
      order: 1,
      titleUz: 'Nyutonning birinchi qonuni',
      titleEn: "Newton's first law",
      difficulty: 'OSON',
      summary: "Inersiya qonuni: tashqi kuch ta'sir qilmasa jism holatini saqlaydi.",
      keywords: ['inersiya', 'Nyuton', 'inertial sanoq', 'first law', 'muvozanat'],
      theory: `Nyutonning birinchi qonuniga ko'ra, jismga boshqa jismlar ta'sir qilmasa yoki ta'sirlar bir-birini muvozanatlasa, jism tinch holatini yoki tekis to'g'ri chiziqli harakatini saqlaydi. Bu xossa inersiya deb ataladi.

Qonun kundalik tajribaga zid tuyulishi mumkin: itarilgan kitob stol ustida tez to'xtaydi. Sabab — unga ishqalanish kuchi ta'sir qiladi. Ishqalanishni kamaytirgan sari jism uzoqroq harakatlanadi, ideal holatda esa cheksiz harakatlanaveradi.

Inersiya o'lchovi — massa. Massasi katta jismning harakat holatini o'zgartirish qiyinroq. Muhim eslatma: bu qonun faqat inertial sanoq sistemalarida bajariladi, ya'ni tezlanish bilan harakatlanayotgan sistemada u buziladi.

### Hayotiy misol
Avtobus keskin tormozlaganda yo'lovchilar oldinga intiladi — tanalari avvalgi tezlikni saqlashga urinadi. Xavfsizlik kamari aynan shu inersiya ta'sirini to'xtatish uchun kerak.`,
      formulas: [
        { latex: '\\sum \\vec{F} = 0 \\Rightarrow \\vec{v} = \\text{const}', label: 'Inersiya sharti' },
        { latex: '\\vec{a} = 0', label: 'Tezlanish nolga teng' },
        { latex: 'p = m v = \\text{const}', label: 'Impuls saqlanadi' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: '\\sum \\vec{F} = 0',
        paramA: { key: 'm', label: 'Massa m', unit: 'kg', min: 0.5, max: 50, step: 0.5, value: 5 },
        paramB: {
          key: 'mu',
          label: 'Ishqalanish koeffitsiyenti μ',
          unit: '',
          min: 0,
          max: 0.8,
          step: 0.01,
          value: 0,
        },
      },
    },
    {
      code: '2.2',
      slug: 'nyuton-ikkinchi-qonuni',
      order: 2,
      titleUz: 'Nyutonning ikkinchi qonuni',
      titleEn: "Newton's second law",
      difficulty: 'OSON',
      summary: "Kuch, massa va tezlanish orasidagi asosiy bog'lanish: F = ma.",
      keywords: ['F=ma', 'kuch', 'massa', 'tezlanish', 'newton', 'free body diagram'],
      theory: `Nyutonning ikkinchi qonuni butun dinamikaning markazida turadi: jismga ta'sir etuvchi kuchlarning yig'indisi jism massasi bilan tezlanishining ko'paytmasiga teng. Tezlanish vektori har doim natijaviy kuch vektori bilan bir yo'nalishda bo'ladi.

Formuladan ikki muhim xulosa chiqadi. Bir xil massaga ikki barobar katta kuch ta'sir qilsa, tezlanish ham ikki barobar ortadi. Bir xil kuch ta'sirida esa massasi ikki barobar katta jism ikki barobar kichik tezlanish oladi.

Masalalarni yechishda avval kuchlar diagrammasi chiziladi: jismga ta'sir etuvchi barcha kuchlar vektor sifatida tasvirlanadi, so'ngra o'qlar bo'yicha proyeksiyalar yoziladi. Kuch nyutonda o'lchanadi: 1 N — bu 1 kg massaga 1 m/s² tezlanish beruvchi kuch.

### Hayotiy misol
Bo'sh va yuk ortilgan yuk mashinasi bir xil dvigatel kuchida turlicha tezlanadi — massa ortgani sari tezlanish kamayadi.`,
      formulas: [
        { latex: '\\vec{F} = m \\vec{a}', label: 'Asosiy tenglama' },
        { latex: 'a = \\frac{F}{m}', label: 'Tezlanish' },
        { latex: '\\sum F_x = m a_x', label: 'x proyeksiya' },
        { latex: '\\vec{F} = \\frac{d\\vec{p}}{dt}', label: 'Impuls orqali' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: 'a = \\frac{F}{m}',
        paramA: { key: 'F', label: 'Kuch F', unit: 'N', min: 0, max: 200, step: 1, value: 50 },
        paramB: { key: 'm', label: 'Massa m', unit: 'kg', min: 0.5, max: 50, step: 0.5, value: 10 },
      },
    },
    {
      code: '2.3',
      slug: 'nyuton-uchinchi-qonuni',
      order: 3,
      titleUz: 'Nyutonning uchinchi qonuni',
      titleEn: "Newton's third law",
      difficulty: 'ORTA',
      summary: "Ta'sir va aks ta'sir kuchlari teng kattalikda, qarama-qarshi yo'nalishda bo'ladi.",
      keywords: ["ta'sir", 'aks ta\u2019sir', 'action reaction', 'raketa', 'juft kuchlar'],
      theory: `Har qanday ta'sir o'zaro ta'sirdir. Agar birinchi jism ikkinchisiga qandaydir kuch bilan ta'sir qilsa, ikkinchisi ham birinchisiga aynan shunday kattalikdagi, lekin qarama-qarshi yo'nalgan kuch bilan ta'sir qiladi.

Eng ko'p uchraydigan xato — bu ikki kuchni muvozanatlashuvchi kuchlar deb o'ylash. Ular hech qachon bir-birini muvozanatlamaydi, chunki turli jismlarga qo'yilgan. Muvozanat haqida gapirish uchun kuchlar bitta jismga qo'yilgan bo'lishi kerak.

Kuchlar teng bo'lsa-da, natijalari juda farq qilishi mumkin. Massalar har xil bo'lganda kichik massali jism ancha katta tezlanish oladi. Aynan shu prinsip reaktiv harakat asosida yotadi.

### Hayotiy misol
Odam yurganda oyog'i bilan yerni orqaga itaradi, yer esa uni oldinga itaradi. Raketa gazlarni pastga otadi va shu hisobga yuqoriga ko'tariladi.`,
      formulas: [
        { latex: '\\vec{F}_{12} = -\\vec{F}_{21}', label: "Ta'sir va aks ta'sir" },
        { latex: '|F_{12}| = |F_{21}|', label: 'Kuchlar teng' },
        { latex: 'm_1 a_1 = m_2 a_2', label: 'Tezlanishlar nisbati' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: '\\vec{F}_{12} = -\\vec{F}_{21}',
        paramA: {
          key: 'm1',
          label: 'Birinchi jism massasi',
          unit: 'kg',
          min: 1,
          max: 100,
          step: 1,
          value: 10,
        },
        paramB: {
          key: 'm2',
          label: 'Ikkinchi jism massasi',
          unit: 'kg',
          min: 1,
          max: 100,
          step: 1,
          value: 40,
        },
      },
    },
    {
      code: '2.4',
      slug: 'statik-ishqalanish',
      order: 4,
      titleUz: 'Statik ishqalanish kuchi',
      titleEn: 'Static friction',
      difficulty: 'ORTA',
      summary: "Tinch turgan jismni joyidan qo'zg'atishga qarshilik ko'rsatuvchi kuch.",
      keywords: ['statik ishqalanish', 'tinchlik ishqalanishi', 'mu', 'normal kuch'],
      theory: `Statik ishqalanish kuchi tinch turgan jismni sirt bo'ylab siljitishga qarshilik ko'rsatadi. Uning o'ziga xos xususiyati shundaki, u o'zgaruvchan kattalik: qo'yilgan tashqi kuch qancha bo'lsa, ishqalanish ham shuncha bo'ladi va jism joyida qoladi.

Lekin bu kuchning chegarasi bor. Maksimal qiymat normal bosim kuchi bilan statik ishqalanish koeffitsiyentining ko'paytmasiga teng. Tashqi kuch shu chegaradan oshgan zahoti jism siljiy boshlaydi va statik ishqalanish o'rnini kinetik ishqalanish egallaydi.

Ishqalanish koeffitsiyenti sirtlarning turiga bog'liq, tegib turgan yuzaning kattaligiga esa deyarli bog'liq emas. Gorizontal sirtda normal kuch og'irlik kuchiga teng bo'ladi.

### Hayotiy misol
Og'ir shkafni surishga urinayotganingizda avvaliga u umuman qimirlamaydi. Ma'lum bir kuchdan keyin u birdan siljiy boshlaydi — aynan shu paytda statik chegara oshib ketgan bo'ladi.`,
      formulas: [
        { latex: 'f_s \\le \\mu_s N', label: 'Statik ishqalanish sharti' },
        { latex: 'f_{s,max} = \\mu_s N', label: 'Maksimal qiymat' },
        { latex: 'N = m g', label: 'Gorizontal sirtda normal kuch' },
        { latex: '\\mu_s > \\mu_k', label: 'Kinetik bilan taqqoslash' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: 'f_{s,max} = \\mu_s N',
        paramA: { key: 'm', label: 'Massa m', unit: 'kg', min: 1, max: 100, step: 1, value: 20 },
        paramB: {
          key: 'mus',
          label: 'Koeffitsiyent μs',
          unit: '',
          min: 0.05,
          max: 1.2,
          step: 0.01,
          value: 0.5,
        },
      },
    },
    {
      code: '2.5',
      slug: 'kinetik-ishqalanish',
      order: 5,
      titleUz: 'Kinetik ishqalanish kuchi',
      titleEn: 'Kinetic friction',
      difficulty: 'ORTA',
      summary: "Harakatlanayotgan jismga ta'sir qiluvchi, tezlikka qarama-qarshi yo'nalgan kuch.",
      keywords: ['kinetik ishqalanish', 'sirpanish', 'tormozlash masofasi', 'kinetic friction'],
      theory: `Jism sirt bo'ylab sirpana boshlagach, unga kinetik ishqalanish kuchi ta'sir qiladi. Statik ishqalanishdan farqli o'laroq, bu kuch amalda o'zgarmas: u normal kuch bilan kinetik ishqalanish koeffitsiyentining ko'paytmasiga teng va tezlik kattaligiga deyarli bog'liq emas.

Kinetik ishqalanish koeffitsiyenti odatda statik koeffitsiyentdan kichik bo'ladi. Aynan shuning uchun og'ir predmetni joyidan qo'zg'atish uni surib borishdan qiyinroq.

Ishqalanish kuchi doimo tezlikka qarama-qarshi yo'nalgani uchun jismni sekinlashtiradi va uning kinetik energiyasini issiqlikka aylantiradi. Tormozlash masofasini hisoblashda tezlik kvadrati muhim rol o'ynaydi: tezlik ikki barobar ortsa, to'xtash masofasi to'rt barobar ortadi.

### Hayotiy misol
Muzli yo'lda avtomobilning tormozlash masofasi quruq asfaltdagidan bir necha barobar uzun bo'ladi, chunki muz uchun koeffitsiyent juda kichik.`,
      formulas: [
        { latex: 'f_k = \\mu_k N', label: 'Kinetik ishqalanish' },
        { latex: 'a = -\\mu_k g', label: 'Sekinlanish' },
        { latex: 'd = \\frac{v^2}{2 \\mu_k g}', label: "To'xtash masofasi" },
        { latex: 'Q = f_k \\cdot s', label: 'Ajralgan issiqlik' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 'd = \\frac{v^2}{2 \\mu_k g}',
        paramA: {
          key: 'v0',
          label: "Boshlang'ich tezlik",
          unit: 'm/s',
          min: 1,
          max: 40,
          step: 1,
          value: 20,
        },
        paramB: {
          key: 'muk',
          label: 'Koeffitsiyent μk',
          unit: '',
          min: 0.02,
          max: 1,
          step: 0.01,
          value: 0.4,
        },
      },
    },
    {
      code: '2.6',
      slug: 'guk-qonuni',
      order: 6,
      titleUz: 'Guk qonuni',
      titleEn: "Hooke's law",
      difficulty: 'OSON',
      summary: "Elastik deformatsiyada qaytaruvchi kuchning cho'zilishga proporsionalligi.",
      keywords: ['Guk qonuni', 'prujina', 'bikrlik', 'deformatsiya', 'elastik kuch'],
      theory: `Guk qonuniga ko'ra, elastik deformatsiyada paydo bo'ladigan qaytaruvchi kuch deformatsiya kattaligiga to'g'ri proporsional va unga qarama-qarshi yo'nalgan. Formuladagi minus ishorasi aynan shu qarama-qarshilikni bildiradi: prujina cho'zilsa qisqarishga, siqilsa cho'zilishga intiladi.

Proporsionallik koeffitsiyenti bikrlik koeffitsiyenti deb ataladi va N/m da o'lchanadi. Bikrlik qanchalik katta bo'lsa, prujinani bir xil miqdorga cho'zish uchun shuncha ko'p kuch kerak bo'ladi.

Qonun faqat elastiklik chegarasigacha bajariladi. Deformatsiya juda katta bo'lsa, jism dastlabki shaklini tiklay olmaydi — plastik deformatsiya boshlanadi. Kuch-cho'zilish grafigi shu chegaragacha to'g'ri chiziq bo'ladi.

### Hayotiy misol
Avtomobil amortizatorlari, mexanik tarozilar va ruchka ichidagi prujina — barchasi Guk qonuni asosida ishlaydi.`,
      formulas: [
        { latex: 'F = -k x', label: 'Qaytaruvchi kuch' },
        { latex: 'k = \\frac{F}{x}', label: 'Bikrlik koeffitsiyenti' },
        { latex: 'E_p = \\frac{k x^2}{2}', label: 'Potensial energiya' },
        { latex: 'x_0 = \\frac{m g}{k}', label: 'Statik cho\u2018zilish' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 'F = -k x',
        paramA: {
          key: 'k',
          label: 'Bikrlik k',
          unit: 'N/m',
          min: 10,
          max: 500,
          step: 5,
          value: 100,
        },
        paramB: {
          key: 'x',
          label: "Cho'zilish x",
          unit: 'm',
          min: -0.5,
          max: 0.5,
          step: 0.01,
          value: 0.15,
        },
      },
    },
    {
      code: '2.7',
      slug: 'ogirlik-va-vazn',
      order: 7,
      titleUz: "Og'irlik va vazn",
      titleEn: 'Weight and apparent weight',
      difficulty: 'ORTA',
      summary: "Massa, og'irlik kuchi va tayanchga bosim farqi; liftdagi vazn o'zgarishi.",
      keywords: ['vazn', 'ogirlik kuchi', 'massa', 'lift', 'vaznsizlik', 'apparent weight'],
      theory: `Massa jismning inersiya o'lchovi bo'lib, joyga bog'liq emas. Og'irlik kuchi esa Yer tortishishi natijasida paydo bo'ladi va erkin tushish tezlanishiga bog'liq. Shuning uchun Oyda massa o'zgarmaydi, lekin og'irlik olti barobar kamayadi.

Vazn — bu jismning tayanchga yoki osma ipga ko'rsatadigan bosim kuchi. Tinch holatda u og'irlik kuchiga teng, lekin tezlanish paydo bo'lishi bilan farq qila boshlaydi.

Lift yuqoriga tezlanish bilan ko'tarilsa vazn ortadi, pastga tezlanish bilan tushsa kamayadi. Agar lift erkin tushsa, tayanch reaksiyasi nolga aylanadi va to'liq vaznsizlik holati vujudga keladi. Kosmonavtlarning orbitada suzib yurishi ham aynan shu sabab bilan izohlanadi.

### Hayotiy misol
Tez ko'tarilayotgan liftda tarozida turgan odam o'z og'irligidan kattaroq qiymatni ko'radi.`,
      formulas: [
        { latex: 'W = m g', label: "Og'irlik kuchi" },
        { latex: 'N = m(g + a)', label: 'Yuqoriga tezlanishda vazn' },
        { latex: 'N = m(g - a)', label: 'Pastga tezlanishda vazn' },
        { latex: 'N = 0', label: 'Vaznsizlik (a = g)' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: 'N = m(g + a)',
        paramA: { key: 'm', label: 'Massa m', unit: 'kg', min: 1, max: 150, step: 1, value: 70 },
        paramB: {
          key: 'a',
          label: 'Lift tezlanishi a',
          unit: 'm/s²',
          min: -9.8,
          max: 9.8,
          step: 0.1,
          value: 2,
        },
      },
    },
    {
      code: '2.8',
      slug: 'kuchlar-muvozanati',
      order: 8,
      titleUz: 'Kuchlar muvozanati',
      titleEn: 'Equilibrium of forces',
      difficulty: 'ORTA',
      summary: "Bir nuqtaga qo'yilgan kuchlar yig'indisi nolga teng bo'lish sharti.",
      keywords: ['muvozanat', 'natijaviy kuch', 'kuch poligoni', 'equilibrium'],
      theory: `Jism muvozanatda bo'lishi uchun unga qo'yilgan barcha kuchlarning vektor yig'indisi nolga teng bo'lishi kerak. Bu holda jism yo tinch turadi, yo tekis to'g'ri chiziqli harakatlanadi.

Amalda muvozanat shartini tekshirishning ikki yo'li bor. Birinchisi — grafik usul: kuch vektorlarini ketma-ket qo'ysak, ular yopiq ko'pburchak hosil qilishi kerak. Ikkinchisi — analitik usul: kuchlarni koordinata o'qlariga proyeksiyalab, har bir o'q bo'yicha yig'indini nolga tenglashtirish.

Uch kuch muvozanatda bo'lganda ular albatta bir tekislikda yotadi va uchburchak hosil qiladi. Natijaviy kuchni muvozanatlovchi kuch unga teng, lekin qarama-qarshi yo'nalgan bo'ladi.

### Hayotiy misol
Ikki ustunga tortilgan simda osilgan chiroq, ko'prik trosslari va arqon tortish o'yinidagi kuchlar — barchasi shu shart asosida hisoblanadi.`,
      formulas: [
        { latex: '\\sum \\vec{F} = 0', label: 'Muvozanat sharti' },
        { latex: '\\sum F_x = 0', label: 'x o\u2018qi bo\u2018yicha' },
        { latex: '\\sum F_y = 0', label: 'y o\u2018qi bo\u2018yicha' },
        { latex: 'F_R = \\sqrt{F_x^2 + F_y^2}', label: 'Natijaviy kuch' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: '\\sum \\vec{F} = 0',
        paramA: {
          key: 'F1',
          label: 'Birinchi kuch F1',
          unit: 'N',
          min: 0,
          max: 100,
          step: 1,
          value: 40,
        },
        paramB: {
          key: 'angle',
          label: 'Orasidagi burchak',
          unit: '°',
          min: 0,
          max: 180,
          step: 1,
          value: 90,
        },
      },
    },
  ],
};
