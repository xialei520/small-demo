// console.log(process === global.process) //true
// 

//1. process.argv
// 包含命令行参数的数组。第一个元素会是'node'，第二个元素将是.js文件的名称，接下来的参数依次是命令行参数
console.log(process.argv) //执行node process a=1 b=2
// [ 'C:\\Program Files\\nodejs\\node.exe',
// 'E:\\Learning\\small-demo\\npm包\\process',
//  'a=1',
// 'b=2' ]



//2. process.execArgv
// 启动进程所需的 node 命令行参数。这些参数不会在 process.argv 里出现，并且不包含 node 执行文件的名字，或者任何在名字之后的参数。这些用来生成子进程，使之拥有和父进程有相同的参数
console.log(process.execArgv) //node --harmony process --version
//[ '--harmony' ]

//3. process.execPath
//开启当前进程的执行文件的绝对路径
console.log(process.execPath) 
//C:\Program Files\nodejs\node.exe

//4.process.env
//获取当前系统环境信息的对象，常规可以用来进一步获取环境变量、用户名等系统信息
console.log(process.env.USERNAME) //xialei  获取用户名

//5. process.version
//一个暴露编译时存储版本信息的内置变量NODE_VERSION的属性
console.log(process.version) //v10.13.0

//6. process.versions
//一个暴露存储node以及其依赖包版本信息的属性
console.log(process.versions)
// { http_parser: '2.8.0',
//   node: '10.13.0',
//   v8: '6.8.275.32-node.36',
//   uv: '1.23.2',
//   zlib: '1.2.11',
//   ares: '1.14.0',
//   modules: '64',
//   nghttp2: '1.34.0',
//   napi: '3',
//   openssl: '1.1.0i',
//   icu: '62.1',
//   unicode: '11.0',
//   cldr: '33.1',
//   tz: '2018e' }
