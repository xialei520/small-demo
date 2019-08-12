const express = require('express');
const multer = require('multer');
const pathLib = require('path');
const fs = require('fs');

let server = express();
var objMulter = multer({dest: './upload'});

server.use(objMulter.any())
server.use('/', (req, res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	console.log(res.files)
	const newName = pathLib.parse(req.files[0].path).dir + "\\" + pathLib.parse(req.files[0].originalname).base;
	fs.rename(req.files[0].path, newName, err => {
		if (err) {
			res.send('上传失败')
		}else{
			res.send('上传成功')
		}
	})
})
server.listen(3000, () => {
	console.log('服务正在开启中...')
})