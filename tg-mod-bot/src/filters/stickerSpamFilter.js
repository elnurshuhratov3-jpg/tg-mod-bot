import { createFloodTracker } from "./floodFilter.js";

// Sticker/GIF spami uchun alohida hisoblagich (umumiy flood filtridan mustaqil)
const isStickerFlooding = createFloodTracker();

// Standart chegaralar: 15 soniyada 4 tadan ortiq sticker/GIF — spam
const STICKER_LIMIT = 4;
const STICKER_WINDOW_SECONDS = 15;

/** Xabar sticker yoki animatsiya (GIF) ekanligini tekshiradi */
export function isStickerOrGif(message) {
  return Boolean(message?.sticker || message?.animation);
}

/**
 * Foydalanuvchi ketma-ket juda ko'p sticker/GIF yuborayotgan bo'lsa
 * true qaytaradi (sticker-spam).
 */
export function isStickerSpam(groupId, userId) {
  return isStickerFlooding(groupId, userId, STICKER_LIMIT, STICKER_WINDOW_SECONDS);
}
