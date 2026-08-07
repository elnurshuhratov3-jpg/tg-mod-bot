/**
 * Xabar yuborgan foydalanuvchi shu guruhda admin yoki egasi ekanligini
 * tekshiradi. Adminlar barcha filtrlardan ozod qilinadi.
 */
export async function isChatAdmin(ctx) {
  if (!ctx.from || !ctx.chat) return false;

  try {
    const member = await ctx.getChatMember(ctx.from.id);
    return member.status === "administrator" || member.status === "creator";
  } catch {
    return false;
  }
}
