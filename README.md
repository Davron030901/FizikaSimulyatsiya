# PhysicsLab UZ

O'zbek tilidagi interaktiv fizika simulyatsiyalari platformasi.
Mexanika bo'yicha **9 ta bo'lim** va **79 ta mavzu** — har biri uchun alohida sahifa va
alohida simulyatsiya.

| Qism | Texnologiya | Deployment |
|------|-------------|------------|
| Frontend | Next.js 14 (App Router) + TypeScript + Tailwind | Vercel |
| Backend | Node 20 + Express + TypeScript | Render |
| Baza | PostgreSQL + Prisma | Render |

---

## Loyiha strukturasi

```
physicslab/
├── apps/
│   ├── api/                 # Express backend (Render)
│   │   ├── prisma/
│   │   │   ├── schema.prisma        # Section / Topic / Simulation / AdminUser
│   │   │   ├── seed.ts              # idempotent seed (upsert)
│   │   │   └── data/
│   │   │       ├── types.ts         # SectionSeed, TopicSeed, SimConfigSeed
│   │   │       ├── 01-kinematika.ts ... 09-suyuqlik.ts
│   │   │       ├── index.ts         # 9 bo'lim / 79 mavzu birlashtiriladi
│   │   │       └── validate.ts      # bazasiz butunlik tekshiruvi
│   │   ├── src/
│   │   │   ├── config/env.ts        # zod bilan env validatsiya
│   │   │   ├── lib/prisma.ts        # PrismaClient singleton
│   │   │   ├── lib/db.ts            # ulanish holati + kontent statistikasi
│   │   │   ├── middleware/          # error handler, 404, rate limit, validate
│   │   │   ├── schemas/             # zod query/param sxemalari
│   │   │   ├── services/            # section, topic, simulation, stats + mappers
│   │   │   ├── simulations/         # demo generator (config, styles, script, template)
│   │   │   ├── routes/              # sections, topics, simulations, search, stats
│   │   │   ├── types/               # ApiResponse, DTO'lar
│   │   │   ├── utils/               # AppError, response, html escape
│   │   │   ├── app.ts               # Express app + middleware
│   │   │   └── index.ts             # server + graceful shutdown
│   │   ├── .env.example
│   │   ├── package.json
│   │   ├── tsconfig.json
│   │   └── tsconfig.seed.json
│   └── web/                 # Next.js frontend (Vercel)
│       ├── src/
│       │   ├── app/
│       │   │   ├── page.tsx                    # bosh sahifa
│       │   │   ├── bolimlar/                   # ro'yxat + [section]
│       │   │   ├── simulyatsiya/[topic]/       # asosiy sahifa
│       │   │   ├── qidiruv/ · haqida/
│       │   │   ├── error.tsx · not-found.tsx
│       │   │   └── sitemap.ts · robots.ts
│       │   ├── components/
│       │   │   ├── layout/          # Header, NavLinks, MobileBottomNav, Footer
│       │   │   ├── sections/        # SectionCard, SectionIcon
│       │   │   ├── topics/          # TopicCard, TopicFilters, PrevNextNav
│       │   │   ├── simulation/      # SimulationFrame (iframe + postMessage)
│       │   │   ├── theory/          # TheoryTabs, MathJax
│       │   │   ├── search/          # SearchBar
│       │   │   ├── system/          # ApiStatus, ApiErrorState
│       │   │   └── ui/              # Button, Card, Badge, Skeleton, EmptyState
│       │   ├── lib/                 # api.ts, markdown.tsx, format.ts, useTheme.ts
│       │   └── types/
│       ├── .env.example
│       ├── next.config.mjs
│       ├── tailwind.config.ts
│       └── package.json
├── render.yaml              # Render blueprint
├── package.json             # npm workspaces + skriptlar
└── README.md
```

> **Eslatma:** har bir app o'z `node_modules` va o'z `tsconfig` iga ega — shu sabab
> Render (`rootDir: apps/api`) va Vercel (`Root Directory: apps/web`) hech qanday
> qo'shimcha sozlamasiz ishlaydi. Root'dagi workspaces faqat lokal qulaylik uchun.

---

## Lokal ishga tushirish

