let fs = require('fs');
let Obj = {
    name: 'xialei',
    age: 18,
    sex: '男'
}
fs.writeFileSync('基本信息.json', JSON.stringify(Obj, null, 4), 'utf8', err => {
    if (err) {
        console.log('写入错误')
    }
});