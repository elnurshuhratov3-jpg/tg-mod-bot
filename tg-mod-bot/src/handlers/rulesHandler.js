import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import { getRuleText } from "../services/ruleService.js";
import { rulesKeyboard } from "../keyboards/rulesKeyboard.js";
import { t } from "../i18n/index.js";

export function registerRulesHandlers(bot) {
  bot.callbackQuery("settings:rules", async (ctx) => {
    const lang = ctx.lang || "uz";
    const admin = await isChatAdmin(ctx);
    if (!admin) {
      await ctx.answerCallbackQuery({ text: t(lang, "error_admin_only"), show_alert: true });
      return;
    }

    const group = await getGroupByTelegramId(ctx.chat.id);
    const rules = await getRuleText(group.id);
    const ruleLang = group.language || "uz";

    await ctx.editMessageText(
      `📋 *${t(ruleLang, "rules_title")}*\n\n${rules}\n\n${t(ruleLang, "rules_change_instruction")}`,
      { parse_mode: "Markdown", reply_markup: rulesKeyboard(ruleLang) },
    );
    await ctx.answerCallbackQuery();
  });
}
