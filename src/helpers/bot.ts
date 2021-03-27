import { Telegraf, session } from 'telegraf'

export const bot = new Telegraf(process.env.TOKEN)

bot.use(session(), (ctx, next) => {
  ctx.session.buttonClicksCounter ??= {}
  return next()
})

