-- CreateEnum
CREATE TYPE "Difficulty" AS ENUM ('OSON', 'ORTA', 'QIYIN');

-- CreateEnum
CREATE TYPE "SimKind" AS ENUM ('DEFAULT', 'HTML', 'EXTERNAL');

-- CreateEnum
CREATE TYPE "SimStatus" AS ENUM ('DRAFT', 'PUBLISHED');

-- CreateTable
CREATE TABLE "Section" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "titleUz" TEXT NOT NULL,
    "titleEn" TEXT,
    "description" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Section_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Topic" (
    "id" TEXT NOT NULL,
    "sectionId" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    "titleUz" TEXT NOT NULL,
    "titleEn" TEXT,
    "summary" TEXT NOT NULL,
    "theory" TEXT NOT NULL,
    "formulas" JSONB NOT NULL,
    "keywords" TEXT[],
    "difficulty" "Difficulty" NOT NULL DEFAULT 'ORTA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Topic_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Simulation" (
    "id" TEXT NOT NULL,
    "topicId" TEXT NOT NULL,
    "kind" "SimKind" NOT NULL DEFAULT 'DEFAULT',
    "htmlContent" TEXT,
    "externalUrl" TEXT,
    "config" JSONB,
    "version" INTEGER NOT NULL DEFAULT 1,
    "status" "SimStatus" NOT NULL DEFAULT 'PUBLISHED',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Simulation_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdminUser" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AdminUser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Section_slug_key" ON "Section"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Section_code_key" ON "Section"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Section_order_key" ON "Section"("order");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_slug_key" ON "Topic"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_code_key" ON "Topic"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_sectionId_order_key" ON "Topic"("sectionId", "order");

-- CreateIndex
CREATE UNIQUE INDEX "Simulation_topicId_key" ON "Simulation"("topicId");

-- CreateIndex
CREATE INDEX "Simulation_kind_status_idx" ON "Simulation"("kind", "status");

-- CreateIndex
CREATE UNIQUE INDEX "AdminUser_email_key" ON "AdminUser"("email");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_sectionId_fkey" FOREIGN KEY ("sectionId") REFERENCES "Section"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Simulation" ADD CONSTRAINT "Simulation_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
