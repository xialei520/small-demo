const fs = require('fs');
const path = require('path');
const readline = require('readline');
const program = require('commander');
const copyFile = require('copy-template-dir');

//node init-page.js -p Home/index/index
program.option('-p, --path <string>', 'input path').parse(process.argv);

const paths = program.path; //Home/index/index

const srcPath = path.join(process.cwd(), 'template'); //E:\Learning\small-demo\npm包\template

const dstPath = path.join(process.cwd(), `src/${paths}`); //E:\Learning\small-demo\npm包\src\modules\Home\index\index
console.log(srcPath, dstPath, 9999)
const rl = readline.createInterface({
    input: process.stdin, //要监听的可读流。此选项是必需的
    output: process.stdout // 将逐行读取数据写入的可写流
});

const updateConfJSON = title => {
    const arr = paths.split('/');
    const confPath = path.join(process.cwd(), `src/${arr[0]}/conf.json`);
    let conf = {};
    console.log(conf, 99111990, confPath)
    try {
        conf = require(confPath);
    } catch (error) {

    }

    checkJSON(conf, arr, title, confPath);
};

const checkJSON = (conf, pathArr, title, confPath) => {
    const arr = Object.keys(conf);

    const secondCheck = arr.every(el => {
        return pathArr[1] !== el;
    });

    if (secondCheck) {
        conf[pathArr[1]] = {};
        conf[pathArr[1]][pathArr[2]] = {
            title
        };
    }
    conf[pathArr[1]][pathArr[2]] = {
        title
    };
    let content = JSON.stringify(conf, null, 2);

    console.log(confPath, content, 222222);

    fs.writeFile(confPath, content, 'utf8', function (err) {
        if (err) {
            return console.log(err);
        }
        console.log('The conf.json was updated!');
    });
};

rl.question('input title: ', answer => {
    copyFile(
        srcPath,
        dstPath,
        r => {
            if (!r) {
                updateConfJSON(answer);
                console.log('create success!');
            }
        }
    );
    rl.close();
});
