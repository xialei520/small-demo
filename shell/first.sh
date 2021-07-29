#!/bin/bash

echo 'hell shell'
your_name="xialei"
echo ${your_name}
str="My name is \"${your_name}\"!"
readonly str
echo $str

# 获取字符串长度
echo ${#str}

# 提取字符串 从第二个字符，提取4个字符
echo ${str:3:4}

#删除变量
unset str

# 数组
arr=(1 2 3 4)
# 定义数组
arr[4]=5
echo ${arr[@]}

# 获取数组的个数
length=${#arr[@]}
echo $length

read -p 'press enter end'