@echo off
chcp 65001 >nul
cd /d "%~dp0"
echo ========================================
echo VNLibrary Ultimate - Cai dat Windows
echo ========================================
echo.
call npm install
if errorlevel 1 goto fail
call npm run db:setup
if errorlevel 1 goto fail
call npm run db:seed
if errorlevel 1 goto fail
echo.
echo Cai dat thanh cong. Chay START.bat de mo website.
pause
exit /b 0
:fail
echo.
echo Co loi. Hay doc dong loi phia tren.
pause
exit /b 1
