const readline = require('readline');
const program = require('commander');
const path = require("path");
const copyFile = require('copy-template-dir');

const rl = readline.createInterface({
  input:process.stdin,
  output:process.stdout
})

// program
//     .version('0.0.1')
//     // .option('-p, --peppers', 'Add peppers')
//     .option('-P, --pineapple <string>', 'Add pineapple')
//     .option('-b, --bbq', 'Add bbq sauce')
//     .option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')
//     .option('-p, --path <string>', 'input path')
//     .parse(process.argv);

// console.log('you ordered a pizza with:');

// if (program.peppers) console.log('  - peppers');
// if (program.pineapple) console.log('  - pineapple');
// if (program.bbq) console.log('  - bbq');
// console.log('  - %s cheese', program.cheese);

program.option('-p, --path <string>', 'input path').parse(process.argv);

const paths = program.path;
console.log(paths)
// 
// console.log(program)
const srcPath = path.join(process.cwd(), 'test');
const desPath = path.join(process.cwd(), `${paths}`)
console.log(srcPath, desPath)


rl.question('你输入一句话试试？',(answer) => {
	copyFile(srcPath, desPath, {title: answer}, (err, results) => {
		if(err){
			console.error(err);
			return;
		}
		console.log(results)
		// Object.keys(results).forEach(name => {
		// 	const version = results[name];
		// 	console.log(`package name: ${name}, version: ${version}`)
		// })
	})
  console.log('你说的话是：'+ answer)
  rl.close()
})