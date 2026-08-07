/**
 * Xabar boshqa joydan forward qilinganligini aniqlaydi.
 * grammY/Telegram Bot API 7+ da "forward_origin" maydoni ishlatiladi,
 * eski botlarda esa "forward_from" / "forward_from_chat" bo'lishi mumkin —
 * ikkalasini ham tekshiramiz (moslashuvchanlik uchun).
 */
export function isForwardedMessage(message) {
  if (!message) return false;
  return Boolean(
    message.forward_origin || message.forward_from || message.forward_from_chat,
  );
}
