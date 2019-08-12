//http://tts.baidu.com/text2audio?lan=zh&ie=UTF-8&spd=2&text=你要转换的文字
console.log('121')
var http = require('http'); // 通过http模块访问百度的接口
var querystring = require('querystring'); // 处理请求参数的querystring模块
var fs = require('fs'); // fs模块，用来保存语音文件
var path = require('path'); //path模块 用来配置路径
//准备http请求的一些参数
var postData = querystring.stringify({
  "lan": "zh", // zh表示中文
  "ie": "UTF-8", // 字符编码
  "spd": 5, // 表示朗读的语速，9代表最快，1是最慢（撩妹请用2，绕口令请用9）
  "text": '浦发银行有新信号' // 这句话就是要转换为语音的，可以表白一下，XXX我爱你
});
var options = {
  "method": "GET",
  "hostname": "tts.baidu.com",
  "path": "/text2audio?" + postData
};
// 调用http模块的request方法请求百度接口
var req = http.request(options, function (res) {
  var chunks = [];
  res.on("data", function (chunk) {
    chunks.push(chunk); // 获取到的音频文件数据暂存到chunks里面
  });
  res.on("end", function () {
    // 这里用到了Buffer模块，大概意思就是把获取到的语音文件流存入到body里面，body是一个Buffer
    var file = Buffer.concat(chunks);
    // 生成的mp3文件存储的路径，文件名叫做iloveu.mp3
    var filePath = path.normalize('./t.mp3');
    // fs模块写文件    
    fs.writeFileSync(filePath, file);
  });
});
req.end();