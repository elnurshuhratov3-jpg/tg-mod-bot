import { registerChatMemberEvents } from "./chatMember.js";
import { registerMemberEvents } from "./memberEvents.js";

/**
 * Barcha hodisalarni (events) botga ulaydi.
 * Yangi hodisa qo'shilganda shu yerga import qilinadi.
 */
export function registerEvents(bot) {
  registerChatMemberEvents(bot);
  registerMemberEvents(bot);
}
