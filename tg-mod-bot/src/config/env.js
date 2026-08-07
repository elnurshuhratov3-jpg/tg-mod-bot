import "dotenv/config";

function required(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Muhit o'zgaruvchisi topilmadi: ${name} (.env faylini tekshiring)`);
  }
  return value;
}

export const env = {
  BOT_TOKEN: required("BOT_TOKEN"),
  DATABASE_URL: required("DATABASE_URL"),
  NODE_ENV: process.env.NODE_ENV || "development",
  OWNER_ID: process.env.OWNER_ID ? BigInt(process.env.OWNER_ID) : null,
};
