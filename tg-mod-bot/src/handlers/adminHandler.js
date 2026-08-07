import { isOwner } from "../utils/isOwner.js";
import { t } from "../i18n/index.js";
import {
  adminMainKeyboard,
  adminStatsKeyboard,
  adminBroadcastCancelKeyboard,
  adminChannelsKeyboard,
  adminChannelListKeyboard,
  adminChannelAddCancelKeyboard,
} from "../keyboards/adminKeyboard.js";
import { getGlobalStats } from "../services/botStatsService.js";
import { broadcastToUsers, broadcastToGroups } from "../services/broadcastService.js";
import {
  listAllGlobalChannels,
  addGlobalChannel,
  removeGlobalChannel,
} from "../services/globalChannelService.js";
import {
  ADMIN_ACTIONS,
  setPendingAction,
  getPendingAction,
  clearPendingAction,
} from "../state/adminState.js";

function adminMenuText(lang) {
  return t(lang, "admin_title") + "\n\n" + t(lang, "admin_choose_section");
}

function formatGlobalStats(lang, stats) {
  return (
    `${t(lang, "admin_stats_title")}\n\n` +
    `👤 ${t(lang, "keyboard_users_list")}: *${stats.totalUsers}*\n` +
    `✅ ${stats.activeUsers}\n` +
    `👥 ${stats.totalGroups}\n` +
    `🟢 ${stats.activeGroups}\n\n` +
    `🗑 ${stats.deletedMessages}\n` +
    `⚠️ ${stats.warningsGiven}\n` +
    `🚫 ${stats.bansGiven}\n` +
    `🔇 ${stats.mutesGiven}\n` +
    `🕵️ ${stats.spamDetected}\n` +
    `🚨 ${stats.reportsReceived}`
  );
}

function channelListText(lang, channels) {
  if (channels.length === 0) {
    return t(lang, "admin_channel_list_title", { list: t(lang, "admin_channels_empty") });
  }
  const lines = channels.map((c, i) => {
    const status = c.isActive ? "🟢" : "🔴";
    return `${i + 1}. ${status} ${c.channelTitle || "@" + c.channelUsername || c.channelId}`;
  });
  return t(lang, "admin_channel_list_title", { list: lines.join("\n") });
}

