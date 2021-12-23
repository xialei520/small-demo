const puppeteer = require('puppeteer');
(async () => {
	//启动浏览器实例
	const brower = await puppeteer.launch({headless: true});
	//创建一个Page对象
	const page = await brower.newPage();
 
	// 设置页面视窗大小
 
	//跳转至指定页面
	await page.goto('https://www.douyin.com/');
    
    let dom = await page.$("body");
    console.log(dom, 'kkkls')
    // await autoScroll(page);
	// await page.type('#kw', '王贤坤', {delay: 500});
	// await page.click("#su")
	// brower.close(); //关闭 Chromium 及其所有页面
	 
	
	 
})()