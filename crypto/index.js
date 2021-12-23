const fs = require('fs');
const crypto = require('crypto');
const content = fs.readFileSync('./demo.txt', 'utf-8');
// 创建哈希函数 sha256
const hash = crypto.createHash('sha256'); 
 
// 输入流编码：utf8、ascii、binary（默认）
hash.update(content, 'utf8');
// 输出编码：hex、binary、base64
console.log(hash.digest('hex'));

 