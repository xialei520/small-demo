const array = Array(5).fill('');
let matrix = array.map(() => Array(5).fill(0));

console.log(matrix);
let arr = [5, 4, 7, 8, 9, 2];
arr.reduce((a, b) => {
    console.log(a, b)
    return a + b;
})

let arr1 = arr.reduce((a, b) => {

    return a > b ? a : b;
});
console.log(arr1)