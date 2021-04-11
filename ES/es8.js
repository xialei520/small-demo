// 1. Object.values
let arr = Object.values({a:1, b:2, c:3});
console.log(arr);

//2. Object.entries

console.log(Object.entries({a:1, b:2, c:3}))

// 3. padding

console.log('string'.padStart(10, 2))
console.log('string'.padEnd(10, 2))

// 4. Object.getOwnPropertyDescriptor()

let obj = {
    name: '小王',
    age: 12
}

console.log(Object.getOwnPropertyDescriptors(obj))