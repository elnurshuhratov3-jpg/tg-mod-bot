import { InlineKeyboard } from "grammy";
import { getGroupWithSettings } from "../services/groupService.js";
import { recordMemberEvent } from "../services/memberEventService.js";
import { t } from "../i18n/index.js";
import { escapeMarkdown } from "../utils/markdown.js";
import {
  setPendingCaptcha,
  getPendingCaptcha,
  clearPendingCaptcha,
  registerJoinAndCheckRaid,
  CAPTCHA_TIMEOUT,
} from "../state/captchaState.js";

/** Yangi a'zoni "✅ Men botman emas" tugmasi bilan tekshiradi (captcha) */
async function startCaptcha(ctx, group, member) {
  const lang = group.language || "uz";

  try {
    await ctx.restrictChatMember(member.id, {
      permissions: { can_send_messages: false },
      use_independent_chat_permissions: true,
    });
  } catch {
    // Bot admin huquqiga ega bo'lmasligi mumkin — captcha shunda ham ko'rsatiladi
  }

  const kb = new InlineKeyboard().text(
    t(lang, "captcha_not_bot_btn"),
    `captcha:verify:${member.id}`,
  );

  const mention = `[${escapeMarkdown(member.first_name || t(lang, "default_user_name"))}](tg://user?id=${member.id})`;

  let promptMessage;
  try {
    promptMessage = await ctx.reply(
      t(lang, "captcha_welcome_prompt", {
        mention,
        minutes: Math.round(CAPTCHA_TIMEOUT / 60000),
      }),
      { parse_mode: "Markdown", reply_markup: kb },
    );
  } catch {
    return;
  }

  const timeoutId = setTimeout(async () => {
    clearPendingCaptcha(group.telegramId.toString(), member.id);
    try {
      await ctx.api.banChatMember(ctx.chat.id, member.id);
      await ctx.api.unbanChatMember(ctx.chat.id, member.id);
    } catch {
      // Huquq yetishmasligi mumkin
    }
    try {
      await ctx.api.deleteMessage(ctx.chat.id, promptMessage.message_id);
    } catch {
      // Xabar allaqachon o'chirilgan bo'lishi mumkin
    }
  }, CAPTCHA_TIMEOUT);

  setPendingCaptcha(group.telegramId.toString(), member.id, {
    timeoutId,
    promptMessageId: promptMessage.message_id,
  });
}

export function registerMemberEvents(bot) {
  // ---- Yangi a'zo(lar) qo'shildi ----
  bot.on("message:new_chat_members", async (ctx) => {
    const chat = ctx.chat;
    const group = await getGroupWithSettings(chat.id);
    if (!group) return;

    const members = ctx.message.new_chat_members.filter((m) => !m.is_bot);

    for (const member of members) {
      await recordMemberEvent(group.id, member.id, "JOIN");
    }

    const settings = group.filterSettings;
    if (settings) {
      // Reyd aniqlash: bir nechta odam qisqa vaqt ichida kirsa
      if (settings.antiRaidEnabled && members.length > 0) {
        const isRaid = registerJoinAndCheckRaid(
          String(chat.id),
          settings.antiRaidThreshold,
          settings.antiRaidWindowSeconds,
        );
        if (isRaid) {
          try {
            await ctx.reply(
              t(group.language || "uz", "raid_detected", { threshold: settings.antiRaidThreshold }),
              { parse_mode: "Markdown" },
            );
          } catch {
            // Guruhda yozish cheklangan bo'lishi mumkin
          }
        }
      }

      // Captcha: har bir yangi (bot bo'lmagan) a'zo uchun
      if (settings.captchaEnabled) {
        for (const member of members) {
          await startCaptcha(ctx, group, member);
        }
      }

      // Xizmat xabarini ("... guruhga qo'shildi") o'chirish
      if (settings.deleteServiceMessages) {
        try {
          await ctx.deleteMessage();
        } catch {
          // O'chirish huquqi bo'lmasligi mumkin
        }
      }
    }
  });

  // ---- A'zo guruhdan chiqdi/chiqarildi ----
  bot.on("message:left_chat_member", async (ctx) => {
    const chat = ctx.chat;
    const leftMember = ctx.message.left_chat_member;
    if (leftMember?.is_bot) return;

    const group = await getGroupWithSettings(chat.id);
    if (!group) return;

    await recordMemberEvent(group.id, leftMember.id, "LEAVE");

    if (group.filterSettings?.deleteServiceMessages) {
      try {
        await ctx.deleteMessage();
      } catch {
        // O'chirish huquqi bo'lmasligi mumkin
      }
    }
  });
}

export { getPendingCaptcha, clearPendingCaptcha };
