import { Context, Markup } from 'telegraf'

export function randomy(from: number, to: number = 0): number {
  if (to <= 0 || to < from) {
    to = to ?? 0;
    // If to is less than from it'll swap 
    [to, from] = [from, to]
  }

  // From should not be exactly to
  from === to && (to++)

  // From should not be less than zero
  if (from <= 0 || from === 1 && !to) {
    from = 0
    to <= 0 && (to = from + 1)
  }

  return Math.floor(
    Math.random() * (to - from) + from
  )
}

export function buttonCounter (ctx: Context) {
  ctx.answerCbQuery()
  const btn_list = ctx.callbackQuery.message['reply_markup'].inline_keyboard[0]
  const updated_list = btn_list.map(item => {
    let text = item.text;
    if (item.callback_data === ctx.match) {
      const text_parts = text.split(' ')
      const part_numb = text_parts[2] ? (+text_parts[2] + 1) : 1
      text = text_parts[0] + ' x ' + part_numb
    }
    return text
  })

  ctx.editMessageReplyMarkup(
    Markup.inlineKeyboard([
      Markup.callbackButton(updated_list[0], 'like'),
      Markup.callbackButton(updated_list[1], 'dislike'),
    ])
  )
}