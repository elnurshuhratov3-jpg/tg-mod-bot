import { InlineKeyboard } from "grammy";
import { t } from "../i18n/index.js";

/** "📢 Majburiy kanali" bo'limi menyusi */
export function channelsKeyboard(enabled, lang = "uz") {
  const kb = new InlineKeyboard();

  if (enabled) {
    kb.text(`🔴 ${t(lang, "settings_toggle_off")}`, "channels:disable").row();
  } else {
    kb.text(`🟢 ${t(lang, "settings_toggle_on")}`, "channels:enable").row();
  }

  return kb
    .text(`➕ ${t(lang, "keyboard_channels_list") || "Kanal qo'shish"}`, "channels:add")
    .row()
    .text(`📋 ${t(lang, "keyboard_channels_list") || "Kanal ro'yxati"}`, "channels:list")
    .row()
    .text(`⬅️ ${t(lang, "keyboard_back")}`, "settings:main");
}

/** Kanallar ro'yxatida har bir kanal uchun o'chirish tugmasi */
export function channelListKeyboard(channels, lang = "uz") {
  const kb = new InlineKeyboard();
  for (const channel of channels) {
    kb.text(
      `🗑 ${channel.channelTitle || channel.channelUsername || channel.channelId}`,
      `channels:remove:${channel.id}`,
    ).row();
  }
  kb.text(`⬅️ ${t(lang, "keyboard_back")}`, "settings:channels");
  return kb;
}
