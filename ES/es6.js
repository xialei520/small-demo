// 1类
class Man{
    constructor(){
        this.name = 'xioaming';
    }
    console(){
        console.log(this.name)
    }
}

let person = new Man();
person.console();

//2.延展操作符
let a = [...'string'];
console.log(a);

//3.promise
Promise.resolve().then(() => {
    console.log(3)
});
console.log(1)
