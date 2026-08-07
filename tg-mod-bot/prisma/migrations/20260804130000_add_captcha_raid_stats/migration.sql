-- CreateEnum
CREATE TYPE "MemberEventType" AS ENUM ('JOIN', 'LEAVE');

-- AlterTable: filter_settings — captcha, anti-raid, slow mode, yangi filtrlar, log-kanal
ALTER TABLE "filter_settings"
  ADD COLUMN "captchaEnabled" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "antiRaidEnabled" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "antiRaidThreshold" INTEGER NOT NULL DEFAULT 10,
  ADD COLUMN "antiRaidWindowSeconds" INTEGER NOT NULL DEFAULT 30,
  ADD COLUMN "slowModeSeconds" INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN "stickerSpamFilter" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "duplicateSpamFilter" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "deleteServiceMessages" BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN "logChannelId" BIGINT;

-- AlterTable: banned_users — vaqtinchalik ban muddati
ALTER TABLE "banned_users"
  ADD COLUMN "bannedUntil" TIMESTAMP(3);

-- CreateTable: member_events
CREATE TABLE "member_events" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "type" "MemberEventType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "member_events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "member_events_groupId_type_createdAt_idx" ON "member_events"("groupId", "type", "createdAt");

-- AddForeignKey
ALTER TABLE "member_events" ADD CONSTRAINT "member_events_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
