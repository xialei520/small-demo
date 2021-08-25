//数据读取json
var config = require('./config');
var QcloudSms = require("qcloudsms_js");

//短信发送工具类
function send(phoneNumber, templateId, params) {
    // 实例化QcloudSms
    var qcloudsms = QcloudSms(config.appid, config.appkey);
    var smsType = 0;
    var ssender = qcloudsms.SmsSingleSender();


    console.log('短信接受号码:' + phoneNumber);
    console.log('模版ID:' + templateId);
    console.log('模版变量:' + params);
    ssender.sendWithParam(86, phoneNumber, templateId, [params], config.smssign, "", "", function (err, res, resData) {
        if (err) {
            console.log('发送失败:', err); //发送失败
        } else {
            //所有短信全部认定发送成功
            console.log(resData);

        }
    });
}

send('18865513369', 318659, '哈哈')