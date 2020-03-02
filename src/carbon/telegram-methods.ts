import fetch from 'node-fetch';
import fs from 'fs';
import qs from 'querystring';
import FormData from 'form-data';
import { carbon } from './carbon';

export const sendMessage = async (body: any): Promise<boolean | undefined> => {
  const payload = body?.message || body;

  try {
    const params = {
      parse_mode: 'Markdown',
      chat_id: payload.chat.id,
      reply_to_message_id: payload.message_id,
      text: 'Generate a code snippet with [Carbon](carbon.now.sh)?',
      disable_web_page_preview: true,
      reply_markup: JSON.stringify({
        inline_keyboard: [[{ text: 'Yes. 🖨', callback_data: 'yes' }]]
      })
    };
    const res = await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage?${qs.stringify(params)}`
    );
    const value: boolean = (await res.json()).ok;
    return value;
  } catch (error) {
    console.error(error);
  }
};

export const sendPhoto = async (message: Message): Promise<void> => {
  message?.text && (await carbon(message.text));
  const image = fs.createReadStream('./screenshot.png');
  const form = new FormData();
  form.append('photo', image);
  form.append('chat_id', message.chat.id);
  form.append('reply_to_message_id', message.message_id);
  try {
    await fetch(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendPhoto`, {
      method: 'POST',
      body: form,
      headers: form.getHeaders()
    });
  } catch (error) {
    console.error(error);
  }
};

export const editMessageReplyMarkup = async (
  chat_id: number | string,
  message_id: number,
  text: string
): Promise<void> => {
  const params = {
    chat_id,
    message_id,
    reply_markup: JSON.stringify({
      inline_keyboard: [[{ text, callback_data: 'clicked' }]]
    })
  };
  try {
    await fetch(
      `https://api.telegram.org/bot${process.env.BOT_TOKEN}/editMessageReplyMarkup?${qs.stringify(
        params
      )}`
    );
  } catch (error) {
    console.error(error);
  }
};
