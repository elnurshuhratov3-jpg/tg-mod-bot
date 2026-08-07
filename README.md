# Telegram Guruh Moderatsiya Boti

grammY + PostgreSQL + Prisma asosida qurilgan, faqat Telegram ichida
(Inline Keyboard orqali) boshqariladigan moderatsiya boti.

## O'rnatish

```bash
npm install
cp .env.example .env
# .env faylini to'ldiring: BOT_TOKEN, DATABASE_URL, OWNER_ID (ixtiyoriy)

npx prisma migrate dev --name init
npm run dev
```

## Loyiha strukturasi

```
src/
├── commands/       -> /buyruqlar (masalan /qoidalar, /statistika)
├── events/         -> Telegram hodisalari (guruhga qo'shilish va h.k.)
├── middlewares/    -> o'rta dasturlar (guruh yaratish, majburiy kanal)
├── handlers/       -> callback_query / sozlamalar menyusi ishlov beruvchilari
├── filters/        -> havola, fayl, so'kinish, flood, caps, forward, reklama filtrlari
├── services/       -> biznes logika (statistika, ban, mute, shikoyat va h.k.)
├── keyboards/      -> inline klaviaturalar (sozlamalar menyusi)
├── database/       -> Prisma client
├── utils/          -> yordamchi funksiyalar
├── config/         -> bot va muhit sozlamalari
├── constants/      -> doimiy qiymatlar (limitlar, kengaytmalar)
├── models/         -> qo'shimcha domen modellar/tiplar
└── index.js        -> kirish nuqtasi

prisma/
└── schema.prisma   -> to'liq ma'lumotlar bazasi sxemasi
```

## Buyruqlar

**Ochiq:**
- `/start` — botni ishga tushirish (shaxsiy chatda xush kelibsiz xabari + "Guruhga qo'shish" tugmasi)
- `/yordam` — yordam xabari
- `/qoidalar` — guruh qoidalarini ko'rish
- `/hisobot` — xabarga javob berib shikoyat qilish
- `/statistika` — bugungi statistika

**Bot egasi (`OWNER_ID`) uchun:**
- `/admin` — boshqaruv paneli (inline tugmalar orqali):
  - 📊 Statistika — botdagi jami/faol foydalanuvchilar, guruhlar va barcha
    guruhlar bo'yicha moderatsiya statistikasi
  - 📢 Foydalanuvchilarga xabar — botdan foydalangan barcha shaxsiy chat
    foydalanuvchilariga xabar (matn/rasm/video/fayl) yuborish
  - 📣 Guruhlarga xabar — botga ulangan barcha guruhlarga xabar yuborish
  - 📡 Majburiy kanallar — botdan (shaxsiy chatda) foydalanish uchun
    majburiy obuna kanallarini qo'shish/o'chirish

**Admin — foydalanuvchi boshqaruvi** (xabarga javob qilib yuboriladi, yoki oxiriga ID qo'shiladi):
- `/ogohlantirish`, `/ogohlantirmaslik`
- `/ovozsiz [muddat]`, `/ovoz_yoqish` — masalan: `/ovozsiz 2soat`
- `/taqiqlash [muddat]`, `/taqiq_bekor` — masalan: `/taqiqlash 1kun`
- `/tepish`
- `/kim` — foydalanuvchi profilini ko'rish (ogohlantirish, mute/ban holati, qo'shilgan sana)
- `/ochirish` — xabarga javob qilib, o'sha xabarni o'chirish

**Ochiq:**
- `/azolar` — 1 kun/hafta/oy ichida nechta a'zo kirib-chiqqanini ko'rsatadi

