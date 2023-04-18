const Koa = require("koa");
const app = new Koa();
app.use(async (ctx, next) => {
    console.log(ctx.request.url);
    let str = "";
    ctx.req.on("data", function (chunk) {
        str += chunk;
    });
    ctx.req.on("end", (chunk) => {
        console.log(str, "done");
    });
    // ctx.response.body = JSON.stringify({
    //     code: 200,
    //     msg: "success"
    // });
});
app.listen(3000, () => {
    console.log("server is running");
});
