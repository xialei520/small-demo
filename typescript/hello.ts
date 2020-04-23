function say(person: string){
	return 'hello' + person;
}
let name1 = 'dawei';
console.log(say(name1));

 

interface Person{
	name: string,
	age: number
}
let tom:Person = {
	name: 'Tom',
	age: 18
}
console.log(tom.age)