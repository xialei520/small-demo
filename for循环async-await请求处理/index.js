const fruitBasket = {
 apple: 27,
 grape: 0,
 pear: 14
};
const fruitsToGet = ["apple", "grape", "pear"];

// const getNumFruit = fruit => {
//   return fruitBasket[fruit];
// };

// const numApples = getNumFruit('pear');
// console.log(numApples); //27
const sleep = ms => {
  return new Promise(resolve => setTimeout(resolve, ms))
};

const getNumFruit = fruit => {
  return sleep(3000).then(v => fruitBasket[fruit]);
};

// getNumFruit("grape").then(num => console.log(num)); // 27
const control = async _ => {
  console.log('Start')

  for(let i = 0; i < fruitsToGet.length; i++){
	 const fruit = fruitsToGet[i];
	 const numFruit = await getNumFruit(fruit);
	 console.log(numFruit);
	 
  }
  console.log('End')
}
control()

let  str = '123.1123';
String.prototype.toFixed = function(s){
	// console.log(this.replace(/^\[String:(/d+)\]$/g, $1), 123)
	// const index = this.charAt('.');
	// console.log('index: ', index)
	// return this.substr(0, index+s)
}
console.log(str.toFixed(2))