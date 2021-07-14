let obj1 = {};
Object.defineProperty(obj1, 'name', {
    //数据描述符
    value: 'xialei',
    writable: false,

    //以下为共享键值
    configurable: false,
    enumerable: false
})

obj1.name = "xiaowang"

console.log(obj1.name);

let age = 18;
Object.defineProperty(obj1, 'age', {
    //存取描述符
    get() {
        return age;
    },
    set(newVal) {
        age = newVal;
    },
    //以下为共享键值
    configurable: false,
    enumerable: false
})

console.log(obj1.age, '-----')
obj1.age = '90';
console.log(obj1.age, '888')