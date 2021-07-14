let consume = 0;
let wallet = {
    amount: 100
}

let handlers = {
    set(target, key, val) {
        //target  目标对象
        //key  代理对象要修改的属性

        //记录一笔消费
        consume++;
        //通过Reflect对象触发原始目标对象的属性操作
        //相当于执行target[key] = val;
        Reflect.set(target, key, val)
    }
}

let vObj = new Proxy(wallet, handlers);
//将目标对象wallet的属性amount操作改为代理对象相同属性amount的操作
vObj.amount = 97;
vObj.amount = 94;
vObj.amount = 91;
vObj.amount = 88;
vObj.amount = 85;

console.log(wallet.amount);
console.log(consume)