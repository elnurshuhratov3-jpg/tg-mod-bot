import prisma from "../database/prisma.js";
import { isChatAdmin } from "../utils/permissions.js";
import { getGroupWithSettings, getGroupByTelegramId } from "../services/groupService.js";
import { mainSettingsKeyboard } from "../keyboards/settingsKeyboard.js";
import { moderationKeyboard, TOGGLEABLE_FILTER_FIELDS } from "../keyboards/moderationKeyboard.js";
import { t } from "../i18n/index.js";

/** Tugma bosgan foydalanuvchi admin ekanligini tekshiradi */
async function requireAdminCallback(ctx, lang = "uz") {
  const admin = await isChatAdmin(ctx);
  if (!admin) {
    await ctx.answerCallbackQuery({ text: t(lang, "settings_admin_only"), show_alert: true });
    return false;
  }
  return true;
}

export function registerSettingsHandlers(bot) {
  // Asosiy menyuga qaytish
  bot.callbackQuery("settings:main", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    
    if (!(await requireAdminCallback(ctx, lang))) return;

    await ctx.editMessageText(t(lang, "settings_title"), {
      parse_mode: "Markdown",
      reply_markup: mainSettingsKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });

  // Moderatsiya bo'limi
  bot.callbackQuery("settings:moderation", async (ctx) => {
    const group = await getGroupWithSettings(ctx.chat.id);
    const lang = group?.language || "uz";
    
    if (!(await requireAdminCallback(ctx, lang))) return;

    if (!group?.filterSettings) {
      await ctx.answerCallbackQuery({ text: t(lang, "settings_error_not_found"), show_alert: true });
      return;
    }

    await ctx.editMessageText(t(lang, "settings_moderation_title"), {
      parse_mode: "Markdown",
      reply_markup: moderationKeyboard(group.filterSettings, lang),
    });
    await ctx.answerCallbackQuery();
  });

  // Har qanday filtrni ON/OFF qilish
  bot.callbackQuery(/^filter:toggle:(.+)$/, async (ctx) => {
    const group = await getGroupWithSettings(ctx.chat.id);
    const lang = group?.language || "uz";
    
    if (!(await requireAdminCallback(ctx, lang))) return;

    const field = ctx.match[1];
    if (!(field in TOGGLEABLE_FILTER_FIELDS)) {
      await ctx.answerCallbackQuery({ text: t(lang, "settings_filter_unknown"), show_alert: true });
      return;
    }

    if (!group?.filterSettings) {
      await ctx.answerCallbackQuery({ text: t(lang, "settings_error_not_found"), show_alert: true });
      return;
    }

    const currentValue = Boolean(group.filterSettings[field]);
    const updatedSettings = await prisma.filterSettings.update({
      where: { groupId: group.id },
      data: { [field]: !currentValue },
    });

    await ctx.editMessageReplyMarkup({ reply_markup: moderationKeyboard(updatedSettings, lang) });
    await ctx.answerCallbackQuery({ text: !currentValue ? t(lang, "settings_toggle_on") : t(lang, "settings_toggle_off") });
  });

  // Menyuni yopish
  bot.callbackQuery("settings:close", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    
    if (!(await requireAdminCallback(ctx, lang))) return;
    await ctx.deleteMessage().catch(() => {});
    await ctx.answerCallbackQuery();
  });
}
