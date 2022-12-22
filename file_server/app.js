const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const cors = require('koa2-cors')
const app = new Koa();

app.use(cors({
    origin:"*", // 允许来自指定域名请求
    maxAge: 5, // 本次预检请求的有效期，单位为秒。
    methods:['GET','POST'],  // 所允许的HTTP请求方法
    alloweHeaders:['Conten-Type'], // 服务器支持的所有头信息字段
    credentials: true // 是否允许发送Cookie
}))
app.use(static(path.resolve('static')))

   

app.listen(8888, 'localhost', () => {
    console.log(`server is running at http://localhost:8888`)
})
