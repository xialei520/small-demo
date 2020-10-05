
const controller = require('../controller');
module.exports = (router) => {
    // router.get('/user/:id', (ctx, next) => {
    //     ctx.body = ctx.request.url;
    // })


    //get请求
    router.get('/user/:id', controller.index)
    router.get('/api', controller.songList)

    //post请求
    router.post('/user', controller.user)
    //文件上传
    router.post('/uploadfiles', controller.upload)

}
