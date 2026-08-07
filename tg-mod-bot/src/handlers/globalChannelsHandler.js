import {
  getNotJoinedGlobalChannels,
  joinGlobalChannelsKeyboard,
} from "../middlewares/globalChannelGate.js";
import { sendStartMenu } from "../commands/startCommand.js";
import { t } from "../i18n/index.js";

export function registerGlobalChannelsHandlers(bot) {
  bot.callbackQuery("gchannels:check", async (ctx) => {
    const lang = ctx.lang || "uz";
    const userId = ctx.from?.id;
    if (!userId) return ctx.answerCallbackQuery();

    const notJoined = await getNotJoinedGlobalChannels(ctx, userId);

    if (notJoined.length > 0) {
      await ctx.answerCallbackQuery({
        text: t(lang, "channels_not_joined"),
        show_alert: true,
      });
      try {
        await ctx.editMessageReplyMarkup({
          reply_markup: joinGlobalChannelsKeyboard(notJoined, lang),
        });
      } catch {
        // Xabar o'zgarmagan bo'lishi mumkin — e'tiborsiz qoldiramiz
      }
      return;
    }

    try {
      await ctx.deleteMessage();
    } catch {
      // O'chirib bo'lmasa, muammo emas
    }
    await ctx.answerCallbackQuery({ text: t(lang, "thank_you") });
    await sendStartMenu(ctx);
  });
}
