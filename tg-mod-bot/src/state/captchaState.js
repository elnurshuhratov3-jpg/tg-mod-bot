// Captcha kutilayotgan foydalanuvchilar: key = "groupId:userId" -> { timeoutId, promptMessageId }
const pendingCaptcha = new Map();

// Har bir guruh uchun so'nggi kirganlar vaqti (reyd aniqlash uchun)
const recentJoins = new Map();

const CAPTCHA_TIMEOUT_MS = 5 * 60 * 1000; // 5 daqiqa ichida tasdiqlanmasa — chiqarib yuboriladi

export function setPendingCaptcha(groupId, userId, data) {
  pendingCaptcha.set(`${groupId}:${userId}`, data);
}

export function getPendingCaptcha(groupId, userId) {
  return pendingCaptcha.get(`${groupId}:${userId}`) || null;
}

export function clearPendingCaptcha(groupId, userId) {
  const key = `${groupId}:${userId}`;
  const entry = pendingCaptcha.get(key);
  if (entry?.timeoutId) clearTimeout(entry.timeoutId);
  pendingCaptcha.delete(key);
}

export const CAPTCHA_TIMEOUT = CAPTCHA_TIMEOUT_MS;

/**
 * Guruhga yangi a'zo kirganini qayd etadi va berilgan oyna/chegara asosida
 * reyd (qisqa vaqtda ko'p kishi kirishi) aniqlangan bo'lsa true qaytaradi.
 */
export function registerJoinAndCheckRaid(groupId, thresholdCount, windowSeconds) {
  const now = Date.now();
  const windowMs = windowSeconds * 1000;

  const previous = recentJoins.get(groupId) || [];
  const recent = previous.filter((timestamp) => now - timestamp < windowMs);
  recent.push(now);

  recentJoins.set(groupId, recent);

  return recent.length >= thresholdCount;
}
