import prisma from "../database/prisma.js";

/** Guruhga a'zo kirgani/chiqqanini jurnalga yozadi */
export async function recordMemberEvent(groupId, userId, type) {
  await prisma.memberEvent.create({
    data: { groupId, userId: BigInt(userId), type },
  });
}

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

/**
 * Guruh bo'yicha 1 kun / 1 hafta / 1 oy ichida nechta odam kirgan va
 * nechtasi chiqib ketganini hisoblab qaytaradi.
 */
export async function getMemberEventStats(groupId) {
  const periods = { day: daysAgo(1), week: daysAgo(7), month: daysAgo(30) };

  const result = {};
  for (const [key, since] of Object.entries(periods)) {
    const [joins, leaves] = await Promise.all([
      prisma.memberEvent.count({ where: { groupId, type: "JOIN", createdAt: { gte: since } } }),
      prisma.memberEvent.count({ where: { groupId, type: "LEAVE", createdAt: { gte: since } } }),
    ]);
    result[key] = { joins, leaves };
  }

  return result;
}
