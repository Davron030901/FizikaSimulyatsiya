import type { SectionSeed } from './types';

const ACCENT = '#6366F1';

export const gravitatsiya: SectionSeed = {
  code: '7',
  slug: 'gravitatsiya',
  order: 7,
  titleUz: 'Gravitatsiya',
  titleEn: 'Gravitation',
  description:
    "Umumiy tortishish qonuni, gravitatsion maydon, kosmik tezliklar va Kepler qonunlari.",
  icon: 'orbit',
  color: ACCENT,
  topics: [
    {
      code: '7.1',
      slug: 'umumiy-gravitatsiya-qonuni',
      order: 1,
      titleUz: 'Umumiy gravitatsiya qonuni',
      titleEn: 'Law of universal gravitation',
      difficulty: 'ORTA',
      summary: "Ikki massa orasidagi tortishish kuchi va uning masofaga bog'liqligi.",
      keywords: ['tortishish', 'Nyuton', 'gravitatsiya konstantasi', 'teskari kvadrat qonuni'],
      theory: `Nyutonning umumiy tortishish qonuniga ko'ra, koinotdagi har qanday ikki jism bir-birini o'zaro tortadi. Kuch massalar ko'paytmasiga to'g'ri, ular orasidagi masofa kvadratiga esa teskari proporsional.

Teskari kvadrat bog'liqligi juda tez susayishni anglatadi: masofa ikki barobar ortsa kuch to'rt barobar, uch barobar ortsa to'qqiz barobar kamayadi. Lekin u hech qachon nolga aylanmaydi — tortishish cheksiz masofagacha ta'sir qiladi.

Gravitatsiya konstantasi juda kichik son bo'lgani uchun oddiy jismlar orasidagi tortishish sezilmaydi. Kuch faqat massalardan biri sayyora kabi ulkan bo'lgandagina seziladi.

Qonun sferik jismlar uchun ham ishlaydi: bunda masofa markazlar orasida o'lchanadi.

### Hayotiy misol
Xuddi shu qonun olmaning yerga tushishini ham, Oyning Yer atrofida aylanishini ham tushuntiradi. Nyutonning buyuk kashfiyoti aynan shu birlikni ko'ra bilishida edi.`,
      formulas: [
        { latex: 'F = G \\frac{m_1 m_2}{r^2}', label: 'Tortishish kuchi' },
        {
          latex: 'G = 6{,}674 \\times 10^{-11}\\ \\text{N}\\cdot\\text{m}^2/\\text{kg}^2',
          label: 'Gravitatsiya konstantasi',
        },
        { latex: 'g = \\frac{G M}{R^2}', label: 'Sirtdagi tezlanish' },
        { latex: 'F \\sim \\frac{1}{r^2}', label: 'Teskari kvadrat qonuni' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'F = G \\frac{m_1 m_2}{r^2}',
        paramA: {
          key: 'm1',
          label: 'Birinchi massa',
          unit: '×10²⁴ kg',
          min: 0.1,
          max: 10,
          step: 0.1,
          value: 6,
        },
        paramB: {
          key: 'r',
          label: 'Masofa r',
          unit: '×10⁶ m',
          min: 1,
          max: 400,
          step: 1,
          value: 10,
        },
      },
    },
    {
      code: '7.2',
      slug: 'gravitatsion-maydon',
      order: 2,
      titleUz: 'Gravitatsion maydon',
      titleEn: 'Gravitational field',
      difficulty: 'ORTA',
      summary: "Maydon kuchlanganligi, maydon chiziqlari va superpozitsiya prinsipi.",
      keywords: ['maydon', 'kuchlanganlik', 'maydon chiziqlari', 'superpozitsiya'],
      theory: `Gravitatsion maydon massa atrofidagi fazoning shunday holatiki, unga kiritilgan har qanday boshqa massaga kuch ta'sir qiladi. Maydonning kuch xarakteristikasi kuchlanganlik deb ataladi va birlik massaga ta'sir qiluvchi kuchga teng.

Kuchlanganlik son qiymati bo'yicha erkin tushish tezlanishi bilan bir xil bo'ladi. Yer sirtida u taxminan 9,8 birlikka teng, balandlikka ko'tarilgan sari kamayadi.

Maydon chiziqlari har doim massa tomon radial yo'nalgan, chunki gravitatsiya faqat tortish kuchidir — elektr maydonidan farqli o'laroq itarish mavjud emas.

Bir necha massa bo'lganda ularning maydonlari vektor sifatida qo'shiladi. Shu tarzda Yer va Oy orasida maydonlar bir-birini muvozanatlaydigan nuqta topiladi.

### Hayotiy misol
Sun'iy yo'ldoshlar orbitasi hisoblanganda Yer maydonining notekisligi ham hisobga olinadi, chunki Yer ideal shar emas.`,
      formulas: [
        { latex: 'g = \\frac{G M}{r^2}', label: 'Maydon kuchlanganligi' },
        { latex: '\\vec{g} = \\frac{\\vec{F}}{m}', label: "Ta'rif" },
        { latex: '\\vec{g} = \\sum \\vec{g}_i', label: 'Superpozitsiya' },
        { latex: 'g_h = \\frac{G M}{(R + h)^2}', label: 'Balandlikda' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'g = \\frac{G M}{r^2}',
        paramA: {
          key: 'M',
          label: 'Sayyora massasi',
          unit: '×10²⁴ kg',
          min: 0.1,
          max: 20,
          step: 0.1,
          value: 5.97,
        },
        paramB: {
          key: 'r',
          label: 'Masofa r',
          unit: '×10⁶ m',
          min: 1,
          max: 100,
          step: 0.5,
          value: 6.37,
        },
      },
    },
    {
      code: '7.3',
      slug: 'gravitatsion-potensial-energiya-umumiy',
      order: 3,
      titleUz: 'Gravitatsion potensial energiya (umumiy holat)',
      titleEn: 'Gravitational potential energy',
      difficulty: 'QIYIN',
      summary: "Manfiy potensial energiya, bog'lanish energiyasi va potensial o'ra.",
      keywords: ['potensial energiya', 'manfiy energiya', 'boglanish energiyasi', 'potensial ora'],
      theory: `Katta masofalarda potensial energiya oddiy mgh formulasi bilan hisoblanmaydi, chunki tortishish kuchi masofa bilan o'zgaradi. Umumiy holatda u manfiy qiymatga ega bo'ladi.

Manfiy ishora g'alati tuyulishi mumkin, lekin uning ma'nosi oddiy: nol sath sifatida cheksiz uzoqlik tanlanadi. Jismlar bir-biriga yaqinlashgani sari energiya kamayadi, ya'ni manfiyroq bo'ladi.

Potensial energiyaning modul qiymati bog'lanish energiyasini beradi — jismni gravitatsion ta'sirdan butunlay ozod qilish uchun kerak bo'ladigan energiya.

To'liq energiya manfiy bo'lsa, jism bog'langan orbitada qoladi. Nol yoki musbat bo'lsa, u tortishish maydonidan chiqib keta oladi. Aynan shu shart qochish tezligini aniqlaydi.

### Hayotiy misol
Yerga yaqin masofalarda umumiy formula mgh ga aylanadi — maktabda o'rganiladigan sodda formula shundan kelib chiqadi.`,
      formulas: [
        { latex: 'U = -\\frac{G m_1 m_2}{r}', label: 'Potensial energiya' },
        { latex: 'E = \\frac{m v^2}{2} - \\frac{G M m}{r}', label: "To'liq energiya" },
        { latex: 'E < 0', label: 'Bog\u2018langan orbita sharti' },
        { latex: 'E_{bog} = \\frac{G M m}{r}', label: 'Bog\u2018lanish energiyasi' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'U = -\\frac{G M m}{r}',
        paramA: { key: 'm', label: 'Jism massasi', unit: 'kg', min: 1, max: 5000, step: 10, value: 1000 },
        paramB: {
          key: 'r',
          label: 'Masofa r',
          unit: '×10⁶ m',
          min: 6.4,
          max: 400,
          step: 1,
          value: 42,
        },
      },
    },
    {
      code: '7.4',
      slug: 'birinchi-kosmik-tezlik',
      order: 4,
      titleUz: 'Birinchi kosmik tezlik',
      titleEn: 'First cosmic velocity',
      difficulty: 'ORTA',
      summary: "Doiraviy orbitada aylanish uchun zarur bo'lgan minimal tezlik.",
      keywords: ['kosmik tezlik', 'orbital tezlik', 'sun\u2019iy yoldosh', 'orbital velocity'],
      theory: `Sun'iy yo'ldosh sayyora atrofida doiraviy orbitada aylanishi uchun tortishish kuchi aynan markazga intiluvchi kuch rolini bajarishi kerak. Shu shartdan orbital tezlik formulasi kelib chiqadi.

Diqqatga sazovor jihat: tezlik yo'ldosh massasiga umuman bog'liq emas. Kichkina sensor ham, ulkan kosmik stansiya ham bir xil balandlikda bir xil tezlik bilan harakatlanadi.

Yer sirtiga yaqin orbita uchun bu tezlik taxminan 7,9 km/s ni tashkil qiladi. Orbita balandligi ortgan sari kerakli tezlik kamayadi, chunki tortishish susayadi. Shu bilan birga aylanish davri uzayadi.

Orbitadagi jism aslida doimo Yerga tushib boradi, lekin Yer sirti ham xuddi shunday tezlikda undan qochib egiladi.

### Hayotiy misol
Xalqaro kosmik stansiya taxminan 400 km balandlikda 7,7 km/s tezlik bilan uchadi va bir aylanishga 90 daqiqa sarflaydi.`,
      formulas: [
        { latex: 'v_1 = \\sqrt{\\frac{G M}{R}}', label: 'Birinchi kosmik tezlik' },
        { latex: 'v_1 = \\sqrt{g R}', label: 'Sirtga yaqin orbita' },
        { latex: '\\frac{G M m}{R^2} = \\frac{m v^2}{R}', label: 'Kelib chiqish sharti' },
        { latex: 'T = \\frac{2\\pi R}{v}', label: 'Aylanish davri' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'v_1 = \\sqrt{\\frac{G M}{R}}',
        paramA: {
          key: 'M',
          label: 'Sayyora massasi',
          unit: '×10²⁴ kg',
          min: 0.1,
          max: 20,
          step: 0.1,
          value: 5.97,
        },
        paramB: {
          key: 'R',
          label: 'Orbita radiusi',
          unit: '×10⁶ m',
          min: 1,
          max: 60,
          step: 0.1,
          value: 6.77,
        },
      },
    },
    {
      code: '7.5',
      slug: 'ikkinchi-kosmik-tezlik',
      order: 5,
      titleUz: 'Ikkinchi kosmik tezlik',
      titleEn: 'Escape velocity',
      difficulty: 'ORTA',
      summary: "Sayyora tortishishidan butunlay qochish uchun kerakli tezlik.",
      keywords: ['qochish tezligi', 'escape velocity', 'qora tuynuk', 'parabolik traektoriya'],
      theory: `Qochish tezligi — jismni sayyora tortishish maydonidan butunlay ozod qilish uchun kerak bo'ladigan minimal boshlang'ich tezlik. U energiya saqlanish qonunidan topiladi: kinetik energiya bog'lanish energiyasidan kam bo'lmasligi kerak.

Qochish tezligi orbital tezlikdan aniq ikki ildizi barobar katta. Yer uchun u taxminan 11,2 km/s ni tashkil qiladi.

Bu tezlikka erishgan jism cheksiz uzoqlashib ketadi va tezligi nolga intiladi. Traektoriyasi parabola shaklida bo'ladi.

Qochish tezligi ham jism massasiga bog'liq emas, faqat sayyora massasi va radiusiga bog'liq. Agar jism shunchalik zich bo'lsaki, qochish tezligi yorug'lik tezligidan oshib ketsa, u qora tuynukka aylanadi.

### Hayotiy misol
Oyda qochish tezligi atigi 2,4 km/s — shuning uchun u atmosferasini ushlab qola olmagan, gaz molekulalari fazoga tarqalib ketgan.`,
      formulas: [
        { latex: 'v_2 = \\sqrt{\\frac{2 G M}{R}}', label: 'Qochish tezligi' },
        { latex: 'v_2 = v_1 \\sqrt{2}', label: 'Orbital tezlik bilan' },
        {
          latex: '\\frac{m v^2}{2} - \\frac{G M m}{R} = 0',
          label: 'Energiya sharti',
        },
        { latex: 'v_2 = \\sqrt{2 g R}', label: 'Sirt tezlanishi orqali' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'v_2 = \\sqrt{\\frac{2 G M}{R}}',
        paramA: {
          key: 'M',
          label: 'Sayyora massasi',
          unit: '×10²⁴ kg',
          min: 0.05,
          max: 2000,
          step: 0.05,
          value: 5.97,
        },
        paramB: {
          key: 'R',
          label: 'Sayyora radiusi',
          unit: '×10⁶ m',
          min: 0.5,
          max: 80,
          step: 0.1,
          value: 6.37,
        },
      },
    },
    {
      code: '7.6',
      slug: 'kepler-birinchi-qonuni',
      order: 6,
      titleUz: 'Kepler birinchi qonuni',
      titleEn: "Kepler's first law",
      difficulty: 'ORTA',
      summary: "Sayyoralarning elliptik orbitalari va ekssentriklik parametri.",
      keywords: ['Kepler', 'ellips', 'fokus', 'ekssentriklik', 'perigeliy', 'afeliy'],
      theory: `Kepler birinchi qonuniga ko'ra, har bir sayyora Quyosh atrofida ellips bo'ylab harakatlanadi va Quyosh ellipsning fokuslaridan birida joylashadi. Ikkinchi fokusda esa hech narsa yo'q.

Ellipsning cho'zinqiligini ekssentriklik ko'rsatadi. U nolga teng bo'lsa orbita aylana, birga yaqinlashgan sari ellips cho'ziladi.

Quyoshga eng yaqin nuqta perigeliy, eng uzoq nuqta afeliy deb ataladi. Ular orasidagi masofalar yig'indisi katta o'qning ikki barobariga teng.

Yer orbitasining ekssentrikligi juda kichik — atigi 0,017. Shuning uchun uning orbitasi deyarli aylana va fasllar almashinuvi masofaga emas, balki Yer o'qining og'ishiga bog'liq.

Kometalar esa juda cho'zinqi orbitalarga ega.

### Hayotiy misol
Galleya kometasining ekssentrikligi 0,97 ga yaqin — u Quyoshga yaqinlashib, so'ng Neptun orbitasidan ham uzoqlashib ketadi va 76 yilda bir marta qaytadi.`,
      formulas: [
        { latex: 'e = \\frac{c}{a}', label: 'Ekssentriklik' },
        { latex: 'r_{min} = a(1 - e)', label: 'Perigeliy masofasi' },
        { latex: 'r_{max} = a(1 + e)', label: 'Afeliy masofasi' },
        { latex: 'b = a\\sqrt{1 - e^2}', label: 'Kichik yarim o\u2018q' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'e = \\frac{c}{a}',
        paramA: {
          key: 'a',
          label: 'Katta yarim o\u2018q a',
          unit: 'a.b.',
          min: 0.3,
          max: 30,
          step: 0.1,
          value: 1,
        },
        paramB: {
          key: 'e',
          label: 'Ekssentriklik e',
          unit: '',
          min: 0,
          max: 0.95,
          step: 0.01,
          value: 0.2,
        },
      },
    },
    {
      code: '7.7',
      slug: 'kepler-ikkinchi-qonuni',
      order: 7,
      titleUz: 'Kepler ikkinchi qonuni',
      titleEn: "Kepler's second law",
      difficulty: 'ORTA',
      summary: "Radius-vektor teng vaqtlarda teng yuzalarni chizishi.",
      keywords: ['Kepler', 'maydonlar qonuni', 'sektor tezligi', 'impuls momenti'],
      theory: `Sayyorani Quyosh bilan tutashtiruvchi radius-vektor teng vaqt oraliqlarida teng yuzalarni chizib o'tadi. Bu qonun maydonlar qonuni deb ham ataladi.

Undan muhim xulosa kelib chiqadi: sayyora Quyoshga yaqinlashganda tezroq, uzoqlashganda esa sekinroq harakatlanadi. Perigeliyda radius-vektor qisqa bo'lgani uchun bir xil yuzani chizish uchun sayyora ko'proq burchakni bosib o'tishi kerak.

Qonunning chuqur sababi — impuls momenti saqlanishi. Tortishish kuchi doimo Quyoshga yo'nalgan, ya'ni markaziy kuch bo'lgani uchun uning momenti nolga teng va impuls momenti o'zgarmaydi.

Shu sababli bu qonun faqat sayyoralar uchun emas, har qanday markaziy kuch maydonidagi harakat uchun o'rinli.

### Hayotiy misol
Yer yanvarda Quyoshga eng yaqin bo'ladi va shu davrda tezroq harakatlanadi. Shuning uchun shimoliy yarimsharda qish yozdan bir necha kun qisqaroq.`,
      formulas: [
        { latex: '\\frac{dA}{dt} = \\text{const}', label: 'Sektor tezligi' },
        { latex: 'L = m r^2 \\dot{\\theta} = \\text{const}', label: 'Impuls momenti' },
        { latex: 'v_1 r_1 = v_2 r_2', label: 'Perigeliy va afeliy uchun' },
        { latex: '\\frac{dA}{dt} = \\frac{L}{2m}', label: 'Impuls momenti orqali' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: '\\frac{dA}{dt} = \\text{const}',
        paramA: {
          key: 'e',
          label: 'Ekssentriklik e',
          unit: '',
          min: 0,
          max: 0.9,
          step: 0.01,
          value: 0.5,
        },
        paramB: {
          key: 'a',
          label: 'Katta yarim o\u2018q a',
          unit: 'a.b.',
          min: 0.3,
          max: 10,
          step: 0.1,
          value: 1,
        },
      },
    },
    {
      code: '7.8',
      slug: 'kepler-uchinchi-qonuni',
      order: 8,
      titleUz: 'Kepler uchinchi qonuni',
      titleEn: "Kepler's third law",
      difficulty: 'QIYIN',
      summary: "Aylanish davri kvadratining katta yarim o'q kubiga proporsionalligi.",
      keywords: ['Kepler', 'garmonik qonun', 'davr', 'yarim oq', 'orbital period'],
      theory: `Kepler uchinchi qonuni sayyoralarning aylanish davrini ularning Quyoshdan uzoqligi bilan bog'laydi: davr kvadrati katta yarim o'q kubiga proporsional.

Bu shuni anglatadiki, uzoqroq sayyoralar nafaqat uzunroq yo'l bosadi, balki sekinroq ham harakatlanadi. Natijada davr juda tez ortadi. Masalan, Quyoshdan to'rt barobar uzoq sayyoraning davri sakkiz barobar uzun bo'ladi.

Proporsionallik koeffitsiyenti faqat markaziy jism massasiga bog'liq. Aynan shu xususiyat astronomiyaning eng kuchli o'lchov vositalaridan biriga aylangan: yo'ldoshning davri va orbita radiusini o'lchab, sayyora yoki yulduz massasini hisoblash mumkin.

Xuddi shu usul bilan qora tuynuklar massasi ham aniqlanadi.

### Hayotiy misol
Yupiterning yo'ldoshlarini kuzatib, uning massasi Yernikidan 318 barobar katta ekanligi aniqlangan.`,
      formulas: [
        { latex: 'T^2 \\sim a^3', label: 'Garmonik qonun' },
        { latex: '\\frac{T^2}{a^3} = \\frac{4\\pi^2}{G M}', label: "To'liq ko'rinish" },
        {
          latex: '\\frac{T_1^2}{T_2^2} = \\frac{a_1^3}{a_2^3}',
          label: 'Ikki sayyora uchun',
        },
        { latex: 'M = \\frac{4\\pi^2 a^3}{G T^2}', label: 'Massani aniqlash' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'T^2 = \\frac{4\\pi^2 a^3}{G M}',
        paramA: {
          key: 'a',
          label: 'Katta yarim o\u2018q a',
          unit: 'a.b.',
          min: 0.2,
          max: 40,
          step: 0.1,
          value: 1,
        },
        paramB: {
          key: 'M',
          label: 'Yulduz massasi',
          unit: 'M☉',
          min: 0.1,
          max: 10,
          step: 0.1,
          value: 1,
        },
      },
    },
    {
      code: '7.9',
      slug: 'geostatsionar-orbita',
      order: 9,
      titleUz: 'Geostatsionar orbita',
      titleEn: 'Geostationary orbit',
      difficulty: 'ORTA',
      summary: "Yer bilan sinxron aylanuvchi, osmonda qo'zg'almas ko'rinadigan orbita.",
      keywords: ['geostatsionar', 'aloqa yoldoshi', 'sinxron orbita', '35786 km'],
      theory: `Geostatsionar orbita — aylanish davri Yerning o'z o'qi atrofida aylanish davriga teng bo'lgan maxsus orbita. Bunday yo'ldosh yer yuzidagi kuzatuvchi uchun osmonda qimirlamay turgandek ko'rinadi.

Bu shartni bajarish uchun uch talab bir vaqtda bajarilishi kerak. Davr aynan bir sutkaga teng bo'lishi, orbita ekvator tekisligida yotishi va aylana shaklida bo'lishi lozim.

Kepler uchinchi qonunidan orbita radiusi hisoblanadi va natijada Yer markazidan taxminan 42 200 km, ya'ni sirtdan 35 786 km balandlik olinadi.

Shu balandlikdagi bitta yo'ldosh Yer yuzasining deyarli uchdan bir qismini qamrab oladi. Uchta yo'ldosh butun sayyorani qoplashga yetadi.

### Hayotiy misol
Sun'iy yo'ldosh televideniyesi antennalari bir marta sozlanadi va keyin hech qachon burilmaydi — chunki yo'ldosh osmonda qimirlamaydi.`,
      formulas: [
        { latex: 'T = 23\\ \\text{soat}\\ 56\\ \\text{daqiqa}', label: 'Sutka davri' },
        {
          latex: 'r = \\sqrt[3]{\\frac{G M T^2}{4\\pi^2}}',
          label: 'Orbita radiusi',
        },
        { latex: 'h = r - R_{Yer} \\approx 35\\,786\\ \\text{km}', label: 'Balandlik' },
        { latex: 'v \\approx 3{,}07\\ \\text{km/s}', label: 'Orbital tezlik' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'r = \\sqrt[3]{\\frac{G M T^2}{4\\pi^2}}',
        paramA: { key: 'T', label: 'Aylanish davri T', unit: 'soat', min: 1, max: 72, step: 0.5, value: 24 },
        paramB: {
          key: 'M',
          label: 'Sayyora massasi',
          unit: '×10²⁴ kg',
          min: 0.1,
          max: 2000,
          step: 0.1,
          value: 5.97,
        },
      },
    },
    {
      code: '7.10',
      slug: 'tidal-kuchlar',
      order: 10,
      titleUz: 'Tidal kuchlar',
      titleEn: 'Tidal forces',
      difficulty: 'QIYIN',
      summary: "Gravitatsiya gradiyenti, ko'tarilish-qaytish hodisasi va Rosh chegarasi.",
      keywords: ['tidal kuch', 'qalqish', 'suv kotarilishi', 'Rosh chegarasi', 'Oy'],
      theory: `Tidal kuchlar tortishish kuchining o'zi emas, balki uning jismning turli qismlarida farq qilishi natijasida vujudga keladi. Yerning Oyga yaqin tomoni uzoq tomoniga qaraganda kuchliroq tortiladi.

Natijada Yer bir oz cho'ziladi va okean suvi ikki tomonda ko'tariladi: Oyga qaragan va unga qarama-qarshi tomonda. Yer o'z o'qi atrofida aylangani uchun har bir joyda sutkada ikki marta suv ko'tariladi.

Tidal kuch masofa kubiga teskari proporsional, ya'ni oddiy tortishishdan ham tezroq susayadi. Shuning uchun Quyosh Oydan ancha massiv bo'lsa-da, uning ta'siri ikki barobar kamroq.

Rosh chegarasi — jism tidal kuchlar ta'sirida parchalanib ketadigan kritik masofa.

### Hayotiy misol
Saturn halqalari, ehtimol, Rosh chegarasidan ichkariga kirib parchalanib ketgan yo'ldoshning qoldiqlaridan iborat.`,
      formulas: [
        { latex: '\\Delta F = \\frac{2 G M m \\Delta r}{r^3}', label: 'Tidal kuch' },
        { latex: '\\Delta F \\sim \\frac{1}{r^3}', label: 'Masofaga bog\u2018liqlik' },
        {
          latex: 'd = 2{,}44 R \\left(\\frac{\\rho_M}{\\rho_m}\\right)^{1/3}',
          label: 'Rosh chegarasi',
        },
        { latex: 'T_{qalqish} = 12\\ \\text{soat}\\ 25\\ \\text{daqiqa}', label: 'Qalqish davri' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: '\\Delta F = \\frac{2 G M m \\Delta r}{r^3}',
        paramA: {
          key: 'r',
          label: 'Masofa r',
          unit: '×10⁶ m',
          min: 10,
          max: 800,
          step: 5,
          value: 384,
        },
        paramB: {
          key: 'dr',
          label: 'Jism radiusi Δr',
          unit: '×10⁶ m',
          min: 0.1,
          max: 20,
          step: 0.1,
          value: 6.37,
        },
      },
    },
  ],
};
