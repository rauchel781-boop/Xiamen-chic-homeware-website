@echo off
echo 正在启动本地服务器...
echo.
echo 服务器启动后，请在浏览器中打开：
echo http://localhost:8000/外贸客户管理系统.html
echo.
echo 按 Ctrl+C 可以停止服务器
echo.
python -m http.server 8000
pause
