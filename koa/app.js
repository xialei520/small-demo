const path = require('path');
const util = require("./util.js");

const Koa = require("koa");
const app = new Koa();
const static = require('koa-static');
const fork = require('child_process').fork;

const Router = require("koa-router");
const bodyParser = require('koa-bodyparser');
const koaBody = require('koa-body');
const router = new Router();
const urlRouter = require('./router')

//设置静态资源目录
app.use(static(
    path.resolve('static')
))

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200 * 1024 * 1024    // 设置上传文件大小最大限制，默认2M
    }
}))

app.use(bodyParser());

//加载子进程
app.use((ctx, next) => {
    next()

    // const compute = fork('./child_process.js');
    // compute.send('开启一个新的子进程');
    // // 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
    // compute.on('message', sum => {
    //     console.log(`Sum is ${sum}`)
    //     compute.kill();
    // })
    // compute.on('close', (code, signal) => {
    //     console.log(`收到close事件, 子进程收到信号${signal}而终止, 退出码${code}`);
    //     compute.kill();
    // })

})



urlRouter(router);

//host 自动过去ip   port 80
const host = util.getIPAdress();
const port = 80;

app.
    use(router.routes())
    .use(router.allowedMethods())

app.listen(port, host, () => {
    console.log(`server is running at http://${host}:${port}`)
})

