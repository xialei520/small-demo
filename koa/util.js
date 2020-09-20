//获取ip地址
module.exports = {
    getIPAdress() {
        let interfaces = require('os').networkInterfaces();
        let host = '';
        for (var devName in interfaces) {
            var iface = interfaces[devName];
            for (var i = 0; i < iface.length; i++) {
                let alias = iface[i];
                if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                    host = alias.address;
                }
            }
        }
        return host;
    }


} 