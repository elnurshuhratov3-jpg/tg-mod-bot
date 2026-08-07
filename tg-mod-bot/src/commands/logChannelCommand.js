import prisma from "../database/prisma.js";
import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import { t } from "../i18n/index.js";

/**
 * /log_kanal @kanal — moderatsiya harakatlari (ban/mute/warn/o'chirilgan
 * xabar) yuboriladigan log-kanalni o'rnatadi. Bot o'sha kanalda admin
 * bo'lishi shart. `/log_kanal off` — log-kanalni o'chiradi.
 */
export function logChannelCommand(bot) {
  bot.command("log_kanal", async (ctx) => {
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

    const arg = ctx.message.text.split(/\s+/)[1];

    if (!arg) {
      await ctx.reply(t(lang, "log_channel_usage"), { parse_mode: "Markdown" });
      return;
    }

    if (arg.toLowerCase() === "off") {
      await prisma.filterSettings.update({
        where: { groupId: group.id },
        data: { logChannelId: null },
      });
      await ctx.reply(t(lang, "log_channel_removed"));
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

    await prisma.filterSettings.update({
      where: { groupId: group.id },
      data: { logChannelId: BigInt(chatInfo.id) },
    });

    await ctx.reply(t(lang, "log_channel_set", { title: chatInfo.title || "@" + username }));
  });
}
