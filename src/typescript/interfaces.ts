type ChatType = 'private' | 'group' | 'supergroup' | 'channel';
type MessageEntityType =
  | 'mention'
  | 'hashtag'
  | 'bot_command'
  | 'url'
  | 'email'
  | 'bold'
  | 'italic'
  | 'code'
  | 'pre'
  | 'text_link'
  | 'text_mention';

interface Message {
  message_id: number;
  from?: User;
  date: number;
  chat: Chat;
  forward_from?: User;
  forward_from_chat?: Chat;
  forward_from_message_id?: number;
  forward_signature?: string;
  forward_sender_name?: string;
  forward_date?: number;
  reply_to_message?: Message;
  edit_date?: number;
  media_group_id?: string;
  author_signature?: string;
  text?: string;
  entities?: MessageEntity[];
  caption_entities?: MessageEntity[];
  new_chat_members?: User[];
  left_chat_member?: User;
  new_chat_title?: string;
  delete_chat_photo?: boolean;
  group_chat_created?: boolean;
  supergroup_chat_created?: boolean;
  channel_chat_created?: boolean;
  migrate_to_chat_id?: number;
  migrate_from_chat_id?: number;
  pinned_message?: Message;
  connected_website?: string;
  reply_markup?: InlineKeyboardMarkup;
}

interface User {
  id: number;
  is_bot: boolean;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code?: string;
}

interface Chat {
  id: number;
  type: ChatType;
  title?: string;
  username?: string;
  first_name?: string;
  last_name?: string;
  description?: string;
  invite_link?: string;
  pinned_message?: Message;
  permissions?: ChatPermissions;
  can_set_sticker_set?: boolean;
  sticker_set_name?: string;
  /**
   * @deprecated since version Telegram Bot API 4.4 - July 29, 2019
   */
  all_members_are_administrators?: boolean;
}

interface MessageEntity {
  type: MessageEntityType;
  offset: number;
  length: number;
  url?: string;
  user?: User;
}

interface InlineKeyboardMarkup {
  inline_keyboard: InlineKeyboardButton[][];
}

interface InlineKeyboardButton {
  text: string;
  url?: string;
  callback_data?: string;
  switch_inline_query?: string;
  switch_inline_query_current_chat?: string;
  pay?: boolean;
}

interface ChatPermissions {
  can_send_messages?: boolean;
  can_send_media_messages?: boolean;
  can_send_polls?: boolean;
  can_send_other_messages?: boolean;
  can_add_web_page_previews?: boolean;
  can_change_info?: boolean;
  can_invite_users?: boolean;
  can_pin_messages?: boolean;
}

interface Update {
  update_id: number;
  message?: Message;
  edited_message?: Message;
  channel_post?: Message;
  edited_channel_post?: Message;
  inline_query?: InlineQuery;
  chosen_inline_result?: ChosenInlineResult;
  callback_query?: CallbackQuery;
}

interface InlineQuery {
  id: string;
  from: User;
  location?: Location;
  query: string;
  offset: string;
}

interface ChosenInlineResult {
  result_id: string;
  from: User;
  location?: Location;
  inline_message_id?: string;
  query: string;
}

interface Location {
  longitude: number;
  latitude: number;
}

interface CallbackQuery {
  id: string;
  from: User;
  message?: Message;
  inline_message_id?: string;
  chat_instance: string;
  data?: string;
  game_short_name?: string;
}
