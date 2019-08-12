module.exports = (number) =>{
		var str = '';
		for(var i = 0; i < number; i++){
			str += Math.floor(Math.random() * 10)
		}
		return str;
}