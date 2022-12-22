const fs = require('fs');
const glob = require('glob');
glob('static/mm/*.jpg', (err, files) => {
    console.log(files)
    let imgs = [];
    for(let item of files){
        imgs.push(`http://localhost:8888/${item}`) 
    }
    fs.writeFile('aaa.txt',JSON.stringify(imgs, null, 4),  (err, result) => {
        console.log(result)
    })
})