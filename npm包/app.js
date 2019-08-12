const fs = require('fs');
const rm = require('rimraf');  //rimraf 包的作用：以包的形式包装rm -rf命令，用来删除文件和文件夹的，不管文件夹是否为空，都可删除.

const path = require('path');
var readDir = fs.readdirSync("./node_modules"); //读取目录下的所有文件夹及文件
console.log(readDir.length)
readDir.forEach((item, index, arr) => {
	// try{ //抛出异常来跳出循环
	// 	console.log(path.resolve(__dirname, item))
	// 	if(index == 1){
	// 		throw new Error()
	// 	}
	// }catch(e){
	// 	console.log(e)
	// }
	
	console.log(path.resolve(__dirname, 'node_modules', item))
	var addr = path.resolve(__dirname, 'node_modules', item);
	rm(addr, function(err) { //循环删除文件夹及文件
			console.log(err);
			 
	})
	 
	
})


 