import { Context } from 'telegraf'

export function addToAutoRemoverQueue (ctx: Context, msg_id: number) {
	ctx.session.autoRemoverQueue['queue'][msg_id] = ctx.dbchat.autoremove_interval
}

export function deleteFromAutoRemoverQueue (ctx: Context, msg_id?: number) {
	delete ctx.session.autoRemoverQueue['to_remove'][msg_id]
}

export function autoRemoving (ctx: Context, next: () => any) {
	if (ctx.dbchat.autoremove_interval === 0) return next()
	const remove_stack = ctx.session.autoRemoverQueue

	for (let msg_id in remove_stack['queue']) {
		setTimeout(() => {
			if (msg_id in remove_stack['to_remove']) {
				ctx.deleteMessage(+msg_id)
				deleteFromAutoRemoverQueue(ctx, +msg_id)
			}
		}, remove_stack['queue'][msg_id] * 60 * 1000)

		ctx.session.autoRemoverQueue['to_remove'][msg_id] = remove_stack['queue'][msg_id]
		delete ctx.session.autoRemoverQueue['queue'][msg_id]
	}

	return next()
}
