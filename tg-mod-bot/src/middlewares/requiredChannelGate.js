import { InlineKeyboard } from "grammy";
import { getGroupWithSettings } from "../services/groupService.js";
import { isChatAdmin } from "../utils/permissions.js";
import { listActiveChannels } from "../services/requiredChannelService.js";
import { t } from "../i18n/index.js";

// Bir foydalanuvchiga bir vaqtning o'zida bir nechta "obuna bo'ling" xabari
// yubormaslik uchun qisqa muddatli kesh (xotirada, RAM).
const recentlyPrompted = new Map();
const PROMPT_COOLDOWN_MS = 15_000;

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

function joinKeyboard(channels, lang = "uz") {
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
  kb.text(t(lang, "join_channel_btn"), "reqchannels:check");
  return kb;
}

/**
 * Guruhda "majburiy kanal" tekshiruvi yoqilgan bo'lsa, foydalanuvchi
 * kerakli kanallarga a'zo bo'lmaguncha xabar yozishiga ruxsat bermaydi.
 */
export async function requiredChannelGate(ctx, next) {
  const chat = ctx.chat;
  const message = ctx.message;

  if (!chat || !message || (chat.type !== "group" && chat.type !== "supergroup")) {
    return next();
  }

  const userId = ctx.from?.id;
  if (!userId) return next();

  const group = await getGroupWithSettings(chat.id);
  if (!group || !group.filterSettings?.requiredChannelsEnabled) {
    return next();
  }

  if (await isChatAdmin(ctx)) return next();

  const channels = await listActiveChannels(group.id);
  if (channels.length === 0) return next();

  const notJoined = [];
  for (const channel of channels) {
    const joined = await isMemberOfChannel(ctx, channel, userId);
    if (!joined) notJoined.push(channel);
  }

  if (notJoined.length === 0) return next();

  try {
    await ctx.deleteMessage();
  } catch {
    // O'chirish huquqi bo'lmasligi mumkin
  }

  const key = `${chat.id}:${userId}`;
  const now = Date.now();
  const lastPrompt = recentlyPrompted.get(key) || 0;

  if (now - lastPrompt > PROMPT_COOLDOWN_MS) {
    recentlyPrompted.set(key, now);
    const lang = group.language || "uz";
    const mention = `[${t(lang, "default_user_name")}](tg://user?id=${userId})`;
    try {
      await ctx.reply(
        t(lang, "group_join_channels_prompt", { mention }),
        { parse_mode: "Markdown", reply_markup: joinKeyboard(notJoined, lang) },
      );
    } catch {
      // Guruhda yozish cheklangan bo'lishi mumkin
    }
  }

  // Zanjirni to'xtatamiz — boshqa filtrlar ishlamaydi, chunki xabar allaqachon o'chirildi
}
