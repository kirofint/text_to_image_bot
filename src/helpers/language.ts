import { Markup } from 'telegraf'

export const languageMenu = {
  text: 'Выберите язык',
  reply_markup: Markup.inlineKeyboard([
    Markup.callbackButton('<<', 'languageBack'),
    Markup.callbackButton('🇺🇸', 'lang_us'),
    Markup.callbackButton('🇷🇺', 'lang_ru')
  ])
}
