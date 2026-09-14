@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   自动添加新文章到 posts.json
echo ================================================
echo.

cd /d "%~dp0"

echo [1/3] 检查 Node.js...
node --version > nul 2>&1
if errorlevel 1 (
    echo ❌ 错误: 未找到 Node.js
    echo.
    echo 请先安装 Node.js: https://nodejs.org/
    echo.
    pause
    exit /b 1
)
echo ✅ Node.js 已安装
echo.

echo [2/3] 运行添加脚本...
echo.
node add-new-article.js

echo.
echo [3/3] 完成！
echo.
echo ================================================
echo   按任意键退出...
echo ================================================
pause > nul
