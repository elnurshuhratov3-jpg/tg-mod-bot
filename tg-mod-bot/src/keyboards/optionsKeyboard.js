import { InlineKeyboard } from "grammy";
import { t } from "../i18n/index.js";

/**
 * Berilgan raqamli variantlar (masalan [1,2,3,4,5,10]) uchun tugmalar
 * qatorini quradi. Joriy tanlangan qiymat ✅ belgisi bilan ko'rsatiladi.
 * callbackPrefix + qiymat = har bir tugmaning callback_data'si.
 */
export function numberOptionsKeyboard(options, currentValue, callbackPrefix, backCallback, lang = "uz", perRow = 3) {
  const kb = new InlineKeyboard();

  options.forEach((value, index) => {
    const label = value === currentValue ? `✅ ${value}` : String(value);
    kb.text(label, `${callbackPrefix}${value}`);
    if ((index + 1) % perRow === 0) kb.row();
  });

  if (options.length % perRow !== 0) kb.row();
  kb.text(t(lang, "keyboard_back"), backCallback);
  return kb;
}
