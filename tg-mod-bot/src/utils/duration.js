// "1h", "2soat", "3kun", "1w", "1hafta", "30m" kabi qisqa muddat
// yozuvlarini millisekundga aylantiradi (vaqtinchalik mute/ban uchun).

const UNIT_MS = {
  m: 60_000,
  min: 60_000,
  daq: 60_000,
  h: 3_600_000,
  soat: 3_600_000,
  d: 86_400_000,
  kun: 86_400_000,
  w: 604_800_000,
  hafta: 604_800_000,
};

/**
 * Matnni muddat sifatida ajratib olishga urinadi (masalan "2soat", "1d").
 * Mos kelmasa (masalan bu shunchaki sabab matni bo'lsa) — null qaytaradi.
 */
export function parseDuration(token) {
  if (!token) return null;

  const match = token.trim().toLowerCase().match(/^(\d+)\s*([a-z']+)$/i);
  if (!match) return null;

  const amount = Number(match[1]);
  const unitMs = UNIT_MS[match[2]];
  if (!amount || !unitMs) return null;

  return amount * unitMs;
}

/** Millisekundni "2 soat", "3 kun" kabi o'qish uchun qulay matnga aylantiradi */
export function formatDuration(ms) {
  if (!ms || ms <= 0) return "";

  const minutes = Math.round(ms / 60_000);
  if (minutes < 60) return `${minutes} daqiqa`;

  const hours = Math.round(ms / 3_600_000);
  if (hours < 24) return `${hours} soat`;

  const days = Math.round(ms / 86_400_000);
  if (days < 7) return `${days} kun`;

  const weeks = Math.round(ms / 604_800_000);
  return `${weeks} hafta`;
}
