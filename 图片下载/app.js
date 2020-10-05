const path = require('path');
const fs = require('fs');
const request = require('request');
const { resolve } = require('path');
const { func } = require('assert-plus');

function download(imgUrl) {
    console.log(`正在下载${imgUrl}`)
    const filename = imgUrl.split('/').pop()
    request.get(imgUrl)
        .set({ 'Referer': 'https://gank.io/' }).pipe(fs.createWriteStream(path.join(__dirname, 'mm', filename)))
}

const url = 'https://gank.io/api/v2/data/category/Girl/type/Girl/page/1/count/50';

function start() {
    request(url, (err, response, body) => {

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