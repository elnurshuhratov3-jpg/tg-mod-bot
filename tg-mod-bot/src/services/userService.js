import prisma from "../database/prisma.js";

/**
 * Foydalanuvchini bazaga yozadi (bot bilan shaxsiy chatni boshlagan
 * har bir kishi uchun). Broadcast va statistika shu jadvaldan foydalanadi.
 */
export async function upsertUser(from) {
  if (!from || from.is_bot) return null;

  return prisma.botUser.upsert({
    where: { telegramId: BigInt(from.id) },
    update: {
      username: from.username ?? null,
      firstName: from.first_name ?? null,
      isActive: true,
    },
    create: {
      telegramId: BigInt(from.id),
      username: from.username ?? null,
      firstName: from.first_name ?? null,
    },
  });
}

/** Botni bloklagan/foydalana olmaydigan foydalanuvchini faolsiz qiladi */
export async function deactivateUser(telegramId) {
  return prisma.botUser
    .update({
      where: { telegramId: BigInt(telegramId) },
      data: { isActive: false },
    })
    .catch(() => null);
}

/** Xabar yuborish mumkin bo'lgan barcha faol foydalanuvchilar ro'yxati */
export async function listActiveUsers() {
  return prisma.botUser.findMany({
    where: { isActive: true },
    select: { telegramId: true },
  });
}

/** Faol foydalanuvchilar soni */
export async function countActiveUsers() {
  return prisma.botUser.count({ where: { isActive: true } });
}

/** Umumiy (faol + nofaol) foydalanuvchilar soni */
export async function countAllUsers() {
  return prisma.botUser.count();
}
