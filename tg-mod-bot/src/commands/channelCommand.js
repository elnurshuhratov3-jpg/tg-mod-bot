import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import { addRequiredChannel } from "../services/requiredChannelService.js";
import { t } from "../i18n/index.js";

/**
 * /kanal_qoshish @kanal_username — majburiy obuna uchun kanal qo'shadi.
 * Bot o'sha kanalda administrator bo'lishi shart (a'zolikni tekshirish uchun).
 */
export function channelAddCommand(bot) {
  bot.command("kanal_qoshish", async (ctx) => {
    const lang = ctx.lang || "uz";

    if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
      await ctx.reply(t(lang, "error_group_only"));
      return;
    }

    const admin = await isChatAdmin(ctx);
    if (!admin) {
      await ctx.reply(t(lang, "error_admin_only"));
      return;
    }

    const arg = ctx.message.text.split(/\s+/)[1];
    if (!arg) {
      await ctx.reply(t(lang, "channel_add_usage"), { parse_mode: "Markdown" });
      return;
    }

    const username = arg.replace(/^@/, "");

    let chatInfo;
    try {
      chatInfo = await ctx.api.getChat(`@${username}`);
    } catch {
      await ctx.reply(t(lang, "channel_not_found"));
      return;
    }

    const group = await getGroupByTelegramId(ctx.chat.id);
    await addRequiredChannel(group.id, {
      id: chatInfo.id,
      username: chatInfo.username ?? username,
      title: chatInfo.title,
      inviteLink: chatInfo.invite_link ?? null,
    });

    await ctx.reply(t(lang, "channel_add_success").replace("{title}", chatInfo.title || "@" + username));
  });
}
