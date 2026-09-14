# 如何添加新文章到 posts.json

## 新文章已创建

文件位置：`D:\chic website\wp-data\new-article-custom-wooden-storage-boxes-with-removable-dividers.json`

## 添加步骤

### 方法 1：手动编辑（推荐）

1. **备份原文件**
   ```
   复制 wp-data\posts.json 为 wp-data\posts.json.backup
   ```

2. **打开 posts.json**
   用 VS Code 或其他文本编辑器打开 `wp-data\posts.json`

3. **插入新文章**
   - 文件开头是 `[`
   - 在第一个 `{` 之前（第2行），插入新文章内容
   - 从 `new-article-custom-wooden-storage-boxes-with-removable-dividers.json` 复制完整的 JSON 对象
   - 粘贴到 `[` 后面
   - 在新文章的 `}` 后面添加逗号 `,`

4. **格式应该是这样**：
   ```json
   [
       {
           "id": 7013,
           "slug": "custom-wooden-storage-boxes-with-removable-dividers-buyers-guide",
           ...整个新文章...
       },
       {
           "slug": "fob-to-landed-cost-math-wooden-products-2026",
           ...原来的第一篇文章...
       },
       ...其他文章...
   ]
   ```

5. **保存文件**

### 方法 2：使用 Node.js 脚本（自动化）

创建一个临时脚本 `add-article.js`：

```javascript
const fs = require('fs');
const path = require('path');

// 读取现有文章列表
const postsPath = path.join(__dirname, 'wp-data', 'posts.json');
const posts = JSON.parse(fs.readFileSync(postsPath, 'utf8'));

// 读取新文章
const newArticlePath = path.join(__dirname, 'wp-data', 'new-article-custom-wooden-storage-boxes-with-removable-dividers.json');
const newArticle = JSON.parse(fs.readFileSync(newArticlePath, 'utf8'));

// 添加到开头
posts.unshift(newArticle);

// 写回文件
fs.writeFileSync(postsPath, JSON.stringify(posts, null, 4), 'utf8');
console.log('✅ 文章已成功添加到 posts.json');
```

运行脚本：
```bash
node add-article.js
```

## 验证文章

添加完成后，启动开发服务器验证：

```bash
npm run dev
```

访问：
- 博客列表：http://localhost:3000/blog
- 新文章：http://localhost:3000/blog/custom-wooden-storage-boxes-with-removable-dividers-buyers-guide

## 文章要点总结

### 📊 核心数据
- **字数**：~2,500 words
- **图片数量**：8张
- **表格数量**：4个
- **FAQ数量**：8个
- **内部链接**：6个

### 🎯 内部链接
1. `/products/storage-home-organization` - Storage & Home Organization 产品分类
2. `/products/wooden-storage-box-with-lid` - 带盖木质储物盒
3. `/material-guide` - 材料指南
4. `/capabilities` - 工厂能力页面
5. `/wood-fabrication` - 木材加工概览
6. `/contact` - 联系/询价页面

### 🖼️ 使用的图片
所有图片都来自 `/drawer-wooden-box/` 目录：
1. `set-1-01.png` - 主图（featured image）
2. `set-2-01.png` - 可拆分隔板展示
3. `set-3-02.png` - 多隔间设计
4. `set-4-02.png` - 材料对比
5. `set-5-02.png` - 槽式网格分隔系统
6. `set-6-02.png` - 激光雕刻LOGO
7. `set-7-03.png` - 包装选项
8. `/factory/production.jpg` - 工厂生产线

### 📋 表格内容
1. **材料对比表** - Pine, Plywood, MDF, Bamboo, Acacia
2. **厚度指南表** - 小、中、大、超大尺寸建议
3. **LOGO定制方法表** - 激光、丝印、UV、烫金、压印
4. **质量控制检查点** - 4个QC阶段

### ❓ FAQ 覆盖
- MOQ（最小起订量）
- 木材厚度建议
- 分隔板定制
- 激光切割/UV打印
- 全彩印刷
- 样品交期
- 国际运输
- 文件格式要求

### 🔍 SEO 优化
- **主关键词**：Custom Wooden Storage Boxes with Removable Dividers
- **长尾词**：adjustable dividers, wooden organizer, OEM manufacturer
- **目标市场**：USA, UK, EU, Israel
- **买家画像**：jewelry brands, tea companies, educational kit manufacturers

### 📐 Schema 结构化数据（自动生成）
网站会自动为这篇文章生成：
- ✅ Article Schema
- ✅ FAQPage Schema
- ✅ Breadcrumb Schema
- ✅ Organization Schema（全局）

## 下一步工作

根据你的要求，后续还需要添加的内容类型：

### 1. 案例研究页面（Case Studies）
建议创建 4 篇：
- Custom Wooden Tea Box for German Amazon Brand
- Custom Wooden Gift Box for UK Retailer
- Wooden Storage Box with Dividers for Educational Product Brand
- Custom Acacia Kitchen Organizer for Hospitality Buyer

### 2. 公司实体页面强化
增强 `/about` 页面，添加：
- 公司注册信息：Xiamen Chic Homeware Co., Ltd.
- 品牌名称：CHIC Wooden Expert
- 工厂位置：Cao County, Shandong
- 办公室：Xiamen, Fujian
- 主要产品列表
- 认证证书
- 出口市场地图
- 产能数据
- 创始人/团队介绍

### 3. 可下载买家资源（Downloadable PDFs）
创建 4 个 PDF：
- Wooden Box Material Selection Chart
- Custom Wooden Box RFQ Checklist
- Wooden Box Logo Methods Guide
- Packaging & Carton Guide for Importers

### 4. 更多博客文章
按照同样的结构和质量标准，创建更多主题：
- How to Choose the Right Wood for Your Custom Box
- Logo Methods Comparison: Laser vs UV vs Hot Foil
- Amazon FBA Packaging Requirements for Wooden Products
- Wood Thickness Guide for Different Product Types
- MOQ Negotiation Tips for First-Time Importers

## 技术说明

### 图片优化
所有图片路径都使用相对路径，Next.js 会自动：
- 转换为 AVIF/WebP 格式
- 生成响应式尺寸
- 添加 lazy loading
- 优化加载性能

### 外部链接处理
文章增强系统（`lib/article-enhance.js`）会自动：
- 为外部链接添加 `target="_blank"`
- 添加 `rel="noopener nofollow"`
- 统计外部链接数量（上限10个）

### TOC 生成
所有 H2 和 H3 标题会自动：
- 生成唯一的 ID
- 创建目录导航
- 支持锚点跳转

### FAQ Schema
FAQ 数组会自动转换为 FAQPage Schema 并注入页面。

## 需要帮助？

如果遇到任何问题：
1. 检查 JSON 格式是否正确（使用 JSON validator）
2. 确保所有图片路径存在
3. 验证内部链接的 slug 正确
4. 运行 `npm run build` 检查构建错误

---

**创建时间**：2026-06-09  
**作者**：Kiro AI  
**状态**：✅ 文章已完成，等待添加到 posts.json
