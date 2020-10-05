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
module.exports = {
    test() {
        //基本的查询语句
        let sqlQuery = "select * from test_name";
        connection.query(sqlQuery, function (err, result) {
            if (err) {
                console.log(`SQL error: ${err}!`);
            } else {
                console.log(result);
                // closeMysql(connect);
            }
        });
        //查询成功后关闭mysql
        // function closeMysql(connect) {
        //     connect.end((err) => {
        //         if (err) {
        //             console.log(`mysql关闭失败:${err}!`);
        //         } else {
        //             console.log('mysql关闭成功!');
        //         }
        //     });
        // }

    },
    //获取歌曲列表
    getSongList() {
        let sqlQuery = "select * from song_list";
        connection.query(sqlQuery, function (err, result) {
            if (err) {
                console.log(`SQL error: ${err}!`);
            } else {
                console.log(result);
                // closeMysql(connect);
            }
        });
    }
}