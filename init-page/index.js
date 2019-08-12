const fs = require('fs');
const path = require('path');
const readline = require('readline');
const program = require('commander');
const copyFile = require('copy-template-dir');

program.option('-p, --path <string>', 'input path').parse(process.argv);

const paths = program.path;

const srcPath = path.join(process.cwd(), 'template');

const dstPath = path.join(process.cwd(), `src/modules/${paths}`);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const updateConfJSON = title => {
  const arr = paths.split('/');
  const confPath = path.join(process.cwd(), `src/modules/${arr[0]}/conf.json`);
  let conf = {};

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
    // return;
  }
  // const arr2 = Object.keys(conf[pathArr[1]]);

  conf[pathArr[1]][pathArr[2]] = {
    title
  };

  let content = JSON.stringify(conf, null, 2);

  console.log(confPath, content, 222222);

  fs.writeFile(confPath, content, 'utf8', function(err) {
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
