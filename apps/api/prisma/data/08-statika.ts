import type { SectionSeed } from './types';

const ACCENT = '#78716C';

export const statika: SectionSeed = {
  code: '8',
  slug: 'statika',
  order: 8,
  titleUz: 'Statika',
  titleEn: 'Statics',
  description:
    "Muvozanat shartlari, kuch momenti, og'irlik markazi, barqarorlik va oddiy mexanizmlar.",
  icon: 'scale',
  color: ACCENT,
  topics: [
    {
      code: '8.1',
      slug: 'nuqtaviy-kuchlar-muvozanati',
      order: 1,
      titleUz: "Nuqtaga qo'llangan kuchlar muvozanati",
      titleEn: 'Equilibrium of concurrent forces',
      difficulty: 'OSON',
      summary: "Bir nuqtada kesishuvchi kuchlar uchun muvozanat sharti va kuch poligoni.",
      keywords: ['muvozanat', 'kuch poligoni', 'proyeksiya', 'concurrent forces'],
      theory: `Barcha kuchlar bitta nuqtada kesishsa, muvozanat uchun faqat bitta shart yetarli: kuchlarning vektor yig'indisi nolga teng bo'lishi kerak. Aylanish imkoniyati yo'q, shuning uchun momentlar sharti kerak emas.

Amalda ikki usul qo'llaniladi. Grafik usulda kuch vektorlari ketma-ket qo'yiladi va ular yopiq ko'pburchak hosil qilishi kerak. Agar ko'pburchak yopilmasa, qolgan tomon natijaviy kuchni ko'rsatadi.

Analitik usulda kuchlar koordinata o'qlariga proyeksiyalanadi va har bir o'q bo'yicha yig'indi nolga tenglashtiriladi. Bu ikkita tenglama beradi va shu orqali ikkita noma'lum topiladi.

Muvozanatlovchi kuch natijaviy kuchga teng, lekin qarama-qarshi yo'nalgan bo'ladi.

### Hayotiy misol
Ikki ustun orasiga tortilgan simda osilgan chiroq. Sim qanchalik gorizontal tortilsa, undagi taranglik shunchalik katta bo'ladi — shuning uchun simni mutlaqo tekis tortib bo'lmaydi.`,
      formulas: [
        { latex: '\\sum \\vec{F} = 0', label: 'Muvozanat sharti' },
        { latex: '\\sum F_x = 0', label: 'x o\u2018qi bo\u2018yicha' },
        { latex: '\\sum F_y = 0', label: 'y o\u2018qi bo\u2018yicha' },
        {
          latex: '\\frac{F_1}{\\sin\\alpha_1} = \\frac{F_2}{\\sin\\alpha_2}',
          label: 'Lami teoremasi',
        },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: '\\sum \\vec{F} = 0',
        paramA: { key: 'F1', label: 'Kuch F1', unit: 'N', min: 0, max: 200, step: 1, value: 50 },
        paramB: {
          key: 'alpha',
          label: 'Burchak α',
          unit: '°',
          min: 0,
          max: 180,
          step: 1,
          value: 60,
        },
      },
    },
    {
      code: '8.2',
      slug: 'parallel-kuchlar-muvozanati',
      order: 2,
      titleUz: 'Parallel kuchlar muvozanati',
      titleEn: 'Equilibrium of parallel forces',
      difficulty: 'ORTA',
      summary: "Parallel kuchlar tizimida ikki muvozanat sharti va natijaviy kuchning joyi.",
      keywords: ['parallel kuchlar', 'natijaviy kuch', 'juft kuch', 'moment'],
      theory: `Kuchlar bir-biriga parallel bo'lganda ikkita muvozanat sharti kerak bo'ladi: kuchlar yig'indisi va momentlar yig'indisi ham nolga teng bo'lishi lozim. Faqat birinchi shart bajarilsa, jism siljimaydi, lekin aylanishi mumkin.

Bir yo'nalishdagi parallel kuchlarning natijaviy kuchi ularning yig'indisiga teng va kuchlar orasidagi masofani teskari nisbatda bo'ladigan nuqtadan o'tadi. Katta kuchga yaqinroq joyda.

Alohida holat — juft kuch: teng kattalikdagi, qarama-qarshi yo'nalgan ikki parallel kuch. Ularning yig'indisi nolga teng, lekin momenti nolga teng emas. Shuning uchun juft kuch jismni siljitmaydi, faqat aylantiradi.

Juft kuch momenti tanlangan nuqtaga bog'liq emas.

### Hayotiy misol
Avtomobil rulini ikki qo'l bilan burash — bu tipik juft kuch. Rul markazga siljimaydi, faqat aylanadi.`,
      formulas: [
        { latex: '\\sum F = 0', label: 'Kuchlar sharti' },
        { latex: '\\sum M = 0', label: 'Momentlar sharti' },
        { latex: 'R = F_1 + F_2', label: 'Natijaviy kuch' },
        { latex: '\\frac{F_1}{F_2} = \\frac{d_2}{d_1}', label: 'Masofalar nisbati' },
        { latex: 'M = F d', label: 'Juft kuch momenti' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: '\\frac{F_1}{F_2} = \\frac{d_2}{d_1}',
        paramA: { key: 'F1', label: 'Kuch F1', unit: 'N', min: 1, max: 200, step: 1, value: 60 },
        paramB: { key: 'F2', label: 'Kuch F2', unit: 'N', min: 1, max: 200, step: 1, value: 40 },
      },
    },
    {
      code: '8.3',
      slug: 'moment-tushunchasi',
      order: 3,
      titleUz: 'Moment (torque) tushunchasi',
      titleEn: 'Torque',
      difficulty: 'ORTA',
      summary: "Kuchning aylantiruvchi ta'siri, moment qo'li va o'ng qo'l qoidasi.",
      keywords: ['moment', 'torque', 'moment qoli', 'aylantirish', 'vektor kopaytma'],
      theory: `Kuch momenti kuchning jismni aylantirish qobiliyatini o'lchaydi. U kuch, aylanish o'qigacha bo'lgan masofa va ular orasidagi burchak sinusining ko'paytmasiga teng.

Moment qo'li — aylanish o'qidan kuch ta'sir chizig'igacha bo'lgan eng qisqa, ya'ni perpendikulyar masofa. Moment qo'li qanchalik uzun bo'lsa, bir xil kuch shuncha katta moment beradi.

Kuch aylanish o'qi tomon yo'nalgan bo'lsa, moment nolga teng bo'ladi. Maksimal moment esa kuch radiusga perpendikulyar bo'lganda olinadi.

Moment vektor kattalik hisoblanadi va yo'nalishi o'ng qo'l qoidasi bilan aniqlanadi. Soat mili yo'nalishiga qarshi momentlar odatda musbat deb olinadi.

Moment nyuton-metrda o'lchanadi.

### Hayotiy misol
Eshik tutqichi menteshadan eng uzoqqa o'rnatiladi. Menteshaga yaqin joyni itarib eshikni ochish ancha qiyin — moment qo'li qisqa.`,
      formulas: [
        { latex: '\\vec{M} = \\vec{r} \\times \\vec{F}', label: 'Moment vektori' },
        { latex: 'M = r F \\sin\\theta', label: 'Skalyar ko\u2018rinish' },
        { latex: 'M = F d', label: 'Moment qo\u2018li orqali' },
        { latex: '[M] = \\text{N} \\cdot \\text{m}', label: 'Birlik' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: 'M = r F \\sin\\theta',
        paramA: { key: 'F', label: 'Kuch F', unit: 'N', min: 0, max: 200, step: 1, value: 50 },
        paramB: {
          key: 'theta',
          label: 'Burchak θ',
          unit: '°',
          min: 0,
          max: 180,
          step: 1,
          value: 90,
        },
      },
    },
    {
      code: '8.4',
      slug: 'momentlar-muvozanati',
      order: 4,
      titleUz: 'Momentlar muvozanati',
      titleEn: 'Rotational equilibrium',
      difficulty: 'ORTA',
      summary: "Aylanma muvozanat sharti va tayanch nuqtasini tanlash.",
      keywords: ['momentlar muvozanati', 'richag', 'tayanch nuqta', 'rotational equilibrium'],
      theory: `Jism aylanmasligi uchun unga qo'yilgan barcha kuchlarning momentlari yig'indisi nolga teng bo'lishi kerak. Soat mili yo'nalishidagi momentlar unga qarshi yo'nalgan momentlarni to'liq muvozanatlashi lozim.

Muhim amaliy qulaylik: jism muvozanatda bo'lsa, momentlarni istalgan nuqtaga nisbatan hisoblash mumkin va natija bir xil bo'ladi. Shuning uchun tayanch nuqtasi sifatida noma'lum kuchlardan biri qo'yilgan nuqtani tanlash ma'qul — shunda o'sha kuchning momenti nolga aylanadi va tenglama soddalashadi.

To'liq muvozanat uchun ikkala shart ham bajarilishi kerak: kuchlar yig'indisi ham, momentlar yig'indisi ham nolga teng bo'lsin.

Bu usul balka, ko'prik va kran hisoblarida asosiy vosita hisoblanadi.

### Hayotiy misol
Arg'imchoqda og'ir odam tayanchga yaqinroq, yengil odam esa uzoqroq o'tirsa muvozanat saqlanadi.`,
      formulas: [
        { latex: '\\sum M = 0', label: 'Aylanma muvozanat' },
        { latex: '\\sum M_{soat} = \\sum M_{qarshi}', label: 'Kengaytirilgan ko\u2018rinish' },
        { latex: 'F_1 d_1 = F_2 d_2', label: 'Ikki kuch uchun' },
        { latex: '\\sum \\vec{F} = 0', label: "To'liq muvozanatning ikkinchi sharti" },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: 'F_1 d_1 = F_2 d_2',
        paramA: { key: 'F1', label: 'Kuch F1', unit: 'N', min: 1, max: 500, step: 1, value: 100 },
        paramB: { key: 'd1', label: 'Masofa d1', unit: 'm', min: 0.1, max: 5, step: 0.1, value: 1 },
      },
    },
    {
      code: '8.5',
      slug: 'richag-turlari',
      order: 5,
      titleUz: 'Richag turlari',
      titleEn: 'Types of levers',
      difficulty: 'OSON',
      summary: "Uch turdagi richag va mexanik foyda tushunchasi.",
      keywords: ['richag', 'mexanik foyda', 'tayanch', 'lever', 'oddiy mexanizm'],
      theory: `Richag — tayanch nuqta atrofida aylanuvchi qattiq sterjen. Tayanch, yuk va kuchning o'zaro joylashuviga qarab uch turga bo'linadi.

Birinchi turda tayanch o'rtada joylashadi. Bunday richag kuchdan ham, tezlikdan ham yutish mumkin — bu tayanchning qayerda ekaniga bog'liq. Qaychi va lom shu turga kiradi.

Ikkinchi turda yuk o'rtada bo'ladi. Bunday richag har doim kuchdan yutadi, chunki kuch qo'li yuk qo'lidan uzun. Tuguncha va yong'oq chaqqich misol bo'ladi.

Uchinchi turda kuch o'rtada qo'yiladi. Bunday richag kuchdan yutqazadi, lekin harakat tezligi va masofasidan yutadi. Inson bilagi va pinset shunday ishlaydi.

Oltin qoida: hech qanday mexanizm ishdan yuta olmaydi.

### Hayotiy misol
Bilak mushagi tirsakka juda yaqin birikkan, shuning uchun 5 kg yukni ushlash uchun mushak taxminan 35 kg ga teng kuch hosil qilishi kerak.`,
      formulas: [
        { latex: 'F_1 d_1 = F_2 d_2', label: 'Richag qoidasi' },
        { latex: 'MA = \\frac{F_{yuk}}{F_{kuch}}', label: 'Mexanik foyda' },
        { latex: 'MA = \\frac{d_{kuch}}{d_{yuk}}', label: 'Masofalar orqali' },
        { latex: '\\eta = \\frac{A_{foydali}}{A_{sarflangan}}', label: 'Foydali ish koeffitsiyenti' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: 'MA = \\frac{d_{kuch}}{d_{yuk}}',
        paramA: {
          key: 'dEffort',
          label: 'Kuch qo\u2018li',
          unit: 'm',
          min: 0.1,
          max: 3,
          step: 0.05,
          value: 1.5,
        },
        paramB: {
          key: 'dLoad',
          label: 'Yuk qo\u2018li',
          unit: 'm',
          min: 0.05,
          max: 3,
          step: 0.05,
          value: 0.5,
        },
      },
    },
    {
      code: '8.6',
      slug: 'ogirlik-markazi',
      order: 6,
      titleUz: "Og'irlik markazi",
      titleEn: 'Center of gravity',
      difficulty: 'ORTA',
      summary: "Og'irlik kuchining qo'yilish nuqtasi va uni aniqlash usullari.",
      keywords: ['ogirlik markazi', 'massa markazi', 'muvozanat nuqtasi', 'simmetriya'],
      theory: `Og'irlik markazi — jismning barcha qismlariga ta'sir qiluvchi og'irlik kuchlarining natijaviy kuchi qo'yilgan nuqta. Bir jinsli maydonda u massa markazi bilan ustma-ust tushadi.

Simmetrik jismlarda og'irlik markazi simmetriya markazida yotadi. Murakkab jismlar uchun uni tarkibiy qismlarga ajratib, har birining massasi va koordinatasi orqali hisoblash mumkin.

Muhim jihat: og'irlik markazi jismning ichida bo'lishi shart emas. Halqa, taqa yoki bumerangda u moddadan tashqarida joylashadi.

Tajribada uni aniqlash oson: jismni turli nuqtalardan osib, har safar shovun chizig'ini chizish kifoya. Chiziqlarning kesishgan nuqtasi og'irlik markazini beradi.

### Hayotiy misol
Balandlikka sakrash sportchisi tanasini shunday egadiki, og'irlik markazi to'siq ostidan o'tadi, tanasi esa ustidan oshib o'tadi.`,
      formulas: [
        { latex: 'x_c = \\frac{\\sum m_i x_i}{\\sum m_i}', label: 'x koordinatasi' },
        { latex: 'y_c = \\frac{\\sum m_i y_i}{\\sum m_i}', label: 'y koordinatasi' },
        { latex: '\\vec{r}_c = \\frac{\\sum m_i \\vec{r}_i}{M}', label: 'Vektor ko\u2018rinishi' },
        { latex: 'W = M g', label: "Natijaviy og'irlik" },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: 'x_c = \\frac{\\sum m_i x_i}{\\sum m_i}',
        paramA: {
          key: 'm1',
          label: 'Birinchi massa',
          unit: 'kg',
          min: 0.5,
          max: 50,
          step: 0.5,
          value: 10,
        },
        paramB: {
          key: 'm2',
          label: 'Ikkinchi massa',
          unit: 'kg',
          min: 0.5,
          max: 50,
          step: 0.5,
          value: 30,
        },
      },
    },
    {
      code: '8.7',
      slug: 'barqarorlik-shartlari',
      order: 7,
      titleUz: 'Barqarorlik shartlari',
      titleEn: 'Stability conditions',
      difficulty: 'ORTA',
      summary: "Barqaror, beqaror va befarq muvozanat hamda ag'darilish sharti.",
      keywords: ['barqarorlik', 'tayanch yuzasi', 'agdarilish', 'kritik burchak', 'stability'],
      theory: `Muvozanat uch xil bo'ladi. Barqaror muvozanatda jism biroz chetlatilsa, o'z holiga qaytadi — chunki og'irlik markazi ko'tariladi. Beqaror muvozanatda esa kichik turtki ham jismni butunlay chetga chiqaradi. Befarq muvozanatda jism yangi holatida qoladi.

Yerda turgan jismning ag'darilmasligi uchun og'irlik markazidan tushirilgan shovun chizig'i tayanch yuzasi ichidan o'tishi kerak. Chiziq chegaradan chiqqan zahoti jism ag'dariladi.

Shundan ikki muhim xulosa kelib chiqadi: tayanch yuzasi qanchalik keng va og'irlik markazi qanchalik past bo'lsa, jism shunchalik barqaror.

Kritik og'ish burchagi tayanch kengligi va balandlik nisbatiga bog'liq.

### Hayotiy misol
Poyga avtomobillari juda past va keng qilib yasaladi. Yuk ortilgan baland furgon esa burilishda ag'darilib ketishi mumkin.`,
      formulas: [
        { latex: '\\Delta E_p > 0', label: 'Barqaror muvozanat' },
        { latex: '\\Delta E_p < 0', label: 'Beqaror muvozanat' },
        {
          latex: '\\tan\\theta_{kr} = \\frac{d}{h}',
          label: 'Kritik burchak',
        },
        { latex: 'M_{qaytaruvchi} > M_{agdaruvchi}', label: 'Barqarorlik sharti' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: '\\tan\\theta_{kr} = \\frac{d}{h}',
        paramA: {
          key: 'd',
          label: 'Tayanch yarim kengligi',
          unit: 'm',
          min: 0.1,
          max: 2,
          step: 0.05,
          value: 0.5,
        },
        paramB: {
          key: 'h',
          label: 'Markaz balandligi',
          unit: 'm',
          min: 0.1,
          max: 3,
          step: 0.05,
          value: 1,
        },
      },
    },
    {
      code: '8.8',
      slug: 'blok-sistemalari',
      order: 8,
      titleUz: 'Blok sistemalari',
      titleEn: 'Pulley systems',
      difficulty: 'ORTA',
      summary: "Qo'zg'almas va qo'zg'aluvchan bloklar hamda polispast mexanik foydasi.",
      keywords: ['blok', 'polispast', 'mexanik foyda', 'arqon', 'pulley'],
      theory: `Qo'zg'almas blok o'z o'qi atrofida aylanadi, lekin joyidan siljimaydi. U kuchdan yutish bermaydi, faqat kuch yo'nalishini o'zgartiradi. Bu ham katta qulaylik: yuqoriga ko'tarish o'rniga pastga tortish mumkin bo'ladi.

Qo'zg'aluvchan blok yuk bilan birga ko'tariladi. U kuchni ikki barobar kamaytiradi, chunki yuk ikkita arqon tarmog'iga taqsimlanadi. Lekin arqonni ikki barobar uzunroq tortish kerak bo'ladi.

Polispast bir necha blokni birlashtiradi va mexanik foyda yukni ko'tarib turgan arqon tarmoqlari soniga teng bo'ladi.

Mexanikaning oltin qoidasi bu yerda ham amal qiladi: kuchdan qancha yutsak, masofadan shuncha yutqazamiz. Bajarilgan ish o'zgarmaydi.

### Hayotiy misol
Qurilish kranlari, lift mexanizmlari va yelkanli kemalarning arqon tizimlari polispast asosida ishlaydi.`,
      formulas: [
        { latex: 'MA = 1', label: "Qo'zg'almas blok" },
        { latex: 'MA = 2', label: "Qo'zg'aluvchan blok" },
        { latex: 'MA = n', label: 'Polispast (n tarmoq)' },
        { latex: 'F = \\frac{m g}{n}', label: 'Kerakli kuch' },
        { latex: 's = n h', label: 'Arqon uzunligi' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: 'F = \\frac{m g}{n}',
        paramA: { key: 'm', label: 'Yuk massasi m', unit: 'kg', min: 1, max: 500, step: 1, value: 100 },
        paramB: { key: 'n', label: 'Tarmoqlar soni n', unit: '', min: 1, max: 8, step: 1, value: 4 },
      },
    },
    {
      code: '8.9',
      slug: 'qiyalik',
      order: 9,
      titleUz: 'Qiyalik (inclined plane)',
      titleEn: 'Inclined plane',
      difficulty: 'ORTA',
      summary: "Og'irlik kuchining tashkil etuvchilari va qiyalikning mexanik foydasi.",
      keywords: ['qiyalik', 'komponentlar', 'normal kuch', 'sirpanish burchagi', 'inclined plane'],
      theory: `Qiyalikda turgan jismning og'irlik kuchi ikkita tashkil etuvchiga ajratiladi. Sirtga parallel tashkil etuvchi jismni pastga sirg'antirishga intiladi, perpendikulyar tashkil etuvchi esa sirtga bosadi va normal reaksiya kuchini belgilaydi.

Burchak ortgan sari sirg'antiruvchi tashkil etuvchi ortadi, bosuvchi tashkil etuvchi esa kamayadi. Shu sababli tik qiyalikda jismni ushlab turish qiyinroq.

Jism sirg'anmasligi uchun ishqalanish kuchi sirg'antiruvchi tashkil etuvchidan kam bo'lmasligi kerak. Bu shartdan sirg'anish burchagi kelib chiqadi: uning tangensi ishqalanish koeffitsiyentiga teng bo'ladi.

Qiyalik oddiy mexanizm sifatida kuchdan yutish beradi: burchak qanchalik kichik bo'lsa, ko'tarish uchun shunchalik kam kuch kerak, lekin yo'l uzayadi.

### Hayotiy misol
Nogironlar aravachasi uchun pandus qanchalik uzun bo'lsa, ko'tarilish shunchalik oson bo'ladi.`,
      formulas: [
        { latex: 'F_{\\parallel} = m g \\sin\\theta', label: 'Sirg\u2018antiruvchi tashkil etuvchi' },
        { latex: 'N = m g \\cos\\theta', label: 'Normal kuch' },
        { latex: '\\tan\\theta = \\mu', label: 'Sirg\u2018anish burchagi' },
        { latex: 'MA = \\frac{1}{\\sin\\theta}', label: 'Mexanik foyda' },
        { latex: 'a = g(\\sin\\theta - \\mu\\cos\\theta)', label: 'Tezlanish' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: 'F_{\\parallel} = m g \\sin\\theta',
        paramA: {
          key: 'theta',
          label: 'Qiyalik burchagi θ',
          unit: '°',
          min: 0,
          max: 90,
          step: 1,
          value: 30,
        },
        paramB: { key: 'm', label: 'Massa m', unit: 'kg', min: 1, max: 200, step: 1, value: 20 },
      },
    },
    {
      code: '8.10',
      slug: 'vint-mexanizmi',
      order: 10,
      titleUz: 'Vint mexanizmi',
      titleEn: 'Screw mechanism',
      difficulty: 'QIYIN',
      summary: "Vintning spiral qiyalik sifatidagi tabiati va katta mexanik foydasi.",
      keywords: ['vint', 'qadam', 'spiral qiyalik', 'domkrat', 'self-locking'],
      theory: `Vint aslida silindr atrofiga o'ralgan qiyalikdir. Qadam — vintning bir to'liq aylanishida o'tadigan masofa, ya'ni qo'shni o'ramlar orasidagi oraliq.

Bir aylanishda qo'l dastaning uzunligiga mos aylana bo'ylab uzun yo'l bosadi, vint esa atigi bir qadamga siljiydi. Mexanik foyda aynan shu ikki masofa nisbatiga teng va u juda katta bo'lishi mumkin — bir necha yuzga yetadi.

Vintning muhim xususiyati — o'z-o'zidan qulflanish. Ishqalanish burchagi qiyalik burchagidan katta bo'lsa, yuk vintni orqaga aylantira olmaydi. Shuning uchun domkrat ostidagi avtomobil o'z og'irligi bilan pastga tushmaydi.

Bu foydali xususiyat uchun to'lov — past foydali ish koeffitsiyenti. Energiyaning katta qismi ishqalanishga sarflanadi.

### Hayotiy misol
Avtomobil domkrati, tiskilar va suv quvurlaridagi ventil — barchasi vint mexanizmiga asoslangan.`,
      formulas: [
        { latex: 'MA = \\frac{2\\pi r}{p}', label: 'Mexanik foyda' },
        { latex: 'F = \\frac{m g p}{2\\pi r}', label: 'Kerakli kuch' },
        { latex: 'M = F r', label: 'Aylantiruvchi moment' },
        { latex: '\\tan\\alpha = \\frac{p}{2\\pi r}', label: 'Spiral burchagi' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: 'MA = \\frac{2\\pi r}{p}',
        paramA: {
          key: 'r',
          label: 'Dasta uzunligi r',
          unit: 'm',
          min: 0.05,
          max: 1,
          step: 0.01,
          value: 0.3,
        },
        paramB: {
          key: 'p',
          label: 'Vint qadami p',
          unit: 'mm',
          min: 0.5,
          max: 20,
          step: 0.5,
          value: 3,
        },
      },
    },
  ],
};
