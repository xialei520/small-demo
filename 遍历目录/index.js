/**
 * 读取插件package.json中的name属性值
 */
const fs = require('fs');
//文件夹路径
const filePath = 'E:\\项目资产\\ehas';
let filesArray = fs.readdirSync(filePath, {encoding: 'utf8'});
console.log(filesArray)
let folderArray = filesArray.filter(item => {
    return fs.statSync(`${filePath}\\${item}`).isDirectory()
})

let pluginName = [];
folderArray.forEach(item => {
    let pkaPath = `${filePath}\\${item}\\package.json`;
   let isExist = fs.existsSync(pkaPath);
    if(isExist){
        let pkaContent = fs.readFileSync(pkaPath, 'utf8');
        try {
            pluginName.push(JSON.parse(pkaContent).name)
        }catch(e){
            console.log('package.json文件解析失败！')
        }
    }
})

fs.writeFileSync('a.txt', pluginName.join(',\n'), {encoding: 'utf8'})

console.log(pluginName)