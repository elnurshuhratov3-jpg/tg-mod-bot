import { getGroupWithSettings } from "../services/groupService.js";
import { isChatAdmin } from "../utils/permissions.js";
import { isWhitelisted } from "../services/whitelistService.js";
import { isBlacklisted } from "../services/blacklistService.js";
import { containsLink } from "./linkFilter.js";
import { isBlockedFile } from "./fileFilter.js";
import { containsBadWord } from "./badWordsFilter.js";
import { isExcessiveCaps } from "./capsFilter.js";
import { hasTooManyEmojis } from "./emojiFilter.js";
import { isFlooding } from "./floodFilter.js";
import { isForwardedMessage } from "./forwardFilter.js";
import { isAdvertisement } from "./adFilter.js";
import { isStickerOrGif, isStickerSpam } from "./stickerSpamFilter.js";
import { isDuplicateSpam } from "./duplicateSpamFilter.js";
import { isTooFastForSlowMode } from "./slowModeFilter.js";
import {
  incrementDeletedCounter,
  addWarningAndMaybeBan,
  bumpDailyStat,
  banUser,
} from "../services/moderationService.js";
import { sendModerationLog } from "../services/logService.js";
import { t } from "../i18n/index.js";

/**
 * Har bir guruh xabarini barcha faol filtrlardan o'tkazadi.
 * Qoidabuzarlik topilsa: xabar o'chiriladi, statistika yangilanadi,
 * foydalanuvchiga ogohlantirish beriladi (limitga yetsa — ban).
 */
export async function moderationFilters(ctx, next) {
  const chat = ctx.chat;
  const message = ctx.message;

  if (!chat || !message || (chat.type !== "group" && chat.type !== "supergroup")) {
    return next();
  }

  // Buyruqlarni (/yordam, /qoidalar va h.k.) filtrlamaymiz
  if (message.text?.startsWith("/")) {
    return next();
  }

  // Guruhga bog'langan kanaldan avtomatik tushayotgan post — Telegram
  // buni forward sifatida yuboradi va `is_automatic_forward: true` hamda
  // `sender_chat` (kanalning o'zi) bilan belgilaydi. Bu maxsus, soxta
  // qilib bo'lmaydigan belgi — shuning uchun foydalanuvchi ID'siga (masalan,
  // 777000 kabi umumiy "xizmat" ID'siga) suyanish shart emas: aynan shu
  // ikki maydonni tekshirish yetarli va ancha aniqroq.
  if (message.is_automatic_forward && message.sender_chat) {
    return next();
  }

  const userId = ctx.from?.id;
  if (!userId) return next();

  const [admin, group] = await Promise.all([
    isChatAdmin(ctx),
    getGroupWithSettings(chat.id),
  ]);

  if (!group || !group.isActive || admin) {
    return next();
  }

  const lang = group.language || "uz";

  // Qora ro'yxatdagi foydalanuvchi guruhga yozishga urinsa — darhol bloklanadi
  if (await isBlacklisted(group.id, userId)) {
    try {
      await ctx.deleteMessage();
    } catch {
      // O'chirish huquqi bo'lmasligi mumkin
    }
    await banUser(ctx, group, userId, t(lang, "reason_blacklisted"));
    return;
  }

  const whitelisted = await isWhitelisted(group.id, userId);
  if (whitelisted) return next();

  const settings = group.filterSettings;
  if (!settings) return next();

  const text = message.text || message.caption || "";

  // 1) Fayl filtri
  if (message.document?.file_name && isBlockedFile(message.document.file_name, settings)) {
    return moderate(ctx, group, userId, lang, t(lang, "reason_blocked_file"), "filesDeleted");
  }

  // 2) Havola filtri
  if (settings.linkFilter && containsLink(text)) {
    return moderate(ctx, group, userId, lang, t(lang, "reason_link"), "linksDeleted");
  }

  // 3) Yomon so'zlar filtri
  if (settings.badWordsFilter) {
    const badWord = await containsBadWord(group.id, text);
    if (badWord) {
      return moderate(ctx, group, userId, lang, t(lang, "reason_badword"));
    }
  }

  // 4) CAPS (bosh harflar) filtri
  if (settings.capsFilter && isExcessiveCaps(text, settings.capsPercentLimit)) {
    return moderate(ctx, group, userId, lang, t(lang, "reason_caps"));
  }

  // 5) Emoji spami
  if (settings.emojiSpamFilter && hasTooManyEmojis(text, settings.emojiLimit)) {
    return moderate(ctx, group, userId, lang, t(lang, "reason_emoji"));
  }

  // 6) Forward (boshqa joydan ko'chirilgan xabar) himoyasi
  if (settings.antiForward && isForwardedMessage(message)) {
    return moderate(ctx, group, userId, lang, t(lang, "reason_forward"));
  }

  // 7) Reklama filtri
  if (settings.adFilter && isAdvertisement(text)) {
    return moderate(ctx, group, userId, lang, t(lang, "reason_ad"));
  }

  // 8) Sticker/GIF spami
  if (settings.stickerSpamFilter && isStickerOrGif(message) && isStickerSpam(group.id, userId)) {
    return moderate(ctx, group, userId, lang, t(lang, "reason_sticker_spam"), "spamDetected");
  }

  // 9) Bir xil xabarni takroran yuborish (duplicate spam)
  if (settings.duplicateSpamFilter && text && isDuplicateSpam(group.id, userId, text)) {
    return moderate(ctx, group, userId, lang, t(lang, "reason_duplicate"), "spamDetected");
  }

  // 10) Slow mode (xabarlar orasidagi minimal oraliq)
  if (settings.slowModeSeconds > 0 && isTooFastForSlowMode(group.id, userId, settings.slowModeSeconds)) {
    return moderate(
      ctx,
      group,
      userId,
      lang,
      t(lang, "reason_slowmode", { seconds: settings.slowModeSeconds }),
    );
  }

  // 11) Flood/Spam himoyasi
  if (settings.floodProtection || settings.antiSpam) {
    const spamSettings = group.spamSettings;
    const limit = spamSettings?.messageLimit ?? 5;
    const windowSec = spamSettings?.timeWindowSeconds ?? 10;

    if (isFlooding(group.id, userId, limit, windowSec)) {
      return moderate(ctx, group, userId, lang, t(lang, "reason_flood"), "spamDetected");
    }
  }

  return next();
}

async function moderate(ctx, group, userId, lang, reason, statField) {
  try {
    await ctx.deleteMessage();
  } catch {
    // Xabarni o'chirish huquqi yetarli bo'lmasligi mumkin
  }

  await incrementDeletedCounter(group.id, userId, reason);
  await bumpDailyStat(group.id, "deletedMessages");
  if (statField) await bumpDailyStat(group.id, statField);
  await sendModerationLog(ctx, group, t(lang, "log_message_deleted", { userId, reason }));

  const result = await addWarningAndMaybeBan(ctx, group, userId, reason);
  const mention = `[${t(lang, "moderation_mention_user")}](tg://user?id=${userId})`;

  try {
    if (result.banned) {
      await ctx.reply(t(lang, "moderation_banned", { mention, reason }), { parse_mode: "Markdown" });
    } else {
      await ctx.reply(
        t(lang, "moderation_warned", {
          mention,
          reason,
          current: result.totalWarnings,
          max: result.maxWarnings,
        }),
        { parse_mode: "Markdown" },
      );
    }
  } catch {
    // Guruhda yozish cheklangan bo'lishi mumkin
  }
}