**Talab:** Node.js 20+ (`.nvmrc` bor, `nvm use` ishlatsangiz bo'ladi).

```bash
# 1. Paketlarni o'rnatish (root'dan, ikkala app uchun birdan)
npm install

# 2. Env fayllarni tayyorlash
cp apps/api/.env.example apps/api/.env
cp apps/web/.env.example apps/web/.env.local

# 3. PostgreSQL tayyorlash (bittasini tanlang)
#    a) Docker orqali lokal baza:
docker run --name physicslab-db -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=physicslab -p 5432:5432 -d postgres:16
#    b) yoki bepul bulutli baza oling (neon.tech / render.com) va
#       DATABASE_URL ni apps/api/.env ga yozing

# 4. Sxemani bazaga qo'llash va ma'lumotlarni yuklash
npm run prisma:migrate -w @physicslab/api   # birinchi marta: nom so'raydi -> "init"
npm run seed -w @physicslab/api             # 9 bo'lim + 79 mavzu

# 5. Ikkalasini birga ishga tushirish
npm run dev
```

- Backend → http://localhost:4000/api/health
- Frontend → http://localhost:3000

Alohida ishga tushirish: `npm run dev:api` yoki `npm run dev:web`.

### Skriptlar (root)

| Buyruq | Vazifasi |
|--------|----------|
| `npm run dev` | API + Web birga (concurrently) |
| `npm run dev:api` / `npm run dev:web` | Bittasini alohida |
| `npm run build` | Ikkalasini build qilish |
| `npm run typecheck` | Ikkala app'da `tsc --noEmit` |
| `npm run lint` | Frontend eslint |

### `.npmrc` nima uchun kerak

Render (va Heroku kabi platformalar) `NODE_ENV=production` o'rnatadi, npm esa bu
holatda **devDependencies'ni umuman o'rnatmaydi**. Lekin `typescript` va `@types/*`
aynan build uchun, `tsx` esa `seed` va `create:admin` uchun kerak. Repodagi
`.npmrc` (`include=dev`) shu paketlarni majburan yoqadi.

Fayl uch joyda: ildizda, `apps/api/` va `apps/web/` da — chunki Render
`rootDir: apps/api` ichida `npm install` bajaradi va npm konfiguratsiyani
joriy papkadan o'qiydi.

> Agar Render'da servisni **qo'lda** yaratgan bo'lsangiz, Build Command'ni
> `npm install --include=dev && npm run build` ga o'zgartiring. `.npmrc` bo'lsa
> eski buyruq bilan ham ishlaydi, lekin ikkalasi birga ishonchliroq.

### Versiyalar haqida

`typescript`, `prisma` va `@prisma/client` **aniq versiya** bilan qotirilgan va
`package-lock.json` repoda saqlanadi. Sabab: TypeScript 7 `moduleResolution: "node"`
ni butunlay olib tashladi, ya'ni erkin versiya diapazoni deploy paytida build'ni
kutilmaganda buzishi mumkin. `prisma` va `@prisma/client` esa bir xil versiyada
bo'lishi shart.

### Baza skriptlari (`-w @physicslab/api`)

| Buyruq | Vazifasi |
|--------|----------|
| `npm run create:admin` | Admin hisobini yaratish/yangilash (interaktiv yoki env orqali) |
| `npm run validate:data` | Seed ma'lumotlarini bazasiz tekshirish (79 mavzu, slug, formula) |
| `npm run prisma:migrate` | Migratsiya yaratish va qo'llash (dev) |
| `npm run prisma:deploy` | Mavjud migratsiyalarni qo'llash (prod) |
| `npm run seed` | Bo'lim va mavzularni yuklash (idempotent) |
| `npm run prisma:studio` | Bazani brauzerda ko'rish |
| `npm run db:reset` | Bazani tozalab, qaytadan migratsiya + seed |

---

## Environment o'zgaruvchilari

**`apps/api/.env`**

| Nomi | Majburiy | Izoh |
|------|----------|------|
| `NODE_ENV` | yo'q | `development` (default) |
| `PORT` | yo'q | `4000` (default). Render o'zi beradi |
| `FRONTEND_URL` | ha (prod) | CORS uchun frontend manzili |
| `CORS_EXTRA_ORIGINS` | yo'q | Qo'shimcha originlar, vergul bilan |
| `JWT_SECRET` | ha (prod) | Admin auth uchun, min 16 belgi (`openssl rand -base64 32`) |
| `JWT_EXPIRES_IN` | yo'q | Token muddati, default `7d` |
| `ADMIN_EMAIL` | yo'q | `create:admin` va seed uchun |
| `ADMIN_PASSWORD` | yo'q | Kamida 8 belgi |
| `DATABASE_URL` | **ha** | PostgreSQL connection string |

**`apps/web/.env.local`**

| Nomi | Izoh |
|------|------|
| `NEXT_PUBLIC_API_URL` | Backend manzili |
| `NEXT_PUBLIC_SITE_URL` | Saytning o'z manzili (SEO uchun) |

Env noto'g'ri bo'lsa API ishga tushmaydi va aniq xato ro'yxatini chiqaradi.

---

## Ma'lumotlar modeli

```
Section (9 ta)  ──1:N──>  Topic (79 ta)  ──1:1──>  Simulation
   slug, code,              slug, code, order,        kind: DEFAULT | HTML | EXTERNAL
   titleUz, color,          titleUz, summary,         htmlContent | externalUrl
   icon, order              theory (Markdown),        config (demo parametrlari)
                            formulas (JSON),          status: DRAFT | PUBLISHED
                            keywords, difficulty
```

Har bir mavzuga seed vaqtida `kind = DEFAULT` simulyatsiya biriktiriladi va uning
`config` maydonida demo shablon parametrlari saqlanadi:

```json
{
  "demoType": "fluid",
  "accent": "#0EA5E9",
  "formula": "P = \\rho g h",
  "paramA": { "key": "h", "label": "Chuqurlik h", "unit": "m", "min": 0, "max": 50, "step": 0.5, "value": 10 },
  "paramB": { "key": "rho", "label": "Zichlik ρ", "unit": "kg/m³", "min": 500, "max": 14000, "step": 50, "value": 1000 }
}
```

`demoType` bo'limga qarab tanlanadi: `motion`, `wave`, `orbit`, `vector`, `fluid`.
FAZA 3 dagi HTML generatori aynan shu konfiguratsiyani o'qiydi.

> **Seed xavfsizligi:** seed `upsert` ishlatadi, shuning uchun uni istalgancha marta
> qayta ishga tushirish mumkin. Admin joylagan simulyatsiyalar (`kind = HTML` yoki
> `EXTERNAL`) hech qachon qayta yozilmaydi.

---

## API endpointlar (FAZA 3)

| Metod | Yo'l | Tavsif |
|-------|------|--------|
| `GET` | `/api` | API haqida ma'lumot va endpointlar ro'yxati |
| `GET` | `/api/health` | `status`, `version`, `uptimeSeconds`, `database`, `content` |
| `GET` | `/api/sections` | 9 ta bo'lim + har birida nechta mavzu borligi |
| `GET` | `/api/sections/:slug` | Bo'lim va uning mavzulari |
| `GET` | `/api/topics` | `?section=&q=&difficulty=&page=&limit=` — sahifalangan ro'yxat |
| `GET` | `/api/topics/:slug` | Nazariya, formulalar, oldingi/keyingi mavzu, bog'liq mavzular |
| `GET` | `/api/simulations/:topicSlug` | Simulyatsiya metadatasi + `embedUrl` |
| `GET` | `/api/simulations/:topicSlug/embed` | **HTML** — iframe shu manzilni yuklaydi |
| `GET` | `/api/search?q=` | Sarlavha, tavsif, kod va kalit so'zlar bo'yicha qidiruv |
| `GET` | `/api/stats` | Bo'lim/mavzu/simulyatsiya sonlari |

### Admin endpointlar (JWT talab qilinadi)

| Metod | Yo'l | Tavsif |
|-------|------|--------|
| `POST` | `/api/auth/login` | Email + parol → JWT token |
| `GET` | `/api/auth/me` | Joriy admin ma'lumoti |
| `GET` | `/api/admin/topics` | 79 ta mavzu + simulyatsiya holati |
| `GET` | `/api/admin/simulations/:topicSlug` | HTML kod bilan birga |
| `PUT` | `/api/admin/simulations/:topicSlug` | Kod/manzil va holatni saqlash |
| `POST` | `/api/admin/simulations/:topicSlug/reset` | Demo holatiga qaytarish |

### `/embed` qanday ishlaydi

```
kind = EXTERNAL  ->  302 redirect (externalUrl)
kind = HTML      ->  bazadagi htmlContent
kind = DEFAULT   ->  config asosida demo sahifa generatsiya qilinadi
status = DRAFT   ->  tashqi foydalanuvchiga demo ko'rsatiladi
                     (?preview=1 bo'lsa admin uchun asl kod)
```

Query parametrlar: `?theme=light|dark`, `?preview=1`.

Sarlavhalar: `Content-Type: text/html`, `Cache-Control: public, max-age=300`,
`Content-Security-Policy` (skriptlar faqat jsDelivr va cdnjs dan), `X-Frame-Options`
ataylab **olib tashlangan** — aks holda iframe ishlamaydi.

### Demo simulyatsiya

Har bir mavzu uchun `config.demoType` ga qarab canvas animatsiyasi chiziladi:

| demoType | Nima chiziladi | Mavzular |
|----------|----------------|----------|
| `motion` | Trek bo'ylab harakat + tezlik vektori | 15 |
| `wave` | Sinusoidal to'lqin + marker | 13 |
| `orbit` | Aylanma harakat + urinma tezlik | 19 |
| `vector` | Ikki vektor + natijaviy (parallelogramm) | 20 |
| `fluid` | Idish, suyuqlik sathi, bosim gradiyenti | 12 |

Har bir sahifada: 2 ta slider + raqamli input + min/o'rta/max presetlari,
Play/Pauza/Reset, tezlik 0.25×–4×, vaqt bo'yicha jonli grafik, MathJax formulasi,
klaviatura boshqaruvi (Space, R) va ota-sahifaga `postMessage` orqali balandlik.

> **Muhim:** demo animatsiya parametrlarga javob beradi, lekin bu mavzuning to'liq fizik
> modeli emas — sahifada shu haqda ochiq yozilgan. To'liq simulyatsiyalar admin panel
> orqali almashtiriladi (FAZA 5).

Barcha javoblar bir xil formatda:

```json
{ "success": true, "data": { } }
{ "success": false, "error": { "code": "NOT_FOUND", "message": "Topilmadi" } }
```

---

## Deployment

Ketma-ketlik muhim: avval baza, keyin backend, keyin frontend, oxirida CORS.

### 1. Repo'ni GitHub'ga joylang

```bash
git init && git add . && git commit -m "PhysicsLab UZ"
git remote add origin https://github.com/<siz>/physicslab.git
git push -u origin main
```

### 2. Backend + baza → Render

**Blueprint orqali (tavsiya etiladi):** Render → **New → Blueprint** → repo'ni tanlang.
`render.yaml` avtomatik o'qiladi va PostgreSQL bilan birga web service yaratadi.

**Qo'lda:**

1. **New → PostgreSQL** (Free) → nom: `physicslab-db`, region: Frankfurt
2. **New → Web Service** → repo → sozlamalar:
   - Root Directory: `apps/api`
   - Build Command: `npm install && npm run build`
   - Start Command: `npx prisma migrate deploy && npm run start`
   - Health Check Path: `/api/health`
3. **Environment** bo'limida:

   | Kalit | Qiymat |
   |-------|--------|
   | `NODE_ENV` | `production` |
   | `DATABASE_URL` | bazadan **Internal Connection String** |
   | `JWT_SECRET` | `openssl rand -base64 32` natijasi |
   | `FRONTEND_URL` | Vercel domeni (3-qadamdan keyin qo'shiladi) |
   | `ADMIN_EMAIL` / `ADMIN_PASSWORD` | admin hisobi uchun |

4. Deploy tugagach **Shell** ni oching va bir marta ishga tushiring:

   ```bash
   npm run seed        # 9 bo'lim + 79 mavzu + admin
   ```

   > Jadvallar `startCommand` ichidagi `prisma migrate deploy` orqali avtomatik
   > yaratiladi — boshlang'ich migratsiya `apps/api/prisma/migrations/` da commit
   > qilingan. Seed esa faqat ma'lumot to'ldiradi.

5. Tekshiring: `https://<servis>.onrender.com/api/health` → `"database": "connected"`,
   `"content": { "topics": 79 }`

### 3. Frontend → Vercel

1. **New Project** → repo'ni import qiling
2. **Root Directory:** `apps/web` (Vercel monorepo'ni o'zi aniqlaydi)
3. **Environment Variables:**

   | Kalit | Qiymat |
   |-------|--------|
   | `NEXT_PUBLIC_API_URL` | `https://<servis>.onrender.com` |
   | `NEXT_PUBLIC_SITE_URL` | `https://<loyiha>.vercel.app` |

4. Deploy

### 4. CORS ni yoping

Render'ga qaytib, `FRONTEND_URL` ni Vercel domeniga o'zgartiring va servisni qayta
ishga tushiring. Preview deploylar (`*.vercel.app`) allaqachon regex orqali ruxsat
etilgan.

### 5. Birinchi simulyatsiyani joylang

`https://<loyiha>.vercel.app/admin/login` → kiring → mavzuni tanlang → HTML kodni
joylang → **Nashr qilish**.

---

### To'liq bepul variant (tavsiya etiladi)

| Qism | Xizmat | Cheklov |
|------|--------|---------|
| Frontend | **Vercel Hobby** | Bepul, muddatsiz |
| Backend | **Render Free** | 15 daqiqadan keyin uxlaydi (~50 s sovuq start) |
| Baza | **Neon Free** | 0.5 GB, muddatsiz |

> **Muhim:** Render'ning bepul PostgreSQL'i **30 kundan keyin o'chiriladi**. Loyihani
> uzoq muddat bepul ushlab turish uchun bazani [neon.tech](https://neon.tech) da oching
> (bepul tarif muddatsiz) va `DATABASE_URL` ni Render'ning env'iga qo'ying:
>
> ```
> DATABASE_URL=postgresql://user:parol@ep-xxx.eu-central-1.aws.neon.tech/neondb?sslmode=require
> ```
>
> Neon Frankfurt regionida ochilsa, Render'dagi backend bilan kechikish minimal bo'ladi.
> Bazani almashtirgach bir marta `npm run prisma:deploy` va `npm run seed` ni ishga tushiring.

### Bepul tarif haqida

Render Free tier 15 daqiqa harakatsizlikdan keyin uxlaydi. Birinchi so'rov ~30
soniya oladi — frontend buni biladi va "Server uyg'onmoqda..." xabarini
ko'rsatadi. Agar bu qabul qilinmasa:

- Render'ni Starter tarifga o'tkazing (uxlamaydi), yoki
- tashqi cron (masalan cron-job.org) har 10 daqiqada `/api/health` ga so'rov yuborsin

### Muammolarni bartaraf etish

| Belgi | Sabab | Yechim |
|-------|-------|--------|
| Sahifada "Ma'lumotlarni yuklab bo'lmadi" | Render uxlagan yoki `NEXT_PUBLIC_API_URL` xato | 30 soniya kuting; Vercel env'ni tekshiring |
| Brauzer konsolida CORS xatosi | `FRONTEND_URL` Vercel domeniga mos emas | Render env'ni yangilang va qayta deploy qiling |
| Simulyatsiya iframe bo'sh | API `/embed` ga yetib bormayapti | `<API>/api/simulations/<slug>/embed` ni to'g'ridan-to'g'ri oching |
| `/api/health` da `"database": "error"` | Migratsiya o'tmagan | Render Shell: `npx prisma migrate deploy` |
| `npm install` da Prisma xatosi | Engine yuklab olinmadi (tarmoq) | Tarmoqni tekshiring yoki `npm install --ignore-scripts` + `npx prisma generate` |
| Build'da `TS5108: moduleResolution ... removed` | Global TypeScript ishlatilgan (devDeps o'rnatilmagan) | `.npmrc` commit qilinganini tekshiring |
| Build'da `TS7016: Could not find a declaration file for 'express'` | devDependencies o'rnatilmagan | `.npmrc` (`include=dev`) yoki Build Command'ga `--include=dev` |
| Render Shell'da `npm run seed` → `tsx: not found` | devDependencies o'rnatilmagan | Yuqoridagi bilan bir xil sabab |
| `TS2307: Cannot find module './xxx.route'` | Fayl ustiga boshqa fayl yozilgan | `npm run verify` — qaysi fayl buzilganini aytadi |
| Baza to'satdan yo'qoldi | Render Free Postgres 30 kunda o'chadi | Neon'ga o'ting (yuqoriga qarang) |
| `/api/health` ishlaydi, lekin `/api/sections` 500 | Migratsiya qo'llanmagan | `npm run prisma:deploy -w @physicslab/api` |
| Admin panelga kira olmayapman | Hisob yaratilmagan | Render Shell: `npm run create:admin` |

---

## Testlar

Fayllar to'g'ri ko'chirilganini tekshirish (birinchi navbatda shuni ishga tushiring):

```bash
npm run verify        # MANIFEST.sha256 bo'yicha 139 ta faylni solishtiradi
```

Bazasiz ishlaydigan tekshiruvlar (istalgan joyda, CI'da ham):

```bash
npm test              # sxema + seed ma'lumotlari + 79 demo sahifa
npm run test:schema   # schema.prisma strukturasi (engine talab qilmaydi)
npm run test:data     # 79 mavzu, slug, formula, slider chegaralari
npm run test:demos    # 79 ta demo HTML generatsiyasi va tuzilishi
npm run typecheck     # ikkala app
```

Baza va build talab qiladiganlar:

```bash
DATABASE_URL=... npm run test:migration   # migratsiya sxemaga mos keladimi (psql orqali)
npm run test:api                          # 51 ta public endpoint tekshiruvi
ADMIN_EMAIL=... ADMIN_PASSWORD=... npm run test:admin   # login -> qoralama -> nashr -> reset
npm run build:web && npm run test:web     # 16 sahifa + 24 mazmun tekshiruvi
npm run build:web && npm run audit        # a11y + SEO + WCAG kontrast
```

> `test:admin` ma'lumotni o'zgartiradi, lekin oxirida simulyatsiyani demo holatiga
> qaytaradi. `TEST_TOPIC_SLUG` bilan boshqa mavzuni tanlash mumkin.

`npm run audit` API va Next serverni ko'tarib, render qilingan HTML'ni tekshiradi:
sarlavhalar ierarxiyasi, `alt` / `title` / `aria-label` atributlari, meta teglar,
canonical, OG rasmlar, `manifest.webmanifest`, `sitemap.xml`, hamda dizayn
tokenlarining WCAG kontrast nisbatlari (light va dark uchun alohida).

> **Eslatma:** bu Lighthouse emas. Brauzer talab qiladigan ko'rsatkichlar (LCP, CLS,
> TBT, haqiqiy tap-target o'lchamlari) o'lchanmaydi — ularni deploy qilingandan keyin
> PageSpeed Insights orqali tekshiring.

---

## SEO va accessibility

**SEO:**
- Har bir sahifada `generateMetadata`: title, description, canonical, OpenGraph, Twitter
- Dinamik OG rasmlar: umumiy (`/opengraph-image`) va har bir mavzu uchun alohida
  (bo'lim rangi, kodi va nomi bilan)
- JSON-LD: `WebSite` + `SearchAction` (bosh sahifa), `Course` (bo'lim),
  `LearningResource` (mavzu), `BreadcrumbList` (bo'lim va mavzu)
- `sitemap.xml` — 9 bo'lim + 79 mavzu, `robots.txt` — `/admin` yopiq
- `manifest.webmanifest` + SVG ikonka (telefonga o'rnatish mumkin)

**Accessibility:**
- Sarlavhalar ierarxiyasi buzilmaydi — kartalar `headingLevel` propi orqali
  h2 yoki h3 bo'ladi, nazariya panellarida ko'rinmas h2 bor
- Tab paneli to'liq WAI-ARIA namunasi bo'yicha: `ArrowLeft/Right`, `Home`, `End`,
  `roving tabindex`
- Skip-link, `:focus-visible` ring, `aria-live` filtr natijalari uchun
- Barcha interaktiv element ≥ 44px (mobil tap-target)
- `prefers-reduced-motion` hurmat qilinadi
- WCAG AA kontrast: matn 17:1, ikkilamchi matn 5.9:1 (light) / 7.4:1 (dark)

**Xavfsizlik sarlavhalari:** `X-Content-Type-Options`, `Referrer-Policy`,
`Permissions-Policy`, `X-Frame-Options: SAMEORIGIN`, `Strict-Transport-Security`.
`/admin/*` uchun qo'shimcha `X-Robots-Tag: noindex` va `Cache-Control: no-store`.

---

## Bosqichlar

- [x] **FAZA 1** — Skelet: monorepo, Express + `/api/health`, Next.js + Tailwind, deploy konfiglari
- [x] **FAZA 2** — Prisma sxema, migratsiya, 9 bo'lim + 79 mavzu seed
- [x] **FAZA 3** — API: sections, topics, simulations, `/embed`, demo shablon generatori
- [x] **FAZA 4** — Frontend: bo'limlar, mavzular gridi, simulyatsiya sahifasi, qidiruv
- [x] **FAZA 5** — Admin panel: JWT auth, HTML editor + preview
- [x] **FAZA 6** — SEO, accessibility, xavfsizlik sarlavhalari, audit skripti
