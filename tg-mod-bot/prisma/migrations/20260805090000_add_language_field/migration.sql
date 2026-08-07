-- AlterTable: groups — guruhdagi javob tili
ALTER TABLE "groups"
  ADD COLUMN "language" TEXT NOT NULL DEFAULT 'uz';

-- AlterTable: bot_users — shaxsiy chatdagi javob tili
ALTER TABLE "bot_users"
  ADD COLUMN "language" TEXT NOT NULL DEFAULT 'uz';
