import { languageMenu } from '@/helpers/language'

  bot.action('changeLanguage', ctx => {
    ctx.editMessageText('', languageMenu)
  })
