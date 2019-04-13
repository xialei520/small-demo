var vm = new Vue({
	el: '#container',
	data: {
		url1: 'http://',
		url2: 'http://',
		url3: 'http://',
		once: true
	},
	methods: {
		generate(){
			if(this.once){
				console.log(this.url1,'123', this.$refs.qrcode1)
				var qrcode1 = new QRCode(this.$refs.qrcode1 , {
					text:  this.url1,
					width: 128,
					height: 128,
					colorDark : "#000000",
					colorLight : "#ffffff",
					// correctLevel : QRCode.CorrectLevel.H
				});
				var qrcode2 = new QRCode(this.$refs.qrcode2 , {
					text: this.url2,
					width: 128,
					height: 128,
					colorDark : "#000000",
					colorLight : "#ffffff",
					// correctLevel : QRCode.CorrectLevel.H
				});
				var qrcode3 = new QRCode(this.$refs.qrcode3 , {
					text: this.url3,
					width: 128,
					height: 128,
					colorDark : "#000000",
					colorLight : "#ffffff",
					// correctLevel : QRCode.CorrectLevel.H
				});
				this.once = !this.once;
				var storage = window.localStorage;
				var data = {
					url1: this.url1,
					url2: this.url2,
					url3: this.url3
				}
				var d = JSON.stringify(data)
				storage.url = d;
			}
			
			 
			
		},
		enter(){
			this.generate()
		}
	},
	 updated(){
		this.once = true;
		var imgs =  document.getElementsByTagName('img') ;
		for(var i = 0; i < imgs.length; i++){
			imgs[i].style.display = 'none'
		}
	 },
	mounted(){
		if(window.localStorage.url){
			console.log(window.localStorage.url)
			var a = JSON.parse(window.localStorage.url)
			this.url1 = a.url1;
			this.url2 = a.url2;
			this.url3 = a.url3;
		}
		
	} 
	
})