export default {
  // ===== LANGUAGE SYSTEM =====
  language_prompt: "🌐 Выберите язык:",
  language_current: "Текущий язык: 🇷🇺 Русский",
  language_set: "✅ Язык изменён на 🇷🇺 Русский.",
  language_name: "Русский",
  language_back: "⬅️ Назад",

  // ===== START COMMAND =====
  start_welcome: "👋 Привет, {{displayName}}!\n\n🛡️ *TOZAA GURUH BOT* вас приветствует.\n\nЯ модераторский бот для автоматической защиты групп Telegram.\n\n👇 Нажмите кнопку ниже, чтобы добавить бота в свою группу.",
  start_group_response: "✅ Я готов работать в этой группе!",
  start_add_to_group: "➕ {{displayName}}, добавить в группу",

  // ===== HELP COMMAND =====
  help_title: "🤖 *Справка*\n\n",
  help_public_commands: "*Открытые команды:*\n",
  help_start: "`/start` — запустить бота\n",
  help_help: "`/yordam` — эту справку\n",
  help_admin: "`/admin` — панель владельца бота\n",
  help_rules: "`/qoidalar` — посмотреть правила группы\n",
  help_report: "`/hisobot` — отправить жалобу в ответ на сообщение\n",
  help_stats: "`/statistika` — статистика на сегодня\n",
  help_members: "`/azolar` — количество участников, присоединившихся/уехавших в течение 1 дня/недели/месяца\n",
  help_language: "`/til` — выбрать язык ответа бота\n\n",
  help_user_management: "*Администратор: управление пользователями* (отправляется в ответ на сообщение):\n",
  help_warn: "`/ogohlantirish` — выдать предупреждение\n",
  help_unwarn: "`/ogohlantirmaslik` — снять последнее предупреждение\n",
  help_mute: "`/ovozsiz [длительность]` — заглушить, например: `/ovozsiz 2soat`\n",
  help_unmute: "`/ovoz_yoqish` — снять глушение\n",
  help_ban: "`/taqiqlash [длительность]` — заблокировать, например: `/taqiqlash 1kun`\n",
  help_unban: "`/taqiq_bekor` — разблокировать\n",
  help_kick: "`/tepish` — выгнать из группы\n",
  help_whois: "`/kim` — посмотреть профиль пользователя\n",
  help_delete: "`/ochirish` — удалить сообщение (в ответ)\n\n",
  help_lists: "*Администратор: списки* (отправляется в ответ на сообщение):\n",
  help_whitelist_add: "`/royxat_qoshish` — добавить в белый список\n",
  help_whitelist_remove: "`/royxatdan_chiqarish` — удалить из белого списка\n",
  help_blacklist_add: "`/qora_royxat_qoshish` — добавить в чёрный список\n",
  help_blacklist_remove: "`/qora_royxat_ochirish` — удалить из чёрного списка\n\n",
  help_badwords: "*Администратор: плохие слова:*\n",
  help_badword_add: "`/yomon_soz_qoshish <слово>` — добавить в список\n",
  help_badword_remove: "`/yomon_soz_ochirish <слово>` — удалить из списка\n\n",
  help_channels: "*Администратор: правила и каналы:*\n",
  help_set_rules: "`/qoidalarni_ornatish <текст>` — обновить правила\n",
  help_add_channel: "`/kanal_qoshish @username` — добавить обязательный канал\n",
  help_log_channel: "`/log_kanal @username` — установить канал для логов модерации\n\n",
  help_advanced: "Расширенные настройки открываются через `/sozlamalar`.",

  // ===== SETTINGS COMMAND =====
  settings_only_groups: "Эта команда работает только в группах.",
  settings_admin_only: "⛔ Настройки могут открыть только администраторы.",
  settings_title: "⚙️ *Настройки Бота*\n\nВыберите раздел:",

  // ===== ERROR MESSAGES =====
  error_admin_only: "⛔ Эта команда только для администраторов.",
  error_not_admin: "⛔ Вы не администратор.",
  error_reply_required: "Выберите сообщение в ответ.",
  error_user_not_found: "❌ Пользователь не найден.",
  error_invalid_duration: "❌ Неправильный формат времени. Пример: 2soat, 30minut, 1kun",
  error_invalid_format: "❌ Неправильный формат.",
  error_group_only: "Эта команда работает только в группах.",
  error_target_required: "Укажите пользователя: отправьте команду *в ответ* на его сообщение, либо добавьте его ID в конце.\\nНапример: `/taqiqlash 123456789 причина`",
  error_group_not_found: "Группа не найдена, попробуйте немного позже.",
  error_restrict_failed: "Не удалось ограничить пользователя (проверьте права бота).",
  error_unmute_failed: "Не удалось снять глушение (проверьте права бота).",
  error_unban_failed: "Не удалось снять блокировку.",
  error_kick_failed: "Не удалось выгнать пользователя (проверьте права бота).",
  
  // ===== SUCCESS MESSAGES =====
  success_saved: "✅ Сохранено.",
  success_updated: "✅ Обновлено.",
  success_deleted: "✅ Удалено.",

  // ===== KEYBOARD BUTTONS =====
  keyboard_moderation: "🛡 Модерация",
  keyboard_users: "👥 Пользователи",
  keyboard_reports: "🚨 Жалобы",
  keyboard_channels: "📢 Обязательный канал",
  keyboard_rules: "📋 Правила",
  keyboard_stats: "📊 Статистика",
  keyboard_advanced: "🔧 Продвинутые",
  keyboard_close: "❌ Закрыть",

  // ===== MODERATION COMMANDS =====
  warn_title: "⚠️ *Пользователь предупреждён*",
  warn_message: "⚠️ {username} предупреждён.\n\nПричина: {reason}\nПредупреждений: {warns}",
  warn_banned: "🚫 {username} заблокирован за превышение лимита предупреждений.",
  warn_user_dm: "⚠️ Вы получили предупреждение в группе {group}.\n\nПричина: {reason}",
  warn_error: "❌ Не удалось предупредить пользователя.",

  unwarn_title: "✅ *Предупреждение снято*",
  unwarn_message: "✅ У {username} снято одно предупреждение.\nОсталось предупреждений: {warns}",
  unwarn_no_warns: "У этого пользователя нет предупреждений.",

  ban_title: "🚫 *Пользователь заблокирован*",
  ban_message: "🚫 {username} заблокирован{duration}.\nПричина: {reason}",
  ban_message_timed: "🚫 @{username} заблокирован на {duration}.\n\nПричина: {reason}",
  ban_user_dm: "🚫 Вы заблокированы в группе {group}.\n\nПричина: {reason}",

  unban_title: "✅ *Блокировка снята*",
  unban_message: "✅ {username} разблокирован.",
  unban_not_banned: "Этот пользователь не заблокирован.",

  mute_title: "🔇 *Пользователь заглушен*",
  mute_message: "🔇 {username} заглушен{duration}.\nПричина: {reason}",
  mute_user_dm: "🔇 Вы заглушены в группе {group} на {duration}.\n\nПричина: {reason}",

  unmute_title: "🔊 *Глушение снято*",
  unmute_message: "🔊 Глушение для {username} снято.",
  unmute_not_muted: "❌ Этот пользователь не заглушен.",

  kick_title: "👉 *Пользователь выгнан*",
  kick_message: "👢 {username} выгнан из группы (может зайти снова).\nПричина: {reason}",
  kick_user_dm: "👉 Вы выгнаны из группы {group}.\n\nПричина: {reason}",

  // ===== RULES COMMAND =====
  rules_title: "📋 *Правила Группы*\n\n",
  rules_no_rules: "❌ В этой группе правила не установлены.",
  rules_set_success: "✅ Правила сохранены.",
  rules_set_error: "❌ Ошибка при сохранении правил.",

  // ===== REPORT COMMAND =====
  report_title: "🚨 *Жалоба*",
  report_success: "✅ Ваша жалоба отправлена администраторам.",
  report_message: "🚨 *Новая Жалоба*\n\nГруппа: {group}\nПользователь: @{username}\nЖалоба: {reason}",
  report_no_reply: "❌ Выберите сообщение в ответ.",
  report_self: "❌ Вы не можете пожаловаться на себя.",

  // ===== STATS COMMAND =====
  stats_title: "📊 *Статистика за сегодня*",
  stats_messages_today: "📨 Сообщений сегодня: {count}",
  stats_members_joined: "➕ Присоединились: {count}",
  stats_members_left: "➖ Ушли: {count}",
  stats_warns: "⚠️ Предупреждений: {count}",
  stats_bans: "🚫 Блокировок: {count}",
  stats_mutes: "🔇 Глушений: {count}",
  stats_deleted_messages: "🗑 Удалённых сообщений: {count}",
  stats_spam_detected: "🕵️ Обнаружено спама: {count}",
  stats_reports_received: "🚨 Жалоб: {count}",
  stats_links_deleted: "🔗 Удалённых ссылок: {count}",
  stats_files_deleted: "📁 Удалённых файлов: {count}",

  // ===== MEMBER STATS =====
  member_stats_title: "👤 *Статистика Пользователя*",
  member_stats_user: "Пользователь: @{username}",
  member_stats_messages: "Сообщений: {count}",
  member_stats_warns: "Предупреждений: {count}",
  member_stats_joined: "Присоединился: {date}",

  // ===== MEMBERS ACTIVITY (/azolar) =====
  members_stats_title: "👥 *Статистика участников*",
  members_period_day: "за 1 день",
  members_period_week: "за 1 неделю",
  members_period_month: "за 1 месяц",
  members_stats_line: "*{label}:* ➕ вошли {joins} / ➖ вышли {leaves}",

  // ===== FILTERS =====
  filter_bad_words: "🚫 Обнаружено плохое слово.",
  filter_bad_words_deleted: "🚫 Сообщение удалено за плохое слово.",
  filter_spam_link: "🔗 Обнаружена спам ссылка.",
  filter_spam_link_deleted: "🔗 Сообщение удалено за спам ссылку.",
  filter_flood: "💬 Обнаружен флуд.",
  filter_flood_deleted: "💬 Сообщение удалено за флуд.",
  filter_caps: "🔤 Превышен лимит прописных букв.",
  filter_caps_deleted: "🔤 Сообщение удалено за прописные буквы.",
  filter_emoji: "😂 Слишком много эмодзи.",
  filter_emoji_deleted: "😂 Сообщение удалено за эмодзи.",
  filter_forward: "↩️ Пересылка сообщений запрещена.",
  filter_forward_deleted: "↩️ Переслано сообщение удалено.",

  // ===== CHANNELS =====
  channels_title: "📢 *Обязательные Каналы*",
  channels_add_success: "✅ Канал добавлен.",
  channels_remove_success: "✅ Канал удалён.",
  channels_list: "📢 Каналы:\n{list}",
  channels_no_channels: "❌ Обязательные каналы не установлены.",
  channels_join_required: "❌ Для входа в группу подпишитесь на каналы:\n{channels}",

  // ===== ADMIN PANEL =====
  admin_title: "🔧 *Панель Администратора*",
  admin_unauthorized: "❌ У вас нет доступа к панели администратора.",
  admin_back: "⬅️ Назад",

  // ===== WHOIS COMMAND =====
  whois_title: "👤 *Информация Пользователя*",
  whois_user_id: "ID: {id}",
  whois_username: "Пользователь: @{username}",
  whois_first_name: "Имя: {first_name}",
  whois_last_name: "Фамилия: {last_name}",
  whois_status: "Статус: {status}",
  whois_warns: "Предупреждений: {warns}",
  whois_banned: "Заблокирован: {banned}",
  whois_muted: "Заглушен: {muted}",
  whois_joined: "Присоединился: {date}",
  whois_user_word: "Пользователь",
  whois_reply_required: "Отправьте `/kim` в *ответ* на сообщение пользователя.",
  whois_profile_title: "👤 Профиль {user}",
  whois_status_label: "Статус: {status}",
  whois_status_banned: "🚫 Заблокирован",
  whois_status_muted: "🔇 Заглушен",
  whois_status_normal: "🟢 Обычный статус",
  whois_warnings_line: "⚠️ Предупреждений: {count}",
  whois_deleted_line: "🗑 Удалённых сообщений: {count}",
  whois_joined_line: "📅 Первое появление в группе: {date}",
  whois_unknown_date: "Неизвестно",

  // ===== DELETE COMMAND =====
  delete_success: "✅ Сообщение удалено.",
  delete_error: "❌ Не удалось удалить сообщение (возможно, оно уже удалено или слишком старое).",
  delete_no_reply: "Ответьте (reply) на сообщение, которое хотите удалить, командой `/ochirish`.",

  // ===== SETTINGS HANDLER =====
  settings_moderation: "🛡 Модерация",
  settings_filters: "🔒 Фильтры",
  settings_automod: "🤖 АвтоМод",
  settings_captcha: "✅ Капча",
  settings_bad_words: "❌ Плохие слова",
  settings_links: "🔗 Ссылки",
  settings_flood: "💬 Флуд",
  settings_caps: "🔤 Прописные буквы",

  // ===== USER MANAGEMENT =====
  users_list: "👥 *Пользователи*",
  users_whitelist: "⚪ Белый Список",
  users_blacklist: "⚫ Чёрный Список",
  users_add_whitelist: "✅ Добавлено в белый список.",
  users_remove_whitelist: "❌ Удалено из белого списка.",
  users_add_blacklist: "🚫 Добавлено в чёрный список.",
  users_remove_blacklist: "⚫ Удалено из чёрного списка.",

  // ===== ADVANCED SETTINGS =====
  advanced_title: "🔧 *Продвинутые Настройки*",
  advanced_raid_protection: "🛡 Защита от Рейдов",
  advanced_captcha_required: "✅ Капча Обязательна",
  advanced_global_channels: "📡 Глобальные Каналы",
  advanced_save_logs: "📝 Сохранение Логов",

  // ===== LIST COMMANDS =====
  whitelist_add_success: "добавлено в белый список.",
  whitelist_remove_success: "удалено из белого списка.",
  blacklist_add_success: "добавлено в чёрный список и заблокировано.",
  blacklist_add_reason: "Добавлено администратором",
  blacklist_remove_success: "удалено из чёрного списка.",
  badword_add_usage: "Введите слово.\nНапример: `/yomon_soz_qoshish slovo`",
  badword_add_success: "{word} добавлено в список плохих слов.",
  badword_remove_usage: "Введите слово.\nНапример: `/yomon_soz_ochirish slovo`",
  badword_remove_success: "{word} удалено из списка плохих слов.",

  // ===== CHANNEL COMMANDS =====
  channel_add_usage: "Введите username канала.\nНапример: `/kanal_qoshish @moy_kanal`\n\nПримечание: бот должен быть администратором этого канала.",
  channel_not_found: "Канал не найден. Проверьте правильность username и убедитесь, что бот является администратором канала.",
  channel_add_success: "✅ Канал добавлен: {title}",

  // ===== LOG CHANNEL COMMAND =====
  log_channel_usage:
    "Введите username канала.\nНапример: `/log_kanal @moy_log_kanal`\nЧтобы отключить: `/log_kanal off`\n\nПримечание: бот должен быть администратором этого канала.",
  log_channel_removed: "✅ Лог-канал отключён.",
  log_channel_set: "✅ Лог-канал установлен: {{title}}",

  // ===== ERROR MESSAGES =====
  error_owner_only: "⛔ Эта команда только для владельца бота.",
  error_reply_user: "❌ Отправьте в ответ на сообщение пользователя.",
  admin_choose_section: "Выберите один из разделов ниже:",

  // ===== HANDLERS =====
  captcha_not_for_you: "❗ Эта капча не для вас.",
  captcha_verified: "✅ Подтверждено! Теперь вы можете писать.",
  captcha_verify_failed: "⚠️ Вы подтвердили, но бот не смог снять ограничение — выдайте боту право «Ограничение участников» в настройках группы и попробуйте снова.",
  channels_not_joined: "❗ Вы еще не подписались на все каналы.",
  thank_you: "✅ Спасибо!",
  rules_title: "Текущие правила:",
  rules_change_instruction: "Чтобы изменить правила:\n`/qoidalarni_ornatish <новый текст>`",
  list_empty: "Список пуст.",
  users_description: "⚪ *Белый список* — пользователи, освобожденные от всех фильтров.\n⚫ *Чёрный список* — пользователи, которые блокируются при попытке написать в группу.\n\nДля добавления отправьте команду в ответ на сообщение пользователя:\n`/royxat_qoshish` — в белый список\n`/royxatdan_chiqarish` — из белого списка\n`/qora_royxat_qoshish` — в чёрный список\n`/qora_royxat_ochirish` — из чёрного списка",

  // ===== SETTINGS HANDLERS =====
  settings_title: "⚙️ *Настройки бота*\n\nВыберите раздел:",
  settings_error_not_found: "Ошибка: настройки не найдены.",
  settings_moderation_title: "🛡 *Модерация*\n\nНажимайте для включения/выключения фильтра:",
  settings_filter_unknown: "Неизвестная настройка.",
  settings_toggle_on: "✅ Включено",
  settings_toggle_off: "⛔ Отключено",
  settings_admin_only: "⛔ Эту кнопку могут нажимать только администраторы.",
  
  // ===== CHANNELS HANDLERS =====
  channels_title: "📡 *Обязательные каналы*\n\n",
  channels_empty: "📋 Пока не добавлено ни одного канала.",
  channels_list_title: "📋 *Список каналов* (нажимайте для удаления):",
  channels_remove_success: "✅ Канал удалён.",
  
  // ===== USERS HANDLERS =====
  users_whitelist_title: "⚪ *Белый список*",
  users_blacklist_title: "⚫ *Чёрный список*",
  users_whitelist_empty: "⚪ Белый список пуст.",
  users_blacklist_empty: "⚫ Чёрный список пуст.",
  
  // ===== REPORTS HANDLERS =====
  reports_title: "🚨 *Жалобы*\n\n",
  reports_limit_info: "Текущий лимит: *{limit}* жалоб\n\nОжидающих жалоб: *{pending}*\n\n",
  reports_set_limit_title: "🔢 Выберите лимит жалоб:",
  reports_limit_set: "✅ Лимит установлен на {limit}.",
  reports_no_pending: "❌ Жалобы отменены, никаких действий не предпринято.",
  
  // ===== RULES HANDLERS =====
  rules_set_title: "📋 Текущие правила:",
  rules_no_rules: "Правила не установлены.",
  rules_change_instruction: "Чтобы изменить правила:\n`/qoidalarni_ornatish <новый текст>`",
  
  // ===== ADMIN HANDLERS =====
  admin_title: "👑 *Панель администратора*",
  admin_menu: "👑 *Панель администратора*\n\nВыберите раздел:",
  admin_menu_closed: "Панель закрыта.",
  admin_stats_title: "📊 *Статистика бота (глобальная)*",
  admin_broadcast_title: "📢 *Отправить сообщение всем группам*",
  admin_broadcast_success: "✅ Сообщение отправлено {target}.\n\n📨 Отправлено: *{sent}*\n❌ Не отправлено: *{failed}*",
  admin_channels_title: "📡 *Глобальные каналы*",
  admin_channels_empty: "Глобальные каналы не добавлены.",
  admin_close_panel: "❌ Закрыть панель",
  
  // ===== ADVANCED HANDLERS =====
  advanced_title: "🔧 *Расширенные настройки*\n\nВыберите раздел:",
  advanced_warns_title: "⚠️ После скольких предупреждений автоматически заблокировать?",
  advanced_warns_set: "✅ Установлено на {value}.",
  advanced_flood_title: "🚫 Сколько сообщений считается спамом?",
  advanced_flood_set: "✅ Установлено на {value}.",
  advanced_flood_time_title: "⏱ За сколько секунд проверять?",
  advanced_flood_time_set: "✅ Установлено на {value}s.",
  advanced_emoji_title: "😊 Максимум эмодзи в одном сообщении?",
  advanced_emoji_set: "✅ Установлено на {value}.",
  advanced_caps_title: "🔠 При каком проценте прописных букв удалять?",
  advanced_caps_set: "✅ Установлено на {value}%.",
  advanced_slow_mode_title: "🐢 Сколько секунд ждать между сообщениями? (0 — отключено)",
  advanced_slow_mode_set: "✅ Установлено на {value}s.",
  
  // ===== STATS HANDLERS =====
  stats_title: "📊 *Статистика*",
  stats_loading: "⏳ Загрузка...",
  
  // ===== KEYBOARDS =====
  keyboard_settings: "⚙️ Настройки",
  keyboard_moderation_filter: "🛡 Модерация",
  keyboard_users_list: "👥 Пользователи",
  keyboard_channels_list: "📡 Каналы",
  keyboard_rules_view: "📋 Правила",
  keyboard_stats_view: "📊 Статистика",
  keyboard_advanced_settings: "🔧 Расширенные",
  keyboard_admin_panel: "👑 Администратор",
  keyboard_back: "⬅️ Назад",
  keyboard_close: "❌ Закрыть",
  keyboard_on: "✅ Включено",
  keyboard_off: "⛔ Отключено",



  // ===== FILTERS =====
  link_filter: "Фильтр ссылок",
  badwords_filter: "Фильтр плохих слов",
  apk_filter: "APK фильтр",
  zip_filter: "ZIP фильтр",
  exe_filter: "EXE фильтр",
  rar_filter: "RAR фильтр",
  xapk_filter: "XAPK фильтр",
  apkm_filter: "APKM фильтр",
  flood_filter: "Защита от флуда",
  spam_filter: "Защита от спама",
  forward_filter: "Защита от репостов",
  emoji_filter: "Фильтр спама эмодзи",
  caps_filter: "Фильтр КАПСА",
  ad_filter: "Фильтр рекламы",
  sticker_filter: "Фильтр спама стикеров",
  duplicate_filter: "Фильтр спама дублей",
  captcha_filter: "Капча (новые участники)",
  raid_filter: "Защита от рейда",
  service_messages_filter: "Удалять сообщения о входе/выходе",

  // ===== MODERATION FILTER MESSAGES =====
  reason_blacklisted: "Пользователь в чёрном списке",
  reason_blocked_file: "Отправлен запрещённый тип файла",
  reason_link: "Отправка ссылок запрещена",
  reason_badword: "Использовано запрещённое слово",
  reason_caps: "Слишком много заглавных букв",
  reason_emoji: "Спам эмодзи",
  reason_forward: "Пересланные сообщения запрещены",
  reason_ad: "Обнаружено рекламное сообщение",
  reason_sticker_spam: "Спам стикерами/GIF",
  reason_duplicate: "Повторная отправка одного и того же сообщения",
  reason_slowmode: "Медленный режим: между сообщениями нужно ждать минимум {{seconds}}с",
  reason_flood: "Обнаружен флуд/спам",
  moderation_mention_user: "пользователь",
  moderation_banned: "🚫 {{mention}} заблокирован за превышение лимита предупреждений.\nПричина: {{reason}}",
  moderation_warned: "⚠️ {{mention}}, ваше сообщение удалено.\nПричина: {{reason}}\nПредупреждение: {{current}}/{{max}}",
  log_message_deleted: "🗑 *Сообщение удалено*\nПользователь: `{{userId}}`\nПричина: {{reason}}",

  // ===== REPORTS HANDLER (доп.) =====
  reports_footer_hint: "Пользователи отправляют `/hisobot` в ответ на сообщение.",
  report_ban_confirmed: "🚫 [{{label}}](tg://user?id={{userId}}) заблокирован по подтверждённым жалобам.",
  report_warn_confirmed: "⚠️ [{{label}}](tg://user?id={{userId}}) предупреждён ({{current}}/{{max}}).",
  reason_reports_limit: "Превышен лимит жалоб",
  report_user_label: "Пользователь",

  // ===== STATS HANDLER (доп.) =====
  stats_weekly_title: "📅 *Статистика за неделю (7 дней)*\n\n{{stats}}",
  stats_monthly_title: "🗓 *Статистика за месяц (30 дней)*\n\n{{stats}}",
  stats_members_title:
    "👥 *Статистика участников*\n\n*За 1 день:* ➕ вступили {{dayJoins}} / ➖ вышли {{dayLeaves}}\n*За 1 неделю:* ➕ вступили {{weekJoins}} / ➖ вышли {{weekLeaves}}\n*За 1 месяц:* ➕ вступили {{monthJoins}} / ➖ вышли {{monthLeaves}}",
  stats_top_admins_title: "🏆 *Самые активные админы*\n\n{{list}}",
  stats_no_admin_actions: "Пока не зафиксировано ни одного модераторского действия.",
  stats_top_admin_line: "{{rank}}. [Админ](tg://user?id={{adminId}}) — *{{count}}* действий",

  // ===== ADVANCED HANDLER (доп.) =====
  advanced_badwords_list_title:
    "🤬 *Запрещённые слова* ({{count}}):\n\n{{list}}\n\nДобавить: `/yomon_soz_qoshish <слово>`\nУдалить: `/yomon_soz_ochirish <слово>`",

  // ===== CHANNELS HANDLER (доп.) =====
  channels_status_title:
    "📢 *Обязательный канал*\n\nСтатус: {{status}}\n\nЧтобы добавить канал, сделайте бота *администратором* этого канала, затем отправьте здесь:\n`/kanal_qoshish @username_канала`",
  channels_add_hint: "Сделайте бота админом нужного канала, затем: /kanal_qoshish @username",
  channels_check_thanks: "✅ Спасибо! Теперь попробуйте написать в группу.",

  // ===== ADMIN HANDLER (доп.) =====
  admin_channel_list_title: "📡 *Обязательные каналы*\n\n{{list}}",
  admin_broadcast_prompt_users:
    "📢 Отправьте сюда сообщение, которое хотите разослать всем пользователям.\n\nМожно отправить текст, фото, видео, файл — любой тип сообщения.",
  admin_broadcast_prompt_groups:
    "📣 Отправьте сюда сообщение, которое хотите разослать всем подключённым группам.\n\nМожно отправить текст, фото, видео, файл — любой тип сообщения.",
  admin_broadcast_cancelled: "Отменено",
  admin_channels_intro:
    "📡 *Обязательные каналы*\n\nПользователи, не подписанные на добавленные каналы, не смогут пользоваться ботом в личном чате.\n\n⚠️ Бот обязательно должен быть *администратором* добавляемого канала.",
  admin_channel_removed: "✅ Канал удалён",
  admin_channel_add_prompt:
    "➕ Отправьте username канала (например: `@mychannel`).\n\n⚠️ Бот обязательно должен быть *администратором* этого канала, иначе не сможет проверять подписку.",
  admin_channel_username_required: "Пожалуйста, отправьте username канала текстом.",
  admin_channel_not_found:
    "❌ Канал не найден. Проверьте правильность username и убедитесь, что бот является админом этого канала.",
  admin_channel_added: "✅ Канал добавлен: {{title}}",
  admin_broadcast_sending: "⏳ Сообщение отправляется, подождите...",
  admin_broadcast_target_users: "пользователю(ям)",
  admin_broadcast_target_groups: "группе(ам)",

  // ===== ADMIN KEYBOARD (доп. кнопки) =====
  admin_btn_broadcast_users: "📢 Сообщение пользователям",
  admin_btn_broadcast_groups: "📣 Сообщение группам",
  admin_btn_channels: "📡 Обязательные каналы",
  admin_btn_cancel: "✖️ Отменить",
  admin_btn_channel_add: "➕ Добавить канал",
  admin_btn_channel_list: "📋 Список каналов",

  // ===== ADVANCED KEYBOARD (доп. кнопки) =====
  advanced_btn_warnings: "⚠️ Кол-во предупреждений",
  advanced_btn_spamcount: "🚫 Спам: кол-во сообщений",
  advanced_btn_spamwindow: "⏱ Спам: временное окно",
  advanced_btn_emoji: "😊 Лимит эмодзи",
  advanced_btn_caps: "🔠 Процент CAPS",
  advanced_btn_slowmode: "🐢 Медленный режим",
  advanced_btn_badwords: "🤬 Список плохих слов",

  // ===== REPORTS KEYBOARD (доп. кнопки) =====
  reports_btn_setlimit: "🔢 Изменить лимит жалоб",

  // ===== STATS KEYBOARD (доп. кнопки) =====
  stats_btn_weekly: "📅 Недельная",
  stats_btn_monthly: "🗓 Месячная",
  stats_btn_members: "👥 Участники (вход/выход)",
  stats_btn_topadmins: "🏆 Самые активные админы",

  // ===== LANGUAGE COMMAND/HANDLER (доп.) =====
  language_invalid: "❌ Неверный язык.",
  error_unexpected: "❌ Произошла ошибка.",
  error_unexpected_retry: "❌ Произошла ошибка, попробуйте ещё раз позже.",

  // ===== REPORT COMMAND (доп.) =====
  report_admin_cannot_report: "На администраторов нельзя пожаловаться.",
  report_confirm_btn: "✅ Подтвердить",
  report_reject_btn: "❌ Отклонить",
  default_group_name: "Группа",

  // ===== ГЛОБАЛЬНЫЕ/ГРУППОВЫЕ КАНАЛЫ (доп.) =====
  private_join_channels_prompt: "👋 Прежде чем пользоваться ботом, подпишитесь на следующие каналы:",
  group_join_channels_prompt: "👋 {{mention}}, чтобы писать в группе, подпишитесь на следующие каналы:",
  join_channel_btn: "✅ Я подписался",
  default_channel_name: "Канал",
  default_user_name: "Пользователь",

  // ===== CAPTCHA (доп.) =====
  captcha_not_bot_btn: "✅ Я не бот",
  captcha_welcome_prompt: "👋 {{mention}}, добро пожаловать в группу!\n\nЧтобы начать писать, нажмите кнопку ниже в течение {{minutes}} мин.",
  raid_detected: "🚨 *Обнаружен рейд!* За короткое время добавилось {{threshold}}+ участников. Рекомендуем администраторам обратить внимание.",

  // ===== БОТ ДОБАВЛЕН В ГРУППУ (доп.) =====
  bot_added_welcome:
    "👋 Привет! Я бот-модератор.\n\nЧтобы работать в полную силу, дайте мне права *администратора*.\nОткрыть настройки: /sozlamalar\nПомощь: /yordam",

};