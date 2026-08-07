import prisma from "../database/prisma.js";
import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId, getGroupWithSettings } from "../services/groupService.js";
import { countPendingReports, resolveReports } from "../services/reportService.js";
import { addWarningAndMaybeBan } from "../services/moderationService.js";
import { reportsKeyboard, reportLimitOptionsKeyboard } from "../keyboards/reportsKeyboard.js";
import { t } from "../i18n/index.js";

async function requireAdminCallback(ctx, lang) {
  const admin = await isChatAdmin(ctx);
  if (!admin) {
    await ctx.answerCallbackQuery({ text: t(lang, "settings_admin_only"), show_alert: true });
    return false;
  }
  return true;
}

export function registerReportsHandlers(bot) {
  bot.callbackQuery("settings:reports", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    if (!(await requireAdminCallback(ctx, lang))) return;

    const settings = await prisma.reportSettings.findUnique({ where: { groupId: group.id } });
    const pending = await countPendingReports(group.id);

    await ctx.editMessageText(
      t(lang, "reports_title") +
        t(lang, "reports_limit_info")
          .replace("{limit}", settings?.limit ?? 10)
          .replace("{pending}", pending) +
        t(lang, "reports_footer_hint"),
      { parse_mode: "Markdown", reply_markup: reportsKeyboard(lang) },
    );
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("reports:setlimit", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    if (!(await requireAdminCallback(ctx, lang))) return;

    const settings = await prisma.reportSettings.findUnique({ where: { groupId: group.id } });

    await ctx.editMessageText(t(lang, "reports_set_limit_title"), {
      reply_markup: reportLimitOptionsKeyboard(settings?.limit ?? 10, lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/^reports:limit:(\d+)$/, async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    if (!(await requireAdminCallback(ctx, lang))) return;

    const limit = Number(ctx.match[1]);

    await prisma.reportSettings.update({ where: { groupId: group.id }, data: { limit } });

    await ctx.editMessageReplyMarkup({ reply_markup: reportLimitOptionsKeyboard(limit, lang) });
    await ctx.answerCallbackQuery({ text: t(lang, "reports_limit_set").replace("{limit}", limit) });
  });

  // Shikoyat limitiga yetganda chiqadigan tasdiqlash/bekor qilish tugmalari
  bot.callbackQuery(/^report:confirm:(\d+)$/, async (ctx) => {
    const group = await getGroupWithSettings(ctx.chat.id);
    const lang = group?.language || "uz";
    if (!(await requireAdminCallback(ctx, lang))) return;

    const targetUserId = BigInt(ctx.match[1]);

    const result = await addWarningAndMaybeBan(
      ctx,
      group,
      targetUserId,
      t(lang, "reason_reports_limit"),
      ctx.from.id,
    );
    await resolveReports(group.id, targetUserId, "CONFIRMED");

    const label = t(lang, "report_user_label");
    await ctx.editMessageText(
      result.banned
        ? t(lang, "report_ban_confirmed", { label, userId: targetUserId })
        : t(lang, "report_warn_confirmed", {
            label,
            userId: targetUserId,
            current: result.totalWarnings,
            max: result.maxWarnings,
          }),
      { parse_mode: "Markdown" },
    );
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/^report:reject:(\d+)$/, async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    if (!(await requireAdminCallback(ctx, lang))) return;

    const targetUserId = BigInt(ctx.match[1]);

    await resolveReports(group.id, targetUserId, "REJECTED");

    await ctx.editMessageText(t(lang, "reports_no_pending"));
    await ctx.answerCallbackQuery();
  });
}
