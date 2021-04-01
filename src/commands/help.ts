import { Telegraf, Context } from 'telegraf'
import { removeMsgFrom } from "@/middlewares/botChecks"

export function commandRun (bot: Telegraf<Context>) {
  bot.command(['help', 'start'], removeMsgFrom, ctx => {
    ctx.replyWithHTML( ctx.translate('greeting') )
  })
}
