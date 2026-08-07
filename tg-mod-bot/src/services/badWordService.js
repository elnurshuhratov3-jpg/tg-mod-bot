import prisma from "../database/prisma.js";

/** Guruhga yangi yomon so'z qo'shadi (bo'lsa qayta qo'shmaydi) */
export async function addBadWord(groupId, word) {
  const normalized = word.trim().toLowerCase();
  return prisma.badWord.upsert({
    where: { groupId_word: { groupId, word: normalized } },
    update: {},
    create: { groupId, word: normalized },
  });
}

/** Guruhdan yomon so'zni olib tashlaydi */
export async function removeBadWord(groupId, word) {
  const normalized = word.trim().toLowerCase();
  return prisma.badWord
    .delete({ where: { groupId_word: { groupId, word: normalized } } })
    .catch(() => null);
}

/** Guruhning to'liq yomon so'zlar ro'yxatini qaytaradi */
export async function listBadWords(groupId) {
  return prisma.badWord.findMany({ where: { groupId }, orderBy: { createdAt: "desc" } });
}
