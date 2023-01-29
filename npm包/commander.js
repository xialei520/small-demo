const {program, Option} = require('commander');

// --help 显示选项帮助

program.version('1.2.2', '-v, --vers', 'output the current version') //--version 或-V   1.2.2

//option定义选项 ，同时可以附加选项的简介
//每个选项可以定义一个短选项名称（-后面接单个字符）和一个长选项名称（--后面接一个或多个单词），使用逗号、空格或|分隔
program.option("-j, --join", "welcome to join us!");
// 一类是 boolean 型选项，选项无需配置参数；
//另一类选项则可以设置参数（使用尖括号声明在该选项后，如--expect <value> 
//<xxx>表示必传参数
//[xxxx]表示可选参数
program.option("-p, --pizza-type <type>", "flavour of pizza"); //{ join: true, pizzaType: '222' }
//设置默认值,第三个参数可以设置默认值
program.option("-c, --cheese <type>", "welcome to join us!", 'ok!');
program.option('--no-sauce', 'remove sauce') //{sauce: true}
program.option('-r, --rice [ddd]', 'remove sauce')  //不加-r-->undefined；-r--> rice:true；-r 123 --> rice:123
//变长参数选项
program.option('-n, --number <numbers...>', 'specify numbers') //-n 1 2 3 ---> number: [1, 2,3]
program.option('-l, --letter [letters...]', 'specify letters') //-l90 333 ---> letter: [90]

//其他选项配置
program
.addOption(new Option('-d, --drink <size>').choices(['small', 'medium', 'large'])) //输入指定的参数值
.addOption(new Option('-t, --timeout <delay>', 'timeout in seconds').default(60, 'one minite'))
//自定义选项处理
//该函数接收两个参数，即用户新输入的参数值和当前已有的参数值（即上一次调用自定义处理函数后的返回值），返回新的选项参数值
function myParseInt(value, previous){
   
  return parseInt(value, 10);
}
program.option('-i, --integer <number>', 'integer argument', myParseInt) //-l90 333 ---> letter: [90]

//解析选项
program.parse(process.argv)
//获取选项对象
let options = program.opts()
console.log("options", options )
console.log('remaining arguments', program.args)
console.log()

//获取选项值
// console.log(program.getOptionValue('join'))
