import { isChatAdmin } from "../utils/permissions.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import { listWhitelist } from "../services/whitelistService.js";
import { listBlacklist } from "../services/blacklistService.js";
import { usersKeyboard, listBackKeyboard } from "../keyboards/usersKeyboard.js";
import { t } from "../i18n/index.js";

async function requireAdminCallback(ctx) {
  const lang = ctx.lang || "uz";
  const admin = await isChatAdmin(ctx);
  if (!admin) {
    await ctx.answerCallbackQuery({ text: t(lang, "error_admin_only"), show_alert: true });
    return false;
  }
  return true;
}

function formatUserList(entries, lang = "uz") {
  if (entries.length === 0) return t(lang, "list_empty");
  return entries.map((e, i) => `${i + 1}. [foydalanuvchi](tg://user?id=${e.userId})`).join("\n");
}

export function registerUsersHandlers(bot) {
  bot.callbackQuery("settings:users", async (ctx) => {
    if (!(await requireAdminCallback(ctx))) return;

    const lang = ctx.lang || "uz";
    const group = await getGroupByTelegramId(ctx.chat.id);
    const groupLang = group?.language || lang;

    const text = t(groupLang, "users_list") + "\n\n" + t(groupLang, "users_description");
    await ctx.editMessageText(text, {
      parse_mode: "Markdown",
      reply_markup: usersKeyboard(groupLang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("users:whitelist", async (ctx) => {
    if (!(await requireAdminCallback(ctx))) return;

    const lang = ctx.lang || "uz";
    const group = await getGroupByTelegramId(ctx.chat.id);
    const groupLang = group?.language || lang;
    const entries = await listWhitelist(group.id);

    const title = t(groupLang, "users_whitelist");
    await ctx.editMessageText(`${title} (${entries.length}):\n\n${formatUserList(entries, groupLang)}`, {
      parse_mode: "Markdown",
      reply_markup: listBackKeyboard("settings:users", groupLang),
    });
    await ctx.answerCallbackQuery();
  });

  bot.callbackQuery("users:blacklist", async (ctx) => {
    if (!(await requireAdminCallback(ctx))) return;

    const lang = ctx.lang || "uz";
    const group = await getGroupByTelegramId(ctx.chat.id);
    const groupLang = group?.language || lang;
    const entries = await listBlacklist(group.id);

    const title = t(groupLang, "users_blacklist");
    await ctx.editMessageText(`${title} (${entries.length}):\n\n${formatUserList(entries, groupLang)}`, {
      parse_mode: "Markdown",
      reply_markup: listBackKeyboard("settings:users", groupLang),
    });
    await ctx.answerCallbackQuery();
  });
}
