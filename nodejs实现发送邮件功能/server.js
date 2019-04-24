const koa = require('koa');
const app = new koa();
const email = require('./email')

app.use( ctx => {
	email()
	ctx.body = '坎坎坷坷扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩扩'
})


app.listen(3000, () => {
	console.log('server is running at http://localhost:3000')
})