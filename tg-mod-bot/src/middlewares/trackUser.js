import { upsertUser } from "../services/userService.js";

// Xotirada keshlash — har bir xabarda bazaga so'rov yubormaslik uchun
const knownUserIds = new Set();

/**
 * Bot bilan shaxsiy chatda gaplashgan har bir foydalanuvchini bazaga
 * yozadi (broadcast va statistika uchun kerak).
 */
export async function trackUser(ctx, next) {
  const chat = ctx.chat;
  const from = ctx.from;

  if (chat?.type === "private" && from && !from.is_bot) {
    const key = String(from.id);
    if (!knownUserIds.has(key)) {
      await upsertUser(from);
      knownUserIds.add(key);
    }
  }

  await next();
}