export function registerAdminHandlers(bot) {
  // ---- Bosh menyu ----
  bot.callbackQuery("admin:main", async (ctx) => {
    if (!isOwner(ctx)) return ctx.answerCallbackQuery();
    const lang = ctx.lang || "uz";
    clearPendingAction(ctx.from.id);
    await ctx.editMessageText(adminMenuText(lang), {
      parse_mode: "Markdown",
      reply_markup: adminMainKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("admin:close", async (ctx) => {
    if (!isOwner(ctx)) return ctx.answerCallbackQuery();
    const lang = ctx.lang || "uz";
    clearPendingAction(ctx.from.id);
    try {
      await ctx.deleteMessage();
    } catch {
      await ctx.editMessageText(t(lang, "admin_menu_closed"));
    }
    await ctx.answerCallbackQuery();
  });

  // ---- Statistika ----
  bot.callbackQuery("admin:stats", async (ctx) => {
    if (!isOwner(ctx)) return ctx.answerCallbackQuery();
    const lang = ctx.lang || "uz";
    const stats = await getGlobalStats();
    await ctx.editMessageText(formatGlobalStats(lang, stats), {
      parse_mode: "Markdown",
      reply_markup: adminStatsKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });

  // ---- Xabar yuborish (broadcast) ----
  bot.callbackQuery("admin:broadcast_users", async (ctx) => {
    if (!isOwner(ctx)) return ctx.answerCallbackQuery();
    const lang = ctx.lang || "uz";
    setPendingAction(ctx.from.id, ADMIN_ACTIONS.BROADCAST_USERS);
    await ctx.editMessageText(t(lang, "admin_broadcast_prompt_users"), {
      reply_markup: adminBroadcastCancelKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("admin:broadcast_groups", async (ctx) => {
    if (!isOwner(ctx)) return ctx.answerCallbackQuery();
    const lang = ctx.lang || "uz";
    setPendingAction(ctx.from.id, ADMIN_ACTIONS.BROADCAST_GROUPS);
    await ctx.editMessageText(t(lang, "admin_broadcast_prompt_groups"), {
      reply_markup: adminBroadcastCancelKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("admin:broadcast_cancel", async (ctx) => {
    if (!isOwner(ctx)) return ctx.answerCallbackQuery();
    const lang = ctx.lang || "uz";
    clearPendingAction(ctx.from.id);
    await ctx.editMessageText(adminMenuText(lang), {
      parse_mode: "Markdown",
      reply_markup: adminMainKeyboard(lang),
    });
    await ctx.answerCallbackQuery({ text: t(lang, "admin_broadcast_cancelled") });
  });

  // ---- Majburiy kanallar ----
  bot.callbackQuery("admin:channels", async (ctx) => {
    if (!isOwner(ctx)) return ctx.answerCallbackQuery();
    const lang = ctx.lang || "uz";
    clearPendingAction(ctx.from.id);
    await ctx.editMessageText(t(lang, "admin_channels_intro"), {
      parse_mode: "Markdown",
      reply_markup: adminChannelsKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("admin:channel_list", async (ctx) => {
    if (!isOwner(ctx)) return ctx.answerCallbackQuery();
    const lang = ctx.lang || "uz";
    const channels = await listAllGlobalChannels();
    await ctx.editMessageText(channelListText(lang, channels), {
      parse_mode: "Markdown",
      reply_markup: adminChannelListKeyboard(channels, lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/^admin:channel_remove:(.+)$/, async (ctx) => {
    if (!isOwner(ctx)) return ctx.answerCallbackQuery();
    const lang = ctx.lang || "uz";
    const recordId = ctx.match[1];
    await removeGlobalChannel(recordId);
    const channels = await listAllGlobalChannels();
    await ctx.editMessageText(channelListText(lang, channels), {
      parse_mode: "Markdown",
      reply_markup: adminChannelListKeyboard(channels, lang),
    });
    await ctx.answerCallbackQuery({ text: t(lang, "admin_channel_removed") });
  });

  bot.callbackQuery("admin:channel_add", async (ctx) => {
    if (!isOwner(ctx)) return ctx.answerCallbackQuery();
    const lang = ctx.lang || "uz";
    setPendingAction(ctx.from.id, ADMIN_ACTIONS.ADD_CHANNEL);
    await ctx.editMessageText(t(lang, "admin_channel_add_prompt"), {
      parse_mode: "Markdown",
      reply_markup: adminChannelAddCancelKeyboard(lang),
    });
    await ctx.answerCallbackQuery();
  });

  // ---- Bot egasining "kutilayotgan amal" uchun keyingi xabarini qayta ishlash ----
  bot.on("message", async (ctx, next) => {
    if (ctx.chat?.type !== "private" || !isOwner(ctx)) return next();

    const action = getPendingAction(ctx.from.id);
    if (!action) return next();

    const lang = ctx.lang || "uz";

    // Buyruqlarni (masalan /admin, /bekor_qilish) bu yerda ushlab qolmaymiz
    if (ctx.message.text?.startsWith("/")) return next();

    if (action === ADMIN_ACTIONS.ADD_CHANNEL) {
      const username = ctx.message.text?.trim().replace(/^@/, "");
      if (!username) {
        await ctx.reply(t(lang, "admin_channel_username_required"));
        return;
      }

      let chatInfo;
      try {
        chatInfo = await ctx.api.getChat(`@${username}`);
      } catch {
        await ctx.reply(t(lang, "admin_channel_not_found"));
        return;
      }

      await addGlobalChannel({
        id: chatInfo.id,
        username: chatInfo.username ?? username,
        title: chatInfo.title,
        inviteLink: chatInfo.invite_link ?? null,
      });

      clearPendingAction(ctx.from.id);
      await ctx.reply(t(lang, "admin_channel_added", { title: chatInfo.title || "@" + username }), {
        reply_markup: adminChannelsKeyboard(lang),
      });
      return;
    }

    if (action === ADMIN_ACTIONS.BROADCAST_USERS || action === ADMIN_ACTIONS.BROADCAST_GROUPS) {
      clearPendingAction(ctx.from.id);
      const statusMsg = await ctx.reply(t(lang, "admin_broadcast_sending"));

      const result =
        action === ADMIN_ACTIONS.BROADCAST_USERS
          ? await broadcastToUsers(ctx.api, ctx.chat.id, ctx.message.message_id)
          : await broadcastToGroups(ctx.api, ctx.chat.id, ctx.message.message_id);

      const target =
        action === ADMIN_ACTIONS.BROADCAST_USERS
          ? t(lang, "admin_broadcast_target_users")
          : t(lang, "admin_broadcast_target_groups");

      const successText = t(lang, "admin_broadcast_success")
        .replace("{target}", target)
        .replace("{sent}", result.sent)
        .replace("{failed}", result.failed);

      try {
        await ctx.api.editMessageText(ctx.chat.id, statusMsg.message_id, successText, {
          parse_mode: "Markdown",
        });
      } catch {
        await ctx.reply(successText);
      }
      return;
    }

    return next();
  });
}
