@echo off 
for /L %%v in (1,1,20) do ping %1.%%v
pause>nul