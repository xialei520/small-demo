var express = require('express');
var app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const port = 80
const host = getIPAdress();

app.use(express.static(__dirname + '/home'));//静态目录

server.listen(port, () => {
    console.log(`server is running at http://${host}:${port}`)
});



io.on('connection', (socket) => {
    socket.on('send', (data) => {
        console.log('我的名字叫：' + JSON.stringify(data));
        socket.broadcast.emit('receive', { data: data.text })
    });
});

function getIPAdress() {
    let interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            let alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address
            }
        }
    }
}
