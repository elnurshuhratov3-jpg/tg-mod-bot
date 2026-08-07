// Har bir "guruh:foydalanuvchi" uchun oxirgi yuborilgan matnni saqlaydi.
// Xotirada (RAM) — bot qayta ishga tushganda tozalanadi, bu muammo emas.
const lastMessages = new Map();

const DUPLICATE_THRESHOLD = 3; // shu miqdorda takrorlansa — spam
const DUPLICATE_WINDOW_MS = 30_000; // 30 soniya ichida

/**
 * Foydalanuvchi bir xil matnni ketma-ket bir necha marta yuborsa
 * true qaytaradi (bir xil xabarni takroran yuborish — spam).
 */
export function isDuplicateSpam(groupId, userId, text) {
  if (!text) return false;

  const key = `${groupId}:${userId}`;
  const now = Date.now();
  const normalized = text.trim().toLowerCase();

  const entry = lastMessages.get(key);

  if (entry && entry.text === normalized && now - entry.lastSeenAt < DUPLICATE_WINDOW_MS) {
    entry.count += 1;
    entry.lastSeenAt = now;
    lastMessages.set(key, entry);
    return entry.count >= DUPLICATE_THRESHOLD;
  }

  lastMessages.set(key, { text: normalized, count: 1, lastSeenAt: now });
  return false;
}
