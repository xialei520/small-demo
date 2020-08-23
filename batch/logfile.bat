@echo off
for /r "E:\Learning\small-demo\batch" %%v in (1.bat) do echo %%v
echo delete all 1.bat
for /r "E:\Learning\small-demo\batch" %%v in (1.bat) do del %%v

pause>nul