import { BaseScene, Stage, Context } from 'telegraf'

export const autoRemoveScene = new BaseScene('removerScene')
	autoRemoveScene.enter((ctx: Context) =>
		ctx.replyWithHTML(ctx.translate('autoremover_enter') + ` <code>${ctx.dbchat.autoremove_interval}</code>`)
	)
	autoRemoveScene.leave((ctx: Context, next: () => any) => {
		const newTimeoutRemove = Number.parseInt(ctx.message?.text)
		if (newTimeoutRemove < 0 || newTimeoutRemove > 999) return next()

		ctx.dbchat.autoremove_interval = +newTimeoutRemove
		ctx.updateProperty('autoremove_interval')

		ctx.reply(
			+newTimeoutRemove > 0
				? ctx.translate('autoremover_value_set') + ' ' + newTimeoutRemove
				: ctx.translate('autoremover_value_disabled')
		)
	})
	autoRemoveScene.hears(/^[0-9]{1,3}$/, Stage.leave())
	autoRemoveScene.on('message', (ctx: Context) =>
		ctx.reply(ctx.translate('autoremover_wrong_value'))
	)

export const triggerIntervalScene = new BaseScene('intervalScene')
	triggerIntervalScene.enter((ctx: Context) =>
		ctx.replyWithHTML(ctx.translate('trigger_interval_enter') + ` <code>${ctx.dbchat.trigger_interval}</code>`)
	)
	triggerIntervalScene.leave((ctx: Context, next: () => any) => {
		const newPercentInterval = Number.parseInt(ctx.message?.text)
		if (newPercentInterval < 0 || newPercentInterval > 99) return next()

		ctx.dbchat.trigger_interval = newPercentInterval === 0 ? 100 : newPercentInterval
		ctx.updateProperty('trigger_interval')

		ctx.reply(
			newPercentInterval > 0
				? ctx.translate('trigger_interval_set') + ' ' + newPercentInterval
				: ctx.translate('trigger_interval_disabled')
		)
	})
	triggerIntervalScene.hears(/^[0-9]{1,2}$/, Stage.leave())
	triggerIntervalScene.on('message', (ctx: Context) =>
		ctx.reply(ctx.translate('trigger_interval_wrong'))
	)
