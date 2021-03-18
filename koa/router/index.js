
const controller = require('../controller');
module.exports = (router) => {
    // router.get('/user/:id', (ctx, next) => {
    //     ctx.body = ctx.request.url;
    // })


    //get请求
    router.get('/user/:id', controller.index)
    router.get('/api', controller.songList)
    router.get('/static/img', controller.imgList)

    // 0f536c69ada247429b8a9e38d3dba8bb
    router.get('/mm/:id', controller.proxy)

    //post请求
    router.post('/user', controller.user)
    //文件上传
    router.post('/uploadfiles', controller.upload)

}
