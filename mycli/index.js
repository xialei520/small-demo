#!/usr/bin/env node

const program = require("commander");
const shell = require("shelljs");
const download = require("git-clone");
const open = require("open");
const { spawn } = require("child_process");

program.version("1.0.0");
program
    .command("new <name>")
    .description("创建项目")
    .action((name) => {
        let giturl = "http://gitea.xialei188.top/private/demo.git";
        download(giturl, `./${name}`, () => {
            shell.rm("-rf", `${name}/.git`);
            shell.cd(name);
            shell.exec("pnpm install");
            console.log(`
            创建项目${name}成功
            cd ${name} 进入项目
            mycli run ${name}启动项目
            mycli start ${name}预览项目
            `);
        });
    });

program
    .command("run")
    .description("运行项目")
    .action(() => {
        let cp = spawn("npm", ["run", "dev"]);
        cp.stdout.pipe(process.stdout);
        cp.stderr.pipe(process.stderr);
        cp.on("close", () => {
            console.log("启动项目成功");
        });
    });

program
    .command("start")
    .description("启动项目")
    .action(() => {
        console.log("启动成功");
        open("http://localhost:8080/");
        console.log("预览项目");
    });
program.parse(process.argv);
