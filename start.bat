@echo off
echo Starting N8N Hub Development Server...
echo.

REM Kill any existing Node processes
taskkill /F /IM node.exe 2>nul

REM Clean .next directory
if exist .next rmdir /s /q .next

REM Wait a moment
timeout /t 2 /nobreak >nul

REM Start development server
echo Server starting on http://localhost:3000
npm run dev

pause
