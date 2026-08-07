import { isOwner } from "../utils/isOwner.js";
import { adminMainKeyboard } from "../keyboards/adminKeyboard.js";
import { t } from "../i18n/index.js";

/** /admin — faqat bot egasi (OWNER_ID) uchun, faqat shaxsiy chatda ishlaydigan boshqaruv paneli */
export function adminCommand(bot) {
  bot.command("admin", async (ctx) => {
    // Guruhda /admin yozilsa — botning javob berishi shart emas
    if (ctx.chat.type !== "private") return;

    const lang = ctx.lang || "uz";

    if (!isOwner(ctx)) {
      await ctx.reply(t(lang, "error_owner_only"));
      return;
    }

    const menuText = t(lang, "admin_title") + "\n\n" + t(lang, "admin_choose_section");
    await ctx.reply(menuText, {
      parse_mode: "Markdown",
      reply_markup: adminMainKeyboard(lang),
    });
  });
}
