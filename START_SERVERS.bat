@echo off
title PhyChat - Server Startup
color 0A

echo ========================================
echo   PhyChat - Starting All Servers
echo ========================================
echo.

cd /d "%~dp0"

echo [1/2] Starting Backend Server (Port 8000)...
start "PhyChat Backend" cmd /k "cd backend && venv\Scripts\activate && python main.py"
timeout /t 3 /nobreak >nul

echo [2/2] Starting Frontend Server (Port 3000)...
start "PhyChat Frontend" cmd /k "cd pytutor-its && node node_modules\next\dist\bin\next dev"
timeout /t 5 /nobreak >nul

echo.
echo ========================================
echo   All Servers Started Successfully!
echo ========================================
echo.
echo Frontend:  http://localhost:3000
echo Backend:   http://localhost:8000
echo API Docs:  http://localhost:8000/docs
echo.
echo Opening browser...
start http://localhost:3000

echo.
echo Press any key to exit...
pause >nul
