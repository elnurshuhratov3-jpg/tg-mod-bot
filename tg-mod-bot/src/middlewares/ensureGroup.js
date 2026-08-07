import prisma from "../database/prisma.js";
import { upsertGroup } from "../services/groupService.js";

// Xotirada keshlash — har bir xabarda bazaga so'rov yubormaslik uchun
// (bot qayta ishga tushganda kesh tozalanadi, bu normal holat)
const knownGroupIds = new Set();

/**
 * Har qanday guruh xabari kelganda, agar bu guruh negadir bazada
 * hali ro'yxatdan o'tmagan bo'lsa (masalan bot funksiyasi keyinroq
 * qo'shilgan eski guruh), uni avtomatik yaratadi.
 */
export async function ensureGroup(ctx, next) {
  const chat = ctx.chat;

  if (chat && (chat.type === "group" || chat.type === "supergroup")) {
    const key = String(chat.id);

    if (!knownGroupIds.has(key)) {
      const existing = await prisma.group.findUnique({
        where: { telegramId: BigInt(chat.id) },
      });

      if (!existing) {
        await upsertGroup(chat);
      }

      knownGroupIds.add(key);
    }

    // Keyingi handlerlar uchun guruh ma'lumotini contextga qo'shib qo'yamiz
    ctx.groupTelegramId = BigInt(chat.id);
  }

  await next();
}
