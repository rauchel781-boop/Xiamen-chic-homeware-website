# Cloudflare DNS 配置 - 超详细图文版

## 🎯 你现在的位置
你已经在 Cloudflare Dashboard 看到这个界面了。现在需要做 3 个简单操作。

---

## 操作 1️⃣：改云的颜色（最重要）

### 当前状态
你的 DNS 记录右侧有一个 **灰色的云** ⚪

### 要做什么
把灰色云改成 **橙色的云** 🟠

### 具体操作步骤

**第 1 步：找到你的主域名记录**
```
在 DNS 记录列表里找到：
名字是 xmchichomeware.com（或显示为 @）
类型是 A 或 CNAME
```

**第 2 步：点击右侧的灰色云**
```
你会看到一个 ⚪ 灰色云，点它
```

**第 3 步：云会变成橙色**
```
点击后，灰色云 ⚪ 会变成橙色云 🟠
这就成功了！
```

**第 4 步：找 www 记录，也改成橙色**
```
名字是 www
类型是 CNAME
点右侧的灰色云 ⚪ 改成橙色 🟠
```

### ✅ 完成标志
```
你的 DNS 列表中应该看到：
✓ xmchichomeware.com 右侧是 🟠 橙色云
✓ www 右侧也是 🟠 橙色云
```

---

## 操作 2️⃣：MX 和 TXT 记录保持灰色（不要改）

### 重要
```
MX 记录   → 必须保持 ⚪ 灰色云（不要改！）
TXT 记录  → 必须保持 ⚪ 灰色云（不要改！）
```

### 为什么？
```
邮件需要直接发送，不能通过 Cloudflare
如果改成橙色，你的邮件会收不到！
```

---

## 操作 3️⃣：更新 Nameserver（在你的域名注册商做）

### 这一步在**另一个网站**做，不是在 Cloudflare

### 第 1 步：记下 Cloudflare 的两个 Nameserver

**在 Cloudflare Dashboard 看这里：**
```
左侧菜单 → Overview（概览）
或者 → DNS → Nameservers

你会看到两行：
  NS1.CLOUDFLARE.COM
  NS2.CLOUDFLARE.COM

把这两个复制下来，等一下要用
```

### 第 2 步：登录你的域名注册商

**你的域名在哪里买的？**
- 🔗 GoDaddy → godaddy.com
- 🔗 Namecheap → namecheap.com
- 🔗 阿里云 → aliyun.com
- 🔗 或其他注册商

**登录进去**

### 第 3 步：找到 DNS / Nameserver 设置

**在域名管理页面，找到这样的选项：**
```
- DNS Settings
- Nameservers
- DNS 管理
- 名称服务器
```

### 第 4 步：替换 Nameserver

**删除旧的，添加新的：**

❌ 删除这样的（旧的）：
```
NS1.YOURDNSHOST.COM
NS2.YOURDNSHOST.COM
或其他旧 Nameserver
```

✅ 替换为这样的（新的）：
```
NS1.CLOUDFLARE.COM
NS2.CLOUDFLARE.COM
```

### 第 5 步：保存

点 "Save"、"确定" 或 "保存"

### ⏳ 等待

```
需要等 24-48 小时
DNS 信息需要时间在全球传播

在这期间：
- 你的网站可能有点不稳定
- 这是正常的
- 耐心等待就行
```

---

## 📍 现在的完整操作顺序

### 今天要做的（在 Cloudflare）

✅ **在 Cloudflare Dashboard 做：**
```
1. 找到 xmchichomeware.com 的 A/CNAME 记录
2. 点右侧的灰色云 ⚪
3. 变成橙色云 🟠（完成）

4. 找到 www 的记录
5. 点右侧的灰色云 ⚪
6. 变成橙色云 🟠（完成）

7. MX 和 TXT 记录：不要动！保持灰色 ⚪
```

✅ **然后离开 Cloudflare，去域名注册商做：**
```
1. 登录你买域名的地方（GoDaddy/Namecheap/阿里云等）
2. 找到 DNS / Nameserver 设置
3. 删除旧的 Nameserver
4. 添加 Cloudflare 的两个新 Nameserver
5. 保存
```

