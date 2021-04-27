import { Telegraf, Context, Markup } from 'telegraf'
import { getPictureUrl } from '@/api'
import { isGroup } from '@/middlewares/botChecks'
import { addToAutoRemoverQueue, deleteFromAutoRemoverQueue } from '@/middlewares/autoRemoveAction'
import buttonClicksLimiter from '@/middlewares/buttonClicksLimiter'
import { randomy, buttonCounter } from './methods'
import logger from './logger'

const LIKES = ["❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "🤍", "🤎", "😏", "👌"]
const DISLIKES = ["👎🏻", "👎🏾", "💩", "😐", "😬", "💀", "😑", "🤯", "👹", "🤪"]

export function messagesHandler(bot: Telegraf<Context>) {
  bot.on('message', (ctx: Context, next: () => void) => {
    const msg = ctx.message?.caption || ctx.message?.text
		if (!msg) return next()
		if (
			(ctx.message.entities || ctx.message.caption_entities)?.some(item => item.type === 'text_link')
		) return next()
		const regexmsg = msg.match(/[a-zA-Z\s]+/g)
		if (!regexmsg) return next()

    const edited_msg = regexmsg.join(' ').replace(/\s{2,}/g, ' ').trim()

    edited_msg.length >= 3 && getPictureUrl(edited_msg).then((res: string) => {
      const isRatingHiddenButton = !isGroup(ctx, () => true) || !ctx.dbchat.rating_buttons
			const isAutoRemoveHiddenButton = ctx.dbchat.autoremove_interval === 0

			res && ctx.replyWithPhoto(res,
				{
          caption: !ctx.dbchat.image_caption ? '' : `_${ctx.translate('image_caption')}\\.\\.\\._` + ` *${edited_msg}*`,
          parse_mode: 'MarkdownV2',
          reply_to_message_id: ctx.message.message_id,
					reply_markup: Markup.inlineKeyboard (
						[
							Markup.callbackButton( LIKES[randomy(LIKES.length)], 'like', isRatingHiddenButton ),
							Markup.callbackButton( DISLIKES[randomy(DISLIKES.length)], 'dislike', isRatingHiddenButton ),
							Markup.callbackButton( '💾 ' + ctx.translate('disable_autodelete'), 'disable_autodelete', isAutoRemoveHiddenButton )
						], { columns: 2 }
					)
				}
			)
			.catch(logger)
			.then(msg => {
				const msg_id = msg?.['message_id']
				msg_id && !isAutoRemoveHiddenButton && addToAutoRemoverQueue(ctx, msg_id)
			})

    })
  })

  bot.action('like', buttonClicksLimiter, buttonCounter)
  bot.action('dislike', buttonClicksLimiter, buttonCounter)
	bot.action('disable_autodelete', buttonClicksLimiter, ctx => {
		const newMarkup = ctx.callbackQuery.message['reply_markup'].inline_keyboard.slice(0, -1)
		ctx.editMessageCaption('💾 💾 💾 ', Markup.inlineKeyboard(newMarkup))
		deleteFromAutoRemoverQueue(ctx, ctx.callbackQuery.message.message_id)
	})
}

export function greetingMessage (bot: Telegraf<Context>) {
  bot.on('new_chat_members', isGroup, ctx => {
    if (ctx.message.new_chat_members[0].id === ctx.botInfo.id)
      ctx.replyWithHTML( ctx.translate('greeting') )
  })
}
