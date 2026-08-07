import prisma from "../database/prisma.js";

/**
 * Butun bot bo'yicha umumiy statistika: foydalanuvchilar, guruhlar
 * va barcha guruhlardagi moderatsiya harakatlari yig'indisi.
 */
export async function getGlobalStats() {
  const [totalUsers, activeUsers, totalGroups, activeGroups, sums] = await Promise.all([
    prisma.botUser.count(),
    prisma.botUser.count({ where: { isActive: true } }),
    prisma.group.count(),
    prisma.group.count({ where: { isActive: true } }),
    prisma.dailyStatistics.aggregate({
      _sum: {
        deletedMessages: true,
        warningsGiven: true,
        bansGiven: true,
        mutesGiven: true,
        spamDetected: true,
        reportsReceived: true,
        linksDeleted: true,
        filesDeleted: true,
      },
    }),
  ]);

  return {
    totalUsers,
    activeUsers,
    totalGroups,
    activeGroups,
    deletedMessages: sums._sum.deletedMessages ?? 0,
    warningsGiven: sums._sum.warningsGiven ?? 0,
    bansGiven: sums._sum.bansGiven ?? 0,
    mutesGiven: sums._sum.mutesGiven ?? 0,
    spamDetected: sums._sum.spamDetected ?? 0,
    reportsReceived: sums._sum.reportsReceived ?? 0,
    linksDeleted: sums._sum.linksDeleted ?? 0,
    filesDeleted: sums._sum.filesDeleted ?? 0,
  };
}
