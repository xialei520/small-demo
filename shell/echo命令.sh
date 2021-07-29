#!/bin/bash

# read 命令从标准输入中读取一行,并把输入行的每个字段的值指定给 shell 变量
read name
echo "输出变量：$name"

# 显示换行  -e 开启转义
echo -e "ok! \n"
echo "It is a test"

# 显示不换行 -e 开启转义 \c 不换行
echo -e "ok! \c"
echo "It is a test"

# 显示结果输出到文件
echo "It is a test" > myTest


# 原样输出字符串，不进行转义或取变量(用单引号)
echo '$name\"'

# 显示命令执行结果 结果将显示当前日期
echo `date`


read -p 'press enter end'
