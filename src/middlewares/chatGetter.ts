import { Context } from "telegraf"
import { findOrCreate } from '@/models/Chat'

export default async (ctx: Context, next: () => void) => {
  ctx.dbchat = await findOrCreate(ctx.chat.id)
  next()
}