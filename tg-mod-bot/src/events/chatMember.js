import { upsertGroup, deactivateGroup } from "../services/groupService.js";
import { t } from "../i18n/index.js";

/**
 * Bot biror guruhga qo'shilganda yoki undan chiqarilganda ishga tushadigan
 * hodisa. Telegram bu holatni "my_chat_member" hodisasi orqali xabar beradi.
 */
export function registerChatMemberEvents(bot) {
  bot.on("my_chat_member", async (ctx) => {
    const chat = ctx.chat;
    if (chat.type !== "group" && chat.type !== "supergroup") return;

    const oldStatus = ctx.myChatMember.old_status;
    const newStatus = ctx.myChatMember.new_status;

    const wasOutside = ["left", "kicked"].includes(oldStatus);
    const isNowInside = ["member", "administrator"].includes(newStatus);

    if (wasOutside && isNowInside) {
      // Bot guruhga yangi qo'shildi -> avtomatik guruh yozuvi va
      // standart sozlamalar yaratiladi
      const group = await upsertGroup(chat);

      try {
        await ctx.reply(t(group.language || "uz", "bot_added_welcome"), { parse_mode: "Markdown" });
      } catch {
        // Guruh xabar yozishni cheklagan bo'lishi mumkin — e'tiborsiz qoldiramiz
      }
      return;
    }

    if (newStatus === "left" || newStatus === "kicked") {
      // Bot guruhdan chiqarildi -> guruhni faolsiz deb belgilaymiz
      // (ma'lumotlar o'chirilmaydi, faqat "isActive: false" qilinadi)
      await deactivateGroup(chat.id);
    }
  });
}
