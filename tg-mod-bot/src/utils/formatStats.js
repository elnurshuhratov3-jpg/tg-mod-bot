import { t } from "../i18n/index.js";

/** Bugungi statistikani chiroyli Markdown xabar qilib formatlaydi */
export function formatStatsMessage(stats, lang = "uz") {
  const line = (key, count) => t(lang, key).replace("{count}", String(count));

  return (
    `${t(lang, "stats_title")}\n\n` +
    `${line("stats_deleted_messages", stats.deletedMessages)}\n` +
    `${line("stats_warns", stats.warningsGiven)}\n` +
    `${line("stats_bans", stats.bansGiven)}\n` +
    `${line("stats_mutes", stats.mutesGiven)}\n` +
    `${line("stats_spam_detected", stats.spamDetected)}\n` +
    `${line("stats_reports_received", stats.reportsReceived)}\n` +
    `${line("stats_links_deleted", stats.linksDeleted)}\n` +
    `${line("stats_files_deleted", stats.filesDeleted)}`
  );
}
