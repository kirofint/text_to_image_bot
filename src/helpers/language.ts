const ru = {
  true: "Вкл",
  false: "Выкл",

  bot_name: "гарик",
  greeting: "Я буду присылать время от времени сгенерированные пикчи, в зависимости от текста который вы пишите (понимаю онли инглиш)\nМои настройки меняются тут => /settings_ttp",

  image_caption: "Я думаю что это",
	disable_autodelete: "Не трогать автоудалятором",

  limiter_many_clicks: "Остынь",
  limiter_too_many_clicks: "Астановитесь",

  setting_menu_title: "Пожалуйста, выбирайте что хотите настроить",
  setting_menu_item_nothing: "Ничего",
  setting_menu_item_rating: "Рейтинг",
  setting_menu_item_caption: "Подпись под фото",
  setting_menu_item_interval: "Интервал срабатывания",
  setting_menu_item_language: "Изменить язык",
  setting_menu_item_autodelete: "Автоудаление",

  language_choice: "Выберите новый язык",
  language_selected: "Ура, говорю по-русски!",
	language_already_selected: "Русский язык уже выбран",

	autoremover_choice: "Установите временной интервал автоудаления в минутах\nСейчас установлено:",
	autoremover_set_time_manually: "Начать установку",
	autoremover_enter: "Введите количество минут от 1 до 999, через которое будет произведено автоудаление\nДля отключения автоудаления введите 0\nТекущее значение:",
	autoremover_wrong_value: "Введите число в диапазоне от 1 до 999\nИли 0 для отключения автоудаления",
	autoremover_value_set: "Теперь буду удалять сообщения с интервалом минут:",
	autoremover_value_disabled: "Интервал автоудаления отключен",

	trigger_interval_choice: "Установите интервал срабатывания в процентах\nСейчас установлено:",
	trigger_interval_enter: "Введите интервал срабатывания в процентах от 1 до 99.\nДля отключения введите 0\nТекущее значение:",
	trigger_interval_wrong: "Значение должно быть числом от 1 до 99, это будет процент от интервала срабатывания. Введите 0, если вы хотите установить 100% интервал срабатывания",
	trigger_interval_set_percent_manually: "Установить интервал",
	trigger_interval_set: "Установлен процент интервала срабатывания на:",
	trigger_interval_disabled: "Теперь буду реагировать на каждое сообщение",
}

const en = {
  true: "On",
  false: "Off",

  bot_name: "garik",
  greeting: "Hi, I will send pictures similar to what you write in the chat (my guess 😆)\nYou can change my settings by command /settings_ttp",

	image_caption: "I think, it's",
	disable_autodelete: "Don't delete it",

  limiter_many_clicks: "just relax",
  limiter_too_many_clicks: "stop fucking clicking",

  setting_menu_title: 'Please, select a setting you want',
  setting_menu_item_nothing: "Nothing",
  setting_menu_item_rating: "Rating",
	setting_menu_item_caption: "Image caption",
	setting_menu_item_interval: "Trigger interval",
  setting_menu_item_language: "Language change",
  setting_menu_item_autodelete: "Auto remover",

  language_choice: "Please, choose a language",
  language_selected: "Yay, I will speak English!",
	language_already_selected: "English language has already selected",

  autoremover_choice: "Set a time interval of autoremove in minutes\nInstalled setting now:",
  autoremover_set_time_manually: "Set minutes value",
  autoremover_enter: "Enter minutes from 1 to 999 it'll be trigger autoremove action.\nTo stop auto remover enter 0\nPresent value:",
  autoremover_wrong_value: "Enter a number from 1 to 999 or 0 to disable auto remover",
  autoremover_value_set: "Now the interval is:",
	autoremover_value_disabled: "Auto remover has been disabled",

  trigger_interval_choice: "Set a time interval of trigger in percent\nInstalled setting now:",
	trigger_interval_enter: "Enter a percent trigger interval value from 1 to 99.\nTo turn it off, enter 0 number\nPresent value:",
	trigger_interval_wrong: "The value must be a number from 1 to 99 it will be like percent of interval actuation.\nEnter 0 if you want to set 100% interval actuation",
	trigger_interval_set_percent_manually: "Set trigger",
	trigger_interval_set: "Now a percent of the trigger interval is:",
	trigger_interval_disabled: "In the future I will respond to every message",
}

export const languages = { ru, en }
