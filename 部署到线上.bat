@echo off
chcp 65001 > nul
echo.
echo ================================================
echo   部署新文章到 www.custom-woodenbox.com
echo ================================================
echo.

cd /d "%~dp0"

echo [1/5] 检查 Git 状态...
git status
echo.

echo [2/5] 添加修改的文件到 Git...
git add wp-data/posts.json
echo ✅ posts.json 已添加
echo.

echo [3/5] 创建提交...
git commit -m "Add new blog post: Custom Wooden Storage Boxes with Removable Dividers Buyer Guide"
echo ✅ 提交已创建
echo.

echo [4/5] 推送到 GitHub...
git push origin main
echo ✅ 已推送到 GitHub
echo.

echo [5/5] 构建生产版本（可选）...
echo 如果你使用 Vercel/Netlify 自动部署，现在已经完成！
echo 如果需要手动构建，请运行: npm run build
echo.

echo ================================================
echo   部署完成！
echo ================================================
echo.
echo 📝 部署说明：
echo   - 文件已提交并推送到 GitHub
echo   - 如果你使用了自动部署（Vercel/Netlify/Cloudflare Pages）
echo     网站会在 2-5 分钟内自动更新
echo   - 访问 https://www.custom-woodenbox.com/blog 查看新文章
echo.
echo 🔗 新文章链接：
echo   https://www.custom-woodenbox.com/blog/custom-wooden-storage-boxes-with-removable-dividers-buyers-guide
echo.
pause
