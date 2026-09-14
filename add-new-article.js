#!/usr/bin/env node
/**
 * 自动添加新文章到 posts.json
 *
 * 用法：
 *   node add-new-article.js
 *
 * 这个脚本会：
 * 1. 读取 wp-data/posts.json
 * 2. 读取新文章 wp-data/new-article-custom-wooden-storage-boxes-with-removable-dividers.json
 * 3. 将新文章插入到 posts.json 的开头（作为最新文章）
 * 4. 保存更新后的 posts.json
 * 5. 自动创建备份文件
 */

const fs = require('fs');
const path = require('path');

// 文件路径
const postsPath = path.join(__dirname, 'wp-data', 'posts.json');
const newArticlePath = path.join(__dirname, 'wp-data', 'new-article-custom-wooden-storage-boxes-with-removable-dividers.json');
const backupPath = path.join(__dirname, 'wp-data', `posts.json.backup-${new Date().toISOString().replace(/[:.]/g, '-')}`);

console.log('🚀 开始添加新文章到 posts.json...\n');

try {
  // 1. 创建备份
  console.log('📦 创建备份文件...');
  fs.copyFileSync(postsPath, backupPath);
  console.log(`✅ 备份已创建: ${path.basename(backupPath)}\n`);

  // 2. 读取现有文章列表
  console.log('📖 读取现有文章列表...');
  const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));
  console.log(`✅ 找到 ${posts.length} 篇现有文章\n`);

  // 3. 读取新文章
  console.log('📄 读取新文章...');
  const newArticle = JSON.parse(fs.readFileSync(newArticlePath, 'utf8'));
  console.log(`✅ 新文章: "${newArticle.title}"\n`);

  // 4. 检查是否已存在（避免重复添加）
  const existingIndex = posts.findIndex(p => p.slug === newArticle.slug);
  if (existingIndex !== -1) {
    console.log(`⚠️  警告: 文章已存在（位置 ${existingIndex + 1}）`);
    console.log('   是否要替换现有文章？\n');
    console.log('   如果要替换，请手动删除现有文章后重新运行此脚本。');
    process.exit(0);
  }

  // 5. 添加新文章到开头
  console.log('✨ 将新文章添加到列表开头...');
  posts.unshift(newArticle);
  console.log(`✅ 现在共有 ${posts.length} 篇文章\n`);

  // 6. 保存更新后的文件
  console.log('💾 保存更新后的 posts.json...');
  fs.writeFileSync(postsPath, JSON.stringify(posts, null, 4), 'utf8');
  console.log('✅ 文件已保存\n');

  // 7. 显示摘要
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🎉 成功！新文章已添加到 posts.json');
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  console.log('📊 文章信息:');
  console.log(`   标题: ${newArticle.title}`);
  console.log(`   Slug: ${newArticle.slug}`);
  console.log(`   分类: ${newArticle.categories[0].name}`);
  console.log(`   日期: ${newArticle.date}`);
  console.log(`   ID: ${newArticle.id}`);
  console.log(`   FAQ数量: ${newArticle.faq.length}`);
  console.log(`   主图: ${newArticle.featured_image}\n`);

  console.log('🔗 文章链接:');
  console.log(`   博客列表: http://localhost:3000/blog`);
  console.log(`   文章页面: http://localhost:3000/blog/${newArticle.slug}\n`);

  console.log('📋 下一步:');
  console.log('   1. 运行 npm run dev 启动开发服务器');
  console.log('   2. 访问上面的链接查看新文章');
  console.log('   3. 检查文章显示是否正常');
  console.log('   4. 如果满意，运行 npm run build 构建生产版本\n');

  console.log('💡 提示:');
  console.log(`   - 备份文件: ${path.basename(backupPath)}`);
  console.log(`   - 如果需要回滚，将备份文件重命名为 posts.json 即可\n`);

} catch (error) {
  console.error('❌ 错误:', error.message);
  console.error('\n详细错误信息:');
  console.error(error);

  // 如果备份已创建但操作失败，提示恢复
  if (fs.existsSync(backupPath)) {
    console.log('\n💡 备份文件已创建，你可以从备份恢复:');
    console.log(`   复制 ${path.basename(backupPath)} 为 posts.json`);
  }

  process.exit(1);
}
