-- CreateTable
CREATE TABLE "bot_users" (
    "id" TEXT NOT NULL,
    "telegramId" BIGINT NOT NULL,
    "username" TEXT,
    "firstName" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "bot_users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "global_required_channels" (
    "id" TEXT NOT NULL,
    "channelId" BIGINT NOT NULL,
    "channelUsername" TEXT,
    "channelTitle" TEXT,
    "inviteLink" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "global_required_channels_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "bot_users_telegramId_key" ON "bot_users"("telegramId");

-- CreateIndex
CREATE UNIQUE INDEX "global_required_channels_channelId_key" ON "global_required_channels"("channelId");
