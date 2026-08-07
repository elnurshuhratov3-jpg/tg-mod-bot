import { env } from "../config/env.js";

/**
 * Xabar yuborgan shaxs bot egasi (OWNER_ID) ekanligini tekshiradi.
 * OWNER_ID .env faylida o'rnatiladi. Faqat shu foydalanuvchi /admin
 * panelidan foydalana oladi.
 */
export function isOwner(ctx) {
  if (!env.OWNER_ID || !ctx.from) return false;
  return BigInt(ctx.from.id) === env.OWNER_ID;
}
