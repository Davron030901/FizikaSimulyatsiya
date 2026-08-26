import type { SectionSeed } from './types';

const ACCENT = '#3B82F6';

export const kinematika: SectionSeed = {
  code: '1',
  slug: 'kinematika',
  order: 1,
  titleUz: 'Kinematika',
  titleEn: 'Kinematics',
  description:
    "Harakatni uni vujudga keltirgan sabablarsiz o'rganadigan bo'lim: pozitsiya, tezlik, tezlanish va traektoriya.",
  icon: 'move-right',
  color: ACCENT,
  topics: [
    {
      code: '1.1',
      slug: 'tekis-togri-chiziqli-harakat',
      order: 1,
      titleUz: "Tekis to'g'ri chiziqli harakat",
      titleEn: 'Uniform linear motion',
      difficulty: 'OSON',
      summary: "Tezligi o'zgarmas bo'lgan to'g'ri chiziqli harakat va s = vt bog'lanishi.",
      keywords: ['tekis harakat', 'tezlik', 'masofa', 'uniform motion', 'v const'],
      theory: `Tekis to'g'ri chiziqli harakat — jism to'g'ri chiziq bo'ylab harakatlanib, ixtiyoriy teng vaqt oraliqlarida teng masofalarni bosib o'tadigan eng sodda harakat turi. Bunda tezlik ham kattaligi, ham yo'nalishi bo'yicha o'zgarmaydi, ya'ni tezlanish nolga teng.

Bosib o'tilgan yo'l vaqtga to'g'ri proporsional: masofa vaqt ortishi bilan bir tekis ortadi. Shu sababli masofa-vaqt grafigi og'ma to'g'ri chiziq bo'ladi va uning burchak koeffitsiyenti aynan tezlikni beradi. Tezlik-vaqt grafigi esa gorizontal chiziq: qiymat vaqtga bog'liq emas.

Muhim nozik jihat — **yo'l** va **ko'chish** farqi. To'g'ri chiziq bo'ylab bir tomonga harakatda ular teng, lekin jism orqaga qaytsa, yo'l ortishda davom etadi, ko'chish esa kamayadi.

### Hayotiy misol
Kruiz-kontrol yoqilgan avtomobil tekis magistralda 90 km/soat tezlik bilan ketmoqda. 2 soatda u 180 km yo'l bosadi. Xuddi shunday, konveyer lentasi va eskalator ham amalda tekis harakatga misol bo'ladi.`,
      formulas: [
        { latex: 's = v \\cdot t', label: "Bosib o'tilgan masofa" },
        { latex: 'v = \\frac{s}{t}', label: 'Tezlik' },
        { latex: 'x = x_0 + v t', label: 'Koordinata tenglamasi' },
        { latex: 'a = 0', label: 'Tezlanish' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 's = v \\cdot t',
        paramA: { key: 'v', label: 'Tezlik v', unit: 'm/s', min: 0, max: 30, step: 0.5, value: 10 },
        paramB: { key: 't', label: 'Vaqt t', unit: 's', min: 0, max: 60, step: 1, value: 10 },
      },
    },
    {
      code: '1.2',
      slug: 'tekis-ozgaruvchan-harakat',
      order: 2,
      titleUz: "Tekis o'zgaruvchan harakat",
      titleEn: 'Uniformly accelerated motion',
      difficulty: 'OSON',
      summary: "Tezlanishi o'zgarmas harakat: v = v0 + at va s = v0t + at kvadrat bo'linadi ikkiga.",
      keywords: ['tezlanish', 'tezlanuvchan harakat', 'sekinlanish', 'parabola', 'acceleration'],
      theory: `Tekis o'zgaruvchan harakatda tezlanish o'zgarmas bo'ladi, ya'ni tezlik har sekundda bir xil miqdorga ortadi yoki kamayadi. Tezlanish musbat bo'lsa harakat tezlanuvchan, tezlik yo'nalishiga qarama-qarshi bo'lsa sekinlanuvchan deyiladi.

Tezlik vaqtga chiziqli bog'langani uchun tezlik-vaqt grafigi og'ma to'g'ri chiziq bo'ladi. Bu chiziq ostidagi yuza esa bosib o'tilgan masofani beradi — shuning uchun masofa-vaqt grafigi parabola shaklida bo'ladi. Boshlang'ich tezlik nolga teng bo'lsa, masofa vaqt kvadratiga proporsional o'sadi: vaqt ikki barobar ortsa, masofa to'rt barobar ortadi.

Vaqt noma'lum bo'lgan masalalarda tezlik, tezlanish va masofani bog'lovchi uchinchi formuladan foydalanish qulay.

### Hayotiy misol
Svetoforda turgan avtomobilning joyidan qo'zg'alishi, tormozlash masofasini hisoblash va erkin tushish (a = g) — barchasi tekis o'zgaruvchan harakat modeliga mos keladi.`,
      formulas: [
        { latex: 'v = v_0 + a t', label: 'Tezlik' },
        { latex: 's = v_0 t + \\frac{a t^2}{2}', label: 'Masofa' },
        { latex: 'v^2 = v_0^2 + 2 a s', label: 'Vaqtsiz formula' },
        { latex: 's = \\frac{v_0 + v}{2} \\cdot t', label: "O'rtacha tezlik orqali" },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 's = v_0 t + \\frac{a t^2}{2}',
        paramA: {
          key: 'v0',
          label: "Boshlang'ich tezlik v0",
          unit: 'm/s',
          min: 0,
          max: 30,
          step: 0.5,
          value: 5,
        },
        paramB: {
          key: 'a',
          label: 'Tezlanish a',
          unit: 'm/s²',
          min: -10,
          max: 10,
          step: 0.1,
          value: 2,
        },
      },
    },
    {
      code: '1.3',
      slug: 'burchak-tezligi',
      order: 3,
      titleUz: 'Burchak tezligi',
      titleEn: 'Angular velocity',
      difficulty: 'ORTA',
      summary: "Aylanma harakatda burchakning o'zgarish tezligi va uning chiziqli tezlik bilan bog'lanishi.",
      keywords: ['burchak tezligi', 'omega', 'aylanish', 'rad/s', 'RPM', 'angular velocity'],
      theory: `Burchak tezligi aylanayotgan jism radius-vektorining vaqt birligida burgan burchagini ko'rsatadi. U odatda radian/sekundda o'lchanadi. Bir to'liq aylanish 2π radianga teng, shuning uchun aylanish davri va chastota burchak tezligi bilan bevosita bog'liq.

Amalda tez-tez uchraydigan birlik — daqiqadagi aylanishlar soni (RPM). Uni rad/s ga o'tkazish uchun 2π ga ko'paytirib, 60 ga bo'lish kerak.

Qattiq jism aylanganda uning barcha nuqtalari bir xil burchak tezlikka ega bo'ladi, lekin chiziqli tezlik har xil: o'qdan qanchalik uzoq bo'lsa, nuqta shunchalik tez harakatlanadi. Chiziqli tezlik vektori har doim aylanaga urinma bo'ylab yo'nalgan.

### Hayotiy misol
Vinil plastinka chetidagi nuqta markazga yaqin nuqtaga qaraganda ancha tez harakatlanadi, garchi ikkalasi ham bir xil vaqtda bir marta aylanib chiqsa ham.`,
      formulas: [
        { latex: '\\omega = \\frac{\\Delta \\theta}{\\Delta t}', label: 'Burchak tezligi' },
        { latex: '\\theta = \\omega t', label: 'Burilgan burchak' },
        { latex: 'v = \\omega r', label: 'Chiziqli tezlik' },
        { latex: '\\omega = \\frac{2\\pi}{T} = 2\\pi f', label: 'Davr va chastota orqali' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: 'v = \\omega r',
        paramA: {
          key: 'omega',
          label: 'Burchak tezligi ω',
          unit: 'rad/s',
          min: 0,
          max: 12,
          step: 0.1,
          value: 2,
        },
        paramB: { key: 'r', label: 'Radius r', unit: 'm', min: 0.2, max: 5, step: 0.1, value: 2 },
      },
    },
    {
      code: '1.4',
      slug: 'burchak-tezlanishi',
      order: 4,
      titleUz: 'Burchak tezlanishi',
      titleEn: 'Angular acceleration',
      difficulty: 'ORTA',
      summary: "Burchak tezligining o'zgarish tezligi va tezlanuvchan aylanma harakat tenglamalari.",
      keywords: ['burchak tezlanishi', 'alfa', 'tangensial tezlanish', 'angular acceleration'],
      theory: `Burchak tezlanishi burchak tezligining vaqt bo'yicha o'zgarish tezligini bildiradi va rad/s² da o'lchanadi. Uning tenglamalari to'g'ri chiziqli harakat tenglamalari bilan to'liq o'xshash: masofa o'rnini burchak, tezlik o'rnini burchak tezligi, tezlanish o'rnini burchak tezlanishi egallaydi.

Aylanayotgan jismning istalgan nuqtasi ikki xil tezlanishga ega bo'ladi. Tangensial tezlanish aylanaga urinma bo'ylab yo'nalgan va tezlik modulini o'zgartiradi. Markazga intiluvchi (normal) tezlanish esa markaz tomon yo'nalgan va faqat tezlik yo'nalishini o'zgartiradi. Ularning geometrik yig'indisi to'liq tezlanishni beradi.

Burchak tezlanishi burchak tezligi bilan bir xil ishorada bo'lsa aylanish tezlashadi, qarama-qarshi bo'lsa sekinlashadi.

### Hayotiy misol
Ishga tushayotgan kir yuvish mashinasining barabani nolga teng tezlikdan asta-sekin to'liq aylanish tezligiga chiqadi — bu tekis o'zgaruvchan aylanma harakat.`,
      formulas: [
        { latex: '\\alpha = \\frac{\\Delta \\omega}{\\Delta t}', label: 'Burchak tezlanishi' },
        { latex: '\\omega = \\omega_0 + \\alpha t', label: 'Burchak tezligi' },
        {
          latex: '\\theta = \\omega_0 t + \\frac{\\alpha t^2}{2}',
          label: 'Burilgan burchak',
        },
        { latex: 'a_t = \\alpha r', label: 'Tangensial tezlanish' },
      ],
      sim: {
        demoType: 'orbit',
        accent: ACCENT,
        formula: '\\omega = \\omega_0 + \\alpha t',
        paramA: {
          key: 'omega0',
          label: "Boshlang'ich ω0",
          unit: 'rad/s',
          min: 0,
          max: 10,
          step: 0.1,
          value: 1,
        },
        paramB: {
          key: 'alpha',
          label: 'Burchak tezlanishi α',
          unit: 'rad/s²',
          min: -3,
          max: 3,
          step: 0.05,
          value: 0.5,
        },
      },
    },
    {
      code: '1.5',
      slug: 'proyektil-harakati',
      order: 5,
      titleUz: 'Proyektil harakati',
      titleEn: 'Projectile motion',
      difficulty: 'ORTA',
      summary:
        "Burchak ostida otilgan jismning parabolik traektoriyasi, maksimal balandlik va uchish masofasi.",
      keywords: ['proyektil', 'parabola', 'otish burchagi', 'traektoriya', 'projectile'],
      theory: `Burchak ostida otilgan jism harakati ikkita mustaqil harakatga ajratiladi. Gorizontal yo'nalishda havo qarshiligi hisobga olinmasa hech qanday kuch ta'sir qilmaydi, shuning uchun bu yo'nalishda harakat tekis. Vertikal yo'nalishda esa faqat og'irlik kuchi ta'sir qiladi va harakat erkin tushish tezlanishi bilan tekis o'zgaruvchan bo'ladi.

Shu ikki harakatning qo'shilishi paraboladan iborat traektoriyani beradi. Eng yuqori nuqtada vertikal tezlik nolga aylanadi, gorizontal tezlik esa o'zgarmay qoladi — shuning uchun bu nuqtada tezlik nolga teng bo'lmaydi.

Uchish masofasi otish burchagiga bog'liq va bir xil boshlang'ich tezlikda 45 gradusda maksimal qiymatga erishadi. Qiziq jihati: 30 va 60 gradus kabi bir-birini 90 gradusgacha to'ldiruvchi burchaklar bir xil masofa beradi.

### Hayotiy misol
Basketbol to'pining savatga uchishi, favvora suvining yoyi va to'p snaryadining traektoriyasi — barchasi shu model bilan tavsiflanadi.`,
      formulas: [
        { latex: 'x = v_0 \\cos\\theta \\cdot t', label: 'Gorizontal koordinata' },
        {
          latex: 'y = v_0 \\sin\\theta \\cdot t - \\frac{g t^2}{2}',
          label: 'Vertikal koordinata',
        },
        { latex: 'H = \\frac{(v_0 \\sin\\theta)^2}{2g}', label: 'Maksimal balandlik' },
        { latex: 'R = \\frac{v_0^2 \\sin 2\\theta}{g}', label: 'Uchish masofasi' },
        { latex: 't = \\frac{2 v_0 \\sin\\theta}{g}', label: 'Uchish vaqti' },
      ],
      sim: {
        demoType: 'motion',
        accent: ACCENT,
        formula: 'R = \\frac{v_0^2 \\sin 2\\theta}{g}',
        paramA: {
          key: 'v0',
          label: "Boshlang'ich tezlik v0",
          unit: 'm/s',
          min: 1,
          max: 60,
          step: 1,
          value: 20,
        },
        paramB: {
          key: 'theta',
          label: 'Otish burchagi θ',
          unit: '°',
          min: 0,
          max: 90,
          step: 1,
          value: 45,
        },
      },
    },
    {
      code: '1.6',
      slug: 'nisbiy-harakat',
      order: 6,
      titleUz: 'Nisbiy harakat',
      titleEn: 'Relative motion',
      difficulty: 'ORTA',
      summary: "Turli sanoq sistemalarida tezlikning o'zgarishi va nisbiy tezlik vektori.",
      keywords: ['nisbiy tezlik', 'sanoq sistemasi', 'relative motion', 'vektor ayirmasi'],
      theory: `Harakat har doim biror sanoq sistemasiga nisbatan qaraladi. Bir sanoq sistemasida tinch turgan jism boshqasida harakatlanayotgan bo'lishi mumkin — mutlaq harakat degan tushuncha yo'q.

Ikki jismning bir-biriga nisbatan tezligini topish uchun ularning tezlik vektorlari ayiriladi. Jismlar bir yo'nalishda harakatlansa, nisbiy tezlik modullari ayirmasiga teng bo'ladi va ular bir-biridan sekin uzoqlashadi. Qarama-qarshi yo'nalishda harakatlansa, nisbiy tezlik modullari yig'indisiga teng bo'ladi.

Yo'nalishlar burchak hosil qilsa, vektorlarni komponentlarga ajratib ayirish kerak. Daryodan suzib o'tish masalalari aynan shunday yechiladi: qayiqning suvga nisbatan tezligiga oqim tezligi vektor sifatida qo'shiladi.

### Hayotiy misol
Yonma-yon bir xil tezlikda ketayotgan ikki poyezd yo'lovchilariga bir-biri qimirlamayotgandek tuyuladi, chunki ularning nisbiy tezligi nolga teng.`,
      formulas: [
        { latex: '\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B', label: 'Nisbiy tezlik' },
        { latex: '\\vec{v}_A = \\vec{v}_{AB} + \\vec{v}_B', label: 'Tezliklarni qo\u2018shish' },
        { latex: 'v_{AB} = v_A + v_B', label: "Qarama-qarshi harakat" },
        { latex: 'v_{AB} = |v_A - v_B|', label: "Bir yo'nalishdagi harakat" },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: '\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B',
        paramA: {
          key: 'vA',
          label: 'A jism tezligi',
          unit: 'm/s',
          min: -30,
          max: 30,
          step: 1,
          value: 20,
        },
        paramB: {
          key: 'vB',
          label: 'B jism tezligi',
          unit: 'm/s',
          min: -30,
          max: 30,
          step: 1,
          value: -10,
        },
      },
    },
    {
      code: '1.7',
      slug: 'tezlik-vektori',
      order: 7,
      titleUz: 'Tezlik vektori',
      titleEn: 'Velocity vector',
      difficulty: 'OSON',
      summary: "Tezlikning komponentlari, moduli va yo'nalish burchagi.",
      keywords: ['tezlik vektori', 'komponentlar', 'modul', 'velocity vector', 'proyeksiya'],
      theory: `Tezlik — vektor kattalik, ya'ni uni to'liq tavsiflash uchun son qiymatidan tashqari yo'nalishni ham ko'rsatish kerak. Tekislikdagi harakatda tezlik vektori ikkita o'zaro perpendikulyar komponentga ajratiladi.

Vektor moduli Pifagor teoremasi orqali topiladi, yo'nalish burchagi esa komponentlar nisbatining arktangensi bilan aniqlanadi. Aksincha, modul va burchak berilgan bo'lsa, komponentlarni kosinus va sinus orqali hisoblash mumkin.

Muhim xususiyat: tezlik vektori har doim traektoriyaga urinma bo'ylab yo'naladi. Aynan shuning uchun aylanma harakatda tezlik moduli o'zgarmasa ham, tezlik vektori doimo o'zgarib turadi — bu esa tezlanish mavjudligini anglatadi.

Vektorlarni qo'shishda ularning komponentlari alohida-alohida qo'shiladi.

### Hayotiy misol
Silliq burilishda ketayotgan avtomobilning spidometri o'zgarmas qiymat ko'rsatadi, lekin tezlik vektori har lahzada yangi yo'nalishga ega bo'ladi.`,
      formulas: [
        { latex: '|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}', label: 'Tezlik moduli' },
        { latex: '\\theta = \\arctan\\frac{v_y}{v_x}', label: "Yo'nalish burchagi" },
        { latex: 'v_x = v \\cos\\theta', label: 'Gorizontal komponent' },
        { latex: 'v_y = v \\sin\\theta', label: 'Vertikal komponent' },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: '|\\vec{v}| = \\sqrt{v_x^2 + v_y^2}',
        paramA: {
          key: 'vx',
          label: 'vx komponent',
          unit: 'm/s',
          min: -20,
          max: 20,
          step: 0.5,
          value: 8,
        },
        paramB: {
          key: 'vy',
          label: 'vy komponent',
          unit: 'm/s',
          min: -20,
          max: 20,
          step: 0.5,
          value: 6,
        },
      },
    },
    {
      code: '1.8',
      slug: 'tezlanish-vektori',
      order: 8,
      titleUz: 'Tezlanish vektori',
      titleEn: 'Acceleration vector',
      difficulty: 'QIYIN',
      summary: "Tezlanishning normal va tangensial tashkil etuvchilari, egri chiziqli harakat.",
      keywords: ['tezlanish vektori', 'normal tezlanish', 'tangensial', 'egrilik radiusi'],
      theory: `Tezlanish tezlik vektorining o'zgarish tezligini bildiradi. Tezlik vektori ikki yo'l bilan o'zgarishi mumkin: moduli o'zgarishi yoki yo'nalishi o'zgarishi. Shunga mos ravishda tezlanish ikkita tashkil etuvchiga ajratiladi.

Tangensial tezlanish traektoriyaga urinma bo'ylab yo'nalgan va tezlik modulining o'zgarishiga javob beradi. Normal (markazga intiluvchi) tezlanish traektoriya egriligining markaziga qarab yo'nalgan va faqat yo'nalishni o'zgartiradi. To'liq tezlanish ularning vektor yig'indisiga teng.

To'g'ri chiziqli harakatda normal tashkil etuvchi nolga teng, tekis aylanma harakatda esa aksincha — tangensial tashkil etuvchi nolga teng bo'ladi va faqat markazga intiluvchi tezlanish qoladi.

### Hayotiy misol
Poyga avtomobili burilishga kirganda gazni bossa, u bir vaqtning o'zida ham tezlashadi, ham burilib boradi — ikkala tashkil etuvchi ham nolga teng emas.`,
      formulas: [
        { latex: '\\vec{a} = \\frac{\\Delta \\vec{v}}{\\Delta t}', label: "O'rtacha tezlanish" },
        { latex: 'a_n = \\frac{v^2}{r}', label: 'Normal tezlanish' },
        { latex: 'a_t = \\frac{dv}{dt}', label: 'Tangensial tezlanish' },
        { latex: 'a = \\sqrt{a_n^2 + a_t^2}', label: "To'liq tezlanish" },
      ],
      sim: {
        demoType: 'vector',
        accent: ACCENT,
        formula: 'a_n = \\frac{v^2}{r}',
        paramA: { key: 'v', label: 'Tezlik v', unit: 'm/s', min: 1, max: 40, step: 1, value: 15 },
        paramB: {
          key: 'r',
          label: 'Egrilik radiusi r',
          unit: 'm',
          min: 2,
          max: 100,
          step: 1,
          value: 25,
        },
      },
    },
  ],
};
