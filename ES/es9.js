// 1.异步迭代

async function process(array){
    for  (let i of array){
       await new Promise(resolve => {
            setTimeout(() => {
                console.log(i)
                resolve()
            }, randomTime())
        })
       
    }
}
let array = ['1', '2', '3', '4'];
process(array);

 

function randomTime(){
    
    let random = Math.floor(Math.random() * 10);
    console.log('random', random)
    return random;
}

// 2. Promise.finally()

Promise.resolve(1).then(res => console.log('then', res)).catch(e => console.log('catch', e)).finally(end => console.log('end', end))

// 3.

const values = [1, 3, 4, 3, 1,4, 5,6];
let a = new Set(values)
console.log(Array.isArray(a))

