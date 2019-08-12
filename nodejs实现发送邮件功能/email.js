
const nodemailer = require('nodemailer');
const path = require('path');

var transport = nodemailer.createTransport({
	host: 'smtp.qq.com', //主机
	secureConnection: true, //使用SSL
	port: 465,            //STMP端口号, 必须是465
	auth: {
        user: '377284071@qq.com',
        pass:  'hjqrdlfvsptubhda'
    }

})

var mailOptions = {
	from: '浪遏飞舟 377284071@qq.com',   //发件箱
	to: 'xl18865513369@163.com',    //收件人
	subject: 'hello',               //标题
	text: '凯乐科技考虑考虑尽快',     //纯文本  text与html只能显示一个, 默认显示html
	html: "<img src='https://ws1.sinaimg.cn/large/0065oQSqly1g04lsmmadlj31221vowz7.jpg'>",
	attachments: [
		{
			filename: '123.jpg',
			path: 'https://ws1.sinaimg.cn/large/0065oQSqly1g04lsmmadlj31221vowz7.jpg'   //文件路径
		},
		{
			filename: '',  //文件名
			content: ''    //文件内容
		}
	]
}
 
transport.sendMail(mailOptions, (err, response) => {
	if(err){
		console.log(err)
	}else{
		console.log(response)
	}
})


// module.exports = () => {
// 	transport.sendMail(mailOptions, (err, response) => {
// 		if(err){
// 			console.log(err)
// 		}else{
// 			console.log(response)
// 		}
// 	})
// }
