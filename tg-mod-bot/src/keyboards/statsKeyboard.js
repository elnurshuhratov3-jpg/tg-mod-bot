import { InlineKeyboard } from "grammy";
import { t } from "../i18n/index.js";

/** "📊 Statistika" bo'limi menyusi */
export function statsKeyboard(lang = "uz") {
  return new InlineKeyboard()
    .text(t(lang, "stats_btn_weekly"), "stats:weekly")
    .text(t(lang, "stats_btn_monthly"), "stats:monthly")
    .row()
    .text(t(lang, "stats_btn_members"), "stats:members")
    .row()
    .text(t(lang, "stats_btn_topadmins"), "stats:topadmins")
    .row()
    .text(t(lang, "keyboard_back"), "settings:main");
}

/** Ichki statistika bo'limlaridan asosiy statistika sahifasiga qaytish tugmasi */
export function statsBackKeyboard(lang = "uz") {
  return new InlineKeyboard().text(t(lang, "keyboard_back"), "settings:stats");
}
