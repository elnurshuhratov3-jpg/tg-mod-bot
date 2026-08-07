import { InlineKeyboard } from "grammy";
import { t } from "../i18n/index.js";

// Xavfsizlik uchun: faqat shu ro'yxatdagi maydonlarni o'zgartirishga ruxsat
// beriladi (callback orqali kelgan har qanday maydon nomi emas).
export const TOGGLEABLE_FILTER_FIELDS = {
  linkFilter: "link_filter",
  badWordsFilter: "badwords_filter",
  apkFilter: "apk_filter",
  zipFilter: "zip_filter",
  exeFilter: "exe_filter",
  rarFilter: "rar_filter",
  xapkFilter: "xapk_filter",
  apkmFilter: "apkm_filter",
  floodProtection: "flood_filter",
  antiSpam: "spam_filter",
  antiForward: "forward_filter",
  emojiSpamFilter: "emoji_filter",
  capsFilter: "caps_filter",
  adFilter: "ad_filter",
  stickerSpamFilter: "sticker_filter",
  duplicateSpamFilter: "duplicate_filter",
  captchaEnabled: "captcha_filter",
  antiRaidEnabled: "raid_filter",
  deleteServiceMessages: "service_messages_filter",
};

/** Joriy sozlamalar holatiga qarab moderatsiya klaviaturasini quradi */
export function moderationKeyboard(filterSettings, lang = "uz") {
  const kb = new InlineKeyboard();

  for (const [field, labelKey] of Object.entries(TOGGLEABLE_FILTER_FIELDS)) {
    const isOn = Boolean(filterSettings[field]);
    const icon = isOn ? "🟢" : "🔴";
    const label = t(lang, labelKey) || labelKey;
    kb.text(`${icon} ${label}`, `filter:toggle:${field}`).row();
  }

  kb.text(`⬅️ ${t(lang, "keyboard_back")}`, "settings:main");
  return kb;
}
