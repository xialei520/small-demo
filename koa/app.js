const path = require('path');
const util = require("./util.js");

const Koa = require("koa");
const app = new Koa();
const static = require('koa-static');
const Router = require("koa-router");
const router = new Router();
const proxy = require('koa-proxy');

//加载静态资源
app.use(static(
    path.resolve('static')
))

const host = util.getIPAdress();
const port = 80;


router.get('/', (ctx, next) => {
    console.log(123);
    console.log(ctx)

    ctx.body = "8889"
})

app.
    use(router.routes())
// .use(proxy({
//     host: "http://192.168.124.4",
//     match: /^\/static\//
// }))

app.listen(port, host, () => {
    console.log(`server is running at http://${host}:${port}`)
})

