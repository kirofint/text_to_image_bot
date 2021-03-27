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

  bot.action('removeMarkup', ctx => ctx.deleteMessage())
  bot.action('languageBack', buttonClicksLimiter, ctx => {
    ctx.editMessageText('', choice_setting_markup(ctx))
  })

}