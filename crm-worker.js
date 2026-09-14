// Cloudflare Worker for CRM Image Storage
// 这个文件需要部署到 Cloudflare Workers 来处理图片存储

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle CORS preflight
    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    try {
      // 上传图片 API
      if (url.pathname === '/api/upload-image' && request.method === 'POST') {
        const data = await request.json();
        const { id, data: dataUrl } = data;

        if (!id || !dataUrl) {
          return new Response(JSON.stringify({ error: '缺少参数' }), {
            status: 400,
            headers: { ...corsHeaders, 'Content-Type': 'application/json' }
          });
        }

        // 将 base64 图片存储到 KV
        // 注意：需要在 wrangler.toml 中配置 KV namespace
        await env.CRM_IMAGES.put(id, dataUrl, {
          metadata: {
            uploadedAt: new Date().toISOString(),
            contentType: dataUrl.match(/data:(.*?);/)?.[1] || 'image/jpeg'
          }
        });

        return new Response(JSON.stringify({
          success: true,
          id: id,
          url: `${url.origin}/api/images/${id}`
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // 获取图片 API
      if (url.pathname.startsWith('/api/images/') && request.method === 'GET') {
        const imageId = url.pathname.split('/').pop();

        // 从 KV 获取图片
        const dataUrl = await env.CRM_IMAGES.get(imageId);

        if (!dataUrl) {
          return new Response('图片不存在', {
            status: 404,
            headers: corsHeaders
          });
        }

        // 解析 data URL
        const [header, base64Data] = dataUrl.split(',');
        const contentType = header.match(/data:(.*?);/)?.[1] || 'image/jpeg';

        // 将 base64 转换为二进制
        const binaryData = atob(base64Data);
        const bytes = new Uint8Array(binaryData.length);
        for (let i = 0; i < binaryData.length; i++) {
          bytes[i] = binaryData.charCodeAt(i);
        }

        return new Response(bytes, {
          headers: {
            ...corsHeaders,
            'Content-Type': contentType,
            'Cache-Control': 'public, max-age=31536000'
          }
        });
      }

      // 列出所有图片 API（用于诊断）
      if (url.pathname === '/api/images' && request.method === 'GET') {
        const list = await env.CRM_IMAGES.list();
        return new Response(JSON.stringify({
          images: list.keys.map(k => ({
            id: k.name,
            uploadedAt: k.metadata?.uploadedAt
          }))
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // 返回 CRM 主页面（如果有 index.html）
      if (url.pathname === '/' || url.pathname === '/index.html') {
        // 这里可以返回你的 CRM HTML 文件
        const html = await env.CRM_ASSETS.get('index.html');
        if (html) {
          return new Response(html, {
            headers: { 'Content-Type': 'text/html; charset=utf-8' }
          });
        }
      }

      return new Response('Not Found', { status: 404, headers: corsHeaders });

    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
