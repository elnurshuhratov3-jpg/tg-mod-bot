import { PrismaClient } from "@prisma/client";

// Butun ilova bo'ylab bitta Prisma Client nusxasi ishlatiladi
// (har bir modulda qayta yaratilmasligi uchun)
const prisma = new PrismaClient();

export default prisma;
