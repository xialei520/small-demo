const program = require('commander');
program.version('0.0.1')
program
  .option('-d, --debug <string>', 'output extra debugging')
  .option('-s, --small', 'small pizza size')
  .option('-p, --pizza-type <type>', 'flavour of pizza');

program.parse(process.argv);

// if (program.debug) console.log(program.opts());
// if(program.small) console.log('123')

console.log(program.debug)
process.stdout.write("请输入用户名:");
process.stdin.on('data',(input)=>{
	input=input.toString().trim();
	console.log(input)
	process.exit()

})
