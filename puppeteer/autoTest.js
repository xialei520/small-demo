const puppeteer = require('puppeteer');
const readline = require('readline');
const {Command} = require('commander');
const program = new Command()
program.option('-p, --path <string>', 'input path').parse(process.argv);

const options = program.opts();
console.log(options, 'j');
(async () => {
	//启动浏览器实例
	const brower = await puppeteer.launch({headless: false, defaultViewport: {width:0, height: 0}});
	//创建一个Page对象
	const page = await brower.newPage();
	
	const r1 = readline.createInterface({
		input: process.stdin,
		output: process.stdout
	})
	r1.question('请输入测试URL：', async (answer) => {
		console.log('succcesss', answer)
		start(page, answer)
		r1.close()
	})
	 
})()

async function start(page, url){
	
	//跳转至指定页面 'http://localhost:9999'
	await page.goto(url);
    
	await page.waitForSelector('.name');

	const $name = await page.$('.name');
	await $name.type('1111111', {
	  delay: 100
	});
	
	const $age = await page.$('.age');
	await $age.type('testtest', {
	  delay: 100
	});
	
	const $button = await page.$('button[type="submit"]');
	await $button.click();
}