**Admin — ro'yxatlar:**
- `/royxat_qoshish`, `/royxatdan_chiqarish` (oq ro'yxat)
- `/qora_royxat_qoshish`, `/qora_royxat_ochirish` (qora ro'yxat — avtomatik ban bilan)
- `/yomon_soz_qoshish <so'z>`, `/yomon_soz_ochirish <so'z>`

**Admin — qoidalar va kanallar:**
- `/qoidalarni_ornatish <matn>`
- `/kanal_qoshish @username` (bot o'sha kanalda admin bo'lishi shart)
- `/log_kanal @username` — moderatsiya harakatlari (ban/mute/warn/o'chirish) yuboriladigan log-kanal, `off` bilan o'chiriladi

**Sozlamalar menyusi:** `/sozlamalar` — barcha bo'limlar (Moderatsiya, Foydalanuvchilar,
Shikoyatlar, Majburiy kanal, Qoidalar, Statistika, Kengaytirilgan) inline tugmalar orqali boshqariladi.

## Yangi funksiyalar

- ⏱ **Vaqtinchalik mute/ban** — `/ovozsiz 2soat`, `/taqiqlash 1kun` kabi muddat bilan;
  Telegram'ning `until_date` mexanizmi orqali avtomatik tugaydi
- 🤖 **Captcha** — yangi a'zo "✅ Men botman emas" tugmasini bosmaguncha yoza olmaydi
  (5 daqiqa ichida bosmasa — avtomatik chiqarib yuboriladi)
- 🚨 **Anti-reyd** — qisqa vaqt ichida ko'p a'zo qo'shilsa, guruhga ogohlantirish beriladi
- 🐢 **Slow mode** — xabarlar orasida minimal kutish vaqtini belgilash
- 🧷 **Sticker/GIF spami** va **bir xil xabarni takroran yuborish** filtrlari
- 🧹 **Kirdi/chiqdi xabarlarini o'chirish** — "... guruhga qo'shildi/chiqdi" xizmat xabarlari
- 👥 **A'zolar statistikasi** — 1 kun/hafta/oyda kirgan-chiqqanlar soni (`/azolar`,
  sozlamalar menyusidagi "📊 Statistika" bo'limi)
- 📅 **Haftalik/oylik statistika** va 🏆 **eng faol adminlar reytingi**
- 📡 **Log-kanal** — barcha moderatsiya harakatlari alohida kanalga yoziladi

## Hozirgi holat

- ✅ Prisma sxema — barcha modellar va sozlamalar
- ✅ Guruh avtomatik yaratilishi (bot qo'shilganda / xabar kelganda)
- ✅ Moderatsiya filtrlari: havola, fayl (apk/zip/exe/rar/xapk/apkm va h.k.),
  yomon so'z, CAPS, emoji spami, flood/spam, forward, reklama
- ✅ Ogohlantirish tizimi (avtomatik ban), mute/ban/kick, oq/qora ro'yxat
- ✅ Shikoyat tizimi (`/hisobot`, limit, admin tasdiqlash/bekor qilish)
- ✅ Majburiy kanal (a'zolikni tekshirish, qo'shish/o'chirish, yoqish/o'chirish)
- ✅ Qoidalar (`/qoidalar`, `/qoidalarni_ornatish`)
- ✅ Kunlik statistika (`/statistika`, sozlamalar menyusidagi bo'lim)
- ✅ To'liq sozlamalar menyusi — barcha bo'limlar ishlaydi
- ✅ `/start` buyrug'i (avval ro'yxatdan o'tkazilmagan edi — endi ishlaydi)
- ✅ Bot egasi paneli (`/admin`): umumiy statistika, foydalanuvchi/guruhlarga
  xabar yuborish (broadcast), umumiy majburiy obuna kanallarini boshqarish
- ✅ Render (va shu kabi hostinglar) uchun health-check HTTP server

## Diqqat

- Yangi funksiyalar (captcha, anti-reyd, slow mode, sticker/duplicate spam,
  log-kanal, vaqtinchalik ban, a'zolar statistikasi) uchun bazaga yangi
  maydonlar/jadval qo'shildi — ishga tushirishdan oldin albatta
  `npx prisma migrate dev` (yoki `prisma migrate deploy`) bajaring.
- `requiredChannelsEnabled` maydoni sxemaga qo'shildi — birinchi marta
  ishga tushirishdan oldin `npx prisma migrate dev` bajaring.
- Reklama filtri (`adFilter`) oddiy kalit so'zlar ro'yxatiga asoslangan
  (`src/constants/index.js` dagi `AD_KEYWORDS`) — kerak bo'lsa kengaytiring.
- Bu loyiha tarmoqqa ulanmagan muhitda yozilgani uchun `npm install` va
  `prisma generate` hali ishga tushirilmagan — birinchi marta ishga
  tushirishdan oldin buni bajarishni unutmang.
- `/admin` panelidan foydalanish uchun `.env` faylida `OWNER_ID` — bot
  egasining shaxsiy Telegram ID raqami — to'g'ri o'rnatilgan bo'lishi shart.
- Captcha va anti-reyd holati xotirada (RAM) saqlanadi — bot qayta ishga
  tushganda tozalanadi, bu normal (yangi hisob boshlanadi).

## Render'ga deploy qilish

Bot uzun so'rov (long polling) rejimida ishlaydi va o'zi HTTP so'rov
qabul qilmaydi. Lekin Render'ning **Web Service** turi deploy paytida
istalgan portni tinglashni talab qiladi, aks holda "No open ports
detected" xatosi bilan vaqt tugab, xizmat to'xtaydi — shu sababli bot
ishlab tursa ham tashqaridan "ishlamayapti" bo'lib ko'rinardi.

Buni tuzatish uchun `src/index.js`ga faqat health-check uchun minimal
HTTP server qo'shildi — u `PORT` muhit o'zgaruvchisini (Render avtomatik
beradi) tinglaydi. Qo'shimcha sozlash shart emas, shunchaki qaytadan
deploy qiling.

Muqobil variant: agar xohlasangiz, Render'da xizmat turini **Background
Worker** qilib o'zgartirsangiz ham bo'ladi — bu holda port talab
qilinmaydi.
