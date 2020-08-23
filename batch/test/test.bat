@echo off
for /d %%v in (*) do (
    
    cd %%v
    npm init
    cd ..
)

pause>nul