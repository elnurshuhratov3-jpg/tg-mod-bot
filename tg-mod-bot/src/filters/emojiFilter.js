const EMOJI_PATTERN = /\p{Extended_Pictographic}/gu;

/** Xabardagi emojilar sonini hisoblaydi */
export function countEmojis(text) {
  if (!text) return 0;
  const matches = text.match(EMOJI_PATTERN);
  return matches ? matches.length : 0;
}

/** Emojilar soni belgilangan limitdan ko'p bo'lsa true qaytaradi */
export function hasTooManyEmojis(text, limit) {
  return countEmojis(text) > limit;
}
