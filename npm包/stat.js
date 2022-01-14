const fs = require('fs');
fs.stat('./example.zip', (err, stats) => {
    if(err) throw err;      // <strong>可以利用此处判断文件是否存在，不存在会报err。</strong>
    // console.log(stats.isFIle())//判断是否为文件
    console.log(stats.isDirectory())//判断是否为文件夹
    console.log(stats) //打印文件相关信息
})