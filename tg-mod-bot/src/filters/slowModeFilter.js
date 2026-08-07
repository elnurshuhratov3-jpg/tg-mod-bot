// Har bir "guruh:foydalanuvchi" uchun so'nggi xabar vaqtini saqlaydi.
const lastMessageAt = new Map();

/**
 * Slow mode yoqilgan bo'lsa (slowModeSeconds > 0) va foydalanuvchi
 * belgilangan oraliqdan tezroq yozgan bo'lsa true qaytaradi.
 */
export function isTooFastForSlowMode(groupId, userId, slowModeSeconds) {
  if (!slowModeSeconds) return false;

  const key = `${groupId}:${userId}`;
  const now = Date.now();
  const lastAt = lastMessageAt.get(key) || 0;

  lastMessageAt.set(key, now);

  return now - lastAt < slowModeSeconds * 1000;
}
