import 'source-map-support/register';
import { bot } from './carbon';

let messages: Map<number, Message> = new Map();
const saveMessage = (message: Message) => messages.set(message.message_id, message);
const removeMessage = (id: number) => messages.delete(id);

export const carbonBot = async (botToken: string, body: Update) => {
  if (botToken) {
    const { sendReply, editMessageReplyMarkup, sendPhoto } = bot(botToken);
    const validMessageWithCode = body?.message?.entities || body?.edited_message?.entities;
    const isCode = validMessageWithCode?.find(
      (ent: { type: any }) => ent.type === 'code' || ent.type === 'pre'
    );
    const callbackQuery = body?.callback_query;
    const queryResponse = callbackQuery?.data;
    const message = body?.message || body?.edited_message;
    let chatId, message_id, original_message_id;
    try {
      if (isCode && message) (await sendReply(message)) && saveMessage(message);
      else if (queryResponse === 'yes') {
        chatId = callbackQuery?.message?.chat.id;
        message_id = callbackQuery?.message?.message_id;
        original_message_id = callbackQuery?.message?.reply_to_message?.message_id;
        if (chatId && message_id && original_message_id) {
          const savedMessage = messages.get(original_message_id);
          if (savedMessage) {
            await editMessageReplyMarkup(chatId, message_id, 'Working... ⚙️');
            await sendPhoto(savedMessage);
            await editMessageReplyMarkup(chatId, message_id, 'Success. 📝');
          } else throw Error('No saved messages to create code snippet');
          removeMessage(original_message_id);
        }
      }
    } catch (error) {
      console.error(error);
      if (chatId && message_id) await editMessageReplyMarkup(chatId, message_id, 'Unavailable. ❌');
    }
  } else console.trace('Invalid token');
};
