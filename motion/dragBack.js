function dragBack(obj){
	var offsetX = 0;
	var offsetY = 0;
	var arr = []; //记录路径
	obj.onmousedown = function(ev){
		var e = ev || window.event;
		offsetX = e.clientX - this.offsetLeft;
		offsetY = e.clientY - this.offsetTop;
		document.onmousemove = function(ev){
			var e = ev || window.event;
			obj.style.left = e.clientX - offsetX + "px";
			obj.style.top = e.clientY - offsetY + "px";

			//<1>在这个地方画线
			var node = document.createElement("div");
			node.style.width = "5px";
			node.style.height = "5px";
			node.style.backgroundColor = "black";
			node.style.position = "absolute";
			node.style.left = obj.offsetLeft + obj.offsetWidth / 2 + "px";
			node.style.top = obj.offsetTop + obj.offsetHeight / 2 + "px";
			document.body.appendChild(node);
			//记录路径
			arr.push({
				l: obj.offsetLeft + "px",
				t: obj.offsetTop + "px"
			})
		}
		document.onmouseup = function(){
			document.onmousemove = null;
			//<2>松手以后可以原路返回,需要记录所走过的路径
			//启动定时器，往回走
			var timer = setInterval(function(){
				var frame = arr.pop();
				if(frame){
					obj.style.left = frame.l;
					obj.style.top = frame.t;
				}else{
					clearInterval(timer);
				}
				
			}, 20);
		}
	}
}