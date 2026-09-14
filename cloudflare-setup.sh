#!/bin/bash
# Cloudflare API 配置脚本
# 使用前：
# 1. 在 Cloudflare Dashboard 获取 API Token
# 2. 导出环境变量：export CF_API_TOKEN="your-token"
# 3. 运行此脚本

set -e

# 配置
DOMAIN="xmchichomeware.com"
CF_API_TOKEN="${CF_API_TOKEN:?Error: CF_API_TOKEN 未设置}"

# 获取 Zone ID
echo "📍 获取 Zone ID..."
ZONE_ID=$(curl -s -X GET "https://api.cloudflare.com/client/v4/zones?name=$DOMAIN" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" | jq -r '.result[0].id')

if [ -z "$ZONE_ID" ] || [ "$ZONE_ID" == "null" ]; then
  echo "❌ 错误：无法找到 Zone ID。确保域名已添加到 Cloudflare。"
  exit 1
fi

echo "✅ Zone ID: $ZONE_ID"

# 启用自动 HTTPS 重写
echo "🔒 启用 Always Use HTTPS..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/always_use_https" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value":"on"}' | jq .

# 启用 HSTS
echo "🔐 启用 HSTS..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/security_header" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"enabled":true,"max_age":31536000,"include_subdomains":true,"preload":true}' | jq .

# 启用 Brotli 压缩
echo "🗜️ 启用 Brotli..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/brotli" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value":"on"}' | jq .

# 启用 Auto Minify
echo "⚡ 启用 Auto Minify..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/minify" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value":{"css":"on","html":"on","js":"on"}}' | jq .

# 设置 SSL/TLS 为 Full (Strict)
echo "🔒 设置 SSL/TLS 为 Full (Strict)..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ssl" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value":"strict"}' | jq .

# 设置 Security Level 为 Medium
echo "🛡️ 设置 Security Level 为 Medium..."
curl -s -X PATCH "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/security_level" \
  -H "Authorization: Bearer $CF_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"value":"medium"}' | jq .

echo ""
echo "✅ Cloudflare 配置完成！"
echo "📊 请在 Cloudflare Dashboard 检查配置："
echo "   https://dash.cloudflare.com/zones/$ZONE_ID"
echo ""
echo "⚠️ 手动配置项（API 不支持）："
echo "   1. Cache Rules（Caching → Cache Rules）"
echo "   2. WAF Rules（Security → WAF）"
echo "   3. Bot Management（Security → Bots）"
