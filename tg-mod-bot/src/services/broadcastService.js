import prisma from "../database/prisma.js";
import { listActiveUsers, deactivateUser } from "./userService.js";
import { deactivateGroup } from "./groupService.js";

const BATCH_SIZE = 20; // bir vaqtda yuboriladigan xabarlar soni
const BATCH_DELAY_MS = 1000; // har bir partiya orasidagi kutish (Telegram flood limitidan qochish uchun)

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Berilgan targetlar ro'yxatiga (chat id) xabarni nusxa ko'chiradi
 * (copyMessage — matn, rasm, video, fayl va h.k. barchasini qo'llab-quvvatlaydi).
 * Bloklangan/topilmagan targetlar "onFail" orqali belgilanadi.
 */
async function copyToTargets(api, targetIds, fromChatId, messageId, onFail) {
  let sent = 0;
  let failed = 0;

  for (let i = 0; i < targetIds.length; i += BATCH_SIZE) {
    const batch = targetIds.slice(i, i + BATCH_SIZE);

    await Promise.all(
      batch.map(async (targetId) => {
        try {
          await api.copyMessage(targetId, fromChatId, messageId);
          sent += 1;
        } catch (err) {
          failed += 1;
          await onFail(targetId, err).catch(() => {});
        }
      }),
    );

    if (i + BATCH_SIZE < targetIds.length) {
      await sleep(BATCH_DELAY_MS);
    }
  }

  return { sent, failed };
}

/** Xabarni botdan foydalangan barcha faol foydalanuvchilarga yuboradi */
export async function broadcastToUsers(api, fromChatId, messageId) {
  const users = await listActiveUsers();
  const targetIds = users.map((u) => u.telegramId.toString());

  return copyToTargets(api, targetIds, fromChatId, messageId, async (targetId, err) => {
    // 403 — foydalanuvchi botni bloklagan yoki chatni o'chirgan
    if (err?.error_code === 403 || /bot was blocked|chat not found/i.test(err?.description || "")) {
      await deactivateUser(targetId);
    }
  });
}

/** Xabarni botga ulangan barcha faol guruhlarga yuboradi */
export async function broadcastToGroups(api, fromChatId, messageId) {
  const groups = await prisma.group.findMany({
    where: { isActive: true },
    select: { telegramId: true },
  });
  const targetIds = groups.map((g) => g.telegramId.toString());

  return copyToTargets(api, targetIds, fromChatId, messageId, async (targetId, err) => {
    if (
      err?.error_code === 403 ||
      /bot was kicked|chat not found|not enough rights/i.test(err?.description || "")
    ) {
      await deactivateGroup(targetId);
    }
  });
}
