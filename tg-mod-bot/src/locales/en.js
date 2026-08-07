export default {
  // ===== LANGUAGE SYSTEM =====
  language_prompt: "🌐 Choose a language:",
  language_current: "Current language: 🇬🇧 English",
  language_set: "✅ Language set to 🇬🇧 English.",
  language_name: "English",
  language_back: "⬅️ Back",

  // ===== START COMMAND =====
  start_welcome: "👋 Hello, {{displayName}}!\n\n🛡️ Welcome to *TOZAA GURUH BOT*.\n\nI'm an automatic moderation bot for protecting Telegram groups.\n\n👇 Click the button below to add me to your group.",
  start_group_response: "✅ I'm ready to work in this group!",
  start_add_to_group: "➕ {{displayName}}, Add to Group",

  // ===== HELP COMMAND =====
  help_title: "🤖 *Help*\n\n",
  help_public_commands: "*Public commands:*\n",
  help_start: "`/start` — launch the bot\n",
  help_help: "`/yordam` — this help message\n",
  help_admin: "`/admin` — bot owner panel\n",
  help_rules: "`/qoidalar` — view group rules\n",
  help_report: "`/hisobot` — report a message\n",
  help_stats: "`/statistika` — today's statistics\n",
  help_members: "`/azolar` — members joined/left in 1 day/week/month\n",
  help_language: "`/til` — choose bot response language\n\n",
  help_user_management: "*Admin: user management* (reply to a message):\n",
  help_warn: "`/ogohlantirish` — give a warning\n",
  help_unwarn: "`/ogohlantirmaslik` — remove last warning\n",
  help_mute: "`/ovozsiz [duration]` — mute user, e.g., `/ovozsiz 2soat`\n",
  help_unmute: "`/ovoz_yoqish` — unmute user\n",
  help_ban: "`/taqiqlash [duration]` — ban user, e.g., `/taqiqlash 1kun`\n",
  help_unban: "`/taqiq_bekor` — unban user\n",
  help_kick: "`/tepish` — kick from group\n",
  help_whois: "`/kim` — view user profile\n",
  help_delete: "`/ochirish` — delete message (reply to message)\n\n",
  help_lists: "*Admin: lists* (reply to a message):\n",
  help_whitelist_add: "`/royxat_qoshish` — add to whitelist\n",
  help_whitelist_remove: "`/royxatdan_chiqarish` — remove from whitelist\n",
  help_blacklist_add: "`/qora_royxat_qoshish` — add to blacklist\n",
  help_blacklist_remove: "`/qora_royxat_ochirish` — remove from blacklist\n\n",
  help_badwords: "*Admin: bad words:*\n",
  help_badword_add: "`/yomon_soz_qoshish <word>` — add to list\n",
  help_badword_remove: "`/yomon_soz_ochirish <word>` — remove from list\n\n",
  help_channels: "*Admin: rules and channels:*\n",
  help_set_rules: "`/qoidalarni_ornatish <text>` — update rules\n",
  help_add_channel: "`/kanal_qoshish @username` — add required channel\n",
  help_log_channel: "`/log_kanal @username` — set moderation log channel\n\n",
  help_advanced: "Advanced settings are available through `/sozlamalar`.",

  // ===== SETTINGS COMMAND =====
  settings_only_groups: "This command only works in groups.",
  settings_admin_only: "⛔ Only administrators can open settings.",
  settings_title: "⚙️ *Bot Settings*\n\nSelect a section:",

  // ===== ERROR MESSAGES =====
  error_admin_only: "⛔ This command is for administrators only.",
  error_not_admin: "⛔ You are not an administrator.",
  error_reply_required: "Please reply to a message.",
  error_user_not_found: "❌ User not found.",
  error_invalid_duration: "❌ Invalid duration format. Example: 2soat, 30minut, 1kun",
  error_invalid_format: "❌ Invalid format.",
  error_group_only: "This command only works in groups.",
  error_target_required: "Specify a user: send the command as a *reply* to their message, or add their ID at the end.\\nExample: `/taqiqlash 123456789 reason`",
  error_group_not_found: "Group not found, please try again shortly.",
  error_restrict_failed: "Couldn't restrict the user (check the bot's admin rights).",
  error_unmute_failed: "Couldn't unmute the user (check the bot's admin rights).",
  error_unban_failed: "Couldn't unban the user.",
  error_kick_failed: "Couldn't kick the user (check the bot's admin rights).",
  
  // ===== SUCCESS MESSAGES =====
  success_saved: "✅ Saved.",
  success_updated: "✅ Updated.",
  success_deleted: "✅ Deleted.",

  // ===== KEYBOARD BUTTONS =====
  keyboard_moderation: "🛡 Moderation",
  keyboard_users: "👥 Users",
  keyboard_reports: "🚨 Reports",
  keyboard_channels: "📢 Required Channel",
  keyboard_rules: "📋 Rules",
  keyboard_stats: "📊 Statistics",
  keyboard_advanced: "🔧 Advanced",
  keyboard_close: "❌ Close",

  // ===== MODERATION COMMANDS =====
  warn_title: "⚠️ *User Warned*",
  warn_message: "⚠️ {username} has been warned.\n\nReason: {reason}\nWarnings: {warns}",
  warn_banned: "🚫 {username} was banned for exceeding the warning limit.",
  warn_user_dm: "⚠️ You have been warned in {group}.\n\nReason: {reason}",
  warn_error: "❌ Could not warn the user.",

  unwarn_title: "✅ *Warning Removed*",
  unwarn_message: "✅ One warning removed for {username}.\nRemaining warnings: {warns}",
  unwarn_no_warns: "This user has no warnings.",

  ban_title: "🚫 *User Banned*",
  ban_message: "🚫 {username} has been banned{duration}.\nReason: {reason}",
  ban_message_timed: "🚫 @{username} has been banned for {duration}.\n\nReason: {reason}",
  ban_user_dm: "🚫 You have been banned from {group}.\n\nReason: {reason}",

  unban_title: "✅ *Ban Removed*",
  unban_message: "✅ {username} has been unbanned.",
  unban_not_banned: "This user is not banned.",

  mute_title: "🔇 *User Muted*",
  mute_message: "🔇 {username} has been muted{duration}.\nReason: {reason}",
  mute_user_dm: "🔇 You have been muted in {group} for {duration}.\n\nReason: {reason}",

  unmute_title: "🔊 *Mute Removed*",
  unmute_message: "🔊 {username} has been unmuted.",
  unmute_not_muted: "❌ This user is not muted.",

  kick_title: "👉 *User Kicked*",
  kick_message: "👢 {username} has been kicked from the group (can rejoin).\nReason: {reason}",
  kick_user_dm: "👉 You have been kicked from {group}.\n\nReason: {reason}",

  // ===== RULES COMMAND =====
  rules_title: "📋 *Group Rules*\n\n",
  rules_no_rules: "❌ No rules have been set for this group.",
  rules_set_success: "✅ Rules saved.",
  rules_set_error: "❌ Error saving rules.",

  // ===== REPORT COMMAND =====
  report_title: "🚨 *Report*",
  report_success: "✅ Your report has been sent to administrators.",
  report_message: "🚨 *New Report*\n\nGroup: {group}\nUser: @{username}\nReason: {reason}",
  report_no_reply: "❌ Please reply to a message.",
  report_self: "❌ You cannot report yourself.",

  // ===== STATS COMMAND =====
  stats_title: "📊 *Today's statistics*",
  stats_messages_today: "📨 Messages today: {count}",
  stats_members_joined: "➕ Joined: {count}",
  stats_members_left: "➖ Left: {count}",
  stats_warns: "⚠️ Warnings: {count}",
  stats_bans: "🚫 Bans: {count}",
  stats_mutes: "🔇 Mutes: {count}",
  stats_deleted_messages: "🗑 Deleted messages: {count}",
  stats_spam_detected: "🕵️ Spam detected: {count}",
  stats_reports_received: "🚨 Reports: {count}",
  stats_links_deleted: "🔗 Deleted links: {count}",
  stats_files_deleted: "📁 Deleted files: {count}",

  // ===== MEMBER STATS =====
  member_stats_title: "👤 *User Statistics*",
  member_stats_user: "User: @{username}",
  member_stats_messages: "Messages: {count}",
  member_stats_warns: "Warnings: {count}",
  member_stats_joined: "Joined: {date}",

  // ===== MEMBERS ACTIVITY (/azolar) =====
  members_stats_title: "👥 *Member Activity*",
  members_period_day: "in 1 day",
  members_period_week: "in 1 week",
  members_period_month: "in 1 month",
  members_stats_line: "*{label}:* ➕ joined {joins} / ➖ left {leaves}",

  // ===== FILTERS =====
  filter_bad_words: "🚫 Bad word detected.",
  filter_bad_words_deleted: "🚫 Message deleted for bad word.",
  filter_spam_link: "🔗 Spam link detected.",
  filter_spam_link_deleted: "🔗 Message deleted for spam link.",
  filter_flood: "💬 Flood detected.",
  filter_flood_deleted: "💬 Message deleted for flood.",
  filter_caps: "🔤 Exceeded caps limit.",
  filter_caps_deleted: "🔤 Message deleted for excessive caps.",
  filter_emoji: "😂 Too many emojis.",
  filter_emoji_deleted: "😂 Message deleted for excessive emojis.",
  filter_forward: "↩️ Message forwarding is not allowed.",
  filter_forward_deleted: "↩️ Forwarded message deleted.",

  // ===== CHANNELS =====
  channels_title: "📢 *Required Channels*",
  channels_add_success: "✅ Channel added.",
  channels_remove_success: "✅ Channel removed.",
  channels_list: "📢 Channels:\n{list}",
  channels_no_channels: "❌ No required channels set.",
  channels_join_required: "❌ Please subscribe to these channels to join:\n{channels}",

  // ===== ADMIN PANEL =====
  admin_title: "🔧 *Admin Panel*",
  admin_unauthorized: "❌ You do not have access to the admin panel.",
  admin_back: "⬅️ Back",

  // ===== WHOIS COMMAND =====
  whois_title: "👤 *User Information*",
  whois_user_id: "ID: {id}",
  whois_username: "User: @{username}",
  whois_first_name: "First name: {first_name}",
  whois_last_name: "Last name: {last_name}",
  whois_status: "Status: {status}",
  whois_warns: "Warnings: {warns}",
  whois_banned: "Banned: {banned}",
  whois_muted: "Muted: {muted}",
  whois_joined: "Joined: {date}",
  whois_user_word: "User",
  whois_reply_required: "Send `/kim` as a *reply* to the user's message.",
  whois_profile_title: "👤 {user} profile",
  whois_status_label: "Status: {status}",
  whois_status_banned: "🚫 Banned",
  whois_status_muted: "🔇 Muted",
  whois_status_normal: "🟢 Normal",
  whois_warnings_line: "⚠️ Warnings: {count}",
  whois_deleted_line: "🗑 Deleted messages: {count}",
  whois_joined_line: "📅 First joined the group: {date}",
  whois_unknown_date: "Unknown",

  // ===== DELETE COMMAND =====
  delete_success: "✅ Message deleted.",
  delete_error: "❌ Could not delete the message (it may already be deleted or too old).",
  delete_no_reply: "Reply to the message you want to delete with `/ochirish`.",

  // ===== SETTINGS HANDLER =====
  settings_moderation: "🛡 Moderation",
  settings_filters: "🔒 Filters",
  settings_automod: "🤖 AutoMod",
  settings_captcha: "✅ Captcha",
  settings_bad_words: "❌ Bad Words",
  settings_links: "🔗 Links",
  settings_flood: "💬 Flood",
  settings_caps: "🔤 Caps",

  // ===== USER MANAGEMENT =====
  users_list: "👥 *Users*",
  users_whitelist: "⚪ Whitelist",
  users_blacklist: "⚫ Blacklist",
  users_add_whitelist: "✅ Added to whitelist.",
  users_remove_whitelist: "❌ Removed from whitelist.",
  users_add_blacklist: "🚫 Added to blacklist.",
  users_remove_blacklist: "⚫ Removed from blacklist.",

  // ===== ADVANCED SETTINGS =====
  advanced_title: "🔧 *Advanced Settings*",
  advanced_raid_protection: "🛡 Raid Protection",
  advanced_captcha_required: "✅ Captcha Required",
  advanced_global_channels: "📡 Global Channels",
  advanced_save_logs: "📝 Save Logs",

  // ===== LIST COMMANDS =====
  whitelist_add_success: "added to whitelist.",
  whitelist_remove_success: "removed from whitelist.",
  blacklist_add_success: "added to blacklist and banned.",
  blacklist_add_reason: "Added by admin",
  blacklist_remove_success: "removed from blacklist.",
  badword_add_usage: "Enter a word.\nFor example: `/yomon_soz_qoshish word`",
  badword_add_success: "{word} added to bad words list.",
  badword_remove_usage: "Enter a word.\nFor example: `/yomon_soz_ochirish word`",
  badword_remove_success: "{word} removed from bad words list.",

  // ===== CHANNEL COMMANDS =====
  channel_add_usage: "Enter the channel username.\nFor example: `/kanal_qoshish @my_channel`\n\nNote: the bot must be an administrator of that channel.",
  channel_not_found: "Channel not found. Check the username and make sure the bot is an administrator of the channel.",
  channel_add_success: "✅ Channel added: {title}",

  // ===== LOG CHANNEL COMMAND =====
  log_channel_usage:
    "Enter the channel username.\nFor example: `/log_kanal @my_log_channel`\nTo disable: `/log_kanal off`\n\nNote: the bot must be an administrator of that channel.",
  log_channel_removed: "✅ Log channel removed.",
  log_channel_set: "✅ Log channel set: {{title}}",

  // ===== ERROR MESSAGES =====
  error_owner_only: "⛔ This command is only for the bot owner.",
  error_reply_user: "❌ Please reply to a user's message.",
  admin_choose_section: "Select one of the sections below:",

  // ===== HANDLERS =====
  captcha_not_for_you: "❗ This captcha is not for you.",
  captcha_verified: "✅ Verified! You can now write.",
  captcha_verify_failed: "⚠️ You're verified, but the bot couldn't lift the restriction — grant the bot the \"Restrict members\" admin right in the group and try again.",
  channels_not_joined: "❗ You haven't joined all channels yet.",
  thank_you: "✅ Thank you!",
  rules_title: "Current rules:",
  rules_change_instruction: "To change the rules:\n`/qoidalarni_ornatish <new text>`",
  list_empty: "List is empty.",
  users_description: "⚪ *Whitelist* — users exempt from all filters.\n⚫ *Blacklist* — users who are blocked when they try to write to the group.\n\nTo add, send a command in reply to the user's message:\n`/royxat_qoshish` — to whitelist\n`/royxatdan_chiqarish` — from whitelist\n`/qora_royxat_qoshish` — to blacklist\n`/qora_royxat_ochirish` — from blacklist",

  // ===== SETTINGS HANDLERS =====
  settings_title: "⚙️ *Bot Settings*\n\nChoose a section:",
  settings_error_not_found: "Error: settings not found.",
  settings_moderation_title: "🛡 *Moderation*\n\nTap to enable/disable filters:",
  settings_filter_unknown: "Unknown setting.",
  settings_toggle_on: "✅ Enabled",
  settings_toggle_off: "⛔ Disabled",
  settings_admin_only: "⛔ Only admins can use this button.",
  
  // ===== CHANNELS HANDLERS =====
  channels_title: "📡 *Required Channels*\n\n",
  channels_empty: "📋 No channels added yet.",
  channels_list_title: "📋 *Channel List* (tap to remove):",
  channels_remove_success: "✅ Channel removed.",
  
  // ===== USERS HANDLERS =====
  users_whitelist_title: "⚪ *Whitelist*",
  users_blacklist_title: "⚫ *Blacklist*",
  users_whitelist_empty: "⚪ Whitelist is empty.",
  users_blacklist_empty: "⚫ Blacklist is empty.",
  
  // ===== REPORTS HANDLERS =====
  reports_title: "🚨 *Reports*\n\n",
  reports_limit_info: "Current limit: *{limit}* reports\n\nPending reports: *{pending}*\n\n",
  reports_set_limit_title: "🔢 Set report limit:",
  reports_limit_set: "✅ Limit set to {limit}.",
  reports_no_pending: "❌ Reports cancelled, no action taken.",
  
  // ===== RULES HANDLERS =====
  rules_set_title: "📋 Current rules:",
  rules_no_rules: "No rules set.",
  rules_change_instruction: "To change rules:\n`/qoidalarni_ornatish <new text>`",
  
  // ===== ADMIN HANDLERS =====
  admin_title: "👑 *Admin Panel*",
  admin_menu: "👑 *Admin Panel*\n\nChoose a section:",
  admin_menu_closed: "Panel closed.",
  admin_stats_title: "📊 *Bot Statistics (Global)*",
  admin_broadcast_title: "📢 *Send message to all groups*",
  admin_broadcast_success: "✅ Message sent to {target}.\n\n📨 Sent: *{sent}*\n❌ Failed: *{failed}*",
  admin_channels_title: "📡 *Global Channels*",
  admin_channels_empty: "No global channels added.",
  admin_close_panel: "❌ Close Panel",
  
  // ===== ADVANCED HANDLERS =====
  advanced_title: "🔧 *Advanced Settings*\n\nChoose a section:",
  advanced_warns_title: "⚠️ After how many warnings auto-ban?",
  advanced_warns_set: "✅ Set to {value}.",
  advanced_flood_title: "🚫 How many messages count as spam?",
  advanced_flood_set: "✅ Set to {value}.",
  advanced_flood_time_title: "⏱ Time window in seconds?",
  advanced_flood_time_set: "✅ Set to {value}s.",
  advanced_emoji_title: "😊 Max emojis per message?",
  advanced_emoji_set: "✅ Set to {value}.",
  advanced_caps_title: "🔠 Delete at what percentage of capitals?",
  advanced_caps_set: "✅ Set to {value}%.",
  advanced_slow_mode_title: "🐢 Seconds between messages? (0 = disabled)",
  advanced_slow_mode_set: "✅ Set to {value}s.",
  
  // ===== STATS HANDLERS =====
  stats_title: "📊 *Statistics*",
  stats_loading: "⏳ Loading...",
  
  // ===== KEYBOARDS =====
  keyboard_settings: "⚙️ Settings",
  keyboard_moderation_filter: "🛡 Moderation",
  keyboard_users_list: "👥 Users",
  keyboard_channels_list: "📡 Channels",
  keyboard_rules_view: "📋 Rules",
  keyboard_stats_view: "📊 Statistics",
  keyboard_advanced_settings: "🔧 Advanced",
  keyboard_admin_panel: "👑 Admin",
  keyboard_back: "⬅️ Back",
  keyboard_close: "❌ Close",
  keyboard_on: "✅ Enabled",
  keyboard_off: "⛔ Disabled",



  // ===== FILTERS =====
  link_filter: "Link Filter",
  badwords_filter: "Bad Words Filter",
  apk_filter: "APK Filter",
  zip_filter: "ZIP Filter",
  exe_filter: "EXE Filter",
  rar_filter: "RAR Filter",
  xapk_filter: "XAPK Filter",
  apkm_filter: "APKM Filter",
  flood_filter: "Flood Protection",
  spam_filter: "Anti-Spam",
  forward_filter: "Anti-Forward",
  emoji_filter: "Emoji Spam Filter",
  caps_filter: "CAPS Filter",
  ad_filter: "Ad Filter",
  sticker_filter: "Sticker/GIF Spam",
  duplicate_filter: "Duplicate Spam",
  captcha_filter: "Captcha (new members)",
  raid_filter: "Anti-Raid Protection",
  service_messages_filter: "Delete join/leave messages",

  // ===== MODERATION FILTER MESSAGES =====
  reason_blacklisted: "Blacklisted user",
  reason_blocked_file: "Sent a forbidden file type",
  reason_link: "Sending links is not allowed",
  reason_badword: "Used a forbidden word",
  reason_caps: "Excessive use of capital letters",
  reason_emoji: "Emoji spam",
  reason_forward: "Forwarded messages are not allowed",
  reason_ad: "Advertisement message detected",
  reason_sticker_spam: "Sticker/GIF spam",
  reason_duplicate: "Repeatedly sending the same message",
  reason_slowmode: "Slow mode: you must wait at least {{seconds}}s between messages",
  reason_flood: "Flood/spam detected",
  moderation_mention_user: "user",
  moderation_banned: "🚫 {{mention}} was banned for exceeding the warning limit.\nReason: {{reason}}",
  moderation_warned: "⚠️ {{mention}}, your message was deleted.\nReason: {{reason}}\nWarning: {{current}}/{{max}}",
  log_message_deleted: "🗑 *Message deleted*\nUser: `{{userId}}`\nReason: {{reason}}",

  // ===== REPORTS HANDLER (extra) =====
  reports_footer_hint: "Users send `/hisobot` in reply to a message.",
  report_ban_confirmed: "🚫 [{{label}}](tg://user?id={{userId}}) was banned after confirmed reports.",
  report_warn_confirmed: "⚠️ [{{label}}](tg://user?id={{userId}}) was warned ({{current}}/{{max}}).",
  reason_reports_limit: "Report limit exceeded",
  report_user_label: "User",

  // ===== STATS HANDLER (extra) =====
  stats_weekly_title: "📅 *Weekly statistics (7 days)*\n\n{{stats}}",
  stats_monthly_title: "🗓 *Monthly statistics (30 days)*\n\n{{stats}}",
  stats_members_title:
    "👥 *Member statistics*\n\n*Last 1 day:* ➕ joined {{dayJoins}} / ➖ left {{dayLeaves}}\n*Last 1 week:* ➕ joined {{weekJoins}} / ➖ left {{weekLeaves}}\n*Last 1 month:* ➕ joined {{monthJoins}} / ➖ left {{monthLeaves}}",
  stats_top_admins_title: "🏆 *Most active admins*\n\n{{list}}",
  stats_no_admin_actions: "No moderation actions recorded yet.",
  stats_top_admin_line: "{{rank}}. [Admin](tg://user?id={{adminId}}) — *{{count}}* actions",

  // ===== ADVANCED HANDLER (extra) =====
  advanced_badwords_list_title:
    "🤬 *Bad words* ({{count}}):\n\n{{list}}\n\nAdd: `/yomon_soz_qoshish <word>`\nRemove: `/yomon_soz_ochirish <word>`",

  // ===== CHANNELS HANDLER (extra) =====
  channels_status_title:
    "📢 *Required channel*\n\nStatus: {{status}}\n\nTo add a channel, make the bot an *admin* of that channel, then send here:\n`/kanal_qoshish @channel_username`",
  channels_add_hint: "Make the bot an admin of the channel, then: /kanal_qoshish @username",
  channels_check_thanks: "✅ Thanks! Now try sending a message in the group.",

  // ===== ADMIN HANDLER (extra) =====
  admin_channel_list_title: "📡 *Required channels*\n\n{{list}}",
  admin_broadcast_prompt_users:
    "📢 Send the message you want to broadcast to all users here now.\n\nText, photo, video, file — any message type works.",
  admin_broadcast_prompt_groups:
    "📣 Send the message you want to broadcast to all connected groups here now.\n\nText, photo, video, file — any message type works.",
  admin_broadcast_cancelled: "Cancelled",
  admin_channels_intro:
    "📡 *Required channels*\n\nUsers who haven't joined the added channels won't be able to use the bot in private chat.\n\n⚠️ The bot must be an *administrator* of any channel you add.",
  admin_channel_removed: "✅ Channel removed",
  admin_channel_add_prompt:
    "➕ Send the channel username (e.g. `@mychannel`).\n\n⚠️ The bot must be an *administrator* of that channel, otherwise it can't verify membership.",
  admin_channel_username_required: "Please send the channel username as text.",
  admin_channel_not_found:
    "❌ Channel not found. Check the username is correct and that the bot is an admin of that channel.",
  admin_channel_added: "✅ Channel added: {{title}}",
  admin_broadcast_sending: "⏳ Sending message, please wait...",
  admin_broadcast_target_users: "user(s)",
  admin_broadcast_target_groups: "group(s)",

  // ===== ADMIN KEYBOARD (extra buttons) =====
  admin_btn_broadcast_users: "📢 Message to users",
  admin_btn_broadcast_groups: "📣 Message to groups",
  admin_btn_channels: "📡 Required channels",
  admin_btn_cancel: "✖️ Cancel",
  admin_btn_channel_add: "➕ Add channel",
  admin_btn_channel_list: "📋 Channel list",

  // ===== ADVANCED KEYBOARD (extra buttons) =====
  advanced_btn_warnings: "⚠️ Warning count",
  advanced_btn_spamcount: "🚫 Spam: message count",
  advanced_btn_spamwindow: "⏱ Spam: time window",
  advanced_btn_emoji: "😊 Emoji limit",
  advanced_btn_caps: "🔠 CAPS percentage",
  advanced_btn_slowmode: "🐢 Slow mode",
  advanced_btn_badwords: "🤬 Bad words list",

  // ===== REPORTS KEYBOARD (extra buttons) =====
  reports_btn_setlimit: "🔢 Change report limit",

  // ===== STATS KEYBOARD (extra buttons) =====
  stats_btn_weekly: "📅 Weekly",
  stats_btn_monthly: "🗓 Monthly",
  stats_btn_members: "👥 Members (joined/left)",
  stats_btn_topadmins: "🏆 Most active admins",

  // ===== LANGUAGE COMMAND/HANDLER (extra) =====
  language_invalid: "❌ Invalid language.",
  error_unexpected: "❌ Something went wrong.",
  error_unexpected_retry: "❌ Something went wrong, please try again later.",

  // ===== REPORT COMMAND (extra) =====
  report_admin_cannot_report: "You can't report administrators.",
  report_confirm_btn: "✅ Confirm",
  report_reject_btn: "❌ Reject",
  default_group_name: "Group",

  // ===== GLOBAL/GROUP CHANNEL GATE (extra) =====
  private_join_channels_prompt: "👋 Please join the following channel(s) before using the bot:",
  group_join_channels_prompt: "👋 {{mention}}, join the following channel(s) to write in the group:",
  join_channel_btn: "✅ I've joined",
  default_channel_name: "Channel",
  default_user_name: "User",

  // ===== CAPTCHA (extra) =====
  captcha_not_bot_btn: "✅ I'm not a bot",
  captcha_welcome_prompt: "👋 {{mention}}, welcome to the group!\n\nTap the button below within {{minutes}} min to start writing.",
  raid_detected: "🚨 *Raid detected!* {{threshold}}+ members joined in a short time. Admins should take a look.",

  // ===== BOT ADDED TO GROUP (extra) =====
  bot_added_welcome:
    "👋 Hi! I'm a moderation bot.\n\nGive me *administrator* rights so I can work at full capacity.\nOpen settings: /sozlamalar\nFor help: /yordam",

};