import { Context } from "telegraf"
import { findOrCreate, updateChat } from '@/models/Chat'
import { errLogger } from '@/helpers/logger'
import { languages } from '@/helpers/language'
export default async (ctx: Context, next: () => void) => {
  const data = await findOrCreate(ctx.chat.id)
  ctx.dbchat = data
  ctx.translate = (key: string): string => {
    const word_value =
      languages[data.language]?.[key] ||
      languages['en']?.[key]
    
    if (!word_value) {
      errLogger(Error(`The word was not defined: ${key}`))
      return 'Something wrong with translate 😒'
    }
    return word_value
  }

  next()
}