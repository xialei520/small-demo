const puppeteer = require('puppeteer');

// page.type 获取输入框焦点并输入文字

// page.keyboard.press 模拟键盘按下某个按键，目前mac上组合键无效为已知bug

// page.waitFor 页面等待，可以是时间、某个元素、某个函数

// page.frames() 获取当前页面所有的 iframe，然后根据 iframe 的名字精确获取某个想要的 iframe


// iframe.$('.srchsongst') 获取 iframe 中的某个元素

// iframe.evaluate() 在浏览器中执行函数，相当于在控制台中执行函数，返回一个 Promise


// Array.from 将类数组对象转化为对象

// page.click() 点击一个元素

// iframe.$eval() 相当于在 iframe 中运行 document.queryselector 获取指定元素，并将其作为第一个参数传递

// iframe.$$eval 相当于在 iframe 中运行 document.querySelectorAll 获取指定元素数组，并将其作为第一个参数传递

(async () => {
	const broswer = await (puppeteer.launch({executablePath: '', headless: false}));
	const page = await broswer.newPage();

	await page.goto('https://music.163.com/'); 

	// 点击搜索框拟人输入 鬼才会想起
   const musicName = '鬼才会想';
   await page.type('#g_search', musicName, {delay: 0});

   // 回车
   await page.keyboard.press('Enter');
})()