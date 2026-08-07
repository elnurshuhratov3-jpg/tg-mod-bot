import { InlineKeyboard } from "grammy";
import { t } from "../i18n/index.js";

/** /admin — bosh menyu */
export function adminMainKeyboard(lang = "uz") {
  return new InlineKeyboard()
    .text(t(lang, "keyboard_stats"), "admin:stats")
    .row()
    .text(t(lang, "admin_btn_broadcast_users"), "admin:broadcast_users")
    .row()
    .text(t(lang, "admin_btn_broadcast_groups"), "admin:broadcast_groups")
    .row()
    .text(t(lang, "admin_btn_channels"), "admin:channels")
    .row()
    .text(t(lang, "keyboard_close"), "admin:close");
}

/** Statistika bo'limi */
export function adminStatsKeyboard(lang = "uz") {
  return new InlineKeyboard().text(t(lang, "keyboard_back"), "admin:main");
}

/** Xabar yuborish (broadcast) tasdiqlash oldidan bekor qilish tugmasi */
export function adminBroadcastCancelKeyboard(lang = "uz") {
  return new InlineKeyboard().text(t(lang, "admin_btn_cancel"), "admin:broadcast_cancel");
}

/** Majburiy kanallar bo'limi bosh menyusi */
export function adminChannelsKeyboard(lang = "uz") {
  return new InlineKeyboard()
    .text(t(lang, "admin_btn_channel_add"), "admin:channel_add")
    .row()
    .text(t(lang, "admin_btn_channel_list"), "admin:channel_list")
    .row()
    .text(t(lang, "keyboard_back"), "admin:main");
}

/** Umumiy majburiy kanallar ro'yxati — har biri o'chirish tugmasi bilan */
export function adminChannelListKeyboard(channels, lang = "uz") {
  const kb = new InlineKeyboard();
  for (const channel of channels) {
    kb.text(
      `🗑 ${channel.channelTitle || channel.channelUsername || channel.channelId}`,
      `admin:channel_remove:${channel.id}`,
    ).row();
  }
  kb.text(t(lang, "keyboard_back"), "admin:channels");
  return kb;
}

/** Kanal qo'shish jarayonida bekor qilish tugmasi */
export function adminChannelAddCancelKeyboard(lang = "uz") {
  return new InlineKeyboard().text(t(lang, "admin_btn_cancel"), "admin:channels");
}
