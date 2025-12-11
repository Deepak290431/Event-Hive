@echo off
echo Starting EventHive Backend and Frontend...
echo.

REM Start backend server in a new window
echo Starting Backend Server on port 5000...
start cmd /k "cd /d d:\Downloads\EventHive\backend && npm run dev"

REM Wait a few seconds for backend to start
timeout /t 3 /nobreak

REM Start frontend server in a new window
echo Starting Frontend Server on port 5173...
start cmd /k "cd /d d:\Downloads\EventHive\frontend && npm run dev"

echo.
echo Both servers are starting...
echo Backend: http://localhost:5000
echo Frontend: http://localhost:5173
echo.
pause
