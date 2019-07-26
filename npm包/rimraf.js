const rm = require('rimraf');  //rimraf 包的作用：以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除.
const path = require('path');
let addr = path.resolve(__dirname, 'example.zip')
console.log(addr)
rm(addr, function(err) {
	console.log(err);
	if(err) throw err;
})