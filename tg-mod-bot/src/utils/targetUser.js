import { parseDuration } from "./duration.js";

/**
 * Admin buyrug'i (masalan /taqiqlash) qaysi foydalanuvchiga
 * qaratilganini aniqlaydi. Uch usulni qo'llab-quvvatlaydi:
 *   1) Foydalanuvchi xabariga javob (reply) qilingan bo'lsa
 *   2) Xabarda "text_mention" (profilga havola) bo'lsa
 *   3) Buyruqdan keyin raqamli Telegram ID yozilgan bo'lsa
 *      (masalan: /taqiq_bekor 123456789 — bu ayniqsa guruhdan
 *      chiqib ketgan foydalanuvchini blokdan chiqarishda kerak,
 *      chunki uning xabariga javob berib bo'lmaydi)
 */
export function getTargetUser(ctx) {
  const message = ctx.message;
  const reply = message?.reply_to_message;

  if (reply?.from) {
    return {
      id: reply.from.id,
      name: reply.from.first_name || reply.from.username || String(reply.from.id),
    };
  }

  const entities = message?.entities || [];
  const mentionEntity = entities.find((e) => e.type === "text_mention" && e.user);
  if (mentionEntity) {
    return {
      id: mentionEntity.user.id,
      name: mentionEntity.user.first_name || String(mentionEntity.user.id),
    };
  }

  const parts = message?.text?.split(/\s+/).slice(1) || [];
  if (parts[0] && /^\d+$/.test(parts[0])) {
    return { id: Number(parts[0]), name: parts[0] };
  }

  return null;
}

/** Buyruqdan keyingi sababni ajratib oladi (raqamli ID bo'lsa uni o'tkazib yuboradi) */
export function getReasonText(ctx) {
  const parts = ctx.message.text.split(/\s+/).slice(1);
  if (parts[0] && /^\d+$/.test(parts[0])) {
    parts.shift();
  }
  return parts.join(" ").trim() || "Sabab ko'rsatilmagan";
}

/**
 * Vaqtinchalik mute/ban buyruqlari uchun: ID (bo'lsa) dan keyingi birinchi
 * so'z muddat ekanligini tekshiradi (masalan "2soat", "3kun"), topilsa
 * ajratib oladi, qolganini sabab matni sifatida qaytaradi.
 * Muddat berilmagan bo'lsa duration: null (doimiy amal) qaytadi.
 */
export function getDurationAndReason(ctx) {
  const parts = ctx.message.text.split(/\s+/).slice(1);
  if (parts[0] && /^\d+$/.test(parts[0])) {
    parts.shift();
  }

  let durationMs = null;
  if (parts[0]) {
    const parsed = parseDuration(parts[0]);
    if (parsed) {
      durationMs = parsed;
      parts.shift();
    }
  }

  const reason = parts.join(" ").trim() || "Sabab ko'rsatilmagan";
  return { durationMs, reason };
}
