import type { SectionSeed } from './types';

const ACCENT = '#DB2777';

export const elektr: SectionSeed = {
  code: '11',
  slug: 'elektr-va-magnetizm',
  order: 11,
  titleUz: 'Elektr va magnetizm',
  titleEn: 'Electricity and magnetism',
  description:
    "Zaryadlar, elektr maydoni, tok qonunlari, magnit maydoni va elektromagnit induksiya.",
  icon: 'plug-zap',
  color: ACCENT,
  topics: [
    {
      code: '11.1',
      slug: 'kulon-qonuni',
      order: 1,
      titleUz: 'Elektr zaryadi va Kulon qonuni',
      titleEn: "Electric charge and Coulomb's law",
      difficulty: 'ORTA',
      summary: "Ikki nuqtaviy zaryad orasidagi o'zaro ta'sir kuchi.",
      keywords: ['zaryad', 'Kulon', 'kulon qonuni', 'elektrlanish', 'dielektrik'],
      theory: `Elektr zaryadi moddaning elektromagnit ta'sirlashuvdagi xossasi. U ikki xil bo'ladi: musbat va manfiy. Bir xil zaryadlar itariladi, turli xillari tortiladi.

Kulon qonuni ikki nuqtaviy zaryad orasidagi kuchni beradi. Tuzilishi Nyutonning tortishish qonuniga juda o'xshash: kuch zaryadlar ko'paytmasiga to'g'ri, masofa kvadratiga teskari proporsional.

Lekin ikki muhim farq bor. Birinchidan, elektr kuchi tortish ham, itarish ham bo'lishi mumkin. Ikkinchidan, u tortishish kuchidan beqiyos kuchli — ikki proton orasida elektr itarish gravitatsion tortishishdan 10³⁶ barobar katta.

Zaryadlar dielektrik muhitda joylashsa, kuch muhitning dielektrik singdiruvchanligi hisobiga kamayadi.

### Hayotiy misol
Sochni taroq bilan tarasangiz zaryadlanadi va tolalar bir-biridan qochadi — bir xil ishorali zaryadlar itariladi.`,
      formulas: [
        { latex: 'F = k \\frac{|q_1 q_2|}{r^2}', label: 'Kulon qonuni' },
        { latex: 'k = 9 \\times 10^9\\ \\text{N·m}^2/\\text{Cl}^2', label: 'Kulon doimiysi' },
        { latex: 'F = \\frac{|q_1 q_2|}{4\\pi\\varepsilon_0\\varepsilon r^2}', label: 'Muhitda' },
        { latex: 'q = n e', label: 'Zaryad diskretligi' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: 'F = k \\frac{|q_1 q_2|}{r^2}',
        paramA: { key: 'q', label: 'Zaryad q', unit: 'nCl', min: 1, max: 50, step: 1, value: 10 },
        paramB: { key: 'r', label: 'Masofa r', unit: 'cm', min: 1, max: 50, step: 1, value: 10 },
      },
    },
    {
      code: '11.2',
      slug: 'elektr-maydoni',
      order: 2,
      titleUz: 'Elektr maydoni',
      titleEn: 'Electric field',
      difficulty: 'ORTA',
      summary: "Maydon kuchlanganligi, maydon chiziqlari va superpozitsiya.",
      keywords: ['elektr maydoni', 'kuchlanganlik', 'maydon chiziqlari', 'superpozitsiya'],
      theory: `Zaryad atrofidagi fazo o'zgaradi: unga kiritilgan boshqa zaryadga kuch ta'sir qila boshlaydi. Bu fazoning holati elektr maydoni deb ataladi.

Maydonning kuch xarakteristikasi kuchlanganlik bo'lib, birlik musbat zaryadga ta'sir qiluvchi kuchga teng. U vektor kattalik: musbat zaryad atrofida undan tashqariga, manfiy zaryad atrofida esa unga tomon yo'nalgan.

Maydon chiziqlari maydonni ko'rsatishning qulay usuli. Ular hech qachon kesishmaydi, musbat zaryaddan boshlanib manfiyda tugaydi. Chiziqlar qanchalik zich bo'lsa, maydon shunchalik kuchli.

Bir necha zaryad bo'lsa, ularning maydonlari vektor sifatida qo'shiladi — bu superpozitsiya prinsipi.

### Hayotiy misol
Momaqaldiroq paytida bulut va yer orasida juda kuchli maydon paydo bo'ladi; havo teshilib, chaqmoq uriladi.`,
      formulas: [
        { latex: '\\vec{E} = \\frac{\\vec{F}}{q}', label: 'Kuchlanganlik ta\u2019rifi' },
        { latex: 'E = k \\frac{|q|}{r^2}', label: 'Nuqtaviy zaryad maydoni' },
        { latex: '\\vec{E} = \\sum \\vec{E}_i', label: 'Superpozitsiya' },
        { latex: 'F = qE', label: 'Maydondagi kuch' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: 'E = k \\frac{|q|}{r^2}',
        paramA: { key: 'q', label: 'Zaryad q', unit: 'nCl', min: 1, max: 40, step: 1, value: 12 },
        paramB: { key: 'd', label: 'Zaryadlar orasi', unit: 'cm', min: 2, max: 30, step: 1, value: 12 },
      },
    },
    {
      code: '11.3',
      slug: 'elektr-potensiali',
      order: 3,
      titleUz: 'Potensial va kuchlanish',
      titleEn: 'Electric potential and voltage',
      difficulty: 'ORTA',
      summary: "Maydonning energetik xarakteristikasi va ikki nuqta orasidagi kuchlanish.",
      keywords: ['potensial', 'kuchlanish', 'volt', 'ekvipotensial', 'maydon ishi'],
      theory: `Kuchlanganlik maydonni kuch orqali tavsiflaydi, potensial esa energiya orqali. Nuqtadagi potensial birlik musbat zaryadning shu nuqtadagi potensial energiyasiga teng.

Ikki nuqta orasidagi potensiallar farqi kuchlanish deb ataladi va voltda o'lchanadi. Aynan kuchlanish amalda ishlatiladi, chunki potensialning mutlaq qiymati tanlangan nol sathga bog'liq.

Elektr maydonining ishi faqat boshlang'ich va oxirgi nuqtalarga bog'liq, yo'lning shakliga esa bog'liq emas. Ya'ni elektrostatik maydon ham konservativ.

Ekvipotensial sirtlar — potensiali bir xil nuqtalar to'plami. Ular har doim maydon chiziqlariga perpendikulyar bo'ladi va bunday sirt bo'ylab ko'chirishda ish bajarilmaydi.

### Hayotiy misol
Rozetkadagi 220 volt — bu ikki teshik orasidagi potensiallar farqi, alohida bitta simning "o'z" potensiali emas.`,
      formulas: [
        { latex: '\\varphi = \\frac{W_p}{q}', label: 'Potensial' },
        { latex: 'U = \\varphi_1 - \\varphi_2', label: 'Kuchlanish' },
        { latex: 'A = qU', label: 'Maydon ishi' },
        { latex: 'E = \\frac{U}{d}', label: 'Bir jinsli maydonda' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: 'E = \\frac{U}{d}',
        paramA: { key: 'U', label: 'Kuchlanish U', unit: 'V', min: 1, max: 500, step: 1, value: 100 },
        paramB: { key: 'd', label: 'Masofa d', unit: 'cm', min: 1, max: 30, step: 0.5, value: 5 },
      },
    },
    {
      code: '11.4',
      slug: 'kondensatorlar',
      order: 4,
      titleUz: 'Kondensatorlar',
      titleEn: 'Capacitors',
      difficulty: 'ORTA',
      summary: "Sig'im, yassi kondensator va to'plangan energiya.",
      keywords: ['kondensator', 'sigim', 'farad', 'dielektrik', 'zaryad toplash'],
      theory: `Kondensator zaryad va energiya to'plash uchun mo'ljallangan qurilma. Eng sodda ko'rinishi — dielektrik bilan ajratilgan ikki o'tkazuvchi plastina.

Sig'im to'plangan zaryadning plastinalar orasidagi kuchlanishga nisbatiga teng va faradda o'lchanadi. Farad juda katta birlik, shuning uchun amalda mikro- va pikofaradlar ishlatiladi.

Yassi kondensator sig'imi plastinalar yuzasiga to'g'ri, ular orasidagi masofaga teskari proporsional. Orasiga dielektrik qo'yilsa, sig'im uning singdiruvchanligi barobar ortadi.

Kondensatordagi energiya maydon ichida saqlanadi va zaryadni juda tez chiqarish mumkin — batareya bunday qila olmaydi.

### Hayotiy misol
Fotoapparat chaqnog'i kondensatorda energiya to'playdi va uni bir necha millisekundda chiqaradi.`,
      formulas: [
        { latex: 'C = \\frac{q}{U}', label: 'Sig\u2018im' },
        { latex: 'C = \\frac{\\varepsilon\\varepsilon_0 S}{d}', label: 'Yassi kondensator' },
        { latex: 'W = \\frac{C U^2}{2}', label: 'To\u2018plangan energiya' },
        { latex: 'W = \\frac{q^2}{2C}', label: 'Zaryad orqali' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: 'W = \\frac{C U^2}{2}',
        paramA: { key: 'C', label: 'Sig\u2018im C', unit: 'μF', min: 1, max: 1000, step: 1, value: 100 },
        paramB: { key: 'U', label: 'Kuchlanish U', unit: 'V', min: 1, max: 400, step: 1, value: 12 },
      },
    },
    {
      code: '11.5',
      slug: 'elektr-toki',
      order: 5,
      titleUz: 'Elektr toki va tok kuchi',
      titleEn: 'Electric current',
      difficulty: 'OSON',
      summary: "Zaryadlarning tartibli harakati va uni o'lchash.",
      keywords: ['tok', 'tok kuchi', 'amper', 'zaryad', 'otkazgich'],
      theory: `Elektr toki — erkin zaryadlangan zarrachalarning tartibli harakati. Metallarda bu erkin elektronlar, elektrolitlarda esa ionlar.

Tok kuchi ko'ndalang kesim orqali vaqt birligida o'tgan zaryadga teng va amperda o'lchanadi. Bir amper — sekundiga bir kulon.

Qiziq jihat: elektronlarning o'rtacha siljish tezligi juda kichik, soatiga bir necha metr. Lekin chiroq kalit bosilishi bilan yonadi, chunki elektr maydoni butun sim bo'ylab deyarli yorug'lik tezligida tarqaladi va hamma joydagi elektronlar bir vaqtda qo'zg'aladi.

Tarixiy sabab bilan tok yo'nalishi musbat zaryadlar harakati tomoni deb qabul qilingan, garchi metalda elektronlar teskari tomonga harakatlansa ham.

### Hayotiy misol
Suv quvuridagi oqimga o'xshatish qulay: tok kuchi — sekundiga o'tayotgan suv miqdori.`,
      formulas: [
        { latex: 'I = \\frac{q}{t}', label: 'Tok kuchi' },
        { latex: 'q = I t', label: "O'tgan zaryad" },
        { latex: 'I = q n S v', label: 'Mikroskopik ko\u2018rinish' },
        { latex: '1\\ \\text{A} = 1\\ \\text{Cl/s}', label: 'Birlik' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: 'I = \\frac{q}{t}',
        paramA: { key: 'q', label: 'Zaryad q', unit: 'Cl', min: 0.1, max: 50, step: 0.1, value: 5 },
        paramB: { key: 't', label: 'Vaqt t', unit: 's', min: 0.1, max: 60, step: 0.1, value: 5 },
      },
    },
    {
      code: '11.6',
      slug: 'om-qonuni',
      order: 6,
      titleUz: 'Om qonuni',
      titleEn: "Ohm's law",
      difficulty: 'OSON',
      summary: "Tok kuchi, kuchlanish va qarshilik orasidagi asosiy bog'lanish.",
      keywords: ['Om qonuni', 'qarshilik', 'om', 'kuchlanish', 'volt-amper'],
      theory: `Om qonuniga ko'ra, o'tkazgich uchastkasidagi tok kuchi kuchlanishga to'g'ri, qarshilikka teskari proporsional.

Qarshilik o'tkazgichning tokka qarshilik ko'rsatish xossasi bo'lib, omda o'lchanadi. U o'tkazgich uzunligiga to'g'ri, ko'ndalang kesim yuzasiga teskari proporsional. Materialning o'zi solishtirma qarshilik bilan tavsiflanadi.

Metallarda qarshilik temperatura ortishi bilan ortadi: iliq atomlar kuchliroq tebranib, elektronlar yo'lini ko'proq to'sadi.

Om qonuni barcha moddalar uchun emas, faqat metall va elektrolitlar kabi chiziqli elementlar uchun o'rinli. Yarimo'tkazgich diodda volt-amper tavsifi umuman chiziqli emas.

### Hayotiy misol
Uzun uzaytirgichda chiroq biroz xira yonadi: simning qarshiligi uzunlik bilan ortadi va kuchlanishning bir qismi unda yo'qoladi.`,
      formulas: [
        { latex: 'I = \\frac{U}{R}', label: 'Om qonuni' },
        { latex: 'R = \\frac{\\rho l}{S}', label: "O'tkazgich qarshiligi" },
        { latex: 'R = R_0 (1 + \\alpha \\Delta T)', label: 'Temperatura bog\u2018liqligi' },
        { latex: 'I = \\frac{\\varepsilon}{R + r}', label: 'To\u2018liq zanjir uchun' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: 'I = \\frac{U}{R}',
        paramA: { key: 'U', label: 'Kuchlanish U', unit: 'V', min: 1, max: 240, step: 1, value: 12 },
        paramB: { key: 'R', label: 'Qarshilik R', unit: 'Ω', min: 1, max: 500, step: 1, value: 10 },
      },
    },
    {
      code: '11.7',
      slug: 'ketma-ket-va-parallel-ulanish',
      order: 7,
      titleUz: 'Ketma-ket va parallel ulanish',
      titleEn: 'Series and parallel circuits',
      difficulty: 'ORTA',
      summary: "Qarshiliklarni ulash usullari va umumiy qarshilik.",
      keywords: ['ketma-ket', 'parallel', 'umumiy qarshilik', 'zanjir', 'tok taqsimoti'],
      theory: `Ketma-ket ulanishda elementlar bittadan keyin ikkinchisi joylashadi va tok ular orqali bir xil o'tadi. Kuchlanish esa qarshiliklarga proporsional taqsimlanadi, umumiy qarshilik oddiy yig'indiga teng.

Parallel ulanishda barcha elementlar bir xil kuchlanish ostida bo'ladi, tok esa ular orasida taqsimlanadi. Umumiy qarshilikning teskari qiymati alohida qarshiliklarning teskari qiymatlari yig'indisiga teng.

Muhim natija: parallel ulaganda umumiy qarshilik eng kichik qarshilikdan ham kichik bo'ladi, chunki tokka qo'shimcha yo'l ochiladi.

Aynan shu sabab uydagi rozetkalar parallel ulanadi: har bir qurilma bir xil 220 volt oladi va biri o'chsa boshqalari ishlayveradi.

### Hayotiy misol
Eski archa girlandalarida lampalar ketma-ket ulangan edi — bittasi kuysa, butun gulchambar o'chardi.`,
      formulas: [
        { latex: 'R = R_1 + R_2 + \\ldots', label: 'Ketma-ket' },
        { latex: '\\frac{1}{R} = \\frac{1}{R_1} + \\frac{1}{R_2}', label: 'Parallel' },
        { latex: 'I = I_1 = I_2', label: 'Ketma-ketda tok' },
        { latex: 'U = U_1 = U_2', label: 'Parallelda kuchlanish' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: '\\frac{1}{R} = \\frac{1}{R_1} + \\frac{1}{R_2}',
        paramA: { key: 'R1', label: 'Qarshilik R₁', unit: 'Ω', min: 1, max: 200, step: 1, value: 20 },
        paramB: { key: 'R2', label: 'Qarshilik R₂', unit: 'Ω', min: 1, max: 200, step: 1, value: 30 },
      },
    },
    {
      code: '11.8',
      slug: 'tok-ishi-va-quvvati',
      order: 8,
      titleUz: 'Tok ishi va quvvati',
      titleEn: 'Electric power and Joule heating',
      difficulty: 'OSON',
      summary: "Elektr energiyasining ishga aylanishi va Joul-Lens qonuni.",
      keywords: ['tok quvvati', 'Joul-Lens', 'elektr energiya', 'kilovatt-soat'],
      theory: `Elektr toki ish bajaradi: chiroqni yoritadi, dvigatelni aylantiradi, isitgichni qizdiradi. Bajarilgan ish kuchlanish, tok kuchi va vaqt ko'paytmasiga teng.

Quvvat ish bajarish tezligini ko'rsatadi va kuchlanish bilan tok kuchining ko'paytmasiga teng. Om qonunidan foydalanib uni faqat tok yoki faqat kuchlanish orqali ham yozish mumkin.

Joul-Lens qonuniga ko'ra, o'tkazgichda ajralgan issiqlik tok kuchi kvadratiga proporsional. Aynan shu sabab yuqori kuchlanishli elektr uzatish liniyalari ishlatiladi: bir xil quvvatda kuchlanish qanchalik yuqori bo'lsa, tok shunchalik kichik va yo'qotish shuncha kam bo'ladi.

Kommunal hisob-kitobda kilovatt-soat ishlatiladi — bu quvvat emas, energiya birligi.

### Hayotiy misol
2000 vattli choynak 6 daqiqada taxminan 0,2 kVt·soat energiya sarflaydi.`,
      formulas: [
        { latex: 'A = U I t', label: 'Tok ishi' },
        { latex: 'P = U I', label: 'Quvvat' },
        { latex: 'P = I^2 R = \\frac{U^2}{R}', label: 'Muqobil ko\u2018rinishlar' },
        { latex: 'Q = I^2 R t', label: 'Joul-Lens qonuni' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: 'P = U I',
        paramA: { key: 'U', label: 'Kuchlanish U', unit: 'V', min: 1, max: 240, step: 1, value: 220 },
        paramB: { key: 'I', label: 'Tok kuchi I', unit: 'A', min: 0.1, max: 20, step: 0.1, value: 5 },
      },
    },
    {
      code: '11.9',
      slug: 'magnit-maydoni',
      order: 9,
      titleUz: 'Magnit maydoni',
      titleEn: 'Magnetic field',
      difficulty: 'ORTA',
      summary: "Tok atrofidagi magnit maydoni va induksiya vektori.",
      keywords: ['magnit maydoni', 'induksiya', 'tesla', 'burgichoq qoidasi', 'solenoid'],
      theory: `Magnit maydoni harakatlanuvchi zaryadlar, ya'ni tok atrofida hosil bo'ladi. Tinch turgan zaryad faqat elektr maydoni beradi, harakatlangani esa magnit maydonini ham.

Maydonning kuch xarakteristikasi magnit induksiyasi bo'lib, teslada o'lchanadi. U vektor kattalik.

Maydon yo'nalishini burg'ichoq qoidasi bilan aniqlash mumkin: o'ng qo'l bosh barmog'i tok yo'nalishini ko'rsatsa, qolgan barmoqlar maydon chiziqlari yo'nalishini beradi.

Muhim farq: magnit maydon chiziqlari yopiq, ularning boshi ham, oxiri ham yo'q. Elektr maydonidan farqli o'laroq alohida magnit qutbi mavjud emas — magnitni bo'lsangiz, ikkita to'liq magnit hosil bo'ladi.

Solenoid ichida maydon deyarli bir jinsli bo'ladi.

### Hayotiy misol
Kompas strelkasi Yerning magnit maydoni bo'ylab yo'naladi. Yer aslida ulkan magnit.`,
      formulas: [
        { latex: 'B = \\frac{\\mu_0 I}{2\\pi r}', label: 'To\u2018g\u2018ri tok maydoni' },
        { latex: 'B = \\mu_0 n I', label: 'Solenoid ichida' },
        { latex: '\\mu_0 = 4\\pi \\times 10^{-7}', label: 'Magnit doimiysi' },
        { latex: '\\Phi = B S \\cos\\alpha', label: 'Magnit oqimi' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: 'B = \\frac{\\mu_0 I}{2\\pi r}',
        paramA: { key: 'I', label: 'Tok kuchi I', unit: 'A', min: 0.1, max: 50, step: 0.1, value: 10 },
        paramB: { key: 'r', label: 'Masofa r', unit: 'cm', min: 1, max: 50, step: 1, value: 5 },
      },
    },
    {
      code: '11.10',
      slug: 'amper-kuchi',
      order: 10,
      titleUz: 'Amper kuchi',
      titleEn: 'Ampere force',
      difficulty: 'ORTA',
      summary: "Magnit maydonidagi tokli o'tkazgichga ta'sir qiluvchi kuch.",
      keywords: ['Amper kuchi', 'chap qol qoidasi', 'elektr dvigatel', 'ramka'],
      theory: `Magnit maydoniga joylashtirilgan tokli o'tkazgichga kuch ta'sir qiladi. U Amper kuchi deb ataladi va tok kuchi, o'tkazgich uzunligi, magnit induksiyasi hamda ular orasidagi burchak sinusiga bog'liq.

Kuch yo'nalishi chap qo'l qoidasi bilan aniqlanadi: maydon chiziqlari kaftga kirsa, to'rt barmoq tok yo'nalishini ko'rsatsa, katta barmoq kuch yo'nalishini beradi.

Muhim jihat: kuch har doim o'tkazgichga ham, maydonga ham perpendikulyar. O'tkazgich maydon bo'ylab joylashsa, kuch nolga aylanadi.

Magnit maydonidagi tokli ramkaga juft kuch ta'sir qiladi va uni aylantiradi. Aynan shu elektr dvigatelining asosi.

### Hayotiy misol
Har qanday elektr dvigatel — mikserdan tortib elektromobilgacha — Amper kuchi hisobiga aylanadi.`,
      formulas: [
        { latex: 'F = B I l \\sin\\alpha', label: 'Amper kuchi' },
        { latex: 'F = B I l', label: 'Perpendikulyar holatda' },
        { latex: 'M = B I S \\sin\\alpha', label: 'Ramkaga moment' },
        { latex: 'F = 0', label: 'Tok maydon bo\u2018ylab bo\u2018lsa' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: 'F = B I l \\sin\\alpha',
        paramA: { key: 'I', label: 'Tok kuchi I', unit: 'A', min: 0.1, max: 30, step: 0.1, value: 5 },
        paramB: { key: 'alpha', label: 'Burchak α', unit: '°', min: 0, max: 90, step: 1, value: 90 },
      },
    },
    {
      code: '11.11',
      slug: 'lorens-kuchi',
      order: 11,
      titleUz: 'Lorens kuchi',
      titleEn: 'Lorentz force',
      difficulty: 'QIYIN',
      summary: "Magnit maydonida harakatlanayotgan zaryadga ta'sir qiluvchi kuch.",
      keywords: ['Lorens kuchi', 'zaryad harakati', 'siklotron', 'aylana traektoriya'],
      theory: `Magnit maydonida harakatlanayotgan alohida zaryadga Lorens kuchi ta'sir qiladi. U zaryad, tezlik, magnit induksiyasi va ular orasidagi burchak sinusiga proporsional.

Eng muhim xossa: Lorens kuchi har doim tezlikka perpendikulyar. Demak u hech qachon ish bajarmaydi va zaryad tezligini o'zgartira olmaydi — faqat yo'nalishini buradi.

Natijada zaryad maydonga perpendikulyar kirsa, aylana bo'ylab harakatlanadi. Aylana radiusi zaryad impulsiga to'g'ri, maydon induksiyasiga teskari proporsional.

Agar tezlik maydon bilan burchak hosil qilsa, traektoriya spiral shaklida bo'ladi.

### Hayotiy misol
Quyoshdan kelgan zaryadlangan zarrachalar Yerning magnit maydoni bilan buriladi va qutblarga yo'naladi — shimoliy shafaq shundan.`,
      formulas: [
        { latex: 'F = |q| v B \\sin\\alpha', label: 'Lorens kuchi' },
        { latex: 'r = \\frac{m v}{|q| B}', label: 'Aylana radiusi' },
        { latex: 'T = \\frac{2\\pi m}{|q| B}', label: 'Aylanish davri' },
        { latex: 'A = 0', label: 'Ish bajarmaydi' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: 'r = \\frac{m v}{|q| B}',
        paramA: { key: 'v', label: 'Tezlik v', unit: '×10⁶ m/s', min: 0.1, max: 20, step: 0.1, value: 5 },
        paramB: { key: 'B', label: 'Induksiya B', unit: 'mT', min: 1, max: 500, step: 1, value: 50 },
      },
    },
    {
      code: '11.12',
      slug: 'elektromagnit-induksiya',
      order: 12,
      titleUz: 'Elektromagnit induksiya',
      titleEn: 'Electromagnetic induction',
      difficulty: 'QIYIN',
      summary: "O'zgaruvchan magnit oqimidan tok hosil bo'lishi va Lens qoidasi.",
      keywords: ['induksiya', 'Faradey', 'Lens qoidasi', 'magnit oqimi', 'generator'],
      theory: `Faradey kashf qildiki, kontur orqali o'tayotgan magnit oqimi o'zgarsa, unda elektr yurituvchi kuch paydo bo'ladi. Bu elektromagnit induksiya hodisasi.

Muhim shart — aynan o'zgarish. Qo'zg'almas magnit yonidagi qo'zg'almas g'altakda hech qanday tok bo'lmaydi, magnitni qimirlatish bilanoq tok paydo bo'ladi.

Induksiya EYK magnit oqimining o'zgarish tezligiga teng. Formuladagi minus ishorasi Lens qoidasini ifodalaydi: induksion tok o'zini vujudga keltirgan sababga qarshilik ko'rsatadigan tomonga yo'naladi.

Lens qoidasi aslida energiya saqlanish qonunining ko'rinishi. Aks holda magnitni surish o'z-o'zidan tezlashib, energiya yo'qdan paydo bo'lardi.

### Hayotiy misol
Barcha elektr stansiyalarida generator shu prinsipda ishlaydi: magnit maydonida g'altak aylanadi va tok hosil bo'ladi.`,
      formulas: [
        { latex: '\\varepsilon = -\\frac{\\Delta\\Phi}{\\Delta t}', label: 'Faradey qonuni' },
        { latex: '\\Phi = B S \\cos\\alpha', label: 'Magnit oqimi' },
        { latex: '\\varepsilon = B l v', label: 'Harakatlanuvchi o\u2018tkazgichda' },
        { latex: '\\varepsilon = -N \\frac{\\Delta\\Phi}{\\Delta t}', label: 'N o\u2018ramli g\u2018altakda' },
      ],
      sim: {
        demoType: 'field',
        accent: ACCENT,
        formula: '\\varepsilon = B l v',
        paramA: { key: 'B', label: 'Induksiya B', unit: 'mT', min: 1, max: 500, step: 1, value: 100 },
        paramB: { key: 'v', label: 'Tezlik v', unit: 'm/s', min: 0.1, max: 20, step: 0.1, value: 2 },
      },
    },
  ],
};
