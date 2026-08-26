import type { SectionSeed } from './types';

const ACCENT = '#0EA5E9';

export const suyuqlik: SectionSeed = {
  code: '9',
  slug: 'suyuqlik-mexanikasi',
  order: 9,
  titleUz: 'Suyuqlik mexanikasi',
  titleEn: 'Fluid mechanics',
  description:
    "Zichlik, bosim, Arximed va Paskal qonunlari, Bernulli tenglamasi va oqim turlari.",
  icon: 'droplets',
  color: ACCENT,
  topics: [
    {
      code: '9.1',
      slug: 'zichlik',
      order: 1,
      titleUz: "Zichlik va solishtirma og'irlik",
      titleEn: 'Density and specific gravity',
      difficulty: 'OSON',
      summary: "Massaning hajmga nisbati va materiallarni taqqoslash usuli.",
      keywords: ['zichlik', 'hajm', 'massa', 'solishtirma ogirlik', 'density'],
      theory: `Zichlik moddaning massasi va hajmi nisbatiga teng bo'lib, birlik hajmdagi modda miqdorini ko'rsatadi. Xalqaro birliklar tizimida u kilogramm bo'lingan kub metrda o'lchanadi.

Zichlik moddaning o'ziga xos xususiyati hisoblanadi va uni aniqlashda ishlatiladi. Suvning zichligi taxminan 1000, temirniki 7800, oltinniki esa 19 300 birlikni tashkil qiladi.

Solishtirma og'irlik — moddaning zichligini suv zichligiga nisbati. U o'lchamsiz son bo'lgani uchun turli birliklar tizimida bir xil qiymatga ega bo'ladi.

Zichlik haroratga bog'liq: isitilganda moddalar kengayadi va zichligi kamayadi. Suvning noodatiy xossasi bor — u 4 daraja Selsiyda eng zich holatda bo'ladi. Aynan shuning uchun muz suv yuzasida qalqib yuradi.

### Hayotiy misol
1 kg paxta va 1 kg temir bir xil massaga ega, lekin paxta juda katta hajmni egallaydi.`,
      formulas: [
        { latex: '\\rho = \\frac{m}{V}', label: 'Zichlik' },
        { latex: 'm = \\rho V', label: 'Massa' },
        { latex: 'SG = \\frac{\\rho}{\\rho_{suv}}', label: "Solishtirma og'irlik" },
        {
          latex: '\\rho_{suv} = 1000\\ \\text{kg/m}^3',
          label: 'Suv zichligi',
        },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: '\\rho = \\frac{m}{V}',
        paramA: { key: 'm', label: 'Massa m', unit: 'kg', min: 0.1, max: 100, step: 0.1, value: 10 },
        paramB: { key: 'V', label: 'Hajm V', unit: 'm³', min: 0.001, max: 0.1, step: 0.001, value: 0.01 },
      },
    },
    {
      code: '9.2',
      slug: 'gidrostatik-bosim',
      order: 2,
      titleUz: 'Gidrostatik bosim',
      titleEn: 'Hydrostatic pressure',
      difficulty: 'OSON',
      summary: "Suyuqlik ustunining bosimi va uning chuqurlikka bog'liqligi.",
      keywords: ['bosim', 'chuqurlik', 'atmosfera bosimi', 'manometr', 'paskal'],
      theory: `Suyuqlik ichidagi bosim uning og'irligi tufayli vujudga keladi va zichlik, erkin tushish tezlanishi hamda chuqurlikning ko'paytmasiga teng.

Bosim chuqurlik bilan chiziqli ortadi. Suvda har 10 metr chuqurlikda bosim taxminan bir atmosferaga ortadi. Muhim jihat: bosim faqat chuqurlikka bog'liq, idishning shakli yoki suyuqlik miqdoriga bog'liq emas.

Bosim barcha yo'nalishlarda bir xil ta'sir qiladi va sirtga har doim perpendikulyar yo'naladi.

Amalda ikki xil bosim ishlatiladi. Mutlaq bosim atmosfera bosimini ham o'z ichiga oladi, manometrik bosim esa faqat atmosferadan ortiqchasini ko'rsatadi. G'ildirak manometri aynan ikkinchisini o'lchaydi.

### Hayotiy misol
G'avvoslar chuqurlikka sekin tushadi va sekin ko'tariladi, chunki keskin bosim o'zgarishi jiddiy kasallikka olib keladi.`,
      formulas: [
        { latex: 'P = \\rho g h', label: 'Gidrostatik bosim' },
        { latex: 'P_{mutlaq} = P_0 + \\rho g h', label: 'Mutlaq bosim' },
        {
          latex: 'P_0 \\approx 101\\,325\\ \\text{Pa}',
          label: 'Atmosfera bosimi',
        },
        { latex: 'P = \\frac{F}{S}', label: "Bosim ta'rifi" },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: 'P = \\rho g h',
        paramA: { key: 'h', label: 'Chuqurlik h', unit: 'm', min: 0, max: 50, step: 0.5, value: 10 },
        paramB: {
          key: 'rho',
          label: 'Zichlik ρ',
          unit: 'kg/m³',
          min: 500,
          max: 14000,
          step: 50,
          value: 1000,
        },
      },
    },
    {
      code: '9.3',
      slug: 'pascal-qonuni',
      order: 3,
      titleUz: 'Paskal qonuni',
      titleEn: "Pascal's law",
      difficulty: 'ORTA',
      summary: "Bosimning suyuqlik bo'ylab o'zgarmasdan uzatilishi va gidravlik press.",
      keywords: ['Paskal', 'gidravlik press', 'bosim uzatish', 'tormoz tizimi'],
      theory: `Paskal qonuniga ko'ra, suyuqlikka ko'rsatilgan tashqi bosim uning barcha nuqtalariga o'zgarmasdan, bir xil kattalikda uzatiladi. Bu suyuqliklarning amalda siqilmasligi natijasidir.

Qonun gidravlik mashinalar asosida yotadi. Kichik yuzali porshenga kichik kuch qo'yilsa, suyuqlikda ma'lum bosim hosil bo'ladi. Bu bosim katta yuzali porshenga uzatilganda juda katta kuch beradi, chunki kuch yuzaga proporsional.

Yuzalar nisbati mexanik foydani belgilaydi. Yuzalar farqi yuz barobar bo'lsa, kuch ham yuz barobar ortadi.

Lekin energiya bu yerda ham bekorga paydo bo'lmaydi: katta porshen kichik porshenga qaraganda ancha kam masofaga siljiydi.

### Hayotiy misol
Avtomobil tormoz tizimida pedalga bosilgan kuch suyuqlik orqali to'rt g'ildirakka uzatiladi va bir necha barobar kuchaytiriladi.`,
      formulas: [
        { latex: '\\frac{F_1}{A_1} = \\frac{F_2}{A_2}', label: 'Paskal qonuni' },
        { latex: 'F_2 = F_1 \\frac{A_2}{A_1}', label: 'Kuch kuchaytirish' },
        { latex: 'MA = \\frac{A_2}{A_1}', label: 'Mexanik foyda' },
        { latex: 'A_1 h_1 = A_2 h_2', label: 'Hajm saqlanishi' },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: 'F_2 = F_1 \\frac{A_2}{A_1}',
        paramA: {
          key: 'F1',
          label: 'Kichik porshen kuchi',
          unit: 'N',
          min: 1,
          max: 500,
          step: 1,
          value: 100,
        },
        paramB: {
          key: 'ratio',
          label: 'Yuzalar nisbati',
          unit: '×',
          min: 1,
          max: 100,
          step: 1,
          value: 20,
        },
      },
    },
    {
      code: '9.4',
      slug: 'ulanuvchi-idishlar',
      order: 4,
      titleUz: 'Ulanuvchi idishlar',
      titleEn: 'Communicating vessels',
      difficulty: 'OSON',
      summary: "Ulangan idishlarda suyuqlik sathining tenglashishi.",
      keywords: ['ulanuvchi idishlar', 'sath', 'suv sathi', 'gidrostatik muvozanat'],
      theory: `Bir-biri bilan tutashtirilgan idishlarda bir xil bir jinsli suyuqlik quyilsa, uning sathi barcha idishlarda bir xil balandlikda o'rnashadi. Idishlarning shakli, kengligi va og'ish burchagi bunga ta'sir qilmaydi.

Sabab oddiy: agar sathlar teng bo'lmasa, tutashgan joyda bosimlar farqi paydo bo'ladi va suyuqlik bosim katta tomondan kichik tomonga oqadi. Oqim faqat sathlar tenglashgandagina to'xtaydi.

Turli zichlikdagi aralashmaydigan suyuqliklar quyilsa, manzara o'zgaradi. Bu holda sathlar teng bo'lmaydi: yengil suyuqlik ustuni balandroq turadi. Ularning balandliklari zichliklarga teskari proporsional bo'ladi.

### Hayotiy misol
Qurilishda ishlatiladigan suvli daraja shu prinsipga asoslangan — u uzoq masofadagi ikki nuqtaning bir sathda ekanini aniq ko'rsatadi. Choynak jo'mragi ham xuddi shunday ishlaydi.`,
      formulas: [
        { latex: 'h_1 = h_2', label: 'Bir xil suyuqlik uchun' },
        { latex: '\\rho_1 h_1 = \\rho_2 h_2', label: 'Turli suyuqliklar uchun' },
        { latex: 'P_1 = P_2', label: 'Bosimlar tengligi' },
        { latex: '\\frac{h_1}{h_2} = \\frac{\\rho_2}{\\rho_1}', label: 'Balandliklar nisbati' },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: '\\rho_1 h_1 = \\rho_2 h_2',
        paramA: {
          key: 'rho1',
          label: 'Birinchi suyuqlik ρ1',
          unit: 'kg/m³',
          min: 500,
          max: 2000,
          step: 10,
          value: 1000,
        },
        paramB: {
          key: 'rho2',
          label: 'Ikkinchi suyuqlik ρ2',
          unit: 'kg/m³',
          min: 500,
          max: 14000,
          step: 10,
          value: 800,
        },
      },
    },
    {
      code: '9.5',
      slug: 'arximed-qonuni',
      order: 5,
      titleUz: 'Arximed qonuni',
      titleEn: "Archimedes' principle",
      difficulty: 'ORTA',
      summary: "Suyuqlikka botirilgan jismga ta'sir qiluvchi itaruvchi kuch.",
      keywords: ['Arximed', 'itaruvchi kuch', 'siqib chiqarilgan hajm', 'buoyancy'],
      theory: `Suyuqlikka botirilgan jismga yuqoriga yo'nalgan itaruvchi kuch ta'sir qiladi. Bu kuch jism siqib chiqargan suyuqlikning og'irligiga teng.

Kuchning kelib chiqishi bosim farqidan. Jismning pastki yuzasi yuqori yuzasiga qaraganda chuqurroqda joylashgani uchun undagi bosim kattaroq bo'ladi. Shu farq yuqoriga yo'nalgan natijaviy kuchni beradi.

Itaruvchi kuch faqat suyuqlik zichligi va botgan hajmga bog'liq. Jismning o'z zichligi yoki nimadan yasalgani ahamiyatsiz: bir xil hajmdagi po'lat va yog'och bo'lak to'liq botganda bir xil itaruvchi kuch oladi.

Shu sababli suvdagi jism yengilroq tuyuladi — bu ko'rinma og'irlik.

### Hayotiy misol
Po'latdan yasalgan ulkan kema suvda qalqib yuradi, chunki uning ichi bo'sh va u juda katta hajmdagi suvni siqib chiqaradi.`,
      formulas: [
        { latex: 'F_A = \\rho_s g V_{bot}', label: 'Itaruvchi kuch' },
        { latex: 'F_A = m_{siqib} g', label: 'Siqib chiqarilgan og\u2018irlik' },
        { latex: 'W_{kor} = m g - F_A', label: "Ko'rinma og'irlik" },
        { latex: 'V_{bot} = \\frac{F_A}{\\rho_s g}', label: 'Botgan hajm' },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: 'F_A = \\rho_s g V',
        paramA: {
          key: 'V',
          label: 'Botgan hajm V',
          unit: 'm³',
          min: 0.001,
          max: 0.5,
          step: 0.001,
          value: 0.05,
        },
        paramB: {
          key: 'rho',
          label: 'Suyuqlik zichligi ρ',
          unit: 'kg/m³',
          min: 500,
          max: 14000,
          step: 50,
          value: 1000,
        },
      },
    },
    {
      code: '9.6',
      slug: 'suzish-va-chokish',
      order: 6,
      titleUz: "Suzish va cho'kish shartlari",
      titleEn: 'Floating and sinking',
      difficulty: 'ORTA',
      summary: "Zichliklar taqqoslash orqali jismning suyuqlikdagi holatini aniqlash.",
      keywords: ['suzish', 'chokish', 'zichlik taqqoslash', 'neytral', 'floating'],
      theory: `Jismning suyuqlikdagi taqdiri ikki kuch nisbati bilan hal bo'ladi: pastga yo'nalgan og'irlik kuchi va yuqoriga yo'nalgan itaruvchi kuch. Ularni taqqoslash zichliklarni taqqoslashga keltiriladi.

Jism zichligi suyuqlik zichligidan kichik bo'lsa, u yuzaga qalqib chiqadi va qisman botgan holda muvozanatlashadi. Bunda botgan hajm shunday bo'ladiki, siqib chiqarilgan suyuqlik og'irligi jism og'irligiga aynan teng bo'lsin.

Jism zichligi kattaroq bo'lsa, u cho'kadi. Zichliklar teng bo'lganda esa jism suyuqlikning istalgan chuqurligida muvozanatda qoladi — bu neytral suzish deb ataladi.

Suzuvchi jismning qancha qismi suv ostida qolishi zichliklar nisbati bilan aniqlanadi.

### Hayotiy misol
Muzning zichligi suvnikidan taxminan 10 foizga kichik — shuning uchun aysbergning atigi o'ndan bir qismi suv ustida ko'rinadi.`,
      formulas: [
        { latex: '\\rho_j < \\rho_s', label: 'Suzish sharti' },
        { latex: '\\rho_j > \\rho_s', label: "Cho'kish sharti" },
        { latex: '\\rho_j = \\rho_s', label: 'Neytral suzish' },
        {
          latex: '\\frac{V_{bot}}{V} = \\frac{\\rho_j}{\\rho_s}',
          label: 'Botgan qism ulushi',
        },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: '\\frac{V_{bot}}{V} = \\frac{\\rho_j}{\\rho_s}',
        paramA: {
          key: 'rhoObj',
          label: 'Jism zichligi',
          unit: 'kg/m³',
          min: 100,
          max: 3000,
          step: 10,
          value: 900,
        },
        paramB: {
          key: 'rhoFluid',
          label: 'Suyuqlik zichligi',
          unit: 'kg/m³',
          min: 500,
          max: 2000,
          step: 10,
          value: 1000,
        },
      },
    },
    {
      code: '9.7',
      slug: 'gidrostatik-paradoks',
      order: 7,
      titleUz: 'Gidrostatik paradoks',
      titleEn: 'Hydrostatic paradox',
      difficulty: 'ORTA',
      summary: "Idish tubidagi bosimning idish shakliga bog'liq emasligi.",
      keywords: ['paradoks', 'idish shakli', 'tub bosimi', 'suv ustuni'],
      theory: `Turli shakldagi idishlarga bir xil balandlikda suyuqlik quyilsa, ularning tubidagi bosim bir xil bo'ladi — garchi idishlardagi suyuqlik miqdori bir necha barobar farq qilsa ham. Bu hodisa gidrostatik paradoks deb ataladi.

Paradoks faqat birinchi qarashda g'alati tuyuladi. Bosim faqat balandlikka bog'liq, chunki suyuqlik og'irligi bilan birga idish devorlarining reaksiya kuchi ham ishtirok etadi.

Kengayib boruvchi idishda devorlar suyuqlik og'irligining bir qismini o'z zimmasiga oladi. Torayib boruvchi idishda esa aksincha, devorlar suyuqlikni pastga bosadi va tubdagi bosim ustundagi suyuqlik og'irligidan katta bo'lib chiqadi.

Tubga ta'sir qiluvchi to'liq kuch esa bosim va tub yuzasi ko'paytmasiga teng bo'ladi.

### Hayotiy misol
Suv minorasi juda tor bo'lishi mumkin, lekin quvurdagi bosim faqat uning balandligiga bog'liq — hajmiga emas.`,
      formulas: [
        { latex: 'P = \\rho g h', label: 'Faqat balandlikka bog\u2018liq' },
        { latex: 'F = P S = \\rho g h S', label: 'Tubga bosim kuchi' },
        { latex: 'F \\ne m g', label: 'Kuch og\u2018irlikka teng emas' },
        { latex: 'P \\ne f(V)', label: 'Hajmga bog\u2018liq emas' },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: 'P = \\rho g h',
        paramA: { key: 'h', label: 'Balandlik h', unit: 'm', min: 0.1, max: 20, step: 0.1, value: 2 },
        paramB: {
          key: 'S',
          label: 'Tub yuzasi S',
          unit: 'm²',
          min: 0.01,
          max: 2,
          step: 0.01,
          value: 0.2,
        },
      },
    },
    {
      code: '9.8',
      slug: 'bernulli-tenglamasi',
      order: 8,
      titleUz: 'Bernulli tenglamasi',
      titleEn: "Bernoulli's equation",
      difficulty: 'QIYIN',
      summary: "Oqayotgan suyuqlik uchun energiya saqlanish qonuni.",
      keywords: ['Bernulli', 'oqim', 'bosim', 'energiya saqlanish', 'kotaruvchi kuch'],
      theory: `Bernulli tenglamasi oqayotgan suyuqlik uchun energiya saqlanish qonunining ifodasidir. Unga ko'ra oqim chizig'i bo'ylab uch had yig'indisi o'zgarmas qoladi: statik bosim, dinamik bosim va gidrostatik bosim.

Eng muhim xulosa: tezlik ortsa bosim kamayadi. Bu ko'pchilikning intuitiv tasavvuriga zid tuyuladi, lekin energiya nuqtai nazaridan mantiqiy — kinetik energiya ortishi uchun bosim energiyasi kamayishi kerak.

Tenglama ideal suyuqlik uchun keltirib chiqarilgan: siqilmaydigan, yopishqoq bo'lmagan va laminar oqim uchun. Real sharoitda ishqalanish tufayli energiyaning bir qismi yo'qoladi.

Shunga qaramay tenglama aviatsiya, quvur hisoblari va o'lchov asboblarida keng qo'llaniladi.

### Hayotiy misol
Samolyot qanotining ustki tomoni qavariq bo'lgani uchun havo u yerdan tezroq oqadi, bosim kamayadi va ko'taruvchi kuch hosil bo'ladi.`,
      formulas: [
        {
          latex: 'P + \\frac{\\rho v^2}{2} + \\rho g h = \\text{const}',
          label: 'Bernulli tenglamasi',
        },
        {
          latex: 'P_1 + \\frac{\\rho v_1^2}{2} = P_2 + \\frac{\\rho v_2^2}{2}',
          label: 'Gorizontal quvur uchun',
        },
        { latex: 'A_1 v_1 = A_2 v_2', label: 'Uzluksizlik tenglamasi' },
        { latex: 'P_{din} = \\frac{\\rho v^2}{2}', label: 'Dinamik bosim' },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: 'P + \\frac{\\rho v^2}{2} = \\text{const}',
        paramA: { key: 'v', label: 'Oqim tezligi v', unit: 'm/s', min: 0, max: 50, step: 0.5, value: 10 },
        paramB: {
          key: 'rho',
          label: 'Zichlik ρ',
          unit: 'kg/m³',
          min: 1,
          max: 2000,
          step: 1,
          value: 1000,
        },
      },
    },
    {
      code: '9.9',
      slug: 'venturi-effekti',
      order: 9,
      titleUz: 'Venturi effekti',
      titleEn: 'Venturi effect',
      difficulty: 'QIYIN',
      summary: "Quvur torayganda tezlikning ortishi va bosimning kamayishi.",
      keywords: ['Venturi', 'quvur torayishi', 'uzluksizlik', 'oqim olchash'],
      theory: `Quvur kesimi torayganda suyuqlik tezligi ortadi, chunki bir xil hajm kichikroq kesimdan o'tishi kerak. Bu uzluksizlik tenglamasidan kelib chiqadi: kesim yuzasi va tezlik ko'paytmasi o'zgarmas qoladi.

Bernulli tenglamasiga ko'ra tezlik ortgan joyda bosim kamayadi. Natijada tor qismda bosim keng qismdagidan past bo'ladi — bu Venturi effekti.

Effekt amaliy o'lchovlarda keng ishlatiladi. Ikki kesimdagi bosim farqini o'lchab, oqim tezligini va sarfini aniq hisoblash mumkin. Shu prinsipda ishlaydigan qurilma Venturi hisoblagichi deb ataladi.

Bosimning pasayishi shu darajada bo'lishi mumkinki, u boshqa suyuqlikni so'rib olishga yetadi. Karbyurator va purkagichlar aynan shunday ishlaydi.

### Hayotiy misol
Suv jo'mragiga qo'yiladigan purkagich, tibbiy ingalyator va yong'in o'chirish shlangidagi ko'pik aralashtirgich — barchasi Venturi effektidan foydalanadi.`,
      formulas: [
        { latex: 'A_1 v_1 = A_2 v_2', label: 'Uzluksizlik' },
        {
          latex: 'P_1 - P_2 = \\frac{\\rho (v_2^2 - v_1^2)}{2}',
          label: 'Bosim farqi',
        },
        {
          latex: 'v_2 = v_1 \\frac{A_1}{A_2}',
          label: 'Tor qismdagi tezlik',
        },
        { latex: 'Q = A v', label: 'Hajmiy sarf' },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: 'A_1 v_1 = A_2 v_2',
        paramA: {
          key: 'v1',
          label: 'Kirish tezligi v1',
          unit: 'm/s',
          min: 0.1,
          max: 20,
          step: 0.1,
          value: 2,
        },
        paramB: {
          key: 'ratio',
          label: 'Kesimlar nisbati A1/A2',
          unit: '×',
          min: 1,
          max: 10,
          step: 0.1,
          value: 3,
        },
      },
    },
    {
      code: '9.10',
      slug: 'torricelli-qonuni',
      order: 10,
      titleUz: 'Torricelli qonuni',
      titleEn: "Torricelli's law",
      difficulty: 'ORTA',
      summary: "Idish teshigidan oqib chiqayotgan suyuqlik tezligi.",
      keywords: ['Torricelli', 'oqib chiqish', 'teshik', 'erkin tushish', 'jet'],
      theory: `Idish devoridagi teshikdan oqib chiqayotgan suyuqlik tezligi faqat teshik ustidagi suyuqlik ustunining balandligiga bog'liq. Formula erkin tushish tezligi formulasi bilan aynan bir xil.

Bu tasodif emas: suyuqlikning yuqori qatlamdan teshikkacha bo'lgan potensial energiyasi kinetik energiyaga aylanadi, xuddi shu balandlikdan tushayotgan jismdagi kabi.

Diqqatga sazovor jihat: tezlik suyuqlik zichligiga bog'liq emas. Suv ham, simob ham bir xil balandlikdan bir xil tezlik bilan otilib chiqadi.

Idish bo'shab borgani sari sath pasayadi va oqish tezligi kamayadi. Shuning uchun jarayon notekis boradi.

Yon devordagi teshikdan otilgan oqim parabola bo'ylab uchadi.

### Hayotiy misol
Suv baki teshilganda avval kuchli oqim otiladi, keyin sath pasaygani sari oqim zaiflashib boradi.`,
      formulas: [
        { latex: 'v = \\sqrt{2 g h}', label: 'Oqib chiqish tezligi' },
        { latex: 'Q = A \\sqrt{2 g h}', label: 'Hajmiy sarf' },
        { latex: 'R = 2\\sqrt{h H}', label: 'Oqim uchish masofasi' },
        { latex: 'v \\ne f(\\rho)', label: 'Zichlikka bog\u2018liq emas' },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: 'v = \\sqrt{2 g h}',
        paramA: {
          key: 'h',
          label: 'Suyuqlik balandligi h',
          unit: 'm',
          min: 0.1,
          max: 10,
          step: 0.1,
          value: 2,
        },
        paramB: {
          key: 'A',
          label: 'Teshik yuzasi A',
          unit: 'cm²',
          min: 0.1,
          max: 20,
          step: 0.1,
          value: 2,
        },
      },
    },
    {
      code: '9.11',
      slug: 'yopishqoqlik',
      order: 11,
      titleUz: 'Yopishqoqlik (viscosity)',
      titleEn: 'Viscosity',
      difficulty: 'QIYIN',
      summary: "Suyuqlik qatlamlari orasidagi ichki ishqalanish va Stoks qonuni.",
      keywords: ['yopishqoqlik', 'ichki ishqalanish', 'Stoks', 'chegaraviy tezlik'],
      theory: `Yopishqoqlik suyuqlik qatlamlari orasidagi ichki ishqalanishni tavsiflaydi. U qatlamlarning bir-biriga nisbatan siljishiga qarshilik ko'rsatadi.

Quvurda oqayotgan suyuqlikning devorga tegib turgan qatlami amalda qimirlamaydi, markazdagi qatlam esa eng tez harakatlanadi. Natijada tezlik profili parabola shaklida bo'ladi.

Yopishqoqlik haroratga kuchli bog'liq. Suyuqliklarda harorat ortishi bilan u keskin kamayadi, gazlarda esa aksincha ortadi.

Yopishqoq muhitda tushayotgan sharga Stoks kuchi ta'sir qiladi. Bu kuch tezlik bilan ortib boradi va ma'lum paytda og'irlik kuchini muvozanatlaydi — shundan keyin jism o'zgarmas chegaraviy tezlik bilan tushadi.

### Hayotiy misol
Sovuq havoda motor moyi quyuqlashadi va dvigatelni ishga tushirish qiyinlashadi. Parashyut ham chegaraviy tezlik prinsipiga asoslangan.`,
      formulas: [
        { latex: 'F = \\eta A \\frac{dv}{dy}', label: 'Nyuton ishqalanish qonuni' },
        { latex: 'F_S = 6\\pi \\eta r v', label: 'Stoks kuchi' },
        {
          latex: 'v_{ch} = \\frac{2 r^2 (\\rho_j - \\rho_s) g}{9 \\eta}',
          label: 'Chegaraviy tezlik',
        },
        { latex: 'Re = \\frac{\\rho v L}{\\eta}', label: 'Reynolds soni' },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: 'F_S = 6\\pi \\eta r v',
        paramA: {
          key: 'eta',
          label: 'Yopishqoqlik η',
          unit: 'Pa·s',
          min: 0.001,
          max: 2,
          step: 0.001,
          value: 0.1,
        },
        paramB: {
          key: 'r',
          label: 'Shar radiusi r',
          unit: 'mm',
          min: 0.5,
          max: 20,
          step: 0.5,
          value: 5,
        },
      },
    },
    {
      code: '9.12',
      slug: 'laminar-turbulent-oqim',
      order: 12,
      titleUz: 'Laminar va turbulent oqim',
      titleEn: 'Laminar and turbulent flow',
      difficulty: 'QIYIN',
      summary: "Ikki oqim rejimi va ularni ajratuvchi Reynolds soni.",
      keywords: ['laminar', 'turbulent', 'Reynolds', 'oqim rejimi', 'girdob'],
      theory: `Suyuqlik oqimi ikki xil rejimda bo'lishi mumkin. Laminar oqimda qatlamlar bir-biriga aralashmasdan, tartibli ravishda parallel siljiydi. Turbulent oqimda esa girdoblar paydo bo'ladi va zarrachalar tartibsiz harakatlanadi.

Qaysi rejim yuzaga kelishini Reynolds soni belgilaydi. U inersiya kuchlarining yopishqoqlik kuchlariga nisbatini ko'rsatuvchi o'lchamsiz kattalik.

Quvurdagi oqim uchun Reynolds soni 2300 dan kichik bo'lsa oqim laminar, 4000 dan katta bo'lsa turbulent hisoblanadi. Oraliq qiymatlarda o'tish rejimi kuzatiladi.

Turbulent oqimda energiya yo'qotishlari ancha katta bo'ladi, chunki girdoblar hosil qilish qo'shimcha energiya talab qiladi. Shuning uchun quvurlar odatda laminar rejimga hisoblanadi.

### Hayotiy misol
Jo'mrakni sekin ochsangiz suv silliq va shaffof oqadi. Kuchli ochilganda oqim oqarib, tartibsiz shovqinli holatga o'tadi.`,
      formulas: [
        { latex: 'Re = \\frac{\\rho v D}{\\eta}', label: 'Reynolds soni' },
        { latex: 'Re < 2300', label: 'Laminar oqim' },
        { latex: 'Re > 4000', label: 'Turbulent oqim' },
        {
          latex: 'Q = \\frac{\\pi R^4 \\Delta P}{8 \\eta L}',
          label: 'Puazeyl formulasi',
        },
      ],
      sim: {
        demoType: 'fluid',
        accent: ACCENT,
        formula: 'Re = \\frac{\\rho v D}{\\eta}',
        paramA: { key: 'v', label: 'Oqim tezligi v', unit: 'm/s', min: 0.01, max: 10, step: 0.01, value: 1 },
        paramB: {
          key: 'D',
          label: 'Quvur diametri D',
          unit: 'm',
          min: 0.005,
          max: 1,
          step: 0.005,
          value: 0.05,
        },
      },
    },
  ],
};
