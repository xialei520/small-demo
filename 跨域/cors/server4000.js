const express = require('express');
const app = express();

//设置可以请求的白名单
var whiteList = ['http://localhost:3000'];
app.use(function(req, res, next){
    let origin = req.headers.origin;
    if(whiteList.includes(origin)){
        //允许哪个源访问我
        res.setHeader('Access-Control-Allow-Origin', origin);
        //允许携带哪个头访问我
        res.setHeader('Access-Control-Allow-Headers', 'name');
        //允许哪个方法访问我
        res.setHeader('Access-Control-Allow-Methods', 'PUT');
        //允许携带cookie
        res.setHeader('Access-Control-Allow-Credentials', true);
        //预检的存活时间
        res.setHeader('Access-Control-Max-Age', 6000);
        //允许前端获取哪个头
        res.setHeader('Access-Control-Expose-Headers', 'name');

        // 该预检测不稳定，需要用max-age来控制发送预检测的时间
        if(req.method === 'OPTIONS'){
            res.end();//如果是options请求则不作处理
        }
    }
    next();
})
app.put('/', function(req, res){
    console.log(req.headers)
    res.setHeader('name', 'xl');
    res.end('我不爱你了')
})
app.get('/', function(req, res){
    console.log(req.headers)
    res.end('我不爱你了')
})

app.listen(4000);