/**
 * Xotirada (RAM) "guruh:foydalanuvchi" kalitlari bo'yicha so'nggi xabar
 * vaqtlarini saqlaydigan flood-hisoblagich yaratadi. Har bir filtr turi
 * (umumiy flood, sticker spami va h.k.) o'z alohida hisoblagichiga ega
 * bo'lishi uchun factory ko'rinishida yozilgan.
 */
export function createFloodTracker() {
  const log = new Map();

  return function isFlooding(groupId, userId, messageLimit, timeWindowSeconds) {
    const key = `${groupId}:${userId}`;
    const now = Date.now();
    const windowMs = timeWindowSeconds * 1000;

    const previous = log.get(key) || [];
    const recent = previous.filter((timestamp) => now - timestamp < windowMs);
    recent.push(now);

    log.set(key, recent);

    return recent.length > messageLimit;
  };
}

/**
 * Foydalanuvchi berilgan vaqt oynasi (soniya) ichida ruxsat etilgan
 * xabarlar sonidan ko'proq yuborgan bo'lsa true qaytaradi.
 * (Umumiy flood/spam himoyasi uchun standart hisoblagich.)
 */
export const isFlooding = createFloodTracker();
