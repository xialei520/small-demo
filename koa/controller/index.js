const service = require('../service');
const fs = require('fs');
const path = require('path');

module.exports = {
    index(ctx, next) {
        ctx.body = ctx.request.url;
    },
    user(ctx, next) {
        service.test()
        let postdata = ctx.request.body;
        ctx.body = postdata;
    },
    upload(ctx, next) {
        // 上传多个文件

        const files = ctx.request.files.file; // 获取上传文件

        for (let file of files) {
            // 创建可读流
            const reader = fs.createReadStream(file.path);
            // 获取上传文件扩展名
            let filePath = path.resolve(`upload/${file.name}`);
            // 创建可写流
            const upStream = fs.createWriteStream(filePath);
            // 可读流通过管道写入可写流
            reader.pipe(upStream);
        }
        // ctx.redirect('/cart');

        ctx.body = "上传成功！";
    }
}