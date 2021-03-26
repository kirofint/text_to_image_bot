import { Context } from "telegraf"
import { findOrCreate, updateChat } from '@/models/Chat'
export default async (ctx: Context, next: () => void) => {
  const data = await findOrCreate(ctx.chat.id)
  ctx.dbchat = data

  next()
}