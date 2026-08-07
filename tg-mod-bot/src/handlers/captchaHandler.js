import { FULL_PERMISSIONS } from "../commands/moderationCommands.js";
import { clearPendingCaptcha } from "../state/captchaState.js";
import { t } from "../i18n/index.js";

export function registerCaptchaHandlers(bot) {
  bot.callbackQuery(/^captcha:verify:(\d+)$/, async (ctx) => {
    const targetUserId = ctx.match[1];
    const lang = ctx.lang || "uz";

    if (String(ctx.from.id) !== targetUserId) {
      await ctx.answerCallbackQuery({
        text: t(lang, "captcha_not_for_you"),
        show_alert: true,
      });
      return;
    }

    const groupKey = String(ctx.chat.id);

    let unrestricted = true;
    try {
      await ctx.restrictChatMember(Number(targetUserId), {
        permissions: FULL_PERMISSIONS,
        // Har bir ruxsatni mustaqil qo'llash — aks holda ba'zi maydonlar
        // bir-birini "nazarda tutib" (implied) noaniq holatga olib kelishi
        // mumkin (Telegram Bot API'ning guruhlangan ruxsat rejimi).
        use_independent_chat_permissions: true,
      });
    } catch {
      // Bot admin huquqiga ega bo'lmasligi mumkin (masalan "A'zolarni
      // cheklash" huquqi berilmagan) — bu holda foydalanuvchiga muvaffaqiyat
      // haqida yolg'on xabar bermaymiz, aksincha aniq ogohlantiramiz.
      unrestricted = false;
    }

    if (!unrestricted) {
      await ctx.answerCallbackQuery({
        text: t(lang, "captcha_verify_failed"),
        show_alert: true,
      });
      return;
    }

    clearPendingCaptcha(groupKey, targetUserId);

    await ctx.answerCallbackQuery({ text: t(lang, "captcha_verified") });
    try {
      await ctx.deleteMessage();
    } catch {
      // Xabar allaqachon o'chirilgan bo'lishi mumkin
    }
  });
}
