import prisma from "../database/prisma.js";

/**
 * Guruhni bazada topadi, agar mavjud bo'lmasa yaratadi va
 * unga bog'liq barcha standart sozlamalarni (filtr, ogohlantirish,
 * spam, shikoyat, qoidalar) avtomatik ulaydi.
 *
 * Bu funksiya bot guruhga qo'shilganda, va zaruratdan kelib chiqib
 * (guruh hali bazada bo'lmasa) har qanday xabar kelganda chaqiriladi.
 */
export async function upsertGroup(chat) {
  const group = await prisma.group.upsert({
    where: { telegramId: BigInt(chat.id) },
    update: {
      title: chat.title ?? undefined,
      username: chat.username ?? undefined,
      isActive: true,
    },
    create: {
      telegramId: BigInt(chat.id),
      title: chat.title ?? null,
      username: chat.username ?? null,
    },
  });

  // Standart sozlamalarni yaratish (agar hali bo'lmasa)
  await Promise.all([
    prisma.filterSettings.upsert({
      where: { groupId: group.id },
      update: {},
      create: { groupId: group.id },
    }),
    prisma.warningSettings.upsert({
      where: { groupId: group.id },
      update: {},
      create: { groupId: group.id },
    }),
    prisma.spamSettings.upsert({
      where: { groupId: group.id },
      update: {},
      create: { groupId: group.id },
    }),
    prisma.reportSettings.upsert({
      where: { groupId: group.id },
      update: {},
      create: { groupId: group.id },
    }),
    prisma.rule.upsert({
      where: { groupId: group.id },
      update: {},
      create: { groupId: group.id, content: "Qoidalar hali o'rnatilmagan." },
    }),
  ]);

  return group;
}

/** Telegram chat ID orqali guruhni bazadan topadi */
export async function getGroupByTelegramId(telegramId) {
  return prisma.group.findUnique({
    where: { telegramId: BigInt(telegramId) },
  });
}

/**
 * Guruhni barcha sozlamalari (filtr, ogohlantirish, spam) bilan birga
 * qaytaradi. Filtrlar shu ma'lumot asosida ishlaydi.
 */
export async function getGroupWithSettings(telegramId) {
  return prisma.group.findUnique({
    where: { telegramId: BigInt(telegramId) },
    include: {
      filterSettings: true,
      warningSettings: true,
      spamSettings: true,
    },
  });
}

/** Bot guruhdan chiqarilganda/chetlashtirilganda guruhni faolsiz qiladi */
export async function deactivateGroup(telegramId) {
  return prisma.group
    .update({
      where: { telegramId: BigInt(telegramId) },
      data: { isActive: false },
    })
    .catch(() => null);
}
