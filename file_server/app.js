const path = require('path');
const Koa = require('koa');
const static = require('koa-static');
const app = new Koa();

app.use(static(path.resolve('static')))


app.listen(8888, 'localhost', () => {
    console.log(`server is running at http://localhost:8888`)
})
