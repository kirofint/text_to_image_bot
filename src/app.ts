import 'module-alias/register'
import 'dotenv/config'
import '@/models'
import { bot } from './helpers/bot'
import { errLogger } from './helpers/logger'
import { commandRun } from './commands/help'
import { messagesHandler } from './helpers/messagesHandler'

// Commands
commandRun(bot)
// Helpers
messagesHandler(bot)

bot.catch(errLogger)
bot.launch()