const Koa = require('koa');
const app = new Koa();
const _ = require('./common')
app.use(async (ctx) => {
    console.log('ctx//',ctx)
    if(ctx.request.url == '/'){

        ctx.response.body = `
            <form action="http://localhost:9999/form" method="post">
                <input class="name type="text" name="name" value=""><br>
                <input class="age" type="text" name="age" value=""><br>
                <button type="submit">提交</button>
            </form>
        `
    }else if(ctx.request.url == '/form'){
        console.log('request///',ctx)
        let data =  await _.receivePostData(ctx)
        ctx.response.body = data
       
    }

})
 
app.listen(9999, () => {
    console.log(`server is running at http://localhost:9999`)
})