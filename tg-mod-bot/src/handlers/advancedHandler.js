import prisma from "../database/prisma.js";
import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId, getGroupWithSettings } from "../services/groupService.js";
import { listBadWords } from "../services/badWordService.js";
import { t } from "../i18n/index.js";
import {
  advancedKeyboard,
  warningLimitKeyboard,
  spamCountKeyboard,
  spamWindowKeyboard,
  emojiLimitKeyboard,
  capsLimitKeyboard,
  slowModeKeyboard,
  badWordsBackKeyboard,
} from "../keyboards/advancedKeyboard.js";

async function requireAdminCallback(ctx, lang = "uz") {
  const admin = await isChatAdmin(ctx);
  if (!admin) {
    await ctx.answerCallbackQuery({ text: t(lang, "settings_admin_only"), show_alert: true });
    return false;
  }
  return true;
}

export function registerAdvancedHandlers(bot) {
  bot.callbackQuery("settings:advanced", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    await ctx.editMessageText(t(lang, "advanced_title"), {
      parse_mode: "Markdown",
      reply_markup: advancedKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });

  // ---- Ogohlantirish soni ----
  bot.callbackQuery("advanced:warnings", async (ctx) => {
    const group = await getGroupWithSettings(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    await ctx.editMessageText(t(lang, "advanced_warns_title"), {
      reply_markup: warningLimitKeyboard(group.warningSettings?.maxWarnings ?? 3, lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/^advanced:warnings:(\d+)$/, async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    const maxWarnings = Number(ctx.match[1]);
    await prisma.warningSettings.update({ where: { groupId: group.id }, data: { maxWarnings } });
    await ctx.editMessageReplyMarkup({ reply_markup: warningLimitKeyboard(maxWarnings, lang) });
    await ctx.answerCallbackQuery({ text: t(lang, "advanced_warns_set", { value: maxWarnings }) });
  });

  // ---- Spam: xabarlar soni ----
  bot.callbackQuery("advanced:spamcount", async (ctx) => {
    const group = await getGroupWithSettings(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    await ctx.editMessageText(t(lang, "advanced_flood_title"), {
      reply_markup: spamCountKeyboard(group.spamSettings?.messageLimit ?? 5, lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/^advanced:spamcount:(\d+)$/, async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    const messageLimit = Number(ctx.match[1]);
    await prisma.spamSettings.update({ where: { groupId: group.id }, data: { messageLimit } });
    await ctx.editMessageReplyMarkup({ reply_markup: spamCountKeyboard(messageLimit, lang) });
    await ctx.answerCallbackQuery({ text: t(lang, "advanced_flood_set", { value: messageLimit }) });
  });

  // ---- Spam: vaqt oynasi ----
  bot.callbackQuery("advanced:spamwindow", async (ctx) => {
    const group = await getGroupWithSettings(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    await ctx.editMessageText(t(lang, "advanced_flood_time_title"), {
      reply_markup: spamWindowKeyboard(group.spamSettings?.timeWindowSeconds ?? 10, lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/^advanced:spamwindow:(\d+)$/, async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    const timeWindowSeconds = Number(ctx.match[1]);
    await prisma.spamSettings.update({ where: { groupId: group.id }, data: { timeWindowSeconds } });
    await ctx.editMessageReplyMarkup({ reply_markup: spamWindowKeyboard(timeWindowSeconds, lang) });
    await ctx.answerCallbackQuery({ text: t(lang, "advanced_flood_time_set", { value: timeWindowSeconds }) });
  });

  // ---- Emoji limiti ----
  bot.callbackQuery("advanced:emoji", async (ctx) => {
    const group = await getGroupWithSettings(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    await ctx.editMessageText(t(lang, "advanced_emoji_title"), {
      reply_markup: emojiLimitKeyboard(group.filterSettings?.emojiLimit ?? 5, lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/^advanced:emoji:(\d+)$/, async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    const emojiLimit = Number(ctx.match[1]);
    await prisma.filterSettings.update({ where: { groupId: group.id }, data: { emojiLimit } });
    await ctx.editMessageReplyMarkup({ reply_markup: emojiLimitKeyboard(emojiLimit, lang) });
    await ctx.answerCallbackQuery({ text: t(lang, "advanced_emoji_set", { value: emojiLimit }) });
  });

  // ---- CAPS foizi ----
  bot.callbackQuery("advanced:caps", async (ctx) => {
    const group = await getGroupWithSettings(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    await ctx.editMessageText(t(lang, "advanced_caps_title"), {
      reply_markup: capsLimitKeyboard(group.filterSettings?.capsPercentLimit ?? 70, lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/^advanced:caps:(\d+)$/, async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    const capsPercentLimit = Number(ctx.match[1]);
    await prisma.filterSettings.update({ where: { groupId: group.id }, data: { capsPercentLimit } });
    await ctx.editMessageReplyMarkup({ reply_markup: capsLimitKeyboard(capsPercentLimit, lang) });
    await ctx.answerCallbackQuery({ text: t(lang, "advanced_caps_set", { value: capsPercentLimit }) });
  });

  // ---- Slow mode ----
  bot.callbackQuery("advanced:slowmode", async (ctx) => {
    const group = await getGroupWithSettings(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    await ctx.editMessageText(t(lang, "advanced_slow_mode_title"), {
      reply_markup: slowModeKeyboard(group.filterSettings?.slowModeSeconds ?? 0, lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/^advanced:slowmode:(\d+)$/, async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    const slowModeSeconds = Number(ctx.match[1]);
    await prisma.filterSettings.update({ where: { groupId: group.id }, data: { slowModeSeconds } });
    await ctx.editMessageReplyMarkup({ reply_markup: slowModeKeyboard(slowModeSeconds, lang) });
    await ctx.answerCallbackQuery({
      text:
        slowModeSeconds > 0
          ? t(lang, "advanced_slow_mode_set", { value: slowModeSeconds })
          : t(lang, "settings_toggle_off"),
    });
  });

  // ---- Yomon so'zlar ro'yxati ----
  bot.callbackQuery("advanced:badwords", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";

    if (!(await requireAdminCallback(ctx, lang))) return;
    const words = await listBadWords(group.id);

    const list = words.length > 0 ? words.map((w) => `• ${w.word}`).join("\n") : t(lang, "list_empty");

    await ctx.editMessageText(
      t(lang, "advanced_badwords_list_title", { count: words.length, list }),
      { parse_mode: "Markdown", reply_markup: badWordsBackKeyboard(lang) },
    );
    await ctx.answerCallbackQuery();
  });
}
