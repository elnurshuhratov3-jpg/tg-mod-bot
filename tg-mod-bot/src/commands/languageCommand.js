import { InlineKeyboard } from "grammy";
import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import { getGroupLanguage, getBotUserLanguage } from "../services/languageService.js";
import { t, SUPPORTED_LANGUAGES } from "../i18n/index.js";

const LANGUAGE_FLAGS = { uz: "🇺🇿", ru: "🇷🇺", en: "🇬🇧" };

export function languageKeyboard(current, prefix = "lang:set:") {
  const kb = new InlineKeyboard();
  for (const code of SUPPORTED_LANGUAGES) {
    const label = `${LANGUAGE_FLAGS[code]} ${t(code, "language_name")}`;
    kb.text(current === code ? `✅ ${label}` : label, `${prefix}${code}`).row();
  }
  // "orqaga" tugmasi faqat /til menyusi (guruh/shaxsiy) uchun — bosilganda
  // /start xabariga qaytariladi (languageHandler.js dagi lang:*:back handlerlari)
  if (prefix === "lang:group:" || prefix === "lang:user:") {
    kb.text(t(current, "language_back"), `${prefix}back`);
  }
  return kb;
}

/**
 * /til — botning javob tilini tanlash. Guruhda faqat adminlar
 * o'zgartira oladi (bu butun guruh uchun umumiy sozlama);
 * shaxsiy chatda har kim o'zi uchun tanlaydi.
 */
export function languageCommand(bot) {
  bot.command("til", async (ctx) => {
    const isGroup = ctx.chat.type === "group" || ctx.chat.type === "supergroup";
    // Guruh/foydalanuvchi tili aniqlanmagunga qadar ishlatiladigan zaxira til
    const fallbackLang = ctx.lang || "uz";

    if (isGroup) {
      try {
        const admin = await isChatAdmin(ctx);
        if (!admin) {
          await ctx.reply(t(fallbackLang, "error_admin_only"));
          return;
        }
        const group = await getGroupByTelegramId(ctx.chat.id);
        
        if (!group) {
          await ctx.reply(t(fallbackLang, "error_group_not_found"));
          return;
        }
        
        const lang = await getGroupLanguage(group.telegramId);
        await ctx.reply(t(lang, "language_prompt"), {
          reply_markup: languageKeyboard(lang, "lang:group:"),
        });
      } catch (error) {
        console.error("Til komandasi xatosi (guruh):", error);
        try {
          await ctx.reply(t(fallbackLang, "error_unexpected_retry"));
        } catch {
          // Bot bu guruhda javob yoza olmayapti (masalan, chiqarib
          // yuborilgan) — qayta urinish shart emas.
        }
      }
      return;
    }

    // Shaxsiy chat
    try {
      const lang = await getBotUserLanguage(ctx.from.id);
      await ctx.reply(t(lang, "language_prompt"), {
        reply_markup: languageKeyboard(lang, "lang:user:"),
      });
    } catch (error) {
      console.error("Til komandasi xatosi (shaxsiy):", error);
      await ctx.reply(t(fallbackLang, "error_unexpected_retry"));
    }
  });
}