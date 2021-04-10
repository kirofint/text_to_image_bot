import { Telegraf, session } from 'telegraf'

export const bot = new Telegraf(process.env.TOKEN)

bot.use(session(), (ctx, next) => {
  ctx.session.buttonClicksCounter ??= {}
  ctx.session.autoRemoverQueue ??= { queue: {}, to_remove: {} }
  return next()
})

