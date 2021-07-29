#!/bin/bash

val=`expr 2 + 2`
echo "两数之和为:$val"

a=1
b=2
echo
if [ $a == $b ]
then
    echo "a等于b"
fi
if  [ $a != $b ]
then
    echo "a不等于b"
fi

read -p 'press enter end'
