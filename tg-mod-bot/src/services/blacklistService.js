import prisma from "../database/prisma.js";

/** Foydalanuvchi shu guruhning qora ro'yxatida ekanligini tekshiradi */
export async function isBlacklisted(groupId, userId) {
  const entry = await prisma.blacklistUser.findUnique({
    where: { groupId_userId: { groupId, userId: BigInt(userId) } },
  });
  return !!entry;
}

/** Foydalanuvchini qora ro'yxatga qo'shadi */
export async function addToBlacklist(groupId, userId, reason) {
  return prisma.blacklistUser.upsert({
    where: { groupId_userId: { groupId, userId: BigInt(userId) } },
    update: { reason },
    create: { groupId, userId: BigInt(userId), reason },
  });
}

/** Foydalanuvchini qora ro'yxatdan chiqaradi */
export async function removeFromBlacklist(groupId, userId) {
  return prisma.blacklistUser
    .delete({ where: { groupId_userId: { groupId, userId: BigInt(userId) } } })
    .catch(() => null);
}

/** Guruhning to'liq qora ro'yxatini qaytaradi */
export async function listBlacklist(groupId) {
  return prisma.blacklistUser.findMany({ where: { groupId }, orderBy: { createdAt: "desc" } });
}
