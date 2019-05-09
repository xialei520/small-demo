const demo1 = /^abc/;
const str1 = 'abcde'
console.log(demo1.test(str1))  //true 匹配以abc开始的子串

const demo2 = /^abc$/;
const str2 = 'abc'
console.log(demo2.test(str2))  //true 匹配以abc为开始和结尾的子串

const date = '20190507';
console.log(date.replace(/(\d{4})(\d{2})(\d{2})/, '$1-$2-$3')) // 2019-05-07


//匹配手机号码
const phone = '18865513369';
const regExp = /^(13[0-9]|15[0-9]|17[6-7]|18[0-9]|19[0-9])[0-9]{8}$/;
console.log(regExp.test(phone))

//匹配电子邮箱
const email = '377284071@qq.com';
const reg = /^([a-z0-9A-Z])+@([a-z0-9A-Z])+.([a-zA-Z])+$/;
console.log(reg.test(email))

//search
const str = '125dfad_=+';
console.log(str.search(/[2-8]+d/))


const path = require('path')
console.log(path.resolve(__dirname))