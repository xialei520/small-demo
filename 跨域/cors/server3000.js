const express = require('express');
const app = express();

//以当前文件所在的目录为静态目录
app.use(express.static(__dirname));


app.listen(3000);