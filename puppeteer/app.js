const puppeteer = require('puppeteer');
(async () => {
	//启动浏览器实例
	const brower = await puppeteer.launch({headless: false});
	//创建一个Page对象
	const page = await brower.newPage();
	const dimensions = await page.evaluate(() => {//执行js代码
		return {
			width: document.documentElement.clientWidth,
			height: document.documentElement.clientHeight,
			
		};
	});
	// 设置页面视窗大小
	await page.setViewport(dimensions);
	//跳转至指定页面
	await page.goto('https://www.baidu.com');
	await page.screenshot({
		//保存路径
		path: './1.png',
		//是否保存完整页面
		fullPage: true
	})
	 // await autoScroll(page);
	await page.type('#kw', '王贤坤', {delay: 500});
	await page.click("#su")
	// brower.close(); //关闭 Chromium 及其所有页面
	function autoScroll(page) {
	    return page.evaluate(() => {
	      return new Promise((resolve) => {
	        var totalHeight = 0;
	        var distance = 100;
	        // 每200毫秒让页面下滑100像素的距离
	        var timer = setInterval(() => {
	          var scrollHeight = document.body.scrollHeight;
	          window.scrollBy(0, distance);
	          totalHeight += distance;
	          if (totalHeight >= scrollHeight) {
	            clearInterval(timer);
	            resolve();
	          }
	        }, 200);
	      })
	    });
	  }
	
	 
})()