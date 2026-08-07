const LINK_PATTERN =
  /(https?:\/\/|www\.|t\.me\/|telegram\.me\/|bit\.ly\/|tinyurl\.com\/)\S+/i;

/** Matnda havola (link) bor-yo'qligini tekshiradi */
export function containsLink(text) {
  if (!text) return false;
  return LINK_PATTERN.test(text);
}
