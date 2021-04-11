import { Telegraf, Context, session } from 'telegraf'
import logger from './logger'

const bot = new Telegraf(process.env.TOKEN)

bot.use(session(), (ctx: Context, next: () => any) => {
  ctx.session.buttonClicksCounter ??= {}
  ctx.session.autoRemoverQueue ??= { queue: {}, to_remove: {} }
  return next()
})

bot.catch(logger)

export default bot
