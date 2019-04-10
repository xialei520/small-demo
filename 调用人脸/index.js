var AipFaceClient = require("baidu-aip-sdk").face;

// 设置APPID/AK/SK
var APP_ID = "15982031";
var API_KEY = "K2YpswAWGaVKYvLxnVTayni5";
var SECRET_KEY = "Yo2aurplj9VpKYq7aX2no65Olc1gYkri";

// 新建一个对象，建议只保存一个对象调用服务接口
var client = new AipFaceClient(APP_ID, API_KEY, SECRET_KEY);
console.log(client)