import prisma from "../database/prisma.js";
import { sendModerationLog } from "./logService.js";
import { formatDuration } from "../utils/duration.js";

function todayDateOnly() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

/** Kunlik statistikadagi bitta ustunni +1 (yoki berilgan miqdorga) oshiradi */
export async function bumpDailyStat(groupId, field, amount = 1) {
  const date = todayDateOnly();
  await prisma.dailyStatistics.upsert({
    where: { groupId_date: { groupId, date } },
    update: { [field]: { increment: amount } },
    create: { groupId, date, [field]: amount },
  });
}

/** Foydalanuvchining o'chirilgan xabarlar hisoblagichini oshiradi */
export async function incrementDeletedCounter(groupId, userId, reason) {
  await prisma.deletedMessageCounter.upsert({
    where: { groupId_userId: { groupId, userId: BigInt(userId) } },
    update: { count: { increment: 1 }, reason },
    create: { groupId, userId: BigInt(userId), count: 1, reason },
  });
}

/**
 * Foydalanuvchini guruhdan bloklaydi (ban).
 * `durationMs` berilsa — vaqtinchalik ban (Telegram `until_date` orqali,
 * muddat tugagach avtomatik blokdan chiqadi); berilmasa — doimiy ban.
 */
export async function banUser(ctx, group, userId, reason, durationMs = null, adminId = null) {
  const untilDate = durationMs ? Math.floor((Date.now() + durationMs) / 1000) : undefined;

  try {
    await ctx.banChatMember(userId, untilDate ? { until_date: untilDate } : undefined);
  } catch {
    // Bot yetarli huquqqa ega bo'lmasligi mumkin
  }

  const bannedUntil = durationMs ? new Date(Date.now() + durationMs) : null;
  const adminIdBig = adminId ? BigInt(adminId) : null;

  await prisma.bannedUser.upsert({
    where: { groupId_userId: { groupId: group.id, userId: BigInt(userId) } },
    update: { reason, bannedUntil, adminId: adminIdBig },
    create: { groupId: group.id, userId: BigInt(userId), reason, bannedUntil, adminId: adminIdBig },
  });

  await bumpDailyStat(group.id, "bansGiven");

  const durationText = durationMs ? ` (${formatDuration(durationMs)}ga)` : " (doimiy)";
  await sendModerationLog(
    ctx,
    group,
    `🚫 *Ban*${durationText}\nFoydalanuvchi: \`${userId}\`\nSabab: ${reason}`,
  );
}

/**
 * Foydalanuvchiga ogohlantirish beradi. Agar ogohlantirishlar soni
 * guruh sozlamasidagi limitga yetsa, avtomatik ban qiladi.
 */
export async function addWarningAndMaybeBan(ctx, group, userId, reason, adminId = null) {
  await prisma.warning.create({
    data: { groupId: group.id, userId: BigInt(userId), reason, adminId: adminId ? BigInt(adminId) : null },
  });

  const totalWarnings = await prisma.warning.count({
    where: { groupId: group.id, userId: BigInt(userId) },
  });

  const maxWarnings = group.warningSettings?.maxWarnings ?? 3;

  if (totalWarnings >= maxWarnings) {
    await banUser(ctx, group, userId, "Ogohlantirish limitidan oshdi", null, adminId);
    return { banned: true, totalWarnings, maxWarnings };
  }

  await bumpDailyStat(group.id, "warningsGiven");
  await sendModerationLog(
    ctx,
    group,
    `⚠️ *Ogohlantirish* (${totalWarnings}/${maxWarnings})\nFoydalanuvchi: \`${userId}\`\nSabab: ${reason}`,
  );
  return { banned: false, totalWarnings, maxWarnings };
}
