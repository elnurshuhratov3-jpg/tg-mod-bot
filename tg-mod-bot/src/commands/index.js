import { helpCommand } from "./help.js";
import { settingsCommand } from "./settingsCommand.js";
import {
  warnCommand,
  unwarnCommand,
  muteCommand,
  unmuteCommand,
  banCommand,
  unbanCommand,
  kickCommand,
} from "./moderationCommands.js";
import { rulesCommand, setRulesCommand } from "./rulesCommand.js";
import { reportCommand } from "./reportCommand.js";
import { statsCommand } from "./statsCommand.js";
import {
  whitelistAddCommand,
  whitelistRemoveCommand,
  blacklistAddCommand,
  blacklistRemoveCommand,
  badWordAddCommand,
  badWordRemoveCommand,
} from "./listCommands.js";
import { channelAddCommand } from "./channelCommand.js";
import { startCommand } from "./startCommand.js";
import { adminCommand } from "./adminCommand.js";
import { whoisCommand } from "./whoisCommand.js";
import { deleteMessageCommand } from "./deleteCommand.js";
import { logChannelCommand } from "./logChannelCommand.js";
import { memberStatsCommand } from "./memberStatsCommand.js";
import { languageCommand } from "./languageCommand.js";
/**
 * Barcha buyruqlarni (commands) botga ulaydi.
 * Yangi buyruq qo'shilganda shu yerga import qilinadi.
 */
export function registerCommands(bot) {
  startCommand(bot);
  adminCommand(bot);
  helpCommand(bot);
  settingsCommand(bot);

  // Ochiq buyruqlar
  rulesCommand(bot);
  reportCommand(bot);
  statsCommand(bot);
  memberStatsCommand(bot);
  languageCommand(bot);

  // Admin: ogohlantirish va ban tizimi
  warnCommand(bot);
  unwarnCommand(bot);
  muteCommand(bot);
  unmuteCommand(bot);
  banCommand(bot);
  unbanCommand(bot);
  kickCommand(bot);

  // Admin: foydalanuvchi profili va xabarni o'chirish
  whoisCommand(bot);
  deleteMessageCommand(bot);

  // Admin: qoidalar
  setRulesCommand(bot);

  // Admin: oq/qora ro'yxat va yomon so'zlar
  whitelistAddCommand(bot);
  whitelistRemoveCommand(bot);
  blacklistAddCommand(bot);
  blacklistRemoveCommand(bot);
  badWordAddCommand(bot);
  badWordRemoveCommand(bot);

  // Admin: majburiy kanal va log-kanal
  channelAddCommand(bot);
  logChannelCommand(bot);
}
