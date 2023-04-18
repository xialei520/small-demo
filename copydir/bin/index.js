#!/usr/bin/env node

import path from "path";
import { readFileSync, access, constants } from "fs";
import { exec, execSync } from "child_process";

//package.json的路径
let pkgPath = path.resolve(process.cwd(), "./package.json");
//取出项目名称
let basename = path.basename(process.cwd());
//取出项目版本号
let { version } = JSON.parse(readFileSync(pkgPath, "utf8"));

if (process.argv.length < 4) {
    console.log("参数有误，请重新输入！", process.argv);
    process.exit(0);
}
// TODO: 判断dest是否与当前项目name关联
let src = process.argv[2];
let dest = path.resolve(process.argv[3], `./v${version}`);

access(dest, constants.F_OK, async (err) => {
    if (err) {
        await execSync(`cd ${process.argv[3]} && mkdir v${version}`);
    }
    exec(`XCOPY ${src} ${dest} /S /E /Y`, { stdio: "inherit" }, async (err, stdout, stderr) => {
        if (err) throw err;
        console.log("copy successfully !!!");
    });
});
