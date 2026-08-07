import { AD_KEYWORDS } from "../constants/index.js";

// O'zbekiston telefon raqami formatlari: +998901234567, 998901234567, 90 123 45 67
const PHONE_PATTERN = /(\+?998[\s\-]?\d{2}[\s\-]?\d{3}[\s\-]?\d{2}[\s\-]?\d{2})/;

// Bank karta raqami: 16 xonali, 4 tadan guruhlangan (masalan 8600 1234 5678 9012)
const CARD_PATTERN = /\b\d{4}[\s\-]?\d{4}[\s\-]?\d{4}[\s\-]?\d{4}\b/;

/**
 * Oddiy kalit so'z asosidagi reklama (targ'ibot) xabarlarini aniqlaydi.
 * Murakkab AI-tahlil o'rniga tez va bashorat qilinadigan yondashuv:
 * xabarda reklama uchun xos so'z/ibora, telefon raqami yoki karta raqami
 * bo'lsa — reklama deb hisoblanadi (odatda "sotiladi", "buyurtma" kabi
 * matnlar bilan birga keladi).
 */
export function isAdvertisement(text) {
  if (!text) return false;
  const lowerText = text.toLowerCase();

  if (AD_KEYWORDS.some((keyword) => lowerText.includes(keyword.toLowerCase()))) {
    return true;
  }

  // Telefon/karta raqami kalit so'z bilan birga kelsagina reklama deb hisoblaymiz
  // (aks holda oddiy shaxsiy suhbatdagi raqamlar ham bloklanib qolishi mumkin)
  const hasContactPattern = PHONE_PATTERN.test(text) || CARD_PATTERN.test(text);
  const hasSellIntent = /(sot|buyurtma|narx|chegirma|akciya|aksiya)/i.test(text);

  return hasContactPattern && hasSellIntent;
}
