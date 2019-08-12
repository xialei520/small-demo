var App = {
	transfer(src, ext, callback){
			var Img = new Image();
			Img.src = src;
			Img.onload = function(){
				var canvas = document.createElement('canvas');
				canvas.width = Img.width;
				canvas.height = Img.height;
				var ctx = canvas.getContext('2d');
				ctx.drawImage(Img, 0, 0, Img.width, Img.height);
				var dataUrl = canvas.toDataURL('image/' + ext);
				canvas = null;
				callback && callback(dataUrl)
		}
			
	}, 
	add(a, b){
		return a+ b;
	}
}
	 
	
 