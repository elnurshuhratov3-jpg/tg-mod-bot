import prisma from "../database/prisma.js";

function todayDateOnly() {
  const now = new Date();
  return new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()));
}

const EMPTY_STATS = {
  deletedMessages: 0,
  warningsGiven: 0,
  bansGiven: 0,
  mutesGiven: 0,
  spamDetected: 0,
  reportsReceived: 0,
  linksDeleted: 0,
  filesDeleted: 0,
};

/** Bugungi kunlik statistikani qaytaradi (yozuv bo'lmasa — nollar) */
export async function getTodayStats(groupId) {
  const date = todayDateOnly();
  const row = await prisma.dailyStatistics.findUnique({
    where: { groupId_date: { groupId, date } },
  });
  return row ? { ...EMPTY_STATS, ...row } : EMPTY_STATS;
}

/**
 * Eng ko'p qoidabuzarlik qilgan (xabari o'chirilgan) foydalanuvchilar —
 * "eng faol nazorat ostidagi" foydalanuvchilar ro'yxati.
 */
export async function getTopOffenders(groupId, take = 5) {
  return prisma.deletedMessageCounter.findMany({
    where: { groupId },
    orderBy: { count: "desc" },
    take,
  });
}

function daysAgo(days) {
  return new Date(Date.now() - days * 24 * 60 * 60 * 1000);
}

/** Berilgan davr (kunlar soni) bo'yicha kunlik statistikalarni jamlaydi */
export async function getAggregatedStats(groupId, days) {
  const since = daysAgo(days);
  const rows = await prisma.dailyStatistics.findMany({
    where: { groupId, date: { gte: since } },
  });

  return rows.reduce(
    (acc, row) => {
      for (const key of Object.keys(EMPTY_STATS)) {
        acc[key] += row[key] ?? 0;
      }
      return acc;
    },
    { ...EMPTY_STATS },
  );
}

/** Haftalik (7 kun) statistika */
export async function getWeeklyStats(groupId) {
  return getAggregatedStats(groupId, 7);
}

/** Oylik (30 kun) statistika */
export async function getMonthlyStats(groupId) {
  return getAggregatedStats(groupId, 30);
}

/**
 * Guruhda eng ko'p moderatsiya harakati (ban/mute/warning) bergan
 * adminlarni aniqlaydi — Warning/MutedUser/BannedUser'dagi `adminId`
 * maydonlariga asoslanadi.
 */
export async function getTopAdmins(groupId, take = 5) {
  const [warnings, mutes, bans] = await Promise.all([
    prisma.warning.groupBy({
      by: ["adminId"],
      where: { groupId, adminId: { not: null } },
      _count: { _all: true },
    }),
    prisma.mutedUser.groupBy({
      by: ["adminId"],
      where: { groupId, adminId: { not: null } },
      _count: { _all: true },
    }),
    prisma.bannedUser.groupBy({
      by: ["adminId"],
      where: { groupId, adminId: { not: null } },
      _count: { _all: true },
    }),
  ]);

  const totals = new Map();
  for (const group of [warnings, mutes, bans]) {
    for (const row of group) {
      const key = row.adminId.toString();
      totals.set(key, (totals.get(key) || 0) + row._count._all);
    }
  }

  return [...totals.entries()]
    .map(([adminId, actionsCount]) => ({ adminId, actionsCount }))
    .sort((a, b) => b.actionsCount - a.actionsCount)
    .slice(0, take);
}
