// JavaScript中延迟加载属性模式
class Myclass {

    constructor() {
        const instance = this;
        Object.defineProperty(this, 'data', {
            get() {
                const actualData = computedData();
                Object.defineProperty(instance, 'data', {
                    value: actualData,
                    writable: false,
                    configurable: false
                })

                return actualData;
            },

            configurable: true,
            enumerable: true
        })
    }

}


let p = new Myclass();
console.log(p.data, 123)
console.log(p.data, 456)


function computedData() {
    console.log('--------')
    let sum = 0;
    for (let i = 0; i < 10000; i++) {

        sum += i;
    }
    return sum;
}


const object = {
    get data() {
        const actualData = computedData();

        Object.defineProperty(this, 'data', {
            value: actualData,
            writable: false,
            configurable: false,
            enumerable: false
        })
        return actualData;
    }
}

console.log(object.data, '999')