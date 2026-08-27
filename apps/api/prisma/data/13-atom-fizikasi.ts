import type { SectionSeed } from './types';

const ACCENT = '#65A30D';

export const atomFizikasi: SectionSeed = {
  code: '13',
  slug: 'atom-va-yadro-fizikasi',
  order: 13,
  titleUz: 'Atom va yadro fizikasi',
  titleEn: 'Atomic and nuclear physics',
  description:
    "Fotoeffekt, kvantlar, Bor modeli, radioaktivlik va yadro reaksiyalari.",
  icon: 'atom',
  color: ACCENT,
  topics: [
    {
      code: '13.1',
      slug: 'yoruglik-kvantlari',
      order: 1,
      titleUz: "Yorug'lik kvantlari",
      titleEn: 'Light quanta',
      difficulty: 'ORTA',
      summary: "Foton energiyasi, Plank doimiysi va yorug'likning ikkiyoqlama tabiati.",
      keywords: ['foton', 'kvant', 'Plank doimiysi', 'energiya', 'ikkiyoqlama tabiat'],
      theory: `Yorug'lik uzluksiz oqim emas — u alohida porsiyalar, kvantlar ko'rinishida uzatiladi. Har bir kvant foton deb ataladi.

Foton energiyasi chastotaga to'g'ri proporsional. Proporsionallik koeffitsiyenti Plank doimiysi bo'lib, u butun kvant fizikasining asosiy sonlaridan biri.

Demak, binafsha yorug'lik fotoni qizil yorug'lik fotonidan energetikroq. Bu oddiy tasdiq ko'plab hodisalarni tushuntiradi — nima uchun ultrabinafsha nur terini kuydiradi, oddiy qizil chiroq esa yo'q.

Foton massaga ega emas, lekin impulsi bor va har doim yorug'lik tezligi bilan harakatlanadi.

Yorug'lik ham to'lqin, ham zarracha xossalarini namoyon qiladi. Bu ziddiyat emas — shunchaki klassik tasavvurlarimiz mikrodunyoga to'liq mos kelmaydi.

### Hayotiy misol
Quyoshda qorayish ultrabinafsha fotonlar hisobiga: ularning har biri teri molekulasini o'zgartirishga yetarli energiyaga ega.`,
      formulas: [
        { latex: 'E = h\\nu', label: 'Foton energiyasi' },
        { latex: 'h = 6{,}63 \\times 10^{-34}\\ \\text{J·s}', label: 'Plank doimiysi' },
        { latex: 'E = \\frac{hc}{\\lambda}', label: "To'lqin uzunligi orqali" },
        { latex: 'p = \\frac{h}{\\lambda}', label: 'Foton impulsi' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'E = \\frac{hc}{\\lambda}',
        paramA: { key: 'lambda', label: "To'lqin uzunligi λ", unit: 'nm', min: 100, max: 1000, step: 10, value: 500 },
        paramB: { key: 'N', label: 'Fotonlar oqimi', unit: '×10¹⁵ 1/s', min: 1, max: 100, step: 1, value: 20 },
      },
    },
    {
      code: '13.2',
      slug: 'fotoeffekt',
      order: 2,
      titleUz: 'Fotoeffekt',
      titleEn: 'Photoelectric effect',
      difficulty: 'QIYIN',
      summary: "Yorug'lik ta'sirida elektronlarning uchib chiqishi va Eynshteyn tenglamasi.",
      keywords: ['fotoeffekt', 'Eynshteyn', 'chiqish ishi', 'qizil chegara', 'fotoelement'],
      theory: `Metall sirtiga yorug'lik tushganda undan elektronlar uchib chiqadi. Bu hodisa klassik to'lqin nazariyasiga zid natijalar berdi.

Tajriba shuni ko'rsatdiki, elektronlarning maksimal kinetik energiyasi yorug'lik yorqinligiga umuman bog'liq emas — faqat chastotaga bog'liq. Yorqinlikni oshirsak, elektronlar soni ortadi, tezligi esa o'zgarmaydi.

Bundan ham g'alati narsa: chastota ma'lum chegaradan past bo'lsa, qanchalik yorqin nur tushirsangiz ham hech qanday elektron chiqmaydi.

Eynshteyn buni kvantlar bilan tushuntirdi. Har bir elektron bitta fotonni yutadi. Foton energiyasining bir qismi metalldan chiqish ishiga sarflanadi, qolgani kinetik energiyaga aylanadi. Foton energiyasi chiqish ishidan kam bo'lsa, elektron umuman chiqa olmaydi.

### Hayotiy misol
Quyosh batareyalari va avtomatik eshiklardagi fotoelementlar shu hodisaga asoslangan.`,
      formulas: [
        { latex: 'h\\nu = A_{chiqish} + \\frac{m v^2}{2}', label: 'Eynshteyn tenglamasi' },
        { latex: '\\nu_0 = \\frac{A_{chiqish}}{h}', label: 'Qizil chegara chastotasi' },
        { latex: '\\lambda_0 = \\frac{hc}{A_{chiqish}}', label: 'Qizil chegara' },
        { latex: 'E_{k,max} = h\\nu - A', label: 'Maksimal kinetik energiya' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'h\\nu = A + E_k',
        paramA: { key: 'lambda', label: "To'lqin uzunligi λ", unit: 'nm', min: 100, max: 800, step: 10, value: 400 },
        paramB: { key: 'A', label: 'Chiqish ishi A', unit: 'eV', min: 1, max: 6, step: 0.1, value: 2.3 },
      },
    },
    {
      code: '13.3',
      slug: 'bor-atom-modeli',
      order: 3,
      titleUz: 'Bor atom modeli',
      titleEn: 'Bohr model of the atom',
      difficulty: 'QIYIN',
      summary: "Statsionar orbitalar, energetik sathlar va kvant sakrashlar.",
      keywords: ['Bor', 'atom modeli', 'statsionar orbita', 'energetik sath', 'vodorod'],
      theory: `Klassik fizikaga ko'ra, yadro atrofida aylanayotgan elektron nurlanib energiya yo'qotishi va yadroga tushishi kerak edi. Lekin atomlar barqaror.

Bor ikki postulat kiritdi. Birinchisi: elektron faqat aniq orbitalarda harakatlana oladi va bu statsionar holatlarda umuman nurlanmaydi. Ikkinchisi: nurlanish faqat bir orbitadan boshqasiga sakraganda sodir bo'ladi.

Chiqarilgan foton energiyasi ikki sath energiyalari ayirmasiga teng. Aynan shu sabab atomlar uzluksiz emas, chiziqli spektr beradi.

Vodorod atomi uchun energetik sathlar formulasi juda sodda: energiya bosh kvant sonining kvadratiga teskari proporsional. Asosiy holat energiyasi manfiy 13,6 elektron-volt.

Model faqat vodorod uchun aniq ishlaydi, lekin kvant fizikasi tomon birinchi qadam bo'ldi.

### Hayotiy misol
Neon lampalarning rangi aynan shu sakrashlar bilan belgilanadi — har bir gaz o'z spektriga ega.`,
      formulas: [
        { latex: 'h\\nu = E_n - E_m', label: 'Bor ikkinchi postulati' },
        { latex: 'E_n = -\\frac{13{,}6}{n^2}\\ \\text{eV}', label: 'Vodorod sathlari' },
        { latex: 'm v r = n \\frac{h}{2\\pi}', label: 'Kvantlanish sharti' },
        { latex: 'n = 1, 2, 3 \\ldots', label: 'Bosh kvant soni' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'E_n = -\\frac{13{,}6}{n^2}',
        paramA: { key: 'n', label: 'Kvant soni n', unit: '', min: 1, max: 7, step: 1, value: 2 },
        paramB: { key: 'Z', label: 'Yadro zaryadi Z', unit: '', min: 1, max: 10, step: 1, value: 1 },
      },
    },
    {
      code: '13.4',
      slug: 'atom-spektrlari',
      order: 4,
      titleUz: 'Atom spektrlari',
      titleEn: 'Atomic spectra',
      difficulty: 'ORTA',
      summary: "Chiqarish va yutish spektrlari hamda spektral tahlil.",
      keywords: ['spektr', 'spektral tahlil', 'Balmer', 'yutish', 'chiqarish'],
      theory: `Har bir kimyoviy element o'ziga xos spektr beradi. Bu spektr elementning barmoq izi kabi — takrorlanmaydi.

Chiqarish spektri qizdirilgan gazdan olinadi: qorong'i fonda yorug' chiziqlar ko'rinadi. Yutish spektri esa aksincha — uzluksiz spektr gaz orqali o'tkazilsa, aynan o'sha joylarda qorong'i chiziqlar paydo bo'ladi.

Qiziq muvofiqlik: element qaysi chastotalarni chiqara olsa, aynan o'shalarni yutadi ham.

Vodorod uchun ko'rinuvchi sohadagi chiziqlar Balmer seriyasini tashkil qiladi.

Spektral tahlil astronomiyaning eng kuchli vositasi. Yulduzga borib namuna olib bo'lmaydi, lekin uning spektri tarkibini aniq aytib beradi. Geliy avval Quyosh spektrida topilib, keyin Yerdan izlab topilgan.

### Hayotiy misol
Ko'chalardagi natriy lampalari sariq nur beradi — bu natriyning xarakterli spektral chizig'i.`,
      formulas: [
        {
          latex: '\\frac{1}{\\lambda} = R\\left(\\frac{1}{m^2} - \\frac{1}{n^2}\\right)',
          label: 'Balmer-Ridberg formulasi',
        },
        { latex: 'R = 1{,}097 \\times 10^7\\ \\text{m}^{-1}', label: 'Ridberg doimiysi' },
        { latex: 'm = 2', label: 'Balmer seriyasi' },
        { latex: 'h\\nu = E_n - E_m', label: 'Chiziq energiyasi' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: '\\frac{1}{\\lambda} = R\\left(\\frac{1}{4} - \\frac{1}{n^2}\\right)',
        paramA: { key: 'n', label: 'Yuqori sath n', unit: '', min: 3, max: 10, step: 1, value: 3 },
        paramB: { key: 'm', label: 'Quyi sath m', unit: '', min: 1, max: 5, step: 1, value: 2 },
      },
    },
    {
      code: '13.5',
      slug: 'de-broyl-tolqinlari',
      order: 5,
      titleUz: "De-Broyl to'lqinlari",
      titleEn: 'De Broglie waves',
      difficulty: 'QIYIN',
      summary: "Zarrachalarning to'lqin xossalari va korpuskulyar-to'lqin dualizmi.",
      keywords: ['de-Broyl', 'dualizm', 'elektron difraksiyasi', 'tolqin uzunligi'],
      theory: `Agar yorug'lik zarracha xossalarini ko'rsata olsa, zarrachalar to'lqin xossalarini ko'rsata olmaydimi? De-Broyl aynan shu savolni berdi.

Uning gipotezasiga ko'ra, har qanday harakatlanuvchi zarracha bilan to'lqin bog'langan. To'lqin uzunligi Plank doimiysining zarracha impulsiga nisbatiga teng.

Gipoteza tez orada tasdiqlandi: elektronlar kristallda difraksiya bergani aniqlandi, xuddi rentgen nurlari kabi.

Nima uchun kundalik hayotda buni sezmaymiz? Formulaga tennis to'pini qo'ysak, to'lqin uzunligi atom o'lchamidan ham kichik chiqadi. Massa qanchalik katta bo'lsa, to'lqin xossalari shunchalik ko'rinmas bo'ladi.

Elektron uchun esa to'lqin uzunligi atom o'lchami tartibida — shuning uchun mikrodunyoda bu hal qiluvchi.

### Hayotiy misol
Elektron mikroskop shu prinsipda ishlaydi: elektronning to'lqin uzunligi yorug'likdan minglab marta kichik, shuning uchun ancha mayda detallarni ko'rsatadi.`,
      formulas: [
        { latex: '\\lambda = \\frac{h}{p}', label: 'De-Broyl to\u2018lqin uzunligi' },
        { latex: '\\lambda = \\frac{h}{m v}', label: 'Kengaytirilgan ko\u2018rinish' },
        { latex: '\\lambda = \\frac{h}{\\sqrt{2mE_k}}', label: 'Energiya orqali' },
        { latex: '\\Delta x \\cdot \\Delta p \\ge \\frac{h}{4\\pi}', label: 'Geyzenberg noaniqligi' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: '\\lambda = \\frac{h}{m v}',
        paramA: { key: 'v', label: 'Tezlik v', unit: '×10⁶ m/s', min: 0.1, max: 30, step: 0.1, value: 5 },
        paramB: { key: 'm', label: 'Massa (elektron)', unit: '×mₑ', min: 1, max: 2000, step: 1, value: 1 },
      },
    },
    {
      code: '13.6',
      slug: 'atom-yadrosi',
      order: 6,
      titleUz: 'Atom yadrosi tuzilishi',
      titleEn: 'Structure of the nucleus',
      difficulty: 'ORTA',
      summary: "Protonlar, neytronlar, izotoplar va yadro kuchlari.",
      keywords: ['yadro', 'proton', 'neytron', 'izotop', 'yadro kuchlari', 'nuklon'],
      theory: `Atom yadrosi protonlar va neytronlardan iborat. Ular umumiy nom bilan nuklonlar deb ataladi.

Protonlar soni elementni belgilaydi va tartib raqamiga teng. Nuklonlarning umumiy soni massa soni deb ataladi. Neytronlar soni esa ularning ayirmasiga teng.

Bir xil protonli, lekin har xil neytronli yadrolar izotoplar deyiladi. Ularning kimyoviy xossalari deyarli bir xil, yadro xossalari esa keskin farq qiladi. Vodorodning uch izotopi bor: oddiy vodorod, deyteriy va tritiy.

Yadro ichida protonlar bir-birini juda kuchli itaradi. Yadro parchalanib ketmasligi uchun undan ham kuchli tortishish kerak — bu yadro kuchlari. Ular tabiatdagi eng kuchli o'zaro ta'sir, lekin juda qisqa masofada ishlaydi.

### Hayotiy misol
Uglerod-14 izotopi arxeologiyada yosh aniqlash uchun ishlatiladi.`,
      formulas: [
        { latex: 'A = Z + N', label: 'Massa soni' },
        { latex: '^{A}_{Z}X', label: 'Yadro belgilanishi' },
        { latex: 'r = r_0 A^{1/3}', label: 'Yadro radiusi' },
        { latex: 'r_0 = 1{,}2 \\times 10^{-15}\\ \\text{m}', label: 'Doimiy' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'A = Z + N',
        paramA: { key: 'Z', label: 'Protonlar Z', unit: '', min: 1, max: 92, step: 1, value: 6 },
        paramB: { key: 'N', label: 'Neytronlar N', unit: '', min: 0, max: 146, step: 1, value: 6 },
      },
    },
    {
      code: '13.7',
      slug: 'boglanish-energiyasi',
      order: 7,
      titleUz: "Yadro bog'lanish energiyasi",
      titleEn: 'Nuclear binding energy',
      difficulty: 'QIYIN',
      summary: "Massa defekti va nuklonga to'g'ri keladigan bog'lanish energiyasi.",
      keywords: ['boglanish energiyasi', 'massa defekti', 'E=mc2', 'yadro barqarorligi'],
      theory: `Yadro massasi uni tashkil etuvchi nuklonlar massalari yig'indisidan kichik. Bu farq massa defekti deb ataladi.

Yo'qolgan massa energiyaga aylangan. Eynshteyn formulasi bo'yicha hisoblansa, bu juda katta energiya chiqadi — aynan u nuklonlarni yadroda ushlab turadi.

Nuklonga to'g'ri keladigan bog'lanish energiyasi yadro barqarorligini ko'rsatadi. Uning massa soniga bog'liqlik grafigi qiziq shaklga ega: avval tez ko'tariladi, temir atrofida maksimumga yetadi, keyin sekin pasayadi.

Shu grafik yadro energetikasining butun mantiqini beradi. Yengil yadrolar qo'shilsa (sintez) yoki og'ir yadrolar bo'linsa (bo'linish), ikkala holda ham temirga yaqinlashadi va energiya ajraladi.

### Hayotiy misol
Quyosh energiyasi vodorod yadrolarining geliyga qo'shilishidan chiqadi — sekundiga millionlab tonna massa energiyaga aylanadi.`,
      formulas: [
        { latex: '\\Delta m = Z m_p + N m_n - m_{yadro}', label: 'Massa defekti' },
        { latex: 'E_{bog} = \\Delta m \\cdot c^2', label: "Bog'lanish energiyasi" },
        { latex: '\\varepsilon = \\frac{E_{bog}}{A}', label: 'Nuklonga energiya' },
        { latex: '\\varepsilon_{max} \\approx 8{,}8\\ \\text{MeV}', label: 'Temir uchun maksimum' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'E = \\Delta m c^2',
        paramA: { key: 'A', label: 'Massa soni A', unit: '', min: 1, max: 238, step: 1, value: 56 },
        paramB: { key: 'dm', label: 'Massa defekti', unit: 'a.m.b.', min: 0.01, max: 2, step: 0.01, value: 0.5 },
      },
    },
    {
      code: '13.8',
      slug: 'radioaktivlik',
      order: 8,
      titleUz: 'Radioaktivlik',
      titleEn: 'Radioactivity',
      difficulty: 'ORTA',
      summary: "Alfa, beta va gamma nurlanish hamda siljish qoidalari.",
      keywords: ['radioaktivlik', 'alfa', 'beta', 'gamma', 'yemirilish', 'siljish qoidasi'],
      theory: `Ba'zi yadrolar beqaror bo'lib, o'z-o'zidan boshqa yadrolarga aylanadi va nurlanish chiqaradi. Bu radioaktivlik.

Uch xil nurlanish bor. Alfa zarracha — geliy yadrosi, ya'ni ikki proton va ikki neytron. U og'ir va zaryadli, shuning uchun havoda bir necha santimetr yurib to'xtaydi, oddiy qog'oz ham uni to'sadi.

Beta zarracha — elektron. U yadrodagi neytron protonga aylanganda tug'iladi. O'tuvchanligi ancha yuqori, alyuminiy varaq kerak bo'ladi.

Gamma nurlanish — juda qisqa to'lqinli elektromagnit nurlanish. Zaryadsiz, massasiz va eng o'tuvchan: uni to'sish uchun qalin qo'rg'oshin kerak.

Siljish qoidalari yangi element qaysi bo'lishini aytadi.

### Hayotiy misol
Tutun datchiklarida ameritsiy-241 ning alfa nurlanishi ishlatiladi — tutun kirsa, tok o'zgaradi va signal beriladi.`,
      formulas: [
        {
          latex: '^{A}_{Z}X \\to\\, ^{A-4}_{Z-2}Y + ^{4}_{2}He',
          label: 'Alfa yemirilish',
        },
        {
          latex: '^{A}_{Z}X \\to\\, ^{A}_{Z+1}Y + e^-',
          label: 'Beta yemirilish',
        },
        { latex: '\\gamma', label: 'Gamma: A va Z o\u2018zgarmaydi' },
        { latex: 'A = \\lambda N', label: 'Faollik' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: 'A = \\lambda N',
        paramA: { key: 'N', label: 'Yadrolar soni', unit: '×10¹⁸', min: 1, max: 100, step: 1, value: 20 },
        paramB: { key: 'lambda', label: 'Yemirilish doimiysi', unit: '×10⁻⁶ 1/s', min: 0.1, max: 20, step: 0.1, value: 5 },
      },
    },
    {
      code: '13.9',
      slug: 'yarim-yemirilish-davri',
      order: 9,
      titleUz: 'Yarim yemirilish davri',
      titleEn: 'Half-life',
      difficulty: 'ORTA',
      summary: "Radioaktiv yemirilish qonuni va yosh aniqlash.",
      keywords: ['yarim yemirilish', 'yemirilish qonuni', 'radiouglerod', 'eksponensial'],
      theory: `Yarim yemirilish davri — dastlabki yadrolarning yarmi yemirilishi uchun ketadigan vaqt. Bu har bir izotop uchun o'zgarmas kattalik.

Muhim jihat: bu vaqt temperatura, bosim yoki kimyoviy bog'lanishga umuman bog'liq emas. Radioaktiv yemirilishga tashqaridan ta'sir qilib bo'lmaydi.

Qolgan yadrolar soni eksponensial kamayadi. Bir davrdan keyin yarmi, ikki davrdan keyin choragi, uch davrdan keyin sakkizdan biri qoladi. Nazariy jihatdan u hech qachon aniq nolga yetmaydi.

Yarim yemirilish davrlari juda keng diapazonda: ba'zi izotoplar uchun mikrosekundlar, uran-238 uchun esa 4,5 milliard yil.

O'zgarmaslik xossasi vaqt o'lchash imkonini beradi.

### Hayotiy misol
Radiouglerod usuli: tirik organizmda uglerod-14 nisbati doimiy, o'lgandan keyin esa 5730 yillik davr bilan kamaya boradi. Qolgan miqdorga qarab yosh aniqlanadi.`,
      formulas: [
        { latex: 'N = N_0 \\cdot 2^{-t/T}', label: 'Yemirilish qonuni' },
        { latex: 'N = N_0 e^{-\\lambda t}', label: 'Eksponensial ko\u2018rinish' },
        { latex: 'T = \\frac{\\ln 2}{\\lambda}', label: 'Yarim yemirilish davri' },
        { latex: 'T_{C-14} = 5730\\ \\text{yil}', label: 'Uglerod-14 uchun' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: 'N = N_0 \\cdot 2^{-t/T}',
        paramA: { key: 'T', label: 'Yarim yemirilish davri', unit: 'yil', min: 1, max: 10000, step: 10, value: 5730 },
        paramB: { key: 't', label: 'O\u2018tgan vaqt t', unit: 'yil', min: 0, max: 30000, step: 100, value: 5730 },
      },
    },
    {
      code: '13.10',
      slug: 'yadro-reaksiyalari',
      order: 10,
      titleUz: 'Yadro reaksiyalari',
      titleEn: 'Nuclear reactions',
      difficulty: 'QIYIN',
      summary: "Bo'linish, sintez va zanjir reaksiya.",
      keywords: ['yadro reaksiyasi', 'bolinish', 'sintez', 'zanjir reaksiya', 'reaktor'],
      theory: `Yadro reaksiyasida bir yadro boshqasiga aylanadi. Kimyoviy reaksiyadan farqli o'laroq, bu yerda elementning o'zi o'zgaradi va energiya millionlab marta ko'p ajraladi.

Har qanday reaksiyada ikki narsa saqlanadi: zaryad soni va massa soni. Shu ikki shart yordamida noma'lum zarrachani topish mumkin.

Og'ir yadrolarning bo'linishi neytron ta'sirida sodir bo'ladi. Uran-235 neytron yutib ikkiga bo'linadi va yana bir necha neytron chiqaradi. Ular yangi bo'linishlarni keltirib chiqarsa, zanjir reaksiya boshlanadi.

Reaktorda bu jarayon boshqariladi: ortiqcha neytronlar yutiladi va reaksiya barqaror ushlab turiladi.

Sintez esa yengil yadrolarning qo'shilishi. U ancha ko'p energiya beradi, lekin millionlab daraja temperatura talab qiladi.

### Hayotiy misol
Atom elektr stansiyalarida bo'linish ishlatiladi. Sintezni Yerda boshqarish hali hal etilmagan — ITER loyihasi shu ustida ishlamoqda.`,
      formulas: [
        { latex: '\\sum Z = \\text{const}', label: 'Zaryad saqlanishi' },
        { latex: '\\sum A = \\text{const}', label: 'Massa soni saqlanishi' },
        { latex: 'Q = \\Delta m \\cdot c^2', label: 'Reaksiya energiyasi' },
        {
          latex: '^{235}U + n \\to X + Y + 2{,}5n',
          label: "Uran bo'linishi",
        },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: 'Q = \\Delta m c^2',
        paramA: { key: 'k', label: 'Ko\u2018payish koeffitsiyenti', unit: '', min: 0.5, max: 2, step: 0.01, value: 1 },
        paramB: { key: 'N', label: 'Boshlang\u2018ich yadrolar', unit: '×10¹⁸', min: 1, max: 50, step: 1, value: 10 },
      },
    },
  ],
};
