const ora = require('ora');  //用来实现node.js命令行环境的loading效果，和显示各种状态的图标等
const spinner = ora('loading...').start();

setTimeout(() => {
	spinner.color = 'yellow';
	spinner.text = 'Loading rainbows';
}, 1000);

setTimeout(() => {
	spinner.stop();
	 
}, 5000);