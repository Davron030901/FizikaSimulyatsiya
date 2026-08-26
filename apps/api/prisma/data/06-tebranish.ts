import type { SectionSeed } from './types';

const ACCENT = '#10B981';

export const tebranish: SectionSeed = {
  code: '6',
  slug: 'tebranish-tolqinlar',
  order: 6,
  titleUz: "Tebranish va to'lqinlar",
  titleEn: 'Oscillations and waves',
  description:
    "Garmonik tebranishlar, mayatniklar, so'nish va rezonans hamda to'lqin hodisalari.",
  icon: 'audio-waveform',
  color: ACCENT,
  topics: [
    {
      code: '6.1',
      slug: 'matematik-mayatnik',
      order: 1,
      titleUz: 'Matematik mayatnik',
      titleEn: 'Simple pendulum',
      difficulty: 'OSON',
      summary: "Ipga osilgan nuqtaviy massa tebranishi va davrning uzunlikka bog'liqligi.",
      keywords: ['mayatnik', 'davr', 'tebranish', 'pendulum', 'garmonik'],
      theory: `Matematik mayatnik — cho'zilmaydigan yengil ipga osilgan nuqtaviy massadan iborat ideallashtirilgan model. Muvozanat holatidan chiqarilganda og'irlik kuchining urinma tashkil etuvchisi uni qaytarishga intiladi va tebranish vujudga keladi.

Kichik burchaklarda (taxminan 15 gradusgacha) tebranish garmonik hisoblanadi va davr juda sodda formula bilan ifodalanadi. Undagi eng hayratlanarli jihat — davr massaga umuman bog'liq emas. Og'ir va yengil yuk bir xil uzunlikdagi ipda bir xil davr bilan tebranadi.

Davr faqat ip uzunligi va erkin tushish tezlanishiga bog'liq. Uzunlik to'rt barobar oshsa, davr ikki barobar ortadi. Oyda esa xuddi shu mayatnik ancha sekin tebranadi.

Katta burchaklarda formula xatolik bera boshlaydi.

### Hayotiy misol
Mayatnikli devor soatlari aynan shu qonuniyatga asoslangan. Mayatnik uzunligini o'zgartirib, soatning yurishini sozlash mumkin.`,
      formulas: [
        { latex: 'T = 2\\pi \\sqrt{\\frac{l}{g}}', label: 'Tebranish davri' },
        { latex: '\\omega = \\sqrt{\\frac{g}{l}}', label: 'Siklik chastota' },
        { latex: 'f = \\frac{1}{T}', label: 'Chastota' },
        { latex: '\\theta = \\theta_0 \\cos(\\omega t)', label: 'Harakat tenglamasi' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'T = 2\\pi \\sqrt{\\frac{l}{g}}',
        paramA: { key: 'l', label: 'Ip uzunligi l', unit: 'm', min: 0.1, max: 5, step: 0.05, value: 1 },
        paramB: {
          key: 'g',
          label: 'Tezlanish g',
          unit: 'm/s²',
          min: 1.6,
          max: 25,
          step: 0.1,
          value: 9.8,
        },
      },
    },
    {
      code: '6.2',
      slug: 'fizik-mayatnik',
      order: 2,
      titleUz: 'Fizik mayatnik',
      titleEn: 'Physical pendulum',
      difficulty: 'QIYIN',
      summary: "Real o'lchamli jismning osilgan nuqta atrofidagi tebranishi.",
      keywords: ['fizik mayatnik', 'inersiya momenti', 'keltirilgan uzunlik', 'compound pendulum'],
      theory: `Fizik mayatnik — massasi butun hajm bo'ylab taqsimlangan real jism bo'lib, u massa markazidan yuqoridagi nuqta atrofida tebranadi. Matematik mayatnikdan farqli o'laroq, bu yerda jismning inersiya momentini hisobga olish kerak.

Davr inersiya momenti, massa va osilgan nuqtadan massa markazigacha bo'lgan masofaga bog'liq bo'ladi. Formulani matematik mayatnik ko'rinishiga keltirish uchun keltirilgan uzunlik tushunchasi kiritiladi — bu shu davr bilan tebranadigan matematik mayatnikning uzunligi.

Qiziq xususiyat: osilgan nuqtani surganda davr avval kamayadi, so'ng ortadi. Massa markazida osilgan jism umuman tebranmaydi, chunki qaytaruvchi moment nolga aylanadi.

Har bir jism uchun davr minimal bo'ladigan optimal osish nuqtasi mavjud.

### Hayotiy misol
Beysbol tayoqchasi yoki eshik ham fizik mayatnik hisoblanadi. Sportda tayoqchaning tebranish xususiyati zarba kuchiga bevosita ta'sir qiladi.`,
      formulas: [
        { latex: 'T = 2\\pi \\sqrt{\\frac{I}{m g d}}', label: 'Tebranish davri' },
        { latex: 'l_{kelt} = \\frac{I}{m d}', label: 'Keltirilgan uzunlik' },
        { latex: 'I = I_c + m d^2', label: 'Shteyner teoremasi' },
        { latex: 'M = -m g d \\sin\\theta', label: 'Qaytaruvchi moment' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'T = 2\\pi \\sqrt{\\frac{I}{m g d}}',
        paramA: {
          key: 'I',
          label: 'Inersiya momenti I',
          unit: 'kg·m²',
          min: 0.05,
          max: 10,
          step: 0.05,
          value: 1,
        },
        paramB: {
          key: 'd',
          label: 'Markazgacha masofa d',
          unit: 'm',
          min: 0.05,
          max: 2,
          step: 0.05,
          value: 0.5,
        },
      },
    },
    {
      code: '6.3',
      slug: 'prujina-massa-gorizontal',
      order: 3,
      titleUz: 'Prujina-massa tizimi (gorizontal)',
      titleEn: 'Horizontal spring-mass system',
      difficulty: 'ORTA',
      summary: "Garmonik tebranishning eng sof modeli va uning tenglamalari.",
      keywords: ['prujina', 'garmonik tebranish', 'amplituda', 'faza', 'SHM'],
      theory: `Silliq gorizontal sirtda prujinaga ulangan yuk garmonik tebranishning eng sof modelini beradi. Qaytaruvchi kuch siljishga to'g'ri proporsional va unga qarama-qarshi yo'nalgan — bu esa aynan garmonik tebranish sharti.

Tebranish davri massa va bikrlikka bog'liq bo'lib, amplitudaga umuman bog'liq emas. Yukni ko'proq chetga tortsangiz, u uzoqroq masofani bosib o'tadi, lekin shu bilan birga tezroq harakatlanadi — natijada davr o'zgarmaydi.

Siljish vaqtga kosinus qonuni bo'yicha o'zgaradi. Amplituda maksimal siljishni, faza esa boshlang'ich holatni belgilaydi. Tezlik muvozanat nuqtasida maksimal, chekka nuqtalarda esa nolga teng. Tezlanish aksincha — chekka nuqtalarda maksimal bo'ladi.

### Hayotiy misol
Avtomobil podveskasi, mexanik tarozilar va ko'plab tebranish sensorlari shu model asosida hisoblanadi.`,
      formulas: [
        { latex: 'x = A \\cos(\\omega t + \\varphi)', label: 'Harakat tenglamasi' },
        { latex: 'T = 2\\pi \\sqrt{\\frac{m}{k}}', label: 'Tebranish davri' },
        { latex: '\\omega = \\sqrt{\\frac{k}{m}}', label: 'Siklik chastota' },
        { latex: 'v_{max} = A \\omega', label: 'Maksimal tezlik' },
        { latex: 'a = -\\omega^2 x', label: 'Tezlanish' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'T = 2\\pi \\sqrt{\\frac{m}{k}}',
        paramA: { key: 'm', label: 'Massa m', unit: 'kg', min: 0.1, max: 20, step: 0.1, value: 2 },
        paramB: {
          key: 'k',
          label: 'Bikrlik k',
          unit: 'N/m',
          min: 5,
          max: 500,
          step: 5,
          value: 100,
        },
      },
    },
    {
      code: '6.4',
      slug: 'prujina-massa-vertikal',
      order: 4,
      titleUz: 'Prujina-massa tizimi (vertikal)',
      titleEn: 'Vertical spring-mass system',
      difficulty: 'ORTA',
      summary: "Og'irlik kuchining muvozanat holatiga ta'siri va davrning o'zgarmasligi.",
      keywords: ['vertikal prujina', 'muvozanat holati', 'statik cho\u2018zilish', 'tebranish'],
      theory: `Prujinaga vertikal osilgan yuk og'irlik kuchi ta'sirida prujinani ma'lum miqdorga cho'zadi va yangi muvozanat holati vujudga keladi. Bu holatda elastik kuch og'irlik kuchini to'liq muvozanatlaydi.

Eng muhim natija shundaki, yuk shu yangi muvozanat holati atrofida tebranganda davr gorizontal holatdagi bilan bir xil bo'lib qoladi. Og'irlik kuchi faqat muvozanat markazini pastga suradi, lekin tebranish xarakterini o'zgartirmaydi.

Bu natija hisob-kitoblarni sezilarli soddalashtiradi: og'irlik kuchini butunlay hisobdan chiqarib, koordinatani yangi muvozanat holatidan boshlab o'lchash kifoya.

Statik cho'zilishni o'lchash orqali prujina bikrligini aniqlash ham mumkin.

### Hayotiy misol
Bungee-jumping, do'kondagi osma tarozi va lift trosslarining tebranishi — barchasi vertikal prujina modeli bilan tavsiflanadi.`,
      formulas: [
        { latex: 'x_0 = \\frac{m g}{k}', label: 'Statik cho\u2018zilish' },
        { latex: 'T = 2\\pi \\sqrt{\\frac{m}{k}}', label: "Davr (gorizontal bilan bir xil)" },
        { latex: 'T = 2\\pi \\sqrt{\\frac{x_0}{g}}', label: 'Cho\u2018zilish orqali' },
        { latex: 'k x_0 = m g', label: 'Muvozanat sharti' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'x_0 = \\frac{m g}{k}',
        paramA: { key: 'm', label: 'Massa m', unit: 'kg', min: 0.1, max: 20, step: 0.1, value: 1 },
        paramB: {
          key: 'k',
          label: 'Bikrlik k',
          unit: 'N/m',
          min: 5,
          max: 500,
          step: 5,
          value: 50,
        },
      },
    },
    {
      code: '6.5',
      slug: 'sonuvchi-tebranish',
      order: 5,
      titleUz: "So'nuvchi tebranish",
      titleEn: 'Damped oscillation',
      difficulty: 'QIYIN',
      summary: "Ishqalanish ta'sirida amplitudaning eksponensial kamayishi.",
      keywords: ['sonuvchi tebranish', 'damping', 'amplituda kamayishi', 'kritik sonish'],
      theory: `Real sharoitda tebranishga har doim qarshilik kuchlari ta'sir qiladi va amplituda asta-sekin kamayadi. Bunday tebranish so'nuvchi deb ataladi.

Qarshilik kuchi tezlikka proporsional bo'lganda amplituda eksponensial qonun bo'yicha kamayadi. So'nish koeffitsiyenti bu jarayonning tezligini belgilaydi.

So'nishning uch xil rejimi mavjud. Kuchsiz so'nishda jism amplitudasi kamayib boruvchi tebranishlarni davom ettiradi. Kuchli so'nishda tebranish umuman bo'lmaydi — jism muvozanat holatiga sekin qaytadi. Kritik so'nishda esa jism eng qisqa vaqtda tebranmasdan muvozanatga keladi.

Sifat faktori sistemaning qanchalik kam energiya yo'qotishini ko'rsatadi.

### Hayotiy misol
Avtomobil amortizatori aynan kritik so'nishga yaqin sozlanadi: g'ildirak chuqurdan o'tgach darhol muvozanatga qaytadi va ortiqcha tebranmaydi.`,
      formulas: [
        {
          latex: 'x = A e^{-\\gamma t} \\cos(\\omega t + \\varphi)',
          label: 'Harakat tenglamasi',
        },
        { latex: 'A(t) = A_0 e^{-\\gamma t}', label: 'Amplituda kamayishi' },
        { latex: '\\omega = \\sqrt{\\omega_0^2 - \\gamma^2}', label: 'So\u2018nuvchi chastota' },
        { latex: 'Q = \\frac{\\omega_0}{2\\gamma}', label: 'Sifat faktori' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'A(t) = A_0 e^{-\\gamma t}',
        paramA: {
          key: 'gamma',
          label: "So'nish koeffitsiyenti γ",
          unit: '1/s',
          min: 0,
          max: 3,
          step: 0.05,
          value: 0.3,
        },
        paramB: {
          key: 'omega0',
          label: 'Xususiy chastota ω0',
          unit: 'rad/s',
          min: 0.5,
          max: 20,
          step: 0.1,
          value: 5,
        },
      },
    },
    {
      code: '6.6',
      slug: 'majburiy-tebranish',
      order: 6,
      titleUz: 'Majburiy tebranish',
      titleEn: 'Forced oscillation',
      difficulty: 'QIYIN',
      summary: "Tashqi davriy kuch ta'siridagi tebranish va turg'un rejim.",
      keywords: ['majburiy tebranish', 'haydovchi chastota', 'steady state', 'faza kechikishi'],
      theory: `Tebranuvchi sistemaga tashqi davriy kuch ta'sir qilsa, majburiy tebranish vujudga keladi. Bunday tebranish ikki bosqichdan iborat bo'ladi.

Boshida o'tkinchi jarayon kuzatiladi: sistemaning xususiy tebranishlari tashqi kuch tebranishlari bilan qo'shilib, murakkab manzara hosil qiladi. Xususiy tebranishlar so'nib bo'lgach, turg'un rejim o'rnatiladi.

Turg'un rejimda sistema aniq tashqi kuch chastotasi bilan tebranadi — o'z xususiy chastotasi bilan emas. Lekin amplituda ikkala chastotaning nisbatiga bog'liq bo'ladi va ular bir-biriga yaqinlashganda keskin ortadi.

Sistema tebranishlari tashqi kuchdan faza bo'yicha kechikadi. Bu kechikish chastotaga qarab nolgacha yoki 180 gradusgacha o'zgaradi.

### Hayotiy misol
Radiopriyomnikni sozlash aynan shu hodisaga asoslangan: kontur chastotasi kerakli stansiya chastotasiga moslashtiriladi.`,
      formulas: [
        { latex: 'F = F_0 \\cos(\\omega_e t)', label: 'Tashqi kuch' },
        {
          latex: 'A = \\frac{F_0 / m}{\\sqrt{(\\omega_0^2 - \\omega_e^2)^2 + 4\\gamma^2 \\omega_e^2}}',
          label: 'Turg\u2018un amplituda',
        },
        {
          latex: '\\tan\\varphi = \\frac{2 \\gamma \\omega_e}{\\omega_0^2 - \\omega_e^2}',
          label: 'Faza kechikishi',
        },
        { latex: 'x = A \\cos(\\omega_e t - \\varphi)', label: 'Turg\u2018un rejim' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: '\\omega_e / \\omega_0',
        paramA: {
          key: 'omegaE',
          label: 'Haydovchi chastota ωe',
          unit: 'rad/s',
          min: 0.1,
          max: 20,
          step: 0.1,
          value: 4,
        },
        paramB: {
          key: 'omega0',
          label: 'Xususiy chastota ω0',
          unit: 'rad/s',
          min: 0.5,
          max: 20,
          step: 0.1,
          value: 5,
        },
      },
    },
    {
      code: '6.7',
      slug: 'rezonans',
      order: 7,
      titleUz: 'Rezonans hodisasi',
      titleEn: 'Resonance',
      difficulty: 'ORTA',
      summary: "Chastotalar mos kelganda amplitudaning keskin ortishi.",
      keywords: ['rezonans', 'rezonans egri chizigi', 'Takoma', 'sifat faktori'],
      theory: `Tashqi kuch chastotasi sistemaning xususiy chastotasiga yaqinlashganda tebranish amplitudasi keskin ortadi. Bu hodisa rezonans deb ataladi.

Rezonansning sababi oddiy: tashqi kuch har safar to'g'ri paytda, tebranish yo'nalishi bo'yicha ta'sir qiladi va sistemaga energiya uzatib boraveradi. Xuddi arg'imchoqni har turtishda to'g'ri paytda itargandek.

Amplitudaning qanchalik oshishi so'nishga bog'liq. So'nish kuchsiz bo'lsa (sifat faktori yuqori), rezonans cho'qqisi tor va juda baland bo'ladi. So'nish kuchli bo'lsa, cho'qqi keng va past bo'ladi.

Rezonans foydali bo'lishi ham, xavfli bo'lishi ham mumkin. Inshootlar loyihalanganda ularning xususiy chastotasi mumkin bo'lgan tashqi ta'sirlardan uzoqroq bo'lishi ta'minlanadi.

### Hayotiy misol
Askarlar ko'prikdan o'tganda qadam tashlashni to'xtatadi, chunki bir maromdagi qadam rezonans keltirib chiqarishi mumkin.`,
      formulas: [
        { latex: '\\omega_e \\approx \\omega_0', label: 'Rezonans sharti' },
        {
          latex: '\\omega_{rez} = \\sqrt{\\omega_0^2 - 2\\gamma^2}',
          label: 'Aniq rezonans chastotasi',
        },
        { latex: 'A_{max} = \\frac{F_0}{2 m \\gamma \\omega_0}', label: 'Maksimal amplituda' },
        { latex: 'Q = \\frac{\\omega_0}{\\Delta\\omega}', label: 'Sifat faktori' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: '\\omega_e \\approx \\omega_0',
        paramA: {
          key: 'omegaE',
          label: 'Haydovchi chastota ωe',
          unit: 'rad/s',
          min: 0.1,
          max: 20,
          step: 0.1,
          value: 5,
        },
        paramB: { key: 'Q', label: 'Sifat faktori Q', unit: '', min: 1, max: 100, step: 1, value: 20 },
      },
    },
    {
      code: '6.8',
      slug: 'garmonik-tolqin',
      order: 8,
      titleUz: "Garmonik to'lqin",
      titleEn: 'Harmonic wave',
      difficulty: 'ORTA',
      summary: "To'lqin tenglamasi, to'lqin uzunligi va faza tezligi.",
      keywords: ['tolqin', 'tolqin uzunligi', 'faza tezligi', 'tolqin soni', 'harmonic wave'],
      theory: `To'lqin — tebranishning muhitda tarqalishi. Muhim jihat shundaki, to'lqin energiya uzatadi, lekin moddani ko'chirmaydi: muhit zarrachalari faqat o'z muvozanat holati atrofida tebranadi.

Garmonik to'lqin tenglamasi ikki o'zgaruvchiga bog'liq: koordinata va vaqt. Ma'lum bir nuqtani kuzatsak, u vaqt bo'yicha garmonik tebranadi. Ma'lum bir lahzani suratga olsak, fazoda sinusoida ko'ramiz.

To'lqin uzunligi bir davr ichida to'lqin bosib o'tadigan masofaga teng. Faza tezligi to'lqin uzunligi va chastota ko'paytmasi orqali topiladi.

Muhim eslatma: to'lqin tezligi muhitning xossalariga bog'liq, chastota esa manbaga bog'liq. Shuning uchun to'lqin bir muhitdan boshqasiga o'tganda chastota o'zgarmaydi, to'lqin uzunligi esa o'zgaradi.

### Hayotiy misol
Tovush havoda 340 m/s, suvda esa to'rt barobar tezroq tarqaladi — shuning uchun suv ostida ovoz boshqacha eshitiladi.`,
      formulas: [
        { latex: 'y = A \\sin(k x - \\omega t + \\varphi)', label: "To'lqin tenglamasi" },
        { latex: '\\lambda = \\frac{2\\pi}{k}', label: "To'lqin uzunligi" },
        { latex: 'v = \\frac{\\omega}{k} = \\lambda f', label: 'Faza tezligi' },
        { latex: 'k = \\frac{2\\pi}{\\lambda}', label: "To'lqin soni" },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'v = \\lambda f',
        paramA: {
          key: 'lambda',
          label: "To'lqin uzunligi λ",
          unit: 'm',
          min: 0.1,
          max: 10,
          step: 0.1,
          value: 2,
        },
        paramB: { key: 'f', label: 'Chastota f', unit: 'Hz', min: 0.1, max: 20, step: 0.1, value: 2 },
      },
    },
    {
      code: '6.9',
      slug: 'tolqin-xususiyatlari',
      order: 9,
      titleUz: "To'lqin xususiyatlari",
      titleEn: 'Wave properties',
      difficulty: 'OSON',
      summary: "Ko'ndalang va bo'ylama to'lqinlar, asosiy parametrlar va energiya uzatish.",
      keywords: ['kondalang tolqin', 'boylama tolqin', 'transversal', 'longitudinal', 'energiya'],
      theory: `To'lqinlar zarrachalar tebranish yo'nalishiga qarab ikki turga bo'linadi. Ko'ndalang to'lqinda zarrachalar to'lqin tarqalish yo'nalishiga perpendikulyar tebranadi. Bo'ylama to'lqinda esa tebranish tarqalish yo'nalishi bo'ylab sodir bo'ladi va muhitda siqilish hamda siyraklashish sohalari hosil bo'ladi.

Muhim farq: bo'ylama to'lqinlar barcha muhitlarda tarqaladi, ko'ndalang to'lqinlar esa asosan qattiq jismlarda. Suyuqlik va gaz siljish deformatsiyasiga qarshilik ko'rsatmaydi.

To'lqinning asosiy parametrlari — amplituda, davr, chastota, to'lqin uzunligi va tezlik. To'lqin uzatadigan energiya amplituda kvadratiga proporsional: amplitudani ikki barobar oshirish energiyani to'rt barobar oshiradi.

### Hayotiy misol
Zilzila paytida avval tez bo'ylama to'lqinlar, keyin sekinroq ko'ndalang to'lqinlar yetib keladi. Ular orasidagi vaqt farqi orqali epimarkazgacha masofa aniqlanadi.`,
      formulas: [
        { latex: 'v = \\lambda f', label: 'Asosiy bog\u2018lanish' },
        { latex: 'T = \\frac{1}{f}', label: 'Davr va chastota' },
        { latex: 'E \\sim A^2', label: 'Energiya' },
        { latex: 'I = \\frac{P}{S}', label: 'Intensivlik' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'v = \\lambda f',
        paramA: { key: 'A', label: 'Amplituda A', unit: 'm', min: 0.1, max: 5, step: 0.1, value: 1 },
        paramB: { key: 'f', label: 'Chastota f', unit: 'Hz', min: 0.1, max: 20, step: 0.1, value: 3 },
      },
    },
    {
      code: '6.10',
      slug: 'tolqin-interferensiyasi',
      order: 10,
      titleUz: "To'lqin interferensiyasi",
      titleEn: 'Wave interference',
      difficulty: 'QIYIN',
      summary: "Ikki to'lqinning qo'shilishi, kuchayish va so'nish sohalari.",
      keywords: ['interferensiya', 'superpozitsiya', 'yol farqi', 'konstruktiv', 'destruktiv'],
      theory: `Bir nuqtaga bir vaqtda bir necha to'lqin yetib kelsa, natijaviy siljish ularning algebraik yig'indisiga teng bo'ladi. Bu superpozitsiya prinsipi deb ataladi.

Ikki to'lqin bir xil fazada uchrashsa, ular bir-birini kuchaytiradi va amplituda ortadi — bu konstruktiv interferensiya. Qarama-qarshi fazada uchrashsa, bir-birini so'ndiradi va amplituda kamayadi yoki butunlay nolga aylanadi — bu destruktiv interferensiya.

Qaysi holat yuz berishi yo'l farqiga bog'liq. Yo'l farqi to'lqin uzunligining butun soniga teng bo'lsa kuchayish, yarim to'lqin uzunligining toq soniga teng bo'lsa so'nish kuzatiladi.

Barqaror interferensiya manzarasi faqat kogerent, ya'ni bir xil chastotali va doimiy faza farqiga ega to'lqinlarda hosil bo'ladi.

### Hayotiy misol
Shovqinni bostiruvchi naushniklar tashqi shovqinga aynan qarama-qarshi fazadagi tovush to'lqinini qo'shib, uni so'ndiradi.`,
      formulas: [
        { latex: 'y = y_1 + y_2', label: 'Superpozitsiya prinsipi' },
        { latex: '\\delta = m \\lambda', label: 'Maksimum sharti' },
        {
          latex: '\\delta = \\left(m + \\tfrac{1}{2}\\right) \\lambda',
          label: 'Minimum sharti',
        },
        { latex: '\\Delta \\varphi = \\frac{2\\pi \\delta}{\\lambda}', label: 'Faza farqi' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: '\\delta = m \\lambda',
        paramA: {
          key: 'phase',
          label: 'Faza farqi',
          unit: '°',
          min: 0,
          max: 360,
          step: 5,
          value: 0,
        },
        paramB: {
          key: 'lambda',
          label: "To'lqin uzunligi λ",
          unit: 'm',
          min: 0.2,
          max: 5,
          step: 0.1,
          value: 1.5,
        },
      },
    },
    {
      code: '6.11',
      slug: 'turgun-tolqin',
      order: 11,
      titleUz: "Turg'un to'lqin",
      titleEn: 'Standing wave',
      difficulty: 'QIYIN',
      summary: "Qaytgan to'lqin interferensiyasi, tugunlar va bo'rtiqlar.",
      keywords: ['turgun tolqin', 'tugun', 'bortiq', 'garmonika', 'standing wave', 'tor'],
      theory: `Bir xil chastotali ikki to'lqin qarama-qarshi yo'nalishda tarqalganda turg'un to'lqin hosil bo'ladi. Odatda bu tushayotgan to'lqin va chegaradan qaytgan to'lqinning qo'shilishi natijasida yuzaga keladi.

Turg'un to'lqinda energiya uzatilmaydi. Uning o'rniga fazoda qo'zg'almas nuqtalar paydo bo'ladi. Tugunlarda amplituda doimo nolga teng, bo'rtiqlarda esa maksimal. Qo'shni tugunlar orasidagi masofa yarim to'lqin uzunligiga teng.

Ikki uchi mahkamlangan torda faqat aniq chastotalarga ega to'lqinlar mavjud bo'la oladi, chunki uchlarda albatta tugun bo'lishi kerak. Shu tarzda garmonik modlar to'plami hosil bo'ladi: asosiy ton va uning karrali chastotalari.

Tovushning tembri aynan shu garmonikalarning nisbati bilan belgilanadi.

### Hayotiy misol
Gitara torini bosib qisqartirganda uzunlik kamayadi va chastota ortadi — shu tarzda turli notalar olinadi.`,
      formulas: [
        { latex: 'y = 2A \\sin(k x) \\cos(\\omega t)', label: "Turg'un to'lqin tenglamasi" },
        { latex: 'x_{tugun} = \\frac{n \\lambda}{2}', label: 'Tugunlar' },
        { latex: 'x_{bortiq} = \\frac{(2n+1)\\lambda}{4}', label: 'Bo\u2018rtiqlar' },
        { latex: 'f_n = \\frac{n v}{2 L}', label: 'Garmonik chastotalar' },
      ],
      sim: {
        demoType: 'wave',
        accent: ACCENT,
        formula: 'f_n = \\frac{n v}{2 L}',
        paramA: { key: 'L', label: 'Tor uzunligi L', unit: 'm', min: 0.2, max: 3, step: 0.05, value: 1 },
        paramB: { key: 'n', label: 'Garmonika raqami n', unit: '', min: 1, max: 8, step: 1, value: 3 },
      },
    },
  ],
};
