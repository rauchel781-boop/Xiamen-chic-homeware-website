# Cloudflare 配置完整指南 for xmchichomeware.com

## 🎯 快速配置清单

### 1️⃣ DNS 配置
- [ ] 在 Cloudflare 添加域名 xmchichomeware.com
- [ ] 更新域名注册商的 Nameserver 为 Cloudflare 的两个 NS
- [ ] 等待 DNS 传播（通常 24-48 小时）
- [ ] 在 Cloudflare Dashboard 验证 DNS 状态

### 2️⃣ SSL/TLS 设置
- [ ] 设置 SSL/TLS 模式：**Full (Strict)** 
  - 路径：SSL/TLS → Overview → 选择 Full (Strict)
  - 确保你的源服务器（Vercel/主机）有有效的 SSL 证书
- [ ] 启用自动 HTTPS 重写
  - 路径：SSL/TLS → Edge Certificates → Always Use HTTPS (ON)
- [ ] 启用 HTTP Strict Transport Security (HSTS)
  - 路径：SSL/TLS → Edge Certificates → HSTS (Enable)
  - 设置 Max Age: 12 months, Include Subdomains: YES

### 3️⃣ 缓存规则（关键）
在 **Caching → Cache Rules** 创建以下规则：

**规则 1：静态资源（1年）**
```
条件：uri.path contains "/_next/static"
TTL：31536000 (1 year)
```

**规则 2：优化图片（30天）**
```
条件：uri.path contains "/_next/image" or uri.path contains "/wp-images"
TTL：2592000 (30 days)
```

**规则 3：HTML 页面（1分钟边缘缓存）**
```
条件：(uri.path eq "/" or uri.path eq "/blog" or uri.path eq "/products") and not uri.path contains "/api"
TTL：60 seconds
```

**规则 4：API 路由（不缓存）**
```
条件：uri.path contains "/api"
Cache Eligibility：Bypass
```

**规则 5：Sitemap & Robots（24小时）**
```
条件：uri.path matches "^/(sitemap|robots)"
TTL：86400 (24 hours)
```

### 4️⃣ 性能优化
- [ ] 启用 Brotli 压缩
  - 路径：Speed → Optimization → Brotli (ON)
- [ ] 启用 Auto Minify
  - 路径：Speed → Optimization → Auto Minify
  - 勾选：JavaScript, CSS, HTML
- [ ] 启用 Rocket Loader (JavaScript optimization)
  - 路径：Speed → Optimization → Rocket Loader (ON)
- [ ] 启用 Polish (Image optimization)
  - 路径：Speed → Optimization → Polish
  - 选择 "Intelligent" 模式

### 5️⃣ 安全设置
- [ ] 启用 WAF (Web Application Firewall)
  - 路径：Security → WAF → OWASP ModSecurity Core Ruleset (ON)
  - 选择 "Block" 模式
- [ ] 启用 Bot Management
  - 路径：Security → Bots → Super Bot Fight Mode (ON)
  - 配置：Definitely Automated, Likely Automated
- [ ] 启用 DDoS 防护
  - 路径：Security → DDoS
  - 选择 "Under Attack" 模式（仅在需要时激活）
- [ ] 配置 Security Level
  - 路径：Security → Settings → Security Level: Medium
- [ ] 启用 Challenge
  - 路径：Security → Settings → Challenge (Passing)

### 6️⃣ 页面规则（可选）
- [ ] 为 /api 路由禁用缓存
  - 规则：/api/* → Cache Level: Bypass
- [ ] 为登录页面禁用性能功能
  - 规则：/contact/* → Security Level: High

### 7️⃣ 监控和分析
- [ ] 启用 Analytics Engine
  - 路径：Analytics → Logs
- [ ] 配置页面规则日志
  - 查看缓存命中率、性能指标
- [ ] 监控 Bandwidth 节省
  - 通常能节省 50-80% 的源站带宽

---

## 📊 预期效果

| 指标 | 改进 |
|------|------|
| 页面加载时间 | -40% ~ -60% |
| 源站带宽 | -50% ~ -80% |
| 缓存命中率 | 70-95% |
| DDoS 防护 | 自动阻止 |
| SSL 等级 | A+ (SSL Labs) |

---

## 🔍 验证配置

### 检查缓存是否工作
```bash
# 检查 CF-Cache-Status 头
curl -I https://xmchichomeware.com/

# 应该看到：
# cf-cache-status: HIT (已缓存)
# cf-ray: 8c3d4e5f6g7h8i9j0k (Cloudflare Ray ID)
# age: 123 (缓存年龄，秒数)
```

### 监控 Cloudflare Dashboard
1. 进入 **Analytics & Logs** → **Analytics**
2. 检查：
   - Cache Hit Rate（应该 > 70%）
   - Requests（请求量）
   - Bandwidth Saved（节省的带宽）

---

## 🚨 常见问题

**Q: 为什么有些页面显示 MISS？**
A: 首次访问、Cookie 变化或源站 Cache-Control 头设置会导致 MISS。这是正常的。

**Q: 我的网站很慢，CDN 没有帮助？**
A: 检查：
- SSL/TLS 模式是否设置为 Full (Strict)
- 源站是否返回正确的 Cache-Control 头
- 是否有 Rocket Loader 或其他脚本优化干扰

**Q: 如何清除缓存？**
A: Cloudflare Dashboard → Caching → Purge Cache → Purge Everything

**Q: 我能在中国使用 Cloudflare 吗？**
A: 可以，但速度会受影响。考虑添加中国 CDN（如阿里云 CDN）作为备选。

---

## 📝 Next.js + Cloudflare 最佳实践

✅ 你的 `next.config.js` 已经正确配置了：
- `Cache-Control` 头设置
- `s-maxage` 用于边缘缓存
- `stale-while-revalidate` 用于后台更新

✅ Cloudflare 会自动：
- 压缩响应
- 优化图片
- 防止 DDoS 攻击
- 加速全球访问

✅ 建议继续维护：
- 定期检查缓存命中率
- 监控页面性能（Core Web Vitals）
- 在发布新内容后手动清除相关缓存
