const mysql = require('mysql');
const db = mysql.createPool({
    host: 'cdb-ecuikhtu.bj.tencentcdb.com',
    user: 'root',
    password: 'xl371329',
    database: 'mm',
	port: 10028
})

 
module.exports = {
	add(phone, captcha, time){
		return new Promise((resolve, reject) => {
			db.query(`INSERT INTO captcha (phone, captcha, time) VALUES ('${phone}', '${captcha}', '${time}')`, function (err, data) {
		        if (err) {
		            console.error(err);
		        } else {
		             console.log('插入数据库成功!')
		        }
		    })
		})
	},
	del(phone){
		return new Promise((resolve, reject) => {
			db.query( `DELETE FROM captcha WHERE phone = '${phone}'`, function (err, data) {
		        if (err) {
		            console.error(err);
		        } else {
		             console.log(`字段${phone}删除成功!`)
		        }
		    })
		})
	},
	change(){

	},
	query(){

	}
}