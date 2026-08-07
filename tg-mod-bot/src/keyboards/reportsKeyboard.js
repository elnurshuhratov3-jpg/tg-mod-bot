import { InlineKeyboard } from "grammy";
import { REPORT_LIMIT_OPTIONS } from "../constants/index.js";
import { numberOptionsKeyboard } from "./optionsKeyboard.js";
import { t } from "../i18n/index.js";

/** "🚨 Shikoyatlar" bo'limi asosiy menyusi */
export function reportsKeyboard(lang = "uz") {
  return new InlineKeyboard()
    .text(t(lang, "reports_btn_setlimit"), "reports:setlimit")
    .row()
    .text(t(lang, "keyboard_back"), "settings:main");
}

/** Shikoyat limitini tanlash klaviaturasi */
export function reportLimitOptionsKeyboard(currentLimit, lang = "uz") {
  return numberOptionsKeyboard(REPORT_LIMIT_OPTIONS, currentLimit, "reports:limit:", "settings:reports", lang);
}
