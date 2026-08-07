import { InlineKeyboard } from "grammy";
import { isOwner } from "../utils/isOwner.js";
import { listActiveGlobalChannels } from "../services/globalChannelService.js";
import { t } from "../i18n/index.js";

async function isMemberOfChannel(ctx, channel, userId) {
  try {
    const chatIdentifier = channel.channelUsername
      ? `@${channel.channelUsername}`
      : Number(channel.channelId);
    const member = await ctx.api.getChatMember(chatIdentifier, userId);
    return !["left", "kicked"].includes(member.status);
  } catch {
    // Bot kanalda admin bo'lmasa yoki kanal topilmasa — tekshirib bo'lmaydi,
    // bunday holda foydalanuvchini bloklamaymiz (yolg'on xatolikning oldini olish)
    return true;
  }
}

export function joinGlobalChannelsKeyboard(channels, lang = "uz") {
  const kb = new InlineKeyboard();
  for (const channel of channels) {
    const url = channel.inviteLink
      ? channel.inviteLink
      : channel.channelUsername
        ? `https://t.me/${channel.channelUsername}`
        : null;
    if (url) {
      kb.url(`📢 ${channel.channelTitle || channel.channelUsername || t(lang, "default_channel_name")}`, url).row();
    }
  }
  kb.text(t(lang, "join_channel_btn"), "gchannels:check");
  return kb;
}

export async function getNotJoinedGlobalChannels(ctx, userId) {
  const channels = await listActiveGlobalChannels();
  if (channels.length === 0) return [];

  const notJoined = [];
  for (const channel of channels) {
    const joined = await isMemberOfChannel(ctx, channel, userId);
    if (!joined) notJoined.push(channel);
  }
  return notJoined;
}

/**
 * Botdan shaxsiy chatda foydalanish uchun bot egasi belgilagan
 * kanallarga a'zolikni talab qiladi (bot egasi bundan mustasno).
 */
export async function globalChannelGate(ctx, next) {
  const chat = ctx.chat;
  const message = ctx.message;

  if (!chat || chat.type !== "private" || !message) return next();
  if (isOwner(ctx)) return next();

  const userId = ctx.from?.id;
  if (!userId) return next();

  const notJoined = await getNotJoinedGlobalChannels(ctx, userId);
  if (notJoined.length === 0) return next();

  const lang = ctx.lang || "uz";
  await ctx.reply(
    t(lang, "private_join_channels_prompt"),
    { reply_markup: joinGlobalChannelsKeyboard(notJoined, lang) },
  );
}
