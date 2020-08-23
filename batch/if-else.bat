@echo off
rem 演示if-else结构 判断字符串是否为规定的字符串
rem tip： 表达式不能出现空格
set v=18
if %v%==18 (echo yes) else (echo no)
rem 将“按任意键。。。”去掉
pause>nul