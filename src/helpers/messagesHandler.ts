import { Telegraf, Context, Markup } from 'telegraf'
import { getPictureUrl } from '@/api'
import { isGroup } from '@/middlewares/botChecks'
import { randomy, buttonCounter } from './methods'
import { errLogger } from './logger'

const LIKES = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎"]
const DISLIKES = ["👎🏻", "👎🏾", "💩", "😐", "😬", "💀"]

export function messagesHandler(bot: Telegraf<Context>) {
  bot.on('message', (ctx, next) => {
    const msg = ctx.message?.caption || ctx.message?.text
    if (!msg) return next()
    const regexmsg = msg.replace(/(?:https?):\/\/[\n\S]+/g, '').match(/[a-zA-Z\s]+/g)
    if (!regexmsg) return next()
    const edited_msg = regexmsg.join(' ').replace(/\s{2,}/g, ' ').trim()
    
    edited_msg.length && getPictureUrl(edited_msg).then((res: string) => {
      res && ctx.replyWithPhoto(res, {
          caption: `_Я думаю это подойдёт под описание_: *${edited_msg}*`,
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

export function greetingMessage (bot: Telegraf<Context>) {
  bot.on('new_chat_members', isGroup, ctx => {
    if (ctx.message.new_chat_members[0].id === ctx.botInfo.id)
      ctx.replyWithHTML( ctx.translate('greeting') )
  })
}