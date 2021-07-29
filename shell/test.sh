#!/bin/bash
#============ get the file name ===========  
echo -e "请输入你要读取的文件夹路径\n当前路径为${PWD}"  
read InputDir  
echo "你输入的文件夹路径为${InputDir}"  

#循环读取文件夹名  
for file_a in ${InputDir}/*
do  
    
    echo $file_a 
    echo $file_a >> a.txt
    cd $file_a
   
    cd ../
    sleep 3


    
done


read -p 'press enter end'
