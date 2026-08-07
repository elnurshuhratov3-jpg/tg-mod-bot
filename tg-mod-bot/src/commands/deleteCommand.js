import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import { t } from "../i18n/index.js";

/** /ochirish — xabarga javob (reply) berib, o'sha xabarni o'chiradi */
export function deleteMessageCommand(bot) {
  bot.command("ochirish", async (ctx) => {
    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
      await ctx.reply(t("uz", "error_group_only"));
      return;
    }

    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";

    const admin = await isChatAdmin(ctx);
    if (!admin) {
      await ctx.reply(t(lang, "error_admin_only"));
      return;
    }

    const reply = ctx.message.reply_to_message;
    if (!reply) {
      await ctx.reply(t(lang, "delete_no_reply"), {
        parse_mode: "Markdown",
      });
      return;
    }

    try {
      await ctx.api.deleteMessage(ctx.chat.id, reply.message_id);
    } catch {
      await ctx.reply(t(lang, "delete_error"));
      return;
    }

    // /ochirish buyrug'ining o'zini ham o'chirib, guruhni toza saqlaymiz
    try {
      await ctx.deleteMessage();
    } catch {
      // O'chirish huquqi bo'lmasligi mumkin
    }
  });
}
