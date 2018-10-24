const express = require('express');
let app = express();


app.get('/say', (req, res) =>{
    let {wd, cb} = req.query;
    console.log(wd);
    res.end(`${cb}('我不爱你了')`)
})

app.listen(8888);