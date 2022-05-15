/*
 * @Author: xialei
 * @Date: 2022-03-25 14:09:14
 * @LastEditors: xialei
 * @LastEditTime: 2022-03-25 14:28:04
 * @FilePath: \small-demo\proxy\index.js
 * @Description: 
 * 
 * Copyright (c) 2022 by 用户/公司名, All Rights Reserved. 
 */
let handler = {
    defineProperty() {

    },
    //取值 obj--》代理对象  prop--》属性
    get(obj, prop) {
        console.log(obj, prop, 'cc')
        return obj[prop] ? obj[prop] : 37;
    },
    //赋值  obj--> 代理对象   prop --> 属性  value --> 值
    set(obj, prop, value) {
        console.log(obj, prop, value)
    }
}
let target = {
    name: 'xialei',
    age: 18
}
const p = new Proxy(target, handler)
p.name = "hahah"
console.log(p.age1)