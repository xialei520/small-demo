const http = require('http');

const appid = 'wx21a6b94eecd5db83';
const secret = '76acf54d0615687bfd3d902807d4d5d7';

http.get({
  hostname: `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appid}&secret=${secret}`,
  port: 80,
  path: '/',
  agent: false  // 仅为此一个请求创建一个新代理。
}, (res) => {
  // 用响应做些事情。
});