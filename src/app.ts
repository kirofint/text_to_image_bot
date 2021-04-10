import 'module-alias/register'
import 'dotenv/config'
import '@/models'
import { Stage } from 'telegraf'
import { bot } from './helpers/bot'
import chatHandler from './middlewares/chatHandler'
import { autoRemoving } from './middlewares/autoRemoveAction'
import { autoRemoveScene } from './helpers/scenes'
import { errLogger } from './helpers/logger'
import { commandRun } from './commands/help'
import { commandSettings } from './commands/settings'
import { messagesHandler, nameFeedback } from './helpers/messagesHandler'
import { greetingMessage } from './helpers/messagesHandler'

// Middlewares
bot.use(chatHandler)
bot.use(autoRemoving)
const stage = new Stage([autoRemoveScene], { ttl: 300 })
bot.use(stage.middleware())

// Commands
commandRun(bot)
commandSettings(bot)
// Helpers
messagesHandler(bot)
nameFeedback(bot)
greetingMessage(bot)

bot.catch(errLogger)
bot.launch()
