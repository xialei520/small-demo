const http = require('http');
const fork = require('child_process').fork;
let port = 8000;

const server = http.createServer()
server.on('request', (req, res) => {
	console.log(req.url, 123)
	if(req.url === '/'){
		const compute = fork('./computed.js');
		compute.send('开启一个新的子进程');
		// 当一个子进程使用 process.send() 发送消息时会触发 'message' 事件
		compute.on('message', sum => {
			res.end(`Sum is ${sum}`)
			compute.kill();
		})
		compute.on('close', (code, signal) => {
			console.log(`收到close事件, 子进程收到信号${signal}而终止, 退出码${code}`);
			compute.kill();
		})
		// console.info('计算开始', new Date());
		// const result = longComputation()
		// console.info('计算结束', new Date());
		// res.end(`sum is ${result}`)
		// console.log(process.env.NODE_ENV)
	}else{
		res.end('ok')
	}
})
//console.info(process.pid) //当前进程id
//console.log(process.ppid) //当前进程的父进程
//console.log(process.cwd()) //当前进程工作目录
//console.log(process.platform) //获取当前程序运行的操作系统平台
//console.log(process.uptime())
//捕获异常信息
// process.on('uncaughtException', (r) => {
// 	console.log(r);
// })
// process.on('exit', (r) => {
// 	console.log(r, 123)
// })
//三个标准流： process.stdout 标准输出、 process.stdin 标准输入、 process.stderr 标准错误输出
// console.log(process.stdout, 999)
// console.log(process.stdin)
//进程名称
process.title = '你电话'
// console.log(process)
server.listen(port, '127.0.0.1', () => {
	console.log(`server is running at http://127.0.0.1:${port}`)
})
