'use client';

import Script from 'next/script';

// 把下面两个值替换成你在 Tawk.to 后台拿到的真实 ID 即可。
// 路径在 Tawk.to → Administration → Channels → Chat Widget → 复制嵌入代码里
// https://embed.tawk.to/<PROPERTY_ID>/<WIDGET_ID>
const TAWK_PROPERTY_ID = '69fd5a3126254a1c3309ace8';
const TAWK_WIDGET_ID = '1jo2qglbj';

export default function TawkChat() {
  // 没填 ID 之前不渲染，避免脚本报 404
  if (
    !TAWK_PROPERTY_ID ||
    TAWK_PROPERTY_ID === 'YOUR_PROPERTY_ID' ||
    !TAWK_WIDGET_ID ||
    TAWK_WIDGET_ID === 'YOUR_WIDGET_ID'
  ) {
    return null;
  }

  return (
    <Script id="tawk-to" strategy="afterInteractive">
      {`
        var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
        (function(){
          var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
          s1.async = true;
          s1.src = 'https://embed.tawk.to/${TAWK_PROPERTY_ID}/${TAWK_WIDGET_ID}';
          s1.charset = 'UTF-8';
          s1.setAttribute('crossorigin', '*');
          s0.parentNode.insertBefore(s1, s0);
        })();
      `}
    </Script>
  );
}
