const koa = require('koa');
const app = new koa();
const Router = require('koa-router');
const router = new Router();
const bodyparser = require('koa-bodyparser');
const sms = require('./sms');
const captcha = require('./captcha');
const mysql = require('./mysql')

app.use(bodyparser())

 
console.log(captcha(6))
router.post('/sms', (ctx, next) => {
	console.log(ctx.params)
	var ctx_ = ctx;
	var phone = ctx.request.body.phone,templateId = ctx.request.body.templateId;


	var time = new Date().getTime();
	var params = captcha(6);
	//数据库添加记录
	mysql.add(phone, params, time)
	//数据库删除字段
	// mysql.del(phone)
	sms(phone,templateId,params).then(function(res){
        if(res){
        	ctx_.body = 'success';
        }
    }).catch(function(err){
        ctx_.body = 'fail';
    })
})

router.get('/', ctx => {
	ctx.body = `
		<form action='/sms' method='post'>
			手机号: <input name='phone'><br>
			模板ID: <input name='templateId' value='318659'><br>
			<button type='submit'>发送</button>
		</form>
	`
})
app.use(router.routes()) 
app.listen(3000, () => {
	console.log('server is running at http://localhost:3000')
})