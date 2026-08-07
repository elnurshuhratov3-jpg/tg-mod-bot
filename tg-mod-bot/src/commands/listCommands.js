import { isChatAdmin } from "../utils/permissions.js";
import { getTargetUser } from "../utils/targetUser.js";
import { escapeMarkdown } from "../utils/markdown.js";
import { getGroupByTelegramId } from "../services/groupService.js";
import { addToWhitelist, removeFromWhitelist } from "../services/whitelistService.js";
import { addToBlacklist, removeFromBlacklist } from "../services/blacklistService.js";
import { addBadWord, removeBadWord } from "../services/badWordService.js";
import { t } from "../i18n/index.js";

async function requireAdminGroup(ctx) {
  if (!ctx.chat || (ctx.chat.type !== "group" && ctx.chat.type !== "supergroup")) {
    const lang = ctx.lang || "uz";
    await ctx.reply(t(lang, "error_group_only"));
    return null;
  }
  const admin = await isChatAdmin(ctx);
  if (!admin) {
    const lang = ctx.lang || "uz";
    await ctx.reply(t(lang, "error_admin_only"));
    return null;
  }
  return getGroupByTelegramId(ctx.chat.id);
}

function mentionOf(target) {
  return `[${escapeMarkdown(target.name)}](tg://user?id=${target.id})`;
}

/** /royxat_qoshish — foydalanuvchini oq ro'yxatga qo'shadi (reply orqali) */
export function whitelistAddCommand(bot) {
  bot.command("royxat_qoshish", async (ctx) => {
    const group = await requireAdminGroup(ctx);
    if (!group) return;

    const lang = group.language || "uz";
    const target = getTargetUser(ctx);
    if (!target) {
      await ctx.reply(t(lang, "error_reply_user"));
      return;
    }

    await addToWhitelist(group.id, target.id);
    await ctx.reply(`✅ ${mentionOf(target)} ${t(lang, "whitelist_add_success")}`, { parse_mode: "Markdown" });
  });
}

/** /royxatdan_chiqarish — foydalanuvchini oq ro'yxatdan chiqaradi */
export function whitelistRemoveCommand(bot) {
  bot.command("royxatdan_chiqarish", async (ctx) => {
    const group = await requireAdminGroup(ctx);
    if (!group) return;

    const lang = group.language || "uz";
    const target = getTargetUser(ctx);
    if (!target) {
      await ctx.reply(t(lang, "error_reply_user"));
      return;
    }

    await removeFromWhitelist(group.id, target.id);
    await ctx.reply(`✅ ${mentionOf(target)} ${t(lang, "whitelist_remove_success")}`, { parse_mode: "Markdown" });
  });
}

/** /qora_royxat_qoshish — foydalanuvchini qora ro'yxatga qo'shadi va bloklaydi */
export function blacklistAddCommand(bot) {
  bot.command("qora_royxat_qoshish", async (ctx) => {
    const group = await requireAdminGroup(ctx);
    if (!group) return;

    const lang = group.language || "uz";
    const target = getTargetUser(ctx);
    if (!target) {
      await ctx.reply(t(lang, "error_reply_user"));
      return;
    }

    await addToBlacklist(group.id, target.id, t(lang, "blacklist_add_reason"));

    try {
      await ctx.banChatMember(target.id);
    } catch {
      // Bot yetarli huquqqa ega bo'lmasligi mumkin
    }

    await ctx.reply(`⚫ ${mentionOf(target)} ${t(lang, "blacklist_add_success")}`, {
      parse_mode: "Markdown",
    });
  });
}

/** /qora_royxat_ochirish — foydalanuvchini qora ro'yxatdan chiqaradi */
export function blacklistRemoveCommand(bot) {
  bot.command("qora_royxat_ochirish", async (ctx) => {
    const group = await requireAdminGroup(ctx);
    if (!group) return;

    const lang = group.language || "uz";
    const target = getTargetUser(ctx);
    if (!target) {
      await ctx.reply(t(lang, "error_reply_user"));
      return;
    }

    await removeFromBlacklist(group.id, target.id);
    await ctx.reply(`✅ ${mentionOf(target)} ${t(lang, "blacklist_remove_success")}`, { parse_mode: "Markdown" });
  });
}

/** /yomon_soz_qoshish <so'z> — taqiqlangan so'zlar ro'yxatiga qo'shadi */
export function badWordAddCommand(bot) {
  bot.command("yomon_soz_qoshish", async (ctx) => {
    const group = await requireAdminGroup(ctx);
    if (!group) return;

    const lang = group.language || "uz";
    const word = ctx.message.text.split(/\s+/).slice(1).join(" ").trim();
    if (!word) {
      await ctx.reply(t(lang, "badword_add_usage"), { parse_mode: "Markdown" });
      return;
    }

    await addBadWord(group.id, word);
    await ctx.reply(t(lang, "badword_add_success").replace("{word}", `"${word}"`));
  });
}

/** /yomon_soz_ochirish <so'z> — taqiqlangan so'zlar ro'yxatidan chiqaradi */
export function badWordRemoveCommand(bot) {
  bot.command("yomon_soz_ochirish", async (ctx) => {
    const group = await requireAdminGroup(ctx);
    if (!group) return;

    const lang = group.language || "uz";
    const word = ctx.message.text.split(/\s+/).slice(1).join(" ").trim();
    if (!word) {
      await ctx.reply(t(lang, "badword_remove_usage"), { parse_mode: "Markdown" });
      return;
    }

    await removeBadWord(group.id, word);
    await ctx.reply(t(lang, "badword_remove_success").replace("{word}", `"${word}"`));
  });
}
