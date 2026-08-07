import prisma from "../database/prisma.js";

const DEFAULT_RULES = "Qoidalar hali o'rnatilmagan.";

/** Guruh qoidalari matnini qaytaradi */
export async function getRuleText(groupId) {
  const rule = await prisma.rule.findUnique({ where: { groupId } });
  return rule?.content?.trim() ? rule.content : DEFAULT_RULES;
}

/** Guruh qoidalari matnini yangilaydi (yozuv bo'lmasa yaratadi) */
export async function setRuleText(groupId, content) {
  return prisma.rule.upsert({
    where: { groupId },
    update: { content },
    create: { groupId, content },
  });
}
