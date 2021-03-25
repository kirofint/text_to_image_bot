import { Telegraf, Context, Markup } from 'telegraf'
import { getPictureUrl } from '@/api'
import { randomy, buttonCounter } from './methods'
import { errLogger } from './logger'

const LIKES = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎"]
const DISLIKES = ["👎🏻", "👎🏾", "💩", "😐", "😬", "💀"]

export function messagesHandler(bot: Telegraf<Context>) {
  bot.on('message', ctx => {
    const msg = ctx.message?.caption || ctx.message?.text
    const regexmsg = msg.replace(/(?:https?):\/\/[\n\S]+/g, '')
                        .match(/[a-zA-Z\s]+/g)
                        .join(' ')
                        .replace(/\s{2,}/g, ' ')
                        .trim()

    regexmsg.length && getPictureUrl(regexmsg).then((res: string) => {
      res && ctx.replyWithPhoto(res, {
          caption: `_Я думаю это подойдёт под описание_: *${regexmsg}*`,
          parse_mode: 'MarkdownV2',
          reply_to_message_id: ctx.message.message_id,
          reply_markup: Markup.inlineKeyboard([
            Markup.callbackButton( LIKES[randomy(LIKES.length)], 'like' ),
            Markup.callbackButton( DISLIKES[randomy(DISLIKES.length)], 'dislike' )
          ])
      }).catch(errLogger)
    })
  })

  bot.action('like', buttonCounter)
  bot.action('dislike', buttonCounter)
}