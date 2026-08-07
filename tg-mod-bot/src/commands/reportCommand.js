import { InlineKeyboard } from "grammy";
import { getGroupWithSettings } from "../services/groupService.js";
import { createReport } from "../services/reportService.js";
import { t } from "../i18n/index.js";

/** /hisobot — xabarga javob berib, o'sha xabar egasidan shikoyat qilish */
export function reportCommand(bot) {
  bot.command("hisobot", async (ctx) => {
    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
      await ctx.reply(t(ctx.lang || "uz", "error_group_only"));
      return;
    }

    const group = await getGroupWithSettings(ctx.chat.id);
    const lang = group?.language || "uz";
    
    const reply = ctx.message.reply_to_message;
    if (!reply?.from) {
      await ctx.reply(t(lang, "report_no_reply"), {
        parse_mode: "Markdown",
      });
      return;
    }

    if (reply.from.id === ctx.from.id) {
      await ctx.reply(t(lang, "report_self"));
      return;
    }

    try {
      const targetMember = await ctx.getChatMember(reply.from.id);
      if (targetMember.status === "administrator" || targetMember.status === "creator") {
        await ctx.reply(t(lang, "report_admin_cannot_report"));
        return;
      }
    } catch {
      // Tekshirib bo'lmasa, davom etamiz
    }

    if (!group) {
      await ctx.reply(t(lang, "error_group_not_found"));
      return;
    }

    const result = await createReport(group, ctx.from.id, reply.from.id, reply.message_id);

    if (result.duplicate) {
      await ctx.reply(t(lang, "report_no_reply"));
      return;
    }

    await ctx.reply(t(lang, "report_success"));

    if (result.limitReached) {
      const reportedName =
        reply.from.first_name || reply.from.username || String(reply.from.id);

      const kb = new InlineKeyboard()
        .text(t(lang, "report_confirm_btn"), `report:confirm:${reply.from.id}`)
        .text(t(lang, "report_reject_btn"), `report:reject:${reply.from.id}`);

      const message = t(lang, "report_message")
        .replace("{group}", ctx.chat.title || t(lang, "default_group_name"))
        .replace("{username}", reply.from.username || reportedName)
        .replace("{reason}", t(lang, "reason_reports_limit"));

      await ctx.reply(
        `🚨 ${message}`,
        { parse_mode: "Markdown", reply_markup: kb },
      );
    }
  });
}
