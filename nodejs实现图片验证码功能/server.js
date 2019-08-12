const koa = require('koa');
const app = new koa();
const Router = require('koa-router');
const router = new Router();
const svgCaptcha = require('svg-captcha');


router.get('/', (ctx, next) => {
	const options = {
		size: 4,       //验证码长度
		ignoreChars: '0kdi',   //验证码字符中排除0kdi
		noise: 2,           //干扰线条的数量
		color: true ,        // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
		background: '#cc9966' // 验证码图片背景颜色
	};
	//创建普通验证码：
	const cap = svgCaptcha.create(options);

	//调用 create() 之后，会返回一个对象，结构如下：{data:'',text:''}。
	//data：验证码 svg 图片
	//text: 验证码字符

	//创建算数式验证码
	// const cap = svgCaptcha.createMathExpr(options);
	ctx.type = 'svg'
	ctx.body = cap.data;
})

app.use(router.routes())
app.listen(3000, () => {
	console.log('server is running at http://localhost:3000')
})