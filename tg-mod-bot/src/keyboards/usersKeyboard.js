import { InlineKeyboard } from "grammy";
import { t } from "../i18n/index.js";

/** "👥 Foydalanuvchilar" bo'limi menyusi */
export function usersKeyboard(lang = "uz") {
  return new InlineKeyboard()
    .text(t(lang, "users_whitelist"), "users:whitelist")
    .row()
    .text(t(lang, "users_blacklist"), "users:blacklist")
    .row()
    .text(t(lang, "keyboard_back"), "settings:main");
}

/** Oq/qora ro'yxat ro'yxatini ko'rsatuvchi menyu (orqaga tugmasi bilan) */
export function listBackKeyboard(backCallback, lang = "uz") {
  return new InlineKeyboard().text(t(lang, "keyboard_back"), backCallback);
}
