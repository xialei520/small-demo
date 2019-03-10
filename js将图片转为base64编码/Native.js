export default {
	getImageBase64(img, ext){
		var canvas = document.createElement()('canvas');
		canvas.width = img.width;
		canvas.height = img.height;
		var ctx = canvas.getContext('2d');
		ctx.drawImage(img, 0, 0, img.width, img.height);
		var dataUrl = canvas.toDataURL('image/'+ ext);
		canvas = null;
		return dataUrl;
	}
}