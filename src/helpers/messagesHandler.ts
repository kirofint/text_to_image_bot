import { Telegraf, Context, Markup } from 'telegraf'
import { getPictureUrl } from '@/api'
import { isGroup } from '@/middlewares/botChecks'
import buttonClicksLimiter from '@/middlewares/buttonClicksLimiter'
import { randomy, buttonCounter } from './methods'
import { errLogger } from './logger'

const LIKES = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "😏", "👌"]
const DISLIKES = ["👎🏻", "👎🏾", "💩", "😐", "😬", "💀", "😑", "🤯", "👹", "🤪"]

export function messagesHandler(bot: Telegraf<Context>) {
  bot.on('message', (ctx, next) => {
    const msg = ctx.message?.caption || ctx.message?.text
    if (!msg) return next()
    const regexmsg = msg.replace(/(?:https?):\/\/[\n\S]+/g, '').match(/[a-zA-Z\s]+/g)
    if (!regexmsg) return next()
    const edited_msg = regexmsg.join(' ').replace(/\s{2,}/g, ' ').trim()
    
    edited_msg.length >= 3 && getPictureUrl(edited_msg).then((res: string) => {
      const isHideButtons = !isGroup(ctx, () => true) || !ctx.dbchat.rating_buttons
      res && ctx.replyWithPhoto(res, {
          caption: !ctx.dbchat.image_caption ? '' : `_${ctx.translate('image_caption')}\\.\\.\\._` + ` *${edited_msg}*`,
          parse_mode: 'MarkdownV2',
          reply_to_message_id: ctx.message.message_id,
          reply_markup: Markup.inlineKeyboard([
            Markup.callbackButton( LIKES[randomy(LIKES.length)], 'like', isHideButtons),
            Markup.callbackButton( DISLIKES[randomy(DISLIKES.length)], 'dislike', isHideButtons)
          ])
      }).catch(errLogger)
    })
  })

  bot.action('like', buttonClicksLimiter, buttonCounter)
  bot.action('dislike', buttonClicksLimiter, buttonCounter)
}
export function nameFeedback (bot: Telegraf<Context>) {
}

export function greetingMessage (bot: Telegraf<Context>) {
  bot.on('new_chat_members', isGroup, ctx => {
    if (ctx.message.new_chat_members[0].id === ctx.botInfo.id)
      ctx.replyWithHTML( ctx.translate('greeting') )
  })
}