// Bot egasi /admin panelida bir amalni bajarayotganda (masalan xabar matnini
// kutayotganda) shu holatni vaqtincha xotirada saqlaymiz. Server qayta ishga
// tushsa tozalanadi — bu normal, chunki bu faqat joriy amal uchun kerak.

const pendingActions = new Map();

export const ADMIN_ACTIONS = {
  BROADCAST_USERS: "broadcast_users",
  BROADCAST_GROUPS: "broadcast_groups",
  ADD_CHANNEL: "add_channel",
};

export function setPendingAction(ownerId, action) {
  pendingActions.set(String(ownerId), action);
}

export function getPendingAction(ownerId) {
  return pendingActions.get(String(ownerId)) || null;
}

export function clearPendingAction(ownerId) {
  pendingActions.delete(String(ownerId));
}
