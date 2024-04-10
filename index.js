import Koa from 'koa'
import koaBody from 'koa-body'

const app = new Koa()

const log = console.log

app.use(koaBody())

function isNonEmptyObject(b) {
	return typeof b === 'object' && Object.keys(b).length !== 0
}

app.use(async ctx => {

	let time = new Date().toISOString().replace('T', ' ').replace('Z', '')
	if (ctx.query.message) {
		const message = ctx.query.message
		log(time, ctx.method, ctx.ip, ctx.path, message)
		ctx.body = { result: "ok" }
	} else {
		let obj = ''

		if (isNonEmptyObject(ctx.query)) {
			obj = JSON.stringify(ctx.query)
		}

		if (isNonEmptyObject(ctx.request.body)) {
			obj += ` ${JSON.stringify(ctx.request.body)}`
		}
		log(time, ctx.method, ctx.ip, ctx.path, obj.trim())
		ctx.body = { error: "no message" }
	}
})

app.listen(8080)

log('listening on port 8080')
