import type { SectionSeed } from './types';

const ACCENT = '#14B8A6';

export const optika: SectionSeed = {
  code: '12',
  slug: 'optika',
  order: 12,
  titleUz: 'Optika',
  titleEn: 'Optics',
  description:
    "Yorug'likning qaytishi va sinishi, ko'zgular, linzalar hamda to'lqin xossalari.",
  icon: 'lightbulb',
  color: ACCENT,
  topics: [
    {
      code: '12.1',
      slug: 'yoruglikning-togri-chiziqli-tarqalishi',
      order: 1,
      titleUz: "Yorug'likning to'g'ri chiziqli tarqalishi",
      titleEn: 'Rectilinear propagation of light',
      difficulty: 'OSON',
      summary: "Nur tushunchasi, soya va yarim soya hosil bo'lishi.",
      keywords: ['nur', 'soya', 'yarim soya', 'tutilish', 'yorugllik tezligi'],
      theory: `Bir jinsli muhitda yorug'lik to'g'ri chiziq bo'ylab tarqaladi. Shu sodda tasdiqdan geometrik optikaning butun binosi qurilgan.

Nur — yorug'lik tarqalish yo'nalishini ko'rsatuvchi chiziq. Bu matematik model: aslida yorug'lik to'lqin, lekin to'siqlar to'lqin uzunligidan ancha katta bo'lganda nur tasavvuri juda aniq natija beradi.

Nuqtaviy manba jism ortida aniq chegarali soya hosil qiladi. Manba o'lchamli bo'lsa, soya atrofida yarim soya paydo bo'ladi — u yerga yorug'likning bir qismi yetib boradi.

Yorug'lik tezligi vakuumda sekundiga 300 000 kilometrga yaqin va bu tabiatdagi eng katta tezlik.

### Hayotiy misol
Quyosh tutilishi aynan shu hodisa: Oy soyasi Yer yuzasiga tushadi. To'liq tutilish soya ichida, qisman tutilish yarim soyada kuzatiladi.`,
      formulas: [
        { latex: 'c = 3 \\times 10^8\\ \\text{m/s}', label: "Yorug'lik tezligi" },
        { latex: 'v = \\frac{c}{n}', label: 'Muhitdagi tezlik' },
        { latex: '\\frac{H}{h} = \\frac{L}{l}', label: 'Soya o\u2018lchami' },
        { latex: 't = \\frac{L}{c}', label: 'Tarqalish vaqti' },
      ],
      sim: {
        demoType: 'ray',
        accent: ACCENT,
        formula: 'v = \\frac{c}{n}',
        paramA: { key: 'alpha', label: 'Tushish burchagi', unit: '°', min: 0, max: 85, step: 1, value: 30 },
        paramB: { key: 'n', label: 'Sindirish ko\u2018rsatkichi', unit: '', min: 1, max: 2.4, step: 0.05, value: 1.5 },
      },
    },
    {
      code: '12.2',
      slug: 'yoruglikning-qaytishi',
      order: 2,
      titleUz: "Yorug'likning qaytish qonuni",
      titleEn: 'Law of reflection',
      difficulty: 'OSON',
      summary: "Tushish va qaytish burchaklarining tengligi hamda yassi ko'zgu.",
      keywords: ['qaytish', 'kozgu', 'tushish burchagi', 'mavhum tasvir'],
      theory: `Yorug'lik sirtga tushganda undan qaytadi. Qaytish qonuni ikki qismdan iborat: tushuvchi nur, qaytgan nur va normal bir tekislikda yotadi, hamda qaytish burchagi tushish burchagiga teng.

Burchaklar har doim normalga nisbatan o'lchanadi — sirtning o'ziga nisbatan emas. Bu boshlang'ich xato tez-tez uchraydi.

Sirt silliq bo'lsa, parallel nurlar parallel holda qaytadi va aks ettirish oynadagidek aniq bo'ladi. Sirt g'adir-budur bo'lsa, nurlar turli tomonga sochiladi — shu sabab devorda o'z aksingizni ko'rmaysiz.

Yassi ko'zgu mavhum tasvir beradi: u ko'zgu ortida, jismgacha bo'lgan masofada va jism bilan bir xil o'lchamda joylashadi.

### Hayotiy misol
Ko'zgudagi aksingiz o'ng va chapni almashtirgandek ko'rinadi, lekin aslida ko'zgu oldinni orqaga aylantiradi.`,
      formulas: [
        { latex: '\\alpha = \\beta', label: 'Qaytish qonuni' },
        { latex: 'd_{tasvir} = d_{jism}', label: 'Yassi ko\u2018zguda masofa' },
        { latex: 'H_{tasvir} = H_{jism}', label: 'Tasvir o\u2018lchami' },
        { latex: '\\Gamma = 1', label: 'Chiziqli kattalashtirish' },
      ],
      sim: {
        demoType: 'ray',
        accent: ACCENT,
        formula: '\\alpha = \\beta',
        paramA: { key: 'alpha', label: 'Tushish burchagi', unit: '°', min: 0, max: 85, step: 1, value: 45 },
        paramB: { key: 'n', label: 'Sindirish ko\u2018rsatkichi', unit: '', min: 1, max: 2.4, step: 0.05, value: 1 },
      },
    },
    {
      code: '12.3',
      slug: 'yoruglikning-sinishi',
      order: 3,
      titleUz: "Yorug'likning sinish qonuni",
      titleEn: 'Refraction and Snell law',
      difficulty: 'ORTA',
      summary: "Snellius qonuni va sindirish ko'rsatkichi.",
      keywords: ['sinish', 'Snellius', 'sindirish korsatkichi', 'optik zichlik'],
      theory: `Yorug'lik bir muhitdan boshqasiga o'tganda o'z yo'nalishini o'zgartiradi. Sabab — turli muhitlarda tarqalish tezligining farqi.

Snellius qonuniga ko'ra, tushish va sinish burchaklari sinuslarining nisbati o'zgarmas va muhitlarning sindirish ko'rsatkichlari nisbatiga teng.

Optik zichroq muhitga o'tganda nur normalga yaqinlashadi, kamroq zich muhitga o'tganda esa undan uzoqlashadi. Suvning sindirish ko'rsatkichi taxminan 1,33, oynaniki 1,5, olmosniki esa 2,42.

Sindirish ko'rsatkichi vakuumdagi va muhitdagi yorug'lik tezliklari nisbatiga teng, shuning uchun u har doim birdan katta.

Nur chegaraga tik tushsa, ya'ni tushish burchagi nolga teng bo'lsa, u umuman sinmaydi va yo'nalishini o'zgartirmaydi. Faqat tezligi o'zgaradi.

Yana bir muhim jihat: sinishda chastota o'zgarmaydi, chunki u manbaga bog'liq. O'zgaradigan narsa — tezlik va to'lqin uzunligi. Shuning uchun suv ostida ham qizil nur qizil bo'lib qolaveradi.

### Hayotiy misol
Suvga tushirilgan qoshiq singandek ko'rinadi. Hovuz ham aslida ko'ringanidan chuqurroq — shuning uchun chuqurlikni ko'z bilan chamalash xavfli.`,
      formulas: [
        { latex: '\\frac{\\sin\\alpha}{\\sin\\beta} = \\frac{n_2}{n_1}', label: 'Snellius qonuni' },
        { latex: 'n = \\frac{c}{v}', label: 'Sindirish ko\u2018rsatkichi' },
        { latex: 'n_1 \\sin\\alpha = n_2 \\sin\\beta', label: 'Simmetrik ko\u2018rinish' },
        { latex: 'n_{suv} \\approx 1{,}33', label: 'Suv uchun' },
      ],
      sim: {
        demoType: 'ray',
        accent: ACCENT,
        formula: 'n_1 \\sin\\alpha = n_2 \\sin\\beta',
        paramA: { key: 'alpha', label: 'Tushish burchagi', unit: '°', min: 0, max: 85, step: 1, value: 40 },
        paramB: { key: 'n', label: 'Sindirish ko\u2018rsatkichi n₂', unit: '', min: 1, max: 2.4, step: 0.05, value: 1.33 },
      },
    },
    {
      code: '12.4',
      slug: 'toliq-ichki-qaytish',
      order: 4,
      titleUz: "To'liq ichki qaytish",
      titleEn: 'Total internal reflection',
      difficulty: 'ORTA',
      summary: "Chegaraviy burchak va optik tolalar ishlash prinsipi.",
      keywords: ['toliq ichki qaytish', 'chegaraviy burchak', 'optik tola', 'olmos'],
      theory: `Yorug'lik optik zichroq muhitdan kamroq zich muhitga o'tayotganda sinish burchagi tushish burchagidan katta bo'ladi. Tushish burchagini oshirib borsak, bir paytda sinish burchagi to'qson darajaga yetadi.

Shu holatga mos tushish burchagi chegaraviy burchak deb ataladi. Undan katta burchaklarda yorug'lik umuman sinmaydi — hammasi qaytib ketadi. Bu to'liq ichki qaytish.

Chegaraviy burchak muhitlar sindirish ko'rsatkichlariga bog'liq. Suv-havo chegarasi uchun u taxminan 49 daraja, oyna-havo uchun 42 daraja.

Olmosda chegaraviy burchak juda kichik — atigi 24 daraja. Shuning uchun unga tushgan yorug'lik ichida ko'p marta qaytadi va tosh yaltiraydi.

### Hayotiy misol
Optik tolali aloqa shu hodisaga asoslangan: yorug'lik tola ichida minglab marta qaytib, yuzlab kilometrga deyarli yo'qotishsiz yetib boradi.`,
      formulas: [
        { latex: '\\sin\\alpha_0 = \\frac{n_2}{n_1}', label: 'Chegaraviy burchak' },
        { latex: '\\alpha > \\alpha_0', label: "To'liq qaytish sharti" },
        { latex: 'n_1 > n_2', label: 'Zarur shart' },
        { latex: '\\alpha_0 \\approx 49^\\circ', label: 'Suv-havo uchun' },
      ],
      sim: {
        demoType: 'ray',
        accent: ACCENT,
        formula: '\\sin\\alpha_0 = \\frac{n_2}{n_1}',
        paramA: { key: 'alpha', label: 'Tushish burchagi', unit: '°', min: 0, max: 85, step: 1, value: 60 },
        paramB: { key: 'n', label: 'Sindirish ko\u2018rsatkichi', unit: '', min: 1, max: 2.4, step: 0.05, value: 1.1 },
      },
    },
    {
      code: '12.5',
      slug: 'linzalar',
      order: 5,
      titleUz: 'Linzalar',
      titleEn: 'Lenses',
      difficulty: 'ORTA',
      summary: "Yig'uvchi va sochuvchi linzalar, fokus masofasi va optik kuch.",
      keywords: ['linza', 'fokus', 'optik kuch', 'dioptriya', 'yiguvchi', 'sochuvchi'],
      theory: `Linza — ikki sferik sirt bilan chegaralangan shaffof jism. Ikki turi bor: o'rtasi qalin yig'uvchi linza va o'rtasi yupqa sochuvchi linza.

Yig'uvchi linzaga parallel tushgan nurlar bir nuqtada — fokusda kesishadi. Sochuvchi linzada esa nurlar tarqalib ketadi va ularning davomi mavhum fokusda kesishadi.

Optik kuch fokus masofasiga teskari kattalik bo'lib, dioptriyada o'lchanadi. Yig'uvchi linza uchun u musbat, sochuvchi uchun manfiy.

Ko'zoynak tanlashda aynan shu qiymat ishlatiladi: uzoqni ko'ra olmaydiganlarga manfiy, yaqinni ko'ra olmaydiganlarga musbat linza beriladi.

Linza qanchalik qavariq bo'lsa, fokus masofasi shunchalik qisqa va optik kuchi shunchalik katta bo'ladi. Fokus masofasi linza materialining sindirish ko'rsatkichiga ham bog'liq: shisha o'rniga olmos ishlatilsa, xuddi shu shakldagi linza ancha kuchliroq bo'lardi.

Linzada uchta xarakterli nur bor va ular tasvirni yasashda ishlatiladi: optik markazdan sinmasdan o'tuvchi nur, bosh optik o'qqa parallel kelib fokusdan o'tuvchi nur va fokusdan kelib o'qqa parallel chiquvchi nur.

### Hayotiy misol
Lupa — oddiy yig'uvchi linza. Uni quyoshga tutsangiz, nurlar fokusda to'planib qog'ozni yondiradi.`,
      formulas: [
        { latex: 'D = \\frac{1}{F}', label: 'Optik kuch' },
        { latex: '[D] = \\text{dptr}', label: 'Dioptriya' },
        { latex: 'D > 0', label: 'Yig\u2018uvchi linza' },
        { latex: 'D < 0', label: 'Sochuvchi linza' },
      ],
      sim: {
        demoType: 'ray',
        accent: ACCENT,
        formula: 'D = \\frac{1}{F}',
        paramA: { key: 'alpha', label: 'Nur burchagi', unit: '°', min: 0, max: 85, step: 1, value: 25 },
        paramB: { key: 'n', label: 'Linza materiali n', unit: '', min: 1.3, max: 2, step: 0.05, value: 1.5 },
      },
    },
    {
      code: '12.6',
      slug: 'linza-formulasi',
      order: 6,
      titleUz: 'Linza formulasi va tasvir',
      titleEn: 'Thin lens equation',
      difficulty: 'QIYIN',
      summary: "Jism va tasvir masofalari, kattalashtirish, haqiqiy va mavhum tasvir.",
      keywords: ['linza formulasi', 'tasvir', 'kattalashtirish', 'haqiqiy tasvir', 'mavhum'],
      theory: `Yupqa linza formulasi jism masofasi, tasvir masofasi va fokus masofasini bog'laydi. Ularning teskari qiymatlari orasidagi bog'lanish juda ixcham.

Tasvir turi jismning fokusga nisbatan joylashuviga bog'liq. Jism ikkilangan fokusdan uzoqda bo'lsa, tasvir haqiqiy, teskari va kichraytirilgan bo'ladi — fotoapparat shunday ishlaydi.

Jism fokus va ikkilangan fokus orasida bo'lsa, tasvir haqiqiy, teskari va kattalashtirilgan bo'ladi. Proyektor aynan shu rejimda.

Jism fokusdan yaqinroq bo'lsa, tasvir mavhum, to'g'ri va kattalashtirilgan bo'ladi. Bu lupa rejimi.

Chiziqli kattalashtirish tasvir va jism masofalari nisbatiga teng.

### Hayotiy misol
Ko'z ham linza: gavhar shaklini o'zgartirib fokus masofasini sozlaydi va turli uzoqlikdagi narsalarni aniq ko'rsatadi.`,
      formulas: [
        { latex: '\\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f}', label: 'Linza formulasi' },
        { latex: '\\Gamma = \\frac{f}{d}', label: 'Chiziqli kattalashtirish' },
        { latex: '\\Gamma = \\frac{H}{h}', label: 'O\u2018lchamlar orqali' },
        { latex: 'd > 2F', label: 'Kichraytirilgan haqiqiy tasvir' },
        { latex: 'd < F', label: 'Kattalashtirilgan mavhum tasvir' },
      ],
      sim: {
        demoType: 'ray',
        accent: ACCENT,
        formula: '\\frac{1}{F} = \\frac{1}{d} + \\frac{1}{f}',
        paramA: { key: 'd', label: 'Jism masofasi d', unit: 'cm', min: 2, max: 100, step: 1, value: 30 },
        paramB: { key: 'F', label: 'Fokus masofasi F', unit: 'cm', min: 2, max: 50, step: 1, value: 10 },
      },
    },
    {
      code: '12.7',
      slug: 'yoruglik-dispersiyasi',
      order: 7,
      titleUz: "Yorug'lik dispersiyasi",
      titleEn: 'Dispersion of light',
      difficulty: 'ORTA',
      summary: "Oq yorug'likning spektrga ajralishi va rangin kamalak.",
      keywords: ['dispersiya', 'spektr', 'prizma', 'kamalak', 'tolqin uzunligi'],
      theory: `Sindirish ko'rsatkichi yorug'lik to'lqin uzunligiga bog'liq. Aynan shu bog'liqlik dispersiya deb ataladi.

Binafsha yorug'lik uchun sindirish ko'rsatkichi qizilnikidan kattaroq, shuning uchun prizmada binafsha nur kuchliroq buriladi. Natijada oq yorug'lik yetti xil rangga ajraladi.

Nyuton buni tajribada isbotladi: prizmadan chiqqan spektrni ikkinchi prizma orqali o'tkazib, yana oq yorug'lik oldi. Demak, ranglar prizmada paydo bo'lmaydi — ular oq yorug'lik ichida allaqachon bor edi.

Har bir rangga o'z to'lqin uzunligi mos keladi: qizil taxminan 700 nanometr, binafsha esa 400 nanometr atrofida.

### Hayotiy misol
Kamalak — havodagi suv tomchilarida sodir bo'ladigan dispersiya va to'liq ichki qaytishning birgalikdagi natijasi.`,
      formulas: [
        { latex: 'n = f(\\lambda)', label: 'Dispersiya' },
        { latex: 'n_{binafsha} > n_{qizil}', label: 'Burilish farqi' },
        { latex: '\\lambda_{qizil} \\approx 700\\ \\text{nm}', label: 'Qizil chegara' },
        { latex: '\\lambda_{binafsha} \\approx 400\\ \\text{nm}', label: 'Binafsha chegara' },
      ],
      sim: {
        demoType: 'ray',
        accent: ACCENT,
        formula: 'n = f(\\lambda)',
        paramA: { key: 'alpha', label: 'Tushish burchagi', unit: '°', min: 0, max: 85, step: 1, value: 35 },
        paramB: { key: 'n', label: 'Prizma n', unit: '', min: 1.3, max: 2, step: 0.01, value: 1.52 },
      },
    },
    {
      code: '12.8',
      slug: 'yoruglik-interferensiyasi',
      order: 8,
      titleUz: "Yorug'lik interferensiyasi",
      titleEn: 'Interference of light',
      difficulty: 'QIYIN',
      summary: "Yung tajribasi, yo'l farqi va yupqa pardalardagi ranglar.",
      keywords: ['interferensiya', 'Yung', 'yol farqi', 'kogerentlik', 'yupqa parda'],
      theory: `Interferensiya yorug'likning to'lqin tabiatini eng aniq isbotlaydi. Ikki kogerent to'lqin qo'shilganda ekranda yorug' va qorong'i yo'llar navbatlashadi.

Yung tajribasida yorug'lik ikki yupqa tirqishdan o'tkaziladi. Agar yorug'lik zarrachalar oqimi bo'lganda, ekranda ikkita yorug' chiziq ko'rinardi. Aslida esa ko'plab chiziqlar paydo bo'ladi.

Qaysi joyda yorug' chiziq bo'lishi yo'l farqiga bog'liq. Yo'l farqi butun sondagi to'lqin uzunligiga teng bo'lsa maksimum, yarim to'lqin uzunligining toq soniga teng bo'lsa minimum kuzatiladi.

Kogerentlik shart: to'lqinlar bir xil chastotali va doimiy faza farqiga ega bo'lishi kerak.

### Hayotiy misol
Suvdagi neft pardasi va sovun pufagining rangin tovlanishi — yupqa pardalardagi interferensiya.`,
      formulas: [
        { latex: '\\Delta = m\\lambda', label: 'Maksimum sharti' },
        { latex: '\\Delta = \\left(m + \\tfrac{1}{2}\\right)\\lambda', label: 'Minimum sharti' },
        { latex: '\\Delta x = \\frac{\\lambda L}{d}', label: 'Yo\u2018llar orasidagi masofa' },
        { latex: '\\Delta = \\frac{x d}{L}', label: 'Yo\u2018l farqi' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: '\\Delta x = \\frac{\\lambda L}{d}',
        paramA: { key: 'lambda', label: "To'lqin uzunligi λ", unit: 'nm', min: 380, max: 750, step: 5, value: 550 },
        paramB: { key: 'd', label: 'Tirqishlar orasi d', unit: 'μm', min: 10, max: 500, step: 5, value: 100 },
      },
    },
    {
      code: '12.9',
      slug: 'yoruglik-difraksiyasi',
      order: 9,
      titleUz: "Yorug'lik difraksiyasi",
      titleEn: 'Diffraction of light',
      difficulty: 'QIYIN',
      summary: "To'siq chetida yorug'likning egilishi va difraksion panjara.",
      keywords: ['difraksiya', 'panjara', 'tosiq', 'Gyuygens', 'spektr'],
      theory: `Difraksiya — yorug'likning to'siq chetida egilib, geometrik soya sohasiga kirishi. Bu ham to'lqin xossasi.

Effekt to'siq o'lchami to'lqin uzunligiga yaqinlashganda seziladi. Yorug'lik to'lqin uzunligi juda kichik bo'lgani uchun kundalik hayotda difraksiya deyarli ko'rinmaydi — shuning uchun soyalar aniq chegarali.

Difraksion panjara — ko'plab parallel tirqishlar. Undan o'tgan yorug'lik aniq burchaklarda maksimumlar beradi va bu burchaklar to'lqin uzunligiga bog'liq.

Shu sabab panjara spektral asbob sifatida ishlatiladi: u oq yorug'likni prizmadan ham aniqroq spektrga ajratadi.

### Hayotiy misol
CD diskining rangin tovlanishi — uning yuzasidagi mikroskopik yo'llar difraksion panjara vazifasini bajaradi.`,
      formulas: [
        { latex: 'd \\sin\\varphi = m\\lambda', label: 'Panjara formulasi' },
        { latex: 'd = \\frac{1}{N}', label: 'Panjara doimiysi' },
        { latex: 'm = 0, \\pm 1, \\pm 2 \\ldots', label: 'Maksimum tartibi' },
        { latex: '\\lambda = \\frac{d \\sin\\varphi}{m}', label: "To'lqin uzunligini topish" },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'd \\sin\\varphi = m\\lambda',
        paramA: { key: 'lambda', label: "To'lqin uzunligi λ", unit: 'nm', min: 380, max: 750, step: 5, value: 600 },
        paramB: { key: 'N', label: 'Panjara zichligi', unit: '1/mm', min: 100, max: 1200, step: 10, value: 500 },
      },
    },
    {
      code: '12.10',
      slug: 'yoruglik-polarizatsiyasi',
      order: 10,
      titleUz: "Yorug'lik polarizatsiyasi",
      titleEn: 'Polarisation of light',
      difficulty: 'QIYIN',
      summary: "Ko'ndalang to'lqin isboti, polyarizator va Malyus qonuni.",
      keywords: ['polarizatsiya', 'Malyus', 'polyarizator', 'kondalang tolqin'],
      theory: `Yorug'lik ko'ndalang elektromagnit to'lqin: elektr maydoni tarqalish yo'nalishiga perpendikulyar tebranadi. Oddiy yorug'likda bu tebranishlar barcha yo'nalishlarda tartibsiz sodir bo'ladi.

Polyarizator faqat bitta yo'nalishdagi tebranishlarni o'tkazadi. Undan chiqqan yorug'lik chiziqli polarizatsiyalangan bo'ladi va intensivligi ikki barobar kamayadi.

Ikkinchi polyarizator qo'yilsa, o'tgan yorug'lik intensivligi ular orasidagi burchak kosinusi kvadratiga proporsional bo'ladi — bu Malyus qonuni. Burchak to'qson daraja bo'lsa, yorug'lik butunlay to'xtaydi.

Polarizatsiya hodisasi yorug'lik bo'ylama emas, ko'ndalang to'lqin ekanini isbotlaydi: tovush kabi bo'ylama to'lqinni polarizatsiyalab bo'lmaydi.

### Hayotiy misol
Polarizatsion ko'zoynak suv va asfaltdan qaytgan yorqin nurni to'sadi, chunki bunday nur asosan polarizatsiyalangan bo'ladi.`,
      formulas: [
        { latex: 'I = I_0 \\cos^2\\varphi', label: 'Malyus qonuni' },
        { latex: 'I_1 = \\frac{I_0}{2}', label: 'Birinchi polyarizatordan keyin' },
        { latex: '\\varphi = 90^\\circ \\Rightarrow I = 0', label: 'To\u2018liq to\u2018sish' },
        { latex: '\\tan\\alpha_B = n', label: 'Bryuster burchagi' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'I = I_0 \\cos^2\\varphi',
        paramA: { key: 'phi', label: 'Burchak φ', unit: '°', min: 0, max: 90, step: 1, value: 45 },
        paramB: { key: 'I0', label: 'Boshlang\u2018ich intensivlik', unit: 'W/m²', min: 1, max: 100, step: 1, value: 50 },
      },
    },
  ],
};
