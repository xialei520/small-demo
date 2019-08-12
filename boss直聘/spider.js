const request = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const path = require('path');
const mysql = require('mysql');
const xlsx = require('node-xlsx');
const json = require('./city.json');

const db = mysql.createPool({
    host: 'cdb-ecuikhtu.bj.tencentcdb.com',
    user: 'root',
    password: 'xl371329',
    database: 'boss',
	port: 10028
})
var arrData = []
async function page(){
	for(let s = 1; s < 4; s++){
		let page = `https://www.zhipin.com/c101010100/?query=web%E5%89%8D%E7%AB%AF&page=${s}`
		await group(page, s)
	} 
}
async function group(url, s) {
    const data = await request.get(url);
    const $ = cheerio.load(data.text);
    console.log($('.job-list ul li').length);
    var html = $('.job-list ul li');
	var obj = {
	    name: '第'+ s +'页',
	    data: [[
	        'title', 'red', 'city', 'companyName', 'companyDetail', 'publicTime', 'publicer', 'addr', 'des'
	    ]]
	};
	for (let i = 0; i < html.length; i++) {
		let data = {
			title: html.eq(i).find('.job-primary').find('.info-primary').find('h3').find('.job-title').text(),
			red: html.eq(i).find('.job-primary').find('.info-primary').find('h3').find('.red').text(),
			url: html.eq(i).find('.job-primary').find('.info-primary').find('h3').find('a').attr('href'),
			// des: html.eq(i).find('.job-primary').find('.info-primary').find('.detail-bottom').find('.detail-bottom-text').text(),
			city: html.eq(i).find('.job-primary').find('.info-primary').find('p').text(),
			companyName: html.eq(i).find('.job-primary').find('.info-company').find('.company-text').find('h3').find('a').text(),
			companyDetail: html.eq(i).find('.job-primary').find('.info-company').find('p').text(),
			publicTime: html.eq(i).find('.job-primary').find('.info-publis').find('p').text(),
			publicer: html.eq(i).find('.job-primary').find('.info-publis').find('.name').text()
		}
		var detailUrl = 'https://www.zhipin.com'+ data.url
		await detailPage(detailUrl, data, obj)
	}
	arrData.push(obj)
}

async function detailPage(detailUrl, data, obj){
	const detailData = await request.get(detailUrl);
	const $_ = cheerio.load(detailData.text);
	data = Object.assign(data, {
		des: $_('.job-sec').find('.text').text(),
		addr: $_('.job-location').find('.location-address').text()
	})
	console.log(data)
	var newArr = [data.title, data.red, data.city, data.companyName,data.companyDetail, data.publicTime,  data.publicer, data.addr, data.des];
	obj.data.push(newArr)
	// await insertDatabase(data)
}
async function start() {
    await page();
    console.log('success')
	console.log(arrData)
    var buffer = xlsx.build(arrData)
    fs.writeFile('boss直聘.xlsx', buffer, function (err) {
        console.log(err)
    })
}
start()
// async function insertDatabase(data){
//     await db.query(`INSERT INTO boss (title,red,city,companyName,companyDetail,publicTime,publicer,addr,des ) VALUES ('${data.title}', '${data.red}'), '${data.city}', '${data.companyName}', '${data.companyDetail}', '${data.publicTime}', '${data.publicer}','${data.addr}', '${data.des}'`, function (err, data) {
//         if (err) {
//             console.error(err);
//         } else {
//              console.log('success')
//         }
//     })
// }
 