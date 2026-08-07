// Faqat harflarni hisobga oladi (kirill va lotin)
const LETTER_PATTERN = /[a-zA-Zа-яА-ЯёЁ'ʼ]/g;
const UPPERCASE_PATTERN = /[A-ZА-ЯЁ]/;

/**
 * Xabardagi bosh harflar foizi berilgan limitdan oshsa true qaytaradi.
 * Juda qisqa xabarlar (10 harfdan kam) tekshirilmaydi — tasodifiy
 * qisqa qichqiriqlar (masalan "OK", "HA") jazolanmasligi uchun.
 */
export function isExcessiveCaps(text, limitPercent) {
  if (!text) return false;

  const letters = text.match(LETTER_PATTERN) || [];
  if (letters.length < 10) return false;

  const upperCount = letters.filter((ch) => UPPERCASE_PATTERN.test(ch)).length;
  const percent = (upperCount / letters.length) * 100;

  return percent >= limitPercent;
}
