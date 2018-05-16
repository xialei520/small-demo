var http = require("http");
var app = http.createServer((req, res) => {});
var io = require('socket.io')(app);
var num = 1;
io.on('connection', function (socket) {
  // setInterval(function(){
  //   socket.emit('move', { hello: 'world', num:num++});
  //
  // },1000);
  socket.on('chat', function (data) {
    console.log(data);
    io.emit('getText', { text:data});
  });
});
app.listen(6789);
console.log("服务器开启");
