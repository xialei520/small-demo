const fs = require("fs");
const path = require('path');

const mysql = require("mysql");

const connection = mysql.createConnection({
    host: '175.24.124.245',
    user: 'root',
    password: 'root',
    database: 'user',
    port: '3306'
})

connection.connect((err) => {
    if (err) {
        console.log(`mysql连接失败： ${err}`)
    } else {
        console.log(`mysql连接成功！`)
    }
})
async function insertDatabase(params) {

    const sqlQuery = `INSERT INTO song_list (songName, size, birthtime, format, url) VALUES ('${params.songName}','${params.size}','${params.birthtime}','${params.format}', '${params.url}')`
    await connection.query(sqlQuery, function (err, result) {
        if (err) {
            console.log(`SQL error: ${err}!`);
        } else {
            console.log("INSERT SUCCESS");
        }
    });
}
const fileLog = './song'

function readdir() {
    console.log(22)
    let files = fs.readdirSync(fileLog);

    let urlList = [];
    files.forEach(item => {
        let fileUrl = path.resolve(__dirname, 'song', item);
        let stats = fs.statSync(fileUrl);
        let songList = {
            songName: item.split('.')[0],
            //文件大小
            size: stats.size,
            //创建时间的时间戳
            birthtime: Date.parse(new Date(stats.birthtime)),
            //格式
            format: item.split('.')[1],

            //图片路径
            url: `http://api.xialei188.top/static/song/${item}`
        }
        insertDatabase(songList)
        console.log(songList)
        urlList.push(songList)
    })
}

readdir()