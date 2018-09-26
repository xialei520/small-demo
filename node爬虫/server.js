var request = require('request');
var cheerio = require('cheerio');
var path = require('path');
var fs = require('fs');
var requrl="http://www.kugou.com/singer/420.html";
var listUrl=new Array();
var filenames=new Array();
request(requrl, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            acquireData(body);
        }
        for(let i=0;i<listUrl.length;i++){
           let time=new Date().getTime();
           request('http://www.kugou.com/yy/index.php?r=play/getdata&hash='+listUrl[i]+'&album_id=0'+'&_='+time, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    acquireMusic(body,i);
                }
            });
        }

 });
function acquireData(data) {
    var $ = cheerio.load(data);
    var songlist = $('#song_container input').toArray();
    for(let i=0;i<songlist.length;i++){
        let info=songlist[i].attribs.value;
        let reg=/\|/;
        let hash=new Array();
        hash=info.split(reg);
        listUrl.push(hash[1]);
        filenames.push(hash[0]);

    }
   
}
function acquireMusic(data,Num){
    var info=JSON.parse(data);
    var imgsrc=info.data.play_url;
    // var filename = parseUrlForFileName(imgsrc);
    var filename=filenames[Num];
    downloadImg(imgsrc,filename,function(){
        console.log(filename + ' done');
    });
}
 
function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}
var downloadImg = function(uri, filename, callback){
    request.head(uri, function(err, res, body){
    if (err) {
        console.log('err: '+ err);
        return false;
    }
    console.log('res: '+ res);
    request(uri).pipe(fs.createWriteStream('images/'+filename+'.mp3')).on('close', callback);  //调用request的管道来下载到 images文件夹下
    });
};

 