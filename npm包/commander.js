const program = require('commander');

function range(val) {
  return val.split('..').map(Number);
}

function list(val) {
  return val.split(',');
}

function collect(val, memo) {
  memo.push(val);
  return memo;
}

function increaseVerbosity(v, total) {
  return total + 1;
}

program
  .version('0.1.0')
  .usage('[options] <file ...>')
  .option('-i, --integer <n>', 'An integer argument', parseInt)
  .option('-f, --float <n>', 'A float argument', parseFloat)
  .option('-r, --range <a>..<b>', 'A range', range)
  .option('-l, --list <items>', 'A list', list)
  .option('-o, --optional [value]', 'An optional value')
  .option('-c, --collect [value]', 'A repeatable value', collect, [])
  .option('-v, --verbose', 'A value that can be increased', increaseVerbosity, 0)
  .option('-p, --param [value]')
  .parse(process.argv);

console.log(' int: %j', program.integer);
console.log(' float: %j', program.float);
console.log(' optional: %j', program.optional);
program.range = program.range || [];
console.log(' range: %j..%j', program.range[0], program.range[1]);
console.log(' list: %j', program.list);
console.log(' collect: %j', program.collect);
console.log(' verbosity: %j', program.verbose);
console.log(' args: %j', program.args);
console.log(' param: %j', program.param)

// 执行结果
//node commander.js -i 1.2 -f 1.2 -r 1..2 -l a,b -o hehe -c heihei -v zeze

//  int: 1
//  float: 1.2
//  optional: "hehe"
//  range: 1..2
//  list: ["a","b"]
//  collect: ["heihei"]
//  verbosity: 1
//  args: ["zeze"]