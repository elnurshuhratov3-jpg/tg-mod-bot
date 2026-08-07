import { getGroupByTelegramId } from "../services/groupService.js";
import { getTodayStats } from "../services/statsService.js";
import { formatStatsMessage } from "../utils/formatStats.js";
import { t } from "../i18n/index.js";

/** /statistika — hammaga ochiq, bugungi statistikani ko'rsatadi */
export function statsCommand(bot) {
  bot.command("statistika", async (ctx) => {
    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
      await ctx.reply(t("uz", "error_group_only"));
      return;
    }

    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    const stats = await getTodayStats(group.id);

    await ctx.reply(formatStatsMessage(stats, lang), { parse_mode: "Markdown" });
  });
}
