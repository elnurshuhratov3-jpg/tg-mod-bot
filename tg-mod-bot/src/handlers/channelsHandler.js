import prisma from "../database/prisma.js";
import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import {
  listAllChannels,
  removeRequiredChannel,
  setRequiredChannelsEnabled,
} from "../services/requiredChannelService.js";
import { channelsKeyboard, channelListKeyboard } from "../keyboards/channelsKeyboard.js";
import { t } from "../i18n/index.js";

async function requireAdminCallback(ctx, lang = "uz") {
  const admin = await isChatAdmin(ctx);
  if (!admin) {
    await ctx.answerCallbackQuery({ text: t(lang, "settings_admin_only"), show_alert: true });
    return false;
  }
  return true;
}

export function registerChannelsHandlers(bot) {
  bot.callbackQuery("settings:channels", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    
    if (!(await requireAdminCallback(ctx, lang))) return;

    const settings = await prisma.filterSettings.findUnique({ where: { groupId: group.id } });
    const enabled = Boolean(settings?.requiredChannelsEnabled);

    const status = enabled ? t(lang, "keyboard_on") : t(lang, "keyboard_off");
    await ctx.editMessageText(t(lang, "channels_status_title", { status }), {
      parse_mode: "Markdown",
      reply_markup: channelsKeyboard(enabled, lang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("channels:enable", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    
    if (!(await requireAdminCallback(ctx, lang))) return;
    await setRequiredChannelsEnabled(group.id, true);
    await ctx.editMessageReplyMarkup({ reply_markup: channelsKeyboard(true, lang) });
    await ctx.answerCallbackQuery({ text: t(lang, "settings_toggle_on") });
  });

  bot.callbackQuery("channels:disable", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    
    if (!(await requireAdminCallback(ctx, lang))) return;
    await setRequiredChannelsEnabled(group.id, false);
    await ctx.editMessageReplyMarkup({ reply_markup: channelsKeyboard(false, lang) });
    await ctx.answerCallbackQuery({ text: t(lang, "settings_toggle_off") });
  });

  bot.callbackQuery("channels:add", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    
    if (!(await requireAdminCallback(ctx, lang))) return;
    await ctx.answerCallbackQuery({
      text: t(lang, "channels_add_hint"),
      show_alert: true,
    });
  });

  bot.callbackQuery("channels:list", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    
    if (!(await requireAdminCallback(ctx, lang))) return;

    const channels = await listAllChannels(group.id);

    if (channels.length === 0) {
      await ctx.editMessageText(t(lang, "channels_empty"), {
        reply_markup: channelListKeyboard([]),
      });
    } else {
      await ctx.editMessageText(t(lang, "channels_list_title"), {
        parse_mode: "Markdown",
        reply_markup: channelListKeyboard(channels),
      });
    }
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery(/^channels:remove:(.+)$/, async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    
    if (!(await requireAdminCallback(ctx, lang))) return;

    await removeRequiredChannel(group.id, ctx.match[1]);

    const channels = await listAllChannels(group.id);
    await ctx.editMessageReplyMarkup({ reply_markup: channelListKeyboard(channels) });
    await ctx.answerCallbackQuery({ text: t(lang, "channels_remove_success") });
  });

  // Foydalanuvchi "✅ A'zo bo'ldim" tugmasini bosganda — qayta tekshirish
  // (haqiqiy tekshiruv keyingi xabarida requiredChannelGate orqali amalga oshadi)
  bot.callbackQuery("reqchannels:check", async (ctx) => {
    const group = await getGroupByTelegramId(ctx.chat.id);
    const lang = group?.language || "uz";
    await ctx.answerCallbackQuery({
      text: t(lang, "channels_check_thanks"),
    });
    await ctx.deleteMessage().catch(() => {});
  });
}
