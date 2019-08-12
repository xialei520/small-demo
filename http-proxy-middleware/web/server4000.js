const express = require('express');
const app = express();

var proxy = require('http-proxy-middleware');



app.use('/', proxy({target: 'http://localhost:3000/', changeOrigin: true}));

app.listen(4000, () => {
	console.log('proxy-server is running at http://localhost:4000')
})