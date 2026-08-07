import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import { getRuleText, setRuleText } from "../services/ruleService.js";
import { t } from "../i18n/index.js";

/** /qoidalar — hammaga ochiq, guruh qoidalarini ko'rsatadi */
export function rulesCommand(bot) {
  bot.command("qoidalar", async (ctx) => {
    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
      await ctx.reply(t(ctx.lang || "uz", "error_group_only"));
      return;
    }

    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group.language || "uz";
    const rules = await getRuleText(group.id);

    if (!rules) {
      await ctx.reply(t(lang, "rules_no_rules"), { parse_mode: "Markdown" });
      return;
    }

    const title = t(lang, "rules_title");
    await ctx.reply(`${title}${rules}`, { parse_mode: "Markdown" });
  });
}

/** /qoidalarni_ornatish <matn> — faqat adminlar, qoidalarni yangilaydi */
export function setRulesCommand(bot) {
  bot.command("qoidalarni_ornatish", async (ctx) => {
    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
      await ctx.reply(t(ctx.lang || "uz", "error_group_only"));
      return;
    }

    const admin = await isChatAdmin(ctx);
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group.language || "uz";

    if (!admin) {
      await ctx.reply(t(lang, "error_admin_only"));
      return;
    }

    const content = ctx.message.text.split(/\s+/).slice(1).join(" ").trim();
    if (!content) {
      await ctx.reply(t(lang, "rules_no_rules"), {
        parse_mode: "Markdown",
      });
      return;
    }

    await setRuleText(group.id, content);

    await ctx.reply(t(lang, "rules_set_success"));
  });
}
