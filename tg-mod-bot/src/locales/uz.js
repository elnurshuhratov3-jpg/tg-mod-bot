export default {
  // ===== LANGUAGE SYSTEM =====
  language_prompt: "🌐 Tilni tanlang:",
  language_current: "Joriy til: 🇺🇿 O'zbekcha",
  language_set: "✅ Til 🇺🇿 O'zbekchaga o'rnatildi.",
  language_name: "O'zbekcha",
  language_back: "⬅️ Orqaga",

  // ===== START COMMAND =====
  start_welcome: "👋 Assalomu alaykum, {{displayName}}!\n\n🛡️ *TOZAA GURUH BOT* ga xush kelibsiz.\n\nMen Telegram guruhlarini avtomatik himoya qiluvchi moderator botman.\n\n👇 Botni guruhingizga qo'shish uchun quyidagi tugmani bosing.",
  start_group_response: "✅ Men bu guruhda ishlashga tayyorman!",
  start_add_to_group: "➕ {{displayName}}, guruhga qo'shish",

  // ===== HELP COMMAND =====
  help_title: "🤖 *Yordam*\n\n",
  help_public_commands: "*Ochiq buyruqlar:*\n",
  help_start: "`/start` — botni ishga tushirish\n",
  help_help: "`/yordam` — shu xabar\n",
  help_admin: "`/admin` — bot egasi paneli\n",
  help_rules: "`/qoidalar` — guruh qoidalarini ko'rish\n",
  help_report: "`/hisobot` — xabarga javob berib shikoyat qilish\n",
  help_stats: "`/statistika` — bugungi statistika\n",
  help_members: "`/azolar` — 1 kun/hafta/oyda kirgan-chiqqan a'zolar soni\n",
  help_language: "`/til` — bot javob tilini tanlash\n\n",
  help_user_management: "*Admin: foydalanuvchi boshqaruvi* (xabarga javob qilib yuboriladi):\n",
  help_warn: "`/ogohlantirish` — ogohlantirish berish\n",
  help_unwarn: "`/ogohlantirmaslik` — oxirgi ogohlantirishni olib tashlash\n",
  help_mute: "`/ovozsiz [muddat]` — ovozdan mahrum qilish, masalan: `/ovozsiz 2soat`\n",
  help_unmute: "`/ovoz_yoqish` — ovozni qayta yoqish\n",
  help_ban: "`/taqiqlash [muddat]` — bloklash, masalan: `/taqiqlash 1kun`\n",
  help_unban: "`/taqiq_bekor` — blokdan chiqarish\n",
  help_kick: "`/tepish` — guruhdan chiqarish\n",
  help_whois: "`/kim` — foydalanuvchi profilini ko'rish\n",
  help_delete: "`/ochirish` — xabarga javob qilib, o'sha xabarni o'chirish\n\n",
  help_lists: "*Admin: ro'yxatlar* (xabarga javob qilib yuboriladi):\n",
  help_whitelist_add: "`/royxat_qoshish` — oq ro'yxatga qo'shish\n",
  help_whitelist_remove: "`/royxatdan_chiqarish` — oq ro'yxatdan chiqarish\n",
  help_blacklist_add: "`/qora_royxat_qoshish` — qora ro'yxatga qo'shish\n",
  help_blacklist_remove: "`/qora_royxat_ochirish` — qora ro'yxatdan chiqarish\n\n",
  help_badwords: "*Admin: yomon so'zlar:*\n",
  help_badword_add: "`/yomon_soz_qoshish <so'z>` — ro'yxatga qo'shish\n",
  help_badword_remove: "`/yomon_soz_ochirish <so'z>` — ro'yxatdan chiqarish\n\n",
  help_channels: "*Admin: qoidalar va kanallar:*\n",
  help_set_rules: "`/qoidalarni_ornatish <matn>` — qoidalarni yangilash\n",
  help_add_channel: "`/kanal_qoshish @username` — majburiy kanal qo'shish\n",
  help_log_channel: "`/log_kanal @username` — moderatsiya loglari uchun kanal o'rnatish\n\n",
  help_advanced: "Kengaytirilgan sozlamalar `/sozlamalar` orqali ochiladi.",

  // ===== SETTINGS COMMAND =====
  settings_only_groups: "Bu buyruq faqat guruhlarda ishlaydi.",
  settings_admin_only: "⛔ Sozlamalarni faqat adminlar ochishi mumkin.",
  settings_title: "⚙️ *Bot Sozlamalari*\n\nKerakli bo'limni tanlang:",

  // ===== ERROR MESSAGES =====
  error_admin_only: "⛔ Bu buyruq faqat adminlar uchun.",
  error_not_admin: "⛔ Siz admin emassiz.",
  error_reply_required: "Xabarni javob sifatida tanlang.",
  error_user_not_found: "❌ Foydalanuvchi topilmadi.",
  error_invalid_duration: "❌ Muddat formati noto'g'ri. Masalan: 2soat, 30minut, 1kun",
  error_invalid_format: "❌ Format noto'g'ri.",
  error_group_only: "Bu buyruq faqat guruhlarda ishlaydi.",
  error_target_required: "Foydalanuvchini belgilang: uning xabariga *javob* (reply) qilib buyruqni yuboring, yoki oxiriga uning ID raqamini qo'shing.\\nMasalan: `/taqiqlash 123456789 sabab`",
  error_group_not_found: "Guruh topilmadi, birozdan so'ng qayta urinib ko'ring.",
  error_restrict_failed: "Foydalanuvchini cheklab bo'lmadi (bot admin huquqlarini tekshiring).",
  error_unmute_failed: "Ovozni yoqib bo'lmadi (bot admin huquqlarini tekshiring).",
  error_unban_failed: "Blokdan chiqarib bo'lmadi.",
  error_kick_failed: "Foydalanuvchini chiqarib bo'lmadi (bot admin huquqlarini tekshiring).",
  
  // ===== SUCCESS MESSAGES =====
  success_saved: "✅ Saqlandi.",
  success_updated: "✅ Yangilandi.",
  success_deleted: "✅ O'chirildi.",

  // ===== KEYBOARD BUTTONS =====
  keyboard_moderation: "🛡 Moderatsiya",
  keyboard_users: "👥 Foydalanuvchilar",
  keyboard_reports: "🚨 Shikoyatlar",
  keyboard_channels: "📢 Majburiy kanal",
  keyboard_rules: "📋 Qoidalar",
  keyboard_stats: "📊 Statistika",
  keyboard_advanced: "🔧 Kengaytirilgan",
  keyboard_close: "❌ Yopish",

  // ===== MODERATION COMMANDS =====
  warn_title: "⚠️ *Foydalanuvchi ogohlantirildi*",
  warn_message: "⚠️ {username} ogohlantirildi.\n\nSabab: {reason}\nOgohlantirish: {warns}",
  warn_banned: "🚫 {username} ogohlantirish limitidan oshgani uchun bloklandi.",
  warn_user_dm: "⚠️ Siz {group} guruhida ogohlantirildi.\n\nSabab: {reason}",
  warn_error: "❌ Foydalanuvchini ogohlantirilmadi.",

  unwarn_title: "✅ *Ogohlantirishni olib tashlandi*",
  unwarn_message: "✅ {username} uchun bitta ogohlantirish olib tashlandi.\nQolgan ogohlantirishlar: {warns}",
  unwarn_no_warns: "Bu foydalanuvchida ogohlantirish topilmadi.",

  ban_title: "🚫 *Foydalanuvchi ban qilindi*",
  ban_message: "🚫 {username} guruhdan bloklandi{duration}.\nSabab: {reason}",
  ban_message_timed: "🚫 @{username} {duration} vaqtga ban qilindi.\n\nSabab: {reason}",
  ban_user_dm: "🚫 Siz {group} guruhida ban qilindiz.\n\nSabab: {reason}",

  unban_title: "✅ *Ban olib tashlandi*",
  unban_message: "✅ {username} blokdan chiqarildi.",
  unban_not_banned: "Bu foydalanuvchi blokda emas.",

  mute_title: "🔇 *Foydalanuvchi ovozsiz qilindi*",
  mute_message: "🔇 {username} ovozdan mahrum qilindi{duration}.\nSabab: {reason}",
  mute_user_dm: "🔇 Siz {group} guruhida {duration} vaqtga ovozsiz qilindiz.\n\nSabab: {reason}",

  unmute_title: "🔊 *Ovozsiz qilish olib tashlandi*",
  unmute_message: "🔊 {username} ovozi qayta yoqildi.",
  unmute_not_muted: "❌ Bu foydalanuvchi ovozsiz emas.",

  kick_title: "👉 *Foydalanuvchi guruhdan chiqarildi*",
  kick_message: "👢 {username} guruhdan chiqarib yuborildi (qayta kirishi mumkin).\nSabab: {reason}",
  kick_user_dm: "👉 Siz {group} guruhidan chiqarildiz.\n\nSabab: {reason}",

  // ===== RULES COMMAND =====
  rules_title: "📋 *Guruh Qoidalari*\n\n",
  rules_no_rules: "❌ Bu guruhda qoidalar o'rnatilmagan.",
  rules_set_success: "✅ Qoidalar saqlandi.",
  rules_set_error: "❌ Qoidalarni saqlashda xatolik.",

  // ===== REPORT COMMAND =====
  report_title: "🚨 *Shikoyat*",
  report_success: "✅ Shikoyatiniz adminlarga yuborildi.",
  report_message: "🚨 *Yangi Shikoyat*\n\nGuruh: {group}\nFoydalanuvchi: @{username}\nShikoyat: {reason}",
  report_no_reply: "❌ Xabarni javob sifatida tanlang.",
  report_self: "❌ Siz o'zingiz haqida shikoyat qila olmaysiz.",

  // ===== STATS COMMAND =====
  stats_title: "📊 *Bugungi statistika*",
  stats_messages_today: "📨 Bugun xabarlari: {count}",
  stats_members_joined: "➕ Kirganlar: {count}",
  stats_members_left: "➖ Chiqaganlar: {count}",
  stats_warns: "⚠️ Ogohlantirishlar: {count}",
  stats_bans: "🚫 Banlar: {count}",
  stats_mutes: "🔇 Mutelar: {count}",
  stats_deleted_messages: "🗑 O'chirilgan xabarlar: {count}",
  stats_spam_detected: "🕵️ Spam aniqlandi: {count}",
  stats_reports_received: "🚨 Shikoyatlar: {count}",
  stats_links_deleted: "🔗 O'chirilgan havolalar: {count}",
  stats_files_deleted: "📁 O'chirilgan fayllar: {count}",

  // ===== MEMBER STATS =====
  member_stats_title: "👤 *Foydalanuvchi Statistikasi*",
  member_stats_user: "Foydalanuvchi: @{username}",
  member_stats_messages: "Xabarlari: {count}",
  member_stats_warns: "Ogohlantirish: {count}",
  member_stats_joined: "Kirilgan vaqt: {date}",

  // ===== MEMBERS ACTIVITY (/azolar) =====
  members_stats_title: "👥 *A'zolar statistikasi*",
  members_period_day: "1 kunda",
  members_period_week: "1 haftada",
  members_period_month: "1 oyda",
  members_stats_line: "*{label}:* ➕ kirdi {joins} / ➖ chiqdi {leaves}",

  // ===== FILTERS =====
  filter_bad_words: "🚫 Yomon so'z aniqlandi.",
  filter_bad_words_deleted: "🚫 Xabar yomon so'z tufayli o'chirildi.",
  filter_spam_link: "🔗 Spam havola aniqlandi.",
  filter_spam_link_deleted: "🔗 Xabar spam havola tufayli o'chirildi.",
  filter_flood: "💬 Flood aniqlandi.",
  filter_flood_deleted: "💬 Xabar flood tufayli o'chirildi.",
  filter_caps: "🔤 Katta harflar o'lchovini oshirdi.",
  filter_caps_deleted: "🔤 Xabar katta harflar tufayli o'chirildi.",
  filter_emoji: "😂 Juda ko'p emoji.",
  filter_emoji_deleted: "😂 Xabar emoji tufayli o'chirildi.",
  filter_forward: "↩️ Xabarni o'tkazish taqiqlangan.",
  filter_forward_deleted: "↩️ O'tkazilgan xabar o'chirildi.",

  // ===== CHANNELS =====
  channels_title: "📢 *Majburiy Kanallar*",
  channels_add_success: "✅ Kanal qo'shildi.",
  channels_remove_success: "✅ Kanal olib tashlandi.",
  channels_list: "📢 Kanallar:\n{list}",
  channels_no_channels: "❌ Majburiy kanallar belgilanmagan.",
  channels_join_required: "❌ Guruhga kirishdan oldin quyidagi kanallarga obuna bo'ling:\n{channels}",

  // ===== ADMIN PANEL =====
  admin_title: "🔧 *Admin Paneli*",
  admin_unauthorized: "❌ Siz admin panelini ochish huquqiga ega emassiz.",
  admin_back: "⬅️ Orqaga",

  // ===== WHOIS COMMAND =====
  whois_title: "👤 *Foydalanuvchi Ma'lumotlari*",
  whois_user_id: "ID: {id}",
  whois_username: "Foydalanuvchi: @{username}",
  whois_first_name: "Ismi: {first_name}",
  whois_last_name: "Familiyasi: {last_name}",
  whois_status: "Status: {status}",
  whois_warns: "Ogohlantirish: {warns}",
  whois_banned: "Ban: {banned}",
  whois_muted: "Ovozsiz: {muted}",
  whois_joined: "Kirrilgan: {date}",
  whois_user_word: "Foydalanuvchi",
  whois_reply_required: "Foydalanuvchi xabariga *javob* (reply) qilib `/kim` yuboring.",
  whois_profile_title: "👤 {user} profili",
  whois_status_label: "Holati: {status}",
  whois_status_banned: "🚫 Bloklangan",
  whois_status_muted: "🔇 Ovozdan mahrum",
  whois_status_normal: "🟢 Odatiy holat",
  whois_warnings_line: "⚠️ Ogohlantirishlar: {count}",
  whois_deleted_line: "🗑 O'chirilgan xabarlar: {count}",
  whois_joined_line: "📅 Guruhga birinchi qo'shilgan: {date}",
  whois_unknown_date: "Noma'lum",

  // ===== DELETE COMMAND =====
  delete_success: "✅ Xabar o'chirildi.",
  delete_error: "❌ Xabarni o'chirib bo'lmadi (u allaqachon o'chirilgan yoki juda eski bo'lishi mumkin).",
  delete_no_reply: "O'chirmoqchi bo'lgan xabarga *javob* (reply) qilib `/ochirish` yuboring.",

  // ===== SETTINGS HANDLER =====
  settings_moderation: "🛡 Moderatsiya",
  settings_filters: "🔒 Filtrlar",
  settings_automod: "🤖 AutoMod",
  settings_captcha: "✅ Captcha",
  settings_bad_words: "❌ Yomon so'zlar",
  settings_links: "🔗 Havolar",
  settings_flood: "💬 Flood",
  settings_caps: "🔤 Katta harflar",

  // ===== USER MANAGEMENT =====
  users_list: "👥 *Foydalanuvchilar*",
  users_whitelist: "⚪ Oq Ro'yxat",
  users_blacklist: "⚫ Qora Ro'yxat",
  users_add_whitelist: "✅ Oq ro'yxatga qo'shildi.",
  users_remove_whitelist: "❌ Oq ro'yxatdan chiqarildi.",
  users_add_blacklist: "🚫 Qora ro'yxatga qo'shildi.",
  users_remove_blacklist: "⚫ Qora ro'yxatdan chiqarildi.",

  // ===== ADVANCED SETTINGS =====
  advanced_title: "🔧 *Kengaytirilgan Sozlamalar*",
  advanced_raid_protection: "🛡 Raid Himoyasi",
  advanced_captcha_required: "✅ Captcha Majburiy",
  advanced_global_channels: "📡 Global Kanallar",
  advanced_save_logs: "📝 Loglari Saqlash",

  // ===== LIST COMMANDS =====
  whitelist_add_success: "oq ro'yxatga qo'shildi.",
  whitelist_remove_success: "oq ro'yxatdan chiqarildi.",
  blacklist_add_success: "qora ro'yxatga qo'shildi va bloklandi.",
  blacklist_add_reason: "Admin tomonidan qo'shildi",
  blacklist_remove_success: "qora ro'yxatdan chiqarildi.",
  badword_add_usage: "So'zni kiriting.\nMasalan: `/yomon_soz_qoshish soz`",
  badword_add_success: "{word} yomon so'zlar ro'yxatiga qo'shildi.",
  badword_remove_usage: "So'zni kiriting.\nMasalan: `/yomon_soz_ochirish soz`",
  badword_remove_success: "{word} yomon so'zlar ro'yxatidan chiqarildi.",

  // ===== CHANNEL COMMANDS =====
  channel_add_usage: "Kanal username'ini kiriting.\nMasalan: `/kanal_qoshish @mening_kanalim`\n\nEslatma: bot o'sha kanalda administrator bo'lishi shart.",
  channel_not_found: "Kanal topilmadi. Username to'g'riligini va bot o'sha kanalda admin ekanini tekshiring.",
  channel_add_success: "✅ Kanal qo'shildi: {title}",

  // ===== LOG CHANNEL COMMAND =====
  log_channel_usage:
    "Kanal username'ini kiriting.\nMasalan: `/log_kanal @mening_log_kanalim`\nO'chirish uchun: `/log_kanal off`\n\nEslatma: bot o'sha kanalda administrator bo'lishi shart.",
  log_channel_removed: "✅ Log-kanal o'chirildi.",
  log_channel_set: "✅ Log-kanal o'rnatildi: {{title}}",

  // ===== ERROR MESSAGES =====
  error_owner_only: "⛔ Bu buyruq faqat bot egasi uchun.",
  error_reply_user: "❌ Foydalanuvchi xabariga javob qilib yuboring.",
  admin_choose_section: "Quyidagi bo'limlardan birini tanlang:",

  // ===== HANDLERS =====
  captcha_not_for_you: "❗ Bu captcha sizga tegishli emas.",
  captcha_verified: "✅ Tasdiqlandi! Endi yozishingiz mumkin.",
  captcha_verify_failed: "⚠️ Tasdiqlandingiz, lekin bot sizni ovozsizlikdan chiqara olmadi — botga guruhda \"A'zolarni cheklash\" admin huquqini bering va qaytadan urinib ko'ring.",
  channels_not_joined: "❗ Siz hali barcha kanallarga a'zo bo'lmagansiz.",
  thank_you: "✅ Rahmat!",
  rules_title: "Joriy qoidalar:",
  rules_change_instruction: "Qoidalarni o'zgartirish uchun:\n`/qoidalarni_ornatish <yangi matn>`",
  list_empty: "Ro'yxat bo'sh.",
  users_description: "⚪ *Oq ro'yxat* — barcha filtrlardan ozod qilingan foydalanuvchilar.\n⚫ *Qora ro'yxat* — guruhga yozishga urinishi bilanoq bloklanadigan foydalanuvchilar.\n\nQo'shish uchun foydalanuvchi xabariga javob qilib buyruq yuboring:\n`/royxat_qoshish` — oq ro'yxatga\n`/royxatdan_chiqarish` — oq ro'yxatdan\n`/qora_royxat_qoshish` — qora ro'yxatga\n`/qora_royxat_ochirish` — qora ro'yxatdan",

  // ===== SETTINGS HANDLERS =====
  settings_title: "⚙️ *Bot Sozlamalari*\n\nKerakli bo'limni tanlang:",
  settings_error_not_found: "Xatolik: sozlamalar topilmadi.",
  settings_moderation_title: "🛡 *Moderatsiya*\n\nFiltrni yoqish/o'chirish uchun bosing:",
  settings_filter_unknown: "Noma'lum sozlama.",
  settings_toggle_on: "✅ Yoqildi",
  settings_toggle_off: "⛔ O'chirildi",
  settings_admin_only: "⛔ Bu tugma faqat adminlar uchun.",
  
  // ===== CHANNELS HANDLERS =====
  channels_title: "📡 *Majburiy kanallar*\n\n",
  channels_empty: "📋 Hozircha majburiy kanallar qo'shilmagan.",
  channels_list_title: "📋 *Kanallar ro'yxati* (o'chirish uchun bosing):",
  channels_remove_success: "✅ Kanal o'chirildi.",
  
  // ===== USERS HANDLERS =====
  users_whitelist_title: "⚪ *Oq Ro'yxat*",
  users_blacklist_title: "⚫ *Qora Ro'yxat*",
  users_whitelist_empty: "⚪ Oq ro'yxat bo'sh.",
  users_blacklist_empty: "⚫ Qora ro'yxat bo'sh.",
  
  // ===== REPORTS HANDLERS =====
  reports_title: "🚨 *Shikoyatlar*\n\n",
  reports_limit_info: "Joriy limit: *{limit}* ta shikoyat\n\nKutilayotgan shikoyatlar: *{pending}*\n\n",
  reports_set_limit_title: "🔢 Shikoyat limitini tanlang:",
  reports_limit_set: "✅ Limit {limit} ga o'rnatildi.",
  reports_no_pending: "❌ Shikoyatlar bekor qilindi, hech qanday chora ko'rilmadi.",
  
  // ===== RULES HANDLERS =====
  rules_set_title: "📋 Joriy qoidalar:",
  rules_no_rules: "Qoidalar belgilanmagan.",
  rules_change_instruction: "Qoidalarni o'zgartirish uchun:\n`/qoidalarni_ornatish <yangi matn>`",
  
  // ===== ADMIN HANDLERS =====
  admin_title: "👑 *Admin Panel*",
  admin_menu: "👑 *Admin Panel*\n\nKerakli bo'limni tanlang:",
  admin_menu_closed: "Panel yopildi.",
  admin_stats_title: "📊 *Bot Statistikasi (Global)*",
  admin_broadcast_title: "📢 *Barcha guruhlarga xabar jo'natish*",
  admin_broadcast_success: "✅ Xabar {target} yuborildi.\n\n📨 Yuborildi: *{sent}*\n❌ Yuborilmadi: *{failed}*",
  admin_channels_title: "📡 *Global Kanallar*",
  admin_channels_empty: "Hech qanday global kanal yo'q.",
  admin_close_panel: "❌ Panelni Yopish",
  
  // ===== ADVANCED HANDLERS =====
  advanced_title: "🔧 *Kengaytirilgan sozlamalar*\n\nKerakli bo'limni tanlang:",
  advanced_warns_title: "⚠️ Nechta ogohlantirishdan keyin avtomatik ban qilinsin?",
  advanced_warns_set: "✅ {value} ga o'rnatildi.",
  advanced_flood_title: "🚫 Necha xabardan keyin spam deb hisoblansin?",
  advanced_flood_set: "✅ {value} ga o'rnatildi.",
  advanced_flood_time_title: "⏱ Necha soniyalik oynada hisoblansin?",
  advanced_flood_time_set: "✅ {value}s ga o'rnatildi.",
  advanced_emoji_title: "😊 Bitta xabarda nechta emojidan ko'p bo'lmasin?",
  advanced_emoji_set: "✅ {value} ga o'rnatildi.",
  advanced_caps_title: "🔠 Bosh harflar foizi qanchadan oshsa o'chirilsin?",
  advanced_caps_set: "✅ {value}% ga o'rnatildi.",
  advanced_slow_mode_title: "🐢 Xabarlar orasida kamita necha soniya kutilsin? (0 — o'chirilgan)",
  advanced_slow_mode_set: "✅ {value}s ga o'rnatildi.",
  
  // ===== STATS HANDLERS =====
  stats_title: "📊 *Statistika*",
  stats_loading: "⏳ Yuklanyapti...",
  
  // ===== KEYBOARDS =====
  keyboard_settings: "⚙️ Sozlamalar",
  keyboard_moderation_filter: "🛡 Moderatsiya",
  keyboard_users_list: "👥 Foydalanuvchilar",
  keyboard_channels_list: "📡 Kanallar",
  keyboard_rules_view: "📋 Qoidalar",
  keyboard_stats_view: "📊 Statistika",
  keyboard_advanced_settings: "🔧 Kengaytirilgan",
  keyboard_admin_panel: "👑 Admin",
  keyboard_back: "⬅️ Orqaga",
  keyboard_close: "❌ Yopish",
  keyboard_on: "✅ Yoqilgan",
  keyboard_off: "⛔ O'chirilgan",



  // ===== FILTERS =====
  link_filter: "Havola filtri",
  badwords_filter: "Yomon so'zlar filtri",
  apk_filter: "APK filtri",
  zip_filter: "ZIP filtri",
  exe_filter: "EXE filtri",
  rar_filter: "RAR filtri",
  xapk_filter: "XAPK filtri",
  apkm_filter: "APKM filtri",
  flood_filter: "Flood himoyasi",
  spam_filter: "Spamga qarshi",
  forward_filter: "Forward himoyasi",
  emoji_filter: "Emoji spami",
  caps_filter: "CAPS (katta harflar) filtri",
  ad_filter: "Reklama filtri",
  sticker_filter: "Sticker/GIF spami",
  duplicate_filter: "Takroriy xabar spami",
  captcha_filter: "Captcha (yangi a'zolar)",
  raid_filter: "Anti-reyd himoyasi",
  service_messages_filter: "Kirdi/chiqdi xabarlarini o'chirish",

  // ===== MODERATION FILTER MESSAGES =====
  reason_blacklisted: "Qora ro'yxatdagi foydalanuvchi",
  reason_blocked_file: "Taqiqlangan fayl turi yuborildi",
  reason_link: "Havola yuborish taqiqlangan",
  reason_badword: "Yomon so'z ishlatildi",
  reason_caps: "Haddan tashqari katta harflar bilan yozish",
  reason_emoji: "Emoji spami",
  reason_forward: "Forward qilingan xabarlar taqiqlangan",
  reason_ad: "Reklama xabari aniqlandi",
  reason_sticker_spam: "Sticker/GIF spami",
  reason_duplicate: "Bir xil xabarni takroran yuborish",
  reason_slowmode: "Slow mode: xabarlar orasida kamida {{seconds}}s kutish kerak",
  reason_flood: "Flood/spam aniqlandi",
  moderation_mention_user: "foydalanuvchi",
  moderation_banned: "🚫 {{mention}} ogohlantirish limitidan oshgani uchun bloklandi.\nSabab: {{reason}}",
  moderation_warned: "⚠️ {{mention}}, xabaringiz o'chirildi.\nSabab: {{reason}}\nOgohlantirish: {{current}}/{{max}}",
  log_message_deleted: "🗑 *Xabar o'chirildi*\nFoydalanuvchi: `{{userId}}`\nSabab: {{reason}}",

  // ===== REPORTS HANDLER (qo'shimcha) =====
  reports_footer_hint: "Foydalanuvchilar xabarga javob berib `/hisobot` yuboradi.",
  report_ban_confirmed: "🚫 [{{label}}](tg://user?id={{userId}}) shikoyatlar tasdiqlangani uchun bloklandi.",
  report_warn_confirmed: "⚠️ [{{label}}](tg://user?id={{userId}}) ogohlantirildi ({{current}}/{{max}}).",
  reason_reports_limit: "Shikoyatlar limitidan oshdi",
  report_user_label: "Foydalanuvchi",

  // ===== STATS HANDLER (qo'shimcha) =====
  stats_weekly_title: "📅 *Haftalik statistika (7 kun)*\n\n{{stats}}",
  stats_monthly_title: "🗓 *Oylik statistika (30 kun)*\n\n{{stats}}",
  stats_members_title:
    "👥 *A'zolar statistikasi*\n\n*1 kunda:* ➕ kirdi {{dayJoins}} / ➖ chiqdi {{dayLeaves}}\n*1 haftada:* ➕ kirdi {{weekJoins}} / ➖ chiqdi {{weekLeaves}}\n*1 oyda:* ➕ kirdi {{monthJoins}} / ➖ chiqdi {{monthLeaves}}",
  stats_top_admins_title: "🏆 *Eng faol adminlar*\n\n{{list}}",
  stats_no_admin_actions: "Hozircha hech qanday moderatsiya harakati qayd etilmagan.",
  stats_top_admin_line: "{{rank}}. [Admin](tg://user?id={{adminId}}) — *{{count}}* ta harakat",

  // ===== ADVANCED HANDLER (qo'shimcha) =====
  advanced_badwords_list_title:
    "🤬 *Yomon so'zlar* ({{count}}):\n\n{{list}}\n\nQo'shish: `/yomon_soz_qoshish <so'z>`\nO'chirish: `/yomon_soz_ochirish <so'z>`",

  // ===== CHANNELS HANDLER (qo'shimcha) =====
  channels_status_title:
    "📢 *Majburiy kanal*\n\nHolati: {{status}}\n\nKanal qo'shish uchun botni o'sha kanalga *admin* qilib qo'shing, so'ng shu yerga yozing:\n`/kanal_qoshish @kanal_username`",
  channels_add_hint: "Botni kerakli kanalga admin qilib qo'shing, so'ng: /kanal_qoshish @username",
  channels_check_thanks: "✅ Rahmat! Endi guruhga xabar yuborishga urinib ko'ring.",

  // ===== ADMIN HANDLER (qo'shimcha) =====
  admin_channel_list_title: "📡 *Majburiy kanallar*\n\n{{list}}",
  admin_broadcast_prompt_users:
    "📢 Barcha foydalanuvchilarga yubormoqchi bo'lgan xabaringizni endi shu yerga yuboring.\n\nMatn, rasm, video, fayl — istalgan turdagi xabarni yuborishingiz mumkin.",
  admin_broadcast_prompt_groups:
    "📣 Barcha ulangan guruhlarga yubormoqchi bo'lgan xabaringizni endi shu yerga yuboring.\n\nMatn, rasm, video, fayl — istalgan turdagi xabarni yuborishingiz mumkin.",
  admin_broadcast_cancelled: "Bekor qilindi",
  admin_channels_intro:
    "📡 *Majburiy kanallar*\n\nBu yerda qo'shilgan kanallarga a'zo bo'lmagan foydalanuvchilar botdan shaxsiy chatda foydalana olmaydi.\n\n⚠️ Bot qo'shilayotgan kanalda *administrator* bo'lishi shart.",
  admin_channel_removed: "✅ Kanal o'chirildi",
  admin_channel_add_prompt:
    "➕ Kanal username'ini yuboring (masalan: `@mening_kanalim`).\n\n⚠️ Bot o'sha kanalda *administrator* bo'lishi shart, aks holda a'zolikni tekshira olmaydi.",
  admin_channel_username_required: "Iltimos, kanal username'ini matn ko'rinishida yuboring.",
  admin_channel_not_found:
    "❌ Kanal topilmadi. Username to'g'riligini va bot o'sha kanalda admin ekanini tekshiring.",
  admin_channel_added: "✅ Kanal qo'shildi: {{title}}",
  admin_broadcast_sending: "⏳ Xabar yuborilmoqda, biroz kuting...",
  admin_broadcast_target_users: "foydalanuvchi(lar)ga",
  admin_broadcast_target_groups: "guruh(lar)ga",

  // ===== ADMIN KEYBOARD (qo'shimcha tugmalar) =====
  admin_btn_broadcast_users: "📢 Foydalanuvchilarga xabar",
  admin_btn_broadcast_groups: "📣 Guruhlarga xabar",
  admin_btn_channels: "📡 Majburiy kanallar",
  admin_btn_cancel: "✖️ Bekor qilish",
  admin_btn_channel_add: "➕ Kanal qo'shish",
  admin_btn_channel_list: "📋 Kanal ro'yxati",

  // ===== ADVANCED KEYBOARD (qo'shimcha tugmalar) =====
  advanced_btn_warnings: "⚠️ Ogohlantirish soni",
  advanced_btn_spamcount: "🚫 Spam: xabarlar soni",
  advanced_btn_spamwindow: "⏱ Spam: vaqt oynasi",
  advanced_btn_emoji: "😊 Emoji limiti",
  advanced_btn_caps: "🔠 CAPS foizi",
  advanced_btn_slowmode: "🐢 Slow mode",
  advanced_btn_badwords: "🤬 Yomon so'zlar ro'yxati",

  // ===== REPORTS KEYBOARD (qo'shimcha tugmalar) =====
  reports_btn_setlimit: "🔢 Shikoyat limitini o'zgartirish",

  // ===== STATS KEYBOARD (qo'shimcha tugmalar) =====
  stats_btn_weekly: "📅 Haftalik",
  stats_btn_monthly: "🗓 Oylik",
  stats_btn_members: "👥 A'zolar (kirdi/chiqdi)",
  stats_btn_topadmins: "🏆 Eng faol adminlar",

  // ===== LANGUAGE COMMAND/HANDLER (qo'shimcha) =====
  language_invalid: "❌ Noto'g'ri til.",
  error_unexpected: "❌ Xatolik yuz berdi.",
  error_unexpected_retry: "❌ Xatolik yuz berdi, birozdan so'ng qayta urinib ko'ring.",

  // ===== REPORT COMMAND (qo'shimcha) =====
  report_admin_cannot_report: "Adminlardan shikoyat qilib bo'lmaydi.",
  report_confirm_btn: "✅ Tasdiqlash",
  report_reject_btn: "❌ Bekor qilish",
  default_group_name: "Guruh",

  // ===== GLOBAL/GURUH KANAL GATE (qo'shimcha) =====
  private_join_channels_prompt: "👋 Botdan foydalanishdan oldin quyidagi kanal(lar)ga a'zo bo'ling:",
  group_join_channels_prompt: "👋 {{mention}}, guruhda yozish uchun quyidagi kanal(lar)ga a'zo bo'ling:",
  join_channel_btn: "✅ A'zo bo'ldim",
  default_channel_name: "Kanal",
  default_user_name: "Foydalanuvchi",

  // ===== CAPTCHA (qo'shimcha) =====
  captcha_not_bot_btn: "✅ Men botman emas",
  captcha_welcome_prompt: "👋 {{mention}}, guruhga xush kelibsiz!\n\nYozishni boshlash uchun {{minutes}} daqiqa ichida quyidagi tugmani bosing.",
  raid_detected: "🚨 *Reyd aniqlandi!* Qisqa vaqt ichida {{threshold}}+ a'zo qo'shildi. Adminlar diqqat qilishi tavsiya etiladi.",

  // ===== BOT GURUHGA QO'SHILDI (qo'shimcha) =====
  bot_added_welcome:
    "👋 Salom! Men moderatsiya botiman.\n\nTo'liq ishlashim uchun menga *administrator* huquqini bering.\nSozlamalarni ochish uchun: /sozlamalar\nYordam uchun: /yordam",

};