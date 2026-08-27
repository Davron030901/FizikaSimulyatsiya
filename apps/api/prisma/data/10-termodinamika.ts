import type { SectionSeed } from './types';

const ACCENT = '#F97316';

export const termodinamika: SectionSeed = {
  code: '10',
  slug: 'termodinamika',
  order: 10,
  titleUz: 'Termodinamika',
  titleEn: 'Thermodynamics',
  description:
    "Temperatura, ideal gaz, izojarayonlar, ichki energiya va termodinamika qonunlari.",
  icon: 'thermometer',
  color: ACCENT,
  topics: [
    {
      code: '10.1',
      slug: 'temperatura-va-issiqlik',
      order: 1,
      titleUz: 'Temperatura va issiqlik miqdori',
      titleEn: 'Temperature and heat',
      difficulty: 'OSON',
      summary: "Temperatura molekulalar harakati o'lchovi, issiqlik esa uzatilayotgan energiya.",
      keywords: ['temperatura', 'issiqlik', 'Kelvin', 'Selsiy', 'issiqlik sigimi'],
      theory: `Temperatura moddadagi molekulalarning tartibsiz harakati qanchalik jadal ekanini ko'rsatadi. U issiqlikning o'zi emas — issiqlik bu bir jismdan ikkinchisiga uzatilayotgan energiya.

Farqni tushunish muhim. Bir stakan qaynoq suv va bir vanna iliq suvni olaylik: stakandagi temperatura yuqoriroq, lekin vannadagi umumiy issiqlik energiyasi ancha ko'p, chunki modda miqdori katta.

Fizikada Kelvin shkalasi ishlatiladi. Uning noli — mutlaq nol, ya'ni molekulalar harakati to'xtaydigan nazariy chegara. Selsiy shkalasi bilan bog'lanish oddiy: qiymatga 273,15 qo'shiladi.

Jismni isitish uchun kerak bo'ladigan issiqlik massa, solishtirma issiqlik sig'imi va temperatura o'zgarishiga bog'liq.

### Hayotiy misol
Suvning solishtirma issiqlik sig'imi juda katta — shu sabab dengiz bo'yidagi shaharlarda harorat keskin o'zgarmaydi.`,
      formulas: [
        { latex: 'T_K = t_C + 273{,}15', label: 'Kelvin va Selsiy' },
        { latex: 'Q = c m \\Delta T', label: 'Issiqlik miqdori' },
        { latex: 'c = \\frac{Q}{m \\Delta T}', label: 'Solishtirma issiqlik sig\u2018imi' },
        { latex: 'T = 0\\ \\text{K} = -273{,}15\\ ^\\circ\\text{C}', label: 'Mutlaq nol' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: 'Q = c m \\Delta T',
        paramA: { key: 'T', label: 'Temperatura T', unit: 'K', min: 50, max: 900, step: 10, value: 300 },
        paramB: { key: 'm', label: 'Modda miqdori', unit: 'mol', min: 0.1, max: 5, step: 0.1, value: 1 },
      },
    },
    {
      code: '10.2',
      slug: 'ideal-gaz-holat-tenglamasi',
      order: 2,
      titleUz: 'Ideal gaz holat tenglamasi',
      titleEn: 'Ideal gas law',
      difficulty: 'ORTA',
      summary: "Bosim, hajm, temperatura va modda miqdorini bog'lovchi asosiy tenglama.",
      keywords: ['ideal gaz', 'Mendeleyev-Klapeyron', 'bosim', 'hajm', 'universal gaz doimiysi'],
      theory: `Ideal gaz — molekulalari o'lchamsiz deb qaraladigan va bir-biri bilan faqat to'qnashuv orqali ta'sirlashadigan model. Real gazlar past bosim va yuqori temperaturada shu modelga juda yaqin bo'ladi.

Mendeleyev-Klapeyron tenglamasi gazning to'rt kattaligini bir formulada bog'laydi: bosim, hajm, modda miqdori va temperatura. Undagi universal gaz doimiysi barcha gazlar uchun bir xil.

Tenglamadan muhim xulosalar chiqadi. Temperatura o'zgarmasa, bosim va hajm ko'paytmasi doimiy qoladi. Hajm o'zgarmasa, bosim temperaturaga to'g'ri proporsional bo'ladi.

Temperatura albatta Kelvinda olinishi kerak — Selsiy bilan hisoblash butunlay noto'g'ri natija beradi.

### Hayotiy misol
Yozda avtomobil g'ildiragidagi bosim ortadi: havo qiziydi, hajm esa deyarli o'zgarmaydi.`,
      formulas: [
        { latex: 'pV = \\nu R T', label: 'Holat tenglamasi' },
        { latex: 'R = 8{,}31\\ \\text{J/(mol·K)}', label: 'Universal gaz doimiysi' },
        { latex: '\\nu = \\frac{m}{M}', label: 'Modda miqdori' },
        { latex: '\\frac{p_1 V_1}{T_1} = \\frac{p_2 V_2}{T_2}', label: 'Birlashgan gaz qonuni' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: 'pV = \\nu R T',
        paramA: { key: 'T', label: 'Temperatura T', unit: 'K', min: 100, max: 800, step: 10, value: 300 },
        paramB: { key: 'V', label: 'Hajm V', unit: 'l', min: 1, max: 50, step: 1, value: 22 },
      },
    },
    {
      code: '10.3',
      slug: 'izojarayonlar',
      order: 3,
      titleUz: 'Izojarayonlar',
      titleEn: 'Isoprocesses',
      difficulty: 'ORTA',
      summary: "Bitta parametr o'zgarmas qoladigan uch xil gaz jarayoni.",
      keywords: ['izotermik', 'izobarik', 'izoxorik', 'Boyl-Mariott', 'Sharl', 'Gey-Lyussak'],
      theory: `Gaz jarayonlarini o'rganishda bitta parametrni qotirib qo'yish qulay. Shunday uchta klassik jarayon bor.

Izotermik jarayonda temperatura o'zgarmaydi. Boyl-Mariott qonuniga ko'ra bosim va hajm ko'paytmasi doimiy: hajmni ikki barobar kamaytirsak, bosim ikki barobar ortadi. Grafikda bu giperbola.

Izobarik jarayonda bosim o'zgarmaydi va hajm temperaturaga to'g'ri proporsional bo'ladi. Bu Gey-Lyussak qonuni.

Izoxorik jarayonda hajm qotirilgan, bosim esa temperaturaga proporsional o'sadi — Sharl qonuni. Bunda gaz ish bajarmaydi, chunki hajm o'zgarmaydi.

### Hayotiy misol
Shprits teshigini barmoq bilan berkitib porshenni bossangiz, izotermik siqilishni his qilasiz: hajm kamayadi, qarshilik ortadi.`,
      formulas: [
        { latex: 'pV = \\text{const}', label: 'Izotermik (T = const)' },
        { latex: '\\frac{V}{T} = \\text{const}', label: 'Izobarik (p = const)' },
        { latex: '\\frac{p}{T} = \\text{const}', label: 'Izoxorik (V = const)' },
        { latex: 'A = p \\Delta V', label: 'Izobarik jarayonda ish' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: 'pV = \\text{const}',
        paramA: { key: 'V', label: 'Hajm V', unit: 'l', min: 2, max: 40, step: 1, value: 20 },
        paramB: { key: 'T', label: 'Temperatura T', unit: 'K', min: 150, max: 700, step: 10, value: 300 },
      },
    },
    {
      code: '10.4',
      slug: 'molekulyar-kinetik-nazariya',
      order: 4,
      titleUz: 'Molekulyar-kinetik nazariya',
      titleEn: 'Kinetic theory of gases',
      difficulty: 'QIYIN',
      summary: "Bosim va temperaturani molekulalar harakati orqali tushuntirish.",
      keywords: ['MKN', 'ortacha kinetik energiya', 'Bolsman doimiysi', 'molekula tezligi'],
      theory: `Molekulyar-kinetik nazariya makroskopik kattaliklarni — bosim va temperaturani — molekulalar harakati orqali tushuntiradi.

Gaz bosimi molekulalarning idish devoriga urilishidan hosil bo'ladi. Har bir urilish kichik impuls beradi, milliardlab urilish esa doimiy bosim taassurotini yaratadi. Shuning uchun bosim molekulalar konsentratsiyasiga va ularning o'rtacha kinetik energiyasiga bog'liq.

Eng chuqur xulosa: temperatura aynan molekulalarning o'rtacha kinetik energiyasi o'lchovi. Bu bog'lanishdagi koeffitsiyent Bolsman doimiysi deb ataladi.

Bundan molekulalarning o'rtacha tezligini hisoblash mumkin. Xona temperaturasida havo molekulalari sekundiga taxminan 500 metr tezlik bilan harakatlanadi.

### Hayotiy misol
Atir hidi xonaga darhol tarqalmaydi, garchi molekulalar juda tez harakatlansa ham — ular boshqa molekulalar bilan doimiy to'qnashib, zigzag yo'l bosadi.`,
      formulas: [
        { latex: 'p = \\frac{1}{3} n m_0 \\overline{v^2}', label: 'MKN asosiy tenglamasi' },
        { latex: '\\overline{E_k} = \\frac{3}{2} k T', label: "O'rtacha kinetik energiya" },
        { latex: 'k = 1{,}38 \\times 10^{-23}\\ \\text{J/K}', label: 'Bolsman doimiysi' },
        { latex: 'v_{kv} = \\sqrt{\\frac{3kT}{m_0}}', label: 'O\u2018rtacha kvadratik tezlik' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: '\\overline{E_k} = \\frac{3}{2} k T',
        paramA: { key: 'T', label: 'Temperatura T', unit: 'K', min: 50, max: 1000, step: 10, value: 300 },
        paramB: { key: 'n', label: 'Konsentratsiya', unit: '×10²⁵ m⁻³', min: 0.5, max: 10, step: 0.5, value: 2.5 },
      },
    },
    {
      code: '10.5',
      slug: 'ichki-energiya',
      order: 5,
      titleUz: 'Ichki energiya',
      titleEn: 'Internal energy',
      difficulty: 'ORTA',
      summary: "Jism molekulalarining to'liq energiyasi va uni o'zgartirish yo'llari.",
      keywords: ['ichki energiya', 'ish', 'issiqlik uzatish', 'ideal gaz'],
      theory: `Ichki energiya — jismdagi barcha molekulalarning kinetik energiyasi va ularning o'zaro ta'sir potensial energiyasi yig'indisi. Jismning butun holda harakati yoki balandligi bunga kirmaydi.

Ideal gazda molekulalar o'zaro ta'sirlashmaydi deb qaralgani uchun potensial qism yo'qoladi. Natijada ichki energiya faqat temperaturaga va modda miqdoriga bog'liq bo'lib qoladi — hajm yoki bosimga emas.

Ichki energiyani ikki yo'l bilan o'zgartirish mumkin: issiqlik uzatish orqali yoki ish bajarish orqali. Ikkalasi ham bir xil natijaga olib keladi.

Aynan shu ikkinchi yo'l qiziq: gazni tez siqsangiz, unga issiqlik bermasangiz ham u qiziydi.

### Hayotiy misol
Velosiped nasosining pastki qismi ishlatgandan keyin qiziydi — siqilayotgan havoning ichki energiyasi bajarilgan ish hisobiga ortadi.`,
      formulas: [
        { latex: 'U = \\frac{3}{2} \\nu R T', label: 'Bir atomli ideal gaz' },
        { latex: '\\Delta U = Q + A_{tashqi}', label: "O'zgarish yo'llari" },
        { latex: 'U \\ne f(V)', label: 'Ideal gazda hajmga bog\u2018liq emas' },
        { latex: '\\Delta U = \\frac{3}{2} \\nu R \\Delta T', label: "Temperatura o'zgarishida" },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: 'U = \\frac{3}{2} \\nu R T',
        paramA: { key: 'T', label: 'Temperatura T', unit: 'K', min: 100, max: 900, step: 10, value: 300 },
        paramB: { key: 'nu', label: 'Modda miqdori', unit: 'mol', min: 0.1, max: 5, step: 0.1, value: 1 },
      },
    },
    {
      code: '10.6',
      slug: 'termodinamika-birinchi-qonuni',
      order: 6,
      titleUz: 'Termodinamikaning birinchi qonuni',
      titleEn: 'First law of thermodynamics',
      difficulty: 'ORTA',
      summary: "Issiqlik, ish va ichki energiya o'rtasidagi energiya saqlanish qonuni.",
      keywords: ['birinchi qonun', 'issiqlik', 'ish', 'adiabatik', 'energiya saqlanish'],
      theory: `Termodinamikaning birinchi qonuni — energiya saqlanish qonunining issiqlik hodisalari uchun ifodasi. Gazga berilgan issiqlik ikki narsaga sarflanadi: ichki energiyani oshirishga va tashqi jismlar ustida ish bajarishga.

Ishoralar muhim. Gaz kengaysa, u ish bajaradi va bu ish musbat. Gaz siqilsa, ish uning ustida bajariladi va ishora manfiy bo'ladi.

Har bir izojarayonda qonun soddalashadi. Izoxorik jarayonda hajm o'zgarmagani uchun ish nolga teng — butun issiqlik ichki energiyaga ketadi. Izotermik jarayonda ichki energiya o'zgarmaydi, ya'ni butun issiqlik ishga aylanadi.

Adiabatik jarayonda issiqlik almashinuvi yo'q va ish faqat ichki energiya hisobiga bajariladi.

### Hayotiy misol
Birinchi qonun birinchi tur abadiy dvigatel imkonsizligini isbotlaydi: energiyani yo'qdan yaratib bo'lmaydi.`,
      formulas: [
        { latex: 'Q = \\Delta U + A', label: 'Birinchi qonun' },
        { latex: 'A = p \\Delta V', label: 'Gazning ishi' },
        { latex: 'Q = \\Delta U', label: 'Izoxorik (A = 0)' },
        { latex: 'Q = A', label: 'Izotermik (ΔU = 0)' },
        { latex: '\\Delta U = -A', label: 'Adiabatik (Q = 0)' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: 'Q = \\Delta U + A',
        paramA: { key: 'Q', label: 'Berilgan issiqlik Q', unit: 'J', min: 0, max: 5000, step: 50, value: 1000 },
        paramB: { key: 'dV', label: 'Hajm o\u2018zgarishi', unit: 'l', min: -10, max: 10, step: 0.5, value: 2 },
      },
    },
    {
      code: '10.7',
      slug: 'agregat-holat-ozgarishi',
      order: 7,
      titleUz: "Agregat holat o'zgarishi",
      titleEn: 'Phase transitions',
      difficulty: 'ORTA',
      summary: "Erish, qotish, bug'lanish va kondensatsiya hamda solishtirma issiqliklar.",
      keywords: ['erish', 'buglanish', 'solishtirma issiqlik', 'faza', 'qaynash'],
      theory: `Modda qattiq, suyuq va gaz holatlarida bo'lishi mumkin. Bir holatdan ikkinchisiga o'tish uchun energiya kerak, lekin qiziq jihati shundaki, o'tish paytida temperatura o'zgarmaydi.

Sabab oddiy: berilayotgan energiya molekulalar tezligini oshirishga emas, ular orasidagi bog'lanishlarni uzishga sarflanadi. Muz nolda erishni boshlaydi va butun muz erib bo'lgunicha temperatura nolda qoladi.

Erish uchun kerak bo'ladigan energiya solishtirma erish issiqligi bilan, bug'lanish uchun kerak bo'ladigani esa solishtirma bug'lanish issiqligi bilan hisoblanadi.

Suvning bug'lanish issiqligi juda katta — erish issiqligidan qariyb yetti barobar ko'p.

### Hayotiy misol
Terlash tanani sovutadi, chunki bug'lanayotgan suv teridan katta miqdorda energiya olib ketadi.`,
      formulas: [
        { latex: 'Q = \\lambda m', label: 'Erish issiqligi' },
        { latex: 'Q = L m', label: "Bug'lanish issiqligi" },
        { latex: 'Q = c m \\Delta T', label: 'Isitish issiqligi' },
        { latex: '\\lambda_{muz} = 3{,}3 \\times 10^5\\ \\text{J/kg}', label: 'Muz uchun' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: 'Q = \\lambda m',
        paramA: { key: 'm', label: 'Massa m', unit: 'kg', min: 0.1, max: 10, step: 0.1, value: 1 },
        paramB: { key: 'T', label: 'Temperatura T', unit: '°C', min: -50, max: 150, step: 1, value: 20 },
      },
    },
    {
      code: '10.8',
      slug: 'issiqlik-uzatish-turlari',
      order: 8,
      titleUz: 'Issiqlik uzatish turlari',
      titleEn: 'Heat transfer',
      difficulty: 'OSON',
      summary: "Issiqlik o'tkazuvchanlik, konveksiya va nurlanish.",
      keywords: ['otkazuvchanlik', 'konveksiya', 'nurlanish', 'termos', 'izolyatsiya'],
      theory: `Issiqlik uch xil yo'l bilan uzatiladi va odatda uchalasi bir vaqtda ishlaydi.

Issiqlik o'tkazuvchanlikda energiya molekuladan molekulaga to'qnashuv orqali beriladi, moddaning o'zi ko'chmaydi. Metallar bunda juda yaxshi, gazlar esa juda yomon. Aynan shu sabab jun kiyim iliq: uning tolalari orasidagi havo issiqlikni deyarli o'tkazmaydi.

Konveksiyada isigan suyuqlik yoki gaz yengillashib ko'tariladi, sovuqi esa pastga tushadi. Shu tarzda oqim hosil bo'ladi va issiqlik modda bilan birga ko'chadi.

Nurlanish esa muhitni umuman talab qilmaydi — Quyosh issiqligi bizga bo'shliq orqali yetib keladi.

### Hayotiy misol
Termos uchala yo'lni ham to'sadi: qo'sh devor orasidagi vakuum o'tkazuvchanlik va konveksiyani, kumushrang qoplama esa nurlanishni to'xtatadi.`,
      formulas: [
        { latex: 'Q = \\frac{\\lambda S \\Delta T \\, t}{d}', label: 'Issiqlik o\u2018tkazuvchanlik' },
        { latex: 'P = \\sigma \\varepsilon S T^4', label: 'Stefan-Bolsman qonuni' },
        { latex: '\\sigma = 5{,}67 \\times 10^{-8}', label: 'Stefan-Bolsman doimiysi' },
        { latex: 'Q = c m \\Delta T', label: 'Yutilgan issiqlik' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: 'P = \\sigma \\varepsilon S T^4',
        paramA: { key: 'T', label: 'Temperatura T', unit: 'K', min: 200, max: 1500, step: 10, value: 300 },
        paramB: { key: 'S', label: 'Yuza S', unit: 'm²', min: 0.01, max: 5, step: 0.01, value: 1 },
      },
    },
    {
      code: '10.9',
      slug: 'issiqlik-dvigateli',
      order: 9,
      titleUz: 'Issiqlik dvigateli va FIK',
      titleEn: 'Heat engines and efficiency',
      difficulty: 'ORTA',
      summary: "Issiqlikni ishga aylantiruvchi mashinalar va ularning samaradorligi.",
      keywords: ['issiqlik dvigateli', 'FIK', 'isitgich', 'sovutgich', 'ish jismi'],
      theory: `Issiqlik dvigateli issiqlik energiyasini mexanik ishga aylantiradi. Har qanday bunday mashinada uch qism bo'ladi: isitgich, ish jismi va sovutgich.

Ish jismi isitgichdan issiqlik oladi, uning bir qismini ishga aylantiradi, qolganini esa sovutgichga beradi. Sovutgichsiz dvigatel ishlay olmaydi — bu shunchaki texnik kamchilik emas, balki tabiat qonuni.

Foydali ish koeffitsiyenti bajarilgan ishning isitgichdan olingan issiqlikka nisbatiga teng. U hech qachon birga yetmaydi, chunki issiqlikning bir qismi majburan sovutgichga ketadi.

Real dvigatellarda FIK yanada past: ishqalanish va issiqlik yo'qotishlari qo'shiladi.

### Hayotiy misol
Zamonaviy benzinli dvigatelning FIK'i taxminan 25-30 foiz — yoqilg'i energiyasining qolgan qismi issiqlik sifatida tarqaladi.`,
      formulas: [
        { latex: '\\eta = \\frac{A}{Q_1}', label: 'Foydali ish koeffitsiyenti' },
        { latex: 'A = Q_1 - Q_2', label: 'Bajarilgan ish' },
        { latex: '\\eta = \\frac{Q_1 - Q_2}{Q_1}', label: 'Kengaytirilgan ko\u2018rinish' },
        { latex: '\\eta < 1', label: 'Har doim birdan kichik' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: '\\eta = \\frac{Q_1 - Q_2}{Q_1}',
        paramA: { key: 'Q1', label: 'Isitgich issiqligi', unit: 'J', min: 100, max: 10000, step: 100, value: 3000 },
        paramB: { key: 'Q2', label: 'Sovutgichga', unit: 'J', min: 0, max: 9000, step: 100, value: 2000 },
      },
    },
    {
      code: '10.10',
      slug: 'karno-sikli',
      order: 10,
      titleUz: 'Karno sikli',
      titleEn: 'Carnot cycle',
      difficulty: 'QIYIN',
      summary: "Nazariy jihatdan eng samarali issiqlik sikli va uning FIK chegarasi.",
      keywords: ['Karno', 'ideal sikl', 'maksimal FIK', 'adiabatik', 'izotermik'],
      theory: `Karno sikli to'rt bosqichdan iborat ideal jarayon: izotermik kengayish, adiabatik kengayish, izotermik siqilish va adiabatik siqilish.

Uning ahamiyati amaliy emas, balki nazariy. Karno isbotladiki, berilgan ikki temperatura orasida ishlaydigan hech qanday dvigatel Karno siklidan samaraliroq bo'la olmaydi.

Maksimal FIK faqat isitgich va sovutgich temperaturalariga bog'liq — ish jismining turi, mashinaning tuzilishi umuman ahamiyatsiz.

Formuladan muhim xulosa chiqadi: FIK'ni oshirish uchun isitgich temperaturasini ko'tarish yoki sovutgichnikini pasaytirish kerak. Sovutgich temperaturasi atrof-muhit bilan chegaralangani uchun amalda birinchi yo'l tanlanadi.

### Hayotiy misol
Issiqlik elektr stansiyalarida bug' temperaturasi 550 darajagacha ko'tariladi — aynan shu Karno chegarasini yuqoriga surish uchun.`,
      formulas: [
        { latex: '\\eta_{max} = \\frac{T_1 - T_2}{T_1}', label: 'Karno FIK' },
        { latex: '\\eta_{max} = 1 - \\frac{T_2}{T_1}', label: 'Muqobil ko\u2018rinish' },
        { latex: '\\eta \\le \\eta_{max}', label: 'Karno teoremasi' },
        { latex: '\\frac{Q_1}{T_1} = \\frac{Q_2}{T_2}', label: 'Ideal siklda' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: '\\eta_{max} = 1 - \\frac{T_2}{T_1}',
        paramA: { key: 'T1', label: 'Isitgich T₁', unit: 'K', min: 300, max: 1200, step: 10, value: 800 },
        paramB: { key: 'T2', label: 'Sovutgich T₂', unit: 'K', min: 200, max: 600, step: 10, value: 300 },
      },
    },
    {
      code: '10.11',
      slug: 'termodinamika-ikkinchi-qonuni',
      order: 11,
      titleUz: 'Termodinamikaning ikkinchi qonuni',
      titleEn: 'Second law of thermodynamics',
      difficulty: 'QIYIN',
      summary: "Jarayonlarning yo'nalishi va entropiya tushunchasi.",
      keywords: ['ikkinchi qonun', 'entropiya', 'qaytmas jarayon', 'tartibsizlik'],
      theory: `Birinchi qonun energiya saqlanishini aytadi, lekin jarayon qaysi tomonga borishini aytmaydi. Ikkinchi qonun aynan shu bo'shliqni to'ldiradi.

Klauzius ta'rifiga ko'ra, issiqlik o'z-o'zidan sovuq jismdan issiq jismga o'tmaydi. Sovutgich buni qila oladi, lekin faqat tashqaridan energiya sarflab.

Kelvin ta'rifi boshqacha: butun issiqlikni qoldiqsiz ishga aylantiradigan davriy mashina yaratib bo'lmaydi. Ya'ni ikkinchi tur abadiy dvigatel ham imkonsiz.

Entropiya tizim tartibsizligini o'lchaydi. Yopiq tizimda u kamaymaydi — jarayonlar tartibsizlik ortadigan tomonga boradi. Aynan shu vaqtning yo'nalishini belgilaydi.

### Hayotiy misol
Choy o'z-o'zidan sovuydi, lekin sovigan choy o'z-o'zidan qaytadan qizimaydi. Energiya saqlangan bo'lardi, lekin entropiya kamayardi.`,
      formulas: [
        { latex: '\\Delta S \\ge 0', label: 'Yopiq tizimda entropiya' },
        { latex: '\\Delta S = \\frac{Q}{T}', label: 'Entropiya o\u2018zgarishi' },
        { latex: 'S = k \\ln W', label: 'Bolsman formulasi' },
        { latex: '\\eta < 1', label: 'Kelvin ta\u2019rifi natijasi' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: '\\Delta S = \\frac{Q}{T}',
        paramA: { key: 'Q', label: 'Issiqlik Q', unit: 'J', min: 0, max: 5000, step: 50, value: 1000 },
        paramB: { key: 'T', label: 'Temperatura T', unit: 'K', min: 100, max: 900, step: 10, value: 300 },
      },
    },
    {
      code: '10.12',
      slug: 'namlik-va-buglanish',
      order: 12,
      titleUz: "Havo namligi va bug'lanish",
      titleEn: 'Humidity and evaporation',
      difficulty: 'ORTA',
      summary: "Mutlaq va nisbiy namlik, shudring nuqtasi.",
      keywords: ['namlik', 'shudring nuqtasi', 'toyingan bug', 'psixrometr'],
      theory: `Havodagi suv bug'i miqdori namlik bilan tavsiflanadi. Mutlaq namlik bir kub metr havodagi bug' massasini ko'rsatadi, lekin amalda nisbiy namlik ancha foydali.

Nisbiy namlik havodagi bug' bosimining shu temperaturadagi to'yingan bug' bosimiga nisbati. U foizda ifodalanadi va odamning issiqni qanday his qilishini bevosita belgilaydi.

Muhim jihat: to'yingan bug' bosimi temperaturaga kuchli bog'liq. Havo sovisa, to'yinish chegarasi pasayadi va bir paytda nisbiy namlik yuz foizga yetadi. Shu temperatura shudring nuqtasi deb ataladi — undan pastda bug' suyuqlikka aylana boshlaydi.

### Hayotiy misol
Sovuq shishaning tashqi yuzasida tomchi paydo bo'ladi: shisha yonidagi havo shudring nuqtasidan pastga soviydi.`,
      formulas: [
        { latex: '\\varphi = \\frac{\\rho}{\\rho_0} \\times 100\\%', label: 'Nisbiy namlik' },
        { latex: '\\varphi = \\frac{p}{p_0} \\times 100\\%', label: 'Bosim orqali' },
        { latex: '\\rho = \\frac{m}{V}', label: 'Mutlaq namlik' },
        { latex: '\\varphi = 100\\%', label: 'Shudring nuqtasi sharti' },
      ],
      sim: {
        demoType: 'particles',
        accent: ACCENT,
        formula: '\\varphi = \\frac{p}{p_0} \\times 100\\%',
        paramA: { key: 'T', label: 'Temperatura T', unit: '°C', min: -10, max: 45, step: 1, value: 20 },
        paramB: { key: 'phi', label: 'Nisbiy namlik', unit: '%', min: 0, max: 100, step: 1, value: 50 },
      },
    },
  ],
};
