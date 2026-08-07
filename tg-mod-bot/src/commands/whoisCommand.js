import { getTargetUser } from "../utils/targetUser.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import { getUserProfile } from "../services/whoisService.js";
import { t } from "../i18n/index.js";

const DATE_LOCALES = { uz: "uz-UZ", ru: "ru-RU", en: "en-US" };

function formatDate(date, lang) {
  if (!date) return t(lang, "whois_unknown_date");
  return new Intl.DateTimeFormat(DATE_LOCALES[lang] || "uz-UZ", { dateStyle: "medium" }).format(date);
}

/** /kim — foydalanuvchi xabariga javob berib, uning moderatsiya profilini ko'rsatadi */
export function whoisCommand(bot) {
  bot.command("kim", async (ctx) => {
    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
      await ctx.reply(t("uz", "error_group_only"));
      return;
    }

    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";

    const target = getTargetUser(ctx);
    if (!target) {
      await ctx.reply(t(lang, "whois_reply_required"), { parse_mode: "Markdown" });
      return;
    }

    const profile = await getUserProfile(group.id, target.id);

    const statusParts = [];
    if (profile.isBanned) statusParts.push(t(lang, "whois_status_banned"));
    if (profile.isMuted) statusParts.push(t(lang, "whois_status_muted"));
    if (statusParts.length === 0) statusParts.push(t(lang, "whois_status_normal"));

    const title = t(lang, "whois_profile_title").replace(
      "{user}",
      `[${t(lang, "whois_title").replace("👤 *", "").replace("*", "")}](tg://user?id=${target.id})`,
    );
    const statusLine = t(lang, "whois_status_label").replace("{status}", statusParts.join(", "));
    const warningsLine = t(lang, "whois_warnings_line").replace("{count}", profile.warningsCount);
    const deletedLine = t(lang, "whois_deleted_line").replace("{count}", profile.deletedMessagesCount);
    const joinedLine = t(lang, "whois_joined_line").replace(
      "{date}",
      formatDate(profile.firstJoinedAt, lang),
    );

    await ctx.reply(
      `${title}\n\n${statusLine}\n${warningsLine}\n${deletedLine}\n${joinedLine}`,
      { parse_mode: "Markdown" },
    );
  });
}
