import { Telegraf, Context, Markup, Stage } from "telegraf"
import { removeMsgFrom, isGroup } from "@/middlewares/botChecks"
import buttonClicksLimiter from "@/middlewares/buttonClicksLimiter"
import logger from "@/helpers/logger"


export function commandSettings (bot: Telegraf<Context>) {
	function choice_setting_markup (ctx: Context) {
		const markup_body = [ctx.translate('setting_menu_title'),
			{
				reply_markup:
					Markup.inlineKeyboard([
						Markup.callbackButton('✖️ ' + ctx.translate('setting_menu_item_nothing'), 'removeMarkup'),
						Markup.callbackButton('👍👎 ' + ctx.translate('setting_menu_item_rating') + `: ${ctx.translate(ctx.dbchat.rating_buttons)}`, 'needRating', !isGroup(ctx, () => true)),
						Markup.callbackButton('🌐 ' + ctx.translate('setting_menu_item_language'), 'changeLanguage'),
						Markup.callbackButton('⏳ ' + ctx.translate('setting_menu_item_autodelete'), 'setAutoRemoveTimeout'),
						Markup.callbackButton('🤔 ' + ctx.translate('setting_menu_item_caption') + `: ${ctx.translate(ctx.dbchat.image_caption)}`, 'toogleImageCaption'),
					], { columns: 2 })
			}
		]

		ctx[ctx.message ? 'reply' : 'editMessageText'].call('', ...markup_body).catch(logger)
	}

  bot.command('settings_ttp', removeMsgFrom, choice_setting_markup)

  bot.action('toogleImageCaption', buttonClicksLimiter, ctx => {
    ctx.answerCbQuery(ctx.translate(
      ctx.dbchat.image_caption = !ctx.dbchat.image_caption
		))
    ctx.updateProperty('image_caption')
    choice_setting_markup(ctx)
  })

  bot.action('needRating', buttonClicksLimiter, ctx => {
    ctx.answerCbQuery(ctx.translate(
      ctx.dbchat.rating_buttons = !ctx.dbchat.rating_buttons
		))

    ctx.updateProperty('rating_buttons')
    choice_setting_markup(ctx)
  })

  bot.action('removeMarkup', ctx => ctx.deleteMessage())

	bot.action('backToMainMenu', buttonClicksLimiter, choice_setting_markup)

  /* Language settings */
  bot.action('changeLanguage', buttonClicksLimiter, ctx => {
    ctx.editMessageText(ctx.translate('language_choice'), {
      reply_markup: Markup.inlineKeyboard([
				Markup.callbackButton('<<', 'backToMainMenu'),
        Markup.callbackButton('🇺🇸', 'en'),
        Markup.callbackButton('🇷🇺', 'ru')
      ])
    }).catch(logger)
  })

  bot.action(['ru','en'], ctx => {
    const new_lang = ctx.callbackQuery.data
    if (ctx.dbchat.language !== new_lang) {
      ctx.dbchat.language = new_lang
      ctx.updateProperty('language')
      ctx.editMessageText(ctx.translate('language_selected'))
    } else
      ctx.answerCbQuery(ctx.translate('language_already_selected'))
  })
	/** Language settings **/

	/* Auto remove timeout settings */
	bot.action('setAutoRemoveTimeout', buttonClicksLimiter, ctx => {
		ctx.editMessageText(ctx.translate('autoremover_choice') + ' ' + ctx.dbchat.autoremove_interval, {
      reply_markup: Markup.inlineKeyboard([
				Markup.callbackButton('<<', 'backToMainMenu'),
        Markup.callbackButton(ctx.translate('autoremover_set_time_manually'), 'autoremove_apply')
      ], { columns: 2 })
    }).catch(logger)
	})

	bot.action('autoremove_apply', buttonClicksLimiter, Stage.enter('removerScene'))
	/** Auto remove timeout settings **/
}
