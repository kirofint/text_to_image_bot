import 'module-alias/register'
import 'dotenv/config'
import '@/models'
import chatGetter from './middlewares/chatGetter'
import { bot } from './helpers/bot'
import { errLogger } from './helpers/logger'
import { commandRun } from './commands/help'
import { messagesHandler } from './helpers/messagesHandler'

bot.use(chatGetter)
// Commands
commandRun(bot)
// Helpers
messagesHandler(bot)

bot.catch(errLogger)
bot.launch()