/**
 * Telegram'ning (eski) Markdown formatida "_", "*", "`", "[", "]"
 * belgilari maxsus ma'no anglatadi (kursiv, qalin, kod, havola).
 * Foydalanuvchi ismi yoki username'i ichida shu belgilar bo'lsa
 * (masalan "Ali_Vali", "A[B]", "user_name"), ularni escape qilmasdan
 * xabar matniga qo'yilsa, Telegram buni yopilmagan formatlash belgisi
 * deb hisoblab "can't parse entities" xatosi bilan xabarni yubormaydi.
 *
 * Shuning uchun `parse_mode: "Markdown"` bilan yuboriladigan har qanday
 * xabarga foydalanuvchi tomonidan belgilanadigan matn (ism, username,
 * mention) qo'shilsa — avval shu funksiya orqali o'tkaziladi.
 */
export function escapeMarkdown(text) {
  return String(text ?? "").replace(/([_*`[\]])/g, "\\$1");
}
