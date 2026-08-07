/**
 * Guruh sozlamalarida log-kanal (`logChannelId`) o'rnatilgan bo'lsa,
 * moderatsiya harakati haqida xabarni o'sha kanalga yuboradi.
 * Kanal o'rnatilmagan bo'lsa — hech narsa qilmaydi (jim o'tadi).
 */
export async function sendModerationLog(ctx, group, text) {
  const logChannelId = group.filterSettings?.logChannelId;
  if (!logChannelId) return;

  try {
    await ctx.api.sendMessage(logChannelId.toString(), text, { parse_mode: "Markdown" });
  } catch {
    // Bot log-kanalda admin bo'lmasligi mumkin — moderatsiya jarayonini to'xtatmaymiz
  }
}
