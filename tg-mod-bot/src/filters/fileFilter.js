import { BLOCKED_FILE_EXTENSIONS } from "../constants/index.js";

/**
 * Fayl nomi va guruhning filtr sozlamalariga qarab, shu faylni
 * bloklash kerakligini aniqlaydi. Har bir asosiy kengaytma o'z
 * sozlamasiga ega (masalan APK filtri alohida yoqilib/o'chirilishi
 * mumkin); qolganlari (.7z, .bat, .cmd, .msi) doim bloklanadi.
 */
export function isBlockedFile(fileName, filterSettings) {
  if (!fileName || !fileName.includes(".")) return false;

  const ext = "." + fileName.split(".").pop().toLowerCase();

  const toggleMap = {
    ".apk": filterSettings.apkFilter,
    ".apkm": filterSettings.apkmFilter,
    ".xapk": filterSettings.xapkFilter,
    ".exe": filterSettings.exeFilter,
    ".zip": filterSettings.zipFilter,
    ".rar": filterSettings.rarFilter,
  };

  if (ext in toggleMap) {
    return Boolean(toggleMap[ext]);
  }

  return BLOCKED_FILE_EXTENSIONS.includes(ext);
}
