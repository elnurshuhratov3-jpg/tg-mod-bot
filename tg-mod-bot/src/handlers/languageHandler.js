import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import { setGroupLanguage, setBotUserLanguage, getBotUserLanguage } from "../services/languageService.js";
import { t, isSupportedLanguage } from "../i18n/index.js";
import { languageKeyboard } from "../commands/languageCommand.js";
import { buildGroupStartText, sendStartMenuText } from "../commands/startCommand.js";

export function registerLanguageHandlers(bot) {
  // ---- Guruh tili ----
  bot.callbackQuery(/^lang:group:(uz|ru|en)$/, async (ctx) => {
    const fallbackLang = ctx.lang || "uz";
    try {
      const lang = ctx.match[1];
      if (!isSupportedLanguage(lang)) {
        await ctx.answerCallbackQuery({ text: t(fallbackLang, "language_invalid"), show_alert: true });
        return;
      }

      const admin = await isChatAdmin(ctx);
      if (!admin) {
        await ctx.answerCallbackQuery({ text: t(lang, "error_admin_only"), show_alert: true });
        return;
      }

      const group = await getGroupByTelegramId(ctx.chat.id);
      if (!group) {
        await ctx.answerCallbackQuery({ text: t(lang, "error_group_not_found"), show_alert: true });
        return;
      }

      await setGroupLanguage(group.telegramId, lang);

      await ctx.editMessageText(t(lang, "language_set"), {
        reply_markup: languageKeyboard(lang, "lang:group:"),
      });
      await ctx.answerCallbackQuery();
    } catch (error) {
      console.error("Guruh tili handler xatosi:", error);
      await ctx.answerCallbackQuery({ text: t(fallbackLang, "error_unexpected"), show_alert: true });
    }
  });

  // ---- Shaxsiy chat tili ----
  bot.callbackQuery(/^lang:user:(uz|ru|en)$/, async (ctx) => {
    const fallbackLang = ctx.lang || "uz";
    try {
      const lang = ctx.match[1];
      if (!isSupportedLanguage(lang)) {
        await ctx.answerCallbackQuery({ text: t(fallbackLang, "language_invalid"), show_alert: true });
        return;
      }

      await setBotUserLanguage(ctx.from.id, lang);
      
      // Yangilanib saqlandi, confirm xabari
      const newLang = await getBotUserLanguage(ctx.from.id);

      await ctx.editMessageText(t(newLang, "language_set"), {
        reply_markup: languageKeyboard(newLang, "lang:user:"),
      });
      await ctx.answerCallbackQuery();
    } catch (error) {
      console.error("Shaxsiy chat tili handler xatosi:", error);
      await ctx.answerCallbackQuery({ text: t(fallbackLang, "error_unexpected"), show_alert: true });
    }
  });

  // ---- "Orqaga" — guruh /til menyusidan /start xabariga qaytish ----
  bot.callbackQuery(/^lang:group:back$/, async (ctx) => {
    const fallbackLang = ctx.lang || "uz";
    try {
      await ctx.editMessageText(await buildGroupStartText(ctx));
      await ctx.answerCallbackQuery();
    } catch (error) {
      console.error("Orqaga (guruh) handler xatosi:", error);
      await ctx.answerCallbackQuery({ text: t(fallbackLang, "error_unexpected"), show_alert: true });
    }
  });

  // ---- "Orqaga" — shaxsiy chat /til menyusidan /start xabariga qaytish ----
  bot.callbackQuery(/^lang:user:back$/, async (ctx) => {
    const fallbackLang = ctx.lang || "uz";
    try {
      const { text, options } = await sendStartMenuText(ctx);
      await ctx.editMessageText(text, options);
      await ctx.answerCallbackQuery();
    } catch (error) {
      console.error("Orqaga (shaxsiy) handler xatosi:", error);
      await ctx.answerCallbackQuery({ text: t(fallbackLang, "error_unexpected"), show_alert: true });
    }
  });
}
