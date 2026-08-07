import { InlineKeyboard } from "grammy";
import {
  WARNING_LIMIT_OPTIONS,
  SPAM_MESSAGE_LIMIT_OPTIONS,
  SPAM_TIME_WINDOW_OPTIONS,
  EMOJI_LIMIT_OPTIONS,
  CAPS_PERCENT_OPTIONS,
  SLOW_MODE_OPTIONS,
} from "../constants/index.js";
import { numberOptionsKeyboard } from "./optionsKeyboard.js";
import { t } from "../i18n/index.js";

/** "🔧 Kengaytirilgan" bo'limi asosiy menyusi */
export function advancedKeyboard(lang = "uz") {
  return new InlineKeyboard()
    .text(t(lang, "advanced_btn_warnings"), "advanced:warnings")
    .row()
    .text(t(lang, "advanced_btn_spamcount"), "advanced:spamcount")
    .row()
    .text(t(lang, "advanced_btn_spamwindow"), "advanced:spamwindow")
    .row()
    .text(t(lang, "advanced_btn_emoji"), "advanced:emoji")
    .row()
    .text(t(lang, "advanced_btn_caps"), "advanced:caps")
    .row()
    .text(t(lang, "advanced_btn_slowmode"), "advanced:slowmode")
    .row()
    .text(t(lang, "advanced_btn_badwords"), "advanced:badwords")
    .row()
    .text(t(lang, "keyboard_back"), "settings:main");
}

export function warningLimitKeyboard(current, lang = "uz") {
  return numberOptionsKeyboard(WARNING_LIMIT_OPTIONS, current, "advanced:warnings:", "settings:advanced", lang);
}

export function spamCountKeyboard(current, lang = "uz") {
  return numberOptionsKeyboard(SPAM_MESSAGE_LIMIT_OPTIONS, current, "advanced:spamcount:", "settings:advanced", lang);
}

export function spamWindowKeyboard(current, lang = "uz") {
  return numberOptionsKeyboard(SPAM_TIME_WINDOW_OPTIONS, current, "advanced:spamwindow:", "settings:advanced", lang);
}

export function emojiLimitKeyboard(current, lang = "uz") {
  return numberOptionsKeyboard(EMOJI_LIMIT_OPTIONS, current, "advanced:emoji:", "settings:advanced", lang);
}

export function capsLimitKeyboard(current, lang = "uz") {
  return numberOptionsKeyboard(CAPS_PERCENT_OPTIONS, current, "advanced:caps:", "settings:advanced", lang);
}

export function slowModeKeyboard(current, lang = "uz") {
  return numberOptionsKeyboard(SLOW_MODE_OPTIONS, current, "advanced:slowmode:", "settings:advanced", lang);
}

export function badWordsBackKeyboard(lang = "uz") {
  return new InlineKeyboard().text(t(lang, "keyboard_back"), "settings:advanced");
}
