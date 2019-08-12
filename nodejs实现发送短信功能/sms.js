//数据读取json
var config = require('./config');
//短信发送工具类
module.exports = function (phoneNumber,templateId,params){
    var QcloudSms = require("qcloudsms_js");
    // 实例化QcloudSms
    var qcloudsms = QcloudSms(config.appid, config.appkey);
    var smsType = 0; 
    var ssender = qcloudsms.SmsSingleSender();
     
    return new Promise(function(resolve,reject){
        console.log('短信接受号码:'+phoneNumber);
        console.log('模版ID:'+templateId);
        console.log('模版变量:'+params);
        ssender.sendWithParam(86, phoneNumber.split(','), templateId, [params], config.smssign, "", "", function(err,res,resData){
            if (err) {
                reject();//发送失败
            } else {
                //所有短信全部认定发送成功
                console.log(resData);
                resolve(true);
            }
        });

        //发送语音验证码  需要企业认证
        // var cvsender = qcloudsms.CodeVoiceSender();
        // cvsender.send("86", phoneNumber, "1234", 2, "", (err,res,resData) =>{
        //      if (err) {
        //         reject();//发送失败
        //     } else {
        //         //所有短信全部认定发送成功
        //         console.log(resData);
        //         resolve(true);
        //     }
        // });
    });

   
}