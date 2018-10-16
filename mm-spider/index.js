async function timeout(){
	return 'hello world';
}; 
// console.log(timeout());
timeout().then(result => {
	console.log(result)
})
console.log('虽然在后面，但是我先执行');