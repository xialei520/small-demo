// 基本语法
// let bool: boolean = true;
// let number: number = 888;
// let string: string = '1222';
// let s1:symbol = Symbol()

// 数组类型
// let arr1: number[] = [12, 11];
// let arr2: string[] = ['12',  '33'];
// let arr3: Array<number> = [1, 2, 3];
// let arr4:Array<number | string> = [1, 3, 4];

// 元祖  第一个必须为数字类型, 第二个必须为字符串, 数量必须为2
// let tuple:[number, string] = [11, '22']; 
// tuple.push('99');
// tuple[3];

//null  undefined 如果一个值声明了undefined, 就不能赋值其他类型
// let x: undefined = 'll' //报错
// let y: undefined = undefined;

//null 类型可以赋值给undefined和null, 但是不能赋值给数字/字符串/boolean
// let h: null = null;
// let s: number = undefined;
// let o: number | string | undefined = 'undefined';

// function start(){
// 	console.log('123')
// }
/*

*/
// let x:[string, number];
// x = ['Runoob', 1];
// // x = [1, 'Runoob'];
// console.log(x[1]);

//枚举类型
enum Color {Red, Green, Blue};
let c: Color = Color.Blue;
console.log(c)