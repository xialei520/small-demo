const path = require('path');

// console.log(path.dirname(''))

// console.log(path.basename('./'))
console.log(path.resolve())  //E:\Learning\small-demo\npm包
console.log(path.resolve(__dirname))  //E:\Learning\small-demo\npm包
console.log(__dirname)   //E:\Learning\small-demo\npm包   //__dirname 总是指向被执行 js 文件的绝对路径

console.log(path.resolve(__dirname, 'src'))  //E:\Learning\small-demo\npm包\src