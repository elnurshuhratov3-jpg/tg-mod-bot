import prisma from "../database/prisma.js";

/** Guruhning faol (isActive) majburiy kanallari ro'yxati */
export async function listActiveChannels(groupId) {
  return prisma.requiredChannel.findMany({
    where: { groupId, isActive: true },
    orderBy: { createdAt: "asc" },
  });
}

/** Guruhning barcha majburiy kanallari (o'chirilganlari ham) */
export async function listAllChannels(groupId) {
  return prisma.requiredChannel.findMany({ where: { groupId }, orderBy: { createdAt: "asc" } });
}

/** Yangi majburiy kanal qo'shadi */
export async function addRequiredChannel(groupId, channel) {
  return prisma.requiredChannel.upsert({
    where: { groupId_channelId: { groupId, channelId: BigInt(channel.id) } },
    update: {
      channelUsername: channel.username ?? null,
      channelTitle: channel.title ?? null,
      inviteLink: channel.inviteLink ?? null,
      isActive: true,
    },
    create: {
      groupId,
      channelId: BigInt(channel.id),
      channelUsername: channel.username ?? null,
      channelTitle: channel.title ?? null,
      inviteLink: channel.inviteLink ?? null,
    },
  });
}

/** Majburiy kanalni ro'yxatdan butunlay o'chiradi */
export async function removeRequiredChannel(groupId, recordId) {
  return prisma.requiredChannel
    .deleteMany({ where: { id: recordId, groupId } })
    .catch(() => null);
}

/** Majburiy kanal tekshiruvini guruh bo'yicha yoqadi/o'chiradi */
export async function setRequiredChannelsEnabled(groupId, enabled) {
  return prisma.filterSettings.update({
    where: { groupId },
    data: { requiredChannelsEnabled: enabled },
  });
}
