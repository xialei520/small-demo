let time = '啦啦啦'
setTimeout((function(time){
	return function(){
		console.log(time)
	}
})(), 2000)