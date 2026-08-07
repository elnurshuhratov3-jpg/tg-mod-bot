import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import {
  getTodayStats,
  getWeeklyStats,
  getMonthlyStats,
  getTopAdmins,
} from "../services/statsService.js";
import { getMemberEventStats } from "../services/memberEventService.js";
import { statsKeyboard, statsBackKeyboard } from "../keyboards/statsKeyboard.js";
import { formatStatsMessage } from "../utils/formatStats.js";
import { t } from "../i18n/index.js";

async function requireAdminCallback(ctx, lang) {
  const admin = await isChatAdmin(ctx);
  if (!admin) {
    await ctx.answerCallbackQuery({ text: t(lang, "settings_admin_only"), show_alert: true });
    return false;
  }
  return true;
}

export function registerStatsHandlers(bot) {
  bot.callbackQuery("settings:stats", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    if (!(await requireAdminCallback(ctx, lang))) return;

    const stats = await getTodayStats(group.id);

    await ctx.editMessageText(formatStatsMessage(stats, lang), {
      parse_mode: "Markdown",
      reply_markup: statsKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("stats:weekly", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    if (!(await requireAdminCallback(ctx, lang))) return;

    const stats = await getWeeklyStats(group.id);

    await ctx.editMessageText(t(lang, "stats_weekly_title", { stats: formatStatsMessage(stats, lang) }), {
      parse_mode: "Markdown",
      reply_markup: statsBackKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("stats:monthly", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    if (!(await requireAdminCallback(ctx, lang))) return;

    const stats = await getMonthlyStats(group.id);

    await ctx.editMessageText(t(lang, "stats_monthly_title", { stats: formatStatsMessage(stats, lang) }), {
      parse_mode: "Markdown",
      reply_markup: statsBackKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("stats:members", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    if (!(await requireAdminCallback(ctx, lang))) return;

    const stats = await getMemberEventStats(group.id);

    await ctx.editMessageText(
      t(lang, "stats_members_title", {
        dayJoins: stats.day.joins,
        dayLeaves: stats.day.leaves,
        weekJoins: stats.week.joins,
        weekLeaves: stats.week.leaves,
        monthJoins: stats.month.joins,
        monthLeaves: stats.month.leaves,
      }),
      { parse_mode: "Markdown", reply_markup: statsBackKeyboard(lang) },
    );
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("stats:topadmins", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    if (!(await requireAdminCallback(ctx, lang))) return;

    const topAdmins = await getTopAdmins(group.id);

    const list =
      topAdmins.length === 0
        ? t(lang, "stats_no_admin_actions")
        : topAdmins
            .map((a, i) =>
              t(lang, "stats_top_admin_line", {
                rank: i + 1,
                adminId: a.adminId,
                count: a.actionsCount,
              }),
            )
            .join("\n");

    await ctx.editMessageText(t(lang, "stats_top_admins_title", { list }), {
      parse_mode: "Markdown",
      reply_markup: statsBackKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });
}
