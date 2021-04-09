import { Telegraf, Context, Markup } from "telegraf"
import { removeMsgFrom, isGroup } from "@/middlewares/botChecks"
import buttonClicksLimiter from "@/middlewares/buttonClicksLimiter"

export function commandSettings (bot: Telegraf<Context>) {

  const choice_setting_markup = (ctx: Context) => ({
		text: ctx.translate('setting_menu_title'),
		reply_markup:
			Markup.inlineKeyboard([
				Markup.callbackButton('✖️ '+ctx.translate('setting_menu_item_nothing'), 'removeMarkup'),
				Markup.callbackButton('👍👎 '+ctx.translate('setting_menu_item_rating')+`: ${ctx.translate(ctx.dbchat.rating_buttons)}`, 'needRating', !isGroup(ctx, () => true)),
				Markup.callbackButton('🤔 '+ctx.translate('setting_menu_item_caption')+`: ${ctx.translate(ctx.dbchat.image_caption)}`, 'toogleImageCaption'),
				Markup.callbackButton('🤔 '+ctx.translate('setting_menu_item_caption')+`: ${ctx.translate(ctx.dbchat.image_caption)}`, 'toogleImageCaption'),
				Markup.callbackButton('🌐 '+ctx.translate('setting_menu_item_language'), 'changeLanguage'),
			], { columns: 2 })
	})

  bot.command('settings_ttp', removeMsgFrom, ctx => {
    ctx.reply('', choice_setting_markup(ctx))
  })

  bot.action('toogleImageCaption', buttonClicksLimiter, ctx => {
    ctx.answerCbQuery(String(ctx.translate(
      ctx.dbchat.image_caption = !ctx.dbchat.image_caption
    )))
    ctx.updateProperty('image_caption')
    ctx.editMessageText('', choice_setting_markup(ctx))
  })

  bot.action('needRating', buttonClicksLimiter, ctx => {
    ctx.answerCbQuery(String(ctx.translate(
      ctx.dbchat.rating_buttons = !ctx.dbchat.rating_buttons
    )))
    ctx.updateProperty('rating_buttons')
    ctx.editMessageText('', choice_setting_markup(ctx))
  })

  bot.action('removeMarkup', ctx => ctx.deleteMessage())

	bot.action('backToMainMenu', buttonClicksLimiter, ctx => {
		ctx.editMessageText('', choice_setting_markup(ctx))
  })

  /* Language settings */
  bot.action('changeLanguage', buttonClicksLimiter, ctx => {
    ctx.editMessageText(ctx.translate('language_choice'), {
      reply_markup: Markup.inlineKeyboard([
				Markup.callbackButton('<<', 'backToMainMenu'),
        Markup.callbackButton('🇺🇸', 'en'),
        Markup.callbackButton('🇷🇺', 'ru')
      ])
    })
  })

  bot.action(['ru','en'], ctx => {
    const current_lang = ctx.dbchat.language
    const new_lang = ctx.callbackQuery.data
    if (current_lang !== new_lang) {
      ctx.dbchat.language = new_lang
      ctx.updateProperty('language')
      ctx.editMessageText(ctx.translate('language_selected'))
    } else
      ctx.answerCbQuery(ctx.translate('language_already_selected'))
  })
  /** Language settings **/
}
