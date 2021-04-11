import { Context } from 'telegraf'
import logger from '@/helpers/logger'

const cooldown_list = {}
export default (ctx: Context, next: () => any): void => {
  try {
    ctx.session.buttonClicksCounter[ctx.from.id] ??= 0
    const counter = ++ctx.session.buttonClicksCounter[ctx.from.id]
    const uid = ctx.from.id

    if (counter < 13) return next()
    if (counter > 18) ctx.answerCbQuery(ctx.translate('limiter_many_clicks'), true)

    if (uid in cooldown_list === false) {
      ctx.answerCbQuery(ctx.translate('limiter_too_many_clicks'))
      cooldown_list[uid] =
        setTimeout(() => {
          ctx.session.buttonClicksCounter[uid] = 0
          clearTimeout(cooldown_list[uid])
          delete cooldown_list[uid]
        }, 7000)
    }
	} catch (e) {
    logger(e)
  }
}
