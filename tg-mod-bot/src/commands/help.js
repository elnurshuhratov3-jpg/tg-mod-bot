import { isOwner } from "../utils/isOwner.js";
import { t } from "../i18n/index.js";
import { getGroupLanguage, getBotUserLanguage } from "../services/languageService.js";

export function helpCommand(bot) {
  bot.command("yordam", async (ctx) => {
    const isGroup = ctx.chat.type === "group" || ctx.chat.type === "supergroup";
    const lang = isGroup ? await getGroupLanguage(ctx.chat.id) : await getBotUserLanguage(ctx.from.id);

    const helpText =
      t(lang, "help_title") +
      t(lang, "help_public_commands") +
      t(lang, "help_start") +
      t(lang, "help_help") +
      (isOwner(ctx) ? t(lang, "help_admin") : "") +
      t(lang, "help_rules") +
      t(lang, "help_report") +
      t(lang, "help_stats") +
      t(lang, "help_members") +
      t(lang, "help_language") +
      t(lang, "help_user_management") +
      t(lang, "help_warn") +
      t(lang, "help_unwarn") +
      t(lang, "help_mute") +
      t(lang, "help_unmute") +
      t(lang, "help_ban") +
      t(lang, "help_unban") +
      t(lang, "help_kick") +
      t(lang, "help_whois") +
      t(lang, "help_delete") +
      t(lang, "help_lists") +
      t(lang, "help_whitelist_add") +
      t(lang, "help_whitelist_remove") +
      t(lang, "help_blacklist_add") +
      t(lang, "help_blacklist_remove") +
      t(lang, "help_badwords") +
      t(lang, "help_badword_add") +
      t(lang, "help_badword_remove") +
      t(lang, "help_channels") +
      t(lang, "help_set_rules") +
      t(lang, "help_add_channel") +
      t(lang, "help_log_channel") +
      t(lang, "help_advanced");

    await ctx.reply(helpText, {
      parse_mode: "Markdown",
    });
  });
}