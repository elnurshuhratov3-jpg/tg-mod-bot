import prisma from "../database/prisma.js";

/**
 * Matnda shu guruh uchun taqiqlangan (yomon) so'z bor-yo'qligini
 * tekshiradi. Topilsa, o'sha so'zni qaytaradi, aks holda null.
 */
export async function containsBadWord(groupId, text) {
  if (!text) return null;

  const badWords = await prisma.badWord.findMany({ where: { groupId } });
  if (badWords.length === 0) return null;

  const lowerText = text.toLowerCase();
  const found = badWords.find((bw) => lowerText.includes(bw.word.toLowerCase()));

  return found ? found.word : null;
}
