import 'module-alias/register'
import 'dotenv/config'
import '@/models'
import bot from './helpers/bot'
import { autoRemoving } from './middlewares/autoRemoveAction'
import commandGreeting from './commands/greeting'
import commandSettings from './commands/settings'
import { messagesHandler, greetingMessage } from './helpers/messagesHandler'

// Middlewares
bot.use(autoRemoving)
// Commands
commandGreeting(bot)
commandSettings(bot)
// Helpers
messagesHandler(bot)
greetingMessage(bot)

bot.launch()
