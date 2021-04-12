import { Telegraf, Context } from 'telegraf'
import { removeMsgFrom } from "@/middlewares/botChecks"

export default (bot: Telegraf<Context>): void => {
  bot.command(['help', 'start'], removeMsgFrom, (ctx: Context) => {
    ctx.replyWithHTML( ctx.translate('greeting') )
  })
}
