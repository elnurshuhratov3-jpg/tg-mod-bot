import { InlineKeyboard } from "grammy";
import { t } from "../i18n/index.js";
import { getGroupLanguage, getBotUserLanguage } from "../services/languageService.js";
import { escapeMarkdown } from "../utils/markdown.js";

// Guruh a'zolari /til buyrug'i borligini bilishi uchun, guruhning joriy
// tilidan qat'iy nazar har doim 3 tilda ko'rsatiladigan qisqa eslatma.
const LANGUAGE_HINT =
  "🌐 Tilni almashtirish: /til\n🇺🇿 O'zbekcha  •  🇷🇺 Русский  •  🇬🇧 English";

/**
 * Foydalanuvchining ko'rsatiladigan nomi: username bo'lsa "@username",
 * bo'lmasa Telegram'dagi ismi (first_name) ishlatiladi.
 */
function getDisplayName(from) {
  if (from?.username) return `@${from.username}`;
  return from?.first_name || "";
}

export function startKeyboard(botUsername, lang, displayName) {
  return new InlineKeyboard().url(
    t(lang, "start_add_to_group", { displayName }),
    `https://t.me/${botUsername}?startgroup=true`,
  );
}

/** Guruhda /start bosilganda (yoki /til menyusida "orqaga" bosilganda) ko'rsatiladigan matn */
export async function buildGroupStartText(ctx) {
  const lang = await getGroupLanguage(ctx.chat.id);
  return `${t(lang, "start_group_response")}\n\n${LANGUAGE_HINT}`;
}

/** /start bosilganda yoki majburiy kanal tekshiruvidan o'tgandan keyin ko'rsatiladigan xush kelibsiz xabari */
export async function sendStartMenu(ctx) {
  const lang = await getBotUserLanguage(ctx.from.id);
  const displayName = getDisplayName(ctx.from);
  await ctx.reply(t(lang, "start_welcome", { displayName: escapeMarkdown(displayName) }), {
    parse_mode: "Markdown",
    reply_markup: startKeyboard(ctx.me.username, lang, displayName),
  });
}

/**
 * Xuddi shu shaxsiy /start xabari, lekin yangi xabar yubormasdan (masalan
 * /til menyusidagi "orqaga" tugmasi bosilganda mavjud xabarni tahrirlash uchun).
 */
export async function sendStartMenuText(ctx) {
  const lang = await getBotUserLanguage(ctx.from.id);
  const displayName = getDisplayName(ctx.from);
  return {
    text: t(lang, "start_welcome", { displayName: escapeMarkdown(displayName) }),
    options: {
      parse_mode: "Markdown",
      reply_markup: startKeyboard(ctx.me.username, lang, displayName),
    },
  };
}

export function startCommand(bot) {
  bot.command("start", async (ctx) => {
    // Guruhda /start bosilsa — faqat qisqa javob, shaxsiy menyu emas
    if (ctx.chat.type === "group" || ctx.chat.type === "supergroup") {
      await ctx.reply(await buildGroupStartText(ctx));
      return;
    }

    if (ctx.chat.type !== "private") return;

    await sendStartMenu(ctx);
  });
}
