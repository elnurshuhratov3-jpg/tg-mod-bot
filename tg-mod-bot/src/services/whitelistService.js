import prisma from "../database/prisma.js";

/** Foydalanuvchi shu guruhning oq ro'yxatida ekanligini tekshiradi */
export async function isWhitelisted(groupId, userId) {
  const entry = await prisma.whitelistUser.findUnique({
    where: { groupId_userId: { groupId, userId: BigInt(userId) } },
  });
  return !!entry;
}

/** Foydalanuvchini oq ro'yxatga qo'shadi (bo'lsa qayta qo'shmaydi) */
export async function addToWhitelist(groupId, userId) {
  return prisma.whitelistUser.upsert({
    where: { groupId_userId: { groupId, userId: BigInt(userId) } },
    update: {},
    create: { groupId, userId: BigInt(userId) },
  });
}

/** Foydalanuvchini oq ro'yxatdan chiqaradi */
export async function removeFromWhitelist(groupId, userId) {
  return prisma.whitelistUser
    .delete({ where: { groupId_userId: { groupId, userId: BigInt(userId) } } })
    .catch(() => null);
}

/** Guruhning to'liq oq ro'yxatini qaytaradi */
export async function listWhitelist(groupId) {
  return prisma.whitelistUser.findMany({ where: { groupId }, orderBy: { createdAt: "desc" } });
}
