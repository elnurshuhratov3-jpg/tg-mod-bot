import prisma from "../database/prisma.js";

/**
 * Foydalanuvchining shu guruhdagi to'liq "profili"ni yig'ib qaytaradi:
 * ogohlantirishlar soni, mute/ban holati, o'chirilgan xabarlar soni,
 * guruhga birinchi qo'shilgan sanasi.
 */
export async function getUserProfile(groupId, userId) {
  const id = BigInt(userId);

  const [warningsCount, activeMute, ban, deletedCounter, firstJoin] = await Promise.all([
    prisma.warning.count({ where: { groupId, userId: id } }),
    prisma.mutedUser.findFirst({
      where: { groupId, userId: id, isActive: true },
      orderBy: { createdAt: "desc" },
    }),
    prisma.bannedUser.findUnique({ where: { groupId_userId: { groupId, userId: id } } }),
    prisma.deletedMessageCounter.findUnique({ where: { groupId_userId: { groupId, userId: id } } }),
    prisma.memberEvent.findFirst({
      where: { groupId, userId: id, type: "JOIN" },
      orderBy: { createdAt: "asc" },
    }),
  ]);

  return {
    warningsCount,
    isMuted: Boolean(activeMute),
    mutedUntil: activeMute?.mutedUntil ?? null,
    isBanned: Boolean(ban),
    deletedMessagesCount: deletedCounter?.count ?? 0,
    firstJoinedAt: firstJoin?.createdAt ?? null,
  };
}
