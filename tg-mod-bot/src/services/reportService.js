import prisma from "../database/prisma.js";
import { bumpDailyStat } from "./moderationService.js";

/**
 * Yangi shikoyat yaratishga urinadi.
 * Bitta foydalanuvchi boshqasidan faqat bir marta shikoyat qila oladi —
 * takroriy shikoyat rad etiladi (duplicate: true qaytadi).
 */
export async function createReport(group, reporterId, reportedUserId, messageId) {
  const existing = await prisma.report.findUnique({
    where: {
      groupId_reporterId_reportedUserId: {
        groupId: group.id,
        reporterId: BigInt(reporterId),
        reportedUserId: BigInt(reportedUserId),
      },
    },
  });

  if (existing) {
    return { duplicate: true };
  }

  await prisma.report.create({
    data: {
      groupId: group.id,
      reporterId: BigInt(reporterId),
      reportedUserId: BigInt(reportedUserId),
      messageId: messageId ? BigInt(messageId) : null,
    },
  });

  await bumpDailyStat(group.id, "reportsReceived");

  const totalReports = await prisma.report.count({
    where: { groupId: group.id, reportedUserId: BigInt(reportedUserId), status: "PENDING" },
  });

  const limit = group.reportSettings?.limit ?? 10;

  return { duplicate: false, totalReports, limit, limitReached: totalReports >= limit };
}

/** Foydalanuvchiga qarshi barcha PENDING shikoyatlarni CONFIRMED/REJECTED holatiga o'tkazadi */
export async function resolveReports(groupId, reportedUserId, status) {
  await prisma.report.updateMany({
    where: { groupId, reportedUserId: BigInt(reportedUserId), status: "PENDING" },
    data: { status },
  });
}

/** Guruh bo'yicha kutilayotgan (PENDING) shikoyatlar sonini qaytaradi */
export async function countPendingReports(groupId) {
  return prisma.report.count({ where: { groupId, status: "PENDING" } });
}
