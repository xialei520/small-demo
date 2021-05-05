const path = require('path');
const fs = require('fs');
const request = require('request');
const rimraf = require('rimraf');
const { resolve } = require('path');
const { func } = require('assert-plus');


process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

if (fs.existsSync('mm1')) {
    rimraf('./mm1', (err) => {
                if (err) {
                    console.log('err==>', err)
        } else {
            fs.mkdirSync('mm1');

            }
            })
            }
            else {
                fs.mkdirSync('mm1');

}
function download(imgUrl) {
    console.log(`正在下载${imgUrl}`)


    const filename = imgUrl.split('/').pop();
    request({
        url: imgUrl,
        method: "GET",
        headers: {
            'content-type': "application/json",
        }
    }, () => {

    }).pipe(fs.createWriteStream(path.join(__dirname, 'mm1', `${filename}.jpg`)))
    // request.get()
    //     .set({ 'Referer': 'https://gank.io/' })
}

const url = 'https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/1000';

function start() {
    request(url, (err, response, body) => {
        console.log(err)
        if (!err && response.statusCode === 200) {
            let urlList = JSON.parse(response.body).data;
            urlList.forEach(item => {
                download(item.url)
                sleep(3000)
            })
        }
    })
}

 


function sleep(timeout) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, timeout);
    })
}

start()