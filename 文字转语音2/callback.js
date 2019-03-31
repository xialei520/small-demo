var Name = (cb) => {
	let name = 'xialei';
	cb && cb(name)
}


Name((info)=>{
	console.log(info, "124")
})