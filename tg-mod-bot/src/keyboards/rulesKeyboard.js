import { InlineKeyboard } from "grammy";
import { t } from "../i18n/index.js";

/** "📋 Qoidalar" bo'limi menyusi */
export function rulesKeyboard(lang = "uz") {
  return new InlineKeyboard().text(t(lang, "keyboard_back"), "settings:main");
}
