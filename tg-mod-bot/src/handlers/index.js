import { registerSettingsHandlers } from "./settingsHandler.js";
import { registerUsersHandlers } from "./usersHandler.js";
import { registerReportsHandlers } from "./reportsHandler.js";
import { registerChannelsHandlers } from "./channelsHandler.js";
import { registerRulesHandlers } from "./rulesHandler.js";
import { registerStatsHandlers } from "./statsHandler.js";
import { registerAdvancedHandlers } from "./advancedHandler.js";
import { registerAdminHandlers } from "./adminHandler.js";
import { registerGlobalChannelsHandlers } from "./globalChannelsHandler.js";
import { registerCaptchaHandlers } from "./captchaHandler.js";
import { registerLanguageHandlers } from "./languageHandler.js";

/**
 * Barcha callback_query handlerlarini (tugma bosishlarini) botga ulaydi.
 */
export function registerHandlers(bot) {
  registerSettingsHandlers(bot);
  registerUsersHandlers(bot);
  registerReportsHandlers(bot);
  registerChannelsHandlers(bot);
  registerRulesHandlers(bot);
  registerStatsHandlers(bot);
  registerAdvancedHandlers(bot);
  registerGlobalChannelsHandlers(bot);
  registerCaptchaHandlers(bot);
  registerLanguageHandlers(bot);
  // admin handler oxirida turishi kerak: u umumiy "message" listenerini ham o'z ichiga oladi
  registerAdminHandlers(bot);
}
