import { isChatAdmin } from "../utils/permissions.js";
import { mainSettingsKeyboard } from "../keyboards/settingsKeyboard.js";
import { t } from "../i18n/index.js";
import { getGroupLanguage } from "../services/languageService.js";

export function settingsCommand(bot) {
  bot.command("sozlamalar", async (ctx) => {
    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
      await ctx.reply(t("uz", "settings_only_groups"));
      return;
    }

    const admin = await isChatAdmin(ctx);
    if (!admin) {
      const lang = await getGroupLanguage(ctx.chat.id);
      await ctx.reply(t(lang, "settings_admin_only"));
      return;
    }

    const lang = await getGroupLanguage(ctx.chat.id);
    await ctx.reply(t(lang, "settings_title"), {
      parse_mode: "Markdown",
      reply_markup: mainSettingsKeyboard(lang),
    });
  });
}
