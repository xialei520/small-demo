const ApiSpeechClient = require('baidu-aip-sdk').speech;
const Http = require("http");
const Qs = require("qs");

const Config = require('./config');

const appId = Config.app_id;
const appKey = Config.app_key;
const secretKey = Config.secret_key;
const httpPort = Config.port;

const speechClient = new ApiSpeechClient(appId, appKey, secretKey);
const voice = function (text, opts) {
    return new Promise(function (resolve, reject) {
        speechClient.text2audio(text, opts).then(function (result) {
            if (result.data) {
                resolve(result.data);
            } else {
                reject(result);
            }
        }, function (e) {
            reject(e);
        });
    });
};

const requestHandle = function (req, res) {
    res.writeHead(200, {
        "content-type": "audio/mpeg"
    });

    let rawQuery = req.url.replace(/^\/\?/, '');
    let query = Qs.parse(rawQuery);
    let speech = query.speech ? query.speech : '';

    let cuid = query.user_id;
    let per = query.per ? query.per : 0; // 发音人选择, 0为女声，1为男声，3为情感合成-度逍遥，4为情感合成-度丫丫，默认为普通女
    let spd = query.spd ? query.spd : 5; // 语速，取值0-9， 默认为5中语速
    let pit = query.pit ? query.pit : 5; // 音调，取值0-9， 默认为5中语调
    let vol = query.vol ? query.vol : 5; // 音量，取值0-15，默认为5中音量

    let options = {
        cuid,
        per,
        spd,
        pit,
        vol
    };
    voice(speech, options).then(function (data) {
        res.write(data);
        res.end();
    }).catch((e) => {
        console.log(e);
        res.end();
    })
};

const server = new Http.Server();
server.on('request', requestHandle);
server.listen(httpPort);