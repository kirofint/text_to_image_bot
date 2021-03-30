import 'module-alias/register'
import 'dotenv/config'
import '@/models'
import chatHandler from './middlewares/chatHandler'
import { bot } from './helpers/bot'
import { errLogger } from './helpers/logger'
import { commandRun } from './commands/help'
import { commandSettings } from './commands/settings'
import { messagesHandler, nameFeedback } from './helpers/messagesHandler'
import { greetingMessage } from './helpers/messagesHandler'

// Middlewares
bot.use(chatHandler)
// Commands
commandRun(bot)
commandSettings(bot)
// Helpers
messagesHandler(bot)
nameFeedback(bot)
greetingMessage(bot)

bot.catch(errLogger)
bot.launch()