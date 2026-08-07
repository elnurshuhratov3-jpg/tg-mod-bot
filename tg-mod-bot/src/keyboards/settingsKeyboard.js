import { InlineKeyboard } from "grammy";
import { t } from "../i18n/index.js";

/** /sozlamalar buyrug'i ochadigan asosiy menyu */
export function mainSettingsKeyboard(lang = "uz") {
  const kb = new InlineKeyboard();
  
  const labels = {
    moderation: t(lang, "keyboard_moderation") || "🛡 Moderatsiya",
    users: t(lang, "keyboard_users") || "👥 Foydalanuvchilar",
    reports: t(lang, "keyboard_reports") || "🚨 Shikoyatlar",
    channels: t(lang, "keyboard_channels") || "📢 Majburiy kanal",
    rules: t(lang, "keyboard_rules") || "📋 Qoidalar",
    stats: t(lang, "keyboard_stats") || "📊 Statistika",
    advanced: t(lang, "keyboard_advanced") || "🔧 Kengaytirilgan",
    close: t(lang, "keyboard_close") || "❌ Yopish",
  };

  return kb
    .text(labels.moderation, "settings:moderation")
    .row()
    .text(labels.users, "settings:users")
    .row()
    .text(labels.reports, "settings:reports")
    .row()
    .text(labels.channels, "settings:channels")
    .row()
    .text(labels.rules, "settings:rules")
    .row()
    .text(labels.stats, "settings:stats")
    .row()
    .text(labels.advanced, "settings:advanced")
    .row()
    .text(labels.close, "settings:close");
}
