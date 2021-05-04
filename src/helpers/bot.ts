import { Telegraf, Context, session, Stage } from 'telegraf'
import botSettings from '@/middlewares/botSettings'
import { autoRemoveScene, triggerIntervalScene } from './scenes'
import logger from './logger'

const bot = new Telegraf(process.env.TOKEN)

bot.use(session(), (ctx: Context, next: () => any) => {
  ctx.session.buttonClicksCounter ??= {}
  ctx.session.autoRemoverQueue ??= { queue: {}, to_remove: {} }
  return next()
})

bot.use(botSettings)

const stage = new Stage([
	autoRemoveScene,
	triggerIntervalScene
], { ttl: 300 })
bot.use(stage.middleware())

bot.catch(logger)

export default bot
