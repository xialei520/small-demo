//定时任务
const schedule = require('node-schedule');

let task = () => {
	schedule.scheduleJob('30 * * * * *', () => {
		console.log('scheduleCronstyle:' + new Date());
	})
}
task();