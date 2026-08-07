-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'CONFIRMED', 'REJECTED');

-- CreateTable
CREATE TABLE "groups" (
    "id" TEXT NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "title" TEXT,
    "username" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "groups_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "admins" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "isOwner" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "admins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filter_settings" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "linkFilter" BOOLEAN NOT NULL DEFAULT false,
    "badWordsFilter" BOOLEAN NOT NULL DEFAULT true,
    "apkFilter" BOOLEAN NOT NULL DEFAULT true,
    "zipFilter" BOOLEAN NOT NULL DEFAULT true,
    "exeFilter" BOOLEAN NOT NULL DEFAULT true,
    "rarFilter" BOOLEAN NOT NULL DEFAULT true,
    "xapkFilter" BOOLEAN NOT NULL DEFAULT true,
    "apkmFilter" BOOLEAN NOT NULL DEFAULT true,
    "floodProtection" BOOLEAN NOT NULL DEFAULT true,
    "antiSpam" BOOLEAN NOT NULL DEFAULT true,
    "antiForward" BOOLEAN NOT NULL DEFAULT false,
    "emojiSpamFilter" BOOLEAN NOT NULL DEFAULT true,
    "capsFilter" BOOLEAN NOT NULL DEFAULT true,
    "adFilter" BOOLEAN NOT NULL DEFAULT false,
    "requiredChannelsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "emojiLimit" INTEGER NOT NULL DEFAULT 5,
    "capsPercentLimit" INTEGER NOT NULL DEFAULT 70,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filter_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warning_settings" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "maxWarnings" INTEGER NOT NULL DEFAULT 3,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "warning_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spam_settings" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "messageLimit" INTEGER NOT NULL DEFAULT 5,
    "timeWindowSeconds" INTEGER NOT NULL DEFAULT 10,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "spam_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "warnings" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 1,
    "reason" TEXT,
    "adminId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "warnings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "muted_users" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "mutedUntil" TIMESTAMP(3),
    "reason" TEXT,
    "adminId" BIGINT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "muted_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "banned_users" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "reason" TEXT,
    "adminId" BIGINT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "banned_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reports" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "reporterId" BIGINT NOT NULL,
    "reportedUserId" BIGINT NOT NULL,
    "messageId" BIGINT,
    "status" "ReportStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "report_settings" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "limit" INTEGER NOT NULL DEFAULT 10,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "report_settings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "whitelist_users" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "whitelist_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "blacklist_users" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "reason" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "blacklist_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "rules" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "content" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "rules_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "daily_statistics" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "date" DATE NOT NULL,
    "deletedMessages" INTEGER NOT NULL DEFAULT 0,
    "warningsGiven" INTEGER NOT NULL DEFAULT 0,
    "bansGiven" INTEGER NOT NULL DEFAULT 0,
    "mutesGiven" INTEGER NOT NULL DEFAULT 0,
    "spamDetected" INTEGER NOT NULL DEFAULT 0,
    "reportsReceived" INTEGER NOT NULL DEFAULT 0,
    "linksDeleted" INTEGER NOT NULL DEFAULT 0,
    "filesDeleted" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "daily_statistics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spam_logs" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "messageCount" INTEGER NOT NULL,
    "timeWindowSeconds" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spam_logs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deleted_message_counters" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "userId" BIGINT NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "reason" TEXT,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deleted_message_counters_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "required_channels" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "channelId" BIGINT NOT NULL,
    "channelUsername" TEXT,
    "channelTitle" TEXT,
    "inviteLink" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "required_channels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "bad_words" (
    "id" TEXT NOT NULL,
    "groupId" TEXT NOT NULL,
    "word" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "bad_words_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "groups_telegramId_key" ON "groups"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "admins_groupId_userId_key" ON "admins"("groupId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "filter_settings_groupId_key" ON "filter_settings"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "warning_settings_groupId_key" ON "warning_settings"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "spam_settings_groupId_key" ON "spam_settings"("groupId");

-- CreateIndex
CREATE INDEX "warnings_groupId_userId_idx" ON "warnings"("groupId", "userId");

-- CreateIndex
CREATE INDEX "muted_users_groupId_userId_idx" ON "muted_users"("groupId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "banned_users_groupId_userId_key" ON "banned_users"("groupId", "userId");

-- CreateIndex
CREATE INDEX "reports_groupId_reportedUserId_idx" ON "reports"("groupId", "reportedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "reports_groupId_reporterId_reportedUserId_key" ON "reports"("groupId", "reporterId", "reportedUserId");

-- CreateIndex
CREATE UNIQUE INDEX "report_settings_groupId_key" ON "report_settings"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "whitelist_users_groupId_userId_key" ON "whitelist_users"("groupId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "blacklist_users_groupId_userId_key" ON "blacklist_users"("groupId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "rules_groupId_key" ON "rules"("groupId");

-- CreateIndex
CREATE UNIQUE INDEX "daily_statistics_groupId_date_key" ON "daily_statistics"("groupId", "date");

-- CreateIndex
CREATE INDEX "spam_logs_groupId_userId_idx" ON "spam_logs"("groupId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "deleted_message_counters_groupId_userId_key" ON "deleted_message_counters"("groupId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "required_channels_groupId_channelId_key" ON "required_channels"("groupId", "channelId");

-- CreateIndex
CREATE UNIQUE INDEX "bad_words_groupId_word_key" ON "bad_words"("groupId", "word");

-- AddForeignKey
ALTER TABLE "admins" ADD CONSTRAINT "admins_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filter_settings" ADD CONSTRAINT "filter_settings_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warning_settings" ADD CONSTRAINT "warning_settings_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spam_settings" ADD CONSTRAINT "spam_settings_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "warnings" ADD CONSTRAINT "warnings_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "muted_users" ADD CONSTRAINT "muted_users_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "banned_users" ADD CONSTRAINT "banned_users_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "reports" ADD CONSTRAINT "reports_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "report_settings" ADD CONSTRAINT "report_settings_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "whitelist_users" ADD CONSTRAINT "whitelist_users_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "blacklist_users" ADD CONSTRAINT "blacklist_users_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "rules" ADD CONSTRAINT "rules_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "daily_statistics" ADD CONSTRAINT "daily_statistics_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "spam_logs" ADD CONSTRAINT "spam_logs_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deleted_message_counters" ADD CONSTRAINT "deleted_message_counters_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "required_channels" ADD CONSTRAINT "required_channels_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bad_words" ADD CONSTRAINT "bad_words_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "groups"("id") ON DELETE CASCADE ON UPDATE CASCADE;
