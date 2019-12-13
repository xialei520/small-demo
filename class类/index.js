// function Student(name){
// 	this.name= name
// }
// Student.prototype.hello = function(){
// 	console.log('hello, '+ this.name);
// }
// let liming = new Student('liming');
// liming.hello()

class Student{
	constructor(name) {
	    this.name = name;
	}
	hello(){
		console.log('hello, '+ this.name);
	}
}
var xiaoming = new Student('小明');
xiaoming.hello()

class PrimaryStudent extends Student{
	constructor(name, grade){
		super(name);
		this.grade = grade;
	}
	myGrade(){
		console.log('I am '+this.name +'grade at: '+ this.grade)
	}
}
var student = new PrimaryStudent('小wang', 90);
student.myGrade();
student.hello();

class Rectangle{
	//构造函数
	constructor(width, height) {
	    this.width = width;
		this.height = height;
	}
	//get方法
	get area(){
		return this.calcArea();
	}
	//定义方法
	calcArea(){
		return this.width * this.height;
	}
	
}
const square = new Rectangle(300, 400);
console.log(square.calcArea())
// ================================================
// static
class Point{
	constructor(x, y){
		this.x = x;
		this.y = y;
	}
	//为一个静态方法, 该静态new出来的对像不能进行使用
	static distance(a, b){
		const dx = a.x - b.x;
		const dy = a.y - b.y;
		return Math.hypot(dx, dy);
	}
}
const p1 = new Point(10, 10);
const p2 = new Point(5, 5);
console.log(Point.distance(p1, p2))
// =========================================================
class Animal{
	constructor(name){
		this.name = name;
	}
	speak(){
		console.log('0000000000000000')
	}
}
class Lion extends Animal{
	constructor(name){
		//用super调用超类
		super(name)
	}
	speak(){
		super.speak();
	}
}
let d= new Animal();
d.name = 'ming';
d.speak();
let L = new Lion('llsdkf');
L.speak()