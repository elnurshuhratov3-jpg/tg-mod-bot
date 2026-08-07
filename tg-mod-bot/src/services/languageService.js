import prisma from "../database/prisma.js";
import { isSupportedLanguage, DEFAULT_LANGUAGE } from "../i18n/index.js";

export async function getGroupLanguage(groupId) {
  const group = await prisma.group.findUnique({
    where: {
      telegramId: BigInt(groupId),
    },
    select: {
      language: true,
    },
  });

  return group?.language && isSupportedLanguage(group.language)
    ? group.language
    : DEFAULT_LANGUAGE;
}

export async function setGroupLanguage(groupId, lang) {
  if (!isSupportedLanguage(lang)) return;

  await prisma.group.update({
    where: {
      telegramId: BigInt(groupId),
    },
    data: {
      language: lang,
    },
  });
}

export async function setBotUserLanguage(telegramId, lang) {
  if (!isSupportedLanguage(lang)) return;

  await prisma.botUser.updateMany({
    where: {
      telegramId: BigInt(telegramId),
    },
    data: {
      language: lang,
    },
  });
}

export async function getBotUserLanguage(telegramId) {
  const user = await prisma.botUser.findFirst({
    where: {
      telegramId: BigInt(telegramId),
    },
    select: {
      language: true,
    },
  });

  return user?.language && isSupportedLanguage(user.language)
    ? user.language
    : DEFAULT_LANGUAGE;
}