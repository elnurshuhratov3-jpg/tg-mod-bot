import uz from "../locales/uz.js";
import ru from "../locales/ru.js";
import en from "../locales/en.js";

// Qo'llab-quvvatlanadigan tillar. Yangi til qo'shilganda shu yerga va
// src/locales/<kod>.js fayliga qo'shiladi.
export const LOCALES = { uz, ru, en };
export const SUPPORTED_LANGUAGES = Object.keys(LOCALES);
export const DEFAULT_LANGUAGE = "uz";

export function isSupportedLanguage(lang) {
  return SUPPORTED_LANGUAGES.includes(lang);
}

/**
 * Berilgan til va kalit bo'yicha tarjima matnini qaytaradi.
 * Til yoki kalit topilmasa — standart (uz) tilga, undan ham topilmasa
 * kalitning o'ziga tushadi (bot hech qachon bo'sh javob bermasligi uchun).
 * `params` bilan matn ichidagi `{{nom}}` o'rinbosarlarni almashtirish mumkin.
 */
export function t(lang, key, params = {}) {
  const dict = LOCALES[lang] || LOCALES[DEFAULT_LANGUAGE];
  let text = dict[key] ?? LOCALES[DEFAULT_LANGUAGE][key] ?? key;

  for (const [paramKey, value] of Object.entries(params)) {
    text = text.replaceAll(`{{${paramKey}}}`, value);
  }

  return text;
}