---

## 🔍 怎么知道是否成功？

### 立即检查（Cloudflare）
```
DNS 列表中：
✓ 主域名右侧是 🟠 橙色云
✓ www 右侧是 🟠 橙色云
✓ MX 和 TXT 右侧还是 ⚪ 灰色云

如果是这样 → 成功！
```

### 等待 24-48 小时后检查

**在 Cloudflare Dashboard 看这里：**
```
左侧菜单 → Overview（概览）

应该看到：
✅ Nameservers: Active
✅ DNS records: Configured

如果显示这样 → 完全成功！
```

### 用命令行验证（可选，给技术人员用）
```bash
# 在电脑的终端/命令行运行：
nslookup xmchichomeware.com

# 应该看到类似：
# Non-authoritative answer:
# Name: xmchichomeware.com
# Address: xxx.xxx.xxx.xxx
```

---

## ❌ 常见错误

### 错误 1️⃣：MX 记录改成了橙色云
```
❌ 这样会导致邮件收不到
✅ 必须改回灰色云
```

**怎么改回？**
```
1. 找到 MX 记录
2. 点右侧的橙色云 🟠
3. 变成灰色云 ⚪
4. 完成
```

### 错误 2️⃣：Nameserver 没有更新
```
❌ 在 Cloudflare 改了云，但没去域名注册商改 Nameserver
✅ 必须两个地方都改

症状：DNS 一直显示 "Pending"
解决：去你的域名注册商改 Nameserver
```

### 错误 3️⃣：改错了 Nameserver
```
❌ 不小心用了错误的 Nameserver 地址
✅ 必须改成 Cloudflare 的

正确的：
  NS1.CLOUDFLARE.COM
  NS2.CLOUDFLARE.COM

错误的例子：
  NS1.GODADDY.COM ❌
  NS1.NAMECHEAP.COM ❌
```

---

## 📞 问题排查

### 问题：不知道 Nameserver 在哪

**解决方案：**
```
1. 登录你的域名注册商
2. 进入域名管理/DNS 设置
3. 找 "Nameserver"、"DNS" 或 "Name Servers"
4. 如果找不到，搜索：
   "[你的注册商名字] 如何改 Nameserver"
   例如："GoDaddy 如何改 Nameserver"
```

### 问题：不知道自己的域名在哪买的

**查询方法：**
```
1. 打开浏览器，访问：
   https://lookup.icann.org/

2. 输入：xmchichomeware.com

3. 搜索结果中会显示：
   "Registrar: GoDaddy" 或其他

4. 现在你知道在哪了！
```

### 问题：改了后网站无法访问

```
这是正常的，因为 DNS 需要时间传播

✅ 耐心等待 24-48 小时
✅ 可以偶尔刷新试试
✅ 不用做其他操作
```

---

## ✨ 完成后会发生什么

```
当 DNS 配置完成后，你会得到：

✅ 网站速度快 30-50%
✅ 带宽节省 50-80%
✅ 自动 DDoS 防护
✅ 全球 CDN 加速
✅ 安全防火墙
```

---

## 🎬 视频参考（如果还是不懂）

### Cloudflare DNS 设置
- YouTube 搜索："Cloudflare DNS setup"
- 看前 5 分钟就够了

### 域名注册商 Nameserver 改法
- YouTube 搜索："[你的注册商] change nameserver"
- 例如："GoDaddy change nameserver"

---

## 📝 总结

### 你需要做的（一共 2 件事）

**事情 1️⃣：在 Cloudflare（5 分钟）**
```
灰色云 ⚪ 改成 橙色云 🟠
- xmchichomeware.com → 改
- www → 改
- MX → 不改（保持灰色）
- TXT → 不改（保持灰色）
```

**事情 2️⃣：在域名注册商（5 分钟）**
```
Nameserver 改为 Cloudflare 的：
- NS1.CLOUDFLARE.COM
- NS2.CLOUDFLARE.COM
```

**事情 3️⃣：等待（24-48 小时）**
```
坐着等 DNS 传播
不用做什么，它会自动完成
```

---

**现在准备好了吗？先从改 Cloudflare 的云开始！** 🚀
