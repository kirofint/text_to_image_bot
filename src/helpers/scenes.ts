import { BaseScene, Stage, Context } from 'telegraf'

export const autoRemoveScene = new BaseScene('removerScene')
autoRemoveScene.enter((ctx: Context) =>
	ctx.replyWithHTML(ctx.translate('autoremover_enter') + ` <code>${ctx.dbchat.autoremove_interval}</code>`)
)
autoRemoveScene.leave((ctx: Context, next: () => any) => {
	const newTimeout = ctx.message?.text
	if (typeof newTimeout == 'undefined') return next()

	ctx.dbchat.autoremove_interval = +newTimeout
	ctx.updateProperty('autoremove_interval')

	ctx.reply(
		+newTimeout > 0
			? ctx.translate('autoremover_value_set') + ' ' + newTimeout
			: ctx.translate('autoremover_value_disabled')
	)
})
autoRemoveScene.hears(/^[0-9]{1,3}$/, Stage.leave())
autoRemoveScene.on('message', (ctx: Context) =>
	ctx.reply(ctx.translate('autoremover_wrong_value'))
)
