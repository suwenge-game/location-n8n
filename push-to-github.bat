@echo off
echo ========================================
echo  推送代码到GitHub
echo ========================================
echo.
echo 正在推送3个提交到远程仓库...
echo.

git push

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ========================================
    echo  成功！代码已推送到GitHub
    echo ========================================
    echo.
    echo 访问: https://github.com/suwenge-game/location-n8n
) else (
    echo.
    echo ========================================
    echo  推送失败，请检查：
    echo  1. 网络连接
    echo  2. GitHub凭据
    echo  3. 仓库权限
    echo ========================================
)

echo.
pause
