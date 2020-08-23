@echo off
rem for test
for /d %%a in (*) do if %%a==111 rmdir %%a
for /d %%a in (*) do echo %%a


pause>nul