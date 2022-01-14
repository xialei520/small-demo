

const Koa = require('koa');
const static = require('koa-static');
const koaBody = require('koa-body');
const Router = require('koa-router');
const path = require('path');
const fs = require('fs');

//获取压缩包comment信息
const AdmZip = require("adm-zip");


const app = new Koa();
const router = new Router();

app.use(static(path.join(__dirname) + '/public'))

app.use(koaBody({
	multipart: true,
	formidable: {
		maxFileSize: 200 * 1024 * 1024
	}
}))

app.use(async (ctx, next) => {
	console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
	await next();
});

router.post('/upload', async (ctx, next) => {
	const file = ctx.request.files.files;
	console.log(file.path, 'kkkkk')
	let savePath = path.resolve(__dirname, 'upload');
	if (!fs.existsSync(savePath)) {
		fs.mkdirSync(savePath)
	}
	//创建可读流
	const reader = fs.createReadStream(file.path);
	let filePath = path.resolve(__dirname, `upload/${file.name}`);
	//创建可写流
	const upStream = fs.createWriteStream(filePath);
	//可读流通过管道写入可写流
	reader.pipe(upStream);

	ctx.response.redirect('/')
})

router.get('/datas', async (ctx, next) => {
	let files = fs.readdirSync('./upload');
	let list = [];
	for (let i = 0; i < files.length; i++) {
		// console.log(files, '11', files[i])
		let zip1 = new AdmZip(`./upload/${files[i]}`).getZipComment();
		console.log(zip1, '999')
		list.push({
			zipName: files[i].split('/')[1],
			comment: zip1
		})

	}
	// console.log(JSON.stringify(list))
	ctx.response.body = {
		list
	}
	next()
})

app.use(router.routes())



app.listen(80, () => {
	console.log('server is running at http://localhost:80')
});