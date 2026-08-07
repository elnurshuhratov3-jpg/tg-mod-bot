import prisma from "../database/prisma.js";

/** Barcha faol umumiy majburiy kanallar (shaxsiy chat uchun) */
export async function listActiveGlobalChannels() {
  return prisma.globalRequiredChannel.findMany({
    where: { isActive: true },
    orderBy: { createdAt: "asc" },
  });
}

/** Barcha umumiy majburiy kanallar (o'chirilganlari ham) */
export async function listAllGlobalChannels() {
  return prisma.globalRequiredChannel.findMany({ orderBy: { createdAt: "asc" } });
}

/** Yangi umumiy majburiy kanal qo'shadi yoki mavjudini yangilaydi */
export async function addGlobalChannel(channel) {
  return prisma.globalRequiredChannel.upsert({
    where: { channelId: BigInt(channel.id) },
    update: {
      channelUsername: channel.username ?? null,
      channelTitle: channel.title ?? null,
      inviteLink: channel.inviteLink ?? null,
      isActive: true,
    },
    create: {
      channelId: BigInt(channel.id),
      channelUsername: channel.username ?? null,
      channelTitle: channel.title ?? null,
      inviteLink: channel.inviteLink ?? null,
    },
  });
}

/** Umumiy majburiy kanalni ro'yxatdan butunlay o'chiradi */
export async function removeGlobalChannel(recordId) {
  return prisma.globalRequiredChannel.deleteMany({ where: { id: recordId } }).catch(() => null);
}
