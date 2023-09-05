import Koa from 'koa'

const app = new Koa()

const log = console.log

app.use(async ctx => {
	if (ctx.method === 'GET' && ctx.path === "/log")  {
		let time = new Date().toISOString().replace('T', ' ').replace('Z', '')
		if (ctx.query.message) {
			const message = ctx.query.message
			log(time, ctx.ip, "log", message)
			ctx.body = { result: "ok" }
		} else {
			ctx.body = { error: "no message" }
		}
	} else {
		ctx.body = { error: "404" }
	}
})

app.listen(8080)
