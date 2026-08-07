import { getGroupLanguage, getBotUserLanguage } from "../services/languageService.js";
import { DEFAULT_LANGUAGE } from "../i18n/index.js";

/**
 * Har bir yangilanish (update) uchun `ctx.lang`ni bazadan aniqlaydi:
 * - guruh chatida — o'sha guruh uchun saqlangan til (`/til` orqali
 *   adminlar tomonidan o'rnatiladi);
 * - shaxsiy chatda — o'sha foydalanuvchi uchun saqlangan til.
 *
 * Bu orqali `ctx.lang` kabi hech qachon to'ldirilmaydigan
 * (session middleware ulanmagan) manbaga tayanish o'rniga, barcha
 * handlerlar `ctx.lang` orqali haqiqiy tanlangan tildan foydalanadi.
 */
export async function resolveLanguage(ctx, next) {
  try {
    if (ctx.chat?.type === "group" || ctx.chat?.type === "supergroup") {
      ctx.lang = await getGroupLanguage(ctx.chat.id);
    } else if (ctx.chat?.type === "private" && ctx.from) {
      ctx.lang = await getBotUserLanguage(ctx.from.id);
    } else {
      ctx.lang = DEFAULT_LANGUAGE;
    }
  } catch (error) {
    console.error("Tilni aniqlashda xatolik:", error);
    ctx.lang = DEFAULT_LANGUAGE;
  }

  await next();
}
