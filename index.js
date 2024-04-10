import Koa from 'koa'
import koaBody from 'koa-body'

const app = new Koa()

const log = console.log

app.use(koaBody())

app.use(async ctx => {

//	if (ctx.method === 'GET' && ctx.path === "/log")  {
	let time = new Date().toISOString().replace('T', ' ').replace('Z', '')
	if (ctx.query.message) {
		const message = ctx.query.message
		log(time, ctx.ip, ctx.path, message)
		ctx.body = { result: "ok" }
	} else {
		let obj = ''

		if (typeof ctx.query === 'object') {
			console.log('!!! here')
			if (Object.keys(ctx.query).length !== 0) {
				console.log('!!! here2')
				obj = JSON.stringify(ctx.query)
			}
		}

		if (typeof ctx.request.body === 'object') {
			console.log('!!! here3')
			if (Object.keys(ctx.request.body).length !== 0) {
				console.log('!!! here4')
				obj += ' ' + JSON.stringify(ctx.request.body)
			}
		}
		log(time, ctx.ip, ctx.path, obj.trim())
		ctx.body = { error: "no message" }
	}
//	} else {
//		ctx.body = { error: "404" }
//	}
})

app.listen(8080)

log('listening on port 8080')
