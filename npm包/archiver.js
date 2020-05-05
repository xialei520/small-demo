//archiver是一个在nodejs中能跨平台实现打包功能的模块，可以打zip和tar包，是一个比较好用的三方模块。
const archiver = require('archiver');
const fs = require('fs');
const path = require('path');

//创建输出流
const output = fs.createWriteStream(__dirname + '/example.zip');

//生成archiver对象，打包类型为zip
let archive = archiver('zip', {
  zlib: { level: 9 } //压缩等级
})


output.on('close', function () {

  let size = archive.pointer() / 1000;
  size = size > 1000 ? (size / 1000).toFixed(2) + 'MB' : parseInt(size);
  console.log('example.zip: ' + size)

});

output.on('end', function () {
  console.log('Data has been drained');
});



archive.on('error', function (err) {
  throw err;
});

//将打包对象与输出流关联
archive.pipe(output);

const h5FilePath = path.resolve(__dirname, 'node_modules');
var file1 = h5FilePath;
//将被打包文件的流添加进archiver对象中
// archive.append(fs.createReadStream(file1), { name: 'app.js' });

//打包文件夹, 并命名
archive.directory(h5FilePath, `kkk`);

archive.finalize();