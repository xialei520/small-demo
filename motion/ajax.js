
function $_ajax(json){
	if(!json.method){
		json.method = "get";
	}
	if(!json.data){
		json.data = "";
	}

	ajax(json.method, json.url, json.data, json.success);
}

function ajax(method, url, data, success){
	//1、创建ajax对象
	var xhr = null;
	try{
		xhr = new XMLHttpRequest();
	}catch(error){
		xhr = new ActiveXObject("Microsoft.XMLHTTP");
	}

	if(method == "get" && data){
		url += "?" + data;
	}

	xhr.open(method, url, true);


	if(method == "get"){
		xhr.send();
	}else{
		xhr.setRequestHeader("content-type", "application/x-www-form-urlencoded"); //声明发送的数据类型
		xhr.send(data);
	}

	//<4>等待服务器返回内容
	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if(xhr.status == 200){
				//alert(xhr.responseText);
				//拿到数据以后
				if(success){
					//【3】
					success(xhr.responseText); //回调函数。
				}
			}
		}
	}
}