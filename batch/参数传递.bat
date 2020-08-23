@echo off
rem program for add new user
echo %1
echo %2
rem use: 参数传递.bat user password
net user %1 %2 /add
rem 不能在调用文件中使用参数
call 2.bat
pause