import { getGroupByTelegramId } from "../services/groupService.js";
import { getMemberEventStats } from "../services/memberEventService.js";
import { t } from "../i18n/index.js";

const PERIOD_KEYS = {
  day: "members_period_day",
  week: "members_period_week",
  month: "members_period_month",
};

/** /azolar — hammaga ochiq, 1 kun/hafta/oy ichida nechta odam kirib-chiqqanini ko'rsatadi */
export function memberStatsCommand(bot) {
  bot.command("azolar", async (ctx) => {
    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
      await ctx.reply(t("uz", "error_group_only"));
      return;
    }

    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    const stats = await getMemberEventStats(group.id);

    const lines = Object.entries(PERIOD_KEYS).map(([key, labelKey]) =>
      t(lang, "members_stats_line")
        .replace("{label}", t(lang, labelKey))
        .replace("{joins}", stats[key].joins)
        .replace("{leaves}", stats[key].leaves),
    );

    const title = t(lang, "members_stats_title");
    await ctx.reply(`${title}\n\n${lines.join("\n")}`, { parse_mode: "Markdown" });
  });
}
