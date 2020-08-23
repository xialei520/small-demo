@echo off 
if exist E:\Learning\small-demo\1.bat (
    echo file is find!
    del E:\Learning\small-demo\1.bat
) else (
    echo file is not find 
)

pause>nul