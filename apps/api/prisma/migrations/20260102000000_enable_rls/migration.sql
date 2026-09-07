-- Row Level Security barcha jadvallar uchun.
--
-- Sabab: Supabase `public` sxemadagi har qanday jadvalni avtomatik ravishda
-- PostgREST Data API orqali tarqatadi. Prisma migratsiyasi yaratgan jadvallarda
-- RLS o'chiq bo'ladi — ya'ni loyihaning ochiq `anon` kaliti bilan istalgan odam
-- "AdminUser" jadvalidagi parol hashlarini o'qiy olardi.
--
-- RLS yoqilgach va hech qanday policy berilmagach, `anon` va `authenticated`
-- rollari uchun jadvallar butunlay yopiladi. Ilova esa jadval egasi (`postgres`)
-- sifatida ulanadi, egalar esa RLS'ni chetlab o'tadi — shuning uchun Prisma
-- so'rovlariga hech qanday ta'sir qilmaydi.
--
-- Supabase'dan tashqarida (Neon, Render, lokal PostgreSQL) bu migratsiya ham
-- xavfsiz: RLS yoqiladi, lekin `anon` roli mavjud bo'lmagani uchun REVOKE
-- qismi o'tkazib yuboriladi.

ALTER TABLE "Section" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Topic" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "Simulation" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "AdminUser" ENABLE ROW LEVEL SECURITY;

DO $$
DECLARE
  target_role text;
BEGIN
  FOREACH target_role IN ARRAY ARRAY['anon', 'authenticated'] LOOP
    IF EXISTS (SELECT 1 FROM pg_roles WHERE rolname = target_role) THEN
      EXECUTE format(
        'REVOKE ALL ON TABLE "Section", "Topic", "Simulation", "AdminUser" FROM %I',
        target_role
      );
    END IF;
  END LOOP;
END
$$;
